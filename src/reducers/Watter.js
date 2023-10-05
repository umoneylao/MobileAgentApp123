import {
    CHECK_ACCUONT_WATTE, CHECK_ACCUONT_WATTE_SUCCESS, CHECK_ACCUONT_WATTE_FALSE,
    PAY_MENT_WATTER_NPP, PAY_MENT_WATTER_NPP_FAILED, PAY_MENT_WATTER_NPP_SUCCESS
} from '../actions/types'
const initialAuthState = {
    getAccountWatter: null,
    isFetching: false,
    error: null,
    isSuccess: false,
    actionType: null,
    getPaymentWatter: null
}
export default (state = initialAuthState, action) => {
    switch (action.type) {
        case CHECK_ACCUONT_WATTE:
            return { ...state, getAccountWatter: null, isFetching: true, actionType: CHECK_ACCUONT_WATTE }
        case CHECK_ACCUONT_WATTE_SUCCESS:
            return { ...state, isFetching: false, getAccountWatter: action.data, isSuccess: true, actionType: CHECK_ACCUONT_WATTE_SUCCESS }
        case CHECK_ACCUONT_WATTE_FALSE:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: CHECK_ACCUONT_WATTE_FALSE, getAccountWatter: null }

        case PAY_MENT_WATTER_NPP:
            return { ...state, getPaymentWatter: null, isFetching: true, actionType: PAY_MENT_WATTER_NPP }
        case PAY_MENT_WATTER_NPP_SUCCESS:
            return { ...state, isFetching: false, getPaymentWatter: action.data, isSuccess: true, actionType: PAY_MENT_WATTER_NPP_SUCCESS }
        case PAY_MENT_WATTER_NPP_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: PAY_MENT_WATTER_NPP_FAILED, getPaymentWatter: null }
        default:
            return state
    }
}
