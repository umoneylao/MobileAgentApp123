import React, { Component } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import styles from './style'
import I18n from "react-native-i18n";
import { FullTextInput, FullNewButton } from '../index'
import { ActivityIndicator } from '../../components'
import { Colors, Images } from '../../themes'
import { isValidated } from '../../utils/Validate'
import * as Constant from '../../utils/Constant'
import * as ValidationUtils from '../../utils/Validate'
import { formatNumber } from '../../utils/Formater'

class DebtsettlementComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            Amount: null,
        };
    }
    onChangAmount(text) {

        const { minAmount, maxAmount } = this.props;
        let errorAmount = !text || text.length < 1 ||
            !isValidated(text, this.props.validateMoneyConst) ? I18n.t(`${this.props.errorMoneyMessage}`) : null;
        text = text.replace(ValidationUtils.REMOVE_FIRST_ZERO, '');
        text === '0' ? (text = '') : text;
        let tempText = text;
        let mMoney = parseInt(tempText.replace(/,/g, ''));
        if (minAmount) {
            // let checkAmount = parseInt(mMoney) % 1000
            // if (mMoney != 0) {
            //     errorAmount = I18n.t('formatMoney')
            // }
            if (mMoney < minAmount) {
                errorAmount = I18n.t('amountMustbefrom', { amount: formatNumber(minAmount + "") });
            }
            if (mMoney > maxAmount) {
                errorAmount = I18n.t('amountMax', { amount: formatNumber(maxAmount + "") });
            }
        }
        this.setState({ Amount: formatNumber(text.trim()), errorAmount, selectedMoney: null })
    }
    onPressProcess() {
        const { Amount } = this.state
        const { _getAmount, _getStaffCode, _getStaffName } = this.props
        if (!Amount && !_getAmount && !_getStaffCode && !_getStaffName) {
            alert(I18n.t('pleaseInputToEmptyField'))
        } else {
            this.props.onPressProcess(Amount, _getAmount, _getStaffCode, _getStaffName)
        }
    }
    componentDidMount() {
    }
    onClearAmount() { this.setState({ Amount: null }) }
    render() {
        const { Amount, errorAmount } = this.state
        const { getresponse, _getAmount, _getStaffCode, _getStaffName } = this.props
        // console.log('getdata', getresponse)
        return (
            <View style={styles.container}>
                {this.props.isLoading ? <ActivityIndicator /> : null}
                {
                    getresponse === '00000' ?
                        <View style={styles.container}>
                            <View>
                                <View style={styles.mainBalance}>
                                    <Text style={styles.txtMain}>{I18n.t('userInformation')}</Text>
                                </View>
                                <View style={styles.mainInfo}>
                                    <View style={styles.row}>
                                        <View style={styles.left}>
                                            <View style={styles.txtConten}>
                                                <View style={styles.contens}>
                                                    <Text>{I18n.t('thatEmployee')}</Text>
                                                </View>
                                                <View style={styles.contens}>
                                                    <Text>{I18n.t('employee')}</Text>
                                                </View>
                                                <View style={styles.contens}>
                                                    <Text>{I18n.t('debit')}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.right}>
                                            <View style={styles.txtConten}>
                                                <View style={styles.contens}>
                                                    <Text>{_getStaffCode}</Text>
                                                </View>
                                                <View style={styles.contens}>
                                                    <Text>{_getStaffName}</Text>
                                                </View>
                                                <View style={styles.contens}>
                                                    <Text>{formatNumber(_getAmount.toString())} .LAK</Text>
                                                </View>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                                <View style={styles.mainAmount}>
                                    <Text style={styles.txtMain}>{I18n.t('Amount')}</Text>
                                </View>
                                <View style={styles.FullTextInput}>
                                    <FullTextInput
                                        label={I18n.t('amount')}
                                        placeholder={I18n.t('amount')}
                                        returnKeyType='done'
                                        keyboardType='numeric'
                                        value={Amount}
                                        error={errorAmount}
                                        onChangeUserName={(text) => this.onChangAmount(text)}
                                        iconLeft='facebook'
                                        iconRight='close'
                                        textError={I18n.t('incorrectMoneyCode')}
                                        onclick={() => this.onClearAmount()}

                                    />
                                </View>
                            </View>
                            <View style={{
                                justifyContent: 'center', flex: Platform.OS === 'android' ? 0.4 : 0.6, padding: 10,
                                alignContent: 'center', alignItems: 'center', marginBottom: Platform.OS === 'android' ? 10 : 5
                            }}>
                                <FullNewButton
                                    text={I18n.t('confirm')}
                                    textStyle={styles.txtButton}
                                    onPress={() => this.onPressProcess()}
                                    isDisable={(!Amount || errorAmount) ? true : false}
                                />
                            </View>

                        </View>
                        : <View style={styles.resuledata}>
                            <Image source={Images.ic_dislike} style={styles.iconStyle} />
                            <Text>{I18n.t('noDataFound')}</Text>
                        </View>
                }
            </View >
        );
    }
}

export default DebtsettlementComponent;
DebtsettlementComponent.defaultProps = {
    errorMoneyMessage: 'incorrectMoneyCode',
    validateMoneyConst: Constant.VALIDATE_MONEY,
}
