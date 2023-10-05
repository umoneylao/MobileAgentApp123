import React, { Component } from 'react';
import { Image, ScrollView, Text, View, StatusBar, SafeAreaView } from 'react-native'
import { Colors, Images } from '../../themes'
import { formatNumber } from '../../utils/Formater'
import styles from './styles'
import _ from 'lodash'
import I18n from 'react-native-i18n'
import WatermarkView from '../../components/WatermarkView/watermark'
import { QRCode } from 'react-native-custom-qr-codes';

class HistoryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            lang: 'lo'
        };
    }
    componentWillMount() {
        const { params } = this.props.route
        let _language = I18n.currentLocale()
        this.setState({ lang: _language })
        this.setState({
            transactionId: params.data[0].transactionId,
            transactionName: params.data[0].transactionName,
            fromPhone: params.data[0].fromPhone,
            toPhone: params.data[0].toPhone,
            code: params.data[0].code,
            fromName: params.data[0].fromName,
            toName: params.data[0].toName,
            amount: params.data[0].amount,
            dateTime: params.data[0].dateTime,
            processCode: params.data[0].processCode
        })

    }
    qrTransation() {
        const { processName, transactionID, amount } = this.state
        const txtQR = processName + ' | ' + transactionID + ' | ' + amount
        return (
            <QRCode codeStyle='square' content={txtQR} size={80} />
        )
    }
    render() {
        const { transactionId, transactionName, fromPhone, toPhone, code, fromName, toName, amount, dateTime, processCode, lang } = this.state
        const txtMateter = transactionId + ' | ' + transactionName + ' | ' + fromPhone + ' | ' + toPhone + ' | ' + amount
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                <View style={{ alignItems: 'center', marginBottom: 20, top: 20 }}>
                    <Image source={Images.ic_successfully} style={styles.imageSizeCon} />
                    <Text style={styles.txtHeader}>{I18n.t('congratulation')}</Text>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={{ top: 10, flexDirection: 'row', marginHorizontal: 30 }}>
                        <View style={{ width: '50%', height: '100%', marginBottom: 20 }}>
                            <View style={styles.rowInfo}>
                                <Text style={styles.labelInfo}>{I18n.t('transactionId')}:</Text>
                                <Text style={styles.valueInfo}>{transactionId}</Text>
                            </View>
                            {fromName ?
                                (<View style={styles.rowInfo}>
                                    <Text style={styles.labelInfo} lineNumbers={1}>{processCode == '580000' ? I18n.t('InsuredName') : I18n.t('to')}:</Text>
                                    <Text style={styles.valueInfo} lineNumbers={1}>{fromName}</Text>
                                </View>) : null}
                            {fromPhone ?
                                (<View style={styles.rowInfo}>
                                    <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('senderPhone')}:</Text>
                                    <Text style={styles.valueInfo} lineNumbers={1}>{fromPhone}</Text>
                                </View>) : null}
                            {amount ?
                                (<View style={styles.rowInfo}>
                                    <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('amount')}:</Text>
                                    <Text style={styles.valueInfo} lineNumbers={1}>{formatNumber(amount + '')} ₭</Text>
                                </View>) : null
                            }
                        </View>
                        <View style={{ width: '50%', height: '100%', marginBottom: 20 }}>
                            <View style={styles.rowInfo}>
                                <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('transactionType')}:</Text>
                                <Text style={styles.valueInfo} lineNumbers={1}>{transactionName}</Text>
                            </View>
                           
                            {toName ?
                                (<View style={styles.rowInfo}>
                                    <Text style={styles.labelInfo} lineNumbers={1}>{processCode == '580000' ? I18n.t('cusAddress') : I18n.t('receiver')}:</Text>
                                    <Text style={styles.valueInfo} lineNumbers={1}>{toName}</Text>
                                </View>) : null}

                            {toPhone ?
                                (<View style={styles.rowInfo}>
                                    <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('to')}:</Text>
                                    <Text style={styles.valueInfo} lineNumbers={1}>{toPhone}</Text>
                                </View>) : null}

                        </View>
                    </View>
                </ScrollView>
                <View style={{ flex: 1, margin: 20, justifyContent: 'flex-end', alignItems: 'flex-end', zIndex: -1, position: 'relative' }}>
                    <View style={{ marginBottom: 10, width: 97, height: 120, justifyContent: 'center' }}>
                        <View style={{ zIndex: 1, position: 'absolute', marginHorizontal: 10, top: 30, borderRadius: 2 }}>
                            <View style={{ width: 80, height: 80, backgroundColor: Colors.white }}>
                                {this.qrTransation()}
                            </View>
                        </View>
                        <Image source={lang === 'en' ? Images.iconStem : lang === 'vn' ? Images.icStamp_vi : lang === 'cn' ? Images.icStamp_cn : Images.icStamp_la} style={{ width: 97, height: 120 }} />
                    </View>
                </View>

                <WatermarkView foreground={true} style={null} watermark={txtMateter} watermarkTextStyle={null} rotateZ={-45} />
            </SafeAreaView>
        );
    }
}
export default HistoryDetail;
