import {
  GET_OTP,
  GET_OTP_SUCCESS,
  GET_OTP_FAILED,
  REQUEST_PAYMENT_ELECTRIC,
  REQUEST_PAYMENT_ELECTRIC_SUCCESS,
  REQUEST_PAYMENT_ELECTRIC_FAILED
} from '../actions/types'

import { put, takeLatest, call } from 'redux-saga/effects'
// import { Api } from './Api'
import { getOtp, requestPaymentElectric } from '../utils/Api'
import Reactotron from 'reactotron-react-native'

function * callGetOtp (action) {
  //Reactotron.log('saga callGetOtp')
  //Reactotron.log(action)
  try {
    const data = yield getOtp(action.account)
    yield put({ type: GET_OTP_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: GET_OTP_FAILED, error })
  }
}
export function * watchGetOtp () {
  yield takeLatest(GET_OTP, callGetOtp)
}

function * callRequestPaymentElectric (action) {
  //Reactotron.log('saga call requesat payment elctric')
  //Reactotron.log(action)
  try {
    const data = yield requestPaymentElectric(action.data)
    yield put({ type: REQUEST_PAYMENT_ELECTRIC_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: REQUEST_PAYMENT_ELECTRIC_FAILED, error })
  }
}
export function * watchRequestPaymentElectric () {
  yield takeLatest(REQUEST_PAYMENT_ELECTRIC, callRequestPaymentElectric)
}
