import { put, takeLatest, call } from 'redux-saga/effects'
import {
    CHECK_ACCUONT_BANK_FALSE, CHECK_ACCUONT_BANK_SUCCESS, CHECK_ACCUONT_BANK,
    CHECK_FEE_BANK, CHECK_FEE_BANK_SUCCESS, CHECK_FEE_BANK_FALSE,
    GET_OTP_BANK, GET_OTP_BANK_SUCCESS, GET_OTP_BANK_FAILED,
    TRANSFER_EWALLET_TO_BANK, TRANSFER_EWALLET_TO_BANK_SUCCESS, TRANSFER_EWALLET_TO_BANK_FAILED,
    // PAY_STAFF_DEBT, PAY_STAFF_DEBT_FALSE, PAY_STAFF_DEBT_SUCCESS
}
    from '../actions/types'
import { getCheckAccountBank, getFeeBank, getOTPBank, transferBank, transferBccs } from '../utils/Api'
import { AlertNative } from '../components'
import I18n from 'react-native-i18n'

function* callCheckAccountBank(action) {
    // console.log('action:', action.data)
    try {
        const dataReturn = yield getCheckAccountBank(action.data)
        
        // console.log('dataReturn---------:', dataReturn.data) 
        yield put({ type: CHECK_ACCUONT_BANK_SUCCESS, data: dataReturn })
    } catch (error) {
        AlertNative(I18n.t('somethingWentWrong'))
        yield put({ type: CHECK_ACCUONT_BANK_FALSE, error })
    }
}
export function* CheckAccuontBankSagas() {
    yield takeLatest(CHECK_ACCUONT_BANK, callCheckAccountBank)
}


function* callGetFee(action) {
    try {
        const dataReturn = yield getFeeBank(action.data);
        yield put({ type: CHECK_FEE_BANK_SUCCESS, data: dataReturn })
    } catch (error) {
        AlertNative(I18n.t('somethingWentWrong'))
        yield put({ type: CHECK_FEE_BANK_FALSE, error })
    }
}
export function* GetFeeBankSagas() {
    yield takeLatest(CHECK_FEE_BANK, callGetFee)
}


function* callGetOTPBank(action) {
    try {
        const dataReturn = yield getOTPBank(action.data)
        console.log('------dataReturn OTP-------', dataReturn)
        yield put({ type: GET_OTP_BANK_SUCCESS, data: dataReturn })
    } catch (error) {
        AlertNative(I18n.t('somethingWentWrong'))
        yield put({ type: GET_OTP_BANK_FAILED, error })
    }
}
export function* GetOTPBankSagas() {
    yield takeLatest(GET_OTP_BANK, callGetOTPBank)
}


function* callTransferToBank(action) {
    try {
        const dataReturn = yield transferBank(action.data)
        yield put({ type: TRANSFER_EWALLET_TO_BANK_SUCCESS, data: dataReturn })
    } catch (error) {
        AlertNative(I18n.t('somethingWentWrong'))
        yield put({ type: TRANSFER_EWALLET_TO_BANK_FAILED, error })
    }
}
export function* TransferToBankSagas() {
    yield takeLatest(TRANSFER_EWALLET_TO_BANK, callTransferToBank)
}


// function* callTransferToBccs(action) {
//     try {
//         const dataReturn = yield transferBccs(action.data)
//         yield put({ type: PAY_STAFF_DEBT_SUCCESS, data: dataReturn })
//     } catch (error) {
//         AlertNative(I18n.t('somethingWentWrong'))
//         yield put({ type: PAY_STAFF_DEBT_FALSE, error })
//     }
// }
// export function* TransferToBccsSagas() {
//     yield takeLatest(PAY_STAFF_DEBT, callTransferToBccs)
// }

