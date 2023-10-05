import React, { Component } from 'react'
import {
  Keyboard, TouchableWithoutFeedback, SafeAreaView, Alert
} from 'react-native'
import { connect } from 'react-redux'
import { requestCashIn } from '../../actions/CashOut'
import { getAccountInfo } from '../../actions/Transfer'
import styles from './styles'
import {
  Payment,
  ActivityIndicator, Notification
} from '../../components'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import I18n from 'react-native-i18n'
import _ from 'lodash'
import { handleResponseCode } from '../../utils/ErrorManager'
import { onCallCheckSwich, requestCheckAmount } from '../../actions/ByPassPIN'

// import { isValidated } from '../../utils/Validate'
// import * as Constant from '../../utils/Constant'

class CashInScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      AgentCode: '',
      phone: '',
      money: '',
      message: '',
      processName: '',
      agentCode: '',
      getPhone: null,
      errorMessage: '',
      byPassPIN: false,
      statusCheck: false
    }

  }
  componentDidMount() {
    this.onCheckBypassPIN()
    const { params } = this.props.route
    if (params) {
      const phone = params.data
      // console.log('phone0000:', phone)
      this.setState({ getPhone: phone })
    }

  }
  //remore PIN / OTP
  onCheckBypassPIN() {
    const { infoAccount } = this.props;
    let data = infoAccount.accountId;
    console.log('accountId:', data)
    this.props.onCallCheckSwich(data);
    this.setState({ isCallCheckSwich: true, isLoading: true })
  }
  //remore PIN / OTP
  onCheckAmount() {
    let data = 'AMOUNT_BYPASS_PIN_OTP_W2W';
    this.props.requestCheckAmount(data);
    this.setState({ isCheckAmount: true, isLoading: true })
  }

  componentWillReceiveProps(nextProps) {
    this.forceUpdate()
    const { phone, money, message, saveInfo, isCallCheckSwich, isLoading, byPassPIN, isCheckAmount, toAccountId, toName, statusCheck } = this.state
    if (this.state.isGetAccountInfo && !nextProps.transFetching) {
      this.setState({ isGetAccountInfo: false, isLoading: false })
      if (nextProps.receiver && nextProps.receiver.responseCode) {
        if (nextProps.receiver.error === '00000') {
          if (nextProps.receiver.responseCode &&
            (nextProps.receiver.responseCode === '00000'
              || nextProps.receiver.responseCode.toString() === '10114'
              || nextProps.receiver.responseCode.toString() === '10115')) {
            const phoneCus = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.PHONE_NUMBER);
            let toAccountId = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_ID)
            let toName = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.CUSTOMER_NAME)
            this.setState({ toAccountId, toName, phoneCus, statusCheck: true })

          } else if (nextProps.receiver.responseCode && nextProps.receiver.responseCode.toString() === '10118') {
            const status = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_STATUS);
            switch (status) {
              case 'LOCKED':
                let toAccountId = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_ID)
                let toName = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.CUSTOMER_NAME)
                this.setState({ toAccountId, toName, errorMessage: 'My Account Locked' })
                this.refs.errorMessage.onOpen()
                break;
              case 'BLOCKED':
                this.refs.state7.onOpen()
                break;
              default:
                this.refs.NotificationSystemBusy.onOpen()
                break;
            }
          } else if (nextProps.receiver.responseCode && nextProps.receiver.responseCode.toString() === '10116') {
            const phone = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.PHONE_NUMBER);
            const status = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_STATUS);
            if (status) {
              let toAccountId = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_ID)
              let toName = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.CUSTOMER_NAME)
              this.setState({ toAccountId, toName, errorMessage: 'My Account Locked' })
              this.refs.errorMessage.onOpen()
            } else {
              this.refs.state1.onOpen()
            }
          } else {

            if (nextProps.receiver && nextProps.receiver.responseDescription) {
              this.refs.transactionIsUnsuccessful.onOpen()
            } else {
              if (nextProps.receiver.responseCode) {
                if (nextProps.receiver.responseCode === '10835') {
                  this.refs.transactionIsUnsuccessful.onOpen()
                } else if (nextProps.receiver.responseCode === 10116) {
                  let agentCode = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.SHOP_CODE);
                  this.setState({ agentCode: agentCode })
                  this.refs.accOrNumberIsNotRegisterUmoney.onOpen()
                } else {
                  handleResponseCode(nextProps.receiver.responseCode);
                }
              } else {
                this.refs.NotificationSystemBusy.onOpen()
              }
            }
          }
        } else {
          if (nextProps.receiver.responseCode) {
            handleResponseCode(nextProps.receiver.responseCode);
          } else {
            this.refs.NotificationSystemBusy.onOpen()
          }
        }
      } else {
        this.refs.failedDueNoResponse.onOpen()
      }
    }

    if (isCallCheckSwich && isLoading) {
      if (nextProps.ByPassPinReducer.dataCheckSwich) {
        switch (nextProps.ByPassPinReducer.actionType) {
          case 'CALL_CHECK_SWICH_SUCCESS':
            let d = nextProps.ByPassPinReducer.dataCheckSwich.bypassConfigCollection
            try {
              let strData = d.data[0]
              if (strData) {
                let data = nextProps.ByPassPinReducer.dataCheckSwich.bypassConfigCollection.data[0]
                this.setState({ byPassPIN: data.status == 1 ? true : false, isCallCheckSwich: false, isLoading: false })
              } else {
                this.setState({ byPassPIN: true, isCallCheckSwich: false, isLoading: false })
              }

            } catch (error) {
              this.setState({ byPassPIN: true, isCallCheckSwich: false, isLoading: false })
            }
            break;
          case 'CALL_CHECK_SWICH_FAILED':
            this.refs.errorMessage.onOpen()
            this.setState({ isCallCheckSwich: false, isLoading: false, errorMessage: 'CALL_CHECK_SWICH_FAILED' })
            break;
          default:
            break;
        }
      } else {
        this.setState({ isCallCheckSwich: false, isLoading: false })
      }
    }

    if (isCheckAmount && isLoading) {
      // console.log('nextProps.ByPassPinReducer:', nextProps.ByPassPinReducer)
      if (nextProps.ByPassPinReducer.dataCheckAmount) {
        switch (nextProps.ByPassPinReducer.actionType) {
          case 'CALL_CHECK_AMOUNT_SUCCESS':
            let dataAmount = nextProps.ByPassPinReducer.dataCheckAmount.amountConfigCollection.data[0]
            let moneyCusInput = parseInt(money.replace(/,/g, ""))
            this.props.navigation.navigate('TransactionDetail',
              {
                money: money,  //money
                phone: phone,
                message: message ? message : 'Agent cash in for customer',
                toAccountId: toAccountId,
                toName: toName,
                saveInfo: saveInfo,
                selectState: 'TRANFER_EWALLET',
                onProcess: 'TRANFER_EWALLET',
                processName: I18n.t('cashIn'),
                processCode: ConfigCode.TRANSFER_E2E,
                checkDiscount: true,
                byPassPIN: byPassPIN,
                checkAmount: moneyCusInput <= parseInt(dataAmount.par_value) ? true : false

              })
            this.setState({ isLoading: false, isCheckAmount: false })
            break;
          case 'CALL_CHECK_AMOUNT_FAILED':
            this.refs.errorMessage.onOpen()
            this.setState({ errorMessage: 'CALL_CHECK_AMOUNT_FAILED', isCheckAmount: false, isLoading: false })
            break;
          default:
            break;
        }
      }
    }


    if (this.state.isGetAccountInfoTowTime && !nextProps.transFetching) {
      this.setState({ isGetAccountInfoTowTime: false, isLoading: false })
      if (nextProps.receiver && nextProps.receiver.responseCode) {
        if (nextProps.receiver.error === '00000') {
          if (nextProps.receiver.responseCode && nextProps.receiver.responseCode === '00000') {
            const phoneCus = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.PHONE_NUMBER);
            let toAccountId = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_ID)
            let toName = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.CUSTOMER_NAME)
            this.setState({ toAccountId, toName, phoneCus, statusCheck: true })
            this.onCheckAmount()
          }else{
            this.refs.errorMessage.onOpen()
            this.setState({ errorMessage: 'Phone is not regiter u-money' })
          }
        } else {
          this.refs.NotificationSystemBusy.onOpen()
        }
      }
    }
  }

  onSelectedContact(contact) {
    this.refs.PaymentComponent.onSetPhone(contact)
  }
  onPressProcess(phone, money, message, saveInfo) {
    if (phone) {
      RequestField.addToInitField(RequestField.addPhone(phone))
      const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO))
      this.setState({ isLoading: true, isGetAccountInfoTowTime: true, phone, money, message, saveInfo })
      this.props.getAccountInfo(data)
    } else {
      this.refs.errorMessage.onOpen()
      this.setState({ errorMessage: 'Phone is null' })
    }


    // const { statusCheck } = this.state
    // console.log('statusCheck:', statusCheck)
    // if (!statusCheck) {
    //   this.onCheckAccount(phone)
    //   this.setState({ phone, money, message, saveInfo })
    // } else {
    //   this.onCheckAmount()
    //   this.setState({ phone, money, message, saveInfo })
    // }
  }
  onOpenContact() {
    this.refs.ModalContact.onOpen();
    this.onSearchContact('');
  }
  errorMessage() { this.refs.errorMessage.onClose() }
  state7() {
    this.refs.state7.onClose()
  }
  onPressSystemBusy() {
    this.refs.NotificationSystemBusy.onClose()
  }
  failedDueNoResponse() {
    this.refs.failedDueNoResponse.onClose()
  }
  state1() {
    this.refs.state1.onClose()
  }
  transactionIsUnsuccessful() {
    this.refs.transactionIsUnsuccessful.onClose()
  }
  onPressPinActive() {
    this.refs.NotificationPinActive.onClose()
  }
  accOrNumberIsNotRegisterUmoney() {
    this.refs.accOrNumberIsNotRegisterUmoney.onClose()
  }

  ErrorcashInData() {
    this.refs.ErrorcashInData.onClose()
  }
  onCheckAccount(phone) {
    if (phone) {
      RequestField.addToInitField(RequestField.addPhone(phone))
      const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO))
      this.setState({ isLoading: true, isGetAccountInfo: true })
      this.props.getAccountInfo(data)
    } else {
      this.refs.errorMessage.onOpen()
      this.setState({ errorMessage: 'Phone is null' })
    }

  }

  checkinfo() { }
  render() {
    const { isLoading, contacts, phone, agentCode, cashInData, getPhone, errorMessage, toName, phoneCus } = this.state
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <SafeAreaView style={styles.container}>
          {isLoading ? <ActivityIndicator /> : null}
          <Payment
            ref='PaymentComponent'
            firstHeader='phoneNumberForCashin'
            CashInScreen
            isPhone
            txtInput='inputReceiverPhoneNumber'
            placeholder='inputThePhoneHere'
            amountPlaceholder='amount'
            txtAmount='enterAmount'
            txtName='FullName'
            maxLengthMoney={13}
            maxLengthCode={13}
            keyboardType='numeric'
            phonePad
            contact
            checkinfo={() => this.checkinfo()}
            getPhoneQR={getPhone}
            textButton='cashIn'
            processCode={ConfigCode.MONEY_AGENT_CHARGE_CUSTOMER}
            onPressProcess={(phone, money, message, saveInfo) => this.onPressProcess(phone, money, message, saveInfo)}
            footerTextInput
            onPressContact={() => this.onOpenContact()}
            minAmount={3000}
            opentHistoryPayment={true}
            openCheckBox={true}
            //
            getAgentCode={phoneCus}
            displayName={toName ? toName : null}
            onCheckAccount={(phone) => this.onCheckAccount(phone)} //
            onCheckAccountCashIn={true} //
          />



          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={I18n.t('state7')}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.state7()}
            ref='state7'
          />
          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={errorMessage}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.errorMessage()}
            ref='errorMessage'
          />

          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={I18n.t('systemBusy')}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.onPressSystemBusy()}
            ref='NotificationSystemBusy'
          />
          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={I18n.t('failedDueNoResponse')}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.failedDueNoResponse()}
            ref='failedDueNoResponse'
          />
          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={I18n.t('state-1', { phone: phone })}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.state1()}
            ref='state1'
          />
          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={I18n.t('transactionIsUnsuccessful')}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.transactionIsUnsuccessful()}
            ref='transactionIsUnsuccessful'
          />

          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={I18n.t('11101')}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.onPressPinActive()}
            ref='NotificationPinActive'
          />
          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={I18n.t('accOrNumberIsNotRegisterUmoney', { agentCode: agentCode })}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.accOrNumberIsNotRegisterUmoney()}
            ref='accOrNumberIsNotRegisterUmoney'
          />
         
          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={cashInData}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.ErrorcashInData()}
            ref='ErrorcashInData'
          />



        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    isFetching: state.cashOut.isFetching,
    cashInData: state.cashOut.cashInData,
    infoAccount: state.auth.infoAccount,
    receiver: state.transfer.receiver,
    transFetching: state.transfer.isFetching,

    ByPassPinReducer: state.ByPassPinReducer,
    dataOnSecurity: state.ByPassPinReducer.dataOnSecurity,
    dataCheckSwich: state.ByPassPinReducer.dataCheckSwich,
    dataCheckAmount: state.ByPassPinReducer.dataCheckAmount,
 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestCashIn: (data) => { dispatch(requestCashIn(data)) },
    getAccountInfo: (phoneNumber) => { dispatch(getAccountInfo(phoneNumber)) },
    onCallCheckSwich: (data) => { dispatch(onCallCheckSwich(data)) },
    requestCheckAmount: (data) => { dispatch(requestCheckAmount(data)) },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CashInScreen)
