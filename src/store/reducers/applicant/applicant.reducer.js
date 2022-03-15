import { ApplicantType } from "../../types/applicant";

const initialState = {
    error: "",
    publicationsAccount: [],
    publicationSelected: "",
    publicationAccountSelected: {},
    publicationsSearch: [],
    messages : [],
    messageDetail : [],
    questions : [],
    interview : {},
    medical_test : {},
    fetch: {
        status: "idle",
        message: null
    },
};




const applicationReducer = (state = initialState, action) => {

    switch (action.type) {
        case ApplicantType.SET_PUBLICATIONS_ACCOUNT:
            return {
                ...state,
                publicationsAccount: action.payload,
            };
        case ApplicantType.SET_PUBLICATIONS_ACCOUNT_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case ApplicantType.SET_PUBLICATION_SELECTED:
            return {
                ...state,
                publicationSelected: action.payload
            }
        case ApplicantType.SET_STATUS:
            return {
                ...state,
                fetch: action.payload
            }
        case ApplicantType.SET_PUBLICATION_ACCOUNT_SELECTED:
            return {
                ...state,
                publicationAccountSelected: action.payload
            }
        case ApplicantType.SET_PUBLICATIONS_SEARCH:
            return {
                ...state,
                publicationsSearch: action.payload
            }
        case ApplicantType.SET_APPLICANT_MESSAGES:
            return {
                ...state,
                messages : action.payload
            }
        case ApplicantType.SET_APPLICANT_MESSAGE_DETAIL :
            return {
                ...state,
                messageDetail : action.payload
            }
        case ApplicantType.SET_APPLICANT_QUESTIONS:
            return {
                ...state,
                questions : action.payload
            }
        case ApplicantType.SET_APPLICANT_MEDICAL_TEST:
            return {
                ...state,
                medical_test : action.payload
            }
        case ApplicantType.SET_APPLICANT_INTERVIEW:
            return {
                ...state,
                interview : action.payload
            }
        default:
            return state;

    }
};


export default applicationReducer;