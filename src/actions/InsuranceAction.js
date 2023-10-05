import {
    GET_PACKAGE_APA, GET_PACKAGE_OPTION_APA, PAY_MENT_INSURANCE
} from './types'
export const requestGetPackage = () => {
    return {
        type: GET_PACKAGE_APA,
    }
}

export const requestGetPackageOption = (item) => {
    return {
        type: GET_PACKAGE_OPTION_APA,
        item
    }
}

export const paymentInsurance = (data) => {
    return {
        type: PAY_MENT_INSURANCE,
        data
    }
}