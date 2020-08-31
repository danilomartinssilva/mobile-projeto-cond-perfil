import {all} from 'redux-saga/effects';
import auth from './auth/sagas';
import profile from './profile/sagas';
import events from './eventos/sagas';
import condominiums from './condominiums/sagas';
import regras from './regras/sagas';
import balances from './balances/sagas';
import files from './files/sagas';
import conventions from './conventions/sagas';
import regulaments from './regulaments/sagas';
import minutes from './minutes/sagas';
export default function* rootSaga() {
  return yield all([
    auth,
    profile,
    events,
    condominiums,
    regras,
    balances,
    files,
    conventions,
    regulaments,
    minutes,
  ]);
}
