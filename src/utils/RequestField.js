import * as FIELD from './CoreFieldMap'
import _ from 'lodash'
var fieldMap = [
  {
    fieldID: FIELD.MTI,
    value: '0200'
  },
  {
    fieldID: 22,
    value: '1'
  }
]

// export function addToInitField (field) {
//   fieldMap = _.uniqBy(_.concat(field, fieldMap), 'fieldID')
//   var jsonFieldMap = { 'fieldMap': fieldMap }
//   return jsonFieldMap
// }

export function addToInitField(field) {
  fieldMap = _.uniqBy(_.concat(field, fieldMap), 'fieldID')
  var removeOldData = _.reject(fieldMap, 'fieldMap')
  let jsonFieldMap = { 'fieldMap': removeOldData }
  return jsonFieldMap
  
}

// sau khi thực hiện bản tin thứ 2 phải gọi lại hàm này để clear
export function clearInitField() {
  fieldMap = [
    {
      fieldID: FIELD.MTI,
      value: '0200'
    },
    {
      fieldID: 22,
      value: '1'
    }
  ]
}

// export function formatJson (arr) {
//   fieldMap = { 'fieldMap': arr }
//   return fieldMap
// }

// export function addToInitField (field) {
//   fieldMap = _.uniqBy(_.concat(field, fieldMap), 'fieldID')
//   return fieldMap
// }

export function getValueField(data, fieldID) {
  // console.log('data:-----1---------', data)
  const obj = _.find(data, { fieldID: fieldID })
  // console.log('obj--------:', obj)
  if (obj !== undefined) {
    return obj.value
  } else {
    return null
  }
}

export function addStackField(currentField, newField) {
  return _.uniqBy(_.concat(newField, currentField), 'fieldID')
}
export function formatJson(arr) {
  fieldMap = { 'fieldMap': arr }
  return fieldMap
}

export function addMit() {
  return [{
    fieldID: FIELD.MTI,
    value: '0200'
  }]
}
export function addActionNode() {
  return [{
    fieldID: FIELD.ACTION_NODE, // 22
    value: '1' // default mobile : 1
  }]
}

export function addRoleId(roleId) {
  return [{
    fieldID: FIELD.ROLE_ID, // iso: 20 => khach hang: 4, agent: 1
    value: roleId
  }]
}
export function addPhone(phoneNumber) {
  return [{
    fieldID: FIELD.PHONE_NUMBER,
    value: phoneNumber
  }, {
    fieldID: FIELD.CARRIED_PHONE,
    value: phoneNumber
  }]
}
export function addPhoneLottery(phoneNumber) {
  return [{
    fieldID: FIELD.PHONE_NUMBER,
    value: phoneNumber
  }]
}

export function addAccountID(accountID) {
  return [{
    fieldID: FIELD.ACCOUNT_ID,
    value: accountID
  }, {
    fieldID: FIELD.CARRIED_ACCOUNT_ID,
    value: accountID
  }]
}
export function addAccountIDLottery(accountID) {
  return [{
    fieldID: FIELD.ACCOUNT_ID,
    value: accountID
  }]
}

export function addProcessCode(processCode) {
  return [{
    fieldID: FIELD.PROCESS_CODE,
    value: processCode
  }]
}

export function addPin(pin) {
  return [{
    fieldID: FIELD.PIN,
    value: pin
  }]
}
export function addPinNew(pinNew) {
  return [{
    fieldID: FIELD.PIN_NEW,
    value: pinNew
  }]
}
export function addAmount(amount) {
  return [{
    fieldID: FIELD.AMOUNT,
    value: amount
  }]
}
export function addOPT(otp) {
  return [{
    fieldID: FIELD.OTP,
    value: otp
  }]
}
export function addToPhone(phone) {
  return [{
    fieldID: FIELD.TO_PHONE,
    value: phone
  }]
}
export function addPaymentCode(paymentCode) {
  return [{
    fieldID: FIELD.PAYMENT_CODE,
    value: paymentCode
  }]
}
export function addServiceIndicator(serviceIndicator) {
  return [{
    fieldID: FIELD.SERVICE_INDICATOR,
    value: serviceIndicator
  }]
}
export function addCustomerName(customerName) {
  return [{
    fieldID: FIELD.CUSTOMER_NAME,
    value: customerName
  }]
}
export function addCustomerBirthday(customerBirthday) {
  return [{
    fieldID: FIELD.CUSTOMER_BIRTHDAY,
    value: customerBirthday
  }]
}

export function addCustomerGender(customerGender) {
  return [{
    fieldID: FIELD.CUSTOMER_GENDER,
    value: customerGender
  }]
}
export function addPaperType(paperType) {
  return [{
    fieldID: FIELD.PAPER_TYPE,
    value: paperType
  }]
}
export function addPaperNumber(paperNumber) {
  return [{
    fieldID: FIELD.PAPER_NUMBER,
    value: paperNumber
  }]
}
export function addTransDes(transDes) {
  // transDes is true or false or description transaction
  return [{
    fieldID: FIELD.TRANSACTION_DESCRIPTION,
    value: transDes
  }]
}
export function addTransId(transId) {
  // transDes is true or false or description transaction
  return [{
    fieldID: FIELD.TRANSACTION_ID,
    value: transId
  }]
}
export function addPan(pan) {
  return [{
    fieldID: FIELD.PAN,
    value: pan
  }]
}
export function addToName(toName) {
  return [{
    fieldID: FIELD.TO_NAME,
    value: toName
  }]
}
export function addToAccountId(toAccountId) {
  return [{
    fieldID: FIELD.TO_ACCOUNT_ID,
    value: toAccountId
  }]
}

export function addTransCode(transCode) {
  return [{
    fieldID: FIELD.TRANSACTION_CODE,
    value: transCode
  }]
}
export function addServiceCode(serviceCode) {
  return [{
    fieldID: FIELD.SERVICE_CODE,
    value: serviceCode
  }]
}
export function addPartnerCode(partnerCode) {
  return [{
    fieldID: FIELD.PARTNER_CODE,
    value: partnerCode
  }]
}
export function addCustomerPhone(customerPhone) {
  return [{
    fieldID: FIELD.CUSTOMER_PHONE,
    value: customerPhone
  }]
}
export function addAreaCode(areaCode) {
  return [{
    fieldID: FIELD.AREA_CODE,
    value: areaCode
  }]
}
export function addEffectType(effectType) {
  return [{
    fieldID: FIELD.EFFECT_TYPE,
    value: effectType
  }]
}
export function addLanguage(language) {
  return [{
    fieldID: FIELD.LANGUAGE,
    value: language
  }]
}
export function addCarriedAccId(carriedAccId) {
  return [{
    fieldID: FIELD.CARRIED_ACCOUNT_ID,
    value: carriedAccId
  }]
}
export function addCurrencyCode(currencyCode) {
  return [{
    fieldID: FIELD.CURRENCY_CODE,
    value: currencyCode
  }]
}
export function addFromPhone(fromPhone) {
  return [{
    fieldID: FIELD.FROM_PHONE,
    value: fromPhone
  }]
}
export function addSecretSecure(secretCode) {
  return [{
    fieldID: FIELD.SECRET_SECURE,
    value: secretCode
  }]
}
export function addReferenceId(referenceId) {
  return [{
    fieldID: FIELD.REFERENCE_ID,
    value: referenceId
  }]
}
export function addActionStateId(actionStateId) {
  return [{
    fieldID: FIELD.ACTION_STATE_ID,
    value: actionStateId
  }]
}
export function addShopCode(shopCode) {
  return [{
    fieldID: FIELD.SHOP_CODE,
    value: shopCode
  }]
}
export function addBankCode(bankCode) {
  return [{
    fieldID: FIELD.BANK_CODE,
    value: bankCode
  }]
}
export function addBankTransId(bankTransId) {
  return [{
    fieldID: FIELD.BANK_TRANS_ID,
    value: bankTransId
  }]
}
export function addLongitude(long) {
  return [{
    fieldID: FIELD.LONGITUDE,
    value: long
  }]
}
export function addLatitude(lat) {
  return [{
    fieldID: FIELD.LATITUDE,
    value: lat
  }]
}

export function addStaffCode(staffCode) {
  return [{
    fieldID: FIELD.STAFF_CODE,
    value: staffCode
  }]
}
// Author: Thavithong
export function addCustomerAddress(address) {
  return [{
    fieldID: FIELD.CUSTOMER_ADDRESS,
    value: address
  }]
}

export function addImageName(imageName) {
  return [{
    fieldID: FIELD.FILE_NAME,
    value: imageName
  }]
}

export function addImagePath(imagePath) {
  return [{
    fieldID: FIELD.MINI_STATEMENT_DATA,
    value: imagePath
  }]
}

export function addTransactionDescription(desciption) {
  return [{
    fieldID: FIELD.TRANSACTION_DESCRIPTION,
    value: desciption
  }]
}

export function addPhonNumber(phoneNumber) {
  return [{
    fieldID: FIELD.CUSTOMER_PHONE,
    value: phoneNumber
  }]
}

export function getValueObject(data) {
  const item = _.filter(data, function (item) {
    return item != null
  })
  if (item != null) {
    const value = item[1]
    return value
  } else {
    return null
  }
}

export function addRequestNo(requestId) {
  return [{
    fieldID: FIELD.REQUEST_NO,
    value: requestId
  }]
}

export function addImageNameTo(imageName) {
  return [{
    fieldID: FIELD.FILE_NAME,
    value: imageName
  }]
}

export function getValueInObject(data,value){
    if(value > 0){
      const obj = _.find(data, {'paymentCode': value})
      return obj;
    }
}

export function addFromDate(fromDate) {
  return [{
     fieldID: FIELD.DATE_OF_ISSUE,
    value: fromDate
  }]
}

export function addToDate(toDate) {
  return [{
    fieldID: FIELD.EXPIRED_DATE,  //fieldID: FIELD.TO_DATE,
    value: toDate
  }]
}

export function addMerchangeType(merchangeType) {
  return [{
    fieldID: FIELD.MERCHANT_TYPE,
    value: merchangeType
  }]
}

export function addTIN(tin) {
  return [{
    fieldID: FIELD.TIN,
    value: tin
  }]
}

export function addCarriedName(carriedName) {
  return [{
    fieldID: FIELD.CARRIED_NAME,
    value: carriedName
  }]
}

export function addFromAccountId(fromAccountId) {
  return [{
    fieldID: FIELD.FROM_ACCOUNT_ID,
    value: fromAccountId
  }]
}

export function addBankAccountNo(bankAccountNo) {
 console.log('bankAccountNo----data code appp----:', bankAccountNo)
  return [{
    fieldID: FIELD.BANK_ACCOUNT_NO,
    value: bankAccountNo
  }]
}

export function addStaffName(addStaffName) {
  return [{
    fieldID: FIELD.STAFF_NAME,
    value: addStaffName
  }]
}

export function addUserName(userName) {
  return [{
    fieldID: FIELD.USER_NAME,
    value: userName
  }]
}

export function addReceiverAddress(ReceiverAddress) {
  return [{
    fieldID: FIELD.RECEIVER_ADDRESS,
    value: ReceiverAddress
  }]
}

export function addTier(Tier) {
  return [{
    fieldID: FIELD.TIER,
    value: Tier
  }]
}


export function addBankAccountName(BankAccountName) {
  return [{
    fieldID: FIELD.BANK_ACCOUNT_NAME,
    value: BankAccountName
  }]
}

export function addMessagesignature(messagesignature) {
  return [{
    fieldID: FIELD.MESSAGE_SIGNATURE,
    value: messagesignature
  }]
}

export function addRequestId(requestId) {
  return [{
    fieldID: FIELD.REQUEST_ID,
    value: requestId
  }]
}

export function addCarredCode(carredCode) {
  return [{
    fieldID: FIELD.CARRIED_CODE,
    value: carredCode
  }]
}

export function addFromName(fromName) {
  return [{
    fieldID: FIELD.FROM_NAME,
    value: fromName
  }]
}
export function addTelex(Telex) {
  return [{
    fieldID: FIELD.TELEX,
    value: Telex
  }]
}