export function AddSugestionRequest (sugestion) {
  return {
    type: '@sugestions/ADD_REQUEST',
    sugestion,
  }
}
export function AddSugestionSucess (sugestion) {
  return {
    type: '@sugestions/ADD_SUCCESS',
    sugestion,
  }
}
export function destroySugestionRequest (id) {
  return {
    type: '@sugestions/DESTROY_REQUEST',
    id,
  }
}
export function destroySugestionSuccess (id) {
  return {
    type: '@sugestions/DESTROY_SUCESS',
    id,
  }
}
export function destroySugestionFailure (failed) {
  return {
    type: '@sugestions/DESTROY_FAILURE',
    failed,
  }
}
export function loadSugestionRequest () {
  return {
    type: '@sugestions/LOAD_REQUEST',
  }
}
export function loadSugestionSuccess (items) {
  return {
    type: '@sugestions/LOAD_SUCCESS',
    items,
  }
}
export function loadSugestionFailure (failed) {
  return {
    type: '@sugestions/LOAD_FAILURE',
    failed,
  }
}
export function AddSugestionFailure (failed) {
  return {
    type: '@sugestions/ADD_FAILURE',
    failed,
  }
}
export function ShowSugestionSucess (failed) {
  return {
    type: '@sugestions/SHOW_SUCESS',
    failed,
  }
}
export function ShowSugestionRequest (id) {
  return {
    type: '@sugestions/SHOW_REQUEST',
    id,
  }
}
export function ShowSugestionFailure (failed) {
  return {
    type: '@sugestions/SHOW_FAILURE',
    failed,
  }
}
