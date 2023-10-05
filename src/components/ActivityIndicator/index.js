import React, { Component } from 'react'
import { View } from 'react-native'
import styles from './styles'
import LottieView from 'lottie-react-native';
export default class ACIndicator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.loading}>
        <View style={{ width: 50, height: 50, backgroundColor: '#ffffffff', borderRadius:10}}>
          <LottieView
            source={require('../../../assets/json.json')}
            autoPlay
            loop
            style={[{ width: 50, height: 50, }]}
          />
        </View>

      </View>
    )
  }
}
ACIndicator.defaultProps = {
}

ACIndicator.propTypes = {
}

