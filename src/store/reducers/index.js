import { combineReducers } from 'redux'


import admin from './admin/admin.reducer';
import applicant from './applicant/applicant.reducer';
import auth from './auth/auth.reducer';
import dashboard from './dashboard/dashboard.reducer';
import utils from './utils/utils.reducer';
import global from './global';
import home from './home/home.reducers';

const rootReducer = combineReducers({
  admin,
  auth,
  dashboard,
  utils,
  applicant,
  global,
  home
});

const reducers = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return rootReducer(state, action)
}

export default reducers;
