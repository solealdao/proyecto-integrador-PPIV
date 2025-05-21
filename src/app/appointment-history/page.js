'use client';

import PageLayout from '@/components/PageLayout';
import HistorialTabla from '@/components/history-table';
import { useSearchParams } from 'next/navigation';
import styled from '@emotion/styled';
import theme from '@/app/theme';


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

export default function HistorialDeTurnos() {
	const searchParams = useSearchParams();
	const cancelar = () => {
		window.location.href = '/appointment-management';
	};
	return (
		<PageLayout
			showImage={true}
			imageUrl="/icono_calendario.svg"
			title="Gestión de Turnos"
			showClock={true}
		>
		<HistorialTabla />
		<ButtonContainer>
					<BackButton onClick={cancelar}>Volver</BackButton>
		</ButtonContainer>
		</PageLayout>
	);
}
