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
      case '@convention/ADD_REQUEST':
      case '@convention/DESTROY_REQUEST':
      case '@convention/UPDATE_REQUEST':
      case '@convention/SHOW_REQUEST':

      case '@convention/LOAD_REQUEST': {
        draft.loading = true;
        draft.detail = undefined;
        break;
      }
      case '@convention/UPDATE_SUCESS': {
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
      case '@convention/ADD_SUCCESS': {
        draft.items = [...state.items, action.convention];
        draft.loading = false;
        draft.detail = undefined;
        break;
      }

      case '@convention/LOAD_SUCCESS': {
        draft.items = action.items;
        draft.loading = false;
        draft.detail = undefined;
        break;
      }
      case '@convention/SHOW_SUCESS': {
        draft.detail = action.convention;
        break;
      }

      case '@convention/DESTROY_SUCESS': {
        draft.items = state.items.filter((o) => o.id !== action.id);
        draft.loading = false;
        break;
      }
      case '@convention/DESTROY_FAILURE':
      case '@convention/LOAD_FAILURE':
      case '@convention/UPDATE_FAILURE':
      case '@convention/SHOW_FAILURE':

      case '@convention/ADD_FAILURE': {
        draft.failed = action.failed;
        break;
      }
      default:
    }
  });
}
