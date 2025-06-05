'use client';

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchDoctorAgenda } from '@/api/services/availabilityService';
import useAuth from '@/hooks/useAuth';
import {
	dateFormatter,
	timeFormatter,
} from '../../../../utils/dateTimeFormatter';

const CalendarContainer = styled.div`
	max-width: 600px;
	margin: 40px auto;
	padding: 0 20px;
`;

const DateButton = styled.button`
	margin: 5px;
	padding: 10px;
	background-color: ${({ selected }) =>
		selected ? theme.colors.green : '#eee'};
	border: none;
	border-radius: 8px;
	cursor: pointer;
`;

const SlotButton = styled.button`
	margin: 5px;
	padding: 10px;
	background-color: ${({ selected }) =>
		selected ? theme.colors.green : '#ddd'};
	border: none;
	border-radius: 8px;
	cursor: pointer;
`;

const ConfirmButton = styled.button`
	margin-top: 30px;
	padding: 15px;
	background-color: ${theme.colors.green};
	color: ${theme.colors.yellow};
	font-weight: bold;
	font-size: 18px;
	border: none;
	border-radius: 12px;
	cursor: pointer;

	&:hover {
		background-color: ${theme.colors.darkGreen};
	}
`;

export default function Calendar({ doctorId, onConfirm }) {
	const { token } = useAuth();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [agenda, setAgenda] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedSlot, setSelectedSlot] = useState(null);

	useEffect(() => {
		if (!doctorId) return;

		setLoading(true);
		setError(null);

		const from = new Date();
		const to = new Date();
		to.setDate(to.getDate() + 7);

		const fromStr = from.toISOString().split('T')[0];
		const toStr = to.toISOString().split('T')[0];

		fetchDoctorAgenda(doctorId, fromStr, toStr, token)
			.then((res) => {
				const groupedByDate = res.slots.reduce((acc, slot) => {
					if (slot.status !== 'available') return acc;

					if (!acc[slot.date]) {
						acc[slot.date] = {
							date: slot.date,
							slots: [],
						};
					}
					acc[slot.date].slots.push(slot);
					return acc;
				}, {});

				const agendaFormatted = Object.values(groupedByDate);
				setAgenda(agendaFormatted);

				if (agendaFormatted.length > 0)
					setSelectedDate(agendaFormatted[0].date);
			})
			.catch(() => setError('Error al cargar la agenda'))
			.finally(() => setLoading(false));
	}, [doctorId, token]);

	if (loading) return <p>Cargando agenda...</p>;
	if (error) return <p>{error}</p>;

	const currentDay = agenda.find((d) => d.date === selectedDate);

	const handleConfirm = () => {
		if (!selectedDate || !selectedSlot) {
			toast.warning('Por favor, seleccioná fecha y horario.');
			return;
		}

		onConfirm(selectedDate, selectedSlot.start_time);
	};

	return (
		<CalendarContainer>
			<h2>Seleccione fecha</h2>
			<div>
				{agenda.map(({ date }) => (
					<DateButton
						key={date}
						selected={date === selectedDate}
						onClick={() => {
							setSelectedDate(date);
							setSelectedSlot(null);
						}}
					>
						{dateFormatter(date)}
					</DateButton>
				))}
			</div>

			<h3>Horarios disponibles para {selectedDate}</h3>
			<div>
				{currentDay?.slots?.length ? (
					currentDay.slots.map((slot) => (
						<SlotButton
							key={slot.start_time}
							selected={slot.start_time === selectedSlot?.start_time}
							onClick={() => setSelectedSlot(slot)}
						>
							{timeFormatter(slot.start_time)} -{' '}
							{timeFormatter(slot.end_time)}
						</SlotButton>
					))
				) : (
					<p>No hay horarios disponibles para esta fecha.</p>
				)}
			</div>

			<ConfirmButton onClick={handleConfirm}>Confirmar turno</ConfirmButton>
			<ToastContainer position="top-center" autoClose={3000} />
		</CalendarContainer>
	);
}
