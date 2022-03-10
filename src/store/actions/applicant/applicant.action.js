import { service_Applicant } from '../../services'
import { ApplicantType } from '../../types/applicant'


export const setPublicationAccount = (payload) => ({
  type: ApplicantType.SET_PUBLICATIONS_ACCOUNT,
  payload
});

export const setPublicationAccountError = (payload) => ({
  type: ApplicantType.SET_PUBLICATIONS_ACCOUNT_ERROR,
  payload
});


export const setPublicationSelected = (payload) => ({
  type: ApplicantType.SET_PUBLICATION_SELECTED,
  payload
});

export const setPublicationAccountSelected = (payload) => ({
  type : ApplicantType.SET_PUBLICATION_ACCOUNT_SELECTED,
  payload
})

export const setStatus = (payload) => ({
  type: ApplicantType.SET_STATUS,
  payload
});

export const getPublicationAccountById = ( id) => {
  return async (dispatch) => {
    try {
      const response = await service_Applicant.getApplicantPublicationById(id);
      console.log(response.data.data)
      dispatch(setPublicationAccountSelected(response.data.data));
      dispatch(setPublicationAccountError(null));
    } catch (error) {
      dispatch(setPublicationAccountSelected({}));
      if (!error.response) {
        dispatch(setPublicationAccountError("Ha ocurrido un error interno"));

      } else {
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
}


export const getPublicationAccount = (status = null) => {
  return async (dispatch) => {
    try {
      const response = await service_Applicant.getApplicantPublication(status);
      dispatch(setPublicationAccount(response.data.data));
      dispatch(setPublicationAccountError(null));
    } catch (error) {
      dispatch(setPublicationAccount([]));
      if (!error.response) {
        dispatch(setPublicationAccountError("Ha ocurrido un error interno"));

      } else {
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

