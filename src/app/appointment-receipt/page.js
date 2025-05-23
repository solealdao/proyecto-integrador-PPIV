'use client';

import PageLayout from '@/components/PageLayout';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import { useSearchParams } from 'next/navigation';

const Container = styled.div`
	max-width: 600px;
	margin: 40px auto;
	padding: 20px;
	background-color: ${theme.colors.white};
	border-radius: 12px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
	color: ${theme.colors.gray};
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
	const searchParams = useSearchParams();
  	const medico = searchParams.get('medico');
  	const fechaTurno = searchParams.get('fecha');
  	const horaTurno = searchParams.get('hora');
	const cancelar = () => {
		window.location.href = '/appointment-management';
	};

	return (
		<PageLayout title="Comprobante de turno" showClock>
			<Container>
				<Header>
					<Logo src="/logo.png" alt="Logo" />
					<Title>Nueva Clinica</Title>
					<Title>ID: -</Title>
				</Header>

				<InfoRow>
					<InfoTitle>Paciente: -</InfoTitle>
				</InfoRow>
				<InfoRow>
          			<InfoTitle>Profesional: {medico}</InfoTitle>
        		</InfoRow>
				<InfoRow>
					<InfoTitle>Fecha: {fechaTurno}</InfoTitle>
					<InfoTitle>Hora: {horaTurno}</InfoTitle>
					<InfoTitle>Especialidad: Clínica Médica</InfoTitle>
				</InfoRow>
			</Container>
		</PageLayout>
	);
}
