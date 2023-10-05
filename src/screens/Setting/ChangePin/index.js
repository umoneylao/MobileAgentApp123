import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { validatePin } from '../../../actions/Auth'
// Styles
import styles from './styles'
import { InputCode, ValidatePinModal, AlertNative } from '../../../components'
import { Metrics } from '../../../themes'
import I18n from 'react-native-i18n'
import * as RequestField from '../../../utils/RequestField'
import Reactotron from 'reactotron-react-native'

class ChangePinScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      titleInput: 'pleaseInputYourCurrentPin',
      clearCode: false,
      season: 'currentPin'
    }
  }

  componentWillMount () {
  }

  componentWillReceiveProps (nextProps) {
    this.forceUpdate()
    //Reactotron.log('nxx')
    //Reactotron.log(nextProps)
    if (this.state.isInputCurrentPin && !nextProps.isFetching) {
      this.setState({ isInputCurrentPin: false })
      //Reactotron.log('lllll')
      if (nextProps.validateData.error === '00000') {
        //Reactotron.log('validateData 000')
        this.setState({ titleInput: 'pleaseInputYourNewPin', season: 'newPin' })
      } else {
        this.setState({ currentPin: '' })
        AlertNative('Incorrect pin')
      }
    }
  }

  onConfirmCode (code) {
    AlertNative("", code)
  }
  onFulfill (code) {
    const { newCode, season } = this.state
    const { infoAccount } = this.props
    if (season === 'currentPin') {
      RequestField.addToInitField(RequestField.addPhone(infoAccount.data.phoneNumber))
      RequestField.addToInitField(RequestField.addPin(code))
      RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
      const data = RequestField.addToInitField(RequestField.addAccountID(infoAccount.data.accountId))
      
      RequestField.addToInitField(RequestField.addProcessCode('000004'))
      this.setState({ isInputCurrentPin: true, currentPin: code })
      this.props.validatePin(data)
    }
    if (season === 'newPin') {
      this.setState({ titleInput: 'pleaseConfirmYourNewPin', season: 'confirmPin', newCode: code })
    }

    if (code === newCode && season === 'confirmPin') {
      // this.setState({titleInput: 'pleaseConfirmYourNewPin'})
      AlertNative("", 'navigate')
    }
    
  }

  render () {
    const { titleInput, clearCode } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.refs.ValidatePinModal.onOpen()}>
          <Text>ccccc</Text>
        </TouchableOpacity>
        <ValidatePinModal
          style={styles.validateModal}
          onFulfill={(code) => this.onFulfill(code)}
          ref='ValidatePinModal'
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    infoAccount: state.auth.infoAccount,
    isFetching: state.auth.isFetching,
    user: state.auth.user,
    validateData: state.auth.validateData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    validatePin: (pin) => { dispatch(validatePin(pin)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePinScreen)
