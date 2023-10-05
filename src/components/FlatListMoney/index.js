import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Colors } from '../../themes'

class index extends Component {
    onSetMoney(item) {
        this.props.getMoney(item)
    }
    renderItemMoney(item) {
        return (
            <View style={styles.gruodMoney}>
                <TouchableOpacity style={styles.moneyBox} onPress={() => this.onSetMoney(item.money)}>
                    <Text style={styles.txtMoney}>{item.money}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.borderMoney}>
                <FlatList
                    data={this.props.Money}
                    renderItem={({ item, index }) => this.renderItemMoney(item, index)}
                    extraData={Object.assign(this.props)}
                    keyExtractor={(item, index) => item.id}
                    horizontal={true}
                />
            </View>
        )
    }
}

export default index
const styles = StyleSheet.create({
    borderMoney: {
        width: '100%',
        height: null,
        marginBottom: 20,
        justifyContent:'space-between',
        alignItems:'center'
    },
    gruodMoney: {
        padding: 4.5,
    },
    txtMoney: {
        fontWeight: 'bold',
        fontSize: 16
    },
    moneyBox: {
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.txtIntup,
        borderRadius: 5
    },
})
