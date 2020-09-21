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
      case '@sugestions/ADD_REQUEST':
      case '@sugestions/DESTROY_REQUEST':
      case '@sugestions/SHOW_REQUEST':
      case '@sugestions/LOAD_REQUEST': {
        draft.loading = true
        draft.detail = undefined
        break
      }
      case '@sugestions/ADD_SUCCESS': {
        draft.items = [...state.items, action.sugestion]
        draft.detail = undefined
        draft.loading = false
        break
      }
      case '@sugestions/SHOW_SUCESS': {
        draft.detail = action.sugestion
        draft.loading = false
        break
      }
      case '@sugestions/LOAD_SUCCESS': {
        draft.items = action.items
        draft.detail = undefined
        draft.loading = false
        break
      }
      case '@sugestions/DESTROY_SUCESS': {
        draft.detail = undefined
        draft.items = state.items.filter(o => o.id !== action.id)
        draft.loading = false
        break
      }
      case '@sugestions/DESTROY_FAILURE':
      case '@sugestions/SHOW_FAILURE':
      case '@sugestions/LOAD_FAILURE':
      case '@sugestions/ADD_FAILURE': {
        draft.detail = undefined
        draft.failed = action.failed
        break
      }
      default:
    }
  })
}
