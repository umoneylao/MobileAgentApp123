import {
  GET_AGENT_LOCATION
} from './types'
import Reactotron from 'reactotron-react-native'

export const getAgentLocation = (data) => {
  return {
    type: GET_AGENT_LOCATION,
    data
  }
}
