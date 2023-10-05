import {
  USER_GET_PROFILE,
  USER_GET_BALANCE,
  USER_GET_HISTORY
} from '../constants/actionTypes'
import User from '../models/entities/User'

export const getProfile = (phoneNumber) => {
  return {
    type: USER_GET_PROFILE,
    payload: new User('Nguyen Gia Tu', '01656119319', true,
      '84100P000000140863', '14086', '013468846', 'CMND', '840', 'ACTIVE')
  }
}

export const getBalance = (accountID, PIN) => {
  let balance = '1000$'
  return {
    type: USER_GET_BALANCE,
    payload: {
      balance
    }
  }
}
