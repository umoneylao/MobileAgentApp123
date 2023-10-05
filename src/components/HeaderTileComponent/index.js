import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Colors } from '../../themes'
import I18n from 'react-native-i18n'
class index extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.txtHeader}> {I18n.t(this.props.txtHeader)} {this.props.numberCustomer}</Text>
            </View>
        )
    }
}

export default index
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: null,
        backgroundColor: Colors.txtHeader
    },
    txtHeader: {
        padding: 10,
        color: Colors.textFullnamebank,
        fontSize:14
    }
})

