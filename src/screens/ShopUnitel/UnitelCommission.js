import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet } from 'react-native'
import { Colors } from '../../themes';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux'
import {
    ActivityIndicator
} from '../../components'
import { callLinkWeb } from '../../actions/GetPromontion'
import LottieView from 'lottie-react-native';

class UnitelCommission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tel: '856',
            phoneFormate: null,
            isLoading: false,
            openLinkWeb: null
        };
    }
    LoadingIndicatorView() {
        return (
            <ActivityIndicator />
        )
    }
    callGetLink() {
        this.props.callLinkWeb('lo', 4)
        this.setState({ isGetLinkWeb: true, isLoading: true })
    }

    componentDidMount() {
        const { infoAccount } = this.props
        this.callGetLink()
        if (infoAccount.phoneNumber.substring(0, 3) === '020') {
            this.setState({ phoneFormate: infoAccount.phoneNumber.substring(1, 11) })
        } else {
            this.setState({ phoneFormate: infoAccount.phoneNumber.substring(1, 10) })
        }
       
    }
    componentWillReceiveProps(nextProps) {
        const { isLoading, isGetLinkWeb } = this.state
        if (isGetLinkWeb && isLoading) {
            console.log('nextProps.actionTypeGetLink', nextProps.actionTypeGetLink)
            try {
                switch (nextProps.actionTypeGetLink) {
                    case 'CALL_LINK_WEBVIEW_SUCCESS':
                        let dataLinkWeb = nextProps.dataLinkWeb
                        if (dataLinkWeb.data.length > 0) {
                            for (let i = 0; i < dataLinkWeb.data.length; i++) {
                                if (dataLinkWeb.data[i].title_promotion === 'SHOP_UNITEL_COMMISSION') {
                                    const element = dataLinkWeb.data[i].href;
                                    this.setState({ openLinkWeb: element })
                                    console.log('My unitel:', element)
                                }
                            }
                            this.setState({ linkData: dataLinkWeb.data, isGetLinkWeb: false, isLoading: false })
                        }
                        break;
                    case 'CALL_LINK_WEBVIEW_FAILED':
                        this.setState({ linkData: null, isGetLinkWeb: false, isLoading: false })
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    render() {
        const { phoneFormate, openLinkWeb } = this.state
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                {
                    phoneFormate && openLinkWeb? <WebView
                        source={{ uri: `${openLinkWeb}?msisdn=${phoneFormate}` }}
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

                    /> : <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <LottieView
                            source={require('../../../assets/icBox.json')}
                            autoPlay
                            loop
                            style={[{ width: 250, height: 250, }]}
                        />
                    </View>
                }

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
        actionTypeGetLink: state.getPromotionReducer.actionType,
        dataLinkWeb: state.getPromotionReducer.dataLinkWeb,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        callLinkWeb: (_language, tyle) => { dispatch(callLinkWeb(_language, tyle)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitelCommission)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
})
