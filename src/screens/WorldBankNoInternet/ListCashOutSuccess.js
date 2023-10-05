import React, { Component } from 'react'
import { StatusBar, View, StyleSheet, SafeAreaView } from 'react-native'
import { Searchbar } from 'react-native-paper';
import I18n from 'react-native-i18n'
import {  HeaderTileComponent, ActivityIndicator, ListCustomerWorldBank } from '../../components'
import LottieView from 'lottie-react-native';
import { Colors } from '../../themes';
import { connect } from 'react-redux'
import {  AccountPay } from '../../Sqliteonline'
export class ListPayment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ListPayment: [],
            searchQuery: null,
            image_name: '',
            isLoading: false,
            listformatImg: null
        }
    }
    componentDidMount() {
        AccountPay().then((ListPayment) => {
            this.setState({ ListPayment });
        }).catch((error) => {
            this.setState({ ListPayment: [] });
        });
    }
    onChangeSearch() {

    }
    onClickGetListCustomer() {

    }
    onShowData() {

    }


    render() {
        const { searchQuery, ListPayment, isLoading } = this.state
        return (
            <SafeAreaView style={styles.container}>
                {isLoading ? <ActivityIndicator /> : null}

                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                <View style={styles.top}>
                    <View style={styles.txtsearch}>
                        <Searchbar
                            placeholder={I18n.t('search')}
                            onChangeText={(text) => this.onChangeSearch(text)}
                            value={searchQuery}
                        />
                    </View>
                </View>
                <View style={styles.mani}>
                    {ListPayment.length > 0 ? (
                        <View style={styles.header}>
                            <HeaderTileComponent txtHeader='RecipientInformation' numberCustomer={ListPayment.length} />
                            <View style={styles.topData}>
                                <SafeAreaView>
                                    <ListCustomerWorldBank
                                        getdataHistoryto={ListPayment}
                                        onReloadDrewData={() => this.onClickGetListCustomer()}
                                        onShowData={(info) => this.onShowData(info)}
                                    />
                                </SafeAreaView>
                            </View>

                        </View>
                    ) :
                        (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <LottieView
                                        source={require('../../../assets/nodataError.json')}
                                        autoPlay
                                        loop
                                        style={[{ width: 300, height: 300, }]}
                                    />
                                </View>

                            </View>
                        )}
                </View>


            </SafeAreaView>
        )
    }
}
const mapStateToProps = state => ({
    infoAccount: state.auth.infoAccount,
})

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListPayment)
// export default ListPayment
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    top: {
        flex: 0.2,
    },
    mani: {
        flex: 2,
    },
    txtsearch: {
        padding: 10
    },
    header: {
        flex: 1,
        justifyContent: 'space-between'
    },
    topData: {
        flex: 2
    },
    buttomData: {
        flex: 0.2,
        justifyContent: 'center',
        padding: 10
    }
})


