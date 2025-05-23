'use client';

import PageLayout from '@/components/PageLayout';
import MenuCard from '@/components/MenuCard';
import styled from '@emotion/styled';
import LogoutButton from '@/components/LogoutButton';

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 32px;
	margin-top: 40px;
	flex-wrap: wrap;
`;

export default function AppointmentHome() {
	return (
		<PageLayout
			showImage={true}
			imageUrl="/icono_calendario.svg"
			title="Gestión de Turnos"
			showClock={true}
		>
			<ButtonContainer>
				<MenuCard text="Nuevo Turno" url="/appointment-new" />
				<MenuCard text="Consultar Turnos" url="/appointment-query" />
				<MenuCard text="Modificar Turnos" url="appointment-edit" />
				<MenuCard text="Historial de Turnos" url="#" />
			</ButtonContainer>

			<LogoutButton onClick={() => (window.location.href = '/')}>
				Cerrar Sesión
			</LogoutButton>
		</PageLayout>
	);
}