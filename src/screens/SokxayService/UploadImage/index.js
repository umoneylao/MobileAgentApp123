import React, { Component } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
    SokxayComponent,
    ActivityIndicator,
    Notification
} from "../../../components";
import _ from 'lodash'
import styles from '../UploadImage/style'
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import * as FIELD from "../../../utils/CoreFieldMap";
import * as RequestField from "../../../utils/RequestField";
import * as ConfigCode from "../../../utils/ConfigCode";
import { baseUpload } from '../../../utils/Api'
import { uploadDataImage, searchUploadImage, onStoreToServer } from '../../../actions/Sokxay'
import ImagePicker from 'react-native-image-crop-picker';
let defaultPhone = ''
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            url_image: null,
            image: null,
            object: [],
            image_name: '',
            path: '',
            isUpload: false,
            getItem: null,
            name: null,
            Address: null,
            detail: null,
            isVisibleUpload: '',
            reposMessege: null,
            typeIcon: null

        };
        if (this.props.infoAccount) {
            defaultPhone = this.props.infoAccount.phoneNumber;
        }
    }
    componentWillMount() {
        this.setState({ object: this.props.route.params.item })
    }
    onPressTakePhoto(cropping) {
        this.setState({ isLoading: true })
        ImagePicker.openCamera({
            cropping: cropping,
            width: 300,
            height: 400,
            includeExit: true,
            saveToPhotos :true
        }).then(image => {
            this.setState({
                image: { uri: image.path, width: image.width, height: image.height },
                url_image: image.path,
            }, () => {
                setTimeout(() => {
                    this.state.image != null ? this.setState({ isLoading: false }) : null
                }, 100)
            })
        }).catch(e => {
            if (e.message = 'User cancelled image selection')
                this.setState({ image: null, url_image: null })
        });
    }
    onPressCancel() {
        this.setState({ image: null, url_image: null })
    }

    onPressGallery(cropping) {
        this.setState({ isLoading: false })
        ImagePicker.openPicker({
            cropping: cropping,
            width: 300,
            height: 400,
            includeExit: true
        }).then(image => {
            this.setState({
                getItem: null,
                image: { uri: image.path, width: image.width, height: image.height },
                url_image: image.path,

            }, () => {
                setTimeout(() => {
                    this.state.image != null ? this.setState({ isLoading: false }) : null
                }, 100)
            })
        }).catch(e => {
            if (e.message = 'User cancelled image selection')
                this.setState({ image: null, url_image: null })
        }
        );
    }


    onPressCamera(cropping) {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 300,
            height: 400,
            includeExit: true,
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

    async onPressUploadImage(phone, address, cusName, detail) {
        try {
            const { object } = this.state
            if (this.state.url_image === null) {
                this.refs.reposMessege.onOpen();
                this.setState({ reposMessege: I18n.t('pleaseSelectImage'), typeIcon: 'Warning' })
                return
            }
            this.setState({ isLoading: true })
            let agentPhone = RequestField.getValueField(this.props.user.fieldMap, FIELD.PHONE_NUMBER);
            let accountID = RequestField.getValueField(this.props.user.fieldMap, FIELD.ACCOUNT_ID);
            let paymentCode = object.payment_code

            const data = new FormData();
            data.append('username', paymentCode);
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
                        this.setState({ image_name: res.filename, path: res.path })
                    } else {
                        this.refs.reposMessege.onOpen();
                        this.setState({ reposMessege: I18n.t('failedDueNoResponse'), typeIcon: 'Warning' })

                    }
                    this.setState({ isUpload: res.status })
                }).catch((er) => {
                    this.refs.reposMessege.onOpen();
                    this.setState({ reposMessege: I18n.t('failedDueNoResponse'), typeIcon: 'Warning' })
                })

            if (this.state.isUpload === true) {
                RequestField.clearInitField();
                let agentCode = RequestField.getValueField(this.props.user.fieldMap, FIELD.STAFF_CODE)
                let accountID = RequestField.getValueField(this.props.user.fieldMap, FIELD.ACCOUNT_ID);
                RequestField.addToInitField(RequestField.addCustomerPhone(phone))
                RequestField.addToInitField(RequestField.addCustomerName(cusName))
                RequestField.addToInitField(RequestField.addCustomerAddress(address))
                RequestField.addToInitField(RequestField.addImageName(this.state.image_name))
                RequestField.addToInitField(RequestField.addTransDes(detail))
                RequestField.addToInitField(RequestField.addStaffCode(agentCode))
                RequestField.addToInitField(RequestField.addAccountID(accountID));
                RequestField.addToInitField(RequestField.addPhone(agentPhone))
                RequestField.addToInitField(RequestField.addPaperNumber(object.trans_id))
                if (this.state.object.img_status_id == "0") {
                    RequestField.addToInitField(RequestField.addRequestNo('0'));
                } else {
                    RequestField.addToInitField(RequestField.addRequestNo('1'));
                }
                const data1 = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.UPLOAD_IMAGE))
                // console.log(JSON.stringify(data1))
                this.props.onPressStoreToServer(data1)
                this.setState({ isRequestUpload: true })

            } else {
                this.refs.reposMessege.onOpen();
                this.setState({reposMessege:I18n.t('uploadImageUnsuccess'), typeIcon: 'Warning', isLoading: false})
                return
            }
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount() {

        const { params } = this.props.route;
        const phoneQr = params ? params.phoneQr : null
        if (phoneQr) {
            this.refs.SokxayComponentContact.onSetPhone(phoneQr)
        }
        // console.log('This props did mount', this.props);
        if (this.props.infoAccount) {
            this.setState({ phone: this.props.infoAccount.phoneNumber })

        }
        if (this.state.object.img_status_id == "1") {
            try {
                if (this.state.object.pay_status == "1") {
                    this.setState({ isVisibleUpload: 1 })
                }
                RequestField.clearInitField();
                let agentPhone = RequestField.getValueField(this.props.user.fieldMap, FIELD.PHONE_NUMBER);
                let accountID = RequestField.getValueField(this.props.user.fieldMap, FIELD.ACCOUNT_ID);
                RequestField.addToInitField(RequestField.addAccountID(accountID));
                RequestField.addToInitField(RequestField.addPhone(agentPhone))
                RequestField.addToInitField(RequestField.addPaperNumber(this.state.object.trans_id))
                RequestField.addToInitField(RequestField.addRequestNo("3"))
                const data2 = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.REQUEST_PAYMENT))
                this.props.searchUploadImage(data2)
                this.setState({ isSearchTransferHis: true, isLoading: true })
            } catch (error) {
                console.log("Error : ", error);
            }
        }
    }
    //
    componentWillReceiveProps = (nextProps) => {
        // console.log("Get Data upload :", nextProps.dataUpload)
        // console.log("nextProps stor data", nextProps.storeData)
        if (this.state.isSearchTransferHis) {
            this.setState({ isSearchTransferHis: false, isLoading: false })
            if (nextProps.dataUpload && nextProps.dataUpload.responseCode) {
                if (nextProps.dataUpload && nextProps.dataUpload.error === "00000") {
                    if (nextProps.dataUpload.responseCode === "00000") {
                        let fileName = RequestField.getValueField(nextProps.dataUpload.fieldMap, FIELD.PLACE_OF_ISSUE)
                        if (fileName != '' || fileName != null) {
                            this.setState({ getItem: fileName })
                        }
                    }
                }
            }
        }
        if (this.state.isRequestUpload) {
            // console.log("Data upload :", nextProps.storeData)
            this.setState({ isRequestUpload: false, isLoading: false })
            if (nextProps.storeData && nextProps.storeData.error === "00000" && nextProps.storeData.responseCode === "00000") {
                if (nextProps.storeData.responseCode === "00000") {
                    this.refs.reposMessege.onOpen();
                    this.setState({reposMessege:I18n.t('uploadImageSuccess'), typeIcon: 'Success'})
                } else { 
                    this.refs.reposMessege.onOpen();
                    this.setState({reposMessege:I18n.t('uploadImageUnsuccess'), typeIcon: 'Warning'})
                }
            }
            if (nextProps.storeData.responseCode == "10130") {
                if (nextProps.storeData.error == "00000" && nextProps.storeData.responseCode == "10130") {

                    this.refs.reposMessege.onOpen();
                    this.setState({reposMessege:I18n.t('uploadImageMore3times'), typeIcon: 'Warning'})
                }
            }
        }
    }
    reposMessege(){ this.refs.reposMessege.onClose();}
    render() {
        const { isLoading, image, reposMessege, typeIcon } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                {isLoading ? <ActivityIndicator /> : null}
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                    <SokxayComponent
                        isUploadImage={true}
                        phonePlaceholder={'inputThePhoneHere2'}
                        textPhone={'phoneNumber'}
                        maxLengthPhone={13}
                        isVisibleUpload={this.state.isVisibleUpload}
                        getValueItem={this.state.getItem}
                        defaultPhone={defaultPhone}
                        ref='SokxayComponentContact'
                        keyboardTypeInputPhone='number-pad'
                        cusNamePlaceholder={'enterYourName'}
                        textCusName={'fullName'}
                        textAddress={'cusAddress'}
                        addressPlaceholder={'enterAddress'}
                        textButton={'upload'}
                        detailsPlaceholder={'details'}
                        image={image}
                        onPressTakePhoto={() => this.onPressTakePhoto(false)}
                        onPressCancel={() => this.onPressCancel()}
                        onPressGallery={() => this.onPressGallery(false)}
                        onPressUploadImage={(phone, address, cusName, detail) => this.onPressUploadImage(phone, address, cusName, detail)}
                    />
                </ScrollView>
               
                <Notification
                    headerType={typeIcon}
                    title={I18n.t('info')}
                    textContent={reposMessege}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.reposMessege()}
                    ref='reposMessege'
                />
            </SafeAreaView>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth.user,
        uploadInfo: state.sokxay.uploadInfo,
        paymentData: state.sokxay.paymentData,
        dataUpload: state.sokxay.dataUpload,
        storeData: state.sokxay.storeData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        uploadDataImage: data => dispatch(uploadDataImage(data)),
        searchUploadImage: data => { dispatch(searchUploadImage(data)); },
        onPressStoreToServer: data => dispatch(onStoreToServer(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
// export default index
