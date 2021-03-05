import api from "../../modules/shared/libs/api";

// Servicio que obtiene la lista de tipo de documento
export const documentsTypeList = async () => {
    const response = await api.get('/documents');
    return response;
}

// Servicio que obtiene la lista de tipo de estado civil
export const civilStatusesList = async () => {
    const response = await api.get('/civils');
    return response;
}

// Servicio que obtiene la lista de Departamentos
export const departmentsList = async () => {
    const response = await api.get('/departments');
    return response;
}

// Servicio que obtiene la lista de Provincias
export const provincesList = async () => {
    const response = await api.get('/provinces');
    return response;
}

// Servicio que obtiene la lista de Distrito
export const districtsList = async () => {
    const response = await api.get('/districts');
    return response;
}

// Servicio que obtiene la lista de nivel academico
export const academicLevelsList = async () => {
    const response = await api.get('/levels');
    return response;
}

// Servicio que obtiene la lista especilidad
export const specialtiesList = async () => {
    const response = await api.get('/fields');
    return response;
}

// Servicio que obtiene la lista de genero
export const genderList = async () => {
    const response = await api.get('/gender/');
    return response;
}

// Servicio que obtiene la lista de proveedores
export const providerList = async () => {
    const response = await api.get('/providers');
    return response;
}

// Servicio que obtiene la lista de nivel de trabajos
export const jobLevelsList = async () => {
    const response = await api.get('/job_levels');
    return response;
}

// Servicio que obtiene la lista de roles de trabajo
export const jobRolesList = async () => {
    const response = await api.get('/job_roles');
    return response;
}

// Servicio que obtiene la lista de areas
export const areasList = async () => {
    const response = await api.get('/areas');
    return response;
}

// Servicio que obtiene la lista de rubros
export const itemsList = async () => {
    const response = await api.get('/rubros');
    return response;
}

// Servicio que obtiene la lista de motivos de retiro
export const withdrawalReasonsList = async () => {
    const response = await api.get('/attritions');
    return response;
}

export const getAccount = async () => {
    const response = await api.get('/account');
    return response;
}

//servicio que obtiene la lista de periodos (tiempo de permanencia)
export const getPeriods = async () => {
    const response = await api.get('/periods');
    return response;
}

//servicio que obtiene la lista de periodos (tiempo de permanencia)
export const getRubrosOp = async () => {
    const response = await api.get('/rubrosOp');
    return response;
}
