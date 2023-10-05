
import React, { useState } from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, StyleSheet, TouchableOpacity, Modal, Platform, ScrollView, SafeAreaView } from 'react-native';
import moment from 'moment'
import { Images, Colors, Fonts, Metrics } from '../../themes'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable';
import { formatNumber } from '../../utils/Formater'
import I18n from "react-native-i18n";
import LottieView from 'lottie-react-native';

const SPACING = 5;
const AVATAR_SIZE = 50;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        padding: 5,
        marginLeft: 5,
        marginRight: 5,


    },
    iconStyleHeader: {
        width: 50,
        height: 50
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '700',
        color: '#222',
        fontSize: 15,
        width: 170,
    },
    nameTxt1: {
        marginLeft: Platform.OS === 'ios' ? 0 : 10,
        fontWeight: '400',
        color: Colors.backColor,
        fontSize: 13,
        width: 170,
        marginLeft: 15,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%'
    },
    msgTxt: {
        fontWeight: '400',
        color: '#000',
        fontSize: 12,
        marginLeft: 15,
        marginRight: 20

    },
    msgTxt1: {
        color: Colors.redColor
    },
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
    containerItem: {
        padding: 5,
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        paddingHorizontal: Metrics.baseMargin,
        borderBottomWidth: 1,
        borderColor: Colors.borderGrey,
        backgroundColor: Colors.white,
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
    txtItem: {
        flex: 1,
        fontSize: Fonts.size.medium,
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        margin: 7
    },
    itemColor: {
        width: null,
        height: null,
        backgroundColor: 'rgb(230, 255, 255)',
        borderRadius: 4,

    },
    txtItemNUmber: {
        flex: 1,
        fontSize: Fonts.size.medium,
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        margin: 7,
        color: Colors.endGradientNav,
        fontWeight: 'bold',
    },
    noData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnHistory: {
        width: '100%',
        height: 59,
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
    footer: {
        width: '100%',
        height: 40,
        backgroundColor: Colors.orange,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default (props) => {
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const [ModalVisible, setModalVisible] = useState(false);
    const [tranferId, settranferId] = useState(null);
    const [lotteryValue, setlotteryValue] = useState(null);
    const [refresh, setRefresh] = useState(false)
    const onDisplay = (item) => {
        let tranferId = item.transaction_id
        let numberlist = item.number_loto_list
        let lotteryValue = null
        if (numberlist.length > 0) {
            let strValue = numberlist.split(';')
            let arrayList = []

            let no = 0
            for (let i = 0; i < strValue.length; i++) {
                let strItem = strValue[i]
                let strNewItem = strItem.split('=')
                no++
                arrayList.push({
                    'No': no, 'lottery': strNewItem[0], 'amount': strNewItem[1]
                })

            }
            lotteryValue = arrayList
        }
        setModalVisible(true)
        settranferId(tranferId)
        setlotteryValue(lotteryValue)
    }
    const renderItemGet = (item) => {
        return (
            <View style={styles.containerItem}>
                <Text style={styles.txtItem}>{item.No}</Text>
                <View style={styles.itemColor}>
                    <Text style={styles.txtItemNUmber}>{item.lottery}</Text>
                    {/* {console.log('item.lottery:', item.lottery)} */}
                </View>
                <Text style={styles.txtItem}>{formatNumber(item.amount + '₭')}</Text>
            </View>
        )
    }
    const _renderHeaderShowHistory = () => {
        return (
            <TouchableOpacity style={styles.containerItemHeader}>
                <Text style={styles.txtItem}>{I18n.t('colNum')}</Text>
                <Text style={styles.txtItem}>{I18n.t('numberLottery')}</Text>
                <Text style={styles.txtItem}>{I18n.t('amount')}</Text>
            </TouchableOpacity>
        )
    }
    const onCloes = () => {
        setModalVisible(false)
    }
    const onReload = () => {
        props.onReloadDrewData()
    }
    const onRefresh = () => {
        props.onReloadDrewData()
    }
    return  <View style={{ width: '100%', height: '96%' }}>
            {props.getdataHistoryto != null ?
                <Animated.FlatList
                    data={props.getdataHistoryto}
                    refreshing={refresh}
                    onRefresh={onRefresh}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    keyExtractor={item => item.key}
                    contentContainerStyle={
                        {
                            padding: SPACING,
                            paddingTop: StatusBar.currentHeight || 30,

                        }
                    }

                    renderItem={({ item, index }) => {
                        const inputRange = [
                            -1,
                            0,
                            ITEM_SIZE * index,
                            ITEM_SIZE * (index + 2)
                        ]
                        const scale = scrollY.interpolate({
                            inputRange,
                            outputRange: [1, 1, 1, 0]
                        })
                        return (
                            <Animatable.View
                                animation="zoomIn"
                                delay={index * 100}
                            >
                                <TouchableOpacity onPress={() => onDisplay(item)}>
                                    <Animated.View style={{
                                        padding: SPACING, flexDirection: 'row',
                                        borderColor: '#DCDCDC',
                                        borderBottomWidth: 1,
                                        transform: [{ scale }]
                                    }}>

                                        <View style={{ width: '15%' }}>
                                            <Image source={Images.icNCCLottery} style={styles.iconStyleHeader} />
                                        </View>
                                        <View style={styles.nameContainer}>
                                            <View style={{ width: '60%' }}>
                                                <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.transaction_id}</Text>
                                                <Text style={styles.nameTxt1} numberOfLines={1} ellipsizeMode="tail">{item.msisdn}</Text>
                                                <Text style={styles.msgTxt}>{moment(item.request_date).format('YYYY-MM-DD H:mm:ss')}</Text>
                                            </View>
                                            <View style={{ width: '40%', height: '100%', }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                                    <Text style={styles.msgTxt1}>{"- " + formatNumber(item.amount)} ₭</Text>
                                                    <FontAwesome name='angle-right' size={25} color={Colors.iconNext} style={{ left: 25 }} />
                                                </View>
                                            </View>
                                        </View>
                                    </Animated.View>
                                </TouchableOpacity>
                            </Animatable.View>
                        )
                    }
                    }
                />
                : (
                    <View style={styles.noData}>
                        <View>
                            <LottieView
                                source={require('../../../assets/nodataError.json')}
                                autoPlay
                                loop
                                style={[{ width: 300, height: 300, }]}
                            />
                        </View>
                        <View style={styles.btnHistory}>
                            <TouchableOpacity style={styles.btnRandom} onPress={() => onReload()}>
                                <Text style={styles.txtRandom}>Reload data</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={ModalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView3}>
                        <View style={{ justifyContent: 'center', height: 50, alignItems: 'center', width: '100%' }}>
                            <Text>{tranferId}</Text>
                        </View>
                        <ScrollView style={{ width: '100%', marginBottom: 20, padding: 10 }}>
                            <FlatList
                                data={lotteryValue}
                                renderItem={({ item, index }) => renderItemGet(item, index)}
                                keyExtractor={(item) => {
                                    return item.id;
                                }}
                                extraData={this.state}
                                ListHeaderComponent={() => _renderHeaderShowHistory()}
                            />
                        </ScrollView>
                        <TouchableOpacity style={styles.footer} onPress={() => onCloes()} >
                            <Text style={{ color: Colors.white }}>{I18n.t('ok')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
   

}