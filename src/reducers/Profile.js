import {
  USER_GET_PROFILE_FULLFILLED,
  USER_GET_PROFILE_PENDING
} from '../constants/actionTypes'

const initialState = {
  profile: [],
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_GET_PROFILE_FULLFILLED:
      return {
        ...state,
        profile: action.payload,
        isLoading: false
      }
    case USER_GET_PROFILE_PENDING:
      return {
        ...state,
        isLoading: true
      }
    default:
      return state
  }
}
