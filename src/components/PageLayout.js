'use client';

import theme from '@/app/theme';
import styled from '@emotion/styled';
import Clock from './Clock';

//estilos para el calendario
const CalendarIcon = styled.img`
	position: absolute;
	top: 20px;
	left: 40px;
	width: 10em;
	height: 10em;
	filter: brightness(0) invert(1);
`;

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

const PageLayout = ({ children, showImage = false, imageUrl, title, showClock = false, showCalendarIcon = false }) => {
	return (
		<Wrapper>
			<Header>
			    {showCalendarIcon && <CalendarIcon src="/icono_calendario.svg" alt="Calendario" />}
				{title && <HeaderTitle>{title}</HeaderTitle>}
				{showImage && <ProfileImage src={imageUrl} alt="Imagen" />}
				{showClock && <Clock />}
			</Header>
			<Content>{children}</Content>
		</Wrapper>
	);
};

export default PageLayout;
