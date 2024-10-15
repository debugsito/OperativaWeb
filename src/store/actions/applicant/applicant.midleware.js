import { service_Applicant } from '../../services'
import { setStatus } from "./applicant.action";
import { getAccount } from "../auth/auth.middleware";

export const setDisableNotificationOfApplicant = () => {
    return async (dispatch) => {
        try {
            dispatch(setStatus({ status: "loading", message: null }))
            await service_Applicant.setNotificacionPostulant();
            dispatch(setStatus({ status: "success", message: null }))
            dispatch(getAccount())
        } catch (error) {
            if (!error.response) {
                dispatch(setStatus({ status: "failure", message: "Ha ocurrido un error interno." }))
            } else {
                if (error.response.status === 409) {
                    dispatch(setStatus({ status: "failure", message: error.response.data.message }))
                } else {
                    dispatch(setStatus({ status: "failure", message: "Ha ocurrido un error interno." }))
                };
            }
        }
    };
};

export const storeJobHuntingAccount = () => {
    return async (dispatch) => {
        try {
            dispatch(setStatus({ status: "loading", message: null }))
            await service_Applicant.storeJobHutingAccount();
            dispatch(setStatus({ status: "success", message: null }))
            dispatch(getAccount())
        } catch (error) {
            if (!error.response) {
                dispatch(setStatus({ status: "failure", message: "Ha ocurrido un error interno." }))
            } else {
                if (error.response.status === 409) {
                    dispatch(setStatus({ status: "failure", message: error.response.data.message }))
                } else {
                    dispatch(setStatus({ status: "failure", message: "Ha ocurrido un error interno." }))
                };
            }
        }
    };
}

