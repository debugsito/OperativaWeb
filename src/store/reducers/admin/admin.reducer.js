import { adminType } from "../../types/admin";

const initialState = {
    report: {},
    dateOfReport: {
        startDate: "2021-03-01",
        finishDate: "2021-05-31"
    },
    listUsers: [],
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
        case adminType.SET_DATE_OF_REPORT:
            return {
                ...state,
                dateOfReport: {
                    ...state.dateOfReport,
                    ...action.payload
                },
            };
        case adminType.SET_USERS:
            return {
                ...state,
                listUsers: action.payload
            };

        default:
            return state;
    }
};

export default adminTypeReducer;
