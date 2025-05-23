
import styled from '@emotion/styled';
import UserActions from '@/components/UserActions';

const UserItemContainer = styled.li`
  background: #f5f5f5;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function UserItem({ user }) {
  return (
    <UserItemContainer>
      <UserInfo>
        <strong>{user.name}</strong>
        <span>{user.email}</span>
        <span>{user.permiso}</span>
      </UserInfo>
      <UserActions userId={user.id} />
    </UserItemContainer>
  );
}
