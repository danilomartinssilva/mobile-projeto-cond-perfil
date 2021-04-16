import {all, call, put, takeLatest, select} from 'redux-saga/effects';
import api from '../../../services/api';
import toast from '../../../services/toast';
import responder from '../../../services/responder';
import {goBack} from '../../../services/RootNavigation';

export function* store({convention}) {
  try {
    const response = yield call(api.post, 'conventions', convention);

    yield put({
      type: '@convention/ADD_SUCCESS',
      convention: response.data,
    });

    toast(response.message);
    goBack();
  } catch (failed) {
    yield put({type: '@convention/ADD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}

export function* update({convention}) {
  try {
    const response = yield call(
      api.put,
      'conventions/' + convention.id,
      convention,
    );

    yield put({
      type: '@convention/UPDATE_SUCESS',
      convention: response.data,
    });
    toast('Atualização feita com sucesso');
    goBack();
  } catch (failed) {
    yield put({type: '@convention/UPDATE_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* destroy({id}) {
  try {
    const response = yield call(api.delete, 'conventions/' + id);

    yield put({
      type: '@convention/DESTROY_SUCESS',
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
    const response = yield call(api.get, `conventions/${id}`);

    yield put({
      type: '@convention/SHOW_SUCESS',
      convention: response.data,
    });
  } catch (failed) {
    yield put({type: '@convention/SHOW_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* list() {
  try {
    const response = yield call(api.get, 'conventions');

    yield put({
      type: '@convention/LOAD_SUCCESS',
      items: response.data,
    });
  } catch (failed) {
    yield put({type: '@convention/LOAD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export default all([
  takeLatest('@conventions/ADD_REQUEST', store),
  takeLatest('@conventions/LOAD_REQUEST', list),
  takeLatest('@conventions/DESTROY_REQUEST', destroy),
  takeLatest('@conventions/UPDATE_REQUEST', update),
  takeLatest('@conventions/SHOW_REQUEST', findOne),
]);
