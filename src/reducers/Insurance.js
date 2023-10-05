import {
    GET_PACKAGE_APA, GET_PACKAGE_APA_SUCCESS, GET_PACKAGE_APA_FAILED,
    GET_PACKAGE_OPTION_APA, GET_PACKAGE_OPTION_APA_FAILED, GET_PACKAGE_OPTION_APA_SUCCESS,
    PAY_MENT_INSURANCE, PAY_MENT_INSURANCE_FAILED, PAY_MENT_INSURANCE_SUCCESS
} from '../actions/types'
const initialAuthState = {
    getDataPackage: null,
    isFetching: false,
    error: null,
    isSuccess: false,
    actionType: null,
    getDataPackageOption: null,
    dataPayMentInsurance: null
}
export default (state = initialAuthState, action) => {
    switch (action.type) {
        case GET_PACKAGE_APA:
            return { ...state, getDataPackage: null, isFetching: true, actionType: GET_PACKAGE_APA }
        case GET_PACKAGE_APA_SUCCESS:
            return { ...state, isFetching: false, getDataPackage: action.data, isSuccess: true, actionType: GET_PACKAGE_APA_SUCCESS }
        case GET_PACKAGE_APA_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: GET_PACKAGE_APA_FAILED, getDataPackage: null }


        case GET_PACKAGE_OPTION_APA:
            return { ...state, getDataPackageOption: null, isFetching: true, actionType: GET_PACKAGE_OPTION_APA }
        case GET_PACKAGE_OPTION_APA_SUCCESS:
            return { ...state, isFetching: false, getDataPackageOption: action.data, isSuccess: true, actionType: GET_PACKAGE_OPTION_APA_SUCCESS }
        case GET_PACKAGE_OPTION_APA_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: GET_PACKAGE_OPTION_APA_FAILED }

        case PAY_MENT_INSURANCE:
            return { ...state, dataPayMentInsurance: null, isFetching: true, actionType: PAY_MENT_INSURANCE }
        case PAY_MENT_INSURANCE_SUCCESS:
            return { ...state, isFetching: false, dataPayMentInsurance: action.data, isSuccess: true, actionType: PAY_MENT_INSURANCE_SUCCESS }
        case PAY_MENT_INSURANCE_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: PAY_MENT_INSURANCE_FAILED }

        default:
            return state
    }
}
