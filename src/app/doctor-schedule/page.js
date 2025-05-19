'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from '@emotion/styled';
import PageLayout from '@/components/PageLayout';
import ButtonsContainer from '@/components/ButtonsContainer';
import BackButton from '@/components/BackButton';
import LogoutButton from '@/components/LogoutButton';
import theme from '@/app/theme';

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
`;

const InfoBox = styled.div`
  margin-top: 20px;
  padding: 16px;
  background-color: #eee;
  border-radius: 8px;
`;

const Legend = styled.div`
  max-width: 600px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  gap: 20px;
  font-family: Mulish, sans-serif;
  font-size: 14px;
  color: ${theme.colors.darkGreen};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ColorBox = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  border: 1px solid #999;
`;

export default function DoctorAgenda() {
  const [appointments, setAppointments] = useState([
    '2025-05-20',
    '2025-05-22',
    '2025-05-23',
  ]);
  const [blockedDays, setBlockedDays] = useState(['2025-05-21']);
  const [selectedDate, setSelectedDate] = useState(null);
  const holidays = ['2025-05-25', '2025-07-09'];

  function formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  function onDayClick(date) {
    const day = formatDate(date);
    setSelectedDate(day);
  }

  function toggleBlock() {
    if (!selectedDate) return;
    if (blockedDays.includes(selectedDate)) {
      setBlockedDays(blockedDays.filter((d) => d !== selectedDate));
    } else {
      setBlockedDays([...blockedDays, selectedDate]);
    }
  }

  function tileClassName({ date, view }) {
    if (view !== 'month') return '';
    const day = formatDate(date);
    if (blockedDays.includes(day)) return 'blocked';
    if (appointments.includes(day)) return 'taken';
    return '';
  }

  function tileDisabled({ date, view }) {
  if (view !== 'month') return false;
  const day = date.getDay();
  const dateStr = date.toISOString().split('T')[0];

  if (day === 0 || day === 6) return true;

  if (holidays.includes(dateStr)) return true;

  return false;
}

  return (
    <PageLayout title="Gestión de agenda" showClock>
      <Container>
        <Calendar onClickDay={onDayClick} tileClassName={tileClassName} tileDisabled={tileDisabled} />
        {selectedDate && (
          <InfoBox>
            <p>Seleccionaste: {selectedDate}</p>
            {blockedDays.includes(selectedDate) ? (
              <button onClick={toggleBlock}>Desbloquear día</button>
            ) : (
              <button onClick={toggleBlock}>Bloquear día</button>
            )}
          </InfoBox>
        )}

        <Legend>
          <LegendItem>
            <ColorBox color="#a5d6a7" />
            <span>Día con turnos tomados</span>
          </LegendItem>
          <LegendItem>
            <ColorBox color="#ef9a9a" />
            <span>Día bloqueado</span>
          </LegendItem>
          <LegendItem>
            <ColorBox color="transparent" />
            <span>Día no disponible</span>
          </LegendItem>
        </Legend>
      </Container>

      <style jsx global>{`
        .react-calendar__tile.taken {
          background: #a5d6a7 !important;
          color: black !important;
        }
        .react-calendar__tile.blocked {
          background: #ef9a9a !important;
          color: black !important;
        }
      `}</style>
       
       <ButtonsContainer>
        <BackButton to="/" />

        <LogoutButton onClick={() => (window.location.href = '/')}>
                Cerrar Sesión
            </LogoutButton>
       </ButtonsContainer>
    </PageLayout>
  );
}
