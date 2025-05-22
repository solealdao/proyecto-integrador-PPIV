'use client';

import styled from '@emotion/styled';
import theme from '@/app/theme';
import { useRouter } from 'next/navigation';

const StyledBackButton = styled.button`
  padding: 10px 20px;
  color: ${theme.colors.green};
  font-family: Mulish, sans-serif;
  font-weight: bold;
  font-size: 30px;
  width: 250px;
  height: 130px;
  opacity: 1;
  text-align: center;
  background: ${theme.colors.yellow};
  border-radius: 17px;
  border: none;
  margin: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default function BackButton() {
  const router = useRouter();

  return (
    <StyledBackButton onClick={() => router.back()}>
      Volver atrás
    </StyledBackButton>
  );
}
