import api from "../../../modules/shared/libs/api";

export const deleteWorkExperience = async (body) => {
    const response = await api.post('/job/remove', body);
    return response;
}

