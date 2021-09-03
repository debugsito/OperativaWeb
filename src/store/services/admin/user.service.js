import api from "../../../modules/shared/libs/api";
import api_for_download from "../../../modules/shared/libs/api/service_dowload.api";

const getAccounts = async () => {
    const response = await api.get('/accounts');
    return response;
}

const getUsers = async (query) => {
    const response = await api.get(`/account/users?${query}`);
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
const getFileReport = async (params) => {
    const response = await api_for_download.get(`/account/users/report/${params.startDate}/${params.finishDate}/export`);
    return response;
}

export default {
    getAccounts,
    acceptAccount,
    denyAccount,
    getReport,
    getFileReport,
    getUsers
}