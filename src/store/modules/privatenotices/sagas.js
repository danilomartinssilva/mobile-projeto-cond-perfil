import {all, call, put, takeLatest, select} from 'redux-saga/effects'
import api from '../../../services/api'
import toast from '../../../services/toast'
import responder from '../../../services/responder'
import {goBack} from '../../../services/RootNavigation'

export function * store ({privateNotice}) {
  try {
    const response = yield call(api.post, 'notices', privateNotice)

    yield put({
      type: '@privatenotices/ADD_SUCCESS',
      privateNotice: response.data,
    })

    toast(response.message)
    goBack()
  } catch (failed) {
    yield put({type: '@privatenotices/ADD_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}

export function * update ({privateNotices}) {
  try {
    const response = yield call(
      api.put,
      'privateNoticess/' + privateNotices.id,
      privateNotices,
    )

    yield put({
      type: '@privatenotices/UPDATE_SUCESS',
      notification: response.data,
    })
  } catch (failed) {
    yield put({type: '@privatenotices/UPDATE_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export function * destroy ({id}) {
  try {
    const response = yield call(api.delete, 'notices/' + id)

    yield put({
      type: '@privatenotices/DESTROY_SUCESS',
      id: id,
    })
  } catch (failed) {
    yield put({type: '@privatenotices/DESTROY_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export function * findOne ({id}) {
  try {
    const response = yield call(api.get, `notifications/${id}`)

    yield put({
      type: '@privatenotices/SHOW_SUCESS',
      notification: response.data,
    })
  } catch (failed) {
    yield put({type: '@privatenotices/SHOW_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export function * list () {
  try {
    const response = yield call(api.get, 'notices')

    yield put({
      type: '@privatenotices/LOAD_SUCESS',
      items: response.data,
    })
  } catch (failed) {
    yield put({type: '@privatenotices/LOAD_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export default all([
  takeLatest('@privatenotices/ADD_REQUEST', store),
  takeLatest('@privatenotices/LOAD_REQUEST', list),
  takeLatest('@privatenotices/DESTROY_REQUEST', destroy),
  takeLatest('@privatenotices/UPDATE_REQUEST', update),
  takeLatest('@privatenotices/SHOW_REQUEST', findOne),
])
