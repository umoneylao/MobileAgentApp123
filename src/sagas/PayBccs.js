import { put, takeLatest, call } from 'redux-saga/effects'
import { PAY_STAFF_DEBT, PAY_STAFF_DEBT_FALSE, PAY_STAFF_DEBT_SUCCESS,  CHECK_INFO_DISCOUNT, CHECK_INFO_DISCOUNT_SUCCESS, CHECK_INFO_DISCOUNT_FAILED } from '../actions/types'
import { transferBccs, getCheckInfoDiscount } from '../utils/Api'
function* callTransferToBccs(action) {
    try {
        const dataReturn = yield transferBccs(action.data)
        yield put({ type: PAY_STAFF_DEBT_SUCCESS, data: dataReturn })
    } catch (error) {
        yield put({ type: PAY_STAFF_DEBT_FALSE, error })
    }
}
export function* TransferToBccsSagas() {
    yield takeLatest(PAY_STAFF_DEBT, callTransferToBccs)
}


function* callCheckInfoDiscount(action) {
    try {
      //carriedAccountId, fromAccountId,toAccountId, processCode, amount,partnerCode, serviceCode
      const response = yield getCheckInfoDiscount(action.carriedAccountId, action.fromAccountId,action.toAccountId, action.processCode, action.amount,action.partnerCode, action.serviceCode);
    
      if (response.ok && response.status === 200) {
        if (response.data.policyCollections.policy.length >= 1) {
            // console.log('-----vvv------:', response.data.policyCollections.policy)
          yield put({ type: CHECK_INFO_DISCOUNT_SUCCESS, data: response.data.policyCollections.policy })
        } else {
          yield put({ type: CHECK_INFO_DISCOUNT_FAILED })
        }
      } else {
        yield put({ type: CHECK_INFO_DISCOUNT_FAILED })
      }
    } catch (error) {
      yield put({ type: CHECK_INFO_DISCOUNT_FAILED, data: { error: error } })
    }
  }
  export function* CheckInfoDiscount() {
    yield takeLatest(CHECK_INFO_DISCOUNT, callCheckInfoDiscount)
  }