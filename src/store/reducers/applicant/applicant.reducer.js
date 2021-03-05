import { ApplicantType } from "../../types/applicant";

const initialState = {
    error: "",
    publicationsAccount: "",
    publicationSelected: ""
};




const applicationReducer =(state= initialState,action)=>{

    switch(action.type){
        case ApplicantType.SET_PUBLICATIONS_ACCOUNT: 
                return{
                    ...state,
                    publicationsAccount:action.payload,
                };
        case ApplicantType.SET_PUBLICATIONS_ACCOUNT_ERROR:
                return{
                    ...state,
                    error:action.payload,
                };
        case ApplicantType.SET_PUBLICATION_SELECTED:
                return{
                    ...state,
                    publicationSelected:action.payload
                }
        default:
            return state;

    }
};


export default applicationReducer;