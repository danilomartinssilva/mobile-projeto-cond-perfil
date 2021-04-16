import produce from 'immer';
const INITIAL_STATE = {
  item: undefined,
  loading: false,
  failed: undefined,
};
export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@files/UPLOAD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@files/UPLOAD_SUCCESS': {
        draft.item = action.file;
        draft.loading = true;
        draft.failed = undefined;
        break;
      }

      case '@files/UPLOAD_FAILURE': {
        draft.failed = action.failed;
        break;
      }
      default:
    }
  });
}
