'use client';
import styled from '@emotion/styled';
import PageLayout from "@/components/PageLayout";
import theme from '../theme';
import HistorialTabla from '@/components/history-table';


// Sobrescribimos el título solo en esta página
const CustomHeaderTitle = styled.h1`
    position: absolute;
	top: 2em;
	left: 40%;
	font-size: 32px;
	color:${theme.colors.white};
	font-family: ${theme.fontFamily.secondary};
	
`;
export default function HistorialDeTurnos() {
	return (
		<PageLayout title={null} showClock showCalendarIcon>
			<CustomHeaderTitle>Historial de turnos</CustomHeaderTitle>
			<HistorialTabla />
		</PageLayout>
	);
}


