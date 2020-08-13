import {all, call, put, takeLatest} from 'redux-saga/effects';
import api from '../../../services/api';
import toast from '../../../services/toast';
import responder from '../../../services/responder';
import {goBack} from '../../../services/RootNavigation';

export function* update({payload}) {
  try {
    const {data} = payload;
    const response = yield call(api.put, 'minha-conta', data);
    yield put({type: '@profile/UPDATE_SUCCESS', payload: response.data});
    /*  NavigationService.goBack(); */
  } catch (failed) {
    yield put({type: '@profile/UPDATE_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}

export default all([takeLatest('profile/UPDATE_REQUEST', update)]);
