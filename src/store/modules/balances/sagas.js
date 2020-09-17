import {all, call, put, takeLatest, select} from 'redux-saga/effects';
import api from '../../../services/api';
import toast from '../../../services/toast';
import responder from '../../../services/responder';
import {goBack} from '../../../services/RootNavigation';

export function* store({balance}) {
  try {
    const response = yield call(api.post, 'balances', balance);

    yield put({
      type: '@balances/ADD_SUCCESS',
      balance: response.data,
    });

    toast(response.message);
    goBack();
  } catch (failed) {
    yield put({type: '@balances/ADD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}

export function* update({balance}) {
  try {
    const response = yield call(api.put, 'balances/' + balance.id, balance);

    yield put({
      type: '@balances/UPDATE_SUCESS',
      balance: response.data,
    });
    toast(`Dados atualizados com sucesso`);
    goBack();
  } catch (failed) {
    yield put({type: '@balances/UPDATE_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* destroy({id}) {
  try {
    const response = yield call(api.delete, 'balances/' + id);

    yield put({
      type: '@balances/DESTROY_SUCESS',
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
    const response = yield call(api.get, `balances/${id}`);

    yield put({
      type: '@balances/SHOW_SUCESS',
      balance: response.data,
    });
  } catch (failed) {
    yield put({type: '@balances/SHOW_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* list() {
  try {
    const response = yield call(api.get, 'balances');

    yield put({
      type: '@balances/LOAD_SUCCESS',
      items: response.data,
    });
  } catch (failed) {
    yield put({type: '@balances/LOAD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export default all([
  takeLatest('@balances/ADD_REQUEST', store),
  takeLatest('@balances/LOAD_REQUEST', list),
  takeLatest('@balances/DESTROY_REQUEST', destroy),
  takeLatest('@balances/UPDATE_REQUEST', update),
  takeLatest('@balances/SHOW_REQUEST', findOne),
]);
