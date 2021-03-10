import { authType } from "../../types/auth";

const initialState = {
    user: {
        account: {
            rol_usuario: '',
            id: '',
            email: '',
            role: '',
            updateAt: '',
            createAt: '',
        },
        token: ''
    },
    applicantSignUp: null,
    error: false,
    accountType: '',
    signUpSucces: null,
    showLoading: false
};

const accountTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case authType.SIGN_UP:
            return {
                ...state,
                applicantSignUp: action.payload,
            };
        case authType.LOGIN_SUCCESS:
            return {
                ...state,
                signUpSucces: action.payload,
            };
        case authType.SHOW_LOADING:
            return {
                ...state,
                showLoading: action.payload,
            };
        case authType.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case authType.SET_USER_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case authType.CLEAR_SIGN_UP:
            return initialState;
        case authType.SET_ACCOUNT_TYPE:
            return {
                ...state,
                accountType: action.payload,
            };
        case authType.CLEAR_ACCOUNT_TYPE:
            return initialState;
        case authType.FETCH_LOGIN:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default accountTypeReducer;
