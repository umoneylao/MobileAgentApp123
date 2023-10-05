import {combineReducers} from 'redux'
import auth from './Auth'
import transfer from './Transfer'
import billPay from './BillPay'
import lookup from './Lookup'
import topUp from './TopUp'
import cashOut from './CashOut'
import request from './Request'
import map from './Map'
import sokxay from './Sokxay'
import LotteryReducer from './LotteryReducer'
import BankReducer from './BankReducers'
import WorldBank from './WorldBank'
import getPromotionReducer from './GetPromotionReducer'
import LeasingReducer from './Leasing'
import Insurance from './Insurance'
import PayBccsReducers from './PayBccsReducers'
import WatterReducers from './Watter'
import ByPassPinReducer from './ByPassPinReducer'
const AppReducer = combineReducers({
  auth,
  transfer,
  billPay,
  lookup,
  topUp,
  cashOut,
  request,
  map,
  sokxay,
  LotteryReducer,
  BankReducer,
  WorldBank,
  getPromotionReducer,
  LeasingReducer,
  Insurance,
  PayBccsReducers,
  WatterReducers,
  ByPassPinReducer
})

export default AppReducer
