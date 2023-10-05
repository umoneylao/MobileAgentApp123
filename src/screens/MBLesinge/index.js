import React, { Component } from 'react';
import { View, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import Voice from '@react-native-voice/voice';
import jwt from 'react-native-pure-jwt'
import { connect } from 'react-redux'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    async componentDidMount(encrypt = false) {   
        const { infoAccount } = this.props
        try {
            const signature = await jwt.sign({
                "msisdn": '8562099588891',
                "expire": new Date().getTime() + 600000,
                "ts": new Date().getTime()
            },
                'bde306ba-2b15-4de4-85ff-bf038f21c843-b44a6c27-5aff4a6a-b0be-ae183a346bd0',
                {
                    alg: 'HS512',
                }
            );
            this.setState({ token: signature })

            return signature;
        } catch (error) {
            console.log('error get token', error)
        }
    }
    LoadingIndicatorView() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator color='#009b88' size='large' />
            </View>
        )
    }


    render() {
        const { token } = this.state
        console.log('token MB:', token)
        return (
            // https://game-elofun.unitel.com.la:9000/
            <WebView
                source={{ uri: `https://183.182.100.162:8080/online-loan/fetch-information?signature=${token}&packageType=1&lang=la` }}
                renderLoading={this.LoadingIndicatorView}
                startInLoadingState={true}
                mediaPlaybackRequiresUserAction={true}
                domStorageEnabled={true}
                allowsInlineMediaPlayback={true}
                allowFileAccessFromFileURLs={true}
                allowUniversalAccessFromFileURLs={true}

            />

        );
    }
}
const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);