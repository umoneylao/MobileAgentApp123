import React, { Component } from 'react'
import { View, TouchableWithoutFeedback, Keyboard, StyleSheet, Platform, Image, StatusBar } from 'react-native'
import { Colors, Metrics, Images } from '../../themes'
import { FullTextInput, ActivityIndicator, FullButton, Notification, AlertNative, Toast } from '../../components'
import I18n from 'react-native-i18n'
import * as Constant from '../../utils/Constant'
import { isValidated } from '../../utils/Validate'
import { connect } from 'react-redux'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import { login, requestBccs, getOTP } from '../../actions/Auth'
import _ from 'lodash'
import { handleResponseCode } from '../../utils/ErrorManager'
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: null, //99545115
            isChecked: true,
            isScrollLogo: false,
            isLoading: false,
            otp: '',
            errorOTP: '',
            isNeedDisableButton: false,
            isLogin: false,
            checkBCCS: false,
            bar: 'dark-content',
            reponMesseng: null

        }
    }
    onChangeNumberPhone(text) {
        const errorPhoneNumber = !text || text.length < 1 ||
            !isValidated(text, Constant.VALIDATE_PHONE) ? I18n.t('incorrectPhoneNumber') : ''
        this.setState({ phoneNumber: text, errorPhoneNumber })
    }
    onClearPhone() { this.setState({ phoneNumber: null }) }

    onCheckPhone = (phoneNumber) => {
        RequestField.addToInitField(RequestField.addPhone(phoneNumber))
        
        const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO)) // 311100
        this.setState({ isLogin: true, isLoading: true })
        this.props.onLogIn(data);
        RequestField.clearInitField();
    }

    onRegister() {
        const { phoneNumber, errorPhoneNumber } = this.state
        if (!phoneNumber || errorPhoneNumber) {
            this.refs.incorrectPhoneNumber.onOpen()
        } else {
            switch (phoneNumber.length) {
                case 13:
                    if (phoneNumber.substring(0, 6) === '856209' || phoneNumber.substring(0, 6) === '856309' || phoneNumber.substring(0, 6) === '856304') {
                        this.onCheckPhone(phoneNumber)
                    } else {
                        this.props.navigation.navigate('AgentRegisterForUser', { phoneNumber: phoneNumber })
                    }
                    break;
                case 11:
                    if (phoneNumber.substring(0, 4) === '0209' || phoneNumber.substring(0, 4) === '0309' || phoneNumber.substring(0, 4) === '0304') {
                        this.onCheckPhone(phoneNumber)
                    } else {
                        this.props.navigation.navigate('AgentRegisterForUser', { phoneNumber: phoneNumber })
                    }
                    break;
                case 10:
                    if (phoneNumber.substring(0, 3) === '209' || phoneNumber.substring(0, 3) === '309' || phoneNumber.substring(0, 3) === '304') {
                        this.onCheckPhone(phoneNumber)
                    } else {
                        this.props.navigation.navigate('AgentRegisterForUser', { phoneNumber: phoneNumber })
                    }
                    break;
                case 8:
                    if (phoneNumber.substring(0, 1) === '9') {
                        this.onCheckPhone(phoneNumber)
                    } else {
                        this.props.navigation.navigate('AgentRegisterForUser', { phoneNumber: phoneNumber })
                    }
                    break;
                default:
                    break;
            }

        }
    }
    onCheckAccuot() {
        const { phoneNumber } = this.state
        RequestField.clearInitField()
        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_CHECK_BCCS))
        RequestField.addToInitField(RequestField.addPhone(phoneNumber))
        RequestField.addToInitField(RequestField.addTransCode(ConfigCode.CUSTOMER_SELF_REGISTER))
        RequestField.addToInitField(RequestField.addTransDes('false'))
        let data = RequestField.addToInitField(RequestField.addCustomerPhone(phoneNumber))
        this.setState({ isRequestBccs: true, isLoading: true, isNeedDisableButton: true, checkBCCS: true, isLogin: false })
        this.props.requestBccs(data)
        RequestField.clearInitField()
    }
    componentWillReceiveProps(nextProps) {
        const { isLogin, checkBCCS } = this.state
        if (isLogin) {
            switch (nextProps.actionType) {
                case 'LOGIN_SUCCESS':
                    if (nextProps.user) {
                        let response = RequestField.getValueField(nextProps.user.fieldMap, FIELD.RESPONSE_CODE);
                        let messenError = RequestField.getValueField(nextProps.user.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                        const AccountStatus = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ACCOUNT_STATUS)
                        // console.log('response=', response)
                        // console.log('AccountStatus=', AccountStatus)

                        switch (response) {
                            case '00000':
                                if (AccountStatus == 'ACTIVE') {
                                    this.refs.thePhoneIsRegistered.onOpen()
                                    this.setState({ isLoading: false, isLogin: false })
                                }
                                break;
                            case 10116:
                                this.onCheckAccuot()
                                this.setState({ isLogin: false })
                                break;
                            case response:
                                this.refs.reponMesseng.onOpen()
                                this.setState({ reponMesseng: messenError, isLoading: false, isLogin: false })
                                break;
                            default:
                                break;
                        }


                    }
                    break;
                case 'LOGIN_FAILED':
                    this.setState({ isLoading: false, isLogin: false })
                    break;
                default:
                    break;
            }
        }

        if (checkBCCS) {
            if (this.state.isSearchAccountInfo && !nextProps.isFetching) {
                this.setState({ isSearchAccountInfo: false, isLoading: false })
                if (nextProps.user && nextProps.user.responseCode) {
                    if (nextProps.user && nextProps.user.responseCode === '00000') {
                        const status = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ACCOUNT_STATUS)
                        switch (status) {
                            case 'REGISTER':
                                AlertNative('status: register')
                                break
                            case 'CANCELED' || 'LOCKED':
                                AlertNative("", 'cancel or locked')
                                break
                            case 'ACTIVE':
                                AlertNative(I18n.t('thePhoneIsRegistered', { phoneNumber: this.state.phoneNumber }))
                                break
                            default:
                                AlertNative(I18n.t('somethingWentWrong'))
                        }
                    } else {
                        if (nextProps.user && nextProps.user.responseCode) {
                            let responseCode = nextProps.user && nextProps.user.responseCode ? `${nextProps.user.responseCode}` : 'systemBusy'
                            if (responseCode === '10116') {
                                AlertNative(I18n.t('10116'))
                                // this._onResend();
                            } else {
                                if (nextProps.user.responseCode) {
                                    handleResponseCode(nextProps.user.responseCode);
                                } else {
                                    AlertNative(I18n.t(`systemBusy`))
                                }
                            }
                        }
                        else {
                            AlertNative(I18n.t(`systemBusy`))
                        }
                    }
                } else {
                    AlertNative(I18n.t('failedDueNoResponse'))
                }
            }
            if (this.state.isValidateOTP && !nextProps.isFetching) {
                this.setState({ isValidateOTP: false, isLoading: false, gotOTP: true });
            }
            if (this.state.isRequestBccs && !nextProps.isFetching) {
                this.setState({ isRequestBccs: false, isLoading: false })
                if (nextProps.bccsData && nextProps.bccsData.responseCode) {
                    let response = RequestField.getValueField(nextProps.bccsData.fieldMap, FIELD.RESPONSE_CODE);
                    let messenError = RequestField.getValueField(nextProps.bccsData.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                    switch (response) {
                        case '00000':
                            this.props.navigation.navigate('AgentRegisterForUser', { bccsData: nextProps.bccsData })
                            this.setState({ isNeedDisableButton: false })
                            break;
                        case response:
                            this.refs.reponMesseng.onOpen()
                            this.setState({ reponMesseng: messenError, isNeedDisableButton: false })
                            break;
                        default:
                            break;
                    }
                } else {
                    AlertNative(I18n.t('99999'))
                }
            }
        }

    }
    thePhoneIsRegistered() {
        this.refs.thePhoneIsRegistered.onClose()
    }
    incorrectPhoneNumber() {
        this.refs.incorrectPhoneNumber.onClose()
    }
    reponMesseng() { this.refs.reponMesseng.onClose() }
    render() {
        const { phoneNumber, errorPhoneNumber, isLoading, isNeedDisableButton, reponMesseng } = this.state
        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View style={styles.container}>
                    <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                    {isLoading ? <ActivityIndicator /> : null}
                    <View style={{ paddingHorizontal: Metrics.doubleBaseMargin, flex: 1 }}>
                        <View>
                            <Image source={Images.icLoginAgent} style={styles.logo} resizeMode='contain' />
                        </View>
                        <View style={styles.TextInput}>
                            <FullTextInput
                                label={I18n.t('enterYourMobilePhoneNumber')}
                                placeholder={I18n.t('enterRegisterPhoneNumber')}
                                returnKeyType='done'
                                keyboardType='numeric'
                                value={phoneNumber}
                                maxLength={13}
                                error={errorPhoneNumber}
                                onChangeUserName={(text) => this.onChangeNumberPhone(text)}
                                iconLeft='facebook'
                                iconRight='close'
                                textError={I18n.t('incorrectPhoneNumber')}
                                onclick={() => this.onClearPhone()}
                            />
                        </View>
                        <View style={styles.Button}>
                            <FullButton
                                styles={styles.btnStyle}
                                onPress={() => this.onRegister()}
                                isNeedDisable={isNeedDisableButton}
                                isDisable={(!phoneNumber || errorPhoneNumber) ? true : false}
                                textButton={I18n.t('continue')}
                            />
                        </View>
                    </View>

                    <View style={styles.imgFooter}>
                        <Image source={Images.bg_footerLogin} style={styles.img} />
                    </View>

                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('thePhoneIsRegistered', { phoneNumber: phoneNumber })}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.thePhoneIsRegistered()}
                        ref='thePhoneIsRegistered'
                    />

                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('incorrectPhoneNumber')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.incorrectPhoneNumber()}
                        ref='incorrectPhoneNumber'
                    />
                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={reponMesseng}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.reponMesseng()}
                        ref='reponMesseng'
                    />


                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching,
        user: state.auth.user,
        actionType: state.auth.actionType,
        bccsData: state.auth.bccsData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onLogIn: (phoneNumber) => { dispatch(login(phoneNumber)) },
        requestBccs: (data) => { dispatch(requestBccs(data)) },
        getOTP: (data) => { dispatch(getOTP(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        height: Metrics.height,
        paddingTop: Platform.OS === 'ios' ? Metrics.tripleBaseMargin : 0,
        justifyContent: 'space-between'
    },
    imgFooter: {
        top: Platform.OS === 'android'? -40 : -90
    },
    img: {
        width: 140,
        height: 200,

    },
    TextInput: {
        justifyContent: 'center',
        marginBottom: 0
    },
    Button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 90
    },
    btnStyle: {
        width: '70%',
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,

    },
    logo: {
        marginBottom: Metrics.smallMargin,
        height: 120,
        width: 120,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
})
