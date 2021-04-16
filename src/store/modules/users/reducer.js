import produce from 'immer'
const INITIAL_STATE = {
  items: [],
  loading: false,
  failed: undefined,
  document: undefined,
  detail: undefined,
}
export default function reducer (state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@users/DESTROY_REQUEST':
      case '@users/UPDATE_REQUEST':
      case '@users/SHOW_REQUEST':

      case '@users/GET_ALL_REQUEST': {
        draft.loading = true
        draft.detail = undefined
        break
      }
      case '@users/UPDATE_SUCESS': {
        const {id, ...rest} = action.user
        draft.items = state.items.map(item =>
          item.id === id ? {...item, ...rest} : item,
        )
        draft.loading = false
        draft.refreshing = false
        draft.failed = false
        draft.detail = undefined
        break
      }

      case '@users/GET_ALL_SUCESS': {
        draft.items = action.items
        draft.loading = false
        draft.detail = undefined
        break
      }
      case '@users/SHOW_SUCESS': {
        draft.detail = action.user
        break
      }

      case '@users/DESTROY_SUCESS': {
        draft.items = state.items.filter(o => o.id !== action.id)
        draft.loading = false
        break
      }
      case '@users/DESTROY_FAILURE':
      case '@users/GET_ALL_FAILURE':
      case '@users/UPDATE_FAILURE':
      case '@users/SHOW_FAILURE': {
        draft.failed = action.failed
        break
      }
      default:
    }
  })
}
