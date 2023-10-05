import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, LanguageScreen, PinScreen, ActivePinNew, HeaderLogo, VerifyOTP, watater } from '../screens';
import { Colors } from '../themes'
import { HeaderCompont } from '../components'
const RootStack = createStackNavigator();

function RootStackScreen() {
    return (
        <RootStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.white,
                    shadowColor: Colors.white,
                    elevation: 0,
                },
                headerTintColor: Colors.backColor
            }}
        >
            <RootStack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={({ route }) => ({
                    headerTitle: () => <HeaderLogo />,
                    headerBackTitleVisible: false,
                })}
            />
            <RootStack.Screen
                name="LanguageScreen"
                component={LanguageScreen}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='selectLanguage' />,
                    headerBackTitleVisible: false,
                })}
            />
            <RootStack.Screen
                name="Code"
                component={PinScreen}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='login' />,
                    headerBackTitleVisible: false,
                })}
            />
            <RootStack.Screen
                name="ActivePinNew"
                component={ActivePinNew}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='activePIN' />,
                    headerBackTitleVisible: false,
                })}
            />
            <RootStack.Screen
                name="VerifyOTP"
                component={VerifyOTP}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='VerifyOTP' />,
                    headerBackTitleVisible: false,
                })}
            />
            <RootStack.Screen
                name="watater"
                component={watater}
                options={({ route }) => ({
                    headerTitle: () => <HeaderCompont txtTitle='VerifyOTP' />,
                    headerBackTitleVisible: false,
                })}
            />
            <RootStack.Screen
                name="HeaderLogo"
                component={HeaderLogo}
            />

        </RootStack.Navigator>
    )
};
export default function App() {
    return (
        <RootStackScreen />
    );
}







