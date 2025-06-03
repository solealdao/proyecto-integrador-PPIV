'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSearchParams } from 'next/navigation';
import theme from '@/app/theme';
import PageLayout from '@/components/PageLayout';
import { useRouter } from 'next/navigation';

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 24px;
	margin-top: 40px;
`;

const Label = styled.label`
	font-family: Mulish, sans-serif;
	font-size: 18px;
	color: ${theme.colors.darkGreen};
`;

const StyledSelect = styled.select`
	padding: 10px;
	font-size: 16px;
	border-radius: 8px;
	width: 300px;
`;

const StyledDatePicker = styled(DatePicker)`
	padding: 10px;
	font-size: 16px;
	border-radius: 8px;
	width: 300px;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 24px;
	margin-top: 40px;
	flex-wrap: wrap;
`;

const Button = styled.button`
	padding: 12px 30px;
	background-color: ${theme.colors.green};
	color: ${theme.colors.yellow};
	border-radius: 12px;
	font-size: 16px;
	font-weight: bold;
	font-family: Mulish, sans-serif;
	border: none;
	cursor: pointer;

	&:hover {
		background-color: ${theme.colors.darkGreen};
	}
`;

function formatDate(date) {
	if (!date) return '';
	const d = new Date(date);
	return d.toISOString().split('T')[0];
}

export default function NuevoTurnoCalendario() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const medico = searchParams.get('medico');
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState('');

	const horariosDisponibles = [
		'09:00',
		'09:30',
		'10:00',
		'10:30',
		'11:00',
		'11:30',
		'12:00',
	];

	return (
		<PageLayout
			showImage={true}
			imageUrl="/icono_calendario.svg"
			title="Seleccionar día y horario"
			showClock={true}
		>
			<FormContainer>
				<Label>Médico: {medico}</Label>
				<Label>Seleccionar fecha:</Label>
				<StyledDatePicker
					selected={selectedDate}
					onChange={(date) => setSelectedDate(date)}
					dateFormat="dd/MM/yyyy"
					minDate={new Date()}
					placeholderText="-- Elija una fecha --"
				/>

				<Label>Seleccionar horario:</Label>
				<StyledSelect
					value={selectedTime}
					onChange={(e) => setSelectedTime(e.target.value)}
				>
					<option value="">-- Seleccione un horario --</option>
					{horariosDisponibles.map((hora) => (
						<option key={hora} value={hora}>
							{hora}
						</option>
					))}
				</StyledSelect>
			</FormContainer>

			<ButtonContainer>
				{medico && selectedDate && selectedTime && (
					<Button
						onClick={() =>
							router.push(
								`/appointment-receipt?medico=${encodeURIComponent(
									medico
								)}&fecha=${formatDate(
									selectedDate
								)}&hora=${selectedTime}`
							)
						}
					>
						Confirmar Turno
					</Button>
				)}
			</ButtonContainer>
		</PageLayout>
	);
}
