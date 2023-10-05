import {
    GET_PROMOTION, GET_PROMOTION_FAILED, GET_PROMOTION_SUCCESS
} from '../actions/types'
const initialAuthState = {
    requesPromotion: null,
    isFetching: false,
    error: null,
    isSuccess: false,
    actionType: null,

}
export default (state = initialAuthState, action) => {
    switch (action.type) {
        case GET_PROMOTION:
            return { ...state, requesPromotion: null, isFetching: true, actionType: GET_PROMOTION }
        case GET_PROMOTION_SUCCESS:
            return { ...state, isFetching: false, requesPromotion: action.data, isSuccess: true, actionType: GET_PROMOTION_SUCCESS }
        case GET_PROMOTION_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: GET_PROMOTION_FAILED, requesPromotion: null }



        default:
            return state
    }
}
