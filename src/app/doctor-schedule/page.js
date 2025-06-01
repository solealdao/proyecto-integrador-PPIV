'use client';

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PageLayout from '@/components/PageLayout';
import theme from '@/app/theme';
import { useRouter } from 'next/navigation';
import { fetchDoctorAgenda } from '@/api/services/availabilityService';
import useAuth from '@/hooks/useAuth';

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

const ActionButtons = styled.div`
	display: flex;
	gap: 20px;
	margin: 20px 0;

	button {
		background-color: ${theme.colors.green};
		color: ${theme.colors.yellow};
		border: none;
		padding: 10px 20px;
		border-radius: 6px;
		cursor: pointer;
		font-family: Mulish, sans-serif;
		font-weight: 600;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: ${theme.colors.darkGreen};
		}
	}
`;

const hours = Array.from({ length: 13 }, (_, i) => `${7 + i}:00`);

function getStartOfWeek(date) {
	const day = date.getDay();
	const diff = date.getDate() - day + (day === 0 ? -6 : 1);
	return new Date(date.setDate(diff));
}

function getWeekDays(startDate) {
	const days = [];
	for (let i = 0; i < 5; i++) {
		const day = new Date(startDate);
		day.setDate(startDate.getDate() + i);
		days.push(day);
	}
	return days;
}

function formatDate(date) {
	return date.toISOString().split('T')[0];
}

export default function DoctorAgenda() {
	const [startOfWeek, setStartOfWeek] = useState(getStartOfWeek(new Date()));
	const [availabilityByDay, setAvailabilityByDay] = useState({
		slots: {},
		exceptionDates: [],
	});
	const router = useRouter();
	const { token } = useAuth();

	useEffect(
		() => {
			async function loadAvailability() {
				try {
					const from = formatDate(startOfWeek);
					const to = formatDate(
						new Date(startOfWeek.getTime() + 4 * 86400000)
					);
					const token = localStorage.getItem('token');

					const data = await fetchDoctorAgenda(8, from, to, token);

					const slots = mapAvailabilityToSlots(data.availabilities);
					const exceptionDates = data.exceptions.map(
						(e) => e.exception_date
					);
					setAvailabilityByDay({ slots, exceptionDates });
				} catch (error) {
					console.error('Error fetching availability:', error);
				}
			}

			if (token) {
				loadAvailability();
			}
		},
		[startOfWeek],
		token
	);

	function mapAvailabilityToSlots(data) {
		const availabilityMap = {};

		data.forEach(({ weekday, start_time, end_time }) => {
			const startHour = parseInt(start_time.split(':')[0], 10);
			const endHour = parseInt(end_time.split(':')[0], 10);

			if (!availabilityMap[weekday]) availabilityMap[weekday] = [];

			for (let hour = startHour; hour < endHour; hour++) {
				availabilityMap[weekday].push(`${hour}:00`);
			}
		});

		return availabilityMap;
	}

	const weekDays = getWeekDays(startOfWeek);

	const handleLoadAvailability = () => {
		router.push('#');
	};

	const handleLoadUnavailability = () => {
		router.push('#');
	};

	return (
		<PageLayout
			showImage={true}
			imageUrl="/icono_calendario.svg"
			title="Gestión de Agenda Semanal"
			showClock={true}
		>
			<Container>
				<Navigation>
					<button
						onClick={() =>
							setStartOfWeek(
								new Date(startOfWeek.getTime() - 7 * 86400000)
							)
						}
					>
						← Semana anterior
					</button>
					<button
						onClick={() =>
							setStartOfWeek(
								new Date(startOfWeek.getTime() + 7 * 86400000)
							)
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
								{weekDays.map((date) => {
									const dayName = date.toLocaleDateString('es-AR', {
										weekday: 'long',
									});
									const dayNum = date.toLocaleDateString('es-AR', {
										day: '2-digit',
										month: 'short',
									});
									return (
										<th key={date.toISOString()}>
											{`${
												dayName.charAt(0).toUpperCase() +
												dayName.slice(1)
											} ${dayNum}`}
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{hours.map((hour) => (
								<tr key={hour}>
									<td>{hour}</td>
									{weekDays.map((date) => {
										const weekday = date
											.toLocaleDateString('en-US', {
												weekday: 'long',
											})
											.toLowerCase();
										const dateStr = formatDate(date);

										const isException =
											availabilityByDay.exceptionDates?.includes(
												dateStr
											);
										const isAvailable =
											availabilityByDay.slots?.[weekday]?.includes(
												hour
											);

										let bgColor = 'transparent';
										if (isAvailable) bgColor = '#a5d6a7';
										if (isException) bgColor = '#ef9a9a';

										return (
											<td
												key={`${weekday}-${hour}`}
												style={{
													backgroundColor: bgColor,
													height: '40px',
												}}
											></td>
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
						<ColorBox color="#ef9a9a" />
						<span>Indisponible (vacaciones, licencia, etc.)</span>
					</LegendItem>
					<LegendItem>
						<ColorBox color="transparent" />
						<span>No disponible</span>
					</LegendItem>
				</Legend>
			</Container>
			<ActionButtonsContainer>
				<ActionButtons>
					<button onClick={handleLoadAvailability}>
						Cargar disponibilidad
					</button>
					<button onClick={handleLoadUnavailability}>
						Cargar no disponibilidad
					</button>
				</ActionButtons>
			</ActionButtonsContainer>
		</PageLayout>
	);
}
