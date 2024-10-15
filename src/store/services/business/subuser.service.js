import api from "../../../modules/shared/libs/api";

const getSubUsers = async () => {
    const response = await api.get('/account/users');
    return response;
}

const createSubUser = async (body) => {
    const response = await api.post('/account/user', body);
    return response;
}

const deleteSubUser = async (body) => {
    const response = await api.post('/account/users/delete', body);
    return response;
}

const requestPlan = async ()=> {
    const response = await api.post('/plan/request');
    return response
}


export default {
    getSubUsers,
    createSubUser,
    deleteSubUser,
    requestPlan
}