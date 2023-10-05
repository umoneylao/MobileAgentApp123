import {
  AGENT_REQUEST_EMONEY,
  AGENT_REQUEST_EMONEY_SUCCESS,
  AGENT_REQUEST_EMONEY_FAILED,
  AGENT_REQ_BANK_MONEY,
  AGENT_REQ_BANK_MONEY_SUCCESS,
  AGENT_REQ_BANK_MONEY_FAILED,
  AGENT_CASH_OUT,
  AGENT_CASH_OUT_SUCCESS,
  AGENT_CASH_OUT_FAILED,
  AGENT_REG_FOR_USER,
  AGENT_REG_FOR_USER_SUCCESS,
  AGENT_REG_FOR_USER_FAILED
} from '../actions/types'
import Reactotron from 'reactotron-react-native'

const initialAuthState = {
  agentReqEMoneyData: null,
  agentReqBankMoneyData: null,
  agentCashOutData: null,
  agentRegForUserData: null,
  isFetching: false,
  error: null,
  isSuccess: false
}

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case AGENT_REQUEST_EMONEY:
      return { ...state, agentReqEMoneyData: null, isFetching: true }
    case AGENT_REQUEST_EMONEY_SUCCESS:
      return { ...state, isFetching: false, agentReqEMoneyData: action.data, isSuccess: true }
    case AGENT_REQUEST_EMONEY_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    case AGENT_REQ_BANK_MONEY:
      return { ...state, agentReqBankMoneyData: null, isFetching: true }
    case AGENT_REQ_BANK_MONEY_SUCCESS:
      return { ...state, isFetching: false, agentReqBankMoneyData: action.data, isSuccess: true }
    case AGENT_REQ_BANK_MONEY_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    case AGENT_CASH_OUT:
      return { ...state, agentCashOutData: null, isFetching: true }
    case AGENT_CASH_OUT_SUCCESS:
      return { ...state, isFetching: false, agentCashOutData: action.data, isSuccess: true }
    case AGENT_CASH_OUT_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    case AGENT_REG_FOR_USER:
      return { ...state, agentRegForUserData: null, isFetching: true }
    case AGENT_REG_FOR_USER_SUCCESS:
      return { ...state, isFetching: false, agentRegForUserData: action.data, isSuccess: true }
    case AGENT_REG_FOR_USER_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    default:
      return state
  }
}
