export function uploadRequest(file) {
  return {
    type: '@files/UPLOAD_REQUEST',
    file,
  };
}

export function uploadSuccess(file) {
  return {
    type: '@files/UPLOAD_SUCCESS',
    file,
  };
}
export function uploadFailure(failed) {
  return {
    type: '@files/UPLOAD_FAILURE',
    failed,
  };
}
