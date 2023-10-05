import React, { Component } from 'react'
import {
  View, Keyboard, TouchableWithoutFeedback,
  Platform, SafeAreaView
} from 'react-native'
import { connect } from 'react-redux'
import { login } from '../../actions/Auth'
import styles from './styles'
import { Payment, ActivityIndicator, AlertNative } from '../../components'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import * as Constant from '../../utils/Constant'
import I18n from 'react-native-i18n'
import _ from 'lodash'

class RequestCash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.forceUpdate()
    const { infoAccount } = this.props
    const { bankCode, money, message, saveInfo } = this.state
    if (this.state.isGetAccountInfoCurrentUser && !nextProps.authFetching) {
      this.setState({ isGetAccountInfoCurrentUser: false, isLoading: false });
      if (nextProps.user && nextProps.user.responseCode) {
        if (nextProps.user && nextProps.user.error === `00000`) {
          if (nextProps.user && nextProps.user.responseCode === '00000') {
            this.props.navigation.navigate('TransactionDetail',
              {
                bankCode: bankCode,
                message: message,
                money: money,
                onProcess: 'AGENT_REQUEST_BANK_MONEY',
                processName: I18n.t('requestCash'),
                saveInfo: saveInfo,
                toAccountId: infoAccount.accountId,
                processCode: ConfigCode.AGENT_REQUEST_BANK_MONEY,
                serviceCodeFee: '',
                partnerCodeFee: 'AGENT_REQUEST_BANK_MONEY',
                selectState: 'AGENT_REQUEST_BANK_MONEY',
                checkDiscount: true

              })
          } else {
            if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10118') { // status 3/7
              const status = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ACCOUNT_STATUS);
              switch (status) {
                case 'LOCKED':
                  AlertNative(I18n.t('state3'));
                  break;
                case 'BLOCKED':
                  AlertNative(I18n.t('state7'));
                  break;
                default:
                  AlertNative(I18n.t(`systemBusy`));
                  break;
              }
            } else if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10114') {
              AlertNative(I18n.t('state2'));
            } else if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10115') {
              AlertNative(I18n.t('state5'));
            } else if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10116') {
              const phone = RequestField.getValueField(nextProps.user.fieldMap, FIELD.PHONE_NUMBER);
              const status = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ACCOUNT_STATUS);
              if (status) {
                AlertNative(I18n.t('state0', { phone: phone }));
              } else {
                AlertNative(I18n.t('state-1', { phone: phone }));
              }
            } else {
              AlertNative(I18n.t(`systemBusy`))
            }
          }
        } else {
          AlertNative(I18n.t(`systemBusy`))
        }
      } else {
        AlertNative(I18n.t('failedDueNoResponse'))
      }
    }
  }

  onPressProcess(bankCode, money, message, saveInfo) {
    const { infoAccount } = this.props
    if (!message) {
      message = `Agent ${infoAccount.accountId} Request Cash at  ${bankCode.toString().toUpperCase()} bank`
    }
    this.setState({ bankCode, money, message, isLoading: true, isGetAccountInfoCurrentUser: true, saveInfo })
    Keyboard.dismiss()
    RequestField.clearInitField();
    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
    const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO))
    this.props.getAccountInfoCurrentUser(data);
    RequestField.clearInitField();
  }


  render() {
    const { isLoading } = this.state
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>

        <SafeAreaView style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 65 : 0}
          enabled>
          <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> : null}
            <Payment
              RequestCash
              firstHeader='bankCode'
              errorPhoneMessage='bankCodeNull'
              validatePhoneConst={Constant.VALIDATE_BANK_CODE}
              isPhone
              txtInput='bankCode'
              placeholder='enterTheBankCodeHere'
              amountPlaceholder='amount'
              txtAmount='enterAmount'
              maxLengthMoney={13}
              maxLengthCode={6}
              phonePlaceholder={'enterTheBankCodeHere'}
              secretPlaceholder='typeTheBankTransactionId'
              validateSecretConst={Constant.VALIDATE_NORMAL_CHAR}
              keyboardTypeInputPhone='default'
              phonePad
              maxLengthPhone={6}
              textButton='requestCashinBank'
              onPressProcess={(phone, money, message, saveInfo) => this.onPressProcess(phone, money, message, saveInfo)}
              footerTextInput
              minAmount={3000}
              opentHistoryPayment={true}
              openCheckBox={true}
              processCode={ConfigCode.AGENT_REQUEST_BANK_MONEY}
            />

          </View>

        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    isFetching: state.request.isFetching,
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

export default connect(mapStateToProps, mapDispatchToProps)(RequestCash)
