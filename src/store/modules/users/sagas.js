import {all, call, put, takeLatest, select} from 'redux-saga/effects'
import api from '../../../services/api'
import toast from '../../../services/toast'
import responder from '../../../services/responder'
import {goBack} from '../../../services/RootNavigation'

export function * update ({user}) {
  try {
    const response = yield call(api.put, 'users/' + user.id, user)

    yield put({
      type: '@users/UPDATE_SUCESS',
      user: response.data,
    })
    toast('Usuário alterado com sucesso')
    goBack()
  } catch (failed) {
    yield put({type: '@users/UPDATE_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export function * destroy ({id}) {
  try {
    const response = yield call(api.delete, 'users/' + id)

    yield put({
      type: '@users/DESTROY_SUCESS',
      id: id,
    })
  } catch (failed) {
    yield put({type: '@users/DESTROY_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export function * findOne ({id}) {
  try {
    const response = yield call(api.get, `users/${id}`)

    yield put({
      type: '@users/SHOW_SUCESS',
      user: response.data,
    })
  } catch (failed) {
    yield put({type: '@users/SHOW_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export function * list () {
  try {
    const response = yield call(api.get, 'users')

    yield put({
      type: '@users/GET_ALL_SUCESS',
      items: response.data,
    })

    toast(response.message)
  } catch (failed) {
    yield put({type: '@users/LOAD_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export default all([
  takeLatest('@users/GET_ALL_REQUEST', list),
  takeLatest('@users/DESTROY_REQUEST', destroy),
  takeLatest('@users/UPDATE_REQUEST', update),
  takeLatest('@users/SHOW_REQUEST', findOne),
])
