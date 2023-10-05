import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View } from 'react-native'
import styles from './styles'
// import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors, Metrics } from '../../themes'

export default class FullNewButton extends Component {

  render() {
    const { isDisable } = this.props;
    return (
      !isDisable ?
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          {this.props.arrowLeft ? <Ionicons name='ios-arrow-back' size={Metrics.section} color={Colors.white} style={styles.arrowLeftIcon} /> : null}
            <Text style={[styles.buttonText, this.props.textStyle]}>{this.props.text}</Text>
          {this.props.arrowRight ? <Ionicons name='ios-arrow-forward' size={Metrics.section} color={Colors.white} style={styles.arrowRightIcon} /> : null}
        </TouchableOpacity> :
        <View style={[styles.buttonDisable, this.props.styles]}>
          <Text style={[styles.buttonText, this.props.textStyle]}>{this.props.text}</Text>
        </View>
    )
  }
}
