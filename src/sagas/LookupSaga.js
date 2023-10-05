import {
  REQUEST_BALANCE,
  REQUEST_BALANCE_SUCCESS,
  REQUEST_BALANCE_FAILED,
  GET_TRANSACTION_HISTORY,
  GET_TRANSACTION_HISTORY_SUCCESS,
  GET_TRANSACTION_HISTORY_FAILED,
  GET_COMMISSION_THIS_MONTH,
  GET_COMMISSION_THIS_MONTH_SUCCESS,
  GET_COMMISSION_THIS_MONTH_FAILED,
  GET_COMMISSION_LAST_MONTH,
  GET_COMMISSION_LAST_MONTH_SUCCESS,
  GET_COMMISSION_LAST_MONTH_FAILED,
  CHECK_FUNDER,
  CHECK_FUNDER_SUCCESS,
  CHECK_FUNDER_FALSE
} from '../actions/types'

import { put, takeLatest, call } from 'redux-saga/effects'
// import { Api } from './Api'
import { requestBalance, getTransactionHistory, getCommission, checkFunder } from '../utils/Api'
import Reactotron from 'reactotron-react-native'

function * callRequestBalance (action) {
  //Reactotron.log('saga REQUEST_BALANCE')
  //Reactotron.log(action)
  try {
    const data = yield requestBalance(action.data)
    yield put({ type: REQUEST_BALANCE_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: REQUEST_BALANCE_FAILED, error })
  }
}
export function * watchRequestBalance () {
  yield takeLatest(REQUEST_BALANCE, callRequestBalance)
}

function * callGetTransactionHistory (action) {
  //Reactotron.log('saga GET_TRANSACTION_HISTORY')
  //Reactotron.log(action)
  try {
    const data = yield getTransactionHistory(action.data)
    yield put({ type: GET_TRANSACTION_HISTORY_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: GET_TRANSACTION_HISTORY_FAILED, error })
  }
}
export function * watchGetTransactionHistory () {
  yield takeLatest(GET_TRANSACTION_HISTORY, callGetTransactionHistory)
}

function * callGetCommissionThisMonth (action) {
  //Reactotron.log('saga GET_COMMISSION_THIS_MONTH')
  //Reactotron.log(action)
  try {
    const data = yield getCommission(action.data)
    yield put({ type: GET_COMMISSION_THIS_MONTH_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: GET_COMMISSION_THIS_MONTH_FAILED, error })
  }
}
export function * watchGetCommissionThisMonth () {
  yield takeLatest(GET_COMMISSION_THIS_MONTH, callGetCommissionThisMonth)
}

function * callGetCommissionLastMonth (action) {
  //Reactotron.log('saga GET_COMMISSION_LAST_MONTH')
  //Reactotron.log(action)
  try {
    const data = yield getCommission(action.data)
    yield put({ type: GET_COMMISSION_LAST_MONTH_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: GET_COMMISSION_LAST_MONTH_FAILED, error })
  }
}
export function * watchGetCommissionLastMonth () {
  yield takeLatest(GET_COMMISSION_LAST_MONTH, callGetCommissionLastMonth)
}

function * callCheckFunder (action) {
 
  try {
    const data = yield checkFunder(action.data)
    yield put({ type: CHECK_FUNDER_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: CHECK_FUNDER_FALSE, error })
  }
}
export function * watchCheckFunder () {
  yield takeLatest(CHECK_FUNDER, callCheckFunder)
}