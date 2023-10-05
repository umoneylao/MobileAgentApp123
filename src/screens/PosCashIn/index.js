import React, { Component } from 'react'
import {
    Keyboard, Platform, SafeAreaView
} from 'react-native'
import { connect } from 'react-redux'
import { requestCashIn } from '../../actions/CashOut'
import { getAccountInfo } from '../../actions/Transfer'
import { requestHistoryTranfer, requestCheckagentId } from '../../actions/Auth'
import styles from './styles'
import { Payment, ActivityIndicator, Notification } from '../../components'
import * as ConfigCode from '../../utils/ConfigCode'
import I18n from 'react-native-i18n'
import _ from 'lodash'
import { onCallCheckSwich, requestCheckAmount } from '../../actions/ByPassPIN' // By pass PIN / OTP


class CashInScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AgentCode: '',
            getHistoryCashin: false,
            isCheckAgentId: false,
            statusCheck: false
        }
    }

    componentDidMount() {
        this.onCheckBypassPIN() // By pass PIN / OTP
        const { infoAccount } = this.props
        try {
            let _processCode = ConfigCode.MONEY_AGENT_CHARGE_CUSTOMER;
            let _accountId = infoAccount.accountId
            this.props.requestHistoryTranfer(_accountId, _processCode)
            this.setState({ isLoading: true, getHistoryCashin: true })
        } catch (e) {
            console.log('Error')
        }
    }

    //remore PIN / OTP
    onCheckBypassPIN() {
        const { infoAccount } = this.props;
        let data = infoAccount.accountId;
        // console.log('accountId:', data)
        this.props.onCallCheckSwich(data);
        this.setState({ isCallCheckSwich: true, isLoading: true })
    }
    //remore PIN / OTP
    onCheckAmount() {
        let data = 'AMOUNT_BYPASS_PIN_OTP_W2W';
        this.props.requestCheckAmount(data);
        this.setState({ isCheckAmount: true, isLoading: true })
    }

    componentWillReceiveProps(nextProps) {
        this.forceUpdate()
        const { isLoading, getHistoryCashin, isCheckAgentId, message, money, byPassPIN, isCheckAmount, isCallCheckSwich, toAccountId, toName, numberPhone, address, isCheckAgentIdByShowName } = this.state

        if (isLoading && getHistoryCashin) {
            switch (nextProps.actionType) {
                case 'REQUES_HISTORY_TRANFER_SUCCESS':
                    let dataReques = nextProps.requesHistoryTranfer.recentCollections.recentTransactions
                    this.setState({ isLoading: false, getHistoryCashin: false, dataReques })
                    break;
                case 'REQUES_HISTORY_TRANFER_FAILED':
                    this.setState({ isLoading: false, getHistoryCashin: false })
                    break;
                default:
                    break;
            }
        }
        if (isLoading && isCheckAgentId) {
            switch (nextProps.actionType) {
                case 'REQUES_CHECK_AGENT_ID_SUCCESS':
                    console.log(' nextProps.requestCheckagent:',  nextProps.requestCheckagent)
                    let getRoleId = nextProps.requestCheckagent.CHANNEL[0].ROLE_ID
                    let toAccountId = nextProps.requestCheckagent.CHANNEL[0].ACCOUNT_ID
                    let toName = nextProps.requestCheckagent.CHANNEL[0].CHANNEL_NAME
                    let numberPhone = nextProps.requestCheckagent.CHANNEL[0].PHONE
                    let address = nextProps.requestCheckagent.CHANNEL[0].ADDRESS
                    if (getRoleId == 33) {
                        this.onCheckAmount()
                        this.setState({ toAccountId, toName, numberPhone, address })
                    } else {
                        this.refs.errorMessage.onOpen()
                        this.setState({ errorMessage: 'CheckinfoAccount' })
                    }
                    this.setState({ isCheckAgentId: false })
                    break;
                case 'REQUES_CHECK_AGENT_ID_FAILED':
                    this.refs.errorMessage.onOpen()
                    this.setState({ isLoading: false, isCheckAgentId: false, errorMessage: I18n.t('10790') })
                    break;
                default:
                    break;
            }

        }
        if (isCheckAgentIdByShowName && isLoading) {
            switch (nextProps.actionType) {
                case 'REQUES_CHECK_AGENT_ID_SUCCESS':
                    let getRoleId = nextProps.requestCheckagent.CHANNEL[0].ROLE_ID
                    let toAccountId = nextProps.requestCheckagent.CHANNEL[0].ACCOUNT_ID
                    let toName = nextProps.requestCheckagent.CHANNEL[0].CHANNEL_NAME
                    let numberPhone = nextProps.requestCheckagent.CHANNEL[0].PHONE
                    let address = nextProps.requestCheckagent.CHANNEL[0].ADDRESS
                    if (getRoleId == 33) {
                        // this.onCheckAmount()
                        this.setState({ toAccountId, toName, numberPhone, address, isCheckAgentIdByShowName: false, isLoading: false, statusCheck: true })
                    } else {
                        this.refs.errorMessage.onOpen()
                        this.setState({ errorMessage: 'CheckinfoAccount' })
                    }
                    this.setState({ isCheckAgentIdByShowName: false, isLoading: false })
                    break;
                case 'REQUES_CHECK_AGENT_ID_FAILED':
                    this.refs.errorMessage.onOpen()
                    this.setState({ isLoading: false, isCheckAgentIdByShowName: false, errorMessage: I18n.t('10790') })
                    break;
                default:
                    break;
            }
        }
        //remore PIN / OTP 
        if (isCallCheckSwich) {
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
                        this.refs.responseMessage.onOpen()
                        this.setState({ isCallCheckSwich: false, isLoading: false, responseMessage: 'CALL_CHECK_SWICH_FAILED' })
                        break;
                    default:
                        break;
                }
            }
        }

        if (isCheckAmount) {
            if (nextProps.ByPassPinReducer.dataCheckAmount) {
                switch (nextProps.ByPassPinReducer.actionType) {
                    case 'CALL_CHECK_AMOUNT_SUCCESS':
                        let dataAmount = nextProps.ByPassPinReducer.dataCheckAmount.amountConfigCollection.data[0]
                        let moneyCusInput = parseInt(money.replace(/,/g, ""))
                        console.log('dataAmount:', dataAmount)
                        console.log('moneyCusInput:', moneyCusInput)
                        console.log('byPassPIN:', byPassPIN)
                        console.log('dataAmount.par_value:', dataAmount.par_value)
                        this.props.navigation.navigate('TransactionDetail', {
                            toAccountId: toAccountId,
                            toName: toName,
                            numberPhone: numberPhone,
                            address: address,
                            message: message,
                            money: money,
                            onProcess: 'MONEY_POS_CASH_IN',
                            selectState: 'MONEY_POS_CASH_IN',
                            processName: I18n.t('PosCashin'),
                            processCode: ConfigCode.MONEY_POS_CASH_IN,
                            serviceCodeFee: '',
                            partnerCodeFee: '',//
                            checkDiscount: true,//
                            byPassPIN: byPassPIN,
                            checkAmount: moneyCusInput <= parseInt(dataAmount.par_value) ? true : false
                        })
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
    onPressProcess(phone, money, message) {
        if (!message) {
            message = 'customer cash in'
        }
        this.setState({ phone, money, message })
        Keyboard.dismiss()
        this.props.requestCheckagentId(phone)
        this.setState({ isLoading: true, isCheckAgentId: true, message, money })
    }

    errorMessage() { this.refs.errorMessage.onClose() }

    onCheckAccount(phone) {
        if (phone) {
            Keyboard.dismiss()
            this.props.requestCheckagentId(phone)
            this.setState({ isLoading: true, isCheckAgentIdByShowName: true })
        } else {
            this.refs.errorMessage.onOpen()
            this.setState({ errorMessage: 'Phone is null' })
        }

    }
    render() {
        const { isLoading, contacts, dataReques, errorMessage, toName, toAccountId , numberPhone, byPassPIN } = this.state
        console.log('byPassPIN:', byPassPIN)
        return (
            <SafeAreaView style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 65 : 0}
                enabled>
                {isLoading ? <ActivityIndicator /> : null}
                <Payment
                    ref='PaymentComponent'
                    firstHeader='phoneNumberForCashin'
                    placeholder='EnterPhoneOragentId'
                    CashInScreen
                    keyboardType='numeric'
                    phonePad
                    contact
                    txtName='FullName'
                    txtInput='PhoneOragentId'
                    txtAmount='enterOrChoseTheMoney'
                    amountPlaceholder='money'
                    textButton='cashIn'
                    errorPhoneMessage='agentCodeIncorrect'
                    maxLengthMoney={13}
                    maxLengthCode={8}
                    processCode={ConfigCode.MONEY_POS_CASH_IN}
                    isDataReques={dataReques}//
                    onPressProcess={(phone, money, message) => this.onPressProcess(phone, money, message)}
                    footerTextInput
                    onPressContact={() => this.onOpenContact()}
                    minAmount={3000}
                    //
                    getAgentCode={toAccountId ? toAccountId : numberPhone }
                    displayName={toName ? toName : null}
                    onCheckAccount={(phone) => this.onCheckAccount(phone)} //
                    onCheckAccountCashIn={true} //


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

            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isFetching: state.cashOut.isFetching,
        cashInData: state.cashOut.cashInData,
        infoAccount: state.auth.infoAccount,
        requestCheckagent: state.auth.requestCheckagent,
        receiver: state.transfer.receiver,
        transFetching: state.transfer.isFetching,
        actionType: state.auth.actionType,
        requesHistoryTranfer: state.auth.requesHistoryTranfer,

        ByPassPinReducer: state.ByPassPinReducer, // By pass PIN / OTP
        dataOnSecurity: state.ByPassPinReducer.dataOnSecurity, // By pass PIN / OTP
        dataCheckSwich: state.ByPassPinReducer.dataCheckSwich, // By pass PIN / OTP
        dataCheckAmount: state.ByPassPinReducer.dataCheckAmount, // By pass PIN / OTP
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestCashIn: (data) => { dispatch(requestCashIn(data)) },
        getAccountInfo: (phoneNumber) => { dispatch(getAccountInfo(phoneNumber)) },
        requestCheckagentId: (phone) => { dispatch(requestCheckagentId(phone)) },
        requestHistoryTranfer: (_accountId, _processCode) => { dispatch(requestHistoryTranfer(_accountId, _processCode)) },
        onCallCheckSwich: (data) => { dispatch(onCallCheckSwich(data)) }, // By pass PIN / OTP
        requestCheckAmount: (data) => { dispatch(requestCheckAmount(data)) }, // By pass PIN / OTP

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CashInScreen)
