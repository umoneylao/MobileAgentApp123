import React, { Component } from 'react';
import { View, Text, TextInput, SafeAreaView, Keyboard, TouchableWithoutFeedback, Modal, StatusBar } from 'react-native'

import * as ConfigCode from '../../utils/ConfigCode'
import * as RequestField from '../../utils/RequestField'
import { connect } from 'react-redux'
import { requestCheckAccuontBccs } from '../../actions/Auth'
import * as FIELD from '../../utils/CoreFieldMap'
import { requestGetFee, requestOTP, requestTranferBccs } from '../../actions/Bank'
import I18n from "react-native-i18n";
import styles from './styles'
import { Colors } from '../../themes'
import { Notification, DebtsettlementComponent, ActivityIndicator } from '../../components'

import {
    CHECK_ACCUONT_BCCS_SUCCESS, CHECK_ACCUONT_BCCS_FALSE,
    CHECK_FEE_BANK_SUCCESS, CHECK_FEE_BANK_FALSE, GET_OTP_BANK_SUCCESS, GET_OTP_BANK_FAILED,
    PAY_STAFF_DEBT_FALSE, PAY_STAFF_DEBT_SUCCESS
} from '../../actions/types'

export class Debtsettlement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isRequestCheckBccs: false,
            isRequestGetFee: false,
            isRequestOTP: false,
            setModalVisible: false,
            isRequestTranferBccs: false,
            bar: 'dark-content'
        };
    }
    componentDidMount() {
        const { infoAccount } = this.props
        RequestField.clearInitField()
        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.CHECK_ACCOUNT_BCCS)) //3
        RequestField.addToInitField(RequestField.addActionNode('1')) //22
        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
        RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
        RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
        RequestField.addToInitField(RequestField.addCarriedName(infoAccount.customerName))//125
        RequestField.addToInitField(RequestField.addPartnerCode('BCCS'))//41
        RequestField.addToInitField(RequestField.addServiceCode('PAY_STAFF_DEBT'))//42
        RequestField.addToInitField(RequestField.addCustomerPhone(infoAccount.phoneNumber))//62
        let data = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
        this.setState({ isRequestCheckBccs: true, isLoading: true })
        this.props.requestCheckAccuontBccs(data)
        RequestField.clearInitField();
    }
    componentWillReceiveProps(nextProps) {
        const { infoAccount } = this.props
        const { isRequestCheckBccs, isLoading, isRequestGetFee, _getAmount, _getStaffCode, _getStaffName, isRequestOTP, isRequestTranferBccs } = this.state
        if (isRequestCheckBccs && isLoading) {
            switch (nextProps.actionType) {
                case CHECK_ACCUONT_BCCS_SUCCESS:
                    let response = RequestField.getValueField(nextProps.checkAccuontBccs.data.fieldMap, FIELD.RESPONSE_CODE);
                    let getAmount = RequestField.getValueField(nextProps.checkAccuontBccs.data.fieldMap, FIELD.TRANSACTION_DESCRIPTION);//5
                    let getStaffCode = RequestField.getValueField(nextProps.checkAccuontBccs.data.fieldMap, FIELD.STAFF_CODE);//111
                    let getStaffName = RequestField.getValueField(nextProps.checkAccuontBccs.data.fieldMap, FIELD.STAFF_NAME);//112
                    let getUserName = RequestField.getValueField(nextProps.checkAccuontBccs.data.fieldMap, FIELD.USER_NAME);//128
                    let getShopCode = RequestField.getValueField(nextProps.checkAccuontBccs.data.fieldMap, FIELD.SHOP_CODE);//95
                    this.setState({ isLoading: false, isRequestCheckBccs: false, response, getAmount, getStaffCode, getStaffName, getUserName, getShopCode })
                    break;
                case CHECK_ACCUONT_BCCS_FALSE:
                    this.setState({ isLoading: false, isRequestCheckBccs: false })
                    break;
                default:
                    break;
            }
        }
        if (isRequestGetFee && isLoading) {
            switch (nextProps.BankReducer.actionType) {
                case CHECK_FEE_BANK_SUCCESS:
                    switch (nextProps.BankReducer.getFeeAccuont.data.responseCode) {
                        case '00000':
                            let FeeBank = RequestField.getValueField(nextProps.BankReducer.getFeeAccuont.data.fieldMap, FIELD.TRANSACTION_FEE);
                            let AmountBank = RequestField.getValueField(nextProps.BankReducer.getFeeAccuont.data.fieldMap, FIELD.AMOUNT);
                            this.props.navigation.navigate('TransactionDetail',
                                {
                                   
                                    money: AmountBank,
                                    fee: FeeBank,
                                    onProcess: 'PAY_STAFF_DEBT',
                                    selectState: "PAY_STAFF_DEBT",
                                    processName: I18n.t('Debtsettlement'),
                                    GetStaffCode: _getStaffCode,
                                    GetStaffName: _getStaffName,
                                    GetUserName: this.state.getUserName,
                                    GetShopCode: this.state.getShopCode,

                                    toAccountId: infoAccount.accountId,
                                    processCode: ConfigCode.PAY_STAFF_DEBT,
                                    serviceCodeFee: 'PAY_STAFF_DEBT',
                                    partnerCodeFee: 'BCCS',
                                    checkDiscount: true

                                })
                            this.setState({ isLoading: false, isRequestGetFee: false, FeeBank, AmountBank, _getAmount, _getStaffCode, _getStaffName })
                            break;
                        case 10817:
                            alert(nextProps.BankReducer.getFeeAccuont.data.responseDescription)
                            this.setState({ isLoading: false, isRequestGetFee: false, })
                            break;
                        default:
                            alert('Can not get fee')
                            this.setState({ isLoading: false, isRequestGetFee: false, })
                            break;
                    }
                    break;
                case CHECK_FEE_BANK_FALSE:
                    this.setState({ isLoading: false, isRequestGetFee: false, })
                    break;
                default:
                    this.setState({ isLoading: false, isRequestGetFee: false, })
                    break;
            }
        }
    }
    onPressProcess(Amount, _getAmount, _getStaffCode, _getStaffName) {
        const { infoAccount } = this.props
        RequestField.clearInitField()
        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_FEE_INFO_E2E)) //3
        RequestField.addToInitField(RequestField.addActionNode('1')) //22
        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
        RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
        RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
        RequestField.addToInitField(RequestField.addCarriedName(infoAccount.customerName))//125
        RequestField.addToInitField(RequestField.addTransCode('574000')) //35 
        RequestField.addToInitField(RequestField.addAmount(Amount))//5 
        RequestField.addToInitField(RequestField.addPartnerCode('BCCS'))//41
        RequestField.addToInitField(RequestField.addServiceCode('PAY_STAFF_DEBT'))//42
        let dataGetFee = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
        this.setState({ isRequestGetFee: true, isLoading: true, isRequestCheckBccs: false, _getAmount, _getStaffCode, _getStaffName })
        this.props.requestGetFee(dataGetFee)
        RequestField.clearInitField();
    }
    render() {
        const { isLoading } = this.state
        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                    {isLoading ? <ActivityIndicator /> : null}
                    <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
                    <DebtsettlementComponent
                        minAmount={10000}
                        onPressProcess={(Amount, _getAmount, _getStaffCode, _getStaffName) => this.onPressProcess(Amount, _getAmount, _getStaffCode, _getStaffName)}
                        getresponse={this.state.response}
                        _getAmount={this.state.getAmount}
                        _getStaffCode={this.state.getStaffCode}
                        _getStaffName={this.state.getStaffName}
                    />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
        isLoading: state.auth.isLoading,
        actionType: state.auth.actionType,
        checkAccuontBccs: state.auth.checkAccuontBccs,
        isFetching: state.BankReducer.isFetching,
        BankReducer: state.BankReducer,
        transferbccs: state.auth.transferbccs,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestCheckAccuontBccs: (data) => { dispatch(requestCheckAccuontBccs(data)) },
        requestGetFee: (data) => { dispatch(requestGetFee(data)) },
        requestOTP: (data) => { dispatch(requestOTP(data)) },
        requestTranferBccs: (data) => { dispatch(requestTranferBccs(data)) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Debtsettlement);
