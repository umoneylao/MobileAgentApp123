import React, { Component } from 'react'
import {
    View, StyleSheet, Platform, Image, Keyboard, Text, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity
} from 'react-native';
import { Images, Colors, Metrics } from '../../themes'
import { FullButton, ActivityIndicator, FullTextInput, Notification } from '../../components'
import I18n from 'react-native-i18n'
import CountDown from 'react-native-countdown-component';
import { connect } from 'react-redux'
import { requestOTP } from '../../actions/Bank'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import { validatePin, setLoggedIn, onCheckBlockDevice } from '../../actions/Auth'
import * as FIELD from '../../utils/CoreFieldMap'
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64'
import utf8 from 'utf8';

class VerifyOTP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }
    componentDidMount() {
        let phone = this.props.route.params.phone;
        let pin = this.props.route.params.pin;
        let deviceInfo = this.props.route.params.deviceInfo;
        let statusReqOTP = this.props.route.params.statusReqOTP;
        let uniqueId = this.props.route.params.uniqueId;
        
        this.setState({ phone, pin, run: true, deviceInfo, uniqueId })
        if (statusReqOTP) {
            console.log('1111OTP')
            this.onCallOTP(pin);
        }

    }
    onGetdatainfo = async (phone) => {
        const { pin } = this.state
        try {
          await AsyncStorage.setItem('phoneNumber', phone);
          await AsyncStorage.setItem('pinCode', pin);
        } catch (e) {
          console.log('Error saving data:', e);
        }
      }
    onChangOtp(text) {
        const errorOtp = !text || text.length < 6 ? I18n.t('enterOTPHere') : null
        this.setState({ otp: text, errorOtp })
    }
    onSignIn() {
        const { infoAccount } = this.props
        const { pin, deviceInfo, otp, uniqueId } = this.state
        console.log('deviceInfo:', deviceInfo)
        Keyboard.dismiss()
        RequestField.clearInitField();
        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber));
        RequestField.addToInitField(RequestField.addCarriedAccId(infoAccount.accountId));
        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_PIN));
        RequestField.addToInitField(RequestField.addPan(infoAccount.pan));
        RequestField.addToInitField(RequestField.addPin(pin));
        RequestField.addToInitField(RequestField.addTransDes("false"));
        RequestField.addToInitField(RequestField.addOPT(otp))//53
        RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
        RequestField.addToInitField(RequestField.addFromName(uniqueId)) // 108
        const data = RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId));
        console.log('----11-2--', data)
        this.props.validatePin(data)
        this.setState({ isInputCurrentPin: true, isLoading: true });
        RequestField.clearInitField();
    }
    onClearOtp() {
        this.setState({ otp: null })
    }
    onCallOTP(pin) {
        const { infoAccount } = this.props
        try {
            if (pin) {
                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(pin))
                RequestField.addToInitField(RequestField.addServiceCode('CHECK_BLOCK_DEVIEC'))//41
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let data = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                console.log('data:', data)
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(data)
                RequestField.clearInitField()
            } else {
                alert('PIN is null')
            }
        } catch (error) {
            console.log(error)
        }


    }
    onFinishCD = () => {
        this.setState({ run: false })
    }
    onPressCD = () => {
        // alert('Countdown Component Pressed...');
    }
    onCheckBlockDevice() {
        const { deviceInfo, phone, uniqueId } = this.state
        let dataDeviceInfo = uniqueId + '|' + deviceInfo.deviceName + '|' + deviceInfo.systemName + '|' + deviceInfo.IpAddress + '|' + deviceInfo.manufacturer + '|' + deviceInfo.product
        console.log('---verify otp:', dataDeviceInfo)
        console.log('---verify uniqueId:', uniqueId)
        var utf8DeviceInfo = utf8.encode(dataDeviceInfo);
        var utf8DeviceId = utf8.encode(uniqueId);
        let encode = base64.encode(utf8DeviceInfo);
        let deviceId = base64.encode(utf8DeviceId);
       
        RequestField.addToInitField(RequestField.addActionNode('1'))//22
        RequestField.addToInitField(RequestField.addPhone(phone))//34
        RequestField.addToInitField(RequestField.addFromName(deviceId)) //108
        RequestField.addToInitField(RequestField.addImageName(encode))// - 101
        const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.CHECK_BLOCK_DEVICE))
        // console.log('data:', data)
        this.setState({ isCheckBleckDeviec: true, isLoading: true })
        this.props.onCheckBlockDevice(data);
        RequestField.clearInitField();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.isRequestOTP && this.state.isLoading) {
            switch (nextProps.BankReducer.actionType) {
                case "GET_OTP_BANK_SUCCESS":
                    if (nextProps.BankReducer.getOTPBank.data) {
                        if (nextProps.BankReducer.getOTPBank.data.responseCode === '00000') {
                            this.setState({ isLoading: false, isRequestOTP: false, run: true })
                        } else {
                            this.refs.alertMessage.onOpen()
                            this.setState({ isLoading: false, isRequestOTP: false, alertMessage: I18n.t('somethingWentWrong') })
                        }
                    } else {
                        this.refs.alertMessage.onOpen()
                        this.setState({ isLoading: false, isRequestOTP: false, alertMessage: I18n.t('somethingWentWrong') })
                    }
                    break;
                case "GET_OTP_BANK_FAILED":
                    this.refs.alertMessage.onOpen()
                    this.setState({ isLoading: false, isRequestOTP: false, alertMessage: 'GET_OTP_BANK_FAILED' })
                    break;
                default:
                    break;
            }
        }
        if (this.state.isInputCurrentPin && this.state.isLoading) {
            // console.log('actionTypeAuth:', nextProps.actionTypeAuth)
            // console.log('validateData:', nextProps.validateData)
            switch (nextProps.actionTypeAuth) {
                case 'VALIDATE_PIN_SUCCESS':
                    this.setState({ isInputCurrentPin: false, isLoading: false })
                    if (nextProps.validateData.error) {
                        // console.log('validateData5555:', nextProps.validateData)
                        switch (nextProps.validateData.error) {
                            case '00000':
                                let responseCode = RequestField.getValueField(nextProps.validateData.fieldMap, FIELD.RESPONSE_CODE)
                                let mess = RequestField.getValueField(nextProps.validateData.fieldMap, FIELD.TRANSACTION_DESCRIPTION)
                                let phone = RequestField.getValueField(nextProps.validateData.fieldMap, FIELD.PHONE_NUMBER)

                                console.log('01', responseCode)
                                switch (responseCode) {
                                    case '00000':
                                        this.props.setLoggedIn()
                                        this.onGetdatainfo(phone)
                                        break;
                                    case responseCode:
                                        this.refs.alertMessage.onOpen()
                                        this.setState({ alertMessage: mess })
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            case nextProps.validateData.error:
                                this.refs.alertMessage.onOpen()
                                this.setState({ alertMessage: nextProps.validateData.description })
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case 'VALIDATE_PIN_FAILED':
                    this.setState({ isInputCurrentPin: false, isLoading: false })
                    if (nextProps.validateData.error) {
                        console.log('nextProps.validateData555:', nextProps.validateData)
                        let messageError = nextProps.validateData.responseDescription
                        switch (nextProps.validateData.responseCode) {
                            case '00000':
                                let responseCode = RequestField.getValueField(nextProps.validateData.fieldMap, FIELD.RESPONSE_CODE)
                                let mess = RequestField.getValueField(nextProps.validateData.fieldMap, FIELD.TRANSACTION_DESCRIPTION)
                                let phone = RequestField.getValueField(nextProps.validateData.fieldMap, FIELD.PHONE_NUMBER)

                                switch (responseCode) {
                                    case '00000':
                                        this.props.setLoggedIn()
                                        this.onGetdatainfo(phone)
                                        break;
                                    case responseCode:
                                        this.refs.alertMessage.onOpen()
                                        this.setState({ alertMessage: mess })
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            case 10010:
                                this.onCheckBlockDevice()
                                break;
                            case 10008:
                                let txtReplace = messageError.replace("OTP is incorrect", "").replace(", please retry.", "")
                                this.refs.txtError.onOpen()
                                this.setState({ txtError: txtReplace })
                                break;
                            case 10009:
                                this.refs.alertMessage.onOpen()
                                this.setState({ alertMessage: I18n.t('10009') })
                                break;

                            case nextProps.validateData.responseCode:
                                this.refs.alertMessage.onOpen()
                                this.setState({ alertMessage: nextProps.validateData.responseDescription })
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        if (this.state.isCheckBleckDeviec) {
            if (nextProps.dataCheckBlockDeviec && nextProps.dataCheckBlockDeviec.error === '00000') {
                this.setState({ isCheckBleckDeviec: false, isLoading: false })
                let responseCode = RequestField.getValueField(nextProps.dataCheckBlockDeviec.fieldMap, FIELD.RESPONSE_CODE)
                let message = RequestField.getValueField(nextProps.dataCheckBlockDeviec.fieldMap, FIELD.RESPONSE_DESCRIPTION)
                let timeBlock = RequestField.getValueField(nextProps.dataCheckBlockDeviec.fieldMap, FIELD.PAYMENT_CODE)
                console.log('nextProps.dataCheckBlockDeviec:', nextProps.dataCheckBlockDeviec)
                switch (responseCode) {
                    case '00000':
                        break;
                    case 10157:
                        this.refs.messageError.onOpen()
                        let errStr = I18n.t('10010') + timeBlock
                        this.setState({ messageError: errStr })
                        break;
                    case responseCode:
                        this.refs.messageError.onOpen()
                        this.setState({ messageError: message })
                        break;
                    default:
                        break;
                }
            }
        }
    }
    alertMessage() {
        this.refs.alertMessage.onClose()
    }
    txtError() {
        this.refs.txtError.onClose()
    }
    messageError() {
        this.refs.messageError.onClose()
        this.props.navigation.popToTop(null);
    }
    render() {
        const { isLoading, otp, errorOtp, phone, run, alertMessage, messageError, txtError, pin } = this.state
        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <SafeAreaView>
                    <View style={styles.container}>
                        {isLoading ? <ActivityIndicator /> : null}
                        <View style={{ paddingHorizontal: Metrics.doubleBaseMargin, flex: 1, }}>
                            <View>
                                <Image source={Images.icLoginAgent} style={styles.logo} />
                            </View>
                            <View style={styles.viewTextTile}>
                                <Text style={styles.txtTile}>{I18n.t('AnOTPwasSent', { phone: phone })}</Text>

                            </View>
                            <View style={styles.txtTimeCenter}>
                            <Text style={styles.timeming}>
                                {
                                    run ? (
                                     
                                        <CountDown
                                            until={60}
                                            onFinish={() => this.onFinishCD()}
                                            onPress={() => this.onPressCD()}
                                            size={20}
                                            style ={{paddingLeft:70}}
                                        />

                                    ) : '00:00'
                                }
                            </Text>
                            </View>

                            <View style={{ paddingBottom: 20 }}>
                                <FullTextInput
                                    label={I18n.t('otp')}
                                    placeholder={I18n.t('otp')}
                                    returnKeyType='done'
                                    keyboardType='decimal-pad'
                                    value={otp}
                                    error={errorOtp}
                                    maxLength={6}
                                    onChangeUserName={(text) => this.onChangOtp(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    textError={I18n.t('enterOTPHere')}
                                    onclick={() => this.onClearOtp()}
                                />
                            </View>
                            {
                                !run ? (
                                    <View style={styles.txtGroupReceived}>
                                        <Text style={styles.txtNotReceivedYet}>{I18n.t('NotReceivedYet')}</Text>
                                        <TouchableOpacity onPress={() => this.onCallOTP(pin)}>
                                            <Text style={styles.txtResendOTP}>{I18n.t('ResendOTP')}</Text>
                                        </TouchableOpacity>
                                    </View>

                                ) : null
                            }

                            <View style={{ alignItems: 'center' }}>
                                <FullButton
                                    textButton={I18n.t('confirm')}
                                    styles={styles.btnStyle}
                                    onPress={() => this.onSignIn()}
                                    isDisable={(!otp || errorOtp) ? true : false}
                                />
                            </View>

                        </View>
                        <View style={styles.imgFooter}>
                            <Image source={Images.bg_footerLogin} style={styles.img} />
                        </View>
                        <Notification
                            headerType='Warning'
                            title={I18n.t('info')}
                            textContent={alertMessage}
                            buttonText={I18n.t('ok')}
                            isButton={true}
                            onPress={() => this.alertMessage()}
                            ref='alertMessage'
                        />

                        <Notification
                            headerType='Warning'
                            title={I18n.t('info')}
                            textContent={I18n.t('10008', { txtError: txtError })}
                            buttonText={I18n.t('ok')}
                            isButton={true}
                            onPress={() => this.txtError()}
                            ref='txtError'
                        />

                        <Notification
                            headerType='Warning'
                            title={I18n.t('info')}
                            textContent={messageError}
                            buttonText={I18n.t('ok')}
                            isButton={true}
                            onPress={() => this.messageError()}
                            ref='messageError'
                        />
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
        validateData: state.auth.validateData,
        actionTypeAuth: state.auth.actionType,
        BankReducer: state.BankReducer,
        TransferToBank: state.BankReducer.TransferToBank,
        actionType: state.BankReducer.actionType,
        dataCheckBlockDeviec: state.auth.dataCheckBlockDeviec,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestOTP: (data) => { dispatch(requestOTP(data)) },
        validatePin: (data) => { dispatch(validatePin(data)) },
        setLoggedIn: () => { dispatch(setLoggedIn()) },
        onCheckBlockDevice: (data) => { dispatch(onCheckBlockDevice(data)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOTP)
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
    txtTile: {
        fontSize: 16,
        color: '#989898',
        textAlign: 'center'
    },
    viewTextTile: {
        padding: 10,
        flexDirection: 'row'
    },
    txtGroupReceived: {
        flexDirection: 'row',
        marginBottom: 20,
        alignContent: 'center',
        justifyContent: 'center'
    },
    txtNotReceivedYet: {
        color: '#C4C4C4',
        fontSize: 16
    },
    txtResendOTP: {
        color: Colors.txtUpLight,
        fontSize: 16
    },
    timeming: {
        textAlign: 'center',
        marginBottom: 10,
        // backgroundColor:'#666'
    },
    txtTimeCenter:{
        justifyContent: 'center',
        
    }

});
