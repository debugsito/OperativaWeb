import { combineReducers } from 'redux'

import auth from './auth/auth.reducer';

import dashboard from './dashboard/dashboard.reducer';
import utils from './utils/utils.reducer';
import applicant from './applicant/applicant.reducer';
import global from './global';

const rootReducer = combineReducers({
  auth,
  dashboard,
  utils,
  applicant,
  global
});

const reducers = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return rootReducer(state, action)
}

export default reducers;
