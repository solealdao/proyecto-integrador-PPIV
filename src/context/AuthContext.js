'use client';

import { loginUser } from '@/api/services/userService';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		const storedUser = localStorage.getItem('user');

		if (storedToken) {
			setToken(storedToken);
		}

		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = async (email, password) => {
		try {
			const data = await loginUser(email, password);

			localStorage.setItem('token', data.token);
			const { password: _, ...userWithoutPassword } = data.user;
			localStorage.setItem('user', JSON.stringify(userWithoutPassword));

			setToken(data.token);
			setUser(userWithoutPassword);

			return userWithoutPassword.id_user_type;
		} catch (error) {
			console.error('Error al iniciar sesión:', error.message);
			throw error;
		}
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
