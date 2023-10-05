import React, { Component } from 'react'
import { SafeAreaView, TouchableWithoutFeedback, Keyboard, Text, View } from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Payment, ActivityIndicator } from '../../components'
import I18n from 'react-native-i18n'
import * as Constant from '../../utils/Constant'
import { Colors } from '../../themes'
import * as ConfigCode from '../../utils/ConfigCode'

class TransferScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: null,
            content: null,
            money: null,
            receiverPhone: '',
            selectedMoney: null,
            circleCheck: false,
            isListPhone: false,
            isLoading: false,
            onProcess: null
        }
    }
    onPressProcess(money, message, receiverPhone, phone, saveInfo) {
        Keyboard.dismiss()
        this.props.navigation.navigate('TransactionDetail',
            {
                money: money,
                receiverPhone: receiverPhone,
                message: message ? message :'TRANSFER NO EWLLET',
                onProcess: 'TRANSFER_NO_EWLLET',
                senderPhone: phone,
                saveInfo: saveInfo,
                processName: I18n.t('transferForCustomer'),
                processCode: ConfigCode.TRANSFER_NE2NE,//
                partnerCodeFee: 'TRANSFER_NO_EWLLET',
                selectState: 'TRANSFER_NO_EWLLET',
                checkDiscount: true//

            })
    }
    render() {
        const { isLoading } = this.state
        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                    {isLoading ? <ActivityIndicator /> : null}
                    <Payment
                        transferOtherToOtherScreen
                        txtPhone={true}
                        firstHeader='sender'
                        phoneOption
                        ref="transfer"
                        txtInput='senderPhone'
                        placeholder='enterTransferorPhone'
                        amountPlaceholder='amount'
                        txtAmount='enterAmount'
                        txtCode='inputReceiverPhoneNumber'
                        txtInputCode='inputThePhoneHere'
                        validatePhoneConst={Constant.VALIDATE_LAOS}
                        keyboardType='numeric'
                        phonePad
                        phonePlaceholder='enterTransferorPhone'
                        minAmount={3000}
                        maxLengthMoney={13}
                        maxLengthCode={13}
                        processCode={ConfigCode.TRANSFER_NE2NE}
                        maxLengthPhone={13}
                        textButton='transfer'
                        onPressProcess={(money, message, phone, receiverPhone, saveInfo) => this.onPressProcess(money, message, phone, receiverPhone, saveInfo)}
                        footerTextInput
                        tranferNotphone
                        //
                        opentHistoryPayment={true}
                        openCheckBox={true}
                    />

                </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferScreen)

