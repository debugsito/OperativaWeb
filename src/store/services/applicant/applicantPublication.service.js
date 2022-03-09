import api from "../../../modules/shared/libs/api";

const getApplicantPublication = async (status = null) => {
    let statusStr = '';
    if (status) {
        statusStr = `?status=${status}`;
    }
    return await api.get(`/publications/account${statusStr}`);
}

const setNotificacionPostulant = async () => {
    const response = await api.post('/account/cancel_cv_notification');
    return response;
}

const publicationsSearch = async (data) => {
    return await api.post('/publications/search', data);
}

const detallePublicacion = async (id) => {
    return await api.get(`/publication/${id}`);
}

const sendApplication = async (id) => {
    return await api.post(`/publication/${id}/apply`);
}

export default {
    getApplicantPublication,
    setNotificacionPostulant,
    publicationsSearch,
    detallePublicacion,
    sendApplication,
}
