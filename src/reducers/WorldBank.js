import {
    APPROVAL_TRANSACTION, APPROVAL_TRANSACTION_SUCCESS, APPROVAL_TRANSACTION_FAILED,
    WORK_BANK_OFFLINE_SERVICE, WORK_BANK_OFFLINE_SERVICE_FAILED, WORK_BANK_OFFLINE_SERVICE_SUCCESS,
    GET_PROVINCE, GET_PROVINCE_FAILED, GET_PROVINCE_SUCCESS, GET_DISTRICT, GET_DISTRICT_SUCCESS, GET_DISTRICT_FAILED,
    GET_TOKEN_WORLD_BANK, GET_TOKEN_WORLD_BANK_SUCCESS, GET_TOKEN_WORLD_BANK_FAILED,
    UPLOAD_TO_SERVER, UPLOAD_TO_SERVER_FAILED, UPLOAD_TO_SERVER_SUCCESS
} from '../actions/types'
const initialAuthState = {
    getDataApproval: null,
    isFetching: false,
    error: null,
    isSuccess: false,
    actionType: null,
    dataListCustomerWorldBank: null,
    dataProvince: null,
    dataDistrict: null,
    dataTokenWorldBank: null,
    dataUpload: null
}
export default (state = initialAuthState, action) => {
    switch (action.type) {
        case APPROVAL_TRANSACTION:
            return { ...state, getDataApproval: null, isFetching: true, actionType: APPROVAL_TRANSACTION }
        case APPROVAL_TRANSACTION_SUCCESS:
            return { ...state, isFetching: false, getDataApproval: action.data, isSuccess: true, actionType: APPROVAL_TRANSACTION_SUCCESS }
        case APPROVAL_TRANSACTION_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: APPROVAL_TRANSACTION_FAILED, getDataApproval: null }

        case WORK_BANK_OFFLINE_SERVICE:
            return { ...state, dataListCustomerWorldBank: null, isFetching: true, actionType: WORK_BANK_OFFLINE_SERVICE }
        case WORK_BANK_OFFLINE_SERVICE_SUCCESS:
            return { ...state, isFetching: false, dataListCustomerWorldBank: action.payload, isSuccess: true, actionType: WORK_BANK_OFFLINE_SERVICE_SUCCESS }
        case WORK_BANK_OFFLINE_SERVICE_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: WORK_BANK_OFFLINE_SERVICE_FAILED, dataListCustomerWorldBank: null }

        case GET_PROVINCE:
            return { ...state, dataProvince: null, isFetching: true, actionType: GET_PROVINCE }
        case GET_PROVINCE_SUCCESS:
            return { ...state, isFetching: false, dataProvince: action.payload, isSuccess: true, actionType: GET_PROVINCE_SUCCESS }
        case GET_PROVINCE_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: GET_PROVINCE_FAILED, dataProvince: null }
        case GET_DISTRICT:
            return { ...state, dataDistrict: null, isFetching: true, actionType: GET_DISTRICT }
        case GET_DISTRICT_SUCCESS:
            return { ...state, isFetching: false, dataDistrict: action.payload, isSuccess: true, actionType: GET_DISTRICT_SUCCESS }
        case GET_DISTRICT_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: GET_DISTRICT_FAILED, dataDistrict: null }

        case GET_TOKEN_WORLD_BANK:
            return { ...state, dataTokenWorldBank: null, isFetching: true, actionType: GET_TOKEN_WORLD_BANK }
        case GET_TOKEN_WORLD_BANK_SUCCESS:
            return { ...state, isFetching: false, dataTokenWorldBank: action.data, isSuccess: true, actionType: GET_TOKEN_WORLD_BANK_SUCCESS }
        case GET_TOKEN_WORLD_BANK_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: GET_TOKEN_WORLD_BANK_FAILED, dataTokenWorldBank: null }


        case UPLOAD_TO_SERVER:
            return { ...state, dataUpload: null, isFetching: true, actionType: UPLOAD_TO_SERVER }
        case UPLOAD_TO_SERVER_SUCCESS:
            return { ...state, isFetching: false, dataUpload: action.data, isSuccess: true, actionType: UPLOAD_TO_SERVER_SUCCESS }
        case UPLOAD_TO_SERVER_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: UPLOAD_TO_SERVER_FAILED, dataUpload: null }


        default:
            return state
    }
}
