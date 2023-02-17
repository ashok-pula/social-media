export const LoginStart = (usercredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
export const UserFollow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});
export const UserUnFollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
