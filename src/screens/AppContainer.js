
'use strict'
import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { Platform, StatusBar, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../i18n/I18n'
import Permission from 'react-native-permissions'
import { Toast } from '../components'
import { logout } from '../actions/Auth'
import { LoginStack } from '../routers'
import { MainScreen, TabScreen } from '../screens';
import TabHome from '../screens/WorldBankNoInternet/TabHome'
import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native-animatable'


class AppContainer extends Component {
  constructor(props) {
    super(props)
    let language = 'lo'
    if (props.localLanguage) {
      language = props.localLanguage;
    } else {
      if (props.infoAccount && props.infoAccount.language && props.infoAccount.language.length > 2) {
        language = props.infoAccount.language.substr(3, 2)
        switch (language) {
          case 'US':
            language = 'en'
            break
          case 'LA':
            language = 'lo'
            break
          case 'VN':
            language = 'vn'
            break
          case 'CN':
            language = 'cn'
            break
          default:
            language = 'lo'
        }
      }
    }

    I18n.defaultLocale = language || 'lo'
    I18n.locale = language || 'lo'

    if (!this.props.keepLoggedIn) {
      if (this.props.previousPhone) {
        Toast('yourSessionHasTimedOut');
      }
      this.props.onLogOut(this.props.infoAccount && this.props.infoAccount.phoneNumber);
    }
  }
  componentDidMount() {

    if (Platform.OS === 'android') {
      Permission.request('contacts').then(response => {
        this.forceUpdate();
      })
    }
  }
  render() {
    console.log('<<<<< deeplink >>>>>>>')
    const deeplink = {
     
      prefixes: ['https://u-money.app.link', 'u-money://'],
      config: {
        Home: 'Home',
        conquerPhouBia: {
          path: 'conquerPhouBia/:itemId',
          params: {
            itemId: null
          }
        }
      }
    }

    return (
      <NavigationContainer linking={deeplink}>
        <View style={styel.container}>
          {this.props.isLoggedIn ? <TabScreen /> : this.props.isLoggedInNointernet ? <TabHome /> : <LoginStack />}
        </View>
      </NavigationContainer>
    )
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  auth: state.auth,
  nav: state.navigation,
  infoAccount: state.auth.infoAccount,
  localLanguage: state.auth.localLanguage,
  keepLoggedIn: state.auth.keepLoggedIn,
  isLoggedIn: state.auth.isLoggedIn,
  previousPhone: state.auth.previousPhone,
  isLoggedInNointernet: state.auth.isLoggedInNointernet,
})

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: (phoneNumber) => dispatch(logout(phoneNumber)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
const styel = StyleSheet.create({
  container: {
    flex: 1,
  }
})


































