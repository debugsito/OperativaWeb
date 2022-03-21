import api from "../../../modules/shared/libs/api";

const getJobs = async (params) => {
  const response = await api.get(
    `/dashboard/jobs/${params.from_date}/${params.to_date}`
  );
  return response;
};

const getPublications = async () => {
  const response = await api.get("/publications");
  return response;
};

const updatePublication = async (params) => {
  const response = await api.post(
    `/publication/${params.publication_id}`,
    params.body
  );
  return response;
};

const savePublication = async (body) => {
  console.log("body",body)
  const response = await api.post(`/publication`, body);
  return response;
};

const archivePublication = async (params) => {
  const response = await api.post(`/publication/${params.id}/archive`);
  return response;
};

const deletePublication = async (params) => {
  const response = await api.post(`/publication/${params.id}/delete`);
  return response;
};

const getPostulantsByPublicationId = async (params) => {
  const response = await api.get(
    `/publication/${params.publication_id}/postulantes`,
    { params: params.params }
  );
  return response;
};

const getProfileOfApplicantById = async (params) => {
  const response = await api.get(
    `/account/user/profile/${params.postulant_id}`
  );
  return response;
};

const selectApplicant = async (body, publication_id) => {
  const response = await api.post(
    `/publication/${publication_id}/selectApplicant`,
    body
  );
  return response;
};

const denyApplicant = async (body, publication_id) => {
  const response = await api.post(
    `/publication/${publication_id}/denyApplicant`,
    body
  );
  return response;
};

const hireApplicant = async (body, publication_id) => {
  const response = await api.post(
    `/publication/${publication_id}/hireApplicant`,
    body
  );
  return response;
};

//Obtener historial de publicaciones
const getHistory = async () => {
  const response = await api.get(`/publications/history`);
  return response;
};

//Obtener reporte por postulante_id
const getReportByPostulantId = async (params) => {
  const response = await api.get(
    `/publication/dashboard/${params.postulant_id}`
  );
  return response;
};

const saveMedicalTest= async (body) => {
  const response = await api.post(
    `/publication_medical_test`,body
  );
  return response;
}
;
const saveFormVerificativa = async (body) => {
  const response = await api.post(
    `/publication_verificativas`,body
  );
  return response;
};

const saveFormEvaluativa = async (body) => {
  const response = await api.post(
    `/publication_evaluativas`,body
  );
  return response;
};

const saveFormInterview = async (body) => {
  const response = await api.post(
    `/publication_interview`,body
  );
  return response;
};

export default {
  getJobs,
  getPublications,
  updatePublication,
  savePublication,
  archivePublication,
  deletePublication,
  getPostulantsByPublicationId,
  getProfileOfApplicantById,
  selectApplicant,
  denyApplicant,
  hireApplicant,
  getHistory,
  getReportByPostulantId,
  saveMedicalTest,
  saveFormVerificativa,
  saveFormEvaluativa,
  saveFormInterview
};
