import { ENDPOINTS } from '../endpoints';
import { requester } from '../requester';

export const getAllSurveys = async (token) => {
	return requester.get(ENDPOINTS.SURVEYS.GET_ALL, token);
};

export const getSurveysByDoctor = async (token) => {
	return requester.get(ENDPOINTS.SURVEYS.GET_BY_DOCTOR, token);
};

export const submitSurvey = async (appointmentId, surveyData, token) => {
	return requester.post(
		ENDPOINTS.SURVEYS.SUBMIT_SURVEY(appointmentId),
		surveyData,
		token
	);
};
