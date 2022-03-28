import { utilsType } from "../../types/utils";

const initialState = {
    documentsType: [],
    civilStatuses: [],
    departments: [],
    provinces: [],
    districts: [],
    districtsLima: [],
    academicLevels: [],
    specialties: [],
    gender: [],
    providers: [],
    jobLevels: [],
    jobRoles: [],
    areas: [],
    items: [],
    withdrawalReasons: [],
    account: {},
    periods: [],
    rubrosOp: [],
    universities:[],
    institutes:[],
    ongs:[],
    error: ''
};

const utilsReducer = (state = initialState, action) => {
    switch (action.type) {
        case utilsType.SET_DOCUMENTS_TYPE:
            return {
                ...state,
                documentsType: action.payload,
            };
        case utilsType.SET_CIVIL_STATUSES:
            return {
                ...state,
                civilStatuses: action.payload,
            };
        case utilsType.SET_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload,
            };
        case utilsType.SET_PROVINCES:
            return {
                ...state,
                provinces: action.payload,
            };
        case utilsType.SET_DISTRICTS:
            return {
                ...state,
                districts: action.payload,
            };
        case utilsType.SET_DISTRICTS_BY_TEXT:
            return {
                ...state,
                districts: action.payload,
            };
        case utilsType.SET_DISTRICTS_LIMA:
            return {
                ...state,
                districtsLima: action.payload,
            };
        case utilsType.SET_ACADEMIC_LEVELS:
            return {
                ...state,
                academicLevels: action.payload,
            };
        case utilsType.SET_SPECIALTIES:
            return {
                ...state,
                specialties: action.payload,
            };
        case utilsType.SET_GENDER:
            return {
                ...state,
                gender: action.payload,
            };
        case utilsType.SET_PROVIDERS:
            return {
                ...state,
                providers: action.payload,
            };
        case utilsType.SET_JOB_LEVELS:
            return {
                ...state,
                jobLevels: action.payload,
            };
        case utilsType.SET_JOB_ROLES:
            return {
                ...state,
                jobRoles: action.payload,
            };
        case utilsType.SET_AREAS:
            return {
                ...state,
                areas: action.payload,
            };
        case utilsType.SET_ITEMS:
            return {
                ...state,
                items: action.payload,
            };
        case utilsType.SET_WITHDRAWAL_REASONS:
            return {
                ...state,
                withdrawalReasons: action.payload,
            };
        case utilsType.SET_ACCOUNT:
            return {
                ...state,
                account: action.payload,
            };
        case utilsType.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case utilsType.SET_PERIODS:
            return {
                ...state,
                periods: action.payload
            }
        case utilsType.SET_RUBROS_OP:
            return {
                ...state,
                rubrosOp: action.payload
            }
        case utilsType.SET_UNIVERSITIES:
            return {
                ...state,
                universities: action.payload
            }
        case utilsType.SET_INSTITUTES:
            return {
                ...state,
                institutes: action.payload
            }
        case utilsType.SET_ONGS:
            return {
                ...state,
                ongs: action.payload
            }
        default:
            return state;
    }
};

export default utilsReducer;
