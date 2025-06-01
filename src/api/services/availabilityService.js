import { ENDPOINTS } from '../endpoints';
import { requester } from '../requester';

export const fetchAllAvailabilities = (token) =>
	requester.get(ENDPOINTS.AVAILABILITY.GET_ALL, token);

export const fetchAvailabilityByDoctor = (doctorId, token) =>
	requester.get(ENDPOINTS.AVAILABILITY.GET_BY_DOCTOR(doctorId), token);

export const fetchDoctorAgenda = (doctorId, from, to, token) =>
	requester.get(
		ENDPOINTS.AVAILABILITY.GET_DOCTOR_AGENDA(doctorId, from, to),
		token
	);

export const createAvailability = (availabilityData, token) =>
	requester.post(ENDPOINTS.AVAILABILITY.CREATE, availabilityData, token);

export const updateAvailability = (id, availabilityData, token) =>
	requester.put(ENDPOINTS.AVAILABILITY.UPDATE(id), availabilityData, token);

export const deleteAvailability = (id, token) =>
	requester.del(ENDPOINTS.AVAILABILITY.DELETE(id), token);

export const createUnavailability = (unavailabilityData, token) =>
	requester.post(
		ENDPOINTS.AVAILABILITY.CREATE_UNAVAILABLE,
		unavailabilityData,
		token
	);

export const deleteUnavailability = (id, token) =>
	requester.del(ENDPOINTS.AVAILABILITY.DELETE_UNAVAILABLE(id), token);
