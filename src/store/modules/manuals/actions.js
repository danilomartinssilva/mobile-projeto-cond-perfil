export function addManualRequest(manual) {
  return {
    type: '@manuals/ADD_REQUEST',
    manual,
  };
}

export function addManualSucess(manual) {
  return {
    type: '@manuals/ADD_SUCCESS',
    manual,
  };
}
export function destroyManualRequest(id) {
  return {
    type: '@manuals/DESTROY_REQUEST',
    id,
  };
}
export function destroyManualSuccess(id) {
  return {
    type: '@manuals/DESTROY_SUCESS',
    id,
  };
}
export function destroyManualFailure(failed) {
  return {
    type: '@manuals/DESTROY_FAILURE',
    failed,
  };
}
export function loadManualRequest() {
  return {
    type: '@manuals/LOAD_REQUEST',
  };
}
export function getAllRequest() {
  return {
    type: '@manuals/GET_ALL_REQUEST',
  };
}
export function getAllSucess(items) {
  return {
    type: '@manuals/GET_ALL_SUCESS',
    items,
  };
}
export function getAllFailure(failed) {
  return {
    type: '@manuals/GET_ALL_FAILURE',
    failed,
  };
}
export function loadManualSuccess(items) {
  return {
    type: '@manuals/LOAD_SUCCESS',
    items,
  };
}
export function loadManualFailure(failed) {
  return {
    type: '@manuals/LOAD_FAILURE',
    failed,
  };
}
export function addManualFailure(failed) {
  return {
    type: '@manuals/ADD_FAILURE',
    failed,
  };
}
export function updateManualsRequest(manual) {
  return {
    type: '@manuals/UPDATE_REQUEST',
    manual,
  };
}
export function updateManualsSucess(manual) {
  return {
    type: '@manuals/UPDATE_SUCESS',
    manual,
  };
}
export function updateManualsFailure(failed) {
  return {
    type: '@manuals/UPDATE_FAILURE',
    failed,
  };
}
export function showManualRequest(id) {
  return {
    type: '@manuals/SHOW_REQUEST',
    id,
  };
}
export function showManualSucess(manual) {
  return {
    type: '@manuals/SHOW_SUCESS',
    manual,
  };
}
export function showManualFailure(failed) {
  return {
    type: '@manuals/SHOW_FAILURE',
    failed,
  };
}
