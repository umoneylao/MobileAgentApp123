import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { TextInputSearch, AlertNative } from '../index'
import I18n from 'react-native-i18n'
import { Colors, Images } from '../../themes'
import styles from './style'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native';

class LeasingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: null,
            isdataMenuBank: null,
        };
    }
    onChangSearch() {

    }
    onClickLeasing(type) {
        this.props.onPressProcess(type)
    }
    onComingsoon() {
        AlertNative('Comingsoon')
    }
    _renderItem(item, id) {
        const { isLanguage } = this.props
        return (
            <TouchableOpacity onPress={() => item.VISIBILITY == "VISIBLE" ? this.onClickLeasing(item) : this.onComingsoon()}>
                <View style={styles.itemConten}>
                    <View style={styles.images}>
                        <Image source={item.CODE == 'AEON' ? Images.ic_aecon : item.CODE == 'WELCOME' ? Images.ic_welcome : null} style={styles.iconStyle} />
                    </View>
                    <View style={styles.textView}>
                        {
                            isLanguage == 'en_LA' ?
                                <Text style={styles.itemText}>{item.EN_LA}</Text>
                                : isLanguage == 'en_US' ?
                                    <Text style={styles.itemText}>{item.EN_US}</Text>
                                    : isLanguage == 'en_VN' ?
                                        <Text style={styles.itemText}>{item.EN_VN}</Text>
                                        : isLanguage == 'en_CN' ?
                                            <Text style={styles.itemText}>{item.EN_CN}</Text>
                                            : null
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        const { search } = this.state
        return (
            <View style={{ flex: 1 }}>
                {/* <View style={styles.searchBox}>
                    <TextInputSearch
                        style={{ flex: 1, }}
                        keyboardType={'default'}
                        value={search}
                        maxLength={50}
                        returnKeyType={'done'}
                        placeholder={I18n.t('search')}
                        onChangeText={(text) => this.onChangSearch(text)}
                        placeholderTextColor={Colors.placeholderColor}
                    />
                    <View style={{
                        justifyContent: 'center',
                        left: -35,
                        top: -5

                    }}>
                        <Ionicons name="ios-search" size={30} />
                    </View>

                </View> */}
                <FlatList
                    data={this.props.isdataMenuBank}
                    renderItem={({ item, index }) => this._renderItem(item, index)}
                    extraData={this.state}
                    keyExtractor={item => item.CODE}
                />
            </View>
        );
    }
}

export default LeasingComponent;
