import React, { Component } from 'react'
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native'
import { Metrics, Colors, Images } from '../../themes'
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
    render() {
        const { textContent, buttonText, headerType, title } = this.props
        return (
            <Modal animationType="slide"
                transparent={true}
                visible={this.state.visible}
                style={styles.centerModal}
            >
                <View style={styles.contentModal}>
                    <View style={styles.content}>
                        <View style={styles.mainContent}>
                            <View style={[styles.textContent, { padding: 10, marginBottom: 20 }]}>
                                {
                                    headerType == "Success" ?

                                        <LottieView
                                            source={require('../../../assets/jsonSuccess.json')}
                                            autoPlay
                                            loop
                                            style={[{ width: 120, height: 120, }]}
                                        />
                                        : headerType == "Warning" ?

                                            <LottieView
                                                source={require('../../../assets/icWarning.json')}
                                                autoPlay
                                                loop
                                                style={[{ width: 120, height: 120, }]}
                                            />
                                            : headerType == "contact" ?
                                                <LottieView
                                                    source={require('../../../assets/contactUs.json')}
                                                    autoPlay
                                                    loop
                                                    style={[{ width: 120, height: 120, }]}
                                                />
                                                :
                                                <LottieView
                                                    source={require('../../../assets/icWarning.json')}
                                                    autoPlay
                                                    loop
                                                    style={[{ width: 120, height: 120, }]}
                                                />
                                }
                            </View>
                            <View style={styles.textContent}>
                                <Text style={styles.titleStyle}>
                                    {title}
                                </Text>
                                <Text style={{ justifyContent: 'center', textAlign: 'center', paddingLeft: 10, paddingRight: 10, fontSize: Metrics.number16 }} numberOfLines={3}>
                                    {textContent}
                                </Text>
                            </View>
                            <View style={styles.footer}>
                                {
                                    this.props.isButton === true ?
                                        <TouchableOpacity style={styles.btnHide} onPress={this.props.onPress}>
                                            <Text style={{ color: Colors.white, textAlign: 'center', fontSize: Metrics.number16 }}>
                                                {buttonText}
                                            </Text>
                                        </TouchableOpacity> :
                                        <TouchableOpacity style={styles.btnHide} onPress={() => this.setState({ visible: false })}>
                                            <Text style={{ color: Colors.white, textAlign: 'center', fontSize: Metrics.number16 }}>
                                                {buttonText}
                                            </Text>
                                        </TouchableOpacity>
                                }

                            </View>
                        </View>


                    </View>
                </View>
            </Modal>
        )
    }
}
