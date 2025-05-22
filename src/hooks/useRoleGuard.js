import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

export default function useRoleGuard(allowedRoles = []) {
	const { user, logout } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (user === null) return;

		if (!user) {
			router.push('/');
			return;
		}

		if (!allowedRoles.includes(user.id_user_type)) {
			switch (user.id_user_type) {
				case 1:
					router.push('/patient-home');
					break;
				case 2:
					router.push('/doctor-home');
					break;
				case 3:
					router.push('/admin-home');
					break;
				default:
					router.push('/');
			}
			return;
		}
	}, [user, router, allowedRoles, logout]);
}
