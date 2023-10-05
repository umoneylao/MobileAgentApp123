import {
    PAY_LEASING_AEON, PAY_LEASING_AEON_FAILED, PAY_LEASING_AEON_SUCCESS,
} from '../actions/types'
const initialAuthState = {
    requestPayLeasingAeon: null,
    isFetching: false,
    error: null,
    isSuccess: false,
    actionType: null,
}
export default (state = initialAuthState, action) => {
    switch (action.type) {
        case PAY_LEASING_AEON:
            return {
                ...state,
                requestPayLeasingAeon: null,
                isFetching: true,
                actionType: PAY_LEASING_AEON,
            };
        case PAY_LEASING_AEON_SUCCESS:
            return {
                ...state,
                isFetching: false,
                requestPayLeasingAeon: action.data,
                isSuccess: true,
                isLoggedIn: true,
                actionType: PAY_LEASING_AEON_SUCCESS,
                responseCode: action.responseCode,
                responseDescription: action.responseDescription,
            };
        case PAY_LEASING_AEON_FAILED:
            return {
                ...state,
                isFetching: false,
                error: action.error,
                isSuccess: false,
                actionType: PAY_LEASING_AEON_FAILED,
                requestPayLeasingAeon: null,
                responseCode: action.responseCode,
                responseDescription: action.responseDescription,
            };
        default:
            return state
    }
}
