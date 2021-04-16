export function addPrivateNoticeRequest (privateNotice) {
  return {
    type: '@privatenotices/ADD_REQUEST',
    privateNotice,
  }
}

export function addPrivateNoticeSucess (privateNotice) {
  return {
    type: '@privatenotices/ADD_SUCCESS',
    privateNotice,
  }
}
export function destroyPrivateNoticeRequest (id) {
  return {
    type: '@privatenotices/DESTROY_REQUEST',
    id,
  }
}
export function destroyPrivateNoticeSuccess (id) {
  return {
    type: '@privatenotices/DESTROY_SUCESS',
    id,
  }
}
export function destroyPrivateNoticeFailure (failed) {
  return {
    type: '@privatenotices/DESTROY_FAILURE',
    failed,
  }
}
export function loadPrivateNoticeRequest () {
  return {
    type: '@privatenotices/LOAD_REQUEST',
  }
}
export function getAllRequest () {
  return {
    type: '@privatenotices/GET_ALL_REQUEST',
  }
}
export function getAllSucess (items) {
  return {
    type: '@privatenotices/GET_ALL_SUCESS',
    items,
  }
}
export function getAllFailure (failed) {
  return {
    type: '@privatenotices/GET_ALL_FAILURE',
    failed,
  }
}
export function loadPrivateNoticeSucess (items) {
  return {
    type: '@privatenotices/LOAD_SUCESS',
    items,
  }
}
export function loadPrivateNoticeFailure (failed) {
  return {
    type: '@privatenotices/LOAD_FAILURE',
    failed,
  }
}
export function addPrivateNoticeFailure (failed) {
  return {
    type: '@privatenotices/ADD_FAILURE',
    failed,
  }
}
export function updatePrivateNoticesRequest (privateNotice) {
  return {
    type: '@privatenotices/UPDATE_REQUEST',
    privateNotice,
  }
}
export function updatePrivateNoticesSucess (privateNotice) {
  return {
    type: '@privatenotices/UPDATE_SUCESS',
    privateNotice,
  }
}
export function updatePrivateNoticesFailure (failed) {
  return {
    type: '@privatenotices/UPDATE_FAILURE',
    failed,
  }
}
export function showPrivateNoticeRequest (id) {
  return {
    type: '@privatenotices/SHOW_REQUEST',
    id,
  }
}
export function showPrivateNoticeSucess (privateNotice) {
  return {
    type: '@privatenotices/SHOW_SUCESS',
    privateNotice,
  }
}
export function showPrivateNoticeFailure (failed) {
  return {
    type: '@privatenotices/SHOW_FAILURE',
    failed,
  }
}
