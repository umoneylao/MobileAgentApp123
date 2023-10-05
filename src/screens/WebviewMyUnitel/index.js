import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { requestCallWebviewMyUnitel } from '../../actions/Lottery'
import * as RequestField from '../../utils/RequestField'
import * as ConfigCode from '../../utils/ConfigCode'
import * as FIELD from '../../utils/CoreFieldMap'
import { WebView } from 'react-native-webview';
import { Colors } from '../../themes';
import { ActivityIndicator, Notification } from '../../components'
import LottieView from 'lottie-react-native';
import { callLinkWeb } from '../../actions/GetPromontion'
import I18n from 'react-native-i18n'

const INJECTED_JAVASCRIPT = `const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
console = {
    log: (log) => consoleLog('log', log),
    debug: (log) => consoleLog('debug', log),
    info: (log) => consoleLog('info', log),
    warn: (log) => consoleLog('warn', log),
    error: (log) => consoleLog('error', log),
  };`;

class WebviewMyUnitel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            Language: 'lo'
            // isdn: null,
            // sessionId: null,
            // token: null,
            // language: 'lo'
        }
    }
    callGetLink() {
        let lang = I18n.locale ? I18n.locale : 'lo'
        switch (lang) {
            case 'lo':
                this.setState({ Language: 'lo' })
                break;
            case 'vn':
                this.setState({ Language: 'vi' })
                break;
            case 'cn':
                this.setState({ Language: 'cn' })
                break;
            case 'en':
                this.setState({ Language: 'en' })
                break;

            default:
                break;
        }
        this.props.callLinkWeb('lo', 4)
        this.setState({ isGetLinkWeb: true, isLoading: true })
    }
    callOpenWeb() {
        const { infoAccount } = this.props
        // console.log('infoAccount.phoneNumber:', infoAccount.phoneNumber)
        // console.log('infoAccount.phoneNumber.substring(0, 3):', infoAccount.phoneNumber.substring(0, 3))
        let phoneFormate
        if (infoAccount.phoneNumber.substring(0, 3) === '020') {
            phoneFormate = infoAccount.phoneNumber.substring(1, 11)
            // phoneFormate = '2095873197' // 2095873197 2095958998

            RequestField.clearInitField();
            RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.WEBVIEW_MYUNITEL))
            RequestField.addToInitField(RequestField.addPhone(phoneFormate)) // 34  phoneFormate
            RequestField.addToInitField(RequestField.addActionNode('1'))
            RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))
            let data = RequestField.addToInitField(RequestField.addCustomerPhone(phoneFormate))
            // console.log('data---1:', data)
            RequestField.clearInitField();
            this.setState({ onLoadingWebview: true, isLoading: true, phoneFormate })
            this.props.requestCallWebviewMyUnitel(data)
        } else {
            phoneFormate = infoAccount.phoneNumber.substring(1, 10)
            RequestField.clearInitField();
            RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.WEBVIEW_MYUNITEL))
            RequestField.addToInitField(RequestField.addPhone(phoneFormate)) // 34  
            RequestField.addToInitField(RequestField.addActionNode('1'))
            RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))
            let data = RequestField.addToInitField(RequestField.addCustomerPhone(phoneFormate))
            // console.log('data---2:', data)
            RequestField.clearInitField();
            this.setState({ onLoadingWebview: true, isLoading: true, phoneFormate })
            this.props.requestCallWebviewMyUnitel(data)
        }
    }
    componentDidMount() {
        const { infoAccount } = this.props
        this.callGetLink()
        // console.log('object', infoAccount.language)
    }
    componentWillReceiveProps(nextProps) {
        const { onLoadingWebview, isLoading, isGetLinkWeb } = this.state
        // console.log('nextProps1111111111:', nextProps.actionType)
        console.log('dataCallWebviewMyUnitel:11111111', nextProps.dataCallWebviewMyUnitel)
        if (onLoadingWebview) {
            if (nextProps.dataCallWebviewMyUnitel) {
                switch (nextProps.actionType) {
                    case 'CALL_WEBVIEW_MY_UNITEL_SUCCESS':
                        let phone = RequestField.getValueField(nextProps.dataCallWebviewMyUnitel.fieldMap, FIELD.CUSTOMER_PHONE)
                        let sessionId = RequestField.getValueField(nextProps.dataCallWebviewMyUnitel.fieldMap, FIELD.FILE_NAME)
                        let token = RequestField.getValueField(nextProps.dataCallWebviewMyUnitel.fieldMap, FIELD.TO_NAME)
                        // console.log(`sessionId`, sessionId)
                        // console.log(`token`, token)
                        this.setState({ onLoadingWebview: false, isLoading: false, phone, sessionId, token })
                        break;
                    case 'CALL_WEBVIEW_MY_UNITEL_FAILED':
                        this.setState({ onLoadingWebview: false, isLoading: false })
                        break;

                    default:
                        break;
                }
            }

        }
        if (isGetLinkWeb && isLoading) {
            // console.log('nextProps.actionTypeGetLink:', nextProps.actionTypeGetLink)
            // console.log('nextProps.dataLinkWeb:', nextProps.dataLinkWeb)
            try {
                switch (nextProps.actionTypeGetLink) {
                    case 'CALL_LINK_WEBVIEW_SUCCESS':
                        let dataLinkWeb = nextProps.dataLinkWeb
                        if (dataLinkWeb.data.length > 0) {
                            for (let i = 0; i < dataLinkWeb.data.length; i++) {
                                if (dataLinkWeb.data[i].title_promotion === 'MYUNITEL') {
                                    const element = dataLinkWeb.data[i].href;
                                    this.setState({ openLinkWeb: element })
                                    // console.log('My unitel:', element)
                                }
                            }
                            this.callOpenWeb()
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
    }
    LoadingIndicatorView() {
        return (
            <ActivityIndicator />
        )
    }
    // loadHandler(data) {
    //     // console.log('>>>>> data <<<<< :', data);
    // }

    onMessage = (payload, code, message) => {
        // console.log('<<<<<  code >>>>>:', code)
        // console.log('<<<<<  message >>>>>:', message)
        let dataPayload;
        try {
            dataPayload = JSON.parse(payload.nativeEvent.data);
            //   console.log('<<<<<  payload >>>>>:', payload)
        } catch (e) {
            console.log('<<<<<  e >>>>>:', e)
        }
        if (dataPayload) {
            if (dataPayload.type === 'Console') {
                console.info(`[Console] ${JSON.stringify(dataPayload.data)}`);
            } else {
                console.log('dataPayload.code', dataPayload.code)
                if (dataPayload.code === 'close_webview') {
                    this.refs.errorMessenger.onOpen()
                    this.setState({ errorMessenger: I18n.t('sessionExpired') })
                } else {
                    this.refs.errorMessenger.onOpen()
                    this.setState({ errorMessenger: I18n.t('sessionExpired') })
                }
            }
        }
    };
    errorMessenger() {
        this.props.navigation.popToTop()
    }
    render() {
        //phoneFormate
        const { isLoading, phone, sessionId, token, phoneFormate, openLinkWeb, errorMessenger, Language } = this.state
        // console.log(`link: `, `${openLinkWeb}#/home?isdn=${phoneFormate}&sessionId=${sessionId}&token=${token}&language=${Language}`)
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' backgroundColor={Colors.headerColor} />
                {isLoading ? <ActivityIndicator /> : null}

                {phone && sessionId && token && openLinkWeb ? (
                    <WebView
                        source={{ uri: `${openLinkWeb}#/home?isdn=${phoneFormate}&sessionId=${sessionId}&token=${token}&language=${Language}` }}
                        // source={{ uri: `https://munny.jones.vn/#/mobile/view_invoice?isdn=2093691472&sessionId=2a9b517a-b87f-4610-91be-28212f57fa1d&token=Uib7y0IFYnJ5ofiksMRDXQ%3D%3D&language=en` }}
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
                        injectedJavaScript={INJECTED_JAVASCRIPT}
                        mixedContentMode={'always'}
                        onMessage={this.onMessage}

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
                    textContent={errorMessenger}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.errorMessenger()}
                    ref='errorMessenger'
                />

            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
        actionType: state.LotteryReducer.actionType,
        dataCallWebviewMyUnitel: state.LotteryReducer.dataCallWebviewMyUnitel,
        actionTypeGetLink: state.getPromotionReducer.actionType,
        dataLinkWeb: state.getPromotionReducer.dataLinkWeb,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestCallWebviewMyUnitel: (data) => { dispatch(requestCallWebviewMyUnitel(data)) },
        callLinkWeb: (_language, tyle) => { dispatch(callLinkWeb(_language, tyle)) },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WebviewMyUnitel)
