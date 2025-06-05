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
	AVAILABILITY: {
		GET_ALL: `${BASE_URL}/availability`,
		GET_BY_DOCTOR: (doctorId) =>
			`${BASE_URL}/availability/doctor/${doctorId}`,
		GET_DOCTOR_AGENDA: (doctorId, from, to) =>
			`${BASE_URL}/availability/doctor/${doctorId}/agenda?from=${from}&to=${to}`,
		CREATE: `${BASE_URL}/availability`,
		UPDATE: (id) => `${BASE_URL}/availability/${id}`,
		DELETE: (id) => `${BASE_URL}/availability/${id}`,
		CREATE_UNAVAILABLE: `${BASE_URL}/availability/unavailable`,
		DELETE_UNAVAILABLE: (id) => `${BASE_URL}/availability/unavailable/${id}`,
	},
	APPOINTMENTS: {
		GET_ALL: `${BASE_URL}/appointments/all`,
		CREATE: `${BASE_URL}/appointments`,
		UPDATE: (id) => `${BASE_URL}/appointments/${id}`,
		DELETE: (id) => `${BASE_URL}/appointments/${id}`,
		GET_MY_APPOINTMENTS: `${BASE_URL}/appointments/me`,
		GET_BY_DOCTOR: (doctorId) =>
			`${BASE_URL}/appointments/doctor/${doctorId}`,
		GET_BY_ID: (id) => `${BASE_URL}/appointments/${id}`,
		NOTES: (id) => `${BASE_URL}/appointments/${id}/complete`,
	},
};
