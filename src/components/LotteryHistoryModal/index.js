import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Modal, FlatList } from 'react-native'
import styles from './style'
import { CardView, FullButton, TextInput } from '../../components'
import I18n from 'react-native-i18n'
import * as Constant from '../../utils/Constant'

export default class LotteryHistoryModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            lottery_id: 0,
            lottery: 0,
            amount: 0,
        }
    }

    onOpen(data) {
        this.setState({ visible: true, data })
    }

    onCancel = () => {
        this.setState({ visible: false })
    }
    _renderHeader() {
        return (
            <TouchableOpacity style={styles.containerItemHistory}>
                <Text style={styles.txtItem}>{I18n.t('colNum')}</Text>
                <Text style={styles.txtItem}>{I18n.t('numberLottery')}</Text>
                <Text style={styles.txtItem}>{I18n.t('amount')}</Text>
            </TouchableOpacity>
        )
    }

    _renderItem(item, id) {
        return (
            <View style={styles.containerItemHistory}>
                <Text style={styles.txtItem}>{id + 1}</Text>
                <Text style={styles.txtItem}>{item.number}</Text>
                <Text style={styles.txtItem}>{item.amount}</Text>
            </View>
        )
    }


    render() {
        return (
            <Modal
                visible={this.state.visible}
                style={styles.centerModal}
                onRequestClose={() => { }}
                animationType='slide'
                transparent>
                <TouchableOpacity style={styles.modalContentPin} onPress={() => { }} activeOpacity={1} >
                    <View style={styles.warpDetail}>
                        <TouchableOpacity activeOpacity={1} >
                            <CardView style={styles.cardDetail}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                    <Text style={styles.txtTitle}>*** {I18n.t('historyBuyLottery')} ***</Text>
                                </View>
                                <View style={styles.rowButton}>
                                    <FlatList
                                        data={this.props.historyDetail}
                                        renderItem={({ item, index }) => this._renderItem(item, index)}
                                        extraData={this.state}
                                        keyExtractor={item => item.id}
                                        ListHeaderComponent={() => this._renderHeader()}
                                    />
                                </View>
                                <View style={styles.rowButton}>
                                    <FullButton
                                        text={I18n.t('cancel')}
                                        styles={[styles.buttonStyle, { width: '100%' }]}
                                        onPress={() => this.onCancel()}
                                    />
                                </View>
                            </CardView>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}

LotteryHistoryModal.defaultProps = {
    validatePhoneConst: Constant.VALIDATE_NUMERIC,
    validateMoneyConst: Constant.VALIDATE_MONEY,
    minAmount: 1000,
    maxAmount: 500000
}
