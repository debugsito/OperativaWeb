import { homeType } from "../../types/home";

const initialState = {
    isPostulant: false,
    status: 'idle',
    error: null
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
        case homeType.SEND_EMAIL:
            return {
                ...state,
                status: 'loading',
            };


        case homeType.SET_FETCH_LOADING:
            return {
                ...state,
                status: 'loading',
            };
        case homeType.SET_FETCH_SUCCESS:
            return {
                ...state,
                status: 'success',
            };
        case homeType.SET_FETCH_ERROR:
            return {
                ...state,
                status: 'failure',
            };
        case homeType.SET_FETCH_IDLE:
            return {
                ...state,
                status: 'idle',
            };

        default:
            return state;
    }
};

export default homeTypeReducer;
