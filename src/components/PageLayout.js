'use client';

import theme from '@/app/theme';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import NavigationBar from './NavigationBar';
import LogoutButton from './LogoutButton';

const Clock = dynamic(() => import('./Clock'), { ssr: false });

const Wrapper = styled.div`
	min-height: 100vh;
	background-color: ${theme.colors.lightGray};
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Header = styled.div`
	position: relative;
	width: 100%;
	height: 180px;
	background-color: ${theme.colors.darkGreen};
	border-bottom-left-radius: 100px;
	border-bottom-right-radius: 100px;
	display: flex;
	justify-content: center;
	align-items: flex-end;
`;

const HeaderTitle = styled.h1`
	position: absolute;
	top: 30px;
	font-size: 24px;
	color: ${theme.colors.white};
	text-align: center;
`;

const ProfileImage = styled.img`
	position: absolute;
	bottom: -60px;
	width: 160px;
	height: 160px;
	border-radius: 50%;
	border: 6px solid ${theme.colors.lightGray};
	object-fit: cover;
	background-color: ${theme.colors.white};
`;

const Content = styled.div`
	margin-top: 80px;
	width: 100%;
	max-width: 1024px;
	padding: 20px;
`;

const LogoutWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  z-index: 20;
`;

const TopLeftBar = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
`;

const TopRightClock = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
`;

const PageLayout = ({
  children,
  showImage = false,
  imageUrl,
  title,
  showClock = false,
  showCalendarIcon = false
}) => {
  return (
    <Wrapper>
      <Header>
        {showCalendarIcon && <CalendarIcon src="/calendar.png" alt="Calendario" />}
        {title && <HeaderTitle>{title}</HeaderTitle>}
        {showImage && <ProfileImage src={imageUrl} alt="Imagen" />}
        {showClock && <Clock />}
        <LogoutWrapper>
          <LogoutButton />
        </LogoutWrapper>
        <NavigationBar />
      </Header>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default PageLayout;
