import React, { Component } from 'react'
import { TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { login } from '../../actions/Auth'
import { requestCashIn } from '../../actions/CashOut'
import { getAccountInfo } from '../../actions/Transfer'
import { Payment, ActivityIndicator, AlertNative, Notification } from '../../components'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import * as Constant from '../../utils/Constant'
import I18n from 'react-native-i18n'
import { Colors } from '../../themes'
import _ from 'lodash'
import { handleResponseCode } from '../../utils/ErrorManager'
import { onCallCheckSwich, requestCheckAmount } from '../../actions/ByPassPIN'


class TransferAgentToAgent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAgent: false,
      mDefaultAgentCode: null,
      reponmessage: null,
      reponmessagePhone: null,
      byPassPIN: false,
      codeName: null
    }
  }
  //bopby
  componentDidMount() {
    this.onCheckBypassPIN()
    const { infoAccount } = this.props;
    if (infoAccount && infoAccount.roleId && infoAccount.roleId === 7) {
      this.setState({ isAgent: false })
    } else {
      this.setState({ isAgent: true })
    }
    if (this.props.route.params != undefined) {
      let qrCodeValue = this.props.route.params.qrCodeValue;
      let qrCodeState = this.props.route.params.qrCodeState;
      if (qrCodeState != null) {
        this.setState({ mDefaultAgentCode: qrCodeValue })
      }
    }
  }
  onCheckBypassPIN() {
    const { infoAccount } = this.props;
    let data = infoAccount.accountId;
    this.props.onCallCheckSwich(data);
    this.setState({ isCallCheckSwich: true, isLoading: true })
  }

  componentWillReceiveProps(nextProps) {
    this.forceUpdate()
    const { infoAccount } = nextProps;
    const { phone, money, message, messageNew, saveInfo, isCallCheckSwich, byPassPIN, dataAmount, isCheckAmount, isLoading,
      toAccountId, toName, toPhone } = this.state;
    if (this.state.isGetAccountInfoCurrentUser && !nextProps.authFetching) {
      this.setState({ isGetAccountInfoCurrentUser: false, isLoading: false });
      if (nextProps.user && nextProps.user.responseCode) {
        if (nextProps.user && nextProps.user.error === `00000`) {
          if (nextProps.user && nextProps.user.responseCode === '00000') {
            let moneyCusInput = parseInt(money.replace(/,/g, ""))
            this.props.navigation.navigate('TransactionDetail',
              {
                shopCode: phone,
                phone: toPhone,
                toName: toName,
                toPhone: toPhone,
                message: messageNew,
                money: money,
                saveInfo: saveInfo,
                onProcess: 'TRANSFER_E2E',
                selectState: 'TRANSFER_TO_AGENT',
                processName: I18n.t('transferToAnotherAgent'),
                processCode: ConfigCode.TRANSFER_E2E,//
                toAccountId: toAccountId, //
                checkDiscount: true,//
                byPassPIN: byPassPIN,
                checkAmount: moneyCusInput <= parseInt(dataAmount.par_value) ? true : false
              })
          } else {
            if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10118') { // status 3/7
              const status = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ACCOUNT_STATUS);
              switch (status) {
                case 'LOCKED':
                  this.refs.onPressMesseng.onOpen()
                  this.setState({ reponmessage: I18n.t('state3') })
                  break;
                case 'BLOCKED':
                  this.refs.onPressMesseng.onOpen()
                  this.setState({ reponmessage: I18n.t('state7') })

                  break;
                default:
                  this.refs.onPressMesseng.onOpen()
                  this.setState({ reponmessage: I18n.t('systemBusy') })

                  break;
              }
            } else if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10114') {

              this.refs.onPressMesseng.onOpen()
              this.setState({ reponmessage: I18n.t('state2') })

            } else if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10115') {
              this.refs.onPressMesseng.onOpen()
              this.setState({ reponmessage: I18n.t('state5') })

            } else if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10116') {
              const phone = RequestField.getValueField(nextProps.user.fieldMap, FIELD.PHONE_NUMBER);
              const status = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ACCOUNT_STATUS);
              if (status) {
                this.refs.onPressMesseng.onOpen()
                this.setState({ reponmessage: I18n.t('state0') })
              } else {
                this.refs.onPressMesseng.onOpen()
                this.setState({ reponmessage: I18n.t('state-1') })
              }
            } else {
              this.refs.onPressMesseng.onOpen()
              this.setState({ reponmessage: I18n.t('systemBusy') })
            }
          }
        } else {
          this.refs.onPressMesseng.onOpen()
          this.setState({ reponmessage: I18n.t('systemBusy') })
        }
      } else {
        this.refs.onPressMesseng.onOpen()
        this.setState({ reponmessage: I18n.t('failedDueNoResponse') })
      }
    }
    if (this.state.isGetAccountInfo && !nextProps.transFetching) {
      this.setState({ isGetAccountInfo: false, isLoading: false })
      if (nextProps.receiver && nextProps.receiver.responseCode) {
        if (nextProps.receiver && nextProps.receiver.error === '00000') {
          switch (nextProps.receiver.responseCode) {
            case '00000':
              let toAccountId = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_ID)
              let toName = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.CUSTOMER_NAME)
              let toPhone = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.CUSTOMER_PHONE)
              let roleId = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ROLE_ID)
              let parentCode = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.PARENT_CODE)
              let agentCode = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.SHOP_CODE)
              let toMainAccountID = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.MAIN_ACCOUNT_ID);
              console.log('---nextProps.receiver---', nextProps.receiver)
              this.setState({ toAccountId, toName, toPhone, agentCode })
              if (roleId !== 28) {
                if (parentCode === null) {
                  this.refs.onPressMesseng.onOpen()
                  this.setState({ reponmessagePhone: I18n.t('noParentCodeWereFounded', { agentCode }) })
                } else {
                  if (this.props.infoAccount.parentCode === parentCode || this.props.infoAccount.parentCode === toMainAccountID || parentCode === this.props.infoAccount.mainAccountID) {
                    this.refs.onPressMesseng.onOpen()
                    this.setState({ reponmessage: I18n.t('cantTransferSameNetwork') })

                  } else {
                    this.setState({ processCode: ConfigCode.TRANSFER_E2E }) // 021000
                  }
                }
              } else {
                this.setState({ processCode: ConfigCode.TRANSFER_A2HO }) // 021002
              }
              break;
            case 10118:
              toAccountId = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_ID)
              toName = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.CUSTOMER_NAME)
              toPhone = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.CUSTOMER_PHONE)
              roleId = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ROLE_ID)
              parentCode = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.PARENT_CODE)
              agentCode = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.SHOP_CODE)
              toMainAccountID = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.MAIN_ACCOUNT_ID);
              let status = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.ACCOUNT_STATUS)
              let reponmessage = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.RESPONSE_DESCRIPTION)
              if (status === 'BLOCKED') {
                this.refs.onPressMesseng.onOpen()
                this.setState({ reponmessage: reponmessage })
              } else {
                this.setState({ toAccountId, toName, toPhone, agentCode })
                if (roleId !== 28) {
                  if (parentCode === null) {
                    this.refs.onPressMesseng.onOpen()
                    this.setState({ reponmessagePhone: I18n.t('noParentCodeWereFounded', { agentCode }) })
                  } else {
                    if (this.props.infoAccount.parentCode === parentCode || this.props.infoAccount.parentCode === toMainAccountID || parentCode === this.props.infoAccount.mainAccountID) {
                      this.refs.onPressMesseng.onOpen()
                      this.setState({ reponmessage: I18n.t('cantTransferSameNetwork') })
                    } else {
                      this.setState({ processCode: ConfigCode.TRANSFER_E2E }) // 021000
                    }
                  }
                } else {
                  this.setState({ processCode: ConfigCode.TRANSFER_A2HO }) // 021002
                }
              }
              break;
            case 10835:
              this.refs.onPressMesseng.onOpen()
              this.setState({ reponmessage: I18n.t('transactionIsUnsuccessful') })
              break;
            case 10304:
              let message10304 = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.RESPONSE_DESCRIPTION)
              this.refs.onPressMesseng.onOpen()
              this.setState({ reponmessage: message10304 })

              break;
            case 10116:
              let CodeAgent = RequestField.getValueField(nextProps.receiver.fieldMap, FIELD.SHOP_CODE);
              this.refs.onPressMesseng.onOpen()
              this.setState({ reponmessagePhone: I18n.t('accOrNumberIsNotRegisterUmoney', { agentCode: CodeAgent }) })
              break;
            case nextProps.receiver.responseCode:
              let message = nextProps.receiver.responseDescription
              this.refs.onPressMesseng.onOpen()
              this.setState({ reponmessagePhone: message })
              break;
            default:
              break;
          }
        } else {
          if (nextProps.receiver.responseCode) {
            handleResponseCode(nextProps.receiver.responseCode);
          } else {
            this.refs.onPressMesseng.onOpen()
            this.setState({ reponmessage: I18n.t('systemBusy') })
          }
        }
      } else {
        this.refs.onPressMesseng.onOpen()
        this.setState({ reponmessage: I18n.t('failedDueNoResponse') })
      }
    }

    // if (this.state.isRequestCashIn && !nextProps.isFetching) {
    //   this.setState({ isRequestCashIn: false, isLoading: false })
    //   if (nextProps.cashInData && nextProps.cashInData.responseCode) {
    //     if (nextProps.cashInData && nextProps.cashInData.error === '00000') {
    //       if (nextProps.cashInData.responseCode === '00000') {
    //         this.props.navigation.navigate('TransactionResult',
    //           { data: nextProps.cashInData.fieldMap, processName: I18n.t('transferMoney') })
    //       } else {
    //         if (nextProps.cashInData && nextProps.cashInData.responseCode) {
    //           handleResponseCode(nextProps.cashInData.responseCode);
    //         } else {
    //           if (nextProps.cashInData.responseDescription) {
    //             AlertNative(nextProps.cashInData.responseDescription)
    //           } else {
    //             this.refs.onPressMesseng.onOpen()
    //             this.setState({ reponmessage: I18n.t('systemBusy') })
    //           }
    //         }
    //       }
    //     } else {
    //       if (nextProps.cashInData.responseCode) {
    //         handleResponseCode(nextProps.cashInData.responseCode);
    //       } else {
    //         this.refs.onPressMesseng.onOpen()
    //         this.setState({ reponmessage: I18n.t('systemBusy') })
    //       }
    //     }
    //   } else {
    //     this.refs.onPressMesseng.onOpen()
    //     this.setState({ reponmessage: I18n.t('failedDueNoResponse') })
    //   }
    // }
    if (isCallCheckSwich && isLoading) {
      if (nextProps.ByPassPinReducer.dataCheckSwich) {
        switch (nextProps.ByPassPinReducer.actionType) {
          case 'CALL_CHECK_SWICH_SUCCESS':
            let d = nextProps.ByPassPinReducer.dataCheckSwich.bypassConfigCollection
            let dataSwich
            try {
              let strData = d.data[0]
              if (strData) {
                dataSwich = nextProps.ByPassPinReducer.dataCheckSwich.bypassConfigCollection.data[0]
                let data = 'AMOUNT_BYPASS_PIN_OTP_W2W';
                this.props.requestCheckAmount(data);
                this.setState({ byPassPIN: dataSwich.status == 1 ? true : false, isCallCheckSwich: false, isCheckAmount: true, isLoading: true })
              } else {
                let data = 'AMOUNT_BYPASS_PIN_OTP_W2W';
                this.props.requestCheckAmount(data);
                this.setState({ switchSecurity: false, byPassPIN: true, isCallCheckSwich: false, isLoading: false, isCheckAmount: true })
              }

            } catch (error) {
              let data = 'AMOUNT_BYPASS_PIN_OTP_W2W';
              this.props.requestCheckAmount(data);
              this.setState({ switchSecurity: false, byPassPIN: true, isCallCheckSwich: false, isLoading: false, isCheckAmount: true })
            }



            break;
          case 'CALL_CHECK_SWICH_FAILED':
            this.refs.responseMessage.onOpen()
            this.setState({ isCallCheckSwich: false, isLoading: false, responseMessage: 'CALL_CHECK_SWICH_FAILED' })
            break;
          default:
            break;
        }
      } else {
        this.setState({ isCallCheckSwich: false, isLoading: false })
      }
    }
    if (isCheckAmount) {
      switch (nextProps.ByPassPinReducer.actionType) {
        case 'CALL_CHECK_AMOUNT_SUCCESS':
          if (nextProps.ByPassPinReducer.dataCheckAmount) {
            let dataAmount = nextProps.ByPassPinReducer.dataCheckAmount.amountConfigCollection.data[0]
            this.setState({ isCheckAmount: false, isLoading: false, dataAmount })
          }
          break;
        case 'CALL_CHECK_AMOUNT_FAILED':
          this.refs.reposMess.onOpen()
          this.setState({ reposMess: 'CALL_CHECK_AMOUNT_FAILED', isCheckAmount: false, isLoading: false })
          break;
      }
    }
  }

  onPressProcess(phone, money, message, saveInfo) {
    if(phone != this.state.agentCode){
        this.onCheckAccount(phone)
    }else{
      Keyboard.dismiss()
      let messageNew = message
      const { infoAccount } = this.props
      if (!messageNew) {
        messageNew = 'Transfer with u-money Mobile'
      }
      this.setState({ phone, money, messageNew, isLoading: true, isGetAccountInfoCurrentUser: true, saveInfo })
      RequestField.clearInitField();
      RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
      const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO))
      this.props.getAccountInfoCurrentUser(data);
      RequestField.clearInitField();
    }
    
  }
  onPressMesseng() {
    this.refs.onPressMesseng.onClose()
  }
  onCheckAccount(phone) {
    const { infoAccount } = this.props
    RequestField.clearInitField()
    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
    RequestField.addToInitField(RequestField.addShopCode(phone))
    const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO)) // 311100
    this.setState({ isLoading: true, isGetAccountInfo: true })
    data.fieldMap = _.orderBy(data.fieldMap, 'fieldID')
    this.props.getAccountInfo(data)
    RequestField.clearInitField()
  }
  render() {
    const { isLoading, isAgent, mDefaultAgentCode, reponmessage, reponmessagePhone, toName, agentCode } = this.state
    // console.log('----toName-----', toName)
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <SafeAreaView style={{ backgroundColor: Colors.white, }}>
          {isLoading ? <ActivityIndicator /> : null}
          <Payment
            TransferToAgentScreen
            firstHeader={isAgent ? 'posCode' : 'agentCode'}
            phonePlaceholder={isAgent ? 'inputThePOSCodeHere' : 'inputTheAgentCodeHere'}
            validatePhoneConst={Constant.VALIDATE_AGENT_CODE}
            isPhone
            txtInput='thatEmployee'
            txtName='FullName'
            placeholder='inputPosCode'
            amountPlaceholder='amount'
            txtAmount='enterAmount'
            errorPhoneMessage='agentCodeIncorrect'
            maxLengthMoney={13}
            maxLengthCode={8}
            keyboardTypeInputPhone='number-pad'
            phonePad
            textButton='transfer'
            onPressProcess={(phone, money, message, saveInfo) => this.onPressProcess(phone, money, message, saveInfo)}
            footerTextInput
            minAmount={3000}
            opentHistoryPayment={true} //
            processCode={ConfigCode.TRANSFER_E2E} //
            defaultAgentCode={mDefaultAgentCode}
            openCheckBox={true}
            //
            onCheckAccountCashIn={true}
            onCheckAccount={(phone) => this.onCheckAccount(phone)}
            displayName={toName}
            getAgentCode = {agentCode}
          />
          <Notification
            headerType='Warning'
            title={I18n.t('info')}
            textContent={reponmessage ? reponmessage : reponmessagePhone}
            buttonText={I18n.t('ok')}
            isButton={true}
            onPress={() => this.onPressMesseng()}
            ref='onPressMesseng'
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.cashOut.isFetching,
    cashInData: state.cashOut.cashInData,
    infoAccount: state.auth.infoAccount,
    receiver: state.transfer.receiver,
    transFetching: state.transfer.isFetching,
    authFetching: state.auth.isFetching,
    user: state.auth.user,
    ByPassPinReducer: state.ByPassPinReducer,
    dataOnSecurity: state.ByPassPinReducer.dataOnSecurity,
    dataCheckSwich: state.ByPassPinReducer.dataCheckSwich,
    dataCheckAmount: state.ByPassPinReducer.dataCheckAmount,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestCashIn: (data) => { dispatch(requestCashIn(data)) },
    getAccountInfo: (phoneNumber) => { dispatch(getAccountInfo(phoneNumber)) },
    getAccountInfoCurrentUser: (data) => { dispatch(login(data, false)) },
    onCallCheckSwich: (data) => { dispatch(onCallCheckSwich(data)) },
    requestCheckAmount: (data) => { dispatch(requestCheckAmount(data)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferAgentToAgent)
