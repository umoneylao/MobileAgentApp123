import React, { Component } from 'react'
import { QRCode } from 'react-native-custom-qr-codes';
import PropTypes from 'prop-types';
class QRtransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: 'lo'
        };

    }
    static propTypes = {
        txtQR: PropTypes.string,
    };
    render() {
        const { txtQR } = this.props
        return (
            <QRCode codeStyle='square' content={txtQR} size={80} />
        )
    }
}

export default QRtransaction
