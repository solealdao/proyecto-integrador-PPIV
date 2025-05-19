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
    dia: 'Jueves',
    turno: '14/10/2021 08:00',
    paciente: 'Acosta Miguel Ángel',
    profesional: 'Alfaya Rodrigo',
    especialidad: 'Cardiología',
    os: 'GALENO',
    cobertura: 'IOMA',
    saldo: '',
    observaciones: '',
  },
  {
    dia: 'Jueves',
    turno: '14/10/2021 08:45',
    paciente: 'Camino Yolanda',
    profesional: 'Alfaya Rodrigo',
    especialidad: 'Cardiología',
    os: 'PARTICULAR',
    cobertura: 'PARTICULAR',
    saldo: '900',
    observaciones: '',
  },
 
];

export default function HistorialTabla() {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Día</Th>
          <Th>Turno</Th>
          <Th>Paciente</Th>
          <Th>Profesional/Estudio</Th>
          <Th>Especialidad</Th>
          <Th>OS-MP</Th>
          <Th>Cobertura</Th>
          <Th>Saldo</Th>
          <Th>Observaciones</Th>
        </tr>
      </thead>
      <tbody>
        {turnos.map((t, i) => (
          <Tr key={i} className={t.cobertura === 'PARTICULAR' ? 'highlight' : ''}>
            <Td>{t.dia}</Td>
            <Td>{t.turno}</Td>
            <Td>{t.paciente}</Td>
            <Td>{t.profesional}</Td>
            <Td>{t.especialidad}</Td>
            <Td>{t.os}</Td>
            <Td>{t.cobertura}</Td>
            <Td>{t.saldo}</Td>
            <Td>{t.observaciones}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
