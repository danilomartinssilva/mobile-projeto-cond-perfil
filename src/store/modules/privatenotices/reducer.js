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
      case '@privateNotices/ADD_REQUEST':
      case '@privateNotices/DESTROY_REQUEST':
      case '@privateNotices/UPDATE_REQUEST':
      case '@privateNotices/SHOW_REQUEST':

      case '@privateNotices/LOAD_REQUEST': {
        draft.loading = true;
        draft.detail = undefined;
        break;
      }
      case '@privateNotices/UPDATE_SUCESS': {
        const {id, ...rest} = action.privateNotice;
        draft.items = state.items.map((item) =>
          item.id === id ? {...item, ...rest} : item,
        );
        draft.loading = false;
        draft.refreshing = false;
        draft.failed = false;
        draft.detail = undefined;
        break;
      }
      case '@privateNotices/ADD_SUCCESS': {
        draft.items = [...state.items, action.privateNotice];
        draft.loading = false;
        draft.detail = undefined;
        break;
      }

      case '@privateNotices/LOAD_SUCCESS': {
        draft.items = action.items;
        draft.loading = false;
        draft.detail = undefined;
        break;
      }
      case '@privateNotices/SHOW_SUCESS': {
        draft.detail = action.privateNotice;
        break;
      }

      case '@privateNotices/DESTROY_SUCESS': {
        draft.items = state.items.filter((o) => o.id !== action.id);
        draft.loading = false;
        break;
      }
      case '@privateNotices/DESTROY_FAILURE':
      case '@privateNotices/LOAD_FAILURE':
      case '@privateNotices/UPDATE_FAILURE':
      case '@privateNotices/SHOW_FAILURE':

      case '@privateNotices/ADD_FAILURE': {
        draft.failed = action.failed;
        break;
      }
      default:
    }
  });
}
