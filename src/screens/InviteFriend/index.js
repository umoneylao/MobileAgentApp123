import React, { Component } from 'react'
import { Text, View, StatusBar, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { FullTextInput, FullButton, ActivityIndicator, AlertNative, Notification } from '../../components'
import { Colors } from '../../themes'
import I18n from 'react-native-i18n'
import * as Constant from '../../utils/Constant'
import { isValidated } from '../../utils/Validate'
import { connect } from 'react-redux'
import { getNewUser, addUser, getcheckPresentee } from '../../actions/Auth'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import DateTimePicker from 'react-native-modal-datetime-picker'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import {
    CHECK_NEW_USER_SUCCESS, CHECK_NEW_USER_FAILED,
    CHECK_ADD_USER_SUCCESS, CHECK_ADD_USER_FAILED,
    CHECK_PRESENTEE_SUCCESS, CHECK_PRESENTEE_FAILED
} from '../../actions/types'
let selectedDateDOB = moment().format('MM/YYYY');
class InviteFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: null,
            mBirthDay: new Date().getFullYear(),
            dateVisibleOnDialog: new Date(),
            isDatePicker: false,
            isLoading: false,
            checkUser: false,
            checkaddUser: false,
            onPresentee: false,
            getDate: null

        };
    }
    componentWillReceiveProps(nextProps) {
        console.log('nextProps:', nextProps.checkNewUser)
        console.log('nextProps.actionType:', nextProps.actionType)
        const { infoAccount } = this.props
        const { checkUser, isLoading, phoneNumber, checkaddUser, onPresentee } = this.state
        if (checkUser && isLoading) {

            switch (nextProps.actionType) {
                case CHECK_NEW_USER_SUCCESS:
                    if (nextProps.checkNewUser != null) {

                        let phone = nextProps.checkNewUser.item[0].presentee;
                        this.refs.txtUserisRegiter.onOpen()
                        this.setState({ checkUser: false, isLoading: false, phone, phoneNumber: phoneNumber })
                    } else {
                        this.setState({ checkUser: false, isLoading: false })
                    }
                    break;
                case CHECK_NEW_USER_FAILED:
                    let accountPhone = infoAccount.phoneNumber;
                    RequestField.clearInitField();
                    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.INVITEFRIEND))
                    RequestField.addToInitField(RequestField.addPhone(accountPhone))//34
                    RequestField.addToInitField(RequestField.addFromPhone(accountPhone))//105
                    RequestField.addToInitField(RequestField.addToPhone(phoneNumber))//106 
                    RequestField.addToInitField(RequestField.addActionNode('1'))//22
                    RequestField.addToInitField(RequestField.addEffectType('1'))//103
                    let data = RequestField.addToInitField(RequestField.addCurrencyCode(infoAccount.currencyCode))//49
                    this.props.addUser(data)
                    this.setState({ checkUser: false, isLoading: true, checkaddUser: true })
                    break;
                default:
                    break;
            }
        }
        if (checkaddUser && isLoading) {
            switch (nextProps.actionType) {
                case CHECK_ADD_USER_SUCCESS:
                    this.refs.addUserSuccess.onOpen()
                    this.setState({ isLoading: false })
                    break;
                case CHECK_ADD_USER_FAILED:
                    this.refs.thePhoneIsRegistered.onOpen()
                    this.setState({ isLoading: false, phoneNumber: phoneNumber })
                    break;

                default:
                    break;
            }
        }
        if (onPresentee && isLoading) {
            switch (nextProps.actionType) {
                case CHECK_PRESENTEE_SUCCESS:
                    if (nextProps.checkpresentee != null) {
                        console.log('nextProps.checkpresentee:', nextProps.checkpresentee)
                        let data = nextProps.checkpresentee.item;
                        this.setState({ data })
                    } else {
                        this.refs.noDataFound.onOpen()
                    }
                    this.setState({ isLoading: false })
                    break;
                case CHECK_PRESENTEE_FAILED:
                    this.refs.noDataFound.onOpen()
                    this.setState({ isLoading: false })
                    break;
                default:
                    break;
            }
        }
    }
    onChangePhone = (text) => {
        const errorPhone = !text || text.length < 1 ||
            !isValidated(text, Constant.VALIDATE_PHONE) ? I18n.t('incorrectPhoneNumber') : null
        this.setState({ phoneNumber: text, errorPhone })
    }
    onSearchPhone() {
        const { phoneNumber, checkUser } = this.state
        let info = 856
        let phoneInfo = info + phoneNumber
        if (phoneInfo != null) {
            this.setState({ checkUser: true, isLoading: true });
            this.props.getNewUser(phoneInfo);
        } else {
            this.refs.PleaseDoubleCheck.onOpen()
        }

    }
    txtUserisRegiter() { this.refs.txtUserisRegiter.onClose() }
    addUserSuccess() { this.refs.addUserSuccess.onClose() }
    thePhoneIsRegistered() { this.refs.thePhoneIsRegistered.onClose() }
    PleaseDoubleCheck() { this.refs.PleaseDoubleCheck.onClose() }
    noDataFound() { this.refs.noDataFound.onClose() }
    onCick() {
        this.setState({ isDatePicker: true })
    };
    _handleDatePicked = (date) => {
        selectedDateDOB = moment(date).format('MM/YYYY');
        this.setState({ mBirthDay: date.getFullYear(), dateVisibleOnDialog: date, isDatePicker: false })
        this._hideDateTimePicker(JSON.stringify(moment(date).format('YYYY/MM')))
        this.onSearchDate(selectedDateDOB)
    };
    _hideDateTimePicker = () => this.setState({ isDatePicker: false });
    onSearchDate(selectedDateDOB) {
        const { infoAccount } = this.props
        let info = 856
        let getPhone = infoAccount.phoneNumber;
        let phone = getPhone.substring(1, 11);
        let accountPhone = info + phone
        if (selectedDateDOB == undefined || selectedDateDOB == null || selectedDateDOB == '') {
            AlertNative(I18n.t('PleaseDoubleCheck'))
        } else {
            this.props.getcheckPresentee(accountPhone, selectedDateDOB);
            this.setState({ isLoading: true, onPresentee: true });
        }
    }
    showDateTimePicker() {
        this.setState({ isDatePicker: true })
    }
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity>
                <View style={styles.row}>
                    <View style={{ width: '15%' }}>
                        <FontAwesome name='user-circle-o' size={50} color='#DCDCDC' />
                    </View>
                    <View style={{ width: '85%' }}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.presentee}</Text>
                            {
                                (item.status) === '0' ? <Text style={styles.mblTxt1}>{I18n.t('Notactivated')}</Text> :
                                    (item.status) === '1' ? <Text style={styles.mblTxt2}>{I18n.t('Success')}</Text> :
                                        (item.status) === '-1' ? <Text style={styles.mblTxt3}>{I18n.t('Unregistered')}</Text> :
                                            <Text style={styles.mblTxt3}>{I18n.t('AlreadyRegistered')}</Text>
                            }
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.msgTxt}>{item.date_created}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    onClearPhone() { this.setState({ phoneNumber: null }) }
    render() {
        const { phoneNumber, errorPhone, isDatePicker, dateVisibleOnDialog, selectedDateDOB, data } = this.state
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                {this.state.isLoading ? <ActivityIndicator /> : null}
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                <View style={styles.container}>
                    <View>
                        <FullTextInput
                            label={I18n.t('phoneInvite')}
                            placeholder={I18n.t('phoneInvite')}
                            returnKeyType='done'
                            keyboardType='numeric'
                            value={phoneNumber}
                            error={errorPhone}
                            onChangeUserName={(text) => this.onChangePhone(text)}
                            iconLeft='facebook'
                            iconRight='close'
                            textError={I18n.t('incorrectPhoneNumber')}
                            onclick={() => this.onClearPhone()}
                        />
                    </View>
                    <View style={styles.Button}>
                        <FullButton
                            styles={styles.btnStyle}
                            onPress={() => this.onSearchPhone()}
                            isDisable={(!phoneNumber || errorPhone) ? true : false}
                            textButton={I18n.t('SendInvitation')}
                        />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.showDateTimePicker()}>
                            <Text style={{ color: Colors.textLine, textDecorationLine: 'underline', fontWeight: 'bold', }}>{I18n.t('HistoryInvite')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {data != undefined ? (
                    <View style={{ flex: 1 }}>
                        <View style={styles.txtHistory}>
                            <Text style={styles.txtDate}>{selectedDateDOB != null ? selectedDateDOB : I18n.t('SearchMonth')}</Text>
                        </View>
                        <View style={styles.flatlist}>
                            <FlatList
                                extraData={this.state}
                                data={data}
                                keyExtractor={(item) => {
                                    return item.id;
                                }}
                                renderItem={this.renderItem} />
                        </View>

                    </View>
                ) : null}
                <View>
                    <DateTimePicker
                        isVisible={isDatePicker}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                        date={dateVisibleOnDialog}
                        maximumDate={new Date()}
                        datePickerModeAndroid="spinner"
                    />
                </View>
                <Notification
                    headerType='Success'
                    title={I18n.t('info')}
                    textContent={I18n.t('txtUserisRegiter', { phoneNumber: phoneNumber })}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.txtUserisRegiter()}
                    ref='txtUserisRegiter'
                />
                <Notification
                    headerType='Success'
                    title={I18n.t('info')}
                    textContent={I18n.t('addUserSuccess')}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.addUserSuccess()}
                    ref='addUserSuccess'
                />

                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={I18n.t('thePhoneIsRegistered', { phoneNumber: phoneNumber })}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.thePhoneIsRegistered()}
                    ref='thePhoneIsRegistered'
                />

                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={I18n.t('noDataFound')}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.noDataFound()}
                    ref='noDataFound'
                />
                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={I18n.t('PleaseDoubleCheck')}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.PleaseDoubleCheck()}
                    ref='PleaseDoubleCheck'
                />

            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
        checkNewUser: state.auth.checkNewUser,
        actionType: state.auth.actionType,
        isLoading: state.auth.isLoading,
        checkpresentee: state.auth.checkpresentee
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getNewUser: (phoneInfo) => { dispatch(getNewUser(phoneInfo)) },
        addUser: (data) => { dispatch(addUser(data)) },
        getcheckPresentee: (accountPhone, selectedDateDOB) => { dispatch(getcheckPresentee(accountPhone, selectedDateDOB)) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InviteFriend)
const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    Button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 90
    },
    btnStyle: {
        width: '60%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    txtHistory: {
        backgroundColor: Colors.bgLight,
        padding: 10,
        height: null
    },
    txtDate: {

    },
    flatlist: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        width: '100%'
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '400',
        color: '#222',
        fontSize: 15,
        width: 170,
    },
    mblTxt1: {
        fontWeight: '200',
        color: Colors.blueLight,
        fontSize: 13,
    },
    mblTxt2: {
        fontWeight: '200',
        color: Colors.green,
        fontSize: 13,
    },
    mblTxt3: {
        fontWeight: '200',
        color: Colors.bloodOrange,
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#000',
        fontSize: 12,
        marginLeft: 15,
    },
})