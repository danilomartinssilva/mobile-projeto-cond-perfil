import produce from 'immer'
const INITIAL_STATE = {
  items: [],
  loading: false,
  failed: undefined,
}
export default function reducer (state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@condominium/ADD_REQUEST':
      case '@condominium/DESTROY_REQUEST':
      case '@condominium/LOAD_REQUEST': {
        draft.loading = true
        break
      }
      case '@condominium/ADD_SUCCESS': {
        draft.items = [...state.items, action.condominium]
        draft.loading = false
        break
      }
      case '@condominium/LOAD_SUCCESS': {
        draft.items = action.items
        draft.loading = false
        break
      }
      case '@condominium/DESTROY_SUCESS': {
        draft.items = state.items.filter(o => o.id !== action.id)
        draft.loading = false
        break
      }
      case '@condominium/DESTROY_FAILURE':
      case '@condominium/LOAD_FAILURE':
      case '@condominium/ADD_FAILURE': {
        draft.failed = action.failed
        break
      }
      default:
    }
  })
}
