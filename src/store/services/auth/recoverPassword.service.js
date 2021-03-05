import api from "../../../modules/shared/libs/api";

export default async (body) => {
    const response = await api.post('/recover_password', body);
    return response;
}