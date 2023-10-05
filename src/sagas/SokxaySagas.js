import { put, takeLatest, call } from 'redux-saga/effects'
import { UPLOAD_IMAGE, 
    UPLOAD_IMAGE_SUCCESS, 
    UPLOAD_IMAGE_FALSE , 
    GET_PAYMENT_INFO_SOKXAY,
    GET_PAYMENT_INFO_SUCCESS_SOKXAY ,
    GET_PAYMENT_INFO_FAILED_SOKXAY,
    SEARCH_UPLOAD_IMAGE, 
    SEARCH_UPLOAD_IMAGE_SUCCESS, 
    SEARCH_UPLOAD_IMAGE_FALSE,
    STORE_IMAGE,
    STORE_IMAGE_SUCCESS,
    STORE_IMAGE_FALSE
} 
from '../actions/types'
import { uploadDataImage, login, getPaymentSokxay, getDataUpload, storeToServer } from '../utils/Api'

function* callUpload(action) {
    try {
        const dataReturn = yield uploadDataImage(action.payload)
        yield put({ type: UPLOAD_IMAGE_SUCCESS, data: dataReturn })
    } catch (error) {
        yield put({ type: UPLOAD_IMAGE_FALSE, error })
    }
}

export function* watchUpload() {
    yield takeLatest(UPLOAD_IMAGE, callUpload)
}

function* callGetPayment(action){
    try{
        const dataReturn = yield getPaymentSokxay(action.data)
        yield put({type: GET_PAYMENT_INFO_SUCCESS_SOKXAY, data: dataReturn.data})
    }catch(error){
        yield put({type: GET_PAYMENT_INFO_FAILED_SOKXAY, error})
    }
}

export function* watchGetPayment() {
    yield takeLatest(GET_PAYMENT_INFO_SOKXAY, callGetPayment)
}

function* callGetDataUpload(action){
    try{
        const dataReturn = yield getDataUpload(action.data)
        yield put({type: SEARCH_UPLOAD_IMAGE_SUCCESS, data: dataReturn.data})
    }catch(error){
        yield put({type: SEARCH_UPLOAD_IMAGE_FALSE, error})
    }
}

export function* watchGetDataUpload() {
    yield takeLatest(SEARCH_UPLOAD_IMAGE, callGetDataUpload)
}

function* callGetStore(action){
    try{
        const dataReturn = yield storeToServer(action.payload)
        yield put({type: STORE_IMAGE_SUCCESS, data: dataReturn.data})
    }catch(error){
        yield put({type: STORE_IMAGE_FALSE, error})
    }
}

export function* watchStore() {
    yield takeLatest(STORE_IMAGE, callGetStore)
}
