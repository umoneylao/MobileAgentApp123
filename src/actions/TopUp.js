import {
  REQUEST_TOP_UP,
  GET_PAYMENT_INFO,
  CHECK_ACCOUNT_ETL,
  CHECK_ACCOUNT_ETL_FALSE, CHECK_ACCOUNT_ETL_SUCCESS,
  CHECK_FEE_TOPUP_ETL, CHECK_FEE_TOPUP_ETL_FALSE, CHECK_FEE_TOPUP_ETL_SUCCESS,
  GET_OTP_ETL, GET_OTP_ETL_SUCCESS, GET_OTP_ETL_FAILED,
  REQUEST_TOP_UP_ETL, REQUEST_TOP_UP_ETL_SUCCESS, REQUEST_TOP_UP_ETL_FAILED,
  CHECK_INFO_PAYMENT
} from './types'
import Reactotron from 'reactotron-react-native'

export const getOTP = (data) => {
  // //Reactotron.log('rd')
  return {
    type: GET_OTP,
    data
  }
}
export const requestTopUp = (data) => {
  //Reactotron.log('accccc topup')
  return {
    type: REQUEST_TOP_UP,
    data
  }
}
export const getPaymentInfo = (data) => {
  // //Reactotron.log('rd')
  return {
    type: GET_PAYMENT_INFO,
    data
  }
}
export const requestCheckAccuontETL = (data) => {
  return {
    type: CHECK_ACCOUNT_ETL,
    data
  }
}

export const requestCheckAccuontETLSuccess = (data) => {
  return {
    type: CHECK_ACCOUNT_ETL_SUCCESS,
    data
  }
}

export const requestCheckAccuontETLFalse = (data) => {
  return {
    type: CHECK_ACCOUNT_ETL_FALSE,
    data
  }
}

export const onGetFeeTopupETL = (data) => {
  return {
    type: CHECK_FEE_TOPUP_ETL,
    data
  }
}

export const onGetFeeTopupETL_Success = (data) => {
  return {
    type: CHECK_FEE_TOPUP_ETL_SUCCESS,
    data
  }
}

export const onGetFeeTopupETL_False = (data) => {
  return {
    type: CHECK_FEE_TOPUP_ETL_FALSE,
    data
  }
}

export const requestOTP = (data) => {
  return {
    type: GET_OTP_ETL,
    data
  }
}

export const requestOTP_Success = (data) => {
  return {
    type: GET_OTP_ETL_SUCCESS,
    data
  }
}

export const requestOTP_False = (data) => {
  return {
    type: GET_OTP_ETL_FAILED,
    data
  }
}

//requestTopupETL
export const requestTopup_ETL = (data) => {
  return {
    type: REQUEST_TOP_UP_ETL,
    data
  }
}

export const requestTopupETL_Success = (data) => {
  return {
    type: REQUEST_TOP_UP_ETL_SUCCESS,
    data
  }
}

export const requestTopupETL_False = (data) => {
  return {
    type: REQUEST_TOP_UP_ETL_FAILED,
    data
  }
}
export const sentReqcheckinfo = (data) => {
  return {
    type: CHECK_INFO_PAYMENT,
    data
  }
}

