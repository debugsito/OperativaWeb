
import api from "../../../modules/shared/libs/api";

const getJobs = async () => {
    const response = await api.get('/dashboard/jobs');
    return response;
}

const getPublications = async () => {
    const response = await api.get('/publications');
    return response;
}

const updatePublication = async (params) => {
    const response = await api.post(`/publication/${params.publication_id}`, params.body);
    return response;
}

const savePublication = async (body) => {
    const response = await api.post(`/publication`, body);
    return response;
}

const archivePublication = async (params) => {
    const response = await api.post(`/publication/${params.id}/archive`);
    return response;
}

const deletePublication = async (params) => {
    const response = await api.post(`/publication/${params.id}/delete`);
    return response;
}

const getPostulantsByPublicationId = async (params) => {
    const response = await api.get(`/publication/${params.publication_id}/postulantes`);
    return response;
}

const getApplicantProfile = async (params) => {
    const response = await api.get(`/account/user/profile/${params.postulant_id}`);
    return response;
}

const selectApplicant =async (body,publication_id) =>{
    const response = await api.post(`/publication/${publication_id}/selectApplicant`,body);
    return response;
}

const denyApplicant = async (body,publication_id) =>{
    const response = await api.post(`/publication/${publication_id}/denyApplicant`,body);
    return response;
}

const hireApplicant = async (body,publication_id) =>{
    const response = await api.post(`/publication/${publication_id}/hireApplicant`,body);
    return response;
}


export default {
    getJobs,
    getPublications,
    updatePublication,
    savePublication,
    archivePublication,
    deletePublication,
    getPostulantsByPublicationId,
    getApplicantProfile,
    selectApplicant,
    denyApplicant,
    hireApplicant
}