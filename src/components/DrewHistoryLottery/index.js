// import React, { Component } from 'react'
// import { Text, View, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
// import LottieView from 'lottie-react-native';
// import { Colors, Fonts, Images, Metrics } from '../../themes'
// import moment from 'moment'
// import I18n from 'react-native-i18n'

// class index extends Component {
//     renderItemGetNumberwin = (item) => {
//         let formetDate = moment(item.DRAW_DATE).format('YYYY-MM-DD')
//         return (

//             <View style={{ width: '100%', height: 40, flexDirection: 'row', padding: 5, }}>
//                 <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center', }}>
//                     <Text style={styles.txtItem}>{item.DRAW_NO}</Text>
//                 </View>
//                 <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', }}>
//                     <View style={styles.itemColor}>
//                         <Text style={styles.txtItemColor}>{item.RESULT_340 || item.SIX_DIGIT}</Text>
//                     </View>
//                 </View>
//                 <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center', }}>
//                     <Text style={styles.txtItem}>{formetDate}</Text>
//                 </View>
//             </View>
//         )
//     }
//     onReload() {
//         this.props.onReloadDrewHistory()
//     }
//     render() {
//         const { getDrewHistory } = this.props
//         return (
//             <View style={{ width: '100%', height: '90%' }}>
//                 <View style={{ width: '100%', height: 40, flexDirection: 'row' }}>
//                     <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
//                         <Text style={styles.txtItem}>{I18n.t('lotteryId')}</Text>
//                     </View>
//                     <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center' }}>
//                         <Text style={styles.txtItem}>{I18n.t('numberLottery')}</Text>
//                     </View>
//                     <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
//                         <Text style={styles.txtItem}>{I18n.t('date')}</Text>
//                     </View>
//                 </View>
//                 {getDrewHistory != null ? (
//                     <ScrollView style={{ width: '100%', marginBottom: 40 }}>
//                         <FlatList
//                             data={getDrewHistory}
//                             renderItem={({ item, index }) => this.renderItemGetNumberwin(item, index)}
//                             keyExtractor={(item) => {
//                                 return item.id;
//                             }}
//                             extraData={this.state}

//                         />
//                     </ScrollView>

//                 ) :
//                     (
//                         <View style={{ width: '100%', height: null, justifyContent: 'center', alignItems: 'center' }}>
//                             <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '90%' }}>
//                                 <View>
//                                     <LottieView
//                                         source={require('../../../assets/nodataError.json')}
//                                         autoPlay
//                                         loop
//                                         style={[{ width: 300, height: 300, }]}
//                                     />
//                                 </View>
//                                 <View style={styles.btnHistory}>
//                                     <TouchableOpacity style={styles.btnRandom} onPress={() => this.onReload()}>
//                                         <Text style={styles.txtRandom}>Reload data</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>

//                         </View>
//                     )}
//             </View>
//         )
//     }
// }

// export default index

// const styles = StyleSheet.create({
//     btnHistory: {
//         width: '100%',
//         height: 59,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     txtRandom: {
//         fontSize: 14,
//         color: '#3275E0',
//         fontWeight: 'bold'
//     },
//     btnRandom: {
//         width: null,
//         height: 40,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 5,
//         backgroundColor: 'rgb(204, 245, 255)',
//         padding: 10,
//     },
//     txtItem: {
//         flex: 1,
//         fontSize: Fonts.size.medium,
//         alignItems: 'center',
//         textAlign: 'center',
//         alignContent: 'center',
//         margin: 7
//     },
//     itemColor: {
//         width: null,
//         height: null,
//         backgroundColor: 'rgb(204, 245, 255)',
//         borderRadius: 4,

//     },
//     txtItemColor: {
//         flex: 1,
//         fontSize: Fonts.size.medium,
//         alignItems: 'center',
//         textAlign: 'center',
//         alignContent: 'center',
//         margin: 7,
//         color: Colors.orange
//     },
// })






import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView, Platform } from 'react-native';
import moment from 'moment'
import { Images, Colors, Fonts, Metrics } from '../../themes'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable';
import I18n from 'react-native-i18n'
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('screen');
const SPACING = 0;
const AVATAR_SIZE = 50;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3

const styles = StyleSheet.create({
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
        backgroundColor: 'rgb(204, 245, 255)',
        padding: 10,
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
        backgroundColor: 'rgb(204, 245, 255)',
        borderRadius: 4,

    },
    txtItemColor: {
        flex: 1,
        fontSize: Fonts.size.medium,
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        margin: 7,
        color: Colors.orange
    },
})

export default (props) => {
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const onDisplay = (item) => {
        // props.onDisplay(item)
    }
    const onReload = () => {
        props.onReloadDrewHistory()
    }
    return <View style={{ width: '100%', height: '90%' }}>
        <View style={{ width: '100%', height: 30, flexDirection: 'row',backgroundColor:Colors.bgMain}}>
            <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.txtItem}>{I18n.t('lotteryId')}</Text>
            </View>
            <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.txtItem}>{I18n.t('numberLottery')}</Text>
            </View>
            <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.txtItem}>{I18n.t('date')}</Text>
            </View>
        </View>


        {
            props.getDrewHistory != null ?

                <Animated.FlatList
                    data={props.getDrewHistory}
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
                                        <View style={{ width: '100%', height: 40, flexDirection: 'row', padding: 5, }}>
                                            <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center', }}>
                                                <Text style={styles.txtItem}>{item.DRAW_NO || item.lot_id}</Text>
                                            </View>
                                            <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', }}>
                                                <View style={styles.itemColor}>
                                                    <Text style={styles.txtItemColor}>{item.RESULT_340 || item.SIX_DIGIT || item.five_digits_win}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center', }}>
                                                <Text style={styles.txtItem}>{moment(item.DRAW_DATE).format('YYYY-MM-DD')}</Text>
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
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '90%' }}>
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
                )
        }

    </View>
}


