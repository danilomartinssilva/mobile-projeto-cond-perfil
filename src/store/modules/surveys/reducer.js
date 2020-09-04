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
      case '@surveys/ADD_REQUEST':
      case '@surveys/DESTROY_REQUEST':
      case '@surveys/UPDATE_REQUEST':
      case '@surveys/SHOW_REQUEST':
      case '@surveys/ADD_VOTE_REQUEST':

      case '@surveys/LOAD_REQUEST': {
        draft.loading = true;
        draft.detail = undefined;
        break;
      }
      case '@surveys/UPDATE_SUCESS': {
        const {id, ...rest} = action.survey;
        draft.items = state.items.map((item) =>
          item.id === id ? {...item, ...rest} : item,
        );
        draft.loading = false;
        draft.refreshing = false;
        draft.failed = false;
        draft.detail = undefined;
        break;
      }
      case '@surveys/ADD_SUCCESS': {
        draft.items = [...state.items, action.survey];
        draft.loading = false;
        draft.detail = undefined;
        break;
      }

      case '@surveys/LOAD_SUCCESS': {
        draft.items = action.items;
        draft.loading = false;
        draft.detail = undefined;
        break;
      }
      case '@surveys/SHOW_SUCESS': {
        draft.detail = action.survey;
        break;
      }

      case '@surveys/DESTROY_SUCESS': {
        draft.items = state.items.filter((o) => o.id !== action.id);
        draft.loading = false;
        break;
      }
      case '@surveys/ADD_VOTE_SUCESS': {
        draft.loading = false;
        draft.failed = false;
        draft.items = state.items.map((item, _) => {
          const {survey_refresh} = action;
          if (item.id === survey_refresh.id) {
            item = survey_refresh;
          }
          return item;
        });
      }

      case '@surveys/DESTROY_FAILURE':
      case '@surveys/LOAD_FAILURE':
      case '@surveys/UPDATE_FAILURE':
      case '@surveys/SHOW_FAILURE':
      case '@surveys/ADD_VOTE_FAILURE':

      case '@surveys/ADD_FAILURE': {
        draft.failed = action.failed;
        break;
      }
      default:
    }
  });
}
