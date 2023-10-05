// import React, { Component } from 'react'
// import { Text, View, StatusBar, StyleSheet, Platform, SafeAreaView } from 'react-native'
// import { Colors, Metrics } from '../../themes'
// import { FullNewButton, FullTextInput, CustomNavbarTop } from '../../components'
// import I18n from 'react-native-i18n'
// export class index extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             phone: null,
//         };
//     }
//     render() {
//         const { phone, errorPhone } = this.state
//         return (
//             <SafeAreaView style={styles.container}>
//                 <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
//                 <CustomNavbarTop conten='Transaction' onBack={()=>this.props.navigation.goBack()}/>
//                 <View style={styles.layouGroud}>
//                     <View style={styles.layout1}>
//                         <View style={styles.txtInput}>
//                             <FullTextInput
//                                 label={I18n.t('inputThePhoneHere')}
//                                 placeholder={I18n.t('inputThePhoneHere')}
//                                 returnKeyType='done'
//                                 keyboardType='number-pad'
//                                 value={phone}
//                                 error={errorPhone}
//                                 onChangeUserName={(text) => this.onChangeNumberValue(text)}
//                                 iconLeft='facebook'
//                                 iconRight='close'
//                                 textError={I18n.t('incorrectPhoneNumber')}
//                                 onclick={() => this.onClearPhone()}
//                             />
//                         </View>
//                         <View style={styles.txtInput}>
//                             <FullTextInput
//                                 label={I18n.t('inputThePhoneHere')}
//                                 placeholder={I18n.t('inputThePhoneHere')}
//                                 returnKeyType='done'
//                                 keyboardType='number-pad'
//                                 value={phone}
//                                 error={errorPhone}
//                                 onChangeUserName={(text) => this.onChangeNumberValue(text)}
//                                 iconLeft='facebook'
//                                 iconRight='close'
//                                 textError={I18n.t('incorrectPhoneNumber')}
//                                 onclick={() => this.onClearPhone()}
//                             />
//                         </View>
//                         <View style={styles.txtInput}>
//                             <FullTextInput
//                                 label={I18n.t('inputThePhoneHere')}
//                                 placeholder={I18n.t('inputThePhoneHere')}
//                                 returnKeyType='done'
//                                 keyboardType='number-pad'
//                                 value={phone}
//                                 error={errorPhone}
//                                 onChangeUserName={(text) => this.onChangeNumberValue(text)}
//                                 iconLeft='facebook'
//                                 iconRight='close'
//                                 textError={I18n.t('incorrectPhoneNumber')}
//                                 onclick={() => this.onClearPhone()}
//                             />
//                         </View>
//                         <View style={styles.txtInput}>
//                             <FullTextInput
//                                 label={I18n.t('inputThePhoneHere')}
//                                 placeholder={I18n.t('inputThePhoneHere')}
//                                 returnKeyType='done'
//                                 keyboardType='number-pad'
//                                 value={phone}
//                                 error={errorPhone}
//                                 onChangeUserName={(text) => this.onChangeNumberValue(text)}
//                                 iconLeft='facebook'
//                                 iconRight='close'
//                                 textError={I18n.t('incorrectPhoneNumber')}
//                                 onclick={() => this.onClearPhone()}
//                             />
//                         </View>
//                         <View style={styles.txtInput}>
//                             <FullTextInput
//                                 label={I18n.t('inputThePhoneHere')}
//                                 placeholder={I18n.t('inputThePhoneHere')}
//                                 returnKeyType='done'
//                                 keyboardType='number-pad'
//                                 value={phone}
//                                 error={errorPhone}
//                                 onChangeUserName={(text) => this.onChangeNumberValue(text)}
//                                 iconLeft='facebook'
//                                 iconRight='close'
//                                 textError={I18n.t('incorrectPhoneNumber')}
//                                 onclick={() => this.onClearPhone()}
//                             />
//                         </View>
//                     </View>
//                     <View style={styles.layout2}>
//                         <View style={styles.btnFoodter}>
//                             <FullNewButton
//                                 text={I18n.t('TopUp')}
//                                 onPress={() => this.onPressProcess()}
//                             />
//                         </View>

//                     </View>
//                 </View>
//             </SafeAreaView>
//         )
//     }
// }

// export default index
// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: Colors.white,
//         height: Metrics.height,
//         justifyContent: 'space-between',
//     },
//     layouGroud: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'space-between'
//     },
//     layout1: {
//         flex: 1,
//         // backgroundColor: Colors.red
//     },
//     layout2: {
//         flex: Platform.OS == 'android' ? 0.2 : 0.2,
//         backgroundColor: Colors.border,
//         justifyContent: 'space-between',
//     },
//     txtInput: {
//         paddingBottom: 10,
//         padding: 10
//     },
//     btnFoodter: {
//         paddingBottom: 10,
//         padding: 10
//     }
// })



// import React, { Component } from 'react'
// import { Text, View, SafeAreaView } from 'react-native'
// import Loader from 'react-native-easy-content-loader';
// export class index extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: false
//         };
//     }
//     render() {
//         return (
//             <SafeAreaView>
//                 <Loader
//                     primaryColor='rgba(195, 191, 191, 1)'
//                     secondaryColor='rgba(218, 215, 215, 1)'
//                     animationDuration={500}
//                     loading={this.state.loading}
//                 >
//                     <View
//                         style={{
//                             height: 100,// required,
//                             width: '100%', // required,
//                             backgroundColor: 'red'
//                         }}
//                     >
//                     </View>
//                 </Loader>
//             </SafeAreaView>
//         )
//     }
// }

// export default index








// import React from 'react';
// import {
//     StyleSheet,
//     View,
//     Text,
//     StatusBar,
//     Dimensions,
//     TouchableOpacity,
//     SafeAreaView,
//     ImageBackground
// } from 'react-native';
// import ReactNativeParallaxHeader from 'react-native-parallax-header';
// import ResponsiveImage from 'react-native-responsive-image';
// import { Metrics, Colors, Images, Fonts } from '../../themes'
// const { height: SCREEN_HEIGHT } = Dimensions.get('window');
// const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
// const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
// const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 70) : 70;
// const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
// const { width, height } = Dimensions.get('window')
// const imageWidh = width - 0;
// const imageHeigh = (imageWidh / 1000) * 535;
// const renderNavBar = () => (
//     <SafeAreaView style={styles.navContainer}>
//         {/* <View style={styles.statusBar} />*/}
//         <View style={styles.navBar}>

//         </View> 
//     </SafeAreaView>
// );

// const renderContent = () => {
//     return (
//         <View style={styles.body1}>
//             {Array.from(Array(30).keys()).map((i) => (
//                 <View
//                     key={i}
//                     style={{ padding: 15, alignItems: 'center', justifyContent: 'center' }}>
//                     <Text>Item {i + 1}</Text>
//                 </View>
//             ))}
//         </View>
//     );
// };

// const title = () => {
//     return (
//         <SafeAreaView style={styles.body}>
//             <ImageBackground source={Images.bg_headerAccout1} style={{ width: imageWidh, height: imageHeigh }}>
//                 <View>
//                     <Text>bopby</Text>
//                 </View>
//             </ImageBackground>
//         </SafeAreaView>
//     );
// };

// const App = () => {
//     return (
//         <>
//             <StatusBar barStyle="dark-content" color='#25B6BF' />
//             <ReactNativeParallaxHeader
//                 headerMinHeight={HEADER_HEIGHT}
//                 headerMaxHeight={250}
//                 extraScrollHeight={290}
//                 navbarColor="#FFF"
//                 titleStyle={styles.titleStyle}
//                 title={title()}
//                 // backgroundImage={Images.bg_headerAccout}
//                 backgroundImageScale={1.2}
//                 renderNavBar={renderNavBar}
//                 renderContent={renderContent}
//                 backgroundColor={Colors.orange}
//                 alwaysShowTitle={false}
//                 alwaysShowNavBar={false}
//                 containerStyle={styles.container}
//                 contentContainerStyle={styles.contentContainer}
//                 innerContainerStyle={styles.container}
//                 scrollViewProps={{
//                     onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
//                     onScrollEndDrag: () => console.log('onScrollEndDrag'),
//                 }}
//             />
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFF'
//     },
//     contentContainer: {
//         flexGrow: 1,
//     },
//     navContainer: {
//         height: HEADER_HEIGHT,
//         backgroundColor:'#25B6BF'
//     },
//     statusBar: {
//         height: STATUS_BAR_HEIGHT,
//         backgroundColor: 'transparent',
//     },
//     navBar: {
//         height: NAV_BAR_HEIGHT,
//         alignItems: 'center',
//         flexDirection: 'row',
//         backgroundColor: '#25B6BF'
//     },
//     titleStyle: {
//         color: 'white',
//         fontWeight: 'bold',
//         fontSize: 18,
//     },
//     body1: {
//         flex: 1,
//         backgroundColor: '#929',
//         margin:10,
//     },
//     body: {
//       flex:1,
//       justifyContent:'center',
//       alignItems:'center'
//     },
//     warpItemList: {
//         height: Metrics.doubleSection * 1.5,
//         width: Metrics.width / 4.5,
//         alignItems: 'center',
//         left: 5

//     },
//     iconHeaderStyle: {

//         height: Metrics.icons.large - 5,
//         width: Metrics.icons.large - 5,
//         marginBottom: 5

//     },
//     iconMenuHeader: {
//         textAlign: 'center',
//         color: Colors.white,
//         fontSize: Fonts.size.medium,
//     },
// });

// export default App;





// import React, { Component } from 'react'
// import { Text, View } from 'react-native'
// import {CustomNavbarNew} from '../../components'
// export class index extends Component {
//     render() {
//         return (
//            <CustomNavbarNew/>
//         )
//     }
// }

// export default index



// import React, { Component } from 'react'
// import { Text, View, TouchableWithoutFeedback, StyleSheet,
//      Platform, Image, Keyboard, TouchableOpacity, SafeAreaView} from 'react-native'
// import { Colors, Metrics, Images, Fonts } from '../../themes'
// import { CustomNavbarTop, FullTextInput, FullButton , FullNewButton} from '../../components'
// import ResponsiveImage from 'react-native-responsive-image';
// import Ionicons from 'react-native-vector-icons/Ionicons'

// import I18n from 'react-native-i18n'
// class index extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoading: false,
//             phoneNumber: '91100394',
//         }
//     };
//     onPressOpenFlat() {
//         alert('ok')
//     }
//     render() {
//         const { phoneNumber, errorPhoneNumber, isLoading, stateResetPin, messageError } = this.state
//         const { localLanguage } = this.props;
//         return (
//             <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>

//                 <View style={styles.container}>

//                     <View style={{ width: '100%', height: 40, justifyContent:'center', alignItems:'flex-end',paddingHorizontal:10 }}>
//                     <TouchableOpacity onPress={() => this.onPressOpenFlat()}>
//                             {localLanguage == 'lo' ? <ResponsiveImage source={Images.icLaos} style={styles.iconLange} />
//                                 : localLanguage == 'en' ? <ResponsiveImage source={Images.icEnglish} style={styles.iconLange} />
//                                     : localLanguage == 'vn' ? <ResponsiveImage source={Images.icVietnam} style={styles.iconLange} />
//                                         : localLanguage == 'cn' ? <ResponsiveImage source={Images.icChina} style={styles.iconLange} />
//                                             : <ResponsiveImage source={Images.icLaos} style={styles.iconLange} />}
//                         </TouchableOpacity>
//                     </View>


//                     <View style={{ paddingHorizontal: Metrics.doubleBaseMargin, flex: 1 }}>
//                         <View>
//                             <Image source={Images.icLoginAgent} style={styles.logo} resizeMode='contain' />
//                             <Text style={[styles.txtLogo, { color: Colors.txtColor, fontSize: Fonts.size.regular }]}>{I18n.t('introLogin1')}</Text>
//                             <Text style={[styles.txtLogo2, { color: Colors.txtColor, fontSize: Fonts.size.regular, marginBottom: 5 }]}>{I18n.t('introLogin2')}</Text>
//                         </View>
//                         <View style={styles.TextInput}>
//                             <FullTextInput
//                                 label={I18n.t('enterYourMobilePhoneNumber')}
//                                 placeholder={I18n.t('enterRegisterPhoneNumber')}
//                                 returnKeyType='done'
//                                 keyboardType='numeric'
//                                 value={phoneNumber}
//                                 maxLength={13}
//                                 error={errorPhoneNumber}
//                                 onChangeUserName={(text) => this.onChangeNumberPhone(text)}
//                                 iconLeft='facebook'
//                                 iconRight='close'
//                                 textError={I18n.t('incorrectPhoneNumber')}
//                                 onclick={() => this.onClearPhone()}

//                             />
//                         </View>

//                         <TouchableOpacity style={styles.styleFont} onPress={() => this.onForgotPIN()}>
//                             <Text style={styles.forgetThePin}>{I18n.t('forgetThePin')}</Text>
//                         </TouchableOpacity>
//                         <View style={styles.Button}>
//                             <FullButton
//                                 styles={styles.btnStyle}
//                                 onPress={() => this.onSignIn()}
//                                 isDisable={(!phoneNumber || errorPhoneNumber) ? true : false}
//                                 textButton={I18n.t('signIn')}
//                             />
//                         </View>

//                     </View>

//                     <View style={styles.imgFooter}>
//                         {/* <Image source={Images.bg_footerLogin} style={styles.img} /> */}
//                         <FullNewButton
//                             styles={styles.btnStyle}
//                             text={I18n.t('TopUp')}
//                             onPress={() => this.onPressProcess()}
//                         />
//                     </View>
//                 </View>
//             </TouchableWithoutFeedback>
//         )
//     }
// }

// export default index
// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: Colors.white,
//         height: Metrics.height,
//         paddingTop: Platform.OS === 'ios' ? Metrics.tripleBaseMargin : 0,
//         justifyContent: 'space-between'
//     },
//     img: {
//         width: 140,
//         height: 200,

//     },
//     imgFooter: {
//         marginBottom:30,
//         paddingHorizontal:20
//     },
//     txtLogo: {
//         ...Fonts.style.regular,
//         marginBottom: 5,
//         textAlign: 'center',
//         paddingHorizontal: Metrics.baseMargin * 3,
//         fontSize: Fonts.size.h2,
//         fontWeight: 'bold',
//     },
//     txtLogo2: {
//         ...Fonts.style.regular,

//         marginBottom: 5,
//         textAlign: 'center',
//         paddingHorizontal: Metrics.baseMargin * 3,
//         fontSize: Fonts.size.h2,

//     },
//     logo: {
//         marginBottom: Metrics.smallMargin,
//         height: 120,
//         width: 120,
//         resizeMode: 'contain',
//         alignSelf: 'center'
//     },
//     TextInput: {
//         justifyContent: 'center',
//         marginBottom: 20
//     },
//     styleFont: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     forgetThePin: {
//         color: Colors.grey,
//         fontSize: Fonts.size.h5,
//         textDecorationLine: 'underline',
//     },
//     Button: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: 90
//     },
//     btnStyle: {
//         width: '70%',
//         height: null,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 5,

//     },
//     iconLange: {
//         width: 30, height: 30,
//     },
//     btnStyle: {
//         width: '100%',
//     },
// })



// import React, { Component } from 'react'
// import { Text, View, SafeAreaView } from 'react-native'
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { Colors } from '../../themes'
// import I18n from 'react-native-i18n'
// import tabTest from './tabTest'
// const Tab = createMaterialTopTabNavigator();

// export class index extends Component {
//     render() {
//         return (
//             <SafeAreaView style={{flex:1}}>
//             <Tab.Navigator
//                     initialRouteName="Feed"
//                     tabBarOptions={{
//                         activeTintColor: Colors.backColor,
//                         labelStyle: { fontSize: 15 },
//                         style: { backgroundColor: Colors.white },
//                     }}
//                 >
//                     <Tab.Screen
//                         name="AnimalSreen"
//                         component={tabTest}
//                         options={{ tabBarLabel: I18n.t('Animal') }}
//                     />
//                     <Tab.Screen
//                         name="LotteryNumber"
//                         component={tabTest}
//                         options={{ tabBarLabel: I18n.t('2or3Number') }}
//                     />
//                 </Tab.Navigator>
//             </SafeAreaView>
//         )
//     }
// }

// export default index






// import React, { Component, createRef } from 'react'
// import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
// const { width, height } = Dimensions.get('screen');
// const SPACING = 20;
// const AVATAR_SIZE = 70;
// const ITEM_SIZE = AVATAR_SIZE + SPACING * 3
// const DATA = [
//     { key: 1, name: 'bopby', date: '20/10/1996' },
//     { key: 2, name: 'bopby', date: '20/10/1996' },
//     { key: 3, name: 'bopby', date: '20/10/1996' },
//     { key: 4, name: 'bopby', date: '20/10/1996' },
//     { key: 5, name: 'bopby', date: '20/10/1996' },
//     { key: 6, name: 'bopby', date: '20/10/1996' },
//     { key: 7, name: 'bopby', date: '20/10/1996' },
//     { key: 8, name: 'bopby', date: '20/10/1996' },
//     { key: 9, name: 'bopby', date: '20/10/1996' },
//     { key: 10, name: 'bopby', date: '20/10/1996' },
//     { key: 11, name: 'bopby', date: '20/10/1996' },
//     { key: 12, name: 'bopby', date: '20/10/1996' },
//     { key: 13, name: 'bopby', date: '20/10/1996' },
//     { key: 14, name: 'bopby', date: '20/10/1996' },
// ]
// const scrollY = createRef(new Animated.Value(0)).current;
// class index extends Component {
//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 <Animated.FlatList
//                     data={DATA}
//                     onScroll={
//                         Animated.event(
//                             [{ nativeEvent: { contentoffset: { y: scrollY } } }],
//                             { useNativeDriver: true }
//                         )
//                     }
//                     keyExtractor={item => item.key}
//                     contentContainerStyle={
//                         {
//                             padding: SPACING,
//                             paddingTop: StatusBar.currentHeight || 42
//                         }
//                     }

//                     renderItem={({ item, index }) => {
//                         const inputRange = [
//                             -1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)
//                         ]
//                         const scale = scrollY.interpolate({
//                             inputRange,
//                             outputRange:[1,1,1,0]
//                         })
//                         return (
//                             <Animated.View style={{
//                                 padding: SPACING, borderRadius: 12, flexDirection: 'row', marginBottom: SPACING, backgroundColor: '#FFF',
//                                 shadowColor: "#000",
//                                 shadowOffset: {
//                                     width: 0,
//                                     height: 6,
//                                 },
//                                 shadowOpacity: 0.37,
//                                 shadowRadius: 7.49,
//                                 elevation: 12,
//                                 transform:[{scale}]
//                             }}>
//                                 <View style={{ width: 60, height: 60, borderRadius: 5, backgroundColor: '#909' }}></View>
//                                 <View>
//                                     <Text style={{
//                                         fontSize: 22,
//                                         fontWeight: 'bold'
//                                     }}>{item.name}</Text>
//                                     <Text style={{ fontSize: 15, opacity: 0.7 }}>{item.date}</Text>
//                                 </View>
//                             </Animated.View>
//                         )
//                     }
//                     }
//                 />
//             </View>
//         )
//     }
// }

// export default index


// import React, { Component } from 'react'
// import { Text, View } from 'react-native'
// import { TestComponet } from '../../components'
// const DATA = [
//     {
//         "amount":"2000",
//         "five_digits_win":null,
//         "lot_date":"2021-01-30T00:00:00.000+07:00",
//         "lot_id":"407",
//         "modified_date":"2021-01-26T13:10:19.000+07:00",
//         "msisdn":"8562091100394",
//         "number_loto_list":"30=1000;48=1000",
//         "process_code":"037001",
//         "req_msisdn":"8562091100394",
//         "request_date":"2021-01-26T13:10:19.000+07:00",
//         "response_date":"2021-01-26T13:10:19.000+07:00",
//         "total_amount":"1550",
//         "transaction_id":"210126000172908"
//      },
//      {
//         "amount":"2000",
//         "five_digits_win":null,
//         "lot_date":"2021-01-30T00:00:00.000+07:00",
//         "lot_id":"407",
//         "modified_date":"2021-01-26T13:10:19.000+07:00",
//         "msisdn":"8562091100394",
//         "number_loto_list":"30=1000;48=1000",
//         "process_code":"037001",
//         "req_msisdn":"8562091100394",
//         "request_date":"2021-01-26T13:10:19.000+07:00",
//         "response_date":"2021-01-26T13:10:19.000+07:00",
//         "total_amount":"1550",
//         "transaction_id":"210126000172908"
//      },
//      {
//         "amount":"2000",
//         "five_digits_win":null,
//         "lot_date":"2021-01-30T00:00:00.000+07:00",
//         "lot_id":"407",
//         "modified_date":"2021-01-26T13:10:19.000+07:00",
//         "msisdn":"8562091100394",
//         "number_loto_list":"30=1000;48=1000",
//         "process_code":"037001",
//         "req_msisdn":"8562091100394",
//         "request_date":"2021-01-26T13:10:19.000+07:00",
//         "response_date":"2021-01-26T13:10:19.000+07:00",
//         "total_amount":"1550",
//         "transaction_id":"210126000172908"
//      }
// ]
// class index extends Component {
//     onDisplay(item) {
//         console.log(item)
//     }
//     render() {

//         return (
//             <TestComponet test='bopby keodouangdy' DATA={DATA} onDisplay={(item) => this.onDisplay(item)} />
//         )
//     }
// }

// export default index

// import React, { Component } from 'react'
// import { SafeAreaView, Text, View } from 'react-native'
// import { DateComponnet } from '../../components'

// export class index extends Component {
//     render() {
//         return (
//             <View style={{ width: '100%', height: '100%', }}>
//                 <SafeAreaView>
//                     <DateComponnet />
//                 </SafeAreaView>
//             </View>

//         )
//     }
// }

// export default index








// import React, { Component } from "react";
// import {
//     PermissionsAndroid,
//     Platform,
//     SafeAreaView,
//     ScrollView,
//     StyleSheet,
//     View,
//     ActivityIndicator,
// } from "react-native";
// import Contacts from "react-native-contacts";
// import { ListItem, Avatar, SearchBar } from '../../components'
// type Props = {};
// export default class App extends Component<Props> {
//     constructor(props) {
//         super(props);
//         this.search = this.search.bind(this);
//         this.state = {
//             contacts: [],
//             searchPlaceholder: "Search",
//             typeText: null,
//             loading: true
//         };
//         Contacts.iosEnableNotesUsage(false);
//     }

//     async componentDidMount() {
//         if (Platform.OS === "android") {
//             PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
//                 title: "Contacts",
//                 message: "This app would like to view your contacts."
//             }).then(() => {
//                 this.loadContacts();
//             });
//         } else {
//             this.loadContacts();
//         }
//     }

//     loadContacts() {
//         Contacts.getAll()
//             .then(contacts => {
//                 this.setState({ contacts, loading: false });
//             })
//             .catch(e => {
//                 this.setState({ loading: false });
//             });

//         Contacts.getCount().then(count => {
//             this.setState({ searchPlaceholder: `Search ${count} contacts` });
//         });

//         Contacts.checkPermission();
//     }

//     search(text) {
//         const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
//         const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
//         if (text === "" || text === null) {
//             this.loadContacts();
//         } else if (phoneNumberRegex.test(text)) {
//             Contacts.getContactsByPhoneNumber(text).then(contacts => {
//                 this.setState({ contacts });
//             });
//         } else if (emailAddressRegex.test(text)) {
//             Contacts.getContactsByEmailAddress(text).then(contacts => {
//                 this.setState({ contacts });
//             });
//         } else {
//             Contacts.getContactsMatchingString(text).then(contacts => {
//                 this.setState({ contacts });
//             });
//         }
//     }

//     onPressContact(contact) {
//         var text = this.state.typeText;
//         this.setState({ typeText: null });
//         if (text === null || text === '')
//             console.log('contact:', contact)
//         // Contacts.openExistingContact(contact)
//         else {
//             console.log('contact.recordID:', contact.recordID)
//             var newPerson = {
//                 recordID: contact.recordID,
//                 phoneNumbers: [{ label: 'mobile', number: text }]
//             }
//             console.log('newPerson:', newPerson)
//             // Contacts.editExistingContact(newPerson).then(contact => {
//             //     //contact updated
//             // });
//         }
//     }


//     render() {
//         return (

//         );
//     }
// }










// import React, { Component } from "react";
// import {
//     PermissionsAndroid,
//     Platform,
//     SafeAreaView,
//     ScrollView,
//     StyleSheet,
//     View,
//     ActivityIndicator,
// } from "react-native";
// import Contacts from "react-native-contacts";
// import { ListItem, Avatar, SearchBar } from '../../components'

// const getAvatarInitials = textString => {
//     if (!textString) return "";
//     const text = textString.trim();
//     const textSplit = text.split(" ");
//     if (textSplit.length <= 1) return text.charAt(0);
//     const initials =
//         textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
//     return initials;
// };


// class index extends Component {
//     constructor(props) {
//         super(props);
//         this.search = this.search.bind(this);
//         this.state = {
//             contacts: [],
//             searchPlaceholder: "Search",
//             typeText: null,
//             loading: true
//         };
//         Contacts.iosEnableNotesUsage(false);
//     }

//     async componentDidMount() {
//         if (Platform.OS === "android") {
//             PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
//                 title: "Contacts",
//                 message: "This app would like to view your contacts."
//             }).then(() => {
//                 this.loadContacts();
//             });
//         } else {
//             this.loadContacts();
//         }
//     }

//     loadContacts() {
//         Contacts.getAll()
//             .then(contacts => {
//                 this.setState({ contacts, loading: false });
//             })
//             .catch(e => {
//                 this.setState({ loading: false });
//             });
//         Contacts.getCount().then(count => {
//             this.setState({ searchPlaceholder: `Search ${count} contacts` });
//         });
//         Contacts.checkPermission();
//     }
//     search(text) {
//         const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
//         const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
//         if (text === "" || text === null) {
//             this.loadContacts();
//         } else if (phoneNumberRegex.test(text)) {
//             Contacts.getContactsByPhoneNumber(text).then(contacts => {
//                 this.setState({ contacts });
//             });
//         } else if (emailAddressRegex.test(text)) {
//             Contacts.getContactsByEmailAddress(text).then(contacts => {
//                 this.setState({ contacts });
//             });
//         } else {
//             Contacts.getContactsMatchingString(text).then(contacts => {
//                 this.setState({ contacts });
//             });
//         }
//     }

//     onPressContact(contact) {
//         console.log('displayName:', contact.phoneNumbers.number)
//         var text = this.state.typeText;
//         this.setState({ typeText: null });
//         if (text === null || text === '')
//             console.log('displayName:', contact.phoneNumbers)

//         // Contacts.openExistingContact(contact)
//         else {
//             console.log('contact.recordID:', contact.recordID)
//             var newPerson = {
//                 recordID: contact.recordID,
//                 phoneNumbers: [{ label: 'mobile', number: text }]
//             }
//             console.log('newPerson:', newPerson)
//             // Contacts.editExistingContact(newPerson).then(contact => {
//             //     //contact updated
//             // });
//         }
//     }

//     render() {
//         return (
//             <SafeAreaView style={styles.container}>
//                 <SearchBar
//                     searchPlaceholder={this.state.searchPlaceholder}
//                     onChangeText={this.search}
//                 />
//                 {
//                     this.state.loading === true ?
//                         (
//                             <View style={styles.spinner}>
//                                 <ActivityIndicator size="large" color="#0000ff" />
//                             </View>
//                         ) : (
//                             <ScrollView style={{ flex: 1 }}>
//                                 {this.state.contacts.map(contact => {
//                                     return (
//                                         <ListItem
//                                             leftElement={
//                                                 <Avatar
//                                                     img={
//                                                         contact.hasThumbnail
//                                                             ? { uri: contact.thumbnailPath }
//                                                             : undefined
//                                                     }
//                                                     placeholder={getAvatarInitials(
//                                                         `${contact.givenName} ${contact.familyName}`
//                                                     )}
//                                                     width={40}
//                                                     height={40}
//                                                 />
//                                             }
//                                             key={contact.recordID}
//                                             title={`${contact.givenName} ${contact.familyName}`}
//                                             description={`${contact.company}`}
//                                             onPress={() => this.onPressContact(contact)}
//                                             onDelete={() =>
//                                                 Contacts.deleteContact(contact).then(() => {
//                                                     this.loadContacts();
//                                                 })
//                                             }
//                                         />
//                                     );
//                                 })}
//                             </ScrollView>
//                         )
//                 }
//             </SafeAreaView>
//         )
//     }
// }

// export default index
// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     spinner: {
//         flex: 1,
//         flexDirection: 'column',
//         alignContent: "center",
//         justifyContent: "center"
//     },
//     inputStyle: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         textAlign: "center"
//     }
// });






// import React, { Component } from 'react'
// import { Text, View } from 'react-native'

// const groups = nextProps.dataHistory.reduce((groups, item) => {
//     const date = item.dateCreated.split('T')[0];
//     if (!groups[date]) {
//         groups[date] = [];
//     }
//     groups[date].push(item);
//     return groups;
// }, {});

// const groupArrays = Object.keys(groups).map((date) => {
//     return {
//         title: date,
//         data: groups[date]
//     };
// });
// console.log(groupArrays);
// this.setState({ lstItem: groupArrays })



// class index extends Component {
//     renItem = ({ item, index }) => {
//         return (
//             <View style={Styles.itemStyle}>
//                 <View style={Styles.itemImage}>
//                     {
//                         item.actionCode == ACTION_CODE.TOPUP_ETL ?
//                             <Image source={images.icETL} resizeMode={'contain'} style={{ height: 70, width: 70 }} /> :
//                             item.actionCode == ACTION_CODE.TOPUP_UNITEL ?
//                                 <Image source={images.icUnitel} resizeMode={'contain'} style={{ height: 70, width: 70 }} /> :
//                                 item.actionCode == ACTION_CODE.TOPUP_LTC ?
//                                     <Image source={images.icLTC} resizeMode={'contain'} style={{ height: 70, width: 70 }} /> :
//                                     item.actionCode == ACTION_CODE.TOPUP_TPLUS ?
//                                         <Image source={images.icTplus} resizeMode={'contain'} style={{ height: 70, width: 70 }} /> :
//                                         <Image source={images.iconApp} resizeMode={'contain'} style={{ height: 70, width: 70 }} />
//                     }
//                 </View>

//                 <View style={{ flex: 1, marginLeft: 10, marginRight: 2 }}>
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <Text style={[Styles.itemTextHead, { justifyContent: 'flex-start' }]}>{I18n.t(item.actionCode)}</Text>
//                         <Text style={[Styles.itemTextHead1, {
//                             justifyContent: 'flex-end',
//                             color: item.actionCode == ACTION_CODE.GET_REUEST_ADD_MONEY ? Colors.buttonColor : Colors.red
//                         }]}>
//                             {item.actionCode == ACTION_CODE.GET_REUEST_ADD_MONEY ? '+' : '-'}
//                             {numeral(item.amount).format('0,0')} {I18n.t('currency')}
//                         </Text>
//                     </View>
//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         <Text style={Styles.textPhone}>{I18n.t('phone')} : </Text>
//                         <Text style={Styles.itemText}>{item.toPhone}</Text>
//                     </View>
//                     <Text style={Styles.itemText}>{moment(item.dateCreated).format("DD/MM/YYYY HH:MM:SS")}</Text>
//                 </View>
//             </View>
//         )
//     }

//     render() {
//         return (
//             <View>
//                 <SectionList
//                     sections={this.state.lstItem}
//                     keyExtractor={(item, index) => item + index}
//                     renderItem={(item, index) => this.renItem(item, index)}
//                     renderSectionHeader={({ section: { title } }) => (
//                         <View style={Styles.headerBox}>
//                             <Text style={Styles.headerTitle}>{title}</Text>
//                         </View>
//                     )}
//                 />
//             </View>
//         )
//     }
// }

// export default index




// import React from "react";
// import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar } from "react-native";

// const DATA = [
//   {
//     title: "Main dishes",
//     data: ["Pizza", "Burger", "Risotto"]
//   },
//   {
//     title: "Sides",
//     data: ["French Fries", "Onion Rings", "Fried Shrimps"]
//   },
//   {
//     title: "Drinks",
//     data: ["Water", "Coke", "Beer"]
//   },
//   {
//     title: "Desserts",
//     data: ["Cheese Cake", "Ice Cream"]
//   }
// ];

// const Item = ({ title }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );

// const App = () => (
//   <SafeAreaView style={styles.container}>
//     <SectionList
//       sections={DATA}
//       keyExtractor={(item, index) => item + index}
//       renderItem={({ item }) => <Item title={item} />}
//       renderSectionHeader={({ section: { title } }) => (
//         <Text style={styles.header}>{title}</Text>
//       )}
//     />
//   </SafeAreaView>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: StatusBar.currentHeight,
//     marginHorizontal: 16
//   },
//   item: {
//     backgroundColor: "#f9c2ff",
//     padding: 20,
//     marginVertical: 8
//   },
//   header: {
//     fontSize: 32,
//     backgroundColor: "#fff"
//   },
//   title: {
//     fontSize: 24
//   }
// });

// export default App;




// import React, { Component } from 'react'
// import { Text, View, SectionList, StyleSheet } from 'react-native'
// const data = [

//     {
//         "actionId": "633107",
//         "amount": "30000",
//         "code": null,
//         "currencyCode": "418",
//         "dateTime": "2021-07-10T01:33:29.000+07:00",
//         "fromName": "test system ບອບບີ້",
//         "fromPhone": "8562091100394",
//         "processCode": "010002",
//         "toName": "ສຸກປະສົງ ຄຳສອນ",
//         "toPhone": "8562099851255",
//         "transactionId": "210717000270793",
//         "transactionName": "Agent cash in for Customer",
//         "type": "-1"
//     },
//     {
//         "actionId": "633105",
//         "amount": "5000",
//         "code": null,
//         "currencyCode": "418",
//         "dateTime": "2021-07-13T01:24:52.000+07:00",
//         "fromName": "ສຸກປະສົງ ຄຳສອນ",
//         "fromPhone": "8562099851255",
//         "processCode": "039002",
//         "toName": "test system ບອບບີ້",
//         "toPhone": "8562091100394",
//         "transactionId": "210717000270792",
//         "transactionName": "World Bank Customer Cash out at channel",
//         "type": "1"
//     },
//     {
//         "actionId": "633103",
//         "amount": "5000",
//         "code": null,
//         "currencyCode": "418",
//         "dateTime": "2021-07-14T01:24:09.000+07:00",
//         "fromName": "test system ບອບບີ້",
//         "fromPhone": "8562091100394",
//         "processCode": "010002",
//         "toName": "ສຸກປະສົງ ຄຳສອນ",
//         "toPhone": "8562099851255",
//         "transactionId": "210717000270790",
//         "transactionName": "Agent cash in for Customer",
//         "type": "-1"
//     },
//     {
//         "actionId": "633099",
//         "amount": "3000",
//         "code": null,
//         "currencyCode": "418",
//         "dateTime": "2021-07-15T01:20:58.000+07:00",
//         "fromName": "test system ບອບບີ້",
//         "fromPhone": "8562091100394",
//         "processCode": "010002",
//         "toName": "Mr Bopby keodouangdy",
//         "toPhone": "8562095873197",
//         "transactionId": "210717000270787",
//         "transactionName": "Agent cash in for Customer",
//         "type": "-1"
//     },
//     {
//         "actionId": "633099",
//         "amount": "3000",
//         "code": null,
//         "currencyCode": "418",
//         "dateTime": "2021-07-15T01:20:58.000+07:00",
//         "fromName": "test system ບອບບີ້",
//         "fromPhone": "8562091100394",
//         "processCode": "010002",
//         "toName": "Mr Bopby keodouangdy",
//         "toPhone": "8562095873197",
//         "transactionId": "210717000270787",
//         "transactionName": "Agent cash in for Customer",
//         "type": "-1"
//     },
//     {
//         "actionId": "633099",
//         "amount": "3000",
//         "code": null,
//         "currencyCode": "418",
//         "dateTime": "2021-07-15T01:20:58.000+07:00",
//         "fromName": "test system ບອບບີ້",
//         "fromPhone": "8562091100394",
//         "processCode": "010002",
//         "toName": "Mr Bopby keodouangdy",
//         "toPhone": "8562095873197",
//         "transactionId": "210717000270787",
//         "transactionName": "Agent cash in for Customer",
//         "type": "-1"
//     },
// ]

// const groups = data.reduce((groups, item) => {
//     const date = item.dateTime.split('T')[0];
//     if (!groups[date]) {
//         groups[date] = [];
//     }
//     groups[date].push(item);
//     return groups;
// }, {});


// const groupArrays = Object.keys(groups).map((date) => {
//     return {
//         title: date,
//         data: groups[date]
//     };
// });

// class index extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             lstItem: null
//         };


//     }
//     renItem = ({ item, index }) => {
//         return (
//             <View>
//                 <Text>{item.fromName}</Text>
//                 <Text>{item.fromPhone}</Text>
//             </View>
//         )
//     }
//     componentDidMount(){
//         console.log('groupArrays', groupArrays);
//         this.setState({ lstItem: groupArrays })
//     }
//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 <SectionList
//                     sections={this.state.lstItem}
//                     keyExtractor={(item, index) => item + index}
//                     renderItem={(item, index) => this.renItem(item, index)}
//                     renderSectionHeader={({ section: { title } }) => (
//                         <View style={styles.header}>
//                             <Text style={styles.txtHeader}>{title}</Text>
//                         </View>
//                     )}
//                 />
//             </View>
//         )
//     }
// }

// export default index
// const styles = StyleSheet.create({
//     header:{
//         backgroundColor:'#ccc',
//         width:'100%',
//         height:null

//     },
//     txtHeader:{
//         color:'#000',
//         padding:10
//     }
// })



// import React, { Component } from 'react'
// import { Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
// import { connect } from 'react-redux'
// import * as ConfigCode from '../../utils/ConfigCode'
// import { ActivityIndicator, LogoApp } from '../../components'
// import { requestHistoryTranfer } from '../../actions/Auth'
// import { formatNumber } from '../../utils/Formater'

// import { Colors } from '../../themes'
// class index extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoading: false,
//             dataReques: null
//         };
//     }
//     componentDidMount() {
//         try {
//             const { infoAccount, processCode } = this.props
//             let _processCode = processCode
//             let _accountId = infoAccount.accountId
//             this.props.requestHistoryTranfer(_accountId, _processCode)
//             this.setState({ isLoading: true, getHistoryPayment: true })
//         } catch (e) {
//             console.log('Error')
//         }
//     }
//     componentWillReceiveProps(nextProps) {
//         if (this.state.getHistoryPayment) {
//             switch (nextProps.actionType) {
//                 case 'REQUES_HISTORY_TRANFER_SUCCESS':
//                     let dataReques = nextProps.requesHistoryTranfer.recentCollections.recentTransactions
//                     this.setState({ isLoading: false, getHistoryPayment: false, dataReques })
//                     console.log('getHistoryPayment:', dataReques)
//                     break;
//                 case 'REQUES_HISTORY_TRANFER_FAILED':
//                     this.setState({ isLoading: false, getHistoryPayment: false })
//                     break;
//                 default:
//                     break;
//             }
//         }
//     }
//     _renderItem(item, id) {
//         return (
//             <TouchableOpacity onPress={() => this.onGetdata(item)} style={{ padding: 5 }}>
//                 <View style={{ width: 160, height: 60, flexDirection: 'row', backgroundColor: '#ffff', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, justifyContent: 'center', padding: 5 }}>
//                     <View style={{ width: '30%' }}>
//                         <LogoApp processCode={this.props.processCode} />
//                     </View>
//                     <View style={{ width: '70%', left: 5, }}>
//                         <Text numberOfLines={1}>{item.entityName}</Text>
//                         <Text style={{ color: Colors.backColor }} numberOfLines={1}>{item.entityCode}</Text>
//                         <Text style={{ color: Colors.orange }} numberOfLines={1}>{formatNumber(item.amount)} ₭</Text>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         )
//     }
//     onGetdata = (item) => {
//         this.props.onselect(item)
//     }
//     render() {
//         const { isLoading, dataReques } = this.state
//         return (
//             <SafeAreaView>
//                 <View style={{ width: '100%', height: null }}>
//                     {dataReques != null ? (
//                         <FlatList
//                             data={dataReques}
//                             horizontal={true}
//                             renderItem={({ item, index }) => this._renderItem(item, index)}
//                             keyExtractor={item => item.id}
//                         />
//                     ) : null}

//                 </View>
//             </SafeAreaView>
//         )
//     }
// }
// const mapStateToProps = (state) => {
//     return {
//         infoAccount: state.auth.infoAccount,
//         actionType: state.auth.actionType,
//         requesHistoryTranfer: state.auth.requesHistoryTranfer,
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         requestHistoryTranfer: (_accountId, _processCode) => { dispatch(requestHistoryTranfer(_accountId, _processCode)) },

//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(index);




// import React from 'react';
// import {
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   Platform,
//   TouchableOpacity,
//   PermissionsAndroid,

// } from 'react-native';

// import RNFetchBlob from 'rn-fetch-blob';

// const Dashboard = () => {
//   const fileUrl = 'http://183.182.100.174:8998/ftp/donwload/02091100394&2021819&APA_Insuarance_Certificate_Umoney_02091100394_210819000313056.pdf';

//   const checkPermission = async () => {
//     if (Platform.OS === 'ios') {
//       downloadFile();
//     } else {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'Storage Permission Required',
//             message:
//               'Application needs access to your storage to download File',
//           }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           downloadFile();
//           console.log('Storage Permission Granted.');
//         } else {
//           Alert.alert('Error','Storage Permission Not Granted');
//         }
//       } catch (err) {
//         console.log("++++"+err);
//       }
//     }
//   };

//   const downloadFile = () => {
//     let date = new Date();
//     let FILE_URL = fileUrl;    
//     let file_ext = getFileExtention(FILE_URL);
//     file_ext = '.' + file_ext[0];
//     const { config, fs } = RNFetchBlob;
//     let RootDir = fs.dirs.PictureDir;
//     let options = {
//       fileCache: true,
//       addAndroidDownloads: {
//         path:
//           RootDir+
//           '/file_' + 
//           Math.floor(date.getTime() + date.getSeconds() / 2) +
//           file_ext,
//         description: 'downloading file...',
//         notification: true,
//         useDownloadManager: true,   
//       },
//     };
//     config(options)
//       .fetch('GET', FILE_URL)
//       .then(res => {
//         console.log('res -> ', JSON.stringify(res));
//         alert('File Downloaded Successfully.');
//       });
//   };

//   const getFileExtention = fileUrl => {
//     return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ alignItems: 'center' }}>
//         <Text style={{ fontSize: 25, textAlign: 'center' }}>
//           React Native File Download Example
//         </Text>

//       </View>
//       <Image
//         source={{
//           uri: fileUrl,
//         }}
//         style={{
//           width: '100%',
//           height: 100,
//           resizeMode: 'contain',
//           margin: 5
//         }}
//       />
//       <TouchableOpacity
//         style={styles.button}
//         onPress={checkPermission}>
//         <Text style={styles.text}>
//           Download File
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Dashboard;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   text: {
//     color: '#fff',
//     fontSize: 20,
//     textAlign: 'center',
//     padding: 5,
//   },
//   button: {
//     width: '80%',
//     padding: 10,
//     backgroundColor: 'blue',
//     margin: 10,
//   },

// });



// import React, { Component } from 'react'
// import { Text, View, TouchableOpacity } from 'react-native'
// import SQLite from 'react-native-sqlite-storage'
// let db;
// export class index extends Component {
//   constructor(props) {
//     super(props)
//     db = SQLite.openDatabase(
//       {
//         name: 'sqlite.db',
//         createFromLocation: 0,
//       },
//       this.successToOpenDB,
//       this.failToOpenDB,
//     );
//   }
//   successToOpenDB() {
//     db.transaction(tx => {
//       tx.executeSql('SELECT * from account',[],(tx, results)=>{
//         // let data = results.rows.length;
//         console.log('results:', results)
//       })
//     });
//   }
//   failToOpenDB(err) {
//     console.log(err)
//   }

//   onInsertData() {
//     var query = "INSERT INTO account (account_id,account_state_id,account_state_name,address,balance,birthday,cct_id,created_date,customer_image,district,expired_date,family_refence,first_name, gender,issued_date,last_name,msisdn,paper_number,paper_type,party_id,party_role_id,province,recipient_type,role_id,role_name,village) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
//     var params = ['S_account_id', 'S_account_state_id', 'S_account_state_name', 'S_address', '1000', 'S_birthday', 'S_cct_id', 'S_created_date', 'S_customer_image', 'S_district', 'S_expired_date', 'S_family_refence', 'S_first_name', 'S_gender', 'S_issued_date', 'S_last_name', 'S_msisdn', 'S_paper_number', 'S_paper_type', 'S_party_id', 'S_party_role_id', 'S_province', 'S_recipient_type', 'S_role_id', 'S_role_name', 'S_village'];
//     db.transaction((tx) => {
//       tx.executeSql(query, params, (tx, results) => {
//         console.log(results);
//         alert("ok")
//       },
//         function (tx, err) {
//           alert('not');
//           return;
//         });
//     });
//     // const {}=this.state
//     // db.transaction(function (tx) {
//     //   tx.executeSql(
//     //     'INSERT INTO account (account_id,account_state_id,account_state_name,address,balance,birthday,cct_id,created_date,customer_image,district,expired_date,family_refence,first_name, gender,issued_date,last_name,msisdn,paper_number,paper_type,party_id,party_role_id,province,recipient_type,role_id,role_name,village) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
//     //     ['S_account_id', 'S_account_state_id', 'S_account_state_name', 'S_address', '1000', 'S_birthday', 'S_cct_id', 'S_created_date', 'S_customer_image', 'S_district', 'S_expired_date', 'S_family_refence', 'S_first_name', 'S_gender', 'S_issued_date', 'S_last_name', 'S_msisdn', 'S_paper_number', 'S_paper_type', 'S_party_id', 'S_party_role_id', 'S_province', 'S_recipient_type', 'S_role_id', 'S_role_name', 'S_village'],
//     //     (tx, results) => {
//     //       console.log('Results', results.rowsAffected)
//     //       if (results.rowsAffected > 0) {
//     //         alert('Data Inserted Successfully....');
//     //       } else {
//     //         alert('Failed....');
//     //       }
//     //     }
//     //   )
//     // })
//   }
//   componentDidMount() {

//     db.transaction(tx => {
//       tx.executeSql('SELECT * from account',[],(tx, results)=>{
//         // let data = results.rows.length;
//         console.log('results:', results)
//       })
//     });
//   }
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
//         <TouchableOpacity onPress={() => this.onInsertData()}>
//           <Text>Insert</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }
// }

// export default index




// import React, { useState, useEffect } from 'react';
// import { SafeAreaView, Text, View, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';
// import { openDatabase } from 'react-native-sqlite-storage';
// var db = openDatabase({ name: 'SchoolDatabase.db' });

// export default function App() {

//   const [S_Name, setName] = useState('');
//   const [S_Phone, setPhone] = useState();
//   const [S_Address, setAddress] = useState('');

//   useEffect(() => {
//     db.transaction(function (txn) {
//       txn.executeSql(
//         "SELECT name FROM sqlite_master WHERE type='table' AND name='Student_Table'",
//         [],
//         function (tx, res) {
//           console.log('item:', res.rows.length);
//           if (res.rows.length == 0) {
//             txn.executeSql('DROP TABLE IF EXISTS Student_Table', []);
//             txn.executeSql(
//               'CREATE TABLE IF NOT EXISTS Student_Table(student_id INTEGER PRIMARY KEY AUTOINCREMENT, student_name VARCHAR(30), student_phone INT(15), student_address VARCHAR(255))',
//               []
//             );
//           }
//         }
//       );
//     })

//   }, []);

//   const insertData = () => {

//     db.transaction(function (tx) {
//       tx.executeSql(
//         'INSERT INTO Student_Table (student_name, student_phone, student_address) VALUES (?,?,?)',
//         [S_Name, S_Phone, S_Address],
//         (tx, results) => {
//           console.log('Results', results.rowsAffected);
//           if (results.rowsAffected > 0) {
//             Alert.alert('Data Inserted Successfully....');
//           } else Alert.alert('Failed....');
//         }
//       );
//     });

//     viewStudent() ;

//   }

//   const viewStudent = () => {

//     db.transaction((tx) => {
//       tx.executeSql(
//         'SELECT * FROM Student_Table',
//         [],
//         (tx, results) => {
//           var temp = [];
//           for (let i = 0; i < results.rows.length; ++i)
//             temp.push(results.rows.item(i));
//           console.log(temp);
//         }
//       );
//     });

//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.mainContainer}>

//         <Text style={{ fontSize: 24, textAlign: 'center', color: '#000' }}>
//           Insert Data Into SQLite Database
//         </Text>

//         <TextInput
//           style={styles.textInputStyle}
//           onChangeText={
//             (text) => setName(text)
//           }
//           placeholder="Enter Student Name"
//           value={S_Name} />

//         <TextInput
//           style={styles.textInputStyle}
//           onChangeText={
//             (text) => setPhone(text)
//           }
//           placeholder="Enter Student Phone Number"
//           keyboardType={'numeric'}
//           value={S_Phone} />

//         <TextInput
//           style={[styles.textInputStyle, { marginBottom: 20 }]}
//           onChangeText={
//             (text) => setAddress(text)
//           }
//           placeholder="Enter Student Address"
//           value={S_Address} />

//         <TouchableOpacity
//           style={styles.touchableOpacity}
//           onPress={insertData}>

//           <Text style={styles.touchableOpacityText}> Click Here To Insert Data Into SQLite Database </Text>

//         </TouchableOpacity>

//       </View>

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 10,
//   },

//   touchableOpacity: {
//     backgroundColor: '#0091EA',
//     alignItems: 'center',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%'
//   },

//   touchableOpacityText: {
//     color: '#FFFFFF',
//     fontSize: 23,
//     textAlign: 'center',
//     padding: 8
//   },

//   textInputStyle: {
//     height: 45,
//     width: '90%',
//     textAlign: 'center',
//     borderWidth: 1,
//     borderColor: '#00B8D4',
//     borderRadius: 7,
//     marginTop: 15,
//   },
// });





// import React, { Component } from 'react';
// import { View, FlatList, SafeAreaView, Text, StyleSheet } from 'react-native';
// import { getTransaction } from '../../Sqliteonline/account'
// class index extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       result: []
//     };
//   }
//   componentDidMount() {
//     getTransaction().then((result) => {
//       this.setState({ result });
//       console.log('result:', result)
//     }).catch((error) => {
//       this.setState({ result: [] });
//     });
//   }
//   renderItemMenu = (item) => {
//     return (
//       <View>
//         <Text numberOfLines={2} >{item.account_id}</Text>
//         <Text numberOfLines={2} >{item.last_name}</Text>
//       </View>
//     )
//   }
//   render() {
//     return (
//       <SafeAreaView style={styles.continue}>
//         <FlatList
//           data={this.state.result}
//           renderItem={({ item, index }) => this.renderItemMenu(item, index)}
//           keyExtractor={item => item.id}
//         />
//       </SafeAreaView>
//     );
//   }
// }

// export default index;
// const styles = StyleSheet.create({
//   continue: {
//     justifyContent: 'center',
//     flex: 1,
//     alignItems:'center'
//   }
// })



import React, { Component } from 'react';
import { View, ActivityIndicator, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '02091100394'
    };
  }
  LoadingIndicatorView() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator color='#009b88' size='large' />
      </View>
    )
  }


  render() {
    return (
      <WebView
        source={{ uri: `https://183.182.100.223:8512` }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn(
            'WebView received error status code: ',
            nativeEvent.statusCode,
          );
        }}
        renderLoading={this.LoadingIndicatorView}
        startInLoadingState={true}
        mediaPlaybackRequiresUserAction={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}

      />

    );
  }
}

export default index;

