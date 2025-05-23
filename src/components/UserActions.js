import styled from '@emotion/styled';
import { Eye, Trash2 } from 'lucide-react';
import theme from '@/app/theme';
import { useRouter } from 'next/navigation';

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function UserActions({ userId }) {
  const router = useRouter();
  const handleView = () => router.push(`/user-edit/${userId}`);

  const handleDelete = () => {
    // Aquí iría lógica para eliminar
    console.log(`Eliminar usuario ${userId}`);
  };

  return (
    <IconContainer>
      <IconButton onClick={handleView}>
        <Eye color={theme.colors.darkGreen} />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <Trash2 color="red" />
      </IconButton>
    </IconContainer>
  );
}
