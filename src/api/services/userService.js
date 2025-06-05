import { ENDPOINTS } from '../endpoints';
import { requester } from '../requester';

export const loginUser = async (email, password) => {
	return requester.post(ENDPOINTS.USERS.LOGIN, { email, password });
};

export const fetchAllUsers = async (token) => {
	return requester.get(ENDPOINTS.USERS.GET_ALL, token);
};

export const fetchUserById = async (id, token) => {
	return requester.get(ENDPOINTS.USERS.GET_BY_ID(id), token);
};

export const registerUser = async (userData) => {
	return requester.post(ENDPOINTS.USERS.REGISTER, userData);
};

export const updateUser = async (id, userData, token) => {
	return requester.put(ENDPOINTS.USERS.EDIT(id), userData, token);
};

export const deleteUser = async (id, token) => {
	return requester.del(ENDPOINTS.USERS.DELETE(id), token);
};
