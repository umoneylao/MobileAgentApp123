import { Platform } from 'react-native'

import {
  LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_USER, VALIDATE_PIN, VALIDATE_PIN_SUCCESS, VALIDATE_PIN_FAILED,
  REGISTER_USER, REGISTER_SUCCESS, REGISTER_FAILED, ACTIVE_PIN, ACTIVE_PIN_SUCCESS, ACTIVE_PIN_FAILED,
  REQUEST_BCCS, REQUEST_BCCS_SUCCESS, REQUEST_BCCS_FAILED, CHANGE_PIN, CHANGE_PIN_SUCCESS, CHANGE_PIN_FAILED,
  CHANGE_LANGUAGE, CHANGE_LANGUAGE_SUCCESS, CHANGE_LANGUAGE_FAILED, GET_OTP, GET_OTP_SUCCESS, GET_OTP_FAILED,
  PING, PING_SUCCESS, PING_FALSE,
  REQUEST_SETUP_PIN, REQUEST_SETUP_PIN_FALSE, REQUEST_SETUP_PIN_SUCCESS,
  CHECK_NEW_USER, CHECK_NEW_USER_FAILED, CHECK_NEW_USER_SUCCESS,
  CHECK_ADD_USER, CHECK_ADD_USER_FAILED, CHECK_ADD_USER_SUCCESS,
  CHECK_PRESENTEE, CHECK_PRESENTEE_FAILED, CHECK_PRESENTEE_SUCCESS,
  CHECK_HISTORY_TRANFER, CHECK_HISTORY_TRANFER_SUCCESS, CHECK_HISTORY_TRANFER_FAILED,
  CHECK_ACCUONT_BCCS, CHECK_ACCUONT_BCCS_FALSE, CHECK_ACCUONT_BCCS_SUCCESS,
  HISTORY_TRANFER_FAILED, HISTORY_TRANFER_SUCCESS, HISTORY_TRANFER, HISTORY_LOTTERY_FALSE,
  SEARCH_HISTORY_TRANFER, SEARCH_HISTORY_TRANFER_FAILED, SEARCH_HISTORY_TRANFER_SUCCESS,
  CHECK_VERSION, CHECK_VERSION_SUCCESS, CHECK_VERSION_FAILED,
  REQUES_HISTORY_TRANFER, REQUES_HISTORY_TRANFER_FAILED, REQUES_HISTORY_TRANFER_SUCCESS,
  REQUES_CHECK_AGENT_ID_FAILED, REQUES_CHECK_AGENT_ID_SUCCESS, REQUES_CHECK_AGENT_ID,
  CHECK_CONTRACT_NUMBER_FAILED, CHECK_CONTRACT_NUMBER_SUCCESS, CHECK_CONTRACT_NUMBER,
  LOAD_MENU_BANK, LOAD_MENU_BANK_FAILED, LOAD_MENU_BANK_SUCCESS,
  GET_INFO_NCC_LOTTERY, GET_INFO_NCC_LOTTERY_FAILED, GET_INFO_NCC_LOTTERY_SUCCESS,
  GET_SEARCH_TRANSACTION, GET_SEARCH_TRANSACTION_FAILED, GET_SEARCH_TRANSACTION_SUCCESS,
  CHECK_NUMBER_CTTID, CHECK_NUMBER_CTTID_SUCCESS, CHECK_NUMBER_CTTID_FAILED,
  CASH_OUT_WORD_BANK, CASH_OUT_WORD_BANK_SUCCESS, CASH_OUT_WORD_BANK_FAILED,
  REQUES_HISTORY_TRANFER_NEW, REQUES_HISTORY_TRANFER_NEW_SUCCESS, REQUES_HISTORY_TRANFER_NEW_FAILED,
  CHECK_BLOCK_DEVICE, CHECK_BLOCK_DEVICE_SUCCESS, CHECK_BLOCK_DEVICE_FAILED


} from '../actions/types'

import { put, takeLatest, call } from 'redux-saga/effects'
import {
  login, validatePin, register, activePin, requestBccs, changePin,
  changeLanguage, getOtp, ping, requestActive, getNewUser, getaddNewUser,
  getPresentee, getHistoryTranfer, getCheckAccountBccs, getNewHistory, getSearchHistory, getVersion,
  getRequestHistoryTranfer, getAgentId, getRequestContractNumber, getRequestMenuBank,
  getinfoNcclottery, getSearchTransaction, getCheckNumberCTTID, getCashOutWordBank, getRequestHistoryTranferNew,
  getOnSecurity, getCheckBlockDeviec
} from '../utils/Api'
import Reactotron from 'reactotron-react-native'
function* callLogin(action) {
  try {
    const data = yield login(action.account)
    yield put({ type: LOGIN_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: LOGIN_FAILED, error })
  }
}
export function* watchLogin() {
  yield takeLatest(LOGIN_USER, callLogin)
}


function* callRequestBccs(action) {

  try {
    const data = yield requestBccs(action.account)
    yield put({ type: REQUEST_BCCS_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: REQUEST_BCCS_FAILED, error })
  }
}
export function* watchRequestBccs() {
  yield takeLatest(REQUEST_BCCS, callRequestBccs)
}
function* callRegister(action) {
  //Reactotron.log('reeeeegisteeeeee')
  try {
    const data = yield register(action.account)
    yield put({ type: REGISTER_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: REGISTER_FAILED, error })
  }
}
export function* watchRegister() {
  yield takeLatest(REGISTER_USER, callRegister)
}

// ACTIVE PIN
function* callActivePin(action) {
  try {
    const data = yield activePin(action.account)
    yield put({ type: ACTIVE_PIN_SUCCESS, data })
  } catch (error) {
    yield put({ type: ACTIVE_PIN_FAILED, error })
  }
}
export function* watchActivePin() {
  yield takeLatest(ACTIVE_PIN, callActivePin)
}

// request PIN
function* callValidatePin(action) {
  try {
    const response = yield validatePin(action.pin)
    if (response.data) {
      if (response.data.error === '00000' && response.data.responseCode === '00000') {
        yield put({ type: VALIDATE_PIN_SUCCESS, data: response.data })
      } else {
        yield put({ type: VALIDATE_PIN_FAILED, error: 'response code #00000', data: response.data })
      }
    } else {
      yield put({ type: VALIDATE_PIN_FAILED, error: 'response null', data: null })
    }

  } catch (error) {
    yield put({ type: VALIDATE_PIN_FAILED, error, data: null })
  }
}
export function* watchValidatePin() {
  yield takeLatest(VALIDATE_PIN, callValidatePin)
}
// Change pin
function* callChangePin(action) {
  try {
    const response = yield changePin(action.data)
    if (response.data) {
      if (response.data.error === '00000' && response.data.responseCode === '00000') {
        yield put({
          type: CHANGE_PIN_SUCCESS,
          data: response.data,
          responseCode: response.data.responseCode,
          responseDescription: response.data.description
        })
      } else {
        yield put({
          type: CHANGE_PIN_FAILED,
          error: 'response code #00000',
          data: response.data,
          responseCode: response.data.responseCode,
          responseDescription: response.data.description
        })
      }
    } else {
      yield put({ type: CHANGE_PIN_FAILED, error: 'response null', data: null })
    }
  } catch (error) {
    yield put({ type: CHANGE_PIN_FAILED, error, data: null })
  }
}
export function* watchChangePin() {
  yield takeLatest(CHANGE_PIN, callChangePin)
}



function* callGetNewUser(action) {
  try {
    const response = yield getNewUser(action.phoneInfo);

    if (response.data) {
      if (response.data.data.item.length >= 1) {
        yield put({ type: CHECK_NEW_USER_SUCCESS, payload: response.data.data })
      } else {
        yield put({ type: CHECK_NEW_USER_FAILED })
      }
    } else {
      yield put({ type: CHECK_NEW_USER_FAILED })
    }
  } catch (error) {
    yield put({ type: CHECK_NEW_USER_FAILED, payload: { error: error } })
  }
}
export function* watchGetNewUser() {
  yield takeLatest(CHECK_NEW_USER, callGetNewUser)
}

// Change language
function* callChangeLanguage(action) {
  //Reactotron.log('Auth saga change language')
  //Reactotron.log(action)
  try {
    if (action.isOffline) {
      yield put({ type: CHANGE_LANGUAGE_SUCCESS })
    } else {
      const data = yield changeLanguage(action.language)
      yield put({ type: CHANGE_LANGUAGE_SUCCESS, data: data.data })
    }

  } catch (error) {
    yield put({ type: CHANGE_LANGUAGE_FAILED, error })
  }
}
export function* watchChangeLanguage() {
  yield takeLatest(CHANGE_LANGUAGE, callChangeLanguage)
}


export function* watchGetOTP() {
  yield takeLatest(GET_OTP, callGetOTP)
}

function* callGetOTP(action) {
  try {
    const response = yield getOtp(action.data)
    if (response.data) {
      if (response.data.error === '00000' && response.data.responseCode === '00000') {
        yield put({ type: GET_OTP_SUCCESS, data: response.data })
      } else {
        yield put({ type: GET_OTP_FAILED, error: 'response code #00000', data: response.data })
      }
    } else {
      yield put({ type: GET_OTP_FAILED, error: 'response null', data: null })
    }
  } catch (error) {
    yield put({ type: GET_OTP_FAILED, error, data: null })
  }
}
function* callPing(action) {
  try {
    const data = yield ping(action.data)

    yield put({ type: PING_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: PING_FALSE, error })
  }
}

export function* watchCallPing() {
  yield takeLatest(PING, callPing)
}


// Request Active
function* callRequestActive(action) {
  try {
    const data = yield requestActive(action.data)
    yield put({ type: REQUEST_SETUP_PIN_SUCCESS, data })
  } catch (error) {
    yield put({ type: REQUEST_SETUP_PIN_FALSE, error })
  }
}
export function* watchRequestActive() {
  yield takeLatest(REQUEST_SETUP_PIN, callRequestActive)
}

function* callGetAddNewUser(action) {
  try {
    const response = yield getaddNewUser(action.data);

    if (response.data) {
      if (response.data.error === '00000' && response.data.responseCode === '00000') {
        yield put({ type: CHECK_ADD_USER_SUCCESS, payload: response.data })
      } else {
        yield put({ type: CHECK_ADD_USER_FAILED })
      }
    } else {
      yield put({ type: CHECK_ADD_USER_FAILED })
    }
  } catch (error) {
    yield put({ type: CHECK_ADD_USER_FAILED, payload: { error: error } })
  }
}
export function* watchGetAddNewUser() {
  yield takeLatest(CHECK_ADD_USER, callGetAddNewUser)
}



function* callGetPresentee(action) {
  try {
    const response = yield getPresentee(action.accountPhone, action.selectedDateDOB);

    if (response.ok && response.status == 200) {
      if (response.data.data.item.length >= 1) {
        yield put({ type: CHECK_PRESENTEE_SUCCESS, payload: response.data.data })
      } else {
        yield put({ type: CHECK_PRESENTEE_FAILED })
      }
    } else {
      yield put({ type: CHECK_PRESENTEE_FAILED })
    }
  } catch (error) {
    yield put({ type: CHECK_PRESENTEE_FAILED, payload: { error: error } })
  }
}

export function* watchGetPresentee() {
  yield takeLatest(CHECK_PRESENTEE, callGetPresentee)
}



function* callGetHistoryTranfer(action) {
  try {

    const response = yield getHistoryTranfer(action.selectedDateDOB, action.accountPhone);

    if (response.ok && response.status == 200) {
      if (response.data.data.item.length >= 1) {
        yield put({ type: CHECK_HISTORY_TRANFER_SUCCESS, payload: response.data.data })
      } else {
        yield put({ type: CHECK_HISTORY_TRANFER_FAILED })
      }
    } else {
      yield put({ type: CHECK_HISTORY_TRANFER_FAILED })
    }
  } catch (error) {
    yield put({ type: CHECK_HISTORY_TRANFER_FAILED, payload: { error: error } })
  }
}
export function* watchGetHistoryTranfer() {
  yield takeLatest(CHECK_HISTORY_TRANFER, callGetHistoryTranfer)
}



function* callCheckAccountBccs(action) {
  try {
    const dataReturn = yield getCheckAccountBccs(action.data)
    yield put({ type: CHECK_ACCUONT_BCCS_SUCCESS, data: dataReturn })
  } catch (error) {
    AlertNative(I18n.t('somethingWentWrong'))
    yield put({ type: CHECK_ACCUONT_BCCS_FALSE, error })
  }
}
export function* CheckAccuontBccsSagas() {
  yield takeLatest(CHECK_ACCUONT_BCCS, callCheckAccountBccs)
}


// selectedDateDOB,selectedDateDOBto
function* callHistoryTranfer(action) {
  try {
    const response = yield getNewHistory(action.agentCode);

    if (response.ok && response.status == 200) {
      if (response.data.historyCollections.histories.length >= 1) {
        yield put({ type: HISTORY_TRANFER_SUCCESS, payload: response.data })
      } else {
        yield put({ type: HISTORY_TRANFER_FAILED })
      }
    } else {
      yield put({ type: HISTORY_TRANFER_FAILED })
    }
  } catch (error) {
    yield put({ type: HISTORY_TRANFER_FAILED, payload: { error: error } })
  }
}
export function* watchHistoryTranfer() {
  yield takeLatest(HISTORY_TRANFER, callHistoryTranfer)
}


function* callsearchHistoryTranfer(action) {
  try {
    const response = yield getSearchHistory(action.agentCode, action.value1, action.value2);

    if (response.ok && response.status == 200) {
      if (response.data.historyCollections.histories.length >= 1) {
        yield put({ type: SEARCH_HISTORY_TRANFER_SUCCESS, payload: response.data })
      } else {
        yield put({ type: SEARCH_HISTORY_TRANFER_FAILED })
      }
    } else {
      yield put({ type: SEARCH_HISTORY_TRANFER_FAILED })
    }
  } catch (error) {
    yield put({ type: SEARCH_HISTORY_TRANFER_FAILED, payload: { error: error } })
  }
}
export function* watchSecrchHistoryTranfer() {
  yield takeLatest(SEARCH_HISTORY_TRANFER, callsearchHistoryTranfer)
}

function* callGetVersion(action) {
  try {
    const response = yield getVersion(action._language, Platform.OS);
    // console.log('response:', response)
    if (response.ok && response.status == 200) {
      // console.log('response.data:', response.data)
      if (response.data.data.item.length >= 1) {
        yield put({ type: CHECK_VERSION_SUCCESS, payload: response.data.data })
      } else {
        yield put({ type: CHECK_VERSION_FAILED })
      }
    } else {
      yield put({ type: CHECK_VERSION_FAILED })
    }
  } catch (error) {
    yield put({ type: CHECK_VERSION_FAILED, payload: { error: error } })
  }
}
export function* watchGetVersion() {
  yield takeLatest(CHECK_VERSION, callGetVersion)
}

function* callRequestHistoryTranfer(action) {
  try {
    const response = yield getRequestHistoryTranfer(action._accountId, action._processCode);
    if (response.ok && response.status == 200) {
      if (response.data.recentCollections.recentTransactions.length >= 1) {
        yield put({ type: REQUES_HISTORY_TRANFER_SUCCESS, payload: response.data })
      } else {
        yield put({ type: REQUES_HISTORY_TRANFER_FAILED })
      }
    } else {
      yield put({ type: REQUES_HISTORY_TRANFER_FAILED })
    }
  } catch (error) {
    yield put({ type: REQUES_HISTORY_TRANFER_FAILED, payload: { error: error } })
  }
}
export function* watchRequestHistoryTranfer() {
  yield takeLatest(REQUES_HISTORY_TRANFER, callRequestHistoryTranfer)
}



function* callCheckagentID(action) {
  try {
    const response = yield getAgentId(action.phone);
    if (response.ok && response.status == 200) {
      if (response.data.CHANNELCollection.CHANNEL.length >= 1) {
        yield put({ type: REQUES_CHECK_AGENT_ID_SUCCESS, payload: response.data.CHANNELCollection })
      } else {
        yield put({ type: REQUES_CHECK_AGENT_ID_FAILED })
      }
    } else {
      yield put({ type: REQUES_CHECK_AGENT_ID_FAILED })
    }
  } catch (error) {
    yield put({ type: REQUES_CHECK_AGENT_ID_FAILED, payload: { error: error } })
  }
}
export function* watchCheckagentId() {
  yield takeLatest(REQUES_CHECK_AGENT_ID, callCheckagentID)
}


function* callCheckContractNumber(action) {
  try {
    const response = yield getRequestContractNumber(action.ContractNumber, action.parnerCode);
    if (response.ok && response.status == 200) {
      if (response.data.LEASINGCollection.LEASING.length >= 1) {
        yield put({ type: CHECK_CONTRACT_NUMBER_SUCCESS, payload: response.data.LEASINGCollection })
      } else {
        yield put({ type: CHECK_CONTRACT_NUMBER_FAILED })
      }
    } else {
      yield put({ type: CHECK_CONTRACT_NUMBER_FAILED })
    }
  } catch (error) {
    yield put({ type: CHECK_CONTRACT_NUMBER_FAILED, payload: { error: error } })
  }
}
export function* watchCheckContractNumber() {
  yield takeLatest(CHECK_CONTRACT_NUMBER, callCheckContractNumber)
}





function* callCheckMenuBank(action) {
  try {
    const response = yield getRequestMenuBank(action.Bank);
    if (response.ok && response.status == 200) {
      if (response.data.BANKCollection.BANK.length >= 1) {
        yield put({ type: LOAD_MENU_BANK_SUCCESS, payload: response.data.BANKCollection })
      } else {
        yield put({ type: LOAD_MENU_BANK_FAILED })
      }
    } else {
      yield put({ type: LOAD_MENU_BANK_FAILED })
    }
  } catch (error) {
    yield put({ type: LOAD_MENU_BANK_FAILED, payload: { error: error } })
  }
}
export function* watchCheckMenuBank() {
  yield takeLatest(LOAD_MENU_BANK, callCheckMenuBank)
}


function* callGetinfoNccLottery(action) {
  try {
    const dataReturn = yield getinfoNcclottery(action.data)
    yield put({ type: GET_INFO_NCC_LOTTERY_SUCCESS, data: dataReturn })
  } catch (error) {
    yield put({ type: GET_INFO_NCC_LOTTERY_FAILED, error })
  }
}
export function* watcgetinfoNcclotterySagas() {
  yield takeLatest(GET_INFO_NCC_LOTTERY, callGetinfoNccLottery)
}


function* callsearchTransaction(action) {
  try {
    const response = yield getSearchTransaction(action.DateStart, action.DateEnd, action.accountPhone, action.transId, action.statusValue, action.idRequest, action.Petitioner);
    if (response.ok && response.status == 200) {
      if (response.data.TRANSACTION_FINANCECollection.TRANSACTION_FINANCE.length >= 1) {
        yield put({ type: GET_SEARCH_TRANSACTION_SUCCESS, payload: response.data })
      } else {
        yield put({ type: GET_SEARCH_TRANSACTION_FAILED })
      }
    } else {
      yield put({ type: GET_SEARCH_TRANSACTION_FAILED })
    }
  } catch (error) {
    yield put({ type: GET_SEARCH_TRANSACTION_FAILED, payload: { error: error } })
  }
}
export function* watchSearchTransaction() {
  yield takeLatest(GET_SEARCH_TRANSACTION, callsearchTransaction)
}


function* callCheckNumberCTTID(action) {
  try {
    const response = yield getCheckNumberCTTID(action.data);
    // console.log('------log---------cct_it', response.data)
    if (response.ok && response.status == 200) {
      if (response.data) {
        yield put({ type: CHECK_NUMBER_CTTID_SUCCESS, payload: response.data })
      } else {
        yield put({ type: CHECK_NUMBER_CTTID_FAILED })
      }
    } else {
      yield put({ type: CHECK_NUMBER_CTTID_FAILED })
    }
  } catch (error) {
    yield put({ type: CHECK_NUMBER_CTTID_FAILED, payload: { error: error } })
  }
}
export function* watchCheckNumberCTTID() {
  yield takeLatest(CHECK_NUMBER_CTTID, callCheckNumberCTTID)
}


function* callCashOutWordBank(action) {
  try {
    const response = yield getCashOutWordBank(action.data);
    if (response.ok && response.status == 200) {

      if (response.data) {
        yield put({ type: CASH_OUT_WORD_BANK_SUCCESS, payload: response.data })
      } else {
        yield put({ type: CASH_OUT_WORD_BANK_FAILED })
      }
    } else {
      yield put({ type: CASH_OUT_WORD_BANK_FAILED })
    }
  } catch (error) {
    yield put({ type: CASH_OUT_WORD_BANK_FAILED, payload: { error: error } })
  }
}
export function* watchCashOutWordBank() {
  yield takeLatest(CASH_OUT_WORD_BANK, callCashOutWordBank)
}


function* callRequestHistoryTranferNew(action) {
  try {
    const response = yield getRequestHistoryTranferNew(action.accountId, action.processCode, action.PatnetCode);
    if (response.ok && response.status == 200) {
      if (response.data.recentWaterPayCollections.recentWaterPayTransactions.length >= 1) {
        yield put({ type: REQUES_HISTORY_TRANFER_NEW_SUCCESS, payload: response.data })
      } else {
        yield put({ type: REQUES_HISTORY_TRANFER_NEW_FAILED })
      }
    } else {
      yield put({ type: REQUES_HISTORY_TRANFER_NEW_FAILED })
    }
  } catch (error) {
    yield put({ type: REQUES_HISTORY_TRANFER_NEW_FAILED, payload: { error: error } })
  }
}
export function* watchRequestHistoryTranferNew() {
  yield takeLatest(REQUES_HISTORY_TRANFER_NEW, callRequestHistoryTranferNew)
}



function* callCheckBlockDeviec(action) {
  try {
    const dataReturn = yield getCheckBlockDeviec(action.data)
    if (dataReturn.status == 200) {
      if(dataReturn.data){
        console.log('-----dataReturn---33--', dataReturn.data)
        yield put({ type: CHECK_BLOCK_DEVICE_SUCCESS, data: dataReturn.data })
      }else{
        yield put({ type: CHECK_BLOCK_DEVICE_FAILED })
      }
    } else {
      yield put({ type: CHECK_BLOCK_DEVICE_FAILED })
    }

  } catch (error) {
    yield put({ type: CHECK_BLOCK_DEVICE_FAILED, error })
  }
}
export function* watcCheckBlockDeviecSagas() {
  yield takeLatest(CHECK_BLOCK_DEVICE, callCheckBlockDeviec)
}


// function* callCheckBlockDeviec(action) {
//   try {
//     const response = yield getCheckBlockDeviec(action.data);
//     console.log('-----dataReturn---11--', response)
//     if (response.ok && response.status == 200) {
//       console.log('-----dataReturn---22--', response)
//       if (response.data) {
//         yield put({ type: CHECK_BLOCK_DEVICE_SUCCESS, payload: response.data })
//       } else {
//         yield put({ type: CHECK_BLOCK_DEVICE_FAILED })
//       }
//     } else {
//       yield put({ type: CHECK_BLOCK_DEVICE_FAILED })
//     }
//   } catch (error) {
//     yield put({ type: CHECK_BLOCK_DEVICE_FAILED, payload: { error: error } })
//   }
// }
// export function* watcCheckBlockDeviecSagas() {
//   yield takeLatest(CHECK_BLOCK_DEVICE, callCheckBlockDeviec)
// }

