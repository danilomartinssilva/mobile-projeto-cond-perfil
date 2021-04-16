export function addBalanceRequest(balance) {
  return {
    type: '@balances/ADD_REQUEST',
    balance,
  };
}

export function addBalanceSucess(balance) {
  return {
    type: '@balances/ADD_SUCCESS',
    balance,
  };
}
export function destroyBalanceRequest(id) {
  return {
    type: '@balances/DESTROY_REQUEST',
    id,
  };
}
export function destroyBalanceSuccess(id) {
  return {
    type: '@balances/DESTROY_SUCESS',
    id,
  };
}
export function destroyBalanceFailure(failed) {
  return {
    type: '@balances/DESTROY_FAILURE',
    failed,
  };
}
export function loadBalanceRequest() {
  return {
    type: '@balances/LOAD_REQUEST',
  };
}
export function getAllRequest() {
  return {
    type: '@balances/GET_ALL_REQUEST',
  };
}
export function getAllSucess(items) {
  return {
    type: '@balances/GET_ALL_SUCESS',
    items,
  };
}
export function getAllFailure(failed) {
  return {
    type: '@balances/GET_ALL_FAILURE',
    failed,
  };
}
export function loadBalanceSuccess(items) {
  return {
    type: '@balances/LOAD_SUCCESS',
    items,
  };
}
export function loadBalanceFailure(failed) {
  return {
    type: '@balances/LOAD_FAILURE',
    failed,
  };
}
export function addBalanceFailure(failed) {
  return {
    type: '@balances/ADD_FAILURE',
    failed,
  };
}
export function updateBalancesRequest(balance) {
  return {
    type: '@balances/UPDATE_REQUEST',
    balance,
  };
}
export function updateBalancesSucess(balance) {
  return {
    type: '@balances/UPDATE_SUCESS',
    balance,
  };
}
export function updateBalancesFailure(failed) {
  return {
    type: '@balances/UPDATE_FAILURE',
    failed,
  };
}
export function showBalanceRequest(id) {
  return {
    type: '@balances/SHOW_REQUEST',
    id,
  };
}
export function showBalanceSucess(balance) {
  return {
    type: '@balances/SHOW_SUCESS',
    balance,
  };
}
export function showBalanceFailure(failed) {
  return {
    type: '@balances/SHOW_FAILURE',
    failed,
  };
}
