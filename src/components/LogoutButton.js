'use client';

import styled from '@emotion/styled';
import theme from '@/app/theme';

const StyledLogoutButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
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

export default function LogoutButton({ onClick, children }) {
  return <StyledLogoutButton onClick={onClick}>{children}</StyledLogoutButton>;
}
