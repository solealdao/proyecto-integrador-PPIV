//falta  diseñar y maquetar!!
// habría que pensar algo como un listado de usuarios, y unos botones de NUEVO USUARIO
// ademas en esa lista tambien se le pondria poner el icono de ojito como para ir al detalle de usuario
//  y ahi editarlo y elicono de tacho de basura para poder borrarlo
'use client';

import PageLayout from '@/components/PageLayout';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import { useRouter } from 'next/navigation';
import UserItem from '@/components/UserItem';

const ButtonContainer = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
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

const UserListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

const mockUsers = [
  { id: 1, name: 'Florencia García', email: 'flor@example.com', permiso:'doctor' },
  { id: 2, name: 'Juan Pérez', email: 'juan@example.com', permiso:'Admin' },
];

export default function UserManagementPage() {
  const router = useRouter();

  return (
    <PageLayout showImage={true} imageUrl="/user.svg" title="Gestión de Usuarios" showClock={true}>
    
  <UserListContainer>
        {mockUsers.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </UserListContainer>
      <ButtonContainer>
        <ActionButton onClick={() => router.push('/user-new')}>Nuevo Usuario</ActionButton>
      </ButtonContainer>
    </PageLayout>
  );
}
