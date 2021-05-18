import { adminType } from "../../types/admin";

export const setErrorFetch = (payload) => ({
    type: adminType.SET_ERROR_FETCH,
    payload
});

export const setReport = (payload) => ({
    type: adminType.SET_REPORT,
    payload
});