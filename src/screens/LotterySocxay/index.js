import React, { Component } from 'react';
import { View, FlatList, Image, TouchableOpacity, TextInput, Text, StatusBar, SafeAreaView } from 'react-native';
import { ActivityIndicator } from '../../components'
import I18n from 'react-native-i18n'
import { Colors, Images } from '../../themes'
import styles from './style'
import { connect } from 'react-redux'

const listInternetTyep = [
    // {
    //     id: '1',
    //     name: 'BUYLOTTERY',
    //     language: 'buyLottery'
    // },
    // {
    //     id: '2',
    //     name: 'SALELOTTERY',
    //     language: 'BuyLotteryToCustomer'
    // },
    {
        id: '3',
        name: 'PAYREWARD',
        language: 'LuckyLottery'
    },
    // {
    //     id: '4',
    //     name: 'CHECKHISTORY',
    //     language: 'HistoryLottery'
    // }
]
class LotterySocxay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            search: null,
            bar: 'dark-content',
        };
    }
    onClickSelect(item) {
        this.props.navigation.navigate('LotteryInputScreen', { data: item })
    }
    _renderItem(item, id) {
        const { infoAccount } = this.props
        return (
            <TouchableOpacity onPress={() => this.onClickSelect(item)}>
                <View style={styles.itemConten}>
                    <View style={styles.images}>
                        <Image source={item.name == 'BUYLOTTERY' ? Images.ic_buyLottery
                            : item.name == 'SALELOTTERY' ? Images.ic_saleLottery
                                : item.name == 'PAYREWARD' ? Images.ic_checkLottery
                                    : item.name == 'CHECKHISTORY' ? Images.ic_checkLottery : null} style={styles.iconStyle} />
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
    onChangSearch() {

    }
    //LotteryService
    render() {
        const { search } = this.state
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                {this.props.isLoading ? <ActivityIndicator /> : null}
                <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
                <View style={{ padding: 10 }}>
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
export default connect(mapStateToProps, mapDispatchToProps)(LotterySocxay);
