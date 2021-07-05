import api from "../../../modules/shared/libs/api";

const getApplicantPublication = async () => {
    const response = await api.get('/publications/account');
    return response;
}

export default {
    getApplicantPublication,
}