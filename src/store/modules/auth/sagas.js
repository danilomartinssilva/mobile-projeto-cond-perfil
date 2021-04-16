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

      RootNavigation.navigate('AppStack', {
        screen: 'HomeScreen',
      });
    }
  } catch (failed) {
    if (responder.failed(failed).match('E_USER_NOT_FOUND')) {
      yield put({
        type: '@AUTH/loginFailure',
        err: 'Senha inválida',
      });
      toaster('Usuário não encontrado');
    } else if (
      responder.failed(failed) ===
      'E_PASSWORD_MISMATCH: Cannot verify user password'
    ) {
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

      toaster(responder.failed(failed));
    }
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
    yield call(api.post, 'users', profile);

    toaster('Cadastrado com sucesso');
    RootNavigation.goBack();
  } catch (err) {
    yield put({
      type: '@AUTH/registerFailure',
      error: err,
    });

    if (
      err &&
      err.reponse &&
      err.response.data.length &&
      err.response.data[0].message
    ) {
      const message = err.response.data[0].message;
      toaster(message);
    }
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
export function* handleConfirmMail({email}) {
  try {
    const response = yield call(api.post, 'passwords', {
      email: email,
      redirect_url: 'perfil-mobile://AuthStack/ResetPasswordScreen',
    });
    yield put({type: '@AUTH/confirmSucess'});
    toaster(
      'Confira sua caixa de entrada! Acabamos de enviar um e-mail com as instruções necessárias',
    );
  } catch (err) {
    yield put({type: '@AUTH/confirmFailure', err});
    toaster(responder.failed(err));
    /*     toaster(responder.failed(err)); */
  }
}
export function* handleResetPassword({password, token}) {
  try {
    const response = yield call(api.put, 'resetpassword', {
      password: password,
      token: token,
    });
    yield put({type: '@AUTH/resetPasswordSucess'});
    RootNavigation.navigate('LoginScreen');
  } catch (err) {
    yield put({type: '@AUTH/resetPasswordFailure', err});
    /*     toaster(responder.failed(err)); */
  }
}

export default all([
  takeLatest('@AUTH/registerRequest', register),
  takeLatest('@AUTH/logoffRequest', logout),
  takeLatest('@AUTH/loginRequest', login),
  takeLatest('@AUTH/confirmRequest', handleConfirmMail),
  takeLatest('@AUTH/resetPasswordRequest', handleResetPassword),
  takeLatest('persist/REHYDRATE', setAccessToken),
]);
