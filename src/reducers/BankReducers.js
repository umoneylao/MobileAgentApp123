import {
    CHECK_ACCUONT_BANK, CHECK_ACCUONT_BANK_SUCCESS, CHECK_ACCUONT_BANK_FALSE,
    CHECK_FEE_BANK, CHECK_FEE_BANK_SUCCESS, CHECK_FEE_BANK_FALSE,
    GET_OTP_BANK, GET_OTP_BANK_SUCCESS, GET_OTP_BANK_FAILED,
    TRANSFER_EWALLET_TO_BANK, TRANSFER_EWALLET_TO_BANK_SUCCESS, TRANSFER_EWALLET_TO_BANK_FAILED,
    // PAY_STAFF_DEBT, PAY_STAFF_DEBT_FALSE, PAY_STAFF_DEBT_SUCCESS

} from '../actions/types'
const initialAuthState = {
    checkAccuontBank: null,
    isFetching: false,
    error: null,
    isSuccess: false,
    actionType: null,
    getFeeAccuont: null,
    getOTPBank: null,
    TransferToBank: null,
    // transferbccs: null
}
export default (state = initialAuthState, action) => {
    switch (action.type) {
        case CHECK_ACCUONT_BANK:
            return { ...state, checkAccuontBank: null, isFetching: true, actionType: CHECK_ACCUONT_BANK }
        case CHECK_ACCUONT_BANK_SUCCESS:
            return { ...state, isFetching: false, checkAccuontBank: action.data, isSuccess: true, actionType: CHECK_ACCUONT_BANK_SUCCESS }
        case CHECK_ACCUONT_BANK_FALSE:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: CHECK_ACCUONT_BANK_FALSE }

        case CHECK_FEE_BANK:
            return { ...state, getFeeAccuont: null, isFetching: true, actionType: CHECK_FEE_BANK }
        case CHECK_FEE_BANK_SUCCESS:
            return { ...state, isFetching: false, getFeeAccuont: action.data, isSuccess: true, actionType: CHECK_FEE_BANK_SUCCESS }
        case CHECK_FEE_BANK_FALSE:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: CHECK_FEE_BANK_FALSE }

        case GET_OTP_BANK:
            return { ...state, getOTPBank: null, isFetching: true, actionType: CHECK_FEE_BANK }
        case GET_OTP_BANK_SUCCESS:
            return { ...state, isFetching: false, getOTPBank: action.data, isSuccess: true, actionType: GET_OTP_BANK_SUCCESS }
        case GET_OTP_BANK_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: GET_OTP_BANK_FAILED }


        case TRANSFER_EWALLET_TO_BANK:
            return { ...state, TransferToBank: null, isFetching: true, actionType: TRANSFER_EWALLET_TO_BANK }
        case TRANSFER_EWALLET_TO_BANK_SUCCESS:
            return { ...state, isFetching: false, TransferToBank: action.data, isSuccess: true, actionType: TRANSFER_EWALLET_TO_BANK_SUCCESS }
        case TRANSFER_EWALLET_TO_BANK_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: TRANSFER_EWALLET_TO_BANK_FAILED }

        // case PAY_STAFF_DEBT:
        //     return { ...state, transferbccs: null, isLoading: true, actionType: PAY_STAFF_DEBT }
        // case PAY_STAFF_DEBT_SUCCESS:
        //     return { ...state, isLoading: false, transferbccs: action.data, isSuccess: true, actionType: PAY_STAFF_DEBT_SUCCESS }
        // case PAY_STAFF_DEBT_FALSE:
        //     return { ...state, isLoading: false, error: action.error, isSuccess: false, actionType: PAY_STAFF_DEBT_FALSE }


        default:
            return state
    }
}
