// importando Key y reducer's
import { SET_USER_LOADING, reducer as loadingReducer } from './actions/set-loading-user';
import { SET_USER_ERROR, reducer as errorReducer } from './actions/set-error-user';
import { SET_USER_INFO, reducer as userInfoReducer } from './actions/set-user-info';
import { SIGN_IN, reducer as signInReducer } from './actions/sign-in';
import { SIGN_UP, reducer as signUpReducer } from './actions/sign-up';
import { LOGOUT, reducer as logoutReducer } from './actions/logout';
import { SET_INIT_USER, reducer as initUserReducer } from './actions/init-user';
import { SET_JOB, reducer as setJobReducer } from './actions/set-job';
import { REMOVE_JOB, reducer as removeJobReducer } from './actions/remove-job';

// exportamos nuestras acciones
export { setUserLoading } from './actions/set-loading-user';
export { setUserError } from './actions/set-error-user';
export { setUserInfo } from './actions/set-user-info';
export { setSignInUser, signIn } from './actions/sign-in';
export { setSignUpUser, signUp } from './actions/sign-up';

const initialState = {
  currentUser: {
    id_account: null,
    first_name: null,
    last_name: null,
    gender: null,
    type_doc: null,
    num_doc: null,
    birth_date: null,
    address: null,
    phone: null,
    id_country: null,
    id_state: null,
    id_city: null,
    id_civil_status: null,
    id_provider: null,
    jobs: []
  },
  loading: false,
  error: null,
  signIn: false,
  signUp: false
};

const actionHandlers = {
  [SET_USER_LOADING]: loadingReducer,
  [SET_USER_ERROR]: errorReducer,
  [SET_USER_INFO]: userInfoReducer,
  [SIGN_IN]: signInReducer,
  [SIGN_UP]: signUpReducer,
  [LOGOUT]: logoutReducer,
  [SET_INIT_USER]: initUserReducer,
  [SET_JOB]: setJobReducer,
  [REMOVE_JOB]: removeJobReducer,
};

export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
