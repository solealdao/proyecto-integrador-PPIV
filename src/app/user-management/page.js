'use client';

import PageLayout from '@/components/PageLayout';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import UserItem from '@/components/UserItem';
import { deleteUser, fetchAllUsers } from '@/api/services/userService';
import useAuth from '@/hooks/useAuth';
import ActionButton from '@/components/ActionButton';

const ButtonContainer = styled.div`
	margin: 30px 0;
	display: flex;
	justify-content: center;
`;

const UserListContainer = styled.ul`
	list-style: none;
	padding: 0;
`;

export default function UserManagementPage() {
	const router = useRouter();
	const [users, setUsers] = useState([]);
	const { token } = useAuth();

	useEffect(() => {
		const loadUsers = async () => {
			if (!token) return;

			try {
				const data = await fetchAllUsers(token);
				setUsers(data);
			} catch (error) {
				toast.error('Error al cargar usuarios: ' + error.message);
			}
		};

		loadUsers();
	}, [token]);

	const handleDeleteUser = async (userId) => {
		const confirmed = window.confirm(
			'¿Estás seguro de que querés eliminar este usuario?'
		);
		if (!confirmed) return;

		try {
			await deleteUser(userId, token);
			toast.success('Usuario eliminado correctamente');
			setUsers((prev) => prev.filter((user) => user.id_user !== userId));
		} catch (error) {
			toast.error('Error al eliminar usuario: ' + error.message);
		}
	};

	return (
		<PageLayout
			showImage={true}
			imageUrl="/user.svg"
			title="Gestión de Usuarios"
			showClock={true}
		>
			<UserListContainer>
				{users.map((user) => (
					<UserItem
						key={user.id_user}
						user={user}
						onDelete={handleDeleteUser}
					/>
				))}
			</UserListContainer>
			<ButtonContainer>
				<ActionButton onClick={() => router.push('/user-new')}>
					Nuevo Usuario
				</ActionButton>
			</ButtonContainer>
			<ToastContainer position="top-right" autoClose={3000} />
		</PageLayout>
	);
}
