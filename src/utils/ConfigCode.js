
export const SUCCESS = '00000'
export const ERROR_UNKNOWN = '99999'
// ERROR CORE
export const CORE_PAPER_INCORRECT = '10101'// So giay to tuy than dang ky cho khach hang khong dung voi giay to co trong he thong
export const CORE_ID_NUMBER_REGISTERED = '10102'// So giay to tuy than da dk voi sdt khac
export const CORE_PHONE_NUMBER_REGISTERED = '10103'// So dien thoai da dang ky voi so GTTT khac
export const CORE_TRANSACTION_INVALID = '10112'
export const CORE_ACCOUNT_INVALID = '10114'
export const CORE_ACCOUNT_NOT_REGISTER = '10116'
export const CORE_ACCOUNT_CANCELED = '10117'
export const CORE_ACCOUNT_BLOCKED = '10118'
export const CORE_NO_DATA = '10119'
export const CORE_INPUT_INVALID = '10130' // Thieu mot so truong bat buoc
export const CORE_TRANS_CASH_NO_DATA1 = '10131'
export const CORE_TRANS_CASH_NO_DATA2 = '10132'
export const CORE_TRANS_CASH_NO_DATA3 = '10133'
export const CORE_TRANS_CASH_INVALID = '10134'
export const CORE_TRANS_SUCCESS_BEFORE = '10150' // Giao dich da thuc hien truoc do
export const CORE_TRANS_CANCELLED = '10151' // Giao dich da huy canceled
export const CORE_WRONG_PIN = '10155'
export const CORE_WRONG_PIN_SECOND = '10156'
export const CORE_AGENT_REGISTER_PHONE = '10173'
export const CORE_AGENT_REGISTER_PAPER = '10174'
export const CORE_PIN_BLOCKED = '10175'
export const CORE_DUPLICATE_TRANSACTION = '10194'

export const CORE_TRANSACTION_TIMEOUT = '10532'
export const CORE_BCCS_RESULT_NOT_SUBSCRIBER = '10540'
export const CORE_BCCS_OCS_PAY = '10545'
export const CORE_MGW_NOT_SUBSCRIBER = '10560'
export const CORE_MGW_ERROR = '10561'

export const CORE_ERROR_INSERTDB = '10790' // Loi khi tuong tac voi db
export const CORE_TRANS_CONFIG_INVALID = '10912'
// Error Register

// USSD_ERROR
export const WRONG_EXCEED_LIMIT = '08'
export const AMOUNT_TRANS_INVALID = '09' // Amout of money must be from X$ to Y$
export const WRONG_NOT_ENOUGH_BALANCE = '13'
export const ACCOUNT_REGISTER_NOT_USE = '15'
export const MSISDN_EXISTED = '20'
export const PAPER_NUMBER_EXISTED = '21'
export const BCCS_RESULT_REMOVED = '41'
export const BCCS_RESULT_CANCLED = '42'
export const BCCS_RESULT_LOCKED_1_WAY = '43'
export const BCCS_RESULT_LOCKED_2_WAY = '44'
export const BCCS_CONN_ERROR = '46'
export const BCCS_NOT_ENOUGH = '47'
export const PERMISSION_INVALID = '57'
export const ACCOUNT_RECEIVER_INVALID = '58'
export const MAX_DAILY_RESET_PIN = '59'
// Dai 6x merchant gw
//    public final static String FORMAT_MESSAGE = "72"; // Thieu mot so truong bat buoc
export const ACCOUNT_NOT_PERMISSION = '80'
export const CANNOT_AUTHENTICATE_PIN = '83'
export const CONNECTION_FAIL = '96'
export const ACC_RECEIVER_BLOCK = '97'// Tai khoan nhan bi khoa
export const ERROR_ACCOUNTING = '98'

export const KEY_LANGUAGE_EN = 'EN_US'
export const KEY_LANGUAGE_NATIVE = 'TE_TL'
export const SHORT_MSG = 'SHORT'
export const LONG_MSG = 'LONG'

export const MODULE_CORE = '10'
export const MODULE_USSD = '11'
export const MODULE_WEB = '12'
export const MODULE_ESB = '13'
export const MODULE_RECONCILE = '14'

export const PRE_PAY = '000000'
export const POST_PAY = '000001'
export const PRE_HOME_PHONE = '000012'
export const POST_HOME_PHONE = '000022'
export const ELECTRIC_PAY = '000030'
export const WATER_PAY = ''

export const RESPONSE_OK = '00000'
export const NOT_REGISTERED = '10116'

export const REGISTER_NOT_ACTIVE = 'REGISTER'
export const NOT_REGISTER = ''
export const ACTIVATED = 'ACTIVE'
export const RESET_PIN = 'RESETPIN'
export const INVALID_PIN = 'INVALID PIN'
export const LOCKED = 'LOCKED'

// PROCESS_CODE
export const VALIDATE_PING = '000000'
export const VALIDATE_LOGIN = '000001'
export const VALIDATE_LOGOUT = '000002'
export const VALIDATE_OTP = '000003'
export const VALIDATE_PIN = '000004'

export const SETTING_CHANGE_PIN = '001002'
export const SETTING_REQUEST_GRANT_PIN = '001001'
export const SETTING_GRANT_NEW_PIN = '001003'
export const SETTING_CHANGE_LANGUAGE = '001100'

export const CUSTOMER_SELF_REGISTER = '002000'
export const CUSTOMER_AGENT_REGISTER = '002001'
export const AGENT_REGISTER = '002002'
export const SUPER_AGENT_REGISTER = '002003'

export const CHANGE_ACTIVE_SERVICE = '003000'
export const CHANGE_LOCK_SERVICE = '003001'
export const CHANGE_UNLOCK_SERVICE = '003002'
export const CHANGE_3TIMES_LOCK = '003003'
export const CHANGE_LOCK_TRANSACTION_BY_CUSTOMER = '003100'
export const CHANGE_LOCK_TRANSACTION_BY_STAFF = '003101'
// Tat' toan TK vi 003200
export const CHANGE_INFO_CUSTOMER = '003300'
export const CHANGE_INFO_AGENT = '003301'

export const SEARCH_BALANCE = '311001'
export const SEARCH_TRANSACTION_HISTORY = '311002'
export const SEARCH_TRANSACTION_DETAIL = '311003'
export const SEARCH_CHECK_BCCS = '311050'
export const SEARCH_ACCOUNT_INFO = '311100'
export const SEARCH_DIRECT_TRANSFER_HISTORY = '311111'
export const SEARCH_PAYMENT_INFO = '311200'
export const SEARCH_COMMISSION_INFO = '311201'

export const SEARCH_FEE_INFO_E2NE = '311005'
export const SEARCH_FEE_INFO_E2E = '311006'

export const MONEY_CHANNEL_WITHDRAW = '010001'
export const MONEY_AGENT_CHARGE_CUSTOMER = '010002'
export const MONEY_CUSTOMER_CASH_OUT = '010003'
export const MONEY_AGENT_TRANSFER_CUSTOMER = '010004'
export const MONEY_REFUND_EXPIRED_TRANSACTION = '011100'

export const TRANSFER_E2E = '021000'
export const TRANSFER_E2NE = '021001'
export const TRANSFER_A2HO = '021002'
export const TRANSFER_NE2NE = '011000'
export const TRANSFER_E2BANK = '021003'

export const PAYMENT_CHARGE_TELE_ACCOUNT = '571000'
export const PAYMENT_CHARGE_OTHER_ACCOUNT = '571001'
export const PAYMENT_ELECTRIC_PAY = '572000'
export const PAYMENT_WATER_PAY = ''
export const PAYMENT_REQUEST_TO_PAY = ''

export const AGENT_REQUEST_EMONEY = '030005'
export const AGENT_REQUEST_BANK_MONEY = '033016'

export const TOP_UP = 'TOP_UP'
export const VIETTEL = 'VIETTEL'
export const AREACODE = '856'

// export const PRE_PAY = '000000'
// export const TOP_UP_UNI_CODE = '000012'
export const POST_PAID = '000001'
// export const POST_PAID_UNI_CODE = '000022'

export const TOP_UP_MOBILE = 'TOP_UP_MOBILE'
export const TOP_UP_UNI = 'TOP_UP_UNI'
export const POST_PAID_MOBILE = 'POST_PAID_MOBILE'
export const POST_PAID_UNI = 'POST_PAID_UNI'

export const TOP_UP_MOBILE_OTHER = 'TOP_UP_MOBILE_OTHER'
export const TOP_UP_UNI_OTHER = 'TOP_UP_UNI_OTHER'
export const POST_PAID_MOBILE_OTHER = 'POST_PAID_MOBILE_OTHER'
export const POST_PAID_UNI_OTHER = 'POST_PAID_UNI_OTHER'


export const FTTH = 'FTTH'
export const ADSL = 'ADSL'
export const LEASED_LINE = 'LEASED_LINE'

export const FTTH_OTHER = 'FTTH_OTHER'
export const ADSL_OTHER = 'ADSL_OTHER'
export const LEASED_LINE_OTHER = 'LEASED_LINE_OTHER'

//sokxay
export const UPLOAD_IMAGE = '036008'
export const REQUEST_PAYMENT ='036010'
export const REQUEST_PAYMENT_NCC ='037105'

// export const REQUEST_PAYMENT ='036010'

//lottery
export const BUY_LOTTERY = '036001'
export const LOTTERY_HISTORY = '036003'
export const LUCKY_LOTTERY ='036002'
export const CHECK_BARCODE = '036004'

export const LUCKY_LOTTERY_NCC ='037004'
export const LUCKY_LOTTERY_NCC340 ='037104'

//TOPUP ETL
export const PROCESS_CHECK_ACCOUNT_ETL = '311051'
//CHECK_FEE_TOPUP
export const CHECK_FEE_TOPUP_ETL = '311006'
export const TRANSFER_TOPUP_ETL = '573000'
//CHECK ACCOUNT LAOVIET BANK
export const CHECK_ACCOUNT_LAOVIET_BANK = '311010'
//Transfer to bank 
export const TRANSFER_EWALLET_BANK = '600011'
//TRANSFER_TOPUP_ETL  573000

export const CHECK_FEE_BANK = '311006'
export const INVITEFRIEND = '311204'
export const CHECK_ACCOUNT_BCCS = '311052'

export const PAY_STAFF_DEBT = '574000'

export const MONEY_POS_CASH_IN = '010008'
export const TRANSFER_TOPUP_LTC = '579000'

export const PAYMENT_LEASING = '578000'

export const TRANSFER_EWALLET_BANK_JDB = '600013'
export const TRANSFER_EWALLET_BANK_MRH = '600012'
export const TRANSFER_EWALLET_BANK_BCEL = '600014'

export const BUY_LOTTERY_NCC = '037001'
export const BUY_LOTTERY_NCC_ANIMAL = '037101'

export const GET_INFO_NCC = '037000'
export const GET_INFO_NCC_ANIMAL = '037100'

export const CHECK_NUMBER_CTTID = '039001'
export const CASH_OUT_WORD_BANK = '039002'
export const APPROVAL_TRANSACTION = '033100'

export const TOPUP_TPUST = '579001'
export const PAY_MENT_INSURANCE_APA = '580000'

export const PAYMENT_WATER_NPP = '311010'

export const PAYMANT_WATTER = '600101'

export const HIGH_SECURITY = '003012'

export const CHECK_BLOCK_DEVICE = '311206'

//
export const WEBVIEW_MYUNITEL = '039200'
export const WEBVIEW_GET_TOKEN_BADU = '039100'




// Test
// export const username ='WORLD_BANK'
// export const password ='sf788fs54reteWDSf8870089dkshuy'
// export const passkey ='12gfRYISyty458wqoi889SKKf3UMONEY'
// export const partner_code ='WORLD_BANK'


// product
export const username ='WORLD_BANK'
export const password ='01035009918a06deb27ab86efd990f70'
export const passkey ='075e99e269653a65609b42053bc30c0a'
export const partner_code ='WORLD_BANK'

