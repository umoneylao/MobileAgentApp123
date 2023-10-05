import React, { Component } from 'react'
import { View, StyleSheet, Modal, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { ActivityIndicator, AlertNative, HistoryComponet, DateComponnet, Notification } from '../../components'
import I18n from "react-native-i18n";
import { getHistoryLettory, searchHistoryTtanferLottery } from '../../actions/Lottery'
import { Colors } from '../../themes'
import { Appbar } from 'react-native-paper';
import moment from 'moment'



class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processCode: null,
            isLoading: false,
            getdataHistoryto: null,
            refresh: false,
            setModalVisible: false,
            checkHistory: false
        };
    }
    Loader() {
        const { infoAccount } = this.props
        if (this.props.route.params.item) {
            let phoneNumber = infoAccount.phoneNumber
            let introPhone = "856";
            if (phoneNumber.length > 0) {
                let phone = phoneNumber.substring(1, 11);
                let accountPhone = introPhone + phone;
                let processCode = this.props.route.params.item
                this.props.getHistoryLettory(accountPhone, processCode)
                this.setState({ isLoading: true, checkHistory: true })
            }
        }

    }
    componentDidMount() {
        this.Loader()
    }
    onReloadDrewData() {
        this.error10119()
    }
    error10119() {
        const { infoAccount } = this.props
        if (this.props.route.params.item) {
            let phoneNumber = infoAccount.phoneNumber
            let introPhone = "856";
            if (phoneNumber.length > 0) {
                let phone = phoneNumber.substring(1, 11);
                let accountPhone = introPhone + phone;
                let processCode = this.props.route.params.item
                this.props.getHistoryLettory(accountPhone, processCode)
                this.setState({ isLoading: true, checkHistoryNoData: true })
            }
        } else {
            alert('Not have process code')
        }
        this.refs.error10119.onClose()
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.checkHistory && this.state.isLoading) {
            switch (nextProps.actionType) {
                case 'CHECK_HISTORY_LOTTERY_SUCCESS':
                    if (nextProps.valueHistoryLettory.historyCollections.histories.length > 0) {
                        let getdataHistory = nextProps.valueHistoryLettory.historyCollections.histories
                        this.setState({ isLoading: false, checkHistory: false, getdataHistoryto: getdataHistory })
                    } else {
                        this.refs.error10119.onOpen()
                    }
                    break;
                case 'CHECK_HISTORY_LOTTERY_FAILED':
                    this.refs.error10119.onOpen()
                    this.setState({ isLoading: false })
                    break;
                default:
                    this.setState({ isLoading: true })
                    break;
            }
        }
        if (this.state.searchGethistory) {
            switch (nextProps.actionType) {
                case 'SEACRC_HISTORY_LOTTERY_TRANFER_SUCCESS':
                    if (nextProps.valueHistoryLettoryTranfer.historyCollections.histories.length > 0) {
                        let getdataHistory = nextProps.valueHistoryLettoryTranfer.historyCollections.histories
                        console.log('getdataHistory:', getdataHistory)
                        this.setState({ isLoading: false, getdataHistoryto: getdataHistory, setModalVisible: false })
                    } else {
                        this.refs.error10119.onOpen()
                    }
                    break;
                case 'SEACRC_HISTORY_LOTTERY_TRANFER_FAILED':
                    this.refs.error10119.onOpen()
                    this.setState({ isLoading: false, getdataHistoryto: null, setModalVisible: false })
                    break;
                default:
                    this.setState({ isLoading: false })
                    break;
            }

        }
        if (this.state.checkHistoryNoData) {
            this.setState({ isLoading: false, })
            switch (nextProps.actionType) {
                case 'CHECK_HISTORY_LOTTERY_SUCCESS':
                    if (nextProps.valueHistoryLettory.historyCollections.histories.length > 0) {
                        let getdataHistory = nextProps.valueHistoryLettory.historyCollections.histories
                        this.setState({ isLoading: false, checkHistoryNoData: false, getdataHistoryto: getdataHistory })
                    } else {
                        this.refs.error10119.onOpen()
                    }
                    break;
                case 'CHECK_HISTORY_LOTTERY_FAILED':
                    this.refs.error10119.onOpen()
                    this.setState({ isLoading: false })
                    break;
                default:
                    this.setState({ isLoading: true })
                    break;
            }
        }

    }
    _handleMore() {
        this.setState({ setModalVisible: true })
    }
    onClose() {
        this.setState({ setModalVisible: false })
    }
    onSearch(selectedStartDate, selectedEndDate) {

        const { infoAccount } = this.props
        let phoneNumber = infoAccount.phoneNumber
        let introPhone = "856";
        if (phoneNumber.length > 0) {
            let phone = phoneNumber.substring(1, 11);
            let accountPhone = introPhone + phone;
            if (selectedStartDate != null && selectedEndDate != null && accountPhone != null) {
                let value1 = moment(selectedStartDate).format('YYYYMMDD');
                let value2 = moment(selectedEndDate).add(1, 'day').format('YYYYMMDD');
                if (value1 >= value2) {
                    this.refs.errorSelectDate.onOpen()
                } else {
                    this.props.searchHistoryTtanferLottery(accountPhone, value1, value2);
                    this.setState({ isLoading: true, searchGethistory: true });
                }
            } else {
                AlertNative(I18n.t('selectdate'))
            }
        } else {
            AlertNative('Check your phone 030')
        }
    }
    errorSelectDate() {
        this.refs.errorSelectDate.onClose()
    }

    render() {
        const { isLoading, getdataHistoryto } = this.state
        return (
            <View style={styles.constainer}>
                {isLoading ? <ActivityIndicator /> : null}
                <Appbar.Header style={{ backgroundColor: Colors.white }}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title={I18n.t('transactionHistory')} />
                    <Appbar.Action icon="filter" color={Colors.iconColor} onPress={() => this._handleMore()} />
                </Appbar.Header>
                <View>
                    <HistoryComponet getdataHistoryto={getdataHistoryto} onReloadDrewData={() => this.onReloadDrewData()} />
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.setModalVisible}
                    onRequestClose={() => {
                        this.setState({ setModalVisible: false })
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView3}>
                            <SafeAreaView>
                                <Appbar.Header style={{ backgroundColor: Colors.white }}>
                                    <Appbar.BackAction onPress={() => this.onClose()} />
                                    <Appbar.Content title='Filter' />
                                </Appbar.Header>

                                <View style={styles.title}>
                                    <Text style={styles.txtSort}>Sort by Date</Text>
                                    <Text></Text>
                                    {/* <TouchableOpacity style={styles.txtClear} onPress={() => this.onClear()}>
                                        <Text>Clear all</Text>
                                    </TouchableOpacity> */}
                                </View>
                                <DateComponnet onSearch={(selectedStartDate, selectedEndDate) => this.onSearch(selectedStartDate, selectedEndDate)} />

                            </SafeAreaView>
                        </View>
                    </View>

                </Modal>
                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={I18n.t('10119')}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.error10119()}
                    ref='error10119'
                />
                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={I18n.t('errorSelectDate')}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.errorSelectDate()}
                    ref='errorSelectDate'
                />

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {

        isFetching: state.LotteryReducer.isFetching,
        lotteryHistory: state.LotteryReducer,
        infoAccount: state.auth.infoAccount,
        actionType: state.LotteryReducer.actionType,
        valueHistoryLettory: state.LotteryReducer.valueHistoryLettory,
        valueHistoryLettoryTranfer: state.LotteryReducer.valueHistoryLettoryTranfer,


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getHistoryLettory: (accountPhone, processCode) => { dispatch(getHistoryLettory(accountPhone, processCode)) },
        searchHistoryTtanferLottery: (accountPhone, value1, value2) => { dispatch(searchHistoryTtanferLottery(accountPhone, value1, value2)) },


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);

const styles = StyleSheet.create({
    constainer: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,

    },
    modalView3: {
        width: '100%',
        height: '100%',
        backgroundColor: "white"
    },
    center: {
        width: '80%',
        alignItems: 'center'
    },

    title: {
        width: '100%',
        height: null,
        backgroundColor: Colors.txtHeader,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center'
    },
    txtSort: {
        color: '#989898',
        fontSize: 14,
        fontWeight: '500'
    },
    txtClear: {
        color: Colors.txtUpLight,
        fontSize: 14,
        fontWeight: '500'
    }



})

