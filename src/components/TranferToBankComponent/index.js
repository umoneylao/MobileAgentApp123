import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { AlertNative, TextInputSearch } from '../index'
import I18n from 'react-native-i18n'
import { Colors, Images } from '../../themes'
import styles from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

class TranferToBankComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: null,
            isdataMenuBank: null,
            img: null
        };
    }
    onChangSearch() {

    }
    onClickSelectBank(type) {
        this.props.onPressProcess(type)
    }
    onComingsoon() {
        AlertNative('Comingsoon')
    }

    _renderItem(item, id) {
        const { isLanguage } = this.props
        return (
            <Animatable.View
                animation="zoomIn" //zoomIn  slideInLeft
                delay={id * 90}
                key={id}
            >
                <TouchableOpacity onPress={() => item.VISIBILITY == "VISIBLE" ? this.onClickSelectBank(item) : this.onComingsoon()} style={{ marginBottom: 8 }}>
                    <View style={styles.itemConten}>
                        <View style={styles.images}>
                            <Image source={
                                item.PARTNER_CODE == 'BANK_BCEL' ? Images.logo_bcel
                                    : item.PARTNER_CODE === 'BANK_JDB' ? Images.logo_jdbbank
                                        : item.PARTNER_CODE === 'BANK_LDB' ? Images.logo_ldbbank
                                            : item.PARTNER_CODE === 'BANK_LVB' ? Images.logo_laovietbank
                                                : item.PARTNER_CODE === 'BANK_ACLEDA' ? Images.ic_acleda
                                                    : item.PARTNER_CODE === 'BANK_MARUHAN' ? Images.logo_maruhanbank
                                                        : item.PARTNER_CODE === 'BANK_SACOM' ? Images.ic_mt
                                                            : item.PARTNER_CODE === 'BANK_BIC' ? Images.ic_bic
                                                                : item.PARTNER_CODE === 'BANK_MAY' ? Images.ic_mayBank
                                                                    : item.PARTNER_CODE === 'BANK_APB' ? Images.ic_apb
                                                                        : null
                            } style={item.VISIBILITY == "VISIBLE" ? styles.iconStyle : styles.iconStyleOff} />
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.itemText}>{item.CODE}</Text>
                            {
                                isLanguage == 'en_LA' ? <Text style={styles.itemTextFullname}>{item.EN_LA}</Text>
                                    : isLanguage == 'en_US' ? <Text style={styles.itemTextFullname}>{item.EN_US}</Text>
                                        : isLanguage == 'en_VN' ? <Text style={styles.itemTextFullname}>{item.EN_VN}</Text>
                                            : isLanguage == 'en_CN' ? <Text style={styles.itemTextFullname}>{item.EN_CN}</Text>
                                                : null
                            }

                        </View>
                    </View>
                </TouchableOpacity>
            </Animatable.View>
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
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}

export default TranferToBankComponent;
