import { service_Dashboard } from "../../services";
import { setErrorFetch, setHistory, setReportByPostulantId, setRequestState } from "./dashboard.action";

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
      await service_Dashboard.savePublication(body);
      dispatch(setRequestState({ success: true })); //control de errores
    } catch (error) {
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
