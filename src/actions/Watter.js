import {
    CHECK_ACCUONT_WATTE, PAY_MENT_WATTER_NPP
} from './types'
export const requestCheckAccount = (data) => {
    return {
        type: CHECK_ACCUONT_WATTE,
        data
    }
}

export const PaymentWatterNpp = (data) => {
    return {
        type: PAY_MENT_WATTER_NPP,
        data
    }
}
