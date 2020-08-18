import {all} from 'redux-saga/effects';
import auth from './auth/sagas';
import profile from './profile/sagas';
import events from './eventos/sagas';
import condominiums from './condominiums/sagas';
export default function* rootSaga() {
  return yield all([auth, profile, events, condominiums]);
}
