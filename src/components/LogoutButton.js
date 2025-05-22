'use client';

import styled from '@emotion/styled';
import theme from '@/app/theme';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import useAuth from '@/hooks/useAuth';

const StyledLogoutButton = styled.button`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 12px;
	color: ${theme.colors.darkGreen};
	font-family: Mulish, sans-serif;
	font-weight: bold;
	font-size: 14px;
	text-align: center;
	background: ${theme.colors.yellow};
	border-radius: 8px;
	border: none;
	margin: 0 5px;
	cursor: pointer;

	&:hover {
		background: ${theme.colors.green};
		color: ${theme.colors.white};
	}
`;

export default function LogoutButton({ to = '/' }) {
	const router = useRouter();
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
		router.push(to);
	};

	return (
		<StyledLogoutButton onClick={handleLogout}>
			<FontAwesomeIcon icon={faPowerOff} />
			Cerrar Sesión
		</StyledLogoutButton>
	);
}
