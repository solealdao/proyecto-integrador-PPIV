'use client';

import PageLayout from '@/components/PageLayout';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import LogoutButton from '@/components/LogoutButton';
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

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const NextButton = styled.button`
  padding: 15px;
  background-color: ${theme.colors.green};
  color: ${theme.colors.yellow};
  border-radius: 12px;
  font-size: 20px;
  font-weight: bold;
  font-family: Mulish, sans-serif;
  border: none;
  margin-top: 20px;
  cursor: pointer;
`;

export default function SeleccionTurno() {
  const [medico, setMedico] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (medico) {
      router.push(`/calendar?medico=${encodeURIComponent(medico)}`);
    } else {
      alert('Por favor, seleccioná un médico');
    }
  };

  return (
    <PageLayout title="Seleccionar turno" showClock>
      <FormContainer>

        <Label>Seleccionar médico</Label>
        <Select
          value={medico} onChange={(e) => setMedico(e.target.value)}
        >
          <option value="">Seleccione un médico</option>
          <option value="Dra. Valentina Gómez">Dra. Valentina Gómez</option>
          <option value="Dr. Luis Fernández">Dr. Luis Fernández</option>
        </Select>
        <NextButton onClick={handleSubmit}>Siguiente</NextButton>
        <LogoutButton onClick={() => (window.location.href = '/')}>Cancelar</LogoutButton>
      </FormContainer>
    </PageLayout>
  );
}
