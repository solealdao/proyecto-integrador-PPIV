'use client';

import { usePathname, useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHouse } from '@fortawesome/free-solid-svg-icons';
import useAuth from '@/hooks/useAuth';

const NavBar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: transparent;
	padding: 10px 20px;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 10;
`;

const NavGroup = styled.div`
	display: flex;
	gap: 12px;
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 8px 16px;
	font-family: Mulish, sans-serif;
	font-weight: bold;
	font-size: 16px;
	color: ${theme.colors.white};
	background-color: ${theme.colors.green};
	border: none;
	border-radius: 10px;
	cursor: pointer;

	&:hover {
		background: ${theme.colors.yellow};
	}
`;

export default function NavigationBar({ showBack = true, homePath }) {
	const { user } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	const isHomeRoute = pathname?.includes('-home');

	const roleBasedHome =
		user?.role_id === 1
			? '/patient-home'
			: user?.role_id === 2
			? '/doctor-home'
			: user?.role_id === 3
			? '/admin-home'
			: '/';

	return (
		<NavBar>
			<NavGroup>
				{showBack && !isHomeRoute && (
					<Button onClick={() => router.back()}>
						<FontAwesomeIcon icon={faArrowLeft} />
						Volver
					</Button>
				)}
				<Button onClick={() => router.push(homePath || roleBasedHome)}>
					<FontAwesomeIcon icon={faHouse} />
					Inicio
				</Button>
			</NavGroup>
		</NavBar>
	);
}
