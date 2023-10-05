import React, { Component } from 'react'
import { ScrollView, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import _ from 'lodash'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
//action
import { requestBccs } from '../../actions/Auth'
import { requestTopUp, getPaymentInfo } from '../../actions/TopUp'

// Styles
import styles from './styles'
import { Colors } from '../../themes'
import Reactotron from 'reactotron-react-native'
import {
  HeaderCustom, CustomNavbar, CardView, TelecomServices, ActivityIndicator,
  TransactionHistory, Payment,ValidatePinModal,AlertNative
} from '../../components'
import Spinner from 'react-native-loading-spinner-overlay'
import LinearGradient from 'react-native-linear-gradient'
import I18n from 'react-native-i18n'
import Toast from 'react-native-root-toast'
import {handleResponseCode} from '../../utils/ErrorManager'

class PSTNService extends Component {
  static navigationOptions = ({ navigation }) => {
    // const { params = {} } = navigation.state
    return {
      header: null
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isRequestTopUp: false,
      isRequestBccs: false
    }
  }
  componentWillReceiveProps(nextProps) {
    this.forceUpdate()
    //Reactotron.log('Receipt Props InternetService')
    //Reactotron.log(nextProps)

    if (this.state.isRequestBccs && !nextProps.authFetching) {
      this.setState({ isRequestBccs: false, isLoading: false })
      if (nextProps.bccsData && nextProps.bccsData.error === '00000') {
        if (nextProps.bccsData && nextProps.bccsData.responseCode === '00000') {
          // //Reactotron.log('wwwwwww')
          // let userDescription = RequestField.getValueField(nextProps.bccsData.fieldMap, FIELD.TRANSACTION_DESCRIPTION)
          // let arr = userDescription.split("|")
          // if (arr && arr.length > 2) {
          //   let almostLast = arr[arr.length - 3]
          //   let last = arr[arr.length - 2]
          //   let serviceType = almostLast + last
          //   this.setState({ serviceType })
          //   //Reactotron.log('zzzzzzzzzzzzz')
          //   //Reactotron.log(userDescription)
          // }
          this.ValidatePinModal.onOpen()
        } else {
          //Reactotron.log('zzzzzzzz')
          // alert(I18n.t(`${nextProps.bccsData.responseCode}`))
          if (nextProps.bccsData.responseCode) {
            handleResponseCode(nextProps.bccsData.responseCode);
          } else {
            AlertNative(I18n.t(`systemBusy`))
            // AlertNative('Dit')
          }
  
        }
      } else {
         AlertNative(I18n.t(`systemBusy`))
        // AlertNative(I18n.t('con'))
      }
    }

    if (this.state.isRequestTopUp && !nextProps.isFetching) {
      this.setState({ isRequestTopUp: false, isLoading: false })
      // let responseCode = RequestField.getValueField(nextProps.topUpData.fieldMap, FIELD.RESPONSE_CODE)
      if (nextProps.topUpData && nextProps.topUpData.responseCode === '00000') {
        this.props.navigation.navigate('TransactionResult', { data: nextProps.topUpData.fieldMap, processName: I18n.t(this.state.serviceCode) })
      } else {
        var responseCode = nextProps.topUpData && nextProps.topUpData.responseCode ? nextProps.topUpData.responseCode : '10532'
        // alert(I18n.t(`${responseCode}`))
        if (responseCode) {
          handleResponseCode(responseCode);
        } else {
          AlertNative('me')
        }

        // this.props.navigation.dispatch(NavigationActions.back())
      }
    }
  }

  onSubmit(code) {
    const { infoAccount } = this.props
    const { paymentCode, money, serviceType } = this.state
    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.PAYMENT_CHARGE_TELE_ACCOUNT)) //571000
    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
    RequestField.addToInitField(RequestField.addPaymentCode(paymentCode))
    // RequestField.addToInitField(RequestField.addServiceIndicator(serviceIndicator))
    RequestField.addToInitField(RequestField.addAmount(money))
    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
    RequestField.addToInitField(RequestField.addPin(code))
    RequestField.addToInitField(RequestField.addServiceCode(this.state.serviceCode))
    RequestField.addToInitField(RequestField.addPartnerCode(ConfigCode.VIETTEL))
    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
    let data = RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
    this.setState({ isRequestTopUp: true, isLoading: true })
    this.ValidatePinModal.onClose()
    Toast.show(I18n.t('checkYourPhoneToReplyPin'), {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    })
    //Reactotron.log(`571000-----------------------------`)
    //Reactotron.log(data)
    this.props.requestTopUp(data)


  }

  paymentPress(serviceCode, code, money) {
    Keyboard.dismiss()
    this.setState({ serviceCode, paymentCode: code, money })
    const { infoAccount } = this.props

    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_CHECK_BCCS)) // 311050
    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
    let data = RequestField.addToInitField(RequestField.addCustomerPhone(infoAccount.phoneNumber))
    this.setState({ isRequestBccs: true, isLoading: true })
    //Reactotron.log('311050 =============================')
    //Reactotron.log(data)
    this.props.requestBccs(data)
  }

  render() {
    const { params } = this.props.route
    const item = params ? params.item : null
    // const { money, phone, content, message } = this.state
    return (
        <View
          // start={{ x: 0.0, y: 0.0 }}
          // end={{ x: 1.0, y: 0.0 }}
          // colors={[Colors.startGradientNav, Colors.endGradientNav]}
          style={styles.container}>
          <CustomNavbar hideBackground midTitle txtTitle={'pstnAndleasedLinePayment'} Nav={this.props.navigation} backButton />
          <TelecomServices
            firstTabLabel='PSTN'
            secondTabLabel='leasedLine'
            firstTabTextHeaderRow='fixedPhoneNumber'
            firstTabTextButton='pstnPayment'
            firstTabPlaceHolder='enterThePstnAccountNumberHere'
            secondTabPlaceHolder='enterTheLeasedLineAccountNumberHere'
            secondTabTextButton='leasedLinePaymemt'
            firstTabPress={(value, money) => {Toast('lmao'); this.paymentPress("PSTN", value, money)}}
            secondTabPress={(value, money) => {Toast('lmao'); this.paymentPress("LEASED_LINE", value, money)}}
          />
         
          <ValidatePinModal
            onSubmit={(code) => this.onSubmit(code)}
            ref={ref => { this.ValidatePinModal = ref }}
          />
        </View>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestBccs: (data) => { dispatch(requestBccs(data)) },
    requestTopUp: (data) => { dispatch(requestTopUp(data)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PSTNService)
