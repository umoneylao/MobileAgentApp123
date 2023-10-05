import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, ScrollView, SafeAreaView, Image } from 'react-native';
import { Colors, Metrics, Fonts, Images } from '../../themes'
import { SmallButton, FullNewButton, TextInput, FullTextInput, FlatListMoney } from '../../components'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import I18n from 'react-native-i18n'
import * as Constant from '../../utils/Constant'
import { formatNumber } from '../../utils/Formater'
import * as ValidationUtils from '../../utils/Validate'
import { isValidated, TRIM_SPACE } from '../../utils/Validate'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const radio_props = [
    { label: I18n.t('BuyForyourself'), value: 0 },
    { label: I18n.t('BuyForCustomers'), value: 1 }
];
const Digits = [
    { id: '1D', event: '1D', min: 1, max: 9 },
    { id: '2D', event: '2D', min: 10, max: 99 },
    { id: '3D', event: '3D', min: 100, max: 999 },
    { id: '4D', event: '4D', min: 1000, max: 9999 },
    { id: '5D', event: '5D', min: 10000, max: 90000 },
    { id: '6D', event: '6D', min: 100000, max: 900000 }
];

const Money = [
    { id: 1, money: '3,000' },
    { id: 2, money: '5,000' },
    { id: 3, money: '10,000' },
    { id: 4, money: '50,000' },
];

class LotteryNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDataBuy: [],
            isDataBuy: false,
            setModalVisibleShow: false,
            isGetdataNumberwin: null,
            setModalVisibleShowList: false,
            buyLottery: null,
            isValues: [],
            itemsCount: 10,
            itemsCountAnimal: 3,
            amountBuy: null,
            amountBuyRandom: null,
            setModalRandom: false,
            value: 0,
            showTxtInputPhone: false,
            valueRandom: [
                { id: 1, BuyLottery_id: '1', buyLottery: '', amountBuy: '' },
                { id: 2, BuyLottery_id: '2', buyLottery: '', amountBuy: '' },
                { id: 3, BuyLottery_id: '3', buyLottery: '', amountBuy: '' },
                { id: 4, BuyLottery_id: '4', buyLottery: '', amountBuy: '' },
                { id: 5, BuyLottery_id: '5', buyLottery: '', amountBuy: '' },
                { id: 6, BuyLottery_id: '6', buyLottery: '', amountBuy: '' },
            ]
        };
    }
    onChangBuyLottery(data) {
        const errorBuyLottery = !data || data.length < 1 || !isValidated(data, this.props.validateTransaction) ? I18n.t('errorEnterLottery') : null
        this.setState({ buyLottery: data, errorBuyLottery })
    }
    onChangeAmountBuy = (text) => {
        const { minAmount, maxAmount } = this.props;
        let errorAmountBuy = !text || text.length < 1 || !isValidated(text, this.props.validateMoneyConst) ? I18n.t('enterMoney') : null;
        text = text.replace(ValidationUtils.REMOVE_FIRST_ZERO, '');
        text === '0' ? (text = '') : text;
        let tempText = text;
        let mMoney = parseInt(tempText.replace(/,/g, ''));
        if (minAmount) {
            let checkAmount = parseInt(mMoney) % 1000
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
    onChangeAmountBuyRandom = (text) => {
        const { minAmount, maxAmount } = this.props;
        //amountBuyRandom, errorAmountBuyRandom
        let errorAmountBuyRandom = !text || text.length < 1 || !isValidated(text, this.props.validateMoneyConst) ? I18n.t('enterMoney') : null;
        text = text.replace(ValidationUtils.REMOVE_FIRST_ZERO, '');
        text === '0' ? (text = '') : text;
        let tempText = text;
        let mMoney = parseInt(tempText.replace(/,/g, ''));
        if (minAmount) {
            let checkAmount = parseInt(mMoney) % 1000
            if (checkAmount != 0) {
                errorAmountBuyRandom = I18n.t('formatAmount')
            }
            if (mMoney < minAmount) {
                errorAmountBuyRandom = I18n.t('amountMustbefrom', { amount: formatNumber(minAmount + "") });
            }
            if (mMoney > maxAmount) {
                errorAmountBuyRandom = I18n.t('amountMax', { amount: formatNumber(maxAmount + "") });
            }
        }
        this.setState({ amountBuyRandom: formatNumber(text.trim()) })
        // console.log('cvc:',this.state.amountBuyRandom) //errorAmountBuyRandom
    }
    randomNumber(item) {
        // console.log('item', item.min)
        switch (item.event) {
            case item.event:
                let min = item.min;
                let max = item.max;
                let RandomNumber = min + Math.floor(Math.random() * (max - min));
                let number = RandomNumber.toString()
                this.setState({
                    buyLottery: number
                })
                this.onChangBuyLottery(number)
                break;

            default:
                break;
        }
    }
    componentDidMount() {
        this.setState({ setModalPhone: true })
    }
    onChangeAmount = (text) => {
        const { minAmount, maxAmount } = this.props;
        let errorAmountBuy = !isValidated(text, this.props.validateMoneyConst) ? I18n.t('enterMoney') : null;
        text = text.replace(ValidationUtils.REMOVE_FIRST_ZERO, '');
        text === '0' ? (text = '') : text;
        let tempText = text;

        let mMoney = parseInt(tempText.replace(/,/g, ''));

        if (minAmount) {
            let checkAmount = parseInt(mMoney) % 1000
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

    onPressProcessBuy = () => {
        // console.log('this.state.listDataBuy:', this.state.listDataBuy)
        const { phone } = this.state
        const { minAmount, maxAmount, infoAccount } = this.props;
        let arrayItem = [...this.state.listDataBuy, {
            'BuyLottery_id': this.state.listDataBuy.length + 1,
            'buyLottery': this.state.buyLottery,
            'amountBuy': this.state.amountBuy,
            'phonNumber': phone ? phone : infoAccount.phoneNumber
        }]
        if (arrayItem.length == 1) {
            this.setState({
                listDataBuy: [...this.state.listDataBuy, {
                    'BuyLottery_id': this.state.listDataBuy.length + 1,
                    'buyLottery': this.state.buyLottery,
                    'amountBuy': this.state.amountBuy,
                    'phonNumber': phone ? phone : infoAccount.phoneNumber
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
                        'amountBuy': this.state.amountBuy,
                        'phonNumber': phone ? phone : infoAccount.phoneNumber
                    }]
                })
            }
        }
        if (this.state.listDataBuy.length >= 0) {
            this.setState({ isDataBuy: true, buyLottery: null, amountBuy: null })
        }
    }
    _renderItemBuy(item, id) {
        return (
            <View style={styles.containerItem}>
                <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.txtItem}>{item.BuyLottery_id}</Text>
                </View>
                <View style={{ width: '30%', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <View style={styles.groudNumberBuy}>
                        <Image source={
                            item.buyLottery.length === 1 ?
                                Images.iconDigits1D :
                                item.buyLottery.length === 2 ?
                                    Images.iconDigits2D :
                                    item.buyLottery.length === 3 ?
                                        Images.iconDigits3D :
                                        item.buyLottery.length === 4 ?
                                            Images.iconDigits4D :
                                            item.buyLottery.length === 5 ?
                                                Images.iconDigits5D :
                                                item.buyLottery.length === 6 ?
                                                    Images.iconDigits6D : null
                        } style={styles.iconDitits} />
                        <View style={styles.boxNumber}>
                            <Text style={styles.txtItemNumber0000}>{item.buyLottery}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.txtItem}>{item.amountBuy}</Text>
                </View>
                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.onPressDeleteBuy(item.BuyLottery_id)} style={styles.txtItem}>
                        <Text style={{ alignItems: 'flex-end' }}>
                            <Ionicons size={25} name='ios-trash-outline' color={Colors.iconColor} />
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
        )
    }
    _renderHeaderBuy() {
        return (
            <TouchableOpacity style={styles.containerItem}>
                <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.txtItem}>{I18n.t('colNum')}</Text>
                </View>
                <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.txtItem}>{I18n.t('numberLottery')}</Text>
                </View>
                <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.txtItem}>{I18n.t('amount')}</Text>
                </View>
                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.txtItem}>{I18n.t('delete')}</Text>
                </View>

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
            if (lotteryArray.length == 0) { this.setState({ isDataBuy: false }) }
            this.setState({
                listDataBuy: lotteryArray
            })
        }
    }

    onPressDeleteBuyRandom = (id) => {
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
                    text: I18n.t('confirm'), onPress: () => this.handleDeleteBuyRandom(id)
                },
            ],
            { cancelable: false },
        );
    }
    handleDeleteBuyRandom(id) {
        const item2 = this.state.valueRandom.filter(item2 => item2.id !== id)
        let lotteryArrayRandom = [];
        if (item2 != null) {
            let i = 0;
            item2.forEach((value) => {
                i++
                lotteryArrayRandom.push({
                    'id': value.id,
                    'BuyLottery_id': value.BuyLottery_id,
                    'buyLottery': value.buyLottery,
                    'amountBuy': value.amountBuy
                })
            })
            this.setState({
                valueRandom: lotteryArrayRandom
            })
        }
        // console.log('lotteryArrayRandom', lotteryArrayRandom)
    }
    onPressBuyLottery() {
        this.props.onPressBuyLottery(this.state.listDataBuy)
    }
    onRadom() {
        this.random6number()
        this.setState({ setModalRandom: true })
    }
    onChangeNumberValue(text) {
        const { phone } = this.state
        text = text.replace(TRIM_SPACE, '');
        let errorPhone = !text || text.length < 1 ||
            !isValidated(text, this.props.validatePhoneConst) ? I18n.t(`${this.props.errorPhoneMessage}`) : ''
        this.setState({ phone: text, errorPhone })
    }
    _renderItem(item) {
        const { amountBuyRandom, errorAmountBuyRandom } = this.state
        return (
            <View style={styles.centerModel}>
                <View style={styles.itemHeader}>
                    <Image source={
                        item.buyLottery.length === 1 ?
                            Images.iconDigits1D :
                            item.buyLottery.length === 2 ?
                                Images.iconDigits2D :
                                item.buyLottery.length === 3 ?
                                    Images.iconDigits3D :
                                    item.buyLottery.length === 4 ?
                                        Images.iconDigits4D :
                                        item.buyLottery.length === 5 ?
                                            Images.iconDigits5D :
                                            item.buyLottery.length === 6 ?
                                                Images.iconDigits6D : null
                    } style={styles.iconDitits} />
                </View>
                <View style={styles.itemHeaderNumber}>
                    <View style={styles.groudNumberBuy}>
                        <View style={styles.boxNumber}>
                            <Text style={styles.txtItemNumber0000}>{item.buyLottery}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.itemHeaderAmount}>
                    <View style={{ width: '100%', }}>
                        <FullTextInput
                            label={I18n.t('money')}
                            placeholder={I18n.t('enterAmount')}
                            returnKeyType='done'
                            keyboardType='numeric'
                            value={amountBuyRandom}
                            maxLength={13}
                            error={errorAmountBuyRandom}
                            onChangeUserName={(text) => this.onChangeAmountBuyRandom(text)}
                            iconLeft='facebook'
                            iconRight='close'
                            textError={I18n.t('enterMoney')}
                            onclick={() => this.onClearAmountBuy()}
                        />
                    </View>
                </View>
                <View style={styles.itemHeader}>
                    <TouchableOpacity onPress={() => this.onPressDeleteBuyRandom(item.id)} style={styles.txtItem}>
                        <Text>
                            <Ionicons size={30} name='ios-trash-outline' color={Colors.textColor} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    _renderHeader() {
        return (
            <View style={styles.headerModel}>
                <View style={styles.itemHeader}>
                    <Text>{I18n.t('Type')}</Text>
                </View>
                <View style={styles.itemHeaderNumber}>
                    <Text>{I18n.t('Number')}</Text>
                </View>
                <View style={styles.txtitemHeaderAmount}>
                    <Text>{I18n.t('Amount')}</Text>
                </View>
                <View style={styles.itemHeader}>
                    <Text style={styles.txtEdit}>{I18n.t('edit')}</Text>
                </View>
            </View>
        )
    }
    onCencelBuy() {
        this.setState({ setModalRandom: false })
    }
    ///
    onAddtolist(valueRandom) {
        // console.log('valueRandom:', valueRandom)
        // this.setState({ setModalRandom: false, listDataBuy: valueRandom, isDataBuy: true,  })
        //

    }
    onClearbuyLottery() { this.setState({ buyLottery: null }) }
    onClearAmountBuy() { this.setState({ amountBuy: null }) }
    onRadio(value) {
        value.value === 1 ? this.setState({ showTxtInputPhone: true }) : value.value === 0 ? this.setState({ showTxtInputPhone: false }) : null
    }
    onPressToDetail() {
        this.setState({ setModalPhone: false })
    }
    renderItem(item) {
        return (
            <View style={styles.radomDitigts}>
                <TouchableOpacity style={styles.boxRadom} onPress={() => this.randomNumber(item)}>
                    <Text style={styles.txtBoxRandom}>{item.id}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    getMoney(item) {
        this.setState({ amountBuy: item })
    }
    random6number() {
        const { amountBuyRandom } = this.state
        // console.log('amountBuyRandom:', amountBuyRandom)
        const min = 100000;
        const max = 900000;
        let RandomNumber = min + Math.floor(Math.random() * (max - min));
        let number = RandomNumber.toString()
        let sub1 = number.substring(0, 1)
        let sub2 = number.substring(0, 2)
        let sub3 = number.substring(0, 3)
        let sub4 = number.substring(0, 4)
        let sub5 = number.substring(0, 5)
        let sub6 = number.substring(0, 6)
        this.setState({
            valueRandom: [
                { id: 1, BuyLottery_id: '1', buyLottery: sub1, amountBuy: amountBuyRandom },
                { id: 2, BuyLottery_id: '2', buyLottery: sub2, amountBuy: amountBuyRandom },
                { id: 3, BuyLottery_id: '3', buyLottery: sub3, amountBuy: amountBuyRandom },
                { id: 4, BuyLottery_id: '4', buyLottery: sub4, amountBuy: amountBuyRandom },
                { id: 5, BuyLottery_id: '5', buyLottery: sub5, amountBuy: amountBuyRandom },
                { id: 6, BuyLottery_id: '6', buyLottery: sub6, amountBuy: amountBuyRandom },
            ]
        })

    }
    render() {
        const { pagSell } = this.props
        const { listDataBuy,
            buyLottery, errorBuyLottery,
            amountBuy, errorAmountBuy, isDataBuy, isValues,
            errorPhone, phone, showTxtInputPhone, value, valueRandom } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.textConten}>{I18n.t('2or3Number')}</Text>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={styles.main}>
                        {showTxtInputPhone == true ?
                            (<View style={styles.txtPhone}>
                                <View>
                                    <FullTextInput
                                        label={I18n.t('phoneNumber')}
                                        placeholder={I18n.t('inputThePhoneHere')}
                                        returnKeyType='done'
                                        keyboardType='numeric'
                                        value={phone}
                                        error={errorPhone}
                                        maxLength={13}
                                        onChangeUserName={(text) => this.onChangeNumberValue(text)}
                                        iconLeft='facebook'
                                        iconRight='close'
                                        textError={I18n.t('errorEnterLottery')}
                                        onclick={() => this.onClearbuyLottery()}

                                    />
                                </View>
                            </View>)
                            : null}
                        <View style={{ marginBottom: 20 }}>
                            <FullTextInput
                                label={I18n.t('numberLottery')}
                                placeholder={I18n.t('enterNumberLottery')}
                                returnKeyType='done'
                                keyboardType='numeric'
                                value={buyLottery}
                                error={errorBuyLottery}
                                maxLength={6}
                                onChangeUserName={(text) => this.onChangBuyLottery(text)}
                                iconLeft='facebook'
                                iconRight='close'
                                textError={I18n.t('errorEnterLottery')}
                                onclick={() => this.onClearbuyLottery()}

                            />
                        </View>


                        <View style={styles.groupBoxRandom}>
                            <View style={styles.txtRadom}>
                                <Text style={styles.textConten}>{I18n.t('random2number')}</Text>
                            </View>
                            <FlatList
                                data={Digits}
                                renderItem={({ item, index }) => this.renderItem(item, index)}
                                numColumns={6}
                                showsHorizontalScrollIndicator={false}
                                extraData={Object.assign(this.props)}
                                keyExtractor={(item, index) => item.id}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <FullTextInput
                                label={I18n.t('money')}
                                placeholder={I18n.t('enterAmount')}
                                returnKeyType='done'
                                keyboardType='numeric'
                                value={amountBuy}
                                maxLength={13}
                                error={errorAmountBuy}
                                onChangeUserName={(text) => this.onChangeAmountBuy(text)}
                                iconLeft='facebook'
                                iconRight='close'
                                textError={I18n.t('enterMoney')}
                                onclick={() => this.onClearAmountBuy()}
                            />
                        </View>

                        <FlatListMoney getMoney={(item) => this.getMoney(item)} Money={Money} />

                        <View style={styles.button}>
                            {showTxtInputPhone == true ?
                                (<SmallButton
                                    text={I18n.t('addList')}
                                    onPress={() => this.onPressProcessBuy()}
                                    isDisable={(!buyLottery || !amountBuy || !phone || errorPhone || errorAmountBuy || errorBuyLottery) ? true : this.state.listDataBuy.length >= 10 ? true : false}
                                />) :
                                (<SmallButton
                                    text={I18n.t('addList')}
                                    onPress={() => this.onPressProcessBuy()}
                                    isDisable={(!buyLottery || !amountBuy || errorAmountBuy || errorBuyLottery) ? true : this.state.listDataBuy.length >= 10 ? true : false}
                                />)
                            }
                            <View style={styles.btnRandom}>
                                <TouchableOpacity onPress={() => this.onRadom()}>
                                    <Text style={styles.txtRandom}>{I18n.t('Random3numbers')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View>
                        {
                            isDataBuy ? (
                                <View style={styles.cardStyle}>
                                    <View style={[styles.rowInfo]}>
                                        <Text style={{ color: Colors.textColor, fontSize: 14, left: 10 }}>{I18n.t('listLottery')}</Text>
                                    </View>
                                    <View style={styles.mainConten}>
                                        <FlatList
                                            data={listDataBuy}
                                            renderItem={({ item, index }) => this._renderItemBuy(item, index)}
                                            extraData={this.state}
                                            keyExtractor={item => item.id}
                                            ListHeaderComponent={() => this._renderHeaderBuy()}
                                            ListFooterComponent={() => this._renderFooterBuy()}
                                        />
                                    </View>
                                </View>
                            ) : null
                        }
                    </View>

                </ScrollView>
                {
                    isDataBuy ? (
                        <View style={{ justifyContent: 'center', padding: 20 }}>
                            <FullNewButton
                                text={I18n.t('buy')}
                                onPress={() => this.onPressBuyLottery()}
                                isDisable={(this.state.listDataBuy.length >= 1) ? false : true}
                            />
                        </View>
                    ) : null
                }

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.setModalRandom}
                    onRequestClose={() => {
                        this.setState({ setModalRandom: false })
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.centeredViewCenter}>
                            <View style={styles.boxMain}>
                                <View style={styles.txtHeader}>
                                    <Text style={styles.txtRandomNumber}>{I18n.t('Random3numbers')}</Text>
                                </View>
                                <FlatList
                                    data={valueRandom}
                                    renderItem={({ item, index }) => this._renderItem(item, index)}
                                    extraData={this.state}
                                    keyExtractor={item => item.id}
                                    ListHeaderComponent={() => this._renderHeader()}
                                />
                            </View>
                            <View style={styles.groudBoxRandom}>
                                <TouchableOpacity onPress={() => this.random6number()} style={styles.backColorRandom}>
                                    <Text style={styles.textRadom}>Random Again</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.footerModel}>
                                <TouchableOpacity style={styles.btnLeft} onPress={() => this.onAddtolist(valueRandom)}>
                                    <Text style={styles.txtfooterModel}>Add to list</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnRegth} onPress={() => this.onCencelBuy()}>
                                    <Text style={styles.txtfooterModel}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.setModalPhone}
                    onRequestClose={() => {
                        this.setState({ setModalPhone: false })
                    }}
                >
                    <View style={styles.centered}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{I18n.t('PleaseSelectPurchase')}</Text>
                            <RadioForm
                                radio_props={radio_props}
                                initial={value}
                                formHorizontal={true}
                                labelHorizontal={true}
                                animation={true}
                                buttonWrapStyle={{ marginLeft: 10 }}
                                labelStyle={{ fontSize: 15, color: Colors.backColor, paddingHorizontal: 20, }}
                                onPress={(value) => { this.onRadio({ value }) }}
                            />
                            <View style={{ width: '100%', height: 50, marginBottom: 10, top: 10 }}>
                                <FullNewButton
                                    text={I18n.t('txtNext')}
                                    onPress={() => this.onPressToDetail()}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

export default LotteryNumber;
LotteryNumber.defaultProps = {
    validatePhoneConst: Constant.VALIDATE_LAOS,
    errorPhoneMessage: 'incorrectPhoneNumber3',
    errorMoneyMessage: 'incorrectMoneyCode',
    validateMoneyConst: Constant.VALIDATE_MONEY,
    validateTransNote: Constant.VALIDATE_NON_SPECIAL,
    errorTransNoteMessage: 'nameIsNotEmpty',
    validateTransaction: Constant.VALIDATE_NUMERIC,

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    groudBoxRandom: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: null,
        marginBottom: 10
    },
    backColorRandom: {
        width: null,
        height: null,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'rgb(206, 234, 253)',
        padding: 10,
    },
    textRadom: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        color: '#3275E0',
        fontWeight: 'bold'
    },

    //-
    itemHeader: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtEdit: {
        left: -20
    },
    //-
    itemHeaderNumber: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'flex-start',

    },
    //-
    itemHeaderAmount: {
        width: '40%',
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
        left: 10

    },



    txtitemHeaderAmount: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },


    headerModel: {
        width: '100%',
        backgroundColor: Colors.colorHeader,
        height: 34,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    centerModel: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: null,
        borderBottomWidth: 0.5,
        borderColor: Colors.textColor
    },
    txtHeader: {
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        height: null,
        marginHorizontal: 20,
        margin: 20
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // justifyContent: 'center',

    },
    boxMain: {

        padding: 20

    },
    cardStyle: {

    },
    footerModel: {
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    btnLeft: {
        width: '50%',
        padding: 20,
        justifyContent: 'center',
        backgroundColor: Colors.orange,
        alignItems: 'center',
        borderBottomLeftRadius: 10
    },
    txtfooterModel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.white,
    },
    btnRegth: {
        width: '50%',
        padding: 20,
        justifyContent: 'center',
        backgroundColor: Colors.textColor,
        alignItems: 'center',
        borderBottomRightRadius: 10
    },

    txtRandomNumber: {
        fontSize: 14,
        color: Colors.iconDeleteColor,
        fontWeight: 'bold',

    },
    txtRandom: {
        fontSize: 14,
        color: '#3275E0',
        fontWeight: 'bold'
    },
    btnRandom: {
        width: null,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'rgb(206, 234, 253)',
        padding: 5,
    },
    containerItem: {
        flex: 1,
        padding: 5,
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        paddingHorizontal: Metrics.baseMargin,
        borderBottomWidth: 1,
        borderColor: Colors.borderGrey,
        backgroundColor: Colors.white,

    },
    txtItem: {

        fontSize: Fonts.size.medium,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 7,
        color: Colors.txtNumber
    },
    txtItemNumber0000: {
        fontSize: 16,
        alignItems: 'flex-start',
        margin: 7,
        color: '#3275E0'
    },
    boxNumber: {
        backgroundColor: 'rgb(206, 234, 253)',
        borderRadius: 5,
        left: 4,
        alignItems: 'flex-start',
    },
    groudNumberBuy: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtItemNumberRusule: {
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 7,
        fontWeight: 'bold',
        color: Colors.backColor
    },
    txtItemNumber: {
        fontSize: Fonts.size.medium,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 7,
        color: Colors.orange,
        // borderRadius: 5,
        // padding: 10,
        fontWeight: 'bold',
    },
    rowInfo: {
        width: '100%',
        height: 40,
        backgroundColor: Colors.bgLight,
        justifyContent: 'center',
        padding: 10

    },
    mainConten: {
        height: null,
        marginHorizontal: 20,
    },
    header: {
        width: '100%',
        height: null,
        backgroundColor: Colors.bgLight,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10

    },
    logo: {

        alignItems: 'center',
        flexDirection: 'row',
        margin: 20,
    },
    textConten: {
        left: 10,
        color: Colors.textColor,
        fontSize: 14
    },
    logoNCC: {
        width: 50,
        height: 50,
    },
    groud: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    radom: {
        width: 40,
        height: 40,
        backgroundColor: Colors.blueLight,
        margin: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'

    },
    boxRadom: {
        width: 41,
        height: 41,
        borderColor: Colors.orange,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',


    },
    groupBoxRandom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        flexDirection: 'column'

    },
    txtRadom: {
        marginBottom: 15
    },
    txtBoxRandom: {
        fontSize: 14,
        color: Colors.black,
        fontWeight: 'bold'
    },
    txtLabel: {
        color: Colors.orange
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.cloud
    },
    centeredViewCenter: {
        width: '90%',
        height: null,
        backgroundColor: Colors.white,
        borderRadius: 10,

    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    centered: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        backgroundColor: 'rgba(224, 224, 224, 0.6)'
    },
    modalView: {
        width: '100%',
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
        alignItems: "center",
        height: '50%'
    },
    modalText: {
        marginBottom: 20,
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 20
    },
    txtPhone: {
        marginBottom: 20
    },
    radomDitigts: {
        marginHorizontal: 8.5
    },
    iconDitits: {
        width: 25,
        height: 25,
        alignItems: 'flex-start',
    }



})