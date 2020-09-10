export function addNotificationRequest(notification) {
  return {
    type: '@notifications/ADD_REQUEST',
    notification,
  };
}

export function addNotificationSucess(notification) {
  return {
    type: '@notifications/ADD_SUCCESS',
    notification,
  };
}
export function destroyNotificationRequest(id) {
  return {
    type: '@notifications/DESTROY_REQUEST',
    id,
  };
}
export function destroyNotificationSuccess(id) {
  return {
    type: '@notifications/DESTROY_SUCESS',
    id,
  };
}
export function destroyNotificationFailure(failed) {
  return {
    type: '@notifications/DESTROY_FAILURE',
    failed,
  };
}
export function loadNotificationRequest() {
  return {
    type: '@notifications/LOAD_REQUEST',
  };
}
export function getAllRequest() {
  return {
    type: '@notifications/GET_ALL_REQUEST',
  };
}
export function getAllSucess(items) {
  return {
    type: '@notifications/GET_ALL_SUCESS',
    items,
  };
}
export function getAllFailure(failed) {
  return {
    type: '@notifications/GET_ALL_FAILURE',
    failed,
  };
}
export function loadNotificationSuccess(items) {
  return {
    type: '@notifications/LOAD_SUCCESS',
    items,
  };
}
export function loadNotificationFailure(failed) {
  return {
    type: '@notifications/LOAD_FAILURE',
    failed,
  };
}
export function addNotificationFailure(failed) {
  return {
    type: '@notifications/ADD_FAILURE',
    failed,
  };
}
export function updateNotificationsRequest(notification) {
  return {
    type: '@notifications/UPDATE_REQUEST',
    notification,
  };
}
export function updateNotificationsSucess(notification) {
  return {
    type: '@notifications/UPDATE_SUCESS',
    notification,
  };
}
export function updateNotificationsFailure(failed) {
  return {
    type: '@notifications/UPDATE_FAILURE',
    failed,
  };
}
export function showNotificationRequest(id) {
  return {
    type: '@notifications/SHOW_REQUEST',
    id,
  };
}
export function showNotificationSucess(notification) {
  return {
    type: '@notifications/SHOW_SUCESS',
    notification,
  };
}
export function showNotificationFailure(failed) {
  return {
    type: '@notifications/SHOW_FAILURE',
    failed,
  };
}
