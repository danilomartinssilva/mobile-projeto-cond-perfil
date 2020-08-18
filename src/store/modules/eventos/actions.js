export function addEventRequest(event) {
  return {
    type: '@event/ADD_REQUEST',
    event,
  };
}
export function addEventSucess(event) {
  return {
    type: '@event/ADD_SUCCESS',
    event,
  };
}
export function destroyEventRequest(id) {
  return {
    type: '@event/DESTROY_REQUEST',
    id,
  };
}
export function destroyEventSuccess(id) {
  return {
    type: '@event/DESTROY_SUCESS',
    id,
  };
}
export function destroyEventFailure(failed) {
  return {
    type: '@event/DESTROY_FAILURE',
    failed,
  };
}
export function loadEventRequest() {
  return {
    type: '@event/LOAD_REQUEST',
  };
}
export function loadEventSuccess(items) {
  return {
    type: '@event/LOAD_SUCCESS',
    items,
  };
}
export function loadEventFailure(failed) {
  return {
    type: '@event/LOAD_FAILURE',
    failed,
  };
}
export function addEventFailure(failed) {
  return {
    type: '@event/ADD_FAILURE',
    failed,
  };
}
