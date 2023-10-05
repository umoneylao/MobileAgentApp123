import { put, takeLatest, call } from 'redux-saga/effects'
import {

    GET_PROMOTION, GET_PROMOTION_SUCCESS, GET_PROMOTION_FAILED,
    GET_PROMOTION_DETAIL, GET_PROMOTION_DETAIL_FAILED, GET_PROMOTION_DETAIL_SUCCESS,
    GET_MEDIA_POPUP_HOME, GET_MEDIA_POPUP_HOME_SUCCESS, GET_MEDIA_POPUP_HOME_FAILED,
    GET_MENU_HOME, GET_MENU_HOME_SUCCESS,GET_MENU_HOME_FAILED,
    CALL_LINK_WEBVIEW,CALL_LINK_WEBVIEW_FAILED,CALL_LINK_WEBVIEW_SUCCESS,
    CALL_GET_MENU_LEVEL_2,CALL_GET_MENU_LEVEL_2_FAILED,CALL_GET_MENU_LEVEL_2_SUCCESS

} from '../actions/types'
import { getPromotion, getPromotionDetail, getPopupHomePag, getMenuHome, getLinkWeb,getMenuLevel2 } from '../utils/Api'

function* callPromotion(action) {
    try {
        const response = yield getPromotion(action.getLang);
        if (response.ok && response.status == 200) {
            if (response.data.data_media) {
                yield put({ type: GET_PROMOTION_SUCCESS, data: response.data.data_media })
            } else {
                yield put({ type: GET_PROMOTION_FAILED })
            }
        } else {
            yield put({ type: GET_PROMOTION_FAILED })
        }
    } catch (error) {
        yield put({ type: GET_PROMOTION_FAILED, data: { error: error } })
    }
}
export function* watcGetPromotion() {
    yield takeLatest(GET_PROMOTION, callPromotion)
}



function* callPromotionDetail(action) {
    try {
        const response = yield getPromotionDetail(action.id, action.getLang);
        if (response.ok && response.status == 200) {
            if (response.data.result) {
                yield put({ type: GET_PROMOTION_DETAIL_SUCCESS, data: response.data.result })
            } else {
                yield put({ type: GET_PROMOTION_DETAIL_FAILED })
            }
        } else {
            yield put({ type: GET_PROMOTION_DETAIL_FAILED })
        }
    } catch (error) {
        yield put({ type: GET_PROMOTION_DETAIL_FAILED, data: { error: error } })
    }
}
export function* watcGetPromotionDetail() {
    yield takeLatest(GET_PROMOTION_DETAIL, callPromotionDetail)
}


function* callGetPopupHome(action) {
    try {
        const response = yield getPopupHomePag(action.lang, action.tyle);
        if (response.ok && response.status == 200) {
            // console.log('response:', response.data)
            if (response.data.data_media) {
                yield put({ type: GET_MEDIA_POPUP_HOME_SUCCESS, data: response.data.data_media })
            } else {
                yield put({ type: GET_MEDIA_POPUP_HOME_FAILED })
            }
        } else {
            yield put({ type: GET_MEDIA_POPUP_HOME_FAILED })
        }
    } catch (error) {
        yield put({ type: GET_MEDIA_POPUP_HOME_FAILED, data: { error: error } })
    }
}
export function* watcGetPopupHome() {
    yield takeLatest(GET_MEDIA_POPUP_HOME, callGetPopupHome)
}


function* callGetManuHome(action) {
    try {
        const response = yield getMenuHome(action.lang, action.tyle);
        if (response.ok && response.status == 200) {
            // console.log('response:', response.data)
            if (response.data.data_media) {
                yield put({ type: GET_MENU_HOME_SUCCESS, data: response.data.data_media })
            } else {
                yield put({ type: GET_MENU_HOME_FAILED })
            }
        } else {
            yield put({ type: GET_MENU_HOME_FAILED })
        }
    } catch (error) {
        yield put({ type: GET_MENU_HOME_FAILED, data: { error: error } })
    }
}
export function* watcGetMenuHome() {
    yield takeLatest(GET_MENU_HOME, callGetManuHome)
}


function* callGetLinkWeb(action) {
    try {
        const response = yield getLinkWeb(action.lang, action.tyle);
        if (response.ok && response.status == 200) {
            // console.log('response:', response.data)
            if (response.data.data_media) {
                yield put({ type: CALL_LINK_WEBVIEW_SUCCESS, data: response.data.data_media })
            } else {
                yield put({ type: CALL_LINK_WEBVIEW_FAILED })
            }
        } else {
            yield put({ type: CALL_LINK_WEBVIEW_FAILED })
        }
    } catch (error) {
        yield put({ type: CALL_LINK_WEBVIEW_FAILED, data: { error: error } })
    }
}
export function* watcGetLinkWeb() {
    yield takeLatest(CALL_LINK_WEBVIEW, callGetLinkWeb)
}


function* callGetMenuLevel2(action) {
    try {
        const response = yield getMenuLevel2(action.lang, action.tyle);
        if (response.ok && response.status == 200) {
            if (response.data.data_media) {
                console.log('response.data.data_media:', response.data.data_media)
                yield put({ type: CALL_GET_MENU_LEVEL_2_SUCCESS, data: response.data.data_media })
            } else {
                yield put({ type: CALL_GET_MENU_LEVEL_2_FAILED })
            }
        } else {
            yield put({ type: CALL_GET_MENU_LEVEL_2_FAILED })
        }
    } catch (error) {
        yield put({ type: CALL_GET_MENU_LEVEL_2_FAILED, data: { error: error } })
    }
}
export function* watcGetMenuLevel2() {
    yield takeLatest(CALL_GET_MENU_LEVEL_2, callGetMenuLevel2)
}



