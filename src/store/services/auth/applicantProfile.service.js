import api from "../../../modules/shared/libs/api";

// Registrar la información Personal del Usuario
const applicantPersonalDataRegister = async (body) => {
    const response = await api.post('/user/', body)
    return response;
}

// Registrar la información Educativa del Usuario.
const applicantEducationRegister = async (body) => {
    const response = await api.post('/education/', body);
    return response;
}

const applicantEducationsResgister = async (body) => {
    const response = await api.post('/educations/',body);
    return response
}

// Registrar la información de Trabajo del Usuario
const applicantWithExperienceRegister = async (body) => {
    const response = await api.post('/job/', body)
    return response;
}

// Registrar la información de Trabajo del Usuario
const applicantWithoutExperienceRegister = async (body) => {
    const response = await api.post('/job_without', body)
    return response;
}

export default { 
    applicantPersonalDataRegister, 
    applicantEducationRegister, 
    applicantWithExperienceRegister, 
    applicantWithoutExperienceRegister,
    applicantEducationsResgister
}