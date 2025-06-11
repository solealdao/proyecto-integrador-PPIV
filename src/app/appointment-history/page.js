'use client';

import styled from '@emotion/styled';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageLayout from '@/components/PageLayout';
import HistoryTable from '@/app/appointment-history/components/HistoryTable';
import {
	cancelAppointment,
	getAllAppointments,
	getAppointmentsByDoctor,
	getMyAppointments,
} from '@/api/services/appointmentService';
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ActionButton from '@/components/ActionButton';

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	margin: 4em;
`;

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const ModalCard = styled.div`
	background-color: white;
	padding: 2rem;
	border-radius: 1rem;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	max-width: 400px;
	width: 100%;
	text-align: center;
`;

const ModalMessage = styled.p`
	font-size: 1.1rem;
	margin-bottom: 1.5rem;
	color: #333;
`;

const ModalButton = styled.button`
	background-color: ${(props) => (props.cancel ? '#ccc' : '#e53935')};
	color: white;
	border: none;
	border-radius: 8px;
	padding: 0.7rem 1.5rem;
	margin: 0 0.5rem;
	cursor: pointer;
	font-weight: bold;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${(props) => (props.cancel ? '#b0b0b0' : '#c62828')};
	}
`;

export default function AppointmentHistory() {
	const router = useRouter();
	const { token, user } = useAuth();

	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [appointmentToDelete, setAppointmentToDelete] = useState(null);

	const fetchAppointments = async () => {
		if (!user || !token) return;
		setLoading(true);
		try {
			let response;

			if (user?.id_user_type === 3) {
				response = await getAllAppointments(token);
			} else if (user?.id_user_type === 2) {
				response = await getAppointmentsByDoctor(user.id_user, token);
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

	useEffect(() => {
		fetchAppointments();
	}, [user, token]);

	const openConfirmModal = (id) => {
		setAppointmentToDelete(id);
		setShowConfirmModal(true);
	};

	const handleConfirmDelete = async () => {
		if (!token || !appointmentToDelete) return;

		try {
			await cancelAppointment(appointmentToDelete, token);
			setAppointments((prev) =>
				prev.filter((appt) => appt.id_appointment !== appointmentToDelete)
			);
			toast.success('Turno cancelado exitosamente.');
			await fetchAppointments();
		} catch (err) {
			console.error('Error al cancelar turno:', err);
			toast.error('Hubo un error al intentar cancelar el turno.');
		} finally {
			setShowConfirmModal(false);
			setAppointmentToDelete(null);
		}
	};
	const handleCancelDelete = () => {
		setShowConfirmModal(false);
		setAppointmentToDelete(null);
	};

	const goToAppointmentManagement = () => {
		if (user?.id_user_type === 3) {
			router.push('/admin-appointment-management');
		} else if (user?.id_user_type === 2) {
			router.push('/doctor-home');
		} else {
			router.push('/patient-appointment-management');
		}
	};

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
				<HistoryTable
					appointments={appointments}
					onDelete={openConfirmModal}
					isDoctor={user?.id_user_type === 2}
					isPatient={user?.id_user_type === 1}
				/>
			)}
			<ButtonContainer>
				<ActionButton onClick={goToAppointmentManagement}>
					Volver
				</ActionButton>
			</ButtonContainer>
			{showConfirmModal && (
				<ModalOverlay>
					<ModalCard>
						<ModalMessage>
							¿Estás seguro de que deseas cancelar este turno?
						</ModalMessage>
						<ModalButton onClick={handleConfirmDelete}>
							Confirmar
						</ModalButton>
						<ModalButton cancel onClick={handleCancelDelete}>
							Cancelar
						</ModalButton>
					</ModalCard>
				</ModalOverlay>
			)}
			<ToastContainer position="top-right" autoClose={3000} />
		</PageLayout>
	);
}
