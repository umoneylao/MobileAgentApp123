import {
  REQUEST_CASH_OUT,
  REQUEST_CASH_IN,
  SEARCH_DIR_TRANS_HIS
} from './types'
import Reactotron from 'reactotron-react-native'

export const requestCashOut = (data) => {  
  return {
    type: REQUEST_CASH_OUT,
    data
  }
}
export const requestCashIn = (data) => {
  return {
    type: REQUEST_CASH_IN,
    data
  }
}

export const requestCashInTranfer = (data) => {
  return {
    type: REQUEST_CASH_IN,
    data
  }
}
export const searchDirectTransHis = (data) => {
  return {
    type: SEARCH_DIR_TRANS_HIS,
    data
  }
}
