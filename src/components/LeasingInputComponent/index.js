import React, { Component } from 'react';
import { Colors, Images } from '../../themes'
import * as Constant from '../../utils/Constant'
import * as ValidationUtils from '../../utils/Validate'
import { isValidated } from '../../utils/Validate'
import I18n from 'react-native-i18n'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ActivityIndicator, FullNewButton, FullTextInput, HeaderTileComponent, AlertNative } from '../../components'
import { formatNumber } from '../../utils/Formater'
import CheckBox from 'react-native-modest-checkbox'
import { ListHistoryPayment } from '../../screens'

import styles from './style'
class LeasingInputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ContractNumber: null,
            Amount: null,
            num: '',
            isDataReques: null,
            isChecked: false,
            Disable: false
        };
    }

    onPressProcess() {
        const { ContractNumber, Amount, isChecked, Disable } = this.state
        const { ContractNam } = this.props
        // console.log('ContractNam:--------', ContractNam)
        if (!ContractNumber || !Amount) {
            AlertNative(I18n.t('pleaseInputToEmptyField'))
        } else {
            if (Disable && ContractNam) {
                let saveInfo = 0
                isChecked == true ? saveInfo = 1 : saveInfo = 0
                this.props.onPressProcess(ContractNumber, Amount, saveInfo)
            } else {
                let access = true
                this.checkContractNamber(ContractNumber, access)
            }

        }
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
            if (mMoney < minAmount) {
                errorAmount = I18n.t('amountMustbefrom', { amount: formatNumber(minAmount + "") });
            }
        }
        this.setState({ Amount: formatNumber(text.trim()), errorAmount, selectedMoney: null })
    }
    changeNum(text) {
        const errorContractNumber = !text || text.length < 1 ? I18n.t('pleaseInputYourAccuontBank') : null
        this.setState({ ContractNumber: text, errorContractNumber, Disable: false })
    }
    onGetdata(item) {
        this.setState({ ContractNumber: item.entityPhone, Amount: item.amount })
    }
    _renderItem(item, id) {
        return (
            <TouchableOpacity onPress={() => this.onGetdata(item)} style={{ margin: 10 }}>
                <View style={{ width: 140, height: 60, backgroundColor: '#ffff', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                    <Text numberOfLines={1}>{item.entityName}</Text>
                    <Text style={{ color: Colors.orange }}>{item.entityPhone}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    onClick() {
        this.setState({ isChecked: !this.state.isChecked })
    }
    onClearContractNumber() { this.setState({ ContractNumber: null }) }
    onClearAmount() { this.setState({ Amount: null }) }
    onselect = (item) => {

        this.changeNum(item.entityPhone)
        this.onChangAmount(item.amount)
        this.checkContractNamber(item.entityPhone)
    }
    checkContractNamber(text, access) {
        const { ContractNumber, Amount, isChecked, errorContractNumber } = this.state
        const { ContractNo } = this.props
        if (text) {
            if (text || access) {
                let saveInfo = 0
                isChecked == true ? saveInfo = 1 : saveInfo = 0
                this.props.checkContractNamber(text, access, ContractNumber, Amount, saveInfo)
                this.setState({ Disable: true })
            }
        }
        else {
            // console.log('ContractNumber:', ContractNumber)
            // console.log('ContractNo:', ContractNo)
            // console.log('errorContractNumber:', errorContractNumber)
            if (ContractNumber != ContractNo && !errorContractNumber) {
                this.props.checkContractNamber(ContractNumber)
                this.setState({ Disable: true })
            }
        }
    }
    render() {
        const { ContractNumber, Amount, errorAmount, isChecked, errorContractNumber, Disable } = this.state
        const { ContractNam } = this.props
        return (
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                {this.props.isLoading ? <ActivityIndicator /> : null}
                <View style={styles.cardStyle}>
                    <View style={styles.groupInput}>
                        <FullTextInput
                            label={I18n.t('ContractNumber')}
                            placeholder={I18n.t('inputContractNumber')}
                            returnKeyType='done'
                            keyboardType='default'
                            value={ContractNumber}
                            error={errorContractNumber}
                            maxLength={20}
                            onChangeUserName={(text) => this.changeNum(text)}
                            iconLeft='facebook'
                            iconRight='close'
                            textError={I18n.t('inputInvalidContract')}
                            onclick={() => this.onClearContractNumber()}
                            onSubmitEditing={() => this.checkContractNamber()}

                        />
                    </View>
                    {ContractNam ? (
                        <View style={styles.groupInput}>
                            <FullTextInput
                                label={I18n.t('Owner')}
                                placeholder={I18n.t('inputContractNumber')}
                                returnKeyType='done'
                                keyboardType='default'
                                value={ContractNam}
                                maxLength={100}
                                iconLeft='facebook'
                                iconRight='close'
                                editable={false}
                            />
                        </View>
                    )
                        : null}

                    <View style={styles.groupInput}>
                        <FullTextInput
                            label={I18n.t('amount')}
                            placeholder={I18n.t('enterOrChoseTheMoney')}
                            returnKeyType='done'
                            keyboardType='numeric'
                            value={Amount}
                            error={errorAmount}
                            maxLength={13}
                            onChangeUserName={(text) => this.onChangAmount(text)}
                            iconLeft='facebook'
                            iconRight='close'
                            textError={I18n.t('amountMustbefrom', { amount: '5,000' })}
                            onclick={() => this.onClearAmount()}
                            onTouchStart={() => this.checkContractNamber()}

                        />
                    </View>
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

                <HeaderTileComponent txtHeader='LatestRecipients' />
                <View style={{ width: '100%', height: null, padding: 10 }}>
                    <ListHistoryPayment processCode={this.props.processCode} onselect={(item) => this.onselect(item)} />
                </View>

                <View style={styles.card}>
                    <FullNewButton
                        text={I18n.t('confirm')}
                        onPress={() => this.onPressProcess()}
                        textStyle={styles.txtButton}
                        isDisable={(!ContractNumber || errorContractNumber || !Amount || errorAmount) ? true : false}
                    />
                </View>


            </ScrollView>
        );
    }
}

export default LeasingInputComponent;
LeasingInputComponent.defaultProps = {
    validatePhoneConst: Constant.VALIDATE_NUMERIC,
    errorPhoneMessage: 'incorrectPhoneNumber3',
    errorMoneyMessage: 'incorrectMoneyCode',
    validateMoneyConst: Constant.VALIDATE_MONEY,
    validateTransNote: Constant.VALIDATE_NON_SPECIAL,
    errorTransNoteMessage: 'nameIsNotEmpty',

}
