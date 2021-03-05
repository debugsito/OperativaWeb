import api from "../../../modules/shared/libs/api";

const changePassword = async (body) => {
    const response = await api.post('/recover/change_password', body);
    return response;
}

const logIn = async (body) => {
    const response = await api.post('/auth/login', body);
    return response;
}

const recoverPassword = async (body) => {
    const response = await api.post('/recover_password', body);
    return response;
}

export {
    changePassword,
    logIn,
    recoverPassword
}