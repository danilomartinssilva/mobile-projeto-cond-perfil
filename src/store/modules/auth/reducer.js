const INITIAL_STATE = {
  token: null,
  signed: false,
  failed: null,
  isBusy: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@AUTH/loginRequest':
    case '@AUTH/registerRequest':
      return {...state, isBusy: true};
    case '@AUTH/loginSuccess':
      return {
        ...state,
        isBusy: false,
        token: action.token,
        signed: true,
        failed: undefined,
      };

    case '@AUTH/loginFailure':
      return {isBusy: false, token: null, signed: false, failed: action.err};
    case '@AUTH/logoffRequest':
      return {...state, isBusy: true};
    case '@AUTH/logoffSuccess':
      return {token: null, isBusy: false, signed: false, failed: null};
    case '@AUTH/logoffFailure':
    case '@AUTH/registerFailure':
      return {token: null, isBusy: false, signed: false, failed: action.err};
    default:
      return state;
  }
}
