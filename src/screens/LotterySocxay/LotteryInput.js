import React, { Component } from 'react';
import {
    View, Text, TouchableWithoutFeedback,
    Keyboard, Image, TouchableOpacity, StatusBar, FlatList,
    SafeAreaView, Modal, ScrollView
} from 'react-native';
import {
    ActivityIndicator, AlertNative,
    LotteryComponent, Notification, DrewHistoryLottery
} from '../../components'
import { Colors, Images } from '../../themes'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { HISTORY_LOTTERY_FALSE } from '../../actions/types';
import styles from './style'
import moment from 'moment'
import { formatNumber } from '../../utils/Formater'
import numeral from 'numeral'
import {
    splitResponseCollinsCharacter,
    splitResponseCharacter,
    splitResponseEqualCharacter,
    splitResponseColonCharacter
} from "../../utils/Validate";
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import * as FIELD from '../../utils/CoreFieldMap'
import {
    requestBuyLottery, requestSaleLottery, searchLotteryHistory,
    luckyLottery, checkBarcode, getHistoryLettory, searchHistoryTtanferLottery,
    ongetNumberWin
} from '../../actions/Lottery'
import _ from "lodash";
import { ListLottery } from '../../images'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'


class LotteryInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDataBuy: null,
            listDataSale: null,
            lotteryId: null,
            Barcode: null,
            numberPhone: null,
            isLoading: false,
            actionHistory: false,
            actionState: null,
            data_history: [
                { no: '', number: '', amount: '', trans_id: '', total: '' }
            ],
            dataDetail: null,
            tabNumber: 0,
            phone: null,
            luckyPhone: null,
            getdataHistoryto: null,
            searchGethistory: false,
            checkNumberWin: false,
            getDrewHistory: null,
            checkHistory: false,
            bar: 'dark-content',
            PhoneCusBuy: null,
            setModalVisibleShow: false,
            setModalVisibleShowList: false,
            fullListNumber: ListLottery,
            messeng: null
        };
    }
    onPressBuyLottery(item) {
        Keyboard.dismiss()
        if (item != null) {
            let miniState = "";
            let totalBuy = 0;
            item.forEach((item) => {
                var strAmount = item.amountBuy.replace(",", "")
                miniState += item.buyLottery + ", "
                totalBuy += parseInt(strAmount)
            });
            if (totalBuy <= 2000) {
                AlertNative(I18n.t('amountMustbefrom', { amount: formatNumber(3000 + "") }))
                return
            }
            let newMiniState = miniState.substring(0, miniState.length - 1)
            this.props.navigation.navigate('TransactionDetail',
                {
                    item, totalBuy,
                    newMiniState,
                    onProcess: 'BUY_LOTTERY',
                    processName: I18n.t('buyLottery'),
                    support: 'BUY_SOKXAY_LOTTERY'
                })

        }

    }
    onPressSaleLottery(item, phone) {
        Keyboard.dismiss()
        if (item != null && phone != null) {
            let miniStateSale = "";
            let totalSale = 0;
            item.forEach((item) => {
                var strAmount = item.amountSale.replace(",", "")
                miniStateSale += item.saleLottery + ", "
                totalSale += parseInt(strAmount)
            });

            if (totalSale <= 2000) {
                AlertNative(I18n.t('amountMustbefrom', { amount: formatNumber(3000 + "") }))
                return
            }
            let newMiniStateSale = miniStateSale.substring(0, miniStateSale.length - 1)
            this.props.navigation.navigate('TransactionDetail', { item, totalSale, newMiniStateSale, onProcess: 'SELL_LOTTERY', PhoneCusBuy: phone, processName: I18n.t('lottery') })
        }

    }
    onSubmit(code) {
        this.setState({ code })
        this.refs.ValidatePinModal.onClose();
        this.refs.ConfirmModal.onOpen(code);
    }

    onCancel() {
        this.setState({ isRequestLottery: false })
    }
    componentDidMount() {
        this.getNumberLotterywinner()
        this.onCheckHistory()
    }
    onCheckHistory() {
        const { infoAccount } = this.props
        if (this.props.route.params != undefined) {
            let tyle = this.props.route.params.data
            let code = tyle.name
            let language = tyle.language
            this.setState({
                code: code,
                language: language
            })
        }
        let phoneNumber = infoAccount.phoneNumber
        let introPhone = "856";
        if (phoneNumber.length > 0) {
            let phone = phoneNumber.substring(1, 11);
            let accountPhone = introPhone + phone;
            let processCode = '036001'
            this.props.getHistoryLettory(accountPhone, processCode)
            this.setState({ isLoading: true, checkHistory: true })
        } else {
            alert('No phone number');
        }

    }
    onClickChange() {
        this.props.navigation.goBack();
    }
    onReloadDrewHistory() {
        this.onCheckHistory()
    }
    onPressHistory = (lotteryId, numberPhone) => {
        Keyboard.dismiss()
        const { infoAccount } = this.props
        this.setState({ isLoading: true })
        RequestField.clearInitField();
        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.LOTTERY_HISTORY))
        RequestField.addToInitField(RequestField.addCustomerPhone(numberPhone))
        RequestField.addToInitField(RequestField.addMerchangeType(lotteryId))
        RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))
        RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
        RequestField.addToInitField(RequestField.addActionNode('1'))
        RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))
        let data = RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
        this.props.searchLotteryHistory(data)
    }
    onPressProcessLuckyLottery = (luckyPhone, Barcode, value) => {
        Keyboard.dismiss()
        const { infoAccount } = this.props
        if (luckyPhone != null && Barcode != null && value != undefined) {
            this.setState({ isLoading: true, luckyPhone: luckyPhone, Barcode: Barcode, value, onCheckBarcode: true })
            RequestField.clearInitField();
            RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.CHECK_BARCODE))//036004
            RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
            RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
            RequestField.addToInitField(RequestField.addActionNode('1'))
            RequestField.addToInitField(RequestField.addTransCode('010004'))
            RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))
            RequestField.addToInitField(RequestField.addSecretSecure(Barcode))
            RequestField.addToInitField(RequestField.addToPhone(luckyPhone))
            RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))
            let checkBarcode = RequestField.addToInitField(RequestField.addAccountIDLottery(infoAccount.accountId))
            this.props.checkBarcode(checkBarcode)
        } else {
            this.refs.errorSelectPartner.onOpen()
            this.setState({ messeng: I18n.t('errorSelectPartner') })
        }


    }
    onSeachHistoryLottery = (selectedDateDOB, selectedDateDOBto) => {
        Keyboard.dismiss()
        const { infoAccount } = this.props
        let phoneNumber = infoAccount.phoneNumber
        let introPhone = "856";
        if (phoneNumber.length > 0) {
            let phone = phoneNumber.substring(1, 11);
            let accountPhone = introPhone + phone;
            if (selectedDateDOB != null && selectedDateDOBto != null && accountPhone != null) {
                let value1 = moment(selectedDateDOB).format('YYYYMMDD');
                let value2 = moment(selectedDateDOBto).add(1, 'day').format('YYYYMMDD');
                if (value1 >= value2) {
                    AlertNative(I18n.t('errorSelectDate'))

                } else {
                    this.props.searchHistoryTtanferLottery(accountPhone, value1, value2);
                    this.setState({ isLoading: true, searchGethistory: true });
                }
            } else {
                AlertNative(I18n.t('selectdate'))
            }
        } else {
            AlertNative('Check your phone 030')
        }

    }
    onSelectedContact(contact) {
        this.refs.LotteryComponent.onSetPhone(contact)
    }
    onSelectedContact1(contact) {
        this.refs.LotteryComponent.onSetPhone1(contact)
    }
    onSelectedContact2(contact) {
        this.refs.LotteryComponent.onSetPhone2(contact)
    }
    onOpenContact() {
        this.refs.ModalContact.onOpen();
        this.onSearchContact('');
    }
    onOpenContact1() {
        this.refs.ModalContact1.onOpen();
        this.onSearchContact1('');
    }
    onOpenContact2() {
        this.refs.ModalContact2.onOpen();
        this.onSearchContact2('');
    }

    getNumberLotterywinner() {
        this.props.ongetNumberWin()
        this.setState({ isLoading: true, checkNumberWin: true })
    }
    onRefreshHistory() {
        this.onCheckHistory()
    }
    onConfirm() {
        const { code, actionState, phone, luckyPhone, Barcode } = this.state;
        const { infoAccount } = this.props
        switch (actionState) {
            case 'BUY':
                let miniState = "";
                let totalBuy = 0;
                this.state.listDataBuy.forEach((item) => {
                    var strAmount = item.amountBuy.replace(",", "")
                    miniState += item.buyLottery + "=" + strAmount + ";"
                    totalBuy += parseInt(strAmount)
                });
                if (totalBuy <= 2000) {
                    AlertNative(I18n.t('amountMustbefrom', { amount: formatNumber(3000 + "") }))
                    return
                }
                let newMiniState = miniState.substring(0, miniState.length - 1)
                this.setState({ isLoading: true })
                RequestField.clearInitField();
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.BUY_LOTTERY))
                RequestField.addToInitField(RequestField.addPhoneLottery(infoAccount.phoneNumber))
                RequestField.addToInitField(RequestField.addToPhone(infoAccount.phoneNumber))
                RequestField.addToInitField(RequestField.addFromPhone(infoAccount.phoneNumber))
                RequestField.addToInitField(RequestField.addAmount(totalBuy))
                RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))
                RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                RequestField.addToInitField(RequestField.addActionNode('1'))
                RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))
                RequestField.addToInitField(RequestField.addPin(code))
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                RequestField.addToInitField(RequestField.addImageName(newMiniState))
                let data = RequestField.addToInitField(RequestField.addAccountIDLottery(infoAccount.accountId))
                this.props.requestBuyLottery(data)
                // console.log('data:', data)
                break;
            case 'SALE':
                let miniStateSale = "";
                let totalSale = 0;
                this.state.listDataSale.forEach((item) => {
                    var strAmount = item.amountSale.replace(",", "")
                    miniStateSale += item.saleLottery + "=" + strAmount + ";"
                    totalSale += parseInt(strAmount)
                });

                if (totalSale <= 2000) {
                    AlertNative(I18n.t('amountMustbefrom', { amount: formatNumber(3000 + "") }))
                    return
                }
                let newMiniStateSale = miniStateSale.substring(0, miniStateSale.length - 1)
                this.setState({ isLoading: true })
                RequestField.clearInitField();
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.BUY_LOTTERY))
                RequestField.addToInitField(RequestField.addPhoneLottery(infoAccount.phoneNumber))
                RequestField.addToInitField(RequestField.addToPhone(phone))
                RequestField.addToInitField(RequestField.addFromPhone(infoAccount.phoneNumber))
                RequestField.addToInitField(RequestField.addAmount(totalSale))
                RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))
                RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
                RequestField.addToInitField(RequestField.addActionNode('1'))
                RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))
                RequestField.addToInitField(RequestField.addPin(code))
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
                RequestField.addToInitField(RequestField.addImageName(newMiniStateSale))
                let dataSale = RequestField.addToInitField(RequestField.addAccountIDLottery(infoAccount.accountId))
                this.props.requestSaleLottery(dataSale)
                break;
            case 'LUCKY':
                this.setState({ isLoading: true })
                // console.log('infoAccount : ', infoAccount)
                RequestField.clearInitField();
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.LUCKY_LOTTERY))//3
                RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                RequestField.addToInitField(RequestField.addActionNode('1'))//22
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))//49
                RequestField.addToInitField(RequestField.addPin(code))//52 PIN
                RequestField.addToInitField(RequestField.addSecretSecure(Barcode))//66
                RequestField.addToInitField(RequestField.addToPhone(luckyPhone))// 106
                RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                RequestField.addToInitField(RequestField.addPan(infoAccount.pan))//113
                let dataLucky = RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78
                this.props.luckyLottery(dataLucky)
                break
            default:
                break;
        }
    }
    componentWillReceiveProps(nextProps) {
        const { luckyPhone, Barcode, value, onCheckBarcode } = this.state
        //  if (this.state.isLoading) {
        // if (nextProps.LotteryReducer.isSuccess === true && nextProps.LotteryReducer) {
        //     this.setState({ isLoading: false })
        //     switch (nextProps.LotteryReducer.actionType) {
        //         case "HISTORY_LOTTERY_SUCCESS":
        //             if (nextProps.LotteryReducer.searchLotteryHistory.data.error === '00000' && nextProps.LotteryReducer.searchLotteryHistory.data.responseCode === '00000') {
        //                 console.log('test:', nextProps.lotteryHistory.searchLotteryHistory.data.responseCode)
        //                 let dataLottery = RequestField.getValueField(nextProps.LotteryReducer.searchLotteryHistory.data.fieldMap, FIELD.CUSTOMER_ADDRESS)
        //                 if (dataLottery != null) {
        //                     const pushShow = [];
        //                     const pushData = [];
        //                     const pushDetail = [];
        //                     const pushDetailData = [];
        //                     let item = splitResponseCharacter(dataLottery);
        //                     let responseLootery = splitResponseCollinsCharacter(item[0])
        //                     for (let i = 0; i < responseLootery.length; i++) {
        //                         let numberLottery = splitResponseEqualCharacter(responseLootery[i]);
        //                         console.log('numberLottery=', numberLottery)
        //                         pushShow.push(numberLottery[0])
        //                         for (let j = 0; j < numberLottery.length; j++) {
        //                             pushDetail.push(numberLottery[j])
        //                         }
        //                     }
        //                     for (let i = 0; i < pushShow.length; i++) {
        //                         let itm = splitResponseColonCharacter(pushShow[i])
        //                         let totalFormat = numeral(itm[5]).format('0,0')
        //                         pushData.push({ no: itm[0], number: itm[1], amount: itm[2] + " " + itm[3], trans_id: itm[4], total: totalFormat + " " + itm[3] })
        //                     }
        //                     for (let i = 0; i < pushDetail.length; i++) {
        //                         let itm = splitResponseColonCharacter(pushDetail[i])
        //                         pushDetailData.push({ no: itm[0], number: itm[1], amount: itm[2] + " " + itm[3], trans_id: itm[4] })
        //                     }
        //                     if (pushData != null) {
        //                         this.setState({ data_history: pushData, dataDetail: pushDetailData, actionHistory: true, tabNumber: 1 })
        //                     }
        //                 }
        //             } else {
        //                 if (nextProps.lotteryHistory.searchLotteryHistory.data.responseCode === 10576) {
        //                     AlertNative(nextProps.lotteryHistory.searchLotteryHistory.data.responseDescription);
        //                 } else if (nextProps.lotteryHistory.searchLotteryHistory.data.responseCode === 10577) {
        //                     AlertNative(nextProps.lotteryHistory.searchLotteryHistory.data.responseDescription);
        //                 } else {
        //                     AlertNative(I18n.t('meassHistory'));
        //                 }
        //             }
        //             break;
        //         case HISTORY_LOTTERY_FALSE:
        //             this.setState({ isLoading: false, tabNumber: 3 })
        //             break;
        //         default:
        //             break;
        //     }
        // }
        // if (nextProps.LotteryReducer.isSuccess === true && nextProps.LotteryReducer) {
        //     this.setState({ isLoading: false })
        //     switch (nextProps.LotteryReducer.actionType) {
        //         case "BUY_LOTTERY_SUCCESS":
        //             if (nextProps.LotteryReducer.buyLottery.data.error === '00000' && nextProps.LotteryReducer.buyLottery.data.responseCode === '00000') {
        //                 let responseCode = RequestField.getValueField(nextProps.LotteryReducer.buyLottery.data.fieldMap, FIELD.RESPONSE_CODE)
        //                 if (responseCode === '00000') {
        //                     this.props.navigation.navigate('LotteryResult', { data: nextProps.LotteryReducer.buyLottery.data.fieldMap })
        //                 }
        //             } else {
        //                 AlertNative(I18n.t('transactionIsUnsuccessful'));
        //             }
        //             break;
        //         case "BUY_LOTTERY_FALSE":
        //             AlertNative(I18n.t('99999'));
        //             this.setState({ isLoading: false, tabNumber: 0 })
        //             break;
        //         default:
        //             break;
        //     }
        // }
        // if (nextProps.LotteryReducer.isSuccess === true && nextProps.LotteryReducer) {
        //     this.setState({ isLoading: false })
        //     switch (nextProps.LotteryReducer.actionType) {
        //         case "SALE_LOTTERY_SUCCESS":
        //             if (nextProps.LotteryReducer.saleLottery.data.error === '00000' && nextProps.LotteryReducer.saleLottery.data.responseCode === '00000') {
        //                 let responseCode = RequestField.getValueField(nextProps.LotteryReducer.saleLottery.data.fieldMap, FIELD.RESPONSE_CODE)
        //                 if (responseCode === '00000') {
        //                     this.props.navigation.navigate('LotteryResult', { data: nextProps.LotteryReducer.saleLottery.data.fieldMap })
        //                 }

        //             } else {
        //                 AlertNative(I18n.t('transactionIsUnsuccessful'));
        //             }
        //             break;
        //         case "SALE_LOTTERY_FALSE":
        //             AlertNative(I18n.t('99999'));
        //             this.setState({ isLoading: false, tabNumber: 1 })
        //             break;
        //         default:
        //             break;
        //     }
        // }
        //check barcode
        if (this.state.isLoading && onCheckBarcode) {
            console.log('Check barcode')
            if (nextProps.LotteryReducer.isSuccess === true && nextProps.LotteryReducer) {
                this.setState({ isLoading: false })

                switch (nextProps.LotteryReducer.actionType) {
                    case "CHECK_BARCODE_SUCCESS":

                        if (nextProps.LotteryReducer.checkBarcode.data.error === '00000') {
                            let responseCheckCode = RequestField.getValueField(nextProps.LotteryReducer.checkBarcode.data.fieldMap, FIELD.RESPONSE_CODE);
                            let messenError = RequestField.getValueField(nextProps.LotteryReducer.checkBarcode.data.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                            console.log('1')
                            switch (responseCheckCode) {
                                case '00000':
                                    console.log('2')
                                    this.setState({ luckyPhone, Barcode, actionState: 'LUCKY', value, isLoading: false })
                                    this.props.navigation.navigate('TransactionDetail',
                                        {
                                            luckyPhone,
                                            Barcode,
                                            onProcess: 'CHECK_BACODE_LUCKY',
                                            processName: I18n.t('LuckyLottery'),
                                            selectPartnert: value,
                                            selectState: 'PAYMENT_BACODE_LUCKY',

                                        })

                                    break;
                                case'10131':
                                this.refs.errorSelectPartner.onOpen()
                                this.setState({ messeng: I18n.t('10131'), isLoading: false })
                                break;
                                case responseCheckCode:
                                    this.refs.errorSelectPartner.onOpen()
                                    this.setState({ messeng: messenError, isLoading: false })
                                    break;

                                default:
                                    break;
                            }
                        }
                        break;
                    case "CHECK_BARCODE_FALSE":
                        this.setState({ isLoading: false, tabNumber: 2 })
                        break;
                    default:
                        break;
                }
            }
        }
        //check lucky
        // if (nextProps.LotteryReducer.isSuccess === true && nextProps.LotteryReducer) {
        //     this.setState({ isLoading: false, Barcode })
        //     switch (nextProps.LotteryReducer.actionType) {
        //         case "LUCKY_LOTTERY_SUCCESS":
        //             if (nextProps.LotteryReducer.luckyLottery.data.error === '00000') {
        //                 let responseLucky = RequestField.getValueField(nextProps.LotteryReducer.luckyLottery.data.fieldMap, FIELD.RESPONSE_CODE)
        //                 console.log('Check data: ', nextProps.LotteryReducer.luckyLottery.data.fieldMap)
        //                 switch (responseLucky) {
        //                     case '00000':
        //                         // console.log('Barcode', Barcode);
        //                         this.props.navigation.navigate('TransactionResult', { data: nextProps.LotteryReducer.luckyLottery.data.fieldMap, processName: I18n.t('Payreward'), baCode: Barcode, sceen: 'LUCKY' })
        //                         break;
        //                     case 10585:
        //                         AlertNative(I18n.t('10585'));
        //                         break;
        //                     case 10571:
        //                         AlertNative(I18n.t('10571'));
        //                         break;
        //                     case 10572:
        //                         AlertNative(I18n.t('10572'));
        //                         break;
        //                     case 10573:
        //                         AlertNative(I18n.t('10573'));
        //                         break;
        //                     case 10574:
        //                         AlertNative(I18n.t('10574'));
        //                         break;
        //                     case 10565:
        //                         AlertNative(I18n.t('10565'));
        //                         break;
        //                     case 10566:
        //                         AlertNative(I18n.t('10566'));
        //                         break;
        //                     case 10568:
        //                         AlertNative(I18n.t('10568'));
        //                         break;
        //                     case 10584:
        //                         AlertNative(I18n.t('10584'));
        //                         break;
        //                     case 10567:
        //                         AlertNative(I18n.t('10567'));
        //                         break;
        //                     case 10582:
        //                         AlertNative(I18n.t('10582'));
        //                         break;
        //                     case 10569:
        //                         AlertNative(I18n.t('10569'));
        //                         break;
        //                     case 10175:
        //                         AlertNative(I18n.t('10175'));
        //                         break;
        //                     default:
        //                         break;
        //                 }
        //             }
        //             break;
        //         case "LUCKY_LOTTERY_FALSE":
        //             this.setState({ isLoading: false, tabNumber: 2 })
        //             break;
        //         default:
        //             break;
        //     }
        // }
        if (this.state.checkHistory && this.state.isLoading) {
            switch (nextProps.actionType) {
                case 'CHECK_HISTORY_LOTTERY_SUCCESS':
                    if (nextProps.valueHistoryLettory.historyCollections.histories.length > 0) {
                        let getdataHistory = nextProps.valueHistoryLettory.historyCollections.histories
                        this.setState({ isLoading: false, getdataHistoryto: getdataHistory })
                    } else {
                        AlertNative(I18n.t('10119'))
                    }
                    break;
                case 'CHECK_HISTORY_LOTTERY_FAILED':
                    AlertNative(I18n.t('somethingWentWrong'))
                    this.setState({ isLoading: false })
                    break;
                default:
                    this.setState({ isLoading: true })
                    break;
            }
        }

        if (this.state.searchGethistory && this.state.isLoading) {
            switch (nextProps.actionType) {
                case 'SEACRC_HISTORY_LOTTERY_TRANFER_SUCCESS':
                    if (nextProps.valueHistoryLettoryTranfer.historyCollections.histories.length > 0) {
                        let getdataHistoryTranfer = nextProps.valueHistoryLettoryTranfer.historyCollections.histories
                        this.setState({ isLoading: false, getdataHistoryto: getdataHistoryTranfer })
                    } else {
                        AlertNative(I18n.t('10119'))
                    }
                    break;
                case 'SEACRC_HISTORY_LOTTERY_TRANFER_FAILED':
                    this.refs.error10119.onOpen()
                    this.setState({ isLoading: false, getdataHistoryto: null })
                    break;
                default:
                    this.setState({ isLoading: false })
                    break;
            }

        }

        if (this.state.checkNumberWin && this.state.isLoading) {
            switch (nextProps.actionType) {
                case 'GET_NUMBER_WIN_SUCCESS':
                    let valueNumberWin = nextProps.valueNumberWin.historyCollections.histories
                    this.setState({ isLoading: false, getDrewHistory: valueNumberWin }) //valueNumberWin
                    break;
                case 'GET_NUMBER_WIN_FAILED':
                    this.setState({ isLoading: false, checkNumberWin: false })
                    break;
                default:
                    this.setState({ isLoading: false, checkNumberWin: false })
                    break;
            }
        }
        // }
    }
    onTimkiem() {

    }
    onSelect() {
        this.setState({ setModalVisibleShow: false })
    }
    error10119() {
        const { infoAccount } = this.props
        if (this.props.route.params != undefined) {
            let tyle = this.props.route.params.data
            let code = tyle.name
            let language = tyle.language
            this.setState({
                code: code,
                language: language
            })
        }

        let phoneNumber = infoAccount.phoneNumber
        let introPhone = "856";
        if (phoneNumber.length > 0) {
            let phone = phoneNumber.substring(1, 11);
            let accountPhone = introPhone + phone;

            this.props.getHistoryLettory(accountPhone)
            this.setState({ isLoading: true, checkHistory: true })
        } else {
            alert('No phone number');
        }
        this.refs.error10119.onClose()
    }
    ShowResult = () => {
        this.setState({ setModalVisibleShow: true })
    }
    onTwitter = () => {
        this.setState({ setModalVisibleShowList: true })
    }


    renderItemListNumber = (item) => {
        return (
            <View style={styles.item}>
                <Image source={item.image_path} style={styles.img_Style} />
            </View>
        )
    }
    onCloesShow = () => {
        this.setState({ setModalVisibleShow: false, setModalVisibleShowList: false })
    }
    errorSelectPartner() {
        this.refs.errorSelectPartner.onClose()
    }
    render() {
        const { code, isLoading, data_history, language, dataDetail, actionHistory,
            getdataHistoryto, getDrewHistory, messeng } = this.state

        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <SafeAreaView style={styles.box}>
                    <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
                    {isLoading ? <ActivityIndicator /> : null}
                    <View style={styles.header}>
                        <View style={styles.iconText}>
                            <View style={styles.image}>
                                <Image source={code == 'BUYLOTTERY' ? Images.ic_buyLottery
                                    : code == 'SALELOTTERY' ? Images.ic_saleLottery
                                        : code == 'PAYREWARD' ? Images.ic_checkLottery
                                            : code == 'CHECKHISTORY' ? Images.ic_checkLottery : null} style={styles.image} />

                            </View>
                            <View style={{ padding: 10 }}>
                                <Text>{I18n.t(language)}</Text>
                            </View>
                        </View>
                        <View style={styles.TextChange}>
                            <TouchableOpacity onPress={() => this.ShowResult()}>
                                <FontAwesome name="list-ol" size={22} color={Colors.txtColor} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onTwitter()}>
                                <FontAwesome name="twitter" size={22} color={Colors.txtColor} style={{ marginLeft: 10 }} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <LotteryComponent
                        getdataTyle={code}
                        ref='LotteryComponent'
                        minAmount={1000}
                        maxAmount={500000}
                        onPressBuyLottery={item => this.onPressBuyLottery(item)}
                        onPressSaleLottery={(item, phone) => this.onPressSaleLottery(item, phone)}
                        onPressProcessLuckyLottery={(luckyPhone, Barcode, value) => this.onPressProcessLuckyLottery(luckyPhone, Barcode, value)}
                        onPressHistory={(lotteryId, numberPhone) => this.onPressHistory(lotteryId, numberPhone)}
                        onSeachHistoryLottery={(selectedDateDOB, selectedDateDOBto) => this.onSeachHistoryLottery(selectedDateDOB, selectedDateDOBto)}
                        dataHistory={data_history}
                        isDataHistory={actionHistory}
                        historyDetail={dataDetail}
                        isGetdataHistory={getdataHistoryto}
                        isGetdataNumberwin={getDrewHistory}
                        onRefreshHistory={() => this.onRefreshHistory()}
                        getNumberLotterywinner={() => this.getNumberLotterywinner()}
                        onPressContact={() => this.onOpenContact()}
                        onPressContact1={() => this.onOpenContact1()}
                        onPressContact2={() => this.onOpenContact2()}


                    />

                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('10119')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.error10119()}
                        ref='error10119'
                    />

                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={messeng}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.errorSelectPartner()}
                        ref='errorSelectPartner'
                    />

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.setModalVisibleShow}
                        onRequestClose={() => {
                            this.setState({ setModalVisibleShow: false })
                        }}
                    >
                        <View style={styles.centeredView}>
                            <SafeAreaView>
                                <View style={{ width: '100%', height: '100%' }}>
                                    <View style={{
                                        width: '100%', height: 60, backgroundColor: Colors.white,
                                        flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20,

                                    }}>
                                        <View style={{ width: '20%', justifyContent: 'center' }}>
                                            <TouchableOpacity onPress={() => this.onSelect()}>
                                                <Text> <Ionicons name='arrow-back' size={24} /> </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ width: '60%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', textTransform: "uppercase", }}>{I18n.t('HistoryLottery')}</Text>
                                        </View>
                                        <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                        </View>
                                    </View>
                                    <DrewHistoryLottery getDrewHistory={getDrewHistory} onReloadDrewHistory={() => this.onReloadDrewHistory()} />
                                    <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%', marginTop: Platform.OS === 'android' ? -70 : 0 }}>
                                        <TouchableOpacity onPress={() => this.onSelect()} style={{ width: '100%', height: 50, backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold', textTransform: "uppercase", }}>{I18n.t('success')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </SafeAreaView>
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.setModalVisibleShowList}
                        onRequestClose={() => {
                            this.setState({ setModalVisibleShowList: false })
                        }}
                    >
                        <View style={styles.centeredView}>
                            <SafeAreaView>
                                <View style={styles.modalView}>
                                    <ScrollView style={{ width: '100%', marginBottom: 40 }}>
                                        <FlatList
                                            data={this.state.fullListNumber}
                                            renderItem={({ item, index }) => this.renderItemListNumber(item, index)}
                                            keyExtractor={(item) => {
                                                return item.id;
                                            }}
                                            extraData={this.state}
                                            numColumns={4}
                                        />
                                    </ScrollView>
                                    <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
                                        <TouchableOpacity onPress={() => this.onCloesShow()} style={{ width: '100%', height: 50, backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: Colors.white }}>{I18n.t('ok')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </SafeAreaView>
                        </View>
                    </Modal>



                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isFetching: state.LotteryReducer.isFetching,
        buyLottery: state.LotteryReducer.buyLottery,
        saleLottery: state.LotteryReducer.saleLottery,
        luckyLottery: state.LotteryReducer,
        lotteryHistory: state.LotteryReducer,
        infoAccount: state.auth.infoAccount,
        LotteryReducer: state.LotteryReducer,
        actionType: state.LotteryReducer.actionType,
        checkBarcode: state.LotteryReducer.checkBarcode,
        valueHistoryLettory: state.LotteryReducer.valueHistoryLettory,
        valueNumberWin: state.LotteryReducer.valueNumberWin,
        valueHistoryLettoryTranfer: state.LotteryReducer.valueHistoryLettoryTranfer,


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        searchLotteryHistory: (data) => { dispatch(searchLotteryHistory(data)) },
        requestBuyLottery: (data) => { dispatch(requestBuyLottery(data)) },
        requestSaleLottery: (data) => { dispatch(requestSaleLottery(data)) },
        luckyLottery: (data) => { dispatch(luckyLottery(data)) },
        checkBarcode: (data) => { dispatch(checkBarcode(data)) },
        ongetNumberWin: () => { dispatch(ongetNumberWin()) },
        getHistoryLettory: (accountPhone, processCode) => { dispatch(getHistoryLettory(accountPhone, processCode)) },
        searchHistoryTtanferLottery: (accountPhone, value1, value2) => { dispatch(searchHistoryTtanferLottery(accountPhone, value1, value2)) },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LotteryInput)

