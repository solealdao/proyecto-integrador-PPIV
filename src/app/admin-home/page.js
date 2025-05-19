'use client';

import PageLayout from '@/components/PageLayout';
import MenuCard from '@/components/MenuCard';
import styled from '@emotion/styled';
import theme from '../theme';
import LogoutButton from '@/components/LogoutButton';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 40px;
  flex-wrap: wrap;
`;

export default function AdminHome() {
  return (
    <PageLayout
      showImage={true}
      imageUrl="/admin_profile.jpg"
      title="Cristina Pérez"
      showClock={true}     
    >
      <ButtonContainer>
        <MenuCard text="Gestión de Turnos" url="/appointment-management" />
        <MenuCard text="Ver estadísticas" url="/admin-stats" />
      </ButtonContainer>

      <LogoutButton onClick={() => (window.location.href = '/')}>
        Cerrar Sesión
      </LogoutButton>
    </PageLayout>
  );
}
