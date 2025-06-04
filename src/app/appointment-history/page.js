'use client';

import PageLayout from '@/components/PageLayout';
import HistoryTable from '@/app/appointment-history/components/HistoryTable';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import {
	getAllAppointments,
	getMyAppointments,
} from '@/api/services/appointmentService';
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

export default function AppointmentHistory() {
	const router = useRouter();
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true);
	const { token, user } = useAuth();

	const cancelar = () => {
		router.back();
	};

	useEffect(() => {
		if (!user || !token) return;

		const fetchAppointments = async () => {
			try {
				let response;

				if (user?.id_user_type === 3) {
					response = await getAllAppointments(token);
				} else {
					response = await getMyAppointments(token);
				}

				setAppointments(response);
			} catch (error) {
				console.error('Error al obtener turnos:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchAppointments();
	}, [user, token]);

	return (
		<PageLayout
			showImage={true}
			imageUrl="/icono_calendario.svg"
			title="Gestión de Turnos"
			showClock={true}
		>
			{loading ? (
				<p>Cargando turnos...</p>
			) : (
				<HistoryTable appointments={appointments} />
			)}

			<ButtonContainer>
				<BackButton onClick={cancelar}>Volver</BackButton>
			</ButtonContainer>
		</PageLayout>
	);
}
