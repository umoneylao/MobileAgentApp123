import React, { Component } from 'react';
import { Colors, Images, Metrics } from '../../themes'
import * as Constant from '../../utils/Constant'
import * as ValidationUtils from '../../utils/Validate'
import { isValidated } from '../../utils/Validate'
import I18n from 'react-native-i18n'
import { View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { Notification, FullNewButton, FullTextInput, HeaderTileComponent } from '../../components'
import { formatNumber } from '../../utils/Formater'
import CheckBox from 'react-native-modest-checkbox'
import { ListHistoryPayment } from '../../screens'

import styles from './style'
class LaoVietBankComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BankAccount: null,
            Amount: null,
            Content: null,
            isChecked: false,
            isDataReques: null,
            statusCheckAccount: null,
            Disable: false
        };
    }
    componentDidMount() {
        const { numberAccount } = this.props
        if (numberAccount) {
            this.onChangBankAccount(numberAccount)
        }

    }
    onChangBankAccount(text) {
        const errorBankAccount = !text || text.length < 9 || text.length > 30 || !isValidated(text, this.props.validatePhoneConst) ? I18n.t('pleaseInputYourAccuontBank') : null
        this.setState({ BankAccount: text, errorBankAccount, Disable: false })
    }
    onPressProcess() {
        try {
            const { BankAccount, Amount, Content, isChecked, Disable } = this.state
            const {response}=this.props
            if (!BankAccount || !Amount) {
                this.refs.reposMess.onOpen()
                this.setState({ reposMess: I18n.t('pleaseInputToEmptyField') })
            } else {
                if (Disable && response == '00000') {
                    let saveInfo = 0
                    isChecked == true ? saveInfo = 1 : saveInfo = 0
                    this.props.onPressProcess(BankAccount, Amount, Content, saveInfo)
                } else {
                    let access = true
                    this.onCheckAccountBank(BankAccount, access)
                }

            }
        } catch (error) {
            Alert.alert(error)
        }

    }
    reposMess() { this.refs.reposMess.onClose() }
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
    onChangContent(text) {
        const errorContent = !isValidated(text, this.props.validateTransNote) ? I18n.t('enterContent') : null
        this.setState({ Content: text, errorContent })
    }
    onClick() {
        this.setState({ isChecked: !this.state.isChecked })
    }
    onGetdata(item) {
        this.setState({ BankAccount: item.entityCode, Amount: item.amount })
    }
    _renderItem(item, id) {
        return (
            <TouchableOpacity onPress={() => this.onGetdata(item)} style={{ padding: 5 }}>
                <View style={{ width: 140, height: 60, backgroundColor: '#ffff', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <Text numberOfLines={1}>{item.entityName}</Text>
                    <Text style={{ color: Colors.orange }} numberOfLines={1}>{item.entityCode}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    onClearBankAccount() { this.setState({ BankAccount: null }) }
    onClearAmount() { this.setState({ Amount: null }) }
    onClearContent() { this.setState({ Content: null }) }
    onselect = (item) => {

        this.onChangBankAccount(item.entityCode)
        this.onChangAmount(item.amount)
        this.onChangContent()
        this.onCheckAccountBank(item.entityCode)

    }
    onCheckAccountBank(text, access) {
        const { BankAccount, errorBankAccount, Amount, Content, isChecked } = this.state
        const { getAccountNo } = this.props
        if (text) {
            if (text || access) {
                let saveInfo = 0
                    isChecked == true ? saveInfo = 1 : saveInfo = 0
                
                this.props.onCheckinfoAccountBank(text, access, BankAccount, Amount, Content, saveInfo)
                this.setState({ statusCheckAccount: text, Disable: true })
            } 
        } else {
            if (BankAccount != getAccountNo && !errorBankAccount) {
                this.props.onCheckinfoAccountBank(BankAccount)
                this.setState({ statusCheckAccount: BankAccount, Disable: true })
            }
        }

    }
    render() {
        const { BankAccount, errorBankAccount, isChecked,
            Amount, errorAmount, Content,
            errorContent, reposMess, Disable } = this.state
        const { AccountBankName, response } = this.props
        //console.log('---------Disable------', Disable)
        //console.log('---------response------', response)
        return (
            <View style={{
                backgroundColor: Colors.white,
                height: Metrics.height,
            }}>
                <View style={{ padding: 0 }}>
                    <View style={styles.groupInput}>
                        <FullTextInput
                            label={I18n.t('bankAccount')}
                            placeholder={I18n.t('inputBankAccount')}
                            returnKeyType='done'
                            keyboardType='numeric'
                            value={BankAccount}
                            error={errorBankAccount}
                            maxLength={20}
                            onChangeUserName={(text) => this.onChangBankAccount(text)}
                            iconLeft='facebook'
                            iconRight='close'
                            textError={I18n.t('pleaseInputYourAccuontBank')}
                            onclick={() => this.onClearBankAccount()}
                            onSubmitEditing={() => this.onCheckAccountBank()}

                        />
                    </View>
                    {AccountBankName && response == '00000' ? (
                        <View style={styles.groupInput}>
                            <FullTextInput
                                label={I18n.t('AccountBankName')}
                                placeholder={I18n.t('inputAccountBankName')}
                                returnKeyType='done'
                                keyboardType='numeric'
                                value={AccountBankName}
                                maxLength={100}
                                iconLeft='facebook'
                                iconRight='close'
                                textError={I18n.t('pleaseInputYourAccuontBank')}
                                editable={false}

                            />
                        </View>
                    ) : null}
                    <View style={styles.groupInput}>
                        <FullTextInput
                            label={I18n.t('amount')}
                            placeholder={I18n.t('enterAmount')}
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
                            onTouchStart={() => this.onCheckAccountBank()}

                        />
                    </View>
                    <View style={styles.groupInput}>
                        <View style={styles.TextInput}>
                            <FullTextInput
                                label={I18n.t('leaveMessageTitle')}
                                placeholder={I18n.t('leaveMessage')}
                                returnKeyType='done'
                                keyboardType='default'
                                value={Content}
                                error={errorContent}
                                maxLength={30}
                                onChangeUserName={(text) => this.onChangContent(text)}
                                iconLeft='facebook'
                                iconRight='close'
                                textError={I18n.t('incorrectPhoneNumber')}
                                onclick={() => this.onClearContent()}

                            />
                        </View>
                    </View>
                    <View style={styles.groupInput}>
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
                <View><Text></Text></View>
                <View style={{ padding: 0, left: 10, marginBottom: 0 }}>
                    <ListHistoryPayment processCode={this.props.processCode} onselect={(item) => this.onselect(item)} />
                </View>

                <View style={{ padding: 10 }}>
                    <View style={{
                        justifyContent: 'flex-start',
                        flex: Platform.OS === 'android' ? 0.35 : 0.5,
                        alignItems: 'center',
                        marginBottom: Platform.OS === 'android' ? 10 : 20,
                        padding: 0,
                    }}>
                        <FullNewButton
                            text={I18n.t('confirm')}
                            styles={styles.btnStyle}
                            textStyle={styles.txtButton}
                            onPress={() => this.onPressProcess()}
                            isDisable={(!BankAccount || !Amount || errorAmount || errorBankAccount) ? true : false}
                        />
                    </View>
                </View>
                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={reposMess}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.reposMess()}
                    ref='reposMess'
                />
            </View>


        );
    }
}

export default LaoVietBankComponent;
LaoVietBankComponent.defaultProps = {
    validatePhoneConst: Constant.VALIDATE_NUMERIC,
    errorPhoneMessage: 'incorrectPhoneNumber3',
    errorMoneyMessage: 'incorrectMoneyCode',
    validateMoneyConst: Constant.VALIDATE_MONEY,
    validateTransNote: Constant.VALIDATE_NON_SPECIAL,
    errorTransNoteMessage: 'nameIsNotEmpty',

}
