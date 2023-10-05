import React, { Component } from 'react'
import { TextInput, View, Text } from 'react-native'
import styles from './styles'
import {Colors} from '../../themes'
import I18n from 'react-native-i18n'
export default class CustomTextInput extends Component {
  focus () {
    this.refs.textInput.focus()
  }
  render () {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        {this.props.label ? <Text allowFontScaling={false} style={styles.label}>{this.props.label}</Text> : null}
        <View style={[styles.inputBlock, this.props.inputBlock, this.props.error ? { borderBottomColor: Colors.fire } : {}]}>
          <TextInput
            ref='textInput'
            style={[styles.textInput, this.props.textInputStyle]}
            placeholder={I18n.t('enterYourMobilePhoneNumber')}
            {...this.props}
            placeHolderTextColor = {Colors.placeholderColor}
            underlineColorAndroid='transparent'
            returnKeyType='done'
            
          />
          {this.props.icon}
        </View>
        <Text allowFontScaling={false} style={styles.error}>{this.props.error}</Text>
      </View>
    )
  }
}
