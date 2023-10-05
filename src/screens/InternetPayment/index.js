import React, { Component } from 'react';
import { View, FlatList, Image, TouchableOpacity, Text, StatusBar, SafeAreaView } from 'react-native';
import { ActivityIndicator } from '../../components'
import I18n from 'react-native-i18n'
import { Colors, Images } from '../../themes'
import styles from './style'
import { connect } from 'react-redux'

const listInternetTyep = [
    {
        id: '1',
        name: 'ADSL',
        language: 'ADSLPayment'
    },
    {
        id: '2',
        name: 'FTTH',
        language: 'FTTHPayment'
    },
    {
        id: '3',
        name: 'LEASED_LINE',
        language: 'LEASED_LINE'
    }
]
class InternetPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            search: null,
            bar: 'dark-content',
        };
    }
    onClickSelect(item) {
        this.props.navigation.navigate('InternemtPaymentInput', { data: item })
    }
    _renderItem(item, id) {
        const { infoAccount } = this.props
        return (
            <TouchableOpacity onPress={() => this.onClickSelect(item)}>
                <View style={styles.itemConten}>
                    <View style={styles.images}>
                        <Image source={item.name == 'ADSL' ? Images.ic_ADSL
                            : item.name == 'FTTH' ? Images.ic_FTTH
                                : item.name == 'LEASED_LINE' ? Images.ic_LeasedLine
                                    : null} style={styles.iconStyle} />
                    </View>
                    <View style={styles.textView}>
                        {
                            infoAccount.language == 'en_LA' ?
                                <Text style={styles.itemText}>{I18n.t(item.language)}</Text>
                                : infoAccount.language == 'en_US' ?
                                    <Text style={styles.itemText}>{I18n.t(item.language)}</Text>
                                    : infoAccount.language == 'en_VN' ?
                                        <Text style={styles.itemText}>{I18n.t(item.language)}</Text>
                                        : infoAccount.language == 'en_CN' ?
                                            <Text style={styles.itemText}>{I18n.t(item.language)}</Text>
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
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                {this.props.isLoading ? <ActivityIndicator /> : null}
                <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
                <View style={{ padding: 10, }}>
                    <FlatList
                        data={listInternetTyep}
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
export default connect(mapStateToProps, mapDispatchToProps)(InternetPayment);