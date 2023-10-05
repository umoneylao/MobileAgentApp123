import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Platform, Modal, SectionList, RefreshControl } from 'react-native';
import { connect } from 'react-redux'
import { formatNumber } from '../../utils/Formater'
import I18n from "react-native-i18n";
import Style from './Style'
import moment from 'moment'
import { Colors, Images, Metrics } from '../../themes'
import { CustomNavbar, Notification, DateComponnet } from '../../components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CalendarPicker from 'react-native-calendar-picker';
import LinearGradient from 'react-native-linear-gradient'
import * as Animatable from 'react-native-animatable';

import {
    HISTORY_TRANFER_SUCCESS, HISTORY_TRANFER_FAILED,
    SEARCH_HISTORY_TRANFER_FAILED, SEARCH_HISTORY_TRANFER_SUCCESS
} from '../../actions/types'
import { getHistory, searchHistoryTtanfer } from '../../actions/Auth'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LottieView from 'lottie-react-native';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            checkGethistory: false,
            listData: '',
            mBirthDay: new Date().getFullYear(),
            dateVisibleOnDialog: new Date(),
            isDatePicker: false,
            isDatePickerto: false,
            searchGethistory: false,
            lisData: [],
            startDate: null,
            endDate: null,
            refreshing: false,
            data: null,
            setModalVisibleShow: false,
            selectedStartDate: null,
            selectedEndDate: null,
            lstItem: null
        };

        this.openCalendar = this.openCalendar.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }
    onDateChange(date, type) {
        if (type === 'END_DATE') {
            this.setState({
                selectedEndDate: date,
            });
        } else {
            this.setState({
                selectedStartDate: date,
                selectedEndDate: null,
            });
        }
    }

    componentDidMount() {
        const { infoAccount } = this.props
        if (infoAccount != null) {
            let agentCode = infoAccount.accountId;
            if (agentCode != null && agentCode != "") {
                this.props.getHistory(agentCode);
                this.setState({ isLoading: true, checkGethistory: true, refreshing: true });
            }
        } else {
            alert('Time out')
        }

    }
    groupData(data) {
        const groups = data.reduce((groups, item) => {
            const date = item.dateTime.split('T')[0];
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(item);
            return groups;
        }, {});


        const groupArrays = Object.keys(groups).map((date) => {
            return {
                title: date,
                data: groups[date]
            };
        });
        this.setState({ lstItem: groupArrays })

    }
    componentWillReceiveProps(nextProps) {
        const { isLoading, checkGethistory, listData, searchGethistory } = this.state
        if (isLoading && checkGethistory) {
            switch (nextProps.actionType) {
                case HISTORY_TRANFER_SUCCESS:
                    let data = nextProps.checkHistoryTranfer.historyCollections.histories;
                    // console.log('data:', data)
                    this.setState({ data, isLoading: false, checkGethistory: false, refreshing: false })
                    this.groupData(data)
                    break;
                case HISTORY_TRANFER_FAILED:
                    this.setState({ isLoading: false, checkGethistory: false, refreshing: false })
                    break;
                default:
                    break;
            }
        }
        if (isLoading && searchGethistory) {
            switch (nextProps.actionType) {
                case SEARCH_HISTORY_TRANFER_SUCCESS:
                    let data = nextProps.searchdataHistory.historyCollections.histories;
                    this.setState({ data, refreshing: false })
                    this.groupData(data)
                    break;
                case SEARCH_HISTORY_TRANFER_FAILED:

                    this.refs.error10119.onOpen()
                    this.setState({ data, isLoading: false, refreshing: false })
                    break;
                default:
                    break;
            }
        }
    }
    onShowDetail(item) {
        console.log('item:', item)
        let dataList = []
        dataList.push({
            "transactionId": item.item.transactionId,
            "transactionName": item.item.transactionName,
            "fromPhone": item.item.fromPhone,
            "toPhone": item.item.toPhone,
            "code": item.item.code,
            "fromName": item.item.fromName,
            "toName": item.item.toName,
            "amount": item.item.amount,
            "dateTime": moment(item.item.dateTime).format('YYYY-MM-DD, H:mm'),
            "processCode":item.item.processCode
        }),
        this.props.navigation.navigate('HistoryDetail', { data: dataList })
    }
    
    onRefresh = () => {
        const { infoAccount } = this.props
        let agentCode = infoAccount.accountId;
        if (agentCode != null && agentCode != "") {
            this.props.getHistory(agentCode);
            this.setState({ isLoading: true, checkGethistory: true, refreshing: true });
        }
    }
    renderItem = (item, index) => {
        console.log('item.item.processCode:', item)
        return (
            <Animatable.View
                animation="zoomIn"
                delay={index * 100}
            >
                <TouchableOpacity onPress={() => this.onShowDetail(item)}>
                    <View style={styles.row}>
                        <View style={styles.borderIcon}>
                            {
                                (item.item.processCode) === '571000' ?
                                    <Image source={Images.iconunitel} style={styles.iconStyleHeader} /> :
                                    (item.item.processCode) === '600011' ?
                                        <Image source={Images.logo_laovietbank} style={styles.iconStyleHeader} /> :
                                        (item.item.processCode) === '010001' ?
                                            <Image source={Images.ic_RequestCash} style={styles.iconStyleHeader} /> :
                                            (item.item.processCode) === '010002' ?
                                                <Image source={Images.ic_Requestumoney} style={styles.iconStyleHeader} /> :
                                                (item.item.processCode) === '010005' ?
                                                    <Image source={Images.ic_RequestCash} style={styles.iconStyleHeader} /> :
                                                    (item.item.processCode) === '021000' ?
                                                        <Image source={Images.ic_LVIInsurance} style={styles.iconStyleHeader} /> :
                                                        (item.item.processCode) === '036001' ?
                                                            <Image source={Images.ic_SokxayLottery} style={styles.iconStyleHeader} /> :
                                                            (item.item.processCode) === '011000' ?
                                                                <Image source={Images.ic_Deposit} style={styles.iconStyleHeader} /> :
                                                                (item.item.processCode) === '021001' ?
                                                                    <Image source={Images.ic_SokxayLottery} style={styles.iconStyleHeader} /> :
                                                                    (item.item.processCode) === '573000' ?
                                                                        <Image source={Images.iconetl} style={styles.iconStyleHeader} /> :
                                                                        (item.item.processCode) === '600014' ?
                                                                            <Image source={Images.logo_bcel} style={styles.iconStyleHeader} /> :
                                                                            (item.item.processCode) === '600013' ?
                                                                                <Image source={Images.logo_jdbbank} style={styles.iconStyleHeader} /> :
                                                                                (item.item.processCode) === '579000' ?
                                                                                    <Image source={Images.iconltc} style={styles.iconStyleHeader} /> :
                                                                                    (item.item.processCode) === '037001' || (item.item.processCode) === '037101' ?
                                                                                        <Image source={Images.icNCCLottery} style={styles.iconStyleHeader} /> :
                                                                                        (item.item.processCode) === '578000' ?
                                                                                            <Image source={Images.ic_welcome} style={styles.iconStyleHeader} /> :
                                                                                            (item.item.processCode) === '039002' ?
                                                                                                <Image source={Images.ic_worldBank} style={styles.iconStyleHeader} /> :
                                                                                                (item.item.processCode) === '580000' ?
                                                                                                    <Image source={Images.iconAPA} style={styles.iconStyleHeader} /> :
                                                                                                    (item.item.processCode) === '579001' ?
                                                                                                        <Image source={Images.logoTplus} style={styles.iconStyleHeader} /> :
                                                                                                        (item.item.processCode) === '600101' ?
                                                                                                            <Image source={Images.icWaterBill} style={styles.iconStyleHeader} /> :
                                                                                                            <Image source={Images.ic_Deposit} style={styles.iconStyleHeader} />
                            }
                        </View>
                        <View style={styles.nameContainer}>
                            <View style={styles.colum}>
                                {item.item.transactionName ?  <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.item.transactionName}</Text>: null}
                               {item.item.toPhone ? <Text style={styles.nameTxt1} numberOfLines={1} ellipsizeMode="tail">{(item.item.toPhone)}</Text> : null}
                               {item.item.fromPhone ? <Text style={styles.nameTxt1} numberOfLines={1} ellipsizeMode="tail">{(item.item.fromPhone)}</Text> : null}
                                {
                                    item.item.type == 1 ? (
                                        <Text style={styles.msgTxt1}>{"+ " + formatNumber(item.item.amount)} ₭</Text>

                                    ) : (
                                        <Text style={styles.msgTxt2}>{"- " + formatNumber(item.item.amount)} ₭</Text>
                                    )
                                }
                            </View>
                            <View style={styles.colum2}>
                                <View style={styles.textDate}>
                                    <Text style={styles.msgTxt}>{moment(item.item.dateTime).format('YYYY-MM-DD H:mm:ss')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animatable.View>
        );
    }
    searchTranfer() {
        const { infoAccount } = this.props
        const { selectedDateDOB, selectedDateDOBto } = this.state
        let agentCode = infoAccount.accountId;
        if (selectedDateDOB != null && selectedDateDOBto != null && agentCode != null) {

            let value1 = moment(selectedDateDOB).format('YYYYMMDD');
            let value2 = moment(selectedDateDOBto).add(1, 'day').format('YYYYMMDD');
            if (value1 >= value2) {

                this.refs.errorSelectDate.onOpen()

            } else {
                this.props.searchHistoryTtanfer(agentCode, value1, value2);
                this.setState({ isLoading: true, searchGethistory: true, checkGethistory: false, refreshing: false });
            }
        } else {

            this.refs.selectdate.onOpen()
        }
    }

    openCalendar() {
        this.setState({ setModalVisibleShow: true })

    }
    errorSelectDate() {
        this.refs.errorSelectDate.onClose()
    }
    selectdate() {
        this.refs.selectdate.onClose()
    }
    error10119() {
        const { infoAccount } = this.props
        if (infoAccount != null) {
            let agentCode = infoAccount.accountId;
            if (agentCode != null && agentCode != "") {
                this.props.getHistory(agentCode);
                this.setState({ isLoading: true, checkGethistory: true, refreshing: true });
            }
        } else {
            alert('Time out')
        }
        this.refs.error10119.onClose()
    }

    onCloes() {
        this.setState({ setModalVisibleShow: false })
    }

    onSearch(selectedStartDate, selectedEndDate) {
        const { infoAccount } = this.props
        let agentCode = infoAccount.accountId;
        if (selectedStartDate != null && selectedEndDate != null && agentCode != null) {
            let value1 = moment(selectedStartDate).format('YYYYMMDD');
            let value2 = moment(selectedEndDate).add(1, 'day').format('YYYYMMDD');
            if (value1 >= value2) {
                this.refs.errorSelectDate.onOpen()
            } else {
                this.props.searchHistoryTtanfer(agentCode, value1, value2);
                this.setState({ isLoading: true, searchGethistory: true, checkGethistory: false, refreshing: false });
            }
        } else {
            this.refs.selectdate.onOpen()
        }
        this.setState({ setModalVisibleShow: false })
    }
    onFillter() { alert('ok') }
    render() {

        const { data, lstItem } = this.state
        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(); // Today
        const maxDate = new Date(2017, 6, 3);
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';
        return (
            <View style={{
                backgroundColor: Colors.white,
                height: Metrics.height,
                paddingTop: Platform.OS === 'ios' ? 0 : 0,
                justifyContent: 'space-between'
            }}>

                <CustomNavbar headerBackground colorText txtTitle={'HistoryLottery'} Fillter onFillter={() => this.openCalendar()} />
                {this.props.isLoading ?
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <LottieView
                            source={require('../../../assets/icBox.json')}
                            autoPlay
                            loop
                            style={[{ width: 250, height: 250, }]}
                        />
                    </View>
                    : null}
                <View style={Style.border}>
                    {lstItem ?
                        <SectionList
                            sections={this.state.lstItem}
                            keyExtractor={(item, index) => item + index}
                            renderItem={(item, index) => this.renderItem(item, index)}
                            refreshControl={
                                <RefreshControl
                                    refreshing={false}
                                    onRefresh={() => this.onRefresh()}
                                    tintColor='gray'
                                />
                            }
                            renderSectionHeader={({ section: { title } }) => (
                                <View style={styles.headerTxt}>
                                    <Text style={styles.txtHeader}>{title}</Text>
                                </View>
                            )}
                        />
                        : (
                            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <LottieView
                                    source={require('../../../assets/icBox.json')}
                                    autoPlay
                                    loop
                                    style={[{ width: 250, height: 250, }]}
                                />
                            </View>
                        )}
                </View>
                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={I18n.t('errorSelectDate')}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.errorSelectDate()}
                    ref='errorSelectDate'
                />

                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={I18n.t('selectdate')}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.selectdate()}
                    ref='selectdate'
                />

                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={I18n.t('10119')}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.error10119()}
                    ref='error10119'
                />


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.setModalVisibleShow}
                    onRequestClose={() => {
                        this.setState({ setModalVisibleShow: false })
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => this.onCloes()}>
                                <Ionicons name='ios-close-sharp' size={30} color={Colors.white} />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.textheader}>{I18n.t('pickADate')}</Text>
                            </View>
                        </View>
                        <DateComponnet onSearch={(selectedStartDate, selectedEndDate) => this.onSearch(selectedStartDate, selectedEndDate)} />
                    </View>
                </Modal>

            </View>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
        actionType: state.auth.actionType,
        isLoading: state.auth.isLoading,
        checkHistoryTranfer: state.auth.checkHistoryTranfer,
        searchdataHistory: state.auth.searchdataHistory
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getHistory: (agentCode) => { dispatch(getHistory(agentCode)) },
        searchHistoryTtanfer: (agentCode, value1, value2) => { dispatch(searchHistoryTtanfer(agentCode, value1, value2)) },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(History);
const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // borderColor: '#DCDCDC',
        backgroundColor: '#FFF',
        // borderBottomWidth: 1,
        padding: 10,
        marginHorizontal: 10,
    },
    colum: {

        width: Platform.OS === 'ios' ? '75%' : '75%',
    },
    colum2: {

        width: Platform.OS === 'ios' ? '25%' : '25%',
    },
    nameContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '400',
        color: '#222',
        fontSize: 15,
        width: 170,
    },
    nameTxt1: {
        marginLeft: Platform.OS === 'ios' ? 0 : 10,
        fontWeight: '400',
        color: Colors.iconTab,
        fontSize: 13,
        width: 170,
        marginLeft: 15,
    },
    iconStyleHeader: {
        width: 50,
        height: 50,


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
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    msgTxt: {
        fontWeight: '400',
        color: Colors.iconTab,
        fontSize: 12,
        marginLeft: 0,
        marginRight: 0,
        alignItems: 'center'

    },
    msgTxt1: {
        fontWeight: '400',
        color: Colors.green,
        fontSize: 15,
        marginLeft: 15,
    },
    msgTxt2: {
        fontWeight: '400',
        color: Colors.bloodOrange,
        fontSize: 15,
        marginLeft: 15,
    },
    textDate: {
        justifyContent: 'center',
    },
    borderIcon: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: Colors.orange,
        borderWidth: 0.5

    },
    centeredView: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        width: '100%',
        height: null,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingTop: Platform.OS === 'ios' ? 40 : 0,
        alignItems: 'center',
        backgroundColor: Colors.orange,
        paddingBottom: 10
    },
    txtHeader: {
        padding: 7,
        fontWeight: '600'
    },

    textheader: {
        fontSize: 16,
        marginHorizontal: 20,
        padding: 4,
        color: Colors.white
    },
    datefilter: {
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: Colors.bgText,
        // marginHorizontal:10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerLeft: {
        width: '50%',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    headerRight: {
        width: '50%',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textStyle: {
        backgroundColor: Colors.bgLight,
        width: '100%',
        height: 40,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    TouchableOpacity: {

        width: 140,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    LinearGradient: {
        borderRadius: 5
    },
    headerTxt: {
        width: '100%',
        height: null,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingTop: 0,
        alignItems: 'center',
        backgroundColor: Colors.txtHeader
    }

});
