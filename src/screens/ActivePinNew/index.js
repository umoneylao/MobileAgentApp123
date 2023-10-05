import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { ActivityIndicator, Notification, FullTextInput, FullNewButton } from '../../components'
import styles from './styles'
import I18n from 'react-native-i18n'
import { isValidated } from '../../utils/Validate'
import { connect } from 'react-redux'
import * as Constant from '../../utils/Constant'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import { requestActive, setInfoAccount, setLoggedIn, login } from '../../actions/Auth'
import _ from 'lodash'
import { handleResponseCode } from '../../utils/ErrorManager'

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      NewPIN: null,
      ConfirmPIN: null,
      alerMessage: null
    };
  }
  componentWillMount() {
    const { params } = this.props.route
    this.setState({
      accountId: RequestField.getValueField(params.data, FIELD.ACCOUNT_ID),
      language: RequestField.getValueField(params.data, FIELD.LANGUAGE),
      currencyCode: RequestField.getValueField(params.data, FIELD.CURRENCY_CODE),
      roleId: RequestField.getValueField(params.data, FIELD.ROLE_ID),
      phoneNumber: RequestField.getValueField(params.data, FIELD.PHONE_NUMBER),
      customerName: RequestField.getValueField(params.data, FIELD.CUSTOMER_NAME),
    })
  }
  onPressChangePin() {
    const { NewPIN, ConfirmPIN, accountId, language, currencyCode, roleId, phoneNumber, customerName } = this.state
    if (NewPIN === ConfirmPIN) {
      RequestField.clearInitField()
      RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.CHANGE_ACTIVE_SERVICE)) // 003000
      RequestField.addToInitField(RequestField.addPhone(phoneNumber))
      RequestField.addToInitField(RequestField.addPinNew(NewPIN))
      RequestField.addToInitField(RequestField.addCustomerName(customerName))
      RequestField.addToInitField(RequestField.addCurrencyCode(currencyCode))
      RequestField.addToInitField(RequestField.addLanguage(language ? language : 'en_US'))
      RequestField.addToInitField(RequestField.addTIN(1))
      RequestField.addToInitField(RequestField.addCarriedAccId(accountId))
      RequestField.addToInitField(RequestField.addRoleId(roleId))
      const data = RequestField.addToInitField(RequestField.addAccountID(accountId))
      data.fieldMap = _.orderBy(data.fieldMap, 'fieldID')
      this.setState({ isRequestActive: true, isLoading: true })
      this.props.requestActive(data)
      RequestField.clearInitField()
    } else {
      // PinSame
      this.refs.PinSame.onOpen()
    }

  }
  onChangNewPIN(text) {
    const errorNewPIN = !text || text.length < 6 || text.length > 8 || !isValidated(text, Constant.VALIDATE_NUMERIC) ? I18n.t('pleaseInputYourNewPin') : null
    this.setState({ NewPIN: text, errorNewPIN })
  }
  onChangConfirmPIN(text) {
    const errorConfirmPIN = !text || text.length < 6 || text.length > 8 || !isValidated(text, Constant.VALIDATE_NUMERIC) ? I18n.t('pleaseConfirmYourNewPin') : null
    this.setState({ ConfirmPIN: text, errorConfirmPIN })
  }
  onPressSystemBusy() {
    this.refs.NotificationSystemBusy.onClose()
  }
  onPressPinActive() {
    this.refs.NotificationPinActive.onClose()
  }
  PinSame() {
    this.refs.PinSame.onClose()
  }
  youMustSetupPinFirst() {
    this.refs.youMustSetupPinFirst.onClose()
  }
  error10117() {
    this.refs.error10117.onClose()
  }
  error10114() {
    this.refs.error10114.onClose()
  }
  error10118() {
    this.refs.error10118.onClose()
  }
  state3() {
    this.refs.state3.onClose()
  }
  failedDueNoResponse() {
    this.refs.failedDueNoResponse.onClose()
  }
  onPressIsNoagent() {
    this.refs.phoneIsNotAgentOrSubAgent.onClose()
  }
  pinCancel() {
    this.refs.pinCancel.onClose()
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.isRequestActive && !nextProps.isFetching) {
      this.setState({ isRequestActive: false, isLoading: false })
      if (nextProps.dataActive && nextProps.dataActive.data.error ==='00000') {
        let repon = RequestField.getValueField(nextProps.dataActive.data.fieldMap, FIELD.RESPONSE_CODE)
        let mg = RequestField.getValueField(nextProps.dataActive.data.fieldMap, FIELD.RESPONSE_DESCRIPTION)
        switch (repon) {
          case '00000':
            const { phoneNumber } = this.state
            RequestField.addToInitField(RequestField.addPhone(phoneNumber))
            const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO)) // 311100
            this.setState({ isLogin: true, isLoading: true, isLoginViaReqActive: true })
            this.props.onLogIn(data);
            break;
          case 99999:
              this.refs.NotificationSystemBusy.onOpen()
              break;
          case repon:
            this.refs.pinCancel.onOpen()
            this.setState({ alerMessage: mg})
            break;
          default:
            break;
        }

      } else {
        if (nextProps.dataActive && nextProps.dataActive.data.responseCode) {
          handleResponseCode(nextProps.dataActive.data.responseCode)
        } else {
          this.refs.NotificationSystemBusy.onOpen()
        }
      }
    }
    if (this.state.isLogin && !nextProps.isFetching) {
      this.setState({ isLogin: false, isLoading: false })
      if (nextProps.user && nextProps.user.responseCode) {
        if (nextProps.user && nextProps.user.error === `00000`) {
          if (nextProps.user && nextProps.user.responseCode === '00000') {
            let roleId = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ROLE_ID)
            let phoneNumber = RequestField.getValueField(nextProps.user.fieldMap, FIELD.PHONE_NUMBER)
            if (roleId === 1 || roleId === 33 || roleId === 7) {
              let accountId = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ACCOUNT_ID)
              let customerName = RequestField.getValueField(nextProps.user.fieldMap, FIELD.CUSTOMER_NAME)
              let customerGender = RequestField.getValueField(nextProps.user.fieldMap, FIELD.CUSTOMER_GENDER)
              let language = RequestField.getValueField(nextProps.user.fieldMap, FIELD.LANGUAGE)
              let currencyCode = RequestField.getValueField(nextProps.user.fieldMap, FIELD.CURRENCY_CODE)
              let pan = RequestField.getValueField(nextProps.user.fieldMap, FIELD.PAN)
              let agentCode = RequestField.getValueField(nextProps.user.fieldMap, FIELD.STAFF_CODE)
              let parentCode = RequestField.getValueField(nextProps.user.fieldMap, FIELD.PARENT_CODE)
              let mainAccountID = RequestField.getValueField(nextProps.user.fieldMap, FIELD.MAIN_ACCOUNT_ID)
              this.setState({ returnedLanguage: language, returnedAccountID: accountId, returnedRoleID: roleId, returnedPhoneNumber: phoneNumber });
              this.props.setInfoAccount({ phoneNumber, accountId, customerName, customerGender, language, currencyCode, pan, agentCode, parentCode, roleId, mainAccountID })

              const status = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ACCOUNT_STATUS)
              switch (status) {
                case 'REGISTER':
                  this.refs.youMustSetupPinFirst.onOpen()
                  break;
                case 'CANCELED':
                  this.refs.error10117.onOpen()
                  break
                case 'ACTIVE':
                  if (this.state.isLoginViaReqActive) {
                    this.props.setLoggedIn()
                  } else {
                    this.setState({ contentModal: 'pleaseInputPinToLogin', statusSeason: 'active' })
                  }
                  break
                case 'INVALID PIN':
                  this.refs.error10114.onOpen()
                  break;
                case 'BLOCKED':
                  this.refs.error10118.onOpen()
                  break;
                case 'LOCKED':
                  this.refs.state3.onOpen()
                  break;
                default:
                  handleResponseCode(nextProps.user.responseCode, { phoneNumber: phoneNumber });
              }
            } else {
              this.refs.phoneIsNotAgentOrSubAgent.onOpen()
            }
          } else {
            let responseCode = nextProps.user && nextProps.user.responseCode ? `${nextProps.user.responseCode}` : 'systemBusy'
            if (nextProps.user && (responseCode === '00000' || responseCode === '10116')) {
              let roleId = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ROLE_ID)
              let phoneNumber = RequestField.getValueField(nextProps.user.fieldMap, FIELD.PHONE_NUMBER)
              const currentStatus = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ACCOUNT_STATUS)
              if (currentStatus) {
                if (roleId === 1 || roleId === 33 || roleId === 7) {
                  let accountId = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ACCOUNT_ID)
                  let customerName = RequestField.getValueField(nextProps.user.fieldMap, FIELD.CUSTOMER_NAME)
                  let customerGender = RequestField.getValueField(nextProps.user.fieldMap, FIELD.CUSTOMER_GENDER)
                  let language = RequestField.getValueField(nextProps.user.fieldMap, FIELD.LANGUAGE)
                  let currencyCode = RequestField.getValueField(nextProps.user.fieldMap, FIELD.CURRENCY_CODE)
                  let pan = RequestField.getValueField(nextProps.user.fieldMap, FIELD.PAN)
                  let agentCode = RequestField.getValueField(nextProps.user.fieldMap, FIELD.STAFF_CODE)
                  let parentCode = RequestField.getValueField(nextProps.user.fieldMap, FIELD.PARENT_CODE)
                  this.setState({ returnedLanguage: language, returnedAccountID: accountId, returnedRoleID: roleId, returnedPhoneNumber: phoneNumber });
                  this.props.setInfoAccount({ phoneNumber, accountId, customerName, customerGender, language, currencyCode, pan, agentCode, parentCode, roleId })

                  switch (currentStatus) {
                    case 'REGISTER':
                      this.refs.youMustSetupPinFirst.onOpen()
                      break;
                    case 'CANCELED':
                      this.refs.error10117.onOpen()
                      break
                    case 'LOCKED':
                      this.refs.error10117.onOpen()
                      break
                    case 'ACTIVE':
                      this.setState({ contentModal: 'pleaseInputPinToLogin', statusSeason: 'active' })
                      // this.refs.ValidatePinModal.onOpen()
                      break
                    case 'INVALID PIN':
                      this.refs.error10114.onOpen()
                      break;
                    case 'BLOCKED':
                      this.refs.error10118.onOpen()
                      break;
                    case 'LOCKED':
                      this.refs.state3.onOpen()
                      break;
                    default:
                      handleResponseCode(responseCode, { phoneNumber: phoneNumber });
                      break
                  }
                } else {
                  this.refs.phoneIsNotAgentOrSubAgent.onOpen()
                }
              } else {
                this.refs.phoneIsNotAgentOrSubAgent.onOpen()
              }
            }
          }
        } else {
          this.refs.NotificationSystemBusy.onOpen()
        }
      } else {
        this.refs.failedDueNoResponse.onOpen()
      }
    }
  }
  onClearNewPIN(){this.setState({NewPIN: null})}
  onClearConfirmPIN(){this.setState({ConfirmPIN: null})}
  render() {
    const { isLoading, NewPIN, errorNewPIN, ConfirmPIN, errorConfirmPIN, phoneNumber, alerMessage } = this.state
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {isLoading ? <ActivityIndicator /> : null}
          <View style={styles.main}>
            <View style={styles.itemText}>
              <FullTextInput
                label={I18n.t('InputYourNewPin')}
                placeholder={I18n.t('pleaseInputYourNewPin')}
                returnKeyType='done'
                keyboardType='numeric'
                value={NewPIN}
                error={errorNewPIN}
                maxLength={8}
                secureTextEntry={true}
                onChangeUserName={(text) => this.onChangNewPIN(text)}
                iconLeft='facebook'
                iconRight='close'
                textError={I18n.t('pleaseInputYourNewPin')}
                onclick={() => this.onClearNewPIN()}

              />

            </View>
            <View style={styles.itemText}>
              <FullTextInput
                label={I18n.t('ConfirmYourNewPin')}
                placeholder={I18n.t('pleaseConfirmYourNewPin')}
                returnKeyType='done'
                keyboardType='numeric'
                value={ConfirmPIN}
                error={errorConfirmPIN}
                maxLength={8}
                secureTextEntry={true}
                onChangeUserName={(text) => this.onChangConfirmPIN(text)}
                iconLeft='facebook'
                iconRight='close'
                textError={I18n.t('pleaseConfirmYourNewPin')}
                onclick={() => this.onClearConfirmPIN()}

              />

            </View>
            <View style={styles.btnCick}>
              <FullNewButton
                text={I18n.t('confirm')}
                onPress={() => this.onPressChangePin()}
                isDisable={(!NewPIN || errorNewPIN || !ConfirmPIN || errorConfirmPIN) ? true : false}
              />

            </View>

          </View>

        </View>
        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={I18n.t('11101')}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.onPressPinActive()}
          ref='NotificationPinActive'
        />
        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={I18n.t('systemBusy')}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.onPressSystemBusy()}
          ref='NotificationSystemBusy'
        />
        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={I18n.t('PinSame')}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.PinSame()}
          ref='PinSame'
        />
        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={I18n.t('youMustSetupPinFirst')}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.youMustSetupPinFirst()}
          ref='youMustSetupPinFirst'
        />
        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={I18n.t('10117')}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.error10117()}
          ref='error10117'
        />
        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={I18n.t('error10114')}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.error10114()}
          ref='error10114'
        />
        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={I18n.t('error10118')}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.error10118()}
          ref='error10118'
        />
        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={I18n.t('state3')}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.state3()}
          ref='state3'
        />
        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={I18n.t('failedDueNoResponse')}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.failedDueNoResponse()}
          ref='failedDueNoResponse'
        />
        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={I18n.t('phoneIsNotAgentOrSubAgent', { phoneNumber: phoneNumber })}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.onPressIsNoagent()}
          ref='phoneIsNotAgentOrSubAgent'
        />

        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={alerMessage}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.pinCancel()}
          ref='pinCancel'
        />
      </SafeAreaView>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isFetching: state.auth.isFetching,
    infoAccount: state.auth.infoAccount,
    dataActive: state.auth.dataActive,
    keepLoggedIn: state.auth.keepLoggedIn,

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: (phoneNumber, keepLoggedIn) => { dispatch(login(phoneNumber, keepLoggedIn)) },
    requestActive: (data) => { dispatch(requestActive(data)) },
    setInfoAccount: (data) => { dispatch(setInfoAccount(data)) },
    setLoggedIn: () => { dispatch(setLoggedIn()) },


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(index)

// export default index