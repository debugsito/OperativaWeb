import { service_Auth } from "../../services";
import { setUser, setUserError } from "./auth.action";

export const logIn = (user) => {
    return async (dispatch) => {
        try {
            await service_Auth.logIn(user);
            dispatch(setUserError(null));
            dispatch(getAccount());
        } catch (error) {
            if (!error.response) {
                dispatch(setUserError("Ha ocurrido un error interno."));
            } else {
                if (error.response.status === 401) {
                    dispatch(setUserError(error.response.data.message));
                } else {
                    dispatch(setUserError("Ha ocurrido un error interno."));
                };
            }
        }
    };
};

export const loginAs = (body) => {
    console.log("entrando a middlware...")
    return async (dispatch) => new Promise(async (resolve, reject) => {
        try {
            await service_Auth.loginAs(body);
            const response = await service_Auth.getAccount();
            dispatch(setUser(response.data));
            dispatch(setUserError(null));
            resolve()
        } catch (error) {
            if (!error.response) {
                dispatch(setUserError("Ha ocurrido un error interno."));
            } else {
                if (error.response.status === 401) {
                    dispatch(setUserError(error.response.data.message));
                } else {
                    dispatch(setUserError("Ha ocurrido un error interno."));
                };
            }
            reject()
        }
    });
};

export const getAccount = () => {
    return async (dispatch) => {
        try {
            const response = await service_Auth.getAccount();
            dispatch(setUser(response.data));
            dispatch(setUserError(null));
        } catch (error) {
            if (!error.response) {
                dispatch(setUserError("Ha ocurrido un error interno."));
            } else {
                if (error.response.status === 401) {
                    dispatch(setUserError(error.response.data.message));
                } else {
                    dispatch(setUserError("Ha ocurrido un error interno."));
                };
            }
        }
    };
};
