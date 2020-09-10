export function destroyUserRequest (id) {
  return {
    type: '@users/DESTROY_REQUEST',
    id,
  }
}
export function destroyUserSuccess (id) {
  return {
    type: '@users/DESTROY_SUCESS',
    id,
  }
}
export function destroyUserFailure (failed) {
  return {
    type: '@users/DESTROY_FAILURE',
    failed,
  }
}

export function getAllRequest () {
  return {
    type: '@users/GET_ALL_REQUEST',
  }
}
export function getAllSucess (items) {
  return {
    type: '@users/GET_ALL_SUCESS',
    items,
  }
}
export function getAllFailure (failed) {
  return {
    type: '@users/GET_ALL_FAILURE',
    failed,
  }
}

export function updateUsersRequest (user) {
  return {
    type: '@users/UPDATE_REQUEST',
    user,
  }
}
export function updateUsersSucess (user) {
  return {
    type: '@users/UPDATE_SUCESS',
    user,
  }
}
export function updateUsersFailure (failed) {
  return {
    type: '@users/UPDATE_FAILURE',
    failed,
  }
}
export function showUserRequest (id) {
  return {
    type: '@users/SHOW_REQUEST',
    id,
  }
}
export function showUserSucess (user) {
  return {
    type: '@users/SHOW_SUCESS',
    user,
  }
}
export function showUserFailure (failed) {
  return {
    type: '@users/SHOW_FAILURE',
    failed,
  }
}
