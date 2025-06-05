import styled from '@emotion/styled';
import UserActions from '@/components/UserActions';
import theme from '@/app/theme';

const UserItemContainer = styled.li`
	background-color: ${theme.colors.lightText};
	color: ${theme.colors.darkGreen};
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

const userTypeMap = {
	1: 'Paciente',
	2: 'Doctor',
	3: 'Administrativo',
};

export default function UserItem({ user, onDelete }) {
	const userTypeLabel = userTypeMap[user.id_user_type] || 'Sin rol asignado';

	return (
		<UserItemContainer>
			<UserInfo>
				<strong>{user.first_name}</strong>
				<strong>{user.last_name}</strong>
				<span>{user.email}</span>
				<span>{userTypeLabel}</span>
			</UserInfo>
			<UserActions userId={user.id_user} onDelete={onDelete} />
		</UserItemContainer>
	);
}
