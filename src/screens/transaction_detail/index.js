import React, { Component } from 'react';
import { View, Text, ScrollView, Modal, TouchableWithoutFeedback, StatusBar, SafeAreaView, Keyboard, Alert, TouchableOpacity, Pressable } from 'react-native';
import { ActivityIndicator, FullNewButton, Notification, FullTextInput } from '../../components'
import styles from './styles'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { Colors, Images } from '../../themes'
import * as Constant from '../../utils/Constant'
import { isValidated } from '../../utils/Validate'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import * as FIELD from '../../utils/CoreFieldMap'
import { formatNumber, formatToDDMMYYYY } from '../../utils/Formater'
import { requestCashIn, requestCashOut, requestCashInTranfer } from '../../actions/CashOut'
import _ from 'lodash'
import { transferOtherToOther } from '../../actions/Transfer'
import { handleResponseCode } from '../../utils/ErrorManager'
import { agentCashOut, agentReqBankMoney, agentRequestEmoney, agentRegForUser } from '../../actions/Request'
import { requestOTP, requestTranferBank, requestTranferBccs, reqCheckInfoDiscount } from '../../actions/Bank'
import {
    GET_OTP_BANK_FAILED, GET_OTP_BANK_SUCCESS,
    TRANSFER_EWALLET_TO_BANK_SUCCESS, TRANSFER_EWALLET_TO_BANK_FAILED
} from '../../actions/types';
import { requestTopUp, requestTopup_ETL } from '../../actions/TopUp'
import { paymentLeasingAeon } from '../../actions/Leasing'
import { requestBuyLottery, requestSaleLottery, luckyLottery, requestBuyLotteryNCC } from '../../actions/Lottery'
import CheckBox from 'react-native-modest-checkbox'
import { requestApproval } from '../../actions/WorldBank'
import { paymentInsurance } from '../../actions/InsuranceAction'
import { PaymentWatterNpp } from '../../actions/Watter'
import { onCashOutWordBank } from '../../actions/Auth'

import moment from "moment";
import CountDown from 'react-native-countdown-component';

class TransactionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            phone: '',
            money: '',
            message: '',
            toAccountId: '',
            toName: '',
            processName: '',
            customerName: '',
            phoneCustomer: '',
            codePin: null,
            errorCodePin: null,
            setModalVisible: false,
            isOTP: null,
            senderPhone: '',
            onProcess: '',
            senderPhone: '',
            fromPhone: '',
            toPhone: '',
            isRequestCashOut: false,
            secretCode: '',
            referenceId: '',

            isRequestCashIn: false,
            bankCode: '',
            bankTransId: '',
            AmountBank: '',
            Content: '',
            AccountBankName: '',
            FeeBank: '',
            AccountNo: '',
            selectState: '',
            fee: '',
            serviceType: '',
            paymentCode: '',
            serviceCodeInternet: '',
            name: '',
            ident: '',
            valueType: '',
            mBirthDay: '',
            male: '',
            tranDes: '',
            phoneRegister: '',
            year: '',
            selectedDate: '',
            numberPhone: '',
            address: '',

            onBuyLottery: false,
            onSellLottery: false,
            onCheckBacodeLottery: false,
            msisdn: '',
            laoName: '',
            englishName: '',
            amount: '',
            status: '',
            contractNo: '',
            totalBuy: '',

            Transaction: null,
            money: null,
            date: null,
            name: null,
            from_phone: null,
            from_id: null,
            to_phone: null,
            to_id: null,
            org_amount: null,
            fee: null,
            total_amount: null,
            request_reason: null,
            request_user: null,
            date_created: null,
            bank_transid: null,
            bank_code: null,
            bank_name: null,
            action_state_id: null,
            action_state_name: null,
            process_code: null,
            from_channel_id: null,
            to_channel_id: null,
            account_type_id: null,
            adjusted_type: null,
            payer_paper_number: null,
            payer_name: null,
            action_id: null,
            channel_name: null,
            channel_phone: null,
            request_no: null,
            action_node_id: null,
            action_node_name: null,
            payer_paper_type: null,
            content: null,
            role_name: null,
            is_forward: null,
            payer_phone: null,
            reject_reason: null,
            isChecked: false,
            messageError: null,
            isTransferOtherToOther: false,
            responseMessage: '',
            phoneAgent: '',
            onBuyLotteryNCC: false,
            shopCode: '',
            saveInfo: 0,
            selectPartnert: '',
            eventDate: moment.duration().add({ seconds: 59 }),
            DISCOUNT_APA: null,
            VAT_APA: null,
            FEE_APA: null,
            GRAND_TOTAL_APA: null,
            InsuredName_APA: null,
            Phone_APA: null,
            DateBirth_APA: null,
            Gender_APA: null,
            PaperType_APA: null,
            Address_APA: null,
            FullName_APA: null,
            Relation_APA: null,
            male_APA: null,
            Package_APA: null,
            policyNo_APA: null,
            PaperNumber_APA: null,

            mainPhone: null,
            customerName: null,
            partnerCode: null,
            totalAmont: null,
            getFee: null,
            getCommition: null,
            getDiscount: null,
            serviceCodeFee: '',
            partnerCodeFee: '',
            newDirectory: null,
            dataItem: [],
            phone_topup: null,
            run: false,
            byPassPIN: null,
            checkAmount: null,

            balance: null,
            cttID: null,
            accountID: null,
            note: null,
            img: null,
            agentCode: null,
            Gender: null,
            DetailToName: null,
            DetailFromName: null,
            Name: null,
            nameCustomer: null
        };
    }
    UNSAFE_componentWillMount() {
        if (this.props.route.params != undefined) {
            ////console.log('----->', this.props.route.params)
            let money = this.props.route.params.money;
            let message = this.props.route.params.message;
            let phone = this.props.route.params.phone;
            let toAccountId = this.props.route.params.toAccountId;
            let toName = this.props.route.params.toName;
            let processName = this.props.route.params.processName;
            let receiverPhone = this.props.route.params.receiverPhone;
            let onProcess = this.props.route.params.onProcess;
            let senderPhone = this.props.route.params.senderPhone;
            let fromPhone = this.props.route.params.fromPhone;
            let toPhone = this.props.route.params.toPhone;
            let secretCode = this.props.route.params.secretCode;
            let referenceId = this.props.route.params.referenceId;
            let processCode = this.props.route.params.processCode;
            let bankCode = this.props.route.params.bankCode;
            let bankTransId = this.props.route.params.bankTransId;

            let AmountBank = this.props.route.params.AmountBank;
            let Content = this.props.route.params.Content;
            let AccountBankName = this.props.route.params.AccountBankName;
            let FeeBank = this.props.route.params.FeeBank;
            let AccountNo = this.props.route.params.AccountNo;
            let id_Bank = this.props.route.params.id_Bank;
            let service = this.props.route.params.service;

            let mainPhone = this.props.route.params.mainPhone;
            let customerName = this.props.route.params.customerName;
            let partnerCode = this.props.route.params.partnerCode;
            let totalAmont = this.props.route.params.totalAmont;

            let selectState = this.props.route.params.selectState;
            let fee = this.props.route.params.getFeeTopup;
            let serviceType = this.props.route.params.serviceType;
            let paymentCode = this.props.route.params.paymentCode;
            let serviceCodeInternet = this.props.route.params.serviceCodeInternet;
            let onSelect = this.props.route.params.onSelect;
            let name = this.props.route.params.name;
            let ident = this.props.route.params.ident;
            let valueType = this.props.route.params.valueType;
            let mBirthDay = this.props.route.params.mBirthDay;
            let male = this.props.route.params.male;
            let tranDes = this.props.route.params.tranDes;
            let phoneRegister = this.props.route.params.phoneRegister;
            let year = this.props.route.params.year;
            let selectedDate = this.props.route.params.selectedDate;

            let numberPhone = this.props.route.params.numberPhone;
            let address = this.props.route.params.address;

            let Amount = this.props.route.params.Amount;
            let keyType = this.props.route.params.keyType;
            let saveInfo = this.props.route.params.saveInfo;

            let newMiniState = this.props.route.params.newMiniState;
            let totalBuy = this.props.route.params.totalBuy;
            let listDataNumberLottery = this.props.route.params.item;

            let totalSale = this.props.route.params.totalSale;
            let newMiniStateSale = this.props.route.params.newMiniStateSale;
            let PhoneCusBuy = this.props.route.params.PhoneCusBuy;

            let luckyPhone = this.props.route.params.luckyPhone;
            let Barcode = this.props.route.params.Barcode;

            let support = this.props.route.params.support;
            let messagesignature = this.props.route.params.messagesignature;

            let GetUserName = this.props.route.params.GetUserName;
            let GetStaffCode = this.props.route.params.GetStaffCode;
            let GetStaffName = this.props.route.params.GetStaffName;
            let GetShopCode = this.props.route.params.GetShopCode;

            let phoneAgent = this.props.route.params.phoneAgent;

            let shopCode = this.props.route.params.shopCode;
            let selectPartnert = this.props.route.params.selectPartnert;

            let checkDiscount = this.props.route.params.checkDiscount;
            let serviceCodeFee = this.props.route.params.serviceCodeFee;
            let partnerCodeFee = this.props.route.params.partnerCodeFee;
            let phone_topup = this.props.route.params.phone_topup;
            let byPassPIN = this.props.route.params.byPassPIN;

            let checkAmount = this.props.route.params.checkAmount;

            let balance = this.props.route.params.balance;
            let cttID = this.props.route.params.cttID;
            let accountID = this.props.route.params.accountID;
            let note = this.props.route.params.note;
            let img = this.props.route.params.img;
            let agentCode = this.props.route.params.agentCode;
            let Gender = this.props.route.params.Gender;
            let DetailToName = this.props.route.params.DetailToName;
            let DetailFromName = this.props.route.params.DetailFromName;
            let Name = this.props.route.params.Name;
            let nameCustomer = this.props.route.params.nameCustomer;


            if (this.props.route.params.data != undefined) {
                ////console.log('getdata.LEASING[0].PARTNER_CODE:', this.props.route.params.data)
                let getdata = this.props.route.params.data;
                let contractNo = getdata.LEASING[0].CONTRACT_NO
                let msisdn = getdata.LEASING[0].MSISDN
                let laoName = getdata.LEASING[0].LAO_NAME
                let englishName = getdata.LEASING[0].ENGLISH_NAME
                let amount = getdata.LEASING[0].AMOUNT
                let status = getdata.LEASING[0].STATUS
                let serviceCode = getdata.LEASING[0].SERVICE_CODE
                let partnerCode = getdata.LEASING[0].PARTNER_CODE

                this.setState({
                    contractNo: contractNo,
                    msisdn: msisdn,
                    laoName: laoName,
                    englishName: englishName,
                    amount: amount,
                    status: status,
                    serviceCode: serviceCode,
                    partnerCodeLessing: partnerCode
                })

            }

            const { infoAccount } = this.props
            this.setState({
                money: money,
                phone: phone,
                message: message,
                toAccountId: toAccountId,
                toName: toName,
                processName: processName,
                receiverPhone: receiverPhone,
                onProcess: onProcess,
                support: support,
                senderPhone: senderPhone,
                fromPhone: fromPhone,
                toPhone: toPhone,
                secretCode: secretCode,
                referenceId: referenceId,
                processCode: processCode,
                bankCode: bankCode,
                bankTransId: bankTransId,

                AmountBank: AmountBank,
                Content: Content,
                AccountBankName: AccountBankName,
                FeeBank: FeeBank,
                AccountNo: AccountNo,
                id_Bank: id_Bank,
                service: service,

                selectState: selectState,
                fee: fee,
                numberPhone: numberPhone,
                address: address,

                name: name,
                ident: ident,
                valueType: valueType,
                mBirthDay: mBirthDay,
                male: male,
                tranDes: tranDes,
                phoneRegister: phoneRegister,
                year: year,
                selectedDate: selectedDate,

                serviceType: serviceType,
                paymentCode: paymentCode,
                serviceCodeInternet: serviceCodeInternet,
                customerName: infoAccount.customerName,
                phoneCustomer: infoAccount.phoneNumber,

                Amount: Amount,
                keyType: keyType,
                saveInfo: saveInfo,

                newMiniState: newMiniState,
                totalBuy: totalBuy,
                listDataNumberLottery: listDataNumberLottery,

                totalSale: totalSale,
                newMiniStateSale: newMiniStateSale,
                PhoneCusBuy: PhoneCusBuy,

                luckyPhone: luckyPhone,
                Barcode: Barcode,
                messagesignature: messagesignature,
                onSelect: onSelect,


                GetUserName: GetUserName,
                GetStaffCode: GetStaffCode,
                GetStaffName: GetStaffName,
                GetShopCode: GetShopCode,

                phoneAgent: phoneAgent,
                shopCode: shopCode,
                selectPartnert: selectPartnert,

                mainPhone: mainPhone,
                customerName: customerName,
                partnerCode: partnerCode,
                totalAmont: totalAmont,
                checkDiscount: checkDiscount,
                serviceCodeFee: serviceCodeFee,
                partnerCodeFee: partnerCodeFee,
                phone_topup: phone_topup,
                byPassPIN: byPassPIN,
                checkAmount: checkAmount,

                balance: balance,
                cttID: cttID,
                accountID: accountID,
                note: note,
                img: img,
                agentCode: agentCode,
                Gender: Gender,
                DetailToName: DetailToName,
                DetailFromName: DetailFromName,
                Name: Name,
                nameCustomer: nameCustomer

            })



            if (onProcess == 'APPROVAL_TRANSACTION') {
                const { params } = this.props.route

                this.setState({
                    Transaction: params.dataAppro[0].Transaction,
                    money: params.dataAppro[0].money,
                    date: params.dataAppro[0].date,
                    name: params.dataAppro[0].name,
                    from_phone: params.dataAppro[0].from_phone,
                    from_id: params.dataAppro[0].from_id,
                    to_phone: params.dataAppro[0].to_phone,
                    to_id: params.dataAppro[0].to_id,
                    org_amount: params.dataAppro[0].org_amount,
                    fee: params.dataAppro[0].fee,
                    total_amount: params.dataAppro[0].total_amount,
                    request_reason: params.dataAppro[0].request_reason,
                    request_user: params.dataAppro[0].request_user,
                    date_created: params.dataAppro[0].date_created,
                    bank_transid: params.dataAppro[0].bank_transid,
                    bank_code: params.dataAppro[0].bank_code,
                    bank_name: params.dataAppro[0].bank_name,
                    action_state_id: params.dataAppro[0].action_state_id,
                    action_state_name: params.dataAppro[0].action_state_name,
                    process_code: params.dataAppro[0].process_code,
                    from_channel_id: params.dataAppro[0].from_channel_id,
                    to_channel_id: params.dataAppro[0].to_channel_id,
                    account_type_id: params.dataAppro[0].account_type_id,
                    adjusted_type: params.dataAppro[0].adjusted_type,
                    payer_paper_number: params.dataAppro[0].payer_paper_number,
                    payer_name: params.dataAppro[0].payer_name,
                    action_id: params.dataAppro[0].action_id,
                    channel_name: params.dataAppro[0].channel_name,
                    channel_phone: params.dataAppro[0].channel_phone,
                    request_no: params.dataAppro[0].request_no,
                    action_node_id: params.dataAppro[0].action_node_id,
                    action_node_name: params.dataAppro[0].action_node_name,
                    payer_paper_type: params.dataAppro[0].payer_paper_type,
                    content: params.dataAppro[0].content,
                    role_name: params.dataAppro[0].role_name,
                    is_forward: params.dataAppro[0].is_forward,
                    payer_phone: params.dataAppro[0].payer_phone,
                    reject_reason: params.dataAppro[0].reject_reason,
                    approver: params.dataAppro[0].approver,

                })

            }
            else if (onProcess === 'PAY_MENT_INSURANCE_APA') {
                const { params } = this.props.route
                this.setState({
                    DISCOUNT_APA: params.dataAPA[0],
                    VAT_APA: params.dataAPA[1],
                    FEE_APA: params.dataAPA[2],
                    GRAND_TOTAL_APA: params.dataAPA[3],
                    InsuredName_APA: params.dataAPA[4],
                    Phone_APA: params.dataAPA[5],
                    DateBirth_APA: params.dataAPA[6],
                    Gender_APA: params.dataAPA[7],
                    PaperType_APA: params.dataAPA[8],
                    PaperNumber_APA: params.dataAPA[9],
                    Address_APA: params.dataAPA[10],
                    FullName_APA: params.dataAPA[11],
                    Relation_APA: params.dataAPA[12],
                    male_APA: params.dataAPA[13],
                    Package_APA: params.dataAPA[14],
                    policyNo_APA: params.dataAPA[15],
                })
            }
            else {
                console.log('no')
            }
            checkDiscount ? this.onCheckDiscount(toAccountId, money, processCode, serviceCodeFee, partnerCodeFee) : null
        }
    }
    onCheckDiscount(toAccountId, money, processCode, serviceCodeFee, partnerCodeFee) {

        ////console.log('toAccountId', toAccountId)
        ////console.log('money', money)
        ////console.log('processCode', processCode)
        ////console.log('serviceCodeFee', serviceCodeFee)
        ////console.log('partnerCodeFee', partnerCodeFee)
        const { infoAccount } = this.props
        let carriedAccountId = infoAccount.accountId;
        let fromAccountId = infoAccount.accountId;
        let mMoney = parseInt(money.replace(/,/g, ''));
        let amount = mMoney;
        let partnerCode = partnerCodeFee ? partnerCodeFee : '';
        let serviceCode = serviceCodeFee ? serviceCodeFee : '';
        let to_acc_id = toAccountId ? toAccountId : infoAccount.accountId
        this.props.reqCheckInfoDiscount(carriedAccountId, fromAccountId, to_acc_id, processCode, amount, partnerCode, serviceCode);
        this.setState({ isLoading: true, onTranferBccs: true })
    }
    onCodePin(text) {
        const errorCodePin = !text || text.length < 6 || text.length > 8 || !isValidated(text, this.props.validatePhoneConst) ? I18n.t('pleaseInputYourCurrentPin') : null
        this.setState({ codePin: text, errorCodePin })
    }
    onPressProcess() {
        Keyboard.dismiss()
        const { infoAccount } = this.props
        const { phone, money, message, fromPhone, toPhone,
            toAccountId, toName, codePin, onProcess, receiverPhone,
            senderPhone, secretCode, referenceId, processCode, bankCode,
            bankTransId, AmountBank, Content, AccountBankName, FeeBank,
            AccountNo, selectState, fee, serviceType, paymentCode, serviceCodeInternet,
            name, ident, valueType, mBirthDay, male, phoneRegister, year,
            selectedDate, tranDes, numberPhone, listDataNumberLottery, PhoneCusBuy,
            luckyPhone, Barcode, support, messagesignature, saveInfo, selectPartnert, phone_topup, byPassPIN, checkAmount, id_Bank,
            shopCode } = this.state
        // console.log('onProcess------:', onProcess)
        switch (onProcess) {
            case 'TRANSFER_NO_EWLLET':

                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(codePin))//52
                RequestField.addToInitField(RequestField.addServiceCode('GET_OTP_TRANSFER_NO_EWLLET'))//42
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let getOtpNonEwllet = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                // console.log('getOtpRequestBankMoney:', getOtpRequestBankMoney)
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(getOtpNonEwllet)
                RequestField.clearInitField()

                break;
            case 'TRANFER_EWALLET':
                if (byPassPIN && checkAmount) {
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.MONEY_AGENT_CHARGE_CUSTOMER))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addShopCode(infoAccount.agentCode))
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addToAccountId(toAccountId)) //74 
                    RequestField.addToInitField(RequestField.addToName(toName))
                    RequestField.addToInitField(RequestField.addToPhone(phone))
                    RequestField.addToInitField(RequestField.addTransDes(message))
                    RequestField.addToInitField(RequestField.addAmount(money))
                    RequestField.addToInitField(RequestField.addTelex(1))//27
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    RequestField.addToInitField(RequestField.addCarriedAccId(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))
                    RequestField.addToInitField(RequestField.addTier(saveInfo))
                    let data = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))
                    console.log('data:', data)
                    // data.fieldMap = _.orderBy(data.fieldMap, 'fieldID')
                    this.setState({ isRequestCashInForcustomer: true, isLoading: true })
                    this.props.requestCashIn(data)
                    RequestField.clearInitField()

                } else {
                    RequestField.clearInitField()
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addServiceCode('TRANFER_EWALLET'))//41
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    let otpCashout = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    this.setState({ isRequestOTP: true, isLoading: true })
                    this.props.requestOTP(otpCashout)
                    RequestField.clearInitField()
                }

                break;
            case 'MONEY_AGENT_TRANSFER_CUSTOMER':
                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(codePin))//52
                RequestField.addToInitField(RequestField.addServiceCode('OTP_AGENT_TRANSFER_CUSTOMER'))//42
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let getOtpAgentTranferCus = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(getOtpAgentTranferCus)
                RequestField.clearInitField()

                break;
            case 'TRANSFER_E2E':
                if (byPassPIN && checkAmount) {
                    RequestField.clearInitField()
                    RequestField.addToInitField(RequestField.addProcessCode(processCode))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addShopCode(shopCode))
                    if (toAccountId) RequestField.addToInitField(RequestField.addToAccountId(toAccountId))
                    if (toName) RequestField.addToInitField(RequestField.addToName(toName))
                    if (toPhone) RequestField.addToInitField(RequestField.addToPhone(toPhone))
                    RequestField.addToInitField(RequestField.addOPT("1"))
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addTransDes(message))
                    RequestField.addToInitField(RequestField.addAmount(money))
                    RequestField.addToInitField(RequestField.addCarriedAccId(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))
                    RequestField.addToInitField(RequestField.addTransactionDescription(message))
                    RequestField.addToInitField(RequestField.addTier(saveInfo))
                    RequestField.addToInitField(RequestField.addTelex(1))//27
                    let dataTranfer = RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    dataTranfer.fieldMap = _.orderBy(dataTranfer.fieldMap, 'fieldID')
                    this.setState({ isRequestCashInForPOS: true, isLoading: true, setModalVisible: false })
                    this.props.requestCashInTranfer(dataTranfer)
                    RequestField.clearInitField()
                } else {
                    RequestField.clearInitField()
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addServiceCode('TRANSFER_E2E'))//41
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    let otpTransferPOS = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    this.setState({ isRequestOTP: true, isLoading: true })
                    this.props.requestOTP(otpTransferPOS)
                    RequestField.clearInitField()
                }
                break;
            case 'AGENT_TRANSFER_CASH_OUT':
                if (byPassPIN && checkAmount) {
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(processCode))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addToAccountId(toAccountId))
                    if (toName) RequestField.addToInitField(RequestField.addToName(toName))
                    if (toPhone) RequestField.addToInitField(RequestField.addToPhone(toPhone))
                    RequestField.addToInitField(RequestField.addTransDes(message))
                    RequestField.addToInitField(RequestField.addAmount(money))
                    RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))
                    RequestField.addToInitField(RequestField.addCarriedAccId(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addShopCode(shopCode)) //95
                    RequestField.addToInitField(RequestField.addTier(saveInfo))
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addTelex(1))//27
                    let dataAgentCashOut = RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    dataAgentCashOut.fieldMap = _.orderBy(dataAgentCashOut.fieldMap, 'fieldID')
                    this.setState({ isAgentCashOut: true, isLoading: true, setModalVisible: false })
                    this.props.agentCashOut(dataAgentCashOut)
                    RequestField.clearInitField()

                } else {
                    RequestField.clearInitField()
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addServiceCode('AGENT_TRANSFER_CASH_OUT'))//41
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    let otpCashOut = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    this.setState({ isRequestOTP: true, isLoading: true })
                    this.props.requestOTP(otpCashOut)
                    RequestField.clearInitField()
                }
                break;
            case 'AGENT_REQUEST_BANK_MONEY':

                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(codePin))//52
                RequestField.addToInitField(RequestField.addServiceCode('GET_OTP_REQUEST_BANK_MONEY'))//42
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let getOtpRequestBankMoney = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                console.log('getOtpRequestBankMoney:', getOtpRequestBankMoney)
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(getOtpRequestBankMoney)
                RequestField.clearInitField()

                break;
            case 'AGENT_REQUEST_EMONEY':

                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(codePin))//52
                RequestField.addToInitField(RequestField.addServiceCode('GET_OTP_REQUEST_MONEY'))//42
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let getOtpRequestMoney = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(getOtpRequestMoney)
                RequestField.clearInitField()
                break;
            case 'TRANSFER_EWALLET_TO_BANK':
                if (byPassPIN && checkAmount) {
                    if (processCode === '600014') {
                        RequestField.clearInitField();
                        RequestField.addToInitField(RequestField.addProcessCode(processCode))//3
                        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                        RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                        RequestField.addToInitField(RequestField.addFromPhone(infoAccount.phoneNumber))//105
                        RequestField.addToInitField(RequestField.addFromAccountId(infoAccount.accountId))//76
                        // RequestField.addToInitField(RequestField.addPin(codePin))//52
                        RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                        // RequestField.addToInitField(RequestField.addOPT(text))//53
                        RequestField.addToInitField(RequestField.addAmount(AmountBank))//5
                        RequestField.addToInitField(RequestField.addToName(toName))//98
                        RequestField.addToInitField(RequestField.addActionNode('1')) //22
                        RequestField.addToInitField(RequestField.addPartnerCode(id_Bank))//41
                        RequestField.addToInitField(RequestField.addBankAccountName(AccountBankName))//100
                        RequestField.addToInitField(RequestField.addBankAccountNo(AccountNo))//88 
                        RequestField.addToInitField(RequestField.addTransDes(Content))//107
                        RequestField.addToInitField(RequestField.addTier(saveInfo))//107
                        RequestField.addToInitField(RequestField.addTelex(1))//27
                        const dataTranferBank_BCEL = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                        this.setState({ isLoading: true, setModalVisible: false, isRequestTranferBank: true, setModalVisible: false })
                        // console.log('dataTranferBank_BCEL:', dataTranferBank_BCEL)
                        this.props.requestTranferBank(dataTranferBank_BCEL);
                        RequestField.clearInitField();
                    } else {
                        RequestField.clearInitField();
                        RequestField.addToInitField(RequestField.addProcessCode(processCode))//3
                        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                        RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                        RequestField.addToInitField(RequestField.addFromPhone(infoAccount.phoneNumber))//105
                        RequestField.addToInitField(RequestField.addFromAccountId(infoAccount.accountId))//76
                        // RequestField.addToInitField(RequestField.addPin(codePin))//52
                        RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                        // RequestField.addToInitField(RequestField.addOPT(text))//53
                        RequestField.addToInitField(RequestField.addAmount(AmountBank))//5
                        RequestField.addToInitField(RequestField.addActionNode('1')) //22
                        RequestField.addToInitField(RequestField.addPartnerCode(id_Bank))//41
                        RequestField.addToInitField(RequestField.addBankAccountNo(AccountNo))//88 
                        RequestField.addToInitField(RequestField.addTransDes(Content))//107 
                        RequestField.addToInitField(RequestField.addTier(saveInfo))//63
                        RequestField.addToInitField(RequestField.addTelex(1))//27
                        const dataTranferBank = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                        console.log('dataTranferBank1------:', dataTranferBank)
                        this.setState({ isLoading: true, setModalVisible: false, isRequestTranferBank: true, setModalVisible: false })
                        this.props.requestTranferBank(dataTranferBank);
                        RequestField.clearInitField();
                    }
                } else {
                    RequestField.clearInitField()
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addServiceCode('BANK_LVB'))//41
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    let dataOTP = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    this.setState({ isRequestOTP: true, isLoading: true })
                    this.props.requestOTP(dataOTP)
                    RequestField.clearInitField()
                }
                break;
            case 'TOP_UP_UNITEL':
                if (byPassPIN && checkAmount) {

                    var serviceIndicator = null
                    var serviceCodeUitel = null
                    switch (serviceType) {
                        case `11`:
                            if (phone_topup == infoAccount.phoneNumber) {
                                serviceIndicator = ConfigCode.PRE_PAY
                                serviceCodeUitel = ConfigCode.TOP_UP_MOBILE
                                this.setState({ serviceCodeUitel })
                            } else {
                                serviceIndicator = ConfigCode.PRE_PAY
                                serviceCodeUitel = ConfigCode.TOP_UP_MOBILE_OTHER
                                this.setState({ serviceCodeUitel })
                            }
                            break
                        case `12`:
                            if (phone_topup == infoAccount.phoneNumber) {
                                serviceIndicator = ConfigCode.PRE_PAY
                                serviceCodeUitel = ConfigCode.TOP_UP_UNI
                                this.setState({ serviceCodeUitel })
                            } else {
                                serviceIndicator = ConfigCode.PRE_PAY
                                serviceCodeUitel = ConfigCode.TOP_UP_UNI_OTHER
                                this.setState({ serviceCodeUitel })
                            }
                            break
                        case `00`:
                        case `01`:
                            if (phone_topup == infoAccount.phoneNumber) {
                                serviceIndicator = ConfigCode.PRE_PAY
                                serviceCodeUitel = ConfigCode.POST_PAID_MOBILE
                                this.setState({ serviceCodeUitel })
                            } else {
                                serviceIndicator = ConfigCode.PRE_PAY
                                serviceCodeUitel = ConfigCode.POST_PAID_MOBILE_OTHER
                                this.setState({ serviceCodeUitel })
                            }
                            break
                        default:
                            break
                    }
                    RequestField.clearInitField()
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.PAYMENT_CHARGE_TELE_ACCOUNT)) //571000
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addPaymentCode(phone))
                    RequestField.addToInitField(RequestField.addToPhone(phone))
                    RequestField.addToInitField(RequestField.addServiceIndicator(serviceIndicator))
                    RequestField.addToInitField(RequestField.addAmount(money))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addServiceCode(serviceCodeUitel))
                    RequestField.addToInitField(RequestField.addPartnerCode(ConfigCode.VIETTEL))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addTier(saveInfo))//63
                    RequestField.addToInitField(RequestField.addTelex(1))//27
                    let dataTopupUnitel = RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    console.log('dataTopupUnitel---1111111----:', dataTopupUnitel)
                    this.setState({ isRequestTopUp: true, isLoading: true, setModalVisible: false })
                    this.props.requestTopUp(dataTopupUnitel)
                    RequestField.clearInitField()




                } else {
                    RequestField.clearInitField()
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addServiceCode('TOP_UP_UNITEL'))//41
                    RequestField.addToInitField(RequestField.addServiceCode('TOP_UP_MOBILE'))//42
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    let otpUnitel = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    this.setState({ isRequestOTP: true, isLoading: true })
                    this.props.requestOTP(otpUnitel)
                    RequestField.clearInitField()
                }

                break;
            case 'TOP_UP_ETL':
                if (byPassPIN && checkAmount) {
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.TRANSFER_TOPUP_ETL))//3
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                    RequestField.addToInitField(RequestField.addCarriedName(infoAccount.customerName))//125
                    // RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    // RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addAmount(money))//5
                    RequestField.addToInitField(RequestField.addPartnerCode('TELCO_ETL'))//41
                    RequestField.addToInitField(RequestField.addServiceCode('TOP_UP_MOBILE'))//42
                    RequestField.addToInitField(RequestField.addPaymentCode(phone))//105
                    RequestField.addToInitField(RequestField.addTier(saveInfo))//107
                    RequestField.addToInitField(RequestField.addTelex(1))//27
                    const dataTopupETL = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    console.log('dataTopupETL:', dataTopupETL)
                    this.setState({ isLoading: true, setModalVisible: false, isRequestTopUpETL: true })
                    this.props.requestTopup_ETL(dataTopupETL);
                    RequestField.clearInitField();
                } else {
                    RequestField.clearInitField()
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addServiceCode('TELCO_ETL'))//41
                    RequestField.addToInitField(RequestField.addServiceCode('TOP_UP_MOBILE'))//42
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    let dataOTPETL = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    this.setState({ isRequestOTP: true, isLoading: true })
                    this.props.requestOTP(dataOTPETL)
                    RequestField.clearInitField()
                }

                break;
            case 'INTERNET_SERVICES':
                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(codePin))//52
                RequestField.addToInitField(RequestField.addServiceCode('INTERNET_SERVICES'))//41
                RequestField.addToInitField(RequestField.addServiceCode('TOP_UP_MOBILE'))//42
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let otpInternet = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(otpInternet)
                RequestField.clearInitField()

                break;
            case 'PAYMENT_PSTNH':

                RequestField.clearInitField();
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.PAYMENT_CHARGE_TELE_ACCOUNT)) //571000
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                RequestField.addToInitField(RequestField.addPaymentCode(paymentCode))
                RequestField.addToInitField(RequestField.addAmount(money))
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                RequestField.addToInitField(RequestField.addPin(codePin))
                RequestField.addToInitField(RequestField.addServiceCode('PSTN'))
                RequestField.addToInitField(RequestField.addPartnerCode(ConfigCode.VIETTEL))
                RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                let dataPSTN = RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                this.setState({ isRequestTopUpPSTN: true, isLoading: true })
                this.props.requestTopUp(dataPSTN)
                RequestField.clearInitField();
                break;
            case 'AGENT_REGISTER_FOR_USER':
                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(codePin))//52
                RequestField.addToInitField(RequestField.addServiceCode('OTP_REGISTER_FOR_USER'))//42
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let getOtpRegister = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(getOtpRegister)
                RequestField.clearInitField()

                break
            case 'MONEY_POS_CASH_IN':
                if (byPassPIN && checkAmount) {
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.MONEY_POS_CASH_IN))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addToAccountId(toAccountId))
                    RequestField.addToInitField(RequestField.addToName(toName))
                    RequestField.addToInitField(RequestField.addToPhone(numberPhone))
                    RequestField.addToInitField(RequestField.addTransDes(message))
                    RequestField.addToInitField(RequestField.addAmount(money))
                    RequestField.addToInitField(RequestField.addOPT("1"))
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addTelex(1))//27
                    RequestField.addToInitField(RequestField.addCarriedAccId(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))
                    RequestField.addToInitField(RequestField.addLanguage(infoAccount.language));
                    let dataCashinPOS = RequestField.addToInitField(RequestField.addShopCode(infoAccount.agentCode))
                    dataCashinPOS.fieldMap = _.orderBy(dataCashinPOS.fieldMap, 'fieldID')
                    this.setState({ isRequestCashInPOS: true, isLoading: true, setModalVisible: false })
                    this.props.requestCashIn(dataCashinPOS)
                    RequestField.clearInitField()
                } else {
                    RequestField.clearInitField()
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addServiceCode('MONEY_POS_CASH_IN'))//41
                    RequestField.addToInitField(RequestField.addServiceCode('MONEY_POS_CASH_IN'))//42
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    let otpPosCashIN = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    this.setState({ isRequestOTP: true, isLoading: true })
                    this.props.requestOTP(otpPosCashIN)
                    RequestField.clearInitField()
                }
                break;
            case 'TOP_UP_LTC':
                if (byPassPIN && checkAmount) {
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.TRANSFER_TOPUP_LTC))//3
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                    RequestField.addToInitField(RequestField.addCarriedName(infoAccount.customerName))//125
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addAmount(money))//5
                    RequestField.addToInitField(RequestField.addTelex(1))//27
                    RequestField.addToInitField(RequestField.addPartnerCode('TELCO_LTC'))//41
                    RequestField.addToInitField(RequestField.addServiceCode('TOP_UP_MOBILE'))//42
                    RequestField.addToInitField(RequestField.addPaymentCode(phone))//105
                    RequestField.addToInitField(RequestField.addTier(saveInfo))//107
                    const dataTopupLTC = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    console.log('dataTopupLTC:', dataTopupLTC)
                    this.setState({ isLoading: true, setModalVisible: false, isRequestTopUpETL: true })
                    this.props.requestTopup_ETL(dataTopupLTC);
                    RequestField.clearInitField();
                } else {
                    RequestField.clearInitField()
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addServiceCode('TELCO_LTC'))//41
                    RequestField.addToInitField(RequestField.addServiceCode('TOP_UP_MOBILE'))//42
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    let dataOTPLTC = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    this.setState({ isRequestOTP: true, isLoading: true })
                    this.props.requestOTP(dataOTPLTC)
                    RequestField.clearInitField()

                }
                break;
            case 'TELCO_TPLUS':
                if (byPassPIN && checkAmount) {
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.TOPUP_TPUST))//3
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                    RequestField.addToInitField(RequestField.addCarriedName(infoAccount.customerName))//125
                    // RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    // RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addAmount(money))//5
                    RequestField.addToInitField(RequestField.addTelex(1))//27
                    RequestField.addToInitField(RequestField.addPartnerCode('TELCO_TPLUS'))//41
                    RequestField.addToInitField(RequestField.addServiceCode('TOP_UP_MOBILE'))//42
                    RequestField.addToInitField(RequestField.addPaymentCode(phone))//105
                    RequestField.addToInitField(RequestField.addTier(saveInfo))//107
                    const dataTopupTpust = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    this.setState({ isLoading: true, setModalVisible: false, isRequestTopUpETL: true })
                    this.props.requestTopup_ETL(dataTopupTpust);
                    RequestField.clearInitField();
                } else {
                    RequestField.clearInitField()
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addServiceCode('TELCO_TPLUS'))//41
                    RequestField.addToInitField(RequestField.addServiceCode('TOP_UP_MOBILE'))//42
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    let dataOTPTPUST = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    this.setState({ isRequestOTP: true, isLoading: true })
                    this.props.requestOTP(dataOTPTPUST)
                    RequestField.clearInitField()
                }
                break;
            case 'PAYMENT_LEASING':
                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(codePin))//52
                RequestField.addToInitField(RequestField.addServiceCode('GET_OTP_LEASING'))//42
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let dataOTPLeasing = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(dataOTPLeasing)
                RequestField.clearInitField()
                break;
            case 'BUY_LOTTERY':

                let miniState = "";
                let totalBuy = 0;
                listDataNumberLottery.forEach((item) => {
                    var strAmount = item.amountBuy.replace(",", "")
                    miniState += item.buyLottery + "=" + strAmount + ";"
                    totalBuy += parseInt(strAmount)
                });
                if (totalBuy <= 2000) {
                    this.refs.responseMessage.onOpen()
                    this.setState({ responseMessage: I18n.t('amountMustbefrom', { amount: formatNumber(3000 + "") }) })

                    return
                }
                let newMiniState = miniState.substring(0, miniState.length - 1)
                switch (support) {
                    case 'BUY_SOKXAY_LOTTERY':

                        RequestField.clearInitField();
                        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.BUY_LOTTERY))
                        RequestField.addToInitField(RequestField.addPhoneLottery(infoAccount.phoneNumber))
                        RequestField.addToInitField(RequestField.addToPhone(infoAccount.phoneNumber))
                        RequestField.addToInitField(RequestField.addFromPhone(infoAccount.phoneNumber))
                        RequestField.addToInitField(RequestField.addAmount(totalBuy))
                        RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))
                        RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//
                        RequestField.addToInitField(RequestField.addActionNode('1'))
                        RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))
                        RequestField.addToInitField(RequestField.addPin(codePin))
                        RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                        RequestField.addToInitField(RequestField.addImageName(newMiniState))
                        let dataBuyLottery = RequestField.addToInitField(RequestField.addAccountIDLottery(infoAccount.accountId))
                        this.setState({ isLoading: true, onBuyLottery: true })
                        this.props.requestBuyLottery(dataBuyLottery)

                        break;
                    case 'BUY_NCC_LOTTERY':

                        RequestField.clearInitField()
                        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                        RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                        RequestField.addToInitField(RequestField.addPin(codePin))//52
                        RequestField.addToInitField(RequestField.addServiceCode('TELCO_ETL'))//41
                        RequestField.addToInitField(RequestField.addServiceCode('TOP_UP_MOBILE'))//42
                        RequestField.addToInitField(RequestField.addActionNode('1')) //22
                        let dataOTPETL = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                        this.setState({ isRequestOTP: true, isLoading: true })
                        this.props.requestOTP(dataOTPETL)
                        RequestField.clearInitField()

                        break;
                    default:
                        break;
                }
                break;
            case 'SELL_LOTTERY':
                let miniStateSale = "";
                let totalSale = 0;
                listDataNumberLottery.forEach((item) => {
                    var strAmount = item.amountSale.replace(",", "")
                    miniStateSale += item.saleLottery + "=" + strAmount + ";"
                    totalSale += parseInt(strAmount)
                });

                if (totalSale <= 2000) {
                    this.refs.responseMessage.onOpen()
                    this.setState({ responseMessage: I18n.t('amountMustbefrom', { amount: formatNumber(3000 + "") }) })
                    return
                }
                let newMiniStateSale = miniStateSale.substring(0, miniStateSale.length - 1)
                this.setState({ isLoading: true, onSellLottery: true })
                RequestField.clearInitField();
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.BUY_LOTTERY))
                RequestField.addToInitField(RequestField.addPhoneLottery(infoAccount.phoneNumber))
                RequestField.addToInitField(RequestField.addToPhone(PhoneCusBuy))
                RequestField.addToInitField(RequestField.addFromPhone(infoAccount.phoneNumber))
                RequestField.addToInitField(RequestField.addAmount(totalSale))
                RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))
                RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                RequestField.addToInitField(RequestField.addActionNode('1'))
                RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))
                RequestField.addToInitField(RequestField.addPin(codePin))
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                RequestField.addToInitField(RequestField.addImageName(newMiniStateSale))
                let dataSale = RequestField.addToInitField(RequestField.addAccountIDLottery(infoAccount.accountId))
                this.props.requestSaleLottery(dataSale)

                break;
            case 'CHECK_BACODE_LUCKY':

                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(codePin))//52
                RequestField.addToInitField(RequestField.addServiceCode('BACODE_LUCKY'))//41
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let dataOTPLUCKY = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(dataOTPLUCKY)
                RequestField.clearInitField()
                break;
            case 'PAY_STAFF_DEBT':
                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(codePin))//52
                RequestField.addToInitField(RequestField.addServiceCode('GET_OTP_BCCS'))//42
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let dataOTPBCCS = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(dataOTPBCCS)
                RequestField.clearInitField()
                break;
            case 'APPROVAL_TRANSACTION':
                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(codePin))//52
                RequestField.addToInitField(RequestField.addServiceCode('GET_OTP_APPROVAL_TRANSACTION'))//42
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let dataotpApproval = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(dataotpApproval)
                RequestField.clearInitField()
                break;
            case 'PAY_MENT_INSURANCE_APA':
                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(codePin))//52
                RequestField.addToInitField(RequestField.addServiceCode('GET_OTP_PAY_MENT_INSURANCE_APA'))//42
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let getOtpInsurance = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(getOtpInsurance)
                RequestField.clearInitField()
                break;
            case 'PAYMENT_WATTER_NPP':
                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(codePin))//52
                RequestField.addToInitField(RequestField.addServiceCode('PAYMANT_WATTER'))//41
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let OTPWatter = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(OTPWatter)
                RequestField.clearInitField()
                break;
            case 'CASH_OUT_WORD_BANK':
                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(codePin))//52
                RequestField.addToInitField(RequestField.addServiceCode('CASH_OUT_WORD_BANK'))//41
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let OTPWordBank = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(OTPWordBank)
                RequestField.clearInitField()
                break;
            default:
                break;
        }
    }
    onChangOTP(text) {
        const { infoAccount } = this.props
        const { codePin, AmountBank, Content, AccountNo, selectState, money,
            phone, contractNo, Amount, keyType, id_Bank, AccountBankName,
            toName, serviceCode, processCode, msisdn, englishName, partnerCode, saveInfo,
            messagesignature, listDataNumberLottery, onSelect,
            GetUserName, GetStaffCode, GetStaffName, GetShopCode, isChecked, action_id, approver,
            phoneAgent, luckyPhone, Barcode, selectPartnert,
            DateBirth_APA, Gender_APA, PaperNumber_APA, PaperType_APA, Phone_APA, GRAND_TOTAL_APA, policyNo_APA,
            InsuredName_APA, Address_APA, FullName_APA, partnerCodeLessing, shopCode, message, toPhone, toAccountId,
            numberPhone, serviceType, phone_topup, serviceCodeInternet, paymentCode, bankCode, bankTransId, receiverPhone,
            senderPhone, fromPhone, secretCode, referenceId, phoneRegister, name, male, valueType, tranDes, selectedDate, ident,
            balance, cttID, accountID, note, img, agentCode, Gender, DetailToName, DetailFromName, Name } = this.state
        switch (selectState) {
            case 'ETL':
                if (text.length === 6) {
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.TRANSFER_TOPUP_ETL))//3
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                    RequestField.addToInitField(RequestField.addCarriedName(infoAccount.customerName))//125
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addAmount(money))//5
                    RequestField.addToInitField(RequestField.addPartnerCode('TELCO_ETL'))//41
                    RequestField.addToInitField(RequestField.addServiceCode('TOP_UP_MOBILE'))//42
                    RequestField.addToInitField(RequestField.addPaymentCode(phone))//105
                    RequestField.addToInitField(RequestField.addTier(saveInfo))//107
                    const dataTopupETL = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113

                    this.setState({ isLoading: true, setModalVisible: false, isRequestTopUpETL: true })
                    this.props.requestTopup_ETL(dataTopupETL);
                    RequestField.clearInitField();
                }
                break;
            case 'LTC':
                if (text.length === 6) {
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.TRANSFER_TOPUP_LTC))//3
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                    RequestField.addToInitField(RequestField.addCarriedName(infoAccount.customerName))//125
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addAmount(money))//5
                    RequestField.addToInitField(RequestField.addPartnerCode('TELCO_LTC'))//41
                    RequestField.addToInitField(RequestField.addServiceCode('TOP_UP_MOBILE'))//42
                    RequestField.addToInitField(RequestField.addPaymentCode(phone))//105
                    RequestField.addToInitField(RequestField.addTier(saveInfo))//107
                    const dataTopupLTC = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    this.setState({ isLoading: true, setModalVisible: false, isRequestTopUpETL: true })
                    this.props.requestTopup_ETL(dataTopupLTC);
                    RequestField.clearInitField();
                }
                break;
            case 'TPUST':
                if (text.length === 6) {
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.TOPUP_TPUST))//3
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                    RequestField.addToInitField(RequestField.addCarriedName(infoAccount.customerName))//125
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addAmount(money))//5
                    RequestField.addToInitField(RequestField.addPartnerCode('TELCO_TPLUS'))//41
                    RequestField.addToInitField(RequestField.addServiceCode('TOP_UP_MOBILE'))//42
                    RequestField.addToInitField(RequestField.addPaymentCode(phone))//105
                    RequestField.addToInitField(RequestField.addTier(saveInfo))//107
                    const dataTopupTpust = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    this.setState({ isLoading: true, setModalVisible: false, isRequestTopUpETL: true })
                    this.props.requestTopup_ETL(dataTopupTpust);
                    RequestField.clearInitField();
                }
                break;
            case 'LEASING_PAYMENT':
                if (text.length === 6) {
                    RequestField.addToInitField(RequestField.addProcessCode(processCode))//3
                    RequestField.addToInitField(RequestField.addAmount(Amount))//5
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                    RequestField.addToInitField(RequestField.addActionNode(1))//22
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addPartnerCode(partnerCodeLessing))//41
                    RequestField.addToInitField(RequestField.addServiceCode(serviceCode))//42
                    RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))//49
                    RequestField.addToInitField(RequestField.addCarriedAccId(infoAccount.accountId))//69
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addTier(saveInfo))//107
                    RequestField.addToInitField(RequestField.addToName(englishName)) //98
                    RequestField.addToInitField(RequestField.addToPhone(msisdn)) //106 
                    RequestField.addToInitField(RequestField.addCarriedName(englishName))//125 
                    RequestField.addToInitField(RequestField.addFromAccountId(infoAccount.accountId))//76
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                    RequestField.addToInitField(RequestField.addTransactionDescription('PAY_MENT_LEASING'))//107
                    RequestField.addToInitField(RequestField.addReceiverAddress(contractNo))//110
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))
                    let dataPayLeasing = RequestField.addToInitField(RequestField.addPin(codePin))//52
                    dataPayLeasing.fieldMap = _.orderBy(dataPayLeasing.fieldMap, 'fieldID')
                    this.setState({ isRequestPaymentLeasing: true, isLoading: true, setModalVisible: false })
                    this.props.paymentLeasingAeon(dataPayLeasing)
                    ////console.log('dataPayLeasing:', dataPayLeasing)
                    RequestField.clearInitField()
                }
                break;
            case 'BUY_NCC_LOTTERY_NUMBER':

                if (text.length === 6) {
                    let miniState = "";
                    let totalBuy = 0;
                    listDataNumberLottery.forEach((item) => {
                        var strAmount = item.amountBuy.replace(",", "")
                        miniState += item.buyLottery + "=" + strAmount + ";"
                        totalBuy += parseInt(strAmount)
                    });
                    if (totalBuy <= 2000) {
                        this.refs.responseMessage.onOpen()
                        this.setState({ responseMessage: I18n.t('amountMustbefrom', { amount: formatNumber(3000 + "") }) })
                        return
                    }
                    let newMiniState = miniState.substring(0, miniState.length - 1)
                    this.setState({ isLoading: true, onBuyLottery: true, setModalVisible: false })

                    RequestField.clearInitField();
                    if (onSelect === 'lotteryNumber') {
                        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.BUY_LOTTERY_NCC))
                    } else {
                        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.BUY_LOTTERY_NCC_ANIMAL))
                    }
                    RequestField.addToInitField(RequestField.addAmount(totalBuy))//5
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                    RequestField.addToInitField(RequestField.addActionNode('1'))//22
                    RequestField.addToInitField(RequestField.addPhoneLottery(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addPartnerCode('U_MONEY'))//41
                    RequestField.addToInitField(RequestField.addServiceCode('BUY_NCC_LOTTERY'))//42
                    RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))//49
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addImageName(newMiniState))//101
                    RequestField.addToInitField(RequestField.addFromPhone(infoAccount.phoneNumber))//105
                    RequestField.addToInitField(RequestField.addToPhone(phoneAgent))//106
                    RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addToName(infoAccount.customerName))//98
                    RequestField.addToInitField(RequestField.addCarriedName(infoAccount.customerName))//125 
                    let buyNccNumber = RequestField.addToInitField(RequestField.addAccountIDLottery(infoAccount.accountId)) //78
                    this.props.requestBuyLottery(buyNccNumber)
                }

                break;
            case 'TRANSFER_TO_BANK':
                if (text.length === 6) {
                    if (processCode === '600014') {
                        RequestField.clearInitField();
                        RequestField.addToInitField(RequestField.addProcessCode(processCode))//3
                        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                        RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                        RequestField.addToInitField(RequestField.addFromPhone(infoAccount.phoneNumber))//105
                        RequestField.addToInitField(RequestField.addFromAccountId(infoAccount.accountId))//76
                        RequestField.addToInitField(RequestField.addPin(codePin))//52
                        RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                        RequestField.addToInitField(RequestField.addOPT(text))//53
                        RequestField.addToInitField(RequestField.addAmount(AmountBank))//5
                        RequestField.addToInitField(RequestField.addToName(toName))//98
                        RequestField.addToInitField(RequestField.addActionNode('1')) //22
                        RequestField.addToInitField(RequestField.addPartnerCode(id_Bank))//41
                        RequestField.addToInitField(RequestField.addBankAccountName(AccountBankName))//100
                        RequestField.addToInitField(RequestField.addBankAccountNo(AccountNo))//88 
                        RequestField.addToInitField(RequestField.addTransDes(Content))//107
                        RequestField.addToInitField(RequestField.addTier(saveInfo))//107
                        const dataTranferBank_BCEL = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                        this.setState({ isLoading: true, setModalVisible: false, isRequestTranferBank: true, setModalVisible: false })
                        // console.log('dataTranferBank_BCEL:', dataTranferBank_BCEL)
                        this.props.requestTranferBank(dataTranferBank_BCEL);
                        RequestField.clearInitField();
                    } else {
                        RequestField.clearInitField();
                        RequestField.addToInitField(RequestField.addProcessCode(processCode))//3
                        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                        RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                        RequestField.addToInitField(RequestField.addFromPhone(infoAccount.phoneNumber))//105
                        RequestField.addToInitField(RequestField.addFromAccountId(infoAccount.accountId))//76
                        RequestField.addToInitField(RequestField.addPin(codePin))//52
                        RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                        RequestField.addToInitField(RequestField.addOPT(text))//53
                        RequestField.addToInitField(RequestField.addAmount(AmountBank))//5
                        RequestField.addToInitField(RequestField.addActionNode('1')) //22
                        RequestField.addToInitField(RequestField.addPartnerCode(id_Bank))//41
                        RequestField.addToInitField(RequestField.addBankAccountNo(AccountNo))//88 
                        RequestField.addToInitField(RequestField.addTransDes(Content))//107 
                        RequestField.addToInitField(RequestField.addTier(saveInfo))//63
                        const dataTranferBank = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                        console.log('dataTranferBank------:', dataTranferBank)
                        this.setState({ isLoading: true, setModalVisible: false, isRequestTranferBank: true, setModalVisible: false })
                        this.props.requestTranferBank(dataTranferBank);
                        RequestField.clearInitField();
                    }
                }
                break;
            case 'PAY_STAFF_DEBT':
                if (text.length === 6) {
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.PAY_STAFF_DEBT))//3
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                    RequestField.addToInitField(RequestField.addCarriedName(infoAccount.customerName))//125
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))//49
                    RequestField.addToInitField(RequestField.addPhonNumber(infoAccount.phoneNumber))//62
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addAmount(money))//5
                    RequestField.addToInitField(RequestField.addPartnerCode('BCCS'))//41
                    RequestField.addToInitField(RequestField.addServiceCode('PAY_STAFF_DEBT'))//42
                    RequestField.addToInitField(RequestField.addFromPhone(infoAccount.phoneNumber))//105
                    RequestField.addToInitField(RequestField.addShopCode(GetShopCode))//95  
                    RequestField.addToInitField(RequestField.addStaffCode(GetStaffCode))//111
                    RequestField.addToInitField(RequestField.addStaffName(GetStaffName))//112  
                    RequestField.addToInitField(RequestField.addUserName(GetUserName))//128 
                    const dataTranferBccs = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    this.props.requestTranferBccs(dataTranferBccs);
                    //console.log('------OOO----', dataTranferBccs)

                    this.setState({ isLoading: true, setModalVisible: false, isRequestTranferBccs: true })
                    RequestField.clearInitField();
                }

                break;
            case 'APPROVAL_TRANSACTION':
                if (text.length === 6) {
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.APPROVAL_TRANSACTION)) //3 
                    RequestField.addToInitField(RequestField.addActionNode('1'))//22
                    RequestField.addToInitField(RequestField.addPhoneLottery(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))//49
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                    RequestField.addToInitField(RequestField.addEffectType(isChecked == true ? 0 : 1))//103
                    RequestField.addToInitField(RequestField.addReferenceId(action_id))//114
                    RequestField.addToInitField(RequestField.addActionStateId(9))//120
                    RequestField.addToInitField(RequestField.addCarredCode(approver))//123
                    const dataApproval = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    ////console.log('<<<< dataApproval: >>>>>>', dataApproval)
                    this.setState({ isLoading: true, setModalVisible: false, isRequestApproval: true, setModalVisible: false })
                    this.props.requestApproval(dataApproval);
                    RequestField.clearInitField();
                }
                break;
            case 'PAYMENT_BACODE_LUCKY':
                if (text.length === 6) {
                    this.setState({ isLoading: true, onCheckBacodeLottery: true, setModalVisible: false })
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(
                        selectPartnert === 'SOKXAY' ? ConfigCode.LUCKY_LOTTERY :
                            selectPartnert === 'NCC' ? ConfigCode.LUCKY_LOTTERY_NCC :
                                selectPartnert === 'NCC340' ? ConfigCode.LUCKY_LOTTERY_NCC340 : null))//3

                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                    RequestField.addToInitField(RequestField.addActionNode('1'))//22
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))//49
                    RequestField.addToInitField(RequestField.addPin(codePin))//52 PIN
                    RequestField.addToInitField(RequestField.addSecretSecure(Barcode))//66
                    RequestField.addToInitField(RequestField.addToPhone(luckyPhone))// 106
                    RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//113
                    let dataLucky = RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                    this.props.luckyLottery(dataLucky)
                }
                break;
            case 'APA_INSURANCE':
                if (text.length === 6) {
                    const data = DateBirth_APA.split('/')
                    this.setState({ isLoading: true, onChecPaymentInsurance: true, setModalVisible: false })
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.PAY_MENT_INSURANCE_APA))//3
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addAmount(GRAND_TOTAL_APA))//5 GRAND_TOTAL_APA
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    RequestField.addToInitField(RequestField.addPhoneLottery(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addPartnerCode('APA_INSUARANCE'))//41
                    RequestField.addToInitField(RequestField.addServiceCode('ACCIDENT'))//42
                    RequestField.addToInitField(RequestField.addCustomerName(InsuredName_APA))//46
                    RequestField.addToInitField(RequestField.addCustomerBirthday(data[0] + data[1] + data[2]))//47
                    RequestField.addToInitField(RequestField.addCustomerGender(Gender_APA))//48
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addPaperType(PaperType_APA))//54
                    RequestField.addToInitField(RequestField.addPaperNumber(PaperNumber_APA))//55
                    RequestField.addToInitField(RequestField.addFromName(FullName_APA))//108
                    RequestField.addToInitField(RequestField.addCustomerPhone(Phone_APA))//62
                    RequestField.addToInitField(RequestField.addPaymentCode(policyNo_APA))//67
                    RequestField.addToInitField(RequestField.addToName(Address_APA))//110 addReceiverAddress
                    let calldataAPA = RequestField.addToInitField(RequestField.addAccountIDLottery(infoAccount.accountId))//78
                    ////console.log('calldataAPA:', calldataAPA)
                    this.props.paymentInsurance(calldataAPA)
                    RequestField.clearInitField();
                }
                break;
            case 'PAYMENT_WATTER_NPP':
                if (text.length === 6) {
                    this.setState({ isLoading: true, PaymentWatterNpp: true, setModalVisible: false })
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.PAYMANT_WATTER))//3
                    RequestField.addToInitField(RequestField.addAmount(AmountBank))//5 
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    RequestField.addToInitField(RequestField.addPhoneLottery(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addPartnerCode('PAYMENT_WATTER_NPP'))//41
                    RequestField.addToInitField(RequestField.addPin(codePin))//52
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addTier(saveInfo))//63
                    RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))
                    RequestField.addToInitField(RequestField.addAccountIDLottery(infoAccount.accountId)) //78
                    RequestField.addToInitField(RequestField.addBankAccountNo(AccountNo))//88 
                    RequestField.addToInitField(RequestField.addBankAccountName(AccountBankName))//100
                    RequestField.addToInitField(RequestField.addFromPhone(infoAccount.phoneNumber))//105
                    let data = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    ////console.log('<<< data to core >>>', data)
                    this.props.PaymentWatterNpp(data)
                    RequestField.clearInitField();
                }
                break;
            case 'TRANSFER_TO_AGENT':
                if (text.length === 6) {
                    RequestField.clearInitField()
                    RequestField.addToInitField(RequestField.addProcessCode(processCode))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addShopCode(shopCode))
                    if (toAccountId) RequestField.addToInitField(RequestField.addToAccountId(toAccountId))
                    if (toName) RequestField.addToInitField(RequestField.addToName(toName))
                    if (toPhone) RequestField.addToInitField(RequestField.addToPhone(toPhone))
                    RequestField.addToInitField(RequestField.addOPT("1"))
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addTransDes(message))
                    RequestField.addToInitField(RequestField.addAmount(money))
                    RequestField.addToInitField(RequestField.addCarriedAccId(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))
                    RequestField.addToInitField(RequestField.addTransactionDescription(message))
                    RequestField.addToInitField(RequestField.addTier(saveInfo))
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    let dataTranfer = RequestField.addToInitField(RequestField.addPin(codePin))
                    // console.log('dataTranfer:', dataTranfer)
                    dataTranfer.fieldMap = _.orderBy(dataTranfer.fieldMap, 'fieldID')
                    this.setState({ isRequestCashInForPOS: true, isLoading: true, setModalVisible: false })
                    this.props.requestCashInTranfer(dataTranfer)
                    RequestField.clearInitField()
                }
                break;
            case 'TRANFER_EWALLET':
                if (text.length === 6) {
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.MONEY_AGENT_CHARGE_CUSTOMER))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addShopCode(infoAccount.agentCode))
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addToAccountId(toAccountId)) //74 
                    RequestField.addToInitField(RequestField.addToName(toName))
                    RequestField.addToInitField(RequestField.addToPhone(phone))
                    RequestField.addToInitField(RequestField.addTransDes(message))
                    RequestField.addToInitField(RequestField.addAmount(money))
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    RequestField.addToInitField(RequestField.addCarriedAccId(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))
                    RequestField.addToInitField(RequestField.addTier(saveInfo))
                    RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))
                    let data = RequestField.addToInitField(RequestField.addPin(codePin))
                    console.log('data:', data)
                    data.fieldMap = _.orderBy(data.fieldMap, 'fieldID')
                    this.setState({ isRequestCashInForcustomer: true, isLoading: true, setModalVisible: false })
                    this.props.requestCashIn(data)
                    RequestField.clearInitField()
                }
                break;
            case 'MONEY_POS_CASH_IN':
                if (text.length === 6) {
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.MONEY_POS_CASH_IN))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addToAccountId(toAccountId))
                    RequestField.addToInitField(RequestField.addToName(toName))
                    RequestField.addToInitField(RequestField.addToPhone(numberPhone))
                    RequestField.addToInitField(RequestField.addTransDes(message))
                    RequestField.addToInitField(RequestField.addAmount(money))
                    RequestField.addToInitField(RequestField.addOPT("1"))
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addCarriedAccId(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))
                    RequestField.addToInitField(RequestField.addLanguage(infoAccount.language));
                    RequestField.addToInitField(RequestField.addShopCode(infoAccount.agentCode))
                    let dataCashinPOS = RequestField.addToInitField(RequestField.addPin(codePin))
                    //console.log('dataCashinPOS:', dataCashinPOS);
                    dataCashinPOS.fieldMap = _.orderBy(dataCashinPOS.fieldMap, 'fieldID')
                    this.setState({ isRequestCashInPOS: true, isLoading: true, setModalVisible: false })
                    this.props.requestCashIn(dataCashinPOS)
                    RequestField.clearInitField()
                }
                break;
            case 'AGENT_TRANSFER_CASH_OUT':
                if (text.length === 6) {
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(processCode))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addToAccountId(toAccountId))
                    if (toName) RequestField.addToInitField(RequestField.addToName(toName))
                    if (toPhone) RequestField.addToInitField(RequestField.addToPhone(toPhone))
                    RequestField.addToInitField(RequestField.addTransDes(message))
                    RequestField.addToInitField(RequestField.addAmount(money))
                    RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))
                    RequestField.addToInitField(RequestField.addCarriedAccId(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addShopCode(shopCode)) //95
                    RequestField.addToInitField(RequestField.addTier(saveInfo))
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    let dataAgentCashOut = RequestField.addToInitField(RequestField.addPin(codePin))
                    dataAgentCashOut.fieldMap = _.orderBy(dataAgentCashOut.fieldMap, 'fieldID')
                    this.setState({ isAgentCashOut: true, isLoading: true, setModalVisible: false })
                    // console.log('dataAgentCashOut------0000----:', dataAgentCashOut)
                    this.props.agentCashOut(dataAgentCashOut)
                    RequestField.clearInitField()
                }
                break;
            case 'UNITEL':
                if (text.length === 6) {
                    var serviceIndicator = null
                    var serviceCodeUitel = null
                    switch (serviceType) {
                        case `11`:
                            if (phone_topup == infoAccount.phoneNumber) {
                                serviceIndicator = ConfigCode.PRE_PAY
                                serviceCodeUitel = ConfigCode.TOP_UP_MOBILE
                                this.setState({ serviceCodeUitel })
                            } else {
                                serviceIndicator = ConfigCode.PRE_PAY
                                serviceCodeUitel = ConfigCode.TOP_UP_MOBILE_OTHER
                                this.setState({ serviceCodeUitel })
                            }
                            break
                        case `12`:
                            if (phone_topup == infoAccount.phoneNumber) {
                                serviceIndicator = ConfigCode.PRE_PAY
                                serviceCodeUitel = ConfigCode.TOP_UP_UNI
                                this.setState({ serviceCodeUitel })
                            } else {
                                serviceIndicator = ConfigCode.PRE_PAY
                                serviceCodeUitel = ConfigCode.TOP_UP_UNI_OTHER
                                this.setState({ serviceCodeUitel })
                            }
                            break
                        case `00`:
                        case `01`:
                            if (phone_topup == infoAccount.phoneNumber) {
                                serviceIndicator = ConfigCode.PRE_PAY
                                serviceCodeUitel = ConfigCode.POST_PAID_MOBILE
                                this.setState({ serviceCodeUitel })
                            } else {
                                serviceIndicator = ConfigCode.PRE_PAY
                                serviceCodeUitel = ConfigCode.POST_PAID_MOBILE_OTHER
                                this.setState({ serviceCodeUitel })
                            }
                            break
                        default:
                            break
                    }
                    RequestField.clearInitField()
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.PAYMENT_CHARGE_TELE_ACCOUNT)) //571000
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addPaymentCode(phone))
                    RequestField.addToInitField(RequestField.addToPhone(phone))
                    RequestField.addToInitField(RequestField.addServiceIndicator(serviceIndicator))
                    RequestField.addToInitField(RequestField.addAmount(money))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addPin(codePin))
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addServiceCode(serviceCodeUitel))
                    RequestField.addToInitField(RequestField.addPartnerCode(ConfigCode.VIETTEL))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addTier(saveInfo))//63
                    let dataTopupUnitel = RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    // console.log('dataTopupUnitel-------:', dataTopupUnitel)
                    this.setState({ isRequestTopUp: true, isLoading: true, setModalVisible: false })
                    this.props.requestTopUp(dataTopupUnitel)
                    RequestField.clearInitField()
                }
                break;
            case 'INTERNET_SERVICES':
                if (text.length === 6) {
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.PAYMENT_CHARGE_TELE_ACCOUNT)) //571000
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addPaymentCode(paymentCode))
                    RequestField.addToInitField(RequestField.addAmount(money))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addPin(codePin))
                    RequestField.addToInitField(RequestField.addTier(saveInfo))
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addActionNode('1')) //22
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addServiceCode(serviceCodeInternet))
                    RequestField.addToInitField(RequestField.addPartnerCode(ConfigCode.VIETTEL))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    let dataInternetServices = RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    // console.log('dataInternetServices:', dataInternetServices)
                    this.setState({ isRequestPaymentInternet: true, isLoading: true, setModalVisible: false })
                    this.props.requestTopUp(dataInternetServices)
                    RequestField.clearInitField();
                }

                break;
            case 'AGENT_REQUEST_BANK_MONEY':
                if (text.length === 6) {
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.AGENT_REQUEST_BANK_MONEY)) // 033016
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addFromPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addAmount(money))
                    RequestField.addToInitField(RequestField.addPin(codePin))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addBankCode(bankCode))
                    RequestField.addToInitField(RequestField.addTier(saveInfo))
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addCarriedAccId(infoAccount.accountId))
                    let dataRequestBank = RequestField.addToInitField(RequestField.addTransDes(message))
                    dataRequestBank.fieldMap = _.orderBy(dataRequestBank.fieldMap, 'fieldID')
                    this.setState({ isRequestBankMoney: true, isLoading: true, setModalVisible: false })
                    this.props.agentReqBankMoney(dataRequestBank)
                    RequestField.clearInitField()
                }
                break;
            case 'AGENT_REQUEST_EMONEY':
                if (text.length === 6) {
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.AGENT_REQUEST_EMONEY)) // 030005
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addAmount(money))
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addPin(codePin))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addBankCode(bankCode))
                    RequestField.addToInitField(RequestField.addBankTransId(bankTransId))
                    RequestField.addToInitField(RequestField.addTier(saveInfo))//107
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    let dataAgentRequest = RequestField.addToInitField(RequestField.addTransDes(message))
                    dataAgentRequest.fieldMap = _.orderBy(dataAgentRequest.fieldMap, 'fieldID')
                    this.setState({ isRequestEMoney: true, isLoading: true, setModalVisible: false })
                    this.props.agentRequestEmoney(dataAgentRequest)
                    RequestField.clearInitField()
                }
                break;
            case 'TRANSFER_NO_EWLLET':
                if (text.length === 6) {
                    RequestField.clearInitField()
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.TRANSFER_NE2NE)) //011000
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addPin(codePin))
                    RequestField.addToInitField(RequestField.addAmount(money))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addFromPhone(receiverPhone))
                    RequestField.addToInitField(RequestField.addToPhone(senderPhone))
                    RequestField.addToInitField(RequestField.addTier(saveInfo))//107
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    RequestField.addToInitField(RequestField.addTransDes(message ? message : 'Transfer with U-money'))
                    let data1 = RequestField.addToInitField(RequestField.addCarriedAccId(infoAccount.accountId))
                    this.props.transferOtherToOther(data1)
                    this.setState({ isTransferOtherToOther: true, isLoading: true, setModalVisible: false })
                    RequestField.clearInitField()

                }
                break;
            case 'MONEY_AGENT_TRANSFER_CUSTOMER':
                if (text.length === 6) {
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.MONEY_AGENT_TRANSFER_CUSTOMER)) //010004
                    RequestField.addToInitField(RequestField.addRoleId('1'))
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addFromPhone(fromPhone))
                    RequestField.addToInitField(RequestField.addToPhone(toPhone))
                    RequestField.addToInitField(RequestField.addSecretSecure(secretCode))
                    RequestField.addToInitField(RequestField.addAmount(money))
                    RequestField.addToInitField(RequestField.addActionStateId('1'))
                    RequestField.addToInitField(RequestField.addReferenceId(referenceId))
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addTier(saveInfo))//107
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    let dataCashOut = RequestField.addToInitField(RequestField.addPin(codePin))
                    dataCashOut.fieldMap = _.orderBy(dataCashOut.fieldMap, 'fieldID')
                    this.setState({ isRequestCashOut: true, isLoading: true, setModalVisible: false })
                    this.props.requestCashOut(dataCashOut)
                    RequestField.clearInitField()
                }
                break;
            case 'AGENT_REGISTER_FOR_USER':
                if (text.length === 6) {
                    let birthDay = selectedDate.replace(/[^a-zA-Z0-9 ]/g, "")
                    let gender = male ? 'MALE' : 'FEMALE'
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.CUSTOMER_AGENT_REGISTER)) //002001
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
                    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                    RequestField.addToInitField(RequestField.addPin(codePin))
                    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                    RequestField.addToInitField(RequestField.addCustomerPhone(phoneRegister))
                    RequestField.addToInitField(RequestField.addCustomerName(name))
                    RequestField.addToInitField(RequestField.addCustomerBirthday(birthDay))
                    RequestField.addToInitField(RequestField.addCustomerGender(gender))
                    RequestField.addToInitField(RequestField.addPaperType(valueType))
                    RequestField.addToInitField(RequestField.addAreaCode(ConfigCode.AREACODE)) // docs is not require, but it must require
                    RequestField.addToInitField(RequestField.addLanguage(infoAccount.language));
                    RequestField.addToInitField(RequestField.addTransDes(tranDes))
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    let dataRegister = RequestField.addToInitField(RequestField.addPaperNumber(ident))
                    dataRegister.fieldMap = _.orderBy(dataRegister.fieldMap, 'fieldID')
                    this.setState({ isRegister: true, isLoading: true, setModalVisible: false })
                    this.props.agentRegForUser(dataRegister)
                    RequestField.clearInitField()
                }
                break;
            case 'CASH_OUT_WORD_BANK':
                if (text.length === 6) {
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.CASH_OUT_WORD_BANK)) // 3
                    RequestField.addToInitField(RequestField.addAmount(money)) //5
                    RequestField.addToInitField(RequestField.addMerchangeType(1)) //18 MerchangeType = 1 is cashout online mode 
                    RequestField.addToInitField(RequestField.addActionNode(1)) //22
                    RequestField.addToInitField(RequestField.addPaymentCode(cttID)) //67
                    RequestField.addToInitField(RequestField.addAccountID(accountID)) //78  
                    RequestField.addToInitField(RequestField.addTransactionDescription(note))  //107
                    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                    RequestField.addToInitField(RequestField.addImageName(img))//101
                    RequestField.addToInitField(RequestField.addEffectType(infoAccount.agentCode))//103
                    RequestField.addToInitField(RequestField.addCustomerGender(Gender)) //48
                    RequestField.addToInitField(RequestField.addCustomerName(Name))//46
                    RequestField.addToInitField(RequestField.addToName(DetailToName))  //98
                    RequestField.addToInitField(RequestField.addFromName(DetailFromName))  //108
                    RequestField.addToInitField(RequestField.addTIN('1')) //68
                    RequestField.addToInitField(RequestField.addOPT(text))//53
                    let data = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                    console.log('data----word bank:---------000000', data)
                    this.props.onCashOutWordBank(data)
                    RequestField.clearInitField();
                    this.setState({ isRequestCashOutWordBank: true, isLoading: true, setModalVisible: false })
                }
                break;
            default:
                break;
        }

    }
    ResendOTP() {
        const { infoAccount } = this.props
        const { codePin, onProcess } = this.state
        switch (onProcess) {
            case 'PAYMENT_LEASING':
                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(codePin))//52
                RequestField.addToInitField(RequestField.addServiceCode('GET_OTP_LEASING'))//42
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let dataOTPLeasing = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(dataOTPLeasing)
                RequestField.clearInitField()
                break;
            case 'TRANSFER_EWALLET_TO_BANK':
                RequestField.clearInitField()
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
                RequestField.addToInitField(RequestField.addPin(codePin))//52
                RequestField.addToInitField(RequestField.addServiceCode('GET_OTP_BANK'))//41
                RequestField.addToInitField(RequestField.addActionNode('1')) //22
                let dataOTPBank = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                this.setState({ isRequestOTP: true, isLoading: true })
                this.props.requestOTP(dataOTPBank)
                RequestField.clearInitField()
                break;
            default:
                break;
        }
    }
    generatePaymentField() {
        var noGuest = this.state.dataItem;
        var payments = [];
        if (noGuest) {
            for (let i = 0; i < noGuest.length; i++) {
                payments.push(
                    noGuest[i].value != '0' ?
                        <View style={styles.groupText}>
                            <Text style={styles.labelInfo}>{
                                noGuest[i].typeOfPolicy == '1' ? I18n.t('fee')
                                    : noGuest[i].typeOfPolicy == '2' ? I18n.t('commission')
                                        : noGuest[i].typeOfPolicy == '3' ? I18n.t('commission')
                                            : noGuest[i].typeOfPolicy == '4' ? I18n.t('discount') : null}</Text>
                            <Text style={styles.valueFee} numberOfLines={2}>
                                {
                                    noGuest[i].typeOfPolicy == '1' ? noGuest[i].value + ' ₭'
                                        : noGuest[i].typeOfPolicy == '2' ? noGuest[i].value + ' ₭'
                                            : noGuest[i].typeOfPolicy == '3' ? noGuest[i].value + ' ₭'
                                                : noGuest[i].typeOfPolicy == '4' ? noGuest[i].value + ' %' : null
                                }
                            </Text>
                        </View> : null)
            }
            return payments
        }
    }
    componentWillReceiveProps(nextProps) {
        const { infoAccount } = this.props
        const { AccountBankName, AccountNo, processCode, Barcode, mainPhone, onTranferBccs, nameCustomer} = this.state
        var noGuest = this.state.dataItem;

        if (onTranferBccs) {
            switch (nextProps.actionType) {
                case 'CHECK_INFO_DISCOUNT_SUCCESS':
                    if (nextProps.dataDiscount) {
                        let newDirectory = Object.values(nextProps.dataDiscount.reduce((acc, item) => {
                            if (!acc[item.typeOfPolicy]) acc[item.typeOfPolicy] = {
                                typeOfPolicy: item.typeOfPolicy,
                                value: item.value > 0 ? item.value : 0
                            };
                            return acc;
                        }, {}))
                        let getFee = newDirectory[0].value;
                        // let getCommition = newDirectory[1].value;
                        // let getDiscount = newDirectory[3].value;
                        // 1 = Phí
                        // 2 = Hoa hồng
                        // 4 = Chiết khấu
                        //getFee, getCommition, getDiscount
                        this.setState({ isLoading: false, onTranferBccs: false, dataItem: newDirectory, getFee })
                    } else {
                        this.setState({ isLoading: false, onTranferBccs: false, getFee: null, getCommition: null, getDiscount: null })
                    }

                    break;
                case 'CHECK_INFO_DISCOUNT_FAILED':
                    this.setState({ isLoading: false, onTranferBccs: false })
                    break;
                default:
                    break;
            }
        }
        if (this.state.isLoading && this.state.isRequestCashInForPOS && !nextProps.isFetching) {
            if (nextProps.cashInData) {
                console.log('nextProps.cashInData:', nextProps.cashInData)
                let responseCode = RequestField.getValueField(nextProps.cashInData.fieldMap, FIELD.RESPONSE_CODE)
                let message = RequestField.getValueField(nextProps.cashInData.fieldMap, FIELD.RESPONSE_DESCRIPTION)
                switch (responseCode) {
                    case '00000':
                        this.setState({ isRequestCashInForPOS: false, isLoading: false })
                        this.props.navigation.navigate('TransactionResult',
                            {
                                data: nextProps.cashInData.fieldMap,
                                processName: I18n.t('cashIn')
                            })
                        break;
                    case responseCode:
                        this.refs.responseMessage.onOpen()
                        this.setState({ isRequestCashInForPOS: false, isLoading: false, responseMessage: message ? message : I18n.t('99999') })
                        break;
                    default:
                        break;
                }
            }
        }
        if (this.state.isTransferOtherToOther) {
            if (nextProps.transferOtO && nextProps.transferOtO.responseCode) {
                if (nextProps.transferOtO && nextProps.transferOtO.error === '00000') {

                    let responseCode = RequestField.getValueField(nextProps.transferOtO.fieldMap, FIELD.RESPONSE_CODE)
                    let message = RequestField.getValueField(nextProps.transferOtO.fieldMap, FIELD.RESPONSE_DESCRIPTION)

                    switch (responseCode) {
                        case '00000':
                            this.props.navigation.navigate('TransactionResult',
                                {
                                    data: nextProps.transferOtO.fieldMap,
                                    processName: I18n.t('transferForCustomer')
                                })
                            this.setState({ isTransferOtherToOther: false, isLoading: false })
                            break;
                        case 10175:
                            this.refs.error10155.onOpen();
                            this.setState({ isTransferOtherToOther: false, isLoading: false })
                            break;
                        case 10155:
                            this.refs.responseMessage.onOpen()
                            this.setState({ isTransferOtherToOther: false, isLoading: false, responseMessage: I18n.t('10155') })
                            break;
                        case 10156:
                            this.refs.responseMessage.onOpen()
                            this.setState({ isTransferOtherToOther: false, isLoading: false, responseMessage: I18n.t('10156') })
                            break;
                        case 99999:
                            this.refs.responseDescripTion.onOpen()
                            this.setState({ isTransferOtherToOther: false, isLoading: false, messageError: I18n.t('99999') })
                            break;
                        case responseCode:
                            this.refs.responseMessage.onOpen()
                            this.setState({ isTransferOtherToOther: false, isLoading: false, responseMessage: message ? message : I18n.t('99999') })
                            break;
                        default:
                            break;
                    }
                } else {
                    if (nextProps.transferOtO && nextProps.transferOtO.responseCode) {
                        handleResponseCode(nextProps.transferOtO.responseCode);
                    } else {
                        this.refs.failedDueNoResponse.onOpen()
                    }
                }
            } else {
                this.refs.failedDueNoResponse.onOpen()
            }
        }
        if (this.state.isRequestCashOut && !nextProps.isFetching) {
            this.setState({ isRequestCashOut: false, isLoading: false })
            if (nextProps.cashOutData && nextProps.cashOutData.responseCode) {
                if (nextProps.cashOutData && nextProps.cashOutData.error === '00000') {
                    let responseCode = RequestField.getValueField(nextProps.cashOutData.fieldMap, FIELD.RESPONSE_CODE)
                    let message = RequestField.getValueField(nextProps.cashOutData.fieldMap, FIELD.RESPONSE_DESCRIPTION)
                    switch (responseCode) {
                        case '00000':
                            this.props.navigation.navigate('TransactionResult',
                                {
                                    data: nextProps.cashOutData.fieldMap,
                                    processName: I18n.t('cashOut')
                                })
                            break;
                        case 11101:
                            this.refs.Error11101.onOpen();
                            break;
                        case 10175:
                            this.refs.error10155.onOpen();
                            break;
                        case 10155:
                            this.refs.responseMessage.onOpen()
                            this.setState({ responseMessage: I18n.t('10155') })
                            break;
                        case 10156:
                            this.refs.responseMessage.onOpen()
                            this.setState({ responseMessage: I18n.t('10156') })
                            break;
                        case 10840:
                            this.refs.responseMessage.onOpen()
                            this.setState({ responseMessage: I18n.t('10155') })
                            break;
                        case responseCode:
                            this.refs.responseMessage.onOpen()
                            this.setState({ responseMessage: message ? message : I18n.t('99999') })
                            break;
                        default:
                            if (nextProps.cashOutData && nextProps.cashOutData.responseDescription) {
                                this.refs.transactionIsUnsuccessful.onOpen()
                            } else {
                                this.refs.NotificationSystemBusy.onOpen()
                            }
                            break;
                    }
                } else {
                    if (nextProps.cashOutData.responseCode) {
                        handleResponseCode(nextProps.cashOutData.responseCode);
                    } else {
                        this.refs.NotificationSystemBusy.onOpen()
                    }
                }
            } else {
                this.refs.failedDueNoResponse.onOpen()
            }
        }
        if (this.state.isRequestCashInForcustomer && this.state.isLoading) {
            if (nextProps.cashInData && nextProps.cashInData.responseCode) {
                if (nextProps.cashInData && nextProps.cashInData.error === '00000') {
                    switch (nextProps.cashInData.responseCode) {
                        case '00000':
                            this.props.navigation.navigate('TransactionResult',
                                {
                                    data: nextProps.cashInData.fieldMap,
                                    processName: I18n.t('transferToAnotherAgent'),
                                    processCode: '010002'
                                })
                            this.setState({ isRequestCashInForcustomer: false, isLoading: false })
                            break;
                        case nextProps.cashInData.responseCode:
                            this.refs.responseMessage.onOpen()
                            this.setState({ isRequestCashInForcustomer: false, isLoading: false, responseMessage: nextProps.cashInData.responseDescription ? nextProps.cashInData.responseDescription : I18n.t('99998') })
                            break;
                        default:
                            break;
                    }
                } else {
                    if (nextProps.cashInData.responseCode) {
                        this.refs.responseMessage.onOpen()
                        this.setState({ isRequestCashInForcustomer: false, isLoading: false, responseMessage: nextProps.cashInData.description ? nextProps.cashInData.description : I18n.t('99998') })
                    } else {
                        this.refs.NotificationSystemBusy.onOpen()
                        this.setState({ isRequestCashInForcustomer: false, isLoading: false })
                    }
                }
            } else {
                this.refs.failedDueNoResponse.onOpen()
                this.setState({ isRequestCashInForcustomer: false, isLoading: false })
            }
        }
        if (this.state.isAgentCashOut && !nextProps.isFetching) {
            this.setState({ isAgentCashOut: false, isLoading: false })
            if (nextProps.receiver && nextProps.receiver.responseCode) {
                if (nextProps.agentCashOutData && nextProps.agentCashOutData.error === '00000') {
                    let response = RequestField.getValueField(nextProps.agentCashOutData.fieldMap, FIELD.RESPONSE_CODE);
                    let messenError = RequestField.getValueField(nextProps.agentCashOutData.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                    switch (response) {
                        case '00000':
                            this.props.navigation.navigate('TransactionResult',
                                {
                                    data: nextProps.agentCashOutData.fieldMap,
                                    processName: I18n.t('agentCashOut')
                                })
                            break;
                        case 11101:
                            this.refs.Error11101.onOpen();
                            break;
                        case 10175:
                            this.refs.error10155.onOpen();
                            break;
                        case 10155:
                            this.refs.responseMessage.onOpen()
                            this.setState({ responseMessage: I18n.t('10155') })
                            break;
                        case 10156:
                            this.refs.responseMessage.onOpen()
                            this.setState({ responseMessage: I18n.t('10156') })
                            break;
                        case response:
                            this.refs.responseMessage.onOpen()
                            this.setState({ responseMessage: messenError ? messenError : I18n.t('99998') })
                            break;
                        default:

                            break;
                    }

                } else {
                    if (nextProps.agentCashOutData && nextProps.agentCashOutData.responseCode) {

                        handleResponseCode(nextProps.agentCashOutData.responseCode);
                    } else {
                        this.refs.NotificationSystemBusy.onOpen()
                    }
                }
            }
            else {

                this.refs.failedDueNoResponse.onOpen()
            }
        }
        if (this.state.isRequestBankMoney && !nextProps.isFetching) {
            this.setState({ isRequestBankMoney: false, isLoading: false })
            if (nextProps.agentReqBankMoneyData && nextProps.agentReqBankMoneyData.responseCode) {
                if (nextProps.agentReqBankMoneyData && nextProps.agentReqBankMoneyData.error === '00000') {
                    let response = RequestField.getValueField(nextProps.agentReqBankMoneyData.fieldMap, FIELD.RESPONSE_CODE);
                    let messenError = RequestField.getValueField(nextProps.agentReqBankMoneyData.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                    switch (response) {
                        case '00000':
                            this.props.navigation.navigate('TransactionResult',
                                {
                                    data: nextProps.agentReqBankMoneyData.fieldMap,
                                    processName: I18n.t('requestCash')
                                })
                            break;
                        case 11101:
                            this.refs.Error11101.onOpen();
                            break;
                        case 10175:
                            this.refs.error10155.onOpen();
                            this.setState({ isLoading: false, isRequestBankMoney: false, })
                            break;
                        case 10155:
                            this.refs.responseMessage.onOpen()
                            this.setState({ isLoading: false, isRequestBankMoney: false, responseMessage: I18n.t('10155') })
                            break;
                        case 10156:
                            this.refs.responseMessage.onOpen()
                            this.setState({ isLoading: false, isRequestBankMoney: false, responseMessage: I18n.t('10156') })
                            break;

                        case response:
                            this.refs.responseMessage.onOpen()
                            this.setState({ isLoading: false, isRequestBankMoney: false, responseMessage: messenError ? messenError : I18n.t('99998') })
                            break;

                        default:
                            break;
                    }


                } else {

                    if (nextProps.agentReqBankMoneyData.responseCode) {
                        handleResponseCode(nextProps.agentReqBankMoneyData.responseCode);
                    } else {
                        this.refs.NotificationSystemBusy.onOpen()
                    }
                }
            } else {
                this.refs.failedDueNoResponse.onOpen()
            }
        }
        if (this.state.isRequestEMoney && !nextProps.isFetching) {
            this.setState({ isRequestEMoney: false, isLoading: false })
            if (nextProps.agentReqEMoneyData && nextProps.agentReqEMoneyData.responseCode) {
                if (nextProps.agentReqEMoneyData && nextProps.agentReqEMoneyData.error === '00000') {
                    let response = RequestField.getValueField(nextProps.agentReqEMoneyData.fieldMap, FIELD.RESPONSE_CODE);
                    let messenError = RequestField.getValueField(nextProps.agentReqEMoneyData.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                    switch (response) {
                        case '00000':
                            this.props.navigation.navigate('TransactionResult',
                                {
                                    data: nextProps.agentReqEMoneyData.fieldMap,
                                    processName: I18n.t('requestEMoney')
                                })
                            break;
                        case 11101:
                            this.refs.Error11101.onOpen();
                            this.setState({ responseMessage: messenError })
                            break;
                        case response:
                            this.refs.responseMessage.onOpen()
                            this.setState({ responseMessage: messenError ? messenError : I18n.t('99999') })
                            break;
                        default:
                            if (response) {
                                if (response === 10130) {
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: I18n.t('bankCodeDoesNotExist', { bank_code: bankCode }) })

                                } else {
                                    handleResponseCode(response);
                                }
                            } else {
                                if (nextProps.agentReqEMoneyData && nextProps.agentReqEMoneyData.responseDescription) {
                                    this.refs.transactionIsUnsuccessful.onOpen()
                                } else {
                                    this.refs.NotificationSystemBusy.onOpen()
                                }
                            }
                            break;
                    }
                } else {
                    if (nextProps.agentReqEMoneyData.responseCode) {
                        handleResponseCode(nextProps.agentReqEMoneyData.responseCode);
                    } else {
                        this.refs.NotificationSystemBusy.onOpen()
                    }
                }
            } else {
                this.refs.failedDueNoResponse.onOpen()
            }

        }
        if (this.state.isRequestOTP && this.state.isLoading) {
            console.log('nextProps.BankReducer.actionType:', nextProps.BankReducer.actionType)
            console.log('nextProps.BankReducer.getOTPBank:', nextProps.BankReducer.getOTPBank)
            this.setState({ isLoading: false, isRequestOTP: false })
            switch (nextProps.BankReducer.actionType) {
                case GET_OTP_BANK_SUCCESS:
                    // console.log('nextProps.BankReducer.getOTPBank.data.responseCode:', nextProps.BankReducer.getOTPBank.data.responseCode)
                    if (nextProps.BankReducer.getOTPBank.data) {
                        if (nextProps.BankReducer.getOTPBank.data.responseCode === '00000') {
                            this.setState({ isLoading: false, setModalVisible: true, isRequestOTP: false, run: true })
                        } else {
                            this.setState({ isLoading: false, isRequestOTP: false, responseMessage: I18n.t('somethingWentWrong') })
                        }
                    } else {
                        // this.onResentOTP
                        //somethingWentWrong 98245250
                        this.refs.responseMessage.onOpen()
                        this.setState({ isLoading: false, isRequestOTP: false, responseMessage: I18n.t('somethingWentWrong') })
                    }
                    break;
                case GET_OTP_BANK_FAILED:
                    this.refs.Error10157.onOpen()
                    this.setState({ isLoading: false, isRequestOTP: false })
                    break;
                default:
                    break;
            }
        }
        if (this.state.isRequestTranferBank) {
            switch (nextProps.BankReducer.actionType) {
                case TRANSFER_EWALLET_TO_BANK_SUCCESS:

                    if (nextProps.BankReducer.TransferToBank.data) {
                        let response = RequestField.getValueField(nextProps.BankReducer.TransferToBank.data.fieldMap, FIELD.RESPONSE_CODE);
                        let messenError = RequestField.getValueField(nextProps.BankReducer.TransferToBank.data.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                        switch (response) {
                            case '00000':
                                let mProcessName = "TransferedToBankSuccessfully";
                                this.props.navigation.navigate('TransactionResult', {
                                    data: nextProps.BankReducer.TransferToBank.data.fieldMap,
                                    processName: I18n.t('NAV_VIET_BANK'),
                                    isUnitelService: true,
                                    notify: mProcessName,
                                    AccountBankName: AccountBankName,
                                    AccountNo: AccountNo,
                                    processCode: processCode
                                })
                                this.setState({ isLoading: false, isRequestTranferBank: false })
                                break;

                            case 10175:
                                this.refs.error10155.onOpen();
                                this.setState({ isLoading: false, isRequestTranferBank: false, })
                                break;
                            case 10155:
                                this.refs.responseMessage.onOpen()
                                this.setState({ isLoading: false, isRequestTranferBank: false, responseMessage: I18n.t('10155') })
                                break;
                            case 10156:
                                this.refs.responseMessage.onOpen()
                                this.setState({ isLoading: false, isRequestTranferBank: false, responseMessage: I18n.t('10156') })
                                break;

                            case response:
                                this.refs.responseMessage.onOpen()
                                this.setState({ isLoading: false, isRequestTranferBank: false, responseMessage: messenError ? messenError : I18n.t('99998') })
                                break;

                            default:
                                break;
                        }
                    }


                case TRANSFER_EWALLET_TO_BANK_FAILED:
                    this.setState({ isLoading: false, isRequestTranferBank: false })
                    break;
                default:
                    break;
            }
        }
        if (this.state.isRequestTopUp && !nextProps.isFetching) {
            this.setState({ isRequestTopUp: false, isLoading: false, setModalVisible: false })
            if (nextProps.topUpData && nextProps.topUpData.responseCode) {
                let response = RequestField.getValueField(nextProps.topUpData.fieldMap, FIELD.RESPONSE_CODE);
                let messenError = RequestField.getValueField(nextProps.topUpData.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                switch (response) {
                    case '00000':
                        let mProcessName = "yourTopupHasDoneSuccessfully";
                        this.props.navigation.navigate('TransactionResult',
                            {
                                data: nextProps.topUpData.fieldMap,
                                processName: I18n.t('TopUp'),
                                isUnitelService: true,
                                notify: mProcessName,
                                getTransFee: noGuest
                            })
                        break;
                    case 10175:
                        this.refs.error10155.onOpen();
                        break;
                    case 10155:
                        this.refs.responseMessage.onOpen()
                        this.setState({ responseMessage: I18n.t('10155') })
                        break;
                    case 10156:
                        this.refs.responseMessage.onOpen()
                        this.setState({ responseMessage: I18n.t('10156') })
                        break;
                    case 10545:
                        this.refs.responseMessage.onOpen()
                        this.setState({ responseMessage: I18n.t('10545') })
                        break;

                    case response:
                        this.refs.responseMessage.onOpen()
                        this.setState({ responseMessage: messenError ? messenError : I18n.t('99999') })
                        break;
                    default:
                        var responseCode = nextProps.topUpData && nextProps.topUpData.responseCode ? nextProps.topUpData.responseCode : '10532'
                        if (responseCode) {
                            handleResponseCode(responseCode);
                        } else {
                            this.refs.NotificationSystemBusy.onOpen()
                        }
                        break;
                }
            } else {
                this.refs.failedDueNoResponse.onOpen()
            }

        }
        if (this.state.isRequestTopUpETL && !nextProps.isFetching) {
            this.setState({ isRequestTopUpETL: false, isRequestBccs: false, isLoading: false, setModalVisible: false })
            if (nextProps.requestTopUpETL.data.error === "00000") {
                let response = RequestField.getValueField(nextProps.requestTopUpETL.data.fieldMap, FIELD.RESPONSE_CODE);
                let messenError = RequestField.getValueField(nextProps.requestTopUpETL.data.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                switch (response) {
                    case '00000':
                        let mProcessName = "yourTopupHasDoneSuccessfully";
                        this.props.navigation.navigate('TransactionResult', {
                            data: nextProps.requestTopUpETL.data.fieldMap,
                            processName: I18n.t('TopUp'),
                            isUnitelService: true,
                            notify: mProcessName,
                        })
                        break;
                    case 10175:
                        this.refs.error10155.onOpen();
                        break;
                    case 10155:
                        this.refs.responseMessage.onOpen()
                        this.setState({ responseMessage: I18n.t('10155') })
                        break;
                    case 10156:
                        this.refs.responseMessage.onOpen()
                        this.setState({ responseMessage: I18n.t('10156') })
                        break;
                    case response:
                        this.refs.responseMessage.onOpen()
                        this.setState({ responseMessage: messenError ? messenError : I18n.t('99999') })
                        break;



                    default:
                        this.refs.somethingWentWrong.onOpen()
                        break;
                }
            }
        }
        if (this.state.isRequestPaymentInternet && !nextProps.isFetching) {
            this.setState({ isRequestPaymentInternet: false, isLoading: false })
            if (nextProps.topUpData && nextProps.topUpData.responseCode) {
                let response = RequestField.getValueField(nextProps.topUpData.fieldMap, FIELD.RESPONSE_CODE);
                let messenError = RequestField.getValueField(nextProps.topUpData.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                switch (response) {
                    case '00000':
                        this.props.navigation.navigate('TransactionResult',
                            {
                                data: nextProps.topUpData.fieldMap,
                                processName: I18n.t('internetPayment'),
                                isUnitelService: true,
                                notify: this.state.serviceName,
                                mainPhone: mainPhone,
                            })
                        break;
                    case 10175:
                        this.refs.error10155.onOpen();
                        break;
                    case 10155:
                        this.refs.responseMessage.onOpen()
                        this.setState({ responseMessage: I18n.t('10155') })
                        break;
                    case 10156:
                        this.refs.responseMessage.onOpen()
                        this.setState({ responseMessage: I18n.t('10156') })
                        break;
                    case 10546:
                        this.refs.responseMessage.onOpen()
                        this.setState({ responseMessage: I18n.t('errorBccsinternet') })
                        break;
                    case response:
                        this.refs.responseMessage.onOpen()
                        this.setState({ responseMessage: messenError ? messenError : I18n.t('99999') })
                        break;
                    default:
                        break;
                }
            } else {
                this.refs.failedDueNoResponse.onOpen()
            }
        }
        if (this.state.isRequestTopUpPSTN && !nextProps.isFetching) {
            this.setState({ isRequestTopUpPSTN: false, isLoading: false })
            if (nextProps.topUpData && nextProps.topUpData.responseCode) {
                if (nextProps.topUpData && nextProps.topUpData.responseCode === '00000') {
                    this.props.navigation.navigate('TransactionResult',
                        {
                            data: nextProps.topUpData.fieldMap,
                            processName: I18n.t('pstnPayment'),
                            isUnitelService: true,
                            notify: this.state.serviceName
                        })
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
                this.refs.failedDueNoResponse.onOpen();
            }
        }
        if (this.state.isRegister && !nextProps.isRegFetching) {
            this.setState({ isRegister: false, isLoading: false })
            if (nextProps.agentRegForUserData && nextProps.agentRegForUserData.responseCode) {
                if (nextProps.agentRegForUserData.error === '00000') {
                    let response = RequestField.getValueField(nextProps.agentRegForUserData.fieldMap, FIELD.RESPONSE_CODE);
                    let messenError = RequestField.getValueField(nextProps.agentRegForUserData.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                    switch (response) {
                        case '00000':
                            this.props.navigation.navigate('TransactionResult',
                                {
                                    data: nextProps.agentRegForUserData.fieldMap,
                                    processName: I18n.t('registerForCustomer')
                                })
                            break;
                        case 10155:
                            this.refs.error10155.onOpen();
                            break;
                        case response:
                            this.refs.responseMessage.onOpen()
                            this.setState({ responseMessage: messenError ? messenError : I18n.t('99999') })
                            break;
                        default:
                            break;
                    }
                } else {
                    this.setState({ isNeedDisableButton: false })
                }
            } else {
                this.setState({ isNeedDisableButton: false })
                this.refs.failedDueNoResponse.onOpen();
            }
        }
        if (this.state.isRequestCashInPOS && !nextProps.isFetching) {
            this.setState({ isRequestCashInPOS: false, isLoading: false })
            if (nextProps.cashInData && nextProps.cashInData.error === '00000') {
                let response = RequestField.getValueField(nextProps.cashInData.fieldMap, FIELD.RESPONSE_CODE);
                let messenError = RequestField.getValueField(nextProps.cashInData.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                switch (response) {
                    case '00000':
                        this.props.navigation.navigate('TransactionResult',
                            {
                                data: nextProps.cashInData.fieldMap,
                                processName: I18n.t('PosCashin')
                            })
                        break;
                    case response:
                        this.refs.responseMessage.onOpen()
                        this.setState({ responseMessage: messenError ? messenError : I18n.t('99998') })
                        break;
                    default:
                        this.refs.transactionIsUnsuccessful.onOpen()
                        break;
                }
            } else {
                if (nextProps.cashInData && nextProps.cashInData.responseCode) {
                    handleResponseCode(nextProps.cashInData.responseCode);
                } else {
                    this.refs.failedDueNoResponse.onOpen();
                }
            }
        }
        if (this.state.isLoading && this.state.isRequestPaymentLeasing) {
            // console.log('nextProps.LeasingReducer:', nextProps.LeasingReducer)
            // console.log('nextProps.responseCode:', nextProps.LeasingReducer.responseCode)
            switch (nextProps.LeasingReducer.actionType) {
                case 'PAY_LEASING_AEON_SUCCESS':
                    let messenError = RequestField.getValueField(nextProps.requestPayLeasingAeon.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                    switch (nextProps.requestPayLeasingAeon.responseCode) {
                        case '00000':
                            let mProcessName = "paymentLeasingSuccessfully";
                            this.props.navigation.navigate('TransactionResult',
                                {
                                    data: nextProps.requestPayLeasingAeon.fieldMap,
                                    processName: I18n.t('leasing'),
                                    isUnitelService: true,
                                    notify: mProcessName
                                })
                            this.setState({ isRequestPaymentLeasing: false, isLoading: false })
                            break;
                        case nextProps.requestPayLeasingAeon.responseCode:
                            this.refs.responseMessage.onOpen()
                            this.setState({ isRequestPaymentLeasing: false, isLoading: false, responseMessage: messenError ? messenError : I18n.t('99999') })
                            break;

                        default:
                            break;
                    }
                    break;
                case 'PAY_LEASING_AEON_FAILED':
                    if (nextProps.LeasingReducer) {
                        switch (nextProps.LeasingReducer.responseCode) {
                            case nextProps.LeasingReducer.responseCode:
                                this.refs.responseMessage.onOpen()
                                this.setState({ isRequestPaymentLeasing: false, isLoading: false, responseMessage: nextProps.LeasingReducer.responseDescription })
                                break;

                            default:
                                break;
                        }
                    } else {
                        this.refs.responseMessage.onOpen()
                        this.setState({ isRequestPaymentLeasing: false, isLoading: false, responseMessage: I18n.t('99999') })

                    }
                    break;

                default:
                    break;
            }
        }
        if (this.state.onBuyLottery && this.state.isLoading) {
            if (nextProps.LotteryReducer.isSuccess === true && nextProps.LotteryReducer) {
                this.setState({ isLoading: false, onBuyLottery: false })
                let response = RequestField.getValueField(nextProps.LotteryReducer.buyLottery.data.fieldMap, FIELD.RESPONSE_CODE);
                let messenError = RequestField.getValueField(nextProps.LotteryReducer.buyLottery.data.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                switch (nextProps.LotteryReducer.actionType) {
                    case "BUY_LOTTERY_SUCCESS":
                        switch (response) {
                            case '00000':
                                let responseCode = RequestField.getValueField(nextProps.LotteryReducer.buyLottery.data.fieldMap, FIELD.RESPONSE_CODE)
                                let list = RequestField.getValueField(nextProps.LotteryReducer.buyLottery.data.fieldMap, FIELD.FILE_NAME)
                                if (responseCode === '00000') {
                                    this.props.navigation.navigate('TransactionResult', {
                                        data: nextProps.LotteryReducer.buyLottery.data.fieldMap,
                                        processName: I18n.t('buyLottery'),
                                        listBuyLottery: list
                                    })
                                }
                                break;
                            case 10155:
                                this.refs.error10155.onOpen();
                                break;
                            case 10000:
                                this.refs.responseMessage.onOpen()
                                this.setState({ responseMessage: nextProps.LotteryReducer.buyLottery.data.responseDescription })
                                break;
                            case response:
                                this.refs.responseMessage.onOpen()
                                this.setState({ responseMessage: messenError ? messenError : I18n.t('99999') })
                                break;

                            default:
                                break;
                        }
                        break;
                    case "BUY_LOTTERY_FALSE":
                        this.refs.responseMessage.onOpen()
                        this.setState({ isLoading: false, tabNumber: 0, responseMessage: I18n.t('99999') })
                        break;
                    default:
                        break;
                }
            }
        }
        if (this.state.onBuyLotteryNCC && this.state.isLoading) {

            if (nextProps.LotteryReducer.isSuccess === true) {
                switch (nextProps.LotteryReducer.actionType) {
                    case 'BUY_LOTTERY_NCC_SUCCESS':
                        //let response = RequestField.getValueField(nextProps.LotteryReducer.buyLotteryNCC.data.fieldMap, FIELD.RESPONSE_CODE);
                        // let messenError = RequestField.getValueField(nextProps.LotteryReducer.buyLotteryNCC.data.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                        break;
                    case 'BUY_LOTTERY_NCC_FAILED':

                        break;

                    default:
                        break;
                }
            }

        }
        if (this.state.onSellLottery && this.state.isLoading) {
            if (nextProps.LotteryReducer.isSuccess === true && nextProps.LotteryReducer) {
                this.setState({ isLoading: false })
                switch (nextProps.LotteryReducer.actionType) {
                    case "SALE_LOTTERY_SUCCESS":
                        if (nextProps.LotteryReducer.saleLottery.data.error === '00000' && nextProps.LotteryReducer.saleLottery.data.responseCode === '00000') {
                            let responseCode = RequestField.getValueField(nextProps.LotteryReducer.saleLottery.data.fieldMap, FIELD.RESPONSE_CODE)
                            let list = RequestField.getValueField(nextProps.LotteryReducer.saleLottery.data.fieldMap, FIELD.FILE_NAME)
                            if (responseCode === '00000') {
                                this.props.navigation.navigate('TransactionResult', {
                                    data: nextProps.LotteryReducer.saleLottery.data.fieldMap,
                                    processName: I18n.t('lottery'),
                                    listBuyLottery: list
                                })
                            }
                        } else {
                            this.refs.transactionIsUnsuccessful.onOpen();
                        }
                        break;
                    case "SALE_LOTTERY_FALSE":
                        this.refs.responseMessage.onOpen()
                        this.setState({ isLoading: false, tabNumber: 1, responseMessage: '99999' })
                        break;
                    default:
                        break;
                }
            }
        }
        if (this.state.onCheckBacodeLottery && this.state.isLoading) {
            if (nextProps.LotteryReducer.isSuccess === true && nextProps.LotteryReducer) {
                this.setState({ isLoading: false, Barcode, onCheckBacodeLottery: false })
                switch (nextProps.LotteryReducer.actionType) {
                    case "LUCKY_LOTTERY_SUCCESS":
                        if (nextProps.LotteryReducer.luckyLottery.data.error === '00000') {
                            let responseLucky = RequestField.getValueField(nextProps.LotteryReducer.luckyLottery.data.fieldMap, FIELD.RESPONSE_CODE)
                            let meassge = RequestField.getValueField(nextProps.LotteryReducer.luckyLottery.data.fieldMap, FIELD.RESPONSE_DESCRIPTION)
                            switch (responseLucky) {
                                case '00000':
                                    this.props.navigation.navigate('TransactionResult',
                                        {
                                            data: nextProps.LotteryReducer.luckyLottery.data.fieldMap,
                                            processName: I18n.t('Payreward'),
                                            baCode: Barcode,
                                            sceen: 'LUCKY'
                                        })
                                    break;
                                case 10585:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: I18n.t('10585') })
                                    break;
                                case 10571:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: I18n.t('10571') })
                                    break;
                                case 10572:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: I18n.t('10572') })
                                    break;
                                case 10573:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: I18n.t('10573') })
                                    break;
                                case 10574:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: I18n.t('10574') })
                                    break;
                                case 10565:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: I18n.t('10565') })
                                    break;
                                case 10566:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: I18n.t('10566') })
                                    break;
                                case 10568:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: I18n.t('10568') })
                                    break;
                                case 10584:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: I18n.t('10584') })
                                    break;
                                case 10567:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: I18n.t('10567') })
                                    break;
                                case 10582:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: I18n.t('10582') })
                                    break;
                                case 10569:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: I18n.t('10569') })
                                    break;

                                case 10156:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: I18n.t('10156') })
                                    break;
                                case 10155:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: I18n.t('10155') })
                                    break;
                                case 10159:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: meassge })
                                    break;
                                case responseLucky:
                                    this.refs.responseMessage.onOpen()
                                    this.setState({ responseMessage: meassge ? meassge : I18n.t('99999') })
                                    break;

                                default:
                                    break;
                            }
                        }
                        break;
                    case "LUCKY_LOTTERY_FALSE":
                        this.setState({ isLoading: false, tabNumber: 2 })
                        break;
                    default:
                        break;
                }
            }
        }

        if (this.state.isRequestTranferBccs && this.state.isLoading) {
            switch (nextProps.actionType) {
                case 'PAY_STAFF_DEBT_SUCCESS':
                    if (nextProps.transferbccs.data) {
                        let responseLucky = RequestField.getValueField(nextProps.transferbccs.data.fieldMap, FIELD.RESPONSE_CODE)
                        let meassge = RequestField.getValueField(nextProps.transferbccs.data.fieldMap, FIELD.RESPONSE_DESCRIPTION)
                        switch (responseLucky) {
                            case '00000':
                                let mProcessName = "DebtsettlementSuccess";
                                this.props.navigation.navigate('TransactionResult',
                                    {
                                        data: nextProps.transferbccs.data.fieldMap,
                                        processName: I18n.t('txtDebtsettlement'),
                                        isUnitelService: true,
                                        notify: mProcessName
                                    })
                                this.setState({ isLoading: false, isRequestTranferBccs: false })
                                break;
                            case 10130:
                                this.refs.error10130.onOpen()
                                this.setState({ isLoading: false, isRequestTranferBccs: false })
                                break;
                            case 99999:
                                this.refs.responseDescripTion.onOpen()
                                this.setState({ isLoading: false, isRequestTranferBccs: false, messageError: I18n.t('99999') })
                                break;
                            case responseLucky:
                                this.refs.responseMessage.onOpen()
                                this.setState({ isLoading: false, isRequestTranferBccs: false, responseMessage: meassge ? meassge : I18n.t('99999') })
                                break;
                            default:
                                break;
                        }
                    } else {
                        alert('Error system')
                    }
                case 'PAY_STAFF_DEBT_FALSE':
                    this.setState({ isLoading: false, isRequestTranferBccs: false })
                    break;
                default:
                    break;
            }
        }
        if (this.state.isRequestApproval && this.state.isLoading) {

            switch (nextProps.WorldBank.actionType) {
                case 'APPROVAL_TRANSACTION_SUCCESS':
                    let responseCode = RequestField.getValueField(nextProps.WorldBank.getDataApproval.data.fieldMap, FIELD.RESPONSE_CODE)
                    let responseDescripTion = RequestField.getValueField(nextProps.WorldBank.getDataApproval.data.fieldMap, FIELD.RESPONSE_DESCRIPTION)
                    switch (responseCode) {
                        case '00000':
                            let mProcessName = "approvalTransactionSuccessfully";
                            this.props.navigation.navigate('TransactionResult',
                                {
                                    data: nextProps.WorldBank.getDataApproval.data.fieldMap,
                                    processName: responseDescripTion,
                                    isUnitelService: true,
                                    notify: mProcessName
                                })
                            this.setState({ isRequestApproval: false, isLoading: false })
                            break;
                        case responseCode:
                            this.refs.responseDescripTion.onOpen()
                            this.setState({ isRequestApproval: false, isLoading: false, messageError: responseDescripTion })
                            break;
                        default:
                            break;
                    }
                    break;
                case 'APPROVAL_TRANSACTION_FAILED':
                    this.setState({ isRequestApproval: false, isLoading: false })
                    break;

                default:
                    break;
            }
        }
        //processName
        if (this.state.onChecPaymentInsurance && this.state.isLoading) {
            if (nextProps.dataPayMentInsurance && nextProps.Insurance.actionType) {
                switch (nextProps.Insurance.actionType) {
                    case 'PAY_MENT_INSURANCE_SUCCESS':
                        let responseCode = RequestField.getValueField(nextProps.dataPayMentInsurance.data.fieldMap, FIELD.RESPONSE_CODE)
                        let responseDescripTion = RequestField.getValueField(nextProps.dataPayMentInsurance.data.fieldMap, FIELD.RESPONSE_DESCRIPTION)
                        switch (responseCode) {
                            case '00000':
                                ////console.log('nextProps.dataPayMentInsurance.data.fieldMap:', nextProps.dataPayMentInsurance.data.fieldMap)
                                let mProcessName = "approvalTransactionSuccessfully";
                                this.props.navigation.navigate('TransactionResult',
                                    {
                                        data: nextProps.dataPayMentInsurance.data.fieldMap,
                                        processName: I18n.t('BuyAPAInsurance'),
                                        isUnitelService: true,
                                        notify: mProcessName,
                                        processCode: 'APA'
                                    })
                                this.setState({ onChecPaymentInsurance: false, isLoading: false })
                                break;
                            case 99999:
                                this.refs.responseDescripTion.onOpen()
                                this.setState({ onChecPaymentInsurance: false, isLoading: false, messageError: I18n.t('99999') })
                                break;
                            case responseCode:
                                this.refs.responseDescripTion.onOpen()
                                this.setState({ onChecPaymentInsurance: false, isLoading: false, messageError: responseDescripTion })
                                break;
                            default:
                                break;
                        }
                        break;
                    case 'PAY_MENT_INSURANCE_FAILED':
                        this.refs.responseDescripTion.onOpen()
                        this.setState({ onChecPaymentInsurance: false, isLoading: false, messageError: 'PAY_MENT_INSURANCE_FAILED' })
                        break;

                    default:
                        break;
                }
            }

        }
        if (this.state.PaymentWatterNpp && this.state.isLoading) {
            if (nextProps.getPaymentWatter && nextProps.WatterReducers.actionType) {
                ////console.log('<<<  mgetPaymentWattermm >>>>', nextProps.getPaymentWatter)
                ////console.log('<<<  mmm >>>>', nextProps.WatterReducers.actionType)
                switch (nextProps.WatterReducers.actionType) {
                    case 'PAY_MENT_WATTER_NPP_SUCCESS':
                        let responseCode = RequestField.getValueField(nextProps.getPaymentWatter.data.fieldMap, FIELD.RESPONSE_CODE)
                        let responseDescripTion = RequestField.getValueField(nextProps.getPaymentWatter.data.fieldMap, FIELD.RESPONSE_DESCRIPTION)
                        switch (responseCode) {
                            case '00000':
                                let mProcessName = "approvalTransactionSuccessfully";
                                this.props.navigation.navigate('TransactionResult',
                                    {
                                        data: nextProps.getPaymentWatter.data.fieldMap,
                                        processName: I18n.t('PAYMENT_WATTER_NPP'),
                                        isUnitelService: true,
                                        notify: mProcessName,
                                        processCode: 'NPP'
                                    })
                                this.setState({ PaymentWatterNpp: false, isLoading: false })
                                break;
                            case responseCode:
                                this.refs.responseDescripTion.onOpen()
                                this.setState({ PaymentWatterNpp: false, isLoading: false, messageError: responseDescripTion })
                                break;
                            default:
                                break;
                        }
                        break;
                    case 'PAY_MENT_WATTER_NPP_FAILED':
                        this.refs.responseDescripTion.onOpen()
                        this.setState({ PaymentWatterNpp: false, isLoading: false, messageError: 'PAY_MENT_WATTER_NPP_FAILED' })
                        break;
                    default:
                        break;
                }
            }
        }



        if (this.state.isRequestCashOutWordBank && this.state.isLoading) {
            console.log('nextProps:-actionTypeWordBank---', nextProps.actionTypeWordBank)
            console.log('nextProps.cashOutWordBankinfo:-----', nextProps.cashOutWordBankinfo)
            switch (nextProps.actionTypeWordBank) {
                case 'CASH_OUT_WORD_BANK_SUCCESS':
                    let response = RequestField.getValueField(nextProps.cashOutWordBankinfo.fieldMap, FIELD.RESPONSE_CODE);
                    let description = RequestField.getValueField(nextProps.cashOutWordBankinfo.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                    console.log('---response---', response)
                    console.log('---description---', description)
                    switch (response) {
                        case '00000':
                            this.props.navigation.navigate('TransactionResult', {
                                data: nextProps.cashOutWordBankinfo.fieldMap,
                                processName: I18n.t('cashOut'),
                                nameCustormer: nameCustomer ? nameCustomer : 'Name null',
                                nameAgent: infoAccount.customerName,
                                processCode: 'WordBank'
                            })
                            this.setState({ isLoading: false, isRequestCashOutWordBank: false })
                            break;
                        case 11101:
                            this.refs.responseDescripTion.onOpen()
                            this.setState({ isLoading: false, isRequestCashOutWordBank: false, messageError: I18n.t('11101') })
                            break;
                        case 10151:
                            this.refs.responseDescripTion.onOpen()
                            this.setState({ isLoading: false, isRequestCashOutWordBank: false, messageError: I18n.t('10151') })
                            break;
                        case 10811:
                            this.refs.responseDescripTion.onOpen()
                            this.setState({ isLoading: false, isRequestCashOutWordBank: false, messageError: I18n.t('10811') })
                            break;
                        case 99999:
                            this.refs.responseDescripTion.onOpen()
                            this.setState({ isLoading: false, isRequestCashOutWordBank: false, messageError: I18n.t('99999') })
                            break;
                        case response:
                            this.refs.responseDescripTion.onOpen()
                            this.setState({ isLoading: false, isRequestCashOutWordBank: false, messageError: description })
                            break;
                        default:
                            this.refs.responseDescripTion.onOpen()
                            this.setState({ isLoading: false, isRequestCashOutWordBank: false, messageError: I18n.t('99999') })
                            break;
                    }

                    break;
                case 'CASH_OUT_WORD_BANK_FAILED':
                    this.refs.responseDescripTion.onOpen()
                    this.setState({ isLoading: false, isRequestCashOutWordBank: false, messageError: I18n.t('99999') })
                    break;
                default:
                    break;
            }
        }




    }

    onPressSystemBusy() { this.refs.NotificationSystemBusy.onClose() }
    failedDueNoResponse() { this.refs.failedDueNoResponse.onClose() }
    transactionIsUnsuccessful() { this.refs.transactionIsUnsuccessful.onClose() }
    somethingWentWrong() { this.refs.somethingWentWrong.onClose() }
    Error11101() { this.refs.Error11101.onClose() }
    Error10157() { this.refs.Error10157.onClose() }
    error10155() { this.refs.error10155.onClose() }
    error10157() { this.refs.error10157.onClose() }
    error10130() { this.refs.error10130.onClose() }
    responseDescripTion() { this.refs.responseDescripTion.onClose() }
    responseMessage() { this.refs.responseMessage.onClose() }
    onClick() {
        this.setState({ isChecked: !this.state.isChecked })
    }
    onClearPhone() { this.setState({ codePin: null }) }
    onClearisOTP() { this.setState({ isOTP: null }) }
    onTimer() {
        const x = setInterval(() => {
            let { eventDate } = this.state
            if (eventDate <= 0) {
                clearInterval(x)
            } else {
                eventDate = eventDate.subtract(1, "s")
                const secs = eventDate.seconds()
                if (secs >= 58) {
                    this.setState({ mins: 0, secs, eventDate })

                } else {
                    this.setState({
                        secs,
                        eventDate
                    })
                }
            }
        }, 1000)
    }
    onResentOTP() {
        const { infoAccount } = this.props
        const { codePin } = this.state
        RequestField.clearInitField()
        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)) //3 00003
        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
        RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//2
        RequestField.addToInitField(RequestField.addPin(codePin))//52
        RequestField.addToInitField(RequestField.addServiceCode('RESENT_OTP'))//41
        RequestField.addToInitField(RequestField.addServiceCode('RESENT_OTP'))//42
        RequestField.addToInitField(RequestField.addActionNode('1')) //22
        let dataOTPTPUST = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
        this.setState({ isRequestOTP: true, isLoading: true })
        this.props.requestOTP(dataOTPTPUST)
        RequestField.clearInitField()
    }
    onPressCD = () => {
        // alert('Countdown Component Pressed...');
    }
    onFinishCD = () => {
        this.setState({ run: false })
    }

    render() {
        const { phone, money, message, receiverPhone, toName,
            processName, customerName, phoneCustomer, codePin,
            errorCodePin, isOTP, fromPhone, toPhone, bankCode,
            bankTransId, AmountBank, Content, AccountBankName,
            FeeBank, AccountNo, selectState, fee, paymentCode,
            serviceCodeInternet, name, ident, valueType, mBirthDay,
            male, phoneRegister, year, processCode, selectedDate,
            numberPhone, address,
            msisdn, laoName, englishName, amount, contractNo,
            Amount, keyType, id_Bank, service, partnerCode, newMiniState, totalBuy,
            totalSale, newMiniStateSale, CusBuy, Barcode, luckyPhone, support, onProcess,
            total_amount, date_created, bank_code, action_state_name, to_channel_id,
            channel_name, request_no, role_name, approver, isChecked, messageError, responseMessage,
            phoneAgent, shopCode, selectPartnert, DISCOUNT_APA, VAT_APA, FEE_APA, GRAND_TOTAL_APA,
            InsuredName_APA, Phone_APA, DateBirth_APA, Gender_APA, PaperType_APA, Address_APA,
            FullName_APA, Relation_APA, male_APA, Package_APA, policyNo_APA, PaperNumber_APA,
            mainPhone,
            totalAmont, senderPhone, getFee, getCommition, getDiscount, run, byPassPIN, checkAmount,
            balance, cttID, accountID, note, img, agentCode, Gender, DetailToName, DetailFromName, Name
        } = this.state
        const { infoAccount } = this.props
        // console.log('byPassPIN-----detel:', byPassPIN)

        console.log('checkAmount-----detel:', this.state)
        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                    {this.state.isLoading ? <ActivityIndicator /> : null}
                    <ScrollView>
                        <View style={styles.headerText}>
                            <Text style={styles.titleInfo}>{I18n.t('description')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View style={{ padding: 20, width: '50%' }}>


                                {
                                    service ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('service')}</Text>
                                            <Text style={styles.valueInfo}>{service}</Text>
                                        </View>
                                    ) : null
                                }

                                {processName ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('transactionType')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{processName}</Text>
                                    </View>
                                ) : null}
                                {
                                    serviceCodeInternet ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('supplier')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{serviceCodeInternet}</Text>
                                        </View>
                                    ) : null
                                }
                                {
                                    to_channel_id ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('numberOfPapers')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{to_channel_id}</Text>

                                        </View>
                                    ) : null
                                }
                                {
                                    channel_name ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('Owner')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{channel_name}</Text>

                                        </View>
                                    ) : null
                                }
                                {
                                    contractNo ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('ContractNumber')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{contractNo}</Text>
                                        </View>
                                    ) : null
                                }
                                {
                                    phoneAgent ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('senderPhone')}</Text>
                                            <Text style={styles.valueInfo}>{phoneAgent}</Text>
                                        </View>
                                    ) : null
                                }

                                {
                                    Amount ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('amount')}</Text>
                                            <Text style={styles.valueInfo}>{formatNumber(Amount)} </Text>
                                        </View>
                                    ) : null
                                }
                                {
                                    AccountNo ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('AccountNo')}</Text>
                                            <Text style={styles.valueInfo}>{AccountNo}</Text>
                                        </View>
                                    ) : null
                                }

                                {
                                    processCode !== '002001' && onProcess != 'MONEY_AGENT_TRANSFER_CUSTOMER' ?
                                        (
                                            <View style={styles.groupText}>
                                                <Text style={styles.labelInfo}>{I18n.t('sender')}</Text>
                                                <Text style={styles.valueInfo} numberOfLines={2}>{infoAccount.customerName}</Text>
                                            </View>
                                        ) : null
                                }

                                {
                                    processCode !== '002001' && onProcess != 'MONEY_AGENT_TRANSFER_CUSTOMER' ?
                                        phoneCustomer ? (
                                            <View style={styles.groupText}>
                                                <Text style={styles.labelInfo}>{I18n.t('agentPhone')}</Text>
                                                <Text style={styles.valueInfo} numberOfLines={2}>{phoneCustomer}</Text>
                                            </View>
                                        ) : null
                                        : null
                                }
                                {

                                    senderPhone ?
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('receiverPhoneTransfer')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{senderPhone}</Text>
                                        </View>
                                        : null
                                }

                                {fromPhone ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('senderPhone')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{fromPhone}</Text>
                                    </View>
                                ) : null}

                                {
                                    processCode !== '002001' ?
                                        customerName ? (
                                            <View style={styles.groupText}>
                                                <Text style={styles.labelInfo}>{onProcess == 'TOP_UP_UNITEL' ? I18n.t('FullName') : I18n.t('transferPerson')}</Text>
                                                <Text style={styles.valueInfo} numberOfLines={2}>{customerName}</Text>
                                            </View>
                                        ) : null
                                        : null

                                }
                                {
                                    totalBuy ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('total')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{totalBuy}</Text>
                                        </View>
                                    ) : null
                                }

                                {
                                    totalSale ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('total')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{totalSale}</Text>
                                        </View>
                                    ) : null
                                }
                                {phoneRegister ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('phoneRegister')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{phoneRegister}</Text>
                                    </View>
                                ) : null}






                                {selectedDate ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('dob')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{selectedDate}</Text>
                                    </View>
                                ) : null}
                                {valueType ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('type')}</Text>
                                        {valueType === 'PPID' ? <Text style={styles.valueInfo} numberOfLines={2}>{I18n.t('PPID')}</Text>
                                            : valueType === 'PPRT' ? <Text style={styles.valueInfo} numberOfLines={2}>{I18n.t('PPRT')}</Text>
                                                : valueType === 'OTHE' ? <Text style={styles.valueInfo} numberOfLines={2}>{I18n.t('OTHE')}</Text>
                                                    : valueType === 'BLCT' ? <Text style={styles.valueInfo} numberOfLines={2}>{I18n.t('BLCT')}</Text>
                                                        : valueType === 'DRLC' ? <Text style={styles.valueInfo} numberOfLines={2}>{I18n.t('DRLC')}</Text>
                                                            : valueType === 'FABO' ? <Text style={styles.valueInfo} numberOfLines={2}>{I18n.t('FABO')}</Text> : null}
                                    </View>
                                ) : null}


                                {date_created ?
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('date')}</Text>
                                        <Text style={styles.valueInfo}>{formatToDDMMYYYY(date_created)}</Text>
                                    </View>
                                    : null
                                }

                                {InsuredName_APA ?
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('FullName')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{InsuredName_APA}</Text>
                                    </View>
                                    : null}
                                {PaperType_APA ?
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('PaperType')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{I18n.t(PaperType_APA)}</Text>
                                    </View>
                                    : null}
                                {Package_APA ?
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('PackagesList')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{Package_APA}</Text>
                                    </View>
                                    : null}
                                {
                                    mainPhone ? <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('NameContact')}</Text>
                                        <Text style={styles.valueInfo}>{mainPhone}</Text>
                                    </View> : null
                                }

                                {AmountBank ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('amount')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{AmountBank} ₭</Text>
                                    </View>
                                ) : null}
                                {
                                    getFee == '0' ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('fee')}</Text>
                                            <Text style={styles.valueFree} numberOfLines={2}>{I18n.t('free')}</Text>
                                        </View>
                                    ) : null
                                }
                                {
                                    agentCode ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('agentCode')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{agentCode}</Text>
                                        </View>
                                    ) : null
                                }

                            </View>

                            <View style={{ padding: 20, width: '50%' }}>
                                {
                                    id_Bank ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('supplier')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>
                                                {id_Bank === 'BANK_LVB' ? I18n.t('LaoVietBank')
                                                    : id_Bank === 'BANK_BCEL' ? I18n.t('BCEL_fullName')
                                                        : id_Bank === 'BANK_MARUHAN' ? I18n.t('Maruhan_fullName')
                                                            : id_Bank === 'BANK_LDB' ? I18n.t('LDB_fullName')
                                                                : id_Bank === 'BANK_ACLEDA' ? I18n.t('Acleda_fullName')
                                                                    : id_Bank === 'BANK_SACOM' ? I18n.t('SACOM_fullname')
                                                                        : id_Bank === 'BANK_BIC' ? I18n.t('BIC_fullname')
                                                                            : id_Bank === 'BANK_APB' ? I18n.t('APB_fullname')
                                                                                : id_Bank === 'BANK_JDB' ? I18n.t('JDB_fullName')
                                                                                    : null
                                                }
                                            </Text>
                                        </View>
                                    ) : null
                                }
                                {bank_code ?
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('BankName')}</Text>
                                        <Text style={styles.valueInfo}>{bank_code}</Text>
                                    </View>
                                    : null
                                }
                                {
                                    shopCode ?
                                        (
                                            <View style={styles.groupText}>
                                                <Text style={styles.labelInfo}>{I18n.t('thatEmployee')}</Text>
                                                <Text style={styles.valueInfo}>{shopCode}</Text>
                                            </View>
                                        )
                                        : null
                                }
                                {partnerCode ? <View style={styles.groupText}>
                                    <Text style={styles.labelInfo}>{I18n.t('Type')}</Text>
                                    <Text style={styles.valueInfo}>{partnerCode}</Text>
                                </View>
                                    : null}
                                {
                                    selectPartnert ?
                                        (
                                            <View style={styles.groupText}>
                                                <Text style={styles.labelInfo}>{I18n.t('supplier')}</Text>
                                                <Text style={styles.valueInfo}>{
                                                    selectPartnert === 'SOKXAY' ? I18n.t('sokxayService') : selectPartnert === 'NCC' ? I18n.t('NCCLottery') : selectPartnert === 'NCC340' ? I18n.t('NCCLottery') : null}</Text>
                                            </View>
                                        ) : null
                                }


                                {msisdn ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('receiverPhone')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{msisdn}</Text>
                                    </View>
                                ) : null}
                                {luckyPhone ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('phoneCustomer')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{luckyPhone}</Text>
                                    </View>
                                ) : null}

                                {englishName ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('receiverName')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{englishName}</Text>
                                    </View>
                                ) : null}


                                {newMiniState ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('numberLottery')}</Text>
                                        <Text style={styles.textValue} numberOfLines={6}>{newMiniState}</Text>
                                    </View>
                                ) : null}

                                {newMiniStateSale ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('numberLottery')}</Text>
                                        <Text style={styles.textValue} numberOfLines={6}>{newMiniStateSale}</Text>
                                    </View>
                                ) : null}


                                {laoName ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('receiverName')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{laoName}</Text>
                                    </View>
                                ) : null}

                                {name || processCode == '033100' ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('fullName')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{name}</Text>
                                    </View>
                                ) : null}
                                {address ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('address')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{address}</Text>
                                    </View>
                                ) : null}

                                {male ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('gender')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{male ? 'MALE' : 'FEMALE'}</Text>
                                    </View>
                                ) : null}

                                {ident ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('paper')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{ident}</Text>
                                    </View>
                                ) : null}

                                {
                                    selectState === 'TRANSFER_TO_BANK' ? null : money ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('money')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{formatNumber(money)} ₭</Text>
                                        </View>
                                    ) : null
                                }
                                {
                                    numberPhone ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('receiverPhoneTransfer')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{numberPhone}</Text>
                                        </View>
                                    ) : null
                                }
                                {
                                    //Hup-- form phone
                                    receiverPhone ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('senderPhone')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{receiverPhone}</Text>
                                        </View>
                                    ) : null}

                                {
                                    AccountBankName ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('AccountBankName')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{AccountBankName}</Text>
                                        </View>
                                    ) : null
                                }
                                {bankCode ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('bankCode')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{bankCode}</Text>
                                    </View>
                                ) : null}
                                {bankTransId ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('transId')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{bankTransId}</Text>
                                    </View>
                                ) : null}

                                {toPhone ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('receiverPhone')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{toPhone}</Text>
                                    </View>
                                ) : null}
                                {
                                    processCode !== '600014' ?
                                        toName ? (
                                            <View style={styles.groupText}>

                                                <Text style={styles.labelInfo}>{I18n.t('receiverName')}</Text>
                                                <Text style={styles.valueInfo} numberOfLines={2}>{toName}</Text>
                                            </View>
                                        ) : null
                                        : null
                                }

                                {
                                    onProcess === 'TRANSFER_E2E' ? null :
                                        phone ? (
                                            <View style={styles.groupText}>
                                                <Text style={styles.labelInfo}>{I18n.t('receiverPhone')}</Text>
                                                <Text style={styles.valueInfo} numberOfLines={2}>{phone}</Text>
                                            </View>
                                        ) : null

                                }
                                {Barcode ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('barcode')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{Barcode}</Text>
                                    </View>
                                ) : null}

                                {
                                    Content ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('Content')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{Content}</Text>
                                        </View>
                                    ) : null
                                }


                                {
                                    approver ?
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('Petitioner')}</Text>
                                            <Text style={styles.valueInfo}>{approver}</Text>
                                        </View>
                                        : null
                                }
                                {paymentCode ? (

                                    <View style={styles.groupText}>
                                        {onProcess === 'INTERNET_SERVICES' ?
                                            <Text style={styles.labelInfo}>{I18n.t('accountNumber')}</Text> :
                                            <Text style={styles.labelInfo}>{I18n.t('leaveMessageTitle')}</Text>}
                                        <Text style={styles.valueInfo} numberOfLines={2}>{paymentCode}</Text>
                                    </View>

                                ) : null}
                                {
                                    FullName_APA ?
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('InsuredName')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{FullName_APA}</Text>
                                        </View>
                                        : null

                                }
                                {
                                    Relation_APA ?
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('Relation')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{I18n.t(Relation_APA)}</Text>
                                        </View>
                                        : null
                                }
                                {DateBirth_APA ?
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('dob')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{DateBirth_APA}</Text>
                                    </View>
                                    : null
                                }
                                {Phone_APA ?
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('Phone')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{Phone_APA}</Text>
                                    </View>
                                    : null}
                                {
                                    PaperNumber_APA ?

                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('paper')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{PaperNumber_APA}</Text>
                                        </View>
                                        : null}
                                {GRAND_TOTAL_APA ?
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('ValueTaxIncluded')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{formatNumber(GRAND_TOTAL_APA)} ₭</Text>
                                    </View>
                                    : null}
                                {totalAmont
                                    ?
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('debtInfor')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{totalAmont} ₭</Text>
                                    </View>
                                    : null}
                                {this.generatePaymentField()}
                                {message ? (
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('Content')}</Text>
                                        <Text style={styles.valueInfo} numberOfLines={2}>{message}</Text>
                                    </View>
                                ) : null}

                                {
                                    cttID ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('labelcctID')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{cttID}</Text>
                                        </View>
                                    ) : null
                                }
                                {
                                    accountID ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('account')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{accountID}</Text>
                                        </View>
                                    ) : null
                                }
                                {
                                    Gender ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('Gender')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{Gender}</Text>
                                        </View>
                                    ) : null
                                }

                                {
                                    Name ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('Name')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{Name}</Text>
                                        </View>
                                    ) : null
                                }
                                {
                                    note ? (
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('note')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{note}</Text>
                                        </View>
                                    ) : null
                                }
                                {/* // note, img, agentCode, Gender, DetailToName, DetailFromName, Name */}

                                {/* {FeeBank ?
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('fee')}</Text>
                                        <Text style={styles.valueFee} numberOfLines={2}>{FeeBank} ₭</Text>
                                    </View>
                                    : null} */}
                                {/* {getFee > 0 ?
                                    <View style={styles.groupText}>
                                        <Text style={styles.labelInfo}>{I18n.t('fee')}</Text>
                                        <Text style={styles.valueFee} numberOfLines={2}>{getFee} ₭</Text>
                                    </View>
                                    : null} */}





                            </View>
                        </View>
                        {byPassPIN && checkAmount ? null : (
                            <View style={styles.headerText}>
                                <Text style={styles.titleInfo}>{I18n.t('pleaseInputPinToLogin')}</Text>
                            </View>
                        )}

                        <View style={{ padding: 20 }}>
                            {byPassPIN && checkAmount ? null : (
                                
                                <View style={{ marginBottom: 20 }}>
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
                            )}


                            <View style={{ marginBottom: 10, top: -10 }}>
                                {
                                    selectState == 'APPROVAL_TRANSACTION' ? (
                                        <CheckBox
                                            labelStyle={{ color: Colors.textColor, fontSize: 13 }}
                                            checked={isChecked}
                                            label={I18n.t('rejectRequest')}
                                            onChange={() => this.onClick()}
                                            checkedImage={Images.icCheckedBox}
                                            uncheckedImage={Images.icUncheckedBox}
                                            checkboxStyle={{ opacity: 0.6 }}
                                        />
                                    ) : null
                                }
                            </View>

                            {
                                byPassPIN ? (
                                    <FullNewButton
                                        text={I18n.t('continue')}
                                        onPress={() => this.onPressProcess()}
                                    />
                                ) : (
                                    <FullNewButton
                                        text={I18n.t('continue')}
                                        onPress={() => this.onPressProcess()}
                                        isDisable={(!codePin || errorCodePin) ? true : false}
                                    />
                                )
                            }
                        </View>
                    </ScrollView>
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
                        textContent={I18n.t('transactionIsUnsuccessful')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.transactionIsUnsuccessful()}
                        ref='transactionIsUnsuccessful'
                    />
                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('somethingWentWrong')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.somethingWentWrong()}
                        ref='somethingWentWrong'
                    />

                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('11101')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.Error11101()}
                        ref='Error11101'
                    />

                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('10157')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.Error10157()}
                        ref='Error10157'
                    />
                    {/* error10155 */}
                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('INVALID_PIN')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.error10155()}
                        ref='error10155'
                    />


                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('10157')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.error10157()}
                        ref='error10157'
                    />
                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('10130')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.error10130()}
                        ref='error10130'
                    />
                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={messageError}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.responseDescripTion()}
                        ref='responseDescripTion'
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

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.setModalVisible}
                        onRequestClose={() => {
                            this.setState({ setModalVisible: false })
                        }}
                    >
                        <Pressable onPress={() => this.setState({ setModalVisible: false })} style={{ flex: 1 }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>{I18n.t('EnterOTP')}</Text>
                                    <Text style={{ color: '#989898', textAlign: 'center', marginBottom: 5 }}>{I18n.t('titelOTP')}</Text>
                                    <Text>
                                        {
                                            run ? (
                                                <CountDown
                                                    until={60}
                                                    onFinish={() => this.onFinishCD()}
                                                    onPress={() => this.onPressCD()}
                                                    size={20}
                                                />
                                            ) : '00:00'
                                        }
                                    </Text>
                                    {
                                        !run ? (
                                            <TouchableOpacity onPress={() => this.onResentOTP()}>
                                                <Text style={styles.txtOTP}>{I18n.t('NotReceivedYetResendOTP')}</Text>
                                            </TouchableOpacity>
                                        ) : null
                                    }
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
                        </Pressable>
                    </Modal>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}
TransactionDetail.defaultProps = {
    validatePhoneConst: Constant.VALIDATE_NUMERIC,
    validateMoneyConst: Constant.VALIDATE_MONEY,
}
const mapStateToProps = (state) => {
    return {
        isFetching: state.cashOut.isFetching,
        cashInData: state.cashOut.cashInData,
        cashOutData: state.cashOut.cashOutData,
        agentCashOutData: state.request.agentCashOutData,
        infoAccount: state.auth.infoAccount,
        receiver: state.transfer.receiver,
        agentReqBankMoneyData: state.request.agentReqBankMoneyData,
        agentReqEMoneyData: state.request.agentReqEMoneyData,

        BankReducer: state.BankReducer,
        TransferToBank: state.BankReducer.TransferToBank,
        actionType: state.BankReducer.actionType,

        topUpData: state.topUp.topUpData,
        requestTopUpETL: state.topUp.requestTopUpETL,
        agentRegForUserData: state.request.agentRegForUserData,
        isRegFetching: state.request.isFetching,
        actionType: state.auth.actionType,

        buyLottery: state.LotteryReducer.buyLottery,
        LotteryReducer: state.LotteryReducer,
        actionType: state.LotteryReducer.actionType,
        saleLottery: state.LotteryReducer.saleLottery,
        luckyLottery: state.LotteryReducer,
        isFetching: state.BankReducer.isFetching,


        buyLotteryNCC: state.LotteryReducer.buyLotteryNCC,

        WorldBank: state.WorldBank,
        getDataApproval: state.WorldBank.getDataApproval,


        isFetching: state.transfer.isFetching,
        info: state.transfer.info,
        user: state.auth.user,
        transferOtO: state.transfer.transferOtO,
        requesHistoryTranfer: state.auth.requesHistoryTranfer,

        LeasingReducer: state.LeasingReducer,
        actionType: state.LeasingReducer.actionType,
        requestPayLeasingAeon: state.LeasingReducer.requestPayLeasingAeon,

        Insurance: state.Insurance,
        actionType: state.Insurance.actionType,
        dataPayMentInsurance: state.Insurance.dataPayMentInsurance,

        WatterReducers: state.WatterReducers,
        actionType: state.WatterReducers.actionType,
        getPaymentWatter: state.WatterReducers.getPaymentWatter,

        actionType: state.PayBccsReducers.actionType,
        transferbccs: state.PayBccsReducers.transferbccs,
        dataDiscount: state.PayBccsReducers.dataDiscount,

        cashOutWordBankinfo: state.auth.cashOutWordBankinfo,
        actionTypeWordBank: state.auth.actionType,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        agentCashOut: (data) => { dispatch(agentCashOut(data)) },
        requestCashIn: (data) => { dispatch(requestCashIn(data)) },
        transferOtherToOther: (info) => { dispatch(transferOtherToOther(info)) },
        requestCashOut: (data) => { dispatch(requestCashOut(data)) },
        requestCashInTranfer: (data) => { dispatch(requestCashInTranfer(data)) },
        agentReqBankMoney: (data) => { dispatch(agentReqBankMoney(data)) },
        agentRequestEmoney: (data) => { dispatch(agentRequestEmoney(data)) },
        requestOTP: (data) => { dispatch(requestOTP(data)) },
        requestTranferBank: (data) => { dispatch(requestTranferBank(data)) },
        requestTopUp: (data) => { dispatch(requestTopUp(data)) },
        requestTopup_ETL: (data) => { dispatch(requestTopup_ETL(data)) },
        agentRegForUser: (data) => { dispatch(agentRegForUser(data)) },
        paymentLeasingAeon: (data) => { dispatch(paymentLeasingAeon(data)) },
        requestBuyLottery: (data) => { dispatch(requestBuyLottery(data)) },
        requestBuyLotteryNCC: (data) => { dispatch(requestBuyLotteryNCC(data)) },
        requestSaleLottery: (data) => { dispatch(requestSaleLottery(data)) },
        luckyLottery: (data) => { dispatch(luckyLottery(data)) },
        requestTranferBccs: (data) => { dispatch(requestTranferBccs(data)) },
        requestApproval: (data) => { dispatch(requestApproval(data)) },
        paymentInsurance: (data) => { dispatch(paymentInsurance(data)) },
        PaymentWatterNpp: (data) => { dispatch(PaymentWatterNpp(data)) },
        onCashOutWordBank: (data) => { dispatch(onCashOutWordBank(data)) },
        reqCheckInfoDiscount: (carriedAccountId, fromAccountId, toAccountId, processCode, amount, partnerCode, serviceCode) => { dispatch(reqCheckInfoDiscount(carriedAccountId, fromAccountId, toAccountId, processCode, amount, partnerCode, serviceCode)) },


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);

