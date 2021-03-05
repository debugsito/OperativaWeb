import {service_ApplicantPublication} from '../../services'
import {ApplicantType} from '../../types/applicant'


export const setPublicationAccount=(payload) =>({
    type:ApplicantType.SET_PUBLICATIONS_ACCOUNT,
    payload
});

export const setPublicationAccountError=(payload)=>({
    type:ApplicantType.SET_PUBLICATIONS_ACCOUNT_ERROR,
    payload
});


export const setPublicationSelected =(payload) =>({
    type: ApplicantType.SET_PUBLICATION_SELECTED,
    payload
});



export const getPublicationAccount=()=>{
    return async (dispatch)=>{
        try {
            const response = await service_ApplicantPublication.getApplicantPublication();
            dispatch(setPublicationAccount(response.data));
            dispatch(setPublicationAccountError(null));
        } catch (error) {
            dispatch(setPublicationAccount([]));
            if(!error.response){
                dispatch(setPublicationAccountError("Ha ocurrido un error interno"));

            }else{
                if (!error.response) {
                    dispatch(setPublicationAccountError("Ha ocurrido un error interno."));
                  } else {
                    if (error.response.status === 401) {
                      dispatch(setPublicationAccountError(error.response.data.message));
                    } else if (error.response.status === 409) {
                      dispatch(setPublicationAccountError("La cuenta ya existe. Por favor Iniciar sesión."));
                    } else {
                      dispatch(setPublicationAccountError("Ha ocurrido un error interno."));
                    };
                  }
            }
        }
    };
};

