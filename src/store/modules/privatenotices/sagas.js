import {all, call, put, takeLatest, select} from 'redux-saga/effects';
import api from '../../../services/api';
import toast from '../../../services/toast';
import responder from '../../../services/responder';
import {goBack} from '../../../services/RootNavigation';

export function* store({privateNotice}) {
  try {
    const response = yield call(api.post, 'notices', privateNotice);

    yield put({
      type: '@privateNotices/ADD_SUCCESS',
      privateNotice: response.data,
    });

    toast(response.message);
    goBack();
  } catch (failed) {
    yield put({type: '@privateNotices/ADD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}

export function* update({privateNotices}) {
  try {
    const response = yield call(
      api.put,
      'privateNoticess/' + privateNotices.id,
      privateNotices,
    );

    yield put({
      type: '@privateNotices/UPDATE_SUCESS',
      notification: response.data,
    });
  } catch (failed) {
    yield put({type: '@privateNotices/UPDATE_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* destroy({id}) {
  try {
    const response = yield call(api.delete, 'notifications/' + id);

    yield put({
      type: '@privateNotices/DESTROY_SUCESS',
      id: id,
    });
  } catch (failed) {
    yield put({type: '@balance/DESTROY_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* findOne({id}) {
  try {
    const response = yield call(api.get, `notifications/${id}`);

    yield put({
      type: '@privateNotices/SHOW_SUCESS',
      notification: response.data,
    });
  } catch (failed) {
    yield put({type: '@privateNotices/SHOW_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* list() {
  try {
    const response = yield call(api.get, 'balances');

    yield put({
      type: '@privateNotices/LOAD_SUCCESS',
      items: response.data,
    });

    toast(response.message);
  } catch (failed) {
    yield put({type: '@privateNotices/LOAD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export default all([
  takeLatest('@privateNotices/ADD_REQUEST', store),
  takeLatest('@privateNotices/LOAD_REQUEST', list),
  takeLatest('@privateNotices/DESTROY_REQUEST', destroy),
  takeLatest('@privateNotices/UPDATE_REQUEST', update),
  takeLatest('@privateNotices/SHOW_REQUEST', findOne),
]);
