export function AddCondominiumtRequest(condominium) {
  return {
    type: '@condominium/ADD_REQUEST',
    condominium,
  };
}
export function AddCondominiumtSucess(condominium) {
  return {
    type: '@condominium/ADD_SUCCESS',
    condominium,
  };
}
export function destroyCondominiumRequest(id) {
  return {
    type: '@condominium/DESTROY_REQUEST',
    id,
  };
}
export function destroyCondominiumSuccess(id) {
  return {
    type: '@condominium/DESTROY_SUCESS',
    id,
  };
}
export function destroyCondominiumFailure(failed) {
  return {
    type: '@condominium/DESTROY_FAILURE',
    failed,
  };
}
export function loadCondominiumRequest() {
  return {
    type: '@condominium/LOAD_REQUEST',
  };
}
export function loadCondominiumSuccess(items) {
  return {
    type: '@condominium/LOAD_SUCCESS',
    items,
  };
}
export function loadCondominiumFailure(failed) {
  return {
    type: '@condominium/LOAD_FAILURE',
    failed,
  };
}
export function AddCondominiumFailure(failed) {
  return {
    type: '@condominium/ADD_FAILURE',
    failed,
  };
}
