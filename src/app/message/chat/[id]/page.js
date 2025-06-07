'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import PageLayout from '@/components/PageLayout';
import useAuth from '@/hooks/useAuth';
import { getConversation, sendMessage } from '@/api/services/messageService';

const Title = styled.h4`
	margin-bottom: 20px;
	color: ${theme.colors.darkGreen};
`;

const AlertBox = styled.div`
	background-color: #fff3cd;
	color: #856404;
	border: 1px solid #ffeeba;
	border-radius: 8px;
	padding: 15px;
	margin-bottom: 30px;
	ol {
		margin: 0;
		padding-left: 20px;
	}
`;

const ChatBox = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid #ccc;
	background-color: #f8f9fa;
	padding: 20px;
	max-height: 400px;
	overflow-y: auto;
	border-radius: 10px;
`;

const Message = styled.div`
	color: ${theme.colors.darkText};
	display: flex;
	flex-direction: column;
	align-self: ${(props) =>
		props.senderType === 'sender' ? 'flex-end' : 'flex-start'};
	background-color: ${(props) =>
		props.senderType === 'sender' ? '#d4edda' : '#cce5ff'};
	border-radius: 12px;
	padding: 12px 16px;
	margin-bottom: 10px;
	max-width: 70%;
	text-align: ${(props) => (props.senderType === 'sender' ? 'right' : 'left')};
`;

const Timestamp = styled.small`
	display: block;
	margin-top: 4px;
	color: #6c757d;
`;

const MessageInput = styled.textarea`
	background-color: ${theme.colors.lightText};
	color: ${theme.colors.darkText};
	width: 100%;
	margin-top: 20px;
	padding: 12px;
	border-radius: 8px;
	border: 1px solid #ccc;
	resize: none;
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;
	margin-top: 20px;
	flex-wrap: wrap;
`;

const Button = styled.button`
	padding: 12px 30px;
	background-color: ${theme.colors.green};
	color: ${theme.colors.yellow};
	border-radius: 12px;
	font-size: 16px;
	font-weight: bold;
	font-family: Mulish, sans-serif;
	border: none;
	cursor: pointer;

	&:hover {
		background-color: ${theme.colors.darkGreen};
	}
`;

const Controls = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;
	flex-wrap: wrap;
`;

export default function ChatPage() {
	const { id } = useParams();
	const router = useRouter();
	const { token, user } = useAuth();

	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [charLimit, setCharLimit] = useState(300);

	useEffect(() => {
		if (!id || !token) return;

		getConversation(id, token)
			.then((res) => {
				setMessages(res);
			})
			.catch((err) => {
				console.error('Error loading messages:', err);
			});
	}, [id, token]);

	const handleSendMessage = async () => {
		if (newMessage.trim() === '') return;

		const message = {
			id_receiver: id,
			id_sender: user.id_user,
			content: newMessage,
			sent_at: new Date().toISOString(),
		};

		try {
			await sendMessage(message, token);

			setMessages((prev) => [
				...prev,
				{
					...message,
					id_message: Date.now(),
				},
			]);
			setNewMessage('');
		} catch (err) {
			console.error('Error al enviar el mensaje:', err);
			alert('No se pudo enviar el mensaje. Intente más tarde.');
		}
	};

	const handleCancel = () => {
		if (!user) return;

		switch (user.id_user_type) {
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
	};

	return (
		<PageLayout
			showImage={true}
			imageUrl="/mensajeria.png"
			title="Mensajería"
			showClock={true}
		>
			<AlertBox>
				<strong>Estimado/a paciente:</strong>
				<ol>
					<li>Esta vía de comunicación no es para urgencias.</li>
					<li>
						Su médico/a recibirá el mensaje exclusivamente los días
						hábiles de 8 a 20 hs.
					</li>
					<li>
						Responderá dentro de las 48 hs hábiles desde la recepción de
						su mensaje.
					</li>
				</ol>
			</AlertBox>

			<ChatBox>
				{messages.map((msg, idx) => {
					const senderType =
						msg.id_sender === user.id_user ? 'sender' : 'receiver';

					return (
						<Message key={msg.id_message} senderType={senderType}>
							{msg.content}
							<Timestamp>
								{new Date(msg.sent_at).toLocaleString()}
							</Timestamp>
						</Message>
					);
				})}
			</ChatBox>

			<MessageInput
				rows={4}
				placeholder="Escriba su mensaje..."
				value={newMessage}
				onChange={(e) => {
					if (e.target.value.length <= charLimit) {
						setNewMessage(e.target.value);
					}
				}}
			/>

			<Controls>
				<small>
					{newMessage.length}/{charLimit}
				</small>
				<ButtonGroup>
					<Button onClick={handleCancel}>Cancelar</Button>
					<Button onClick={handleSendMessage}>Enviar mensaje</Button>
				</ButtonGroup>
			</Controls>
		</PageLayout>
	);
}
