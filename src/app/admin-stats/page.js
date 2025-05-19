'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import PageLayout from '@/components/PageLayout';
import theme from '@/app/theme';
import LogoutButton from '@/components/LogoutButton';
import BackButton from '@/components/BackButton';
import ButtonsContainer from '@/components/ButtonsContainer';

const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding-bottom: 180px;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-family: Mulish, sans-serif;
  color: ${theme.colors.darkGreen};
  margin-bottom: 16px;
`;

const Score = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: ${theme.colors.green};
  text-align: center;
  margin: 20px 0;
`;

const CommentBox = styled.div`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;

const COLORS = ['#66bb6a', '#ffee58', '#ffa726', '#ef5350'];

const dummyData = [
  { name: 'Excelente', value: 40 },
  { name: 'Buena', value: 30 },
  { name: 'Regular', value: 20 },
  { name: 'Mala', value: 10 },
];

const comments = [
  'La atención fue muy buena.',
  'Esperé mucho tiempo para ser atendido.',
  'Excelente trato del profesional.',
  'El lugar estaba limpio y cómodo.',
  'No me gustó cómo me atendieron.',
];

export default function AdminStats() {
  const averageScore = 4.1; // Puntaje ficticio

  return (
    <PageLayout title="Ver estadísticas" showClock>
      <Container>
        <Section>
          <Title>Puntuación Promedio</Title>
          <Score>{averageScore.toFixed(1)} / 5</Score>
        </Section>

        <Section>
          <Title>Resultados de la Encuesta</Title>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dummyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                dataKey="value"
              >
                {dummyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Section>

        <Section>
          <Title>Comentarios recientes</Title> 
          {comments.map((text, idx) => (
            <CommentBox key={idx}>{text}</CommentBox>
          ))}
        </Section>
        <ButtonsContainer>
        <BackButton to="/" />

        <LogoutButton onClick={() => (window.location.href = '/')}>
                Cerrar Sesión
            </LogoutButton>
       </ButtonsContainer>
      </Container>
      
    </PageLayout>
  );
}
