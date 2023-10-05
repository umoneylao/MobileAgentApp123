import React, { Component } from 'react'
import { StatusBar, Text, View, Keyboard, TouchableOpacity, processColor, Image, ScrollView } from 'react-native'
import { CustomNavbar, Notification, ActivityIndicator } from '../../components'
import { Comingsoon } from '../../screens'
import { connect } from 'react-redux'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import { Images, Colors, Fonts } from '../../themes'
import { getCommissionThisMonth, getCommissionLastMonth } from '../../actions/LookupTrans'
import { login } from '../../actions/Auth'
import I18n from 'react-native-i18n'
import _ from 'lodash'
import styles from './styles'
import { LineChart, BarChart } from 'react-native-charts-wrapper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Reactotron from 'reactotron-react-native'


class AnalysisScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHideCommission: true,
      showTransHis: false,
      isLoading: false,
      isShowTransaction: false,
      toggleTransHis: 'Transaction history',
      legend: {
        enabled: true,
        textSize: Fonts.size.medium,
        form: 'CIRCLE',
        formSize: Fonts.size.medium,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
        valueTextSize: 32,
      },
      data: {
        dataSets: [{
          values: [0, 0],
          label: I18n.t('commission'),
          config: {
            color: processColor('teal'),
            barSpacePercent: 40,
            barShadowColor: processColor('lightgrey'),
            highlightAlpha: 90,
            highlightColor: processColor('red')
          }
        }],
        config: {
          barWidth: 0.5,
          valueTextSize: Fonts.size.medium,
        }
      },
      xAxis: {
        valueFormatter: [I18n.t('thisMonth'), I18n.t('lastMonth')],
        granularityEnabled: true,
        granularity: 1,
      },

    }
  }


  onShowCommission() {
    const { infoAccount } = this.props
    if (infoAccount != null) {
      Keyboard.dismiss()
      this.setState({ isLoading: true, isGetAccountInfoCurrentUser: true })
      RequestField.clearInitField();
      RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
      const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO))
      this.props.getAccountInfoCurrentUser(data);
      RequestField.clearInitField();
    } else {
      alert('Hệ thống đang bần')
    }
  }
  componentWillMount() {
    this.onShowCommission()
  }


  componentWillReceiveProps(nextProps) {
    this.forceUpdate()
    if (this.state.isGetAccountInfoCurrentUser && !nextProps.authFetching) {
      this.setState({ isGetAccountInfoCurrentUser: false, isLoading: false });
      if (nextProps.user && nextProps.user.responseCode) {
        if (nextProps.user && nextProps.user.error === `00000`) {
          if (nextProps.user && nextProps.user.responseCode === '00000') {

            this.onShowComnision()
          } else {
            if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10118') { // status 3/7
              const status = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ACCOUNT_STATUS);
              switch (status) {
                case 'LOCKED':
                  this.refs.state3.onOpen()
                  break;
                case 'BLOCKED':
                  this.refs.state7.onOpen()
                  break;
                default:
                  this.refs.NotificationSystemBusy.onOpen()
                  break;
              }
            } else if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10114') {
              this.refs.state2.onOpen()
            } else if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10115') {
              this.refs.state5.onOpen()
            } else if (nextProps.user && nextProps.user.responseCode && nextProps.user.responseCode.toString() === '10116') {
              const phone = RequestField.getValueField(nextProps.user.fieldMap, FIELD.PHONE_NUMBER);
              const status = RequestField.getValueField(nextProps.user.fieldMap, FIELD.ACCOUNT_STATUS);
              if (status) {
                this.refs.state0.onOpen()
              } else {
                this.refs.state1.onOpen()
              }
            } else {
              this.refs.NotificationSystemBusy.onOpen()
            }
          }
        } else {
          this.refs.NotificationSystemBusy.onOpen()
        }
      } else {
        this.refs.failedDueNoResponse.onOpen()
      }
    }

    if (this.state.isCommissionThisMonth && !nextProps.isFetching) {
      this.setState({ isCommissionThisMonth: false, isLoading: false })
      if (nextProps.commissionThisMonthData && nextProps.commissionThisMonthData.responseCode && nextProps.commissionThisMonthData.responseCode === '00000') {
        let commissionThisMonth = RequestField.getValueField(nextProps.commissionThisMonthData.fieldMap, FIELD.BONUS1)
        commissionThisMonth = commissionThisMonth != '0' ? (commissionThisMonth + "").replace(",", "") : commissionThisMonth;
        let cloneData = _.cloneDeep(this.state.data)
        cloneData.dataSets[0].values[0] = parseFloat(commissionThisMonth)
        this.setState({ data: cloneData })
        Reactotron.log('qqqqqqqqqqqqqq')
        Reactotron.log(cloneData)

        const { infoAccount } = this.props
        RequestField.clearInitField()
        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_COMMISSION_INFO)) // 311201
        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
        RequestField.addToInitField(RequestField.addPin(''))
        RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
        RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
        RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
        let dataLastMonth = RequestField.addToInitField(RequestField.addTransDes('LAST_MONTH')) // 2: last month
        this.setState({ isCommissionLastMonth: true, isLoading: true })
        dataLastMonth.fieldMap = _.orderBy(dataLastMonth.fieldMap, 'fieldID')
        Reactotron.log('311201=====================')
        Reactotron.log('dataLastMonth')
        Reactotron.log(dataLastMonth)

        this.props.getCommissionLastMonth(dataLastMonth)
        RequestField.clearInitField()
      } else {
        if (nextProps.commissionThisMonthData && nextProps.commissionThisMonthData.responseCode) {
          handleResponseCode(nextProps.commissionThisMonthData.responseCode);
        } else {
          this.refs.failedDueNoResponse.onOpen()
        }

      }
    }

    if (this.state.isCommissionLastMonth && !nextProps.isFetching) {
      this.setState({ isCommissionLastMonth: false, isLoading: false })
      if (nextProps.commissionLastMonthData && nextProps.commissionLastMonthData.responseCode === '00000') {
        let commissionLastMonth = RequestField.getValueField(nextProps.commissionLastMonthData.fieldMap, FIELD.BONUS1)
        commissionLastMonth = commissionLastMonth != '0' ? commissionLastMonth.toString().replace(",") : commissionLastMonth;
        let cloneData = _.cloneDeep(this.state.data)
        cloneData.dataSets[0].values[1] = parseFloat(commissionLastMonth)
        this.setState({ data: cloneData, isHideCommission: false })
      } else {
        if (nextProps.commissionLastMonthData && nextProps.commissionLastMonthData.responseCode) {
          handleResponseCode(nextProps.commissionLastMonthData.responseCode);
        } else {
          this.refs.failedDueNoResponse.onOpen()
        }
      }
    }

  }


  onShowComnision() {
    const { infoAccount } = this.props
    RequestField.clearInitField()
    RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_COMMISSION_INFO)) // 311201
    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
    RequestField.addToInitField(RequestField.addPin(''))
    RequestField.addToInitField(RequestField.addPan(infoAccount.pan))
    RequestField.addToInitField(RequestField.addAccountID(infoAccount.accountId))
    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId))
    let dataThisMonth = RequestField.addToInitField(RequestField.addTransDes('THIS_MONTH')) // 1: this month
    this.setState({ isCommissionThisMonth: true, isLoading: true })
    // this.refs.ValidatePinModal.onClose()
    dataThisMonth.fieldMap = _.orderBy(dataThisMonth.fieldMap, 'fieldID')
    Reactotron.log('311201=====================')
    Reactotron.log('dataThisMonth')
    Reactotron.log(dataThisMonth)

    this.props.getCommissionThisMonth(dataThisMonth)
    RequestField.clearInitField()
  }




  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null })
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
    }
  }

  state3() {
    this.refs.state3.onClose()
  }
  state7() {
    this.refs.state7.onClose()
  }
  onPressSystemBusy() {
    this.refs.NotificationSystemBusy.onClose()
  }
  state2() {
    this.refs.state2.onClose()
  }
  state5() {
    this.refs.state5.onClose()
  }
  state0() {
    this.refs.state0.onClose()
  }
  state1() {
    this.refs.state1.onClose()
  }
  failedDueNoResponse() {
    this.refs.failedDueNoResponse.onClose()
  }


  render() {
    const { phoneNumber, owner, isLoading, balance, phone } = this.state
    return (
      <View style={{ width: '100%', height: '90%' }}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.blueLight} />
        {isLoading ? <ActivityIndicator /> : null}
        <CustomNavbar headerBackground colorText txtTitle={'CheckCommission'} />

        <View style={styles.cardStyle}>
            {this.state.isHideCommission
              ? (
                <TouchableOpacity style={styles.rowInfo} onPress={() => this.onShowCommission()}>
                  <Image source={Images.icSaveHistory} style={styles.iconShowBalance} />
                  <Text style={{ color: Colors.colorButton }}>{I18n.t('showCommission')}</Text>
                </TouchableOpacity>
              )
              : (
                <View style={[styles.containerChart]}>

                  <BarChart
                    style={styles.chart}
                    data={this.state.data}
                    xAxis={this.state.xAxis}
                    animation={{ durationX: 2000 }}
                    legend={this.state.legend}
                    chartDescription={{ text: '' }}
                    gridBackgroundColor={processColor('#ffffff')}
                    drawBarShadow={false}
                    drawValueAboveBar
                    pinchZoom={false}
                    doubleTapToZoomEnabled={false}
                    scaleEnabled={false}
                    scaleXEnabled={false}
                    scaleYEnabled={false}
                    drawHighlightArrow
                    onChartSelect={this.handleSelect.bind(this)}
                    highlights={this.state.highlights}
                    onChange={(event) => console.log(event.nativeEvent)}

                  />

                  <TouchableOpacity style={styles.refreshButton} onPress={() => this.onShowCommission()}>
                    <FontAwesome name='refresh' size={25} style={{ marginRight: 20 }} color={Colors.txtUpLight} />
                    <Text>{I18n.t('refresh')}</Text>
                  </TouchableOpacity>

                </View>
              )}
         
        </View>

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
          textContent={I18n.t('state7')}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.state7()}
          ref='state7'
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
          textContent={I18n.t('state5')}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.state5()}
          ref='state5'
        />
        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={I18n.t('state2')}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.state2()}
          ref='state2'
        />

        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={I18n.t('state0', { phone: phone })}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.state0()}
          ref='state0'
        />
        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={I18n.t('state-1', { phone: phone })}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.state1()}
          ref='state1'
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
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    infoAccount: state.auth.infoAccount,
    isFetching: state.lookup.isFetching,
    isSuccess: state.lookup.isSuccess,
    commissionLastMonthData: state.lookup.commissionLastMonthData,
    commissionThisMonthData: state.lookup.commissionThisMonthData,
    changeLanguageData: state.auth.changeLanguageData,
    authFetching: state.auth.isFetching,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCommissionThisMonth: (data) => { dispatch(getCommissionThisMonth(data)) },
    getCommissionLastMonth: (data) => { dispatch(getCommissionLastMonth(data)) },
    getAccountInfoCurrentUser: (data) => { dispatch(login(data, false)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisScreen)

