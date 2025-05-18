'use client';

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const ClockWrapper = styled.div`
  font-family: Mulish, monospace;
  color: #ffffff;
  position: absolute;
  left: 70%;
  top: 50px;
  transform: translateX(-50%);
  text-shadow: 0 0 20px rgba(10, 175, 230, 1),
               0 0 20px rgba(10, 175, 230, 0);
`;

const TimeText = styled.span`
  display: block;
  letter-spacing: 0.05em;
  font-size: 20px;
  padding: 1px 0;
`;

const DateText = styled.span`
  display: block;
  letter-spacing: 0.1em;
  font-size: 20px;
`;

export default function Clock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
      setDate(now.toLocaleDateString());
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <ClockWrapper>
      <TimeText className="tiempo">{time}</TimeText>
      <DateText className="fecha">{date}</DateText>
    </ClockWrapper>
  );
}
