import { globalType, } from "../../types/global";

export const setAlert = (payload) => ({
    type: globalType.SET_ALERT,
    payload
});

export const resetStore = () => ({
    type: globalType.RESET_STORE
});