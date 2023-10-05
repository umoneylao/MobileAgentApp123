import { put, takeLatest, call } from 'redux-saga/effects'
import {
    APPROVAL_TRANSACTION, APPROVAL_TRANSACTION_SUCCESS, APPROVAL_TRANSACTION_FAILED,
    WORK_BANK_OFFLINE_SERVICE, WORK_BANK_OFFLINE_SERVICE_FAILED, WORK_BANK_OFFLINE_SERVICE_SUCCESS,
    GET_PROVINCE, GET_PROVINCE_FAILED, GET_PROVINCE_SUCCESS, GET_DISTRICT, GET_DISTRICT_SUCCESS, GET_DISTRICT_FAILED,
    GET_TOKEN_WORLD_BANK, GET_TOKEN_WORLD_BANK_SUCCESS, GET_TOKEN_WORLD_BANK_FAILED,
    UPLOAD_TO_SERVER, UPLOAD_TO_SERVER_FAILED, UPLOAD_TO_SERVER_SUCCESS
} from '../actions/types'
import { getApprovalTransaction, getlistCustomerWordBank, getProvince, getDistrict, getTokenWoldBank, uploadListCashOut } from '../utils/Api'
function* callApprovalTransaction(action) {
    try {
        const dataReturn = yield getApprovalTransaction(action.data)
        // console.log('dataReturn:', dataReturn)
        // console.log('data:', dataReturn.config.data)
        yield put({ type: APPROVAL_TRANSACTION_SUCCESS, data: dataReturn })
    } catch (error) {
        yield put({ type: APPROVAL_TRANSACTION_FAILED, error })
    }
}
export function* watcApprovalTransaction() {
    yield takeLatest(APPROVAL_TRANSACTION, callApprovalTransaction)
}


function* callGetlistCustomerWordBank(action) {
    try {
        const response = yield getlistCustomerWordBank(action.p_province, action.p_district);
        console.log('p_province.data:1', action.p_province)
        console.log('p_district.data:2', action.p_district)
        if (response.ok && response.status == 200) {
            if (response.data.data.item.length >= 1) {
               
                yield put({ type: WORK_BANK_OFFLINE_SERVICE_SUCCESS, payload: response.data.data })
            } else {
                yield put({ type: WORK_BANK_OFFLINE_SERVICE_FAILED })
            }
        } else {
            yield put({ type: WORK_BANK_OFFLINE_SERVICE_FAILED })
        }
    } catch (error) {
        yield put({ type: WORK_BANK_OFFLINE_SERVICE_FAILED, payload: { error: error } })
    }
}
export function* watcListCustomerWordBank() {
    yield takeLatest(WORK_BANK_OFFLINE_SERVICE, callGetlistCustomerWordBank)
}

function* callGetProvince() {
    try {
        const response = yield getProvince();
        if (response.ok && response.status == 200) {
            // console.log('response.data GET_PROVINCE_SUCCESS', JSON.stringify(response.data))
            //console.log(JSON.stringify(state));
            if (response.data.dataCollection.dataView.length >= 1) {
                yield put({ type: GET_PROVINCE_SUCCESS, payload: response.data.dataCollection })
            } else {
                yield put({ type: GET_PROVINCE_FAILED })
            }
        } else {
            yield put({ type: GET_PROVINCE_FAILED })
        }
    } catch (error) {
        yield put({ type: GET_PROVINCE_FAILED, payload: { error: error } })
    }
}
export function* watcProvince() {
    yield takeLatest(GET_PROVINCE, callGetProvince)
}


function* callGetDistrict(action) {
    try {
        const response = yield getDistrict(action.item);

        if (response.ok && response.status == 200) {
            // console.log('response.data GET_DISTRICT_SUCCESS', JSON.stringify(response.data))
            if (response.data.districtCollection.districtView.length >= 1) {
                yield put({ type: GET_DISTRICT_SUCCESS, payload: response.data.districtCollection })
            } else {
                yield put({ type: GET_DISTRICT_FAILED })
            }
        } else {
            yield put({ type: GET_DISTRICT_FAILED })
        }
    } catch (error) {
        yield put({ type: GET_DISTRICT_FAILED, payload: { error: error } })
    }
}
export function* watcDistrict() {
    yield takeLatest(GET_DISTRICT, callGetDistrict)
}

function* callGetTokenWorldBank(action) {
    try {
        const response = yield getTokenWoldBank(action.data);
        // console.log('------bbb----', response)
        if (response.ok && response.status === 200) {
            if (response.data) {
                yield put({ type: GET_TOKEN_WORLD_BANK_SUCCESS, data: response.data })
            } else {
                yield put({ type: GET_TOKEN_WORLD_BANK_FAILED })
            }
        } else {
            yield put({ type: GET_TOKEN_WORLD_BANK_FAILED })
        }
    } catch (error) {
        yield put({ type: GET_TOKEN_WORLD_BANK_FAILED, data: { error: error } })
    }
}
export function* watcGetToken() {
    yield takeLatest(GET_TOKEN_WORLD_BANK, callGetTokenWorldBank)
}

function* callUploadListCashOut(action) {
    try {
        const response = yield uploadListCashOut(action.data, action.access_token);
        console.log('------access_token----', response.data)
        console.log('------responseCode----', response.data.responseCode)
        if (response.data.responseCode === '00000') {
            yield put({ type: UPLOAD_TO_SERVER_SUCCESS, data: response.data })
        } else {
            yield put({ type: UPLOAD_TO_SERVER_FAILED })
        }
    } catch (error) {
        yield put({ type: UPLOAD_TO_SERVER_FAILED, data: { error: error } })
    }
}
export function* watcUploadListCashout() {
    yield takeLatest(UPLOAD_TO_SERVER, callUploadListCashOut)
}


