import {all, call, put, takeLatest} from 'redux-saga/effects';
import api from '../../../services/api';
import toast from '../../../services/toast';
import responder from '../../../services/responder';
import {goBack} from '../../../services/RootNavigation';
export function* store({condominium}) {
  try {
    const response = yield call(api.post, 'condominiums', condominium);

    yield put({
      type: '@condominium/ADD_SUCCESS',
      condominium: response.data,
    });

    toast(response.message);
    goBack();
  } catch (failed) {
    yield put({type: '@condominium/ADD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* destroy({id}) {
  try {
    const response = yield call(api.delete, 'condominiums/' + id);

    yield put({
      type: '@condominium/DESTROY_SUCESS',
      id: id,
    });
  } catch (failed) {
    yield put({type: '@condominium/DESTROY_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* list({event}) {
  try {
    const response = yield call(api.get, 'condominiums', event);

    yield put({
      type: '@condominium/LOAD_SUCCESS',
      items: response.data,
    });
  } catch (failed) {
    yield put({type: '@condominium/LOAD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export default all([
  takeLatest('@condominium/ADD_REQUEST', store),
  takeLatest('@condominium/LOAD_REQUEST', list),
  takeLatest('@condominium/DESTROY_REQUEST', destroy),
]);
