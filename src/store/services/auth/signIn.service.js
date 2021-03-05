import api from "../../../modules/shared/libs/api";

const logIn =  async (body) => {
    const response = await api.post('/auth/login', body);
    return response;
}

const getAccount =  async () => {
    const response = await api.get('/account');
    return response;
}

export default { 
    logIn, 
    getAccount, 
}