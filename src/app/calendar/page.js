'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSearchParams } from 'next/navigation';
import theme from '@/app/theme';
import PageLayout from '@/components/PageLayout';
import MenuCard from '@/components/MenuCard';
import LogoutButton from '@/components/LogoutButton';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-top: 40px;
`;

const Label = styled.label`
  font-family: Mulish;
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

function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0]; 
}

export default function NuevoTurnoCalendario() {
  const searchParams = useSearchParams();
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
          placeholderText="Elegí una fecha"
        />

        <Label>Seleccionar horario:</Label>
        <StyledSelect
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">-- Seleccioná un horario --</option>
          {horariosDisponibles.map((hora) => (
            <option key={hora} value={hora}>{hora}</option>
          ))}
        </StyledSelect>
      </FormContainer>

      <ButtonContainer>
        <LogoutButton onClick={() => window.location.href = '/appointment-management'}>
          Cancelar
        </LogoutButton>
        {medico && selectedDate && selectedTime && (
          <MenuCard
            text="Confirmar turno"
            url={`/appointment-receipt?medico=${encodeURIComponent(medico)}&fecha=${formatDate(selectedDate)}&hora=${selectedTime}`}
          />
        )}
      </ButtonContainer>
    </PageLayout>
  );
}
