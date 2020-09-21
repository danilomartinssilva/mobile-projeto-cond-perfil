import produce from 'immer';
const INITIAL_STATE = {
  items: [],
  loading: false,
  failed: undefined,

  detail: undefined,
};
export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@manuals/ADD_REQUEST':
      case '@manuals/DESTROY_REQUEST':
      case '@manuals/UPDATE_REQUEST':
      case '@manuals/SHOW_REQUEST':

      case '@manuals/LOAD_REQUEST': {
        draft.loading = true;
        draft.detail = undefined;
        break;
      }
      case '@manuals/UPDATE_SUCESS': {
        const {id, ...rest} = action.manual;
        draft.items = state.items.map((item) =>
          item.id === id ? {...item, ...rest} : item,
        );
        draft.loading = false;
        draft.refreshing = false;
        draft.failed = false;
        draft.detail = undefined;
        break;
      }
      case '@manuals/ADD_SUCCESS': {
        draft.items = [...state.items, action.manual];
        draft.loading = false;
        draft.detail = undefined;
        break;
      }

      case '@manuals/LOAD_SUCCESS': {
        draft.items = action.items;
        draft.loading = false;
        draft.detail = undefined;
        break;
      }
      case '@manuals/SHOW_SUCESS': {
        draft.detail = action.manual;
        break;
      }

      case '@manuals/DESTROY_SUCESS': {
        draft.items = state.items.filter((o) => o.id !== action.id);
        draft.loading = false;
        break;
      }
      case '@manuals/DESTROY_FAILURE':
      case '@manuals/LOAD_FAILURE':
      case '@manuals/UPDATE_FAILURE':
      case '@manuals/SHOW_FAILURE':

      case '@manuals/ADD_FAILURE': {
        draft.failed = action.failed;
        break;
      }
      default:
    }
  });
}
