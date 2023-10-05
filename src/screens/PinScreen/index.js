import React, { Component } from 'react';
import {
  View, StyleSheet, Platform, Image, Keyboard, TouchableWithoutFeedback, SafeAreaView
} from 'react-native';
import { CustomNavbar } from '../../components'
import { Images, Colors, Metrics } from '../../themes'
import { FullButton, ActivityIndicator, FullTextInput, Notification } from '../../components'
import I18n from 'react-native-i18n'
import * as Constant from '../../utils/Constant'
import { connect } from 'react-redux'
import { isValidated } from '../../utils/Validate'
import * as RequestField from '../../utils/RequestField'
import { validatePin, setLoggedIn } from '../../actions/Auth'
import * as FIELD from '../../utils/CoreFieldMap'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ConfigCode from '../../utils/ConfigCode'
import { requestOTP } from '../../actions/Bank'


class Code extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      infoAccount: '',
      pinCode: null,
      errorPin: null,
      isRequestPin: false,
      isLoading: false,
      setModalVisible: false,
      reqOtp: false
    };
  }
  componentDidMount() {
    let key = this.props.route.params.key;
    let infoAccount = this.props.route.params.infoAccount;
    let Tin = this.props.route.params.Tin;
    let deviceInfo = this.props.route.params.deviceJSON;
    let effectTyle = this.props.route.params.effectTyle;
    let uniqueId = this.props.route.params.getUniqueId;
    

    if (infoAccount != null && key != null && Tin != null) {
      this.setState({
        key: key,
        infoAccount: infoAccount,
        Tin: Tin,
        deviceInfo: deviceInfo,
        effectTyle: effectTyle,
        uniqueId: uniqueId
      })
    } else {
      alert('data is null')
    }
  }
  onPressOpenFlat() {
    const { key } = this.state
    this.props.navigation.navigate('LanguageScreen', { key: key })
  }
  onChangPin(text) {
    const errorPin = !text || text.length < 6 || text.length > 8 ||
      !isValidated(text, Constant.VALIDATE_NUMERIC) ? I18n.t('accept6DigitsOnly') : null
    this.setState({ pinCode: text, errorPin })

  }
  onSignIn() {
    Keyboard.dismiss()
    const { infoAccount, key, pinCode, deviceInfo, reqOtp, effectTyle, uniqueId } = this.state
    console.log('reqOtp screen:', reqOtp)
    console.log('effectTyle:', effectTyle)
    if (reqOtp || effectTyle > 0) {
      let _phoneNumber = RequestField.getValueField(infoAccount.fieldMap, FIELD.PHONE_NUMBER)
      this.props.navigation.navigate('VerifyOTP', { phone: _phoneNumber, pin: pinCode, deviceInfo: deviceInfo, statusReqOTP: true, uniqueId: uniqueId })
    } else {
      if (infoAccount != '' && key != '') {
        let pan = RequestField.getValueField(infoAccount.fieldMap, FIELD.PAN)
        let phoneNumber = RequestField.getValueField(infoAccount.fieldMap, FIELD.PHONE_NUMBER)
        let roleId = RequestField.getValueField(infoAccount.fieldMap, FIELD.ROLE_ID)
        let accountId = RequestField.getValueField(infoAccount.fieldMap, FIELD.ACCOUNT_ID)
        let Language = RequestField.getValueField(infoAccount.fieldMap, FIELD.LANGUAGE)

        RequestField.addToInitField(RequestField.addPhone(phoneNumber))
        RequestField.addToInitField(RequestField.addProcessCode('000004'))
        RequestField.addToInitField(RequestField.addPin(pinCode))
        RequestField.addToInitField(RequestField.addTransDes(false))
        RequestField.addToInitField(RequestField.addRoleId(roleId))
        RequestField.addToInitField(RequestField.addPan(pan))
        RequestField.addToInitField(RequestField.addLanguage(Language))
        RequestField.addToInitField(RequestField.addLanguage(Language))
        RequestField.addToInitField(RequestField.addFromName(uniqueId)) //108
        var data = RequestField.addToInitField(RequestField.addAccountID(accountId))
        this.setState({ isLoading: true, isRequestPin: true })
        this.props.validatePin(data)
        RequestField.clearInitField()
      }
      else {
        alert('info null')
      }
    }
  }
  onCallOTP(_phoneNumber) {
    console.log('0000000000000')
    const { pinCode, infoAccount, deviceInfo } = this.state
    let phoneNumber = RequestField.getValueField(infoAccount.fieldMap, FIELD.PHONE_NUMBER)
    let pan = RequestField.getValueField(infoAccount.fieldMap, FIELD.PAN)
    let Language = RequestField.getValueField(infoAccount.fieldMap, FIELD.LANGUAGE)
    RequestField.clearInitField()
    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3
    RequestField.addToInitField(RequestField.addPhone(phoneNumber))//34
    RequestField.addToInitField(RequestField.addPan(pan))//2
    RequestField.addToInitField(RequestField.addPin(pinCode))//52
    RequestField.addToInitField(RequestField.addServiceCode('CHECK_BLOCK_DEVIEC'))//41
    RequestField.addToInitField(RequestField.addActionNode('1')) //22
    let data = RequestField.addToInitField(RequestField.addLanguage(Language))//113
    // console.log('data:', data)
    this.setState({ isRequestOTP: true, isLoading: true, _phoneNumber, deviceInfo })
    this.props.requestOTP(data)
    RequestField.clearInitField()
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log('nextProps.validateData.fieldMap:', nextProps.validateData.fieldMap)
    const { isRequestPin, isLoading, Tin, _phoneNumber, pinCode, deviceInfo, uniqueId } = this.state
    if (isRequestPin && isLoading) {
      this.setState({ isRequestPin: false, isLoading: false })
      if (nextProps.validateData && nextProps.validateData.error === '00000') {
        let responseCode = RequestField.getValueField(nextProps.validateData.fieldMap, FIELD.RESPONSE_CODE)
        let mess = RequestField.getValueField(nextProps.validateData.fieldMap, FIELD.RESPONSE_DESCRIPTION)
        let _phoneNumber = RequestField.getValueField(nextProps.validateData.fieldMap, FIELD.PHONE_NUMBER)
        let accountStatus = RequestField.getValueField(nextProps.validateData.fieldMap, FIELD.ACCOUNT_STATUS)
        console.log('accountStatus:', accountStatus)
        console.log('responseCode:', responseCode)
        switch (responseCode) {
          case '00000':
            switch (accountStatus) {
              case 1:
                console.log('Tin:----PIN-----', Tin)
                if (Tin === 1) {
                  this.props.setLoggedIn()
                  this.onGetdatainfo(_phoneNumber)
                } else if (Tin === 0) {
                  console.log('----onCallOTP-----')
                  this.onCallOTP(_phoneNumber)
                }
                // this.props.setLoggedIn()
                // this.onGetdatainfo(_phoneNumber)
                break;
              case 2:
                this.refs.message.onOpen()
                this.setState({ alertMessage: I18n.t('INVALID_PIN') })
                break;
              case 3:
                this.refs.message.onOpen()
                this.setState({ alertMessage: I18n.t('LOCKED') })
                break;
              case 4:
                this.refs.message.onOpen()
                this.setState({ alertMessage: I18n.t('RESETPIN') })
                break;
              case 5:
                this.refs.message.onOpen()
                this.setState({ alertMessage: I18n.t('BLOCKED') })
                break;
              case 6:
                this.refs.message.onOpen()
                this.setState({ alertMessage: I18n.t('BLOCKED') })
                break;
              case 7:
                this.refs.message.onOpen()
                this.setState({ alertMessage: I18n.t('BLOCKED') })
                break;
              case '-1':
                this.refs.message.onOpen()
                this.setState({ alertMessage: I18n.t('CANCELED') })
                break;
              default:
                break;
            }

            break;
          case 10155:
            this.refs.message.onOpen()
            this.setState({ alertMessage: I18n.t('10155'), reqOtp: true })
            break;
          case 10011:
            this.refs.message.onOpen()
            this.setState({ alertMessage: I18n.t('10156') })
            break;
          case 10012:
            this.refs.message.onOpen()
            this.setState({ alertMessage: I18n.t('10012') })
            break;
          case responseCode:
            this.refs.message.onOpen()
            this.setState({ alertMessage: mess })
            break;

          default:
            break;
        }
      } else {
        this.refs.failedDueNoResponse.onOpen()
      }
    }
    if (this.state.isRequestOTP && this.state.isLoading) {
      switch (nextProps.BankReducer.actionType) {
        case "GET_OTP_BANK_SUCCESS":
          if (nextProps.BankReducer.getOTPBank.data.responseCode === '00000') {
            this.props.navigation.navigate('VerifyOTP', { phone: _phoneNumber, pin: pinCode, deviceInfo: deviceInfo, statusReqOTP: false, uniqueId: uniqueId })
            this.setState({ isLoading: false, isRequestOTP: false })
          } else {
            this.refs.alertMessage.onOpen()
            this.setState({ isLoading: false, isRequestOTP: false, alertMessage: I18n.t('somethingWentWrong') })
          }
          break;
        case "GET_OTP_BANK_FAILED":
          this.refs.Error10157.onOpen()
          this.setState({ isLoading: false, isRequestOTP: false })
          break;
        default:
          break;
      }
    }
  }
  onPressActivePin() {
    this.refs.NotificationActivePin.onClose()
  }
  onGetdatainfo = async (_phoneNumber) => {
    const { pinCode } = this.state
    try {
      await AsyncStorage.setItem('phoneNumber', _phoneNumber);
      await AsyncStorage.setItem('pinCode', pinCode);
    } catch (e) {
      console.log('Error saving data:', e);
    }
  }
  failedDueNoResponse() {
    this.refs.failedDueNoResponse.onClose()
  }
  message() {
    this.refs.message.onClose()
  }
  onClearPhone() {
    this.setState({ pinCode: null })
  }
  render() {
    const { pinCode, isChecked, errorPin, isLoading, key, alertMessage } = this.state
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <SafeAreaView>
          <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> : null}
            <View style={{ paddingHorizontal: Metrics.doubleBaseMargin, flex: 1, }}>
              <View style={{}}>
                <Image source={Images.icLoginAgent} style={styles.logo} />
              </View>
              <View style={{ paddingBottom: 30 }}>
                <FullTextInput
                  label={I18n.t('pleaseInputPinToLogin')}
                  placeholder={I18n.t('inputPin')}
                  returnKeyType='done'
                  keyboardType='decimal-pad'
                  value={pinCode}
                  error={errorPin}
                  maxLength={8}
                  secureTextEntry={true}
                  onChangeUserName={(text) => this.onChangPin(text)}
                  iconLeft='facebook'
                  iconRight='close'
                  textError={I18n.t('accept6DigitsOnly')}
                  onclick={() => this.onClearPhone()}

                />
              </View>
              <View style={{ alignItems: 'center' }}>
                <FullButton
                  textButton={I18n.t('login')}
                  styles={styles.btnStyle}
                  onPress={() => this.onSignIn()}
                  isDisable={(!pinCode || errorPin) ? true : false}
                />
              </View>
            </View>

            <View style={styles.imgFooter}>
              <Image source={Images.bg_footerLogin} style={styles.img} />
            </View>


            <Notification
              headerType='Warning'
              title={I18n.t('info')}
              textContent={I18n.t('10155')}
              buttonText={I18n.t('ok')}
              isButton={true}
              onPress={() => this.onPressActivePin()}
              ref='NotificationActivePin'
            />

            {/* message */}
            <Notification
              headerType='Warning'
              title={I18n.t('info')}
              textContent={alertMessage}
              buttonText={I18n.t('ok')}
              isButton={true}
              onPress={() => this.message()}
              ref='message'
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


          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
Code.defaultProps = {
  validateSecretConst: Constant.VALIDATE_NUMERIC,
}
const mapStateToProps = (state) => {
  return {

    validateData: state.auth.validateData,
    BankReducer: state.BankReducer,
    TransferToBank: state.BankReducer.TransferToBank,
    actionType: state.BankReducer.actionType,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    validatePin: (data) => { dispatch(validatePin(data)) },
    setLoggedIn: () => { dispatch(setLoggedIn()) },
    requestOTP: (data) => { dispatch(requestOTP(data)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Code)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: Metrics.height,
    paddingTop: Platform.OS === 'ios' ? Metrics.tripleBaseMargin : 0,
    justifyContent: 'space-between'
  },

  containerMain: {
    zIndex: 1,
    elevation: 0,
    position: 'relative',
    flex: 1,
  },
  iconLange: {
    width: 35, height: 35
  },
  logo: {

    marginBottom: Metrics.smallMargin,
    height: 130,
    width: 130,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  btnStyle: {
    width: '70%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  img: {
    width: 140,
    height: 200,
    top: -50
  },
  imgFooter: {
    top: Platform.OS === 'android' ? 0 : -40
  },
  TextInput: {
    justifyContent: 'center',
    height: 90

  },

  //


});




