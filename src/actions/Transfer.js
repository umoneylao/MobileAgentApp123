import {
  GET_ACCOUNT_INFO,
  ACCESS_INFO_WALLET_NON_WALLET,
  ACCESS_INFO_WALLET_WALLET,
  CONFIRM_PIN,

  TRANSFER_OTHER_TO_OTHER
} from './types'
import Reactotron from 'reactotron-react-native'

export const getAccountInfo = (receiver) => {
  // //Reactotron.log('rd')
  return {
    type: GET_ACCOUNT_INFO,
    receiver
  }
}

export const accessInfoWalletNonWallet = (info) => {
  return {
    type: ACCESS_INFO_WALLET_NON_WALLET,
    info
  }
}
export const accessInfoWalletWallet = (info) => {
  return {
    type: ACCESS_INFO_WALLET_WALLET,
    info
  }
}
export const confirmPin = (info) => {
  return {
    type: CONFIRM_PIN,
    info
  }
}
// NEW
export const transferOtherToOther = (info) => {
  return {
    type: TRANSFER_OTHER_TO_OTHER,
    info
  }
}
