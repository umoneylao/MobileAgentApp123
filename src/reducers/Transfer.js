import {
  GET_ACCOUNT_INFO,
  GET_ACCOUNT_INFO_SUCCESS,
  GET_ACCOUNT_INFO_FAILED,
  ACCESS_INFO_WALLET_NON_WALLET,
  ACCESS_INFO_WALLET_NON_WALLET_SUCCESS,
  ACCESS_INFO_WALLET_NON_WALLET_FAILED,
  ACCESS_INFO_WALLET_WALLET,
  ACCESS_INFO_WALLET_WALLET_SUCCESS,
  ACCESS_INFO_WALLET_WALLET_FAILED,
  CONFIRM_PIN,
  CONFIRM_PIN_SUCCESS,
  CONFIRM_PIN_FAILED,
  TRANSFER_OTHER_TO_OTHER,
  TRANSFER_OTHER_TO_OTHER_SUCCESS,
  TRANSFER_OTHER_TO_OTHER_FAILED

} from '../actions/types'
import Reactotron from 'reactotron-react-native'

const initialAuthState = {
  receiver: null,
  info: null,
  isFetching: false,
  error: null,
  isSuccess: false,
  responsePin: null
}

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case GET_ACCOUNT_INFO:
      return { ...state, receiver: null, isFetching: true }
    case GET_ACCOUNT_INFO_SUCCESS:
      //Reactotron.log('RDC GET_ACCOUNT_INFO_SUCCESS')
      //Reactotron.log(action.data)
      return { ...state, isFetching: false, receiver: action.data }
    case GET_ACCOUNT_INFO_FAILED:
      return { ...state, isFetching: false, error: action.error }

    case ACCESS_INFO_WALLET_NON_WALLET:
      return { ...state, isFetching: true }
    case ACCESS_INFO_WALLET_NON_WALLET_SUCCESS:
      return { ...state, isFetching: false, info: action.data }
    case ACCESS_INFO_WALLET_NON_WALLET_FAILED:
      return { ...state, isFetching: false, error: action.error }

    case ACCESS_INFO_WALLET_WALLET:
      return { ...state, isFetching: true }
    case ACCESS_INFO_WALLET_WALLET_SUCCESS:
      return { ...state, isFetching: false, info: action.data }
    case ACCESS_INFO_WALLET_WALLET_FAILED:
      return { ...state, isFetching: false, error: action.error }

    case CONFIRM_PIN:
      return { ...state, isFetching: true }
    case CONFIRM_PIN_SUCCESS:
      //Reactotron.log('reducer CONFIRM_PIN_SUCCESS')
      //Reactotron.log(action.data)
      return { ...state, isFetching: false, responsePin: action.data, isSuccess: true }
    case CONFIRM_PIN_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    case TRANSFER_OTHER_TO_OTHER:
      return { ...state, isFetching: true }
    case TRANSFER_OTHER_TO_OTHER_SUCCESS:
      return { ...state, isFetching: false, transferOtO: action.data, isSuccess: true }
    case TRANSFER_OTHER_TO_OTHER_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }
    default:
      return state
  }
}
