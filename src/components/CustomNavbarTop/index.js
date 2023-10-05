import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import I18n from 'react-native-i18n'
import { Images } from '../../themes'
class index extends Component {
    onBack() {
        this.props.onBack()
    }
    onCick() {
        this.props.onCick()
    }
    render() {
        const { conten, iconRight, icon, img } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.left}>
                        <TouchableOpacity style={styles.icon} onPress={() => this.onBack()}>
                            <Icon name='arrow-back-outline' size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.txtConten}>{I18n.t(conten)}</Text>
                    </View>
                    <View style={styles.right}>
                        {!icon ? (
                            <TouchableOpacity style={styles.icon} onPress={() => this.onCick()}>
                                <Icon name={iconRight} size={25} />
                            </TouchableOpacity>
                        ) :
                            <TouchableOpacity style={styles.icon}>
                                <Image source={Images.logoDetale} style={styles.iconStyle} />
                            </TouchableOpacity>}
                    </View>
                </View>
            </View>
        )
    }
}

export default index;
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 0,
        elevation: 3,
    },
    main: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'center',
        height: 60
    },
    left: {
        alignItems: 'flex-start',
        flex: 1,
        justifyContent: 'center',
        // backgroundColor:'#ccc'
    },
    center: {
        alignItems: 'center',
        flex: 5,
        justifyContent: 'center'
    },
    right: {
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'center',
    },
    icon: {
        padding: 10,
    },
    txtConten: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: "uppercase"
    },
    iconStyle: {
        width: 50,
        height: 25
    },
})
