'use client';

import PageLayout from '@/components/PageLayout';
import MenuCard from '@/components/MenuCard';
import styled from '@emotion/styled';

const MenuGrid = styled.div`
  display: flex;
  gap: 10px;
  justify-items: center;
  align-items: center;
  margin: 0 auto;
  padding: 40px;
`;

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function AppointmentHome() {
	return (
		<PageLayout
			showImage={true}
			imageUrl="/icono_calendario.svg"
			title="Gestión de Turnos"
			showClock={true}
		>
			<CenteredContainer>
				<MenuGrid>
					<MenuCard text="Nuevo Turno" url="/appointment-new" />
					<MenuCard text="Consultar Turnos" url="/appointment-query" />
					<MenuCard text="Modificar Turnos" url="appointment-edit" />
					<MenuCard text="Historial de Turnos" url="/appointment-history" />
				</MenuGrid>
			</CenteredContainer>
		</PageLayout>
	);
}
