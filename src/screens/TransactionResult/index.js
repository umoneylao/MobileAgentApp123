import React, { Component } from 'react'
import { ScrollView, Text, View, StatusBar, Image, FlatList, SafeAreaView, Linking, TouchableOpacity, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Images } from '../../themes'
import { FullNewButton, Notification, ActivityIndicator } from '../../components'
import styles from './styles'
import _ from 'lodash'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import I18n from 'react-native-i18n'
import { baseUpload } from '../../utils/Api'
import moment from 'moment'
import WatermarkView from '../../components/WatermarkView'
import { QRCode } from 'react-native-custom-qr-codes';

var today = new Date();
let time;
let date;
class TransferResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      lang: 'lo'
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentDidMount() {
    let _language = I18n.currentLocale()
    this.setState({ lang: _language })
  }
  handleBackButtonClick() {
    this.props.navigation.popToTop();
    return true;
  }
  UNSAFE_componentWillMount() {
    const { params } = this.props.route
    console.log('Transaction=------------', this.props.route.params.data)
    let cusAdd = RequestField.getValueField(params.data, FIELD.CUSTOMER_ADDRESS)
    let lottery = ""
    let period = null;
    let barcode = null;
    let newTotal = null;
    if (cusAdd != null) {
      let strValue = cusAdd.split('|')
      newTotal = strValue[1];
      period = strValue[2];
      barcode = strValue[3];
      let newLottery = strValue[0].split(';')
      let arrayList = []
      for (let i = 0; i < newLottery.length; i++) {
        let strItem = newLottery[i]
        let strNewItem = strItem.split(':')
        arrayList.push({
          'lottery': strNewItem[0], 'amount': strNewItem[1]
        })
      }
      lottery = arrayList

    }
    this.setState({
      receiver: RequestField.getValueField(params.data, FIELD.TO_NAME),
      amount: RequestField.getValueField(params.data, FIELD.AMOUNT),
      fromPhone: RequestField.getValueField(params.data, FIELD.FROM_PHONE),
      receiverPhone: RequestField.getValueField(params.data, FIELD.TO_PHONE) || RequestField.getValueField(params.data, FIELD.PAYMENT_CODE),
      description: RequestField.getValueField(params.data, FIELD.TRANSACTION_DESCRIPTION),
      balance: RequestField.getValueField(params.data, FIELD.BALANCE),
      agentCode: RequestField.getValueField(params.data, FIELD.SHOP_CODE),
      fee: RequestField.getValueField(params.data, FIELD.TRANSACTION_FEE),
      discount: RequestField.getValueField(params.data, FIELD.DISCOUNT),
      transactionID: RequestField.getValueField(params.data, FIELD.TRANSACTION_ID),
      staffCode: RequestField.getValueField(params.data, FIELD.STAFF_CODE),
      staffName: RequestField.getValueField(params.data, FIELD.STAFF_NAME),
      gender: RequestField.getValueField(params.data, FIELD.CUSTOMER_GENDER),
      ident: RequestField.getValueField(params.data, FIELD.PAPER_NUMBER),
      name: RequestField.getValueField(params.data, FIELD.CUSTOMER_NAME),
      type: RequestField.getValueField(params.data, FIELD.PAPER_TYPE),
      supplier: RequestField.getValueField(params.data, FIELD.PARTNER_CODE),
      contractNo: RequestField.getValueField(params.data, FIELD.RECEIVER_AREA),
      phoneNumber: RequestField.getValueField(params.data, FIELD.PHONE_NUMBER),
      customerPhone: RequestField.getValueField(params.data, FIELD.CUSTOMER_PHONE),
      fromName: RequestField.getValueField(params.data, FIELD.FROM_NAME),
      commistion1: RequestField.getValueField(params.data, FIELD.BONUS1),
      commistion2: RequestField.getValueField(params.data, FIELD.BONUS2),

      period: period,
      barcode: barcode,
      lottery: lottery,
      newTotal: newTotal,

    })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  qrTransation() {
    const { processName, transactionID, amount } = this.state
    const txtQR = processName + ' | ' + transactionID + ' | ' + amount
    return (
      <QRCode codeStyle='square' content={txtQR} size={80} />
    )
  }

  onBackHome() {
    this.props.navigation.navigate('Home')
  }
  _renderItem(item, id) {
    return (
      <Text style={styles.textValue} numberOfLines={6}>{item.lottery}, </Text>
    )
  }

  onFTPDowload = async (accountPhone, transactionID) => {
    try {

      const { phoneNumber } = this.state
      let date = moment(new Date()).format("YYYYMMDD")
      const responseFTP = await fetch(baseUpload + `ftp/donwload/${phoneNumber}&${date}&APA_Insuarance_Certificate_Umoney_${accountPhone}_${transactionID}.pdf`)
      // console.log('responseFTP:', responseFTP)
      if (responseFTP.status == 404) {
        this.refs.responseMessage.onOpen()
        this.setState({ responseMessage: I18n.t('UnableDisplayImage'), isLoading: false })
        return;
      }
      const jsonftp = await responseFTP.json();
      // console.log('jsonftp:', jsonftp)

      switch (jsonftp.responseCode) {
        case '00000':
          let certificate = jsonftp.certificateName
          this.props.navigation.navigate('ViewCertificate', { phone: accountPhone, certificateName: certificate })
          this.setState({ isLoading: false })
          break;
        case '99999':
          this.refs.responseMessage.onOpen()
          this.setState({ responseMessage: I18n.t('UnableDisplayImage'), isLoading: false })
          break;
        case jsonftp.responseCode:
          this.refs.responseMessage.onOpen()
          this.setState({ responseMessage: I18n.t('UnableDisplayImage'), isLoading: false })
          break;
        default:
          break;
      }

    } catch (error) {
      console.log('error:', error)
      this.refs.responseMessage.onOpen()
      this.setState({ responseMessage: I18n.t('UnableDisplayImage'), isLoading: false })
    }

  }
  onDowload = () => {
    const { customerPhone, transactionID } = this.state
    let introPhone = "856";
    if (customerPhone.length == 11) {
      let phone = customerPhone.substring(1, 11);
      let accountPhone = introPhone + phone;
      this.onFTPDowload(accountPhone, transactionID)
      this.setState({ isLoading: true })
    } else if (customerPhone.length == 10) {
      let phone = customerPhone.substring(1, 10);
      let accountPhone = introPhone + phone;
      this.onFTPDowload(accountPhone, transactionID)
      this.setState({ isLoading: true })
    } else {
      alert('Error')
      this.setState({ isLoading: false })
    }

  };
  responseMessage() { this.refs.responseMessage.onClose() }
  onDetails(lstErr) {
    if (lstErr) {
      this.props.navigation.navigate('ListCashOutError', { data: lstErr })
    }
  }

  render() {
    const { receiver, receiverPhone, description, amount, fee, discount,
      balance, staffName, staffCode, agentCode, transactionID, fromPhone,
      gender, ident, name, type, supplier, contractNo, phoneNumber, period,
      lottery, fromName, responseMessage, customerPhone, commistion1, commistion2, lang } = this.state
    const { params } = this.props.route
    const { processName, isUnitelService, notify,
      baCode, sceen, AccountBankName, AccountNo, processCode,
      listBuyLottery, newTotal, timestamp, totalError, totalSuccess, nameAgent, AgentCode, phoneAgent, lstErr, nameCustormer } = params
    time = today.getHours() + ":" + today.getMinutes();
    date = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();
    let datenow = new Date();
    let hours = datenow.getHours();
    let minutes = datenow.getMinutes();
    let seconds = datenow.getSeconds();
    const txtMateter = transactionID + ' | ' + processName + ' | ' + receiverPhone + ' | ' + phoneNumber + ' | ' + amount + ' | ' + moment(new Date()).format("DD/MM/YYYY") + " " + `${hours}:${minutes}:${seconds}` + ' | ' + fee
    console.log('txtMateter:',txtMateter)
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
        {this.state.isLoading ? <ActivityIndicator /> : null}
        <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
          <View style={{ alignItems: 'center', marginBottom: 20, top: 20 }}>
            <Image source={Images.ic_successfully} style={styles.imageSizeCon} />
            <Text style={styles.txtHeader}>{I18n.t('congratulation')}</Text>
          </View>
          {
            processCode === 'APA' ? (
              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <View style={{ padding: 5, backgroundColor: '#ccebff', borderRadius: 5 }}>
                  <TouchableOpacity onPress={() => this.onDowload()}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: Colors.txtUpLight }}>{I18n.t('ViewDocument')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null
          }
          <View style={{ top: 10, flexDirection: 'row', marginHorizontal: 10, padding: 20 }}>
            <View style={{ width: '50%', height: '100%' }}>
              {null != transactionID ? <View style={styles.rowInfo}>
                <Text style={styles.labelInfo}>{I18n.t('transactionId')}</Text>
                <Text style={styles.valueInfo}>{transactionID}</Text>
              </View> : null}

              <View style={styles.rowInfo}>
                <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('transactionType')}</Text>
                <Text style={styles.valueInfo} lineNumbers={1}>{processName}</Text>
              </View>
              {
                processCode !== '600014' ?
                  receiver ?
                    (<View style={styles.rowInfo}>
                      <Text style={styles.labelInfo} lineNumbers={1}>{processCode === 'APA' ? I18n.t('cusAddress') : I18n.t('receiverName')}</Text>
                      <Text style={styles.valueInfo} lineNumbers={1}>{receiver}</Text>
                    </View>) : null
                  : null

              }
              {agentCode ?
                (<View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('agentCode')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{agentCode}</Text>
                </View>) : null
              }
              {AccountBankName ?
                (<View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('AccountBankName')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{AccountBankName}</Text>
                </View>) : null
              }
              {AccountNo ?
                (<View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('AccountNo')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{AccountNo}</Text>
                </View>) : null
              }

              {fromPhone && !agentCode ?
                (<View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('senderPhone')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{fromPhone}</Text>
                </View>) : null}

              {

                receiverPhone && !agentCode ?
                  (<View style={styles.rowInfo}>
                    <Text style={styles.labelInfo} lineNumbers={1}>{processCode == 'APA' ? I18n.t('ContractNumber') : I18n.t('to')}</Text>
                    <Text style={styles.valueInfo} lineNumbers={1}>{receiverPhone}</Text>
                  </View>) : null

              }

              {
                customerPhone ? (
                  <View style={styles.rowInfo}>
                    <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('to')}</Text>
                    <Text style={styles.valueInfo} lineNumbers={1}>{customerPhone}</Text>
                  </View>
                ) : null
              }
              {
                processCode == '010002' ? null : (
                  staffCode ?
                    (<View style={styles.rowInfo}>
                      <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('thatEmployee')}</Text>
                      <Text style={styles.valueInfo} lineNumbers={1}>{staffCode}</Text>
                    </View>) : null
                )
              }
              {type ?
                (<View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('type')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{type}</Text>
                </View>) : null}
              {ident ?
                (<View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('paper')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{ident}</Text>
                </View>) : null}
              {supplier ?
                (<View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('supplier')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{
                    supplier == 'VIETTEL' ? 'Unitel' : supplier == 'PAYMENT_WATTER_NPP' ? I18n.t('WatterVientine') : processCode == 'APA' ? I18n.t('apaCompany') : supplier}</Text>
                </View>) : null}

              {period ? <View style={styles.rowInfo}>
                <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('period')}</Text>
                <Text style={styles.valueInfo} lineNumbers={1}>{period}</Text>
              </View> : null}

              {
                processCode === 'WordBank' ? null :
                  description ? (
                    <View style={styles.rowInfo}>
                      {processCode === '580000' ? <Text style={styles.labelInfo}>{I18n.t('InsuredName')}</Text>
                        : <Text style={styles.labelInfo}>{I18n.t('Content')}</Text>}
                      <Text style={styles.valueInfo} lineNumbers={1}>{description}</Text>
                    </View>
                  ) : null

              }
              {
                nameAgent ? <View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('Uploader')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{nameAgent}</Text>
                </View> : null
              }
              {
                phoneAgent ? <View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('phoneNumber')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{phoneAgent}</Text>
                </View> : null
              }
              {
                totalSuccess ? <View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('totalSuccess')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{totalSuccess}</Text>
                </View> : null
              }


            </View>


            <View style={{ width: '50%', height: '100%' }}>
              {lottery ?
                <View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('numberLottery')}</Text>
                  <FlatList
                    data={lottery}
                    renderItem={({ item, index }) => this._renderItem(item, index)}
                    extraData={this.state}
                    keyExtractor={item => item.id}
                    numColumns={4}
                  />
                </View>
                : null}
              {contractNo ?
                (<View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('ContractNumber')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{contractNo}</Text>
                </View>) : null}

              {
                supplier == 'PAYMENT_WATTER_NPP' ? null :
                  phoneNumber ?
                    (<View style={styles.rowInfo}>
                      <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('senderPhone')}</Text>
                      <Text style={styles.valueInfo} lineNumbers={1}>{phoneNumber}</Text>
                    </View>) : null}


              {
                processCode === 'WordBank' ? null :
                  fromName ? (
                    <View style={styles.rowInfo}>
                      <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('InsuredName')}</Text>
                      <Text style={styles.valueInfo} lineNumbers={1}>{fromName}</Text>
                    </View>
                  ) : null

              }

              {staffName ?
                (<View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('employee')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{staffName}</Text>
                </View>) : null}
              {name ?
                (<View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('fullName')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{name}</Text>
                </View>) : null}


              {gender ?
                (<View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('gender')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{gender}</Text>
                </View>) : null}

              {amount ?
                (<View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('amount')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{amount}</Text>

                </View>) : null
              }
              {newTotal ?
                (<View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('amount')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{newTotal}</Text>

                </View>) : null
              }
              {fee ? <View style={styles.rowInfo}>
                <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('fee')}</Text>
                <Text style={styles.valueInfo} lineNumbers={1}>{fee == 0 ? I18n.t('free') : fee}</Text>
              </View> : null}

              {
                sceen === 'LUCKY' ? null : discount ? <View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('discount')}</Text>
                  <Text style={styles.valueInfo} lineNumbers={1}>{discount}</Text>
                </View> : null
              }
              {AgentCode ? <View style={styles.rowInfo}>
                <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('agentCode')}</Text>
                <Text style={styles.valueInfo} lineNumbers={1}>{AgentCode}</Text>
              </View> : null}
              {baCode ? <View style={styles.rowInfo}>
                <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('barcode')}</Text>
                <Text style={styles.valueInfo} lineNumbers={1}>{baCode}</Text>
              </View> : null}
              {
                name === '' ?
                  description ? <View style={styles.rowInfo}>
                    <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('description')}</Text>
                    <View style={styles.descriptionStyle}>
                      <Text style={styles.valueInfo} lineNumbers={2}>{description}</Text>
                    </View>
                  </View> : null : null}
              {
                totalError ?
                  <View style={styles.rowInfo}>
                    <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('totalError')}</Text>
                    <View style={styles.descriptionStyle}>
                      <Text style={styles.valueInfo} lineNumbers={2}>{totalError}</Text>
                    </View>
                  </View> :
                  null}
              {
                lstErr ?
                  <TouchableOpacity style={styles.rowInfo} onPress={() => this.onDetails(lstErr)}>
                    <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('ListCashOutError')}</Text>
                    <View style={styles.descriptionStyle}>
                      <Text style={styles.valueInfo} lineNumbers={2}>{I18n.t('Details')}</Text>
                    </View>
                  </TouchableOpacity> :
                  null}

              {

                timestamp ? <View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('timestamp')}</Text>
                  <View style={styles.descriptionStyle}>
                    <Text style={styles.valueInfo} lineNumbers={2}>{timestamp}</Text>
                  </View>
                </View> : null
              }
              {
                commistion1 ? <View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('commission')}</Text>
                  <View style={styles.descriptionStyle}>
                    <Text style={styles.valueInfo} lineNumbers={2}>{commistion1}</Text>
                  </View>
                </View> : null
              }
              {
                commistion2 ? <View style={styles.rowInfo}>
                  <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('commission')}</Text>
                  <View style={styles.descriptionStyle}>
                    <Text style={styles.valueInfo} lineNumbers={2}>{commistion2}</Text>
                  </View>
                </View> : null
              }
              <View style={styles.rowInfo}>
                <Text style={styles.labelInfo} lineNumbers={1}>{I18n.t('date')}</Text>
                <View style={styles.descriptionStyle}>
                  <Text style={styles.valueInfo} lineNumbers={2}>{moment(new Date()).format("DD/MM/YYYY") + " " + `${hours}:${minutes}:${seconds}`}</Text>
                </View>
              </View>
            </View>
          </View>

       


        <View style={{ flex:1, margin: 20, justifyContent: 'flex-end', alignItems: 'flex-end', zIndex:-1, position:'relative' }}>
          <View style={{ marginBottom: 10, width: 97, height: 120, justifyContent: 'center' }}>
            <View style={{ zIndex: 1, position: 'absolute', marginHorizontal: 10, top: 30, borderRadius: 2 }}>
              <View style={{ width: 80, height: 80, backgroundColor: Colors.white }}>
                {this.qrTransation()}
              </View>
            </View>
            <Image source={lang === 'en' ? Images.iconStem : lang === 'vn' ? Images.icStamp_vi : lang === 'cn' ? Images.icStamp_cn : Images.icStamp_la} style={{ width: 97, height: 120 }} />
          </View>
          
        </View>
        </ScrollView>
        <View style={{ alignContent: 'center', alignItems: 'center', padding:10 }}>
            <FullNewButton
              text={I18n.t('backToHome')}
              onPress={() => this.onBackHome()}
            />
          </View>
       {
        txtMateter ?  <WatermarkView foreground={true} style={null} watermark={txtMateter} watermarkTextStyle={null} rotateZ={-45} /> : null
       }
       


        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={responseMessage}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.responseMessage()}
          ref='responseMessage'
        />
      </View>

    )
  }
}
const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TransferResult)
