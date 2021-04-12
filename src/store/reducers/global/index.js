import { globalType } from "../../types/global";

const initialState = {
    alert: null,
};

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case globalType.SET_ALERT:
            return {
                ...state,
                alert: action.payload
            }
        default:
            return state;
    }
}

export default globalReducer;