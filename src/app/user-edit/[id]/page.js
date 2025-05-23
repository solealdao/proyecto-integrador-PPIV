'use client';

import PageLayout from '@/components/PageLayout';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';


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
  padding: 10px;
  width: 300px;
  border-radius: 8px;
  border: 1px solid #ccc;
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

const ActionButton = styled.button`
  background-color: ${theme.colors.darkGreen};
  color: ${theme.colors.yellow};
  padding: 12px 30px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  font-family: Mulish, sans-serif;
`;

const mockUsers = [
  { id: '1', name: 'Florencia García', email: 'flor@example.com', permiso: 'doctor' },
  { id: '2', name: 'Juan Pérez', email: 'juan@example.com', permiso: 'Admin' },
];

export default function UserEdit() {
  const { id } = useParams();
  const router = useRouter();
  

  const [formData, setFormData] = useState({ name: '', email: '', permiso: '' });

  useEffect(() => {
    const user = mockUsers.find((u) => u.id === id);
    if (user) setFormData(user);
  }, [id]);


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Guardar usuario:', formData);
    router.push('/user-management');
  };

  const handleCancel = () => {
    router.push('/user-management');
  };

  return (
    <PageLayout showImage={true} imageUrl="/user.svg" title="Editar Usuario" showClock={true}>
      <Form onSubmit={handleSubmit}>
        <Label>
          Nombre completo:
          <Input name="name" value={formData.name} onChange={handleChange} />
        </Label>
        <Label>
          Email:
          <Input name="email" value={formData.email} onChange={handleChange} />
        </Label>
        <Label>
          Tipo de usuario:
          <Select name="permiso" value={formData.permiso} onChange={handleChange}>
            <option value="">Seleccionar</option>
            <option value="doctor">Doctor</option>
            <option value="paciente">Paciente</option>
            <option value="admin">Administrador</option>
          </Select>
        </Label>
        <ButtonContainer>
          <ActionButton type="button" onClick={handleCancel}>Cancelar</ActionButton>
          <ActionButton type="submit">Guardar</ActionButton>
        </ButtonContainer>
      </Form>
    </PageLayout>
  );
}
