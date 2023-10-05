import {
    BUY_LOTTERY, BUY_LOTTERY_SUCCESS, BUY_LOTTERY_FALSE,
    SALE_LOTTERY, SALE_LOTTERY_SUCCESS, SALE_LOTTERY_FALSE,
    HISTORY_LOTTERY, HISTORY_LOTTERY_SUCCESS, HISTORY_LOTTERY_FALSE, LUCKY_LOTTERY,
    LUCKY_LOTTERY_SUCCESS,
    LUCKY_LOTTERY_FALSE,
    CHECK_BARCODE, CHECK_BARCODE_SUCCESS, CHECK_BARCODE_FALSE,
    CHECK_HISTORY_LOTTERY, CHECK_HISTORY_LOTTERY_SUCCESS, CHECK_HISTORY_LOTTERY_FAILED,
    SEACRC_HISTORY_LOTTERY_TRANFER_FAILED, SEACRC_HISTORY_LOTTERY_TRANFER, SEACRC_HISTORY_LOTTERY_TRANFER_SUCCESS,
    GET_NUMBER_WIN, GET_NUMBER_WIN_SUCCESS, GET_NUMBER_WIN_FAILED,
    BUY_LOTTERY_NCC, BUY_LOTTERY_NCC_SUCCESS, BUY_LOTTERY_NCC_FAILED,
    DRAW_HISTORY_SUCCESS, DRAW_HISTORY_FAILED, DRAW_HISTORY,
    DRAW_HISTORY_SUCCESS340, DRAW_HISTORY_FAILED340, DRAW_HISTORY340,
    CALL_WEBVIEW_BADU, CALL_WEBVIEW_BADU_SUCCESS, CALL_WEBVIEW_BADU_FAILED,
    CALL_WEBVIEW_MY_UNITEL, CALL_WEBVIEW_MY_UNITEL_SUCCESS, CALL_WEBVIEW_MY_UNITEL_FAILED,
    CALL_WEBVIEW_BADU_TOKEN,CALL_WEBVIEW_BADU_TOKEN_SUCCESS,CALL_WEBVIEW_BADU_TOKEN_FAILED
} from '../actions/types'

const initialAuthState = {
    buyLottery: null,
    saleLottery: null,
    luckyLottery: null,
    searchLotteryHistory: null,
    checkBarcode: null,
    isFetching: false,
    error: null,
    isSuccess: false,
    actionType: null,
    valueHistoryLettory: null,
    valueHistoryLettoryTranfer: null,
    valueNumberWin: null,
    buyLotteryNCC: null,
    drawHistory: null,
    drawHistory340: null,
    dataCallWebviewBadu: null,
    dataCallWebviewMyUnitel: null,
    dataCallGetTokenBadu: null
}

export default (state = initialAuthState, action) => {
    switch (action.type) {
        case BUY_LOTTERY:
            return { ...state, buyLottery: null, isFetching: true, actionType: BUY_LOTTERY }
        case BUY_LOTTERY_SUCCESS:
            return { ...state, isFetching: false, buyLottery: action.data, isSuccess: true, actionType: BUY_LOTTERY_SUCCESS }
        case BUY_LOTTERY_FALSE:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: BUY_LOTTERY_FALSE }

        case SALE_LOTTERY:
            return { ...state, saleLottery: null, isFetching: true, actionType: SALE_LOTTERY }
        case SALE_LOTTERY_SUCCESS:
            return { ...state, isFetching: false, saleLottery: action.data, isSuccess: true, actionType: SALE_LOTTERY_SUCCESS }
        case SALE_LOTTERY_FALSE:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: SALE_LOTTERY_FALSE }

        case HISTORY_LOTTERY:
            return { ...state, searchLotteryHistory: null, isFetching: true, actionType: HISTORY_LOTTERY }
        case HISTORY_LOTTERY_SUCCESS:
            return { ...state, isFetching: false, searchLotteryHistory: action.data, isSuccess: true, actionType: HISTORY_LOTTERY_SUCCESS }
        case HISTORY_LOTTERY_FALSE:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: HISTORY_LOTTERY_FALSE }

        case LUCKY_LOTTERY:
            return { ...state, luckyLottery: null, isFetching: true, actionType: LUCKY_LOTTERY }
        case LUCKY_LOTTERY_SUCCESS:
            return { ...state, isFetching: false, luckyLottery: action.data, isSuccess: true, actionType: LUCKY_LOTTERY_SUCCESS }
        case LUCKY_LOTTERY_FALSE:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: LUCKY_LOTTERY_FALSE }

        case CHECK_BARCODE:
            return { ...state, checkBarcode: null, isFetching: true, actionType: CHECK_BARCODE }
        case CHECK_BARCODE_SUCCESS:
            return { ...state, isFetching: false, checkBarcode: action.data, isSuccess: true, actionType: CHECK_BARCODE_SUCCESS }
        case CHECK_BARCODE_FALSE:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: CHECK_BARCODE_FALSE }


        case CHECK_HISTORY_LOTTERY:
            return { ...state, valueHistoryLettory: null, isFetching: true, actionType: CHECK_HISTORY_LOTTERY }
        case CHECK_HISTORY_LOTTERY_SUCCESS:
            return { ...state, isFetching: false, valueHistoryLettory: action.data, isSuccess: true, actionType: CHECK_HISTORY_LOTTERY_SUCCESS }
        case CHECK_HISTORY_LOTTERY_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: CHECK_HISTORY_LOTTERY_FAILED }



        case SEACRC_HISTORY_LOTTERY_TRANFER:
            return { ...state, valueHistoryLettoryTranfer: null, isFetching: true, actionType: SEACRC_HISTORY_LOTTERY_TRANFER }
        case SEACRC_HISTORY_LOTTERY_TRANFER_SUCCESS:
            return { ...state, isFetching: false, valueHistoryLettoryTranfer: action.data, isSuccess: true, actionType: SEACRC_HISTORY_LOTTERY_TRANFER_SUCCESS }
        case SEACRC_HISTORY_LOTTERY_TRANFER_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: SEACRC_HISTORY_LOTTERY_TRANFER_FAILED }


        case GET_NUMBER_WIN:
            return { ...state, valueNumberWin: null, isFetching: true, actionType: GET_NUMBER_WIN }
        case GET_NUMBER_WIN_SUCCESS:
            return { ...state, isFetching: false, valueNumberWin: action.data, isSuccess: true, actionType: GET_NUMBER_WIN_SUCCESS }
        case GET_NUMBER_WIN_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: GET_NUMBER_WIN_FAILED }


        case BUY_LOTTERY_NCC:
            return { ...state, buyLotteryNCC: null, isFetching: true, actionType: BUY_LOTTERY_NCC }
        case BUY_LOTTERY_NCC_SUCCESS:
            return { ...state, isFetching: false, buyLotteryNCC: action.data, isSuccess: true, actionType: BUY_LOTTERY_NCC_SUCCESS }
        case BUY_LOTTERY_NCC_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: BUY_LOTTERY_NCC_FAILED }


        case DRAW_HISTORY:
            return { ...state, drawHistory: null, isFetching: true, actionType: DRAW_HISTORY }
        case DRAW_HISTORY_SUCCESS:
            return { ...state, isFetching: false, drawHistory: action.payload, isSuccess: true, actionType: DRAW_HISTORY_SUCCESS }
        case DRAW_HISTORY_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: DRAW_HISTORY_FAILED }

        case DRAW_HISTORY340:
            return { ...state, drawHistory340: null, isFetching: true, actionType: DRAW_HISTORY340 }
        case DRAW_HISTORY_SUCCESS340:
            return { ...state, isFetching: false, drawHistory340: action.payload, isSuccess: true, actionType: DRAW_HISTORY_SUCCESS340 }
        case DRAW_HISTORY_FAILED340:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: DRAW_HISTORY_FAILED340 }


        case CALL_WEBVIEW_BADU:
            return { ...state, dataCallWebviewBadu: null, isFetching: true, actionType: CALL_WEBVIEW_BADU }
        case CALL_WEBVIEW_BADU_SUCCESS:
            return { ...state, isFetching: false, dataCallWebviewBadu: action.data, isSuccess: true, actionType: CALL_WEBVIEW_BADU_SUCCESS }
        case CALL_WEBVIEW_BADU_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: CALL_WEBVIEW_BADU_FAILED, dataCallWebviewBadu: action.data }


        case CALL_WEBVIEW_MY_UNITEL:
            return { ...state, dataCallWebviewMyUnitel: null, isFetching: true, actionType: CALL_WEBVIEW_MY_UNITEL }
        case CALL_WEBVIEW_MY_UNITEL_SUCCESS:
            return { ...state, isFetching: false, dataCallWebviewMyUnitel: action.data, isSuccess: true, actionType: CALL_WEBVIEW_MY_UNITEL_SUCCESS }
        case CALL_WEBVIEW_MY_UNITEL_FAILED:
            return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: CALL_WEBVIEW_MY_UNITEL_FAILED }

            case CALL_WEBVIEW_BADU_TOKEN:
                return { ...state, dataCallGetTokenBadu: null, isFetching: true, actionType: CALL_WEBVIEW_BADU_TOKEN }
            case CALL_WEBVIEW_BADU_TOKEN_SUCCESS:
                return { ...state, isFetching: false, dataCallGetTokenBadu: action.data, isSuccess: true, actionType: CALL_WEBVIEW_BADU_TOKEN_SUCCESS }
            case CALL_WEBVIEW_BADU_TOKEN_FAILED:
                return { ...state, isFetching: false, error: action.error, isSuccess: false, actionType: CALL_WEBVIEW_BADU_TOKEN_FAILED }
    

        default:
            return state
    }
}
