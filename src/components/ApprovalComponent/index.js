import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SmallButton, Hr, FullTextInput } from '../../components'
import { Colors, Metrics, Fonts } from '../../themes'
import I18n from 'react-native-i18n'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { isValidated } from '../../utils/Validate'
import * as Constant from '../../utils/Constant'
import Modal from 'react-native-modal';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
import { formatNumber, formatToDDMMYYYY } from '../../utils/Formater'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
var today = new Date();
const listStatus = [
    {
        id: '1',
        title: 'All',
        value: ''
    },
    {
        id: '2',
        title: 'PendingVerify',
        value: '8'
    },
    {
        id: '3',
        title: 'PendingApproval',
        value: '9'
    },
    {
        id: '4',
        title: 'Approved',
        value: '10'
    },
    {
        id: '5',
        title: 'Rejected',
        value: '11'
    },
];
const listNameTransaction = [
    {
        id: '1',
        transactionName: 'SendMoneyViaBankToBank'
    },
    {
        id: '2',
        transactionName: 'WebCashDeposit'
    }
]
const listRequest = [
    {
        id: '1',
        Request: 'WebRequest',
        value: '5'
    },
    {
        id: '2',
        Request: 'RequestViaUSSD',
        value: '2'
    },
    {
        id: '3',
        Request: 'RequestviaMobile',
        value: '1'
    }
]

class ApprovalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            isDateTimePickerVisible: false,
            isDateTimePickerVisibleEnd: false,
            startDate: null,
            endDate: null,
            modalVisibleNameTransaction: false,
            modalVisibleEnterRequestForm: false,
            valuetitle: '',
            valueTransaction: null,
            valueRequest: null,
            modalDetail: false,
            getData: null,
            onrResult: null,
            statusValue: '',
            transId: '',
            Petitioner: '',
            statusValue: '',
            DateStart: '',
            DateEnd: '',
            idRequest: ''

        };
    }

    onChangeInputTransId(text) {
        const errorTransId = !text || text.length < 1 || text.length > 100 || !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ transId: text, errorTransId })
    }
    onChangeInputPetitioner(text) {
        const errorPetitioner = !text || text.length < 1 || text.length > 100 || !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ Petitioner: text, errorPetitioner })
    }
    onStatus() {
        this.setState({ modalVisible: true })
    }
    onNameTransaction() {
        this.setState({ modalVisibleNameTransaction: true })
    }
    onEnterRequestForm() {
        this.setState({ modalVisibleEnterRequestForm: true })
    }
    selectStatus(text, value) {
        this.setState({ modalVisible: false, valuetitle: value, statusValue: text })
    }
    selectTransaction(text) {
        this.setState({ modalVisibleNameTransaction: false, valueTransaction: text })
    }
    selectRequest(text, value) {
        this.setState({ modalVisibleEnterRequestForm: false, valueRequest: text, idRequest: value })
    }

    onClose() {
        this.setState({ modalVisible: false, modalVisibleNameTransaction: false, modalVisibleEnterRequestForm: false })
    }

    onSearch() {
        const { startDate, endDate, transId, statusValue, idRequest, Petitioner } = this.state
        let DateStart = startDate != null ? moment(startDate).format('YYYYMMDD') : ''
        let DateEnd = endDate != null ? moment(endDate).format('YYYYMMDD') : ''
        this.props.onPressSearchTranSaction(DateStart, DateEnd, transId, statusValue, idRequest, Petitioner)
    }
    renderItemStatus(item, index) {
        return (
            <View>
                <TouchableOpacity style={styles.warpItemList} onPress={() => this.selectStatus(item.value, item.title)}>
                    <Text style={styles.txtIcon} numberOfLines={1} >{I18n.t(item.title)}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderItemTransaction(item, index) {
        return (
            <View>
                <TouchableOpacity style={styles.warpItemList} onPress={() => this.selectTransaction(item.transactionName)}>
                    <Text style={styles.txtIcon} numberOfLines={1} >{I18n.t(item.transactionName)}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderItemRequest(item, index) {
        return (
            <View>
                <TouchableOpacity style={styles.warpItemList} onPress={() => this.selectRequest(item.Request, item.value)}>
                    <Text style={styles.txtIcon} numberOfLines={1} >{I18n.t(item.Request)}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderItemRusul(item, index) {
        return (
            <TouchableOpacity style={styles.butList} onPress={() => this.onRusul(item)} disabled={item.ACTION_STATE_ID == 9 ? false : true}>
                <View style={styles.listMain}>
                    <View style={styles.txtgroup}>
                        <Text style={styles.tietTxt}>{I18n.t('approvalTransaction')}</Text>
                        <Text>: {item.TRANSACTION_ID ? item.TRANSACTION_ID : null}</Text>
                    </View>
                    <View style={styles.txtgroup}>
                        <Text style={styles.tietTxt}>{I18n.t('fullName')}</Text>
                        <Text>: {item.CHANNEL_NAME ? item.CHANNEL_NAME : null}</Text>
                    </View>
                    <View style={styles.txtgroup}>
                        <Text style={styles.tietTxt}>{I18n.t('money')}</Text>
                        <Text>: {item.AMOUNT ? formatNumber(item.AMOUNT) : null} LAK</Text>
                    </View>
                    <View style={styles.txtgroup}>
                        <Text style={styles.tietTxt}>{I18n.t('date')}</Text>
                        <Text>: {item.DATE_CREATED ? formatToDDMMYYYY(item.DATE_CREATED) : null}</Text>
                    </View>
                    <View style={styles.txtgroup}>
                        <Text style={styles.tietTxt}>{I18n.t('Platform')}</Text>
                        <Text>: {item.ROLE_NAME ? item.ROLE_NAME : null}</Text>
                    </View>
                    <View style={styles.txtgroup}>
                        <Text style={styles.tietTxt}>{I18n.t('status')}</Text>
                        <Text style={{ color: Colors.orange }}>: {item.ACTION_STATE_NAME ? item.ACTION_STATE_NAME : null}</Text>
                    </View>
                </View>
                <Hr />
            </TouchableOpacity>



        )
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    showDateTimePickerEnd = () => {
        this.setState({ isDateTimePickerVisibleEnd: true })
    }
    hideDateTimePickerEnd = () => {
        this.setState({ isDateTimePickerVisibleEnd: false })
    }
    handleDatePicked = date => {
        this.setState({ startDate: moment(date).format('YYYY/MM/DD') })
        this.hideDateTimePicker();
    };

    handleDatePickedEnd = date => {
        this.setState({ endDate: moment(date).format('YYYY/MM/DD') })
        this.hideDateTimePickerEnd();
    };

    onRusul(item) {
        this.props.onPressToDetail(item)
    }
    onClearPhone() { this.setState({ transId: null }) }
    onClearPetitioner() { this.setState({ Petitioner: null }) }
    render() {
        date = today.getFullYear() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getDate();
        const { transId, errorTransId, errorPetitioner, Petitioner, valuetitle,
            valueTransaction, valueRequest } = this.state
        const { onrResult } = this.props
        return (
            <View style={styles.container}>
               <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={styles.cardStyle}>
                        <View style={styles.groupInput}>
                            <View style={styles.boxSeleclist1}>

                                <FullTextInput
                                    label={I18n.t('approvalTransaction')}
                                    placeholder={I18n.t('enterApprovalTransaction')}
                                    returnKeyType='done'
                                    keyboardType='numeric'
                                    value={transId}
                                    error={errorTransId}
                                    onChangeUserName={(text) => this.onChangeInputTransId(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    textError={I18n.t('someFieldIsEmptyOrInvalid')}
                                    onclick={() => this.onClearPhone()}

                                />
                            </View>
                            <View style={styles.boxSeleclist1}>

                                <FullTextInput
                                    label={I18n.t('Petitioner')}
                                    placeholder={I18n.t('enterPetitioner')}
                                    returnKeyType='done'
                                    keyboardType='numeric'
                                    value={Petitioner}
                                    error={errorPetitioner}
                                    onChangeUserName={(text) => this.onChangeInputPetitioner(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    textError={I18n.t('someFieldIsEmptyOrInvalid')}
                                    onclick={() => this.onClearPetitioner()}

                                />
                            </View>

                            <View style={styles.boxSeleclist}>
                                <Text style={styles.txtLabel}>{I18n.t('TransactionStatus')}</Text>
                                <TouchableOpacity style={styles.selectStats} onPress={() => this.onStatus()}>
                                    <View style={styles.rowType}>
                                        <Text style={styles.txtStats}>{valuetitle != '' ? I18n.t(valuetitle) : I18n.t('All')}</Text>
                                        <Ionicons name='chevron-down' size={25} style={{ marginRight: 10 }} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.boxSeleclist}>
                                <Text style={styles.txtLabel}>{I18n.t('TradingName')}</Text>
                                <TouchableOpacity style={styles.selectStats} onPress={() => this.onNameTransaction()}>
                                    <View style={styles.rowType}>
                                        <Text style={styles.txtStats}>{valueTransaction != null ? I18n.t(valueTransaction) : I18n.t('SendMoneyViaBankToBank')}</Text>
                                        <Ionicons name='chevron-down' size={25} style={{ marginRight: 10 }} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.boxSeleclist}>
                                <Text style={styles.txtLabel}>{I18n.t('RequestForm')}</Text>
                                <TouchableOpacity style={styles.selectStats} onPress={() => this.onEnterRequestForm()}>
                                    <View style={styles.rowType}>
                                        <Text style={styles.txtStats}>{valueRequest != null ? I18n.t(valueRequest) : I18n.t('enterRequestForm')}</Text>
                                        <Ionicons name='chevron-down' size={25} style={{ marginRight: 10 }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '50%' }}>
                                    <View style={styles.boxSeleclist}>
                                        <Text style={styles.txtLabel}>{I18n.t('Since')}</Text>
                                        <TouchableOpacity style={styles.selectStats} onPress={() => this.showDateTimePicker()}>
                                            <View style={styles.rowType}>
                                                <Text style={styles.txtDate}>{this.state.startDate != null ? this.state.startDate : date}</Text>
                                                <MaterialIcons name='date-range' size={25} style={{ marginRight: 10 }} />
                                            </View>
                                        </TouchableOpacity>
                                        <DateTimePicker
                                            isVisible={this.state.isDateTimePickerVisible}
                                            onConfirm={this.handleDatePicked}
                                            onCancel={this.hideDateTimePicker}
                                        />
                                    </View>
                                </View>

                                <View style={{ width: '50%' }}>
                                    <View style={styles.boxSeleclist}>
                                        <Text style={styles.txtLabel}>{I18n.t('ToDate')}</Text>
                                        <TouchableOpacity style={styles.selectStats} onPress={() => this.showDateTimePickerEnd()}>
                                            <View style={styles.rowType}>
                                                <Text style={styles.txtDate}>{this.state.endDate != null ? this.state.endDate : date}</Text>
                                                <MaterialIcons name='date-range' size={25} style={{ marginRight: 10 }} />
                                            </View>
                                        </TouchableOpacity>
                                        <DateTimePicker
                                            isVisible={this.state.isDateTimePickerVisibleEnd}
                                            onConfirm={this.handleDatePickedEnd}
                                            onCancel={this.hideDateTimePickerEnd}
                                        />
                                    </View>
                                </View>

                            </View>
                            <View style={styles.buttonStyle}>
                                <SmallButton
                                    text={I18n.t('Search')}
                                    onPress={() => this.onSearch()}
                                />

                            </View>
                        </View>
                    </View>
                    {onrResult != null ?
                        (
                            <View style={{ top: 5 }}>
                                <FlatList
                                    data={onrResult}
                                    extraData={this.state}
                                    keyExtractor={(item) => { return item.id; }}
                                    renderItem={({ item, index }) => this.renderItemRusul(item, index)}
                                />
                            </View>
                        )
                        : null}

                </ScrollView>
                <Modal isVisible={this.state.modalVisible} onBackButtonPress={() => this.setState({ modalVisible: false, pageIndex: 0 })}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.modelMain}>
                            <View style={{ padding: 30, }}>
                                <FlatList
                                    data={listStatus}
                                    renderItem={({ item, index }) => this.renderItemStatus(item, index)}
                                    keyExtractor={(item, index) => item.id.toString()}
                                />
                            </View>
                            <TouchableOpacity style={styles.btnFooter} onPress={() => this.onClose()}>
                                <Text style={styles.label}>{I18n.t('cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


                <Modal isVisible={this.state.modalVisibleNameTransaction} onBackButtonPress={() => this.setState({ modalVisibleNameTransaction: false, pageIndex: 0 })}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.modelMain}>
                            <View style={{ padding: 30, }}>
                                <FlatList
                                    data={listNameTransaction}
                                    renderItem={({ item, index }) => this.renderItemTransaction(item, index)}
                                    keyExtractor={(item, index) => item.id.toString()}
                                />
                            </View>
                            <TouchableOpacity style={styles.btnFooter} onPress={() => this.onClose()}>
                                <Text style={styles.label}>{I18n.t('cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.modalVisibleEnterRequestForm} onBackButtonPress={() => this.setState({ modalVisibleEnterRequestForm: false, pageIndex: 0 })}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.modelMain}>
                            <View style={{ padding: 30, }}>
                                <FlatList
                                    data={listRequest}
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

            </View>

        )
    }
}

export default ApprovalComponent
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    cardStyle: {
        backgroundColor: Colors.white,
    },
    modelMain: {
        backgroundColor: Colors.white,
        width: '80%',
        height: null,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    listMain: {
        padding: 10,
    },
    butList: {
        backgroundColor: Colors.white,
    },
    groupInput: {
        padding: 10
        // marginBottom: Metrics.baseMargin
    },
    txtLabel: {
        color: Colors.textInputLabelColor,
        fontSize: Fonts.size.medium
    },
    layoutCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    layoutLeft: {
        flex: 0.7,
        margin: Metrics.smallMargin,
    },
    layoutRight: {
        flex: 1,
        margin: Metrics.smallMargin,
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    txtLabel: {
        ...Fonts.style.regular,
        color: Colors.textColor,
        fontSize: Fonts.size.small,
        marginBottom: Metrics.smallMargin
    },


    rowType: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        padding: 5,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        borderRadius: 4,
        width: '100%',
        alignSelf: 'flex-end',
        marginVertical: Metrics.smallMargin
        // flex: 1
    },
    selectStats: {
        width: '100%',
        height: 55,
        borderRadius: 5,
        backgroundColor: Colors.bgLight,
        justifyContent: 'center'
    },
    txtStats: {
        padding: 5,
        left: 5
    },
    warpItemList: {
        padding: 10
    },
    boxSeleclist: {
        marginBottom: 10,
        margin: 5
    },
    boxSeleclist1: {
        margin: 5,
        height: 80
    },
    txtDate: {
        left: 15,

    },
    txtgroup: {
        flexDirection: 'row',
        padding: 5
    },
    tietTxt: {
        fontWeight: 'bold',
    },
    modalList: {
        backgroundColor: Colors.green,
        flex: 1,
    },
    title: {
        fontSize: 20, fontWeight: 'bold',
    },
    btnFooter: {
        backgroundColor: Colors.orange,
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10
    },
    label: {
        color: Colors.white,
        fontWeight: 'bold'
    }

})