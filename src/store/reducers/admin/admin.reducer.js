import { adminType } from "../../types/admin";

const initialState = {
    report: {},
    dateOfReport: {
        startDate: "2021-03-01",
        finishDate: "2021-05-31"
    },
    listUsers: [],
    usersTable: {
        page: 0,
        rowsPerPage: 10,
        query: ""
    },
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
        case adminType.SET_PAGE:
            return {
                ...state,
                usersTable: {
                    ...state.usersTable,
                    page: action.payload
                }
            };
        case adminType.SET_ROWS_PER_PAGE:
            return {
                ...state,
                usersTable: {
                    ...state.usersTable,
                    rowsPerPage: action.payload
                }
            };
        case adminType.SET_QUERY:
            return {
                ...state,
                usersTable: {
                    ...state.usersTable,
                    query: action.payload
                }
            };

        default:
            return state;
    }
};

export default adminTypeReducer;
