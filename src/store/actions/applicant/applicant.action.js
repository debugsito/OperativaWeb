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

export const setPublicationSearch= (payload) => ({
  type: ApplicantType.SET_PUBLICATIONS_SEARCH,
  payload
})

export const setStatus = (payload) => ({
  type: ApplicantType.SET_STATUS,
  payload
});

export const setApplicantMessages = (payload) => ({
  type: ApplicantType.SET_APPLICANT_MESSAGES,
  payload 
})

export const setApplicantMessageDetail = (payload) => ( {
  type : ApplicantType.SET_APPLICANT_MESSAGE_DETAIL,
  payload 
})


export const getPublicationSearch =  ( query) => {
  return async (dispatch) => {
    try {
      console.log(query)
      const response = await service_Applicant.publicationsSearch(query);
      dispatch(setPublicationSearch(response.data.publications));
      dispatch(setPublicationAccountError(null));
    } catch (error) {
      dispatch(setPublicationSearch([]));
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



export const getMessagesApplicant = (publicatio_account_id) => {
  return async (dispatch) => {
    try {
      const response = await service_Applicant.getMessageByPublicationAccountId(publicatio_account_id);
      console.log(response.data.data);
      dispatch(setApplicantMessages(response.data.data.rows));
      dispatch(setPublicationAccountError(null));
    } catch (error) {
      dispatch(setApplicantMessages([]));
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


export const getMessageDetailApplicant = (message_id) => {
  return async (dispatch) => {
    try {
      const response = await service_Applicant.getMessageDetailById(message_id);
      dispatch(setApplicantMessageDetail(response.data.data));
      dispatch(setPublicationAccountError(null));
    } catch (error) {
      dispatch(setApplicantMessageDetail([]));
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
