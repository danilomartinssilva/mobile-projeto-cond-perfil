import {all, call, put, takeLatest} from 'redux-saga/effects';
import responder from '../../../services/responder';
import toaster from '../../../services/toast';
import api from '../../../services/api';
import * as RootNavigation from '../../../services/RootNavigation';

// import {loginSuccess, loginFailure} from './actions';

export function* login({payload}) {
  try {
    const signin = yield call(api.post, 'login', payload);
    if (signin && signin.data) {
      const {token} = signin.data;
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const signed = yield call(api.get, 'me');
      yield put({
        type: '@AUTH/loginSuccess',
        token: token,
        data: signed.data,
      });
      toaster('Usuário logado com sucesso!');
      RootNavigation.navigate('LoginScreen');
      //RootNavigation.navigate('AppStack');
      RootNavigation.navigate('AppStack', {
        screen: 'RegrasScreen',
        params: {user: 'jane'},
      });
      /**
       * Inicio no do Onesignal
       */
    }
  } catch (failed) {
    if (responder.failed(failed) === 'Inactive user') {
      yield put({
        type: '@AUTH/loginFailure',
        err: 'Usuário inativo',
      });

      toaster('Usuário inativo');
    } else if (responder.failed(failed) === 'UserNotFoundException') {
      yield put({
        type: '@AUTH/loginFailure',
        err: 'Senha inválida',
      });
      toaster('Usuário não encontrado');
    } else if (responder.failed(failed) === 'PasswordMisMatch') {
      yield put({
        type: '@AUTH/loginFailure',
        err: 'Senha inválida',
      });

      toaster('Senha inválida');
    } else {
      yield put({
        type: '@AUTH/loginFailure',
        err: 'Falha na autenticação, verifique seus dados ',
      });
      toaster('Falha na autenticação, verifique seus dados');
    }
    /* if (failed.response.data.error.name === 'inativo') {
      yield put({
        type: '@AUTH/loginFailure',
        err: 'Senha inválida',
      });
      responder.failed('Senha inválida');
      toaster('Senha inválida');
    } else if (failed.response.data.error.name === 'UserNotFoundException') {
      yield put({
        type: '@AUTH/loginFailure',
        err: 'Usuário inválido',
      });
      responder.failed('Usuário inválido');
      toaster('Usuário inválido');
    } else {
      yield put({
        type: '@AUTH/loginFailure',
        err: 'Usuário inválido',
      });
      responder.failed('Usuário inativo');
      toaster('Usuário inativo');
    } */
  }
}

export function setAccessToken({payload}) {
  if (typeof payload === typeof undefined) {
    return;
  }

  const {token} = payload && payload.auth ? payload.auth : undefined;

  if (typeof token !== typeof undefined) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}
export function* register({profile}) {
  try {
    const response = yield call(api.post, 'users', profile);
    if (__DEV__) console.tron.log('Response', response);
    toaster('Cadastrado com sucesso');
  } catch (err) {
    if (__DEV__) console.tron.log('Error na hora de registrar', err);
    /*   const message = responder(err); */
    yield put({
      type: '@AUTH/registerFailure',
      error: err,
    });

    /*  toaster(message); */
  }
}
export function* logout() {
  try {
    yield put({
      type: '@AUTH/logoffSuccess',
    });
    /*  RootNavigation.navigate('LoginScreen'); */
    RootNavigation.navigate('AuthStack', {screen: 'LoginScreen'});

    // NavigationActions.navigate('LoginScreen');
  } catch (err) {
    yield put({
      type: '@AUTH/logoffFailure',
      err: 'Erro ao efetuar logoff',
    });
  }
}

export default all([
  takeLatest('@AUTH/registerRequest', register),
  takeLatest('@AUTH/logoffRequest', logout),
  takeLatest('@AUTH/loginRequest', login),
  takeLatest('persist/REHYDRATE', setAccessToken),
]);
