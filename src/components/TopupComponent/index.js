import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, ScrollView, Modal } from 'react-native';
import style from './styles'
import { FullNewButton, Notification, FullTextInput, Contacts, HeaderTileComponent } from '../../components'
import I18n from 'react-native-i18n'
import { Colors, Images } from '../../themes'
import { isValidated, REMOVE_FIRST_ZERO, TRIM_SPACE, ONLY_NUMBER } from '../../utils/Validate'
import * as Constant from '../../utils/Constant'
import { formatNumber } from '../../utils/Formater'
import { Appbar } from 'react-native-paper';
import CheckBox from 'react-native-modest-checkbox'
import { ListHistoryPaymentTopup } from '../../screens'
class TopupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: null,
            money: null,
            selectState: null,
            selectedMoney: '',
            ModalContact: false,
            isChecked: false,
            numberPhone: null,
            numberOder: null
        };

        // setTimeout(async () => {
        //     try {
        //         let onPhoneNumber = await AsyncStorage.getItem('phoneNumber');
        //         this.onChangeNumberValue(onPhoneNumber)
        //     } catch (e) {
        //         console.log(e);
        //     }
        // }, 1000);

    }



    onChangeNumberValue(text) {

        const { TelecomServiceScreen } = this.props
        this.setState({ numberPhone: text })
        text = text.replace(TRIM_SPACE, '');
        let errorPhone = !text || text.length < 3 || !isValidated(text, Constant.VALIDATE_PHONE) ? I18n.t('incorrectPhoneNumber') : ''
        if (!text) {
            if (TelecomServiceScreen) {
                errorPhone = I18n.t('incorrectADSLNumber')
            }
            errorPhone = I18n.t('phoneFieldIsWrong')
        } else {
            if (errorPhone) {
                this.setState({ selectState: null })

            }

            if (text.length == 13 || text.length == 12 && errorPhone == '') {
                switch (text.substring(0, 6)) {
                    case '856209':
                        this.setState({ selectState: Constant.UNITEL })
                        //this.props.onCheckinfoaccount(text)
                        this.onCheckNumber(Constant.UNITEL, text)
                        break;
                    case '856202':
                        this.setState({ selectState: Constant.ETL })
                        break;
                    case '856205':
                        this.setState({ selectState: Constant.LTC })
                        break;
                    case '856207':
                        this.setState({ selectState: Constant.TPUST })
                        break;
                    case '856309':
                        this.setState({ selectState: Constant.UNITEL })
                        //this.props.onCheckinfoaccount(text)
                        this.onCheckNumber(Constant.UNITEL, text)
                        break;
                    case '856302':
                        this.setState({ selectState: Constant.ETL })
                        break;
                    case '856305':
                        this.setState({ selectState: Constant.LTC })
                        break;
                    case '856307':
                        this.setState({ selectState: Constant.TPUST })
                        break;
                    case '856304':
                        this.setState({ selectState: Constant.UNITEL })
                        //this.props.onCheckinfoaccount(text)
                        this.onCheckNumber(Constant.UNITEL, text)
                        break;
                    default:
                        break;
                }
            }
            if (text.length == 11 || text.length == 10 && errorPhone == '') {
                switch (text.substring(0, 4)) {
                    case '0209':
                        this.setState({ selectState: Constant.UNITEL })
                        //this.props.onCheckinfoaccount(text)
                        this.onCheckNumber(Constant.UNITEL, text)
                        break;
                    case '0202':
                        this.setState({ selectState: Constant.ETL })
                        break;
                    case '0205':
                        this.setState({ selectState: Constant.LTC })
                        break;
                    case '0207':
                        this.setState({ selectState: Constant.TPUST })
                        break;
                    case '0309':
                        this.setState({ selectState: Constant.UNITEL })
                        //this.props.onCheckinfoaccount(text)
                        this.onCheckNumber(Constant.UNITEL, text)
                        break;
                    case '0302':
                        this.setState({ selectState: Constant.ETL })
                        break;
                    case '0305':
                        this.setState({ selectState: Constant.LTC })
                        break;
                    case '0307':
                        this.setState({ selectState: Constant.TPUST })
                        break;
                    case '0304':
                        this.setState({ selectState: Constant.UNITEL })
                        //this.props.onCheckinfoaccount(text)
                        this.onCheckNumber(Constant.UNITEL, text)
                        break;

                    default:
                        break;
                }
            }
            if (text.length == 10 || text.length == 9 || text.length == 8 && errorPhone == '') {
                switch (text.substring(0, 3)) {
                    case '209':
                        this.setState({ selectState: Constant.UNITEL })
                        // //this.props.onCheckinfoaccount(text)
                        if (text.length == 10) {
                            this.onCheckNumber(Constant.UNITEL, text)
                        }
                        // this.onCheckNumber(Constant.UNITEL, text)
                        break;
                    case '202':
                        this.setState({ selectState: Constant.ETL })
                        break;
                    case '205':
                        this.setState({ selectState: Constant.LTC })
                        break;
                    case '207':
                        this.setState({ selectState: Constant.TPUST })
                        break;
                    case '309':
                        this.setState({ selectState: Constant.UNITEL })
                        //this.props.onCheckinfoaccount(text)
                        this.onCheckNumber(Constant.UNITEL, text)
                        break;
                    case '302':
                        this.setState({ selectState: Constant.ETL })
                        break;
                    case '305':
                        this.setState({ selectState: Constant.LTC })
                        break;
                    case '307':
                        this.setState({ selectState: Constant.TPUST })
                        break;
                    case '304':
                        this.setState({ selectState: Constant.UNITEL })
                        //this.props.onCheckinfoaccount(text)
                        this.onCheckNumber(Constant.UNITEL, text)
                        break;

                    default:
                        break;
                }
            }
            if (text.length == 8 && errorPhone == '') {
                switch (text.substring(0, 1)) {
                    case '9':
                        this.setState({ selectState: Constant.UNITEL })
                        //this.props.onCheckinfoaccount(text)
                        this.onCheckNumber(Constant.UNITEL, text)
                        break;
                    case '2':
                        this.setState({ selectState: Constant.ETL })
                        break;
                    case '5':
                        this.setState({ selectState: Constant.LTC })
                        break;
                    case '7':
                        this.setState({ selectState: Constant.TPUST })
                        break;

                    default:
                        break;
                }
            }
        }

        this.setState({ phone: text, errorPhone })
    }
    onCheckAccount = () => {
        const { numberPhone, selectState, errorPhone } = this.state
        const { processCode } = this.props
        if (selectState == Constant.UNITEL && !errorPhone && !processCode) {
            this.props.onCheckinfoaccount(numberPhone)
            this.setState({ numberOder: numberPhone })
        }
    }

    onPressSetDebtsett(text) {
        text != null ? this.onChangeAmount(text) : null

    }
    onChangeAmount(text) {
        const { minAmount } = this.props;
        let errorMoney = !text || text.length < 1 ||
            !isValidated(text, Constant.VALIDATE_MONEY) ? I18n.t('incorrectMoneyCode') : null;
        text = text.replace(REMOVE_FIRST_ZERO, '');
        text = text.replace(TRIM_SPACE, '');
        text = text.replace(ONLY_NUMBER, '');
        text === '0' ? (text = '') : text;
        let tempText = text;
        let mMoney = parseInt(tempText.replace(/,/g, ''));
        if (minAmount) {
            if (mMoney < minAmount) {
                errorMoney = I18n.t('amountMustbefrom', { amount: formatNumber(minAmount + "") });
            }
        }
        this.setState({ money: formatNumber(text.trim()), errorMoney, selectedMoney: null })
    }
    onPressUnitel = () => {
        this.setState({ selectState: Constant.UNITEL })
    }
    onPressETL = () => {
        this.setState({ selectState: Constant.ETL })
    }
    onPressLTC = () => {
        this.setState({ selectState: Constant.LTC })
    }
    onPressProcess() {
        const { phone, selectState, money, isChecked } = this.state
        let saveInfo = 0
        isChecked == true ? saveInfo = 1 : saveInfo = 0
        if (phone != "" || money != "") {
            if (selectState != null) {
                this.props.onPressProcess(phone, money, selectState, saveInfo);


            } else {
                this.setState({ alerData: I18n.t('selectSupotTopup') })
                this.refs.selectState.onOpen()
            }
        } else {
            this.setState({ alerData: I18n.t('pleaseInputToEmptyField') })
            this.refs.selectState.onOpen()
        }
    }
    onPressSetMoney(money, id) {
        this.setState({ money: money.trim(), selectedMoney: id, errorMoney: '' })
        const { numberPhone, selectState, errorPhone } = this.state
        const { customerName } = this.props
        if (!customerName) {
            if (selectState == Constant.UNITEL && !errorPhone) {
                this.props.onCheckinfoaccount(numberPhone)
                this.setState({ numberOder: numberPhone })
            }
        }

    }

    selectState() {
        this.refs.selectState.onClose()
    }
    onContact() {
        this.setState({ ModalContact: true })
    }
    goBack() {
        this.setState({ ModalContact: false })
    }
    onClearMoney() {
        this.setState({ money: null })
    }
    onClearPhone() {
        this.setState({ phone: null })
    }
    getNumberPhone(phone) {
        if (phone) {
            const str = phone.number;
            const text = str.replace(/[+]/g, '')
            this.onChangeNumberValue(text)
            console.log(text);
            this.setState({ ModalContact: false })
        } else {
            this.setState({ alerData: I18n.t('NotUsed') })
            this.refs.selectState.onOpen()
        }
    }
    onClick() {
        this.setState({ isChecked: !this.state.isChecked })
    }
    onselect(item) {
        this.onChangeNumberValue(item.entityCode)
        this.onChangeAmount(item.amount)
        this.props.onCheckinfoaccount(item.entityCode)
    }
    onCheckNumber(unitel, text) {
        const { errorPhone, numberOder } = this.state
        const { customerName } = this.props
        if (customerName) {
            if (unitel == Constant.UNITEL && errorPhone && text != numberOder) {
                this.props.onCheckinfoaccount(text)
            }
        }
    }
    render() {
        const { errorPhone, phone, selectState, errorMoney, money, selectedMoney, alerData, isChecked, numberOder } = this.state
        const { isShowMoney, amount, customerName, totalAmont, partnerCode } = this.props
        return (
            <View style={style.container}>
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    <View style={style.mainScreen}>
                        <FullTextInput
                            label={I18n.t('phone')}
                            placeholder={I18n.t('enterRegisterPhoneNumber')}
                            returnKeyType='done'
                            keyboardType='number-pad'
                            value={phone}
                            maxLength={13}
                            error={errorPhone}
                            onChangeUserName={(text) => this.onChangeNumberValue(text)}
                            iconLeft='facebook'
                            iconRight='account'
                            contact={true}
                            textError={I18n.t('incorrectPhoneNumber')}
                            onclick={() => this.onContact()}
                            onSubmitEditing={() => this.onCheckAccount()}

                        />
                    </View>
                    <View style={style.mainScreen}>
                        <View style={style.groupInputSub}>
                            <View style={[style.btnLogo, { borderColor: selectState == Constant.UNITEL ? Colors.startGradientNav : Colors.steel }]} onPress={() => this.onPressUnitel()}>
                                <Image source={Images.icUnitel} resizeMode='contain' style={[style.logo, { height: 40 }]} />
                            </View>
                            <View style={[style.btnLogo, { borderColor: selectState == Constant.ETL ? Colors.startGradientNav : Colors.steel }]} onPress={() => this.onPressETL()}>
                                <Image source={Images.icEtl} resizeMode='contain' style={[style.logo, { height: 40 }]} />
                            </View>
                            <View style={[style.btnLogo, { borderColor: selectState == Constant.LTC ? Colors.startGradientNav : Colors.steel }]} onPress={() => this.onPressLTC()}>
                                <Image source={Images.icLTC} resizeMode='contain' style={[style.logo, { height: 40 }]} />
                            </View>
                            <View style={[style.btnLogoTPLUST, { borderColor: selectState == Constant.TPUST ? Colors.startGradientNav : Colors.steel }]} onPress={() => this.onPressLTC()}>
                                <Image source={Images.logoTplus} resizeMode='contain' style={[style.logo, { height: 40 }]} />
                            </View>

                        </View>
                    </View>
                    {customerName != null && partnerCode == 'STALINE1XX' && selectState == Constant.UNITEL ? (
                        <View style={{ marginBottom: 5, top: -5 }}>
                            <View style={style.mainScreen}>
                                <FullTextInput
                                    label={I18n.t('numberContact')}
                                    placeholder={I18n.t('numberContact')}
                                    returnKeyType='done'
                                    keyboardType='number-pad'
                                    value={customerName}
                                    maxLength={50}
                                    editable={false}
                                />
                            </View>
                            <View style={style.mainScreen}>
                                <FullTextInput
                                    label={I18n.t('debtInfor')}
                                    placeholder={I18n.t('debtInfor')}
                                    returnKeyType='done'
                                    keyboardType='number-pad'
                                    value={totalAmont}
                                    maxLength={50}
                                    editable={false}

                                />
                            </View>
                        </View>
                    ) : null}
                    <View style={style.headerAmonut}>
                        <HeaderTileComponent txtHeader='amount' />
                    </View>
                    <View style={style.mainScreen}>
                        <FullTextInput
                            label={I18n.t('money')}
                            placeholder={I18n.t('enterOrChoseTheMoney')}
                            returnKeyType='done'
                            keyboardType='number-pad'
                            value={this.state.money}
                            error={errorMoney}
                            maxLength={13}
                            onChangeUserName={(text) => this.onChangeAmount(text)}
                            iconLeft='facebook'
                            iconRight='close'
                            textError={I18n.t('amountMustbefrom', { amount: '5,000' })}
                            onclick={() => this.onClearMoney()}
                            onTouchStart={() => this.onCheckAccount()}
                        />
                    </View>
                    <View style={style.mainScreen}>
                        {isShowMoney ? null
                            : (<View style={style.rowMoney} pointerEvents={this.state.visibleView ? 'none' : 'auto'}>
                                {customerName != null && partnerCode == 'STALINE1XX' ? (
                                    <View style={[style.warpButtonMoney, { alignItems: 'flex-start' }]}>
                                        <TouchableOpacity onPress={() => this.onPressSetDebtsett(totalAmont)}
                                            style={[style.buttonMoney, selectedMoney === 0 ? style.backgroundBtnMoney : style.btnMoney]}>
                                            <Text style={[style.txtMoney, selectedMoney === 0 ? style.txtMoneySelected : null]}>{I18n.t('Debtsett')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View style={[style.warpButtonMoney, { alignItems: 'flex-start' }]}>
                                        <TouchableOpacity onPress={() => this.onPressSetMoney(amount && amount[0], 0)}
                                            style={[style.buttonMoney, selectedMoney === 0 ? style.backgroundBtnMoney : style.btnMoney]}>
                                            <Text style={[style.txtMoney, selectedMoney === 0 ? style.txtMoneySelected : null]}>{amount && amount[0]}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <View style={[style.warpButtonMoney, { alignItems: 'flex-start' }]}>
                                    <TouchableOpacity onPress={() => this.onPressSetMoney(amount && amount[3], 3)}
                                        style={[style.buttonMoney, selectedMoney === 3 ? style.backgroundBtnMoney : style.btnMoney]}>
                                        <Text style={[style.txtMoney, selectedMoney === 3 ? style.txtMoneySelected : null]}>{amount && amount[3]}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={style.warpButtonMoney}>
                                    <TouchableOpacity onPress={() => this.onPressSetMoney(amount && amount[4], 4)}
                                        style={[style.buttonMoney, selectedMoney === 4 ? style.backgroundBtnMoney : style.btnMoney]}>
                                        <Text style={[style.txtMoney, selectedMoney === 4 ? style.txtMoneySelected : null]}>{amount && amount[4]}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[style.warpButtonMoney, { alignItems: 'flex-end' }]}>
                                    <TouchableOpacity onPress={() => this.onPressSetMoney(amount && amount[5], 5)}
                                        style={[style.buttonMoney, selectedMoney === 5 ? style.backgroundBtnMoney : style.btnMoney]}>
                                        <Text style={[style.txtMoney, selectedMoney === 5 ? style.txtMoneySelected : null]}>{amount && amount[5]}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>)}
                        <View>
                            <CheckBox
                                labelStyle={{ color: Colors.textColor, fontSize: 13 }}
                                checked={isChecked}
                                label={I18n.t('saveInfo')}
                                onChange={() => this.onClick()}
                                checkedImage={Images.icCheckedBox}
                                uncheckedImage={Images.icUncheckedBox}
                                checkboxStyle={{ opacity: 0.6 }}
                            />
                        </View>

                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <HeaderTileComponent txtHeader='LatestRecipients' />
                    </View>
                    <View style={{ padding: 10 }}>
                        <ListHistoryPaymentTopup processCode='571000' onselect={(item) => this.onselect(item)} serverCode='TOP' />
                    </View>
                    <View style={style.buttonCick}>
                        <View style={style.buttonOnCick}>
                            <FullNewButton
                                styles={style.btnStyle}
                                text={I18n.t('TopUp')}
                                onPress={() => this.onPressProcess()}
                                isDisable={(!phone || !money || errorMoney || errorPhone) ? true : false}
                            />
                        </View>
                    </View>

                </ScrollView>
                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={alerData}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.selectState()}
                    ref='selectState'
                />


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.ModalContact}
                    onRequestClose={() => {
                        this.setState({ ModalContact: false })
                    }}
                >
                    <View style={style.centeredView}>
                        <View style={style.modalView3}>
                            <Appbar.Header style={{ backgroundColor: Colors.white }}>
                                <Appbar.BackAction onPress={() => this.goBack()} />
                                <Appbar.Content title={I18n.t('contact')} />
                            </Appbar.Header>
                            <Contacts getNumberPhone={(phone) => this.getNumberPhone(phone)} />
                        </View>
                    </View>
                </Modal>



            </View>
        );
    }
}

export default TopupComponent;
