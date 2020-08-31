import {all, call, put, takeLatest, select} from 'redux-saga/effects';
import api from '../../../services/api';
import toast from '../../../services/toast';
import responder from '../../../services/responder';
import {goBack} from '../../../services/RootNavigation';

export function* store({minute}) {
  try {
    const response = yield call(api.post, 'minutes', minute);

    yield put({
      type: '@minutes/ADD_SUCCESS',
      minute: response.data,
    });

    toast(response.message);
    goBack();
  } catch (failed) {
    yield put({type: '@minutes/ADD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}

export function* update({minute}) {
  try {
    const response = yield call(api.put, 'minutes/' + minute.id, minute);

    yield put({
      type: '@minutes/UPDATE_SUCESS',
      minute: response.data,
    });
  } catch (failed) {
    yield put({type: '@minutes/UPDATE_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* destroy({id}) {
  try {
    const response = yield call(api.delete, 'minutes/' + id);

    yield put({
      type: '@minutes/DESTROY_SUCESS',
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
    const response = yield call(api.get, `minutes/${id}`);

    yield put({
      type: '@minutes/SHOW_SUCESS',
      minute: response.data,
    });
  } catch (failed) {
    yield put({type: '@minutes/SHOW_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* list() {
  try {
    const response = yield call(api.get, 'minutes');

    yield put({
      type: '@minutes/LOAD_SUCCESS',
      items: response.data,
    });
  } catch (failed) {
    yield put({type: '@minutes/LOAD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export default all([
  takeLatest('@minutes/ADD_REQUEST', store),
  takeLatest('@minutes/LOAD_REQUEST', list),
  takeLatest('@minutes/DESTROY_REQUEST', destroy),
  takeLatest('@minutes/UPDATE_REQUEST', update),
  takeLatest('@minutes/SHOW_REQUEST', findOne),
]);
