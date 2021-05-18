import api from "../../../modules/shared/libs/api";

const getAccounts = async () => {
    const response = await api.get('/accounts');
    return response;
}

const acceptAccount = async (body) => {
    const response = await api.post('/account/accept', body);
    return response;
}

const denyAccount = async (body) => {
    const response = await api.post('/account/deny', body);
    return response;
}

const getReport = async (params) => {
    const response = await api.get(`/account/users/report/${params.startDate}/${params.finishDate}`);
    return response;
}

export default {
    getAccounts,
    acceptAccount,
    denyAccount,
    getReport
}