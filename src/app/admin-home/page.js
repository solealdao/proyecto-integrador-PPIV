'use client';

import PageLayout from '@/components/PageLayout';
import MenuCard from '@/components/MenuCard';
import styled from '@emotion/styled';
import useAuth from '@/hooks/useAuth';
import useRoleGuard from '@/hooks/useRoleGuard';

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 32px;
	margin-top: 40px;
	flex-wrap: wrap;
`;

export default function AdminHome() {
	useRoleGuard([3]);
	const { user } = useAuth();
	const fullName = user
		? `${user.first_name} ${user.last_name}`
		: 'Administrador/a';

	return (
		<PageLayout
			showImage={true}
			imageUrl="/admin_profile.jpg"
			title={fullName}
			showClock={true}
		>
			<ButtonContainer>
				<MenuCard
					text="Gestión de Turnos"
					url="/admin-appointment-management"
				/>
				<MenuCard text="Gestión de Usuarios" url="/user-management" />
				<MenuCard text="Ver estadísticas" url="/admin-stats" />
				<MenuCard text="Ir a mensajería" url="/message" />
			</ButtonContainer>
		</PageLayout>
	);
}
