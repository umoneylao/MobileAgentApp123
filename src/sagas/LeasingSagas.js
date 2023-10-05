import { put, takeLatest, call } from 'redux-saga/effects'
import {
    PAY_LEASING_AEON_FAILED, PAY_LEASING_AEON_SUCCESS, PAY_LEASING_AEON,
} from '../actions/types'
import { getPaymentAeon } from '../utils/Api'

export function* watcPaymentAeonSagas() { yield takeLatest(PAY_LEASING_AEON, callPaymentAeon); }
function* callPaymentAeon(action) {
    try {
        const item = yield getPaymentAeon(action.data);
        if (item.status === 200) {
            let response_code = item.data.responseCode;
            let response_description = item.data.responseDescription;
            if (response_code === '00000') {
                yield put({
                    type: PAY_LEASING_AEON_SUCCESS,
                    responseCode: response_code,
                    responseDescription: response_description,
                    data: item.data,

                });
            } else {
                yield put({
                    type: PAY_LEASING_AEON_FAILED,
                    responseCode: response_code,
                    responseDescription: response_description,
                    data: item.data
                });
            }
        }
        else {
            yield put({
                type: PAY_LEASING_AEON_FAILED,
                responseCode: item.data.responseCode,
                responseDescription: item.data.responseDescription,
                data: item.data
            });
        }
    } catch (error) {
        yield put({
            type: PAY_LEASING_AEON_FAILED,
            responseCode: "99999",
            responseDescription: 'PAY_LEASING_AEON_FAILED',
            data: null,
        });
    }
}

