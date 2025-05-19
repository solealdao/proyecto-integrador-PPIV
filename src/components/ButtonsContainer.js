'use client';

import styled from '@emotion/styled';

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 1000;
`;

export default function FixedButtonsContainer({ children }) {
  return <Container>{children}</Container>;
}