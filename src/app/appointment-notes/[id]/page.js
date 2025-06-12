'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { completeAppointment } from '@/api/services/appointmentService';
import useAuth from '@/hooks/useAuth';
import ActionButton from '@/components/ActionButton';
import PageLayout from '@/components/PageLayout';

const Container = styled.div`
	max-width: 600px;
	margin: 40px auto;
	padding: 20px;
	background-color: white;
	border-radius: 12px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
	color: ${theme.colors.darkGreen};
	margin-bottom: 20px;
	text-align: center;
`;

const Label = styled.label`
	font-weight: bold;
	color: ${theme.colors.darkText};
	margin-bottom: 8px;
	display: block;
`;
const Textarea = styled.textarea`
	background-color: ${theme.colors.lightGray};
	width: 100%;
	height: 250px;
	padding: 12px;
	font-size: 16px;
	border-radius: 8px;
	border: 1px solid #ccc;
	resize: vertical;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	margin: 1em;
`;

export default function AppointmentNotesPage() {
	const { id } = useParams();
	const { token } = useAuth();
	const router = useRouter();
	const [notes, setNotes] = useState('');
	const [loading, setLoading] = useState(true);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const notesData = { notes };
			await completeAppointment(id, notesData, token);

			toast.success('Notas guardadas con éxito');
			setTimeout(() => {
				router.push('/appointment-history');
			}, 1500);
		} catch (err) {
			toast.error('Error al guardar las notas');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<PageLayout
			showImage={true}
			imageUrl="/icono_calendario.svg"
			title="Observaciones clínicas"
			showClock={true}
		>
			<Container>
				<Title>Notas del Turno #{id}</Title>
				<form onSubmit={handleSubmit}>
					<Label htmlFor="notes">Notas clínicas:</Label>
					<Textarea
						id="notes"
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						placeholder="Escribí aquí tus observaciones clínicas..."
					/>
					<ButtonContainer>
						<ActionButton type="submit">Guardar notas</ActionButton>
					</ButtonContainer>
				</form>
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					closeOnClick
					pauseOnHover
					draggable
				/>
			</Container>
		</PageLayout>
	);
}
