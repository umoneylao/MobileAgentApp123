import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, FlatList, Image } from 'react-native';
import { Images, Metrics, Colors, Fonts } from '../../themes'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import { menuScratch, menuScratchRole7, menuScratchRole33 } from '../../models/MenuApp'
import I18n from 'react-native-i18n'
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux'
class ScratchMenuApp extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            vulueScratch: null,
            data: menuScratch,
            isAgent: '1'
        };
    }
    onChangeScratch(text) {
        var newData = menuScratch.filter((item) => {
            var itemName = item.name.toUpperCase()
            var textItem = text.toUpperCase()
            if (itemName.indexOf(textItem) > -1) {
                return itemName.indexOf(textItem) > -1
            }
        })
        this.setState({
            data: newData
        })
    }
    onBackHome() {
        this.props.navigation.goBack(null);
    }
    _renderItem(item, index) {
        return (

            <TouchableOpacity style={styles.boxMenu} onPress={() => this.props.navigation.navigate(item.navigate)}>
                <View>
                    <View style={styles.iconBox}>
                        <Image source={item.img} style={{ width: 50, height: 50 }} />
                        <Text style={styles.txtIcon} numberOfLines={3} >{I18n.t(item.name)}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
    componentDidMount() {
        const { infoAccount } = this.props;
        if (infoAccount && infoAccount.roleId && infoAccount.roleId === 7) {
            this.setState({ isAgent: '7' })
        }
        else if (infoAccount && infoAccount.roleId && infoAccount.roleId === 33) {
            this.setState({ isAgent: '33' })
        }
        else {
            this.setState({ isAgent: '1' })
        }
        if (infoAccount && infoAccount.roleId && infoAccount.roleId === 1) {
            this.setState({ checkRole: true })
        }
    }
    render() {
        const { vulueScratch, isAgent } = this.state
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                <View style={styles.textBox}>
                    <TouchableOpacity style={styles.iconBack} onPress={() => this.onBackHome()} >
                        <Ionicons name='md-arrow-back-sharp' size={25} color={Colors.black} style={{ left: 5 }} />
                    </TouchableOpacity>
                    <View style={{ height: 40, width: '87%' }}>
                        <TextInput
                            placeholder={I18n.t('Search')}
                            placeholderTextColor={Colors.backColor}
                            value={vulueScratch}
                            onChangeText={(text) => this.onChangeScratch(text)}
                            style={styles.textInputStyle}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <Text style={styles.textHeader}>{I18n.t('menuAll')}</Text>
                    </View>
                    <FlatList
                        data={isAgent === '1' ? menuScratch : isAgent === '7' ? menuScratchRole7 : isAgent === '33' ? menuScratchRole33 : null}
                        renderItem={({ item, index }) => this._renderItem(item, index)}
                        extraData={this.state}
                        numColumns={3}
                        keyExtractor={(item, index) => item.id}
                    />
                </View>
            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(ScratchMenuApp);

