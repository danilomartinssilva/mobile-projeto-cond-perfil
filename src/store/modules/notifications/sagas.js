import {all, call, put, takeLatest, select} from 'redux-saga/effects';
import api from '../../../services/api';
import toast from '../../../services/toast';
import responder from '../../../services/responder';
import {goBack} from '../../../services/RootNavigation';

export function* store({notification}) {
  try {
    const response = yield call(api.post, 'notifications', notification);

    yield put({
      type: '@notifications/ADD_SUCCESS',
      notification: response.data,
    });

    toast(response.message);
    goBack();
  } catch (failed) {
    yield put({type: '@notifications/ADD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}

export function* update({notification}) {
  try {
    const response = yield call(
      api.put,
      'notifications/' + notification.id,
      notification,
    );

    yield put({
      type: '@notifications/UPDATE_SUCESS',
      notification: response.data,
    });
  } catch (failed) {
    yield put({type: '@notifications/UPDATE_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* destroy({id}) {
  try {
    const response = yield call(api.delete, 'notifications/' + id);

    yield put({
      type: '@notifications/DESTROY_SUCESS',
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
      type: '@notifications/SHOW_SUCESS',
      notification: response.data,
    });
  } catch (failed) {
    yield put({type: '@notifications/SHOW_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* list() {
  try {
    const response = yield call(api.get, 'notifications');

    yield put({
      type: '@notifications/LOAD_SUCCESS',
      items: response.data,
    });

    toast(response.message);
  } catch (failed) {
    yield put({type: '@notifications/LOAD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* listAll() {
  try {
    const response = yield call(api.get, 'notificationsAll');

    yield put({
      type: '@notifications/LOAD_SUCCESS',
      items: response.data,
    });

    toast(response.message);
  } catch (failed) {
    yield put({type: '@notifications/LOAD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export default all([
  takeLatest('@notifications/ADD_REQUEST', store),
  takeLatest('@notifications/LOAD_REQUEST', list),
  takeLatest('@notifications/GET_ALL_REQUEST', listAll),
  takeLatest('@notifications/DESTROY_REQUEST', destroy),
  takeLatest('@notifications/UPDATE_REQUEST', update),
  takeLatest('@notifications/SHOW_REQUEST', findOne),
]);
