export const SET_INIT_ACCOUNT = 'User/SET_INIT_ACCOUNT';

export const setInitAccount = (account) => ({
  type: SET_INIT_ACCOUNT,
  payload: account
});

export const reducer = (state, action) => ({
  ...state,
  account: { ...state.account, ...action.payload }
});