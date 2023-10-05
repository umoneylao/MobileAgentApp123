import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native'
import I18n from 'react-native-i18n'
import { Images, Colors } from '../../themes'
class index extends Component {
    onHistorBuy() {
        this.props.on()
    }
    render() {
        return (
            <View style={styles.header}>
                {this.props.iconBank ?
                    <View style={{ width: '20%' }}></View>
                    : null}
                {this.props.icon ? (
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.headerTextIcon}>
                            <Text numberOfLines={1} style={styles.textHeaderIcon}> {I18n.t(this.props.txtTitle)} </Text>
                        </View>
                        <TouchableOpacity onPress={() => this.onHistorBuy()}>
                            <Text style={{ color: Colors.txtUpLight, fontSize: 14, fontWeight: 'bold' }}>History</Text>
                        </TouchableOpacity>
                    </View>

                ) :
                    this.props.iconBank ?
                        <View style={styles.headerTexticonBank}>
                            <Text style={styles.textHeader}> {I18n.t(this.props.txtTitle)}</Text>
                        </View>
                        :
                        <View style={styles.headerText}>
                            <Text style={styles.textHeader}> {I18n.t(this.props.txtTitle)}</Text>
                        </View>
                }
                {
                    this.props.iconBank ?
                        <View style={styles.headerIconiconBank}>
                            {this.props.iconUmoney
                                ? (
                                    <Image source={Images.ic_umoneyConf} style={{ width: 38, height: 19, }} />
                                ) : null}
                        </View>
                        :
                        <View style={styles.headerIcon}>
                            {this.props.iconUmoney
                                ? (
                                    <Image source={Images.ic_umoneyConf} style={{ width: 38, height: 19, }} />
                                ) : null}
                        </View>
                }


            </View>
        )
    }
}

export default index
const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    headerText: {
        height: 40,
        width: Platform.OS == 'android' ? '80%' : '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTexticonBank: {
        height: 40,
        width: Platform.OS == 'android' ? '60%' : '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextIcon: {
        height: 40,
        width: Platform.OS == 'android' ? '80%' : '90%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerIcon: {
        width: Platform.OS == 'android' ? '20%' : 0,
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerIconiconBank:{
        width: Platform.OS == 'android' ? '20%' : '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHeader: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: "uppercase",
        alignItems: 'center',
        justifyContent: 'center'
    },
    textHeaderIcon: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: "uppercase",
        left: 20,

    }
})
