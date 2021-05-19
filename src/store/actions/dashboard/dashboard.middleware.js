import { service_Dashboard } from "../../services";
import { setErrorFetch, setHistory, setReportByPostulantId } from "./dashboard.action";

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
