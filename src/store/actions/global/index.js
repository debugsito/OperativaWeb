import { globalType } from "../../types/global";

export const setAlert = (payload) => ({
    type: globalType.SET_ALERT,
    payload
});