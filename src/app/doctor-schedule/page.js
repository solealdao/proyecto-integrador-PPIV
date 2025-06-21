'use client';

import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import PageLayout from '@/components/PageLayout';
import theme from '@/app/theme';
import { useRouter } from 'next/navigation';
import { fetchDoctorAgenda } from '@/api/services/availabilityService';
import useAuth from '@/hooks/useAuth';
import ActionButton from '@/components/ActionButton';

const Container = styled.div`
	max-width: 900px;
	margin: 20px auto;
`;

const WeekView = styled.div`
	overflow-x: auto;
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	text-align: center;
	font-family: Mulish, sans-serif;
	th,
	td {
		padding: 8px;
		border: 1px solid #ccc;
	}
	th {
		color: ${theme.colors.darkGreen};
		background-color: ${theme.colors.lightText};
	}
`;

const Cell = styled.td`
	background-color: ${(props) =>
		props.unavailable
			? '#f8d7da'
			: props.booked
			? '#b39ddb'
			: props.available
			? '#a5d6a7'
			: 'transparent'};
`;

const ColorBox = styled.div`
	width: 18px;
	height: 18px;
	border-radius: 4px;
	background-color: ${(props) => props.color};
	border: 1px solid #999;
`;

const Legend = styled.div`
	margin-top: 16px;
	display: flex;
	justify-content: center;
	gap: 20px;
	font-family: Mulish, sans-serif;
	font-size: 14px;
	color: ${theme.colors.darkGreen};
`;

const LegendItem = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
`;

const Navigation = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;
	margin-bottom: 20px;

	button {
		background-color: ${theme.colors.darkGreen};
		color: white;
		border: none;
		padding: 8px 16px;
		border-radius: 4px;
		cursor: pointer;
		font-family: Mulish, sans-serif;

		&:hover {
			background-color: ${theme.colors.green};
		}
	}
`;

const ActionButtonsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const hours = Array.from({ length: 13 }, (_, i) => `${7 + i}:00`);

function getStartOfWeek(date) {
	const day = date.getDay();
	const diff = date.getDate() - day + (day === 0 ? -6 : 1);
	return new Date(date.getFullYear(), date.getMonth(), diff);
}

function formatDate(date) {
	return date.toISOString().split('T')[0];
}

export default function DoctorAgenda() {
	const [weekStart, setWeekStart] = useState(null);
	const [hydrated, setHydrated] = useState(false);
	const [slots, setSlots] = useState([]);
	const [unavailabilities, setUnavailabilities] = useState([]);
	const router = useRouter();
	const { token, user } = useAuth();

	useEffect(() => {
		setWeekStart(getStartOfWeek(new Date()));
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (!user || !token || !weekStart) {
			return;
		}

		const fetchData = async () => {
			try {
				const doctorId = user.id_user;
				const from = formatDate(weekStart);
				// const to = formatDate(new Date(weekStart.getTime() + 4 * 86400000));
				const to = formatDate(
					new Date(weekStart.getFullYear(), weekStart.getMonth() + 1, 0)
				);

				const data = await fetchDoctorAgenda(doctorId, from, to, token);
				setSlots(data.slots || []);
				setUnavailabilities(data.unavailabilities || []);
			} catch (error) {
				console.error('Error al obtener la agenda del doctor:', error);
			}
		};

		fetchData();
	}, [user, token, weekStart]);

	const daysOfWeek = useMemo(() => {
		if (!weekStart) return [];
		return Array.from({ length: 7 }, (_, i) => {
			const date = new Date(weekStart);
			date.setDate(date.getDate() + i);
			return date;
		});
	}, [weekStart]);

	const groupedSlots = slots.reduce((acc, slot) => {
		if (!acc[slot.date]) acc[slot.date] = [];
		acc[slot.date].push(slot);
		return acc;
	}, {});

	const unavailableDates = new Set(
		unavailabilities.map((u) => u.exception_date)
	);

	const handleLoadAvailability = () => {
		router.push('/doctor-schedule/create-availability');
	};

	const handleLoadUnavailability = () => {
		router.push('/doctor-schedule/create-unavailability');
	};

	if (!hydrated) return null;

	return (
		<PageLayout
			showImage={true}
			imageUrl="/calendar.png"
			title="Gestión de Agenda Semanal"
			showClock={true}
		>
			<Container>
				<Navigation>
					<button
						onClick={() =>
							setWeekStart(new Date(weekStart.getTime() - 7 * 86400000))
						}
					>
						← Semana anterior
					</button>
					<button
						onClick={() =>
							setWeekStart(new Date(weekStart.getTime() + 7 * 86400000))
						}
					>
						Semana siguiente →
					</button>
				</Navigation>

				<WeekView>
					<Table>
						<thead>
							<tr>
								<th>Hora</th>
								{daysOfWeek.map((day) => (
									<th key={day.toDateString()}>
										{day.toLocaleDateString('es-AR', {
											weekday: 'short',
											day: '2-digit',
											month: '2-digit',
										})}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{hours.map((hour) => (
								<tr key={hour}>
									<td>{hour}</td>
									{daysOfWeek.map((day) => {
										const dateStr = formatDate(day);
										const isUnavailable =
											unavailableDates.has(dateStr);
										const slotForHour = groupedSlots[dateStr]?.find(
											(slot) =>
												slot.start_time.startsWith(
													hour.padStart(2, '0')
												)
										);
										const slotStatus = slotForHour?.status;

										return (
											<Cell
												key={dateStr + hour}
												available={slotStatus === 'available'}
												booked={slotStatus === 'booked'}
												unavailable={isUnavailable}
											/>
										);
									})}
								</tr>
							))}
						</tbody>
					</Table>
				</WeekView>

				<Legend>
					<LegendItem>
						<ColorBox color="#a5d6a7" />
						<span>Disponible</span>
					</LegendItem>
					<LegendItem>
						<ColorBox color="#b39ddb" />
						<span>Turno Reservado</span>
					</LegendItem>
					<LegendItem>
						<ColorBox color="#ef9a9a" />
						<span>Indisponible (vacaciones, licencia, etc.)</span>
					</LegendItem>
					<LegendItem>
						<ColorBox color="transparent" />
						<span>No Disponible</span>
					</LegendItem>
				</Legend>
			</Container>
			<ActionButtonsContainer>
				<ActionButton onClick={handleLoadAvailability}>
					Cargar Disponibilidad
				</ActionButton>
				<ActionButton onClick={handleLoadUnavailability}>
					Cargar No Disponibilidad
				</ActionButton>
			</ActionButtonsContainer>
		</PageLayout>
	);
}
