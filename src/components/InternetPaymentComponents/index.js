import React, { Component } from 'react';
import { View, Text, Keyboard } from 'react-native';
import Payment from '../Payment'
import PropTypes from 'prop-types'
import { VALIDATE_ADSL, VALIDATE_PSTN, VALIDATE_FTTH, VALIDATE_LEASED_LINE } from '../../utils/Constant';
import I18n from 'react-native-i18n'
import * as ConfigCode from '../../utils/ConfigCode'

class InternetPaymentComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    onPressButtonFirstTab(value, money, saveInfo) {
        const { firstTabPress } = this.props
        Keyboard.dismiss()
        if (firstTabPress) {
            this.props.firstTabPress(value, money, saveInfo)
        }
        
    }
    onPressButtonSecondTab(value, money, saveInfo) {
        const { secondTabPress } = this.props
        Keyboard.dismiss()
        if (secondTabPress) {
            console.log()
            this.props.secondTabPress(value, money, saveInfo)
        }
    }
    onPressButtonThirdTab(value, money, saveInfo) {
        const { thirdTabPress } = this.props
        Keyboard.dismiss()
        if (thirdTabPress) {
            this.props.thirdTabPress(value, money, saveInfo)
        }
    }
    checkinfo(text) {
        this.props.reqCheckinfo(text)
    }
    render() {
        return (
            <View>
                {this.props.gettyle == 'ADSL' ?
                    <Payment
                        TelecomServiceScreen
                        tabLabel={I18n.t(this.props.firstTabLabel)}
                        phonePlaceholder={this.props.firstTabPlaceHolder ? this.props.firstTabPlaceHolder : 'enterTheAccountNumberHere'}
                        firstHeader={this.props.firstTabTextHeaderRow}
                        validatePhoneConst={this.props.firstTabLabel === 'PSTN' ? VALIDATE_PSTN : VALIDATE_ADSL}
                        onPressProcess={(value, money, saveInfo) => this.onPressButtonFirstTab(value, money, saveInfo)} 
                        errorPhoneMessage={this.props.firstTabLabel === 'PSTN' ? 'incorrectPSTNNumber' : 'incorrectADSLNumber'}
                        textButton={this.props.firstTabTextButton}
                        isPhone
                        txtInput='paymentCode'
                        placeholder='enterTheAccountNumberHere'
                        amountPlaceholder='amount'
                        txtAmount='enterAmount'
                        maxLengthMoney={13}
                        minAmount={3000}
                        processCode={ConfigCode.PAYMENT_CHARGE_TELE_ACCOUNT}
                        isInternetService
                        maxLengthCode={9}
                        openSaveInfo={true}
                        showTextInfo={true}
                        checkinfo={(text) => this.checkinfo(text)}
                        contractName={this.props.contractName}
                        contracPhone={this.props.contracPhone}
                        partnerCode={this.props.partnerCode}
                        totalAmont={this.props.totalAmont}
                        isShowMoney={true}
                        amount={['100,000', '200,000', '300,000', '400,000', '500,000', '1,000,000']}
                        descrip={this.props.descrip}
                        openTxtCheck={true}
                        openCheckBox={true}
                       
                    /> : this.props.gettyle == 'FTTH' ?
                        (
                            <Payment
                                TelecomServiceScreen
                                phonePlaceholder={this.props.secondTabPlaceHolder ? this.props.secondTabPlaceHolder : 'enterTheAccountNumberHere'}
                                tabLabel={I18n.t(this.props.secondTabLabel)}
                                validatePhoneConst={this.props.secondTabLabel === 'leasedLine' ? VALIDATE_LEASED_LINE : VALIDATE_FTTH}
                                firstHeader={this.props.secondTabTextHeaderRow}
                                isPhone
                                maxLengthMoney={13}
                                txtInput='paymentCode'
                                placeholder='enterTheAccountNumberHere'
                                amountPlaceholder='amount'
                                txtAmount='enterAmount'
                                errorPhoneMessage={this.props.secondTabLabel === 'leasedLine' ? 'incorrectLeasedLineNumber' : 'incorrectFTTHNumber'}
                                textButton={this.props.secondTabTextButton}
                                amount={['100,000', '200,000', '300,000', '400,000', '500,000', '1,000,000']}
                                minAmount={3000}
                                processCode={ConfigCode.PAYMENT_CHARGE_TELE_ACCOUNT}
                                onPressProcess={( value, money, saveInfo) => this.onPressButtonSecondTab( value, money, saveInfo)}                                isInternetService
                                maxLengthCode={9}
                                openSaveInfo={true}
                                showTextInfo={true}
                                openCheckBox={true}
                                openTxtCheck={true}
                                checkinfo={(text) => this.checkinfo(text)}
                                contractName={this.props.contractName}
                                contracPhone={this.props.contracPhone}
                                partnerCode={this.props.partnerCode}
                                totalAmont={this.props.totalAmont}
                                isShowMoney={true}
                                descrip={this.props.descrip}
                                
                            />
                        ) : this.props.gettyle == 'LEASED_LINE' ?
                            <Payment
                                TelecomServiceScreen
                                phonePlaceholder='enterTheLeasedLineAccountNumberHere'
                                tabLabel={I18n.t('leasedLine')}
                                validatePhoneConst={VALIDATE_LEASED_LINE}
                                firstHeader={this.props.secondTabTextHeaderRow}
                                isPhone
                                txtInput='paymentCode'
                                placeholder='enterTheAccountNumberHere'
                                amountPlaceholder='amount'
                                txtAmount='enterAmount'
                                maxLengthMoney={13}
                                errorPhoneMessage='incorrectLeasedLineNumber'
                                textButton='leasedLinePaymemt'
                                amount={['100,000', '200,000', '300,000', '400,000', '500,000', '1,000,000']}
                                minAmount={3000}
                                processCode={ConfigCode.PAYMENT_CHARGE_TELE_ACCOUNT}
                                onPressProcess={(value, money, saveInfo) => this.onPressButtonThirdTab(value, money, saveInfo)}                               isInternetService
                                maxLengthCode={9}
                                openSaveInfo={true}
                                showTextInfo={true}
                                checkinfo={(text) => this.checkinfo(text)}
                                contractName={this.props.contractName}
                                contracPhone={this.props.contracPhone}
                                partnerCode={this.props.partnerCode}
                                totalAmont={this.props.totalAmont}
                                isShowMoney={true}
                                descrip={this.props.descrip}
                                openTxtCheck={true}
                                openCheckBox={true}
                            /> : null

                }


            </View>
        );
    }
}
InternetPaymentComponents.defaultProps = {
    firstTabPlaceholder: 'enterPaymentCodeHere',
    secondTabPlaceholder: 'enterPaymentCodeHere',
    firstTabTextHeaderRow: 'paymentCode',
    secondTabTextHeaderRow: 'paymentCode',
}

InternetPaymentComponents.propTypes = {
    firstTabLabel: PropTypes.string.isRequired,
    secondTabLabel: PropTypes.string.isRequired,
    firstTabTextButton: PropTypes.string.isRequired,
    secondTabTextButton: PropTypes.string.isRequired,
}
export default InternetPaymentComponents;
