'use client';

import PageLayout from '@/components/PageLayout';
import styled from '@emotion/styled';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from '@/app/theme';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchDoctorAgenda } from '@/api/services/availabilityService';
import {
	getAppointmentById,
	updateAppointment,
} from '@/api/services/appointmentService';
import useAuth from '@/hooks/useAuth';
import useDoctors from '@/hooks/useDoctors';
import {
	dateFormatter,
	timeFormatter,
} from '../../../../utils/dateTimeFormatter';
import ActionButton from '@/components/ActionButton';

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

const Input = styled.input`
	background-color: ${theme.colors.lightText};
	color: ${theme.colors.darkGreen};
	padding: 10px;
	font-size: 16px;
	border-radius: 8px;
	border: 1px solid #ccc;
`;

const Select = styled.select`
	background-color: ${theme.colors.lightText};
	color: ${theme.colors.darkGreen};
	padding: 10px;
	font-size: 16px;
	border-radius: 8px;
	border: 1px solid #ccc;
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;
	margin-top: 20px;
	flex-wrap: wrap;
`;

export default function AppointmentDetail() {
	const { token, user } = useAuth();
	const router = useRouter();
	const params = useParams();
	const appointmentId = params.id;

	const { doctors, loading: loadingDoctors } = useDoctors(token);

	const [doctorId, setDoctorId] = useState('');
	const [patientId, setPatientId] = useState(null);
	const [patientData, setPatientData] = useState(null);
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [availableTimes, setAvailableTimes] = useState([]);
	const [availableDates, setAvailableDates] = useState([]);
	const [editable, setEditable] = useState(false);
	const [patientAssigned, setPatientAssigned] = useState(false);
	const [doctorAgenda, setDoctorAgenda] = useState({});
	const [appointmentStatus, setAppointmentStatus] = useState('');

	useEffect(() => {
		if (appointmentId) {
			fetchAppointmentDetails(appointmentId);
		}
	}, [appointmentId]);

	const fetchAppointmentDetails = async (id) => {
		try {
			const data = await getAppointmentById(id, token);

			setDate(data.date);
			setTime(data.time);
			setDoctorId(String(data.id_doctor));
			setAppointmentStatus(data.status);

			if (data.patient) {
				setPatientData(data.patient);
				setPatientId(data.id_patient);
				setPatientAssigned(true);
				setEditable(false);
			} else {
				setPatientData(null);
				setPatientAssigned(false);
			}
		} catch (error) {
			console.error(error);
			toast.error('Error al cargar los detalles del turno');
		}
	};

	const loadDoctorAgenda = async (doctorId, from, to) => {
		try {
			if (!doctorId || !from) return;

			const agendaResponse = await fetchDoctorAgenda(
				doctorId,
				from,
				to,
				token
			);
			const slots = agendaResponse.slots;

			const groupedByDate = slots.reduce((acc, slot) => {
				if (!acc[slot.date]) acc[slot.date] = [];
				acc[slot.date].push(slot);
				return acc;
			}, {});

			setDoctorAgenda(groupedByDate);

			const datesAvailable = Object.keys(groupedByDate).sort();

			setAvailableDates(datesAvailable);

			if (!datesAvailable.includes(date)) {
				setDate(datesAvailable[0] || '');
				setAvailableTimes(
					groupedByDate[datesAvailable[0]]?.map((s) => s.start_time) || []
				);
				setTime('');
			} else {
				setAvailableTimes(groupedByDate[date].map((s) => s.start_time));
			}
		} catch (error) {
			console.error('Error loading doctor agenda', error);
			setAvailableDates([]);
			setAvailableTimes([]);
			setDoctorAgenda({});
		}
	};

	const handleDoctorChange = async (value) => {
		setDoctorId(value);

		setDate('');
		setTime('');
		setAvailableTimes([]);
		setAvailableDates([]);
		setDoctorAgenda({});

		if (value) {
			const fromDate = new Date().toISOString().slice(0, 10);
			const toDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
				.toISOString()
				.slice(0, 10);

			await loadDoctorAgenda(value, fromDate, toDate);
		}
	};

	const handleSubmit = async () => {
		if (!doctorId || !date || !time) {
			toast.warn('Por favor completa todos los campos');
			return;
		}
		try {
			await updateAppointment(
				appointmentId,
				{
					id_doctor: Number(doctorId),
					date,
					time,
				},
				token
			);
			toast.success(
				`El turno con ID ${appointmentId} fue modificado con éxito!`
			);
			setTimeout(() => {
				router.push(
					`/appointment-receipt?doctor=${doctorId}&date=${date}&time=${time}&id=${appointmentId}&patient=${patientId}`
				);
			}, 1500);
		} catch (error) {
			toast.error('Error al modificar el turno');
			console.error(error);
		}
	};

	const patientName = patientData
		? `${patientData.first_name ?? ''} ${patientData.last_name ?? ''}`.trim()
		: '';

	const isCanceled = appointmentStatus === 'canceled';
	const isDoctor = user?.id_user_type === 2;

	return (
		<PageLayout
			showImage={true}
			imageUrl="/calendar.png"
			title="Detalle del turno"
			showClock={true}
		>
			<FormContainer>
				<Label>ID del Turno</Label>
				<Input type="text" value={appointmentId} disabled={true} />

				<Label>Paciente</Label>
				<Input type="text" value={patientName} disabled />

				<Label>Médico/a</Label>
				<Select
					value={doctorId}
					onChange={(e) => handleDoctorChange(e.target.value)}
					disabled={!editable || loadingDoctors || isCanceled}
				>
					<option value="">Seleccione un/a médico/a</option>
					{doctors?.map((doc) => (
						<option key={doc.id_user} value={doc.id_user}>
							{doc.first_name} {doc.last_name}
						</option>
					))}
				</Select>

				<Label>Fecha</Label>

				<Select
					value={date}
					onChange={(e) => {
						const selectedDate = e.target.value;
						setDate(selectedDate);
						setTime('');
						if (doctorAgenda[selectedDate]) {
							setAvailableTimes(
								doctorAgenda[selectedDate].map(
									(slot) => slot.start_time
								)
							);
						} else {
							setAvailableTimes([]);
						}
					}}
					disabled={!doctorId || availableDates.length === 0 || isCanceled}
				>
					<option value="">{dateFormatter(date)}</option>
					{availableDates.map((fecha) => (
						<option key={fecha} value={fecha}>
							{fecha}
						</option>
					))}
				</Select>

				<Label>Horario</Label>
				<Select
					value={time}
					onChange={(e) => setTime(e.target.value)}
					disabled={
						!editable ||
						!date ||
						availableTimes.length === 0 ||
						isCanceled
					}
				>
					<option value="">{timeFormatter(time)}</option>
					{availableTimes.map((hora, index) => (
						<option key={index} value={hora}>
							{hora}
						</option>
					))}
				</Select>

				<ButtonGroup>
					{!editable ? (
						<ActionButton
							onClick={() => setEditable(true)}
							disabled={isCanceled || isDoctor}
						>
							Modificar
						</ActionButton>
					) : (
						<>
							<ActionButton onClick={handleSubmit} disabled={isCanceled}>
								Guardar Cambios
							</ActionButton>
							<ActionButton onClick={() => setEditable(false)}>
								Cancelar
							</ActionButton>
						</>
					)}
				</ButtonGroup>
			</FormContainer>
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
