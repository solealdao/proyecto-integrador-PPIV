'use client';

import PageLayout from '@/components/PageLayout';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  margin: 40px auto;
`;

const Label = styled.label`
  font-weight: bold;
  color: ${theme.colors.darkGreen};
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
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

const DateInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export default function EditarTurno() {
  const [idTurno, setIdTurno] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [medico, setMedico] = useState('');
  const [fecha, setFecha] = useState('');
  const [horario, setHorario] = useState('');
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);

  const router = useRouter();

  const handleModificarClick = () => {
    if (idTurno.trim() === '') {
      alert('Por favor, ingrese el ID del turno');
      return;
    }
    setMostrarFormulario(true);
  };

  const handleMedicoChange = (value) => {
    setMedico(value);

    // Simulación carga de horarios disponibles según el médico
    if (value === '1') {
      setHorariosDisponibles(['10:00', '11:30', '14:00']);
    } else if (value === '2') {
      setHorariosDisponibles(['09:00', '13:30', '16:00']);
    } else {
      setHorariosDisponibles([]);
    }
  };

  const handleSubmit = () => {
    if (!medico || !fecha || !horario) {
      alert('Por favor, complete todos los campos');
      return;
    }

    // Acá iría la lógica de actualización (API o redirección)
    alert(`Turno ${idTurno} modificado con éxito`);
    router.push('/appointment-management');
  };

  return (
    <PageLayout 
    		showImage={true}
			imageUrl="/icono_calendario.svg"
			title="Modificar Turno"
			showClock={true}
    >
      
      <FormContainer>
        <Label>ID del Turno</Label>
        <Input
          type="text"
          value={idTurno}
          onChange={(e) => setIdTurno(e.target.value)}
        />

        <ButtonGroup>
            <Button onClick={handleModificarClick}>Modificar</Button>
            <Button onClick={() => router.push('/appointment-management')}>Cancelar</Button>
        </ButtonGroup>

        {mostrarFormulario && (
          <>
            <Label>Seleccionar médico</Label>
            <Select
              value={medico}
              onChange={(e) => handleMedicoChange(e.target.value)}
            >
              <option value="">Seleccione un médico</option>
              <option value="1">Dra. Valentina Gómez</option>
              <option value="2">Dr. Luis Fernández</option>
            </Select>

            <Label>Seleccionar fecha</Label>
            <DateInput
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />

            <Label>Seleccionar horario</Label>
            <Select
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
            >
              <option value="">Seleccione un horario</option>
              {horariosDisponibles.map((hora, index) => (
                <option key={index} value={hora}>
                  {hora}
                </option>
              ))}
            </Select>

            <ButtonGroup>
                <Button onClick={handleSubmit}>Guardar Cambios</Button>
            </ButtonGroup>
          </>
        )}
      </FormContainer>
    </PageLayout>
  );
}