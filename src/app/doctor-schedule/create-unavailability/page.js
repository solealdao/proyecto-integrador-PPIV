'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { createUnavailability } from '@/api/services/availabilityService';
import useAuth from '@/hooks/useAuth';
import ActionButton from '@/components/ActionButton';
import PageLayout from '@/components/PageLayout';
import theme from '@/app/theme';

const Container = styled.div`
	max-width: 400px;
	margin: 40px auto;
	font-family: Mulish, sans-serif;
`;

const Label = styled.label`
	color: ${theme.colors.darkGreen};
	display: block;
	margin-top: 20px;
	font-weight: 600;
`;

const Input = styled.input`
	color: ${theme.colors.darkGreen};
	background-color: ${theme.colors.lightText};
	width: 100%;
	padding: 6px 8px;
	margin-top: 8px;
	border-radius: 4px;
	border: 1px solid ${theme.colors.darkGreen};
`;

const Textarea = styled.textarea`
	color: ${theme.colors.darkGreen};
	background-color: ${theme.colors.lightText};
	width: 100%;
	margin-top: 8px;
	padding: 6px 8px;
	border-radius: 4px;
	border: 1px solid ${theme.colors.darkGreen};
	resize: vertical;
`;

const ActionButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	margin: 3em;
`;

export default function CreateUnavailability() {
	const router = useRouter();
	const { token } = useAuth();

	const [exceptionDate, setExceptionDate] = useState('');
	const [reason, setReason] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!token) {
			setError('No autorizado');
			return;
		}
		if (!exceptionDate || !reason.trim()) {
			setError('Completa todos los campos');
			return;
		}
		setLoading(true);
		setError(null);
		try {
			await createUnavailability(
				{
					date: exceptionDate,
					reason: reason.trim(),
					is_available: false,
				},
				token
			);
			toast.success('No disponibilidad creada correctamente');
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
			imageUrl="/calendar.png"
			title="Gestión de Agenda Semanal"
			showClock={true}
		>
			<Container>
				<h2 style={{ textAlign: 'center' }}>Crear no disponibilidad</h2>
				<form onSubmit={handleSubmit}>
					<Label>Fecha de excepción</Label>
					<Input
						type="date"
						value={exceptionDate}
						onChange={(e) => setExceptionDate(e.target.value)}
						required
					/>

					<Label>Motivo</Label>
					<Textarea
						rows={4}
						value={reason}
						onChange={(e) => setReason(e.target.value)}
						required
					/>

					{error && <p style={{ color: 'red' }}>{error}</p>}
					<ActionButtonContainer>
						<ActionButton type="submit" disabled={loading}>
							{loading ? 'Guardando...' : 'Guardar No Disponibilidad'}
						</ActionButton>
					</ActionButtonContainer>
				</form>
			</Container>
			<ToastContainer position="top-right" autoClose={3000} />
		</PageLayout>
	);
}
