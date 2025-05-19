import theme from '@/app/theme';
import styled from '@emotion/styled';

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
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${theme.colors.lightGray};
`;

const Tr = styled.tr`
  &:nth-of-type(even) {
    background-color: #f2f2f2;
  }

  &.highlight {
    background-color: #caffc8; /* Verde clarito */
  }
`;

const turnos = [
  {
    fecha:"14/10/25",
    hora: "08:00",
    paciente: 'Acosta Miguel Ángel',
    profesional: 'Alfaya Rodrigo',
    motivo:"Consulta",
    observaciones: 'Niguna',
  },
  {
    fecha:"15/10/25",
    hora: "09:00",
    paciente: 'Angelica Ana',
    profesional: 'Gomez Lorena',
    motivo:"Consulta Ginecologica",
    observaciones: '-----',
  },
  {
    fecha:"16/10/25",
    hora: "10:00",
    paciente: 'Lopez Juan',
    profesional: 'Cordero Maria',
    motivo:"Consulta General",
    observaciones: '-----',
  },
  {
    fecha:"17/10/25",
    hora: "10:00",
    paciente: 'Lopez Juan',
    profesional: 'Cordero Maria',
    motivo:"Consulta estudios",
    observaciones: '-----',
  },
  {
    fecha:"18/10/25",
    hora: "11:00",
    paciente: 'Cosme Fulanito',
    profesional: 'Cordero Maria',
    motivo:"Consulta General",
    observaciones: 'Consulta para estudios de control',
  },
 
];

export default function HistorialTabla() {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Fecha</Th>
          <Th>Hora</Th>
          <Th>Paciente</Th>
          <Th>Medico</Th>
          <Th>Motivo</Th>
          <Th>Observaciones</Th>
        </tr>
      </thead>
      <tbody>
        {turnos.map((t, i) => (
          <Tr key={i} className={t.cobertura === 'PARTICULAR' ? 'highlight' : ''}>
            <Td>{t.fecha}</Td>
            <Td>{t.hora}</Td>
            <Td>{t.paciente}</Td>
            <Td>{t.profesional}</Td>
            <Td>{t.motivo}</Td>
            <Td>{t.observaciones}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
