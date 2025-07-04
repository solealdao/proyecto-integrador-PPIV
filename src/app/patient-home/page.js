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

export default function PatientHome() {
	useRoleGuard([1]);
	const { user, logout } = useAuth();
	const fullName = user ? `${user.first_name} ${user.last_name}` : 'Paciente';
	return (
		<PageLayout
			showImage={true}
			imageUrl="/patient.png"
			title={fullName}
			showClock={true}
		>
			<ButtonContainer>
				<MenuCard
					text="Gestión de Turnos"
					url="/patient-appointment-management"
				/>
				<MenuCard text="Mensajería" url="/message" />
			</ButtonContainer>
		</PageLayout>
	);
}
