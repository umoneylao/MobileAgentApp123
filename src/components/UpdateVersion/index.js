import React, { Component } from 'react'
import { Text, View, Modal, TouchableOpacity, Platform, Linking } from 'react-native'
import { Colors } from '../../themes'
import I18n from 'react-native-i18n'
import styles from './styles'
import LottieView from 'lottie-react-native';

export default class Notification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    onOpen() {
        this.setState({ visible: true })
    }

    onClose() {
        this.setState({ visible: false })
    }
    onPressUpdate() {
        let url = this.props.linkDowload
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI');
            }
        });
    }


    render() {
        const { titleUpdate, contentUpdate } = this.props
        return (
            <Modal animationType="slide"
                transparent={true}
                visible={this.state.visible}
                style={styles.centerModal}
            >
                <View style={styles.updateModal}>
                    <View style={styles.updateContent}>
                        <View style={styles.iconAler}>
                            <LottieView
                                source={require('../../../assets/updateversion.json')}
                                autoPlay
                                loop
                                style={[{ width: 120, height: 120, }]}
                            />
                        </View>
                        <View style={{ flexDirection: 'column' }}>

                            <View style={styles.updateDetail}>
                                <Text style={styles.updateTitle}>
                                    {titleUpdate}
                                </Text>
                                <Text numberOfLines={5} style={{ textAlign: 'center', padding: 10 }} >
                                    {contentUpdate}
                                </Text>
                            </View>
                            <View style={styles.updateBtnGroup}>
                                {
                                    this.props.updateType == 0 ?
                                        <TouchableOpacity style={styles.btnUpdateStyle} onPress={() => this.onClose()}>
                                            <Text style={styles.btnTextUpdate}>{I18n.t('Later')}</Text>
                                        </TouchableOpacity>
                                        : null
                                }
                                <TouchableOpacity
                                    style={
                                        [styles.btnUpdateStyle,
                                        { borderLeftWidth: this.props.updateType == 0 ? Platform.OS == 'android' ? 1 : 2 : 0, borderColor: Colors.borderColor, width: this.props.updateType == 0 ? '50%' : '100%' }]}
                                    onPress={() => this.onPressUpdate()}>
                                    <Text style={styles.btnTextUpdate}>{I18n.t('Update')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}
