'use client';

import PageLayout from '@/components/PageLayout';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import { useRouter, useSearchParams } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import useDoctors from '@/hooks/useDoctors';
import usePatients from '@/hooks/usePatients';
import { useEffect, useState } from 'react';
import { dateFormatter, timeFormatter } from '../../../utils/dateTimeFormatter';
import ActionButton from '@/components/ActionButton';

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
	flex-direction: column;
	align-items: center;
	gap: 10px;
	margin-bottom: 20px;
`;

const Logo = styled.img`
	width: 220px;
	margin-bottom: 10px
`;

const Title = styled.h2`
	color: ${theme.colors.darkGreen};
`;

const InfoRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const InfoTitle = styled.h3`
	margin: 5px 0;
	color: ${theme.colors.gray};
`;

const InfoSection = styled.div`
	padding: 20px;
	border: 2px solid ${theme.colors.lightGray}; /* o darkGreen si querés destacarlo más */
	border-radius: 10px;
	margin-top: 20px;
	background-color: ${theme.colors.white};
`;

const ButtonContainer = styled.div`
	margin: 4em;
	display: flex;
	justify-content: center;
`;

export default function AppointmentReceiptPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	
	const { token } = useAuth();

	const { doctors } = useDoctors(token);
  	const { patients } = usePatients(token);

  	const [doctorName, setDoctorName] = useState('');
  	const [patientName, setPatientName] = useState('');
  	const [loaded, setLoaded] = useState(false);

	const doctorId = Number(searchParams.get('doctor'));
	const patientId = Number(searchParams.get('patient'));
	const date = searchParams.get('date');
	const time = searchParams.get('time');
	const appointmentId = searchParams.get('id');

	useEffect(() => {
		if (doctors.length && patients.length) {
			const doctor = doctors.find(d => d.id_user === Number(doctorId));
			const patient = patients.find(p => p.id_user === Number(patientId));

			setDoctorName(doctor ? `${doctor.first_name} ${doctor.last_name}` : 'Desconocido/a');
			setPatientName(patient ? `${patient.first_name} ${patient.last_name}` : 'Desconocido/a');
			setLoaded(true);
		}
  	}, [doctors, patients, doctorId, patientId]);

 	if (!loaded) return <div>Cargando...</div>;

	const printReceipt = () => {
		window.print();
	};

	const goToHistoryAppointment = () => {
		router.push('/appointment-history');
	};

	const goToAppointmentManagement = () => {
		router.push('/patient-appointment-management');
	}

	return (
		<PageLayout
			showImage={true}
			imageUrl="/receipt.png"
			title="Comprobante de Turno"
			showClock={true}
		>
			<Container>
				<Header>
					<Logo src="/login-logo.png" alt="Logo" />
					<Title>COMPROBANTE DE TURNO</Title>
					<Title>TURNO N° {appointmentId || '-'}</Title>
				</Header>
				<InfoSection>
					<InfoRow>
						<InfoTitle>Paciente: {patientName}</InfoTitle>
						<InfoTitle>Doctor: {doctorName}</InfoTitle>
						<InfoTitle>Especialidad: Clínica Médica</InfoTitle>
						<InfoTitle>Fecha: {dateFormatter(date) || '-'}</InfoTitle>
						<InfoTitle>Hora: {timeFormatter(time) || '-'}</InfoTitle>
					</InfoRow>
				</InfoSection>
			</Container>

			<ButtonContainer>
				<ActionButton onClick={printReceipt}>Imprimir Comprobante</ActionButton>
				<ActionButton onClick={goToHistoryAppointment}>Historial de Turnos</ActionButton>
				<ActionButton onClick={goToAppointmentManagement}>Ir a Gestión de Turnos</ActionButton>
			</ButtonContainer>
		</PageLayout>
	);
}
