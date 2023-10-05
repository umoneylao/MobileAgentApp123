import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors, Images } from '../../themes'
import { HeaderTileComponent, FullTextInput, FullNewButton } from '../../components'
import * as ValidationUtils from '../../utils/Validate'
import { isValidated } from '../../utils/Validate'
import I18n from 'react-native-i18n'
import { formatNumber } from '../../utils/Formater'
import * as Constant from '../../utils/Constant'
import CheckBox from 'react-native-modest-checkbox'
import { ListHistoryPayment } from '../../screens'

export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Branches: 'Vientiane',
            ContractNumber: '',
            isChecked: false,
            partnerCode:'PAYMENT_WATTER_NPP'
        }
    }
    onClearBranches() {

    }
    onChangeBranches(text) {
        this.setState({ Branches: text })
    }
    onChangeAmount(text) {
        const { minAmount, maxAmount } = this.props;
        let errorAmount = !text || text.length < 1 || !isValidated(text, Constant.VALIDATE_MONEY) ? '' : null;
        text = text.replace(ValidationUtils.REMOVE_FIRST_ZERO, '');
        text === '0' ? (text = '') : text;
        let tempText = text;
        let mMoney = parseInt(tempText.replace(/,/g, ''));
        if (minAmount) {
            if (mMoney < minAmount) {
                errorAmount = I18n.t('amountMustbefrom', { amount: formatNumber(minAmount + "") });
            }
        }
        this.setState({ amount: formatNumber(text.trim()), errorAmount })
    }
    onClearAmount() { this.setState({ amount: null }) }
    onPressProcess() {
        const { isChecked } = this.state
        let saveInfo = 0
        isChecked == true ? saveInfo = 1 : saveInfo = 0
        this.props.PaymentWatter(saveInfo)
    }
    ContractNumber(text) {
        let errorContractNumber = !text || text.length < 8 ||
            !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('nameIsInvalid') : null
        if (!text) {
            errorContractNumber = I18n.t('nameIsInvalid')
        }

        this.setState({ ContractNumber: text, errorContractNumber })
        if (text.length == 8) {
            this.props.onCheckAccountNpp(text)
        }
    }
    onGetName(text) {

    }
    onClearContractNumber() {
        this.setState({ ContractNumber: null })
    }
    onClick() {
        this.setState({ isChecked: !this.state.isChecked })
    }
    onselect(item) {
        this.ContractNumber(item.payAccountId)
    }
    render() {
        const { Branches, errorBranches, isChecked, errorAmount, ContractNumber, errorContractNumber, errorName, partnerCode } = this.state
        const { getAmount, getName } = this.props
        return (
            <View style={styles.contaner}>
                <HeaderTileComponent txtHeader='PaymentInformation' />
                <View style={styles.main}>
                    <View style={styles.GroupMain}>
                        <View style={styles.txtGroup}>
                            <TouchableOpacity onPress={() => this.onClearBranches()}>
                                <FullTextInput
                                    label={I18n.t('Branches')}
                                    placeholder={I18n.t('Branches')}
                                    returnKeyType='done'
                                    keyboardType='default'
                                    value={I18n.t(Branches)}
                                    error={errorBranches}
                                    maxLength={20}
                                    onChangeUserName={(text) => this.onChangeBranches(text)}
                                    iconLeft='facebook'
                                    iconRight='chevron-down'
                                    editable={false}
                                    textError={I18n.t('pleaseInputCorrectField')}
                                    onclick={() => this.onClearBranches()}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.txtGroup}>
                            <FullTextInput
                                label={I18n.t('ContractNumber')}
                                placeholder={I18n.t('inputContractNumber')}
                                returnKeyType='done'
                                keyboardType='numeric'
                                value={ContractNumber}
                                error={errorContractNumber}
                                maxLength={8}
                                onChangeUserName={(text) => this.ContractNumber(text)}
                                iconLeft='facebook'
                                iconRight='close'
                                textError={I18n.t('inputInvalidContract')}
                                onclick={() => this.onClearContractNumber()}

                            />
                        </View>
                        {
                            getName ?
                                <View style={styles.txtGroup}>
                                    <FullTextInput
                                        label={I18n.t('AccountBankName')}
                                        placeholder={I18n.t('AccountBankName')}
                                        returnKeyType='done'
                                        keyboardType='default'
                                        value={getName}
                                        error={errorName}
                                        maxLength={20}
                                        onChangeUserName={(text) => this.onGetName(text)}
                                        iconLeft='facebook'
                                        iconRight='close'
                                        editable={false}
                                        textError={I18n.t('AccountBankName')}
                                        onclick={() => this.onClearContractNumber()}

                                    />
                                </View>
                                : null
                        }
                        {
                            getAmount ?
                                <View style={styles.txtGroup}>
                                    <FullTextInput
                                        label={I18n.t('amount')}
                                        placeholder={I18n.t('enterAmount')}
                                        returnKeyType='done'
                                        keyboardType='numeric'
                                        value={getAmount}
                                        error={errorAmount}
                                        maxLength={13}
                                        onChangeUserName={(text) => this.onChangeAmount(text)}
                                        iconLeft='facebook'
                                        iconRight='close'
                                        editable={false}
                                        textError={I18n.t('enterAmount')}
                                        onclick={() => this.onClearAmount()}
                                    />
                                </View> :
                                getAmount == 0 ?
                                <View>
                                    <Text style={{color:Colors.red}}>{I18n.t('AccountWasNotFound')}</Text>
                                </View>
                                :null
                        }
                        <View style={styles.txtGroup}>
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
                    <View style={styles.GroupMain}>
                        <ListHistoryPayment processCode={this.props.processCode} onselect={(item) => this.onselect(item)} tyles={partnerCode} />
                    </View>
                </View>
                <View style={{ flex: 0.4 }}>
                    <View style={styles.bntBuy}>
                        <FullNewButton
                            text={I18n.t('txtNext')}
                            onPress={() => this.onPressProcess()}
                            isDisable={(!ContractNumber || !getAmount || errorContractNumber) ? true : false}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default index
const styles = StyleSheet.create({
    contaner: {
        flex: 1
    },
    main: {
        flex: 3,
    }, txtGroup: {
        marginBottom: 10
    },
    bntBuy: {
        padding: 10
    },
    GroupMain: {
        padding: 10,

    }
})