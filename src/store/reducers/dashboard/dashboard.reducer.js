import { dashboardType } from "../../types/dashboard";

const initialState = {
    jobsInfo: {
        areas: [],
        en_proceso: 0,
        registrados: 0,
        contratados: 0,
    },
    postHistory: [],
    error: "",
    publicationsInfo: {},
    publicationSelected: "",
    postulantsByPublicationId: {},
    postulantsByPublicationIdError: "",
    applicantProfile: {},
    applicantProfileError: ""
};

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case dashboardType.SET_JOBS_INFO:
            return {
                ...state,
                jobsInfo: action.payload,
            };
        case dashboardType.SET_JOBS_INFO_ERROR:
            return {
                ...state,
                jobsInfoError: action.payload,
            };
        case dashboardType.SET_PUBLICATIONS_INFO_ERROR:
            return {
                ...state,
                publicationsInfoError: action.payload,
            };
        case dashboardType.SET_PUBLICATIONS_INFO:
            return {
                ...state,
                publicationsInfo: action.payload,
            };
        case dashboardType.SET_UPDATE_PUBLICATION_ERROR:
            return {
                ...state,
                updatePublicationError: action.payload,
            };
        case dashboardType.SET_SAVE_PUBLICATION_ERROR:
            return {
                ...state,
                savePublicationError: action.payload,
            };
        case dashboardType.SET_PUBLICATION_SELECTED:
            return {
                ...state,
                publicationSelected: action.payload,
            };
        case dashboardType.SET_POSTULANTS_BY_PUBLICATION_ID:
            return {
                ...state,
                postulantsByPublicationId: action.payload,
            };
        case dashboardType.SET_POSTULANTS_BY_PUBLICATION_ID_ERROR:
            return {
                ...state,
                postulantsByPublicationIdError: action.payload,
            };
        case dashboardType.SET_APPLICANT_PROFILE_ERROR:
            return {
                ...state,
                applicantProfileError: action.payload,
            };
        case dashboardType.SET_APPLICANT_PROFILE:
            return {
                ...state,
                applicantProfile: action.payload,
            };
        case dashboardType.SET_HISTORY_OF_PUBLICATIONS:
            return {
                ...state,
                postHistory: action.payload,
            };
        case dashboardType.SET_ERROR_FETCH:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};


export default dashboardReducer;
