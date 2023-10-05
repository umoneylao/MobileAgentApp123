import {
    HIGH_SECURITY_OTP, HIGH_SECURITY_OTP_SUCCESS, HIGH_SECURITY_OTP_FAILED,
    CALL_CHECK_SWICH, CALL_CHECK_SWICH_SUCCESS, CALL_CHECK_SWICH_FAILED,
    CALL_CHECK_AMOUNT, CALL_CHECK_AMOUNT_SUCCESS, CALL_CHECK_AMOUNT_FAILED,
    GET_ALL_CONFIG_AMOUNT_SUCCESS, GET_ALL_CONFIG_AMOUNT, GET_ALL_CONFIG_AMOUNT_FAILED
} from '../actions/types'
import _ from 'lodash'

const initialAuthState = {
    actionType: null, //
    isLoading: false,//
    dataOnSecurity: null, //
    dataCheckSwich: null,
    dataCheckAmount: null,
    dataGetAllAmount: null

}

export default (state = initialAuthState, action) => {
    switch (action.type) {
        case HIGH_SECURITY_OTP:
            return { ...state, actionType: HIGH_SECURITY_OTP, isLoading: true, dataOnSecurity: null }
        case HIGH_SECURITY_OTP_SUCCESS:
            return { ...state, actionType: HIGH_SECURITY_OTP_SUCCESS, isLoading: false, dataOnSecurity: action.payload }
        case HIGH_SECURITY_OTP_FAILED:
            return { ...state, actionType: HIGH_SECURITY_OTP_FAILED, isLoading: false, dataOnSecurity: null }

        case CALL_CHECK_SWICH:
            return { ...state, actionType: CALL_CHECK_SWICH, isLoading: true, dataCheckSwich: null }
        case CALL_CHECK_SWICH_SUCCESS:
            return { ...state, actionType: CALL_CHECK_SWICH_SUCCESS, isLoading: false, dataCheckSwich: action.payload }
        case CALL_CHECK_SWICH_FAILED:
            return { ...state, actionType: CALL_CHECK_SWICH_FAILED, isLoading: false, dataCheckSwich: null }

        case CALL_CHECK_AMOUNT:
            return { ...state, actionType: CALL_CHECK_AMOUNT, isLoading: true, dataCheckAmount: null }
        case CALL_CHECK_AMOUNT_SUCCESS:
            return { ...state, actionType: CALL_CHECK_AMOUNT_SUCCESS, isLoading: false, dataCheckAmount: action.payload }
        case CALL_CHECK_AMOUNT_FAILED:
            return { ...state, actionType: CALL_CHECK_AMOUNT_FAILED, isLoading: false, dataCheckAmount: null }

        case GET_ALL_CONFIG_AMOUNT:
            return { ...state, actionType: GET_ALL_CONFIG_AMOUNT, isLoading: true, dataGetAllAmount: null }
        case GET_ALL_CONFIG_AMOUNT_SUCCESS:
            return { ...state, actionType: GET_ALL_CONFIG_AMOUNT_SUCCESS, isLoading: false, dataGetAllAmount: action.payload }
        case GET_ALL_CONFIG_AMOUNT_FAILED:
            return { ...state, actionType: GET_ALL_CONFIG_AMOUNT_FAILED, isLoading: false, dataGetAllAmount: null }

        default:
            return state
    }
}
