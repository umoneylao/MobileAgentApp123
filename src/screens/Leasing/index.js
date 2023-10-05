import React, { Component } from 'react';
import { View, Keyboard, TouchableWithoutFeedback, SafeAreaView, StatusBar } from 'react-native';
import { LeasingComponent } from '../../components'
import styles from './styles'
import { onLoadMenuBank } from '../../actions/Auth'
import { connect } from 'react-redux'
import { Colors } from '../../themes'

class Leasing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: null,
      isLoading: false,
      getMenuBank: null,
      bar: 'dark-content',
    };
  }
  onPressProcess(type) {
    Keyboard.dismiss()
    this.props.navigation.navigate('LeasingInput', { data: type })
  }
  componentDidMount() {
    const { infoAccount } = this.props
    let lang = infoAccount.language
    let Bank = 'LEASING'
    this.props.onLoadMenuBank(Bank)
    this.setState({ isLoading: true, onCheckLoadMenu: true, language: lang });
  }
  componentWillReceiveProps(nextProps) {
    const { isLoading, onCheckLoadMenu } = this.state
    if (isLoading && onCheckLoadMenu) {
      switch (nextProps.actionType) {
        case 'LOAD_MENU_BANK_SUCCESS':
          let dataMenuBank = nextProps.requestMenuBank.BANK
          this.setState({ isLoading: false, onCheckLoadMenu: false, getMenuBank: dataMenuBank });
          break;
        case 'LOAD_MENU_BANK_FAILED':
          this.setState({ isLoading: false, onCheckLoadMenu: false });
          break;
        default:
          break;
      }
    }
  }
  render() {
    const { isLoading, getMenuBank, language } = this.state
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.box}>
          <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
            <LeasingComponent
              onPressProcess={(type) => this.onPressProcess(type)}
              isdataMenuBank={getMenuBank}
              isLanguage={language}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.BankReducer.isFetching,
    infoAccount: state.auth.infoAccount,
    BankReducer: state.BankReducer,
    requestMenuBank: state.auth.requestMenuBank,
    actionType: state.auth.actionType,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLoadMenuBank: (Bank) => { dispatch(onLoadMenuBank(Bank)) },

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Leasing);
