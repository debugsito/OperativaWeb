import { ApplicantType } from "../../types/applicant";

const initialState = {
    error: "",
    publicationsAccount: "",
    publicationSelected: "",
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
        default:
            return state;

    }
};


export default applicationReducer;