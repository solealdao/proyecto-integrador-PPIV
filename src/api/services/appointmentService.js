import { ENDPOINTS } from '../endpoints';
import { requester } from '../requester';

export const getAllAppointments = async (token) => {
	return requester.get(ENDPOINTS.APPOINTMENTS.GET_ALL, token);
};

export const createAppointment = async (appointmentData, token) => {
	return requester.post(ENDPOINTS.APPOINTMENTS.CREATE, appointmentData, token);
};

export const updateAppointment = async (id, appointmentData, token) => {
	return requester.put(
		ENDPOINTS.APPOINTMENTS.UPDATE(id),
		appointmentData,
		token
	);
};

export const cancelAppointment = async (id, token) => {
	return requester.del(ENDPOINTS.APPOINTMENTS.DELETE(id), token);
};

export const getMyAppointments = async (token) => {
	return requester.get(ENDPOINTS.APPOINTMENTS.GET_MY_APPOINTMENTS, token);
};

export const getAppointmentsByDoctor = async (doctorId, token) => {
	return requester.get(ENDPOINTS.APPOINTMENTS.GET_BY_DOCTOR(doctorId), token);
};

export const getAppointmentById = async (id, token) => {
	return requester.get(ENDPOINTS.APPOINTMENTS.GET_BY_ID(id), token);
};

export const completeAppointment = async (id, notesData, token) => {
	return requester.post(ENDPOINTS.APPOINTMENTS.NOTES(id), notesData, token);
};
