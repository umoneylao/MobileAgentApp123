import {
    PAY_LEASING_AEON
} from './types'
export const paymentLeasingAeon = (data) => {
    return {
      type: PAY_LEASING_AEON,
      data
    }
  }