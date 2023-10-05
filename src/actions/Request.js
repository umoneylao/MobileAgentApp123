import {
  AGENT_REQUEST_EMONEY,
  AGENT_REQ_BANK_MONEY,
  AGENT_CASH_OUT,
  AGENT_REG_FOR_USER
} from './types'
import Reactotron from 'reactotron-react-native'

export const agentRequestEmoney = (data) => {
  //Reactotron.log('accccc AGENT_REQUEST_EMONEY')
  return {
    type: AGENT_REQUEST_EMONEY,
    data
  }
}
export const agentReqBankMoney = (data) => {
  return {
    type: AGENT_REQ_BANK_MONEY,
    data
  }
}
export const agentCashOut = (data) => {
  //Reactotron.log('accccc AGENT_CASH_OUT')
  return {
    type: AGENT_CASH_OUT,
    data
  }
}

export const agentRegForUser = (data) => {
  //Reactotron.log('accccc AGENT_CASH_OUT')
  return {
    type: AGENT_REG_FOR_USER,
    data
  }
}
