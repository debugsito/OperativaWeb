import { service_Dashboard } from "../../services";
import { setErrorFetch, setHistory, setReportByPostulantId, setRequestState, setProfileOfApplicant, setProfileApplicantError, setStatus, setPublicationId, setUpdatePublicationError } from "./dashboard.action";

export const getHistory = () => {
  return async (dispatch) => {
    try {
      const response = await service_Dashboard.getHistory();
      dispatch(setHistory(response.data.rows));
      dispatch(setErrorFetch(null)); //control de errores
    } catch (error) {
      if (!error.response) {
        dispatch(setErrorFetch("Ha ocurrido un error interno."));
      } else {
        if (error.response.status === 409) {
          dispatch(setErrorFetch(error.response.data.message));
        } else {
          dispatch(setErrorFetch("Ha ocurrido un error interno."));
        };
      }
    }
  };
};

export const getReportByPostulantId = (params) => {
  return async (dispatch) => {
    try {
      const response = await service_Dashboard.getReportByPostulantId(params);
      dispatch(setReportByPostulantId(response.data));
      dispatch(setErrorFetch(null)); //control de errores
    } catch (error) {
      if (!error.response) {
        dispatch(setErrorFetch("Ha ocurrido un error interno."));
      } else {
        if (error.response.status === 409) {
          dispatch(setErrorFetch(error.response.data.message));
        } else {
          dispatch(setErrorFetch("Ha ocurrido un error interno."));
        };
      }
    }
  };
};

export const savePublication = (body) => {
  return async (dispatch) => {
    try {
      dispatch(setStatus({ code: "loading" }))
      const response = await service_Dashboard.savePublication(body);
      console.log("response.data", response.data)
      dispatch(setPublicationId(response.data.publication.id))
      dispatch(setStatus({ code: "idle", message: "Publicación creada exitosamente." }))
      dispatch(setRequestState({ success: true }));
    } catch (error) {
      dispatch(setStatus({ code: "failed", message: "Ha ocurrido un error interno, intentalo mas tarde." }))
      if (!error.response) {
        dispatch(setRequestState({ success: false, message: "Ha ocurrido un error interno" }));
      } else {
        if (error.response.status === 409) {
          dispatch(setRequestState({ success: false, message: error.response.data.message }));
        } else {
          dispatch(setRequestState({ success: false, message: "Ha ocurrido un error interno" }));
        };
      }
    }
  };
};

export const updatePublication = (params) => {
  return async (dispatch) => {
    try {
      const response = await service_Dashboard.updatePublication(params);
      dispatch(setUpdatePublicationError(null)); //control de errores
    } catch (error) {
      if (!error.response) {
        dispatch(setUpdatePublicationError("Ha ocurrido un error interno."));
      } else {
        if (error.response.status === 401) {
          dispatch(setUpdatePublicationError(error.response.data.message));
        } else {
          dispatch(setUpdatePublicationError("Ha ocurrido un error interno."));
        };
      }
    }
  };
};

export const getProfileOfApplicant = (body) => {
  return async (dispatch) => {
    try {
      const response = await service_Dashboard.getProfileOfApplicantById(body);
      dispatch(setProfileOfApplicant(response.data.profile));
      dispatch(setProfileApplicantError(null)); //control de errores
    } catch (error) {
      if (!error.response) {
        dispatch(setProfileApplicantError("Ha ocurrido un error interno.1"));
      } else {
        if (error.response.status === 409) {
          dispatch(setProfileApplicantError(error.response.data.message));
        } else {
          dispatch(setProfileApplicantError("Ha ocurrido un error interno.2"));
        };
      }
    }
  };
};
