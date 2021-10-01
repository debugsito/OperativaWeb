import { service_Dashboard } from "../../services";
import { dashboardType } from "../../types/dashboard";

export const setJobsInfo = (payload) => ({
  type: dashboardType.SET_JOBS_INFO,
  payload
});

export const setJobsInfoError = (payload) => ({
  type: dashboardType.SET_JOBS_INFO_ERROR,
  payload
});
export const setPublicationsInfo = (payload) => ({
  type: dashboardType.SET_PUBLICATIONS_INFO,
  payload
});

export const setPublicationsErrorInfo = (payload) => ({
  type: dashboardType.SET_PUBLICATIONS_INFO_ERROR,
  payload
});

export const setUpdatePublicationError = (payload) => ({
  type: dashboardType.SET_UPDATE_PUBLICATION_ERROR,
  payload
});

export const setSavePublicationError = (payload) => ({
  type: dashboardType.SET_SAVE_PUBLICATION_ERROR,
  payload
});

export const setPublicationSelected = (payload) => ({
  type: dashboardType.SET_PUBLICATION_SELECTED,
  payload
});

export const setHistory = (payload) => ({
  type: dashboardType.SET_HISTORY_OF_PUBLICATIONS,
  payload
});

export const setReportByPostulantId = (payload) => ({
  type: dashboardType.SET_REPORT_BY_POSTULANT_ID,
  payload
});

export const setPublicationId = (payload) => ({
  type: dashboardType.SET_PUBLICATION_ID,
  payload
});

export const setStatus = (payload) => ({
  type: dashboardType.SET_STATUS,
  payload
});

export const setRequestState = (payload) => ({
  type: dashboardType.SET_REQUEST_STATE,
  payload
});

export const setErrorFetch = (payload) => ({
  type: dashboardType.SET_ERROR_FETCH,
  payload
});

export const getJobsInfo = (params) => {
  return async (dispatch) => {
    try {
      const response = await service_Dashboard.getJobs(params);
      dispatch(setJobsInfo(response.data));
      dispatch(setJobsInfoError(null)); //control de errores
    } catch (error) {
      if (!error.response) {
        dispatch(setJobsInfoError("Ha ocurrido un error interno."));
      } else {
        if (error.response.status === 401) {
          dispatch(setJobsInfoError(error.response.data.message));
        } else if (error.response.status === 409) {
          dispatch(setJobsInfoError("La cuenta ya existe. Por favor Iniciar sesión."));
        } else {
          dispatch(setJobsInfoError("Ha ocurrido un error interno."));
        };
      }
    }
  };
};

export const getPublicationsInfo = () => {
  return async (dispatch) => {
    try {
      const response = await service_Dashboard.getPublications();
      dispatch(setPublicationsInfo(response.data));
      dispatch(setPublicationsErrorInfo(null)); //control de errores
    } catch (error) {
      if (!error.response) {
        dispatch(setPublicationsErrorInfo("Ha ocurrido un error interno."));
      } else {
        if (error.response.status === 401) {
          dispatch(setPublicationsErrorInfo(error.response.data.message));
        } else {
          dispatch(setPublicationsErrorInfo("Ha ocurrido un error interno."));
        };
      }
    }
  };
};

export const setArchivePublicationError = (payload) => ({
  type: dashboardType.SET_ARCHIVE_PUBLICATION_ERROR,
  payload
});

export const archivePublication = (body) => {
  return async (dispatch) => {
    try {
      const response = await service_Dashboard.archivePublication(body);
      dispatch(getPublicationsInfo());
      dispatch(setArchivePublicationError(null)); //control de errores
    } catch (error) {
      if (!error.response) {
        dispatch(setArchivePublicationError("Ha ocurrido un error interno.1"));
      } else {
        if (error.response.status === 409) {
          dispatch(setArchivePublicationError(error.response.data.message));
        } else {
          dispatch(setArchivePublicationError("Ha ocurrido un error interno.2"));
        };
      }
    }
  };
};

export const setDeletePublicationError = (payload) => ({
  type: dashboardType.SET_DELETE_PUBLICATION_ERROR,
  payload
});

export const deletePublication = (body) => {
  return async (dispatch) => {
    try {
      const response = await service_Dashboard.deletePublication(body);
      dispatch(getPublicationsInfo());
      dispatch(setDeletePublicationError(null)); //control de errores
    } catch (error) {
      if (!error.response) {
        dispatch(setDeletePublicationError("Ha ocurrido un error interno.1"));
      } else {
        if (error.response.status === 409) {
          dispatch(setDeletePublicationError(error.response.data.message));
        } else {
          dispatch(setDeletePublicationError("Ha ocurrido un error interno.2"));
        };
      }
    }
  };
};

export const setPostulantsByPublicationIdError = (payload) => ({
  type: dashboardType.SET_POSTULANTS_BY_PUBLICATION_ID_ERROR,
  payload
});
export const setPostulantsByPublicationId = (payload) => ({
  type: dashboardType.SET_POSTULANTS_BY_PUBLICATION_ID,
  payload
});

export const getPostulantsByPublicationId = (body) => {
  return async (dispatch) => {
    try {
      const response = await service_Dashboard.getPostulantsByPublicationId(body);
      dispatch(setPostulantsByPublicationId(response.data));
      dispatch(setPostulantsByPublicationIdError(null)); //control de errores
    } catch (error) {
      if (!error.response) {
        dispatch(setPostulantsByPublicationIdError("Ha ocurrido un error interno.1"));
      } else {
        if (error.response.status === 409) {
          dispatch(setPostulantsByPublicationIdError(error.response.data.message));
        } else {
          dispatch(setPostulantsByPublicationIdError("Ha ocurrido un error interno.2"));
        };
      }
    }
  };
};

export const setProfileApplicantError = (payload) => ({
  type: dashboardType.SET_PROFILE_OF_APPLICANT_ERROR,
  payload
});
export const setProfileOfApplicant = (payload) => ({
  type: dashboardType.SET_PROFILE_OF_APPLICANT,
  payload
});
