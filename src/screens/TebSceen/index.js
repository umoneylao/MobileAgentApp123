import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Button
} from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import Svg, { Path } from 'react-native-svg';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Colors, Images } from '../../themes'
import { createStackNavigator } from '@react-navigation/stack';
import I18n from 'react-native-i18n'

import {
    Home, Analysis, UserProfile, History, PromotionScreen,
    PromotionDetail, HistoryDetail, Comingsoon, MenuTransfer, MenuCashIn, MenuCashOut,
    TopUp, TransactionDetail, TranferToBank, TranferToBankAccount, TransferAgentToAgent,
    CashInScreen, TransferScreen, AgentCashOut, CashOutScreen, PSTNService, InternetPayment,
    InternemtPaymentInput, Leasing, LeasingInput, ScratchMenuApp, BuyLottery, LotterySocxay,
    LotteryInput, LotteryNCC, AgentRequestEMoney, RequestCash, Setting, ChangePin, TransactionResult,
    PosCashin, Debtsettlement, ApprovalTransection, PaySubsidies, information, Testapp, InviteFriend,
    uploadImage, SokxayService, UploadImage, GameScreen, PreRegister, AgentRegisterForUser, SearchHistory,
    QrScanScreen, MainSetting, Share, APAInsurance, CashinByQR, ViewCertificate, NampapaScreen,
    RecipientInformation, ListPayment, MenuWorldBank, DetailsCashOut, ListPaymentSuccess,
    ListCashOutError, webview, ShopUnitel, UnitelSalesman, UnitelCommission, BaduLoto, WebviewMyUnitel,
    MBLesinge
} from '../../screens'
import { HeaderCompont } from '../../components'
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
    var isSelected = accessibilityState.selected
    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: Colors.white }}></View>
                    <Svg
                        width={70}
                        height={57}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={Colors.white}
                        />

                    </Svg>

                    <View style={{ flex: 1, backgroundColor: Colors.white }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: Colors.white
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: Colors.white
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}

const CustomTabBar = (props) => {
    if (isIphoneX()) {
        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: Colors.white
                    }}
                ></View>
                <BottomTabBar
                    {...props.props}
                />
            </View>
        )
    } else {
        return (
            <BottomTabBar
                {...props.props}
            />
        )
    }

}

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderTopWidth: 0,
                    backgroundColor: "transparent",
                    elevation: 0
                }
            }}
            tabBar={(props) => (
                <CustomTabBar
                    props={props}
                />
            )}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={Images.tab_home}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? Colors.blueLight : Colors.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    ),

                }}
            />

            <Tab.Screen
                name="PromotionScreen"
                component={PromotionScreen}
                options={{

                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={Images.tab_any}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? Colors.blueLight : Colors.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Analysis"
                component={Analysis}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={Images.tab_unit}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? Colors.blueLight : Colors.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="History"
                component={History}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={Images.tab_history}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? Colors.blueLight : Colors.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="UserProfile"
                component={UserProfile} // UserProfile /MainSetting
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={Images.tab_user}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? Colors.blueLight : Colors.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />


        </Tab.Navigator>
    )
}


function HomeStackScreen() {

    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.white,
                    shadowColor: Colors.white,
                    elevation: 0
                },
                headerTintColor: Colors.backColor,
            }}
        >
            <HomeStack.Screen
                name="Home"
                component={Tabs}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff'
                })}
            />

            <HomeStack.Screen
                name="PromotionDetail"
                component={PromotionDetail}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeft: false
                })}
            />

            <HomeStack.Screen
                name="HistoryDetail"
                component={HistoryDetail}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='description' />
                })}
            />
            <HomeStack.Screen
                name="Comingsoon"
                component={Comingsoon}
                options={({ route }) => ({
                    title: I18n.t('comingSoon'),
                    headerBackTitleVisible: false,
                    headerTintColor: Colors.backColor,
                })}
            />


            <HomeStack.Screen
                name="MenuTransfer"
                component={MenuTransfer}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='AgentTransferKVKV' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="MenuCashOut"
                component={MenuCashOut}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='agentCashOut' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="MenuCashIn"
                component={MenuCashIn}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='transferToCustomer' />,
                    headerBackTitleVisible: false,

                })}
            />
            <HomeStack.Screen
                name="TopUpContainer"
                component={TopUp}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='TopUp' />,
                    headerBackTitleVisible: false,
                })}
            />

            <HomeStack.Screen
                name="TransactionDetail"
                component={TransactionDetail}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='transactionDetail' />,
                    headerBackTitleVisible: false,
                })}
            />

            <HomeStack.Screen
                name="TranferToBank"
                component={TranferToBank}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='tranterTobank' />,
                    headerBackTitleVisible: false,
                })}
            />

            <HomeStack.Screen
                name="TranferToBankAccount"
                component={TranferToBankAccount}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='NAV_VIET_BANK' />,
                    headerBackTitleVisible: false,
                })}
            />

            <HomeStack.Screen
                name="TransferAgentToAgent"
                component={TransferAgentToAgent}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='transferToAnotherAgent' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="CashInStackContainer"
                component={CashInScreen}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='transferToCustomerto' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="TransferContainer"
                component={TransferScreen}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='transferToCustomerNoEwall' />,
                    headerBackTitleVisible: false,

                })}
            />
            <HomeStack.Screen
                name="AgentCashOutContainer"
                component={AgentCashOut}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='cashOutForPos' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="CashOutStackContainer"
                component={CashOutScreen}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='cashOutForCustomerNoEwallet' />,
                    headerBackTitleVisible: false,
                })}
            />

            <HomeStack.Screen
                name="PstnContainer"
                component={PSTNService}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='pstnPayment' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="InternetContainer"
                component={InternetPayment}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='internetPayment' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="InternemtPaymentInput"
                component={InternemtPaymentInput}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='internetPayment' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="LeasingContainer"
                component={Leasing}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='leasing' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="LeasingInput"
                component={LeasingInput}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='leasing' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="ScratchMenuApp"
                component={ScratchMenuApp}
                options={({ route }) => ({
                    headerShown: false,
                })}
            />
            <HomeStack.Screen
                name="BuyLottery"
                component={BuyLottery}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='BuyLottery' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="LotteryContainer"
                component={LotterySocxay}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='lottery' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="LotteryInputScreen"
                component={LotteryInput}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='LotteryService' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="LotteryNCC"
                component={LotteryNCC}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeft: false

                    // headerTitle: () => <HeaderCompont txtTitle='NCCLottery' on={()=>this.on()} />,
                    // headerBackTitleVisible: false,
                    // headerTitle: props => <HeaderCompont {...props} txtTitle='NCCLottery' />,
                    // headerRight: () => (
                    //    <View>

                    //    </View>
                    // ),
                    // headerBackTitleVisible: false,

                })}
            />
            <HomeStack.Screen
                name="AgentRequestEMoneyContainer"
                component={AgentRequestEMoney}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='requestToFund' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="RequestCashContainer"
                component={RequestCash}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='requestCash' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="Setting"
                component={Setting}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='setting' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="ChangePin"
                component={ChangePin}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='setting' />,
                    headerBackTitleVisible: false,

                })}
            />
            <HomeStack.Screen
                name="TransactionResult"
                component={TransactionResult}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='transactionDetail' iconUmoney iconBank />,
                    headerBackTitleVisible: false,
                    headerLeft: false
                })}
            />
            <HomeStack.Screen
                name="Debtsettlement"
                component={Debtsettlement}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='Debtsettlement' />,
                    headerBackTitleVisible: false,

                })}
            />
            <HomeStack.Screen
                name="PosCashin"
                component={PosCashin}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='PosCashin' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="ApprovalTransection"
                component={ApprovalTransection}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='approvalTransaction' />,
                    headerBackTitleVisible: false,

                })}
            />
            <HomeStack.Screen
                name="PaySubsidies"
                component={PaySubsidies}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='PaySubsidies' />,
                    headerBackTitleVisible: false,
                })}
            />

            <HomeStack.Screen
                name="information"
                component={information}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='cardInfo' />,
                    headerBackTitleVisible: false,

                })}
            />
            <HomeStack.Screen
                name="Testapp"
                component={Testapp}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeft: false

                })}
            />

            <HomeStack.Screen
                name="InviteFriend"
                component={InviteFriend}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='InviteNewUserNotes' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="uploadImage"
                component={uploadImage}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='PaySubsidies' />,
                    headerBackTitleVisible: false,
                })}
            />

            <HomeStack.Screen
                name="SokxayService"
                component={SokxayService}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='sokxayService' />,
                    headerBackTitleVisible: false,
                })}
            />

            <HomeStack.Screen
                name="UploadImage"
                component={UploadImage}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='sokxayService' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="GameScreen"
                component={GameScreen}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeft: false

                })}
            />
            <HomeStack.Screen
                name="PreRegister"
                component={PreRegister}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='AgentRegisterForUser' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="AgentRegisterForUser"
                component={AgentRegisterForUser}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='AgentRegisterForUser' />,
                    headerBackTitleVisible: false,
                })}
            />

            <HomeStack.Screen
                name="SearchHistory"
                component={SearchHistory}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeft: false
                    // headerTitle: () => <HeaderCompont txtTitle='transactionHistory' />,
                    // headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="QrScanScreen"
                component={QrScanScreen}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='QRPayment' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="ShareScreen"
                component={Share}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='share' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="APAInsurance"
                component={APAInsurance}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='APAInsurance' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="CashinByQR"
                component={CashinByQR}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='cashIn' />,
                    headerBackTitleVisible: false,
                })}
            />

            <HomeStack.Screen
                name="ViewCertificate"
                component={ViewCertificate}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='APAInsuranceContract' />,
                    headerBackTitleVisible: false,
                })}
            />

            <HomeStack.Screen
                name="NampapaScreen"
                component={NampapaScreen}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='WaterBill' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="ListPayment"
                component={ListPayment}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='PaySubsidies' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="RecipientInformation"
                component={RecipientInformation}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='RecipientInformation' />,
                    headerBackTitleVisible: false,
                })}
            />


            <HomeStack.Screen
                name="ListPaymentSuccess"
                component={ListPaymentSuccess}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='PaidItemsCompleted' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="MenuWorldBank"
                component={MenuWorldBank}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='PaySubsidies' />,
                    headerBackTitleVisible: false,
                })}
            />

            <HomeStack.Screen
                name="DetailsCashOut"
                component={DetailsCashOut}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='transactionDetail' />,
                    headerBackTitleVisible: false,
                })}
            />
            <HomeStack.Screen
                name="ListCashOutError"
                component={ListCashOutError}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='ListCashOutError' />,
                    headerBackTitleVisible: false,
                })}
            />

            <HomeStack.Screen
                name="webviewScreen"
                component={webview}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='BuyLottery' />,
                    headerBackTitleVisible: false,
                })}
            />
            
            <HomeStack.Screen
                name="ShopUnitel"
                component={ShopUnitel}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='ShopUnitel' />,
                    headerBackTitleVisible: false,
                })}
            />
           
            <HomeStack.Screen
                name="UnitelSalesman"
                component={UnitelSalesman}
                // options={({ route }) => ({
                //     headerTitle: () => <HeaderCompont txtTitle='UnitelSalesman' />,
                //     headerBackTitleVisible: false,
                // })}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeft: false
                })}
            />
           
            <HomeStack.Screen
                name="UnitelCommission"
                component={UnitelCommission}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='UnitelCommission' />,
                    headerBackTitleVisible: false,
                })}
            />
            {/* BaduLoto */}
            <HomeStack.Screen
                name="BaduLoto"
                component={BaduLoto}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='BaduLoto' />,
                    headerBackTitleVisible: false,
                })}
            />
            {/* WebviewMyUnitel Testapp */}
            <HomeStack.Screen
                name="WebviewMyUnitel"
                component={WebviewMyUnitel}
                options={({ route }) => ({
                    // headerTitle: () => <HeaderCompont txtTitle='WebviewMyUnitel' />,
                    // // headerTitle: false,
                    // headerBackTitleVisible: false,

                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeft: false
                })}
            />
            {/* //MBLesinge */}
            <HomeStack.Screen
                name="MBLesinge"
                component={MBLesinge}
                options={({ route }) => ({
                    // headerTitle: () => <HeaderCompont txtTitle='WebviewMyUnitel' />,
                    // // headerTitle: false,
                    // headerBackTitleVisible: false,

                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeft: false
                })}
            />
        </HomeStack.Navigator>
    )
}

export default function App() {
    return (
        <HomeStackScreen />
    )
}