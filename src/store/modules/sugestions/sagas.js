import {all, call, put, takeLatest} from 'redux-saga/effects'
import api from '../../../services/api'
import toast from '../../../services/toast'
import responder from '../../../services/responder'
import {goBack} from '../../../services/RootNavigation'
export function * store ({sugestion}) {
  try {
    const response = yield call(api.post, 'sugestions', sugestion)

    yield put({
      type: '@sugestions/ADD_SUCCESS',
      sugestion: response.data,
    })

    toast(response.message)
    goBack()
  } catch (failed) {
    yield put({type: '@sugestions/ADD_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export function * destroy ({id}) {
  try {
    const response = yield call(api.delete, 'sugestions/' + id)

    yield put({
      type: '@sugestions/DESTROY_SUCESS',
      id: id,
    })
  } catch (failed) {
    yield put({type: '@sugestions/DESTROY_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export function * list ({event}) {
  try {
    const response = yield call(api.get, 'sugestions', event)

    yield put({
      type: '@sugestions/LOAD_SUCCESS',
      items: response.data,
    })
  } catch (failed) {
    yield put({type: '@sugestions/LOAD_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export function * show ({id}) {
  try {
    const response = yield call(api.get, 'sugestions/' + id)

    yield put({
      type: '@sugestions/SHOW_SUCESS',
      sugestion: response.data,
    })
  } catch (failed) {
    yield put({type: '@sugestions/SHOW_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export default all([
  takeLatest('@sugestions/ADD_REQUEST', store),
  takeLatest('@sugestions/LOAD_REQUEST', list),
  takeLatest('@sugestions/SHOW_REQUEST', show),
  takeLatest('@sugestions/DESTROY_REQUEST', destroy),
])
