'use client';

import PageLayout from '@/components/PageLayout';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import { useRouter } from 'next/navigation';
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
	margin: 4em;
	display: flex;
	justify-content: center;
`;

export default function AppointmentReceiptPage({ searchParams }) {
	const { token } = useAuth();
	const router = useRouter();

	const doctorId = Number(searchParams?.doctor);
	const patientId = Number(searchParams?.patient);
	const date = searchParams?.date;
	const time = searchParams?.time;
	const appointmentId = searchParams?.id;

	const { doctors } = useDoctors(token);
	const { patients } = usePatients(token);

	const [doctorName, setDoctorName] = useState('');
	const [patientName, setPatientName] = useState('');

	useEffect(() => {
		if (doctors?.length > 0) {
			const doctor = doctors.find((d) => d.id_user === doctorId);
			setDoctorName(
				doctor
					? `${doctor.first_name} ${doctor.last_name}`
					: 'Desconocido/a'
			);
		}
	}, [doctors, doctorId]);

	useEffect(() => {
		if (patients?.length > 0) {
			const patient = patients.find((p) => p.id_user === patientId);
			setPatientName(
				patient
					? `${patient.first_name} ${patient.last_name}`
					: 'Desconocido/a'
			);
		}
	}, [patients, patientId]);

	const printReceipt = () => {
		window.print();
	};

	const goToHistoryAppointment = () => {
		router.push('/appointment-history');
	};

	return (
		<PageLayout title="Comprobante de turno" showClock>
			<Container>
				<Header>
					<Logo src="/logo.png" alt="Logo" />
					<Title>Nueva Clinica</Title>
					<Title>ID: {appointmentId || '-'}</Title>
				</Header>

				<InfoRow>
					<InfoTitle>Paciente: {patientName}</InfoTitle>
				</InfoRow>
				<InfoRow>
					<InfoTitle>Doctor: {doctorName}</InfoTitle>
				</InfoRow>
				<InfoRow>
					<InfoTitle>Date: {dateFormatter(date) || '-'}</InfoTitle>
					<InfoTitle>Time: {timeFormatter(time) || '-'}</InfoTitle>
					<InfoTitle>Especialidad: Clínica Médica</InfoTitle>
				</InfoRow>
			</Container>

			<ButtonContainer>
				<ActionButton onClick={printReceipt}>
					Imprimir comprobante
				</ActionButton>
				<ActionButton onClick={goToHistoryAppointment}>Volver</ActionButton>
			</ButtonContainer>
		</PageLayout>
	);
}
