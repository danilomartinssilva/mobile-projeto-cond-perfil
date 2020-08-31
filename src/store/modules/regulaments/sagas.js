import {all, call, put, takeLatest, select} from 'redux-saga/effects';
import api from '../../../services/api';
import toast from '../../../services/toast';
import responder from '../../../services/responder';
import {goBack} from '../../../services/RootNavigation';

export function* store({regulament}) {
  try {
    const response = yield call(api.post, 'regulaments', regulament);

    yield put({
      type: '@regulaments/ADD_SUCCESS',
      regulament: response.data,
    });

    toast(response.message);
    goBack();
  } catch (failed) {
    yield put({type: '@regulaments/ADD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}

export function* update({regualment}) {
  try {
    const response = yield call(
      api.put,
      'regualment/' + regualment.id,
      regualment,
    );

    yield put({
      type: '@regulaments/UPDATE_SUCESS',
      convention: response.data,
    });
  } catch (failed) {
    yield put({type: '@regulaments/UPDATE_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* destroy({id}) {
  try {
    const response = yield call(api.delete, 'regulaments/' + id);

    yield put({
      type: '@regulaments/DESTROY_SUCESS',
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
    const response = yield call(api.get, `regulaments/${id}`);

    yield put({
      type: '@regulaments/SHOW_SUCESS',
      regulament: response.data,
    });
  } catch (failed) {
    yield put({type: '@regulaments/SHOW_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* list() {
  try {
    const response = yield call(api.get, 'regulaments');

    yield put({
      type: '@regulaments/LOAD_SUCCESS',
      items: response.data,
    });
  } catch (failed) {
    yield put({type: '@regulaments/LOAD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export default all([
  takeLatest('@regulaments/ADD_REQUEST', store),
  takeLatest('@regulaments/LOAD_REQUEST', list),
  takeLatest('@regulaments/DESTROY_REQUEST', destroy),
  takeLatest('@regulaments/UPDATE_REQUEST', update),
  takeLatest('@regulaments/SHOW_REQUEST', findOne),
]);
