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
export function getAllRequest() {
  return {
    type: '@event/GET_ALL_REQUEST',
  };
}
export function getAllSucess(items) {
  return {
    type: '@event/GET_ALL_SUCESS',
    items,
  };
}
export function getAllFailure(failed) {
  return {
    type: '@event/GET_ALL_FAILURE',
    failed,
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
export function updateEventRequest(event) {
  return {
    type: '@event/UPDATE_REQUEST',
    event,
  };
}
export function updateEventSucess(event) {
  return {
    type: '@event/UPDATE_SUCESS',
    event,
  };
}
export function updateEventFailure(failed) {
  return {
    type: '@event/UPDATE_FAILURE',
    failed,
  };
}
