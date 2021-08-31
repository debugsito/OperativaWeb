import { service_Home } from "../../services";
import { setErrorFetch, sendEmail, fetchSuccess, fetchError } from "./home.action";

const message = "Ha ocurrido un error. Porfavor inténtalo mas tarde."

export const sendEmailOfBusiness = (data) => {
    return async (dispatch) => {
        try {
            dispatch(sendEmail())
            const response = await service_Home.sendEmailOfBusiness(data);
            if (response.status == 200) {
                dispatch(fetchSuccess())
            }
        } catch (error) {
            dispatch(fetchError())
            if (!error.response) {
                dispatch(setErrorFetch({ message }));
            } else {
                if (error.response.status === 409) {
                    dispatch(setErrorFetch({ message }));
                } else {
                    dispatch(setErrorFetch({ message }));
                };
            }
        }
    };
};

export const sendEmailOfPostulant = (data) => {
    return async (dispatch) => {
        try {
            dispatch(sendEmail())
            const response = await service_Home.sendEmailOfPostulant(data);
            if (response.status == 200) {
                dispatch(fetchSuccess())
                dispatch(setErrorFetch(response.data)); //control de errores
            }
        } catch (error) {
            if (!error.response) {
                dispatch(setErrorFetch({ message }));
            } else {
                if (error.response.status === 409) {
                    dispatch(setErrorFetch({ message }));
                } else {
                    dispatch(setErrorFetch({ message }));
                };
            }
        }
    };
};