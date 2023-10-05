import React, { Component } from 'react'
import { Text, View, Modal, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import { ScanQRComponent, ListCustomerWorldBank, HeaderTileComponent } from '../../components'
import { Colors } from '../../themes'
import { FAB } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {filterAccount, account} from '../../Sqliteonline'
export class PaySubsidiesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            setModeResule: true,
            todoLists: []
        }
    }
    componentDidMount = () => {
        account().then((todoLists) => {
            this.setState({ todoLists });
        }).catch((error) => {
            this.setState({ todoLists: [] });
        });
    }
    onSearch(text) {

        if (text) {
            filterAccount(text).then(filteredTodoLists => {
                this.setState({ todoLists: filteredTodoLists, setModeResule: false });
            }).catch(error => {
                this.setState({ todoLists: [] });
            });
        }

    }
    onShowData(info) {
        this.props.navigation.navigate('Userinfo', { data: info })
    }
    onClickGetListCustomer() {

    }
    onSave() {
        this.setState({ setModeResule: true });
    }
    render() {
        const { isLoading, todoLists } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                <HeaderTileComponent txtHeader='RecipientInformation' numberCustomer={todoLists.length} />
                {todoLists.length > 0 ? (
                    <View style={styles.header}>
                        <SafeAreaView>
                            <ListCustomerWorldBank
                                getdataHistoryto={todoLists}
                                onReloadDrewData={() => this.onClickGetListCustomer()}
                                onShowData={(info) => this.onShowData(info)}
                            />
                        </SafeAreaView>
                        <FAB
                            style={styles.fab}
                            icon="magnify"
                            onPress={() => this.onSave()}
                        />
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

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.setModeResule}
                    onRequestClose={() => {
                        this.setState({ setModeResule: false })
                    }}
                >
                    <ScanQRComponent
                        onSearch={(text) => this.onSearch(text)}
                    />
                </Modal>
            </View>

        )
    }
}

export default PaySubsidiesScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    main: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    btnSave: {
        padding: 10,
        backgroundColor: Colors.red
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.orange
    },
    header: {
        justifyContent: 'center',
        padding: 10,
        flex: 1,
    },
})




