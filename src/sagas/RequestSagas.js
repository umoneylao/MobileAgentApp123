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

import { put, takeLatest, call } from 'redux-saga/effects'
// import { Api } from './Api'
import { agentRequestEmoney, agentReqBankMoney, agentCashOut, agentRegForUser } from '../utils/Api'
import Reactotron from 'reactotron-react-native'

function * callAgentRequestEMoney (action) {
  //Reactotron.log('saga AGENT_REQUEST_EMONEY')
  //Reactotron.log(action)
  try {
    const data = yield agentRequestEmoney(action.data)
    yield put({ type: AGENT_REQUEST_EMONEY_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: AGENT_REQUEST_EMONEY_FAILED, error })
  }
}
export function * watchAgentRequestEMoney () {
  yield takeLatest(AGENT_REQUEST_EMONEY, callAgentRequestEMoney)
}

function * callAgentReqBankMoney (action) {
  //Reactotron.log('saga AGENT_REQ_BANK_MONEY')
  //Reactotron.log(action)
  try {
    const data = yield agentReqBankMoney(action.data)
    yield put({ type: AGENT_REQ_BANK_MONEY_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: AGENT_REQ_BANK_MONEY_FAILED, error })
  }
}
export function * watchAgentReqBankMoney () {
  yield takeLatest(AGENT_REQ_BANK_MONEY, callAgentReqBankMoney)
}

function * callAgentCashOut (action) {
  //Reactotron.log('saga AGENT_CASH_OUT')
  //Reactotron.log(action)
  try {
    const data = yield agentCashOut(action.data)
    yield put({ type: AGENT_CASH_OUT_SUCCESS, data: data.data })
  } catch (error) {
    //Reactotron.log('log errrorr at saga')
    //Reactotron.log(error)
    yield put({ type: AGENT_CASH_OUT_FAILED, error })
  }
}
export function * watchAgentCashOut () {
  yield takeLatest(AGENT_CASH_OUT, callAgentCashOut)
}

function * callAgentRegForUser (action) {
  //Reactotron.log('saga AGENT_CASH_OUT')
  //Reactotron.log(action)
  try {
    const data = yield agentRegForUser(action.data)
  
    yield put({ type: AGENT_REG_FOR_USER_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: AGENT_REG_FOR_USER_FAILED, error })
  }
}
export function * watchAgentRegForUser () {
  yield takeLatest(AGENT_REG_FOR_USER, callAgentRegForUser)
}
