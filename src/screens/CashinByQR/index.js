import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, BackHandler } from 'react-native'
import { FullTextInput, FullNewButton, ActivityIndicator, Notification } from '../../components'
import I18n from 'react-native-i18n'
import { isValidated } from '../../utils/Validate'
import { formatNumber } from '../../utils/Formater'
import * as Constant from '../../utils/Constant'
import * as ValidationUtils from '../../utils/Validate'
import { Colors } from '../../themes'
import { connect } from 'react-redux'
import { getAccountInfo } from '../../actions/Transfer'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import _ from 'lodash'
import { handleResponseCode } from '../../utils/ErrorManager'
import { onCallCheckSwich, requestCheckAmount } from '../../actions/ByPassPIN'

class CashinByQR extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AgentCode: '',
            phone: '',
            money: '',
            message: '',
            processName: '',
            agentCode: '',
            getPhone: null,
            statusCheck: false
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentWillUnmount() {
        this.props.navigation.popToTop()
    }
    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }
    componentDidMount() {
        const { params } = this.props.route
        this.onCheckBypassPIN()
        if (params) {
            const phone = params.data
            this.setState({ phone: phone })
        }
    }
    //remore PIN / OTP
    onCheckBypassPIN() {
        const { infoAccount } = this.props;
        let data = infoAccount.accountId;
        this.props.onCallCheckSwich(data);
        this.setState({ isCallCheckSwich: true, isLoading: true })
    }
    onChangeNumberValue(text) {
        const errorPhone = !text || text.length < 1 ||
            !isValidated(text, Constant.VALIDATE_PHONE) ? I18n.t('incorrectPhoneNumber') : ''
        this.setState({ phone: text, errorPhone })
    }
    onChangeAmount(text) {
        const minAmount = 3000
        let errorMoney = !text || text.length < 1 ||
            !isValidated(text, Constant.VALIDATE_MONEY) ? I18n.t('incorrectMoneyCode') : null;
        text = text.replace(ValidationUtils.REMOVE_FIRST_ZERO, '');
        text === '0' ? (text = '') : text;
        let tempText = text;
        let mMoney = parseInt(tempText.replace(/,/g, ''));
        if (minAmount) {
            if (mMoney < minAmount) {
                errorMoney = I18n.t('amountMustbefrom', { amount: formatNumber(minAmount + "") });
            }
        }
        this.setState({ money: formatNumber(text.trim()), errorMoney })
    }
    onClearPhone() {
        this.setState({ phone: null })
    }
    onChangeTransactionNote(text) {
        const errorNote = !text || text.length < 1 || !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('nameIsNotEmpty') : null
        this.setState({ message: text, errorNote })
    }
    onClearMessage() {
        this.setState({ message: null })
    }
    onClearMoney() { this.setState({ money: null }) }

    state7() {
        this.refs.state7.onClose()
    }
    onPressSystemBusy() {
        this.refs.NotificationSystemBusy.onClose()
    }
    failedDueNoResponse() {
        this.refs.failedDueNoResponse.onClose()
    }
    state1() {
        this.refs.state1.onClose()
    }
    transactionIsUnsuccessful() {
        this.refs.transactionIsUnsuccessful.onClose()
    }
    onPressPinActive() {
        this.refs.NotificationPinActive.onClose()
    }
    accOrNumberIsNotRegisterUmoney() {
        this.refs.accOrNumberIsNotRegisterUmoney.onClose()
    }

    ErrorcashInData() {
        this.refs.ErrorcashInData.onClose()
    }

    componentWillReceiveProps(nextProps) {
        this.forceUpdate()
        const { phone, money, message, isCheckAccountInfo, isCallCheckSwich, isCheckAmount, isLoading, byPassPIN, toAccountId, toName } = this.state
        if (this.state.isGetAccountInfo && !nextProps.transFetching) {
            this.setState({ isGetAccountInfo: false, isLoading: false })
            if (nextProps.receiver && nextProps.receiver.responseCode) {
                if (nextProps.receiver.error === '00000') {
                    if (nextProps.receiver.responseCode &&
                        (nextProps.receiver.responseCode === '00000'
                            || nextProps.receiver.responseCode.toString() === '10114'
                            || nextProps.receiver.responseCode.toString() === '10115')) {
                        let toAccountId = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_ID)
                        let toName = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.CUSTOMER_NAME)
                        this.setState({ toAccountId, toName })
                        this.onCheckAmount()

                    } else if (nextProps.receiver.responseCode && nextProps.receiver.responseCode.toString() === '10118') {
                        const status = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_STATUS);
                        switch (status) {
                            case 'LOCKED':
                                let toAccountId = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_ID)
                                let toName = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.CUSTOMER_NAME)
                                this.setState({ toAccountId, toName })
                                this.refs.ValidatePinModal.onOpen()
                                break;
                            case 'BLOCKED':
                                this.refs.state7.onOpen()
                                break;
                            default:
                                this.refs.NotificationSystemBusy.onOpen()
                                break;
                        }
                    } else if (nextProps.receiver.responseCode && nextProps.receiver.responseCode.toString() === '10116') {
                        const phone = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.PHONE_NUMBER);
                        const status = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_STATUS);
                        if (status) {
                            let toAccountId = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_ID)
                            let toName = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.CUSTOMER_NAME)
                            this.setState({ toAccountId, toName })
                            this.refs.ValidatePinModal.onOpen()
                        } else {
                            this.refs.state1.onOpen()
                        }
                    } else {

                        if (nextProps.receiver && nextProps.receiver.responseDescription) {

                            this.refs.transactionIsUnsuccessful.onOpen()
                        } else {
                            if (nextProps.receiver.responseCode) {
                                if (nextProps.receiver.responseCode === '10835') {
                                    this.refs.transactionIsUnsuccessful.onOpen()
                                } else if (nextProps.receiver.responseCode === 10116) {
                                    let agentCode = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.SHOP_CODE);
                                    this.setState({ agentCode: agentCode })
                                    this.refs.accOrNumberIsNotRegisterUmoney.onOpen()

                                } else {
                                    handleResponseCode(nextProps.receiver.responseCode);
                                }
                            } else {
                                this.refs.NotificationSystemBusy.onOpen()
                            }

                        }
                    }
                } else {
                    if (nextProps.receiver.responseCode) {
                        handleResponseCode(nextProps.receiver.responseCode);
                    } else {
                        this.refs.NotificationSystemBusy.onOpen()
                    }
                }
            } else {
                this.refs.failedDueNoResponse.onOpen()
            }
        }
        //check account phone
        if (isCheckAccountInfo) {
            this.setState({ isCheckAccountInfo: false, isLoading: false })
            if (nextProps.receiver && nextProps.receiver.responseCode) {
                if (nextProps.receiver.error === '00000') {
                    if (nextProps.receiver.responseCode && nextProps.receiver.responseCode === '00000') {
                        const phoneCus = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.PHONE_NUMBER);
                        let toAccountId = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_ID)
                        let toName = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.CUSTOMER_NAME)
                        this.setState({ toAccountId, toName, phoneCus, statusCheck: true })
                        // this.onCheckAmount()
                    } else {
                        this.refs.errorMessage.onOpen()
                        this.setState({ errorMessage: 'Phone is not regiter u-money' })
                    }
                } else {
                    this.refs.NotificationSystemBusy.onOpen()
                }
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
                        break;
                    case 'CALL_CHECK_SWICH_FAILED':
                        this.refs.errorMessage.onOpen()
                        this.setState({ isCallCheckSwich: false, isLoading: false, errorMessage: 'CALL_CHECK_SWICH_FAILED' })
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
                        this.props.navigation.navigate('TransactionDetail',
                            {
                                money: money,
                                phone: phone,
                                message: message,
                                toAccountId: toAccountId,
                                toName: toName,
                                saveInfo: '1',
                                onProcess: 'TRANFER_EWALLET',
                                selectState: 'TRANFER_EWALLET',
                                processName: I18n.t('cashIn'),
                                processCode: ConfigCode.TRANSFER_E2E,
                                checkDiscount: true,
                                byPassPIN: byPassPIN,
                                checkAmount: moneyCusInput <= parseInt(dataAmount.par_value) ? true : false

                            })
                        this.setState({ isLoading: false, isCheckAmount: false })
                        break;
                    case 'CALL_CHECK_AMOUNT_FAILED':
                        this.refs.errorMessage.onOpen()
                        this.setState({ errorMessage: 'CALL_CHECK_AMOUNT_FAILED', isCheckAmount: false, isLoading: false })
                        break;
                    default:
                        break;
                }
            }
        }
    }


    onSelectedContact(contact) {
        this.refs.PaymentComponent.onSetPhone(contact)
    }
    onPressProcess() {
        const { phone, message } = this.state
        Keyboard.dismiss()
        if (!message) {
            this.setState({ message: 'Customer cash in by QR code' })
        }
        RequestField.addToInitField(RequestField.addPhone(phone))
        const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO))
        this.setState({ isLoading: true, isGetAccountInfo: true })
        this.props.getAccountInfo(data)
    }
    onOpenContact() {
        this.refs.ModalContact.onOpen();
        this.onSearchContact('');
    }

    state7() {
        this.refs.state7.onClose()
    }
    onPressSystemBusy() {
        this.refs.NotificationSystemBusy.onClose()
    }
    failedDueNoResponse() {
        this.refs.failedDueNoResponse.onClose()
    }
    state1() {
        this.refs.state1.onClose()
    }
    transactionIsUnsuccessful() {
        this.refs.transactionIsUnsuccessful.onClose()
    }
    onPressPinActive() {
        this.refs.NotificationPinActive.onClose()
    }
    accOrNumberIsNotRegisterUmoney() {
        this.refs.accOrNumberIsNotRegisterUmoney.onClose()
    }
    ErrorcashInData() {
        this.refs.ErrorcashInData.onClose()
    }
    onCheckAccount = (phone) => {
        if (phone) {
            RequestField.addToInitField(RequestField.addPhone(phone))
            const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO))
            this.setState({ isLoading: true, isCheckAccountInfo: true })
            this.props.getAccountInfo(data)
        } else {
            this.refs.errorMessage.onOpen()
            this.setState({ errorMessage: 'Phone is null' })
        }

    }
    //remore PIN / OTP
    onCheckAmount() {
        let data = 'AMOUNT_BYPASS_PIN_OTP_W2W';
        this.props.requestCheckAmount(data);
        this.setState({ isCheckAmount: true, isLoading: true })
    }

    render() {
        const { phone, errorPhone, money, errorMoney, message, errorNote, isLoading, agentCode, cashInData, errorMessage, toName, statusCheck } = this.state
        return (
            <SafeAreaView>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.container}>
                        {isLoading ? <ActivityIndicator /> : null}
                        <View style={styles.main}>
                            <View style={styles.groupInput}>
                                <FullTextInput
                                    label={I18n.t('inputReceiverPhoneNumber')}
                                    placeholder={I18n.t('inputThePhoneHere')}
                                    returnKeyType='done'
                                    keyboardType='number-pad'
                                    value={phone}
                                    error={errorPhone}
                                    onChangeUserName={(text) => this.onChangeNumberValue(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    contact={true}
                                    maxLength={13}
                                    textError={I18n.t('inputThePhoneHere')}
                                    onclick={() => this.onClearPhone()}

                                />
                            </View>
                            {
                                statusCheck ?
                                    (
                                        <View style={styles.groupInput}>
                                            <FullTextInput
                                                label={I18n.t('FullName')}
                                                placeholder={I18n.t('FullName')}
                                                returnKeyType='done'
                                                keyboardType='default'
                                                value={toName}
                                                editable={false}
                                            />
                                        </View>
                                    ) : null
                            }
                            <View style={styles.groupInput}>
                                <FullTextInput
                                    label={I18n.t('amount')}
                                    placeholder={I18n.t('enterAmount')}
                                    returnKeyType='done'
                                    keyboardType='number-pad'
                                    value={money}
                                    error={errorMoney}
                                    onChangeUserName={(text) => this.onChangeAmount(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    maxLength={13}
                                    textError={I18n.t('amountMustbefrom', { amount: '3,000' })}
                                    onclick={() => this.onClearMoney()}
                                    onTouchStart={() => this.onCheckAccount(phone)}

                                />
                            </View>
                            <View style={styles.groupInput}>
                                <FullTextInput
                                    label={I18n.t('leaveMessageTitle')}
                                    placeholder={I18n.t('leaveMessage')}
                                    returnKeyType='done'
                                    keyboardType='default'
                                    value={message}
                                    error={errorNote}
                                    onChangeUserName={(text) => this.onChangeTransactionNote(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    textError={I18n.t('')}
                                    onclick={() => this.onClearMessage()}

                                />
                            </View>
                            <View style={styles.groupInput}>
                                <FullNewButton
                                    text={I18n.t('cashIn')}
                                    onPress={() => this.onPressProcess()}
                                    isDisable={(!phone || !money || errorMoney || errorPhone || errorNote) ? true : false}
                                />
                            </View>
                        </View>


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
                            textContent={I18n.t('failedDueNoResponse')}
                            buttonText={I18n.t('ok')}
                            isButton={true}
                            onPress={() => this.failedDueNoResponse()}
                            ref='failedDueNoResponse'
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
                            textContent={I18n.t('11101')}
                            buttonText={I18n.t('ok')}
                            isButton={true}
                            onPress={() => this.onPressPinActive()}
                            ref='NotificationPinActive'
                        />
                        <Notification
                            headerType='Warning'
                            title={I18n.t('info')}
                            textContent={I18n.t('accOrNumberIsNotRegisterUmoney', { agentCode: agentCode })}
                            buttonText={I18n.t('ok')}
                            isButton={true}
                            onPress={() => this.accOrNumberIsNotRegisterUmoney()}
                            ref='accOrNumberIsNotRegisterUmoney'
                        />

                        <Notification
                            headerType='Warning'
                            title={I18n.t('info')}
                            textContent={cashInData}
                            buttonText={I18n.t('ok')}
                            isButton={true}
                            onPress={() => this.ErrorcashInData()}
                            ref='ErrorcashInData'
                        />

                        <Notification
                            headerType='Warning'
                            title={I18n.t('info')}
                            textContent={errorMessage}
                            buttonText={I18n.t('ok')}
                            isButton={true}
                            onPress={() => this.errorMessage()}
                            ref='errorMessage'
                        />


                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
        receiver: state.transfer.receiver,
        transFetching: state.transfer.isFetching,

        ByPassPinReducer: state.ByPassPinReducer,
        dataOnSecurity: state.ByPassPinReducer.dataOnSecurity,
        dataCheckSwich: state.ByPassPinReducer.dataCheckSwich,
        dataCheckAmount: state.ByPassPinReducer.dataCheckAmount,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAccountInfo: (phoneNumber) => { dispatch(getAccountInfo(phoneNumber)) },
        requestCheckAmount: (data) => { dispatch(requestCheckAmount(data)) },
        onCallCheckSwich: (data) => { dispatch(onCallCheckSwich(data)) },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CashinByQR)
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white,
    },
    main: {
        padding: 10
    },
    groupInput: {
        marginBottom: 15
    }
})

