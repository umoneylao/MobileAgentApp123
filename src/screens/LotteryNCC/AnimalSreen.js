
import React, { Component } from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import { AnimalComponent, Notification } from '../../components'
import LotteryAnimal from '../../components/LotteryAnimal'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { formatNumber } from '../../utils/Formater'
import { Animal } from '../../images'
import {requestHistoryNCC340 } from '../../actions/Lottery'
class AnimalSreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      getdataNumberwin: null,
      valuesBuy: null,
      pagWiner: null,
      GetinfoAnimal: false,

      detaStart: null,
      dateDraw: null,
      rusuell: null,
      numberOne: null,
      numberTwo: null,
      numberThree: null,
      buttonEnabled: false,
      showMessengError: null,
      responseMessage: '',

      imageOne: null,
      imageTwo: null,
      imageThree: null,

      getDrewHistory: null,


    };
  }
  onSellLottery(item) {
    this.setState({ pagWiner: item })
  }
  onSwich(item) {
    this.setState({ pagWiner: item })
  }


  componentDidMount() {
   
    const { getReponAnimal } = this.props
    if (getReponAnimal) {
      let arr = getReponAnimal.split("|")
      let Start_time = arr && arr[2]
      let draw_date = arr && arr[3]
      let One_digit = arr && arr[8]

      let number = One_digit.split(",")
      let numberOne = number && number[0]
      let numberTwo = number && number[1]
      let numberThree = number && number[2]
      this.setState({
        GetinfoAnimal: false,
        isLoading: false,
        detaStart: Start_time,
        dateDraw: draw_date,
        rusuell: One_digit,
        numberOne: numberOne,
        numberTwo: numberTwo,
        numberThree: numberThree
      })
      Animal.map((y) => {
        switch (numberOne) {
          case y.numBer:
            this.setState({ imageOne: y.image_path })
            break;
          default:
            break;
        }
      })
      Animal.map((y) => {
        switch (numberTwo) {
          case y.numBer:
            this.setState({ imageTwo: y.image_path })
            break;
          default:
            break;
        }
      })
      Animal.map((y) => {
        switch (numberThree) {
          case y.numBer:
            this.setState({ imageThree: y.image_path })
            break;
          default:
            break;
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.checkGetHistory340) {
      switch (nextProps.actionType) {
        case 'DRAW_HISTORY_SUCCESS340':
          let value340 = nextProps.drawHistory340.drawHistoryCollection.drawHistoryList
          this.setState({ isLoading: false, getDrewHistory: value340, checkGetHistory340: false })
          break;
        case 'DRAW_HISTORY_FAILED340':
          this.setState({ isLoading: false, checkGetHistory340: false })
          break;
        default:
          this.setState({ isLoading: false, checkGetHistory340: false })
          break;
      }
    }
  }

  onPressBuyLotteryAnimal(item) {
    const { infoAccount } = this.props
    let phoneAgent = infoAccount.phoneNumber
    if (item != null) {
      let miniState = "";
      let totalBuy = 0;
      let phone = null;
      item.forEach((item) => {
        var strAmount = item.amountBuy.replace(",", "")
        miniState += item.buyLottery + "; "
        phone = item.phonNumber
        totalBuy += parseInt(strAmount)

      });
      if (totalBuy <= 2000) {
        this.refs.responseMessage.onOpen()
        let amountMustbefrom = I18n.t('amountMustbefrom', { amount: formatNumber(3000 + "") })
        this.setState({ responseMessage: amountMustbefrom })
        return
      }
      let newMiniState = miniState.substring(0, miniState.length - 1)

      this.props.navigation.navigate('TransactionDetail', {
        item,
        phone,
        phoneAgent,
        totalBuy,
        newMiniState,
        onProcess: 'BUY_LOTTERY',
        processName: I18n.t('buyLottery'),
        support: 'BUY_NCC_LOTTERY',
        selectState: 'BUY_NCC_LOTTERY_NUMBER',
        onSelect: 'lotteryAnimal'
      })

    } else {
      alert('Error no itme')
    }
  }
  onGetHistory340() {
    let valueAnimal = 'NCC340';
    this.props.requestHistoryNCC340(valueAnimal)
    this.setState({ isLoading: true, checkGetHistory340: true })
  }
  responseMessage() { this.refs.responseMessage.onClose() }

  render() {
    const { pagWiner, detaStart, dateDraw, rusuell,
      responseMessage, imageOne, imageTwo, imageThree, getDrewHistory } = this.state
    return (
      <SafeAreaView style={{ flex: 1 }}>
        { pagWiner == 'BUY_LOTTERY_ANIMAL' || pagWiner == 'SELL_LOTTERY_ANIMAL' ?
          (
            <LotteryAnimal
              minAmount={1000}
              maxAmount={500000}
              pagSell={pagWiner}
              infoAccount={this.props.infoAccount}
              onOpenListAnimal={() => this.onOpenListAnimal()}
              onPressBuyLotteryAnimal={item => this.onPressBuyLotteryAnimal(item)}
            />
          ) : (
            <AnimalComponent
              onSwich={item => this.onSwich(item)}
              onSellLottery={item => this.onSellLottery(item)}
              onGetHistory340={() => this.onGetHistory340()}
              detaStart={detaStart}
              dateDraw={dateDraw}
              rusuell={rusuell}
              imageOne={imageOne}
              imageTwo={imageTwo}
              imageThree={imageThree}
              buttonEnabled={true}
              getDrewHistory={getDrewHistory}
            />
          )}
        <Notification
          headerType='Warning'
          title={I18n.t('info')}
          textContent={responseMessage}
          buttonText={I18n.t('ok')}
          isButton={true}
          onPress={() => this.responseMessage()}
          ref='responseMessage'
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    infoAccount: state.auth.infoAccount,
    actionType: state.LotteryReducer.actionType,
    drawHistory340: state.LotteryReducer.drawHistory340
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    requestHistoryNCC340: (valueAnimal) => { dispatch(requestHistoryNCC340(valueAnimal)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AnimalSreen)





