import {
  GET_OTP,
  REQUEST_PAYMENT_ELECTRIC
} from './types'
import Reactotron from 'reactotron-react-native'

export const getOTP = (data) => {
  // //Reactotron.log('rd')
  return {
    type: GET_OTP,
    data
  }
}
export const electricPayment = (data) => {
  return {
    type: REQUEST_PAYMENT_ELECTRIC,
    data
  }
}
