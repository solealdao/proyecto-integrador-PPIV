'use client';

import PageLayout from '@/components/PageLayout';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useDoctors from '@/hooks/useDoctors';
import useAuth from '@/hooks/useAuth';
import Calendar from './componentes/Calendar';
import { createAppointment } from '@/api/services/appointmentService';

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
	const [showCalendar, setShowCalendar] = useState(false);
	const router = useRouter();
	const { token, user } = useAuth();

	const { doctors } = useDoctors(token);

	const handleSubmit = () => {
		if (doctor) {
			setShowCalendar(true);
		} else {
			alert('Por favor, seleccione un médico');
		}
	};

	const handleCreateAppointment = async (date, time) => {
		if (!date || !time) {
			alert('Fecha y hora son obligatorias');
			return;
		}
		try {
			const appointmentData = {
				date,
				time,
				id_doctor: doctor,
				id_patient: user.id_user,
			};

			await createAppointment(appointmentData, token);

			alert('Turno reservado con éxito');
			router.push('/appointment-management');
		} catch (error) {
			console.error(error);
			alert('Error al reservar turno');
		}
	};

	return (
		<PageLayout
			showImage={true}
			imageUrl="/icono_calendario.svg"
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
					<NextButton onClick={handleSubmit}>Siguiente</NextButton>
				</FormContainer>
			) : (
				<Calendar
					doctorId={doctor}
					onConfirm={(date, time) => handleCreateAppointment(date, time)}
				/>
			)}
		</PageLayout>
	);
}
