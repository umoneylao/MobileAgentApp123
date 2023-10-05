import React, { Component } from 'react';
import { View, Text, Keyboard, TouchableOpacity, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import styles from './styles'
import { Colors, Images } from '../../themes'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { LaoVietBankComponent, ActivityIndicator, Notification } from '../../components'
import * as ConfigCode from '../../utils/ConfigCode'
import * as RequestField from '../../utils/RequestField'
import { requestCheckAccuont, requestGetFee } from '../../actions/Bank'
import {
    CHECK_ACCUONT_BANK_FALSE, CHECK_ACCUONT_BANK_SUCCESS
} from '../../actions/types';
import * as FIELD from '../../utils/CoreFieldMap'
import { onCallCheckSwich, requestCheckAmount } from '../../actions/ByPassPIN'

class TranferToBankAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            reposMess: null,
            AccountBankName: null,
            byPassPIN: false
        };
    }
    componentWillMount() {
        if (this.props.route.params != undefined) {

            let type = this.props.route.params.data;
            //console.log('type:', type.PROCESS_CODE)
            let id_Bank = type.PARTNER_CODE
            let title = type.CODE
            let processCode = type.PROCESS_CODE
            let languageLA = type.EN_LA
            let languageUS = type.EN_US
            let languageVN = type.EN_VN
            let languageCN = type.EN_CN
            let QRlaoViet = type.QRlaoViet
            this.setState({
                title: title,
                id_Bank: id_Bank,
                processCode: processCode,
                languageLA: languageLA,
                languageUS: languageUS,
                languageVN: languageVN,
                languageCN: languageCN,
                QRlaoViet: QRlaoViet
            })
        } else {
            Alert('Can not get data')
        }


    }
    componentDidMount() {
        this.onCheckBypassPIN()
    }
    componentWillUnmount() {
        this.props.navigation.popToTop()
    }
    onClickChange() {
        this.props.navigation.goBack(null);
    }
    onCheckBypassPIN() {
        const { infoAccount } = this.props;
        let data = infoAccount.accountId;
        console.log('accountId:', data)
        this.props.onCallCheckSwich(data);
        this.setState({ isCallCheckSwich: true, isLoading: true })
    }
    onPressProcess(BankAccount, Amount, Content, saveInfo) {
        try {
            const { infoAccount } = this.props
            const { AccountBankName, AccountNo, toName, id_Bank, processCode, title, dataAmount, byPassPIN } = this.state

            if (BankAccount && Amount && AccountBankName && AccountNo) {
                let moneyCusInput = parseInt(Amount.replace(/,/g, ""))
                // let money = Amount.replace(",", "")
                console.log('--moneyCusInput---', moneyCusInput)
                console.log('--dataAmount.par_value---', dataAmount)
                this.props.navigation.navigate('TransactionDetail',
                    {
                        AmountBank: Amount,
                        Content: Content ? Content : 'Transfer to bank',
                        AccountBankName: AccountBankName,
                        FeeBank: 0,
                        toName: toName,
                        AccountNo: AccountNo === BankAccount ? AccountNo : BankAccount, //BankAccount  AccountNo
                        onProcess: 'TRANSFER_EWALLET_TO_BANK',
                        selectState: 'TRANSFER_TO_BANK',
                        service: I18n.t('NAV_VIET_BANK'),
                        id_Bank: id_Bank,
                        processCode: processCode,
                        saveInfo: saveInfo,
                        serviceCodeFee: '',
                        money: Amount,
                        toAccountId: infoAccount.accountId,//
                        partnerCodeFee: title == 'BCEL' ? 'BANK_BCEL' : title == 'LVB' ? 'BANK_LVB' : title == 'MARUHAN' ? 'BANK_MARUHAN' : title == 'JDB' ? 'BANK_JDB' : null,//
                        checkDiscount: true,//
                        byPassPIN: byPassPIN,
                        // checkAmount: true,
                        checkAmount: moneyCusInput <= parseInt(dataAmount.par_value) ? true : false
                    })
            } else {
                alert('Data is null')
            }
        } catch (error) {
            Alert.alert(error);
        }

    }
    componentWillReceiveProps(nextProps) {
        try {
            const { access, BankAccount, Amount, Content, saveInfo, isCheckAmount, isCallCheckSwich, isLoading } = this.state
            const { infoAccount } = this.props
            if (this.state.isRequestCheckAccuont && this.state.isLoading) {
                this.setState({ isLoading: false, isRequestCheckAccuont: false })
                switch (nextProps.BankReducer.actionType) {
                    case CHECK_ACCUONT_BANK_SUCCESS:
                        if (nextProps.BankReducer.checkAccuontBank.data) {
                            let response = RequestField.getValueField(nextProps.BankReducer.checkAccuontBank.data.fieldMap, FIELD.RESPONSE_CODE);
                            let mess = RequestField.getValueField(nextProps.BankReducer.checkAccuontBank.data.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                            switch (response) {
                                case '00000':
                                    console.log('CHECK_ACCUONT_BANK_SUCCESS:', nextProps.BankReducer.checkAccuontBank.data)
                                    let AccountBankName = RequestField.getValueField(nextProps.BankReducer.checkAccuontBank.data.fieldMap, FIELD.BANK_ACCOUNT_NAME);
                                    let AccountNo = RequestField.getValueField(nextProps.BankReducer.checkAccuontBank.data.fieldMap, FIELD.BANK_ACCOUNT_NO);
                                    let toName = RequestField.getValueField(nextProps.BankReducer.checkAccuontBank.data.fieldMap, FIELD.TO_NAME);
                                    this.setState({ isLoading: false, isRequestCheckAccuont: false, AccountBankName: AccountBankName, AccountNo, toName, response })
                                    if (access) {
                                        this.onPressProcess(BankAccount, Amount, Content, saveInfo)
                                    }

                                    break;
                                case response:
                                    this.refs.reposMess.onOpen();
                                    this.setState({ isLoading: false, reposMess: mess, isRequestCheckAccuont: false, response })
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            Alert.alert(I18n.t(''))
                        }
                        break;
                    case CHECK_ACCUONT_BANK_FALSE:
                        this.setState({ isLoading: false })
                        break;
                    default:
                        break;
                }
            }
            if (isCallCheckSwich && isLoading) {
                if (nextProps.ByPassPinReducer.dataCheckSwich) {
                    switch (nextProps.ByPassPinReducer.actionType) {
                        case 'CALL_CHECK_SWICH_SUCCESS':
                            let d = nextProps.ByPassPinReducer.dataCheckSwich.bypassConfigCollection
                            let dataSwich
                            try {
                                let strData = d.data[0]
                                if (strData) {
                                    dataSwich = nextProps.ByPassPinReducer.dataCheckSwich.bypassConfigCollection.data[0]
                                    let data = 'AMOUNT_BYPASS_PIN_OTP_W2B';
                                    this.props.requestCheckAmount(data);
                                    this.setState({ byPassPIN: dataSwich.status == 1 ? true : false, isCallCheckSwich: false, isCheckAmount: true, isLoading: true })
                                } else {
                                    let data = 'AMOUNT_BYPASS_PIN_OTP_W2B';
                                    this.props.requestCheckAmount(data);
                                    this.setState({ byPassPIN: true,  isCallCheckSwich: false, isLoading: false, isCheckAmount: true })
                                }

                            } catch (error) {
                                let data = 'AMOUNT_BYPASS_PIN_OTP_W2B';
                                this.props.requestCheckAmount(data);
                                this.setState({ byPassPIN: true, isCallCheckSwich: false, isLoading: false, isCheckAmount: true })
                            }

                            break;
                        case 'CALL_CHECK_SWICH_FAILED':
                            this.refs.reposMess.onOpen()
                            this.setState({ isCallCheckSwich: false, isLoading: false, reposMess: 'CALL_CHECK_SWICH_FAILED' })
                            break;
                        default:
                            break;
                    }
                } else {
                    this.setState({ isCallCheckSwich: false, isLoading: false })
                }
            }
            if (isCheckAmount) {
                console.log('nextProps.ByPassPinReducer:', nextProps.ByPassPinReducer)
                switch (nextProps.ByPassPinReducer.actionType) {
                    case 'CALL_CHECK_AMOUNT_SUCCESS':
                        if (nextProps.ByPassPinReducer.dataCheckAmount) {
                            console.log('nextProps.ByPassPinReducer.dataCheckAmount-----22222---', nextProps.ByPassPinReducer.dataCheckAmount.amountConfigCollection)
                            let dataAmount = nextProps.ByPassPinReducer.dataCheckAmount.amountConfigCollection.data[0]
                            this.setState({ isCheckAmount: false, isLoading: false, dataAmount })
                        }
                        break;
                    case 'CALL_CHECK_AMOUNT_FAILED':
                        this.refs.reposMess.onOpen()
                        this.setState({ reposMess: 'CALL_CHECK_AMOUNT_FAILED', isCheckAmount: false, isLoading: false })
                        break;
                }

            }
        } catch (error) {
            Alert.alert(error);
        }
    }

    reposMess() { this.refs.reposMess.onClose() }
    onCheckinfoAccountBank(text, access, BankAccount, Amount, Content, saveInfo) {
        try {
            if (text) {
                Keyboard.dismiss()
                const { id_Bank } = this.state
                const { infoAccount, AccountBankName } = this.props
                console.log('---access----', access)
                console.log('BankAccount:', BankAccount)
                console.log('Amount:', Amount)
                console.log('Content:', Content ? Content : 'Content')
                console.log('infoAccount:', infoAccount.customerName)
                if (!AccountBankName) {
                    RequestField.clearInitField()
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.CHECK_ACCOUNT_LAOVIET_BANK)) //3
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                    RequestField.addToInitField(RequestField.addFromPhone(infoAccount.phoneNumber))//105
                    RequestField.addToInitField(RequestField.addFromAccountId(infoAccount.accountId))//76
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    RequestField.addToInitField(RequestField.addPartnerCode(id_Bank))//41
                    RequestField.addToInitField(RequestField.addBankAccountNo(text))//88
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                    let data = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    console.log('CHECK_ACCOUNT_BANK:', data)
                    this.setState({ isRequestCheckAccuont: true, isLoading: true, access, BankAccount, Amount, Content, saveInfo })
                    this.props.requestCheckAccuont(data)
                    RequestField.clearInitField();
                }

            } else {
                Alert.alert(I18n.t('noDataFound'))
            }
        } catch (error) {
            Alert.alert(error)
        }
    }

    render() {
        const { title, id_Bank, isLoading, languageCN,
            languageLA, languageUS, languageVN, reposMess, processCode, QRlaoViet, AccountBankName, AccountNo, response } = this.state
        const { infoAccount } = this.props

        return (

            <SafeAreaView style={{ backgroundColor: Colors.white }}>
                {isLoading ? <ActivityIndicator /> : null}
                <View style={styles.header}>
                    <View style={styles.iconText}>
                        <View style={styles.image}>
                            <Image source={
                                id_Bank == 'BANK_BCEL' ? Images.logo_bcel
                                    : id_Bank === 'BANK_JDB' ? Images.logo_jdbbank
                                        : id_Bank === 'BANK_LDB' ? Images.logo_ldbbank
                                            : id_Bank === 'BANK_LVB' ? Images.logo_laovietbank
                                                : id_Bank === 'BANK_ACLEDA' ? Images.ic_acleda
                                                    : id_Bank === 'BANK_MARUHAN' ? Images.logo_maruhanbank
                                                        : id_Bank === 'BANK_SACOM' ? Images.ic_mt
                                                            : id_Bank === 'BANK_BIC' ? Images.ic_bic
                                                                : id_Bank === 'BANK_MAY' ? Images.ic_mayBank
                                                                    : id_Bank === 'BANK_APB' ? Images.ic_apb
                                                                        : null
                            } style={styles.image} />
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text>{title}</Text>
                            {
                                infoAccount.language == 'en_LA' ? <Text style={styles.itemTextFullname} numberOfLines={2}>{languageLA}</Text>
                                    : infoAccount.language == 'en_US' ? <Text style={styles.itemTextFullname} numberOfLines={2}>{languageUS}</Text>
                                        : infoAccount.language == 'en_VN' ? <Text style={styles.itemTextFullname} numberOfLines={2}>{languageVN}</Text>
                                            : infoAccount.language == 'en_CN' ? <Text style={styles.itemTextFullname} numberOfLines={2}>{languageCN}</Text>
                                                : null
                            }
                        </View>
                    </View>
                    <View style={styles.TextChange}>
                        <TouchableOpacity onPress={() => this.onClickChange()} style={styles.textCheang}>
                            <Text style={{ color: Colors.txtUpLight, textAlign: 'right' }}>{I18n.t('Change')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <LaoVietBankComponent
                        minAmount={5000}
                        processCode={processCode}
                        numberAccount={QRlaoViet}
                        AccountBankName={AccountBankName}
                        getAccountNo={AccountNo}
                        response={response}
                        onCheckinfoAccountBank={(text, access, BankAccount, Amount, Content, saveInfo) => this.onCheckinfoAccountBank(text, access, BankAccount, Amount, Content, saveInfo)}
                        onPressProcess={(BankAccount, Amount, Content, saveInfo) => this.onPressProcess(BankAccount, Amount, Content, saveInfo)}
                    />
                </ScrollView>
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
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isFetching: state.BankReducer.isFetching,
        infoAccount: state.auth.infoAccount,
        BankReducer: state.BankReducer,
        actionType: state.auth.actionType,
        requesHistoryTranfer: state.auth.requesHistoryTranfer,

        ByPassPinReducer: state.ByPassPinReducer,
        dataOnSecurity: state.ByPassPinReducer.dataOnSecurity,
        dataCheckSwich: state.ByPassPinReducer.dataCheckSwich,
        dataCheckAmount: state.ByPassPinReducer.dataCheckAmount,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestCheckAccuont: (data) => { dispatch(requestCheckAccuont(data)) },
        requestGetFee: (data) => { dispatch(requestGetFee(data)) },
        onCallCheckSwich: (data) => { dispatch(onCallCheckSwich(data)) },
        requestCheckAmount: (data) => { dispatch(requestCheckAmount(data)) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TranferToBankAccount);
