'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import theme from '../theme';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const Container = styled.div`
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${theme.colors.white};
`;

const Card = styled.div`
	display: flex;
	width: 900px;
	background: ${theme.colors.lightText};
	border-radius: 12px;
	overflow: hidden;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const ImageSection = styled.div`
	flex: 1;
	background-color: ${theme.colors.lightText};
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const FormSection = styled.div`
	flex: 1;
	padding: 40px;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const Logo = styled.h2`
	font-size: 24px;
	font-weight: bold;
	color: ${theme.colors.green};
	text-align: center;
	margin-bottom: 20px;
`;

const Title = styled.h3`
	color: ${theme.colors.darkText};
	font-size: 20px;
	text-align: center;
	margin-bottom: 30px;
`;

const Input = styled.input`
	color: ${theme.colors.darkText};
	background-color: ${theme.colors.lightGray};
	padding: 12px;
	border: 1px solid #ccc;
	border-radius: 8px;
	margin-bottom: 20px;
	font-size: 14px;
`;

const Button = styled.button`
	background-color: ${theme.colors.green};
	color: ${theme.colors.yellow};
	padding: 12px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	font-weight: bold;
	transition: background 0.3s;

	&:hover {
		background-color: ${theme.colors.darkGreen};
	}
`;

const SmallText = styled.p`
	color: ${theme.colors.darkText};
	text-align: center;
	font-size: 14px;
	margin-top: 16px;

	a {
		color: #00a9a4;
		text-decoration: none;
		font-weight: 500;
		&:hover {
			text-decoration: underline;
		}
	}
`;

const ErrorMsg = styled.p`
	color: red;
	text-align: center;
	margin-top: 10px;
`;

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { login } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userType = await login(email, password);

			switch (userType) {
				case 1:
					router.push('/patient-home');
					break;
				case 2:
					router.push('/doctor-home');
					break;
				case 3:
					router.push('/admin-home');
					break;
				default:
					router.push('/');
			}
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<Container>
			<Card>
				<ImageSection>
					<img src="/login_img.jpg" alt="Inicio" />
				</ImageSection>
				<FormSection>
					<Logo>NUEVA CLÍNICA</Logo>
					<Title>Bienvenido/a</Title>
					<StyledForm onSubmit={handleSubmit}>
						<Input
							type="email"
							placeholder="Ingrese su email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<Input
							type="password"
							placeholder="Ingrese su contraseña"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<Button type="submit">Iniciar sesión</Button>
						{error && <ErrorMsg>{error}</ErrorMsg>}
					</StyledForm>
					<SmallText>¿Has olvidado tu contraseña?</SmallText>
					<SmallText>
						¿Todavía no tienes cuenta? <a href="#">Crea una ahora</a>
					</SmallText>
				</FormSection>
			</Card>
		</Container>
	);
}
