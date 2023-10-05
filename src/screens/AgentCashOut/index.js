import React, { Component } from 'react'
import { Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { login } from '../../actions/Auth'
import { agentCashOut } from '../../actions/Request'
import { getAccountInfo } from '../../actions/Transfer'
import styles from './styles'
import { Payment, ActivityIndicator, Notification } from '../../components'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import * as Constant from '../../utils/Constant'
import I18n from 'react-native-i18n'
import _ from 'lodash'
import { handleResponseCode } from '../../utils/ErrorManager'
import { onCallCheckSwich, requestCheckAmount } from '../../actions/ByPassPIN' // By pass PIN / OTP


class CashInScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isAgent: false,
      mDefaultAgentCode: null,
      messageError: null
    }
  }
  componentDidMount() {
    this.onCheckBypassPIN() // By pass PIN / OTP
    const { infoAccount } = this.props;
    if (infoAccount && infoAccount.roleId && infoAccount.roleId === 7) {
      this.setState({ isAgent: false })
    } else {
      this.setState({ isAgent: true })
    }
    if (this.props.route.params != undefined) {
      let qrCodeValue = this.props.route.params.qrCodeValue;
      let qrCodeState = this.props.route.params.qrCodeState;
      if (qrCodeState != null) {
        this.setState({ mDefaultAgentCode: qrCodeValue })
      }
    }
  }
  //remore PIN / OTP
  onCheckBypassPIN() {
    const { infoAccount } = this.props;
    let data = infoAccount.accountId;
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
    const { infoAccount } = this.props;
    const { phone, money, message, saveInfo, isCallCheckSwich, isLoading, byPassPIN, isCheckAmount, toPhone, toAccountId, agentCode, parentCode, toMainAccountID, roleId } = this.state;

    if (this.state.isGetAccountInfoCurrentUser && !nextProps.authFetching) {
      this.setState({ isGetAccountInfoCurrentUser: false, isLoading: false });
      if (nextProps.user && nextProps.user.responseCode) {
        if (nextProps.user && nextProps.user.error === `00000`) {
          if (nextProps.user && nextProps.user.responseCode === '00000') {
            this.onCheckAmount()
          } else {
            if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10118') { // status 3/7
              const status = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ACCOUNT_STATUS);
              switch (status) {
                case 'LOCKED':
                  this.refs.state3.onOpen()
                  break;
                case 'BLOCKED':
                  this.refs.error10118.onOpen()
                  break;
                default:
                  this.refs.NotificationSystemBusy.onOpen()
                  break;
              }
            } else if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10114') {

              this.refs.state2.onOpen()
            } else if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10115') {

              this.refs.state5.onOpen()
            } else if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10116') {
              const phone = RequestField.getValueField(nextProps.user.fieldMap, FIELD.PHONE_NUMBER);
              const status = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ACCOUNT_STATUS);
              if (status) {
                this.refs.state0.onOpen()
              } else {
                this.refs.state1.onOpen()
              }
            } else {
              this.refs.NotificationSystemBusy.onOpen()
            }
          }
        } else {
          this.refs.NotificationSystemBusy.onOpen()
        }
      } else {
        this.refs.failedDueNoResponse.onOpen()
      }
    }

    if (this.state.isGetAccountInfo && !nextProps.transFetching) {
      this.setState({ isGetAccountInfo: false, isLoading: false })
      let repon = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.RESPONSE_CODE)
      let message = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.RESPONSE_DESCRIPTION)

      switch (repon) {
        case '00000':
          if (nextProps.receiver && nextProps.receiver.responseCode === '00000') {
            let toAccountId = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_ID)
            let toName = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.CUSTOMER_NAME)
            let toPhone = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.CUSTOMER_PHONE)
            let agentCode = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.SHOP_CODE)
            let parentCode = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.PARENT_CODE)
            let roleId = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ROLE_ID)
            let toMainAccountID = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.MAIN_ACCOUNT_ID)
            this.setState({ toPhone, message, toAccountId, agentCode, parentCode, toMainAccountID, roleId, toAccountId, toName, toPhone, agentCode })
           
          } else {
            const responseCode = nextProps.receiver.responseCode;
            let agentCode = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.SHOP_CODE)
            let phoneNumber = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.CUSTOMER_PHONE)
            if (agentCode && responseCode === 10116) {
              this.refs.accOrNumberIsNotRegisterUmoney.onOpen()
            } else {
              handleResponseCode(responseCode);

            }
          }
          break;
        case 99999:
          this.refs.responseDescripTion.onOpen()
          this.setState({ messageError: I18n.t('99999') })
          break;
        case repon:
          this.refs.responseDescripTion.onOpen()
          this.setState({ messageError: message })
          break;
        default:
          break;
      }

    }

    //remore PIN / OTP
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
            this.refs.responseMessage.onOpen()
            this.setState({ isCallCheckSwich: false, isLoading: false, responseMessage: 'CALL_CHECK_SWICH_FAILED' })
            break;
          default:
            break;
        }
      } else {
        this.setState({ isCallCheckSwich: false, isLoading: false })
      }
    }

    if (isCheckAmount) {
      if (nextProps.ByPassPinReducer.dataCheckAmount) {
        switch (nextProps.ByPassPinReducer.actionType) {
          case 'CALL_CHECK_AMOUNT_SUCCESS':
            let dataAmount = nextProps.ByPassPinReducer.dataCheckAmount.amountConfigCollection.data[0]
            let moneyCusInput = parseInt(money.replace(/,/g, ""))
            if (roleId.toString() === '15' || roleId.toString() === '28' || roleId === '29') {
              this.setState({ processCode: '033017' })
              this.setState({ toPhone, message, toAccountId, agentCode, parentCode, toMainAccountID })
              // console.log('agentCode:', agentCode)
              this.props.navigation.navigate('TransactionDetail',
                {
                  money: money,
                  toPhone: toPhone,
                  message: message,
                  toAccountId: toAccountId,
                  phone: phone,
                  saveInfo: saveInfo,
                  shopCode: agentCode,
                  onProcess: 'AGENT_TRANSFER_CASH_OUT',
                  selectState: 'AGENT_TRANSFER_CASH_OUT',
                  processName: I18n.t('agentCashOut'),
                  processCode: '033017',
                  serviceCodeFee: '',
                  partnerCodeFee: '',//
                  checkDiscount: true,//
                  byPassPIN: byPassPIN,
                  checkAmount: moneyCusInput <= parseInt(dataAmount.par_value) ? true : false
                })
            } else {
              if ((!this.props.infoAccount.parentCode === parentCode) && (!this.props.infoAccount.parentCode === toMainAccountID)) {
                this.refs.cantCashOutAtAntherNetWorkAgent.onOpen()
              } else {
                this.setState({ processCode: '010005' })
                this.props.navigation.navigate('TransactionDetail',
                  {
                    money: money,
                    toPhone: toPhone,
                    message: message,
                    toAccountId: toAccountId,
                    phone: phone,
                    saveInfo: saveInfo,
                    shopCode: agentCode,
                    onProcess: 'AGENT_TRANSFER_CASH_OUT',
                    selectState: 'AGENT_TRANSFER_CASH_OUT',
                    processName: I18n.t('agentCashOut'),
                    processCode: '010005',
                    serviceCodeFee: '',
                    partnerCodeFee: '',//
                    checkDiscount: true,//
                    byPassPIN: byPassPIN,
                    checkAmount: moneyCusInput <= parseInt(dataAmount.par_value) ? true : false
                  })
              }
            }
            this.setState({ isCheckAmount: false, isLoading: false })
            break;
          case 'CALL_CHECK_AMOUNT_FAILED':
            this.refs.responseMessage.onOpen()
            this.setState({ responseMessage: 'CALL_CHECK_AMOUNT_FAILED', isCheckAmount: false, isLoading: false })
            break;
          default:
            break;
        }
      }
    }

  }

  onPressProcess(phone, money, message, saveInfo) {
    const { infoAccount } = this.props

    if (phone === infoAccount.agentCode) {
      this.refs.CantCashot.onOpen()
      return;
    }
    if (!message) {
      message = `Cash out with mobile app`
    }
    if (phone != this.state.agentCode) {
      this.onCheckAccount(phone, money, message, saveInfo)
    } else {
      this.setState({ phone, money, message, isLoading: true, isGetAccountInfoCurrentUser: true, saveInfo })
      Keyboard.dismiss()
      RequestField.clearInitField();
      RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
      const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO))
      this.props.getAccountInfoCurrentUser(data);
      RequestField.clearInitField();
    }

  }

  state3() {
    this.refs.state3.onClose()
  }
  error10118() {
    this.refs.error10118.onClose()
  }
  onPressSystemBusy() {
    this.refs.NotificationSystemBusy.onClose()
  }
  state2() {
    this.refs.state2.onClose()
  }

  state5() {
    this.refs.state5.onClose()
  }
  failedDueNoResponse() {
    this.refs.failedDueNoResponse.onClose()
  }

  cantCashOutAtAntherNetWorkAgent() {
    this.refs.cantCashOutAtAntherNetWorkAgent.onClose()
  }
  // CantCashot
  CantCashot() {
    this.refs.CantCashot.onClose()
  }
  state0() {
    this.refs.state0.onClose()
  }
  state1() {
    this.refs.state1.onClose()
  }
  accOrNumberIsNotRegisterUmoney() {
    this.refs.accOrNumberIsNotRegisterUmoney.onClose()
  }
  responseDescripTion() {
    this.refs.responseDescripTion.onClose()
  }
  onCheckAccount(phone, money, message, saveInfo) {
    const { infoAccount } = this.props
    if (phone) {
      RequestField.clearInitField()
      RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
      RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
      RequestField.addToInitField(RequestField.addShopCode(phone))
      const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO)) // 311100
      this.setState({ isLoading: true, isGetAccountInfo: true, phone, money, message, saveInfo })
      this.props.getAccountInfo(data)
      RequestField.clearInitField()
    } else {

    }
  }
  render() {
    const { isLoading, isAgent, mDefaultAgentCode, phone, agentCode, messageError, toName } = this.state
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>

        <SafeAreaView style={styles.container}>
          {isLoading ? <ActivityIndicator /> : null}

          <Payment
            AgentCashOut
            firstHeader={isAgent ? 'posCode' : 'agentCode'}
            phonePlaceholder={isAgent ? 'inputThePOSCodeHere' : 'inputTheAgentCodeHere'}
            errorPhoneMessage='agentCodeIncorrect'
            validatePhoneConst={Constant.VALIDATE_AGENT_CODE}
            isPhone
            keyboardTypeInputPhone='number-pad'
            phonePad
            txtInput='thatEmployee'
            placeholder='inputPosCode'
            amountPlaceholder='amount'
            txtAmount='enterAmount'
            maxLengthMoney={13}
            maxLengthCode={8}
            maxLengthPhone={13}
            textButton='agentCashOut'
            processCode='010005'
            onPressProcess={(phone, money, message, saveInfo) => this.onPressProcess(phone, money, message, saveInfo)}
            footerTextInput
            minAmount={3000}
            defaultAgentCode={mDefaultAgentCode}
            opentHistoryPayment={true}
            openCheckBox={true}
            //
            txtName='FullName'
            getAgentCode={agentCode}
            displayName={toName ? toName : null}
            onCheckAccount={(phone) => this.onCheckAccount(phone)} //
            onCheckAccountCashIn={true} //
          />


          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={I18n.t('state3')}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.state3()}
            ref='state3'
          />
          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={I18n.t('error10118')}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.error10118()}
            ref='error10118'
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
            textContent={I18n.t('state2')}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.state2()}
            ref='state2'
          />
          {/* state5 */}
          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={I18n.t('state5')}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.state5()}
            ref='state5'
          />
          {/* failedDueNoResponse */}
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
            textContent={I18n.t('cantCashOutAtAntherNetWorkAgent')}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.cantCashOutAtAntherNetWorkAgent()}
            ref='cantCashOutAtAntherNetWorkAgent'
          />
          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={I18n.t('CantCashot')}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.CantCashot()}
            ref='CantCashot'
          />

          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={I18n.t('state0', { phone: phone })}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.state0()}
            ref='state0'
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
            textContent={I18n.t('accOrNumberIsNotRegisterUmoney', { agentCode: agentCode })}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.accOrNumberIsNotRegisterUmoney()}
            ref='accOrNumberIsNotRegisterUmoney'
          />

          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={messageError}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.responseDescripTion()}
            ref='responseDescripTion'
          />


        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    isFetching: state.cashOut.isFetching,
    agentCashOutData: state.request.agentCashOutData,
    infoAccount: state.auth.infoAccount,
    receiver: state.transfer.receiver,
    transFetching: state.transfer.isFetching,
    authFetching: state.auth.isFetching,
    user: state.auth.user,

    ByPassPinReducer: state.ByPassPinReducer, // By pass PIN / OTP
    dataOnSecurity: state.ByPassPinReducer.dataOnSecurity, // By pass PIN / OTP
    dataCheckSwich: state.ByPassPinReducer.dataCheckSwich, // By pass PIN / OTP
    dataCheckAmount: state.ByPassPinReducer.dataCheckAmount, // By pass PIN / OTP
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    agentCashOut: (data) => { dispatch(agentCashOut(data)) },
    getAccountInfo: (phoneNumber) => { dispatch(getAccountInfo(phoneNumber)) },
    getAccountInfoCurrentUser: (data) => { dispatch(login(data, false)) },
    onCallCheckSwich: (data) => { dispatch(onCallCheckSwich(data)) }, // By pass PIN / OTP
    requestCheckAmount: (data) => { dispatch(requestCheckAmount(data)) }, // By pass PIN / OTP
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CashInScreen)
