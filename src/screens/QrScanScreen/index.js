import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar } from 'react-native'
import { Colors, Images, Fonts, Metrics } from '../../themes'
import { ActivityIndicator } from '../../components'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyQrScreen from './MyQrScreen'
import ScanSreen from './ScanSreen'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'

const Tab = createMaterialTopTabNavigator();
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bar: 'dark-content',
            isLoading: false,
            dataQR: ''
        };
    }
    componentDidMount() {

    }
    render() {
        const { isLoading, dataQR } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                {isLoading ? <ActivityIndicator /> : null}
                <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
                <ScanSreen {...this.props} />
                {/* <Tab.Navigator
                    initialRouteName="Feed"
                    tabBarOptions={{
                        activeTintColor: Colors.orange,
                        inactiveTintColor: Colors.txtNumber,
                        style: {
                            backgroundColor: Colors.white,
                        },
                        labelStyle: {
                            labelStyle: { fontSize: 16 },
                        },
                        indicatorStyle: {
                            borderBottomColor: Colors.white,
                            borderBottomWidth: 2,
                        },
                    }}
                >
                    <Tab.Screen
                        name="ScanSreen"
                        component={props => <ScanSreen {...props} />}
                        options={{ tabBarLabel: I18n.t('ScanQr') }}
                    />
                    <Tab.Screen
                        name="MyQrScreen"
                        component={props => <MyQrScreen {...props} info={this.props.infoAccount} />}
                        options={{ tabBarLabel: I18n.t('MyCode') }}
                    />
                </Tab.Navigator> */}
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);

const styles = StyleSheet.create({

})
