

import React, { Component, useState,useEffect } from 'react';
import { View, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
// import Voice from '@react-native-voice/voice';
// import jwt from 'react-native-pure-jwt'
import { connect } from 'react-redux'
import axios from 'axios'
import I18n from "react-native-i18n";

class IdeaInitiative extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: null,
            phoneNumber: '',
            lang: ''
        };
    }


    getDataFromAPI = async () => {
        const { infoAccount } = this.props;
        
        
            await axios.get(`https://hss.unitel.com.la:8995/hss-ws/api/get-token-auto-login?isdn=${infoAccount.phoneNumber}`)
            .then(response => {
                // Xử lý dữ liệu trả về tại đây
                this.setState({ token: response.data })
            })
            .catch(error => {
                console.error(error);
            });        
    }
    async componentDidMount(encrypt = false) {
        this.getDataFromAPI();
        this.log();

    }
    LoadingIndicatorView() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator color='#009b88' size='large' />
            </View>
        )
    }
    render() {
        const { token, lang } = this.state;
        const { infoAccount } = this.props;

        return (
            <WebView
            // style={{marginTop:-50}}
                source={{ uri: `https://hss.unitel.com.la:8997/home/homepage?token=${token}&lang=${I18n.currentLocale()=='vn' ? 'vi' : I18n.currentLocale()=='en' ? 'en' :I18n.currentLocale()=='lo' ? 'lo' :'zh'}` }}
                renderLoading={this.LoadingIndicatorView}
                startInLoadingState={true}
                // mediaPlaybackRequiresUserAction={true}
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
export default connect(mapStateToProps, mapDispatchToProps)(IdeaInitiative);