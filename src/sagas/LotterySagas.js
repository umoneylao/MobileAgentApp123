import { put, takeLatest, call } from 'redux-saga/effects'
import {
    BUY_LOTTERY, BUY_LOTTERY_SUCCESS, BUY_LOTTERY_FALSE,
    SALE_LOTTERY, SALE_LOTTERY_SUCCESS, SALE_LOTTERY_FALSE,
    HISTORY_LOTTERY, HISTORY_LOTTERY_SUCCESS, HISTORY_LOTTERY_FALSE,
    LUCKY_LOTTERY,
    LUCKY_LOTTERY_SUCCESS,
    LUCKY_LOTTERY_FALSE, CHECK_BARCODE, CHECK_BARCODE_SUCCESS, CHECK_BARCODE_FALSE,
    CHECK_HISTORY_LOTTERY, CHECK_HISTORY_LOTTERY_SUCCESS, CHECK_HISTORY_LOTTERY_FAILED,
    SEACRC_HISTORY_LOTTERY_TRANFER, SEACRC_HISTORY_LOTTERY_TRANFER_SUCCESS, SEACRC_HISTORY_LOTTERY_TRANFER_FAILED,
    GET_NUMBER_WIN_FAILED, GET_NUMBER_WIN_SUCCESS, GET_NUMBER_WIN,
    BUY_LOTTERY_NCC, BUY_LOTTERY_NCC_SUCCESS, BUY_LOTTERY_NCC_FAILED,
    DRAW_HISTORY_SUCCESS, DRAW_HISTORY_FAILED, DRAW_HISTORY,
    DRAW_HISTORY_SUCCESS340, DRAW_HISTORY_FAILED340, DRAW_HISTORY340,
    CALL_WEBVIEW_BADU, CALL_WEBVIEW_BADU_SUCCESS, CALL_WEBVIEW_BADU_FAILED,
    CALL_WEBVIEW_MY_UNITEL,CALL_WEBVIEW_MY_UNITEL_SUCCESS,CALL_WEBVIEW_MY_UNITEL_FAILED,
    CALL_WEBVIEW_BADU_TOKEN,CALL_WEBVIEW_BADU_TOKEN_SUCCESS,CALL_WEBVIEW_BADU_TOKEN_FAILED

} from '../actions/types'
import {
    getBuyLottery, getSaleLottery, getHistory, getLucky, getCheckBarcode,
    getHistoryLottery, getHistoryLotteryTranfer, getNumberWin, getBuyLotteryNCC, getDrawHistoryNCC,
    getDrawHistoryNCC340, getWebviewBadu, getWebviewMyUnitel, getTokenBadu
} from '../utils/Api'
import { handleResponseCode } from '../utils/ErrorManager'

function* callBuyLottery(action) {
    try {
        const dataReturn = yield getBuyLottery(action.data)
        yield put({ type: BUY_LOTTERY_SUCCESS, data: dataReturn })
    } catch (error) {
        yield put({ type: BUY_LOTTERY_FALSE, error })
    }
}
export function* buyLotterySagas() {
    yield takeLatest(BUY_LOTTERY, callBuyLottery)
}


function* callSaleLottery(action) {
    try {
        const dataReturn = yield getSaleLottery(action.data)
        yield put({ type: SALE_LOTTERY_SUCCESS, data: dataReturn })
    } catch (error) {
        yield put({ type: SALE_LOTTERY_FALSE, error })
    }
}

export function* SaleLotterySagas() {
    yield takeLatest(SALE_LOTTERY, callSaleLottery)
}
function* callHistory(action) {
    try {
        const dataReturn = yield getHistory(action.data)
        if (dataReturn.data) {
            if (dataReturn.data.error === '00000' && dataReturn.data.responseCode === '10576') {
                handleResponseCode(dataReturn.data.responseCode)
            } else {
                yield put({ type: HISTORY_LOTTERY_SUCCESS, data: dataReturn })
            }
        }

    } catch (error) {
        yield put({ type: HISTORY_LOTTERY_FALSE, error })
    }
}

export function* HisLotterySagas() {
    yield takeLatest(HISTORY_LOTTERY, callHistory)
}


function* callLucky(action) {
    try {
        const dataReturn = yield getLucky(action.data)
        yield put({ type: LUCKY_LOTTERY_SUCCESS, data: dataReturn })
    } catch (error) {
        yield put({ type: LUCKY_LOTTERY_FALSE, error })
    }
}

export function* LuckyLotterySagas() {
    yield takeLatest(LUCKY_LOTTERY, callLucky)
}


function* callCheckBarcode(action) {
    try {
        const dataReturn = yield getCheckBarcode(action.data)
        yield put({ type: CHECK_BARCODE_SUCCESS, data: dataReturn })
    } catch (error) {
        yield put({ type: CHECK_BARCODE_FALSE, error })
    }
}
export function* CheckBarcodeSagas() {
    yield takeLatest(CHECK_BARCODE, callCheckBarcode)
}

function* callHistoryLottery(action) {
    try {
        const response = yield getHistoryLottery(action.accountPhone, action.processCode);
        if (response.ok && response.status == 200) {
            if (response.data.historyCollections.histories.length >= 1) {
                yield put({ type: CHECK_HISTORY_LOTTERY_SUCCESS, data: response.data })
            } else {
                yield put({ type: CHECK_HISTORY_LOTTERY_FAILED })
            }
        } else {
            yield put({ type: CHECK_HISTORY_LOTTERY_FAILED })
        }
    } catch (error) {
        yield put({ type: CHECK_HISTORY_LOTTERY_FAILED, data: { error: error } })
    }
}
export function* watchHistoryLottery() {
    yield takeLatest(CHECK_HISTORY_LOTTERY, callHistoryLottery)
}

// value1, value2
function* callHistoryLotteryTranfer(action) {
    try {
        const response = yield getHistoryLotteryTranfer(action.accountPhone, action.value1, action.value2);
        if (response.ok && response.status == 200) {
            if (response.data.historyCollections.histories.length >= 1) {
                yield put({ type: SEACRC_HISTORY_LOTTERY_TRANFER_SUCCESS, data: response.data })
            } else {
                yield put({ type: SEACRC_HISTORY_LOTTERY_TRANFER_FAILED })
            }
        } else {
            yield put({ type: SEACRC_HISTORY_LOTTERY_TRANFER_FAILED })
        }
    } catch (error) {
        yield put({ type: SEACRC_HISTORY_LOTTERY_TRANFER_FAILED, data: { error: error } })
    }
}
export function* watchHistoryLotteryTranfer() {
    yield takeLatest(SEACRC_HISTORY_LOTTERY_TRANFER, callHistoryLotteryTranfer)
}

function* callgetNumberWin() {
    try {
        const response = yield getNumberWin();
        if (response.ok && response.status == 200) {
            if (response.data.historyCollections.histories.length >= 1) {
                yield put({ type: GET_NUMBER_WIN_SUCCESS, data: response.data })
            } else {
                yield put({ type: GET_NUMBER_WIN_FAILED })
            }
        } else {
            yield put({ type: GET_NUMBER_WIN_FAILED })
        }
    } catch (error) {
        yield put({ type: GET_NUMBER_WIN_FAILED, data: { error: error } })
    }
}
export function* watchNumberWin() {
    yield takeLatest(GET_NUMBER_WIN, callgetNumberWin)
}


function* callBuyLotteryNCC(action) {
    try {
        const dataReturn = yield getBuyLotteryNCC(action.data)
        // console.log('buyLotteryNCCSagas:', dataReturn.data)
        yield put({ type: BUY_LOTTERY_NCC_SUCCESS, data: dataReturn })
    } catch (error) {
        yield put({ type: BUY_LOTTERY_NCC_FAILED, error })
    }
}
export function* buyLotteryNCCSagas() {
    yield takeLatest(BUY_LOTTERY_NCC, callBuyLotteryNCC)
}



function* callsearchHistoryNCC(action) {
    try {
        const response = yield getDrawHistoryNCC(action.value);
        if (response.ok && response.status == 200) {
            if (response.data.drawHistoryCollection.drawHistoryList.length >= 1) {
                yield put({ type: DRAW_HISTORY_SUCCESS, payload: response.data })
            } else {
                yield put({ type: DRAW_HISTORY_FAILED })
            }
        } else {
            yield put({ type: DRAW_HISTORY_FAILED })
        }
    } catch (error) {
        yield put({ type: DRAW_HISTORY_FAILED, payload: { error: error } })
    }
}
export function* watchSecrchHistoryNCC() {
    yield takeLatest(DRAW_HISTORY, callsearchHistoryNCC)
}



function* callsearchHistoryNCC340(action) {
    try {
        const response = yield getDrawHistoryNCC340(action.valueAnimal);
        if (response.ok && response.status == 200) {
            if (response.data.drawHistoryCollection.drawHistoryList.length >= 1) {
                yield put({ type: DRAW_HISTORY_SUCCESS340, payload: response.data })
            } else {
                yield put({ type: DRAW_HISTORY_FAILED340 })
            }
        } else {
            yield put({ type: DRAW_HISTORY_FAILED340 })
        }
    } catch (error) {
        yield put({ type: DRAW_HISTORY_FAILED340, payload: { error: error } })
    }
}
export function* watchSecrchHistoryNCC340() {
    yield takeLatest(DRAW_HISTORY340, callsearchHistoryNCC340)
}


function* CallWebviewBadu(action) {
    try {
        const response = yield getWebviewBadu(action.data, action.token, action.openLinkWeb);
        // console.log('response----000--------------11111111: ', response.data)
        if (response.ok && response.status == 201) {
            // console.log('webview-----------00: ', response.data)
            if (response.data.data) {
                // console.log('--01')
                yield put({ type: CALL_WEBVIEW_BADU_SUCCESS, data: response.data })
            } else {
                // console.log('loi webview')
                yield put({ type: CALL_WEBVIEW_BADU_FAILED, data: response.data })
            }
        } else {
            yield put({ type: CALL_WEBVIEW_BADU_FAILED })
        }
    } catch (error) {
        yield put({ type: CALL_WEBVIEW_BADU_FAILED, data: { error: error } })
    }
}
export function* watchWebviewBadu() {
    yield takeLatest(CALL_WEBVIEW_BADU, CallWebviewBadu)
}


function* CallWebviewMyUnitel(action) {
    try {
        const response = yield getWebviewMyUnitel(action.data);
        if (response.ok && response.status == 200) {
            // console.log('webview------11: ', response.data)
            yield put({ type: CALL_WEBVIEW_MY_UNITEL_SUCCESS, data: response.data })
        } else {
            yield put({ type: CALL_WEBVIEW_MY_UNITEL_FAILED })
        }
    } catch (error) {
        yield put({ type: CALL_WEBVIEW_MY_UNITEL_FAILED, data: { error: error } })
    }
}
export function* watchWebviewMyUnitel() {
    yield takeLatest(CALL_WEBVIEW_MY_UNITEL, CallWebviewMyUnitel)
}


// function* CallWebviewMyUnitel(action) {
//     try {
//         const dataReturn = yield getWebviewMyUnitel(action.data)
//         console.log('CALL_WEBVIEW_MY_UNITEL_SUCCESS:', dataReturn.data)
//         yield put({ type: CALL_WEBVIEW_MY_UNITEL_SUCCESS, data: dataReturn })
//     } catch (error) {
//         yield put({ type: CALL_WEBVIEW_MY_UNITEL_FAILED, error })
//     }
// }
// export function* watchWebviewMyUnitel() {
//     yield takeLatest(CALL_WEBVIEW_MY_UNITEL, CallWebviewMyUnitel)
// }


function* CallWebviewBaduGetToken(action) {
    try {
        const response = yield getTokenBadu(action.data);
        if (response.ok && response.status == 200) {
            // console.log('Badu token------11: ', response.data)
            yield put({ type: CALL_WEBVIEW_BADU_TOKEN_SUCCESS, data: response.data })
        } else {
            yield put({ type: CALL_WEBVIEW_BADU_TOKEN_FAILED })
        }
    } catch (error) {
        yield put({ type: CALL_WEBVIEW_BADU_TOKEN_FAILED, data: { error: error } })
    }
}
export function* watchWebviewBaduGetToken() {
    yield takeLatest(CALL_WEBVIEW_BADU_TOKEN, CallWebviewBaduGetToken)
}

