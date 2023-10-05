import {
    APPROVAL_TRANSACTION, WORK_BANK_OFFLINE_SERVICE, GET_PROVINCE, GET_DISTRICT, GET_TOKEN_WORLD_BANK,UPLOAD_TO_SERVER
} from './types'
export const requestApproval = (data) => {
    return {
        type: APPROVAL_TRANSACTION,
        data
    }
}

export const reqWorldBankList = (p_province, p_district) => {
    return {
        type: WORK_BANK_OFFLINE_SERVICE,
        p_province,
        p_district
    }
}

export const reqGetProvince = () => {
    return {
        type: GET_PROVINCE
    }
}


export const reqGetDistrict = (item) => {
    return {
        type: GET_DISTRICT,
        item
    }
}


export const reqLoginWorldBank = (data) => {
    return {
        type: GET_TOKEN_WORLD_BANK,
        data
    }
}


export const reqUplaodListtoServer = (data, access_token) => {
    return {
        type: UPLOAD_TO_SERVER,
        data,
        access_token
    }
}
