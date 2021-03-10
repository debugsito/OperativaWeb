import AppSession from "../../../modules/shared/libs/session/AppSession";
import { service_ApplicantSignUp, service_Auth } from "../../services";
import { authType } from "../../types/auth";

export const setUser = (payload) => ({
    type: authType.SET_USER,
    payload
});

export const setUserError = (payload) => ({
    type: authType.SET_USER_ERROR,
    payload
});

export const clearSignUp = () => ({
    type: authType.CLEAR_SIGN_UP
});

export const setAccountType = (payload) => ({
    type: authType.SET_ACCOUNT_TYPE,
    payload
});

export const signUpSuccess = (payload) => ({
    type: authType.LOGIN_SUCCESS,
    payload
});

export const applicantSignUp = (user) => {
    return async (dispatch) => {
        try {
            const response = await service_ApplicantSignUp(user);
            dispatch(setUser(response.data));
            dispatch(setUserError(null));
            dispatch(signUpSuccess(true));
        } catch (error) {
            if (!error.response) {
                dispatch(setUserError("Ha ocurrido un error interno."));
            } else {
                if (error.response.status === 401) {
                    dispatch(setUserError(error.response.data.message));
                } else if (error.response.status === 409) {
                    dispatch(setUserError("La cuenta ya existe. Por favor Iniciar sesión."));
                } else {
                    dispatch(setUserError("Ha ocurrido un error interno."));
                };
            }
        }
    };
};

export const logIn = (user) => {
    return async (dispatch) => {
        try {
            await service_Auth.logIn(user);
            // dispatch(setUser(response.data));
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

export const updateAccount = (body) => {
    return async (dispatch) => {
        try {
            await service_Auth.updateAccount(body)
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

export const getAccount = () => {
    return async (dispatch) => {
        try {
            const response = await service_Auth.getAccount();
            console.log("response getAccount:  ", response)
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

export const redirectToLandingPage = (payload) => ({
    type: authType.SHOW_LOADING,
    payload
});

export const signOut = () => {
    return async (dispatch) => {
        dispatch(clearSignUp());
        dispatch(resetStore());
        AppSession.destroy();
    }
}

export const resetStore = () => ({
    type: "RESET_STORE"
});
