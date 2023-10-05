import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, StatusBar, FlatList } from 'react-native'
import { logoutNointernet } from '../../actions/Auth'
import { connect } from 'react-redux'
import { Colors } from '../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from 'react-native-i18n'
const { width, height } = Dimensions.get('window')
const imageWidh = width - 0;
const imageHeigh = (imageWidh / 1125) * 290;

const Menu = [
    { id: 1, name: 'PayOnline', navigation: 'PaySubsidies', icon: 'ios-barcode-outline' },
    { id: 2, name: 'RecipientInformation', navigation: 'RecipientInformation', icon: 'people-outline' },
    { id: 3, name: 'ItemsWaitingUploaded', navigation: 'ListPayment', icon: 'cloud-upload-outline' },
    { id: 4, name: 'PaidItemsCompleted', navigation: 'ListPaymentSuccess', icon: 'newspaper-outline' },
]


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
        
    }
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
        return (
            <View style={styles.container}>
                 <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                 <SafeAreaView>
                 <View style={styles.menu}>
                     <FlatList
                         data={Menu}
                         renderItem={({ item, index }) => this.renderItemMenu(item, index)}
                         showsHorizontalScrollIndicator={false}
                         numColumns={2}
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
        color: Colors.backColor,
        fontSize: 14,
        fontWeight: '500'
    },
})





