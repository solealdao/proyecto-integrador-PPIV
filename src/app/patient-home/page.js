'use client';

import PageLayout from '@/components/PageLayout';
import MenuCard from '@/components/MenuCard';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import LogoutButton from '@/components/LogoutButton'

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
    gap: 32px;
    margin-top: 40px;
	flex-wrap: wrap;
`;

export default function PatientHome() {
	return (
		<PageLayout
            showImage={true}
            imageUrl="/patient_profile.jpeg"
            title={'María González'}
            showClock={true}
        >
            <ButtonContainer>
                <MenuCard text="Gestión de Turnos" url="#" />
                <MenuCard text="Mensajería" url="#" />
            </ButtonContainer>

            <LogoutButton onClick={() => (window.location.href = '/')}>
                Cerrar Sesión
            </LogoutButton>
        </PageLayout>
	);
}