import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import QRCodeScanner from "react-native-qrcode-scanner";
import { Colors, Images } from '../../themes'
import * as Animatable from "react-native-animatable";
// import { FlatListMenu } from '../../components'
// import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const rectDimensions = SCREEN_WIDTH * 0.65;
const rectBorderColor = Colors.white
const scanBarWidth = SCREEN_WIDTH * 0.46;
const scanBarHeight = SCREEN_WIDTH * 0.0025;
// const ListMenu = [
//     { id: 1, name: 'transferToCustomerto', icon: Images.ic_Requestumoney, navigate: 'CashInStackContainer' },
//     { id: 2, name: 'PosCashin', icon: Images.ic_Requestumoney, navigate: 'PosCashin' },
//     { id: 3, name: 'TopUp', icon: Images.ic_topup, navigate: 'TopUpContainer' },
// ]
class ScanSreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            status: false,
        };
      
    }
    makeSlideOutTranslation(translationType, fromValue) {
        return {
            from: {
                [translationType]: SCREEN_WIDTH * -0.18
            },
            to: {
                [translationType]: fromValue
            }
        };
    }
 


    onSuccess(e) {
        if (e.data != null) {
           
            let qrCode = e.data.substring(16, 29)
            if (e.data.substring(0, 11).length === 11) {
                this.props.navigation.navigate('CashinByQR', { data: e.data });
            }
            if (qrCode.length === 13) {
                this.props.navigation.navigate('CashinByQR', { data: qrCode });
            }
            let dataChar = e.data.substring(30, 33);
            if (dataChar === '856') {
                var umoney = e.data.substring(30, 43);
                this.props.navigation.navigate('CashinByQR', { data: umoney });
            } else {
                var laoViet = e.data.substring(35, 49);
                if (laoViet.length === 14) {
                    const data = [
                        {
                            "CODE": "LVB",
                            "ENABLE": "Y",
                            "EN_CN": "LaoViet Bank",
                            "EN_LA": "ທະນາຄານຮ່ວມທຸລະກິດລາວຫວຽດ",
                            "EN_US": "LaoViet Bank",
                            "EN_VN": "LaoViet Bank",
                            "IMAGE": "logo_laovietbank.png",
                            "PARTNER_CODE": "BANK_LVB",
                            "PARTNER_NAME_KEY": "BANK_LVB_NAME",
                            "PARTNER_TYPE": "BANK",
                            "PROCESS_CODE": "600011",
                            "ROLE": "0",
                            "SERVICE_CODE": "BANK_TRNSFR",
                            "VISIBILITY": "VISIBLE",
                            "QRlaoViet": laoViet
                        }
                    ]
                    this.props.navigation.navigate('TranferToBankAccount', { data: data[0] });
                }
            }
        }
    }
    navigate = (item) => {
        // const { setPhone } = this.state
        // console.log('item:', item)
        // this.props.navigation.navigate(`${item}`);
    }
    render() {
        // const { status } = this.state
        return (
            <QRCodeScanner
                showMarker
                onRead={this.onSuccess.bind(this)}
                cameraStyle={{ height: SCREEN_HEIGHT }}
                customMarker={
                    <View style={styles.rectangleContainer}>
                        <View style={styles.topOverlay}>
                            <Text style={{ fontSize: 30, color: "white" }}></Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.leftAndRightOverlay} />
                            <View style={styles.rectangle}>
                                <Animatable.View
                                    style={styles.scanBar}
                                    direction="alternate-reverse"
                                    iterationCount="infinite"
                                    duration={1700}
                                    easing="linear"
                                    animation={this.makeSlideOutTranslation(
                                        "translateY",
                                        SCREEN_WIDTH * -0.54
                                    )}
                                />
                            </View>
                            <View style={styles.leftAndRightOverlay} />
                        </View>
                        <View style={styles.bottomOverlay} />
                    </View>
                }
            />
            // status ?
            //     <SafeAreaView>
            //         <View style={styles.Main}>
            //             <FlatListMenu ListMenu={ListMenu} navigate={(item) => this.navigate(item)} />
            //         </View>
            //     </SafeAreaView>
            //     :
            //     (
            //         <QRCodeScanner
            //             showMarker
            //             onRead={this.onSuccess.bind(this)}
            //             cameraStyle={{ height: SCREEN_HEIGHT }}
            //             customMarker={
            //                 <View style={styles.rectangleContainer}>
            //                     <View style={styles.topOverlay}>
            //                         <Text style={{ fontSize: 30, color: "white" }}></Text>
            //                     </View>
            //                     <View style={{ flexDirection: "row" }}>
            //                         <View style={styles.leftAndRightOverlay} />
            //                         <View style={styles.rectangle}>
            //                             <Animatable.View
            //                                 style={styles.scanBar}
            //                                 direction="alternate-reverse"
            //                                 iterationCount="infinite"
            //                                 duration={1700}
            //                                 easing="linear"
            //                                 animation={this.makeSlideOutTranslation(
            //                                     "translateY",
            //                                     SCREEN_WIDTH * -0.54
            //                                 )}
            //                             />
            //                         </View>
            //                         <View style={styles.leftAndRightOverlay} />
            //                     </View>
            //                     <View style={styles.bottomOverlay} />
            //                 </View>
            //             }
            //         />
            //     )
        )
    }
}

export default ScanSreen
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },
    topOverlay: {
        flex: 1,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        justifyContent: "center",
        alignItems: "center"
    },

    leftAndRightOverlay: {
        height: SCREEN_WIDTH * 0.65,
        width: SCREEN_WIDTH,
    },

    scanBar: {
        width: scanBarWidth,
        height: scanBarHeight,
    },
    rectangle: {
        height: rectDimensions,
        width: rectDimensions,
        borderWidth: 5,
        borderColor: rectBorderColor,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        borderRadius: 10,
    },

    bottomOverlay: {
        flex: 1,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        paddingBottom: SCREEN_WIDTH * 0.25
    },
    Main: {
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: Colors.white
    }
})
