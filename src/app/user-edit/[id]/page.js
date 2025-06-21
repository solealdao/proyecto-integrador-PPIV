'use client';

import PageLayout from '@/components/PageLayout';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { fetchUserById, updateUser } from '@/api/services/userService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ActionButton from '@/components/ActionButton';

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	margin-top: 40px;
`;

const Label = styled.label`
	font-weight: bold;
	font-size: 16px;
`;

const Input = styled.input`
	background-color: ${theme.colors.lightText};
	color: ${theme.colors.darkGreen};
	padding: 10px;
	border-radius: 8px;
	border: 1px solid #ccc;
	font-size: 16px;
`;

const Select = styled.select`
	padding: 10px;
	width: 300px;
	border-radius: 8px;
	border: 1px solid #ccc;
`;

const ButtonContainer = styled.div`
	margin-top: 30px;
	display: flex;
	justify-content: space-between;
	width: 100%;
	max-width: 640px;
`;

export default function UserEdit() {
	const { id } = useParams();
	const router = useRouter();
	const { token } = useAuth();

	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		id_user_type: '',
	});

	useEffect(() => {
		const loadUser = async () => {
			try {
				const user = await fetchUserById(id, token);
				setFormData({
					first_name: user.first_name || '',
					last_name: user.last_name || '',
					email: user.email || '',
					id_user_type: user.id_user_type?.toString() || '',
				});
			} catch (error) {
				console.error('Error cargando usuario:', error);
				toast.error('Error al cargar usuario: ' + error.message);
			}
		};

		if (id && token) loadUser();
	}, [id, token]);

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await updateUser(id, formData, token);
			toast.success('Usuario actualizado correctamente');
			setTimeout(() => {
				router.push('/user-management');
			}, 1500);
		} catch (error) {
			toast.error('Error al actualizar usuario: ' + error.message);
		}
	};

	const handleCancel = () => {
		router.push('/user-management');
	};

	return (
		<PageLayout
			showImage={true}
			imageUrl="/users.png"
			title="Editar Usuario"
			showClock={true}
		>
			<Form onSubmit={handleSubmit}>
				<Label>
					Nombre:
					<Input
						name="first_name"
						value={formData.first_name}
						onChange={handleChange}
					/>
				</Label>
				<Label>
					Apellido:
					<Input
						name="last_name"
						value={formData.last_name}
						onChange={handleChange}
					/>
				</Label>
				<Label>
					Email:
					<Input
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
				</Label>
				<Label>
					Tipo de usuario:
					<Select
						name="id_user_type"
						value={formData.id_user_type}
						onChange={handleChange}
					>
						<option value="">Seleccionar</option>
						<option value="1">Paciente</option>
						<option value="2">Doctor</option>
						<option value="3">Administrador</option>
					</Select>
				</Label>
				<ButtonContainer>
					<ActionButton type="button" onClick={handleCancel}>
						Cancelar
					</ActionButton>
					<ActionButton type="submit">Guardar</ActionButton>
				</ButtonContainer>
			</Form>
			<ToastContainer position="top-right" autoClose={3000} />
		</PageLayout>
	);
}
