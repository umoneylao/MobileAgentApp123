import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Modal, Alert, StatusBar, FlatList } from 'react-native'
import { Colors } from '../../themes';
import { connect } from 'react-redux'
import { reqWorldBankList, reqGetProvince, reqGetDistrict } from '../../actions/WorldBank'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ActivityIndicator, FullTextInput, HeaderTileComponent, ListCustomerWorldBank, Notification } from '../../components'
import I18n from 'react-native-i18n'
import { insertAccount , DeleteAccount, account, updateAccount, filterAccount, DeletePayment} from '../../Sqliteonline'

export class RecipientInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            bar: 'dark-content',
            Amount: null,
            province: 'Province',
            district: 'District',
            onLoadListCustomer: false,
            dataCustomer: [],
            setModle: false,
            setModalVisibleRelation: false,
            setModalDistic: false,
            todoLists: []
        };
    }
    onClickGetListCustomer() {
        const { district, province } = this.state
        let p_province = province
        let p_district = district
        this.props.reqWorldBankList(p_province, p_district)
        this.setState({ isLoading: true, onLoadListCustomer: true })
    }
    componentDidMount = () => {
        this.loadingData()
    }
    loadingData = () => {
        account().then((todoLists) => {
            this.setState({ todoLists });
        }).catch((error) => {
            this.setState({ todoLists: [] });
        });
    }
    componentWillReceiveProps(nextProps) {
        const { isLoading, onLoadListCustomer, onCheckGetProvince, onCheckDistrict } = this.state
        if (isLoading && onLoadListCustomer) {
            console.log('nextProps.actionType', nextProps.actionType)
            switch (nextProps.actionType) {
                case 'WORK_BANK_OFFLINE_SERVICE_SUCCESS':
                    let dataCustomer = nextProps.dataListCustomerWorldBank.item
                    console.log('nextProps.dataListCustomerWorldBank:', nextProps.dataListCustomerWorldBank)
                    this.setState({ isLoading: false, onLoadListCustomer: false, dataCustomer })
                    break;
                case 'WORK_BANK_OFFLINE_SERVICE_FAILED':
                    this.refs.messageRepos.onOpen()
                    this.setState({ isLoading: false, onLoadListCustomer: false, messageRepos: I18n.t('noDataFound') })
                    break;

                default:
                    break;
            }

        }
        if (isLoading && onCheckGetProvince) {
            switch (nextProps.actionType) {
                case 'GET_PROVINCE_SUCCESS':
                    let dataProvince = nextProps.dataProvince.dataView
                    this.setState({ isLoading: false, onCheckGetProvince: false, dataProvince, setModalVisibleRelation: true })
                    break;
                case 'GET_PROVINCE_FAILED':
                    this.refs.messageRepos.onOpen()
                    this.setState({ isLoading: false, onCheckGetProvince: false, messageRepos: I18n.t('noDataFound') })
                    break;
                default:
                    break;
            }
        }
        if (isLoading && onCheckDistrict) {
            switch (nextProps.actionType) {
                case "GET_DISTRICT_SUCCESS":
                    let dataDistrict = nextProps.dataDistrict.districtView
                    this.setState({ isLoading: false, onCheckDistrict: false, dataDistrict, setModalDistic: true })
                    break;
                case "GET_DISTRICT_FAILED":
                    this.refs.messageRepos.onOpen()
                    this.setState({ isLoading: false, onCheckDistrict: false, messageRepos: I18n.t('noDataFound') })
                    break;
                default:
                    break;
            }
        }
    }
    onClearProvince() {
        this.props.reqGetProvince()
        this.setState({ isLoading: true, onCheckGetProvince: true });
    }
    onClearDistrict() {
        this.setState({ setModalDistic: true })
    }

    onDowloadInfo = () => {
        this.setState({ isLoading: true })
        const { dataCustomer, todoLists } = this.state
        if (dataCustomer.length > 0) {
            if (todoLists.length > 0) {
                for (let index = 0; index < dataCustomer.length; index++) {
                    filterAccount(dataCustomer[index].cct_id).then(results => {
                        if (results.length > 0) {
                            if (dataCustomer[index].balance > 0) {
                                const todoList = {
                                    "account_id": dataCustomer[index].account_id,
                                    "balance": dataCustomer[index].balance
                                };
                                updateAccount(todoList).then().catch((error) => {
                                    alert(`Update balance error ${error}`);
                                });
                            }
                        } else {
                            if (dataCustomer[index].balance > 0) {
                                insertAccount(dataCustomer[index]).then().catch((error) => {
                                    alert(`Insert new todoList error ${error}`);
                                });
                            }
                        }
                    }).catch(error => {
                        this.setState({ todoLists: [] });
                    });
                }
                this.loadingData()
                this.setState({ setModle: true, messge: 'uploadSuccess', isLoading: false })
            } else {
                for (var i = 0; i < dataCustomer.length; i++) {
                    if (dataCustomer[i].balance > 0) {
                        insertAccount(dataCustomer[i]).then(() => {

                        }).catch((error) => {
                            alert(`Insert new todoList error ${error}`);
                        });
                    }
                }
                this.loadingData()
                this.setState({ setModle: true, messge: 'uploadSuccess', isLoading: false })
            }
        } else {
            Alert.alert(
                'Delete all',
                'Are you sure you want to delete all customer ?',
                [
                    {
                        text: 'No', onPress: () => { },
                        style: 'cancel'
                    },
                    {
                        text: 'Yes', onPress: () => this.onDelete()
                    },
                ],
                { cancelable: true }
            );
        }
    }
    onDelete() {
        DeleteAccount().then(results => {
            if (results.length > 0) {
                alert('Successful deletion of information')
            } else {
                alert('Delete error information successfully')
            }
        }).catch(error => {
            alert(`Delete all TodoLists failed. Error = ${error}`);
        });

        DeletePayment().then(results => {
            if (results.length > 0) {
                alert('Successful deletion of information')
            } else {
                alert('Delete error information successfully')
            }
        }).catch(error => {
            alert(`Delete all TodoLists failed. Error = ${error}`);
        });


    }
    onClose() {
        this.setState({ setModle: false, setModalDistic: false, setModalVisibleRelation: false })
    }
    onShowData() {

    }
    onSelectProvince(item) {
        this.props.reqGetDistrict(item)
        this.setState({ province: item, setModalVisibleRelation: false, isLoading: true, onCheckDistrict: true })
    }

    renderItemProvince(item, index) {
        return (
            <View>
                <TouchableOpacity style={styles.warpItemList} onPress={() => this.onSelectProvince(item.province)}>
                    <Text style={styles.txtIcon} numberOfLines={1} >{item.province}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderItemDistrict(item) {
        return (
            <View>
                <TouchableOpacity style={styles.warpItemList} onPress={() => this.setState({ district: item.district, setModalDistic: false })}>
                    <Text style={styles.txtIcon} numberOfLines={1} >{item.district}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    messageRepos() {
        this.refs.messageRepos.onClose()
    }
    render() {
        const { district, province, messageRepos, errorDistrict, errorProvince, isLoading, dataCustomer, messge, dataProvince, dataDistrict } = this.state
       console.log('dataCustomer:', dataCustomer)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                {isLoading ? <ActivityIndicator /> : null}
                <HeaderTileComponent txtHeader='Search' />
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.groupInput}>
                            <TouchableOpacity style={styles.txtLeft} onPress={() => this.onClearProvince()}>
                                <FullTextInput
                                    label={I18n.t('province')}
                                    placeholder={I18n.t('InputProvince')}
                                    returnKeyType='done'
                                    keyboardType='default'
                                    value={province}
                                    error={errorProvince}
                                    maxLength={20}
                                    onChangeUserName={(text) => this.onChangeProvince(text)}
                                    iconLeft='facebook'
                                    iconRight='chevron-down'
                                    editable={false}
                                    textError={I18n.t('pleaseInputCorrectField')}
                                    onclick={() => this.onClearProvince()}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.groupInput}>
                            <TouchableOpacity style={styles.txtLeft} onPress={() => this.onClearDistrict()}>
                                <FullTextInput
                                    label={I18n.t('district')}
                                    placeholder={I18n.t('InputDistrict')}
                                    returnKeyType='done'
                                    keyboardType='default'
                                    value={district}
                                    error={errorDistrict}
                                    maxLength={20}
                                    onChangeUserName={(text) => this.onChangeDistrict(text)}
                                    iconLeft='facebook'
                                    iconRight='chevron-down'
                                    editable={false}
                                    textError={I18n.t('pleaseInputCorrectField')}
                                    onclick={() => this.onClearDistrict()}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ padding: 5, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <View style={{ width: '49%' }}>
                            <TouchableOpacity style={styles.btnSeachData} onPress={() => this.onClickGetListCustomer()}>
                                <Text style={styles.txtSeach}>{I18n.t('findYourContact')}</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            dataCustomer.length > 0 ? <View style={{ width: '49%' }}>
                                <TouchableOpacity style={styles.btnSeachData} onPress={() => this.onDowloadInfo()}>
                                    <Text style={styles.txtSeach}>{I18n.t('saveInfo')}</Text>
                                </TouchableOpacity>
                            </View>
                                : null
                        }

                    </View>
                </View>
                <HeaderTileComponent txtHeader='RecipientInformation' numberCustomer={dataCustomer.length} />
                <View style={styles.header}>
                    <SafeAreaView>
                        <ListCustomerWorldBank
                            getdataHistoryto={dataCustomer}
                            onReloadDrewData={() => this.onClickGetListCustomer()}
                            onShowData={() => this.onShowData()}
                        />
                    </SafeAreaView>
                </View>

                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={messageRepos}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.messageRepos()}
                    ref='messageRepos'
                />


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.setModle}
                    onRequestClose={() => {
                        this.setState({ setModle: false })
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{
                            width: '80%', height: null,
                            backgroundColor: Colors.white,
                            borderRadius: 10, justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.32,
                            shadowRadius: 5.46,

                            elevation: 9,
                        }}>
                            <Ionicons name='checkmark-circle-outline' size={90} color='#33cc33' />
                            <View style={{ alignItems: 'center', padding: 10, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center' }}>{I18n.t(messge)}</Text>
                            </View>
                            <Text></Text>
                            <TouchableOpacity style={styles.buttom} onPress={() => this.onClose()}>
                                <Text style={{ fontSize: 15, fontWeight: '600', color: Colors.txtUpLight }}>{I18n.t('success')}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.setModalVisibleRelation}
                    onRequestClose={() => {
                        this.setState({ setModalVisibleRelation: false })
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.windowTint }}>
                        <View style={{ width: '90%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.modelMain}>
                                <View style={{ padding: 20 }}>
                                    <FlatList
                                        data={dataProvince}
                                        renderItem={({ item, index }) => this.renderItemProvince(item, index)}
                                        keyExtractor={(item, index) => item.province}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.btnFooter} onPress={() => this.onClose()}>
                                <Text style={styles.label}>{I18n.t('cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.setModalDistic}
                    onRequestClose={() => {
                        this.setState({ setModalDistic: false })
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.windowTint }}>
                        <View style={{ width: '90%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.modelMain}>
                                <View style={{ padding: 20 }}>
                                    <FlatList
                                        data={dataDistrict}
                                        renderItem={({ item, index }) => this.renderItemDistrict(item, index)}
                                        keyExtractor={(item, index) => item.district}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.btnFooter} onPress={() => this.onClose()}>
                                <Text style={styles.label}>{I18n.t('cancel')}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        WorldBank: state.WorldBank,
        actionType: state.WorldBank.actionType,
        dataListCustomerWorldBank: state.WorldBank.dataListCustomerWorldBank,
        dataProvince: state.WorldBank.dataProvince,
        dataDistrict: state.WorldBank.dataDistrict,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        reqWorldBankList: (p_province, p_district) => { dispatch(reqWorldBankList(p_province, p_district)) },
        reqGetProvince: () => { dispatch(reqGetProvince()) },
        reqGetDistrict: (item) => { dispatch(reqGetDistrict(item)) }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RecipientInformation);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    header: {
        justifyContent: 'center',
        padding: 10
    },
    btnSeachData: {
        padding: 15,
        backgroundColor: '#e6ffff',
        alignItems: 'center',
        borderRadius: 5
    },
    txtSeach: {
        fontSize: 16,
        fontWeight: '600',
        color: '#00cccc'
    },
    groupInput: {
        marginBottom: 10,
        width: '50%',
        padding: 5
    },
    buttom: {
        padding: 10,
        backgroundColor: '#ccebff',
        borderRadius: 10,
        marginBottom: 20
    },
    modelMain: {
        backgroundColor: Colors.white,
        width: '80%',
        height: null,
        justifyContent: 'space-between',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    btnFooter: {
        backgroundColor: Colors.orange,
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10
    },
    label: {
        color: Colors.white,
        fontWeight: 'bold'
    },
    warpItemList: {
        padding: 10,

    },
})
