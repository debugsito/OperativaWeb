import UserService from '../../../services/user.service';
import { setUserError } from './set-error-user';

export const SIGN_UP = 'User/SIGN_UP';

export const setSignUpUser = (user) => ({
  type: SIGN_UP,
  payload: user
});

// Accion de Thunk
export const signUp = (user) => {
  return async (dispatch) => {
    try {
      // dispatch llama a las acciones
      const response = await UserService.singUp(user);
      dispatch(setSignUpUser(response));
      dispatch(setUserError(null));
    } catch (error) {
      
      dispatch(setUserError(error.message));
    }
  };
};

export const reducer = (state, action) => ({
  ...state,
  signUp: action.payload
});
