'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { createAvailability } from '@/api/services/availabilityService';
import useAuth from '@/hooks/useAuth';
import ActionButton from '@/components/ActionButton';
import PageLayout from '@/components/PageLayout';
import theme from '@/app/theme';

const daysOptions = [
	{ label: 'Lunes', value: 'monday' },
	{ label: 'Martes', value: 'tuesday' },
	{ label: 'Miércoles', value: 'wednesday' },
	{ label: 'Jueves', value: 'thursday' },
	{ label: 'Viernes', value: 'friday' },
	{ label: 'Sábado', value: 'saturday' },
	{ label: 'Domingo', value: 'sunday' },
];

const Container = styled.div`
	max-width: 400px;
	margin: 40px auto;
	font-family: Mulish, sans-serif;
`;

const Label = styled.label`
	display: block;
	margin-top: 20px;
	font-weight: 600;
	color: ${theme.colors.darkGreen};
`;

const CheckboxGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	margin-top: 8px;
`;

const CheckboxLabel = styled.label`
	display: flex;
	align-items: center;
	gap: 6px;
`;

const Input = styled.input`
	color: ${theme.colors.darkGreen};
	background-color: ${theme.colors.lightText};
	padding: 6px 8px;
	margin-top: 8px;
	border-radius: 4px;
	border: 1px solid #ccc;
`;

const ActionButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	margin: 3em;
`;

export default function CreateAvailability() {
	const router = useRouter();
	const { token } = useAuth();

	const [daysOfWeek, setDaysOfWeek] = useState([]);
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const toggleDay = (day) => {
		setDaysOfWeek((prev) =>
			prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!token) {
			setError('No autorizado');
			return;
		}
		if (daysOfWeek.length === 0) {
			setError('Selecciona al menos un día');
			return;
		}
		if (!startTime || !endTime) {
			setError('Completa la hora de inicio y fin');
			return;
		}
		setLoading(true);
		setError(null);
		try {
			await createAvailability(
				{
					days_of_week: daysOfWeek,
					start_time: startTime,
					end_time: endTime,
				},
				token
			);
			toast.success('Disponibilidad creada correctamente');
			setTimeout(() => router.push('/doctor-home'), 1500);
		} catch (e) {
			toast.error('Error al crear no disponibilidad');
		} finally {
			setLoading(false);
		}
	};

	return (
		<PageLayout
			showImage={true}
			imageUrl="/icono_calendario.svg"
			title="Gestión de Agenda Semanal"
			showClock={true}
		>
			<Container>
				<h2>Crear Disponibilidad</h2>
				<form onSubmit={handleSubmit}>
					<Label>Días de la semana</Label>
					<CheckboxGroup>
						{daysOptions.map(({ label, value }) => (
							<CheckboxLabel key={value}>
								<input
									type="checkbox"
									value={value}
									checked={daysOfWeek.includes(value)}
									onChange={() => toggleDay(value)}
								/>
								{label}
							</CheckboxLabel>
						))}
					</CheckboxGroup>

					<Label>Hora de inicio</Label>
					<Input
						type="time"
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
						required
					/>

					<Label>Hora de fin</Label>
					<Input
						type="time"
						value={endTime}
						onChange={(e) => setEndTime(e.target.value)}
						required
					/>

					{error && <p style={{ color: 'red' }}>{error}</p>}
					<ActionButtonContainer>
						<ActionButton type="submit" disabled={loading}>
							{loading ? 'Guardando...' : 'Guardar disponibilidad'}
						</ActionButton>
					</ActionButtonContainer>
				</form>
			</Container>
			<ToastContainer position="top-right" autoClose={3000} />
		</PageLayout>
	);
}
