
import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { LogoApp } from '../../components'
import { requestHistoryTranfer, requestHistoryTranferNew } from '../../actions/Auth'
import { formatNumber } from '../../utils/Formater'

import { Colors } from '../../themes'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataReques: null
        };
    }
    componentDidMount() {
        if (this.props.tyles) {
            console.log('1')
            switch (this.props.tyles) {
                case this.props.tyles:
                    const { infoAccount, processCode } = this.props
                    let accountId = infoAccount.accountId
                    let PatnetCode = this.props.tyles ? this.props.tyles : ''
                    this.props.requestHistoryTranferNew(accountId, processCode, PatnetCode)
                    this.setState({ isLoading: true, getHistoryPaymentNew: true })
                    break;
                default:
                    break;
            }
        } else {
            try {
                console.log('2')
                const { infoAccount, processCode } = this.props
                let _processCode = processCode
                let _accountId = infoAccount.accountId
                console.log('_processCode', _processCode)
                console.log('_accountId',_accountId)
                this.props.requestHistoryTranfer(_accountId, _processCode)
                this.setState({ isLoading: true, getHistoryPayment: true })
            } catch (e) {
                console.log('Error')
            }
        }


    }
    componentWillReceiveProps(nextProps) {
        if (this.state.getHistoryPayment) {
            switch (nextProps.actionType) {
                case 'REQUES_HISTORY_TRANFER_SUCCESS':
                    let dataReques = nextProps.requesHistoryTranfer.recentCollections.recentTransactions
                    this.setState({ isLoading: false, getHistoryPayment: false, dataReques })
                    break;
                case 'REQUES_HISTORY_TRANFER_FAILED':
                    this.setState({ isLoading: false, getHistoryPayment: false })
                    break;
                default:
                    break;
            }
        }
        if (this.state.getHistoryPaymentNew) {
            switch (nextProps.actionType) {
                case 'REQUES_HISTORY_TRANFER_NEW_SUCCESS':
                    let dataReques = nextProps.getNewTransaction.recentWaterPayCollections.recentWaterPayTransactions
                    this.setState({ isLoading: false, getHistoryPaymentNew: false, dataReques })
                    break;
                case 'REQUES_HISTORY_TRANFER_NEW_FAILED':
                    this.setState({ isLoading: false, getHistoryPaymentNew: false })
                    break;

                default:
                    break;
            }
        }
    }
    _renderItem(item, id) {
        return (
            <TouchableOpacity onPress={() => this.onGetdata(item)} style={{ padding: 5 }}>
                <View style={{ width: 160, height: null, flexDirection: 'row', backgroundColor: '#ffff', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, justifyContent: 'center', padding: 5 }}>
                    <View style={{ width: '30%', justifyContent: 'center' }}>
                        <LogoApp processCode={this.props.processCode} icon={item.partnerCode} />
                    </View>
                    <View style={{ width: '70%', padding: 5, justifyContent: 'center' }}>
                        {item.entityName ?
                            (
                                <Text numberOfLines={1}>{item.entityName}</Text>
                            ) : null}
                        {item.entityCode ? (
                            <Text style={{ color: Colors.backColor }} numberOfLines={1}>{item.entityCode}</Text>
                        ) : null}
                        {
                            item.amount ? (
                                <Text style={{ color: Colors.orange }} numberOfLines={1}>{formatNumber(item.amount)} ₭</Text>
                            ) : null
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    onGetdata = (item) => {
        this.props.onselect(item)
    }
   
    render() {
        const { dataReques } = this.state
        console.log('dataReques:', dataReques)
        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: null }}>
                    {dataReques != null ? (
                        <FlatList
                            data={dataReques}
                            horizontal={true}
                            renderItem={({ item, index }) => this._renderItem(item, index)}
                            keyExtractor={item => item.id}
                        />
                    ) : null}

                </View>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
        actionType: state.auth.actionType,
        requesHistoryTranfer: state.auth.requesHistoryTranfer,
        getNewTransaction: state.auth.getNewTransaction,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestHistoryTranfer: (_accountId, _processCode) => { dispatch(requestHistoryTranfer(_accountId, _processCode)) },
        requestHistoryTranferNew: (accountId, processCode, PatnetCode) => { dispatch(requestHistoryTranferNew(accountId, processCode, PatnetCode)) },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);