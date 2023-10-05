import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, SafeAreaView, StatusBar, FlatList, Alert } from 'react-native'
import { logoutNointernet } from '../../actions/Auth'
import { connect } from 'react-redux'
import { Colors, Images } from '../../themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderTileComponent } from '../../components'
import I18n from 'react-native-i18n'
const { width, height } = Dimensions.get('window')
const imageWidh = width - 0;
const imageHeigh = (imageWidh / 1125) * 290;

const Menu = [
    { id: 1, name: 'PaySubsidies', navigation: 'PaySubsidiesScreen', icon: 'ios-barcode-outline' },
    // { id: 2, name: 'RecipientInformation', navigation: 'RecipientInformation', icon: 'people-outline' },
    { id: 3, name: 'ListCashOutSuccessful', navigation: 'ListCashOutSuccess', icon: 'newspaper-outline' },
  

]
//   090309806102008706

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoNointernet: null,
            phoneNumber: null,
            userName: null,
            pan: null,
            agentCode: null,
            roleId: null
        };
        setTimeout(async () => {
            try {
                let dataInfo = await AsyncStorage.getItem('userInfo');
                let phoneNumber = await AsyncStorage.getItem('phoneNumber')
                let userName = await AsyncStorage.getItem('userName')
                let pan = await AsyncStorage.getItem('pan')
                let agentCode = await AsyncStorage.getItem('agentCode')
                let roleId = await AsyncStorage.getItem('roleId')
                this.setState({
                    infoNointernet: dataInfo, phoneNumber: phoneNumber, userName: userName,
                    pan: pan, agentCode: agentCode, roleId: roleId
                })
            } catch (e) {
                console.log(e);
            }
        }, 100);
    }
    // componentDidMount(){
    //     const { phoneNumber, userName, agentCode } = this.state
    //     console.log('phoneNumber',phoneNumber)
    //     console.log('userName',userName)
    //     console.log('agentCode',agentCode)
    // }
    onLoguotWorldBank() {
        this.props.logoutNointernet()
    }
    renderItemMenu = (item) => {
        return (
            <TouchableOpacity style={styles.boxMenu} onPress={() => this.props.navigation.navigate(item.navigation)}>
                <View>
                    <View style={styles.iconBox}>
                        <Ionicons name={item.icon} size={50} color={Colors.orange} />
                        <Text style={styles.txtIcon} numberOfLines={2} >{I18n.t(item.name)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        const { phoneNumber, userName, agentCode } = this.state
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor={Colors.blueLight} />

                <SafeAreaView>
                    <LinearGradient
                        colors={[Colors.blueLight, Colors.blueLight, Colors.orange]}
                        style={styles.header}>
                        <ImageBackground source={Images.bg_headerAccout1} style={{ width: imageWidh, height: imageHeigh, marginTop: 0 }}>
                            <View style={styles.title}>
                                <View>
                                    <Text style={{ fontWeight: '700', fontSize: 20, color: Colors.white }}>{userName}</Text>
                                    <Text style={{ fontWeight: '600', fontSize: 15, color: Colors.white }}>{phoneNumber}</Text>
                                </View>
                                <TouchableOpacity style={{ padding: 10, zIndex: 99999, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.onLoguotWorldBank()}>
                                    <Ionicons name='power' size={25} color={Colors.white} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </LinearGradient>
                    <HeaderTileComponent txtHeader='PaySubsidies' />
                    <View style={styles.menu}>
                        <FlatList
                            data={Menu}
                            renderItem={({ item, index }) => this.renderItemMenu(item, index)}
                            showsHorizontalScrollIndicator={false}
                            numColumns={3}
                            extraData={Object.assign(this.props)}
                            keyExtractor={(item, index) => item.id}
                        />
                    </View>
                </SafeAreaView>


            </View>

        )
    }
}
const mapStateToProps = state => ({
    isLoggedInNointernet: state.auth.isLoggedInNointernet,
})

const mapDispatchToProps = (dispatch) => {
    return {
        logoutNointernet: () => dispatch(logoutNointernet()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    header: {
        width: '100%',
        height: null,
        backgroundColor: Colors.orange,
        justifyContent: 'center'
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    menu: {
        padding: 10
    },
    boxMenu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10

    },
    iconBox: {
        width: 110,
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    txtIcon: {
        top: 4,
        textAlign: 'center',
        color: Colors.textColor,
        fontSize: 16,
        fontWeight: '500'
    },
})






