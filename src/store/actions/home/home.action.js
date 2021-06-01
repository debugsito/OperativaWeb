import { homeType } from "../../types/home";

export const setErrorFetch = (payload) => ({
    type: homeType.SET_ERROR_FETCH,
    payload
});

export const setIsPostulant = (payload) => ({
    type: homeType.SET_IS_POSTULANT,
    payload
});