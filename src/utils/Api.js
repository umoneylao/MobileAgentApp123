import { create } from 'apisauce'
// import axios from "axios";

// export const baseUpload = "https://test-api-um.unitel.com.la:8998/" //link img sokxay test
export const baseUpload = "http://183.182.106.165:9889/" //link img sokxay PUBLIC

export const SERVER_PATH = 'https://test-api-um.unitel.com.la:8280' // test public ip real server 2020
// export const SERVER_PATH = 'https://api-umoney.unitel.com.la:8282' // PUBLIC

// export const SERVER_PATH_EU = 'https://test-api-um.unitel.com.la:8091' // Promotion UAT
export const SERVER_PATH_EU = 'https://mobile.unitel.com.la:8089' // Promotion Product

export const SERVER_UPLOAD = 'https://test-api-um.unitel.com.la:8901' // test upload img world bank
// export const SERVER_UPLOAD = 'http://183.182.106.166:8548' // Public upload img world bank

const api = create({
  baseURL: 'https://test-api-um.unitel.com.la:8280', // test server
  // baseURL: 'https://api-umoney.unitel.com.la:8282', // PUBLIC server
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 60000
})

export function* login(data) { return yield api.post('/sendRequest', data) }

export function* validatePin(data) { return yield api.post('/sendRequest', data) }

export function* requestBccs(data) { return yield api.post('/sendRequest', data) }

export function* register(data) { return yield api.post('/sendRequest', data) }

export function* activePin(data) { return yield api.post('/sendRequest', data) }

export function* changePin(data) { return yield api.post('/sendRequest', data) }

export function* getAccountInfo(data) { return yield api.post('/sendRequest', data) }

export function* requestCheckinfoPayment(data) { return yield api.post('/sendRequest', data) }

export function* accessInfoWalletNonWallet(data) { return yield api.post('/sendRequest', data) }

export function* accessInfoWalletWallet(data) { return yield api.post('/sendRequest', data) }

export function* confirmPin(data) { return yield api.post('/sendRequest', data) }

export function* getOtp(data) { return yield api.post('/sendRequest', data) }

export function* requestPaymentElectric(data) { return yield api.post('/sendRequest', data) }

export function* requestBalance(data) { return yield api.post('/sendRequest', data) }

export function* getTransactionHistory(data) { return yield api.post('/sendRequest', data) }

export function* getPaymentInfo(data) { return yield api.post('/sendRequest', data) }

export function* requestTopUp(data) { return yield api.post('/sendRequest', data) }

export function* requestCashOut(data) { return yield api.post('/sendRequest', data) }

export function* requestCashIn(data) { return yield api.post('/sendRequest', data) }

export function* transferOtherToOther(data) { return yield api.post('/sendRequest', data) }

export function* searchDirTransHis(data) { return yield api.post('/sendRequest', data) }

export function* changeLanguage(data) { return yield api.post('/sendRequest', data) }

export function* agentRequestEmoney(data) { return yield api.post('/sendRequest', data) }

export function* agentReqBankMoney(data) { return yield api.post('/sendRequest', data) }

export function* agentCashOut(data) { return yield api.post('/sendRequest', data) }

export function* agentRegForUser(data) { return yield api.post('/sendRequest', data) }

export function* getCommission(data) { return yield api.post('/sendRequest', data) }

export function* getAgentLocation(data) { return yield api.post('/sendRequest', data) }

export function* ping(data) { return yield api.post('/sendRequest', data) }

export function* uploadDataImage(data) { return yield api.post('/sendRequest', data) }

export function* getPaymentSokxay(data) { return yield api.post('/sendRequest', data) }

export function* getDataUpload(data) { return yield api.post('/sendRequest', data) }

export function* checkFunder(data) { return yield api.post('/sendRequest', data) }

export function* storeToServer(data) { return yield api.post('/sendRequest', data) }

export function* requestActive(data) { return yield api.post('/sendRequest', data) }

export function* getBuyLottery(data) { return yield api.post('/sendRequest', data) }

export function* getBuyLotteryNCC(data) { return yield api.post('/sendRequest', data) }

export function* getSaleLottery(data) { return yield api.post('/sendRequest', data) }

export function* getHistory(data) { return yield api.post('/sendRequest', data) }

export function* getLucky(data) { return yield api.post('/sendRequest', data) }

export function* getCheckBarcode(data) { return yield api.post('/sendRequest', data) }

export function* requestCheckTopupETL(data) { return yield api.post('/sendRequest', data) }

export function* requestCheckFeeTopupETL(data) { return yield api.post('/sendRequest', data) }

export function* requestOTP(data) { return yield api.post('/sendRequest', data) }

export function* requestTopUpETL(data) { return yield api.post('/sendRequest', data) }

export function* getCheckAccountBank(data) { return yield api.post('/sendRequest', data) }

export function* getCheckAccountWatter(data) { return yield api.post('/sendRequest', data) }

export function* PaymentWatter(data) { return yield api.post('/sendRequest', data) }

export function* getFeeBank(data) { return yield api.post('/sendRequest', data) }

export function* getOTPBank(data) { return yield api.post('/sendRequest', data) }

export function* transferBank(data) { return yield api.post('/sendRequest', data) }

export function* getaddNewUser(data) { return yield api.post('/sendRequest', data) }

export function* getCheckAccountBccs(data) { return yield api.post('/sendRequest', data) }

export function* getCheckBlockDeviec(data) { return yield api.post('/sendRequest', data) }

export function* transferBccs(data) { return yield api.post('/sendRequest', data) }

export function* getPaymentAeon(data) { return yield api.post('/sendRequest', data) }

export function* getinfoNcclottery(data) { return yield api.post('/sendRequest', data) }

export function* getApprovalTransaction(data) { return yield api.post('/sendRequest', data) }

export function* getCheckNumberCTTID(data) { return yield api.post('/sendRequest', data) }

export function* getCashOutWordBank(data) { return yield api.post('/sendRequest', data) }

export function* paymentInsurance(data) { return yield api.post('/sendRequest', data) }

export function* getOnSecurity(data) { return yield api.post('/sendRequest', data) }

export function* getWebviewMyUnitel(data) { return yield api.post('/sendRequest', data) }

export function* getTokenBadu(data) { return yield api.post('/sendRequest', data) }



export function* getNewUser(phoneInfo) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/InviteDataSerivice`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/check_invite?presentee=${phoneInfo}`)

}

export function* getPresentee(accountPhone, selectedDateDOB) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/InviteDataSerivice`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/invite_history?presenter=${accountPhone}&month=${selectedDateDOB}`)
}

export function* getlistCustomerWordBank(p_province, p_district) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/WORK_BANK_OFFLINE_SERVICE`,
    headers: {
      "Accept": 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/select_all_query?p_province=${p_province}&p_district=${p_district}`)
}




export function* getHistoryTranfer(selectedDateDOB, accountPhone) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/check_total`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/check_total_transaction_operation?p_date_create=${selectedDateDOB}&p_carried_phone=${accountPhone}`)

}

export function* getNewHistory(agentCode) {
  console.log('link:', `${SERVER_PATH}/services/mobileAgentService/get_transaction_history_operation?accountId=${agentCode}&processCode&transType&partnerCode&serviceCode&fromDate=&toDate=&skip&take&locale`)
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_transaction_history_operation?accountId=${agentCode}&processCode&transType&partnerCode&serviceCode&fromDate=&toDate=&skip&take&locale`)

}

export function* getSearchHistory(agentCode, value1, value2) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_transaction_history_operation?accountId=${agentCode}&processCode&transType&partnerCode&serviceCode&fromDate=${value1}&toDate=${value2}&skip&take&locale`)

}

export function* getDrawHistoryNCC(value) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/NCC_SERVICE/select_history_draw_operation?P_NCC_TYPE=${value}`)

}

export function* getDrawHistoryNCC340(valueAnimal) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/NCC_SERVICE/select_history_draw_operation?P_NCC_TYPE=${valueAnimal}`)

}

export function* getHistoryLottery(accountPhone, processCode) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_transaction_loto_history?processCode=${processCode}&msisdn=${accountPhone}&from_date&to_date`)
}

export function* getHistoryLotteryTranfer(accountPhone, value1, value2) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_transaction_loto_history?processCode=036001&msisdn=${accountPhone}&from_date=${value1}&to_date=${value2}`)
}

export function* getNumberWin() {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_winner_loto_history`)
}

export function* getProvince() {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/WORK_BANK_OFFLINE_SERVICE`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/select_all_province_operation`)
}

export function* getDistrict(item) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/WORK_BANK_OFFLINE_SERVICE`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/select_district_by_province_operation?IPROVINCE=${item}`)
}


export function* getVersion(_language, os) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/checkVersion`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  if (os == 'android') {
    return yield mapi.get(`/request_android?language=${_language}`)
  }
  else {
    return yield mapi.get(`/request_ios?language=${_language}`)
  }
}

export function* getRequestHistoryTranfer(_accountId, _processCode) {
  // console.log('-----00000-----', `${SERVER_PATH}/services/mobileAgentService/get_recent_transaction_operation?accountId=${_accountId}&processCode=${_processCode}`)
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_recent_transaction_operation?accountId=${_accountId}&processCode=${_processCode}`)
}

export function* getRequestHistoryTranferNew(accountId, processCode, PatnetCode) {
  // console.log(`/get_recent_water_transaction_operation?accountId=${accountId}&processCode=${processCode}&partnerCode=${PatnetCode}&serviceCode&fromDate&toDate&skip&take`)
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_recent_water_transaction_operation?accountId=${accountId}&processCode=${processCode}&partnerCode=${PatnetCode}&serviceCode&fromDate&toDate&skip&take`)
}


export function* getAgentId(phone) {
  // console.log('vvv:', `${SERVER_PATH}/services/mobileAgentService/select_channel_by_params_operation?PARAMS=${phone}`)
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/select_channel_by_params_operation?PARAMS=${phone}`)
}


export function* getRequestContractNumber(ContractNumber, parnerCode) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/select_contract_leasing_query_operation?CONTRACT=${ContractNumber}&PARTNER_CODE=${parnerCode}`)

}

export function* getRequestMenuBank(Bank) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/select_bank_partner_query_operation?PARTNER_TYPE=${Bank}`)

}

export function* getSearchTransaction(DateStart, DateEnd, accountPhone, transId, statusValue, idRequest, Petitioner) {
  // console.log('DateStart:', DateStart)
  // console.log('DateEnd:', DateEnd)
  // console.log('accountPhone:', accountPhone)
  // console.log('statusValue:', statusValue)
  // console.log('idRequest:', idRequest)
  // console.log('Petitioner:', Petitioner)
  console.log('------1---:',`${SERVER_PATH}/services/mobileAgentService/get_trans_recharge_operation?TRANSACTION_ID=${transId}&REQUEST_USER=${Petitioner}&ACTION_STATE_ID=${statusValue}&PROCESS_CODE=030005&FROM_DATE=${DateStart}&TO_DATE=${DateEnd}&ACTION_NODE_ID=${idRequest}&CHANNEL_PHONE=${accountPhone}`)
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_trans_recharge_operation?TRANSACTION_ID=${transId}&REQUEST_USER=${Petitioner}&ACTION_STATE_ID=${statusValue}&PROCESS_CODE=030005&FROM_DATE=${DateStart}&TO_DATE=${DateEnd}&ACTION_NODE_ID=${idRequest}&CHANNEL_PHONE=${accountPhone}`)

}

// https://api-umoney.unitel.com.la:8282/services/mobileAgentService/get_trans_recharge_operation?TRANSACTION_ID=&REQUEST_USER=&ACTION_STATE_ID=9&PROCESS_CODE=030005&FROM_DATE=&TO_DATE=&ACTION_NODE_ID=&CHANNEL_PHONE=8562098292939


/// 1 UAT 2 Production
// export function* getPromotion(getLang) {
//   const mapi = create({
//     baseURL: `${SERVER_PATH_EU}/cms-backend/cms/media`,
//     headers: {
//       Accept: 'application/json',
//       'Accept-Language': getLang
//     },
//     timeout: 60000
//   })
//   return yield mapi.get(`/v1.0/list?type=${2}`)
// }

export function* getPromotion(getLang) {
  // console.log('----lang----', getLang)
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_media_promotion?location=${getLang}&tyle=2`)
}







export function* getPromotionDetail(id, getLang) {
  const mapi = create({
    baseURL: `${SERVER_PATH_EU}/cms-backend/cms/media`,
    headers: {
      Accept: 'application/json',
      'Accept-Language': getLang
    },
    timeout: 60000
  })
  return yield mapi.get(`/v1.0/${id}/detail`)
}

export function* getPackageInsurance() {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/APA_SERVICE`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/select_apa_packages_operation`)
}

export function* getOptionPackageInsurance(item) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/APA_SERVICE`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/select_apa_package_detail_operation?P_POLICY_NO=${item}`)
}


export function* getTokenWoldBank(data) {
  const mapi = create({
    baseURL: `${SERVER_UPLOAD}/umoney/api/v1/authentication`,
    headers: {
      Accept: 'application/json',
      Authorization: 'V09STERfQkFOSzowMTAzNTAwOTkxOGEwNmRlYjI3YWI4NmVmZDk5MGY3MDowNzVlOTllMjY5NjUzYTY1NjA5YjQyMDUzYmMzMGMwYTpXT1JMRF9CQU5L'
    },
    timeout: 60000
  })
  return yield mapi.post(`/login`, data)
}


export function* uploadListCashOut(data, access_token) {
  const mapi = create({
    baseURL: `${SERVER_UPLOAD}/umoney/api/v1/partner`,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + access_token
    },
    timeout: 60000
  })
  // console.log('url-api', mapi)
  return yield mapi.post(`/cash_out/offline_mode`, data)
}

export function* getCheckInfoDiscount(carriedAccountId, fromAccountId, toAccountId, processCode, amount, partnerCode, serviceCode) {
  // console.log(`${SERVER_PATH}/services/mobileApiService/getPolicy/${carriedAccountId}/${fromAccountId}/${toAccountId}/${processCode}/${amount}/${partnerCode}/${serviceCode}`)
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileApiService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/getPolicy/${carriedAccountId}/${fromAccountId}/${toAccountId}/${processCode}/${amount}/${partnerCode}/${serviceCode}`)
}

export function* getCheckByPassPIN(data) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_bypass_pin_otp_operation?p_account_id=${data}`)
}

export function* getCheckAmount(data) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_config_amount_operation?p_par_code=${data}`)
}
export function* getAllConfigAmount() {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_all_config_amount_operation`)
}

export function* getPopupHomePag(lang, tyle) {
  // console.log('----lang----', lang)
  // console.log('----tyle----', tyle)
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_media_promotion?location=${lang}&tyle=${tyle}`)
}


export function* getMenuHome(lang, tyle) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_media_promotion?location=${lang}&tyle=${tyle}`)
}

export function* getWebviewBadu(data, token, openLinkWeb) {
  console.log('data--------bopby:', data)
  console.log('token--------bopby:', token)
  console.log('openLinkWeb----------bopby:', openLinkWeb)
  const mapi = create({
    baseURL: openLinkWeb,
    headers: {
      'token': token
    },
    timeout: 60000
  })
  return yield mapi.post(`/auth/external/login`, data)
}

export function* getLinkWeb(lang, tyle) {
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_media_promotion?location=${lang}&tyle=${tyle}`)
}


export function* getMenuLevel2(lang, tyle) {
  console.log('<< lang >>>', lang)
  console.log('<< tyle >>>', tyle)
  const mapi = create({
    baseURL: `${SERVER_PATH}/services/mobileAgentService`,
    headers: {
      Accept: 'application/json',
    },
    timeout: 60000
  })
  return yield mapi.get(`/get_media_promotion?location=${lang}&tyle=${tyle}`)
}