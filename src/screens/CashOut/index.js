import React, { Component } from 'react'
import {
  Keyboard, TouchableWithoutFeedback, SafeAreaView
} from 'react-native'
import { connect } from 'react-redux'
import { requestCashOut, searchDirectTransHis } from '../../actions/CashOut'
import styles from './styles'
import Reactotron from 'reactotron-react-native'
import {
  Payment, ActivityIndicator, Notification
} from '../../components'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import I18n from 'react-native-i18n'
import * as ConfigCode from '../../utils/ConfigCode'
import _ from 'lodash'
import { handleResponseCode } from '../../utils/ErrorManager'
import * as Constant from '../../utils/Constant'

class CashOutScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      money: '',
      fromPhone: '',
      toPhone: '',
      message: '',
      onProcess: '',
      processName: '',
      secretCode: '',
      referenceId: '',
      responseMessage: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    this.forceUpdate()
    const { money, message, secretCode, saveInfo } = this.state
    if (this.state.isSearchTransferHis && !nextProps.isFetching) {
      if (nextProps.searchDirTransHisData && nextProps.searchDirTransHisData.responseCode) {
        if (nextProps.searchDirTransHisData && nextProps.searchDirTransHisData.error === '00000') {
          let responseCode = RequestField.getValueField(nextProps.searchDirTransHisData.fieldMap, FIELD.RESPONSE_CODE)
          let responseMessage = RequestField.getValueField(nextProps.searchDirTransHisData.fieldMap, FIELD.RESPONSE_DESCRIPTION)
          // console.log('responseCode', responseCode)
          // console.log('responseMessage', responseMessage)
          switch (responseCode) {
            case '00000':
              let fromPhone = RequestField.getValueField(nextProps.searchDirTransHisData.fieldMap, FIELD.FROM_PHONE)
              let toPhone = RequestField.getValueField(nextProps.searchDirTransHisData.fieldMap, FIELD.TO_PHONE)
              let referenceId = RequestField.getValueField(nextProps.searchDirTransHisData.fieldMap, FIELD.REFERENCE_ID)
              let accountId = RequestField.getValueField(nextProps.searchDirTransHisData.fieldMap, FIELD.ACCOUNT_ID)
              this.setState({ fromPhone, toPhone, referenceId, mAccountID: accountId, isSearchTransferHis: false, isLoading: false });
              this.props.navigation.navigate('TransactionDetail', {
                money: money,
                fromPhone: fromPhone,
                toPhone: toPhone,
                message: message,
                saveInfo: saveInfo,
                secretCode: secretCode,
                referenceId: referenceId,
                onProcess: 'MONEY_AGENT_TRANSFER_CUSTOMER',
                processName: I18n.t('cashOutForCustomer'),
                toAccountId: accountId,
                processCode: ConfigCode.MONEY_AGENT_TRANSFER_CUSTOMER,
                partnerCodeFee: 'MONEY_AGENT_TRANSFER_CUSTOMER',
                selectState: 'MONEY_AGENT_TRANSFER_CUSTOMER',
                checkDiscount: true

              })
              break;
            case 99999:
              this.refs.responseMessage.onOpen()
              this.setState({ responseMessage: I18n.t('10130'), isSearchTransferHis: false, isLoading: false })
              break;
            case responseCode:
              this.refs.responseMessage.onOpen()
              this.setState({ responseMessage: responseMessage, isSearchTransferHis: false, isLoading: false })
              break;

            default:
              break;
          }
        } else {
          if (nextProps.searchDirTransHisData.responseCode) {
            handleResponseCode(nextProps.searchDirTransHisData.responseCode);
          } else {
            this.refs.NotificationSystemBusy.onOpen()
          }
        }
      } else {
        this.refs.failedDueNoResponse.onOpen()
      }

    }
  }

  onPressProcess(phone, secretCode, money, message, saveInfo) {
    const { infoAccount } = this.props
    if (!message) {
      message = 'cash out for customer'
    }
    this.setState({ phone, secretCode, money, message, saveInfo })
    Keyboard.dismiss()

    RequestField.clearInitField();
    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_DIRECT_TRANSFER_HISTORY)) //311111
    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
    RequestField.addToInitField(RequestField.addAmount(money))
    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
    RequestField.addToInitField(RequestField.addSecretSecure(secretCode))
    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
    let data = RequestField.addToInitField(RequestField.addToPhone(phone))
    // console.log('data:', data)
    RequestField.clearInitField();
    data.fieldMap = _.orderBy(data.fieldMap, 'fieldID')
    this.setState({ isSearchTransferHis: true, isLoading: true })
    this.props.searchDirectTransHis(data)

  }

  onSelectedContact(contact) {
    this.refs.PaymentComponent.onSetPhone(contact)
  }


  onOpenContact() {
    this.refs.ModalContact.onOpen();
    this.onSearchContact('');
  }

  transactionIsUnsuccessful() {
    this.refs.transactionIsUnsuccessful.onClose()
  }
  onPressSystemBusy() {
    this.refs.NotificationSystemBusy.onClose()
  }
  failedDueNoResponse() {
    this.refs.failedDueNoResponse.onClose()
  }
  responseMessage() { this.refs.responseMessage.onClose() }

  render() {
    const { isLoading, responseMessage } = this.state
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <SafeAreaView style={styles.container}>
          {isLoading ? <ActivityIndicator /> : null}
          <Payment
            ref='PaymentComponent'
            cashOutScreen
            secretCodeRow
            validatePhoneConst={Constant.VALIDATE_LAOS}
            isPhone
            txtInput='inputReceiverPhoneNumber'
            placeholder='inputThePhoneHere'
            amountPlaceholder='amount'
            txtAmount='enterAmount'
            txtsecretCode='secretCode'
            inputSecretCode='inputSecretCode'
            maxLengthMoney={13}
            maxLengthCode={13}
            footerTextInput
            keyboardType='numeric'
            phonePlaceholder='inputThePhoneHere2'
            phonePad
            contact
            processCode={ConfigCode.MONEY_AGENT_TRANSFER_CUSTOMER}
            textButton='cashOut2'
            onPressProcess={(phone, secretCode, money, message, saveInfo) => this.onPressProcess(phone, secretCode, money, message, saveInfo)}
            onPressContact={() => this.onOpenContact()}
            minAmount={3000}
            opentHistoryPayment={true}
            openCheckBox={true}
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
            textContent={responseMessage}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.responseMessage()}
            ref='responseMessage'
          />

        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    isFetching: state.cashOut.isFetching,
    cashOutData: state.cashOut.cashOutData,
    searchDirTransHisData: state.cashOut.searchDirTransHisData,
    infoAccount: state.auth.infoAccount

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchDirectTransHis: (data) => { dispatch(searchDirectTransHis(data)) },
    requestCashOut: (data) => { dispatch(requestCashOut(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CashOutScreen)
