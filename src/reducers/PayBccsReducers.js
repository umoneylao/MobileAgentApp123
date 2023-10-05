import {
    PAY_STAFF_DEBT, PAY_STAFF_DEBT_FALSE, PAY_STAFF_DEBT_SUCCESS,
    CHECK_INFO_DISCOUNT, CHECK_INFO_DISCOUNT_SUCCESS, CHECK_INFO_DISCOUNT_FAILED
} from '../actions/types'
const initialAuthState = {
    isFetching: false,
    error: null,
    isSuccess: false,
    actionType: null,
    transferbccs: null,
    dataDiscount: null
}
export default (state = initialAuthState, action) => {
    switch (action.type) {
        case PAY_STAFF_DEBT:
            return { ...state, transferbccs: null, isLoading: true, actionType: PAY_STAFF_DEBT }
        case PAY_STAFF_DEBT_SUCCESS:
            return { ...state, isLoading: false, transferbccs: action.data, isSuccess: true, actionType: PAY_STAFF_DEBT_SUCCESS }
        case PAY_STAFF_DEBT_FALSE:
            return { ...state, isLoading: false, error: action.error, isSuccess: false, actionType: PAY_STAFF_DEBT_FALSE }
        case CHECK_INFO_DISCOUNT:
            return { ...state, dataDiscount: null, isLoading: true, actionType: CHECK_INFO_DISCOUNT }
        case CHECK_INFO_DISCOUNT_SUCCESS:
            return { ...state, isLoading: false, dataDiscount: action.data, isSuccess: true, actionType: CHECK_INFO_DISCOUNT_SUCCESS }
        case CHECK_INFO_DISCOUNT_FAILED:
            return { ...state, isLoading: false, error: action.error, isSuccess: false, actionType: CHECK_INFO_DISCOUNT_FAILED }

        default:
            return state
    }
}
