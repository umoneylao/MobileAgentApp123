import types from './types'
import auth from './Auth'
import transfer from './Transfer'
import billPay from './BillPay'
import lookupTrans from './LookupTrans'
import topUp from './TopUp'
import request from './Request'
import map from './Map'
import sokxay from './Sokxay'
import Lottery from './Lottery'
import Bank from './Bank'
import WorldBank from './WorldBank'
import getPromotion from './GetPromontion'
import Leasing from './Leasing'
import InsuranceAction from './InsuranceAction'
import ByPassPIN from './ByPassPIN'
export const ActionCreators = Object.assign({
  auth,
  transfer,
  billPay,
  lookupTrans,
  topUp,
  request,
  map,
  sokxay,
  Lottery,
  Bank,
  WorldBank,
  getPromotion,
  Leasing,
  InsuranceAction,
  ByPassPIN
})
