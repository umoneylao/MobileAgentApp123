import React, { Component } from 'react'
import { StatusBar, View, StyleSheet, SafeAreaView, Text, Image } from 'react-native'
import I18n from 'react-native-i18n'
import { ListPaymentComponent, FullNewButton, HeaderTileComponent, Notification, ActivityIndicator, CardView } from '../../components'
import LottieView from 'lottie-react-native';
import { Colors, Metrics } from '../../themes';
import { connect } from 'react-redux'
import { baseUpload } from '../../utils/Api'
import { ShowPayment, updateImgName } from '../../Sqliteonline'
import Modal from 'react-native-modal';
import { formatNumber } from '../../utils/Formater'

export class ListPayment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ListPayment: [],
            searchQuery: null,
            image_name: '',
            isLoading: false,
            listformatImg: null,
            modalVisible2: false,
            dataModle: null
        }
    }
    componentDidMount() {
        ShowPayment().then((ListPayment) => {
            this.setState({ ListPayment });
        }).catch((error) => {
            this.setState({ ListPayment: [] });
        });
    }
    onChangeSearch() {

    }
    onClickGetListCustomer() {

    }
    onShowData(info) {
        // console.log('info:', info)
        this.setState({ modalVisible2: true, dataModle: info })
    }
    onPressCloesModal(){
        this.setState({ modalVisible2: false, dataModle: null })
    }
    messageRepos() {
        this.refs.messageRepos.onClose()
    }
    async onUploadData() {

        const { infoAccount } = this.props
        const { ListPayment } = this.state
        let phoneNumber = infoAccount.phoneNumber
        this.setState({ isLoading: true })
        console.log('ListPayment-upload image:', ListPayment)
        for (var i = 0; i < ListPayment.length; i++) {
            if (phoneNumber == ListPayment[i].Phone) {
                if (ListPayment[i].status == 0 && ListPayment[i].Amount > 0) {
                    try {
                        if (ListPayment[i].ImageName != null) {
                            let checkUrl = ListPayment[i].ImageName.substring(0, 4)
                            if (checkUrl != 'http') {
                                const data = new FormData();
                                data.append('username', ListPayment[i].PaymentCode);
                                data.append('userfile', {
                                    uri: ListPayment[i].ImageName,
                                    type: 'image/png',
                                    name: 'image.png'
                                });
                                await fetch(baseUpload + "api/v1/sokxay/upload/", {
                                    method: "POST",
                                    body: data,
                                    timeout: 60000
                                })
                                    .then(res => res.json())
                                    .then(res => {
                                        if (res.status == true) {
                                            this.setState({ image_name: baseUpload + res.filename + '|' + res.filename, path: res.path })
                                            const ListNameImg = {
                                                "AccountID": ListPayment[i].AccountID,
                                                "ImageName": this.state.image_name,
                                            };

                                            updateImgName(ListNameImg).then().catch((error) => {
                                                alert(`Update ListNameImg error ${error}`);
                                            });

                                        } else {
                                            this.refs.messageRepos.onOpen()
                                            this.setState({ messageRepos: I18n.t('failedDueNoResponse') })
                                        }

                                        this.setState({ isUpload: res.status })
                                        if (this.state.isUpload === true) {
                                            console.log('Uploud sccect')
                                        }
                                    }).catch((er) => {
                                        this.refs.messageRepos.onOpen()
                                        this.setState({ messageRepos: I18n.t('failedDueNoResponse') })

                                    })
                            } else {
                                this.setState({ isLoading: false, listformatImg: ListPayment })
                            }
                        } else {
                            this.refs.messageRepos.onOpen()
                            this.setState({ messageRepos: I18n.t('pleaseSelectImage') })
                            break;
                        }

                    } catch (error) {
                        console.log(error)
                    }
                }
            } else {
                this.refs.messageRepos.onOpen()
                this.setState({ messageRepos: I18n.t('checkAccountPayment') })
                break;
            }
        }
        this.setState({ isLoading: false })
        this.props.navigation.navigate('DetailsCashOut', { data: ListPayment })

    }
    render() {
        const { searchQuery, ListPayment, messageRepos, isLoading, listformatImg, dataModle } = this.state
        console.log('dataModle----:', dataModle)
        return (
            <SafeAreaView style={styles.container}>
                {isLoading ? <ActivityIndicator /> : null}

                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                {/* <View style={styles.top}>
                    <View style={styles.txtsearch}>
                        <Searchbar
                            placeholder={I18n.t('search')}
                            onChangeText={(text) => this.onChangeSearch(text)}
                            value={searchQuery}
                        />
                    </View>
                </View> */}
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
                            <View style={styles.buttomData}>
                                <FullNewButton
                                    text={I18n.t('continue')}
                                    onPress={() => this.onUploadData()}
                                />
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
                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={messageRepos}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.messageRepos()}
                    ref='messageRepos'
                />

                <Modal isVisible={this.state.modalVisible2} onBackButtonPress={() => this.setState({ modalVisible2: false, pageIndex: 0 })}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.modelMain}>
                            <View style={{ padding: 20 }}>

                                {dataModle ?
                                    <>
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('account')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{dataModle.AccountID}</Text>
                                        </View>
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('amount')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{formatNumber(dataModle.Amount + "")}</Text>
                                        </View>
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('fullName')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{dataModle.CustomerName}</Text>
                                        </View>
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('accountNumber')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{dataModle.EffectType}</Text>
                                        </View>
                                        <View style={styles.groupText}>
                                            <Text style={styles.labelInfo}>{I18n.t('labelcctID')}</Text>
                                            <Text style={styles.valueInfo} numberOfLines={2}>{dataModle.PaymentCode}</Text>
                                        </View>

                                        <View style={styles.groupText}>
                                            <CardView style={styles.cardImageContainer}>
                                                {
                                                    dataModle.ImageName == null ?
                                                        <Text>Not image</Text>
                                                        : <Image source={{ uri: dataModle.ImageName }} style={styles.cardImage} />
                                                }
                                            </CardView>
                                        </View>
                                        <FullNewButton
                                            text={I18n.t('OFF')}
                                            textStyle={styles.txtButton}
                                            onPress={() => this.onPressCloesModal()}
                                        />
                                    </>
                                    : null}


                            </View>
                        </View>
                    </View>
                </Modal>

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
    },
    modelMain: {
        backgroundColor: Colors.white,
        width: '100%',
        height: '100%',
        borderRadius: 5,
        justifyContent: 'space-between'
    },
    groupText: {
        marginBottom: 10
    },
    labelInfo: {
        fontSize: 15,
        color: Colors.iconTab
    },
    valueInfo: {
        color: Colors.black,
        marginRight: 15,
        fontSize: 14,
        marginTop: 5,
        fontWeight: '900'
    },
    cardImageContainer: {
        // flex: 1,
        marginBottom: Metrics.baseMargin,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardImage: {
        alignContent: 'center',
        padding: Metrics.baseMargin,
        width: 260,
        height: 270,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5
    },
})


