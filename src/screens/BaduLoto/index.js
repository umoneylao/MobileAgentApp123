import React, { Component } from 'react'
import { StatusBar, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { requestCallWebviewBadu } from '../../actions/Lottery'
import { ActivityIndicator, Notification } from '../../components'
import { Colors } from '../../themes';
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';
import { bodyBadu } from "../../utils/bodyReq";
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import * as FIELD from '../../utils/CoreFieldMap'
import { requestGetCallTokenBadu } from '../../actions/Lottery'
import { callLinkWeb } from '../../actions/GetPromontion'
import I18n from 'react-native-i18n'

class BaduLotto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            openLinkWeb: null,
            ClientIdBadu: null
        }
    }
    callGetLink() {
        this.props.callLinkWeb('lo', 4)
        this.setState({ isGetLinkWeb: true, isLoading: true })
    }

    callToken() {

        const { infoAccount } = this.props
        RequestField.clearInitField();
        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.WEBVIEW_GET_TOKEN_BADU))
        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber)) // 34
        let data = RequestField.addToInitField(RequestField.addActionNode('1'))
        console.log('data:', data)
        RequestField.clearInitField();
        this.setState({ onLoadingGetToken: true, isLoading: true })
        this.props.requestGetCallTokenBadu(data)
    }

    componentDidMount() {
        this.callGetLink()


    }
    LoadingIndicatorView() {
        return (
            <ActivityIndicator />
        )
    }
    componentWillReceiveProps(nextProps) {
        const { infoAccount } = this.props
        const { isLoading, onCallWebviewBadu, onLoadingGetToken, isGetLinkWeb, openLinkWeb, ClientIdBadu } = this.state
        try {
            if (onLoadingGetToken) {
                if (nextProps.dataCallGetTokenBadu) {
                    // console.log('nextProps.actionType:', nextProps.actionType)
                    // console.log('nextProps.dataCallGetTokenBadu:', nextProps.dataCallGetTokenBadu)
                    switch (nextProps.actionType) {
                        case 'CALL_WEBVIEW_BADU_TOKEN_SUCCESS':
                            let phoneFormate
                            let token = RequestField.getValueField(nextProps.dataCallGetTokenBadu.fieldMap, FIELD.FILE_NAME)
                            let responseCode = nextProps.dataCallGetTokenBadu.responseCode
                            let responseDescription = nextProps.dataCallGetTokenBadu.responseDescription
                            console.log('token:', token)
                            switch (responseCode) {
                                case '00000':
                                    if (infoAccount.phoneNumber.substring(0, 3) === '020') {
                                        if (openLinkWeb) {
                                            phoneFormate = infoAccount.phoneNumber.substring(1, 11)
                                            let data = bodyBadu(phoneFormate, ClientIdBadu)
                                            console.log('data1----bodyBadu----------1:', data)
                                            this.props.requestCallWebviewBadu(data, token, openLinkWeb)
                                            this.setState({ isLoading: true, onCallWebviewBadu: true, dataCallGetTokenBadu: false, onLoadingGetToken: false })
                                        }
                                    } else {
                                        if (openLinkWeb) {
                                            phoneFormate = infoAccount.phoneNumber.substring(1, 10)
                                            // phoneFormate = infoAccount.phoneNumber.substring(1, 10)
                                            let data = bodyBadu(phoneFormate)
                                            console.log('data2---------------2:', data)
                                            this.props.requestCallWebviewBadu(data, token, openLinkWeb)
                                            this.setState({ isLoading: true, onCallWebviewBadu: true, dataCallGetTokenBadu: false, onLoadingGetToken: false })
                                        }
                                    }
                                    break;
                                case responseCode:

                                    this.refs.responseMessage.onOpen()
                                    this.setState({ isLoading: false, dataCallGetTokenBadu: false, onLoadingGetToken: false, responseMessage: responseDescription || 'Can not get token' })
                                    break;

                                default:
                                    break;
                            }
                            break;
                        case 'CALL_WEBVIEW_BADU_TOKEN_FAILED':
                            this.setState({ dataCallGetTokenBadu: false, isLoading: false, onLoadingGetToken: false })
                            break;

                        default:
                            break;
                    }
                }
            }
            if (onCallWebviewBadu) {
                console.log('---nextProps.dataCallWebviewBadu----00000000011111000000003333:', nextProps.dataCallWebviewBadu)
                if (nextProps.dataCallWebviewBadu) {
                    // console.log('nextProps.actionType----------------------ccccc---------:', nextProps.actionType)
                    switch (nextProps.actionType) {
                        case 'CALL_WEBVIEW_BADU_SUCCESS':
                            if (nextProps.dataCallWebviewBadu.data) {
                                // console.log('nextProps.dataCallWebviewBadu.data:', nextProps.dataCallWebviewBadu.data)
                                let link = nextProps.dataCallWebviewBadu.data
                                console.log('---link AAAA----:', link)
                                this.setState({ linkWeb: link })
                            } else {
                                alert('Cant get link url')
                            }

                            this.setState({ isLoading: false, onCallWebviewBadu: false })
                            break;
                        case 'CALL_WEBVIEW_BADU_FAILED':
                            // console.log('CALL_WEBVIEW_BADU_FAILED')
                            this.setState({ isLoading: false, onCallWebviewBadu: false })
                            break;
                        default:
                            break;
                    }
                }

            }
            if (isGetLinkWeb) {
                // console.log('-------bopby -------isGetLinkWeb:')
                // console.log('nextProps.actionTypeGetLink:', nextProps.actionTypeGetLink)
                // console.log('nextProps.dataLinkWeb:', nextProps.dataLinkWeb)
                try {
                    switch (nextProps.actionTypeGetLink) {
                        case 'CALL_LINK_WEBVIEW_SUCCESS':
                            let dataLinkWeb = nextProps.dataLinkWeb
                            if (dataLinkWeb.data.length > 0) {
                                console.log('dataLinkWeb.data:', dataLinkWeb.data)
                                for (let i = 0; i < dataLinkWeb.data.length; i++) {
                                    if (dataLinkWeb.data[i].title_promotion === 'WEBBADU') {
                                        const element = dataLinkWeb.data[i].href;
                                        console.log('element---------111:', element)
                                        this.setState({ openLinkWeb: element })
                                    }
                                }
                                for (let index = 0; index < dataLinkWeb.data.length; index++) {
                                    if (dataLinkWeb.data[index].title_promotion === 'TOKEN_KEY') {
                                        const ClientID = dataLinkWeb.data[index].content_promotion;
                                        console.log('ClientID---------222:', ClientID)
                                        this.setState({ ClientIdBadu: ClientID })
                                    }

                                }
                                this.callToken()
                                this.setState({ linkData: dataLinkWeb.data, isGetLinkWeb: false })
                            }
                            break;
                        case 'CALL_LINK_WEBVIEW_FAILED':
                            this.setState({ linkData: null, isGetLinkWeb: false })
                            break;
                        default:
                            break;
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {

        }
    }
    responseMessage() { this.refs.responseMessage.onClose() }
    render() {
        const { isLoading, linkWeb, responseMessage } = this.state
        console.log('----------linkWeb-------', linkWeb)
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                {isLoading ? <ActivityIndicator /> : null}
                {linkWeb ? (
                    <WebView
                        source={{ uri: linkWeb }}
                        onHttpError={(syntheticEvent) => {
                            const { nativeEvent } = syntheticEvent;
                            console.warn(
                                'WebView received error status code: ',
                                nativeEvent.statusCode,
                            );
                        }}
                        renderLoading={this.LoadingIndicatorView}
                        startInLoadingState={true}
                        mediaPlaybackRequiresUserAction={true}
                        domStorageEnabled={true}
                        allowsInlineMediaPlayback={true}
                        allowFileAccessFromFileURLs={true}
                        allowUniversalAccessFromFileURLs={true}

                    />
                ) : <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <LottieView
                        source={require('../../../assets/icBox.json')}
                        autoPlay
                        loop
                        style={[{ width: 250, height: 250, }]}
                    />
                </View>}

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
        infoAccount: state.auth.infoAccount,
        actionType: state.LotteryReducer.actionType,
        dataCallWebviewBadu: state.LotteryReducer.dataCallWebviewBadu,
        dataCallGetTokenBadu: state.LotteryReducer.dataCallGetTokenBadu,
        actionTypeGetLink: state.getPromotionReducer.actionType,
        dataLinkWeb: state.getPromotionReducer.dataLinkWeb,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestGetCallTokenBadu: (data) => { dispatch(requestGetCallTokenBadu(data)) },
        requestCallWebviewBadu: (data, token, openLinkWeb) => { dispatch(requestCallWebviewBadu(data, token, openLinkWeb)) },
        callLinkWeb: (_language, tyle) => { dispatch(callLinkWeb(_language, tyle)) },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaduLotto)

