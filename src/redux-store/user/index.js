// importando Key y reducer's
import { SET_USER_LOADING, reducer as loadingReducer } from './actions/set-loading-user';
import { SET_USER_ERROR, reducer as errorReducer } from './actions/set-error-user';
import { SIGN_IN, reducer as signInReducer } from './actions/sign-in';
import { SIGN_UP, reducer as signUpReducer } from './actions/sign-up';

// exportamos nuestras acciones
export { setUserLoading } from './actions/set-loading-user';
export { setUserError } from './actions/set-error-user';
export { setSignInUser, signIn } from './actions/sign-in';
export { setSignUpUser, signUp } from './actions/sign-up';

const initialState = {
  currentUser: {
    name: null,
    lastname: null,
    surname: null,
    email: null
  },
  loading: false,
  error: null,
  signIn: false,
  signUp: false
};

const actionHandlers = {
  [SET_USER_LOADING]: loadingReducer,
  [SET_USER_ERROR]: errorReducer,
  [SIGN_IN]: signInReducer,
  [SIGN_UP]: signUpReducer
};

export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
