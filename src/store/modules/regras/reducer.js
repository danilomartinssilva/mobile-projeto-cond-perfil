import produce from 'immer';
const INITIAL_STATE = {
  items: [],
  loading: false,
  failed: undefined,
  document: undefined,
};
export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@regra/ADD_REQUEST':
      case '@regra/DESTROY_REQUEST':
      case '@regra/UPDATE_REQUEST':
      case '@regras/ADD_DOCUMENT_REQUEST':
      case '@regras/GET_ALL_REQUEST':

      case '@regra/LOAD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@regra/UPDATE_SUCESS': {
        const {id, ...rest} = action.regra;
        draft.items = state.items.map((item) =>
          item.id === id ? {...item, ...rest} : item,
        );
        draft.loading = false;
        draft.refreshing = false;
        draft.failed = false;
        break;
      }
      case '@regra/ADD_SUCCESS': {
        draft.items = [...state.items, action.regra];
        draft.loading = false;
        break;
      }
      case '@regras/ADD_DOCUMENT_SUCESS': {
        draft.document = action.document;
        draft.loading = false;
        break;
      }

      case '@regra/LOAD_SUCCESS': {
        draft.items = action.items;
        draft.loading = false;
        break;
      }
      case '@regra/DESTROY_SUCESS': {
        draft.items = state.items.filter((o) => o.id !== action.id);
        draft.loading = false;
        break;
      }
      case '@regra/DESTROY_FAILURE':
      case '@regra/LOAD_FAILURE':
      case '@regra/UPDATE_FAILURE':
      case '@regras/ADD_DOCUMENT_FAILURE':
      case '@regra/ADD_FAILURE': {
        draft.failed = action.failed;
        break;
      }
      default:
    }
  });
}
