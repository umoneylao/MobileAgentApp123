import React, { Component } from 'react'
import { ScrollView, Text, View, Keyboard, TouchableWithoutFeedback, Linking, TouchableOpacity, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import { requestBccs, login } from '../../actions/Auth'
import styles from './styles'
import {ActivityIndicator, Payment, AlertNative
} from '../../components'
import I18n from 'react-native-i18n'
import { handleResponseCode } from '../../utils/ErrorManager'
import { VALIDATE_NUMERIC } from '../../utils/Constant';

class InternetService extends Component {
  footerTabDetail() {
    return (
      <ScrollView style={styles.footerScroll} maxHeight='50%'>
        <View>
          <Text style={styles.txtMoreInfo}>{I18n.t('youCanPayWithoutGoToPaymentPoints')}</Text>
          <TouchableOpacity onPress={() => this.goToURL()} >
            <Text style={[styles.txtMoreInfo, { color: 'blue' }]}>{I18n.t('moreInfoVisit')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }

  goToURL() {
    let url = 'https://unitel.com.la/u-money'
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI');
      }
    });
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      onProcess: '',
      processName: '',
    }
  }
  componentWillReceiveProps(nextProps) {
    this.forceUpdate()
    const { infoAccount } = nextProps
    const { serviceCode, paymentCode, money, serviceName } = this.state

    if (this.state.isGetAccountInfoCurrentUser && !nextProps.authFetching) {
      this.setState({ isGetAccountInfoCurrentUser: false, isLoading: false });
      if (nextProps.user && nextProps.user.responseCode) {
        if (nextProps.user && nextProps.user.error === `00000`) {
          if (nextProps.user && nextProps.user.responseCode === '00000') {
            RequestField.clearInitField()
            RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_CHECK_BCCS)) // 311050
            RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
            let data = RequestField.addToInitField(RequestField.addCustomerPhone(infoAccount.phoneNumber))
            this.setState({ isRequestBccs: true, isLoading: true })
            this.props.requestBccs(data)
            RequestField.clearInitField()
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

    if (this.state.isRequestBccs && !nextProps.authFetching) {
      this.setState({ isRequestBccs: false, isLoading: false })
      if (nextProps.bccsData && nextProps.bccsData.error) {
        if (nextProps.bccsData && nextProps.bccsData.error === '00000') {
          if (nextProps.bccsData && nextProps.bccsData.responseCode === '00000') {

            this.props.navigation.navigate('TransactionDetail', { money: money, paymentCode: paymentCode, onProcess: 'PAYMENT_PSTNH', processName: I18n.t('pstnPayment') })
          } else {
            if (nextProps.bccsData && nextProps.bccsData.responseDescription) {
              AlertNative(I18n.t('transactionIsUnsuccessful'))
            } else {
              if (nextProps.bccsData.responseCode) {
                handleResponseCode(nextProps.bccsData.responseCode);
              } else {
                AlertNative(I18n.t(`systemBusy`))
              }
            }
          }
        } else {
          AlertNative("", I18n.t('systemBusy'))
        }
      } else {
        AlertNative(I18n.t(`failedDueNoResponse`))
      }
    }

    if (this.state.isRequestTopUp && !nextProps.isFetching) {
      this.setState({ isRequestTopUp: false, isLoading: false })
      if (nextProps.topUpData && nextProps.topUpData.responseCode) {
        if (nextProps.topUpData && nextProps.topUpData.responseCode === '00000') {
          this.props.navigation.navigate('TransactionResult', { data: nextProps.topUpData.fieldMap, processName: I18n.t(this.state.serviceCode), isUnitelService: true, notify: this.state.serviceName })
        } else {
          var responseCode = nextProps.topUpData && nextProps.topUpData.responseCode ? nextProps.topUpData.responseCode : '10532'
          if (responseCode) {
            handleResponseCode(nextProps.topUpData.responseCode);
          } else {
            if (nextProps.topUpData && nextProps.topUpData.responseDescription) {
              AlertNative(I18n.t('transactionIsUnsuccessful'))
            } else {
              AlertNative(I18n.t(`systemBusy`))
            }
          }
        }
      } else {
        AlertNative(I18n.t(`failedDueNoResponse`));
      }
    }
  }
  paymentPress(serviceCode, code, money, serviceName) {
    const { infoAccount } = this.props;
    Keyboard.dismiss()
    this.setState({ serviceCode, paymentCode: code, money, serviceName, isLoading: true, isGetAccountInfoCurrentUser: true })
    RequestField.clearInitField();
    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
    const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO))
    this.props.getAccountInfoCurrentUser(data);
    RequestField.clearInitField();
  }
  render() {
    const { params } = this.props.route
    const item = params ? params.item : null
    const { isLoading } = this.state
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <SafeAreaView style={styles.container}>
          {isLoading ? <ActivityIndicator /> : null}
          <Payment
            TelecomServiceScreen
            tabLabel={I18n.t('PSTN')}
            txtInput='fixedPhoneNumber'
            placeholder='enterThePstnAccountNumberHere'
            amountPlaceholder='amount'
            txtAmount ='enterAmount'
            phonePlaceholder='enterThePstnAccountNumberHere'
            firstHeader='fixedPhoneNumber'
            validateAccountConst={VALIDATE_NUMERIC}
            onPressProcess={(value, money) => this.paymentPress("PSTN", value, money, "yourPSTNHasDoneSuccessfully")}
            errorPhoneMessage='incorrectPSTNNumber'
            textButton='pstnPayment'
            isPhone
            maxLengthCode={8}
            maxLengthPhone={9}
            footerScrollDetail={() => this.footerTabDetail()}
            minAmount={3000}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.topUp.isFetching,
    topUpData: state.topUp.topUpData,
    paymentInfo: state.topUp.paymentInfo,
    infoAccount: state.auth.infoAccount,
    bccsData: state.auth.bccsData,
    authFetching: state.auth.isFetching,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestBccs: (data) => { dispatch(requestBccs(data)) },
    getAccountInfoCurrentUser: (data) => { dispatch(login(data, false)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InternetService)


