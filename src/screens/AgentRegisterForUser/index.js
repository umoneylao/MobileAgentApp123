import React, { Component } from 'react'
import { Text, View, TouchableWithoutFeedback, Keyboard, StatusBar, Image, TouchableOpacity, FlatList } from 'react-native'
import { Colors, Metrics, Fonts, Images } from '../../themes'
import { ActivityIndicator, FullTextInput, SmallButton, Notification } from '../../components'
import I18n from 'react-native-i18n'
import * as Constant from '../../utils/Constant'
import { isValidated } from '../../utils/Validate'
import { connect } from 'react-redux'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import UnicodeText from '../../utils/UnicodeText'
import CircleCheckBox, { LABEL_POSITION } from '../../components/CircleCheckbox'
import styles from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal';
import { requestBccs } from '../../actions/Auth'
import { agentRegForUser } from '../../actions/Request'
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'

const items = [
    { label: 'identityCard', value: 'PPID' },
    { label: 'passportID', value: 'PPRT' },
    { label: 'familyBook', value: 'FABO' },
    { label: 'others', value: 'OTHE' }

]

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDatePicker: false,
            phoneNumber: null,
            name: null,
            ident: null,
            male: true,
            errorPhoneNumber: null,
            selectedDate: null,
            valueType: 'PPID',
            valueTypeText: I18n.t('identityCard'),
            tranDes: null,
            isNeedDisableButton: false,
            year: null,
            mBirthDay: new Date().getFullYear(),
            modalVisibleEnterRequestForm: false,
        }
    }


    componentWillMount() {
        const { params } = this.props.route;
        // console.log('params:', params)
        this.setState({ phoneNumber: params.phoneNumber })
        const bccsData = params ? params.bccsData : null;
        if (bccsData) {
            let phone = RequestField.getValueField(bccsData.fieldMap, FIELD.PHONE_NUMBER).toString()
            let tranDes = RequestField.getValueField(bccsData.fieldMap, FIELD.TRANSACTION_DESCRIPTION)
            if (tranDes) {
                let arr = tranDes.split("|")
                if (arr.length >= 6) {
                    let customerName = arr && arr[2]
                    let gender = arr && arr[6] == "F" ? false : true
                    let birthday = arr && arr[5]
                    let identityCard = arr && arr[4]
                    let transformDob;

                    let yearBirthday;
                    let year = arr[5];

                    if (birthday) {
                        transformDob = birthday
                        let arrBirthDay = birthday.split('/');
                        yearBirthday = arrBirthDay[2];

                    } else {
                        transformDob = moment().format('DD/MM/YYYY')
                        yearBirthday = new Date().getFullYear();
                    }

                    this.setState({ phoneNumber: phone, name: customerName, selectedDate: transformDob, male: gender, ident: identityCard, tranDes, mBirthDay: yearBirthday, year })
                } else {
                    console.log('Error')
                }
            }
        }
        // this.setState({phoneNumber})
    }


    _hideDateTimePicker = () => this.setState({ isDatePicker: false });
    _handleDatePicked = (date) => {
        this.setState({ selectedDate: moment(date).format('DD/MM/YYYY'), mBirthDay: date.getFullYear() })
        this._hideDateTimePicker(JSON.stringify(moment(date).format('DD/MM/YYYY')))
    };





    onChangeNumberPhone(text) {
        const { phoneNumber } = this.state
        const errorPhoneNumber = !phoneNumber || phoneNumber.length < 1 ||
            !isValidated(text, Constant.VALIDATE_PHONE) ? I18n.t('incorrectPhoneNumber') : ''
        this.setState({ phoneNumber: text, errorPhoneNumber })
    }
    onChangeName(text) {
        let errorName = !text || text.length < 1 ||
            !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('nameIsIncorrect') : ''
        if (!text) {
            errorName = I18n.t('nameIsNotEmpty')
        }
        this.setState({ name: text, errorName })
        // this.setState({ name: UnicodeText(text), errorName })
    }
    onChangeIdentify(text) {
        let errorIdent = !text || text.length < 1 || !isValidated(text, Constant.VALIDATE_IDENTIFICATION) ? I18n.t('identifyIsIncorrect') : ''
        if (!text) {
            errorIdent = I18n.t('idNotNull')
        }
        this.setState({ ident: UnicodeText(text), errorIdent })
    }
    onClearPhone() { this.setState({ phoneNumber: null }) }
    onEnterRequestForm() {
        this.setState({ modalVisibleEnterRequestForm: true })
    }

    onClose() {
        this.setState({ modalVisibleEnterRequestForm: false })
    }
    renderItemRequest(item, index) {
        return (
            <View>
                <TouchableOpacity style={styles.warpItemList} onPress={() => this.selectRequest(item.label, item.value)}>
                    <Text style={styles.txtIcon} numberOfLines={1} >{I18n.t(item.label)}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    selectRequest(text, value) {

        this.setState({ modalVisibleEnterRequestForm: false, valueType: value, idRequest: text }) //text
    }
    onClearident() { this.setState({ ident: null }) }
    onClearName() { this.setState({ name: null }) }
    mustBeOver16YearsOld() {
        this.refs.mustBeOver16YearsOld.onClose()
    }
    onData() {
        this.refs.onData.onClose()
    }

    onRegister() {
        const { phoneNumber, name, selectedDate, ident, male,
            valueType, errorPhoneNumber, errorName, errorIdent,
            mBirthDay, tranDes, year, value } = this.state
        let age = new Date().getFullYear() - mBirthDay;
        if (!phoneNumber || !name || !selectedDate || !ident || !valueType || errorPhoneNumber || errorName || errorIdent) {
            this.refs.onData.onOpen()
            return
        }
        if (age < 16) {
            this.refs.mustBeOver16YearsOld.onOpen()
            return;
        }

        this.props.navigation.navigate('TransactionDetail', {
            phoneRegister: phoneNumber,
            name: name,
            ident: ident,
            valueType: valueType,
            mBirthDay: mBirthDay,
            male: male,
            tranDes: tranDes,
            year: year,
            selectedDate: selectedDate,
            onProcess: 'AGENT_REGISTER_FOR_USER',
            processName: I18n.t('registerForCustomer'),
            partnerCodeFee: 'AGENT_REGISTER_FOR_USER',
            selectState: 'AGENT_REGISTER_FOR_USER',
            processCode: '002001'
        })
    }

    showDateTimePicker = () => {
        this.setState({ isDatePicker: true })
    }
    render() {
        const { selectedDate, male, errorPhoneNumber, phoneNumber, errorName,
            name, ident, errorIdent, valueType, valueTypeText, isLoading, isNeedDisableButton, year } = this.state

        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View style={styles.container}>
                    <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                    {isLoading ? <ActivityIndicator /> : null}
                    <View style={{ paddingHorizontal: Metrics.doubleBaseMargin, flex: 1 }}>
                        <View style={styles.TextInput}>
                            <FullTextInput
                                label={I18n.t('enterYourMobilePhoneNumber')}
                                placeholder={I18n.t('enterRegisterPhoneNumber')}
                                returnKeyType='done'
                                keyboardType='numeric'
                                value={phoneNumber}
                                maxLength={13}
                                error={errorPhoneNumber}
                                onChangeUserName={(text) => this.onChangeNumberPhone(text)}
                                iconLeft='facebook'
                                iconRight='close'
                                textError={I18n.t('incorrectPhoneNumber')}
                                onclick={() => this.onClearPhone()}
                            />
                        </View>
                        <View style={styles.TextInput, { marginBottom: 20 }}>
                            <FullTextInput
                                label={I18n.t('fullName')}
                                placeholder={I18n.t('fullName')}
                                returnKeyType='done'
                                keyboardType='default'
                                value={this.state.name}
                                maxLength={50}
                                error={errorName}
                                onChangeUserName={(text) => this.onChangeName(text)}
                                iconLeft='facebook'
                                iconRight='close'
                                textError={I18n.t('nameIsNotEmpty')}
                                onclick={() => this.onClearName()}
                            />
                        </View>
                        <View style={styles.TextInput, { marginBottom: 30 }}>
                            <View style={{ flexDirection: 'row', padding: 20, borderRadius: 3, borderWidth: 0.5, borderColor: Colors.txtIntup, }}>
                                <CircleCheckBox
                                    checked={male === true}
                                    onToggle={() => this.setState({ male: true })}
                                    labelPosition={LABEL_POSITION.RIGHT}
                                    label={I18n.t('male')}
                                    styleCheckboxContainer={{ marginRight: Metrics.marginVertical }}
                                    styleLabel={{ fontSize: Fonts.size.fifSize }}
                                    outerColor={Colors.txtColor}
                                    innerColor={Colors.blueLight}
                                    outerSize={22}
                                    filterSize={19}
                                    innerSize={14}
                                />
                                <CircleCheckBox
                                    checked={male === false}
                                    onToggle={() => this.setState({ male: false })}
                                    labelPosition={LABEL_POSITION.RIGHT}
                                    label={I18n.t('female')}
                                    styleLabel={{ fontSize: Fonts.size.fifSize }}
                                    outerColor={Colors.txtColor}
                                    innerColor={Colors.blueLight}
                                    outerSize={22}
                                    filterSize={19}
                                    innerSize={14}
                                />
                            </View>
                        </View>

                        <View style={styles.TextInput}>
                            <TouchableOpacity style={[styles.rowDate, styles.warpField]} onPress={() => this.showDateTimePicker()}>
                                <Text style={styles.txtDate}>{this.state.selectedDate}</Text>
                                <Text style={{ color: Colors.txtColor, left: -5 }}>{I18n.t('dob')}</Text>
                                <Ionicons size={25} name='calendar-sharp' color={Colors.txtColor} />
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={this.state.isDatePicker}
                                onConfirm={this._handleDatePicked}
                                onCancel={this._hideDateTimePicker}
                                datePickerModeAndroid="spinner"
                            />

                        </View>

                        <View style={styles.TextInput, { flexDirection: 'row', marginBottom: 20 }}>
                            <View style={{ width: '48%' }}>
                                <FullTextInput
                                    label={I18n.t('identificationInformation')}
                                    placeholder={I18n.t('identificationInformation')}
                                    returnKeyType='done'
                                    keyboardType='default'
                                    value={this.state.ident}
                                    maxLength={13}
                                    error={errorIdent}
                                    onChangeUserName={(text) => this.onChangeIdentify(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    textError={I18n.t('nameIsNotEmpty')}
                                    onclick={() => this.onClearident()}
                                />
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ height: null, width: '50%', padding: 5 }}>
                                <TouchableOpacity style={styles.selectStats} onPress={() => this.onEnterRequestForm()}>
                                    <Text style={styles.txtStats}>{valueType != null ? I18n.t(valueType) : I18n.t('type')}</Text>
                                    <Ionicons name='chevron-down' size={25} style={{ marginRight: 10 }} />
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <SmallButton
                                text={I18n.t('customerRegister')}
                                onPress={() => this.onRegister()}
                            />
                        </View>

                    </View>
                    <View style={styles.imgFooter}>
                        <Image source={Images.bg_footerLogin} style={styles.img} />
                    </View>

                    <Modal isVisible={this.state.modalVisibleEnterRequestForm} onBackButtonPress={() => this.setState({ modalVisibleEnterRequestForm: false, pageIndex: 0 })}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.modelMain}>
                                <View style={{ padding: 30, }}>
                                    <FlatList
                                        data={items}
                                        renderItem={({ item, index }) => this.renderItemRequest(item, index)}
                                        keyExtractor={(item, index) => item.value.toString()}
                                    />
                                </View>
                                <TouchableOpacity style={styles.btnFooter} onPress={() => this.onClose()}>
                                    <Text style={styles.label}>{I18n.t('cancel')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('mustBeOver16YearsOld')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.mustBeOver16YearsOld()}
                        ref='mustBeOver16YearsOld'
                    />
                    <Notification
                        headerType='Warning'
                        title={I18n.t('info')}
                        textContent={I18n.t('pleaseInputToEmptyField')}
                        buttonText={I18n.t('ok')}
                        isButton={true}
                        onPress={() => this.onData()}
                        ref='onData'
                    />

                </View>

            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching,
        isRegFetching: state.request.isFetching,
        isSuccess: state.auth.isSuccess,
        agentRegForUserData: state.request.agentRegForUserData,
        bccsData: state.auth.bccsData,
        infoAccount: state.auth.infoAccount,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestBccs: (data) => { dispatch(requestBccs(data)) },
        agentRegForUser: (data) => { dispatch(agentRegForUser(data)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)

