import {
  GET_AGENT_LOCATION,
  GET_AGENT_LOCATION_SUCCESS,
  GET_AGENT_LOCATION_FAILED
} from '../actions/types'
import Reactotron from 'reactotron-react-native'

const initialAuthState = {
  agentLocations: null,
  isFetching: false,
  error: null,
  isSuccess: false
}

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case GET_AGENT_LOCATION:
      return { ...state, agentLocations: null, isFetching: true }
    case GET_AGENT_LOCATION_SUCCESS:
      return { ...state, isFetching: false, agentLocations: action.data, isSuccess: true }
    case GET_AGENT_LOCATION_FAILED:
      return { ...state, isFetching: false, error: action.error, isSuccess: false }

    default:
      return state
  }
}
