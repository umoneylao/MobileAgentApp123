import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import { Colors } from '../../../themes'
import Ionicons from 'react-native-vector-icons/Ionicons'
import I18n from 'react-native-i18n'
import { menuTranfer, menuTranferRole7 } from '../../../models/MenuApp'
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux'

class MenuTransfer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAgent: false
        };
    }
    componentDidMount() {
        const { infoAccount } = this.props;
        if (infoAccount && infoAccount.roleId && infoAccount.roleId === 7) {
            this.setState({ isAgent: false })
        } else {
            this.setState({ isAgent: true })
        }
    }
    _renderItem(item, index) {
        return (
            <Animatable.View
                animation="slideInLeft"
                delay={index * 100}
            >
                <TouchableOpacity style={{ marginBottom: 20 ,padding:5}} onPress={() => this.props.navigation.navigate(item.navigate)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 45, height: 45 }}>
                                <Image source={item.img} style={{ width: 45, height: 45 }} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ left: 5, color: Colors.textColor, fontSize: 14 }}>{I18n.t(item.name)}</Text>
                            </View>
                        </View>
                        <Ionicons name='ios-arrow-forward' color={Colors.textLine} size={25} />
                    </View>
                </TouchableOpacity>
            </Animatable.View>
        )
    }
    render() {
        const { isAgent } = this.state
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                <View style={{ padding: 10 }}>
                    <FlatList
                        data={isAgent ? menuTranfer : menuTranferRole7}
                        renderItem={({ item, index }) => this._renderItem(item, index)}
                        extraData={this.state}
                        keyExtractor={item => item.id}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuTransfer);



