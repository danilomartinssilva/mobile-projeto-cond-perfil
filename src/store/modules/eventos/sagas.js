import {all, call, put, takeLatest, select} from 'redux-saga/effects';
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
export function* update({event}) {
  try {
    const response = yield call(api.put, 'events/' + event.id, event);

    yield put({
      type: '@event/UPDATE_SUCESS',
      event: response.data,
    });
  } catch (failed) {
    yield put({type: '@event/UPDATE_FAILURE', failed});
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
    const profile = yield select((state) => state.profile);
    const roles = profile.data.roles[0].name;
    const response = yield call(
      api.get,
      roles === 'SINDICO' || roles === 'MASTER' ? 'eventsAll' : 'events',
      event,
    );

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
export function* listAll({event}) {
  try {
    const response = yield call(api.get, 'eventsAll', event);

    yield put({
      type: '@event/LOAD_SUCESS',
      items: response.data,
    });

    toast(response.message);
  } catch (failed) {
    yield put({type: '@event/GET_ALL_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export default all([
  takeLatest('@event/ADD_REQUEST', store),
  takeLatest('@event/LOAD_REQUEST', list),
  takeLatest('@event/DESTROY_REQUEST', destroy),
  takeLatest('@event/UPDATE_REQUEST', update),
  /*   takeLatest('@event/GET_ALL_REQUEST', listAll), */
]);
