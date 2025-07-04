'use client';

import PageLayout from '@/components/PageLayout';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useDoctors from '@/hooks/useDoctors';
import useAuth from '@/hooks/useAuth';
import Calendar from './componentes/Calendar';
import { createAppointment } from '@/api/services/appointmentService';
import usePatients from '@/hooks/usePatients';

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 100%;
	max-width: 500px;
	margin: 40px auto;
`;

const Label = styled.label`
	font-weight: bold;
	color: ${theme.colors.darkGreen};
`;

const Select = styled.select`
	padding: 10px;
	font-size: 16px;
	border-radius: 8px;
	border: 1px solid #ccc;
`;

const NextButton = styled.button`
	padding: 15px;
	background-color: ${theme.colors.green};
	color: ${theme.colors.yellow};
	border-radius: 12px;
	font-size: 20px;
	font-weight: bold;
	font-family: Mulish, sans-serif;
	border: none;
	margin-top: 20px;
	width: fit-content;
	cursor: pointer;
	align-self: flex-end;

	&:hover {
		background-color: ${theme.colors.darkGreen};
	}
`;

export default function NewAppointment() {
	const [doctor, setDoctor] = useState('');
	const [selectedPatient, setSelectedPatient] = useState('');
	const [showCalendar, setShowCalendar] = useState(false);
	const router = useRouter();
	const { token, user } = useAuth();

	const { doctors } = useDoctors(token);
	const { patients } = usePatients(token);

	const isAdmin = user?.id_user_type === 3;

	const handleSubmit = () => {
		if (!doctor) {
			toast.warn('Por favor, seleccione un médico');
			return;
		}

		if (isAdmin && !selectedPatient) {
			toast.warn('Por favor, seleccione un paciente');
			return;
		}
		setShowCalendar(true);
	};

	const handleCreateAppointment = async (date, time) => {
		if (!date || !time) {
			toast.error('Fecha y hora son obligatorias');
			return;
		}
		const id_patient = isAdmin ? selectedPatient : user.id_user;
		try {
			const appointmentData = {
				date,
				time,
				id_doctor: doctor,
				id_patient,
			};

		const createdAppointment = await createAppointment(appointmentData, token);

		toast.success('Turno reservado con éxito');

		setTimeout(() => {
			router.push(
				`/appointment-receipt?doctor=${doctor}&date=${date}&time=${time}&id=${createdAppointment.id_appointment}&patient=${id_patient}`
			);
		}, 2000);
		
	} catch (error) {
			console.error(error);
			const message =
				error?.response?.data?.message || 'Error al reservar turno';
			toast.error(message);
		}
	};

	return (
		<PageLayout
			showImage={true}
			imageUrl="/calendar.png"
			title="Gestión de Turnos"
			showClock={true}
		>
			{!showCalendar ? (
				<FormContainer>
					<Label>Seleccionar médico:</Label>
					<Select
						value={doctor}
						onChange={(e) => setDoctor(e.target.value)}
					>
						<option value="">Seleccione un médico</option>
						{doctors.map((doc) => (
							<option key={doc.id_user} value={doc.id_user}>
								{doc.first_name} {doc.last_name}
							</option>
						))}
					</Select>

					{isAdmin && (
						<>
							<Label>Seleccionar paciente:</Label>
							<Select
								value={selectedPatient}
								onChange={(e) => setSelectedPatient(e.target.value)}
							>
								<option value="">Seleccione un paciente</option>
								{patients.map((pat) => (
									<option key={pat.id_user} value={pat.id_user}>
										{pat.first_name} {pat.last_name}
									</option>
								))}
							</Select>
						</>
					)}

					<NextButton onClick={handleSubmit}>Siguiente</NextButton>
				</FormContainer>
			) : (
				<Calendar
					doctorId={doctor}
					onConfirm={(date, time) => handleCreateAppointment(date, time)}
				/>
			)}
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				closeOnClick
				pauseOnHover
				draggable
			/>
		</PageLayout>
	);
}
