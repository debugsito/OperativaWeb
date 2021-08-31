import api from "../../../modules/shared/libs/api";

const sendEmailOfBusiness = async (body) => {
    const response = await api.post(`/contact/business`, body);
    return response;
}

const sendEmailOfPostulant = async (body) => {
    const response = await api.post(`/contact/postulante`, body);
    return response;
}


export default {
    sendEmailOfBusiness,
    sendEmailOfPostulant
}