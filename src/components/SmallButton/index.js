import React, { Component } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import styles from './styles'
import { Colors } from '../../themes'
import LinearGradient from 'react-native-linear-gradient'

export default class FullButton extends Component {


  render() {
    const { isDisable } = this.props;
    return (
      !isDisable ?
        (<TouchableOpacity style={[this.props.styles]} onPress={this.props.onPress}>
          <LinearGradient colors={[Colors.startGradientNav, Colors.endGradientNav]} style={styles.button}>
            <Text style={[styles.buttonText, this.props.textStyle]}>{this.props.text}</Text>
          </LinearGradient>
        </TouchableOpacity>)
        :
        (
          <View style={[styles.buttonDisable, this.props.styles]}>
            <Text style={[styles.buttonText, this.props.textStyle]}>{this.props.text}</Text>
          </View>
        )
    )
  }
}
