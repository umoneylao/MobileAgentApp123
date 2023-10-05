import {
  GET_OTP,
  GET_OTP_SUCCESS,
  GET_OTP_FAILED,
  REQUEST_PAYMENT_ELECTRIC,
  REQUEST_PAYMENT_ELECTRIC_SUCCESS,
  REQUEST_PAYMENT_ELECTRIC_FAILED
} from '../actions/types'
import Reactotron from 'reactotron-react-native'

const initialAuthState = {
  otpData: null,
  isFetching: false,
  error: null,
  isSuccess: false,
  electricData: null
}

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case GET_OTP:
      return { ...state, isFetching: true }
    case GET_OTP_SUCCESS:
      return { ...state, isFetching: false, otpData: action.data, isSuccess: true }
    case GET_OTP_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    case REQUEST_PAYMENT_ELECTRIC:
      return { ...state, isFetching: true }
    case REQUEST_PAYMENT_ELECTRIC_SUCCESS:
      //Reactotron.log('rdc REQUEST_PAYMENT_ELECTRIC_SUCCESS')
      //Reactotron.log(action.data)
      return { ...state, isFetching: false, electricData: action.data, isSuccess: true }
    case REQUEST_PAYMENT_ELECTRIC_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }
    default:
      return state
  }
}
