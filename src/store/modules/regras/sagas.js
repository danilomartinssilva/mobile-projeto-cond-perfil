import {all, call, put, takeLatest, select} from 'redux-saga/effects';
import api from '../../../services/api';
import toast from '../../../services/toast';
import responder from '../../../services/responder';
import {goBack} from '../../../services/RootNavigation';
import regras from '.';
export function* store({regra}) {
  try {
    const response = yield call(api.post, 'laws', regra);

    yield put({
      type: '@regra/ADD_SUCCESS',
      event: response.data,
    });

    toast(response.message);
    goBack();
  } catch (failed) {
    yield put({type: '@regra/ADD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* upload({content}) {
  try {
    const formData = new FormData();
    formData.append('file', content);

    const response = yield call(api.post, 'files', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;',
      },
    });

    yield put({
      type: '@regras/ADD_DOCUMENT_SUCESS',
      document: response.data,
    });
  } catch (failed) {
    yield put({type: '@regras/ADD_DOCUMENT_FAILURE', failed});

    const message = responder.failed(failed);
    toast(message);
  }
}
export function* update({event}) {
  try {
    const response = yield call(api.put, 'regras/' + event.id, event);

    yield put({
      type: '@regra/UPDATE_SUCESS',
      event: response.data,
    });
  } catch (failed) {
    yield put({type: '@regra/UPDATE_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* destroy({id}) {
  try {
    const response = yield call(api.delete, 'regras/' + id);

    yield put({
      type: '@regra/DESTROY_SUCESS',
      id: id,
    });
  } catch (failed) {
    yield put({type: '@regra/DESTROY_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* list() {
  try {
    //const profile = yield select((state) => state.profile);
    //const roles = profile.data.roles[0].name;
    const response = yield call(api.get, 'laws');

    yield put({
      type: '@regra/LOAD_SUCCESS',
      items: response.data,
    });
  } catch (failed) {
    yield put({type: '@regra/LOAD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
/* export function* listAll({event}) {
  try {
    const response = yield call(api.get, 'eventsAll', event);

    yield put({
      type: '@regra/LOAD_SUCESS',
      items: response.data,
    });

    toast(response.message);
  } catch (failed) {
    yield put({type: '@regra/GET_ALL_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
} */
export default all([
  takeLatest('@regras/ADD_REQUEST', store),
  takeLatest('@regras/LOAD_REQUEST', list),
  takeLatest('@regras/DESTROY_REQUEST', destroy),
  takeLatest('@regras/UPDATE_REQUEST', update),
  takeLatest('@regras/ADD_DOCUMENT_REQUEST', upload),
  /*  takeLatest('@regra/GET_ALL_REQUEST', listAll), */
]);
