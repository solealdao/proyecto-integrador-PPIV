import { fetchAllUsers } from '@/api/services/userService';
import { useState, useEffect } from 'react';

const usePatients = (token) => {
	const [patients, setPatients] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getPatients = async () => {
			try {
				const data = await fetchAllUsers(token);
				const patients = data.filter((user) => user.id_user_type === 1);
				setPatients(patients);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		getPatients();
	}, [token]);

	return { patients, loading, error };
};

export default usePatients;
