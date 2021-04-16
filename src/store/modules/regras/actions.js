export function addRegraRequest(regra) {
  return {
    type: '@regras/ADD_REQUEST',
    regra,
  };
}
export function addDocumentRequest(content) {
  return {
    type: '@regras/ADD_DOCUMENT_REQUEST',
    content,
  };
}
export function addDocumentSucess(document) {
  return {
    type: '@regras/ADD_DOCUMENT_SUCESS',
    document,
  };
}
export function addDocumentFailure(failed) {
  return {
    type: '@regras/ADD_DOCUMENT_FAILURE',
    failed,
  };
}
export function addRegraSucess(regra) {
  return {
    type: '@regras/ADD_SUCCESS',
    regra,
  };
}
export function destroyRegraRequest(id) {
  return {
    type: '@regras/DESTROY_REQUEST',
    id,
  };
}
export function destroyRegraSuccess(id) {
  return {
    type: '@regras/DESTROY_SUCESS',
    id,
  };
}
export function destroyRegraFailure(failed) {
  return {
    type: '@regras/DESTROY_FAILURE',
    failed,
  };
}
export function loadRegraRequest() {
  return {
    type: '@regras/LOAD_REQUEST',
  };
}
export function getAllRequest() {
  return {
    type: '@regras/GET_ALL_REQUEST',
  };
}
export function getAllSucess(items) {
  return {
    type: '@regras/GET_ALL_SUCESS',
    items,
  };
}
export function getAllFailure(failed) {
  return {
    type: '@regras/GET_ALL_FAILURE',
    failed,
  };
}
export function loadRegraSuccess(items) {
  return {
    type: '@regras/LOAD_SUCCESS',
    items,
  };
}
export function loadRegraFailure(failed) {
  return {
    type: '@regras/LOAD_FAILURE',
    failed,
  };
}
export function addRegraFailure(failed) {
  return {
    type: '@regras/ADD_FAILURE',
    failed,
  };
}
export function updateRegraRequest(regra) {
  return {
    type: '@regras/UPDATE_REQUEST',
    regra,
  };
}
export function updateRegraSucess(regra) {
  return {
    type: '@regras/UPDATE_SUCESS',
    regra,
  };
}
export function updateRegraFailure(failed) {
  return {
    type: '@regras/UPDATE_FAILURE',
    failed,
  };
}
