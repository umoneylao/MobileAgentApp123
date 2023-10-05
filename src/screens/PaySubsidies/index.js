import React, { Component } from "react";
import { View, Dimensions, Text, StatusBar, StyleSheet, SafeAreaView, Modal, TouchableOpacity } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import * as Animatable from "react-native-animatable";
import { Colors } from '../../themes'
import * as ConfigCode from '../../utils/ConfigCode'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { ActivityIndicator, Notification, FullTextInput, FullNewButton } from '../../components'
import { onCheckNumberCTTID } from '../../actions/Auth'
import Ionicons from "react-native-vector-icons/Ionicons";
import { isValidated } from '../../utils/Validate'
import * as Constant from '../../utils/Constant'
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
console.disableYellowBox = true;
sableYellowBox = true;
class QrCodeCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isRequestCheckNumberCTTID: false,
            reposMesseng: null,
            modelInputCttID: false
        };
    }


    onSuccess(e) {
        const { infoAccount } = this.props
        // console.log(e.data)
        if (e.data != null) {
            let arr = e.data.split("/")
            if (arr.length == 5) {
                let cttID = arr && arr[0]
                RequestField.clearInitField();
                RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.CHECK_NUMBER_CTTID))
                RequestField.addToInitField(RequestField.addActionNode(1))
                RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
                let data = RequestField.addToInitField(RequestField.addPaymentCode(cttID))
                this.props.onCheckNumberCTTID(data)
                RequestField.clearInitField();
                this.setState({ isRequestCheckNumberCTTID: true, isLoading: true })
            }

        }
    }


    componentWillReceiveProps(nextProps) {
        const { isRequestCheckNumberCTTID, isLoading } = this.state
        if (isRequestCheckNumberCTTID && isLoading) {
            if (nextProps.actionType) {
                switch (nextProps.actionType) {
                    case 'CHECK_NUMBER_CTTID_SUCCESS':
                        // console.log('nextProps.getCheckNumberCTTID', nextProps.getCheckNumberCTTID)
                        let responseCode = RequestField.getValueField(nextProps.getCheckNumberCTTID.fieldMap, FIELD.RESPONSE_CODE);
                        let messenError = RequestField.getValueField(nextProps.getCheckNumberCTTID.fieldMap, FIELD.RESPONSE_DESCRIPTION);
                        let resPhone = RequestField.getValueField(nextProps.getCheckNumberCTTID.fieldMap, FIELD.CUSTOMER_PHONE);
                        switch (responseCode) {
                            case '00000':
                                // let value = nextProps.getCheckNumberCTTID.fieldMap
                                // this.props.navigation.navigate('information', { dataQRcode: value })
                                // this.setState({ isRequestCheckNumberCTTID: false, isLoading: false })
                                let value = nextProps.getCheckNumberCTTID.fieldMap
                                if (resPhone) {
                                    let toStringPhone = resPhone.toString()
                                    let subPhone = toStringPhone.substring(0, 2)
                                    if (subPhone === '856') {
                                        this.refs.reposMesseng.onOpen()
                                        this.setState({ isRequestCheckNumberCTTID: false, isLoading: false, reposMesseng: I18n.t('accountdontHavePermission') })
                                    } else {
                                        this.props.navigation.navigate('information', { dataQRcode: value })
                                        this.setState({ isRequestCheckNumberCTTID: false, isLoading: false })
                                    }
                                } else {
                                    this.refs.reposMesseng.onOpen()
                                    this.setState({ isRequestCheckNumberCTTID: false, isLoading: false, reposMesseng: 'Phone is null' })
                                }

                                break;
                            case responseCode:
                                this.refs.reposMesseng.onOpen()
                                this.setState({ isRequestCheckNumberCTTID: false, isLoading: false, reposMesseng: messenError ? messenError : I18n.t('99999') })
                                break;
                            default:
                                break;
                        }
                        break;
                    case 'CHECK_NUMBER_CTTID_FAILED':
                        this.setState({ isRequestCheckNumberCTTID: false, isLoading: false, reposMesseng: nextProps.getCheckNumberCTTID.description })
                        break;
                    default:
                        break;
                }
            } else {
                this.setState({ isRequestCheckNumberCTTID: false, isLoading: false, reposMesseng: 'Error system' })
            }

        }
    }


    makeSlideOutTranslation(translationType, fromValue) {
        return {
            from: {
                [translationType]: SCREEN_WIDTH * -0.18
            },
            to: {
                [translationType]: fromValue
            }
        };
    }
    reposMesseng() {
        this.refs.reposMesseng.onClose()
    }
    openModel() {
        this.setState({ modelInputCttID: true })
    }
    onClose() {
        this.setState({ modelInputCttID: false })
    }
    onChangeInputcctID(text) {
        const errorCCTID = !text || text.length < 1 || text.length > 100 ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ cctID: text, errorCCTID })
    }
    onPressSerch() {
        const { cctID } = this.state
        const { infoAccount } = this.props
        RequestField.clearInitField();
        RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.CHECK_NUMBER_CTTID))
        RequestField.addToInitField(RequestField.addActionNode(1))
        RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber))
        let data = RequestField.addToInitField(RequestField.addPaymentCode(cctID))
        this.props.onCheckNumberCTTID(data)
        RequestField.clearInitField();
        this.setState({ isRequestCheckNumberCTTID: true, isLoading: true, modelInputCttID: false })
    }
    onClearCttID() {
        this.setState({ cctID: null })
    }
    render() {
        const { cctID, errorCCTID } = this.state
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                {this.state.isLoading ? <ActivityIndicator /> : null}
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                <QRCodeScanner
                    showMarker
                    onRead={this.onSuccess.bind(this)}
                    cameraStyle={{ height: SCREEN_HEIGHT }}
                    customMarker={
                        <View style={styles.rectangleContainer}>
                            <View style={styles.topOverlay}>
                                <Text style={{ fontSize: 30, color: "white" }}></Text>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 20 }}>
                                <View style={styles.leftAndRightOverlay} />
                                <View style={styles.rectangle}>
                                    <Animatable.View
                                        style={styles.scanBar}
                                        direction="alternate-reverse"
                                        iterationCount="infinite"
                                        duration={1700}
                                        easing="linear"
                                        animation={this.makeSlideOutTranslation(
                                            "translateY",
                                            SCREEN_WIDTH * -0.54
                                        )}
                                    />
                                </View>
                                <View style={styles.leftAndRightOverlay} />
                            </View>
                            <View>
                                <TouchableOpacity style={styles.txtInput} onPress={() => this.openModel()}>
                                    <Text style={styles.txtCIIID}>{I18n.t('txtinputcctID')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bottomOverlay} />

                        </View>
                    }
                />
                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={this.state.reposMesseng}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.reposMesseng()}
                    ref='reposMesseng'
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modelInputCttID}
                    onRequestClose={() => {
                        this.setState({ modelInputCttID: false })
                    }}
                >
                    <SafeAreaView>
                        <View style={styles.mainModel}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => this.onClose()} style={{ padding: 10 }}>
                                    <Ionicons name='close-sharp' size={30} color={Colors.backColor} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.groupInput}>
                                <FullTextInput
                                    label={I18n.t('labelcctID')}
                                    placeholder={I18n.t('txtinputcctID')}
                                    returnKeyType='done'
                                    keyboardType='default'
                                    value={cctID}
                                    error={errorCCTID}
                                    onChangeUserName={(text) => this.onChangeInputcctID(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    contact={true}
                                    maxLength={30}
                                    textError={I18n.t('txtinputcctID')}
                                    onclick={() => this.onClearCttID()}

                                />
                            </View>
                            <View style={styles.groupInput}>
                                <FullNewButton
                                    text={I18n.t('Search')}
                                    onPress={() => this.onPressSerch()}
                                    isDisable={(!cctID || errorCCTID) ? true : false}
                                />
                            </View>

                        </View>
                    </SafeAreaView>
                </Modal>




            </SafeAreaView>
        );
    }
}
const rectDimensions = SCREEN_WIDTH * 0.65;
const rectBorderColor = Colors.white
const scanBarWidth = SCREEN_WIDTH * 0.46;
const scanBarHeight = SCREEN_WIDTH * 0.0025;

const mapStateToProps = (state) => {
    return {
        infoAccount: state.auth.infoAccount,
        actionType: state.auth.actionType,
        getCheckNumberCTTID: state.auth.getCheckNumberCTTID,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onCheckNumberCTTID: (data) => { dispatch(onCheckNumberCTTID(data)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QrCodeCamera);

const styles = StyleSheet.create({
    rectangleContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },

    rectangle: {
        height: rectDimensions,
        width: rectDimensions,
        borderWidth: 5,
        borderColor: rectBorderColor,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        borderRadius: 10,
    },

    topOverlay: {
        flex: 1,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        justifyContent: "center",
        alignItems: "center"
    },

    bottomOverlay: {
        flex: 1,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        paddingBottom: SCREEN_WIDTH * 0.25
    },

    leftAndRightOverlay: {
        height: SCREEN_WIDTH * 0.65,
        width: SCREEN_WIDTH,
    },

    scanBar: {
        width: scanBarWidth,
        height: scanBarHeight,
    },
    txtInput: {
        padding: 10,
        backgroundColor: '#e6f5fe',
        borderRadius: 5
    },
    txtCIIID: {
        color: '#0a9bf5',
        fontSize: 14,
        fontWeight: '600'
    },
    mainModel: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white
    },
    header: {
        width: '100%',
        height: 50,
    },
    groupInput: {
        padding: 10
    }
})


