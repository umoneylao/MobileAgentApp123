import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar, Platform } from 'react-native'
import { Colors, Images } from '../../themes'
import I18n from 'react-native-i18n'
import Share from 'react-native-share';
import files from '../../images/logoJson/filesBase64'
import Clipboard from '@react-native-community/clipboard';
import { Toast } from '../../components'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bar: 'dark-content',
        };
    }
    myCustomShare = async () => {
        const shareOptions = {
            message: I18n.t('introLogin2') + 'http://onelink.to/umoney-ag',
            url: files.appLogo,
        }
        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log(JSON.stringify(ShareResponse));
        } catch (error) {
            console.log('Error => ', error);
        }
    };
    copylink() {
        Clipboard.setString('http://onelink.to/umoney-ag')
        Toast('pleaseInputCorrectField')
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
                <View style={styles.header}>
                    <Text style={styles.txtHeader}>{I18n.t('ShareUmoney')}</Text>
                </View>
                <View style={styles.Logo}>
                    <Image source={Images.icon_Share} style={styles.iconStyle} />
                    <Text style={styles.txtShare}>{I18n.t('ShareInvation')}</Text>
                    <Text style={styles.colorTxt}>{I18n.t('ShareLink')}</Text>
                    <View style={styles.boxLink}>
                        <View style={styles.boxColor}>
                            <View style={styles.groudTxt}>
                                <Text style={styles.txtLink}>http://onelink.to/umoney-ag</Text>
                                <TouchableOpacity onPress={() => this.copylink()}>
                                    <Image source={Images.iconCopy} style={styles.iconCoppy} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.iconShareStyles} onPress={() => this.myCustomShare()}>
                            <Image source={Images.icon2share} style={styles.iconShare} />
                            <Text style={styles.txt2Share}>{I18n.t('share')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
export default index
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white
    },
    header: {
        width: '100%',
        height: null,
        backgroundColor: Colors.txtHeader,
        padding: 7
    },
    txtHeader: {
        color: Colors.textFullnamebank
    },
    Logo: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 90,
    },
    iconStyle: {
        width: 94,
        height: 94
    },
    txtShare: {
        fontSize: 16,
        color: Colors.backColor,
        fontWeight: '700'
    },
    colorTxt: {
        color: Colors.colorTxt,
        fontSize: 14,
        fontWeight: 'normal'
    },
    boxLink: {
        top: 20
    },
    boxColor: {
        backgroundColor: Colors.bgLight,
        height: null,
        width: null,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,

    },
    txtLink: {
        // padding: 8
        left: -5
    },
    iconCoppy: {
        width: 15,
        height: 15
    },
    groudTxt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        alignItems: 'center'
    },
    iconShare: {
        width: 42,
        height: 42,
        marginBottom: 5
    },
    iconShareStyles: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt2Share: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.backColor
    }
})

