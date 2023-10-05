import {
  GET_ACCOUNT_INFO,
  GET_ACCOUNT_INFO_SUCCESS,
  GET_ACCOUNT_INFO_FAILED,
  ACCESS_INFO_WALLET_NON_WALLET,
  ACCESS_INFO_WALLET_NON_WALLET_SUCCESS,
  ACCESS_INFO_WALLET_NON_WALLET_FAILED,
  ACCESS_INFO_WALLET_WALLET,
  ACCESS_INFO_WALLET_WALLET_SUCCESS,
  ACCESS_INFO_WALLET_WALLET_FAILED,
  CONFIRM_PIN,
  CONFIRM_PIN_SUCCESS,
  CONFIRM_PIN_FAILED,

  TRANSFER_OTHER_TO_OTHER,
  TRANSFER_OTHER_TO_OTHER_SUCCESS,
  TRANSFER_OTHER_TO_OTHER_FAILED
} from '../actions/types'

import { put, takeLatest, call } from 'redux-saga/effects'
import { getAccountInfo, accessInfoWalletNonWallet, accessInfoWalletWallet, confirmPin, transferOtherToOther } from '../utils/Api'
import Reactotron from 'reactotron-react-native'

function * callGetAccountInfo (action) {
  // //Reactotron.log('sa trans')
  // //Reactotron.log(action)
  try {
    let data = yield getAccountInfo(action.receiver)
    yield put({ type: GET_ACCOUNT_INFO_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: GET_ACCOUNT_INFO_FAILED, error })
  }
}
export function * watchGetAccountInfo () {
  yield takeLatest(GET_ACCOUNT_INFO, callGetAccountInfo)
}

function * callAccessInfoWalletNonWallet (action) {
  // //Reactotron.log('sa trans')
  // //Reactotron.log(action)
  try {
    let data = yield accessInfoWalletNonWallet(action.info)
    yield put({ type: ACCESS_INFO_WALLET_NON_WALLET_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: ACCESS_INFO_WALLET_NON_WALLET_FAILED, error })
  }
}
export function * watchAccessInfoWalletNonWallet () {
  yield takeLatest(ACCESS_INFO_WALLET_NON_WALLET, callAccessInfoWalletNonWallet)
}

function * callAccessInfoWalletWallet (action) {
  try {
    let data = yield accessInfoWalletWallet(action.info)
    yield put({ type: ACCESS_INFO_WALLET_WALLET_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: ACCESS_INFO_WALLET_WALLET_FAILED, error })
  }
}
export function * watchAccessInfoWalletWallet () {
  yield takeLatest(ACCESS_INFO_WALLET_WALLET, callAccessInfoWalletWallet)
}

function * callConfirmPin (action) {
  try {
    let data = yield confirmPin(action.info)
    yield put({ type: CONFIRM_PIN_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: CONFIRM_PIN_FAILED, error })
  }
}
export function * watchConfirmPin () {
  yield takeLatest(CONFIRM_PIN, callConfirmPin)
}
// NEW
function * callTransferOtherToOther (action) {
  try {
    let data = yield transferOtherToOther(action.info)
    //Reactotron.log('Saga transferOtherToOther')
    //Reactotron.log(data)
    yield put({ type: TRANSFER_OTHER_TO_OTHER_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: TRANSFER_OTHER_TO_OTHER_FAILED, error })
  }
}
export function * watchTransferOtherToOther () {
  yield takeLatest(TRANSFER_OTHER_TO_OTHER, callTransferOtherToOther)
}
