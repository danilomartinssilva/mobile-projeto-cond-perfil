import {all, call, put, takeLatest, select} from 'redux-saga/effects';
import api from '../../../services/api';
import toast from '../../../services/toast';
import responder from '../../../services/responder';
import {goBack} from '../../../services/RootNavigation';

export function* store({file}) {
  try {
    const fd = new FormData();
    fd.append('file', file);
    const response = yield call(api.post, 'files', fd, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;',
      },
    });

    yield put({
      type: '@files/UPLOAD_SUCCESS',
      file: response.data,
    });

    toast(response.message);
    goBack();
  } catch (failed) {
    yield put({type: '@@files/UPLOAD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}

export default all([takeLatest('@files/UPLOAD_REQUEST', store)]);
