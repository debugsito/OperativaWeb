export const LOGOUT_ACCOUNT = 'User/LOGOUT_ACCOUNT';

export const logoutAccount = () => ({
  type: LOGOUT_ACCOUNT,
});

export const reducer = (state, action) => ({
  ...state,
  account: null
});
