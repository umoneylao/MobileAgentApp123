import { put, takeLatest, call } from 'redux-saga/effects'
import {
    CHECK_ACCUONT_WATTE,CHECK_ACCUONT_WATTE_SUCCESS,CHECK_ACCUONT_WATTE_FALSE,
    PAY_MENT_WATTER_NPP, PAY_MENT_WATTER_NPP_FAILED, PAY_MENT_WATTER_NPP_SUCCESS
} from '../actions/types'
import { getCheckAccountWatter, PaymentWatter } from '../utils/Api'

function* callCheckAccountWatter(action) {
    try {
        const dataReturn = yield getCheckAccountWatter(action.data)
        yield put({ type: CHECK_ACCUONT_WATTE_SUCCESS, data: dataReturn })
    } catch (error) {
        yield put({ type: CHECK_ACCUONT_WATTE_FALSE, error })
    }
}
export function* CheckAccuontWatterSagas() {
    yield takeLatest(CHECK_ACCUONT_WATTE, callCheckAccountWatter)
}

function* callPaymentWatter(action) {
    try {
        const dataReturn = yield PaymentWatter(action.data)
        yield put({ type: PAY_MENT_WATTER_NPP_SUCCESS, data: dataReturn })
    } catch (error) {
        yield put({ type: PAY_MENT_WATTER_NPP_FAILED, error })
    }
}
export function* PaymentWatterSagas() {
    yield takeLatest(PAY_MENT_WATTER_NPP, callPaymentWatter)
}


