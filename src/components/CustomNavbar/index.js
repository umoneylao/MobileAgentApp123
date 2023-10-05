import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity, Button, TouchableHighlight } from 'react-native'
import styles from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { Images, Colors } from '../../themes'
import LinearGradient from 'react-native-linear-gradient'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
class CustomNavbar extends Component {
  onFillter = () => {
    this.props.onFillter()
  }
  onBack() {
    this.props.onBack()
  }
  onShowResult() {
    this.props.onShowResult()
  }
  onTwitter() {
    this.props.onTwitter()
  }
  renderLeft() {
    const { navigation, onBackLeft } = this.props
    return (
      <View style={styles.leftContainer}>
        {this.props.backButton
          ? (
            <TouchableOpacity onPress={() => this.onBack()}>
              <View style={{ width: 50, padding: 10, height: 50 }} >
                <Ionicons name='md-arrow-back-sharp' size={25} color={Colors.black} style={{left:-10}} />
              </View>
            </TouchableOpacity>
          )
          : null
        }

      </View>
    )
  }

  renderRight() {
    return (
      <View style={styles.rightContainer}>
        {this.props.rightTitle ? (
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={() => this.onShowResult()} style={{ padding: 10 }}>
              <FontAwesome name="list-ol" size={22} color={Colors.colorStart} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onTwitter()} style={{ padding: 10 }}>
              <FontAwesome name="twitter" size={22} color={Colors.colorStart} style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        ) : this.props.iconUmoney ?
          <View>
            <Image source={Images.ic_umoneyConf} style={{ width: 38, height: 19, }} />
          </View>
          : this.props.Fillter ?
            <TouchableOpacity onPress={() => this.onFillter()}>
              <View style={{ alignItems: 'center', padding: 10 }}>
                <Ionicons name='filter' size={30} color={Colors.white} />
              </View>
            </TouchableOpacity>

            : null}
      </View>
    )
  }

  renderMid() {

    let msg = this.props.txtTitle ? I18n.t(this.props.txtTitle) : null;
    return (
      <View style={styles.midContainer}>
        {this.props.headerBackground ?
          (<Text style={styles.textHeader1}>{msg}</Text>)
          : (<Text style={styles.textHeader}>{msg}</Text>)}
      </View>
    )

  }

  render() {
    const { hideBackground, headerBackground } = this.props

    return (
      !hideBackground ? (
        headerBackground ? (
          <LinearGradient
            style={styles.container3}
            colors={[Colors.blueLight, Colors.colorCenter, Colors.coloorEnd]}>
            {this.renderLeft()}
            {this.renderMid()}
            {this.renderRight()}
          </LinearGradient>
        ) :
          (
            <View
              style={styles.container}>
              {this.renderLeft()}
              {this.renderMid()}
              {this.renderRight()}
            </View>
          )
      ) :
        (
          <View style={[styles.container2, { backgroundColor: Colors.white }]}>
            {this.renderLeft()}
            {this.renderMid()}
            {this.renderRight()}
          </View>
        )
    )
  }
}

// Prop type warnings
const propTypes = {
  backButton: PropTypes.bool,
  midTitle: PropTypes.bool,
  rightTitle: PropTypes.bool,
  onPressLeft: PropTypes.func,
  txtTitle: PropTypes.string,
  iconUmoney: PropTypes.bool,
}

const defaultProps = {
  // codeLength: 5

}

CustomNavbar.propTypes = propTypes
CustomNavbar.defaultProps = defaultProps


const mapStateToProps = (state) => {
  return {
    changeLanguageData: state.auth.changeLanguageData,
    infoAccount: state.auth.infoAccount
  }
}


export default connect(mapStateToProps, null)(CustomNavbar)