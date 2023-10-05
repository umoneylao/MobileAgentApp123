import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StatusBar, SafeAreaView } from 'react-native';
import { menuLottery } from '../../models/MenuApp'
import styles from './style'
import I18n from 'react-native-i18n'
import { Colors } from '../../themes'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bar: 'dark-content',
        };
    }
    _renderItem(item, id) {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate(item.navigate)}>
                <View style={styles.itemConten}>
                    <View style={styles.images}>
                        <Image source={item.img} style={styles.iconStyle} />
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.itemText}>{I18n.t(item.name)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
                <View style={styles.list}>
                    <FlatList
                        data={menuLottery}
                        renderItem={({ item, index }) => this._renderItem(item, index)}
                        extraData={this.state}
                        keyExtractor={item => item.id}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default index;
