import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ActivityIndicator, AlertNative } from '../../../components'
import { connect } from 'react-redux'
import styles from './styles'
import { uploadImage } from '../../../actions/Sokxay'
import * as RequestField from '../../../utils/RequestField'
import * as FIELD from '../../../utils/CoreFieldMap'
import _ from 'lodash'
import I18n from 'react-native-i18n'
import * as ConfigCode from '../../../utils/ConfigCode'
import { baseUpload } from '../../../utils/Api'
import { login } from '../../../actions/Auth'
class uploadFile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            loading: false,
            action: false,
            imageName: '',
            imagePath: ''
        };
    }

    componentWillMount() {
        const img_uri = this.props.navigation.getParam('image_uri', 'Not found uri')
        this.setState({ image: img_uri })
        //let cusPhone = RequestField.getValueField(this.props.sokxayInfo.fieldMap, FIELD.CUSTOMER_PHONE)
        // let cusName = RequestField.getValueField(this.props.sokxayInfo.fieldMap, FIELD.CUSTOMER_NAME)
        // let address = RequestField.getValueField(this.props.sokxayInfo.fieldMap, FIELD.CUSTOMER_ADDRESS)
        // let note = RequestField.getValueField(this.props.sokxayInfo.fieldMap, FIELD.TRANSACTION_DESCRIPTION)
        //alert("Customer Phone : " + cusPhone + "\n" + "Customer Name : " + cusName + "\n" + "Address : " + address + "\n" + "Note : " + note)
    }

    onPassValueToCore() {
        // RequestField.addToInitField(RequestField.addPhone('8562099588891'))
        // const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO))
        // this.props.onLogIn(data, true);
        const { action, imageName, imagePath } = this.state
        if (action == true && imageName != null && imagePath != null) {
            RequestField.clearInitField()
            let cusPhone = RequestField.getValueField(this.props.sokxayInfo.fieldMap, FIELD.CUSTOMER_PHONE)
            let cusName = RequestField.getValueField(this.props.sokxayInfo.fieldMap, FIELD.CUSTOMER_NAME)
            let address = RequestField.getValueField(this.props.sokxayInfo.fieldMap, FIELD.CUSTOMER_ADDRESS)
            let note = RequestField.getValueField(this.props.sokxayInfo.fieldMap, FIELD.TRANSACTION_DESCRIPTION)
            let agentCode = RequestField.getValueField(this.props.user.fieldMap, FIELD.STAFF_CODE)
            let transaction_id = RequestField.getValueField(this.props.sokxayInfo.fieldMap, FIELD.REFERENCE_ID)
            RequestField.addToInitField(RequestField.addPhone(cusPhone))
            RequestField.addToInitField(RequestField.addImageName(imageName))
            RequestField.addToInitField(RequestField.addImagePath(imagePath))
            RequestField.addToInitField(RequestField.addCustomerName(cusName))
            RequestField.addToInitField(RequestField.addCustomerAddress(address))
            RequestField.addToInitField(RequestField.addTransDes(note))
            RequestField.addToInitField(RequestField.addStaffCode(agentCode))
            RequestField.addToInitField(RequestField.addReferenceId(transaction_id))
            const data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.UPLOAD_IMAGE))
            this.props.onUploadImage(data)
            RequestField.clearInitField()
            // console.log('Respone data : ', this.props.sokxayUpload)
            this.setState({ loading: false, image: null, imageName:'', imagePath:'', action: false })
            AlertNative(I18n.t(`uploadSuccessfully`))
            this.props.navigation.goBack();
        } else {
            this.setState({ loading: false })
        }
    }

    renderImage(image) {
        return <Image style={styles.img} source={{ uri: image }} />
    }

    onGoToUploadImage() {
        try {
            //this.setState({action: true})
            let cusPhone = RequestField.getValueField(this.props.sokxayInfo.fieldMap, FIELD.CUSTOMER_PHONE)
            if (this.state.image == null) {
                AlertNative("Please select or take photo first...!");
                return;
            }
            this.setState({ loading: true })
            const data = new FormData();
            data.append('username', cusPhone);
            data.append('userfile', {
                uri: this.state.image,
                type: 'image/png',
                name: 'image.png'
            });

            fetch(baseUpload + "api/v1/sokxay/upload/", {
                method: "POST",
                body: data,
                timeout: 60000
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status == true) {
                        console.log(res.result)
                        this.setState({ action: true, imageName: res.filename, imagePath: res.path })
                        this.onPassValueToCore()
                    } else {
                        AlertNative(I18n.t(`failedDueNoResponse`))
                    }
                }).catch((er) => {
                    this.onPassValueToCore()
                    AlertNative(I18n.t(`failedDueNoResponse`))
                })
        } catch (err) {
            console.error(err)
        }
    }

    render() {
        const { loading } = this.state
        return (
            <View style={styles.container}>
                {loading ? <ActivityIndicator /> : null}
                <Text style={styles.textMess}> {I18n.t('yourPhoto')} : </Text>
                <View style={styles.center}>
                    <View style={styles.imgpLoad}>
                        {this.state.image ? this.renderImage(this.state.image) : null}
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.butonClickMe} onPress={() => this.onGoToUploadImage()}>
                        <Text style={styles.textClickMe}>{I18n.t('loadUp')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        sokxayInfo: state.sokxay.accInfoData,
        sokxayUpload: state.sokxay.uploadInfo,
        user: state.auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUploadImage: (data) => { dispatch(uploadImage(data)) },
        onLogIn: (phoneNumber, keepLoggedIn) => { dispatch(login(phoneNumber, keepLoggedIn)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(uploadFile)
