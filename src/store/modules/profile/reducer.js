import produce from 'immer';

const INITIAL_STATE = {
  data: undefined,
  isBusy: false,
  failed: undefined,
};
export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@AUTH/loginFailure': {
        draft.failed = action.error;
        draft.data = undefined;
        break;
      }
      case '@AUTH/loginSuccess': {
        draft.data = action.data;
        draft.failed = undefined;
        break;
      }

      case '@AUTH/logoffSuccess': {
        draft.data = undefined;
        draft.failed = undefined;
        break;
      }
      case '@AUTH/logoffFailure': {
        draft.failed = undefined;
        break;
      }
      case '@profile/UPDATE_REQUEST': {
        draft.failed = undefined;
        draft.isBusy = true;

        break;
      }
      case '@profile/UPDATE_SUCCESS': {
        draft.failed = undefined;
        draft.isBusy = false;
        draft.data = action.data;

        break;
      }
      case '@profile/UPDATE_FAILURE': {
        draft.failed = action.error;
        draft.isBusy = false;

        break;
      }
      default:
    }
  });
}
