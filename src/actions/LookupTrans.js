import {
  REQUEST_BALANCE,
  GET_TRANSACTION_HISTORY,
  SEARCH_COMMISSION,
  GET_COMMISSION_THIS_MONTH,
  GET_COMMISSION_LAST_MONTH,
  CHECK_FUNDER
} from './types'
import Reactotron from 'reactotron-react-native'

export const requestBalance = (data) => {
  // //Reactotron.log('rd')
  return {
    type: REQUEST_BALANCE,
    data
  }
}
export const getTransactionHistory = (data) => {
  // //Reactotron.log('rd')
  return {
    type: GET_TRANSACTION_HISTORY,
    data
  }
}

export const getCommissionThisMonth = (data) => {
  return {
    type: GET_COMMISSION_THIS_MONTH,
    data
  }
}

export const getCommissionLastMonth = (data) => {
  return {
    type: GET_COMMISSION_LAST_MONTH,
    data
  }
}

export const checkFunder = (data) => {
 
  return {
    type: CHECK_FUNDER,
    data
  }
}
