import { fetchAllUsers } from '@/api/services/userService';
import { useState, useEffect } from 'react';

const useDoctors = (token) => {
	const [doctors, setDoctors] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getDoctors = async () => {
			try {
				const data = await fetchAllUsers(token);
				const doctors = data.filter((user) => user.id_user_type === 2);
				setDoctors(doctors);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		getDoctors();
	}, [token]);

	return { doctors, loading, error };
};

export default useDoctors;
