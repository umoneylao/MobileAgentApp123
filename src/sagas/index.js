
import { fork } from 'redux-saga/effects'
import {
  watchLogin, watchValidatePin, watchRegister, watchRequestBccs, watchChangePin, watchChangeLanguage,
  watchActivePin, watchGetOTP, watchCallPing, watchRequestActive, watchGetNewUser, watchGetAddNewUser,
  watchGetPresentee, watchGetHistoryTranfer, CheckAccuontBccsSagas, watchHistoryTranfer, watchSecrchHistoryTranfer,
  watchGetVersion, watchRequestHistoryTranfer, watchCheckagentId, watchCheckContractNumber, watchCheckMenuBank,
  watcgetinfoNcclotterySagas, watchSearchTransaction, watchCheckNumberCTTID, watchCashOutWordBank, watchRequestHistoryTranferNew,
  watcCheckBlockDeviecSagas
} from './AuthSagas'
import { watchGetOtp, watchRequestPaymentElectric } from './BillPaySagas'
import {
  watchRequestBalance, watchGetTransactionHistory, watchGetCommissionThisMonth,
  watchGetCommissionLastMonth, watchCheckFunder
} from './LookupSaga'
import {
  watchGetAccountInfo, watchAccessInfoWalletNonWallet, watchConfirmPin,
  watchAccessInfoWalletWallet, watchTransferOtherToOther
} from './TransferSagas'
import { watchRequestTopUp, watchGetPaymentInfo, watchRequestCheckTopUpETL, watchRequestCheckFeeTopUpETL, watchRequestOTP, watchRequestTopUpETL, watchCheckinfoPayment } from './TopUpSagas'
import { watchRequestCashOut, watchRequestCashIn, watchSearchDirTransHis } from './CashOutSagas'
import { watchAgentRequestEMoney, watchAgentReqBankMoney, watchAgentCashOut, watchAgentRegForUser } from './RequestSagas'
import { watchGetAgentLocation } from './MapSagas'
import { watchUpload, watchGetPayment, watchGetDataUpload, watchStore } from './SokxaySagas'
import {
  buyLotterySagas, SaleLotterySagas, HisLotterySagas, LuckyLotterySagas, CheckBarcodeSagas, watchHistoryLottery,
  watchHistoryLotteryTranfer, watchNumberWin, buyLotteryNCCSagas, watchSecrchHistoryNCC, watchSecrchHistoryNCC340,
  watchWebviewBadu, watchWebviewMyUnitel, watchWebviewBaduGetToken
} from './LotterySagas'
import { CheckAccuontBankSagas, GetFeeBankSagas, GetOTPBankSagas, TransferToBankSagas } from './BankSagas'
import { watcApprovalTransaction, watcListCustomerWordBank, watcProvince, watcDistrict, watcGetToken, watcUploadListCashout } from './WorldBankSagas'
import { watcGetPromotion, watcGetPromotionDetail, watcGetPopupHome,watcGetMenuHome, watcGetLinkWeb, watcGetMenuLevel2 } from './GetPromotionSagas'
import { watcPaymentAeonSagas } from './LeasingSagas'
import { watcPackageInsurance, watcOptionPackageInsurance, watcPaymentInsurance } from './InsuranceSagas'
import { TransferToBccsSagas, CheckInfoDiscount } from './PayBccs'
import {CheckAccuontWatterSagas, PaymentWatterSagas} from './WatterSagas'
import {watchOnSecurity, watchCheckByPassPIN, watchCheckByPassAmount,watchAllConfigAmount} from './ByPassPIN'

export default function* rootSaga() {
  yield [
    fork(watchLogin),
    fork(watchRegister),
    fork(watchRequestBccs),
    fork(watchValidatePin),
    fork(watchGetAccountInfo),
    fork(watchAccessInfoWalletNonWallet),
    fork(watchAccessInfoWalletWallet),
    fork(watchConfirmPin),
    fork(watchGetOtp),
    fork(watchRequestPaymentElectric),
    fork(watchRequestBalance),
    fork(watchGetTransactionHistory),
    fork(watchRequestTopUp),
    fork(watchGetPaymentInfo),
    fork(watchRequestCheckTopUpETL),
    fork(watchRequestCheckFeeTopUpETL),
    fork(watchRequestOTP),
    fork(watchRequestTopUpETL),
    fork(watchRequestCashOut),
    fork(watchRequestCashIn),
    fork(watchChangePin),
    fork(watchTransferOtherToOther),
    fork(watchSearchDirTransHis),
    fork(watchChangeLanguage),
    fork(watchAgentRequestEMoney),
    fork(watchAgentReqBankMoney),
    fork(watchAgentCashOut),
    fork(watchAgentRegForUser),
    fork(watchGetCommissionThisMonth),
    fork(watchGetCommissionLastMonth),
    fork(watchGetAgentLocation),
    fork(watchActivePin),
    fork(watchGetOTP),
    fork(watchCallPing),
    fork(watchCheckFunder),
    fork(watchUpload),
    fork(watchGetPayment),
    fork(watchGetDataUpload),
    fork(watchStore),
    fork(buyLotterySagas),
    fork(SaleLotterySagas),
    fork(HisLotterySagas),
    fork(LuckyLotterySagas),
    fork(CheckBarcodeSagas),
    fork(watchRequestActive),
    fork(CheckAccuontBankSagas),
    fork(GetFeeBankSagas),
    fork(GetOTPBankSagas),
    fork(TransferToBankSagas),
    fork(watchGetNewUser),
    fork(watchGetAddNewUser),
    fork(watchGetPresentee),
    fork(watchGetHistoryTranfer),
    fork(CheckAccuontBccsSagas),
    fork(TransferToBccsSagas),
    fork(CheckInfoDiscount),
    fork(watchHistoryTranfer),
    fork(watchSecrchHistoryTranfer),
    fork(watchHistoryLottery),
    fork(watchHistoryLotteryTranfer),
    fork(watchNumberWin),
    fork(watchGetVersion),
    fork(watchRequestHistoryTranfer),
    fork(watchCheckagentId),
    fork(watchCheckContractNumber),
    fork(watcPaymentAeonSagas),
    fork(watchCheckMenuBank),
    fork(watcgetinfoNcclotterySagas),
    fork(watchSearchTransaction),
    fork(watcApprovalTransaction),
    fork(watchCheckNumberCTTID),
    fork(watcGetPromotion),
    fork(watcGetPromotionDetail),
    fork(watchCashOutWordBank),
    fork(buyLotteryNCCSagas),
    fork(watchSecrchHistoryNCC),
    fork(watchSecrchHistoryNCC340),
    fork(watcPackageInsurance),
    fork(watcOptionPackageInsurance),
    fork(watcPaymentInsurance),
    fork(watcListCustomerWordBank),
    fork(CheckAccuontWatterSagas),
    fork(PaymentWatterSagas),
    fork(watchRequestHistoryTranferNew),
    fork(watcProvince),
    fork(watcDistrict),
    fork(watcGetToken),
    fork(watcUploadListCashout),
    fork(watchCheckinfoPayment),
    fork(watchOnSecurity),
    fork(watchCheckByPassPIN),
    fork(watchCheckByPassAmount),
    fork(watchAllConfigAmount),
    fork(watcGetPopupHome),
    fork(watcCheckBlockDeviecSagas),
    fork(watcGetMenuHome),
    fork(watchWebviewBadu),
    fork(watchWebviewMyUnitel),
    fork(watchWebviewBaduGetToken),
    fork(watcGetLinkWeb),
    fork(watcGetMenuLevel2),
  ]
}
