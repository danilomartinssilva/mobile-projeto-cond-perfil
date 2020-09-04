import {all, call, put, takeLatest, select} from 'redux-saga/effects';
import api from '../../../services/api';
import toast from '../../../services/toast';
import responder from '../../../services/responder';
import {goBack} from '../../../services/RootNavigation';

export function* store({survey}) {
  try {
    const response = yield call(api.post, 'surveys', survey);

    yield put({
      type: '@surveys/ADD_SUCCESS',
      survey: response.data,
    });

    toast(response.message);
    goBack();
  } catch (failed) {
    yield put({type: '@surveys/ADD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* evaluating({id}) {
  try {
    const response = yield call(api.put, `evaluating/${id}`);

    yield put({
      type: '@surveys/ADD_VOTE_SUCESS',
      survey_refresh: response.data,
    });

    toast(response.data.message);
    goBack();
  } catch (failed) {
    yield put({type: '@surveys/ADD_VOTE_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}

export function* update({survey}) {
  try {
    const response = yield call(api.put, 'surveys/' + survey.id, survey);

    yield put({
      type: '@surveys/UPDATE_SUCESS',
      survey: response.data,
    });
  } catch (failed) {
    yield put({type: '@surveys/UPDATE_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* destroy({id}) {
  try {
    const response = yield call(api.delete, 'surveys/' + id);

    yield put({
      type: '@surveys/DESTROY_SUCESS',
      id: id,
    });
  } catch (failed) {
    yield put({type: '@survey/DESTROY_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* findOne({id}) {
  try {
    const response = yield call(api.get, `surveys/${id}`);

    yield put({
      type: '@surveys/SHOW_SUCESS',
      survey: response.data,
    });
  } catch (failed) {
    yield put({type: '@surveys/SHOW_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export function* list() {
  try {
    const response = yield call(api.get, 'surveys');

    yield put({
      type: '@surveys/LOAD_SUCCESS',
      items: response.data,
    });

    toast(response.message);
  } catch (failed) {
    yield put({type: '@surveys/LOAD_FAILURE', failed});
    const message = responder.failed(failed);
    toast(message);
  }
}
export default all([
  takeLatest('@surveys/ADD_REQUEST', store),
  takeLatest('@surveys/LOAD_REQUEST', list),
  takeLatest('@surveys/DESTROY_REQUEST', destroy),
  takeLatest('@surveys/UPDATE_REQUEST', update),
  takeLatest('@surveys/SHOW_REQUEST', findOne),
  takeLatest('@surveys/ADD_VOTE_REQUEST', evaluating),
]);
