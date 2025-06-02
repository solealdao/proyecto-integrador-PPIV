'use client';

import PageLayout from '@/components/PageLayout';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { registerUser } from '@/api/services/userService';

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-top: 40px;
`;
const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Label = styled.label`
	font-size: 16px;
	font-weight: 600;
`;

const Input = styled.input`
	background-color: ${theme.colors.lightText};
	color: ${theme.colors.darkGreen};
	padding: 10px;
	border-radius: 8px;
	border: 1px solid #ccc;
	font-size: 16px;
`;

const ButtonContainer = styled.div`
	margin-top: 30px;
	display: flex;
	justify-content: space-between;
`;

const ActionButton = styled.button`
	background-color: ${theme.colors.green};
	color: ${theme.colors.yellow};
	border: none;
	padding: 10px 20px;
	border-radius: 6px;
	cursor: pointer;
	font-family: Mulish, sans-serif;
	font-weight: 600;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${theme.colors.darkGreen};
	}
`;

const Select = styled.select`
	padding: 10px;
	font-size: 16px;
	border-radius: 8px;
	border: 1px solid #ccc;
	width: 250px;
	margin-top: 8px;
	font-family: Mulish, sans-serif;
`;

export default function UserNew() {
	const router = useRouter();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userType, setUserType] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const userData = {
			first_name: firstName,
			last_name: lastName,
			email,
			password,
			id_user_type: mapUserTypeToId(userType),
		};

		try {
			await registerUser(userData);
			router.push('/user-management');
		} catch (err) {
			console.error('Error al registrar usuario:', err);
			alert('Ocurrió un error al registrar el usuario.');
		}
	};

	const mapUserTypeToId = (type) => {
		switch (type) {
			case 'paciente':
				return 1;
			case 'doctor':
				return 2;
			case 'admin':
				return 3;
			default:
				return null;
		}
	};

	return (
		<PageLayout
			showImage={true}
			imageUrl="/user.svg"
			title="Nuevo Usuario"
			showClock={true}
		>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label>Nombre</Label>
					<Input
						type="text"
						value={firstName}
						placeholder="Ej. Juan"
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</FormGroup>

				<FormGroup>
					<Label>Apellido</Label>
					<Input
						type="text"
						value={lastName}
						placeholder="Ej. Pérez"
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</FormGroup>

				<FormGroup>
					<Label>Email</Label>
					<Input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</FormGroup>

				<FormGroup>
					<Label>Contraseña</Label>
					<Input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</FormGroup>

				<FormGroup>
					<Label>Tipo de usuario</Label>
					<Select
						value={userType}
						onChange={(e) => setUserType(e.target.value)}
						required
					>
						<option value="" disabled>
							Seleccionar tipo
						</option>
						<option value="doctor">Doctor</option>
						<option value="paciente">Paciente</option>
						<option value="admin">Administrador</option>
					</Select>
				</FormGroup>

				<ButtonContainer>
					<ActionButton
						type="button"
						onClick={() => router.push('/user-management')}
					>
						Cancelar
					</ActionButton>
					<ActionButton type="submit">Guardar</ActionButton>
				</ButtonContainer>
			</Form>
		</PageLayout>
	);
}
