import React, { Component } from 'react'
import { View, Modal, TouchableOpacity, Image } from 'react-native'
import { Images } from '../../themes'
import styles from './styles'


export default class Notification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: true,
        }
    }

    onOpen() {
        this.setState({ visible: true })
    }

    onClose() {
        this.setState({ visible: false })
    }

    onCick() {
        this.props.getDate()
        this.setState({ visible: false })

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
                    <View>
                        <TouchableOpacity style={styles.boxClose} onPress={() => this.onClose()}>
                            <Image source={Images.btnClose} style={styles.btnClose} />
                        </TouchableOpacity>
                        <Image source={Images.bannerGame} style={styles.bannerGame} />
                        <TouchableOpacity style={styles.boxPlay} onPress={() => this.onCick()}>
                            <Image source={Images.btnPlay} style={styles.btnPlay} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}
