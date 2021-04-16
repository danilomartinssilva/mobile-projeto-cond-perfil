export function addConventionRequest(convention) {
  return {
    type: '@conventions/ADD_REQUEST',
    convention,
  };
}

export function addConventionSucess(convention) {
  return {
    type: '@conventions/ADD_SUCCESS',
    convention,
  };
}
export function destroyConventionRequest(id) {
  return {
    type: '@conventions/DESTROY_REQUEST',
    id,
  };
}
export function destroyConventionSuccess(id) {
  return {
    type: '@conventions/DESTROY_SUCESS',
    id,
  };
}
export function destroyConventionFailure(failed) {
  return {
    type: '@conventions/DESTROY_FAILURE',
    failed,
  };
}
export function loadConventionRequest() {
  return {
    type: '@conventions/LOAD_REQUEST',
  };
}
export function getAllRequest() {
  return {
    type: '@conventions/GET_ALL_REQUEST',
  };
}
export function getAllSucess(items) {
  return {
    type: '@conventions/GET_ALL_SUCESS',
    items,
  };
}
export function getAllFailure(failed) {
  return {
    type: '@conventions/GET_ALL_FAILURE',
    failed,
  };
}
export function loadConventionSuccess(items) {
  return {
    type: '@conventions/LOAD_SUCCESS',
    items,
  };
}
export function loadConventionFailure(failed) {
  return {
    type: '@conventions/LOAD_FAILURE',
    failed,
  };
}
export function addConventionFailure(failed) {
  return {
    type: '@conventions/ADD_FAILURE',
    failed,
  };
}
export function updateConventionRequest(convention) {
  return {
    type: '@conventions/UPDATE_REQUEST',
    convention,
  };
}
export function updateConventionSucess(convention) {
  return {
    type: '@conventions/UPDATE_SUCESS',
    convention,
  };
}
export function updateConventionFailure(failed) {
  return {
    type: '@conventions/UPDATE_FAILURE',
    failed,
  };
}
export function showConventionRequest(id) {
  return {
    type: '@conventions/SHOW_REQUEST',
    id,
  };
}
export function showConventionSucess(convention) {
  return {
    type: '@conventions/SHOW_SUCESS',
    convention,
  };
}
export function showConventionFailure(failed) {
  return {
    type: '@conventions/SHOW_FAILURE',
    failed,
  };
}
