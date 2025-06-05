import { ENDPOINTS } from '../endpoints';
import { requester } from '../requester';

export const getAvailableUsers = async (token) => {
	return requester.get(ENDPOINTS.MESSAGES.GET_USERS, token);
};

export const getConversation = async (userId, token) => {
	return requester.get(ENDPOINTS.MESSAGES.GET_CONVERSATION(userId), token);
};

export const sendMessage = async (messageData, token) => {
	return requester.post(ENDPOINTS.MESSAGES.SEND_MESSAGE, messageData, token);
};
