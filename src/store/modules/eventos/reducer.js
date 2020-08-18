import produce from 'immer';
const INITIAL_STATE = {
  items: [],
  loading: false,
  failed: undefined,
};
export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@event/ADD_REQUEST':
      case '@event/DESTROY_REQUEST':
      case '@event/LOAD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@event/ADD_SUCCESS': {
        draft.items = [...state.items, action.event];
        draft.loading = false;
        break;
      }
      case '@event/LOAD_SUCCESS': {
        draft.items = action.items;
        draft.loading = false;
        break;
      }
      case '@event/DESTROY_SUCESS': {
        draft.items = state.items.filter((o) => o.id !== action.id);
        draft.loading = false;
        break;
      }
      case '@event/DESTROY_FAILURE':
      case '@event/LOAD_FAILURE':
      case '@event/ADD_FAILURE': {
        draft.failed = action.failed;
        break;
      }
      default:
    }
  });
}
