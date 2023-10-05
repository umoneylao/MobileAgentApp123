import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import { ActivityIndicator, UploadImgeComponents, Notification } from '../../components'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'
import { onCashOutWordBank } from '../../actions/Auth'
import * as ConfigCode from '../../utils/ConfigCode'
import I18n from 'react-native-i18n'
import { baseUpload } from '../../utils/Api'
import Modal from 'react-native-modal';
import { Colors } from '../../themes'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ImageObj, InitialImageObj } from '../../models/ImageObject';
import LogUtils from '../../utils/LogUtils';
let files = []
class uploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            image: null,
            url_image: null,
            path: '',
            image_name: '',
            modalVisible: false,
            messageRepos: null,
            filepath: {
                data: '',
                uri: ''
            },
            fileData: '',
            fileUri: ''
        };
    }
    componentWillMount() {
        if (this.props.route.params != undefined) {
            let getdata = this.props.route.params.qrInfo;
            // console.log('getdata:', getdata)
            let cttID = RequestField.getValueField(getdata, FIELD.PAYMENT_CODE).toString();
            let accountID = RequestField.getValueField(getdata, FIELD.ACCOUNT_ID).toString();
            let balance = RequestField.getValueField(getdata, FIELD.BALANCE).toString();
            let nameCustomer = RequestField.getValueField(getdata, FIELD.CUSTOMER_NAME).toString();
            let getGender = RequestField.getValueField(getdata, FIELD.CUSTOMER_GENDER).toString();
            let getNote = RequestField.getValueField(getdata, FIELD.TO_NAME).toString();
            this.setState({ cttID, getdata, accountID, balance, nameCustomer, getGender, getNote })
        }
    }

    componentWillReceiveProps(nextProps) {

        // console.log('nextProps.nextProps:', nextProps)
        // console.log('nextProps.actionType:', nextProps.actionType)
        // console.log('nextProps.cashOutWordBankinfo:', nextProps.cashOutWordBankinfo)
        // const { infoAccount } = this.props
        // const { isRequestCashOutWordBank, isLoading, nameCustomer } = this.state
        // if (isRequestCashOutWordBank && isLoading) {
        //     switch (nextProps.actionType) {
        //         case 'CASH_OUT_WORD_BANK_SUCCESS':
        //             let response = RequestField.getValueField(nextProps.cashOutWordBankinfo.fieldMap, FIELD.RESPONSE_CODE);
        //             let description = RequestField.getValueField(nextProps.cashOutWordBankinfo.fieldMap, FIELD.RESPONSE_DESCRIPTION);
        //             switch (response) {
        //                 case '00000':
        //                     this.props.navigation.navigate('TransactionResult', {
        //                         data: nextProps.cashOutWordBankinfo.fieldMap,
        //                         processName: I18n.t('cashOut'),
        //                         nameCustormer: nameCustomer,
        //                         nameAgent: infoAccount.customerName,
        //                         processCode: 'WordBank'
        //                     })
        //                     this.setState({ isLoading: false, isRequestCashOutWordBank: false })
        //                     break;
        //                 case 11101:
        //                     this.refs.messageRepos.onOpen()
        //                     this.setState({ isLoading: false, isRequestCashOutWordBank: false, messageRepos: I18n.t('11101') })
        //                     break;
        //                 case 10151:
        //                     this.refs.messageRepos.onOpen()
        //                     this.setState({ isLoading: false, isRequestCashOutWordBank: false, messageRepos: I18n.t('10151') })
        //                     break;
        //                 case 10811:
        //                     this.refs.messageRepos.onOpen()
        //                     this.setState({ isLoading: false, isRequestCashOutWordBank: false, messageRepos: I18n.t('10811') })
        //                     break;
        //                 case 99999:
        //                     this.refs.messageRepos.onOpen()
        //                     this.setState({ isLoading: false, isRequestCashOutWordBank: false, messageRepos: I18n.t('99999') })
        //                     break;
        //                 case response:
        //                     this.refs.messageRepos.onOpen()
        //                     this.setState({ isLoading: false, isRequestCashOutWordBank: false, messageRepos: description })
        //                     break;
        //                 default:
        //                     this.refs.messageRepos.onOpen()
        //                     this.setState({ isLoading: false, isRequestCashOutWordBank: false, messageRepos: I18n.t('99999') })
        //                     break;
        //             }

        //             break;
        //         case 'CASH_OUT_WORD_BANK_FAILED':
        //             this.refs.messageRepos.onOpen()
        //             this.setState({ isLoading: false, isRequestCashOutWordBank: false, messageRepos: I18n.t('99999') })
        //             break;
        //         default:
        //             break;
        //     }
        // }
    }



    onPressCamera(cropping) {
        // ImagePicker.launchCamera(options, (response) => {
        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //         console.log('User tapped custom button: ', response.customButton);
        //         alert(response.customButton);
        //     } else {
        //         console.log("response.path",)
        //         this.setState({
        //             filePath: response.path,
        //             fileData: response.data,
        //             url_image: response.uri,
        //             modalVisible: false
        //         });
        //     }

        // });
        ImagePicker.openCamera({
            cropping: cropping,
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            includeExit: true

        }).then(image => {
            console.log('image.path-1:', image.path)
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

    onPressGallery= (cropping) => {
        // let options = {
        //     storageOptions: {
        //         skipBackup: true,
        //         path: 'images',
        //     },
        // };
        // ImagePicker.launchImageLibrary(options, (response) => {
        //     console.log('Response = ', response);

        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //         console.log('User tapped custom button: ', response.customButton);
        //         alert(response.customButton);
        //     } else {
        //         this.setState({
        //             filePath: response,
        //             fileData: response.data,
        //             url_image: response.uri,
        //             modalVisible: false
        //         });
        //     }
        // });
        ImagePicker.openPicker({
            cropping: cropping,
            width: 300,
            height: 400,
            includeExit: true
        }).then(image => {
            console.log('image.path-2:', image.path)
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
    // onPressProcess1(Money) {
    //     const { cttID, accountID } = this.state
    //     const { infoAccount } = this.props
    //     RequestField.clearInitField();
    //     RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.CASH_OUT_WORD_BANK)) // 3
    //     RequestField.addToInitField(RequestField.addAmount(Money)) //5
    //     RequestField.addToInitField(RequestField.addActionNode(1)) //22
    //     RequestField.addToInitField(RequestField.addPaymentCode(cttID)) //67
    //     RequestField.addToInitField(RequestField.addAccountID(accountID)) //78  
    //     RequestField.addToInitField(RequestField.addToName(infoAccount.agentCode))  //98
    //     RequestField.addToInitField(RequestField.addTransactionDescription('Cash out money with agent'))  //107
    //     RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
    //     RequestField.addToInitField(RequestField.addImageName())//101
    //     let data = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
    //     this.props.onCashOutWordBank(data)
    //     RequestField.clearInitField();
    //     this.setState({ isRequestCashOutWordBank: true, isLoading: true })
    // }
    async onPressProcess(Toname, FromName, txtGender, txtName, transactionNote) {
        const { cttID, accountID, balance, nameCustomer, getGender, getNote } = this.state
        const { infoAccount } = this.props
        let Name = txtName != null ? txtName : null
        let Gender = txtGender != null ? txtGender : null
        let DetailToName = Toname != null ? Toname : 1
        let DetailFromName = FromName != null ? FromName : 1

        let note = transactionNote ? transactionNote : 'Cash out word bank'
        console.log('url_image:', this.state.url_image)
        try {
            if (this.state.url_image === null) {
                this.refs.messageRepos.onOpen()
                this.setState({ messageRepos: I18n.t('pleaseSelectImage') })
                return
            }
            this.setState({ isLoading: true })

            const data = new FormData();
            data.append('username', cttID);
            data.append('userfile', {
                uri: this.state.url_image,
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
                    } else {

                        this.refs.messageRepos.onOpen()
                        this.setState({ messageRepos: I18n.t('failedDueNoResponse') })
                    }
                    this.setState({ isUpload: res.status })
                }).catch((er) => {
                    this.refs.messageRepos.onOpen()
                    this.setState({ messageRepos: I18n.t('failedDueNoResponse') })
                })

            console.log('this.state.isUpload:', this.state.isUpload)

            if (this.state.isUpload === true) {

                // RequestField.clearInitField();
                // RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.CASH_OUT_WORD_BANK)) // 3
                // RequestField.addToInitField(RequestField.addAmount(balance)) //5
                // RequestField.addToInitField(RequestField.addMerchangeType(1)) //18 MerchangeType = 1 is cashout online mode 
                // RequestField.addToInitField(RequestField.addActionNode(1)) //22
                // RequestField.addToInitField(RequestField.addPaymentCode(cttID)) //67
                // RequestField.addToInitField(RequestField.addAccountID(accountID)) //78  
                // RequestField.addToInitField(RequestField.addTransactionDescription(note))  //107
                // RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))//34
                // RequestField.addToInitField(RequestField.addImageName(this.state.image_name))//101
                // RequestField.addToInitField(RequestField.addEffectType(infoAccount.agentCode))//103
                // RequestField.addToInitField(RequestField.addCustomerGender(Gender)) //48
                // RequestField.addToInitField(RequestField.addCustomerName(Name))//46
                // RequestField.addToInitField(RequestField.addToName(DetailToName))  //98
                // RequestField.addToInitField(RequestField.addFromName(DetailFromName))  //108
                // let data = RequestField.addToInitField(RequestField.addLanguage(infoAccount.language))//113
                // console.log('data:----------29/01/2022:', data)
                // this.props.onCashOutWordBank(data)
                // RequestField.clearInitField();
                // this.setState({ isRequestCashOutWordBank: true, isLoading: true })

                this.setState({ isLoading: false })
                this.props.navigation.navigate('TransactionDetail', {
                    money: balance,
                    cttID: cttID,
                    accountID: accountID,
                    note: note,
                    fromPhone: infoAccount.phoneNumber,
                    img: this.state.image_name ? this.state.image_name : 'image null',
                    agentCode: infoAccount.agentCode,
                    Gender: Gender,
                    DetailToName: DetailToName,
                    DetailFromName: DetailFromName,
                    Name: Name,
                    nameCustomer: nameCustomer,
                    onProcess: 'CASH_OUT_WORD_BANK',
                    processName: I18n.t('cashOutForCustomer'),
                    processCode: ConfigCode.CASH_OUT_WORD_BANK,
                    partnerCodeFee: 'CASH_OUT_WORD_BANK',
                    selectState: 'CASH_OUT_WORD_BANK',
                    checkDiscount: true

                })


            }
            else {
                this.refs.messageRepos.onOpen()
                this.setState({ isLoading: false, messageRepos: I18n.t('uploadImageUnsuccess') })
                return
            }

        } catch (error) {
            console.log(error)
        }
    }
    onCencel = () => {
        this.setState({ modalVisible: false, pageIndex: 0 })
    }
    messageRepos() {
        this.refs.messageRepos.onClose()
    }
    render() {
        const { cttID, isLoading, image, balance, messageRepos, url_image } = this.state
        return (
            <SafeAreaView style={styles.container}>
                {isLoading ? <ActivityIndicator /> : null}
                <UploadImgeComponents
                    minAmount={1000}
                    maxAmount={500000}
                    valueCTTID={cttID}
                    balance={balance}
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
        );
    }
}
const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
        actionType: state.auth.actionType,
        cashOutWordBankinfo: state.auth.cashOutWordBankinfo,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onCashOutWordBank: (data) => { dispatch(onCashOutWordBank(data)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(uploadImage)
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

