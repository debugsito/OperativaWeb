import {
    academicLevelsList, areasList, civilStatusesList,
    departmentsList, documentsTypeList, genderList,
    itemsList, jobLevelsList, jobRolesList, providerList,
    districtsList, listDistrictsLima, provincesList, specialtiesList, withdrawalReasonsList,
    getPeriods, getRubrosOp
} from "../../services/utils.service.temp";
import { utilsType } from "../../types/utils";

const setError = (payload) => ({
    type: utilsType.SET_ERROR,
    payload
});

const setDocumentsType = (payload) => ({
    type: utilsType.SET_DOCUMENTS_TYPE,
    payload
});

const getDocumentsType = () => {
    return async (dispatch) => {
        try {
            const response = await documentsTypeList();
            dispatch(setDocumentsType(response.data));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    };
};

const setCivilStatuses = (payload) => ({
    type: utilsType.SET_CIVIL_STATUSES,
    payload
});

const getCivilStatuses = () => {
    return async (dispatch) => {
        try {
            const response = await civilStatusesList();
            dispatch(setCivilStatuses(response.data));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    };
};

const setDepartments = (payload) => ({
    type: utilsType.SET_DEPARTMENTS,
    payload
});

const getDepartments = () => {
    return async (dispatch) => {
        try {
            const response = await departmentsList();
            dispatch(setDepartments(response.data.departments));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    };
};

const setProvinces = (payload) => ({
    type: utilsType.SET_PROVINCES,
    payload
});

const getProvinces = () => {
    return async (dispatch) => {
        try {
            const response = await provincesList();
            dispatch(setProvinces(response.data.provinces));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    };
};

const setDistricts = (payload) => ({
    type: utilsType.SET_DISTRICTS,
    payload
});

const getDistricts = () => {
    return async (dispatch) => {
        try {
            const response = await districtsList();
            dispatch(setDistricts(response.data.districts));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    };
};
const setDistrictsLima = (payload) => ({
    type: utilsType.SET_DISTRICTS_LIMA,
    payload
});

const getDistrictsLima = () => {
    return async (dispatch) => {
        try {
            const response = await listDistrictsLima();
            dispatch(setDistrictsLima(response.data.districts));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    };
};

const setAcademicLevels = (payload) => ({
    type: utilsType.SET_ACADEMIC_LEVELS,
    payload
});

const getAcademicLevels = () => {
    return async (dispatch) => {
        try {
            const response = await academicLevelsList();
            dispatch(setAcademicLevels(response.data));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    };
};

const setSpecialties = (payload) => ({
    type: utilsType.SET_SPECIALTIES,
    payload
});

const getSpecialties = () => {
    return async (dispatch) => {
        try {
            const response = await specialtiesList();
            dispatch(setSpecialties(response.data.fields));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    };
};

const setGender = (payload) => ({
    type: utilsType.SET_GENDER,
    payload
});

const getGender = () => {
    return async (dispatch) => {
        try {
            const response = await genderList();
            dispatch(setGender(response.data));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    };
};

const setProviders = (payload) => ({
    type: utilsType.SET_PROVIDERS,
    payload
});

const getProviders = () => {
    return async (dispatch) => {
        try {
            const response = await providerList();
            dispatch(setProviders(response.data));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    };
};

const setJobLevels = (payload) => ({
    type: utilsType.SET_JOB_LEVELS,
    payload
});

const getJobLevels = () => {
    return async (dispatch) => {
        try {
            const response = await jobLevelsList();
            dispatch(setJobLevels(response.data));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    };
};

const setJobRoles = (payload) => ({
    type: utilsType.SET_JOB_ROLES,
    payload
});

const getJobRoles = () => {
    return async (dispatch) => {
        try {
            const response = await jobRolesList();
            dispatch(setJobRoles(response.data));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    };
};

const setAreas = (payload) => ({
    type: utilsType.SET_AREAS,
    payload
});

const getAreas = () => {
    return async (dispatch) => {
        try {
            const response = await areasList();
            dispatch(setAreas(response.data));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    };
};

const setItems = (payload) => ({
    type: utilsType.SET_ITEMS,
    payload
});

const getItems = () => {
    return async (dispatch) => {
        try {
            const response = await itemsList();
            dispatch(setItems(response.data.rubros));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    };
};

const setWithdrawalReasons = (payload) => ({
    type: utilsType.SET_WITHDRAWAL_REASONS,
    payload
});

const getWithdrawalReasons = () => {
    return async (dispatch) => {
        try {
            const response = await withdrawalReasonsList();
            dispatch(setWithdrawalReasons(response.data));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    };
};

const setPeriods = (payload) => ({
    type: utilsType.SET_PERIODS,
    payload
})

const getAllPeriods = () => {
    return async (dispatch) => {
        try {
            const response = await getPeriods();
            dispatch(setPeriods(response.data.periods));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    }
}

const setItemsOp = (payload) => ({
    type: utilsType.SET_RUBROS_OP,
    payload
})

const getItemsOp = () => {
    return async (dispatch) => {
        try {
            const response = await getRubrosOp();
            dispatch(setItemsOp(response.data.rubros));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response.data.message));
        }
    }
}

export {
    getWithdrawalReasons, setWithdrawalReasons, getItems, setItems,
    getAreas, setAreas, getJobRoles, setJobRoles, getJobLevels, setJobLevels,
    getProviders, getGender, setGender, getSpecialties, setSpecialties, getAcademicLevels, setAcademicLevels,
    getDistricts, getDistrictsLima, getProvinces, setProvinces, getDepartments, setDepartments,
    getCivilStatuses, setCivilStatuses, getDocumentsType, setDocumentsType, setError, getAllPeriods,
    getRubrosOp, getItemsOp
}