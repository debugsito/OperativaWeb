import api from "../../../modules/shared/libs/api";

const getApplicantPublication = async () => {
    const response = await api.get('/publications/account');
    return response;
}

const setNotificacionPostulant = async () => {
    const response = await api.post('/account/cancel_cv_notification');
    return response;
}

export default {
    getApplicantPublication,
    setNotificacionPostulant
}