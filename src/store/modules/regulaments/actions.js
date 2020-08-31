export function addRegulamentRequest(regulament) {
  return {
    type: '@regulaments/ADD_REQUEST',
    regulament,
  };
}

export function addRegulamentSucess(regulament) {
  return {
    type: '@regulaments/ADD_SUCCESS',
    regulament,
  };
}
export function destroyRegulamentRequest(id) {
  return {
    type: '@regulaments/DESTROY_REQUEST',
    id,
  };
}
export function destroyRegulamentSuccess(id) {
  return {
    type: '@regulaments/DESTROY_SUCESS',
    id,
  };
}
export function destroyRegulamentFailure(failed) {
  return {
    type: '@regulaments/DESTROY_FAILURE',
    failed,
  };
}
export function loadRegulamentRequest() {
  return {
    type: '@regulaments/LOAD_REQUEST',
  };
}
export function getAllRequest() {
  return {
    type: '@regulaments/GET_ALL_REQUEST',
  };
}
export function getAllSucess(items) {
  return {
    type: '@regulaments/GET_ALL_SUCESS',
    items,
  };
}
export function getAllFailure(failed) {
  return {
    type: '@regulaments/GET_ALL_FAILURE',
    failed,
  };
}
export function loadRegulamentSuccess(items) {
  return {
    type: '@regulaments/LOAD_SUCCESS',
    items,
  };
}
export function loadRegulamentFailure(failed) {
  return {
    type: '@regulaments/LOAD_FAILURE',
    failed,
  };
}
export function addRegulamentFailure(failed) {
  return {
    type: '@regulaments/ADD_FAILURE',
    failed,
  };
}
export function updateRegulamentRequest(regulament) {
  return {
    type: '@regulaments/UPDATE_REQUEST',
    regulament,
  };
}
export function updateRegulamentSucess(regulament) {
  return {
    type: '@regulaments/UPDATE_SUCESS',
    regulament,
  };
}
export function updateRegulamentFailure(failed) {
  return {
    type: '@regulaments/UPDATE_FAILURE',
    failed,
  };
}
export function showRegulamentRequest(id) {
  return {
    type: '@regulaments/SHOW_REQUEST',
    id,
  };
}
export function showRegulamentSucess(regulament) {
  return {
    type: '@regulaments/SHOW_SUCESS',
    regulament,
  };
}
export function showRegulamentFailure(failed) {
  return {
    type: '@regulaments/SHOW_FAILURE',
    failed,
  };
}
