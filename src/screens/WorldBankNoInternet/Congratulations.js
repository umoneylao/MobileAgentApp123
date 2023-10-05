import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, StatusBar, BackHandler } from 'react-native'
import { Colors, Metrics, Fonts, Images } from '../../themes';
import { FullNewButton } from '../../components'
import moment from 'moment'

import I18n from 'react-native-i18n'
export class Congriretion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Amount: null,
            CustomerName: null,
            PaymentCode: null,
            Phone: null,
            ProcessCode: null,
            TransactionDescription: null,
            CustomerGender: null
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    onBackHome() {
        this.props.navigation.popToTop();
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        this.props.navigation.popToTop();
        return true;
    }
    componentDidMount() {
        if (this.props.route.params != undefined) {
            let getdata = this.props.route.params.data;
            this.setState({
                Amount: getdata[1],
                CustomerName: getdata[10],
                PaymentCode: getdata[3],
                Phone: getdata[6],
                ProcessCode: getdata[0],
                TransactionDescription: getdata[5],
            })
        }
    }
    render() {
        const { Amount, CustomerName, PaymentCode, Phone, ProcessCode, TransactionDescription } = this.state
        return (
            <SafeAreaView style={styles.constainer}>
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                <View style={styles.top}>
                    <View style={{ alignItems: 'center', marginBottom: 20, top: 20 }}>
                        <Image source={Images.ic_successfully} style={styles.imageSizeCon} />
                        <Text style={styles.txtHeader}>{I18n.t('congratulation')}</Text>
                    </View>
                </View>
                <View style={styles.mainScreen}>
                    <View style={styles.main}>
                        <View style={{ width: '50%' }}>
                            <View style={styles.rowInfo}>
                                <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('transactionType')}</Text>
                                <Text style={styles.valueInfo} lineNumbers={1}>{ProcessCode == '039002' ? I18n.t('PaySubsidies') : null}</Text>
                            </View>
                            <View style={styles.rowInfo}>
                                <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('phoneNumberForCashin')}</Text>
                                <Text style={styles.valueInfo} lineNumbers={1}>{CustomerName ? CustomerName : null}</Text>
                            </View>
                            <View style={styles.rowInfo}>
                                <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('labelcctID')}</Text>
                                <Text style={styles.valueInfo} lineNumbers={1}>{PaymentCode ? PaymentCode : null}</Text>
                            </View>
                        </View>
                        <View style={{ width: '50%' }}>
                            <View style={styles.rowInfo}>
                                <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('sender')}</Text>
                                <Text style={styles.valueInfo} lineNumbers={1}>{Phone ? Phone : null}</Text>
                            </View>
                            <View style={styles.rowInfo}>
                                <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('amount')}</Text>
                                <Text style={styles.valueInfo} lineNumbers={1}>{Amount ? Amount : null}</Text>
                            </View>
                            <View style={styles.rowInfo}>
                                <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('transactionDetail')}</Text>
                                <Text style={styles.valueInfo} lineNumbers={1}>{TransactionDescription ? TransactionDescription : null}</Text>
                            </View>
                            <View style={styles.rowInfo}>
                                <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('buildDate')}</Text>
                                <Text style={styles.valueInfo} lineNumbers={1}>{moment(new Date()).format("DD/MM/YYYY")}</Text>
                            </View>

                        </View>
                    </View>
                    <View style={{ marginBottom: 10, padding: 10 }}>
                        <FullNewButton
                            text={I18n.t('backToHome')}
                            onPress={() => this.onBackHome()}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default Congriretion
const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    top: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainScreen: {
        flex: 2,
        justifyContent: 'space-between'
    },
    imageSizeCon: {
        width: 170, height: 110,
        alignItems: 'center',
    },
    txtHeader: {
        textAlign: 'center',
        fontSize: Fonts.size.h4,
        fontWeight: 'normal',
        marginVertical: Metrics.baseMargin,
        color: Colors.txtUpLight
    },
    main: {
        width: '100%',
        flexDirection: 'row',
        padding: 10
    },
    rowInfo: {
        marginVertical: 5,
        marginBottom: 10,
    },
    labelInfo: {
        fontSize: Fonts.size.medium,
        color: '#9C9C9C',
        marginLeft: Metrics.baseMargin,
        marginRight: Metrics.baseMargin,
    },
    valueInfo: {
        color: Colors.black,
        marginLeft: Metrics.baseMargin,
        marginRight: Metrics.baseMargin,
        fontSize: Fonts.size.fifSize
    },
})
















