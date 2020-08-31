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
      case '@regulaments/ADD_REQUEST':
      case '@regulaments/DESTROY_REQUEST':
      case '@regulaments/UPDATE_REQUEST':
      case '@regulaments/SHOW_REQUEST':

      case '@regulaments/LOAD_REQUEST': {
        draft.loading = true;
        draft.detail = undefined;
        break;
      }
      case '@regulaments/UPDATE_SUCESS': {
        const {id, ...rest} = action.regra;
        draft.items = state.items.map((item) =>
          item.id === id ? {...item, ...rest} : item,
        );
        draft.loading = false;
        draft.refreshing = false;
        draft.failed = false;
        draft.detail = undefined;
        break;
      }
      case '@regulaments/ADD_SUCCESS': {
        draft.items = [...state.items, action.regulament];
        draft.loading = false;
        draft.detail = undefined;
        break;
      }

      case '@regulaments/LOAD_SUCCESS': {
        draft.items = action.items;
        draft.loading = false;
        draft.detail = undefined;
        break;
      }
      case '@regulaments/SHOW_SUCESS': {
        draft.detail = action.regulament;
        break;
      }

      case '@regulaments/DESTROY_SUCESS': {
        draft.items = state.items.filter((o) => o.id !== action.id);
        draft.loading = false;
        break;
      }
      case '@regulaments/DESTROY_FAILURE':
      case '@regulaments/LOAD_FAILURE':
      case '@regulaments/UPDATE_FAILURE':
      case '@regulaments/SHOW_FAILURE':

      case '@regulaments/ADD_FAILURE': {
        draft.failed = action.failed;
        break;
      }
      default:
    }
  });
}
