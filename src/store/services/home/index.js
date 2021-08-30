import api from "../../../modules/shared/libs/api";

const sendEmailOfBusiness = async (params) => {
    const response = await api.post(`/contact/business`, params.body);
    return response;
}

const sendEmailOfPostulant = async (params) => {
    const response = await api.post(`/contact/postulante`, params.body);
    return response;
}


export default {
    sendEmailOfBusiness,
    sendEmailOfPostulant
}