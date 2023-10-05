import React, { Component } from 'react'
import { StatusBar, View, StyleSheet, SafeAreaView } from 'react-native'
import { Searchbar } from 'react-native-paper';
import I18n from 'react-native-i18n'
import { ListPaymentComponent, HeaderTileComponent, ActivityIndicator } from '../../components'
import LottieView from 'lottie-react-native';
import { Colors } from '../../themes';
import { connect } from 'react-redux'
import { PaymentSuccess } from '../../Sqliteonline'
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
    renderData() {
        PaymentSuccess().then((ListPayment) => {
            this.setState({ ListPayment });
        }).catch((error) => {
            this.setState({ ListPayment: [] });
        });
    }
    componentDidMount() {
        this.renderData()
    }
    onChangeSearch(text) {
        const { ListPayment } = this.state
        var newData = ListPayment.filter((item) => {
            var itemName = item.PaymentCode.toUpperCase()
            var textItem = text.toUpperCase()
            if (itemName.indexOf(textItem) > -1) {
                return itemName.indexOf(textItem) > -1
            }
        })
        text ? this.setState({ ListPayment: newData }) : this.renderData()
    }
    onClickGetListCustomer() {

    }
    onShowData() {

    }
    render() {
        const { searchQuery, ListPayment, isLoading } = this.state
        console.log('ListPayment:', ListPayment)
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
                            keyboardType='numeric'
                        />
                    </View>
                </View>
                <View style={styles.mani}>
                    {ListPayment.length > 0 ? (
                        <View style={styles.header}>
                            <HeaderTileComponent txtHeader='RecipientInformation' numberCustomer={ListPayment.length} />
                            <View style={styles.topData}>
                                <SafeAreaView>
                                    <ListPaymentComponent
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


