import produce from 'immer';
const INITIAL_STATE = {
  items: [],
  loading: false,
  failed: undefined,
  document: undefined,
  detail: undefined,
};
export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@minutes/ADD_REQUEST':
      case '@minutes/DESTROY_REQUEST':
      case '@minutes/UPDATE_REQUEST':
      case '@minutes/SHOW_REQUEST':

      case '@minutes/LOAD_REQUEST': {
        draft.loading = true;
        draft.detail = undefined;
        break;
      }
      case '@minutes/UPDATE_SUCESS': {
        const {id, ...rest} = action.minute;
        draft.items = state.items.map((item) =>
          item.id === id ? {...item, ...rest} : item,
        );
        draft.loading = false;
        draft.refreshing = false;
        draft.failed = false;
        draft.detail = undefined;
        break;
      }
      case '@minutes/ADD_SUCCESS': {
        draft.items = [...state.items, action.minute];
        draft.loading = false;
        draft.detail = undefined;
        break;
      }

      case '@minutes/LOAD_SUCCESS': {
        draft.items = action.items;
        draft.loading = false;
        draft.detail = undefined;
        break;
      }
      case '@minutes/SHOW_SUCESS': {
        draft.detail = action.minute;
        break;
      }

      case '@minutes/DESTROY_SUCESS': {
        draft.items = state.items.filter((o) => o.id !== action.id);
        draft.loading = false;
        break;
      }
      case '@minutes/DESTROY_FAILURE':
      case '@minutes/LOAD_FAILURE':
      case '@minutes/UPDATE_FAILURE':
      case '@minutes/SHOW_FAILURE':

      case '@minutes/ADD_FAILURE': {
        draft.failed = action.failed;
        break;
      }
      default:
    }
  });
}
