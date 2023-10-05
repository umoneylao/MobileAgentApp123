'use strict'
import * as Constant from './Constant'
import Reactotron from 'reactotron-react-native'

const VIETTEL_PHONE_PATTERN = '^[+]?(84|0)(98|97|96|163|164|165|166|167|168|169)[\\d]{7}$'
const EMAIL_PATTERN = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'
const NUMBER_PATTERN = /^(-|\\+)?[0-9]+(\\.[0-9]+)?$/
const OTP_PATTERN = /^[0-9]{6}/
const WEBSITE_ADDRESS_PATTERN = '(http(s)?://)?([\\w-]+\\.)+[\\w-]+(/[\\w- ;,./?%&=]*)?'

const PHONE_PATTERN_UNIPHONE = /^[+]?(856|0|)(309|304|21|305|302)[\d]{6}$/

const PHONE_PATTERN_MOBILE = /^[+]?(856|0|)(9|5|2|7|209|309|304|202|303|205|207|305|302)[\d]{7}$/
const LAOS_PHONE = /^[+]?(856|0|)(9|2|5|7|209|202|205|207)[\d]{7}$/
const LAOS_HOME = /^[+]?(856|0|)(309|302|304|305|307)[\d]{6}$/

//const PHONE_PATTERN_MOBILE = /^[+]?(856|0|)(9|5|2|7|209|309|304|202|303|205|207|305|302)[\d]{7}$/
// const PHONE_PATTERN_MOBILE = /^[+]?(856|0|)(9|5|2|209|309|304|202|303|205|305|302)[\d]{7}$/
// const LAOS_PHONE = /^[+]?(856|0|)(9|2|5|209|202|205)[\d]{7}$/
// const LAOS_HOME = /^[+]?(856|0|)(309|302|304|305)[\d]{6}$/



const NAME_PATTERN = /^[a-zA-Z0-9 ]{1,}$/
const STRING_PATTERN = '[a-zA-Z ]+'

const SIMPLE_CHARACTER_PATTERN = /^[a-zA-Z0-9]{1,30}$/
const AGENT_CODE_PATTERN = /^[a-zA-Z0-9]{3,8}$/
const BANK_CODE_PATTERN = /^[a-zA-Z0-9]{1,}$/
const BANK_TRANS_ID_PATTERN = /^[a-zA-Z0-9]{8,12}$/
const MONEY_PATTERN = /^[,\d]{1,13}$/
const ONLY_NUMBER_PATTERN = /^\d+$/
const IDENTIFICATION_PATTERN = /^[a-zA-Z0-9]{1,12}$/
const ACCOUNT_NUMBER_PATTERN = /^(6|8|9)[\d]{8}$/
const ADSL_NUMBER_PATTERN = /^(9)[\d]{8}$/
const FTTH_NUMBER_PATTERN = /^(8|5)[\d]{8}$/
const PSTN_NUMBER_PATTERN = /^(021|21)[\d]{6}$/
const LEASED_LINE_NUMBER_PATTERN = /^(6)[\d]{8}$/
const NON_SPECIAL_CHARACTER = /^[^<>%$~`=\[\];./,/?:"{}+_()/*&/^!@#]*$/

const PHONE_HISTRORY_MOBILE = /^[+]?(209|309|304|205|202|207)[\d]{7}$/


export const REMOVE_FIRST_ZERO = /^0+(?=\d)/
export const TRIM_SPACE = /\s/g
export const ONLY_NUMBER = /([^0-9]+)/gi


export function isForMatch(str, pattern) {
  return pattern.test(str)
}

function isValidatePhonenumber(phoneNumber) {
  var phoneNumber = removeSpecialCharacter(phoneNumber)
  if (isForMatch(phoneNumber, PHONE_PATTERN_MOBILE) || isForMatch(phoneNumber, PHONE_PATTERN_UNIPHONE)) {
    return true
  } else {
    return false
  }
  // return true
}

function isLaosPhoneNumber(phoneNumber) {
  var phoneNumber = removeSpecialCharacter(phoneNumber);
  if (isForMatch(phoneNumber, LAOS_PHONE) || isForMatch(phoneNumber, LAOS_HOME)) {
    return true;
  } else {
    return false
  }
  // return true
}


function isOTPCorrect(otp) {
  var otp = otp.trim()
  if (isForMatch(otp, OTP_PATTERN)) {
    return true;
  } else {
    return false
  }
  // return true
}


function removeSpecialCharacter(inputString) {
  inputString = inputString.replace(' ', '')
  inputString = inputString.replace('(', '')
  inputString = inputString.replace(')', '')
  inputString = inputString.replace('-', '')
  inputString = inputString.replace('+', '')
  inputString = inputString.replace('$', '')
  return inputString
}

function isValidateName(name) {
  return isForMatch(name.trim(), NAME_PATTERN)
}

function isValidateViettelPhonenumber(phonenumber) {
  return isValidatePhonenumber(phonenumber) && isForMatch(phonenumber, VIETTEL_PHONE_PATTERN)
  // return true
}

// this func allow validate phone and convert header phone number from 0 to 84
// export function validateHeadPhone (phone) {
//   if (isValidatePhonenumber(phone)) {
//     if (isForMatch(phone, PHONE_PATTERN_0)) {
//       var newPhone = phone.replace('0', '84')
//       return newPhone
//     } else return phone
//   } else return false
// }

function isValidateMoney(money) {
  return isForMatch(money, MONEY_PATTERN)
}

export function isValidateMail(mail) {
  return isForMatch(mail, EMAIL_PATTERN)
}

function isValidateNumeric(str) {
  return isForMatch(str, NUMBER_PATTERN)
}
function isValidateOnlyNumber(str) {
  return isForMatch(str, ONLY_NUMBER_PATTERN)
}

export function isValidateWebsiteAddress(str) {
  return isForMatch(str, WEBSITE_ADDRESS_PATTERN)
}

export function isValidateAccountNumber(accountNumber, type) {
  return isForMatch(accountNumber, type)
}
// validate Date
export function isValidateDateStandard(date) {
  try {
    Date.parse(date)
    return true
  } catch (e) {
    // var3.printStackTrace();
    console.log(e)
    return false
  }
}

function isValidateString(str) {
  return isForMatch(str, STRING_PATTERN)
}

function isValidateNonSpecial(str) {
  return isForMatch(str, NON_SPECIAL_CHARACTER)
}

function isValidateNormalChar(str) {
  return isForMatch(str, SIMPLE_CHARACTER_PATTERN)
}

function isValidateAgentCode(str) {
  return isForMatch(str, AGENT_CODE_PATTERN)
}

function isValidateBankCode(str) {
  return isForMatch(str, BANK_CODE_PATTERN)
}

function isValidateBankTransID(str) {
  return isForMatch(str, BANK_TRANS_ID_PATTERN)
}

function isValidateIdentification(str) {
  return isForMatch(str, IDENTIFICATION_PATTERN)
}

function isValidateHistoryPhone(str) {
  return (isForMatch(str, PHONE_HISTRORY_MOBILE));
}

export function isValidated(str, validateType) {
  switch (validateType) {
    case Constant.VALIDATE_ALPHABET:
      return isValidateString(str)
    case Constant.VALIDATE_NON_SPECIAL:
      return isValidateNonSpecial(str)
    case Constant.VALIDATE_MONEY:
      return isValidateMoney(str)
    case Constant.VALIDATE_NAME:
      return isValidateName(str)
    case Constant.VALIDATE_AGENT_CODE:
      return isValidateAgentCode(str)
    case Constant.VALIDATE_BANK_CODE:
      return isValidateBankCode(str)
    case Constant.VALIDATE_BANK_TRANS_ID:
      return isValidateBankTransID(str)
    case Constant.VALIDATE_NUMERIC:
      return isValidateNumeric(str)
    case Constant.VALIDATE_PHONE:
      return isValidatePhonenumber(str)
    case Constant.VALIDATE_LAOS:
      return isLaosPhoneNumber(str)
    case Constant.VALIDATE_VIETTEL:
      return isValidateViettelPhonenumber(str)
    case Constant.VALIDATE_NORMAL_CHAR:
      return isValidateNormalChar(str)
    case Constant.VALIDATE_ONLY_PHONE:
      return isValidateOnlyNumber(str)
    case Constant.VALIDATE_ACCOUNT:
      return isValidateAccountNumber(str, ACCOUNT_NUMBER_PATTERN)
    case Constant.VALIDATE_IDENTIFICATION:
      return isValidateIdentification(str)
    case Constant.VALIDATE_ADSL:
      return isValidateAccountNumber(str, ADSL_NUMBER_PATTERN)
    case Constant.VALIDATE_PSTN:
      return isValidateAccountNumber(str, PSTN_NUMBER_PATTERN)
    case Constant.VALIDATE_FTTH:
      return isValidateAccountNumber(str, FTTH_NUMBER_PATTERN)
    case Constant.VALIDATE_LEASED_LINE:
      return isValidateAccountNumber(str, LEASED_LINE_NUMBER_PATTERN)
    case Constant.VALIDATE_OTP:
      return isOTPCorrect(str)
    case Constant.PHONE_HISTRORY_MOBILE:
      return isValidateHistoryPhone(str)
    default:
      return false
  }
}

export function isValidateDate(date, pattern) {
  // SimpleDateFormat formatter = new SimpleDateFormat(pattern);
  // try {
  //   formatter.parse(date);
  //   return true;
  // } catch (ParseException var4) {
  //   var4.printStackTrace();
  //   return false;
  // }
}

export function isValidateTextLength(text, min, max) {
  var len = text.length()
  return len >= min && len <= max
}

export function isValidateShortInRange(number, low, high) {
  return number >= low && number <= high
}

export function isValidateIntegerInRange(number, low, high) {
  return number >= low && number <= high
}

export function isValidateLongInRange(number, low, high) {
  return number >= low && number <= high
}

export function isValidateFloatInRange(number, low, high) {
  return number >= low && number <= high
}

export function isValidateDoubleInRange(number, low, high) {
  return number >= low && number <= high
}
export function removeSpecialCharacterInput(inputString) {
  inputString = inputString.replace(' ', '')
  inputString = inputString.replace('(', '')
  inputString = inputString.replace(')', '')
  inputString = inputString.replace('-', '')
  inputString = inputString.replace('+', '')
  inputString = inputString.replace('$', '')
  return inputString
}

// by thavithong sokxay
function isValidateLao(str) {
  return isForMatch(str, LAO_CHARACTER)
}

export function splitResponseCollinsCharacter(item) {
  let value = ''
  if (item.length > 0) {
    value = item.split("|")
  }
  return value
}

export function splitResponseCommaCharacter(item) {
  let value = ''
  if (item.length > 0) {
    value = item.split(",")
  }
  return value
}
export function splitResponseCharacter(item) {
  let value = ''
  if (item.length > 0) {
    value = item.split("#")
  }
  return value
}
export function splitResponseEqualCharacter(item) {
  let value = ''
  if (item.length > 0) {
    value = item.split("=")
  }
  return value
}
export function splitResponseColonCharacter(item) {
  let value = ''
  if (item.length > 0) {
    value = item.split(";")
  }
  return value
}