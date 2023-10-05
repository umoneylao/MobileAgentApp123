import React, { Component } from 'react';
import { View, StatusBar, SafeAreaView, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LotteryNumber from './LotteryNumber'
import AnimalSreen from './AnimalSreen'
import { Colors } from '../../themes'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { Notification, ActivityIndicator } from '../../components'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import * as FIELD from '../../utils/CoreFieldMap'
import { onGetInfoBuyNCCLottery } from '../../actions/Auth'
import { Appbar } from 'react-native-paper';

let reponAnimal = null
let reponDigits = null
const Tab = createMaterialTopTabNavigator();
class lotteryncc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bar: 'dark-content',
            isLoading: false,
            getdataNumberwin: null,
            valuesBuy: null,
            pagWiner: null,
            isRequestGetinfoNumber: false,
            GetinfoAnimal: false,

            detaStart: null,
            dateDraw: null,
            rusuell: null,
            numberOne: null,
            numberTwo: null,
            numberThree: null,
            buttonEnabled: false,
            showMessengError: null,
            reponAnimal: '',
            test: 'bopby',
            AnimalCode: null,
            NumberCode: null,
            setModalVisible: false
        };
    }

    componentDidMount() {

        const { infoAccount } = this.props
        RequestField.clearInitField();
        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.GET_INFO_NCC)) // 3
        RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
        RequestField.addToInitField(RequestField.addActionNode('1')) //22
        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
        RequestField.addToInitField(RequestField.addTIN('1'))//61
        RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78        
        let data = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
        this.props.onGetInfoBuyNCCLottery(data)
        RequestField.clearInitField();
        this.setState({ isRequestGetinfoNumber: true, isLoading: true, AnimalCode: '037101', NumberCode: '037001' })


    }
    componentWillReceiveProps(nextProps) {

        const { infoAccount } = this.props
        const { newMiniState, isLoading, isRequestGetinfo, item, totalBuy, isRequestGetinfoAnimal, isRequestGetinfoNumber, GetinfoAnimal } = this.state
        if (isRequestGetinfoNumber && isLoading) {
            switch (nextProps.actionType) {
                case 'GET_INFO_NCC_LOTTERY_SUCCESS':
                    let responseCode = RequestField.getValueField(nextProps.getInfoNccLottery.data.fieldMap, FIELD.RESPONSE_CODE);
                    let messenError = RequestField.getValueField(nextProps.getInfoNccLottery.data.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                    switch (responseCode) {
                        case '00000':
                            let tranDes = RequestField.getValueField(nextProps.getInfoNccLottery.data.fieldMap, FIELD.TRANSACTION_DESCRIPTION);
                            reponDigits = tranDes
                            RequestField.clearInitField();
                            RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.GET_INFO_NCC_ANIMAL)) // 3
                            RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))//20
                            RequestField.addToInitField(RequestField.addActionNode('1')) //22
                            RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                            RequestField.addToInitField(RequestField.addTIN('1'))//61
                            RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))//78        
                            let data = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                            this.props.onGetInfoBuyNCCLottery(data)
                            RequestField.clearInitField();
                            this.setState({ isRequestGetinfoNumber: false, GetinfoAnimal: true, isLoading: true, buttonEnabled: true })
                            break;
                        case responseCode:
                            this.refs.amountMustbefrom.onOpen()
                            this.setState({ showMessengError: messenError, isRequestGetinfoNumber: false, GetinfoAnimal: false, isLoading: false, buttonEnabled: false })
                            break;

                        default:
                            break;
                    }

                    break;
                case 'GET_INFO_NCC_LOTTERY_FAILED':
                    this.setState({ isLoading: false, isRequestGetinfoNumber: false, buttonEnabled: false })
                    break;
                default:
                    break;
            }
        }
        if (GetinfoAnimal && isLoading) {
            switch (nextProps.actionType) {
                case 'GET_INFO_NCC_LOTTERY_SUCCESS':
                    let responseCode = RequestField.getValueField(nextProps.getInfoNccLottery.data.fieldMap, FIELD.RESPONSE_CODE);
                    let messenError = RequestField.getValueField(nextProps.getInfoNccLottery.data.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                    switch (responseCode) {
                        case '00000':
                            var tranDesAnimal = RequestField.getValueField(nextProps.getInfoNccLottery.data.fieldMap, FIELD.TRANSACTION_DESCRIPTION);
                            reponAnimal = tranDesAnimal
                            this.setState({ GetinfoAnimal: false, isLoading: false })
                            break;
                        case responseCode:
                            this.refs.amountMustbefrom.onOpen()
                            this.setState({ showMessengError: messenError, GetinfoAnimal: false, isLoading: false })
                            break;
                        default:
                            break;
                    }
                    break;
                case 'GET_INFO_NCC_LOTTERY_FAILED':
                    this.setState({ isLoading: false, isRequestGetinfoNumber: false })
                    break;

                default:
                    break;
            }
        }

    }
    amountMustbefrom() {
        this.refs.amountMustbefrom.onClose()
    }
    _handleMore() {
        this.setState({ setModalVisible: true })
    }
    onHistoryLotteryNumber(item) {
        this.props.navigation.navigate('SearchHistory', { item })
        this.onCloes()
    }
    onHistoryLotteryAnimal(item) {
        this.props.navigation.navigate('SearchHistory', { item })
        this.onCloes()
    }
    AnimalProcessCode(item) {
        this.setState({ AnimalCode: item })
    }
    NumberProcessCode(item) {
        this.setState({ NumberCode: item })
    }
    onCloes() {
        this.setState({ setModalVisible: false })
    }
    render() {
        const { isLoading, showMessengError } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                {isLoading ? <ActivityIndicator /> : null}
                <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
                <Appbar.Header style={{ backgroundColor: Colors.white }}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title={I18n.t('NCCLottery')} />
                    <Appbar.Action icon="filter" color={Colors.iconColor} onPress={() => this._handleMore()} />
                </Appbar.Header>

                <Tab.Navigator
                    initialRouteName="Feed"
                    tabBarOptions={{
                        activeTintColor: Colors.orange,
                        inactiveTintColor: Colors.txtNumber,
                        style: {
                            backgroundColor: Colors.white,
                        },
                        labelStyle: {
                            labelStyle: { fontSize: 16 },
                        },
                        indicatorStyle: {
                            borderBottomColor: Colors.white,
                            borderBottomWidth: 2,
                        },
                    }}
                >
                    <Tab.Screen
                        name="AnimalSreen"
                        component={props => <AnimalSreen {...props} getReponAnimal={reponAnimal} />}
                        options={{ tabBarLabel: I18n.t('Animal') }}
                    />
                    <Tab.Screen
                        name="LotteryNumber"
                        component={props => <LotteryNumber {...props} getReponDigits={reponDigits} />}
                        options={{ tabBarLabel: I18n.t('2or3Number') }}
                    />
                </Tab.Navigator>

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
                            <View style={{ justifyContent: 'center', height: 50, alignItems: 'center', width: '100%' }}>
                                <Text>{I18n.t('SelectHistory')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, width: '100%' }}>
                                <TouchableOpacity style={styles.btnRandom} onPress={() => this.onHistoryLotteryNumber('037001')}>
                                    <Text style={styles.txtRandom}>{I18n.t('NumericalHistory')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnRandom} onPress={() => this.onHistoryLotteryAnimal('037101')}>
                                    <Text style={styles.txtRandom}>{I18n.t('AnimalHistory')}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.footer} onPress={() => this.onCloes()} >
                                <Text style={{ color: Colors.white }}>{I18n.t('ok')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>




                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={showMessengError}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.amountMustbefrom()}
                    ref='amountMustbefrom'
                />
            </View>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
        actionType: state.auth.actionType,
        getInfoNccLottery: state.auth.getInfoNccLottery,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onGetInfoBuyNCCLottery: (data) => { dispatch(onGetInfoBuyNCCLottery(data)) },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(lotteryncc)

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: 'rgba(224, 224, 224, 0.3)'
    },
    modalView3: {
        width: '90%',
        height: null,
        backgroundColor: "white",
        borderRadius: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10
    },
    footer: {
        width: '100%',
        height: 40,
        backgroundColor: Colors.orange,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnRandom: {
        width: null,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'rgb(206, 234, 253)',
        padding: 10,
    },
    txtRandom: {
        fontSize: 14,
        color: '#3275E0',
        fontWeight: 'bold'
    },
})
