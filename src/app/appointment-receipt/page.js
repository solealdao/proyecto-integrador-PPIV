'use client';

import PageLayout from '@/components/PageLayout';
import styled from '@emotion/styled';
import theme from '@/app/theme';

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 80px;
`;

const Title = styled.h2`
  color: ${theme.colors.darkGreen};
`;

const InfoRow = styled.div`
  margin-bottom: 15px;
`;

const InfoTitle = styled.h3`
  margin: 5px 0;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const BackButton = styled.button`
  background-color: ${theme.colors.darkGreen};
  color: ${theme.colors.yellow};
  padding: 12px 30px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  font-family: Mulish, sans-serif;
`;

export default function ComprobanteTurno() {
  // Datos de ejemplo para evitar error
  const turno = {
    idTurno: '12345',
    fechaTurno: '2025-05-20',
    hora: '10:30',
  };
  const patient = {
    nombreCompleto: 'Juan Pérez',
  };
  const doctor = {
    nombre: 'Valentina Gómez',
    especialidad: 'Cardiología',
  };

  const cancelar = () => {
    window.location.href = '/appointments/appointment-management';
  };

  return (
    <PageLayout title="Comprobante de turno" showClock>
      <Container>
        <Header>
          <Logo src="/logo.png" alt="Logo" />
          <Title>Nueva Clinica</Title>
          <Title>ID: {turno.idTurno}</Title>
        </Header>

        <InfoRow>
          <InfoTitle>Paciente: {patient.nombreCompleto}</InfoTitle>
        </InfoRow>
        <InfoRow>
          <InfoTitle>Profesional: Dr. {doctor.nombre}</InfoTitle>
        </InfoRow>
        <InfoRow>
          <InfoTitle>Fecha: {turno.fechaTurno}</InfoTitle>
          <InfoTitle>Hora: {turno.hora}</InfoTitle>
          <InfoTitle>Especialidad: {doctor.especialidad}</InfoTitle>
        </InfoRow>

        <ButtonContainer>
          <BackButton onClick={cancelar}>Volver</BackButton>
        </ButtonContainer>
      </Container>
    </PageLayout>
  );
}
