import React, { Component } from 'react';
import { View, Text, ScrollView, NativeModules, Alert } from 'react-native';
import {
    ModalContact,
    Toast,
    AlertNative,
    ConfirmModal,
    SokxayComponent,
    ActivityIndicator,
    CardView
} from "../../../components";
import _ from 'lodash'
import Contacts from 'react-native-contacts';
import styles from '../UploadImage/style'
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import * as FIELD from "../../../utils/CoreFieldMap";
import * as RequestField from "../../../utils/RequestField";
import * as ConfigCode from "../../../utils/ConfigCode";
import { baseUpload } from '../../../utils/Api'
import { uploadDataImage, searchUploadImage } from '../../../actions/Sokxay'
import { splitResponseCollinsCharacter, splitResponseCommaCharacter } from "../../../utils/Validate";
var ImagePicker = NativeModules.ImageCropPicker;

let defaultPhone = ''
class UploadImage extends Component {


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
            isVisibleUpload:''

        };
        if (this.props.infoAccount) {
            defaultPhone = this.props.infoAccount.phoneNumber;
        }
    }

    componentWillMount() {
        myContacts = ''
        const { navigation } = this.props
        this.setState({ object: navigation.getParam('item', 'null') })


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
                if(this.state.object.pay_status == "1")
                {
                    this.setState({isVisibleUpload:1})
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
        // console.log("Data upload :", nextProps.dataUpload)
        if (this.state.isSearchTransferHis) {
            this.setState({ isSearchTransferHis: false, isLoading: false })
            if (nextProps.dataUpload && nextProps.dataUpload.responseCode) {
                if (nextProps.dataUpload && nextProps.dataUpload.error === "00000") {
                    if (nextProps.dataUpload.responseCode === "00000") {
                        // let fileName = RequestField.getValueField(this.props.dataUpload.fieldMap, FIELD.PLACE_OF_ISSUE);
                        let fileName = RequestField.getValueField(nextProps.dataUpload.fieldMap, FIELD.PLACE_OF_ISSUE)
                        if (fileName != '' || fileName != null) {
                            this.setState({ getItem: fileName })
                        }
                    }
                }
            }
        }
        if (this.state.isRequestUpload) {
            this.setState({ isRequestUpload: false, isLoading: false })
            if (nextProps.dataUpload && nextProps.dataUpload.error === "00000" && nextProps.dataUpload.responseCode === "00000") {
                if (nextProps.dataUpload.responseCode === "00000") {
                    AlertNative(
                        I18n.t("info"),
                        I18n.t("uploadImageSuccess"),
                        [{ text: I18n.t("backToHome"), onPress: () => this.props.navigation.navigate('Home') }],
                        { cancelable: false },
                    );
                } else { AlertNative(I18n.t("uploadImageUnsuccess")) }
            }
            if (nextProps.dataUpload && nextProps.dataUpload.responseCode) {
                if (nextProps.dataUpload && nextProps.dataUpload.error == "10130") {
                    if (nextProps.dataUpload.responseCode === "10130") {
                        AlertNative(
                            I18n.t("info"),
                            I18n.t("uploadImagemore3times"),
                            [{ text: I18n.t("backToHome"), onPress: () => this.props.navigation.navigate('Home') }],
                            { cancelable: false },
                        );
                    }
                }
            }
        }
    }
    // open contact
    onOpenContact() {
        this.refs.ModalContact.onOpen();
        this.onSearchContact('');
    }

    onSelectedContact(contact) {
        // have to use react-redux (connect) this.refs.SokxayComponentContact
        this.refs.SokxayComponentContact.onSetPhone(contact)
    }

    onSearchContact(text) {
        let qr = _.filter(myContacts, item => item.phoneNumbers && item.phoneNumbers[0] && replaceAll(item.phoneNumbers[0].number, '-', '').includes(text))
        Contacts.getContactsMatchingString(text, (err, contacts) => {
            if (err === 'denied') {
                AlertNative("", `error: ${err}`)
            } else {
                let merContact = _.uniqBy(_.concat(qr, contacts), "recordID")
                this.setState({ contacts: merContact })
            }
        })
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
        this.setState({ image: null })
    }

    onPressGallery(cropping) {
        this.setState({ isLoading: true })
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
    // tai hinh len
    async onPressUploadImage(phone, address, cusName, detail) {
        try {
            const { object } = this.state
            if (this.state.url_image === null) {
                AlertNative(I18n.t('pleaseSelectImage'))
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
                        AlertNative(I18n.t(`failedDueNoResponse`))
                    }
                    this.setState({ isUpload: res.status })
                }).catch((er) => {
                    AlertNative(I18n.t(`failedDueNoResponse`))
                })

            if (this.state.isUpload === true) {
                RequestField.clearInitField();
                let agentCode = RequestField.getValueField(this.props.user.fieldMap, FIELD.STAFF_CODE)
                let accountID = RequestField.getValueField(this.props.user.fieldMap, FIELD.ACCOUNT_ID);
                RequestField.addToInitField(RequestField.addCustomerPhone(phone))
                RequestField.addToInitField(RequestField.addCustomerName(cusName))
                RequestField.addToInitField(RequestField.addCustomerAddress(address))
                RequestField.addToInitField(RequestField.addImageName(this.state.image_name))
                RequestField.addToInitField(RequestField.addImagePath(this.state.path))
                RequestField.addToInitField(RequestField.addTransDes(detail))
                // RequestField.addToInitField(RequestField.addTransDes('Test'))
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
                this.props.uploadDataImage(data1)
                this.setState({ isRequestUpload: true })

            } else {
                AlertNative(I18n.t("uploadImageUnsuccess"))
                this.setState({ isLoading: false })
                return
            }
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const { isLoading, contacts, image } = this.state;
        //alert(phone)

        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    {isLoading ? <ActivityIndicator /> : null}
                    <CardView style={styles.cardStyle}>
                        <SokxayComponent isUploadImage={true}
                            phonePlaceholder={'inputThePhoneHere2'}
                            textPhone={'phoneNumber'}
                            maxLengthPhone={13}
                            isVisibleUpload={this.state.isVisibleUpload}
                            getValueItem={this.state.getItem}
                            defaultPhone={defaultPhone}
                            ref='SokxayComponentContact'
                            keyboardTypeInputPhone='number-pad'
                            onPressContact={() => this.onOpenContact()}
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
                        <ModalContact
                            onSelectedContact={(contact) => this.onSelectedContact(contact)}
                            ref='ModalContact'
                            contacts={contacts}
                            searchContact={(contact) => this.onSearchContact(contact)}
                        />
                    </CardView>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        // isFetching: state.sokxay.isFetching,//
        user: state.auth.user,
        uploadInfo: state.sokxay.uploadInfo,
        paymentData: state.sokxay.paymentData,
        dataUpload: state.sokxay.dataUpload,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        uploadDataImage: data => dispatch(uploadDataImage(data)),
        searchUploadImage: data => {
            dispatch(searchUploadImage(data));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);
