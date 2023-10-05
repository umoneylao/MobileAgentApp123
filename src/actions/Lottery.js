import {
  BUY_LOTTERY,
  BUY_LOTTERY_SUCCESS,
  BUY_LOTTERY_FALSE,
  SALE_LOTTERY,
  SALE_LOTTERY_SUCCESS,
  SALE_LOTTERY_FALSE,
  HISTORY_LOTTERY,
  HISTORY_LOTTERY_SUCCESS,
  HISTORY_LOTTERY_FALSE,
  LUCKY_LOTTERY,
  LUCKY_LOTTERY_SUCCESS,
  LUCKY_LOTTERY_FALSE,

  CHECK_BARCODE,
  CHECK_BARCODE_SUCCESS,
  CHECK_BARCODE_FALSE,
  CHECK_HISTORY_LOTTERY,
  GET_NUMBER_WIN,
  SEACRC_HISTORY_LOTTERY_TRANFER,
  BUY_LOTTERY_NCC,
  BUY_LOTTERY_NCC_FAILED,
  BUY_LOTTERY_NCC_SUCCESS,
  DRAW_HISTORY,
  DRAW_HISTORY340,
  CALL_WEBVIEW_BADU,
  CALL_WEBVIEW_MY_UNITEL,
  CALL_WEBVIEW_BADU_TOKEN

} from './types'
import Reactotron from 'reactotron-react-native'

export const requestBuyLottery = (data) => {
  return {
    type: BUY_LOTTERY,
    data
  }
}
export const requestBuyLotterySuccess = (data) => {
  return {
    type: BUY_LOTTERY_SUCCESS,
    data
  }
}
export const requestBuyLotteryFalse = (data) => {
  return {
    type: BUY_LOTTERY_FALSE,
    data
  }
}


export const requestSaleLottery = (data) => {
  return {
    type: SALE_LOTTERY,
    data
  }
}
export const requestSaleLotterySuccess = (data) => {
  return {
    type: SALE_LOTTERY_SUCCESS,
    data
  }
}
export const requestSaleLotteryFalse = (data) => {
  return {
    type: SALE_LOTTERY_FALSE,
    data
  }
}

export const searchLotteryHistory = (data) => {
  return {
    type: HISTORY_LOTTERY,
    data
  }
}
export const searchLotteryHistorySuccess = (data) => {
  return {
    type: HISTORY_LOTTERY_SUCCESS,
    data
  }
}
export const searchLotteryHistoryFalse = (data) => {
  return {
    type: HISTORY_LOTTERY_FALSE,
    data
  }
}

export const luckyLottery = (data) => {
  return {
    type: LUCKY_LOTTERY,
    data
  }
}
export const luckyLotterySuccess = (data) => {
  return {
    type: LUCKY_LOTTERY_SUCCESS,
    data
  }
}
export const luckyLotteryFalse = (data) => {
  return {
    type: LUCKY_LOTTERY_FALSE,
    data
  }
}


export const checkBarcode = (data) => {
  return {
    type: CHECK_BARCODE,
    data
  }
}
export const checkBarcodeSuccess = (data) => {
  return {
    type: CHECK_BARCODE_SUCCESS,
    data
  }
}
export const checkBarcodeFalse = (data) => {
  return {
    type: CHECK_BARCODE_FALSE,
    data
  }
}

export const getHistoryLettory = (accountPhone, processCode) => {
  return {
    type: CHECK_HISTORY_LOTTERY,
    accountPhone, processCode
  }
}

export const searchHistoryTtanferLottery = (accountPhone, value1, value2) => {
  return {
    type: SEACRC_HISTORY_LOTTERY_TRANFER,
    accountPhone, value1, value2
  }
}

export const ongetNumberWin = () => {
  return {
    type: GET_NUMBER_WIN
  }
}

export const requestBuyLotteryNCC = (data) => {
  return {
    type: BUY_LOTTERY_NCC,
    data
  }
}

export const requestBuyLotteryNCCSuccess = (data) => {
  return {
    type: BUY_LOTTERY_NCC_SUCCESS,
    data
  }
}

export const requestBuyLotteryNCCFalse = (data) => {
  return {
    type: BUY_LOTTERY_NCC_FAILED,
    data
  }
}

export const requestHistoryNCC = (value) => {
  return {
    type: DRAW_HISTORY,
    value
  }
}

export const requestHistoryNCC340 = (valueAnimal) => {
  return {
    type: DRAW_HISTORY340,
    valueAnimal
  }
}

export const requestCallWebviewBadu = (data, token,openLinkWeb) => {
  return {
    type: CALL_WEBVIEW_BADU,
    data, token, openLinkWeb
  }
}

export const requestCallWebviewMyUnitel = (data) => {
  return {
    type: CALL_WEBVIEW_MY_UNITEL,
    data
  }
}

export const requestGetCallTokenBadu = (data) => {
  return {
    type: CALL_WEBVIEW_BADU_TOKEN,
    data
  }
}

