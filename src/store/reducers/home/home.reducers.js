import { homeType } from "../../types/home";

const initialState = {
    isPostulant: false,
    error: null,
};

const homeTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case homeType.SET_ERROR_FETCH:
            return {
                ...state,
                error: action.payload,
            };
        case homeType.SET_IS_POSTULANT:
            return {
                ...state,
                isPostulant: action.payload,
            };

        default:
            return state;
    }
};

export default homeTypeReducer;
