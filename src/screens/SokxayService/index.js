import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    SafeAreaView
} from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
    SokxayComponent,
    ActivityIndicator,
    Notification
} from "../../components";
import _ from "lodash";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { Images, Colors, Fonts } from "../../themes";
import * as RequestField from "../../utils/RequestField";
import * as FIELD from "../../utils/CoreFieldMap";
import { onPassValueRequest, uploadImage, onGetPaymentInfo, searchUploadImage } from "../../actions/Sokxay";
import * as ConfigCode from "../../utils/ConfigCode";
import { splitResponseCollinsCharacter, splitResponseCommaCharacter } from "../../utils/Validate";
import numeral from 'numeral'
class SokxayHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            isLoading: false,
            visible: false,
            phone: "",
            txnId: "",
            txtPaymentCode: "",
            payList: [],  // payment info
            trans_id: [],
            payment_code: [{ value: "", id: "" }],
            list_status: [
                { value: I18n.t("all"), id: "0" },
                { value: I18n.t("noPhotoUpload"), id: "1" },
                { value: I18n.t("photoUpload"), id: "2" },
                { value: I18n.t("receiveMoney"), id: "3" }
            ],
            listData: [
                { trans_id: "", payment_code: "", paid_date: "", paid_amount: "", img_status: "", img_status_id: "", pay_status: "" }
            ],
            txtStatus: "",
            isDisable: false,  //for disable combobox
            isData: false,  // open view showdata
            isFecthData: false,
            disableValue: '', // selection All payment 
            checkInfo: false,
            ErrorMesseng: null
        };
    }

    componentDidMount() {


    }

    componentWillReceiveProps = nextProps => {
        const { isLoading, checkInfo } = this.state
        try {
            if (checkInfo && isLoading) {
                // console.log("nextProps- boppby: ", nextProps);
                if (nextProps.paymentData && nextProps.paymentData.error === "00000" && nextProps.paymentData.responseCode === "00000") {
                    if (nextProps.paymentData.responseCode === "00000") {
                        // console.log("Payment information :", this.props.paymentData);
                        const pushList = [];
                        const pushTransId = [];
                        const pushPaymentCode = [];
                        let transDes = RequestField.getValueField(this.props.paymentData.fieldMap, FIELD.TRANSACTION_DESCRIPTION); // Get Payment code and Transaction id 2 (TRANSACTION_DESCRIPTION)
                        if (transDes != null) {
                            let item = splitResponseCollinsCharacter(transDes);
                            let value = "";
                            pushPaymentCode.push({ value: I18n.t("all"), id: 0 });
                            for (let i = 0; i < item.length; i++) {
                                value = splitResponseCommaCharacter(item[i]);
                                if (value != null) {
                                    pushList.push({ transactionId: value[1], paymentCode: value[0] });
                                    pushTransId.push({ value: value[1] });
                                    pushPaymentCode.push({ value: value[0], id: value[0] });
                                }
                            }
                        }

                        if (pushList != null) {
                            this.setState({ payList: pushList, trans_id: pushTransId, payment_code: pushPaymentCode, isLoading: false });
                        } else {
                            this.refs.ErrorMesseng.onOpen()
                            this.setState({ isLoading: false, checkInfo: false, ErrorMesseng: I18n.t("noDataFound") });
                        }
                    } else {
                        this.refs.ErrorMesseng.onOpen()
                        this.setState({ ErrorMesseng: I18n.t("noDataFound") });

                    }
                } else {
                    this.refs.ErrorMesseng.onOpen()
                    this.setState({ isLoading: false, checkInfo: false, ErrorMesseng: I18n.t("noDataFound") });
                }
            }

            if (nextProps.dataUpload && nextProps.dataUpload.error === "00000" && nextProps.dataUpload.responseCode === "00000") {
                if (nextProps.dataUpload.responseCode === "00000" && this.state.isFecthData == true) {
                    // console.log("Data upload :", nextProps.dataUpload);
                    const ls_data = []
                    setTimeout(() => {
                        let description = RequestField.getValueField(this.props.dataUpload.fieldMap, FIELD.TRANSACTION_DESCRIPTION);
                        if (description != null) {
                            var item = splitResponseCollinsCharacter(description);
                            // console.log(item)
                            if (item != null) {
                                let value = "";
                                for (let i = 0; i < item.length; i++) {
                                    value = splitResponseCommaCharacter(item[i]);
                                    if (value != null) {
                                        let tranId = value[0]
                                        let pay_code = value[1]
                                        let paid_date = value[2]
                                        let paid_amount = value[3]
                                        let pay_status = value[4]
                                        let img_status = value[5]
                                        let imgStatus = ''
                                        if (img_status == 0) {
                                            imgStatus = I18n.t("noPhotoUpload") //ຍັງບໍ່ມີການອັບໂຫລດຮູບ
                                        } else if (img_status == 1 && pay_status == 0) {
                                            imgStatus = I18n.t("uploadNotpay")// ລໍຖ້າອະນຸມັດ
                                        } else if (img_status == 1 && pay_status == 1) {
                                            imgStatus = I18n.t("receiveMoney")// ອະນຸມັດແລ້ວ
                                        } else if (img_status == 1 && pay_status == -1) {
                                            imgStatus = I18n.t("rejectRequest") //ຍົກເລີກການຮ້ອງຂໍ
                                        }
                                        ls_data.push({ trans_id: tranId, payment_code: pay_code, paid_date: paid_date, paid_amount: paid_amount, img_status: imgStatus, img_status_id: img_status, pay_status: pay_status });
                                    }
                                }

                                if (ls_data != null) {
                                    this.setState({ isData: true, isLoading: false, listData: ls_data });
                                }
                            } else {
                                this.refs.ErrorMesseng.onOpen()
                                this.setState({ ErrorMesseng: I18n.t("noDataFound") });
                            }
                        } else {
                        }
                    }, 100);
                }
            } else {
                this.setState({ isData: false, isFecthData: false });
            }

        } catch (err) {
            console.log(err);
        }
    };

    onProcessSearch(startDate, toDate, fullStartDate, fullToDate) {
        const { txtPaymentCode, txtStatus } = this.state;
        const zero = "000000";
        try {
            if (txtPaymentCode.toString() == "") {
                this.refs.ErrorMesseng.onOpen()
                this.setState({ ErrorMesseng: I18n.t("selectPayment") });

                return
            }
            if (txtStatus.toString() == 0 && txtPaymentCode > 0) {
                this.refs.ErrorMesseng.onOpen()
                this.setState({ ErrorMesseng: I18n.t("cannotSelectAll") });
                return
            }

            // console.log("Payment code : ", txtPaymentCode)
            RequestField.clearInitField();
            let agentPhone = RequestField.getValueField(this.props.user.fieldMap, FIELD.PHONE_NUMBER);
            let accountID = RequestField.getValueField(this.props.user.fieldMap, FIELD.ACCOUNT_ID);
            RequestField.addToInitField(RequestField.addPaymentCode(txtPaymentCode));
            RequestField.addToInitField(RequestField.addFromDate(fullStartDate));
            RequestField.addToInitField(RequestField.addToDate(fullToDate));
            RequestField.addToInitField(RequestField.addPhone(agentPhone));
            RequestField.addToInitField(RequestField.addMerchangeType(txtStatus)); // image status
            RequestField.addToInitField(RequestField.addRequestNo("2"));   // search action 
            RequestField.addToInitField(RequestField.addAccountID(accountID));
            let data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.REQUEST_PAYMENT));
            // console.log('data get ', data)
            // console.log(JSON.stringify(data));
            this.setState({ isLoading: true, isFecthData: true });
            this.props.searchUploadImage(data);

        } catch (error) {
            console.log("Error -> ", error);
        }
    }

    onChangePaymentCode(value) {
        try {
            this.setState({ txtPaymentCode: value });
            const { payList } = this.state;
            if (payList != null) {
                let item = RequestField.getValueInObject(payList, value);
                item != null ? this.setState({ txnId: item.transactionId != null ? item.transactionId : null }) : null
                value == 0 ? this.setState({ txnId: '', isDisable: true, disableValue: '0', txtStatus: '0' }) : this.setState({ isDisable: false, disableValue: '' })
                //console.log(item.transactionId)
            }
        } catch (error) {
            console.log(error);
        }
    }
    onChangeStatusHandler(value) {
        try {
            this.setState({ txtStatus: value });
        } catch (error) {
            console.log(error);
        }
    }
    onPressToUpload = (item) => {
        this.props.navigation.navigate('UploadImage', { item: item })
    }
    _renderHeader() {
        return (
            <TouchableOpacity style={styles.containerItem}>
                <Text style={{ flex: 0.5 }}>{I18n.t('colNum')}</Text>
                <Text style={styles.txtItem}>{I18n.t('transactionId')}</Text>
                <Text style={styles.txtItem}>{I18n.t('paymentcode')}</Text>
                <Text style={styles.txtItem}>{I18n.t('paidDate')}</Text>
                <Text style={styles.txtItem}>{I18n.t('paidAmount')}</Text>
                <Text style={styles.txtItem}>{I18n.t('status')}</Text>
            </TouchableOpacity>
        )
    }
    _renderItem(item, id) {
        return (
            <TouchableOpacity style={styles.containerItem} onPress={() => this.onPressToUpload(item)}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ flex: 0.5, fontSize: 15 }}>{I18n.t('colNum')}: {id + 1}</Text>
                    <Text style={styles.txtItem}>{I18n.t('transactionId')}: {item.trans_id}</Text>
                    <Text style={styles.txtItem}>{I18n.t('paymentcode')}: {item.payment_code}</Text>
                    <Text style={styles.txtItem}>{I18n.t('paidDate')}: {item.paid_date}</Text>
                    <Text style={[styles.txtItem]}>{I18n.t('paidAmount')}: {numeral(item.paid_amount).format('0,0')}</Text>
                    <Text style={[styles.txtItem, { color: item.img_status_id == 1 && item.pay_status == 1 ? Colors.green : Colors.red }]}>{I18n.t('status')}: {item.img_status}</Text>
                </View>
                <Ionicons
                    name='ios-arrow-forward'
                    size={26}
                    color={Colors.colorButton}
                />
            </TouchableOpacity>
        )
    }
    ErrorMesseng() { this.refs.ErrorMesseng.onClose() }
    onGetPayment = (value, name) => {
        switch (value) {
            case 'SOKXAY':
                try {
                    RequestField.clearInitField();
                    let agentPhone = RequestField.getValueField(this.props.user.fieldMap, FIELD.PHONE_NUMBER);
                    let accountID = RequestField.getValueField(this.props.user.fieldMap, FIELD.ACCOUNT_ID);
                    RequestField.addToInitField(RequestField.addPhone(agentPhone));
                    RequestField.addToInitField(RequestField.addRequestNo("1"));
                    RequestField.addToInitField(RequestField.addAccountID(accountID));
                    let data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.REQUEST_PAYMENT));
                    this.setState({ isLoading: true, checkInfo: true });
                    this.props.onGetPayment(data);
                } catch (error) {
                    console.log("Error : ", error);
                }
                break;
            case 'NCC':
                try {
                    RequestField.clearInitField();
                    let agentPhone = RequestField.getValueField(this.props.user.fieldMap, FIELD.PHONE_NUMBER);
                    let accountID = RequestField.getValueField(this.props.user.fieldMap, FIELD.ACCOUNT_ID);
                    RequestField.addToInitField(RequestField.addPhone(agentPhone)); //68
                    RequestField.addToInitField(RequestField.addActionNode('7'))//22
                    RequestField.addToInitField(RequestField.addRequestNo("1")); //90
                    RequestField.addToInitField(RequestField.addPhoneLottery(agentPhone))//34
                    RequestField.addToInitField(RequestField.addAccountID(accountID)); //78
                    RequestField.addToInitField(RequestField.addEffectType(1))//103
                    let data = RequestField.addToInitField(RequestField.addProcessCode(ConfigCode.REQUEST_PAYMENT_NCC)); //3
                    this.setState({ isLoading: true, checkInfo: true });
                    this.props.onGetPayment(data);
                } catch (error) {
                    console.log("Error : ", error);
                }
                break;
            default:
                break;
        }
    }
    render() {
        const { isData, isLoading, isDisable, payment_code, listData, txnId, txtStatus, disableValue, ErrorMesseng } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                {isLoading ? <ActivityIndicator /> : null}
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={styles.cardStyle}>
                        <SokxayComponent
                            isSokxayPayment={true}
                            textTransaction={"transactionId"}
                            transactionPlaceholder={"enterTransaction"}
                            textButton={"search"}
                            data={this.state.list_status}
                            paycode={payment_code}
                            txnId={txnId}
                            status={txtStatus}
                            disable={isDisable}
                            disableValue={disableValue}
                            onChangePaymentCode={value => this.onChangePaymentCode(value)}
                            onChangeStatusHandler={value => this.onChangeStatusHandler(value)}
                            onGetPayment={(value, name) => this.onGetPayment(value, name)}
                            onProcessSearch={(startDate, toDate, fullStartDate, fullToDate) => this.onProcessSearch(startDate, toDate, fullStartDate, fullToDate)
                            }
                        />
                    </View>
                    {isData ? (
                        <View style={styles.cardStyle}>
                            <TouchableOpacity style={[styles.rowInfo]}>
                                <Ionicons
                                    name="ios-information-circle"
                                    size={26}
                                    color={Colors.colorButton}
                                    style={styles.iconShowBalance}
                                />
                                <Text style={{ color: Colors.colorButton, fontSize: 15 }}>{I18n.t('Info')}</Text>
                            </TouchableOpacity>
                            <View style={[styles.container, { backgroundColor: Colors.white }]}>
                                <View style={styles.warpList}>
                                    <FlatList
                                        data={listData}
                                        renderItem={({ item, index }) => this._renderItem(item, index)}
                                        extraData={this.state}
                                        keyExtractor={item => item.id}
                                    />
                                </View>
                            </View>
                        </View>

                    ) : null}
                </ScrollView>
                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={ErrorMesseng}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.ErrorMesseng()}
                    ref='ErrorMesseng'
                />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        paymentData: state.sokxay.paymentData,
        dataUpload: state.sokxay.dataUpload
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPassValueRequest: data => {
            dispatch(onPassValueRequest(data));
        },
        onUploadImage: data => {
            dispatch(uploadImage(data));
        },
        onGetPayment: data => {
            dispatch(onGetPaymentInfo(data));
        },
        searchUploadImage: data => {
            dispatch(searchUploadImage(data));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SokxayHome);

// export default SokxayHome
