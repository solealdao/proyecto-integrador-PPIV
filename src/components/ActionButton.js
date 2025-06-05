'use client';

import styled from '@emotion/styled';
import theme from '@/app/theme';

const StyledButton = styled.button`
	background-color: ${theme.colors.green};
	color: ${theme.colors.yellow};
	font-size: 1.2em;
	border: none;
	padding: 10px 20px;
	border-radius: 6px;
	cursor: pointer;
	font-family: Mulish, sans-serif;
	font-weight: 600;
	transition: background-color 0.3s ease;
	margin: 0em 2em;

	&:hover {
		background-color: ${theme.colors.darkGreen};
	}
`;

export default function ActionButton({
	children,
	onClick,
	type = 'button',
	disabled = false,
}) {
	return (
		<StyledButton onClick={onClick} type={type} disabled={disabled}>
			{children}
		</StyledButton>
	);
}
