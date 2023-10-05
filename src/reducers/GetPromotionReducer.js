import {
    GET_PROMOTION, GET_PROMOTION_FAILED, GET_PROMOTION_SUCCESS,
    GET_PROMOTION_DETAIL, GET_PROMOTION_DETAIL_FAILED, GET_PROMOTION_DETAIL_SUCCESS,
    GET_MEDIA_POPUP_HOME, GET_MEDIA_POPUP_HOME_SUCCESS, GET_MEDIA_POPUP_HOME_FAILED,
    GET_MENU_HOME, GET_MENU_HOME_SUCCESS, GET_MENU_HOME_FAILED,
    CALL_LINK_WEBVIEW, CALL_LINK_WEBVIEW_SUCCESS, CALL_LINK_WEBVIEW_FAILED,
    CALL_GET_MENU_LEVEL_2,CALL_GET_MENU_LEVEL_2_SUCCESS,CALL_GET_MENU_LEVEL_2_FAILED
} from '../actions/types'
const initialAuthState = {
    requesPromotion: null,
    requesPromotionDetail: null,
    isFetching: false,
    error: null,
    isSuccess: false,
    actionType: null,
    dataPopup: null,
    dataManu: null,
    dataLinkWeb: null,
    dataMenu2: null
}
export default (state = initialAuthState, action) => {
    switch (action.type) {
        case GET_PROMOTION:
            return { ...state, requesPromotion: null, isFetching: true, actionType: GET_PROMOTION }
        case GET_PROMOTION_SUCCESS:
            return { ...state, isFetching: false, requesPromotion: action.data, isSuccess: true, actionType: GET_PROMOTION_SUCCESS }
        case GET_PROMOTION_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: GET_PROMOTION_FAILED, requesPromotion: null }


        case GET_PROMOTION_DETAIL:
            return { ...state, requesPromotionDetail: null, isFetching: true, actionType: GET_PROMOTION_DETAIL }
        case GET_PROMOTION_DETAIL_SUCCESS:
            return { ...state, isFetching: false, requesPromotionDetail: action.data, isSuccess: true, actionType: GET_PROMOTION_DETAIL_SUCCESS }
        case GET_PROMOTION_DETAIL_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: GET_PROMOTION_DETAIL_FAILED, requesPromotionDetail: null }

        case GET_MEDIA_POPUP_HOME:
            return { ...state, dataPopup: null, isFetching: true, actionType: GET_MEDIA_POPUP_HOME }
        case GET_MEDIA_POPUP_HOME_SUCCESS:
            return { ...state, isFetching: false, dataPopup: action.data, isSuccess: true, actionType: GET_MEDIA_POPUP_HOME_SUCCESS }
        case GET_MEDIA_POPUP_HOME_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: GET_MEDIA_POPUP_HOME_FAILED, dataPopup: null }

        case GET_MENU_HOME:
            return { ...state, dataManu: null, isFetching: true, actionType: GET_MENU_HOME }
        case GET_MENU_HOME_SUCCESS:
            return { ...state, isFetching: false, dataManu: action.data, isSuccess: true, actionType: GET_MENU_HOME_SUCCESS }
        case GET_MENU_HOME_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: GET_MENU_HOME_FAILED, dataManu: null }


        case CALL_LINK_WEBVIEW:
            return { ...state, dataLinkWeb: null, isFetching: true, actionType: CALL_LINK_WEBVIEW }
        case CALL_LINK_WEBVIEW_SUCCESS:
            return { ...state, isFetching: false, dataLinkWeb: action.data, isSuccess: true, actionType: CALL_LINK_WEBVIEW_SUCCESS }
        case CALL_LINK_WEBVIEW_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: CALL_LINK_WEBVIEW_FAILED, dataLinkWeb: null }

            case CALL_GET_MENU_LEVEL_2:
                return { ...state, dataMenu2: null, isFetching: true, actionType: CALL_GET_MENU_LEVEL_2 }
            case CALL_GET_MENU_LEVEL_2_SUCCESS:
                return { ...state, isFetching: false, dataMenu2: action.data, isSuccess: true, actionType: CALL_GET_MENU_LEVEL_2_SUCCESS }
            case CALL_GET_MENU_LEVEL_2_FAILED:
                return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: CALL_GET_MENU_LEVEL_2_FAILED, dataMenu2: null }
    

        default:
            return state
    }
}
