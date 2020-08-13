export function loginRequest(email, password) {
  return {
    type: '@AUTH/loginRequest',
    payload: {email, password},
  };
}
export function loginSuccess(token, data) {
  return {
    type: '@AUTH/loginSuccess',
    token,
    data,
  };
}
export function loginFailure(err) {
  return {
    type: '@AUTH/loginFailure',
    err,
  };
}
export function logoffRequest() {
  return {
    type: '@AUTH/logoffRequest',
  };
}
export function logoffSuccess() {
  return {
    type: '@AUTH/logoffSuccess',
  };
}
export function logoffFailure(err) {
  return {
    type: '@AUTH/logoffFailure',
    err,
  };
}
export function registerRequest(profile) {
  return {
    type: '@AUTH/registerRequest',
    profile,
  };
}
export function registerSuccess(data) {
  return {
    type: '@AUTH/registerRequest',
    data,
  };
}

export function registerFailure(error) {
  return {
    type: '@AUTH/registerFailure',
    error,
  };
}
