import styled from '@emotion/styled';
import theme from '@/app/theme';

const DoctorTable = styled.table`
	width: 100%;
	border-collapse: collapse;
`;

const TableHeader = styled.th`
	background-color: ${theme.colors.lightGreen};
	color: ${theme.colors.darkGreen};
	padding: 10px;
	text-align: left;
	border: 1px solid #ccc;
`;

const TableCell = styled.td`
	padding: 10px;
	border: 1px solid #ccc;
`;

export default function DoctorStatsTable({ doctorStats }) {
	if (!doctorStats || doctorStats.length === 0) return null;

	return (
		<>
			<h2
				style={{
					fontFamily: 'Mulish, sans-serif',
					color: theme.colors.darkGreen,
					marginBottom: '16px',
				}}
			>
				Puntaje promedio por médico
			</h2>
			<DoctorTable>
				<thead>
					<tr>
						<TableHeader>Médico</TableHeader>
						<TableHeader>Cantidad de encuestas</TableHeader>
						<TableHeader>Puntaje promedio</TableHeader>
					</tr>
				</thead>
				<tbody>
					{doctorStats.map((doc, idx) => (
						<tr key={idx}>
							<TableCell>{doc.name}</TableCell>
							<TableCell>{doc.count}</TableCell>
							<TableCell>{doc.averageScore.toFixed(1)} / 5</TableCell>
						</tr>
					))}
				</tbody>
			</DoctorTable>
		</>
	);
}
