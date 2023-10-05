import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import { TranferToBankComponent, ActivityIndicator } from '../../components'
import { connect } from 'react-redux'
import { onLoadMenuBank } from '../../actions/Auth'
import * as Constant from '../../utils/Constant'
import styles from './styles';
import {
  LOAD_MENU_BANK_SUCCESS, LOAD_MENU_BANK_FAILED
} from '../../actions/types';
class TranferToBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      getMenuBank: null,
      language: null
    };
  }
  componentDidMount() {
    const { infoAccount } = this.props
    let lang = infoAccount.language
    let Bank = Constant.BANK
    this.props.onLoadMenuBank(Bank)
    this.setState({ isLoading: true, onCheckLoadMenu: true, language: lang });
  }
  componentWillReceiveProps(nextProps) {
    // console.log('nextProps-bopby', nextProps)
    const { isLoading, onCheckLoadMenu } = this.state
    if (isLoading && onCheckLoadMenu) {
      switch (nextProps.actionType) {
        case LOAD_MENU_BANK_SUCCESS:
          let dataMenuBank = nextProps.requestMenuBank.BANK
          this.setState({ isLoading: false, onCheckLoadMenu: false, getMenuBank: dataMenuBank });
          break;
        case LOAD_MENU_BANK_FAILED:
          this.setState({ isLoading: false, onCheckLoadMenu: false });
          break;
        default:
          break;
      }
    } else {
    }

  }
  onPressProcess(type) {
    this.props.navigation.navigate('TranferToBankAccount', { data: type })
  }
  render() {
    const { isLoading, getMenuBank, language } = this.state

    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <SafeAreaView style={styles.container}>
          {isLoading ? <ActivityIndicator /> : null}
          <View style={styles.box}>
            <TranferToBankComponent
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
export default connect(mapStateToProps, mapDispatchToProps)(TranferToBank);
