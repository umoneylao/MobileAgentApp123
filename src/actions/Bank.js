import {
    CHECK_ACCUONT_BANK_FALSE,
    CHECK_ACCUONT_BANK_SUCCESS,
    CHECK_ACCUONT_BANK,
    CHECK_FEE_BANK, CHECK_FEE_BANK_SUCCESS, CHECK_FEE_BANK_FALSE,
    GET_OTP_BANK, GET_OTP_BANK_SUCCESS, GET_OTP_BANK_FAILED,
    TRANSFER_EWALLET_TO_BANK, TRANSFER_EWALLET_TO_BANK_SUCCESS,TRANSFER_EWALLET_TO_BANK_FAILED,
    PAY_STAFF_DEBT, CHECK_INFO_DISCOUNT
} from './types'
import Reactotron from 'reactotron-react-native'

export const requestCheckAccuont = (data) => {
    return {
        type: CHECK_ACCUONT_BANK,
        data
    }
}

export const requestCheckAccuontSuccess = (data) => {
    return {
        type: CHECK_ACCUONT_BANK_SUCCESS,
        data
    }
}

export const requestCheckAccuontFalse = (data) => {
    return {
        type: CHECK_ACCUONT_BANK_FALSE,
        data
    }
}

export const requestGetFee = (data) => {
    return {
        type: CHECK_FEE_BANK,
        data
    }
}

export const requestGetFeeSuccess = (data) => {
    return {
        type: CHECK_FEE_BANK_SUCCESS,
        data
    }
}

export const requestGetFeeFalse = (data) => {
    return {
        type: CHECK_FEE_BANK_FALSE,
        data
    }
}

export const requestOTP = (data) => {
    return {
        type: GET_OTP_BANK,
        data
    }
}
export const requestOTPSuccess = (data) => {
    return {
        type: GET_OTP_BANK_SUCCESS,
        data
    }
}
export const requestOTPFailed = (data) => {
    return {
        type: GET_OTP_BANK_FAILED,
        data
    }
}

export const requestTranferBank = (data) => {
    return {
        type: TRANSFER_EWALLET_TO_BANK,
        data
    }
}

export const requestTranferBankSuccess = (data) => {
    return {
        type: TRANSFER_EWALLET_TO_BANK_SUCCESS,
        data
    }
}

export const requestTranferBankFailed = (data) => {
    return {
        type: TRANSFER_EWALLET_TO_BANK_FAILED,
        data
    }
}

export const requestTranferBccs = (data) => {
    return {
      type: PAY_STAFF_DEBT,
      data
    }
  }


  export const reqCheckInfoDiscount = (carriedAccountId, fromAccountId,toAccountId, processCode, amount,partnerCode, serviceCode ) => {
    return {
      type: CHECK_INFO_DISCOUNT,
      carriedAccountId, fromAccountId,toAccountId, processCode, amount,partnerCode, serviceCode 
    }
  }




