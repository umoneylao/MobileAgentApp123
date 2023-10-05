import {
  LOGIN_USER,
  REGISTER_USER,
  VALIDATE_PIN,
  LOGOUT_USER,
  SET_LOGGED_IN,
  SET_INFO_ACCOUNT,
  ACTIVE_PIN,
  REQUEST_BCCS,
  CHANGE_LANGUAGE,
  CHANGE_PIN,
  CHANGE_LOCAL_LANGUAGE,
  GET_OTP,
  PING,
  REQUEST_SETUP_PIN,
  CHECK_NEW_USER,
  CHECK_ADD_USER,
  CHECK_PRESENTEE,
  CHECK_HISTORY_TRANFER,
  CHECK_ACCUONT_BCCS,
  HISTORY_TRANFER,
  SEARCH_HISTORY_TRANFER,
  CHECK_VERSION,
  REQUES_HISTORY_TRANFER,
  REQUES_CHECK_AGENT_ID,
  CHECK_CONTRACT_NUMBER,
  REQUES_HISTORY_TRANFER_NEW,
  LOAD_MENU_BANK,
  GET_INFO_NCC_LOTTERY,
  GET_SEARCH_TRANSACTION,
  CHECK_NUMBER_CTTID,
  CASH_OUT_WORD_BANK,
  SET_LOGGED_IN_NOINTERNET,
  LOGOUT_IN_NOINTERNET,
  CHECK_BLOCK_DEVICE
} from './types'
import Reactotron from 'reactotron-react-native'
import I18n from 'react-native-i18n'
export const login = (account, keepLoggedIn) => {
  return {
    type: LOGIN_USER,
    account,
    keepLoggedIn
  }
}
export const register = (account) => {
  return {
    type: REGISTER_USER,
    account
  }
}
export const requestBccs = (account) => {
  return {
    type: REQUEST_BCCS,
    account
  }
}

export const activePin = (account) => {

  return {
    type: ACTIVE_PIN,
    account
  }
}

export const setLoggedIn = () => {
  return {
    type: SET_LOGGED_IN
  }
}

export const setLoggedInNointernet = () => {
  return {
    type: SET_LOGGED_IN_NOINTERNET
  }
}
export const setInfoAccount = (infoAccount) => {
  return {
    type: SET_INFO_ACCOUNT,
    infoAccount
  }
}

export const validatePin = (pin) => {
  return {
    type: VALIDATE_PIN,
    pin
  }
}

export const logout = (previousPhone) => {
  return {
    type: LOGOUT_USER,
    previousPhone
  }
}

export const logoutNointernet = () => {
  return {
    type: LOGOUT_IN_NOINTERNET
  }
}

export const changeLanguage = (language, isOffline) => {
  return {
    type: CHANGE_LANGUAGE,
    language,
    isOffline
  }
}
export const changePin = (data) => {
  return {
    type: CHANGE_PIN,
    data
  }
}

export const changeLocalLanguage = (language) => {
  I18n.defaultLocale = language
  I18n.locale = language
  return {
    type: CHANGE_LOCAL_LANGUAGE,
    language
  }
}

export const getOTP = (data) => {
  return {
    type: GET_OTP, data
  }
}
export const ping = (data) => {
  return {
    type: PING,
    data
  }
}

export const requestActive = (data) => {
  return {
    type: REQUEST_SETUP_PIN,
    data
  }
}

export const getNewUser = (phoneInfo) => {
  return {
    type: CHECK_NEW_USER,
    phoneInfo
  }
}

export const addUser = (data) => {
  return {
    type: CHECK_ADD_USER,
    data
  }
}

export const getcheckPresentee = (accountPhone, selectedDateDOB) => {
  return {
    type: CHECK_PRESENTEE,
    accountPhone, selectedDateDOB
  }
}

export const getcheckHistoryTranfer = (selectedDateDOB, accountPhone) => {
  return {
    type: CHECK_HISTORY_TRANFER,
    selectedDateDOB, accountPhone
  }
}


export const requestCheckAccuontBccs = (data) => {
  return {
    type: CHECK_ACCUONT_BCCS,
    data
  }
}


export const getHistory = (agentCode) => {
  return {
    type: HISTORY_TRANFER,
    agentCode
  }
}

export const searchHistoryTtanfer = (agentCode, value1, value2) => {
  return {
    type: SEARCH_HISTORY_TRANFER,
    agentCode, value1, value2
  }
}


export const getVersion = (_language) => {
  return {
    type: CHECK_VERSION,
    _language
  }
}


export const requestHistoryTranfer = (_accountId, _processCode) => {
  return {
    type: REQUES_HISTORY_TRANFER,
    _accountId, _processCode
  }
}
// 
export const requestHistoryTranferNew = (accountId, processCode, PatnetCode) => {
  return {
    type: REQUES_HISTORY_TRANFER_NEW,
    accountId, processCode, PatnetCode
  }
}

export const requestCheckagentId = (phone) => {
  return {
    type: REQUES_CHECK_AGENT_ID,
    phone
  }
}

export const requestCheckContractNumber = (ContractNumber, parnerCode) => {
  return {
    type: CHECK_CONTRACT_NUMBER,
    ContractNumber,
    parnerCode
  }
}

// export const paymentLeasingAeon = (data) => {
//   return {
//     type: PAY_LEASING_AEON,
//     data
//   }
// }

export const onLoadMenuBank = (Bank) => {
  return {
    type: LOAD_MENU_BANK,
    Bank
  }
}

export const onGetInfoBuyNCCLottery = (data) => {
  return {
    type: GET_INFO_NCC_LOTTERY,
    data
  }
}

export const getSearchTranSaction = (DateStart, DateEnd, accountPhone, transId, statusValue, idRequest, Petitioner) => {
  return {
    type: GET_SEARCH_TRANSACTION,
    DateStart, DateEnd, accountPhone, transId, statusValue, idRequest, Petitioner

  }
}

export const onCheckNumberCTTID = (data) => {
  return {
    type: CHECK_NUMBER_CTTID,
    data
  }
}

export const onCashOutWordBank = (data) => {
  return {
    type: CASH_OUT_WORD_BANK,
    data
  }
}


export const onCheckBlockDevice = (data) => {
  return {
    type: CHECK_BLOCK_DEVICE,
    data
  }
}
