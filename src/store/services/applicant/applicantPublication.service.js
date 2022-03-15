import api from "../../../modules/shared/libs/api";

const getApplicantPublication = async (status = null) => {
    let statusStr = '';
    if (status) {
        statusStr = `?status=${status}`;
    }
    return await api.get(`/publications/account${statusStr}`);
}

const getApplicantPublicationById = async (id) => {
    return await api.get(`/publications/account/${id}`)
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

const getMessageByPublicationAccountId = async ( publication_account_id) => {
    return await api.get(`/messages/${publication_account_id}`);
}

const getMessageDetailById = async ( message_id) => {
    return await api.get(`/messages-detail/${message_id}`);
}

const answerMessage = async ( message_id , data) => {
    return await api.post(`/messages-detail/${message_id}`,data);
}

const getFormsByPubAccount = async (publication_account_id) => {
    return await api.get(`/form/assign/publication/${publication_account_id}`);
}

const upateForm = async (data) => {
    return await api.post(`/form/answer/publication/account`,data);
}

const getInterview = async ( publication_account_id) => {   
    return await api.get(`/publication_account_interview/${publication_account_id}`);
}

const getMedicalTest = async (publication_account_id) => {
    return await api.get(`/publication_account_medical_test/${publication_account_id}`);
}

export default {
    getApplicantPublication,
    setNotificacionPostulant,
    publicationsSearch,
    detallePublicacion,
    sendApplication,
    getApplicantPublicationById,
    getMessageByPublicationAccountId,
    getMessageDetailById,
    answerMessage,
    getFormsByPubAccount,
    upateForm,
    getInterview,
    getMedicalTest
}
