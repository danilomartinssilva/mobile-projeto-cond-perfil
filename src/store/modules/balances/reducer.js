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
      case '@balances/ADD_REQUEST':
      case '@balances/DESTROY_REQUEST':
      case '@balances/UPDATE_REQUEST':
      case '@balances/SHOW_REQUEST':

      case '@balances/LOAD_REQUEST': {
        draft.loading = true;
        draft.detail = undefined;
        break;
      }
      case '@balances/UPDATE_SUCESS': {
        const {id, ...rest} = action.balance;
        draft.items = state.items.map((item) =>
          item.id === id ? {...item, ...rest} : item,
        );
        draft.loading = false;
        draft.refreshing = false;
        draft.failed = false;
        draft.detail = undefined;
        break;
      }
      case '@balances/ADD_SUCCESS': {
        draft.items = [...state.items, action.balance];
        draft.loading = false;
        draft.detail = undefined;
        break;
      }
      case '@balancess/ADD_DOCUMENT_SUCESS': {
        draft.document = action.document;
        draft.loading = false;
        draft.detail = undefined;
        break;
      }

      case '@balances/LOAD_SUCCESS': {
        draft.items = action.items;
        draft.loading = false;
        draft.detail = undefined;
        break;
      }
      case '@balances/SHOW_SUCESS': {
        draft.detail = action.balance;
        break;
      }

      case '@balances/DESTROY_SUCESS': {
        draft.items = state.items.filter((o) => o.id !== action.id);
        draft.loading = false;
        break;
      }
      case '@balances/DESTROY_FAILURE':
      case '@balances/LOAD_FAILURE':
      case '@balances/UPDATE_FAILURE':
      case '@balances/SHOW_FAILURE':

      case '@balances/ADD_FAILURE': {
        draft.failed = action.failed;
        break;
      }
      default:
    }
  });
}
