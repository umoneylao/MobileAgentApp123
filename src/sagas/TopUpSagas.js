import {
  REQUEST_TOP_UP,
  REQUEST_TOP_UP_SUCCESS,
  REQUEST_TOP_UP_FAILED,
  GET_PAYMENT_INFO,
  GET_PAYMENT_INFO_SUCCESS,
  GET_PAYMENT_INFO_FAILED,
  CHECK_ACCOUNT_ETL, CHECK_ACCOUNT_ETL_SUCCESS, CHECK_ACCOUNT_ETL_FALSE,
  CHECK_FEE_TOPUP_ETL, CHECK_FEE_TOPUP_ETL_SUCCESS, CHECK_FEE_TOPUP_ETL_FALSE,
  GET_OTP_ETL,GET_OTP_ETL_FAILED,GET_OTP_ETL_SUCCESS,
  REQUEST_TOP_UP_ETL, REQUEST_TOP_UP_ETL_SUCCESS, REQUEST_TOP_UP_ETL_FAILED,
  CHECK_INFO_PAYMENT_SUCCESS, CHECK_INFO_PAYMENT, CHECK_INFO_PAYMENT_FAILED
} from '../actions/types'

import { put, takeLatest, call } from 'redux-saga/effects'
import { requestTopUp, getPaymentInfo, requestCheckTopupETL, requestCheckFeeTopupETL , requestOTP, requestTopUpETL,
  requestCheckinfoPayment } from '../utils/Api'
import Reactotron from 'reactotron-react-native'

function* callGetPaymentInfo(action) {
  try {
    const data = yield getPaymentInfo(action.data)
    yield put({ type: GET_PAYMENT_INFO_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: GET_PAYMENT_INFO_FAILED, error })
  }
}
export function* watchGetPaymentInfo() {
  yield takeLatest(GET_PAYMENT_INFO, callGetPaymentInfo)
}

function* callRequestTopUp(action) {
  try {
    const data = yield requestTopUp(action.data)
    yield //Reactotron.log('saga callRequestTopUp')
    yield //Reactotron.log(data)
    if (data.ok) {
      yield put({ type: REQUEST_TOP_UP_SUCCESS, data: data.data })
    } else {
      yield put({ type: REQUEST_TOP_UP_FAILED, error: data.problem })
    }
  } catch (error) {
    //Reactotron.log('saga errr callRequestTopUp')
    //Reactotron.log(error)
    yield put({ type: REQUEST_TOP_UP_FAILED, error })
  }
}
export function* watchRequestTopUp() {
  yield takeLatest(REQUEST_TOP_UP, callRequestTopUp)
}
function* callRequestCheckETL(action) {
  try {
    const dataReturn = yield requestCheckTopupETL(action.data)
    yield put({ type: CHECK_ACCOUNT_ETL_SUCCESS, data: dataReturn })
  } catch (error) {
    yield put({ type: CHECK_ACCOUNT_ETL_FALSE, error })
  }
}
export function* watchRequestCheckTopUpETL() {
  yield takeLatest(CHECK_ACCOUNT_ETL, callRequestCheckETL)
}

function* callRequestCheckFeeETL(action) {
  try {
    const dataReturn = yield requestCheckFeeTopupETL(action.data)
    yield put({ type: CHECK_FEE_TOPUP_ETL_SUCCESS, data: dataReturn })
  } catch (error) {
    yield put({ type: CHECK_FEE_TOPUP_ETL_FALSE, error })
  }
}
export function* watchRequestCheckFeeTopUpETL() {
  yield takeLatest(CHECK_FEE_TOPUP_ETL, callRequestCheckFeeETL)
}

function* callRequestOTP(action) {
  try {
    const dataReturn = yield requestOTP(action.data)
    yield put({ type: GET_OTP_ETL_SUCCESS, data: dataReturn })
  } catch (error) {
    yield put({ type: GET_OTP_ETL_FAILED, error })
  }
}
export function* watchRequestOTP() {
  yield takeLatest(GET_OTP_ETL, callRequestOTP)
}

function* callRequestTopUpETL(action) {
  try {
    const dataReturn = yield requestTopUpETL(action.data)
    yield put({ type: REQUEST_TOP_UP_ETL_SUCCESS, data: dataReturn })
  } catch (error) {
    yield put({ type: REQUEST_TOP_UP_ETL_FAILED, error })
  }
}
export function* watchRequestTopUpETL() {
  yield takeLatest(REQUEST_TOP_UP_ETL, callRequestTopUpETL)
}

function* callRequestCheckinfoPayment(action) {
  try {
    const dataReturn = yield requestCheckinfoPayment(action.data)
    yield put({ type: CHECK_INFO_PAYMENT_SUCCESS, data: dataReturn })
  } catch (error) {
    yield put({ type: CHECK_INFO_PAYMENT_FAILED, error })
  }
}
export function* watchCheckinfoPayment() {
  yield takeLatest(CHECK_INFO_PAYMENT, callRequestCheckinfoPayment)
}
