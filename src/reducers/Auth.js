import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT_USER,
  VALIDATE_PIN,
  VALIDATE_PIN_SUCCESS,
  VALIDATE_PIN_FAILED,
  ACTIVE_PIN,
  ACTIVE_PIN_SUCCESS,
  ACTIVE_PIN_FAILED,
  SET_LOGGED_IN,
  SET_INFO_ACCOUNT,
  REQUEST_BCCS,
  REQUEST_BCCS_SUCCESS,
  REQUEST_BCCS_FAILED,
  CHANGE_PIN,
  CHANGE_PIN_SUCCESS,
  CHANGE_PIN_FAILED,
  CHANGE_LANGUAGE,
  CHANGE_LANGUAGE_SUCCESS,
  CHANGE_LANGUAGE_LOCAL_SUCCESS,
  CHANGE_LANGUAGE_FAILED,
  CHANGE_LOCAL_LANGUAGE,
  GET_OTP,
  GET_OTP_SUCCESS,
  GET_OTP_FAILED,
  PING_SUCCESS,
  PING_FALSE,
  PING,
  REQUEST_SETUP_PIN,
  REQUEST_SETUP_PIN_SUCCESS,
  REQUEST_SETUP_PIN_FALSE,
  CHECK_NEW_USER, CHECK_NEW_USER_FAILED, CHECK_NEW_USER_SUCCESS,
  CHECK_ADD_USER, CHECK_ADD_USER_FAILED, CHECK_ADD_USER_SUCCESS,
  CHECK_PRESENTEE, CHECK_PRESENTEE_FAILED, CHECK_PRESENTEE_SUCCESS,
  CHECK_HISTORY_TRANFER, CHECK_HISTORY_TRANFER_SUCCESS, CHECK_HISTORY_TRANFER_FAILED,
  CHECK_ACCUONT_BCCS, CHECK_ACCUONT_BCCS_SUCCESS, CHECK_ACCUONT_BCCS_FALSE,
  HISTORY_TRANFER_SUCCESS, HISTORY_TRANFER_FAILED, HISTORY_TRANFER,
  SEARCH_HISTORY_TRANFER, SEARCH_HISTORY_TRANFER_FAILED, SEARCH_HISTORY_TRANFER_SUCCESS,
  CHECK_VERSION, CHECK_VERSION_SUCCESS, CHECK_VERSION_FAILED,
  REQUES_HISTORY_TRANFER, REQUES_HISTORY_TRANFER_FAILED, REQUES_HISTORY_TRANFER_SUCCESS,
  REQUEST_BALANCE_FAILED, REQUEST_BALANCE_SUCCESS,
  REQUES_CHECK_AGENT_ID_SUCCESS, REQUES_CHECK_AGENT_ID_FAILED, REQUES_CHECK_AGENT_ID,
  CHECK_CONTRACT_NUMBER, CHECK_CONTRACT_NUMBER_FAILED, CHECK_CONTRACT_NUMBER_SUCCESS,
  LOAD_MENU_BANK, LOAD_MENU_BANK_FAILED, LOAD_MENU_BANK_SUCCESS,
  GET_INFO_NCC_LOTTERY, GET_INFO_NCC_LOTTERY_SUCCESS, GET_INFO_NCC_LOTTERY_FAILED,
  GET_SEARCH_TRANSACTION, GET_SEARCH_TRANSACTION_FAILED, GET_SEARCH_TRANSACTION_SUCCESS,
  CHECK_NUMBER_CTTID, CHECK_NUMBER_CTTID_SUCCESS, CHECK_NUMBER_CTTID_FAILED,
  CASH_OUT_WORD_BANK, CASH_OUT_WORD_BANK_SUCCESS, CASH_OUT_WORD_BANK_FAILED,
  SET_LOGGED_IN_NOINTERNET, LOGOUT_IN_NOINTERNET,
  REQUES_HISTORY_TRANFER_NEW, REQUES_HISTORY_TRANFER_NEW_SUCCESS, REQUES_HISTORY_TRANFER_NEW_FAILED,
  CHECK_BLOCK_DEVICE,CHECK_BLOCK_DEVICE_SUCCESS,CHECK_BLOCK_DEVICE_FAILED

} from '../actions/types'
import Reactotron from 'reactotron-react-native'
import _ from 'lodash'
import * as FIELD from '../utils/CoreFieldMap'
import * as RequestField from '../utils/RequestField'

const initialAuthState = {
  user: null,
  registerData: null,
  bccsData: null,
  activePinData: null,
  validateData: null,
  changePinData: null,
  changeLanguageData: null,
  isLoggedIn: false,
  isFetching: false,
  error: null,
  infoAccount: null,
  isSuccess: null,
  actionType: null,
  localLanguage: 'lo',
  keepLoggedIn: false,
  previousPhone: '',
  pingData: null,
  dataActive: null,
  checkNewUser: null,
  isLoading: false,
  checkAddNewUser: null,
  checkpresentee: null,
  checkHistoryTranfer: null,
  checkAccuontBccs: null,
  searchdataHistory: null,
  versionUpdate: null,
  requesHistoryTranfer: null,
  requestCheckagent: null,
  requestContractNumber: null,
  requestMenuBank: null,
  getInfoNccLottery: null,
  getSearchdataTransaction: null,
  getCheckNumberCTTID: null,
  cashOutWordBankinfo: null,
  isLoggedInNointernet: false,
  isLogoutNointernet: false,
  getNewTransaction: null,
  dataCheckBlockDeviec: null
}

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      if (action.keepLoggedIn) {
        let phone = RequestField.getValueField(action.account.fieldMap, FIELD.PHONE_NUMBER)
        return { ...state, isFetching: true, actionType: LOGIN_USER, keepLoggedIn: action.keepLoggedIn, previousPhone: phone }
      } else {
        return { ...state, isFetching: true, actionType: LOGIN_USER, keepLoggedIn: false }
      }

    case LOGIN_SUCCESS:
      return { ...state, isFetching: false, user: action.data, isSuccess: true, actionType: LOGIN_SUCCESS }
    case LOGIN_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: LOGIN_FAILED }

    case ACTIVE_PIN:
      return { ...state, isFetching: true }
    case ACTIVE_PIN_SUCCESS:

      return { ...state, isFetching: false, activePinData: action.data, isSuccess: true }
    case ACTIVE_PIN_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    case REQUEST_BCCS:
      return { ...state, isFetching: true }
    case REQUEST_BCCS_SUCCESS:
      return { ...state, isFetching: false, bccsData: action.data, isSuccess: true }
    case REQUEST_BCCS_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    case REGISTER_USER:
      return { ...state, isFetching: true }
    case REGISTER_SUCCESS:
      return { ...state, isFetching: false, registerData: action.data, isSuccess: true }
    case REGISTER_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    case LOGOUT_USER:
      return { ...state, isLoggedIn: false, user: null, infoAccount: null, bccsData: null, previousPhone: action.previousPhone }

    case SET_LOGGED_IN:
      return { ...state, isLoggedIn: true }
    case SET_LOGGED_IN_NOINTERNET:
      return { ...state, isLoggedInNointernet: true }

    case LOGOUT_IN_NOINTERNET:
      return { ...state, isLoggedInNointernet: false }


    case SET_INFO_ACCOUNT:
      return { ...state, infoAccount: action.infoAccount }

    case VALIDATE_PIN:
      return { ...state, isFetching: true, actionType: VALIDATE_PIN }
    case VALIDATE_PIN_SUCCESS:
      return { ...state, isFetching: false, validateData: action.data, actionType: VALIDATE_PIN_SUCCESS }
    case VALIDATE_PIN_FAILED:
      return { ...state, isFetching: false, validateData: action.data, error: action.error, actionType: VALIDATE_PIN_FAILED }

    case CHANGE_PIN:
      return { ...state, changePinData: null, isFetching: true, actionType: CHANGE_PIN }
    case CHANGE_PIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        changePinData: action.data,
        isSuccess: true,
        actionType: CHANGE_PIN_SUCCESS,
        responseCode: action.responseCode,
        responseDescription: action.responseDescription
      }
    case CHANGE_PIN_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        actionType: CHANGE_PIN_FAILED,
        changePinData: action.data,
        responseCode: action.responseCode,
        responseDescription: action.responseDescription
      }

    case CHANGE_LANGUAGE:
      return { ...state, changeLanguageData: null, isFetching: true }
    case CHANGE_LANGUAGE_SUCCESS:
      let cloneInfoAccount = _.cloneDeep(state.infoAccount)
      let language = RequestField.getValueField(action.data && action.data.fieldMap, FIELD.LANGUAGE)
      cloneInfoAccount.language = language

      return { ...state, isFetching: false, infoAccount: cloneInfoAccount, changeLanguageData: action.data, localLanguage: language === "en_LA" ? "lo" : language === "en_US" ? "en" : language === "en_VN" ? "vn" : language === "en_CN" ? "cn" : "en" }
    case CHANGE_LANGUAGE_FAILED:
      return { ...state, isFetching: false, error: action.error }
    case CHANGE_LOCAL_LANGUAGE:
      return { ...state, isFetching: false, localLanguage: action.language }
    case GET_OTP:
      return { ...state, isFetching: true, actionType: GET_OTP }
    case GET_OTP_SUCCESS:
      return { ...state, isFetching: false, actionType: GET_OTP_SUCCESS }
    case GET_OTP_FAILED:
      return { ...state, isFetching: false, actionType: GET_OTP_FAILED }
    case PING:
      return { ...state, pingData: null, isFetching: true, actionType: PING }
    case PING_SUCCESS:
      return { ...state, pingData: action.data, isFetching: false, actionType: PING_SUCCESS }
    case PING_FALSE:
      return { ...state, pingData: null, isFetching: false, actionType: PING_FALSE }

    case REQUEST_SETUP_PIN:
      return { ...state, isFetching: true, actionType: REQUEST_SETUP_PIN }
    case REQUEST_SETUP_PIN_SUCCESS:
      return { ...state, isFetching: false, dataActive: action.data, isSuccess: true, actionType: REQUEST_SETUP_PIN_SUCCESS }
    case REQUEST_SETUP_PIN_FALSE:
      return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: REQUEST_SETUP_PIN_FALSE }




    case CHECK_NEW_USER:
      return { ...state, isLoading: true, actionType: CHECK_NEW_USER, checkNewUser: null }
    case CHECK_NEW_USER_SUCCESS:
      return { ...state, isLoading: false, checkNewUser: action.payload, isSuccess: true, actionType: CHECK_NEW_USER_SUCCESS }
    case CHECK_NEW_USER_FAILED:
      return { ...state, isLoading: false, error: action.error, isSuccess: false, actionType: CHECK_NEW_USER_FAILED, checkNewUser: null }


    case CHECK_ADD_USER:
      return { ...state, actionType: CHECK_ADD_USER, isLoading: true, checkAddNewUser: null }
    case CHECK_ADD_USER_SUCCESS:
      return { ...state, actionType: CHECK_ADD_USER_SUCCESS, isLoading: false, checkAddNewUser: action.payload }
    case CHECK_ADD_USER_FAILED:
      return { ...state, actionType: CHECK_ADD_USER_FAILED, isLoading: false, checkAddNewUser: null }


    case CHECK_PRESENTEE:
      return { ...state, actionType: CHECK_PRESENTEE, isLoading: true, checkpresentee: null }
    case CHECK_PRESENTEE_SUCCESS:
      return { ...state, actionType: CHECK_PRESENTEE_SUCCESS, isLoading: false, checkpresentee: action.payload }
    case CHECK_PRESENTEE_FAILED:
      return { ...state, actionType: CHECK_PRESENTEE_FAILED, isLoading: false, checkpresentee: null }




    case CHECK_HISTORY_TRANFER:
      return { ...state, actionType: CHECK_HISTORY_TRANFER, isLoading: true, checkHistoryTranfer: null }
    case CHECK_HISTORY_TRANFER_SUCCESS:
      return { ...state, actionType: CHECK_HISTORY_TRANFER_SUCCESS, isLoading: false, checkHistoryTranfer: action.payload }
    case CHECK_HISTORY_TRANFER_FAILED:
      return { ...state, actionType: CHECK_HISTORY_TRANFER_FAILED, isLoading: false, checkHistoryTranfer: null }

    case CHECK_ACCUONT_BCCS:
      return { ...state, checkAccuontBccs: null, isLoading: true, actionType: CHECK_ACCUONT_BCCS }
    case CHECK_ACCUONT_BCCS_SUCCESS:
      return { ...state, isLoading: false, checkAccuontBccs: action.data, isSuccess: true, actionType: CHECK_ACCUONT_BCCS_SUCCESS }
    case CHECK_ACCUONT_BCCS_FALSE:
      return { ...state, isLoading: false, error: action.error, isSuccess: false, actionType: CHECK_ACCUONT_BCCS_FALSE }

    case HISTORY_TRANFER:
      return { ...state, actionType: HISTORY_TRANFER, isLoading: true, checkHistoryTranfer: null }
    case HISTORY_TRANFER_SUCCESS:
      return { ...state, actionType: HISTORY_TRANFER_SUCCESS, isLoading: false, checkHistoryTranfer: action.payload }
    case HISTORY_TRANFER_FAILED:
      return { ...state, actionType: HISTORY_TRANFER_FAILED, isLoading: false, checkHistoryTranfer: null }


    case SEARCH_HISTORY_TRANFER:
      return { ...state, actionType: SEARCH_HISTORY_TRANFER, isLoading: true, searchdataHistory: null }
    case SEARCH_HISTORY_TRANFER_SUCCESS:
      return { ...state, actionType: SEARCH_HISTORY_TRANFER_SUCCESS, isLoading: false, searchdataHistory: action.payload }
    case SEARCH_HISTORY_TRANFER_FAILED:
      return { ...state, actionType: SEARCH_HISTORY_TRANFER_FAILED, isLoading: false, searchdataHistory: null }


    case CHECK_VERSION:
      return { ...state, actionType: CHECK_VERSION, isLoading: true, versionUpdate: null }
    case CHECK_VERSION_SUCCESS:
      return { ...state, actionType: CHECK_VERSION_SUCCESS, isLoading: false, versionUpdate: action.payload }
    case CHECK_VERSION_FAILED:
      return { ...state, actionType: CHECK_VERSION_FAILED, isLoading: false, versionUpdate: null }


    case REQUES_HISTORY_TRANFER:
      return { ...state, actionType: REQUES_HISTORY_TRANFER, isLoading: true, requesHistoryTranfer: null }
    case REQUES_HISTORY_TRANFER_SUCCESS:
      return { ...state, actionType: REQUES_HISTORY_TRANFER_SUCCESS, isLoading: false, requesHistoryTranfer: action.payload }
    case REQUES_HISTORY_TRANFER_FAILED:
      return { ...state, actionType: REQUES_HISTORY_TRANFER_FAILED, isLoading: false, requesHistoryTranfer: null }

    case REQUES_CHECK_AGENT_ID:
      return { ...state, actionType: REQUES_CHECK_AGENT_ID, isLoading: true, requestCheckagent: null }
    case REQUES_CHECK_AGENT_ID_SUCCESS:
      return { ...state, actionType: REQUES_CHECK_AGENT_ID_SUCCESS, isLoading: false, requestCheckagent: action.payload }
    case REQUES_CHECK_AGENT_ID_FAILED:
      return { ...state, actionType: REQUES_CHECK_AGENT_ID_FAILED, isLoading: false, requestCheckagent: null }

    case CHECK_CONTRACT_NUMBER:
      return { ...state, actionType: CHECK_CONTRACT_NUMBER, isLoading: true, requestContractNumber: null }
    case CHECK_CONTRACT_NUMBER_SUCCESS:
      return { ...state, actionType: CHECK_CONTRACT_NUMBER_SUCCESS, isLoading: false, requestContractNumber: action.payload }
    case CHECK_CONTRACT_NUMBER_FAILED:
      return { ...state, actionType: CHECK_CONTRACT_NUMBER_FAILED, isLoading: false, requestContractNumber: null }

    case LOAD_MENU_BANK:
      return { ...state, actionType: LOAD_MENU_BANK, isLoading: true, requestMenuBank: null }
    case LOAD_MENU_BANK_SUCCESS:
      return { ...state, actionType: LOAD_MENU_BANK_SUCCESS, isLoading: false, requestMenuBank: action.payload }
    case LOAD_MENU_BANK_FAILED:
      return { ...state, actionType: LOAD_MENU_BANK_FAILED, isLoading: false, requestMenuBank: null }


    case GET_INFO_NCC_LOTTERY:
      return { ...state, actionType: GET_INFO_NCC_LOTTERY, isLoading: true, getInfoNccLottery: null }
    case GET_INFO_NCC_LOTTERY_SUCCESS:
      return { ...state, actionType: GET_INFO_NCC_LOTTERY_SUCCESS, isLoading: false, getInfoNccLottery: action.data }
    case GET_INFO_NCC_LOTTERY_FAILED:
      return { ...state, actionType: GET_INFO_NCC_LOTTERY_FAILED, isLoading: false, getInfoNccLottery: null }


    case GET_SEARCH_TRANSACTION:
      return { ...state, actionType: GET_SEARCH_TRANSACTION, isLoading: true, getSearchdataTransaction: null }
    case GET_SEARCH_TRANSACTION_SUCCESS:
      return { ...state, actionType: GET_SEARCH_TRANSACTION_SUCCESS, isLoading: false, getSearchdataTransaction: action.payload }
    case GET_SEARCH_TRANSACTION_FAILED:
      return { ...state, actionType: GET_SEARCH_TRANSACTION_FAILED, isLoading: false, getSearchdataTransaction: null }

    case CHECK_NUMBER_CTTID:
      return { ...state, actionType: CHECK_NUMBER_CTTID, isLoading: true, getCheckNumberCTTID: null }
    case CHECK_NUMBER_CTTID_SUCCESS:
      return { ...state, actionType: CHECK_NUMBER_CTTID_SUCCESS, isLoading: false, getCheckNumberCTTID: action.payload }
    case CHECK_NUMBER_CTTID_FAILED:
      return { ...state, actionType: CHECK_NUMBER_CTTID_FAILED, isLoading: false, getCheckNumberCTTID: null }

    case CASH_OUT_WORD_BANK:
      return { ...state, actionType: CASH_OUT_WORD_BANK, isLoading: true, cashOutWordBankinfo: null }
    case CASH_OUT_WORD_BANK_SUCCESS:
      return { ...state, actionType: CASH_OUT_WORD_BANK_SUCCESS, isLoading: false, cashOutWordBankinfo: action.payload }
    case CASH_OUT_WORD_BANK_FAILED:
      return { ...state, actionType: CASH_OUT_WORD_BANK_FAILED, isLoading: false, cashOutWordBankinfo: null }


    case REQUES_HISTORY_TRANFER_NEW:
      return { ...state, actionType: REQUES_HISTORY_TRANFER_NEW, isLoading: true, getNewTransaction: null }
    case REQUES_HISTORY_TRANFER_NEW_SUCCESS:
      return { ...state, actionType: REQUES_HISTORY_TRANFER_NEW_SUCCESS, isLoading: false, getNewTransaction: action.payload }
    case REQUES_HISTORY_TRANFER_NEW_FAILED:
      return { ...state, actionType: REQUES_HISTORY_TRANFER_NEW_FAILED, isLoading: false, getNewTransaction: null }

      case CHECK_BLOCK_DEVICE:
        return { ...state, actionType: CHECK_BLOCK_DEVICE, isLoading: true, dataCheckBlockDeviec: null }
      case CHECK_BLOCK_DEVICE_SUCCESS:
        return { ...state, actionType: CHECK_BLOCK_DEVICE_SUCCESS, isLoading: false, dataCheckBlockDeviec: action.data }
      case CHECK_BLOCK_DEVICE_FAILED:
        return { ...state, actionType: CHECK_BLOCK_DEVICE_FAILED, isLoading: false, dataCheckBlockDeviec: null }
  
    default:
      return state
  }
}
