export const BASE_URL =
	process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001/api';

export const ENDPOINTS = {
	USERS: {
		LOGIN: `${BASE_URL}/users/login`,
		REGISTER: `${BASE_URL}/users/register`,
		GET_ALL: `${BASE_URL}/users`,
		GET_BY_ID: (id) => `${BASE_URL}/users/${id}`,
		EDIT: (id) => `${BASE_URL}/users/${id}`,
		DELETE: (id) => `${BASE_URL}/users/${id}`,
	},
};
