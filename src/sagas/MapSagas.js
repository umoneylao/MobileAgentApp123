import {
  GET_AGENT_LOCATION,
  GET_AGENT_LOCATION_SUCCESS,
  GET_AGENT_LOCATION_FAILED
} from '../actions/types'

import { put, takeLatest, call } from 'redux-saga/effects'
// import { Api } from './Api'
import { getAgentLocation } from '../utils/Api'
import Reactotron from 'reactotron-react-native'

function * callGetAgentLocation (action) {
  //Reactotron.log('saga callGetAgentLocation')
  //Reactotron.log(action)
  try {
    const data = yield getAgentLocation(action.data)
    yield put({ type: GET_AGENT_LOCATION_SUCCESS, data: data.data })
  } catch (error) {
    yield put({ type: GET_AGENT_LOCATION_FAILED, error })
  }
}

export function * watchGetAgentLocation () {
  yield takeLatest(GET_AGENT_LOCATION, callGetAgentLocation)
}
