import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import I18n from 'react-native-i18n'
import { Colors } from '../../themes'
class SetModalComponent extends Component {

    renderItemStatus(item, index) {
        return (
            <View>
                <TouchableOpacity style={styles.warpItemList} onPress={() => this.selectStatus(item.value, item.name, item.key)}>
                    <Text style={styles.txtIcon} numberOfLines={1} >{I18n.t(item.name)}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    onClose() {
        this.props.onClose()
    }
    selectStatus = (value, name, key) => {
       this.props.onSelectItem(value, name, key)
    }
    render() {
        return (
            <View style={styles.modelMain}>
                <View style={{ padding: 30, }}>
                    <FlatList
                        data={this.props.listData}
                        renderItem={({ item, index }) => this.renderItemStatus(item, index)}
                        keyExtractor={(item, index) => item.id}
                    />
                </View>
                <TouchableOpacity style={styles.btnFooter} onPress={() => this.onClose()}>
                    <Text style={styles.label}>{I18n.t('cancel')}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default SetModalComponent
const styles = StyleSheet.create({
    modelMain: {
        backgroundColor: Colors.white,
        width: '80%',
        height: null,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    btnFooter: {
        backgroundColor: Colors.orange,
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10
    },
    label: {
        color: Colors.white,
        fontWeight: 'bold'
    },
    warpItemList: {
        padding: 10
    },

})