import {
  HIGH_SECURITY_OTP, HIGH_SECURITY_OTP_SUCCESS, HIGH_SECURITY_OTP_FAILED,
  CALL_CHECK_SWICH, CALL_CHECK_SWICH_SUCCESS, CALL_CHECK_SWICH_FAILED,
  CALL_CHECK_AMOUNT, CALL_CHECK_AMOUNT_SUCCESS, CALL_CHECK_AMOUNT_FAILED,
  GET_ALL_CONFIG_AMOUNT, GET_ALL_CONFIG_AMOUNT_SUCCESS, GET_ALL_CONFIG_AMOUNT_FAILED

} from '../actions/types'
import { put, takeLatest, call } from 'redux-saga/effects'
import {
  getOnSecurity, getCheckByPassPIN, getCheckAmount, getAllConfigAmount
} from '../utils/Api'
function* callOnSecurity(action) {
  try {
    const response = yield getOnSecurity(action.data);
    // console.log('response:', response)
    if (response.ok && response.status == 200) {
      if (response.data) {
        yield put({ type: HIGH_SECURITY_OTP_SUCCESS, payload: response.data })
      } else {
        yield put({ type: HIGH_SECURITY_OTP_FAILED })
      }
    } else {
      yield put({ type: HIGH_SECURITY_OTP_FAILED })
    }
  } catch (error) {
    yield put({ type: HIGH_SECURITY_OTP_FAILED, payload: { error: error } })
  }
}
export function* watchOnSecurity() {
  yield takeLatest(HIGH_SECURITY_OTP, callOnSecurity)
}


function* callCheckByPassPIN(action) {
  try {
    const response = yield getCheckByPassPIN(action.data);
    if (response.ok && response.status == 200) {
      if (response.data) {
        yield put({ type: CALL_CHECK_SWICH_SUCCESS, payload: response.data })
      } else {
        yield put({ type: CALL_CHECK_SWICH_FAILED })
      }
    } else {
      yield put({ type: CALL_CHECK_SWICH_FAILED })
    }
  } catch (error) {
    yield put({ type: CALL_CHECK_SWICH_FAILED, payload: { error: error } })
  }
}
export function* watchCheckByPassPIN() {
  yield takeLatest(CALL_CHECK_SWICH, callCheckByPassPIN)
}


function* callCheckByPassAmount(action) {
  try {
    const response = yield getCheckAmount(action.data);
    // console.log('response:------2222----', response)
    if (response.ok && response.status == 200) {
      if (response.data) {
        yield put({ type: CALL_CHECK_AMOUNT_SUCCESS, payload: response.data })
      } else {
        yield put({ type: CALL_CHECK_AMOUNT_FAILED })
      }
    } else {
      yield put({ type: CALL_CHECK_AMOUNT_FAILED })
    }
  } catch (error) {
    yield put({ type: CALL_CHECK_AMOUNT_FAILED, payload: { error: error } })
  }
}
export function* watchCheckByPassAmount() {
  yield takeLatest(CALL_CHECK_AMOUNT, callCheckByPassAmount)
}



function* callAllConfigAmount(action) {
  try {
    const response = yield getAllConfigAmount(action.data);
    // console.log('response:------3333----', response)
    if (response.ok && response.status == 200) {
      if (response.data) {
        yield put({ type: GET_ALL_CONFIG_AMOUNT_SUCCESS, payload: response.data })
      } else {
        yield put({ type: GET_ALL_CONFIG_AMOUNT_FAILED })
      }
    } else {
      yield put({ type: GET_ALL_CONFIG_AMOUNT_FAILED })
    }
  } catch (error) {
    yield put({ type: GET_ALL_CONFIG_AMOUNT_FAILED, payload: { error: error } })
  }
}
export function* watchAllConfigAmount() {
  yield takeLatest(GET_ALL_CONFIG_AMOUNT, callAllConfigAmount)
}