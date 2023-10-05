import { put, takeLatest, call } from 'redux-saga/effects'
import {

    GET_PROMOTION, GET_PROMOTION_SUCCESS, GET_PROMOTION_FAILED

} from '../actions/types'
import { getPromotion } from '../utils/Api'

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






