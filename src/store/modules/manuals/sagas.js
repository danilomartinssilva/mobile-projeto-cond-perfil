import { all, call, put, takeLatest } from 'redux-saga/effects'
import api from '../../../services/api'
import responder from '../../../services/responder'
import { goBack } from '../../../services/RootNavigation'
import toast from '../../../services/toast'

export function * store ({manual}) {
  try {
    const response = yield call(api.post, 'manuals', manual)

    yield put({
      type: '@manuals/ADD_SUCCESS',
      manual: response.data,
    })

    toast(response.message)
    goBack()
  } catch (failed) {
    yield put({type: '@manuals/ADD_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}

export function * update ({manual}) {
  try {
    const response = yield call(api.put, 'manuals/' + manual.id, manual)

    yield put({
      type: '@manuals/UPDATE_SUCESS',
      manual: response.data,
    })
    goBack()
  } catch (failed) {
    yield put({type: '@manuals/UPDATE_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export function * destroy ({id}) {
  try {
    const response = yield call(api.delete, 'manuals/' + id)

    yield put({
      type: '@manuals/DESTROY_SUCESS',
      id: id,
    })
  } catch (failed) {
    yield put({type: '@balance/DESTROY_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export function * findOne ({id}) {
  try {
    const response = yield call(api.get, `manuals/${id}`)

    yield put({
      type: '@manuals/SHOW_SUCESS',
      manual: response.data,
    })
  } catch (failed) {
    yield put({type: '@manuals/SHOW_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export function * list () {
  try {
    const response = yield call(api.get, 'manuals')

    yield put({
      type: '@manuals/LOAD_SUCCESS',
      items: response.data,
    })
  } catch (failed) {
    yield put({type: '@manuals/LOAD_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export function * listAll () {
  try {
    const response = yield call(api.get, 'manualsAll')

    yield put({
      type: '@manuals/LOAD_SUCCESS',
      items: response.data,
    })

    toast(response.message)
  } catch (failed) {
    yield put({type: '@manuals/LOAD_FAILURE', failed})
    const message = responder.failed(failed)
    toast(message)
  }
}
export default all([
  takeLatest('@manuals/ADD_REQUEST', store),
  takeLatest('@manuals/LOAD_REQUEST', list),
  takeLatest('@manuals/GET_ALL_REQUEST', listAll),
  takeLatest('@manuals/DESTROY_REQUEST', destroy),
  takeLatest('@manuals/UPDATE_REQUEST', update),
  takeLatest('@manuals/SHOW_REQUEST', findOne),
])
