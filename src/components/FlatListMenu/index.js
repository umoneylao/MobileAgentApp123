import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import I18n from 'react-native-i18n'
import { Images, Colors } from '../../themes'
import Icon from 'react-native-vector-icons/Ionicons'
class index extends Component {
    onCick = (item) => {
        this.props.navigate(item)
    }
    renderItemMenu = (item) => {
        return (
            <TouchableOpacity style={styles.contaner} onPress={() => this.onCick(item.navigate)}>
                <View style={styles.logo}>
                    <Image source={item.icon} style={styles.iconStyle} />
                </View>
                <View style={styles.groudTxt}>
                    <View style={styles.txtTile}>
                        <Text style={styles.txt}>{I18n.t(item.name)}</Text>
                    </View>
                    <View style={styles.icon}>
                        <Icon name='chevron-forward' size={30} color={Colors.textFullnamebank} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <FlatList
                data={this.props.ListMenu}
                renderItem={({ item, index }) => this.renderItemMenu(item, index)}
                keyExtractor={item => item.id}
            />
        )

    }
}

export default index
const styles = StyleSheet.create({
    contaner: {
        flexDirection: 'row',
        width: '100%',
        height: 60

    },
    logo: {
        width: '15%',

        justifyContent: 'center',
        alignItems: 'center'
    },
    groudTxt: {
        flexDirection: 'row',
        width: '85%',

    },
    txtTile: {
        width: '90%',
        justifyContent: 'center',
        padding: 5
    },
    icon: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.backColor
    },
    iconStyle: {
        width: 45,
        height: 45,
    }
})
