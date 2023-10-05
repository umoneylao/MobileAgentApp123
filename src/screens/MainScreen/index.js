import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Home, Analysis, UserProfile, History, PromotionScreen,
  PromotionDetail, HistoryDetail, Comingsoon, MenuTransfer, MenuCashIn, MenuCashOut,
  TopUp, TransactionDetail, TranferToBank, TranferToBankAccount, TransferAgentToAgent,
  CashInScreen, TransferScreen, AgentCashOut, CashOutScreen, PSTNService, InternetPayment,
  InternemtPaymentInput, Leasing, LeasingInput, ScratchMenuApp, BuyLottery, LotterySocxay,
  LotteryInput, LotteryNCC, AgentRequestEMoney, RequestCash, Setting, ChangePin, TransactionResult,
  PosCashin, Debtsettlement, ApprovalTransection, PaySubsidies, information, Testapp, InviteFriend,
  uploadImage, SokxayService,UploadImage, webview
} from '../../screens'
import { Colors, Images } from '../../themes'
import I18n from 'react-native-i18n'
import { Image } from 'react-native'
const HomeStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const MainTabScreen = () => (
  <Tab.Navigator

    initialRouteName="Home"
    activeColor={Colors.colorIcon}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: I18n.t('home'),
        tabBarColor: Colors.white,
        tabBarIcon: () => (
          <Image source={Images.tab_home} style={{ height: 28, width: 28 }} />
        ),
      }}
    />
    <Tab.Screen
      name="PromotionScreen"
      component={PromotionScreen}
      options={{
        tabBarLabel: I18n.t('promotion'),
        tabBarColor: Colors.white,
        tabBarIcon: () => (
          <Image source={Images.tab_any} style={{ height: 28, width: 28 }} />
        ),

      }}

    />
    <Tab.Screen
      name="Analysis"
      component={Analysis}
      options={{
        tabBarLabel: I18n.t('analysis'),
        tabBarColor: Colors.white,
        tabBarIcon: () => (
          <Image source={Images.tab_unit} style={{ height: 28, width: 28 }} />

        ),

      }}
    />
    <Tab.Screen
      name="History"
      component={History}
      options={{
        tabBarLabel: I18n.t('utility'),
        tabBarColor: Colors.white,
        tabBarIcon: () => (
          <Image source={Images.tab_history} style={{ height: 28, width: 28 }} />
        ),
      }}
    />
    <Tab.Screen
      name="UserProfile"
      component={UserProfile}
      options={{
        tabBarLabel: I18n.t('account'),
        tabBarColor: Colors.white,
        tabBarIcon: ({ color }) => (
          <Image source={Images.tab_user} style={{ height: 28, width: 28, marginTop: 0 }} />

        ),

      }}
    />
  </Tab.Navigator>
);


function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.white,
          shadowColor: Colors.white, // iOS
          elevation: 0,// Android,
          shadowOpacity: 1

        },
        headerTintColor: Colors.white,
        headerTitleStyle: {

        },
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={MainTabScreen}
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
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false

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
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false

        })}
      />
      <HomeStack.Screen
        name="MenuCashOut"
        component={MenuCashOut}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="MenuCashIn"
        component={MenuCashIn}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="TopUpContainer"
        component={TopUp}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />

      <HomeStack.Screen
        name="TransactionDetail"
        component={TransactionDetail}
        options={({ route }) => ({

          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />

      <HomeStack.Screen
        name="TranferToBank"
        component={TranferToBank}
        options={({ route }) => ({

          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />

      <HomeStack.Screen
        name="TranferToBankAccount"
        component={TranferToBankAccount}
        options={({ route }) => ({

          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />

      <HomeStack.Screen
        name="TransferAgentToAgent"
        component={TransferAgentToAgent}
        options={({ route }) => ({

          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="CashInStackContainer"
        component={CashInScreen}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="TransferContainer"
        component={TransferScreen}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="AgentCashOutContainer"
        component={AgentCashOut}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="CashOutStackContainer"
        component={CashOutScreen}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />

      <HomeStack.Screen
        name="PstnContainer"
        component={PSTNService}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="InternetContainer"
        component={InternetPayment}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="InternemtPaymentInput"
        component={InternemtPaymentInput}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="LeasingContainer"
        component={Leasing}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="LeasingInput"
        component={LeasingInput}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false

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
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="LotteryContainer"
        component={LotterySocxay}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="LotteryInputScreen"
        component={LotteryInput}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false

        })}
      />
      <HomeStack.Screen
        name="LotteryNCC"
        component={LotteryNCC}
        options={({ route }) => ({
          // title: I18n.t('NCCLottery'),
          // headerStyle: { backgroundColor: Colors.white },
          // headerTintColor: Colors.backColor,
          // headerBackTitleVisible: false,
          // tabBarVisible: false,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="AgentRequestEMoneyContainer"
        component={AgentRequestEMoney}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="RequestCashContainer"
        component={RequestCash}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="Setting"
        component={Setting}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="ChangePin"
        component={ChangePin}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="TransactionResult"
        component={TransactionResult}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="Debtsettlement"
        component={Debtsettlement}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="PosCashin"
        component={PosCashin}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="ApprovalTransection"
        component={ApprovalTransection}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />
      <HomeStack.Screen
        name="PaySubsidies"
        component={PaySubsidies}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false
        })}
      />

      <HomeStack.Screen
        name="information"
        component={information}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false

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
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false

        })}
      />
      <HomeStack.Screen
        name="uploadImage"
        component={uploadImage}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false

        })}
      />
      {/* SokxayService */}
      <HomeStack.Screen
        name="SokxayService"
        component={SokxayService}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false

        })}
      />
      {/* UploadImage */}
      <HomeStack.Screen
        name="UploadImage"
        component={UploadImage}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: false

        })}
      />
      {/* webview */}
      <HomeStack.Screen
        name="webview"
        component={webview}
        options={({ route }) => ({
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
