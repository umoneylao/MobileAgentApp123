import React, { Component } from 'react'
import { Text, SafeAreaView, } from 'react-native'
import { DigitsComponent, Notification } from '../../components'
import LotteryNumberComponent from '../../components/LotteryNumber'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { formatNumber } from '../../utils/Formater'
import { requestHistoryNCC } from '../../actions/Lottery'
class LotteryNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            getDrewHistory: null,
            pagWiner: null,
            isRequestGetinfoNumber: false,
            buttonEnabled: false,
            showMessengError: null,
            tranDes: null,
            Start_time: null,
            draw_date: null,
            One_digit: null,
            two_digit: null,
            therr_digit: null,
            four_digit: null,
            five_digit: null,
            six_digit: null,
            responseMessage: '',
            
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.checkNumberWin) {
            switch (nextProps.actionType) {
                case 'DRAW_HISTORY_SUCCESS':
                    let valueNumberWin = nextProps.drawHistory.drawHistoryCollection.drawHistoryList
                    this.setState({ isLoading: false, getDrewHistory: valueNumberWin , checkNumberWin: false })
                    break;
                case 'DRAW_HISTORY_FAILED':
                    this.setState({ isLoading: false, checkNumberWin: false })
                    break;
                default:
                    this.setState({ isLoading: false, checkNumberWin: false })
                    break;
            }
        }
    }
    onGetHistoryNumber() {
        let value = 'NCC';
        this.props.requestHistoryNCC(value)
        this.setState({ isLoading: true, checkNumberWin: true })
    }
    componentDidMount() {
       
        const { getReponDigits } = this.props
        if (getReponDigits) {

            let arr = getReponDigits.split("|")
            let Start_time = arr && arr[2]
            let draw_date = arr && arr[9]
            let result = arr && arr[15]

            let One_digit = result.substring(0, 1)
            let two_digit = result.substring(1, 2)
            let therr_digit = result.substring(2, 3)
            let four_digit = result.substring(3, 4)
            let five_digit = result.substring(4, 5)
            let six_digit = result.substring(5, 6)

            this.setState({
                Start_time: Start_time,
                draw_date: draw_date,
                One_digit: One_digit,
                two_digit: two_digit,
                therr_digit: therr_digit,
                four_digit: four_digit,
                five_digit: five_digit,
                six_digit: six_digit
            })
        } else { }
    }
    onSwich(item) {
       
        this.setState({ pagWiner: item })
    }
    onPressBuyLottery(item) {

        const { infoAccount } = this.props
        let phoneAgent = infoAccount.phoneNumber
        if (item != null) {
            let miniState = "";
            let totalBuy = 0;
            item.forEach((item) => {
                var strAmount = item.amountBuy.replace(",", "")
                miniState += item.buyLottery + ", "
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
            this.props.navigation.navigate('TransactionDetail',
                {
                    item,
                    phone,
                    phoneAgent,
                    totalBuy,
                    newMiniState,
                    onProcess: 'BUY_LOTTERY',
                    processName: I18n.t('buyLottery'),
                    support: 'BUY_NCC_LOTTERY',
                    selectState: 'BUY_NCC_LOTTERY_NUMBER',
                    onSelect: 'lotteryNumber'
                })
        } else {
            alert('Error no itme')
        }
    }
    responseMessage() { this.refs.responseMessage.onClose() }
    render() {
        const { pagWiner, Start_time, draw_date, One_digit, two_digit,
            therr_digit, four_digit, five_digit, six_digit, responseMessage, getDrewHistory } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {pagWiner == 'BUY_LOTTERY_DIGITS' ?
                    (
                        <LotteryNumberComponent
                            minAmount={1000}
                            maxAmount={500000}
                            pagSell={pagWiner}
                            infoAccount={this.props.infoAccount}
                            onPressBuyLottery={item => this.onPressBuyLottery(item)}
                        />
                    ) :
                    (

                        <DigitsComponent
                            onSwich={item => this.onSwich(item)}
                            onGetHistoryNumber={() => this.onGetHistoryNumber()}
                            Start_time={Start_time}
                            draw_date={draw_date}
                            One_digit={One_digit}
                            two_digit={two_digit}
                            therr_digit={therr_digit}
                            four_digit={four_digit}
                            five_digit={five_digit}
                            six_digit={six_digit}
                            onSellLottery={item => this.onSellLottery(item)}
                            buttonEnabled={true}
                            getDrewHistory={getDrewHistory}
                        />
                    )
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
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
        actionType: state.LotteryReducer.actionType,
        drawHistory: state.LotteryReducer.drawHistory
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestHistoryNCC: (value) => { dispatch(requestHistoryNCC(value)) }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LotteryNumber)
