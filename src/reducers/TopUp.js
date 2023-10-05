import {
  REQUEST_TOP_UP,
  REQUEST_TOP_UP_SUCCESS,
  REQUEST_TOP_UP_FAILED,
  GET_PAYMENT_INFO,
  GET_PAYMENT_INFO_SUCCESS,
  GET_PAYMENT_INFO_FAILED,
  CHECK_ACCOUNT_ETL, CHECK_ACCOUNT_ETL_FALSE, CHECK_ACCOUNT_ETL_SUCCESS,
  CHECK_FEE_TOPUP_ETL, CHECK_FEE_TOPUP_ETL_SUCCESS, CHECK_FEE_TOPUP_ETL_FALSE,
  GET_OTP_ETL, GET_OTP_ETL_FAILED, GET_OTP_ETL_SUCCESS,
  REQUEST_TOP_UP_ETL, REQUEST_TOP_UP_ETL_SUCCESS, REQUEST_TOP_UP_ETL_FAILED,
  CHECK_INFO_PAYMENT_SUCCESS, CHECK_INFO_PAYMENT, CHECK_INFO_PAYMENT_FAILED


} from '../actions/types'
import Reactotron from 'reactotron-react-native'

const initialAuthState = {
  topUpData: null,
  paymentInfo: null,
  isFetching: false,
  error: null,
  isSuccess: false,
  checkAcoutETL: null,
  actionType: null,
  checkFeetopup: null,
  checkGetOTP: null,
  requestTopUpETL: null,
  dataCheckinfoPayment: null
}

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case REQUEST_TOP_UP:
      return { ...state, isFetching: true }
    case REQUEST_TOP_UP_SUCCESS:
      return { ...state, isFetching: false, topUpData: action.data, isSuccess: true }
    case REQUEST_TOP_UP_FAILED:
      //Reactotron.log('REQUEST_TOP_UP_FAILED')
      //Reactotron.log(action)
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    case GET_PAYMENT_INFO:
      return { ...state, isFetching: true, paymentInfo: null }
    case GET_PAYMENT_INFO_SUCCESS:
      return { ...state, isFetching: false, paymentInfo: action.data, isSuccess: true }
    case GET_PAYMENT_INFO_FAILED:
      //Reactotron.log('GET_PAYMENT_INFO_FAILED')
      //Reactotron.log(action)
      return { ...state, isFetching: false, error: action.error, isSuccess: false }


    case CHECK_ACCOUNT_ETL:
      return { ...state, isFetching: true, checkAcoutETL: null, actionType: CHECK_ACCOUNT_ETL }
    case CHECK_ACCOUNT_ETL_SUCCESS:
      return { ...state, isFetching: false, checkAcoutETL: action.data, isSuccess: true, actionType: CHECK_ACCOUNT_ETL_SUCCESS }
    case CHECK_ACCOUNT_ETL_FALSE:
      return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: CHECK_ACCOUNT_ETL_FALSE }



    case CHECK_FEE_TOPUP_ETL:
      return { ...state, isFetching: true, checkFeetopup: null, actionType: CHECK_FEE_TOPUP_ETL }
    case CHECK_FEE_TOPUP_ETL_SUCCESS:
      return { ...state, isFetching: false, checkFeetopup: action.data, isSuccess: true, actionType: CHECK_FEE_TOPUP_ETL_SUCCESS }
    case CHECK_FEE_TOPUP_ETL_FALSE:
      return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: CHECK_FEE_TOPUP_ETL_FALSE }


    case GET_OTP_ETL:
      return { ...state, isFetching: true, checkGetOTP: null, actionType: GET_OTP_ETL }
    case GET_OTP_ETL_SUCCESS:
      return { ...state, isFetching: false, checkGetOTP: action.data, isSuccess: true, actionType: GET_OTP_ETL_SUCCESS }
    case GET_OTP_ETL_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: GET_OTP_ETL_FAILED }

    case REQUEST_TOP_UP_ETL:
      return { ...state, isFetching: true, requestTopUpETL: null, actionType: REQUEST_TOP_UP_ETL }
    case REQUEST_TOP_UP_ETL_SUCCESS:
      return { ...state, isFetching: false, requestTopUpETL: action.data, isSuccess: true, actionType: REQUEST_TOP_UP_ETL_SUCCESS }
    case REQUEST_TOP_UP_ETL_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: REQUEST_TOP_UP_ETL_FAILED }

    case CHECK_INFO_PAYMENT:
      return { ...state, isFetching: true, dataCheckinfoPayment: null, actionType: CHECK_INFO_PAYMENT }
    case CHECK_INFO_PAYMENT_SUCCESS:
      return { ...state, isFetching: false, dataCheckinfoPayment: action.data, isSuccess: true, actionType: CHECK_INFO_PAYMENT_SUCCESS }
    case CHECK_INFO_PAYMENT_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: CHECK_INFO_PAYMENT_FAILED }


    default:
      return state
  }
}
