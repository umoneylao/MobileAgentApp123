import React, { Component } from 'react'
import { View ,StatusBar} from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
export default class ACIndicator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bar: 'dark-content',
    }
  }

  render() {
    return (
      <View style={styles.container}>
         {/* <StatusBar barStyle={this.state.bar} backgroundColor='#fff' /> */}
        <LinearGradient colors={['#fff', '#38ABFD', '#43D4FF']} style={styles.gradient}>
          <LottieView
            source={require('../../../assets/found404.json')}
            autoPlay
            loop
          />
        </LinearGradient>

      </View>
    )
  }
}



