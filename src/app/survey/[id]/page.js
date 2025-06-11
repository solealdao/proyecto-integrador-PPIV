'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '@/hooks/useAuth';
import ActionButton from '@/components/ActionButton';
import PageLayout from '@/components/PageLayout';
import { submitSurvey } from '@/api/services/surveyService';

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
	height: 150px;
	padding: 12px;
	font-size: 16px;
	border-radius: 8px;
	border: 1px solid #ccc;
	resize: vertical;
`;

const RadioGroup = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
	margin: 16px 0;
`;

const RadioLabel = styled.label`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: bold;
	color: ${theme.colors.darkGreen};
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 1.5em;
`;

export default function SurveyPage() {
	const { id } = useParams();
	const router = useRouter();
	const { token } = useAuth();

	const [rating, setRating] = useState(null);
	const [comment, setComment] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!rating) {
			toast.error('Por favor seleccioná una calificación');
			return;
		}

		setLoading(true);

		const surveyData = {
			rating: parseInt(rating),
			comment,
			submitted_at: new Date().toISOString(),
			idAppointment: parseInt(id),
		};

		try {
			await submitSurvey(parseInt(id), surveyData, token);
			toast.success('Encuesta enviada con éxito');
			setTimeout(() => router.push('/appointment-history'), 1500);
		} catch (error) {
			console.error(error);
			toast.error('Error al enviar la encuesta');
		} finally {
			setLoading(false);
		}
	};

	return (
		<PageLayout
			showImage={true}
			imageUrl="/icono_calendario.svg"
			title="Calificar turno"
			showClock={true}
		>
			<Container>
				<Title>Encuesta de satisfacción</Title>
				<form onSubmit={handleSubmit}>
					<Label>¿Cómo calificarías el turno?</Label>
					<RadioGroup>
						{[1, 2, 3, 4, 5].map((value) => (
							<RadioLabel key={value}>
								<input
									type="radio"
									name="rating"
									value={value}
									checked={+rating === value}
									onChange={(e) => setRating(e.target.value)}
								/>
								{value}
							</RadioLabel>
						))}
					</RadioGroup>

					<Label htmlFor="comment">Comentario (opcional):</Label>
					<Textarea
						id="comment"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder="Dejanos tus comentarios sobre la atención..."
					/>

					<ButtonContainer>
						<ActionButton type="submit" disabled={loading}>
							Enviar encuesta
						</ActionButton>
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
