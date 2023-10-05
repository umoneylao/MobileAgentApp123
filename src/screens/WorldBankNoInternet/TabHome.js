import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WorldBank, RecipientInformation, PaySubsidiesScreen, Userinfo, uploadimgworldbank, Congratulations, ListPayment, ListCashOutSuccess } from '../../screens';
import { Colors } from '../../themes'
import { HeaderCompont } from '../../components'

const RootStack = createStackNavigator();
function RootStackScreen() {
    return (
        <RootStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.white,
                    shadowColor: Colors.white,
                    elevation: 0
                },
                headerTintColor: Colors.backColor,
            }}
        >
            <RootStack.Screen
                name="WorldBank"
                component={WorldBank}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff'
                })}
            />
            <RootStack.Screen
                name="RecipientInformation"
                component={RecipientInformation}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='RecipientInformation' />,
                    headerBackTitleVisible: false,
                })}
            />
            <RootStack.Screen
                name="PaySubsidiesScreen"
                component={PaySubsidiesScreen}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='PaySubsidies' />,
                    headerBackTitleVisible: false,
                })}
            />
            <RootStack.Screen
                name="Userinfo"
                component={Userinfo}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='PaySubsidies' />,
                    headerBackTitleVisible: false,
                })}
            />

            <RootStack.Screen
                name="uploadimgworldbank"
                component={uploadimgworldbank}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='PaySubsidies' />,
                    headerBackTitleVisible: false,
                })}
            />
             <RootStack.Screen
                name="Congratulations"
                component={Congratulations}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='transactionDetail' iconUmoney iconBank />,
                    headerBackTitleVisible: false,
                    headerLeft: false
                })}
            />
            <RootStack.Screen
                name="ListPayment"
                component={ListPayment}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='PaySubsidies' />,
                    headerBackTitleVisible: false,
                })}
            />
             <RootStack.Screen
                name="ListCashOutSuccess"
                component={ListCashOutSuccess}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='ListCashOutSuccessful' />,
                    headerBackTitleVisible: false,
                })}
            />

        </RootStack.Navigator>
    )
};
export default function App() {
    return (
        <RootStackScreen />
    );
}









