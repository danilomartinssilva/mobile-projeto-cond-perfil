import produce from 'immer'
const INITIAL_STATE = {
  items: [],
  loading: false,
  failed: undefined,

  detail: undefined,
}
export default function reducer (state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@privatenotices/ADD_REQUEST':
      case '@privatenotices/DESTROY_REQUEST':
      case '@privatenotices/UPDATE_REQUEST':
      case '@privatenotices/SHOW_REQUEST':

      case '@privatenotices/LOAD_REQUEST': {
        draft.loading = true
        draft.detail = undefined
        break
      }
      case '@privatenotices/UPDATE_SUCESS': {
        const {id, ...rest} = action.privateNotice
        draft.items = state.items.map(item =>
          item.id === id ? {...item, ...rest} : item,
        )
        draft.loading = false
        draft.refreshing = false
        draft.failed = false
        draft.detail = undefined
        break
      }
      case '@privatenotices/ADD_SUCCESS': {
        draft.items = [...state.items, action.privateNotice]
        draft.loading = false
        draft.detail = undefined
        break
      }

      case '@privatenotices/LOAD_SUCESS': {
        draft.items = action.items
        draft.loading = false
        draft.detail = undefined
        break
      }
      case '@privatenotices/SHOW_SUCESS': {
        draft.detail = action.privateNotice
        break
      }

      case '@privatenotices/DESTROY_SUCESS': {
        draft.items = state.items.filter(o => o.id !== action.id)
        draft.loading = false
        break
      }
      case '@privatenotices/DESTROY_FAILURE':
      case '@privatenotices/LOAD_FAILURE':
      case '@privatenotices/UPDATE_FAILURE':
      case '@privatenotices/SHOW_FAILURE':

      case '@privatenotices/ADD_FAILURE': {
        draft.failed = action.failed
        break
      }
      default:
    }
  })
}
