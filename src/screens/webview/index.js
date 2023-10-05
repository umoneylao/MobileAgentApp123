import React, { Component } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux'
import * as Constant from '../../utils/Constant'
// import forge from "node-forge";

// const removeB64Padding = base64 => base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const JWTWebViewTokenPayload = {
    'secretKey': 'Tt1uo0chceT3SsOMGHrY5BTcNxK0qOzKROb5Bt3G3Tk1vF6MRFZ4bfFvtj9RimePVjohYJSjqPbstgDwjiZLF2UCA',
    'type': 'BADU_LUCKY_SERVICE'
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    encodeB64(str) {
        const encodedB64 = forge.util.encode64(str);
        return removeB64Padding(encodedB64);
    }

    componentDidMount() {
        try {
            // const key = forge.pki.privateKeyFromPem('0090');
            console.log('---pp----')
            // const md = forge.md.sha256.create();
            // const header = {
            //     alg: "RS256",
            //     typ: "JWT"
            // };
            // const strHeader = JSON.stringify(header);
            // const strPayload = JSON.stringify(JWTWebViewTokenPayload);
            // const header64 = encodeB64(strHeader);
            // const payload64 = encodeB64(strPayload);
            // const preHash = header64 + '.' + payload64;
            // md.update(preHash, 'utf8');
            // const signature = key.sign(md);
            // const signature64 = encodeB64(signature);
            // console.log('---', header64 + '.' + payload64 + '.' + signature64)
        } catch (error) {
            console.log('error get token', error)
        }

      
    }
    render() {
        const { token } = this.state
        return (
            <View style={{ flex: 1 }}>
                {/* <Text>{token}</Text> */}
            </View>
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