'use client';

import theme from '@/app/theme';
import styled from '@emotion/styled';
import Link from 'next/link';

const Card = styled.div`
	background-color: ${theme.colors.green};
	color: ${theme.colors.yellow};
	padding: 30px;
	border-radius: 16px;
	box-shadow: 4px 6px 15px rgba(0, 0, 0, 0.2);
	text-align: center;
	font-size: 24px;
	font-weight: bold;
	cursor: pointer;
	transition: transform 0.2s ease;
	text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
	width: 220px;
	height: 120px;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		transform: scale(1.05);
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
`;

const MenuCard = ({ text, url }) => {
	return (
		<StyledLink href={url}>
			<Card>{text}</Card>
		</StyledLink>
	);
};

export default MenuCard;
