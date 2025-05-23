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
  padding: 12px;
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

export default function ConsultarTurno() {
  const [turnoId, setTurnoId] = useState('');
  const router = useRouter();

  const handleConsultar = () => {
    if (turnoId.trim() !== '') {
      router.push(`/appointments/receipt?id=${turnoId}`);
    } else {
      alert('Por favor, ingrese un ID válido.');
    }
  };

  const handleCancelar = () => {
    router.push('/appointment-management');
  };

  return (
    <PageLayout 
    	showImage={true}
			imageUrl="/icono_calendario.svg"
			title="Consultar Turno"
			showClock={true}
    >

        <FormContainer>
            <Label htmlFor="turnoId">Ingrese el ID del turno a consultar:</Label>
            <Input
                type="text"
                id="turnoId"
                placeholder="Ej: 12345"
                value={turnoId}
                onChange={(e) => setTurnoId(e.target.value)}
            />
            <ButtonGroup>
                <Button onClick={handleConsultar}>Consultar</Button>
                <Button onClick={handleCancelar}>Cancelar</Button>
            </ButtonGroup>
        </FormContainer>
    </PageLayout>
  );
}