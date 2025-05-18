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

export default function DoctorHome() {
	return (
		<PageLayout
			showImage={true}
			imageUrl="/doctor_profile.jpg"
			title="Valentina Gómez"
			showClock={true}
		>
			<ButtonContainer>
				<MenuCard text="Consultar agenda" url="#" />
				<MenuCard text="Ver historial" url="#" />
				<MenuCard text="Ir a mensajería" url="#" />
			</ButtonContainer>

			<LogoutButton onClick={() => (window.location.href = '/')}>
				Cerrar Sesión
			</LogoutButton>
		</PageLayout>
	);
}
