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
import surveys from './surveys/sagas';
import notifications from './notifications/sagas';
import privatenotices from './privatenotices/sagas';
import users from './users/sagas';
import sugestions from './sugestions/sagas';
import manuals from './manuals/sagas';
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
    surveys,
    notifications,
    privatenotices,
    users,
    sugestions,
    manuals,
  ]);
}
