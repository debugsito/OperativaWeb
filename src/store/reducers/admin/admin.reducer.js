import { adminType } from "../../types/admin";

const initialState = {
    report: {},
    error: null,
};

const adminTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case adminType.SET_ERROR_FETCH:
            return {
                ...state,
                error: action.payload,
            };
        case adminType.SET_REPORT:
            return {
                ...state,
                report: action.payload,
            };

        default:
            return state;
    }
};

export default adminTypeReducer;
