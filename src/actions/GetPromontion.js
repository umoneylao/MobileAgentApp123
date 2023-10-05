import {
    GET_PROMOTION, GET_PROMOTION_DETAIL, GET_MEDIA_POPUP_HOME,GET_MENU_HOME,
    CALL_LINK_WEBVIEW, CALL_GET_MENU_LEVEL_2
} from './types'
export const getPromotion = (getLang) => {
    return {
        type: GET_PROMOTION,
        getLang
    }
}

export const getPromotionDetail = (id, getLang) => {
    return {
        type: GET_PROMOTION_DETAIL,
        id, getLang
    }
}

export const getMediaPopupHome = (lang, tyle) => {
    return {
        type: GET_MEDIA_POPUP_HOME,
        lang, tyle
    }
}
export const getManuHome = (lang, tyle) => {
    return {
        type: GET_MENU_HOME,
        lang, tyle
    }
}
export const callLinkWeb = (lang, tyle) => {
    return {
        type: CALL_LINK_WEBVIEW,
        lang, tyle
    }
}

export const callGetMenu2 = (lang, tyle) => {
    return {
        type: CALL_GET_MENU_LEVEL_2,
        lang, tyle
    }
}
