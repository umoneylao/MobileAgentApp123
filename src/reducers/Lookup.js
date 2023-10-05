import {
  REQUEST_BALANCE,
  REQUEST_BALANCE_SUCCESS,
  REQUEST_BALANCE_FAILED,
  GET_TRANSACTION_HISTORY,
  GET_TRANSACTION_HISTORY_SUCCESS,
  GET_TRANSACTION_HISTORY_FAILED,
  GET_COMMISSION_THIS_MONTH,
  GET_COMMISSION_THIS_MONTH_SUCCESS,
  GET_COMMISSION_THIS_MONTH_FAILED,
  GET_COMMISSION_LAST_MONTH,
  GET_COMMISSION_LAST_MONTH_SUCCESS,
  GET_COMMISSION_LAST_MONTH_FAILED,
  LOGOUT_USER,
  CHECK_FUNDER,
  CHECK_FUNDER_SUCCESS,
  CHECK_FUNDER_FALSE
} from '../actions/types'
import Reactotron from 'reactotron-react-native'

const initialAuthState = {
  isFetching: false,
  error: null,
  isSuccess: false,
  balanceData: null,
  transactionHistory: null,
  commissionThisMonthData: null,
  commissionLastMonthData: null,
  funderData: null
}

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case REQUEST_BALANCE:
      return { ...state, isFetching: true }
    case REQUEST_BALANCE_SUCCESS:
      return { ...state, isFetching: false, balanceData: action.data, isSuccess: true }
    case REQUEST_BALANCE_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    case GET_TRANSACTION_HISTORY:
      return { ...state, isFetching: true }
    case GET_TRANSACTION_HISTORY_SUCCESS:
      return { ...state, isFetching: false, transactionHistory: action.data, isSuccess: true }
    case GET_TRANSACTION_HISTORY_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    case GET_COMMISSION_THIS_MONTH:
      return { ...state, commissionThisMonthData: null, isFetching: true }
    case GET_COMMISSION_THIS_MONTH_SUCCESS:
      return { ...state, isFetching: false, commissionThisMonthData: action.data, isSuccess: true }
    case GET_COMMISSION_THIS_MONTH_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    case GET_COMMISSION_LAST_MONTH:
      return { ...state, commissionLastMonthData: null, isFetching: true }
    case GET_COMMISSION_LAST_MONTH_SUCCESS:
      return { ...state, isFetching: false, commissionLastMonthData: action.data, isSuccess: true }
    case GET_COMMISSION_LAST_MONTH_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    case CHECK_FUNDER:
      return { ...state, isFetching: true }
    case CHECK_FUNDER_SUCCESS:
      return { ...state, isFetching: false, funderData: action.data, isSuccess: true }
    case CHECK_FUNDER_FALSE:
     
      return { ...state, isFetching: false, isSuccess: false }

    case LOGOUT_USER:
      return { ...state, balanceData: null }

    default:
      return state
  }
}
