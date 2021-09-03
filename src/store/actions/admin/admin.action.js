import { adminType } from "../../types/admin";

export const setErrorFetch = (payload) => ({
    type: adminType.SET_ERROR_FETCH,
    payload
});

export const setReport = (payload) => ({
    type: adminType.SET_REPORT,
    payload
});

export const setDateOfReport = (payload) => ({
    type: adminType.SET_DATE_OF_REPORT,
    payload
});

export const setUsers = (payload) => ({
    type: adminType.SET_USERS,
    payload
});

export const setPage = (payload) => ({
    type: adminType.SET_PAGE,
    payload
});

export const setRowsPerPage = (payload) => ({
    type: adminType.SET_ROWS_PER_PAGE,
    payload
});

export const setQuery = (payload) => ({
    type: adminType.SET_QUERY,
    payload
});