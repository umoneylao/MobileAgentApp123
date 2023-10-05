import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { Colors } from '../../themes';
import { ListPaymentComponent, HeaderTileComponent } from '../../components'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListPayment: null
        };
    }
    componentDidMount() {
        const { params } = this.props.route
        console.log('ccc:', params.data)
        if(params){
            let info = params.data
            this.setState({
                ListPayment: info
            })
        }

    }
    onClickGetListCustomer() {

    }
    onShowData() {

    }
    render() {
        const { ListPayment } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                {
                    ListPayment ?
                        <View style={{ flex: 1 }}>
                            <HeaderTileComponent txtHeader='RecipientInformation' numberCustomer={ListPayment.length} />
                            <SafeAreaView>
                                <ListPaymentComponent
                                    getdataHistoryto={ListPayment}
                                    onReloadDrewData={() => this.onClickGetListCustomer()}
                                    onShowData={(info) => this.onShowData(info)}
                                />
                            </SafeAreaView>
                        </View>
                        : <View style={styles.item}>
                            <Text>Not have data</Text>
                        </View>
                }

            </SafeAreaView>
        );
    }
}

export default index;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
