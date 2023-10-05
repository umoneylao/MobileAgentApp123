import {
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FALSE,
    UPLOAD_IMAGE_REQUEST,
    GET_PAYMENT_INFO_SOKXAY,
    GET_PAYMENT_INFO_SUCCESS_SOKXAY,
    GET_PAYMENT_INFO_FAILED_SOKXAY,
    SEARCH_UPLOAD_IMAGE,
    SEARCH_UPLOAD_IMAGE_SUCCESS,
    SEARCH_UPLOAD_IMAGE_FALSE,
    STORE_IMAGE,
    STORE_IMAGE_SUCCESS,
    STORE_IMAGE_FALSE
} from '../actions/types'
import _ from 'lodash'
import * as FIELD from '../utils/CoreFieldMap'
import * as RequestField from '../utils/RequestField'

const initialState = {
    accInfoData: null,
    actionType: null,
    isSuccess: false,
    errorMessage: '',
    uploadInfo: null,
    paymentData: null,
    dataUpload: null,
    storeData: null
}
export default (state = initialState, action) => {
    switch (action.type) {

        case UPLOAD_IMAGE_REQUEST:
            return { ...state, accInfoData: action.data, actionType: UPLOAD_IMAGE_REQUEST }

        case UPLOAD_IMAGE:
            return { ...state, isSuccess: false, actionType: UPLOAD_IMAGE }

        case UPLOAD_IMAGE_SUCCESS:
           
            return { ...state, uploadInfo: action.data, isSuccess: true, actionType: UPLOAD_IMAGE_SUCCESS }

        case UPLOAD_IMAGE_FALSE:
            return { ...state, uploadInfo: null, isSuccess: false, errorMessage: action.error, actionType: UPLOAD_IMAGE_FALSE }

        case GET_PAYMENT_INFO_SOKXAY:
            return { ...state, actionType: GET_PAYMENT_INFO_SOKXAY }

        case GET_PAYMENT_INFO_SUCCESS_SOKXAY:
            return { ...state, paymentData: action.data, isSuccess: true, actionType: GET_PAYMENT_INFO_SUCCESS_SOKXAY }

        case GET_PAYMENT_INFO_FAILED_SOKXAY:
            return { ...state, paymentData: null, isSuccess: false, errorMessage: action.error, actionType: GET_PAYMENT_INFO_FAILED_SOKXAY }

        case SEARCH_UPLOAD_IMAGE:
            return { ...state, actionType: SEARCH_UPLOAD_IMAGE }

        case SEARCH_UPLOAD_IMAGE_SUCCESS:
            return { ...state, dataUpload: action.data, isSuccess: true, actionType: SEARCH_UPLOAD_IMAGE_SUCCESS }

        case SEARCH_UPLOAD_IMAGE_FALSE:
           
            return { ...state, dataUpload: null, isSuccess: false, errorMessage: action.error, actionType: SEARCH_UPLOAD_IMAGE_FALSE }

        case STORE_IMAGE:
            return { ...state, actionType: STORE_IMAGE }

        case STORE_IMAGE_SUCCESS:
           
            return { ...state, storeData: action.data, isSuccess: true, actionType: STORE_IMAGE_SUCCESS }

        case STORE_IMAGE_FALSE:
            return { ...state, storeData: null, isSuccess: false, errorMessage: action.error, actionType: STORE_IMAGE_FALSE }

        default:
            return state
    }
};
