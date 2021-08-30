import { homeType } from "../../types/home";

export const setErrorFetch = (payload) => ({
    type: homeType.SET_ERROR_FETCH,
    payload
});
export const fetchLoading = (payload) => ({
    type: homeType.SET_FETCH_LOADING,
    payload
});
export const fetchError = (payload) => ({
    type: homeType.SET_FETCH_ERROR,
    payload
});
export const fetchSuccess = (payload) => ({
    type: homeType.SET_FETCH_SUCCESS,
    payload
});

export const sendEmail = (payload) => ({
    type: homeType.SEND_EMAIL,
    payload
});

export const setIsPostulant = (payload) => ({
    type: homeType.SET_IS_POSTULANT,
    payload
});