import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Alert, Image, Modal, ScrollView, Touchable } from 'react-native'
import { FullButton, AlertNative, CardView } from '../index'
import styles from './style'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Metrics, Colors, Images } from '../../themes'
import * as ValidationUtils from '../../utils/Validate'
import { isValidated, TRIM_SPACE } from '../../utils/Validate'
import { ActivityIndicator, SmallButton, FullTextInput, SetModalComponent } from '../../components'
import * as Constant from '../../utils/Constant'
import { formatNumber } from '../../utils/Formater'
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import I18n from 'react-native-i18n'
import CalendarPicker from 'react-native-calendar-picker';
import * as Animatable from 'react-native-animatable';
var today = new Date();
const ListWiner = [
    { id: '1', value: 'SOKXAY', name: 'lottery' },
    { id: '2', value: 'NCC', name: '2or3Number' },
    { id: '3', value: 'NCC340', name: 'Animal' },
]
class LotteryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: null,
            errorPhone: null,
            isDataBuy: false,
            isDataSale: false,
            itemsCount: 12,
            idBill: 0,
            lottery: 0,
            amountBuy: null,
            amountSale: null,
            listDataBuy: [],
            listDataSale: [],
            totalLottery: 0,
            start_id: 0,
            firstAmount: 0,
            btnState: true,
            isGetAccountInfo: false,
            infoAcc: null,
            lotteryId: null,
            numberPhone: null,
            luckyPhone: null,
            historyDetail: null,
            isDataHistory: null,
            isGetdataHistory: null,
            setModalVisible: false,

            buyLottery: null,
            saleLottery: null,
            Barcode: null,
            iconContac: false,
            setModelDate: false,
            selectedStartDate: null,
            selectedEndDate: null,
            refresh: false,
            setModalVisibleListWinner: false,
            Ititem: null
        };
        this.openCalendar = this.openCalendar.bind(this);
        this.onDateChange = this.onDateChange.bind(this);

    }
    onDateChange(date, type) {
        if (type === 'END_DATE') {
            this.setState({
                selectedEndDate: date,
            });
        } else {
            this.setState({
                selectedStartDate: date,
                selectedEndDate: null,
            });
        }
    }

    onSetPhone(phone) {
        const errorPhone = !phone || phone.length < 1 || !isValidated(phone, this.props.validatePhoneConst) ? I18n.t(`${this.props.errorPhoneMessage}`) : ''
        this.setState({ phone, errorPhone })
    }
    onSetPhone1(luckyPhone) {
        const errorNumberPhone = !luckyPhone || luckyPhone.length < 1 || !isValidated(luckyPhone, this.props.validatePhoneConst) ? I18n.t(`${this.props.errorPhoneMessage}`) : ''
        this.setState({ luckyPhone, errorNumberPhone })
    }

    onSetPhone2(numberPhone) {
        const errorNumberPhone = !numberPhone || numberPhone.length < 1 || !isValidated(numberPhone, this.props.validatePhoneConst) ? I18n.t(`${this.props.errorPhoneMessage}`) : ''
        this.setState({ numberPhone, errorNumberPhone })
    }
    searchTranfer() {
        const { selectedDateDOB, selectedDateDOBto } = this.state

    }


    componentWillMount() {
        const { defaultPhone } = this.props;
        if (defaultPhone) {
            this.setState({ phone: defaultPhone });
        }
    }
    onChangeNumberValue(text) {
        const { phone } = this.state
        text = text.replace(TRIM_SPACE, '');
        let errorPhone = !text || text.length < 1 ||
            !isValidated(text, this.props.validatePhoneConst) ? I18n.t(`${this.props.errorPhoneMessage}`) : ''
        this.setState({ phone: text, errorPhone })
    }
    onChangBuyLottery(data) {
        const errorBuyLottery = !data || data.length < 2 || !isValidated(data, this.props.validateTransaction) ? I18n.t('errorEnterLottery') : null
        this.setState({ buyLottery: data, errorBuyLottery })
    }

    onChangSaleLottery(data) {
        const errorSaleLottery = !data || data.length < 2 || !isValidated(data, this.props.validateTransaction) ? I18n.t('errorEnterLottery') : null
        this.setState({ saleLottery: data, errorSaleLottery })
    }

    onChangeAmountBuy = (text) => {
        const { minAmount, maxAmount } = this.props;
        let errorAmountBuy = !isValidated(text, this.props.validateMoneyConst) ? I18n.t('enterMoney') : null;
        text = text.replace(ValidationUtils.REMOVE_FIRST_ZERO, '');
        text === '0' ? (text = '') : text;
        let tempText = text;

        let mMoney = parseInt(tempText.replace(/,/g, ''));

        if (minAmount) {
            let checkAmount = parseInt(mMoney) % 1000
            // console.log(checkAmount)
            if (checkAmount != 0) {
                errorAmountBuy = I18n.t('formatAmount')
            }
            if (mMoney < minAmount) {
                errorAmountBuy = I18n.t('amountMustbefrom', { amount: formatNumber(minAmount + "") });
            }
            if (mMoney > maxAmount) {
                errorAmountBuy = I18n.t('amountMax', { amount: formatNumber(maxAmount + "") });
            }
        }
        this.setState({ amountBuy: formatNumber(text.trim()), errorAmountBuy, selectedMoney: null })
    }

    onChangeAmountSale = (text) => {
        const { minAmount, maxAmount } = this.props;
        let errorAmountSale = !isValidated(text, this.props.validateMoneyConst) ? I18n.t('enterMoney') : null;
        text = text.replace(ValidationUtils.REMOVE_FIRST_ZERO, '');
        text === '0' ? (text = '') : text;
        let tempText = text;

        let mMoney = parseInt(tempText.replace(/,/g, ''));

        if (minAmount) {
            let checkAmount = parseInt(mMoney) % 1000
            // console.log(checkAmount)
            if (checkAmount != 0) {
                errorAmountSale = I18n.t('formatAmount')
            }
            if (mMoney < minAmount) {
                errorAmountSale = I18n.t('amountMustbefrom', { amount: formatNumber(minAmount + "") });
            }
            if (mMoney > maxAmount) {
                errorAmountSale = I18n.t('amountMax', { amount: formatNumber(maxAmount + "") });
            }
        }
        this.setState({ amountSale: formatNumber(text.trim()), errorAmountSale, selectedMoney: null })
    }
    _renderHeaderSale() {
        return (
            <TouchableOpacity style={styles.containerItem}>
                <Text style={styles.txtItem}>{I18n.t('colNum')}</Text>
                <Text style={styles.txtItem}>{I18n.t('numberLottery')}</Text>
                <Text style={styles.txtItem}>{I18n.t('amount')}</Text>
                <Text style={styles.txtItem}>{I18n.t('edit')}</Text>
            </TouchableOpacity>
        )
    }
    _renderFooterSale = () => {
        let totalAmount = 0;
        let totalFooter = 0;
        this.state.listDataSale.forEach((item) => {
            var strAmount = item.amountSale
            var newAmount = strAmount.replace(",", "");
            totalAmount += parseInt(newAmount)
        });
        totalFooter = totalAmount > 0 ? totalAmount : 0
        return (
            <TouchableOpacity style={styles.containerItem}>
                <Text style={styles.txtItem}>{I18n.t('total')}</Text>
                <Text style={styles.txtItem}></Text>

                <Text style={styles.txtItem}>{(this.state.listDataSale.length != '') ? formatNumber(totalAmount + '') : 0}</Text>
                <Text style={styles.txtItem}></Text>
            </TouchableOpacity>
        )
    }
    _renderItemSale(item, id) {
        return (
            <Animatable.View
                animation="fadeInUpBig"
                iterationCount={1}
                direction="alternate"
            >
                <View style={styles.containerItem}>
                    <Text style={styles.txtItem}>{item.SaleLottery_id}</Text>
                    <Text style={styles.txtItem}>{item.saleLottery}</Text>
                    <Text style={styles.txtItem}>{item.amountSale}</Text>
                    <TouchableOpacity onPress={() => this.onPressDeleteSale(item.SaleLottery_id)} style={styles.txtItem}>
                        <Ionicons size={30} name='ios-trash-outline' color={Colors.textColor} />
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        )
    }

    _renderHeaderBuy() {
        return (
            <TouchableOpacity style={styles.containerItem}>
                <Text style={styles.txtItem}>{I18n.t('colNum')}</Text>
                <Text style={styles.txtItem}>{I18n.t('numberLottery')}</Text>
                <Text style={styles.txtItem}>{I18n.t('amount')}</Text>
                <Text style={styles.txtItem}>{I18n.t('edit')}</Text>
            </TouchableOpacity>
        )
    }
    _renderFooterBuy = () => {
        let totalAmount = 0;
        let totalFooter = 0;
        this.state.listDataBuy.forEach((item) => {
            var strAmount = item.amountBuy
            var newAmount = strAmount.replace(",", "");
            totalAmount += parseInt(newAmount)
        });
        totalFooter = totalAmount > 0 ? totalAmount : 0
        return (
            <TouchableOpacity style={styles.containerItem}>
                <Text style={styles.txtItem}>{I18n.t('total')}</Text>
                <Text style={styles.txtItem}></Text>
                <Text style={styles.txtItem}>{(this.state.listDataBuy.length != '') ? formatNumber(totalAmount + '') : 0}</Text>
                <Text style={styles.txtItem}></Text>
            </TouchableOpacity>
        )
    }

    _renderItemBuy(item, id) {
        return (
            <Animatable.View
                animation="fadeInUpBig"
                iterationCount={1}
                direction="alternate"
            >
                <View style={styles.containerItem}>
                    <Text style={styles.txtItem}>{item.BuyLottery_id}</Text>
                    <Text style={styles.txtItem}>{item.buyLottery}</Text>
                    <Text style={styles.txtItem}>{item.amountBuy}</Text>
                    <TouchableOpacity onPress={() => this.onPressDeleteBuy(item.BuyLottery_id)} style={styles.txtItem}>
                        <Ionicons size={25} name='ios-trash-outline' color={Colors.textColor} />
                    </TouchableOpacity>

                </View>
            </Animatable.View>
        )
    }

    onPressProcessSale = () => {
        const { minAmount, maxAmount } = this.props;
        let arrayItem = [...this.state.listDataSale, {
            'SaleLottery_id': this.state.listDataSale.length + 1,
            'saleLottery': this.state.saleLottery,
            'amountSale': this.state.amountSale
        }]
        if (arrayItem.length == 1) {
            this.setState({
                listDataSale: [...this.state.listDataSale, {
                    'SaleLottery_id': this.state.listDataSale.length + 1,
                    'saleLottery': this.state.saleLottery,
                    'amountSale': this.state.amountSale
                }]
            })
        } else {
            let newData = this.state.listDataSale.map(value => {
                if (value.saleLottery === this.state.saleLottery) {
                    var strOldAmount = value.amountSale.replace(",", "")
                    var strNewAmount = this.state.amountSale.replace(",", "")
                    let sumTotal = parseInt(strOldAmount) + parseInt(strNewAmount)
                    let lastAmount = sumTotal <= maxAmount ? sumTotal : maxAmount
                    value.amountSale = formatNumber(lastAmount + '')
                    return value;
                }
                return value;
            });
            let itm = this.state.listDataSale.filter(item => item.saleLottery === this.state.saleLottery)
            if (itm.length > 0) {
                this.setState({ listDataSale: newData })
            } else {
                this.setState({
                    listDataSale: [...this.state.listDataSale, {
                        'SaleLottery_id': this.state.listDataSale.length + 1,
                        'saleLottery': this.state.saleLottery,
                        'amountSale': this.state.amountSale
                    }]
                })
            }
        }
        if (this.state.listDataSale.length >= 0) {
            this.setState({ isDataSale: true })
        }
    }

    onPressProcessBuy = () => {
        const { minAmount, maxAmount } = this.props;
        let arrayItem = [...this.state.listDataBuy, {
            'BuyLottery_id': this.state.listDataBuy.length + 1,
            'buyLottery': this.state.buyLottery,
            'amountBuy': this.state.amountBuy
        }]
        if (arrayItem.length == 1) {
            this.setState({
                listDataBuy: [...this.state.listDataBuy, {
                    'BuyLottery_id': this.state.listDataBuy.length + 1,
                    'buyLottery': this.state.buyLottery,
                    'amountBuy': this.state.amountBuy
                }]
            })
        } else {
            let newData = this.state.listDataBuy.map(value => {
                if (value.buyLottery === this.state.buyLottery) {
                    var strOldAmount = value.amountBuy.replace(",", "")
                    var strNewAmount = this.state.amountBuy.replace(",", "")
                    let sumTotal = parseInt(strOldAmount) + parseInt(strNewAmount)
                    let lastAmount = sumTotal <= maxAmount ? sumTotal : maxAmount
                    value.amountBuy = formatNumber(lastAmount + '')
                    return value;
                }
                return value;
            });
            let itm = this.state.listDataBuy.filter(item => item.buyLottery === this.state.buyLottery)
            if (itm.length > 0) {
                this.setState({ listDataBuy: newData })
            } else {
                this.setState({
                    listDataBuy: [...this.state.listDataBuy, {
                        'BuyLottery_id': this.state.listDataBuy.length + 1,
                        'buyLottery': this.state.buyLottery,
                        'amountBuy': this.state.amountBuy
                    }]
                })
            }
        }
        if (this.state.listDataBuy.length >= 0) {
            this.setState({ isDataBuy: true })
        }
    }

    onPressDeleteSale = (SaleLottery_id) => {
        Alert.alert(
            I18n.t("info"),
            I18n.t("deleteLottery"),
            [
                {
                    text: I18n.t('cancel'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: I18n.t('confirm'), onPress: () => this.handleDeleteSale(SaleLottery_id)
                },
            ],
            { cancelable: false },
        );
        // console.log("cuont row: ", this.state.listDataSale.length);
    }
    handleDeleteSale(SaleLottery_id) {
        const item = this.state.listDataSale.filter(item => item.SaleLottery_id !== SaleLottery_id)
        let lotteryArray = [];
        if (item != null) {
            let i = 0;
            item.forEach((value) => {
                i++
                lotteryArray.push({
                    'SaleLottery_id': i,
                    'saleLottery': value.saleLottery,
                    'amountSale': value.amountSale
                })
            })
            this.setState({
                listDataSale: lotteryArray
            })
        }
    }


    onConfirmEditSale(SaleLottery_id, amountSale, saleLottery) {
        let newData = this.state.listDataSale.map(value => {
            if (value.saleLottery === saleLottery) {
                value.amountSale = formatNumber(amountSale + '')
                return value;
            }
            return value;
        });
        this.setState({ listDataSale: newData })
    }
    onCancelEditSale() {

    }


    onPressDeleteBuy = (BuyLottery_id) => {
        Alert.alert(
            I18n.t("info"),
            I18n.t("deleteLottery"),
            [
                {
                    text: I18n.t('cancel'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: I18n.t('confirm'), onPress: () => this.handleDeleteBuy(BuyLottery_id)
                },
            ],
            { cancelable: false },
        );
        // console.log("cuont row: ", this.state.listDataBuy.length);
    }

    handleDeleteBuy(BuyLottery_id) {
        const item = this.state.listDataBuy.filter(item => item.BuyLottery_id !== BuyLottery_id)
        let lotteryArray = [];
        if (item != null) {
            let i = 0;
            item.forEach((value) => {
                i++
                lotteryArray.push({
                    'BuyLottery_id': i,
                    'buyLottery': value.buyLottery,
                    'amountBuy': value.amountBuy
                })
            })
            this.setState({
                listDataBuy: lotteryArray
            })
        }
    }

    onConfirmEditBuy(BuyLottery_id, amountBuy, buyLottery) {
        let newData = this.state.listDataBuy.map(value => {
            if (value.buyLottery === buyLottery) {
                value.amountBuy = formatNumber(amountBuy + '')
                return value;
            }
            return value;
        });
        this.setState({ listDataBuy: newData })
    }
    onCancelEditBuy() {

    }
    onChangeLotteryId(text) {

        const errorLotteryId = !text || text.length < 1 || !isValidated(text, this.props.validateTransaction) ? I18n.t('errorLotteryId') : null
        this.setState({ lotteryId: text, errorLotteryId })
    }
    onPressHistory = () => {
        const { lotteryId, numberPhone } = this.state
        this.props.onPressHistory(lotteryId, numberPhone)
    }

    onChangNumberPhone(text) {
        text = text.replace(TRIM_SPACE, '');
        let errorNumberPhone = !text || text.length < 1 ||
            !isValidated(text, this.props.validatePhoneConst) ? I18n.t(`${this.props.errorPhoneMessage}`) : ''
        this.setState({ numberPhone: text, errorNumberPhone, luckyPhone: text })
    }

    onChangeBarcode(text) {
        const errorBarcode = !text || text.length <= 8 || !isValidated(text, this.props.validateTransaction) ? I18n.t('errorBarcode') : null
        this.setState({ Barcode: text, errorBarcode })
    }
    onPressBuyLottery() {
        this.props.onPressBuyLottery(this.state.listDataBuy)
    }
    onPressSaleLottery() {
        const { phone } = this.state
        this.props.onPressSaleLottery(this.state.listDataSale, phone)
    }
    onPressProcessLuckyLottery() {
        const { luckyPhone, Barcode , value } = this.state
        this.props.onPressProcessLuckyLottery(luckyPhone, Barcode, value)
    }
    onPressShowHistory = (item) => {

        if (this.props.historyDetail.length > 0 && this.props.historyDetail != null) {
            let strItem = []
            for (let i = 0; i < this.props.historyDetail.length; i++) {
                let value = this.props.historyDetail[i]
                if (value.trans_id === item.trans_id) {
                    strItem.push(value)
                }
            }
            this.setState({ historyDetail: strItem })
        }
        this.refs.LotteryHistoryModal.onOpen();
    }
    _renderItemHistory(item, id) {
        date = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();

        return (
            <View>
                <TouchableOpacity onPress={() => this.onPressShowHistory(item)}>
                    <View style={styles.containerItemHistory}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.txtItemHistory}>{I18n.t('colNum')}: {id + 1}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.txtItemHistory}>{I18n.t('transId')}: {item.trans_id}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.txtItemHistory}>{I18n.t('lotteryId')}: {this.state.lotteryId}</Text>
                            <Text style={styles.txtItemHistory}>{I18n.t('amount')}: {(item.total)}</Text>
                        </View>
                        <Text style={styles.txtItemHistory}>{I18n.t('dateSearch')}: {date}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    onCallContact() {
        const { onPressContact } = this.props
        if (onPressContact) {
            this.props.onPressContact()
        }
    }
    onCallContact1() {
        const { onPressContact1 } = this.props
        if (onPressContact1) {
            this.props.onPressContact1()
        }
    }
    onCallContact2() {
        const { onPressContact2 } = this.props
        if (onPressContact2) {
            this.props.onPressContact2()
        }
    }
    onShowDetail = (item) => {

        let tranferId = item.transaction_id
        let numberlist = item.number_loto_list
        let lotteryValue = ""
        if (numberlist.length > 0) {
            let strValue = numberlist.split(';')
            let arrayList = []

            let no = 0
            for (let i = 0; i < strValue.length; i++) {
                let strItem = strValue[i]
                let strNewItem = strItem.split('=')
                no++
                arrayList.push({
                    'No': no, 'lottery': strNewItem[0], 'amount': strNewItem[1]
                })

            }
            lotteryValue = arrayList

        }
        this.setState({ setModalVisible: true, lotteryValue, tranferId })
    }
    _renderItem = ({ item }) => {
        return (
            <View>

            </View>
        )
    }
    onCloes = () => {
        this.setState({ setModalVisible: false, setModelDate: false })
    }
    renderItem = ({ item }) => {
        let formetDate = moment(item.request_date).format('YYYY-MM-DD H:mm:ss')
        return (
            <TouchableOpacity onPress={() => this.onShowDetail(item)}>
                <View style={styles.row}>
                    <Image source={Images.ic_SokxayLottery} style={styles.iconStyleHeader} />
                    <View style={styles.nameContainer}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.transaction_id}</Text>
                            <Text style={styles.nameTxt1} numberOfLines={1} ellipsizeMode="tail">{item.msisdn}</Text>
                            <Text style={styles.msgTxt}>{formetDate}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.msgTxt1}>{"- " + formatNumber(item.amount)} ₭</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
    renderItemGet = (item) => {
        return (
            <View style={styles.containerItem}>
                <Text style={styles.txtItem}>{item.No}</Text>
                <View style={styles.itemColor}>
                    <Text style={styles.txtItemNUmber}>{item.lottery}</Text>
                </View>
                <Text style={styles.txtItem}>{formatNumber(item.amount + '₭')}</Text>
            </View>
        )
    }
    _renderHeaderShowHistory() {
        return (
            <TouchableOpacity style={styles.containerItemHeader}>
                <Text style={styles.txtItem}>{I18n.t('colNum')}</Text>
                <Text style={styles.txtItem}>{I18n.t('numberLottery')}</Text>
                <Text style={styles.txtItem}>{I18n.t('amount')}</Text>
            </TouchableOpacity>
        )
    }

    openCalendar() {
        this.setState({ setModelDate: true })
    }
    onTimkiem(selectedStartDate, selectedEndDate) {
        if (selectedStartDate != null && selectedEndDate != null) {
            let selectedDateDOB = moment(selectedStartDate).format('YYYY-MM-DD');
            let selectedDateDOBto = moment(selectedEndDate).add(1, 'day').format('YYYY-MM-DD');
            this.props.onSeachHistoryLottery(selectedDateDOB, selectedDateDOBto)
        } else {
            AlertNative(I18n.t('selectdate'))
        }
        this.setState({ setModelDate: false })
    }
    onRefresh = () => {

    }
    onClearBuyLottery() { this.setState({ buyLottery: null }) }
    onClearAmountBuy() { this.setState({ amountBuy: null }) }
    onClearPhone() { this.setState({ phone: null }) }
    onClearSaleLottery() { this.setState({ saleLottery: null }) }
    onClearAmountSale() { this.setState({ amountSale: null }) }
    onClearLuckyPhone() { this.setState({ luckyPhone: null }) }
    onClearBarcode() { this.setState({ Barcode: null }) }
    onLoading() {
        this.props.onRefreshHistory()
    }
    onSelect = () => {
        this.setState({ setModalVisibleListWinner: true })
    }
    onClose = () => {
        this.setState({ setModalVisibleListWinner: false })
    }
    onSelectItem = (value, name) => {
        this.setState({ Ititem: name,  setModalVisibleListWinner: false, value })

    }
    render() {

        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date();
        const maxDate = new Date(2017, 6, 3);
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';
        const { phone, errorPhone, errorLottery, isDataSale, isDataBuy,
            errorLotteryId, lotteryId, errorNumberPhone, numberPhone, errorBarcode, listDataBuy, listDataSale,
            Barcode, buyLottery, errorBuyLottery, errorSaleLottery, saleLottery, errorAmountSale,
            amountSale, amountBuy, errorAmountBuy, luckyPhone, isDatePicker, isDatePickerto,
            dateVisibleOnDialog, selectedDateDOB, selectedDateDOBto, iconContac } = this.state
        const { isGetdataHistory } = this.props
        return (
            <View style={{ flex: 1 }}>
                {this.props.isLoading ? <ActivityIndicator /> : null}
                <View style={{ flex: 1 }}>
                    {this.props.getdataTyle == 'BUYLOTTERY' ?
                        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                            <View style={styles.groupInput}>
                                <FullTextInput
                                    label={I18n.t('numberLottery')}
                                    placeholder={I18n.t('enterNumberLottery')}
                                    returnKeyType='done'
                                    keyboardType='numeric'
                                    value={buyLottery}
                                    maxLength={5}
                                    error={errorBuyLottery}
                                    onChangeUserName={(text) => this.onChangBuyLottery(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    textError={I18n.t('errorEnterLottery')}
                                    onclick={() => this.onClearBuyLottery()}
                                />
                            </View>
                            <View style={styles.groupInput}>
                                <FullTextInput
                                    label={I18n.t('amount')}
                                    placeholder={I18n.t('enterAmount')}
                                    returnKeyType='done'
                                    keyboardType='numeric'
                                    value={amountBuy}
                                    error={errorAmountBuy}
                                    onChangeUserName={(text) => this.onChangeAmountBuy(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    maxLength={7}
                                    textError={I18n.t('amountMustbefrom', { amount: '1,000' })}
                                    onclick={() => this.onClearAmountBuy()}

                                />
                            </View>
                            <View style={styles.groupInput}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <SmallButton
                                        text={I18n.t('addList')}
                                        onPress={() => this.onPressProcessBuy()}
                                        isDisable={(!buyLottery || !amountBuy || errorAmountBuy || errorBuyLottery) ? true : this.state.listDataBuy.length > 11 ? true : false} />
                                </View>
                            </View>

                            <View>
                                {
                                    isDataBuy ? (
                                        <CardView style={styles.cardStyle}>
                                            <TouchableOpacity style={[styles.rowInfo]}>
                                                <Ionicons
                                                    name="ios-information-circle"
                                                    size={26}
                                                    color={Colors.colorButton}
                                                    style={styles.iconShowBalance}
                                                />
                                                <Text style={{ color: Colors.colorButton, fontSize: 15 }}>{I18n.t('listLottery')}</Text>
                                            </TouchableOpacity>
                                            <View>
                                                <FlatList
                                                    data={listDataBuy.slice(0, this.state.itemsCount)}
                                                    renderItem={({ item, index }) => this._renderItemBuy(item, index)}
                                                    extraData={this.state}
                                                    keyExtractor={item => item.id}
                                                    ListHeaderComponent={() => this._renderHeaderBuy()}
                                                    ListFooterComponent={() => this._renderFooterBuy()}
                                                />
                                                <View style={{ padding: 10 }}>
                                                    <FullButton
                                                        textButton={I18n.t('buy')}
                                                        styles={styles.buttonStyle}
                                                        onPress={() => this.onPressBuyLottery()}
                                                        isDisable={(this.state.listDataBuy.length >= 1) ? false : true}
                                                    />
                                                </View>
                                            </View>
                                        </CardView>
                                    ) : null
                                }
                            </View>
                        </ScrollView>
                        : this.props.getdataTyle == 'SALELOTTERY' ?
                        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                                <View>

                                    <View style={styles.groupInput}>
                                        <FullTextInput
                                            label={I18n.t('inputReceiverPhoneNumber')}
                                            placeholder={I18n.t('inputThePhoneHere')}
                                            returnKeyType='done'
                                            keyboardType='numeric'
                                            error={errorPhone}
                                            value={phone}
                                            maxLength={13}
                                            onChangeUserName={(text) => this.onChangeNumberValue(text)}
                                            iconLeft='facebook'
                                            iconRight='close'
                                            textError={I18n.t(`${this.props.errorPhoneMessage}`)}
                                            onclick={() => this.onClearPhone()}

                                        />
                                    </View>
                                    <View style={styles.groupInput}>
                                        <FullTextInput
                                            label={I18n.t('numberLottery')}
                                            placeholder={I18n.t('enterNumberLottery')}
                                            returnKeyType='done'
                                            keyboardType='numeric'
                                            error={errorSaleLottery}
                                            value={saleLottery}
                                            maxLength={5}
                                            onChangeUserName={(text) => this.onChangSaleLottery(text)}
                                            iconLeft='facebook'
                                            iconRight='close'
                                            textError={I18n.t(`${this.props.errorPhoneMessage}`)}
                                            onclick={() => this.onClearSaleLottery()}
                                        />
                                    </View>

                                    <View style={styles.groupInput}>
                                        <FullTextInput
                                            label={I18n.t('amount')}
                                            placeholder={I18n.t('enterAmount')}
                                            returnKeyType='done'
                                            keyboardType='numeric'
                                            value={amountSale}
                                            error={errorAmountSale}
                                            onChangeUserName={(text) => this.onChangeAmountSale(text)}
                                            iconLeft='facebook'
                                            iconRight='close'
                                            maxLength={7}
                                            textError={I18n.t('amountMustbefrom', { amount: '1,000' })}
                                            onclick={() => this.onClearAmountSale()}

                                        />
                                    </View>
                                    <View style={styles.groupInput}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <SmallButton
                                                text={I18n.t('addList')}
                                                onPress={() => this.onPressProcessSale()}
                                                isDisable={(!saleLottery || !amountSale || !phone || errorAmountSale || errorSaleLottery || errorPhone) ? true : this.state.listDataSale.length > 11 ? true : false}
                                            />
                                        </View>
                                    </View>
                                    <View>
                                        {
                                            isDataSale ? (
                                                <CardView style={styles.cardStyle}>
                                                    <TouchableOpacity style={[styles.rowInfo]}>
                                                        <Ionicons
                                                            name="ios-information-circle"
                                                            size={26}
                                                            color={Colors.colorButton}
                                                            style={styles.iconShowBalance}
                                                        />
                                                        <Text style={{ color: Colors.colorButton, fontSize: 15 }}>{I18n.t('listLottery')}</Text>
                                                    </TouchableOpacity>
                                                    <View>
                                                        <FlatList
                                                            data={listDataSale.slice(0, this.state.itemsCount)}
                                                            renderItem={({ item, index }) => this._renderItemSale(item, index)}
                                                            extraData={this.state}
                                                            keyExtractor={item => item.id}
                                                            ListHeaderComponent={() => this._renderHeaderSale()}
                                                            ListFooterComponent={() => this._renderFooterSale()}
                                                        />
                                                        <View style={{ padding: 10 }}>
                                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                                <SmallButton
                                                                    text={I18n.t('buy')}
                                                                    onPress={() => this.onPressSaleLottery()}
                                                                    isDisable={(this.state.listDataSale.length >= 1) ? false : true} />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </CardView>
                                            ) : null
                                        }

                                    </View>
                                </View>
                            </ScrollView>
                            : this.props.getdataTyle == 'PAYREWARD' ?
                                (
                                    <View>
                                        <View style={styles.groupInput}>
                                            <TouchableOpacity style={styles.comboboxSelect} onPress={() => this.onSelect()}>
                                                <View style={{ justifyContent: 'center' }}>
                                                    <Text>{I18n.t(this.state.Ititem || 'SelectPartner')}</Text>
                                                </View>
                                                <View style={{ justifyContent: 'center' }}>
                                                    <Ionicons name='chevron-down' size={30} color={Colors.backColor} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.groupInput}>
                                            <FullTextInput
                                                label={I18n.t('enterYourMobilePhoneNumber')}
                                                placeholder={I18n.t('inputThePhoneHere')}
                                                returnKeyType='done'
                                                keyboardType='numeric'
                                                value={luckyPhone}
                                                maxLength={13}
                                                error={errorNumberPhone}
                                                onChangeUserName={(text) => this.onChangNumberPhone(text)}
                                                iconLeft='facebook'
                                                iconRight='close'
                                                textError={I18n.t('incorrectPhoneNumber')}
                                                onclick={() => this.onClearLuckyPhone()}

                                            />
                                        </View>
                                        <View style={styles.groupInput}>
                                            <FullTextInput
                                                label={I18n.t('barcode')}
                                                placeholder={I18n.t('enterBarcode')}
                                                returnKeyType='done'
                                                keyboardType='numeric'
                                                value={Barcode}
                                                maxLength={13}
                                                error={errorBarcode}
                                                onChangeUserName={(text) => this.onChangeBarcode(text)}
                                                iconLeft='facebook'
                                                iconRight='close'
                                                textError={I18n.t('errorBarcode')}
                                                onclick={() => this.onClearBarcode()}

                                            />
                                        </View>
                                        <View style={styles.groupInput}>

                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <SmallButton
                                                    text={I18n.t('confirm')}
                                                    onPress={() => this.onPressProcessLuckyLottery()}
                                                    isDisable={(!luckyPhone || !Barcode || errorBarcode || errorNumberPhone) ? true : false}
                                                />
                                            </View>

                                        </View>
                                    </View>

                                )
                                : this.props.getdataTyle == 'CHECKHISTORY' ?
                                    <ScrollView style={{ flex: 1 }}>
                                        <View style={{ flex: 1 }}>
                                            {isGetdataHistory ?
                                                <FlatList
                                                    data={isGetdataHistory}
                                                    refreshing={this.state.refresh}
                                                    extraData={this.state}
                                                    keyExtractor={item => item.id}
                                                    renderItem={this.renderItem}
                                                    onRefresh={this.onRefresh}

                                                /> : (
                                                    <View>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                                                            <FontAwesome name="frown-o" size={70} color={Colors.textLine} />
                                                            <Text>{I18n.t('10119')}</Text>
                                                        </View>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                            <TouchableOpacity onPress={() => this.onLoading()} style={{ justifyContent: 'center', flexDirection: 'row', backgroundColor: Colors.orange, padding: 10, borderRadius: 5 }}>
                                                                <FontAwesome name="refresh" size={20} color={Colors.white} />
                                                                <Text style={{ left: 5, color: Colors.white }}>Load pag</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>

                                                )}

                                            <Modal
                                                animationType="slide"
                                                transparent={true}
                                                visible={this.state.setModalVisible}
                                                onRequestClose={() => {
                                                    this.setState({ setModalVisible: false })
                                                }}
                                            >
                                                <View style={styles.centeredView}>
                                                    <View style={styles.modalView3}>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                                            <Text>{this.state.tranferId}</Text>
                                                        </View>
                                                        <ScrollView style={{ width: '100%', marginBottom: 20 }}>
                                                            <FlatList
                                                                data={this.state.lotteryValue}
                                                                renderItem={({ item, index }) => this.renderItemGet(item, index)}
                                                                keyExtractor={(item) => {
                                                                    return item.id;
                                                                }}
                                                                extraData={this.state}
                                                                ListHeaderComponent={() => this._renderHeaderShowHistory()}
                                                            />
                                                        </ScrollView>
                                                        <TouchableOpacity onPress={() => this.onCloes()} style={{ width: '100%', height: 35, backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ color: Colors.white }}>{I18n.t('ok')}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>
                                    </ScrollView>
                                    : null}

                </View>

                <View style={styles.footer}>
                    {
                        this.props.getdataTyle != 'CHECKHISTORY' ?
                            <View style={{ flexDirection: 'row' }}>
                                <Text></Text>
                            </View>
                            :
                            <TouchableOpacity style={styles.btnFooter} onPress={() => this.openCalendar()}>
                                <View style={styles.boxfooter}>
                                    <View style={styles.icon}>
                                        <FontAwesome name="search" size={20} color={Colors.colorStart} />
                                    </View>
                                    <Text style={{ fontSize: 10, textAlign: 'center' }} numberOfLines={1} >{I18n.t('HistoryLottery')}</Text>
                                </View>
                            </TouchableOpacity>
                    }
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.setModelDate}
                    onRequestClose={() => {
                        this.setState({ setModelDate: false })
                    }}
                >
                    <View style={styles.centeredView1}>
                        <View style={styles.header1}>
                            <TouchableOpacity onPress={() => this.onCloes()}>
                                <Ionicons name='ios-close-sharp' size={30} color={Colors.backColor} />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.textheader}>{I18n.t('pickADate')}</Text>
                            </View>

                        </View>
                        <View style={{ width: '100%', marginBottom: 35, padding: 10 }}>

                            <View style={styles.datefilter}>
                                <View style={styles.headerLeft}>
                                    <Text style={styles.textConten}>{I18n.t('fromDate')}:</Text>
                                    <Text style={styles.textDate}>
                                        {selectedStartDate ? moment(selectedStartDate).format('DD/MM/YYYY') : ' DD/MM/YYYY'}
                                    </Text>
                                </View>

                                <View style={styles.headerRight}>
                                    <Text style={styles.textConten}>{I18n.t('toDate')}:</Text>
                                    <Text style={styles.textDate}>
                                        {selectedEndDate ? moment(selectedEndDate).format('DD/MM/YYYY') : ' DD/MM/YYYY'}
                                    </Text>
                                </View>
                            </View>
                            <CalendarPicker
                                startFromMonday={true}
                                allowRangeSelection={true}
                                minDate={new Date(2018, 1, 1)}
                                maxDate={new Date(2050, 6, 3)}
                                weekdays={[I18n.t('Mon'), I18n.t('Tue'), I18n.t('Wed'), I18n.t('Thur'), I18n.t('Fri'), I18n.t('Sat'), I18n.t('Sun')]}
                                months={[
                                    I18n.t('January'),
                                    I18n.t('Febraury'),
                                    I18n.t('March'),
                                    I18n.t('April'),
                                    I18n.t('May'),
                                    I18n.t('June'),
                                    I18n.t('July'),
                                    I18n.t('August'),
                                    I18n.t('September'),
                                    I18n.t('October'),
                                    I18n.t('November'),
                                    I18n.t('December'),
                                ]}
                                previousTitle={<Ionicons name='caret-back-sharp' size={18} color={Colors.orange} />}
                                nextTitle={<Ionicons name='caret-forward-sharp' size={18} color={Colors.orange} />}
                                todayBackgroundColor={Colors.blueLight}
                                selectedDayColor={Colors.orange}
                                selectedDayTextColor="#FFF"
                                scaleFactor={375}
                                textStyle={{
                                    fontFamily: 'Cochin',
                                    color: '#000000',
                                }}
                                onDateChange={this.onDateChange}
                            />
                            <View style={styles.textStyle}></View>
                            <View style={styles.button}>
                                <LinearGradient colors={[Colors.startGradientNav, Colors.endGradientNav]} style={styles.LinearGradient}>
                                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => this.onTimkiem(selectedStartDate, selectedEndDate)}>
                                        <Text style={{ color: Colors.white }}>{I18n.t('Search')}</Text>
                                    </TouchableOpacity>
                                </LinearGradient>

                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.setModalVisibleListWinner}
                    onRequestClose={() => {
                        this.setState({ setModalVisibleListWinner: false })
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.cloud }}>
                        <SetModalComponent
                            listData={ListWiner}
                            onClose={() => this.onClose()}
                            onSelectItem={(value, name) => this.onSelectItem(value, name)} />
                    </View>

                </Modal>
            </View >
        )
    }
}
export default LotteryComponent
LotteryComponent.defaultProps = {
    validateTransaction: Constant.VALIDATE_NUMERIC,
    validatePhoneConst: Constant.VALIDATE_LAOS,
    errorPhoneMessage: 'incorrectPhoneNumber3',
    validateMoneyConst: Constant.VALIDATE_MONEY,
}