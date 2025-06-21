import theme from '@/app/theme';
import styled from '@emotion/styled';
import {
	dateFormatter,
	timeFormatter,
} from '../../../../utils/dateTimeFormatter';
import { Eye, FileText, Trash2, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

const columnWidths = [
	'100px', // Fecha
	'80px', // Hora
	'180px', // Paciente
	'180px', // Médico
	'120px', // Estado
	'80px', // Acciones
];

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	font-family: ${theme.fontFamily.additional};
	background-color: white;
	border-radius: 8px;
	overflow: hidden;
`;

const Th = styled.th`
	background-color: ${theme.colors.lightGray};
	color: ${theme.colors.black};
	padding: 10px;
	font-weight: bold;
	text-align: center;
	width: ${({ index }) => columnWidths[index]};
`;

const Td = styled.td`
	color: ${theme.colors.darkGreen};
	padding: 10px;
	border-bottom: 1px solid ${theme.colors.lightGray};
	text-align: center;
	width: ${({ index }) => columnWidths[index]};
`;

const Tr = styled.tr`
	&:nth-of-type(even) {
		background-color: #f2f2f2;
	}

	&.highlight {
		background-color: #caffc8;
	}
`;

const StatusTd = styled.td`
	font-weight: bold;
	color: ${theme.colors.lightText};
	padding: 10px;
	border-bottom: 1px solid ${theme.colors.lightGray};
	border-radius: 8px;
	text-transform: capitalize;
	text-align: center;

	background-color: ${({ status }) => {
		switch (status.toLowerCase()) {
			case 'confirmado':
				return '#4caf50';
			case 'pendiente':
				return '#2196f3';
			case 'cancelado':
				return '#f44336';
			default:
				return theme.colors.darkGreen;
		}
	}};
`;

const ViewButton = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;
	color: ${theme.colors.darkGreen};
	font-size: 18px;
	padding: 6px;

	&:hover {
		color: ${theme.colors.yellow};
	}
`;

const DeleteButton = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;
	color: red;
	font-size: 18px;
	padding: 6px;

	&:hover {
		color: darkred;
	}
	&:disabled {
		color: grey;
		cursor: not-allowed;
		opacity: 0.5;
		pointer-events: none;
	}
`;

export default function HistoryTable({
	appointments = [],
	onDelete,
	isDoctor = false,
	isPatient,
}) {
	const router = useRouter();

	if (!appointments.length) {
		return <p>No se encontraron turnos</p>;
	}

	return (
		<Table>
			<thead>
				<tr>
					{[
						'Fecha',
						'Hora',
						'Paciente',
						'Médico',
						'Estado',
						'Acciones',
					].map((title, idx) => (
						<Th key={title} index={idx}>
							{title}
						</Th>
					))}
				</tr>
			</thead>
			<tbody>
				{appointments.map((appt, i) => (
					<Tr key={appt.id_appointment || i}>
						<Td>{dateFormatter(appt.date)}</Td>
						<Td>{timeFormatter(appt.time)}</Td>
						<Td>{`${appt.patient?.first_name ?? '-'} ${
							appt.patient?.last_name ?? ''
						}`}</Td>
						<Td>{`${appt.doctor?.first_name ?? '-'} ${
							appt.doctor?.last_name ?? ''
						}`}</Td>
						<StatusTd status={appt.status}>{appt.status}</StatusTd>
						<Td>
							<ViewButton
								aria-label={`Ver detalles del turno ${appt.id_appointment}`}
								onClick={() =>
									router.push(
										`/appointment-detail/${appt.id_appointment}`
									)
								}
							>
								<Eye />
							</ViewButton>
							{!isDoctor && (
								<DeleteButton
									aria-label={`Cancelar turno ${appt.id_appointment}`}
									onClick={() => onDelete?.(appt.id_appointment)}
									disabled={appt.status.toLowerCase() === 'cancelado'}
								>
									<Trash2 />
								</DeleteButton>
							)}
							{isDoctor &&
								appt.status != 'cancelado' &&
								appt.status !== 'completo' && (
									<ViewButton
										aria-label={`Agregar notas al turno ${appt.id_appointment}`}
										onClick={() =>
											router.push(
												`/appointment-notes/${appt.id_appointment}`
											)
										}
									>
										<FileText />
									</ViewButton>
								)}
							{isPatient && appt.status.toLowerCase() === '' && (
								<ViewButton
									aria-label={`Hacer encuesta para turno ${appt.id_appointment}`}
									onClick={() =>
										router.push(`/survey/${appt.id_appointment}`)
									}
									title="Calificar turno"
								>
									<Star />
								</ViewButton>
							)}
						</Td>
					</Tr>
				))}
			</tbody>
		</Table>
	);
}
