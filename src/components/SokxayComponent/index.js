import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity, Image, Dimensions, FlatList, StatusBar } from 'react-native';
import styles from './style'
import { FullTextInput, CardView, FullNewButton, SetModalComponent } from '../index'
// import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import I18n from 'react-native-i18n'
import { Metrics, Colors } from '../../themes'
import { isValidated, TRIM_SPACE } from '../../utils/Validate'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Constant from '../../utils/Constant'
import { formatToDDMMYYYY } from '../../utils/Formater'
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import Modal from 'react-native-modal';
import { splitResponseCollinsCharacter, splitResponseCommaCharacter } from "../../utils/Validate";
import { baseUpload } from '../../utils/Api';
const { width, height } = Dimensions.get('window')

const ListWiner = [
    { id: '1', value: 'SOKXAY', name: 'sokxayService' },
    { id: '2', value: 'NCC', name: 'NCCLottery' },
]

class SokxayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorTxnId: '',
            bill: '',
            errorBill: '',
            tran_status: '',
            isStartDateVisible: false,
            isToDateVisible: false,
            startDate: '',
            toDate: '',
            fullStartDate: '',
            fullToDate: '',
            validateDate: false,
            errorPhone: '',
            phone: '',
            errorAddress: '',
            address: '',
            cusName: '',
            errorCusName: '',
            image_url: null,
            detail: '',
            errorTransNoteMessage: '',
            valueStatus: null,
            idStatus: '',
            valuePaycode: null,
            setModalVisibleListWinner: false
        };

    }
    componentDidMount() {
        const { data } = this.props
        if (data != null) {
            var date = new Date();
            var start_date = moment().subtract(10, 'd').format("DD/MM/YYYY")
            var todate = moment(date).format("DD/MM/YYYY")
            this.setState({
                startDate: start_date,
                toDate: todate,
                tran_status: data[0].value,
                fullStartDate: moment().subtract(10, 'd').format("YYYYMMDD"),
                fullToDate: moment(date).format("YYYYMMDD")
            });
        }
    }

    onSetPhone(phone) {
        const errorPhone = !phone || phone.length < 1 ||
            !isValidated(phone, this.props.validatePhoneConst) ? I18n.t(`${this.props.errorPhoneMessage}`) : ''
        this.setState({ phone, errorPhone })
    }
    onChangeNumberValue(text) {
        //const { TelecomServiceScreen, AgentCashOut, TransferToAgentScreen, RequestCash, AgentRequestEMoneyScreen,  CashinforAgentBySuperAgent} = this.props
        const { phone } = this.state
        text = text.replace(TRIM_SPACE, '');
        let errorPhone = !text || text.length < 1 ||
            !isValidated(text, this.props.validatePhoneConst) ? I18n.t(`${this.props.errorPhoneMessage}`) : ''
        this.setState({ phone: text, errorPhone })
    }

    onChangeCusNameValue(text) {
        const errorCusName = !isValidated(text, this.props.validateLaoLanguage) ? I18n.t(`${this.props.errorCusNameMessage}`) : null
        this.setState({ cusName: text, errorCusName })
    }
    onChangeAddressValue(text) {
        const errorAddress = !isValidated(text, this.props.validateNonSpecialAddress) ? I18n.t(`${this.props.errorAddressMessage}`) : null
        this.setState({ address: text, errorAddress })
    }
    onChangeTransactionNote(text) {
        const errorNote = !isValidated(text, this.props.validateTransNote) ? I18n.t(`${this.props.errorTransNoteMessage}`) : null
        this.setState({ detail: text, errorNote })
    }
    onChangeBill(text) {
        const errorBill = !isValidated(text, this.props.validateBill) ? I18n.t(`${this.props.errorBillMessage}`) : null
        this.setState({ bill: text, errorBill })
    }

    onChangeTransactionValue(text) {
        const errorTxnId = !isValidated(text, this.props.validateTransaction) ? I18n.t(`${this.props.errorTransactionMessage}`) : null
        this.setState({ errorTxnId })
    }

    onPressProcess() {
        const { startDate, toDate, fullStartDate, fullToDate } = this.state
        const { processAddPhoto } = this.props
        var formatStart = moment(startDate, "DD/MM/YYYY")
        var formatToDate = moment(toDate, "DD/MM/YYYY")
        let valiDate = formatToDate.diff(formatStart, 'days');
        if (valiDate > 10 || valiDate < 0) {
            this.setState({ validateDate: true })
            return
        } else {
            this.setState({ validateDate: false })
        }
        this.props.onProcessSearch(startDate, toDate, fullStartDate, fullToDate)
    }


    // start date
    showStartDate = () => {
        setTimeout(() => {
            this.setState({ isStartDateVisible: true });
        }, 100)
    };

    hideStartDate = () => {
        setTimeout(() => {
            this.setState({ isStartDateVisible: false });
        }, 100)
    };

    handleStartDate = date => {
        var strdate = formatToDDMMYYYY(date.toString())
        this.setState({ startDate: strdate, fullStartDate: moment(date).format("YYYYMMDD") });
        this.hideStartDate();
    }

    // todate
    showToDate = () => {
        setTimeout(() => {
            this.setState({ isToDateVisible: true });
        }, 100)
    };

    hideToDate = () => {
        setTimeout(() => {
            this.setState({ isToDateVisible: false });
        }, 100)
    };

    handleToDate = date => {
        var strdate = formatToDDMMYYYY(date.toString())
        this.setState({ toDate: strdate, fullToDate: moment(date).format("YYYYMMDD") });
        this.hideToDate();
    }

    onPressUploadImage() {
        const { phone, address, cusName, detail } = this.state
        this.props.onPressUploadImage(phone, address, cusName, detail)
    }

    onPressTakePhoto() {
        this.props.onPressTakePhoto()
    }
    onPressCancel() {
        this.props.onPressCancel()
    }
    onPressGallery() {
        this.props.onPressGallery()
    }
    //get value when there is data from server by props
    getValue = (value) => {
        const timer = setTimeout(() => {

            if (value.length > 0) {
                let item = splitResponseCollinsCharacter(value);
                let getPhone = splitResponseCommaCharacter(item[0]);
                let getName = splitResponseCommaCharacter(item[1]);
                let getAddress = splitResponseCommaCharacter(item[2]);
                let getImg = splitResponseCommaCharacter(item[5]);
                let getDetail = splitResponseCommaCharacter(item[6]);
                let img_url = baseUpload + "getImage/" + getImg.toString()
                this.setState({
                    phone: getPhone.toString(),
                    cusName: getName.toString(),
                    address: getAddress.toString(),
                    detail: getDetail.toString(),
                    image_url: img_url.toString()
                });

            }
        }, 1000)
        if (this.state.phone.length > 0) {
            clearTimeout(timer)
        }
    }
    renderImage = () => {

        if (this.state.image_url != null) {
            return (
                <View style={styles.groupInput}>
                    {
                        this.props.image != null ?
                            <Image source={this.props.image} style={styles.cardImage} />
                            : <Image source={{ uri: this.state.image_url }} style={styles.cardImage} />
                    }
                </View>
            )
        } else if (this.props.image != null) {
            return (
                <View style={styles.groupInput}>
                    {/* <CardView style={styles.cardImageContainer}> */}
                    <Image source={this.props.image} style={styles.cardImage} />
                    {/* </CardView> */}
                </View>
            )
        }
    }
    onEnterRequestForm() {
        this.setState({ modalVisibleEnterRequestForm: true })
    }
    onEnterPaycode() {
        this.setState({ modalVisible: true })
    }
    renderItemRequest(item, index) {
        return (
            <View>
                <TouchableOpacity style={styles.warpItemList} onPress={() => this.selectRequest(item.value, item.id)}>
                    <Text style={styles.txtIcon} numberOfLines={1} >{item.value}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderItemPayCode(item, index) {
        return (
            <View>
                <TouchableOpacity style={styles.warpItemList} onPress={() => this.selectPaycode(item.value, item.id)}>
                    <Text style={styles.txtIcon} numberOfLines={1} >{item.value}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    selectRequest(text, value) {

        this.setState({ modalVisibleEnterRequestForm: false, valueStatus: text })
        this.props.onChangeStatusHandler(value)
    }
    selectPaycode(text, value) {
        this.setState({ modalVisible: false, valuePaycode: text })
        this.props.onChangePaymentCode(value)
    }
    onClose() {
        this.setState({ modalVisibleEnterRequestForm: false, modalVisible: false, setModalVisibleListWinner: false })
    }
    onClearTxnId() { this.setState({ txnId: null }) }
    onClearPhone() { this.setState({ phone: null }) }
    onClearCusName() { this.setState({ cusName: null }) }
    onClearAddress() { this.setState({ address: null }) }
    onClearDetail() { this.setState({ detail: null }) }
    onSelect = () => {

        this.setState({ setModalVisibleListWinner: true })

    }
    onSelectItem = (value, name) => {
        this.props.onGetPayment(value, name)
        this.setState({ setModalVisibleListWinner: false })
    }
    render() {
        const { phone, cusName, address, errorCusName, errorAddress, errorPhone, errorTxnId, bill,
            errorBill, isStartDateVisible, startDate, toDate, isToDateVisible, tran_status, validateDate,
            detail, errorNote, valueStatus, valuePaycode } = this.state
        const { isSokxayPayment, isUploadImage, maxLengthPhone, data, txnId, status, isVisibleUpload } = this.props
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                {isSokxayPayment ?
                    <View style={styles.groupInput}>
                        <View style={styles.groupInput}>
                            <View style={styles.groupInput}>

                                <TouchableOpacity style={styles.comboboxSelect} onPress={() => this.onSelect()}>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text>{I18n.t(this.state.Ititem || 'SelectPartner')}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Ionicons name='chevron-down' size={30} color={Colors.backColor} />
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.groupInput}>
                                <FullTextInput
                                    label={I18n.t(`${this.props.textTransaction}`)}
                                    placeholder={I18n.t(`${this.props.transactionPlaceholder}`)}
                                    returnKeyType='done'
                                    keyboardType='numeric'
                                    error={errorTxnId}
                                    value={txnId}
                                    onChangeUserName={(text) => this.onChangeTransactionValue(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    textError={I18n.t('incorrectPhoneNumber')}
                                    onclick={() => this.onClearTxnId()}

                                />
                            </View>
                            <View style={styles.groupInput}>
                                <Text style={styles.txtLabel}>{I18n.t('startdate')}</Text>
                                <View style={styles.fistRowInput}>
                                    <TouchableOpacity onPress={this.showStartDate} style={styles.groupeDate}>
                                        <Text style={{ flex: 1, marginLeft: 2, color: 'black' }}>{startDate}</Text>
                                        <MaterialIcons
                                            name='date-range'
                                            size={Platform.OS === 'android' ? 30 : 30} // size:30
                                            color={Colors.activeTabIcon}
                                            style={{ marginHorizontal: Metrics.baseMargin, marginRight: -1 }} />
                                        <DateTimePicker
                                            isVisible={isStartDateVisible}
                                            onConfirm={this.handleStartDate}
                                            onCancel={this.hideStartDate}
                                            titleStyle={{ color: Colors.activeTabIcon }}
                                            date={moment(startDate, "DD/MM/YYYY").toDate()}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.groupInput}>
                                <Text style={styles.txtLabel}>{I18n.t('todate')}</Text>
                                <View style={styles.fistRowInput}>
                                    <TouchableOpacity onPress={this.showToDate} style={[styles.groupeDate, { borderBottomColor: validateDate == true ? Colors.red : Colors.activeTabIcon }]}>
                                        <Text style={{ flex: 1, marginLeft: 2, color: 'black' }}>{toDate}</Text>
                                        <MaterialIcons
                                            name='date-range'
                                            size={Platform.OS === 'android' ? 30 : 30} // size:30
                                            color={validateDate == true ? Colors.red : Colors.activeTabIcon}
                                            style={{ marginHorizontal: Metrics.baseMargin, marginRight: -1 }} />
                                        <DateTimePicker
                                            isVisible={isToDateVisible}
                                            onConfirm={this.handleToDate}
                                            onCancel={this.hideToDate}
                                            date={moment(toDate, "DD/MM/YYYY").toDate()}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {validateDate == true ? <Text allowFontScaling={false} style={styles.error}>{I18n.t('pleaseInvalidDate')}</Text> : null}
                            </View>
                            <View style={styles.groupInput}>
                                {/* <Text style={styles.txtLabel}>{I18n.t('paymentcode')}</Text> */}
                                <View style={styles.fistRowInput}>
                                    <TouchableOpacity style={styles.selectStats} onPress={() => this.onEnterPaycode()}>
                                        <View style={styles.rowType}>
                                            <Text style={styles.txtStats}>{valuePaycode != null ? valuePaycode : I18n.t('selectPayment')}</Text>
                                            <Ionicons name='chevron-down' size={25} style={{ marginRight: 10 }} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.groupInput}>
                                <View style={styles.fistRowInput}>
                                    <TouchableOpacity style={styles.selectStats} onPress={() => this.onEnterRequestForm()}>
                                        <View style={styles.rowType}>
                                            <Text style={styles.txtStats}>{valueStatus != null ? valueStatus : I18n.t('enterRequestForm')}</Text>
                                            <Ionicons name='chevron-down' size={25} style={{ marginRight: 10 }} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <FullNewButton
                                text={I18n.t(`${this.props.textButton}`)}
                                onPress={() => this.onPressProcess()}
                                textStyle={styles.txtButton}
                                isDisable={(!status || errorBill) ? true : false}
                            />
                        </View>
                    </View>
                    : null}
                {isUploadImage ?
                    <View style={{ margin: 15, justifyContent: 'center', alignContent: 'center' }}>
                        {/* {this.props.getValueItem != null ? this.getValue(this.props.getValueItem.toString()) : null} */}
                        <View style={styles.groupInput}>
                            <FullTextInput
                                label={I18n.t(`${this.props.textPhone}` || null)}
                                placeholder={I18n.t(`${this.props.phonePlaceholder}`)}
                                returnKeyType='done'
                                keyboardType='numeric'
                                value={phone}
                                error={errorPhone}
                                onChangeUserName={(text) => this.onChangeNumberValue(text)}
                                iconLeft='facebook'
                                iconRight='close'
                                textError={I18n.t(`${this.props.errorPhoneMessage}`)}
                                onclick={() => this.onClearPhone()}

                            />
                        </View>

                        <View style={styles.groupInput}>
                            {/* <Text style={styles.txtLabel}>{I18n.t(`${this.props.textCusName}` || null)}</Text> */}
                            <FullTextInput
                                label={I18n.t(`${this.props.textCusName}` || null)}
                                placeholder={I18n.t(`${this.props.cusNamePlaceholder}`)}
                                returnKeyType='done'
                                keyboardType='default'
                                value={cusName}
                                error={errorCusName}
                                onChangeUserName={(text) => this.onChangeCusNameValue(text)}
                                iconLeft='facebook'
                                iconRight='close'
                                textError={I18n.t(`${this.props.errorCusNameMessage}`)}
                                onclick={() => this.onClearCusName()}

                            />
                        </View>

                        <View style={styles.groupInput}>
                            <FullTextInput
                                label={I18n.t(`${this.props.textAddress}` || null)}
                                placeholder={I18n.t(`${this.props.addressPlaceholder}`)}
                                returnKeyType='done'
                                keyboardType='default'
                                error={errorAddress}
                                value={address}
                                onChangeUserName={(text) => this.onChangeAddressValue(text)}
                                iconLeft='facebook'
                                iconRight='close'
                                textError={I18n.t(`${this.props.errorAddressMessage}`)}
                                onclick={() => this.onClearAddress()}

                            />

                        </View>

                        <View style={styles.groupInput}>
                            <FullTextInput
                                label={I18n.t(`${this.props.detailsPlaceholder}` || null)}
                                placeholder={I18n.t(`${this.props.detailsPlaceholder}`)}
                                returnKeyType='done'
                                keyboardType='default'
                                value={detail}
                                error={errorNote}
                                onChangeUserName={(text) => this.onChangeTransactionNote(text)}
                                iconLeft='facebook'
                                iconRight='close'
                                textError={I18n.t(`${this.props.errorTransNoteMessage}`)}
                                onclick={() => this.onClearDetail()}
                            />

                        </View>
                        <View style={styles.groupInput}>
                            <View style={styles.fistRowInput}>
                                <TouchableOpacity disabled={(isVisibleUpload == 1) ? true : false} style={[styles.buttonStyle, { backgroundColor: Colors.orange }]} onPress={() => this.onPressTakePhoto()}>
                                    <Ionicons size={25} name='ios-camera' color={Colors.white} />
                                    <Text style={styles.buttonText}>{I18n.t('takePhoto')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={(isVisibleUpload == 1) ? true : false} style={[styles.buttonStyle, { backgroundColor: Colors.bloodOrange, marginLeft: 5, marginRight: 5 }]} onPress={() => this.onPressGallery()} >
                                    <Ionicons size={25} name='ios-image' color={Colors.white} style={{ marginLeft: 5 }} />
                                    <Text style={styles.buttonText}>{I18n.t('gallery')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={(isVisibleUpload == 1) ? true : false} style={[styles.buttonStyle, { backgroundColor: Colors.red }]} onPress={() => this.onPressCancel()}>
                                    <Ionicons size={25} name='ios-trash' color={Colors.white} />
                                    <Text style={styles.buttonText}>{I18n.t('cancel')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {this.props.image != null ? this.renderImage() : this.renderImage()}
                        </View>
                        <FullNewButton
                            text={I18n.t(`${this.props.textButton}`)}
                            onPress={() => this.onPressUploadImage()}
                            textStyle={styles.txtButton}
                            isDisable={(!phone || !cusName || !address || !detail || errorPhone || errorCusName || errorAddress || errorNote || isVisibleUpload == 1) ? true : false}
                        />



                    </View>
                    : null
                }

                <Modal isVisible={this.state.modalVisibleEnterRequestForm} onBackButtonPress={() => this.setState({ modalVisibleEnterRequestForm: false, pageIndex: 0 })}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.modelMain}>
                            <View style={{ padding: 30, }}>
                                <FlatList
                                    data={data}
                                    renderItem={({ item, index }) => this.renderItemRequest(item, index)}
                                    keyExtractor={(item, index) => item.id.toString()}
                                />
                            </View>
                            <TouchableOpacity style={styles.btnFooter} onPress={() => this.onClose()}>
                                <Text style={styles.label}>{I18n.t('cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.modalVisible} onBackButtonPress={() => this.setState({ modalVisible: false, pageIndex: 0 })}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.modelMain}>
                            <View style={{ padding: 30, }}>
                                <FlatList
                                    data={this.props.paycode}
                                    renderItem={({ item, index }) => this.renderItemPayCode(item, index)}
                                    keyExtractor={(item, index) => item.id.toString()}
                                />
                            </View>
                            <TouchableOpacity style={styles.btnFooter} onPress={() => this.onClose()}>
                                <Text style={styles.label}>{I18n.t('cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.setModalVisibleListWinner}
                    onRequestClose={() => {
                        this.setState({ setModalVisibleListWinner: false })
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <SetModalComponent
                            listData={ListWiner}
                            onClose={() => this.onClose()}
                            onSelectItem={(value, name) => this.onSelectItem(value, name)} />
                    </View>

                </Modal>

            </View>
        );
    }
}
export default SokxayComponent;

SokxayComponent.defaultProps = {
    validateTransaction: Constant.VALIDATE_NUMERIC,
    errorTransactionMessage: 'acceptNumber',
    validateBill: Constant.VALIDATE_NUMERIC,
    errorBillMessage: 'acceptNumber',
    validateLaoLanguage: Constant.VALIDATE_NON_SPECIAL,
    errorCusNameMessage: 'validateInputOnly',
    validateNonSpecialAddress: Constant.VALIDATE_NON_SPECIAL,
    errorAddressMessage: 'validateInputOnly',
    validatePhoneConst: Constant.VALIDATE_LAOS,
    errorPhoneMessage: 'incorrectPhoneNumber3',
    validateTransNote: Constant.VALIDATE_NON_SPECIAL,
    errorTransNoteMessage: 'validateInputOnly',
}