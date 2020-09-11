export function addMinuteRequest(minute) {
  return {
    type: '@minutes/ADD_REQUEST',
    minute,
  };
}

export function addMinuteSucess(minute) {
  return {
    type: '@minutes/ADD_SUCCESS',
    minute,
  };
}
export function destroyMinuteRequest(id) {
  return {
    type: '@minutes/DESTROY_REQUEST',
    id,
  };
}
export function destroyMinuteSuccess(id) {
  return {
    type: '@minutes/DESTROY_SUCESS',
    id,
  };
}
export function destroyMinuteFailure(failed) {
  return {
    type: '@minutes/DESTROY_FAILURE',
    failed,
  };
}
export function loadMinuteRequest() {
  return {
    type: '@minutes/LOAD_REQUEST',
  };
}
export function getAllRequest() {
  return {
    type: '@minutes/GET_ALL_REQUEST',
  };
}

export function loadMinuteSuccess(items) {
  return {
    type: '@minutes/LOAD_SUCCESS',
    items,
  };
}
export function loadMinuteFailure(failed) {
  return {
    type: '@minutes/LOAD_FAILURE',
    failed,
  };
}
export function addMinuteFailure(failed) {
  return {
    type: '@minutes/ADD_FAILURE',
    failed,
  };
}
export function updateMinuteRequest(minute) {
  return {
    type: '@minutes/UPDATE_REQUEST',
    minute,
  };
}
export function updateMinuteSucess(minute) {
  return {
    type: '@minutes/UPDATE_SUCESS',
    minute,
  };
}
export function updateMinuteFailure(failed) {
  return {
    type: '@minutes/UPDATE_FAILURE',
    failed,
  };
}
export function showMinuteRequest(id) {
  return {
    type: '@minutes/SHOW_REQUEST',
    id,
  };
}
export function showMinuteSucess(minute) {
  return {
    type: '@minutes/SHOW_SUCESS',
    minute,
  };
}
export function showMinuteFailure(failed) {
  return {
    type: '@minutes/SHOW_FAILURE',
    failed,
  };
}
