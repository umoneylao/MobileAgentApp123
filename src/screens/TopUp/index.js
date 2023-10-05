import React, { Component } from 'react'
import { Keyboard, SafeAreaView } from 'react-native'
import { requestCheckAccuontETL, onGetFeeTopupETL, sentReqcheckinfo } from '../../actions/TopUp'
import styles from './styles'
import { ActivityIndicator, TopupComponent, AlertNative, Notification } from '../../components'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import { connect } from 'react-redux'
import { requestBccs, login } from '../../actions/Auth'
import I18n from 'react-native-i18n'
import { REMOVE_FIRST_ZERO, TRIM_SPACE, ONLY_NUMBER } from '../../utils/Validate'
import { formatNumber } from '../../utils/Formater'
import { onCallCheckSwich, requestCheckAmount } from '../../actions/ByPassPIN'

class TopUpScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: null,
            isRequestFeeETL: false,
            isRequestOTP: false,
            setModalVisible: false,
            isRequestTopUpETL: false,
            isLoading: false,
            statusCheck: false,
            byPassPIN: false
        }
    }

    componentDidMount() {
        this.onCheckBypassPIN()
    }
    onCheckBypassPIN() {
        const { infoAccount } = this.props;
        let data = infoAccount.accountId;
        console.log('accountId:', data)
        this.props.onCallCheckSwich(data);
        this.setState({ isCallCheckSwich: true, isLoading: true })
    }
    onPressProcess(phone, money, selectState, saveInfo) {
        const { infoAccount } = this.props
        const { statusCheck } = this.state
        let status = null
        Keyboard.dismiss()
        switch (selectState) {
            case 'UNITEL':
                if (!statusCheck) {
                    this.onCheckinfoaccount(phone)
                } else {
                    this.setState({ phone, money, selectState, isLoading: true, isGetAccountInfoCurrentUser: true, saveInfo })
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO))
                    this.props.getAccountInfoCurrentUser(data);
                    RequestField.clearInitField();
                }

                break;
            case 'ETL':
                this.setState({ phone, money, selectState, isLoading: true, isRequestCheckAccuont: true, saveInfo })
                RequestField.clearInitField();
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.PROCESS_CHECK_ACCOUNT_ETL))//3
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                RequestField.addToInitField(RequestField.addCarriedName(infoAccount.customerName))//125
                RequestField.addToInitField(RequestField.addPartnerCode('TELCO_ETL'))//41
                RequestField.addToInitField(RequestField.addServiceCode('TOP_UP_MOBILE'))//42
                RequestField.addToInitField(RequestField.addCustomerPhone(phone))//62
                const dataETL = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                console.log('dataETL:---------', dataETL)
                this.props.requestCheckAccuontETL(dataETL);
                RequestField.clearInitField();
                break;
            case 'LTC':
                status = "TOPUP_LTC";
                this.onCheckAmount(null, null, status)
                this.setState({ phone, money, selectState, saveInfo })

                break;
            case 'TPUST':
                status = "TOPUP_TPUST";
                this.onCheckAmount(null, null, status)
                this.setState({ phone, money, selectState, saveInfo })
                break;
            default:
                break;
        }

    }

    onCheckAmount(customerPhone, serviceType, status) {
        let data = 'AMOUNT_BYPASS_PIN_OTP_TOPUP';
        this.props.requestCheckAmount(data);
        this.setState({ isCheckAmount: true, isLoading: true, customerPhone, serviceType, status })
    }


    componentWillReceiveProps(nextProps) {
        const { phone, money, selectState, getFeeTopup, saveInfo, onCheckgetInfo, isLoading,
            mainPhone, customerName, partnerCode, totalAmont, byPassPIN, isCallCheckSwich, isCheckAmount,
            customerPhone, serviceType, status } = this.state;
        const { infoAccount } = this.props;
        this.forceUpdate()
        if (this.state.isGetAccountInfoCurrentUser && !nextProps.authFetching) {
            this.setState({ isGetAccountInfoCurrentUser: false, isLoading: false });
            if (nextProps.user && nextProps.user.responseCode) {
                if (nextProps.user && nextProps.user.error === `00000`) {
                    if (nextProps.user && nextProps.user.responseCode === '00000') {
                        RequestField.clearInitField();
                        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_CHECK_BCCS))
                        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                        let data = RequestField.addToInitField(RequestField.addCustomerPhone(phone))
                        this.setState({ isRequestBccs: true, isLoading: true })
                        this.props.requestBccs(data)
                        RequestField.clearInitField();
                    } else {
                        if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10118') {
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
        if (this.state.isRequestCheckAccuont && !nextProps.isFetching) {
            this.setState({ isRequestCheckAccuont: false, isRequestBccs: false, isLoading: false })
            if (nextProps.checkAcoutETL.data) {
                // console.log('nextProps.checkAcoutETL.data:', nextProps.checkAcoutETL.data)
                if (nextProps.checkAcoutETL.data.error === "00000") {
                    // console.log('nextProps.checkAcoutETL.data:', nextProps.checkAcoutETL.data)
                    this.setState({ isLoading: false })
                    let response = RequestField.getValueField(nextProps.checkAcoutETL.data.fieldMap, FIELD.RESPONSE_CODE);
                    let messenError = RequestField.getValueField(nextProps.checkAcoutETL.data.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                    // console.log('nextProps.checkAcoutETL.data:', nextProps.checkAcoutETL.data.fieldMap)
                    switch (response) {
                        case '00000':
                            RequestField.clearInitField();
                            RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.CHECK_FEE_TOPUP_ETL)) // 311050
                            RequestField.addToInitField(RequestField.addActionNode('1')) //22
                            RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                            RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                            RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                            RequestField.addToInitField(RequestField.addCarriedName(infoAccount.customerName))//125
                            RequestField.addToInitField(RequestField.addPartnerCode('TELCO_ETL'))//41
                            RequestField.addToInitField(RequestField.addServiceCode('TOP_UP_MOBILE'))//42
                            RequestField.addToInitField(RequestField.addTransCode('573000'))//35
                            RequestField.addToInitField(RequestField.addAmount(money))//5
                            let dataFee = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                            this.setState({ isRequestFeeETL: true, isLoading: true })

                            this.props.onGetFeeTopupETL(dataFee)
                            RequestField.clearInitField();
                            break;
                        case response:
                            this.refs.responseMessage.onOpen()
                            this.setState({ responseMessage: messenError ? messenError: 'Error code' })
                            break

                        default:
                            break;
                    }
                }
            }
        }
        if (this.state.isRequestFeeETL && !nextProps.isFetching) {
            this.setState({ isRequestFeeETL: false, isRequestBccs: false, isLoading: false })
            if (nextProps.checkFeetopup.data.error === "00000") {
                this.setState({ isLoading: false })
                switch (nextProps.checkFeetopup.data.responseCode) {
                    case '00000':
                        let getFeeTopup = RequestField.getValueField(nextProps.checkFeetopup.data.fieldMap, FIELD.TRANSACTION_FEE);
                        this.setState({ getFeeTopup })
                        let status = "TOPUP_ETL";
                        this.onCheckAmount(null, null, status)
                        break;
                    default:
                        this.setState({ isLoading: false })
                        break;
                }
            }
        }
        if (onCheckgetInfo && isLoading) {
            console.log('nextProps.actionType:-------check account', nextProps.actionType)
            switch (nextProps.actionType) {
                case 'CHECK_INFO_PAYMENT_SUCCESS':
                    let responseCode = nextProps.dataCheckinfoPayment.data.responseCode
                    let description = nextProps.dataCheckinfoPayment.data.responseDescription
                    switch (responseCode) {
                        case '00000':
                            this.setState({ isLoading: false, onCheckgetInfo: false })
                            let mainPhone = RequestField.getValueField(nextProps.dataCheckinfoPayment.data.fieldMap, FIELD.MAIN_PHONE)
                            let customerName = RequestField.getValueField(nextProps.dataCheckinfoPayment.data.fieldMap, FIELD.CUSTOMER_NAME)
                            let partnerCode = RequestField.getValueField(nextProps.dataCheckinfoPayment.data.fieldMap, FIELD.PARTNER_CODE)
                            let amonut = RequestField.getValueField(nextProps.dataCheckinfoPayment.data.fieldMap, FIELD.TOTAL_AMOUNT) + '.0'
                            let processCode = RequestField.getValueField(nextProps.dataCheckinfoPayment.data.fieldMap, FIELD.PROCESS_CODE)
                            // console.log('-----nextProps.dataCheckinfoPayment.data:', nextProps.dataCheckinfoPayment.data)
                            let sAmont = amonut ? amonut.split('.') : '0'
                            let amonutS = sAmont[0];
                            amonutS = amonutS ? amonutS.replace(REMOVE_FIRST_ZERO, '') : '0';
                            amonutS = amonutS ? amonutS.replace(TRIM_SPACE, '') : '0';
                            amonutS = amonutS ? amonutS.replace(ONLY_NUMBER, '') : '0';
                            amonutS === '0' ? (amonutS = '') : amonutS;
                            let totalAmont = formatNumber(amonutS.trim())
                            this.setState({ mainPhone, customerName, partnerCode, totalAmont, statusCheck: true, processCode })
                            break;
                        case responseCode:
                            this.refs.responseMessage.onOpen()
                            this.setState({ isLoading: false, onCheckgetInfo: false, responseMessage: description, statusCheck: false })
                            break;

                        default:
                            break;
                    }
                    break;
                case 'CHECK_INFO_PAYMENT_FAILED':
                    this.refs.responseMessage.onOpen()
                    this.setState({ isLoading: false, onCheckgetInfo: false, responseMessage: 'CHECK_INFO_PAYMENT_FAILED', statusCheck: false })
                    break;

                default:
                    break;
            }

        }

        if (this.state.isRequestBccs && !nextProps.authFetching) {
            this.setState({ isRequestBccs: false, isLoading: false })
            if (nextProps.bccsData && nextProps.bccsData.responseCode) {
                if (nextProps.bccsData && nextProps.bccsData.error === '00000') {
                    let responseDescription = nextProps.bccsData.responseDescription
                    switch (nextProps.bccsData.responseCode) {
                        case '00000':

                            let userDescription = RequestField.getValueField(nextProps.bccsData.fieldMap, FIELD.TRANSACTION_DESCRIPTION)
                            let customerPhone = RequestField.getValueField(nextProps.bccsData.fieldMap, FIELD.CUSTOMER_PHONE)
                            let status = "UNITEL";
                            // console.log('byPassPIN:', byPassPIN)
                            let arr = userDescription.split("|")
                            if (arr && arr.length > 2) {
                                let almostLast = arr[arr.length - 3]
                                let last = arr[arr.length - 2]
                                let serviceType = almostLast + last
                                this.onCheckAmount(customerPhone, serviceType, status)
                            }
                            break;
                        case nextProps.bccsData.responseCode:
                            this.refs.responseMessage.onOpen()
                            this.setState({ responseMessage: responseDescription })
                            break;
                        default:
                            break;
                    }

                } else {
                    AlertNative("", I18n.t('systemBusy'))
                }
            } else {
                AlertNative(I18n.t(`failedDueNoResponse`))
            }
        }

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

                        // let data = nextProps.ByPassPinReducer.dataCheckSwich.bypassConfigCollection.data[0]
                        // this.setState({ byPassPIN: data.status == 1 ? true : false, isCallCheckSwich: false, isLoading: false })
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
        if (isCheckAmount && isLoading) {
            if (nextProps.ByPassPinReducer.dataCheckAmount) {
                switch (nextProps.ByPassPinReducer.actionType) {
                    case 'CALL_CHECK_AMOUNT_SUCCESS':
                        let dataAmount = nextProps.ByPassPinReducer.dataCheckAmount.amountConfigCollection.data[0]
                        let moneyCusInput = parseInt(money.replace(/,/g, ""))
                        switch (status) {
                            case 'UNITEL':
                                this.props.navigation.navigate('TransactionDetail',
                                    {
                                        money: money,
                                        phone: phone,
                                        selectState: selectState,
                                        fee: getFeeTopup,
                                        serviceType: serviceType,
                                        onProcess: 'TOP_UP_UNITEL',
                                        processName: I18n.t('TopUp'),
                                        saveInfo: saveInfo,
                                        mainPhone: mainPhone,
                                        customerName: customerName,
                                        partnerCode: partnerCode,
                                        totalAmont: totalAmont,
                                        phone_topup: customerPhone,
                                        toAccountId: infoAccount.accountId,//
                                        processCode: ConfigCode.PAYMENT_CHARGE_TELE_ACCOUNT,//
                                        partnerCodeFee: selectState == 'ETL' ? 'TELCO_ETL' : selectState == 'LTC' ? 'TELCO_LTC' : selectState == 'TPUST' ? 'TELCO_TPLUS' : 'VIETTEL',//
                                        serviceCodeFee: 'TOP_UP_MOBILE',//
                                        checkDiscount: true,//
                                        serviceCodeInternet: 'Unitel',
                                        byPassPIN: byPassPIN,
                                        checkAmount: moneyCusInput <= parseInt(dataAmount.par_value) ? true : false

                                    })
                                break;
                            case 'TOPUP_ETL':
                                this.props.navigation.navigate('TransactionDetail',
                                    {
                                        money: money,
                                        phone: phone,
                                        selectState: selectState,
                                        fee: getFeeTopup,
                                        onProcess: 'TOP_UP_ETL',
                                        processName: I18n.t('TopUp'),
                                        saveInfo: saveInfo,
                                        toAccountId: infoAccount.accountId,//
                                        processCode: ConfigCode.TRANSFER_TOPUP_ETL,//
                                        partnerCodeFee: 'TELCO_ETL',
                                        serviceCodeFee: 'TOP_UP_MOBILE',//
                                        checkDiscount: true,//
                                        byPassPIN: byPassPIN,
                                        checkAmount: moneyCusInput <= parseInt(dataAmount.par_value) ? true : false
                                    })
                                break;
                            case 'TOPUP_LTC':

                                this.props.navigation.navigate('TransactionDetail',
                                    {
                                        money: money,
                                        phone: phone,
                                        selectState: selectState,
                                        fee: '0',
                                        onProcess: 'TOP_UP_LTC',
                                        processName: I18n.t('TopUp'),
                                        saveInfo: saveInfo,
                                        toAccountId: infoAccount.accountId,//
                                        processCode: ConfigCode.TRANSFER_TOPUP_LTC,//
                                        partnerCodeFee: 'TELCO_LTC',
                                        serviceCodeFee: 'TOP_UP_MOBILE',//
                                        checkDiscount: true,//
                                        byPassPIN: byPassPIN,
                                        checkAmount: moneyCusInput <= parseInt(dataAmount.par_value) ? true : false
                                    })
                                break;
                            case 'TOPUP_TPUST':
                                this.props.navigation.navigate('TransactionDetail',
                                    {
                                        money: money,
                                        phone: phone,
                                        selectState: selectState,
                                        fee: '0',
                                        onProcess: 'TELCO_TPLUS',
                                        processName: I18n.t('TopUp'),
                                        saveInfo: saveInfo,
                                        toAccountId: infoAccount.accountId,//
                                        processCode: ConfigCode.TOPUP_TPUST,//
                                        partnerCodeFee: 'TELCO_TPLUS',
                                        serviceCodeFee: 'TOP_UP_MOBILE',//
                                        checkDiscount: true,//
                                        byPassPIN: byPassPIN,
                                        checkAmount: moneyCusInput <= parseInt(dataAmount.par_value) ? true : false
                                    })
                                break;

                            default:
                                break;
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
    responseMessage() { this.refs.responseMessage.onClose() }
    onCheckinfoaccount(text) {
        const { infoAccount } = this.props;
        RequestField.clearInitField();
        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_CHECK_BCCS)) // 311050
        RequestField.addToInitField(RequestField.addActionNode(1))//22
        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
        RequestField.addToInitField(RequestField.addCustomerPhone(text))//62
        RequestField.addToInitField(RequestField.addEffectType(1))//103
        let data = RequestField.addToInitField(RequestField.addPaymentCode(text))
        this.setState({ isLoading: true, onCheckgetInfo: true })
        console.log('data: ETL', data)
        this.props.sentReqcheckinfo(data)
        RequestField.clearInitField();
    }

    render() {
        const { isLoading, contacts, isOTP, errorOTP, responseMessage,
            customerName, totalAmont, partnerCode, processCode } = this.state
        return (
            <SafeAreaView style={styles.container}>
                {isLoading ? <ActivityIndicator /> : null}
                <TopupComponent
                    minAmount={5000}
                    customerName={customerName}
                    totalAmont={totalAmont}
                    partnerCode={partnerCode}
                    processCode={processCode}
                    onCheckinfoaccount={(text) => this.onCheckinfoaccount(text)}
                    onPressProcess={(phone, money, selectState, saveInfo) => this.onPressProcess(phone, money, selectState, saveInfo)}
                    amount={['5,000', '10,000', '20,000', '50,000', '100,000', '500,000']}
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
        user: state.auth.user,
        checkAcoutETL: state.topUp.checkAcoutETL,
        checkFeetopup: state.topUp.checkFeetopup,
        checkGetOTP: state.topUp.checkGetOTP,
        requestTopUpETL: state.topUp.requestTopUpETL,
        dataCheckinfoPayment: state.topUp.dataCheckinfoPayment,
        actionType: state.topUp.actionType,

        ByPassPinReducer: state.ByPassPinReducer,
        dataOnSecurity: state.ByPassPinReducer.dataOnSecurity,
        dataCheckSwich: state.ByPassPinReducer.dataCheckSwich,
        dataCheckAmount: state.ByPassPinReducer.dataCheckAmount,
        // actionType: state.ByPassPinReducer.actionType,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestBccs: (data) => { dispatch(requestBccs(data)) },
        getAccountInfoCurrentUser: (data) => { dispatch(login(data, false)) },
        requestCheckAccuontETL: (data) => { dispatch(requestCheckAccuontETL(data)) },
        onGetFeeTopupETL: (data) => { dispatch(onGetFeeTopupETL(data)) },
        sentReqcheckinfo: (data) => { dispatch(sentReqcheckinfo(data)) },
        onCallCheckSwich: (data) => { dispatch(onCallCheckSwich(data)) },
        requestCheckAmount: (data) => { dispatch(requestCheckAmount(data)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUpScreen)
