import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity, StatusBar, SafeAreaView, Alert } from 'react-native';
import { ActivityIndicator, Notification, LeasingInputComponent, AlertNative } from '../../components'
import styles from './styles'
import { Colors, Images } from '../../themes'
import I18n from 'react-native-i18n'
import { requestCheckContractNumber } from '../../actions/Auth'
import { connect } from 'react-redux'
import { onGetFeeTopupETL } from '../../actions/TopUp'
import { requestHistoryTranfer } from '../../actions/Auth'

class LeasingInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isCheckContractNumber: false,
            bar: 'dark-content',
            reponMesseng: null
        };
    }
    componentWillMount() {
        const { infoAccount } = this.props
        if (this.props.route.params != undefined) {

            let type = this.props.route.params.data;
            console.log('----type-----', type)
            let id = type.id
            let title = type.title
            let img = type.IMAGE
            let parnerCode = type.PARTNER_CODE
            let languageLA = type.EN_LA
            let languageUS = type.EN_US
            let languageVN = type.EN_VN
            let languageCN = type.EN_CN
            let partnerType = type.PARTNER_TYPE
            let processCode = type.PROCESS_CODE
            let code = type.CODE
            this.setState({
                title: title, id: id, img: img,
                parnerCode: parnerCode,
                languageLA: languageLA,
                languageUS: languageUS,
                languageVN: languageVN,
                languageCN: languageCN,
                partnerType: partnerType,
                processCode: processCode,
                code: code
            })
            try {
                let _processCode = type.PROCESS_CODE
                let _accountId = infoAccount.accountId
                let phoneNumber = infoAccount.phoneNumber
                this.props.requestHistoryTranfer(_accountId, _processCode, phoneNumber)
                this.setState({ isLoading: true, getHistoryCashin: true })
            } catch (e) {
                console.log('Error')
            }
        }
    }
    onClickChange() {
        this.props.navigation.goBack(null);
    }
    onPressProcess(ContractNumber, Amount, saveInfo) {
        try {
            const { partnerType, processCode, code, data } = this.state
            if (ContractNumber && Amount && partnerType && processCode && code && data) {
                this.props.navigation.navigate('TransactionDetail', {
                    data: data,
                    Amount: Amount,
                    keyType: partnerType,
                    getFeeTopup: 0,
                    onProcess: 'PAYMENT_LEASING',
                    processName: I18n.t('leasing'),
                    selectState: 'LEASING_PAYMENT',
                    processCode: processCode,
                    saveInfo: saveInfo,
                    ContractNumber: ContractNumber,
                    money: Amount,
                    partnerCodeFee: code == 'WELCOME' ? 'LEASING_WELCOM' : 'LEASING_AEON',
                    serviceCodeFee: 'Motor Cycle lease',//
                    checkDiscount: true//

                })
            }else{
                AlertNative(I18n.t('pleaseInputToEmptyField'))
            }
        } catch (error) {
            AlertNative(error)
        }
    }
    checkContractNamber(text,access, ContractNumber, Amount, saveInfo) {
        try {
            let parnerCode = this.state.parnerCode
            if (text && parnerCode) {
                this.props.requestCheckContractNumber(text, parnerCode)
                this.setState({ isCheckContractNumber: true, isLoading: true , access, ContractNumber, Amount, saveInfo})
            } else {
                Alert.alert(I18n.t('pleaseInputToEmptyField'))
            }
        } catch (error) {
            Alert.alert(error)
        }
    }
    componentWillReceiveProps(nextProps) {
        const { isCheckContractNumber, isLoading, access, ContractNumber, Amount, saveInfo } = this.state
        if (isCheckContractNumber && isLoading) {
            switch (nextProps.actionType) {
                case 'CHECK_CONTRACT_NUMBER_SUCCESS':
                    if (nextProps.requestContractNumber.LEASING[0]) {
                        let name = nextProps.requestContractNumber.LEASING[0].LAO_NAME
                        let ContractNo = nextProps.requestContractNumber.LEASING[0].CONTRACT_NO
                        let data = nextProps.requestContractNumber
                        this.setState({ name, ContractNo, data })
                    } else if(access){
                        this.onPressProcess(ContractNumber, Amount, saveInfo)
                    }
                    this.setState({ isCheckContractNumber: false, isLoading: false })
                    break;
                case 'CHECK_CONTRACT_NUMBER_FAILED':
                    this.refs.error10130.onOpen()
                    this.setState({ isCheckContractNumber: false, isLoading: false, name: null })
                    break;
                default:
                    break;
            }
        }


        if (this.state.getHistoryCashin) {
            switch (nextProps.actionType) {
                case 'REQUES_HISTORY_TRANFER_SUCCESS':
                    let dataReques = nextProps.requesHistoryTranfer.recentCollections.recentTransactions
                    this.setState({ isLoading: false, getHistoryCashin: false, dataReques })
                    console.log('dataReques:', dataReques)
                    break;
                case 'REQUES_HISTORY_TRANFER_FAILED':
                    this.setState({ isLoading: false, getHistoryCashin: false })
                    break;
                default:
                    break;
            }
        }
    }
    error10130() {
        this.refs.error10130.onClose()
    }
    error10119() {
        this.refs.error10119.onClose()
    }
    reponMesseng() { this.refs.reponMesseng.onClose() }
    render() {
        const { isLoading, title, id, img, languageLA, languageUS, languageCN,
            languageVN, parnerCode, code, dataReques, reponMesseng, processCode, name, ContractNo } = this.state
        const { infoAccount } = this.props
        let symbol = id
        console.disableYellowBox = true;
        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <SafeAreaView style={styles.box}>
                    <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
                    {isLoading ? <ActivityIndicator /> : null}
                    <View style={styles.header}>
                        <View style={styles.iconText}>
                            <View style={{ width: '20%', padding: 10 }}>
                                <Image source={code == 'WELCOME' ? Images.ic_welcome
                                    : code == 'AEON' ? Images.ic_aecon : null} style={styles.image} />
                            </View>
                            <View style={{ padding: 10, width: '80%' }}>
                                {
                                    infoAccount.language === 'en_LA' ? <Text>{languageLA}</Text>
                                        : infoAccount.language === 'en_US' ? <Text>{languageUS}</Text>
                                            : infoAccount.language === 'en_CN' ? <Text>{languageCN}</Text>
                                                : infoAccount.language === 'en_VN' ? <Text>{languageVN}</Text>
                                                    : null
                                }
                                <Text>{parnerCode}</Text>
                            </View>
                        </View>
                        <View style={styles.TextChange}>
                            <TouchableOpacity onPress={() => this.onClickChange()}>
                                <Text style={{ color: Colors.txtUpLight }}>{I18n.t('Change')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <LeasingInputComponent
                        minAmount={5000}
                        keyType={symbol}
                        isDataReques={dataReques}
                        processCode={processCode}
                        code={code}
                        ContractNam={name}
                        ContractNo={ContractNo}
                        checkContractNamber={(text,access, ContractNumber, Amount, saveInfo) => this.checkContractNamber(text, access, ContractNumber, Amount, saveInfo)}
                        onPressProcess={(ContractNumber, Amount, saveInfo) => this.onPressProcess(ContractNumber, Amount, saveInfo)}
                    />
                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('InvalidContract')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.error10130()}
                        ref='error10130'
                    />

                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('error10119')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.error10119()}
                        ref='error10119'
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
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
        actionType: state.auth.actionType,
        isFetching: state.cashOut.isFetching,
        requestContractNumber: state.auth.requestContractNumber,
        checkFeetopup: state.topUp.checkFeetopup,
        actionType: state.auth.actionType,
        requesHistoryTranfer: state.auth.requesHistoryTranfer,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onGetFeeTopupETL: (data) => { dispatch(onGetFeeTopupETL(data)) },
        requestCheckContractNumber: (ContractNumber, parnerCode) => { dispatch(requestCheckContractNumber(ContractNumber, parnerCode)) },
        requestHistoryTranfer: (_accountId, _processCode, phoneNumber) => { dispatch(requestHistoryTranfer(_accountId, _processCode, phoneNumber)) },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LeasingInput)



