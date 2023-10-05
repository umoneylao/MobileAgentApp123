import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ActivityIndicator, ChangePinComponent, Notification } from '../../components'
import { Colors } from '../../themes'
import { connect } from 'react-redux'
import * as ConfigCode from '../../utils/ConfigCode'
import * as RequestField from '../../utils/RequestField'
import { changePin } from '../../actions/Auth'
import _ from 'lodash'
import I18n from 'react-native-i18n'
import { logout } from '../../actions/Auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

class ChangePin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            CurrentPIN: null,
            NewPIN: null,
            ConfirmPIN: null,
            isLoading: false,
            isChangePIN: false,
            isSubmit: false,
            bar: 'dark-content',
            mess: null
        };

    }
    onPressChangePin(CurrentPIN, NewPIN, ConfirmPIN) {
        Keyboard.dismiss()
        const { infoAccount } = this.props
        if (NewPIN === ConfirmPIN) {
            RequestField.clearInitField()
            RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
            RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
            RequestField.addToInitField(RequestField.addPin(CurrentPIN))
            RequestField.addToInitField(RequestField.addPinNew(NewPIN))
            RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SETTING_CHANGE_PIN)) // 001002
            RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
            const data = RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
            data.fieldMap = _.orderBy(data.fieldMap, 'fieldID')
            this.setState({ isInputCurrentPin: true, isLoading: true })
            this.props.changePin(data)
            RequestField.clearInitField()
        } else {
            this.refs.PinSame.onOpen()
        }
    }
    componentWillReceiveProps(nextProps) {
        const { NewPIN } = this.state
        if (this.state.isInputCurrentPin && !nextProps.isFetching) {
            try {
                switch (nextProps.responseCode) {
                    case '00000':
                        switch (nextProps.actionType) {
                            case 'CHANGE_PIN_SUCCESS':
                                this.setRemberTouch(NewPIN);
                                this.refs.changePinSuccessfully.onOpen()
                                this.setState({ isInputCurrentPin: false, isLoading: false })
                                break;
                            case 'CHANGE_PIN_FAILED':
                                this.refs.transactionIsUnsuccessful.onOpen()
                                this.setState({ isInputCurrentPin: false, isLoading: false, mess: nextProps.responseDescription })
                                break;
                            default:
                                break;
                        }
                        break;
                    case 10155:
                        this.refs.transactionIsUnsuccessful.onOpen()
                        this.setState({ isInputCurrentPin: false, isLoading: false, mess: I18n.t('10155') })
                        break;
                    case 10156:
                        this.refs.transactionIsUnsuccessful.onOpen()
                        this.setState({ isInputCurrentPin: false, isLoading: false, mess: I18n.t('10156') })
                        break;
                    case 10175:
                        this.refs.transactionIsUnsuccessful.onOpen()
                        this.setState({ isInputCurrentPin: false, isLoading: false, mess: I18n.t('10175') })
                        break;
                    case nextProps.responseCode:
                        this.refs.transactionIsUnsuccessful.onOpen()
                        this.setState({ isInputCurrentPin: false, isLoading: false, mess: I18n.t('10157') })
                        break;
                    default:
                        break;
                }
            } catch (error) {
                this.refs.transactionIsUnsuccessful.onOpen()
                this.setState({ isInputCurrentPin: false, isLoading: false, mess: 'Error chaeng PIN !' })
            }
        }
    }
    async setRemberTouch(NewPIN) {
        await AsyncStorage.setItem('_getPin', NewPIN)
    }
    changePinSuccessfully() {
        this.refs.changePinSuccessfully.onClose()
        this.props.onLogOut()
    }
    transactionIsUnsuccessful() {
        this.refs.transactionIsUnsuccessful.onClose()
    }
    onPressSystemBusy() {
        this.refs.NotificationSystemBusy.onClose()
    }
    PinSame() {
        this.refs.PinSame.onClose()
    }
    render() {
        const { mess } = this.state
        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
                    {this.state.isLoading ? <ActivityIndicator /> : null}
                    <ChangePinComponent
                        onPressChangePin={(CurrentPIN, NewPIN, ConfirmPIN) => this.onPressChangePin(CurrentPIN, NewPIN, ConfirmPIN)}
                    />
                    <Notification
                        headerType='Success'
                        title={I18n.t('info')}
                        textContent={I18n.t('changePinSuccessfully')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.changePinSuccessfully()}
                        ref='changePinSuccessfully'
                    />
                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={mess}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.transactionIsUnsuccessful()}
                        ref='transactionIsUnsuccessful'
                    />
                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('systemBusy')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.onPressSystemBusy()}
                        ref='NotificationSystemBusy'
                    />

                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('PinSame')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.PinSame()}
                        ref='PinSame'
                    />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
});
const mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching,
        infoAccount: state.auth.infoAccount,
        changePinData: state.auth.changePinData,
        responseCode: state.auth.responseCode,
        responseDescription: state.auth.responseDescription,
        actionType: state.auth.actionType,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changePin: (language) => { dispatch(changePin(language)) },
        onLogOut: (phoneNumber) => dispatch(logout(phoneNumber)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePin);

