import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { ActivityIndicator, UploadImgeComponents, Notification } from '../../components'
import ImagePicker from 'react-native-image-crop-picker';
import * as ConfigCode from '../../utils/ConfigCode'
import I18n from 'react-native-i18n'
import Modal from 'react-native-modal';
import { Colors } from '../../themes'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'
import { formatNumber } from '../../utils/Formater'
import {insertPayment , updateAccount} from '../../Sqliteonline'
export class uploadimge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            image: null,
            url_image: null,
            path: '',
            image_name: '',
            modalVisible: false,
            messageRepos: null,
            phoneNumber: null,
            codeAgent: '',
            dataGet: null
        }
        setTimeout(async () => {
            try {
                let dataInfo = await AsyncStorage.getItem('userInfo');
                let phoneNumber = await AsyncStorage.getItem('phoneNumber')
                let userName = await AsyncStorage.getItem('userName')
                let pan = await AsyncStorage.getItem('pan')
                let agentCode = await AsyncStorage.getItem('agentCode')
                let roleId = await AsyncStorage.getItem('roleId')
                this.setState({
                    infoNointernet: dataInfo, phoneNumber: phoneNumber, userName: userName,
                    pan: pan, agentCode: agentCode, roleId: roleId
                })
            } catch (e) {
                console.log(e);
            }
        }, 100);
    }
    componentWillMount() {
        if (this.props.route.params != undefined) {
            let getdata = this.props.route.params.data;
            let cttID = getdata.cct_id
            let accountID = getdata.account_id
            let balance = getdata.balance
            let nameCustomer = getdata.last_name
            let getGender = getdata.gender
            this.setState({ cttID, getdata, accountID, balance, nameCustomer, getGender })
        }
    }
    onPressCamera() {
        ImagePicker.openCamera({
            cropping: true,
            width: 300,
            height: 400,
            saveToPhotos :true
        }).then(image => {
            this.setState({
                image: { uri: image.path, width: image.width, height: image.height },
                url_image: image.path,
                modalVisible: false
            }, () => {
                setTimeout(() => {
                    this.state.image != null ? this.setState({ isLoading: false, modalVisible: false }) : null
                }, 100)
            })
        }).catch(e => {
            console.log('e => ', e)
            if (e.message = 'User cancelled image selection')
                this.setState({ image: null, url_image: null, modalVisible: false })
        });

    }

    onPressGallery(cropping) {
        ImagePicker.openPicker({
            cropping: cropping,
            width: 300,
            height: 400,
            includeExit: true
        }).then(image => {
            this.setState({

                image: { uri: image.path, width: image.width, height: image.height },
                url_image: image.path,
                modalVisible: false

            }, () => {
                setTimeout(() => {
                    this.state.image != null ? this.setState({ isLoading: false, modalVisible: false }) : null
                }, 100)
            })
        }).catch(e => {
            if (e.message = 'User cancelled image selection')
                this.setState({ image: null, url_image: null, modalVisible: false })
        }
        );
    }

    onPressTakePhoto() {
        this.setState({ modalVisible: true })
    }
    chooseAnotherPhoto() {
        this.setState({ modalVisible: true })
    }
    async onPressProcess(Toname, FromName, txtGender, txtName, transactionNote) {
        const { cttID, accountID, balance, phoneNumber, agentCode, getGender, nameCustomer } = this.state
        let Name = txtName != null ? txtName : nameCustomer
        let Gender = txtGender != null ? txtGender : ''
        let DetailToName = Toname != null ? Toname : "1"
        let DetailFromName = FromName != null ? FromName : "1"
        let note = transactionNote ? transactionNote : 'Cash out word bank'
        let date = moment(new Date()).format("YYYY-MM-DD h:mm:ss")
        try {
            if (this.state.url_image === null || this.state.url_image === '' || !this.state.url_image) {
                this.refs.messageRepos.onOpen()
                this.setState({ messageRepos: I18n.t('pleaseSelectImage') })
                return
            }
            if (balance != null || cttID != null || accountID != null || getGender != null || getGender != null || getGender != null || Name != null || DetailToName != null || DetailFromName != null) {

                let infoCustomer = {
                    "ProcessCode": ConfigCode.CASH_OUT_WORD_BANK,
                    "Amount": balance,
                    "ActionNode": "1",
                    "PaymentCode": cttID,
                    "AccountID": accountID,
                    "TransactionDescription": note,
                    "Phone": phoneNumber,
                    "ImageName": this.state.url_image ? this.state.url_image : 'file img null',
                    "EffectType": agentCode,
                    "CustomerGender": getGender,
                    "CustomerName": Name,
                    "ToName": DetailToName,
                    "FromName": DetailFromName,
                    "payDate": date,
                    "Language": "lo",
                    "status": "0"
                }
                console.log('infoCustomer:',infoCustomer)
                insertPayment(infoCustomer).then((results) => {
                    if (results.length > 0) {
                        this.setState({ dataGet: results })
                        const todoList = {
                            "account_id": infoCustomer.AccountID,
                            "balance": "0",
                        };
                        updateAccount(todoList).then((resul) => {
                            if (resul.length > 0) {
                                this.props.navigation.navigate('Congratulations', { data: this.state.dataGet })
                            } else {
                                alert('Error update balance')
                            }
                        }).catch((error) => {
                            alert(`Update todoList error ${error}`);
                        });

                    } else {
                        alert('error')
                    }
                }).catch((error) => {
                    alert(`Insert new todoList error ${error}`);
                });
            } else {
                alert('Data is null Please Check')
                return
            }

        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { cttID, isLoading, image, balance, messageRepos,url_image } = this.state
       
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                {isLoading ? <ActivityIndicator /> : null}
                <UploadImgeComponents
                    minAmount={1000}
                    maxAmount={10000000}
                    valueCTTID={cttID}
                    balance={balance != null ? formatNumber(balance.toString()) : 0}
                    image={url_image}
                    chooseAnotherPhoto={() => this.chooseAnotherPhoto(false)}
                    onPressTakePhoto={() => this.onPressTakePhoto(false)}
                    onPressProcess={(Toname, FromName, txtGender, txtName, transactionNote) => this.onPressProcess(Toname, FromName, txtGender, txtName, transactionNote)}
                />
                <Modal isVisible={this.state.modalVisible} onBackButtonPress={() => this.setState({ modalVisible: false, pageIndex: 0 })}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.modelMain}>
                            <View style={{ padding: 20 }}>
                                <TouchableOpacity onPress={() => this.onPressCamera(false)} style={styles.iconCammera}>
                                    <Ionicons size={25} name='camera-outline' color={Colors.backColor} />
                                    <Text>{I18n.t('camera')}</Text>
                                </TouchableOpacity>
                                <Text></Text>
                                <TouchableOpacity onPress={() => this.onPressGallery(false)} style={styles.iconCammera}>
                                    <Ionicons size={25} name='image-outline' color={Colors.backColor} />
                                    <Text>{I18n.t('photoLibrary')}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this.onCencel()} style={styles.btnFooter}>
                                <Text style={styles.txtCancel}>{I18n.t('cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={messageRepos}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.messageRepos()}
                    ref='messageRepos'
                />
            </SafeAreaView>
        )
    }
}

export default uploadimge
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    modalContent: {
        paddingBottom: Platform.OS === 'IOS' ? height / 2 - 80 : 0,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(254, 235, 205, 0.6)'
    },
    warpDetail: {
        width: '95%',
        paddingTop: 10
    },
    modelMain: {
        backgroundColor: Colors.white,
        width: '80%',
        height: null,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    txtCancel: {
        color: Colors.white,
        textTransform: "uppercase",
        fontWeight: 'bold'
    },
    btnFooter: {
        backgroundColor: Colors.orange,
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10
    },
    iconCammera: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})

