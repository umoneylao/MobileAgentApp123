import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Modal } from 'react-native'
import styles from './style'
import { CardView, FullButton, TextInput } from '../../components'
import I18n from 'react-native-i18n'
import { Colors } from '../../themes'
import * as ValidationUtils from '../../utils/Validate'
import { formatNumber } from '../../utils/Formater'
import * as Constant from '../../utils/Constant'
import { isValidated } from '../../utils/Validate'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
export default class LotteryModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            SaleLottery_id: 0,
            saleLottery: 0,
            amountSale: 0,
        
        }
    }
    onOpen(data) {
        this.setState({ visible: true, data, SaleLottery_id: data.SaleLottery_id, saleLottery: data.saleLottery, amountSale: data.amountSale })
    }

    onCancel() {
        this.props.onCancel()
        this.setState({ visible: false })
    }

    onConfirm() {
        const { amountSale, SaleLottery_id, saleLottery } = this.state
        this.props.onConfirm(SaleLottery_id, amountSale, saleLottery)
        this.setState({ visible: false })
    }

    onChangeAmount = (text) => {
        const { minAmount, maxAmount } = this.props;
        let errorAmount = !isValidated(text, this.props.validateMoneyConst) ? I18n.t('enterMoney') : null;
        text = text.replace(ValidationUtils.REMOVE_FIRST_ZERO, '');
        text === '0' ? (text = '') : text;
        let tempText = text;
        let mMoney = parseInt(tempText.replace(/,/g, ''));
        if (minAmount) {
            let checkAmount = parseInt(mMoney) % 1000
            if (checkAmount != 0) {
                errorAmount = I18n.t('formatAmount')
            }
            if (mMoney < minAmount) {
                errorAmount = I18n.t('amountMustbefrom', { amount: formatNumber(minAmount + "") });
            }
            if (mMoney > maxAmount) {
                errorAmount = I18n.t('amountMax', { amount: formatNumber(maxAmount + "") });
            }
        }
        this.setState({ amountSale: formatNumber(text.trim()), errorAmount, selectedMoney: null })
    }
    render() {
        const { data, saleLottery, amountSale, errorSaleLottery, errorAmount } = this.state
        return (
            <Modal
                visible={this.state.visible}
                style={styles.centerModal}
                onRequestClose={() => { }}
                animationType='slide'
                transparent>
                <TouchableOpacity style={styles.modalContentPin} onPress={() => { }} activeOpacity={1} >
                    <View style={styles.warpDetail}>
                        <TouchableOpacity activeOpacity={1} >
                            {data
                                ? <CardView style={styles.cardDetail}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                        <Text style={styles.txtTitle}>*** {I18n.t('edit')} ***</Text>
                                    </View>
                                    <View style={styles.rowDetail}>
                                        <Text style={styles.txtLabel}>{I18n.t('numberLottery')}</Text>
                                        <View style={styles.rowDetail}>
                                            <TextInput
                                                style={{ flex: 1, color: Colors.black }}
                                                containerStyle={{ flex: 1 }}
                                                placeholder={I18n.t('enterNumberLottery')}
                                                keyboardType={'number-pad'}
                                                value={saleLottery}
                                                error={errorSaleLottery}
                                                maxLength={3}
                                                isDisable={true}
                                                editable={false}
                                                placeholderTextColor={Colors.placeholderColor}
                                                onSubmitEditing={() => {
                                                    this.setState({ errorSaleLottery: !saleLottery || errorSaleLottery ? I18n.t('errorEnterLottery') : null })
                                                }}
                                                icon={
                                                    !saleLottery ? null : !errorSaleLottery
                                                        ? <Ionicons size={20} name='md-checkmark-circle' color={Colors.green} />
                                                        : <EvilIcons size={25} name='exclamation' color={Colors.fire} />
                                                }
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.rowDetail}>
                                        <Text style={styles.txtLabel}>{I18n.t('amount')}</Text>
                                        <View style={styles.rowDetail}>
                                            <TextInput
                                                style={{ flex: 1 }}
                                                containerStyle={{ flex: 1 }}
                                                placeholder={I18n.t('enterAmount')}
                                                keyboardType={'number-pad'}
                                                value={amountSale}
                                                error={errorAmount}
                                                placeholderTextColor={Colors.placeholderColor}
                                                maxLength={13}
                                                onChangeText={(text) => this.onChangeAmount(text)}
                                                onSubmitEditing={() => {
                                                    this.setState({ errorMoney: !amountSale || errorAmount ? I18n.t('enterMoney') : null })
                                                }}
                                                icon={
                                                    !amountSale ? null : !errorAmount
                                                        ? <Ionicons size={20} name='md-checkmark-circle' color={Colors.green} />
                                                        : <EvilIcons size={25} name='exclamation' color={Colors.fire} />
                                                }
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.rowButton}>
                                        <FullButton
                                            text={I18n.t('cancel')}
                                            styles={[styles.buttonStyle, { width: '40%' }]}
                                            onPress={() => this.onCancel()}
                                        />
                                        <FullButton
                                            text={I18n.t('accept')}
                                            styles={[styles.buttonStyle, { width: '40%' }]}
                                            onPress={() => this.onConfirm()}
                                        />
                                    </View>
                                </CardView> : null}
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}

LotteryModal.defaultProps = {
    validatePhoneConst: Constant.VALIDATE_NUMERIC,
    validateMoneyConst: Constant.VALIDATE_MONEY,
    minAmount: 1000,
    maxAmount: 500000
}