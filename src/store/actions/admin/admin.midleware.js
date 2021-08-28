import { service_UserAdmin } from "../../services";
import { setErrorFetch, setReport, setUsers } from "./admin.action";

export const getReport = (params) => {
    return async (dispatch) => {
        try {
            const response = await service_UserAdmin.getReport(params);
            dispatch(setReport(response.data));
            dispatch(setErrorFetch(null));
        } catch (error) {
            if (!error.response) {
                dispatch(setErrorFetch("Ha ocurrido un error interno."));
            } else {
                if (error.response.status === 409) {
                    dispatch(setErrorFetch(error.response.data.message));
                } else {
                    dispatch(setErrorFetch("Ha ocurrido un error interno."));
                };
            }
        }
    };
};

export const getUsers = (params) => {
    return async (dispatch) => {
        try {
            const response = await service_UserAdmin.getUsers(params);
            dispatch(setUsers(response.data));
            dispatch(setErrorFetch(null));
        } catch (error) {
            if (!error.response) {
                dispatch(setErrorFetch("Ha ocurrido un error interno."));
            } else {
                if (error.response.status === 409) {
                    dispatch(setErrorFetch(error.response.data.message));
                } else {
                    dispatch(setErrorFetch("Ha ocurrido un error interno."));
                };
            }
        }
    };
};