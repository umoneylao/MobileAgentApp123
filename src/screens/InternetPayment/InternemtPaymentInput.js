import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { ActivityIndicator, InternetPaymentComponents, Notification } from '../../components'
import { Colors, Images } from '../../themes'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import { requestBccs, login } from '../../actions/Auth'
import { requestTopUp, sentReqcheckinfo } from '../../actions/TopUp'
import { handleResponseCode } from '../../utils/ErrorManager'
import _ from 'lodash'
import { formatNumber } from '../../utils/Formater'
import { REMOVE_FIRST_ZERO, TRIM_SPACE, ONLY_NUMBER } from '../../utils/Validate'

class InternemtPaymentInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            bar: 'dark-content',
            description: null,
            mainPhone: '',
            customerName: null,
            partnerCode: null,
            totalAmont: null,
            descrip: null,
            checkServiceCode: ConfigCode.FTTH_OTHER

        };
    }
    componentWillMount() {
        if (this.props.route.params != undefined) {
            let tyle = this.props.route.params.data
            let code = tyle.name
            let language = tyle.language
            this.setState({
                code: code,
                language: language
            })
        }
    }
    onClickChange() {
        this.props.navigation.goBack(null);
    }
    componentWillReceiveProps(nextProps) {
        const { infoAccount } = nextProps
        const { onCheckgetInfo, isLoading, mainPhone, customerName, partnerCode, totalAmont, paymentCode, money, serviceCode, saveInfo, checkServiceCode } = this.state

        // console.log('serviceCode:', serviceCode)

        this.forceUpdate()
        if (this.state.isGetAccountInfo && !nextProps.authFetching) {
            this.setState({ isGetAccountInfo: false, isLoading: false })
            if (nextProps.user && nextProps.user.responseCode) {
                if (nextProps.user && nextProps.user.error === `00000`) {
                    if (nextProps.user && nextProps.user.responseCode === '00000') {
                        // RequestField.clearInitField();
                        // RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_CHECK_BCCS)) // 311050
                        // RequestField.addToInitField(RequestField.addPaymentCode(infoAccount.phoneNumber))
                        // RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                        // let data = RequestField.addToInitField(RequestField.addCustomerPhone(infoAccount.phoneNumber))
                        // this.setState({ isRequestBccs: true, isLoading: true })
                        // this.props.requestBccs(data)
                        // RequestField.clearInitField();

                        this.props.navigation.navigate('TransactionDetail',
                            {
                                money: money ? money : totalAmont,
                                serviceCodeInternet: checkServiceCode,
                                paymentCode: paymentCode,
                                onProcess: 'INTERNET_SERVICES',
                                selectState:'INTERNET_SERVICES',
                                processName: I18n.t('paymentInternet'),
                                mainPhone: mainPhone,
                                customerName: customerName,
                                partnerCode: partnerCode,
                                totalAmont: totalAmont,
                                saveInfo: saveInfo,
                                toAccountId: infoAccount.accountId,//
                                processCode: ConfigCode.PAYMENT_CHARGE_TELE_ACCOUNT,//
                                partnerCodeFee: 'VIETTEL',
                                serviceCodeFee: checkServiceCode,
                                //serviceCodeFee: serviceCode =='FTTH' ? ConfigCode.FTTH_OTHER : serviceCode =='ADSL' ? ConfigCode.ADSL_OTHER : serviceCode =='LEASED_LINE' ? ConfigCode.LEASED_LINE_OTHER : null,//
                                checkDiscount: true//


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
                                this.setState({ phone })
                                this.refs.state0.onOpen()
                            } else {
                                this.setState({ phone })
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
        if (this.state.isRequestBccs && !nextProps.authFetching) {
            // this.setState({ isRequestBccs: false, isLoading: false })
            // if (nextProps.bccsData && nextProps.bccsData.responseCode) {
            //     // console.log('nextProps.bccsData-----:', nextProps.bccsData)
            //     if (nextProps.bccsData && nextProps.bccsData.error === '00000') {
            //         if (nextProps.bccsData && nextProps.bccsData.responseCode === '00000') {
            //             this.props.navigation.navigate('TransactionDetail',
            //                 {
            //                     money: money ? money : totalAmont,
            //                     serviceCodeInternet: serviceCode,
            //                     paymentCode: paymentCode,
            //                     onProcess: 'INTERNET_SERVICES',
            //                     processName: I18n.t('paymentInternet'),
            //                     mainPhone: mainPhone,
            //                     customerName: customerName,
            //                     partnerCode: partnerCode,
            //                     totalAmont: totalAmont,
            //                     saveInfo: saveInfo,

            //                     toAccountId: infoAccount.accountId,//
            //                     processCode: ConfigCode.PAYMENT_CHARGE_TELE_ACCOUNT,//
            //                     partnerCodeFee: 'VIETTEL',
            //                     serviceCodeFee: serviceCode =='FTTH' ? ConfigCode.FTTH_OTHER : serviceCode =='ADSL' ? ConfigCode.ADSL_OTHER : serviceCode =='LEASED_LINE' ? ConfigCode.LEASED_LINE_OTHER : null,//
            //                     checkDiscount: true//


            //                 })
            //         } else {
            //             if (nextProps.bccsData && nextProps.bccsData.responseDescription) {
            //                 this.refs.transactionIsUnsuccessful.onOpen()
            //             } else {
            //                 if (nextProps.bccsData.responseCode) {
            //                     handleResponseCode(nextProps.bccsData.responseCode);
            //                 } else {
            //                     this.refs.NotificationSystemBusy.onOpen()
            //                 }
            //             }
            //         }
            //     } else {
            //         this.refs.NotificationSystemBusy.onOpen()
            //     }
            // } else {
            //     this.refs.failedDueNoResponse.onOpen()
            // }
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
                            this.refs.transactionIsUnsuccessful.onOpen()
                        } else {
                            this.refs.NotificationSystemBusy.onOpen()
                        }
                    }
                }
            } else {
                this.refs.failedDueNoResponse.onOpen()
            }
        }
        if (onCheckgetInfo && isLoading) {
            switch (nextProps.actionType) {
                case 'CHECK_INFO_PAYMENT_SUCCESS':
                    if (nextProps.dataCheckinfoPayment.data) {
                        let responseCode = nextProps.dataCheckinfoPayment.data.responseCode
                        let description = nextProps.dataCheckinfoPayment.data.responseDescription
                        switch (responseCode) {
                            case '00000':
                                let amonut = RequestField.getValueField(nextProps.dataCheckinfoPayment.data.fieldMap, FIELD.TOTAL_AMOUNT) + '.0'
                                let sAmont = amonut.split('.')
                                let amonutS = sAmont[0];
                                amonutS = amonutS.replace(REMOVE_FIRST_ZERO, '');
                                amonutS = amonutS.replace(TRIM_SPACE, '');
                                amonutS = amonutS.replace(ONLY_NUMBER, '');
                                amonutS === '0' ? (amonutS = '0') : amonutS;
                                let mess = RequestField.getValueField(nextProps.dataCheckinfoPayment.data.fieldMap, FIELD.TRANSACTION_DESCRIPTION)
                                let mess1 = mess.split('|')
                                let messSplit = mess1[3];
                                // console.log('messSplit--------->:', nextProps.dataCheckinfoPayment.data.fieldMap)

                                this.setState({
                                    isLoading: false,
                                    onCheckgetInfo: false,
                                    mainPhone: RequestField.getValueField(nextProps.dataCheckinfoPayment.data.fieldMap, FIELD.MAIN_PHONE),
                                    customerName: RequestField.getValueField(nextProps.dataCheckinfoPayment.data.fieldMap, FIELD.CUSTOMER_NAME),
                                    partnerCode: RequestField.getValueField(nextProps.dataCheckinfoPayment.data.fieldMap, FIELD.PARTNER_CODE),
                                    totalAmont: formatNumber(amonutS.trim()),
                                    descrip: messSplit,
                                    checkServiceCode: RequestField.getValueField(nextProps.dataCheckinfoPayment.data.fieldMap, FIELD.SERVICE_CODE),


                                })
                                break;
                            case responseCode:
                                this.refs.warningCheckInfo.onOpen()
                                this.setState({ isLoading: false, onCheckgetInfo: false, description: description })
                                break;

                            default:
                                break;
                        }
                        break;
                    } else {
                        this.refs.warningCheckInfo.onOpen()
                        this.setState({ isLoading: false, onCheckgetInfo: false, description: I18n.t('10790') })
                    }

                case 'CHECK_INFO_PAYMENT_FAILED':
                    this.refs.warningCheckInfo.onOpen()
                    this.setState({ isLoading: false, onCheckgetInfo: false, description: I18n.t('10790') })
                    break;

                default:
                    break;
            }
        }
    }
    paymentPress(serviceCode, code, money, serviceName, saveInfo) {
        console.log('serviceCode', serviceCode)
        console.log('code:', code)
        console.log('money:', money)
        console.log('serviceName:', serviceName)
        console.log('saveInfo:', saveInfo)
        const { infoAccount } = this.props
        this.setState({ serviceCode, paymentCode: code, money, serviceName, saveInfo, isGetAccountInfo: true, isLoading: true })
        RequestField.clearInitField();
        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
        const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO))
        this.props.getAccountInfo(data);
        RequestField.clearInitField();
    }
    state3() {
        this.refs.state3.onClose()
    }
    onCloseCheckInfo() {
        this.refs.warningCheckInfo.onClose()
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
    transactionIsUnsuccessful() { this.refs.transactionIsUnsuccessful.onClose() }
    reqCheckinfo(text) {
        const { infoAccount } = this.props
        RequestField.clearInitField();
        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_CHECK_BCCS)) // 311050
        RequestField.addToInitField(RequestField.addActionNode(1))//22
        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
        RequestField.addToInitField(RequestField.addCustomerPhone(text))//62
        RequestField.addToInitField(RequestField.addEffectType(1))//103
        let data = RequestField.addToInitField(RequestField.addPaymentCode(text))
        this.setState({ isLoading: true, onCheckgetInfo: true })
        this.props.sentReqcheckinfo(data)
        RequestField.clearInitField();
    }
    render() {
        const { code, isLoading, language, phone, description, customerName, descrip,
            mainPhone, partnerCode, totalAmont } = this.state

        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <ScrollView style={styles.box}>
                    <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
                    {isLoading ? <ActivityIndicator /> : null}
                    <View style={styles.header}>
                        <View style={styles.iconText}>
                            <View style={styles.image}>
                                <Image source={code == 'ADSL' ? Images.ic_ADSL
                                    : code == 'FTTH' ? Images.ic_FTTH
                                        : code == 'LEASED_LINE' ? Images.ic_LeasedLine : null} style={styles.image} />
                            </View>
                            <View style={{ padding: 10 }}>
                                <Text>{I18n.t(language)}</Text>
                            </View>
                        </View>
                        <View style={styles.TextChange}>
                            <TouchableOpacity onPress={() => this.onClickChange()}>
                                <Text style={{ color: Colors.txtUpLight }}>{I18n.t('Change')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <InternetPaymentComponents
                        gettyle={code}
                        firstTabLabel='ADSL'
                        secondTabLabel='FTTH'
                        firstTabTextButton='ADSLPayment'
                        secondTabTextButton='FTTHPayment'
                        firstTabPlaceHolder='enterTheAccountNumberHere'
                        secondTabPlaceHolder='enterTheAccountNumberHere'
                        contractName={customerName}
                        contracPhone={mainPhone != null ? mainPhone.toString() : null}
                        partnerCode={partnerCode}
                        totalAmont={totalAmont}
                        descrip={descrip}
                        reqCheckinfo={(text) => this.reqCheckinfo(text)}
                        firstTabPress={(value, money, saveInfo) => this.paymentPress("ADSL", value, money, "yourADSLHasDoneSuccessfully", saveInfo)}
                        secondTabPress={(value, money, saveInfo) => this.paymentPress("FTTH", value, money, "yourFTTHHasDoneSuccessfully", saveInfo)}
                        thirdTabPress={(value, money, saveInfo) => { this.paymentPress("LEASED_LINE", value, money, "yourLeasedLineHasDoneSuccessfully", saveInfo) }}
                    />

                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={description}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.onCloseCheckInfo()}
                        ref='warningCheckInfo'
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
                        textContent={I18n.t('state5')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.state5()}
                        ref='state5'
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
                    {/* state1 */}
                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('state1', { phone: phone })}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.state1()}
                        ref='state1'
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
                        textContent={I18n.t('transactionIsUnsuccessful')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.transactionIsUnsuccessful()}
                        ref='transactionIsUnsuccessful'
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({

    box: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: Colors.white
    },
    header: {
        width: '100%',
        height: 95,
        backgroundColor: '#F8F8F8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20
    },
    TextChange: {
        justifyContent: 'center'
    },
    image: {
        width: 40,
        height: 40,
    },
    iconText: {
        flexDirection: 'row',
        alignItems: 'center',

    }
});
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isFetching: state.topUp.isFetching,
        topUpData: state.topUp.topUpData,
        paymentInfo: state.topUp.paymentInfo,
        infoAccount: state.auth.infoAccount,
        bccsData: state.auth.bccsData,
        dataCheckinfoPayment: state.topUp.dataCheckinfoPayment,
        authFetching: state.auth.isFetching,
        actionType: state.topUp.actionType,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAccountInfo: (data) => { dispatch(login(data, false)) },
        requestBccs: (data) => { dispatch(requestBccs(data)) },
        requestTopUp: (data) => { dispatch(requestTopUp(data)) },
        sentReqcheckinfo: (data) => { dispatch(sentReqcheckinfo(data)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InternemtPaymentInput)

