
import {
    HIGH_SECURITY_OTP,
    CALL_CHECK_SWICH,
    CALL_CHECK_AMOUNT,
    GET_ALL_CONFIG_AMOUNT
  
  } from './types'
export const onCheckHighSecurity = (data) => {
    return {
      type: HIGH_SECURITY_OTP,
      data
    }
  }
  export const onCallCheckSwich = (data) => {
    return {
      type: CALL_CHECK_SWICH,
      data
    }
  }
  export const requestCheckAmount = (data) => {
    return {
      type: CALL_CHECK_AMOUNT,
      data
    }
  }

  export const onGetAllconfigAmonut = () => {
    return {
      type: GET_ALL_CONFIG_AMOUNT
    }
  }