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

export default function DoctorHome() {
	useRoleGuard([2]);
	const { user, logout } = useAuth();
	const fullName = user ? `${user.first_name} ${user.last_name}` : 'Doctor/a';

	return (
		<PageLayout
			showImage={true}
			imageUrl="/doctor.png"
			title={fullName}
			showClock={true}
		>
			<ButtonContainer>
				<MenuCard text="Consultar Agenda" url="/doctor-schedule" />
				<MenuCard text="Ver Historial" url="/appointment-history" />
				<MenuCard text="Ir a Mensajería" url="/message" />
			</ButtonContainer>
		</PageLayout>
	);
}
