import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, SafeAreaView, Modal } from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../../themes'
import { ActivityIndicator, HeaderTileComponent, FullNewButton, FullTextInput, Notification } from '../../components'
import I18n from 'react-native-i18n'
import moment from 'moment'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import { requestOTP } from '../../actions/Bank'
import { reqLoginWorldBank, reqUplaodListtoServer } from '../../actions/WorldBank'
import { isValidated } from '../../utils/Validate'
import * as Constant from '../../utils/Constant'
import { updateStatusPayment } from '../../Sqliteonline'
import LottieView from 'lottie-react-native';
import { ShowPayment } from '../../Sqliteonline'

let getdata = []
export class DetailsCashOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            date: moment(new Date()).format("YYYY-MM-DD h:mm:ss"),
            submitId: moment(new Date()).format("YYYYMMDDhmmss"),
            countCustomer: 0,
            setModalVisible: false,
            isLoading: false,
            dataRequest: null,
            valueotp: null,
            listCashOut: [],
            onuplaodtoServer: false,
            ListPayment: [],
        }
    }
    looData() {
        const { ListPayment } = this.state
        if (ListPayment.length > 0) {
            let listArray = [];
            for (let j = 0; j < ListPayment.length; j++) {
                if (ListPayment[j].status == 0) {
                    listArray.push({
                        "accountId": ListPayment[j].AccountID,
                        "cctId": ListPayment[j].PaymentCode,
                        "actionNode": ListPayment[j].ActionNode,
                        "amount": ListPayment[j].Amount,
                        "imageName": ListPayment[j].ImageName,
                        "gender": ListPayment[j].CustomerGender,
                        "customerName": ListPayment[j].CustomerName,
                        "language": ListPayment[j].Language,
                        "toName": ListPayment[j].ToName,
                        "fromName": ListPayment[j].FromName,
                        "transDes": ListPayment[j].TransactionDescription,
                        "payDate": ListPayment[j].payDate
                    })
                }
            }
            this.setState({ listCashOut: listArray })

        }
    }
    sumAmonut() {
        const { ListPayment } = this.state
        if (ListPayment.length > 0) {
            let totalAmount = 0;
            let totalFooter = 0;
            let i = 0;
            ListPayment.forEach((item) => {
                if (item.status == 0) {
                    totalAmount += parseInt(item.Amount)
                    i++;
                }

            });
            totalFooter = totalAmount > 0 ? totalAmount : 0
            this.setState({ total: totalFooter, countCustomer: i, dataRequest: getdata })
            this.looData()
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        ShowPayment().then((isData) => {
            this.setState({ ListPayment: isData, isLoading: false });
            this.looData()
            this.sumAmonut()
        }).catch((error) => {
            this.setState({ ListPayment: [], isLoading: false });
        });
    }
    onAccept() {
        const { infoAccount } = this.props
        const { codePin } = this.state
        RequestField.clearInitField()
        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
        RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
        RequestField.addToInitField(RequestField.addPin(codePin))//52
        RequestField.addToInitField(RequestField.addServiceCode('WORLD_BANK'))//41
        RequestField.addToInitField(RequestField.addServiceCode('WORLD_BANK'))//42
        RequestField.addToInitField(RequestField.addActionNode('1')) //22
        let dataOTP = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
        this.setState({ isRequestOTP: true, isLoading: true })
        this.props.requestOTP(dataOTP)
        RequestField.clearInitField()
    }
    componentWillReceiveProps(nextProps) {
        const { isRequestOTP, isLoading, onLoginWorldBank, dataRequest, total, valueotp, submitId, date, countCustomer, onuplaodtoServer, listCashOut } = this.state
        const { infoAccount } = this.props
        if (isRequestOTP && isLoading) {
            switch (nextProps.BankReducer.actionType) {
                case "GET_OTP_BANK_SUCCESS":
                    if (nextProps.BankReducer.getOTPBank.data) {
                        if (nextProps.BankReducer.getOTPBank.data.responseCode === '00000') {
                            this.setState({ isLoading: false, setModalVisible: true, isRequestOTP: false })
                        } else {
                            this.refs.messageRepos.onOpen()
                            this.setState({ isLoading: false, isRequestOTP: false, messageRepos: 'Error When Get OTP' })
                        }
                    } else {
                        this.refs.messageRepos.onOpen()
                        this.setState({ isLoading: false, isRequestOTP: false, messageRepos: 'Error PIN' })
                    }
                    break;
                case "GET_OTP_BANK_FAILED":
                    this.refs.messageRepos.onOpen()
                    this.setState({ isLoading: false, isRequestOTP: false, messageRepos: '' })
                    break;
                default:
                    break;
            }
        }
        if (isLoading && onLoginWorldBank) {
            console.log('nextProps.actionType', nextProps.actionType)
            console.log('nextProps.dataTokenWorldBank', nextProps.dataTokenWorldBank)
            this.setState({ setModalVisible: false })
            switch (nextProps.actionType) {
                case 'GET_TOKEN_WORLD_BANK_SUCCESS':
                    if (nextProps.dataTokenWorldBank) {
                        if (nextProps.dataTokenWorldBank.responseCode === '00000') {
                            let access_token = nextProps.dataTokenWorldBank.access_token
                            let data = `{
                                "submitId": "${submitId}",
                                "submitDate": "${date}",
                                "agentId": "${infoAccount.agentCode}",
                                "agentMsisdn": "${infoAccount.phoneNumber}",
                                "actionNode": "7",
                                "totalAmount": "${total}",
                                "totalReceive": "${countCustomer}",
                                "otpValue": "${valueotp}",
                                "dataRequest":${JSON.stringify(listCashOut)}
                            }`
                            console.log('data:', data)
                            this.props.reqUplaodListtoServer(data, access_token)
                            this.setState({ isLoading: true, onLoginWorldBank: false, onuplaodtoServer: true })
                        } else {
                            this.refs.messageRepos.onOpen()
                            this.setState({ isLoading: false, onLoginWorldBank: false, messageRepos: I18n.t('errorGetToken') })
                        }
                    } else {
                        this.refs.messageRepos.onOpen()
                        this.setState({ isLoading: false, onLoginWorldBank: false, messageRepos: I18n.t('errorGetToken') })
                    }
                    break;
                case 'GET_TOKEN_WORLD_BANK_FAILED':
                    this.refs.messageRepos.onOpen()
                    this.setState({ isLoading: false, onLoginWorldBank: false, messageRepos: I18n.t('errorGetToken') })
                    break;
                default:
                    break;
            }


        }
        if (onuplaodtoServer && isLoading) {
            console.log('first:',nextProps.actionType)
            switch (nextProps.actionType) {
                case 'UPLOAD_TO_SERVER_SUCCESS':
                    for (let index = 0; index < listCashOut.length; index++) {
                        const ListStatus = {
                            "AccountID": listCashOut[index].accountId,
                            "status": '1',
                        };
                        updateStatusPayment(ListStatus).then().catch((error) => {
                            alert(`Update ListNameImg error ${error}`);
                        });
                    }
                    let timestamp = nextProps.dataUpload.timestamp
                    let totalError = nextProps.dataUpload.totalError
                    let totalSuccess = nextProps.dataUpload.totalSuccess
                    let lstErr = nextProps.dataUpload.lstErr
                    this.props.navigation.navigate('TransactionResult', {
                        processName: I18n.t('cashOut'),
                        nameAgent: infoAccount.customerName,
                        AgentCode: infoAccount.agentCode,
                        phoneAgent: infoAccount.phoneNumber,
                        processCode: 'WordBank',
                        timestamp: timestamp,
                        totalError: totalError,
                        totalSuccess: totalSuccess,
                        lstErr: lstErr

                    })
                    this.setState({ isLoading: false, onuplaodtoServer: false })
                    break;
                case 'UPLOAD_TO_SERVER_FAILED':
                    this.refs.messageRepos.onOpen()
                    this.setState({ isLoading: false, onuplaodtoServer: false, messageRepos: I18n.t('errorUploadtoServer') })
                    break;
                default:
                    break;
            }
        }
    }
    onChangOTP(text) {
        if (text.length === 6) {
            let data = `{
                "username": "${ConfigCode.username}",
                "password":"${ConfigCode.password}",
                "passkey":"${ConfigCode.passkey}",
                "partner_code" : "${ConfigCode.partner_code}"
              }`
              
            this.props.reqLoginWorldBank(data)
            this.setState({ isLoading: true, onLoginWorldBank: true, valueotp: text })
        }
    }
    onClearisOTP() {
        this.setState({ isOTP: null })
    }
    messageRepos() {
        this.refs.messageRepos.onClose()
    }
    onCodePin(text) {
        const errorCodePin = !text || text.length < 6 || text.length > 8 || !isValidated(text, Constant.VALIDATE_NUMERIC) ? I18n.t('pleaseInputYourCurrentPin') : null
        this.setState({ codePin: text, errorCodePin })
    }
    onClearPhone() {
        this.setState({ codePin: null })
    }
    render() {
        const { infoAccount } = this.props
        const { date, submitId, total, countCustomer, isOTP, messageRepos, codePin, errorCodePin, listCashOut } = this.state
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                {this.state.isLoading ? <ActivityIndicator /> : null}

                <HeaderTileComponent txtHeader='transactionDetail' />
                {
                    listCashOut.length > 0 ?
                        <View style={{ width: '100%', height: '100%' }}>
                            <View style={styles.container}>
                                <View style={styles.main}>
                                    <View style={styles.left}>
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('transactionType')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{I18n.t('PaySubsidies')}</Text>
                                        </View>
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('merchantID')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{infoAccount.agentCode ? infoAccount.agentCode : null}</Text>
                                        </View>
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('FullName')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{infoAccount.customerName ? infoAccount.customerName : null}</Text>
                                        </View>
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('senderPhone')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{infoAccount.phoneNumber ? infoAccount.phoneNumber : null}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.left}>
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('total')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{total ? total : null}</Text>
                                        </View>
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('totalReceive')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{countCustomer ? countCustomer : null}</Text>
                                        </View>
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('submitId')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{submitId ? submitId : null}</Text>
                                        </View>
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('date')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{date ? date : null}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <HeaderTileComponent txtHeader='transactionDetail' />
                                    <View style={{ padding: 15, }}>
                                        <FullTextInput
                                            label={I18n.t('pleaseInputPinToLogin')}
                                            placeholder={I18n.t('inputPin')}
                                            returnKeyType='done'
                                            keyboardType='numeric'
                                            value={codePin}
                                            error={errorCodePin}
                                            maxLength={8}
                                            secureTextEntry={true}
                                            onChangeUserName={(text) => this.onCodePin(text)}
                                            iconLeft='facebook'
                                            iconRight='close'
                                            textError={I18n.t('accept6DigitsOnly')}
                                            onclick={() => this.onClearPhone()}

                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.buttom}>
                                <FullNewButton
                                    text={I18n.t('accept')}
                                    onPress={() => this.onAccept()}
                                    isDisable={(!codePin || errorCodePin) ? true : false}
                                />
                            </View>
                        </View>
                        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View>
                                <LottieView
                                    source={require('../../../assets/nodataError.json')}
                                    autoPlay
                                    loop
                                    style={[{ width: 300, height: 300, }]}
                                />
                            </View>

                        </View>
                }
                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={messageRepos}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.messageRepos()}
                    ref='messageRepos'
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.setModalVisible}
                    onRequestClose={() => {
                        this.setState({ setModalVisible: false })
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{I18n.t('EnterOTP')}</Text>
                            <Text style={{ color: '#989898', textAlign: 'center', marginBottom: 5 }}>{I18n.t('titelOTP')}</Text>
                            <Text style={{ color: '#989898', textAlign: 'center', marginBottom: 5 }}>
                                {I18n.t('OTPTimedOut')} 0{this.state.mins}:{this.state.secs <= 9 ? "0" + this.state.secs : this.state.secs}</Text>
                            <Text></Text>
                            <View style={{ width: '100%', marginBottom: 15 }}>
                                <FullTextInput
                                    label={I18n.t('pleaseEnterOTP')}
                                    placeholder={I18n.t('pleaseEnterOTP')}
                                    returnKeyType='done'
                                    keyboardType='numeric'
                                    value={isOTP}
                                    error={null}
                                    maxLength={6}
                                    onChangeUserName={(text) => this.onChangOTP(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    textError={I18n.t('incorrectPhoneNumber')}
                                    onclick={() => this.onClearisOTP()}
                                />
                            </View>

                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = state => ({
    infoAccount: state.auth.infoAccount,
    BankReducer: state.BankReducer,
    TransferToBank: state.BankReducer.TransferToBank,
    actionType: state.BankReducer.actionType,

    WorldBank: state.WorldBank,
    actionType: state.WorldBank.actionType,
    dataTokenWorldBank: state.WorldBank.dataTokenWorldBank,
    dataUpload: state.WorldBank.dataUpload,


})

const mapDispatchToProps = (dispatch) => {
    return {
        requestOTP: (data) => { dispatch(requestOTP(data)) },
        reqLoginWorldBank: (data) => { dispatch(reqLoginWorldBank(data)) },
        reqUplaodListtoServer: (data, access_token) => { dispatch(reqUplaodListtoServer(data, access_token)) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsCashOut)
const styles = StyleSheet.create({
    container: {
        height: '80%'
    },
    main: {
        flexDirection: 'row',
        padding: 15,
        width: '100%',
    },
    buttom: {
        height: '20%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        width: '50%'
    },
    groupText: {
        marginBottom: 10
    },
    labelInfo: {
        fontSize: 15,
        color: Colors.iconTab
    },
    valueInfo: {
        color: Colors.black,
        marginRight: 15,
        fontSize: 14,
        marginTop: 5,
        fontWeight: 'bold'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        backgroundColor: 'rgba(224, 224, 224, 0.6)'
    },
    modalView: {
        width: '100%',
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
        alignItems: "center",
        height: '50%'
    },
    modalText: {
        marginBottom: 10,
        textAlign: "center",
        fontWeight: 'bold'
    },
})


