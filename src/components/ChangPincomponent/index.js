import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import I18n from 'react-native-i18n'
import * as Constant from '../../utils/Constant'
import { Colors, Metrics } from '../../themes'
import styles from './styles'
import { isValidated } from '../../utils/Validate'
import { connect } from 'react-redux'
import { FullNewButton, FullTextInput } from '../../components'
class ChangPincomponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            CurrentPIN: null,
            NewPIN: null,
            ConfirmPIN: null
        }
    }
    onChangCurrentPIN(text) {
        const errorCurrentPIN = !text || text.length < 6 || text.length > 8 || !isValidated(text, this.props.validatePhoneConst) ? I18n.t('pleaseInputYourCurrentPin') : null
        this.setState({ CurrentPIN: text, errorCurrentPIN })
    }
    onChangNewPIN(text) {
        const errorNewPIN = !text || text.length < 6 || text.length > 8 || !isValidated(text, this.props.validatePhoneConst) ? I18n.t('pleaseInputYourNewPin') : null
        this.setState({ NewPIN: text, errorNewPIN })
    }
    onChangConfirmPIN(text) {
        const errorConfirmPIN = !text || text.length < 6 || text.length > 8 || !isValidated(text, this.props.validatePhoneConst) ? I18n.t('pleaseConfirmYourNewPin') : null
        this.setState({ ConfirmPIN: text, errorConfirmPIN })
    }
    onPressChangePin() {
        const { CurrentPIN, NewPIN, ConfirmPIN } = this.state
        this.props.onPressChangePin(CurrentPIN, NewPIN, ConfirmPIN)
    }
    onClearCurrentPIN() { this.setState({ CurrentPIN: null }) }
    onClearNewPIN() { this.setState({ NewPIN: null }) }
    onClearConfirmPIN() { this.setState({ ConfirmPIN: null }) }
    render() {
        const { CurrentPIN, errorCurrentPIN, ConfirmPIN, errorConfirmPIN, NewPIN, errorNewPIN } = this.state;
        return (

            <View style={{
                backgroundColor: Colors.white,
                height: Metrics.height,
                justifyContent: 'space-between'
            }}>
                <View style={styles.container}>
                    <View style={styles.itemText}>
                        <FullTextInput
                            label={I18n.t('pleaseInputYourCurrentPin')}
                            placeholder={I18n.t('InputYourCurrentPin')}
                            returnKeyType='done'
                            keyboardType='numeric'
                            value={CurrentPIN}
                            secureTextEntry={true}
                            error={errorCurrentPIN}
                            maxLength={8}
                            onChangeUserName={(text) => this.onChangCurrentPIN(text)}
                            iconLeft='facebook'
                            iconRight='close'
                            textError={I18n.t('enterCorrectPin')}
                            onclick={() => this.onClearCurrentPIN()}
                        />



                    </View>
                    <View style={styles.itemText}>
                        <FullTextInput
                            label={I18n.t('InputYourNewPin')}
                            placeholder={I18n.t('pleaseInputYourNewPin')}
                            returnKeyType='done'
                            keyboardType='numeric'
                            value={NewPIN}
                            error={errorNewPIN}
                            maxLength={8}
                            secureTextEntry={true}
                            onChangeUserName={(text) => this.onChangNewPIN(text)}
                            iconLeft='facebook'
                            iconRight='close'
                            textError={I18n.t('enterCorrectPin')}
                            onclick={() => this.onClearNewPIN()}

                        />
                    </View>
                    <View style={styles.itemText}>

                        <FullTextInput
                            label={I18n.t('ConfirmYourNewPin')}
                            placeholder={I18n.t('pleaseConfirmYourNewPin')}
                            returnKeyType='done'
                            keyboardType='numeric'
                            value={ConfirmPIN}
                            secureTextEntry={true}
                            error={errorConfirmPIN}
                            maxLength={8}
                            onChangeUserName={(text) => this.onChangConfirmPIN(text)}
                            iconLeft='facebook'
                            iconRight='close'
                            textError={I18n.t('enterCorrectPin')}
                            onclick={() => this.onClearConfirmPIN()}

                        />
                    </View>
                    <View style={{top:10}}>
                        <FullNewButton
                            text={I18n.t('confirm')}
                            onPress={() => this.onPressChangePin()}
                            textStyle={styles.txtButton}
                            isDisable={(!CurrentPIN || errorCurrentPIN || !NewPIN || errorNewPIN || !ConfirmPIN || errorConfirmPIN) ? true : false}
                        />
                    </View>
                </View>
                {/* <View style={{
                    justifyContent: 'center', flex: Platform.OS === 'android' ? 0.3 : 0.5,
                    alignContent: 'center', alignItems: 'center', marginBottom: Platform.OS === 'android' ? 10 : 5
                }}>

                    <FullNewButton
                        text={I18n.t('confirm')}
                        onPress={() => this.onPressChangePin()}
                        textStyle={styles.txtButton}
                        isDisable={(!CurrentPIN || errorCurrentPIN || !NewPIN || errorNewPIN || !ConfirmPIN || errorConfirmPIN) ? true : false}
                    />
                </View> */}
            </View>

        )
    }
}
ChangPincomponent.defaultProps = {
    validatePhoneConst: Constant.VALIDATE_NUMERIC,
    validateMoneyConst: Constant.VALIDATE_MONEY,
}
export const mapStateToProps = (state) => {
    return {
        // userLogin: state.Authentication.user,
        // SokxayReducer: state.SokxayReducer
    }
}
export const mapDispatchToProps = (dispatch) => {
    return {
        // onBuyLottery: (money, pin, accountInfo, placeOfIssue) => { dispatch(buyLottery(money, pin, accountInfo, placeOfIssue)) },
        // validatePin: (getAccountInfo, pin) => { dispatch(validatePin(getAccountInfo, pin)) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangPincomponent)
