import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar } from 'react-native'
import { ApprovalComponent, ActivityIndicator, Notification } from '../../components'
import { connect } from 'react-redux'
import { getSearchTranSaction } from '../../actions/Auth'
import I18n from 'react-native-i18n'
import { Colors } from '../../themes'
class ApprovalTransection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            result: null,
            bar: 'dark-content'
        };
    }
    onPressToDetail(item) {
        let dataList = []
        dataList.push({
            "Transaction": item.TRANSACTION_ID,
            "money": item.AMOUNT,
            "date": item.DATE_CREATED,
            "name": item.CHANNEL_NAME,
            "from_phone": item.FROM_PHONE,
            "from_id": item.FROM_ID,
            "to_phone": item.TO_PHONE,
            "to_id": item.TO_ID,
            "org_amount": item.ORG_AMOUNT,
            "fee": item.FEE,
            "total_amount": item.TOTAL_AMOUNT,
            "request_reason": item.REQUEST_REASON,
            "request_user": item.REQUEST_USER,
            "date_created": item.DATE_CREATED,
            "bank_transid": item.BANK_TRANSID,
            "bank_code": item.BANK_CODE,
            "bank_name": item.BANK_NAME,
            "action_state_id": item.ACTION_STATE_ID,
            "action_state_name": item.ACTION_STATE_NAME,
            "process_code": item.PROCESS_CODE,
            "from_channel_id": item.FROM_CHANNEL_ID,
            "to_channel_id": item.TO_CHANNEL_ID,
            "account_type_id": item.ACCOUNT_TYPE_ID,
            "adjusted_type": item.ADJUSTED_TYPE,
            "payer_paper_number": item.PAYER_PAPER_NUMBER,
            "payer_name": item.PAYER_NAME,
            "action_id": item.ACTION_ID,
            "channel_name": item.CHANNEL_NAME,
            "channel_phone": item.CHANNEL_PHONE,
            "request_no": item.REQUEST_NO,
            "action_node_id": item.ACTION_NODE_ID,
            "action_node_name": item.ACTION_NODE_NAME,
            "payer_paper_type": item.PAYER_PAPER_TYPE,
            "content": item.CONTENT,
            "role_name": item.ROLE_NAME,
            "is_forward": item.IS_FORWARD,
            "payer_phone": item.PAYER_PHONE,
            "reject_reason": item.REJECT_REASON,
            "approver": item.APPROVER
        })
        this.props.navigation.navigate('TransactionDetail',
            {
                dataAppro: dataList,
                onProcess: 'APPROVAL_TRANSACTION',
                processName: I18n.t('approvalTransaction'),
                selectState: 'APPROVAL_TRANSACTION'
            })

    }
    onPressSearchTranSaction(DateStart, DateEnd, transId, statusValue, idRequest, Petitioner) {
        const { infoAccount } = this.props
        let introPhone = "856";
        let acPhone = infoAccount.phoneNumber
        if (acPhone.length > 0) {
            let phone = acPhone.substring(1, 11);
            let accountPhone = introPhone + phone;
            this.props.getSearchTranSaction(DateStart, DateEnd, accountPhone, transId, statusValue, idRequest, Petitioner);
            this.setState({ isLoading: true, getSearchTranSaction: true });
            // console.log('DateStart',DateStart)
            // console.log('DateEnd',DateEnd)
            // console.log('accountPhone',accountPhone)
            // console.log('transId',transId)
            // console.log('statusValue',statusValue)
            // console.log('idRequest',idRequest)
            // console.log('Petitioner',Petitioner)
        } else {

        }

    }
    componentWillReceiveProps(nextProps) {
        const { isLoading, getSearchTranSaction } = this.state
        if (isLoading && getSearchTranSaction) {
            switch (nextProps.actionType) {
                case 'GET_SEARCH_TRANSACTION_SUCCESS':
                    let dataResule = nextProps.getSearchdataTransaction.TRANSACTION_FINANCECollection.TRANSACTION_FINANCE
                    if (dataResule) {
                        this.setState({ dataResule, isLoading: false, getSearchTranSaction: false })
                    } else {
                        this.refs.message.onOpen()
                    }
                    break;
                case 'GET_SEARCH_TRANSACTION_FAILED':
                    this.refs.message.onOpen()
                    this.setState({ result: null, isLoading: false, getSearchTranSaction: false })
                    break;
                default:
                    break;
            }
        } else {
            this.refs.message.onOpen()
        }
    }
    message() { this.refs.message.onClose() }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
                {this.state.isLoading ? <ActivityIndicator /> : null}
                <ApprovalComponent
                    onrResult={this.state.dataResule ? this.state.dataResule : null}
                    onPressToDetail={item => this.onPressToDetail(item)}
                    onPressSearchTranSaction={(DateStart, DateEnd, transId, statusValue, idRequest, Petitioner) => this.onPressSearchTranSaction(DateStart, DateEnd, transId, statusValue, idRequest, Petitioner)}
                />
                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={I18n.t('10119')}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.message()}
                    ref='message'
                />
            </SafeAreaView>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
        actionType: state.auth.actionType,
        isLoading: state.auth.isLoading,
        getSearchdataTransaction: state.auth.getSearchdataTransaction
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getSearchTranSaction: (DateStart, DateEnd, accountPhone, transId, statusValue, idRequest, Petitioner) => { dispatch(getSearchTranSaction(DateStart, DateEnd, accountPhone, transId, statusValue, idRequest, Petitioner)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ApprovalTransection);
