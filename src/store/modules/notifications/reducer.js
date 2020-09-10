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
      case '@notifications/ADD_REQUEST':
      case '@notifications/DESTROY_REQUEST':
      case '@notifications/UPDATE_REQUEST':
      case '@notifications/SHOW_REQUEST':

      case '@notifications/LOAD_REQUEST': {
        draft.loading = true;
        draft.detail = undefined;
        break;
      }
      case '@notifications/UPDATE_SUCESS': {
        const {id, ...rest} = action.notification;
        draft.items = state.items.map((item) =>
          item.id === id ? {...item, ...rest} : item,
        );
        draft.loading = false;
        draft.refreshing = false;
        draft.failed = false;
        draft.detail = undefined;
        break;
      }
      case '@notifications/ADD_SUCCESS': {
        draft.items = [...state.items, action.notification];
        draft.loading = false;
        draft.detail = undefined;
        break;
      }

      case '@notifications/LOAD_SUCCESS': {
        draft.items = action.items;
        draft.loading = false;
        draft.detail = undefined;
        break;
      }
      case '@notifications/SHOW_SUCESS': {
        draft.detail = action.notification;
        break;
      }

      case '@notifications/DESTROY_SUCESS': {
        draft.items = state.items.filter((o) => o.id !== action.id);
        draft.loading = false;
        break;
      }
      case '@notifications/DESTROY_FAILURE':
      case '@notifications/LOAD_FAILURE':
      case '@notifications/UPDATE_FAILURE':
      case '@notifications/SHOW_FAILURE':

      case '@notifications/ADD_FAILURE': {
        draft.failed = action.failed;
        break;
      }
      default:
    }
  });
}
