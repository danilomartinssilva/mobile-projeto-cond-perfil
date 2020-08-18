import {all, call, put, takeLatest} from 'redux-saga/effects';
import api from '../../../services/api';
import toast from '../../../services/toast';
import responder from '../../../services/responder';
import {goBack} from '../../../services/RootNavigation';
export function* store({event}) {
  try {
    const response = yield call(api.post, 'events', event);

    yield put({
      type: '@event/ADD_SUCCESS',
      event: response.data,
    });

    toast(response.message);
    goBack();
  } catch (failed) {
    yield put({type: '@event/ADD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* destroy({id}) {
  try {
    const response = yield call(api.delete, 'events/' + id);

    yield put({
      type: '@event/DESTROY_SUCESS',
      id: id,
    });
  } catch (failed) {
    yield put({type: '@event/DESTROY_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* list({event}) {
  try {
    const response = yield call(api.get, 'events', event);

    yield put({
      type: '@event/LOAD_SUCCESS',
      items: response.data,
    });

    toast(response.message);
  } catch (failed) {
    yield put({type: '@event/LOAD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export default all([
  takeLatest('@event/ADD_REQUEST', store),
  takeLatest('@event/LOAD_REQUEST', list),
  takeLatest('@event/DESTROY_REQUEST', destroy),
]);
