import {all, call, put, takeLatest} from 'redux-saga/effects';
import api from '../../../services/api';
import toast from '../../../services/toast';
import responder from '../../../services/responder';
import {goBack} from '../../../services/RootNavigation';

export function* update({data: profile}) {
  try {
    const response = yield call(api.put, 'profile', profile);
    yield put({type: '@profile/UPDATE_SUCCESS', data: response.data});
    toast('Dados alterados com sucesso');
    goBack();
  } catch (failed) {
    yield put({type: '@profile/UPDATE_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}

export default all([takeLatest('profile/UPDATE_REQUEST', update)]);
