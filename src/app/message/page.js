'use client';

import styled from '@emotion/styled';
import PageLayout from '@/components/PageLayout';
import theme from '@/app/theme';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { getAvailableUsers } from '@/api/services/messageService';
import { useEffect, useState } from 'react';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 2rem 0;
`;
const UserList = styled.ul`
	list-style: none;
	padding: 0;
`;

const UserItem = styled.li`
	padding: 10px;
	border-bottom: 1px solid #ddd;
	cursor: pointer;

	&:hover {
		background-color: ${theme.colors.yellow};
	}
`;

export default function MessagePage() {
	const router = useRouter();
	const { token, user } = useAuth();

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!token) return;

		getAvailableUsers(token)
			.then((res) => {
				setUsers(res);
			})
			.catch((err) => {
				console.error('Error fetching users:', err);
			})
			.finally(() => setLoading(false));
	}, [token]);

	const handleSelectUser = (userId) => {
		router.push(`/message/chat/${userId}`);
	};

	return (
		<PageLayout
			showImage={true}
			imageUrl="/chat.png"
			title="Mensajería"
			showClock={true}
		>
			{' '}
			{loading && <p>Cargando usuarios...</p>}
			{!loading && (
				<Container>
					<UserList>
						{users.length === 0 ? (
							<p>No hay usuarios disponibles para chatear</p>
						) : (
							users.map((u) => (
								<UserItem
									key={u.id_user}
									onClick={() => handleSelectUser(u.id_user)}
								>
									{u.first_name + ' ' + u.last_name || u.email}
								</UserItem>
							))
						)}
					</UserList>
				</Container>
			)}
		</PageLayout>
	);
}
