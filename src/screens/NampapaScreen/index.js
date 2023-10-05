import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { NampapaComponent, ActivityIndicator, Notification } from '../../components'
import { Colors } from '../../themes'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import { connect } from 'react-redux'
import { requestCheckAccount } from '../../actions/Watter'
import I18n from 'react-native-i18n'
export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            bar: 'dark-content',
        }
    }
    onCheckAccountNpp(ContractNumber) {
        const { infoAccount } = this.props
        // console.log('ContractNumber:', ContractNumber)
        RequestField.clearInitField();
        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.PAYMENT_WATER_NPP)) //3
        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
        RequestField.addToInitField(RequestField.addTransCode('600101'))//35
        RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
        RequestField.addToInitField(RequestField.addFromPhone(infoAccount.phoneNumber))//105
        RequestField.addToInitField(RequestField.addFromAccountId(infoAccount.accountId))//76
        RequestField.addToInitField(RequestField.addActionNode('1')) //22
        RequestField.addToInitField(RequestField.addPartnerCode('PAYMENT_WATTER_NPP'))//41
        RequestField.addToInitField(RequestField.addBankAccountNo(ContractNumber))//88
        let data = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
        this.props.requestCheckAccount(data)
        RequestField.clearInitField();
        this.setState({ isLoading: true, isCheckAccount: true })
    }
    componentWillReceiveProps(nextProps) {
        const { isLoading, isCheckAccount } = this.state
        if (isLoading && isCheckAccount) {
            // console.log('actionType:', nextProps.actionType)
            // console.log('nextProps.getAccountWatter:', nextProps.getAccountWatter)
            switch (nextProps.actionType) {
                case 'CHECK_ACCUONT_WATTE_SUCCESS':
                    // console.log('nextProps.getAccountWatter.data:', nextProps.getAccountWatter.data)
                    let response = RequestField.getValueField(nextProps.getAccountWatter.data.fieldMap, FIELD.RESPONSE_CODE);
                    let messenError = RequestField.getValueField(nextProps.getAccountWatter.data.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                    switch (response) {
                        case '00000':
                            let name = RequestField.getValueField(nextProps.getAccountWatter.data.fieldMap, FIELD.BANK_ACCOUNT_NAME);
                            let amount = RequestField.getValueField(nextProps.getAccountWatter.data.fieldMap, FIELD.AMOUNT);
                            let fee = RequestField.getValueField(nextProps.getAccountWatter.data.fieldMap, FIELD.TRANSACTION_FEE);
                            let accuont = RequestField.getValueField(nextProps.getAccountWatter.data.fieldMap, FIELD.BANK_ACCOUNT_NO);
                            // console.log('<<<< nextProps.getAccountWatter.data >>> ', nextProps.getAccountWatter.data)
                            this.setState({ isLoading: false, isCheckAccount: false, name, amount, fee, accuont })
                            break;
                        case response:
                            this.refs.reposMess.onOpen()
                            this.setState({ isLoading: false, isCheckAccount: false, reposMess: messenError })
                            break;

                        default:
                            break;
                    }
                    break;
                case 'CHECK_ACCUONT_WATTE_FALSE':
                    this.refs.reposMess.onOpen()
                    this.setState({ isLoading: false, isCheckAccount: false, reposMess: 'CHECK_ACCUONT_WATTE_FALSE' })
                    break;
                default:
                    break;
            }
        }
    }
    PaymentWatter(saveInfo) {
        const { name, amount, fee, accuont } = this.state
        this.props.navigation.navigate('TransactionDetail',
            {
                AmountBank: amount,
                AccountBankName: name,
                FeeBank: fee,
                AccountNo: accuont,
                saveInfo: saveInfo,
                onProcess: 'PAYMENT_WATTER_NPP',
                selectState: 'PAYMENT_WATTER_NPP',
                service: I18n.t('PAYMENT_WATTER_NPP'),

                processCode: ConfigCode.PAYMANT_WATTER,
                serviceCodeFee: '',
                money: amount,
                partnerCodeFee: 'PAYMENT_WATTER_NPP',//
                checkDiscount: true//

            })
    }
    reposMess() { this.refs.reposMess.onClose() }
    render() {
        const { isLoading, reposMess, name, amount, } = this.state
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                {isLoading ? <ActivityIndicator /> : null}
                <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
                <NampapaComponent
                    minAmount={5000}
                    getName={name}
                    getAmount={amount}
                    processCode='600101'
                    PaymentWatter={(saveInfo) => this.PaymentWatter(saveInfo)}
                    onCheckAccountNpp={(ContractNumber) => this.onCheckAccountNpp(ContractNumber)}
                />
                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={reposMess}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.reposMess()}
                    ref='reposMess'
                />
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
        actionType: state.WatterReducers.actionType,
        getAccountWatter: state.WatterReducers.getAccountWatter,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestCheckAccount: (data) => { dispatch(requestCheckAccount(data)) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index)

const styles = StyleSheet.create({
    contaner: {
        flex: 1,
        padding: 10
    }
})
