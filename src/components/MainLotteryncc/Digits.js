import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, ScrollView,
    TouchableOpacity, Modal, SafeAreaView, FlatList, Platform
} from 'react-native';
import { Colors, Metrics, Images, Fonts } from '../../themes'
import { FullNewButton, DrewHistoryLottery } from '../../components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import I18n from 'react-native-i18n'
import moment from 'moment'
import LottieView from 'lottie-react-native';

class Animal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SwitchPag: "BUY_LOTTERY_DIGITS",
            EvenSell: "SELL_LOTTERY_DIGITS",
            setModalHistory: false
        };
    }
    onSwich() {
        this.props.onSwich(this.state.SwitchPag)
    }
    onSellLottery() {
        this.props.onSellLottery(this.state.EvenSell)
    }
    onHistoryLottery() {
        this.props.onGetHistoryNumber()
        this.setState({ setModalHistory: true })
    }
    onReloadDrewHistory(){
        this.props.onGetHistoryNumber()
    }
    onReload() {
        this.props.onGetHistoryNumber()
    }
    onSelect() {
        this.setState({ setModalHistory: false })
    }

    renderItemGetNumberwin = (item) => {
        let formetDate = moment(item.DRAW_DATE).format('YYYY-MM-DD')
        return (
            <View style={{ width: '100%', height: 40, flexDirection: 'row', padding: 5, }}>
                <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.txtItem}>{item.DRAW_NO}</Text>
                </View>
                <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', }}>
                    <View style={styles.itemColor}>
                        <Text style={styles.txtItemColor}>{item.SIX_DIGIT}</Text>
                    </View>
                </View>
                <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.txtItem}>{formetDate}</Text>
                </View>
            </View>
        )
    }

  


    render() {
        const { Start_time, draw_date, One_digit, two_digit, therr_digit,
            four_digit, five_digit, six_digit, buttonEnabled, getDrewHistory } = this.props
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={styles.cardStyle}>
                        <View style={styles.imgaeBox}>
                            <View>
                                <Image source={Images.icNCCLottery} style={styles.iconStyle} />
                            </View>
                            <View style={styles.txtgruop}>
                                <Text style={styles.txtNcclottery}>{I18n.t('NCCLottery')}</Text>
                                <Text style={styles.txtAnimal}>{I18n.t('Digits2D3D4D')}</Text>
                            </View>
                        </View>
                        <View style={styles.boxDate}>
                            <Text style={styles.txtAnimal}>{I18n.t('UpcomingDrawDate')}</Text>
                            <Text style={styles.txtNcclottery}>{Start_time ? Start_time : null}</Text>
                        </View>
                    </View>
                    <View style={styles.cardStyle}>
                        <View style={styles.groupTxt}>
                            <View style={styles.imgWiner}>
                                <Image source={Images.icPodium} style={styles.iconWiner} />
                            </View>
                            <View style={styles.txtWiner}>
                                <Text style={styles.txtNcclottery}>{I18n.t('LotteryResult')}</Text>
                                <Text>{I18n.t('Drawdate')}: {draw_date ? draw_date : null}</Text>
                            </View>
                        </View>
                        <View style={styles.icAnimal}>
                            <View style={styles.txtWinerDigits}>
                                <Text style={styles.txt}>{One_digit ? One_digit : null}</Text>
                                <Image source={Images.iconWinner} style={styles.iconResuleWiner} />
                            </View>
                            <View style={styles.txtWinerDigits}>
                                <Text style={styles.txt}>{two_digit ? two_digit : null}</Text>
                                <Image source={Images.iconWinner} style={styles.iconResuleWiner} />
                            </View>
                            <View style={styles.txtWinerDigits}>
                                <Text style={styles.txt}>{therr_digit ? therr_digit : null}</Text>
                                <Image source={Images.iconWinner} style={styles.iconResuleWiner} />
                            </View>
                            <View style={styles.txtWinerDigits}>
                                <Text style={styles.txt}>{four_digit ? four_digit : null}</Text>
                                <Image source={Images.iconWinner} style={styles.iconResuleWiner} />
                            </View>
                            <View style={styles.txtWinerDigits}>
                                <Text style={styles.txt}>{five_digit ? five_digit : null}</Text>
                                <Image source={Images.iconWinner} style={styles.iconResuleWiner} />
                            </View>
                            <View style={styles.txtWinerDigits}>
                                <Text style={styles.txt}>{six_digit ? six_digit : null}</Text>
                                <Image source={Images.iconWinner} style={styles.iconResuleWiner} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.btnHistory}>
                        <TouchableOpacity style={styles.btnRandom} onPress={() => this.onHistoryLottery()}>
                            <Text style={styles.txtRandom}>{I18n.t('HistoryLottery')}</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
                {buttonEnabled ? (
                    <View style={styles.footer}>
                        <FullNewButton
                            text={I18n.t('buy')}
                            onPress={() => this.onSwich()}
                        />
                    </View>
                ) : null}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.setModalHistory}
                    onRequestClose={() => {
                        this.setState({ setModalHistory: false })
                    }}
                >
                    <View style={styles.centeredView}>
                        <SafeAreaView>
                            <View style={{ width: '100%', height: '100%' }}>
                                <View style={{
                                    width: '100%', height: 60, backgroundColor: Colors.white,
                                    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20,

                                }}>
                                    <View style={{ width: '20%', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.onSelect()}>
                                            <Text> <Ionicons name='arrow-back' size={24} /> </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '60%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', textTransform: "uppercase", }}>{I18n.t('HistoryLottery')}</Text>
                                    </View>
                                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                    </View>
                                </View>
                                <View>
                                <DrewHistoryLottery getDrewHistory={getDrewHistory} onReloadDrewHistory={()=>this.onReloadDrewHistory()} />
                                </View>
                                < View style={{ flex: 1, justifyContent: 'flex-end', width: '100%', marginTop: Platform.OS === 'android' ? -70 : 0 }}>
                                    <TouchableOpacity onPress={() => this.onSelect()} style={{ width: '100%', height: 50, backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold', textTransform: "uppercase", }}>{I18n.t('success')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </SafeAreaView>
                    </View>
                </Modal>







            </View >
        );
    }
}

export default Animal;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    centeredView: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    btnHistory: {
        width: '100%',
        height: 59,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtRandom: {
        fontSize: 14,
        color: '#3275E0',
        fontWeight: 'bold'
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
    cardStyle: {
        margin: Metrics.marginVertical,
        borderRadius: 12,
        borderBottomWidth: 0.5,
        padding: Metrics.marginVertical,
        backgroundColor: Colors.card,
        borderColor: Colors.transparent,
        marginBottom: Metrics.marginVertical,
    },
    imgaeBox: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 0.5,
        borderColor: Colors.textColor,
    },
    txtNcclottery: {
        fontSize: 14,
        color: Colors.backColor,
        fontWeight: 'bold',
        marginBottom: 5
    },
    iconStyle: {
        width: 50,
        height: 50,
    },
    txtAnimal: {
        fontSize: 14,
        color: Colors.textColor
    },
    txtgruop: {
        left: 10
    },
    boxDate: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    groupTxt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgWiner: {
        marginBottom: 20
    },
    txtWiner: {
        padding: 10,
        alignItems: 'center'
    },
    icAnimal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    imgAnimalRerul: {
        width: 50,
        height: 90,
    },
    iconWiner: {
        width: 60,
        height: 60
    },
    bntFooter: {

        justifyContent: 'flex-end'
    },
    ScrollView: {
        flex: 1,
    },
    footer: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtWinerDigits: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    txtResut: {
        fontWeight: 'bold',
        color: Colors.black,

    },
    iconResuleWiner: {
        width: 32,
        height: 32
    },
    txt: {
        position: 'absolute',
        zIndex: 1,
        fontSize: 20,
        color: '#575724',
        fontWeight: 'bold'
    },
    containerItemHeaderHistory: {
        padding: 5,
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        paddingHorizontal: Metrics.baseMargin,
        borderColor: Colors.borderGrey,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderColor: Colors.borderGrey,
    },
    txtItem: {
        flex: 1,
        fontSize: Fonts.size.medium,
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        margin: 7
    },
    containerItemHeader: {
        padding: 5,
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        paddingHorizontal: Metrics.baseMargin,
        borderColor: Colors.borderGrey,
        backgroundColor: Colors.white,
        flex: 1,
        backgroundColor: Colors.backgroundList
    },
    itemColor: {
        width: null,
        height: null,
        backgroundColor: 'rgb(230, 255, 255)',
        opacity: 0.5,
        borderRadius: 4,

    },
    txtItemColor: {
        flex: 1,
        fontSize: Fonts.size.medium,
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        margin: 7,
        color: Colors.orange,
        fontWeight: '500'
    },


})
