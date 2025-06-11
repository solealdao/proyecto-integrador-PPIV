'use client';

import styled from '@emotion/styled';
import {
	PieChart,
	Pie,
	Cell,
	Legend,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import PageLayout from '@/components/PageLayout';
import theme from '@/app/theme';
import { useEffect, useState } from 'react';
import { getSurveysByDoctor } from '@/api/services/surveyService';
import useAuth from '@/hooks/useAuth';
import DoctorStatsTable from './components/DoctorStatsTable';

const Container = styled.div`
	max-width: 900px;
	margin: 40px auto;
	padding-bottom: 180px;
`;

const Section = styled.div`
	margin-bottom: 40px;
`;

const Title = styled.h2`
	font-family: Mulish, sans-serif;
	color: ${theme.colors.darkGreen};
	margin-bottom: 16px;
`;

const Score = styled.div`
	font-size: 48px;
	font-weight: bold;
	color: ${theme.colors.green};
	text-align: center;
	margin: 20px 0;
`;

const CommentBox = styled.div`
	color: ${theme.colors.darkGreen};
	background: ${theme.colors.white};
	border-radius: 8px;
	padding: 16px;
	margin-bottom: 12px;
`;

const COLORS = ['#66bb6a', '#ffee58', '#ffa726', '#ef5350'];

export default function AdminStats() {
	const [doctorsData, setDoctorsData] = useState([]);
	const [surveys, setSurveys] = useState([]);
	const [loading, setLoading] = useState(true);

	const { token } = useAuth();

	useEffect(() => {
		async function fetchSurveys() {
			try {
				const data = await getSurveysByDoctor(token);

				const allSurveys = data.doctors?.flatMap((d) => d.surveys) || [];

				setSurveys(allSurveys);
				setDoctorsData(data.doctors || []);
			} catch (error) {
				console.error('Error fetching surveys:', error);
			} finally {
				setLoading(false);
			}
		}
		fetchSurveys();
	}, [token]);

	const ratingCounts = [1, 2, 3, 4, 5].map((rating) => ({
		name:
			rating === 5
				? 'Excelente'
				: rating === 4
				? 'Buena'
				: rating === 3
				? 'Regular'
				: rating === 2
				? 'Mala'
				: 'Muy Mala',
		value: surveys.filter((s) => s.rating === rating).length,
	}));

	const doctorStats = doctorsData.map((doctor) => {
		const ratings = doctor.surveys.map((s) => s.rating);
		const average =
			ratings.length > 0
				? ratings.reduce((acc, r) => acc + r, 0) / ratings.length
				: 0;
		return {
			name: `${doctor.doctor.first_name} ${doctor.doctor.last_name}`,
			averageScore: average,
			count: ratings.length,
		};
	});

	const averageScore =
		surveys.length > 0
			? surveys.reduce((acc, curr) => acc + curr.rating, 0) / surveys.length
			: 0;

	// Extraer comentarios recientes (por ejemplo los últimos 5)
	const comments = surveys
		.slice()
		.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
		.slice(0, 5)
		.map((s) => s.comment);

	if (loading) return <div>Cargando estadísticas...</div>;

	return (
		<PageLayout
			showImage={true}
			imageUrl="/bar-chart.png"
			title="Ver Estadísticas"
			showClock={true}
		>
			<Container>
				<Section>
					<Title>Puntuación Promedio</Title>
					<Score>{averageScore.toFixed(1)} / 5</Score>
				</Section>

				<Section>
					<Title>Resultados de la Encuesta</Title>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={ratingCounts}
								cx="50%"
								cy="50%"
								labelLine={false}
								label={({ name, percent }) =>
									`${name} ${(percent * 100).toFixed(0)}%`
								}
								outerRadius={100}
								dataKey="value"
							>
								{ratingCounts.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</Section>

				<Section>
					<Title>Comentarios recientes</Title>
					{comments.length > 0 ? (
						comments.map((text, idx) => (
							<CommentBox key={idx}>{text}</CommentBox>
						))
					) : (
						<p>No hay comentarios aún.</p>
					)}
				</Section>

				{doctorStats && doctorStats.length > 0 && (
					<Section>
						<DoctorStatsTable doctorStats={doctorStats} />
					</Section>
				)}
			</Container>
		</PageLayout>
	);
}
