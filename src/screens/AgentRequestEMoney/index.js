import React, { Component } from 'react'
import { Keyboard, TouchableWithoutFeedback, Platform, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { login } from '../../actions/Auth'
import styles from './styles'
import { Payment, ActivityIndicator, Notification } from '../../components'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import * as Constant from '../../utils/Constant'
import I18n from 'react-native-i18n'
import _ from 'lodash'
class AgentRequestEMoney extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentWillReceiveProps(nextProps) {
    this.forceUpdate()
    const { bankCode, bankTransId, money, message, saveInfo } = this.state
    const { infoAccount } = nextProps

    if (this.state.isGetAccountInfoCurrentUser && !nextProps.authFetching) {
      this.setState({ isGetAccountInfoCurrentUser: false, isLoading: false });
      if (nextProps.user && nextProps.user.responseCode) {
        if (nextProps.user && nextProps.user.error === `00000`) {
          if (nextProps.user && nextProps.user.responseCode === '00000') {
            this.props.navigation.navigate('TransactionDetail',
              {
                bankCode: bankCode,
                bankTransId: bankTransId,
                message: message,
                money: money,
                onProcess: 'AGENT_REQUEST_EMONEY',
                processName: I18n.t('requestToFund'),
                saveInfo: saveInfo,
                toAccountId: infoAccount.accountId,
                processCode: ConfigCode.AGENT_REQUEST_EMONEY,
                serviceCodeFee: '',
                partnerCodeFee: 'AGENT_REQUEST_EMONEY',
                selectState: 'AGENT_REQUEST_EMONEY',
                checkDiscount: true

              })

          } else {
            if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10118') { // status 3/7
              const status = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ACCOUNT_STATUS);
              switch (status) {
                case 'LOCKED':
                  this.refs.state3.onOpen()
                  break;
                case 'BLOCKED':
                  this.refs.state7.onOpen()
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
  }

  onPressProcess(bankCode, bankTransId, money, message, saveInfo) {
    const { infoAccount } = this.props
    if (!message) {
      message = `Request E-money with Code: ${bankTransId} at ${bankCode} bank`
    }
    this.setState({ bankCode, bankTransId, money, message, ding: true, isGetAccountInfoCurrentUser: true, saveInfo })
    Keyboard.dismiss()
    RequestField.clearInitField();
    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
    const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO))
    this.props.getAccountInfoCurrentUser(data);
    RequestField.clearInitField();
  }
  state3() {
    this.refs.state3.onClose()
  }
  state7() {
    this.refs.state7.onClose()
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
  state0() {
    this.refs.state0.onClose()
  }
  state1() {
    this.refs.state1.onClose()
  }
  failedDueNoResponse() {
    this.refs.failedDueNoResponse.onClose()
  }
  transactionIsUnsuccessful() {
    this.refs.transactionIsUnsuccessful.onClose()
  }
  bankCodeDoesNotExist() {
    this.refs.bankCodeDoesNotExist.onClose()
  }
  render() {
    const { isLoading, phone, bankCode } = this.state
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <SafeAreaView style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 65 : 0}
          enabled>
          {isLoading ? <ActivityIndicator /> : null}
          <Payment
            AgentRequestEMoneyScreen
            firstHeader='bankCode'
            secretCodeRow
            labelSecret='bankTransactionId'
            phonePlaceholder={'enterTheBankCodeHere'}
            errorPhoneMessage='bankCodeNull'
            inputSecretCode='typeTheBankTransactionId'
            validateSecretConst={Constant.VALIDATE_BANK_TRANS_ID}
            keyboardTypeInputPhone='default'
            validatePhoneConst={Constant.VALIDATE_BANK_CODE}
            errorSecretMessage='bankTransactionIdIncorrect'
            isPhone
            txtsecretCode='bankTransactionId'
            txtInput='bankCode'
            placeholder='enterTheBankCodeHere'
            amountPlaceholder='amount'
            txtAmount='enterAmount'
            maxLengthMoney={13}
            maxLengthCode={6}
            keyboardType='numeric'
            phonePad
            processCode={ConfigCode.AGENT_REQUEST_EMONEY}
            maxLengthPhone={6}
            textButton='confirm'
            onPressProcess={(phone, secretCode, money, message, saveInfo) => this.onPressProcess(phone, secretCode, money, message, saveInfo)}
            footerTextInput
            minAmount={3000}
            opentHistoryPayment={true}
            openCheckBox={true}
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
          {/* state7 */}
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
            textContent={I18n.t('systemBusy')}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.onPressSystemBusy()}
            ref='NotificationSystemBusy'
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
          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={I18n.t('state2')}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.state2()}
            ref='state2'
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
          {/* bankCodeDoesNotExist */}
          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={I18n.t('bankCodeDoesNotExist', { bank_code: bankCode })}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.bankCodeDoesNotExist()}
            ref='state1'
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
          {/* transactionIsUnsuccessful */}
          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={I18n.t('transactionIsUnsuccessful')}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.transactionIsUnsuccessful()}
            ref='transactionIsUnsuccessful'
          />

        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    isFetching: state.request.isFetching,
    agentReqEMoneyData: state.request.agentReqEMoneyData,
    infoAccount: state.auth.infoAccount,
    authFetching: state.auth.isFetching,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAccountInfoCurrentUser: (data) => { dispatch(login(data, false)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentRequestEMoney)
