import {
  REQUEST_CASH_OUT,
  REQUEST_CASH_OUT_SUCCESS,
  REQUEST_CASH_OUT_FAILED,
  REQUEST_CASH_IN,
  REQUEST_CASH_IN_SUCCESS,
  REQUEST_CASH_IN_FAILED,
  SEARCH_DIR_TRANS_HIS,
  SEARCH_DIR_TRANS_HIS_SUCCESS,
  SEARCH_DIR_TRANS_HIS_FAILED
} from '../actions/types'
import Reactotron from 'reactotron-react-native'

const initialAuthState = {
  cashOutData: null,
  cashInData: null,
  searchDirTransHisData: null,
  isFetching: false,
  error: null,
  isSuccess: false
}

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case REQUEST_CASH_OUT:
      return { ...state, cashOutData: null, isFetching: true }
    case REQUEST_CASH_OUT_SUCCESS:
      return { ...state, isFetching: false, cashOutData: action.data, isSuccess: true }
    case REQUEST_CASH_OUT_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    case REQUEST_CASH_IN:
      return { ...state, cashInData: null, isFetching: true }
    case REQUEST_CASH_IN_SUCCESS:
      console.log('----action.data---', action.data)
      return { ...state, isFetching: false, cashInData: action.data, isSuccess: true }
    case REQUEST_CASH_IN_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    case SEARCH_DIR_TRANS_HIS:
      return { ...state, searchDirTransHisData: null, isFetching: true }
    case SEARCH_DIR_TRANS_HIS_SUCCESS:
      return { ...state, isFetching: false, searchDirTransHisData: action.data, isSuccess: true }
    case SEARCH_DIR_TRANS_HIS_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    default:
      return state
  }
}
