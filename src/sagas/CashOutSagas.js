import {
  REQUEST_CASH_OUT,
  REQUEST_CASH_OUT_SUCCESS,
  REQUEST_CASH_OUT_FAILED,
  REQUEST_CASH_IN,
  REQUEST_CASH_IN_SUCCESS,
  REQUEST_CASH_IN_FAILED,
  SEARCH_DIR_TRANS_HIS,
  SEARCH_DIR_TRANS_HIS_SUCCESS,
  SEARCH_DIR_TRANS_HIS_FAILED
} from '../actions/types'

import { put, takeLatest, call } from 'redux-saga/effects'
// import { Api } from './Api'
import { requestCashOut, requestCashIn, searchDirTransHis } from '../utils/Api'
import Reactotron from 'reactotron-react-native'

function * callRequestCashOut (action) {
  //Reactotron.log('saga callRequestCashOut')
  //Reactotron.log(action)
  try {
    const data = yield requestCashOut(action.data)
    yield put({ type: REQUEST_CASH_OUT_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: REQUEST_CASH_OUT_FAILED, error })
  }
}
export function * watchRequestCashOut () {
  yield takeLatest(REQUEST_CASH_OUT, callRequestCashOut)
}

function * callRequestCashIn (action) {
  try {
    const data = yield requestCashIn(action.data)
    // console.log('----data----', data)
    yield put({ type: REQUEST_CASH_IN_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: REQUEST_CASH_IN_FAILED, error })
  }
}
export function * watchRequestCashIn () {
  yield takeLatest(REQUEST_CASH_IN, callRequestCashIn)
}

function * callSearchDirTransHis (action) {
  //Reactotron.log('saga callSearchDirTransHis')
  //Reactotron.log(action)
  try {
    const data = yield searchDirTransHis(action.data)
    yield put({ type: SEARCH_DIR_TRANS_HIS_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: SEARCH_DIR_TRANS_HIS_FAILED, error })
  }
}
export function * watchSearchDirTransHis () {
  yield takeLatest(SEARCH_DIR_TRANS_HIS, callSearchDirTransHis)
}
