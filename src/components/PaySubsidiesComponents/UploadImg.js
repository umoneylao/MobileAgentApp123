import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { CardView, ActivityIndicator, FullTextInput, FullNewButton } from '../../components'
import { Colors, Images, Metrics, Fonts } from '../../themes'
import I18n from 'react-native-i18n'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Constant from '../../utils/Constant'
import { formatNumber } from '../../utils/Formater'
import { isValidated, REMOVE_FIRST_ZERO, TRIM_SPACE, ONLY_NUMBER } from '../../utils/Validate'
import Modal from 'react-native-modal';

const listStatus = [
    {
        id: 1,
        title: 'Cardholder'
    },
    {
        id: 2,
        title: 'Substitute'
    }
]
const listGender = [
    { id: 1, sex: 'male' }, { id: 2, sex: 'female' }
]
const listDocType = [
    { id: 1, DocType: 'identityCard' }, { id: 2, DocType: 'passportID' }, { id: 3, DocType: 'familyBook' }
]

const listPaymentTyple = [
    { id: 1, paymentTyple: 'ReceiveCash' }, { id: 3, paymentTyple: 'UmoneyTransfer' }, { id: 2, paymentTyple: 'BankTransfer' }
]
const listType = [
    {
        id: 1,
        Type: 'Head'
    },
    {
        id: 2,
        Type: 'Wife'
    },
    {
        id: 3,
        Type: 'ParentParentInLaw'
    },
    {
        id: 4,
        Type: 'SonDaughter'
    },
    {
        id: 5,
        Type: 'SonInLawDaughterInLaw'
    },
    {
        id: 6,
        Type: 'BrotherSister'
    },
    {
        id: 7,
        Type: 'BrotherInLawSisterInLaw'
    },
    {
        id: 8,
        Type: 'NonRelatives'
    },
    {
        id: 9,
        Type: 'Child'
    },
    {
        id: 10,
        Type: 'Grandchild'
    },
    {
        id: 11,
        Type: 'Others'
    }

]

class UploadImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_url: null,
            isLoading: false,
            titleSelect: null,
            modalVisible: false,
            txtRelationships: null,
            modalVisibleRelationships: false,
            statusSet: null,
            txtGender: null,
            modalVisibleGender: false,
            txtType: null,
            modalVisibleType: false,
            modalVisiblePaymentTyple: false,
            txtPaymentTyple: null
        };
    }
    onChangeInputcctID(text) {
        const errorCCTID = !text || text.length < 1 || text.length > 30 || !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ cctID: text, errorCCTID })
    }
    onChangeInputPaper(text) {
        const errorPaper = !text || text.length < 1 || text.length > 30 || !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ txtPaper: text, errorPaper })
    }
    onChangeInputName(text) {
        const errorName = !text || text.length < 1 || text.length > 30 || !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ txtName: text, errorName })
    }
    onChangeInputAddress(text) {
        const errorcusAddress = !text || text.length < 1 || text.length > 30 || !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ cusAddress: text, errorcusAddress })
    }
    onChangeInputTransactionNote(text) {
        const errortransactionNote = !text || text.length < 1 || text.length > 30 || !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ transactionNote: text, errortransactionNote })
    }
    onChangeInputMoney = (text) => {
        const { minAmount, maxAmount } = this.props;
        let errorMoney = !text || text.length < 1 ||
            !isValidated(text, Constant.VALIDATE_MONEY) ? I18n.t('enterMoney') : null;

        text = text.replace(REMOVE_FIRST_ZERO, '');
        text = text.replace(TRIM_SPACE, '');
        text = text.replace(ONLY_NUMBER, '');

        text === '0' ? (text = '') : text;
        let tempText = text;
        let mMoney = parseInt(tempText.replace(/,/g, ''));
        if (minAmount) {
            let checkAmount = parseInt(mMoney) % 1000
            if (checkAmount != 0) {
                errorMoney = I18n.t('formatAmount')
            }
            if (mMoney < minAmount) {
                errorMoney = I18n.t('amountMustbefrom', { amount: formatNumber(minAmount + "") });
            }
            if (mMoney > maxAmount) {
                errorMoney = I18n.t('amountMax', { amount: formatNumber(maxAmount + "") });
            }
        }
        this.setState({ Money: formatNumber(text.trim()), errorMoney })

    }
    onPressProcess() {

        const { txtGender, txtRelationships, txtType, txtName, transactionNote, cusAddress, txtPaymentTyple, titleSelect, statusSet } = this.state
        if (statusSet == 2) {
            const Toname = I18n.t(txtRelationships) + '|' + I18n.t(titleSelect) + '|' + cusAddress
            const FromName = I18n.t(txtType) + '|' + transactionNote + '|' + I18n.t(txtPaymentTyple)
            this.props.onPressProcess(Toname, FromName, txtGender, txtName, transactionNote)
        } else {
            this.props.onPressProcess()
        }
    }
    onPressTakePhoto() {
        this.props.onPressTakePhoto()
    }
    chooseAnotherPhoto() {
        this.props.chooseAnotherPhoto()
    }
    renderImage = () => {
        if (this.state.image_url != null) {
            return (
                <View style={styles.groupInput}>
                    <CardView style={styles.cardImageContainer}>
                        {
                            this.props.image != null ?
                                <Image source={{uri: this.props.image}} style={styles.cardImage} />
                                : <Image source={{ uri: this.state.image_url }} style={styles.cardImage} />
                        }
                    </CardView>
                </View>
            )
        } else if (this.props.image != null) {
            return (
                <View style={styles.groupInput}>
                    <CardView style={styles.cardImageContainer}>
                        <Image source={{uri: this.props.image}} style={styles.cardImage} />
                    </CardView>
                </View>
            )
        }
    }


    onStatus() {
        this.setState({ modalVisible: true })
    }
    onRelationships() {
        this.setState({ modalVisibleRelationships: true })
    }
    onType() {
        this.setState({ modalVisibleType: true })
    }
    onPaymentTyple() {
        this.setState({ modalVisiblePaymentTyple: true })
    }
    onGender() {
        this.setState({ modalVisibleGender: true })
    }


    onCloseStatus() {
        this.setState({ modalVisible: false })
    }
    onCloseRelationships() {
        this.setState({ modalVisibleRelationships: false })
    }
    onCloseDocType() {
        this.setState({ modalVisibleType: false })
    }
    onCloseGender() {
        this.setState({ modalVisibleGender: false })
    }
    onClosePaymentTyple() {
        this.setState({ modalVisiblePaymentTyple: false })
    }
    selectStatus(title, id) {
        this.setState({ titleSelect: title, modalVisible: false, statusSet: id })
    }
    selectRelationships(Relationships) {
        this.setState({ txtRelationships: Relationships, modalVisibleRelationships: false })
    }
    selectDocType(txtType) {
        this.setState({ txtType: txtType, modalVisibleType: false })
    }
    selectGender(sex) {
        this.setState({ txtGender: sex, modalVisibleGender: false })
    }
    selectPayment(text) {
        this.setState({ txtPaymentTyple: text, modalVisiblePaymentTyple: false })
    }



    renderItemStatus(item, index) {
        return (
            <View>
                <TouchableOpacity style={styles.warpItemList} onPress={() => this.selectStatus(item.title, item.id)}>
                    <Text style={styles.txtIcon} numberOfLines={1} >{I18n.t(item.title)}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderItemRelationships(item, index) {
        return (
            <View>
                <TouchableOpacity style={styles.warpItemList} onPress={() => this.selectRelationships(item.Type)}>
                    <Text style={styles.txtIcon} numberOfLines={1} >{I18n.t(item.Type)}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderItemlistDocType(item, index) {
        return (
            <View>
                <TouchableOpacity style={styles.warpItemList} onPress={() => this.selectDocType(item.DocType)}>
                    <Text style={styles.txtIcon} numberOfLines={1} >{I18n.t(item.DocType)}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderItemGender(item, index) {
        return (
            <View>
                <TouchableOpacity style={styles.warpItemList} onPress={() => this.selectGender(item.sex)}>
                    <Text style={styles.txtIcon} numberOfLines={1} >{I18n.t(item.sex)}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderItemlistPaymentTyple(item, index) {
        return (
            <View>
                <TouchableOpacity style={styles.warpItemList} onPress={() => this.selectPayment(item.paymentTyple)}>
                    <Text style={styles.txtIcon} numberOfLines={1} >{I18n.t(item.paymentTyple)}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onClearPhone() {

    }
    onClearName() { this.setState({ txtName: null }) }
    onClearPhone() { }
    onClearPaper() { this.setState({ txtPaper: null }) }
    onClearCusAddress() { this.setState({ cusAddress: null }) }
    onClearTransactionNote() { this.setState({ transactionNote: null }) }
    render() {
        const { errorCCTID, cctID, errorMoney, Money, isLoading, titleSelect,
            txtRelationships, statusSet, txtGender, txtType, errorPaper, txtPaper, cusAddress,
            errorcusAddress, errortransactionNote, transactionNote, errorName, txtName, txtPaymentTyple, } = this.state
        return (
            <View style={styles.container}>
                {isLoading ? <ActivityIndicator /> : null}
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={styles.cardStyle}>
                        <View style={styles.groupInput} pointerEvents="none">
                            <View style={styles.txtGruod}>
                                <FullTextInput
                                    label={I18n.t('labelcctID')}
                                    placeholder={I18n.t('txtinputcctID')}
                                    returnKeyType='done'
                                    keyboardType='numeric'
                                    value={this.props.valueCTTID}
                                    error={errorCCTID}
                                    onChangeUserName={(text) => this.onChangeInputcctID(text)}
                                    iconLeft='facebook'
                                    maxLength={30}
                                    iconRight='close'
                                    textError={I18n.t('someFieldIsEmptyOrInvalid')}
                                    onclick={() => this.onClearPhone()}

                                />
                            </View>
                            <View style={styles.txtGruod}>
                                <FullTextInput
                                    label={I18n.t('amount')}
                                    placeholder={I18n.t('amount')}
                                    returnKeyType='done'
                                    keyboardType='numeric'
                                    value={this.props.balance}
                                    error={errorMoney}
                                    maxLength={20}
                                    onChangeUserName={(text) => this.onChangeInputMoney(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    textError={I18n.t('incorrectMoneyCode')}
                                    onclick={() => this.onClearPhone()}

                                />
                            </View>
                        </View>
                        <View style={{ top: -14, marginBottom: 20 }}>
                            {/* <Text style={styles.txtLabelCombo}>{I18n.t('typePayment')}</Text> */}
                            <TouchableOpacity style={styles.selectStats} onPress={() => this.onPaymentTyple()}>
                                <View style={styles.rowType}>
                                    <Text style={styles.txtStats}>{txtPaymentTyple != null ? I18n.t(txtPaymentTyple) : I18n.t('selectTypePayment')}</Text>
                                    <Ionicons name='chevron-down' size={25} style={{ marginRight: 10 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ top: -14, marginBottom: 5 }}>
                            {/* <Text style={styles.txtLabel}>{I18n.t('RecipientType')}</Text> */}
                            <TouchableOpacity style={styles.selectStats} onPress={() => this.onStatus()}>
                                <View style={styles.rowType}>
                                    <Text style={styles.txtStats}>{titleSelect != null ? I18n.t(titleSelect) : I18n.t('SelectRecipientType')}</Text>
                                    <Ionicons name='chevron-down' size={25} style={{ marginRight: 10 }} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        {statusSet == 2 ? (

                            <View>
                                <View style={styles.txtGruod}>
                                    <FullTextInput
                                        label={I18n.t('RecipientName')}
                                        placeholder={I18n.t('inputRecipientName')}
                                        returnKeyType='done'
                                        keyboardType='default'
                                        value={txtName}
                                        error={errorName}
                                        maxLength={30}
                                        onChangeUserName={(text) => this.onChangeInputName(text)}
                                        iconLeft='facebook'
                                        iconRight='close'
                                        textError={I18n.t('someFieldIsEmptyOrInvalid')}
                                        onclick={() => this.onClearName()}
                                    />
                                </View>



                                <View style={styles.layoutCenterGroup}>
                                    <View style={styles.layoutLeft}>
                                        <View style={styles.groupInput}>
                                            {/* <Text style={styles.txtLabelCombo}>{I18n.t('gender')}</Text> */}
                                            <TouchableOpacity style={styles.selectStats} onPress={() => this.onGender()}>
                                                <View style={styles.rowType}>
                                                    <Text style={styles.txtStats}>{txtGender != null ? I18n.t(txtGender) : I18n.t('gender')}</Text>
                                                    <Ionicons name='chevron-down' size={25} style={{ marginRight: 10 }} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.groupInput}>
                                            {/* <Text style={styles.txtLabelCombo}>{I18n.t('type')}</Text> */}
                                            <TouchableOpacity style={styles.selectStats} onPress={() => this.onType()}>
                                                <View style={styles.rowType}>
                                                    <Text style={styles.txtStats}>{txtType != null ? I18n.t(txtType) : I18n.t('DocType')}</Text>
                                                    <Ionicons name='chevron-down' size={25} style={{ marginRight: 10 }} />

                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.layoutRight}>

                                        <View style={styles.groupInputCom}>
                                            {/* <Text style={styles.txtLabelCombo}>{I18n.t('ContactCardholders')}</Text> */}
                                            <TouchableOpacity style={styles.selectStats} onPress={() => this.onRelationships()}>
                                                <View style={styles.rowType}>
                                                    <Text style={styles.txtStats}>{txtRelationships != null ? I18n.t(txtRelationships) : I18n.t('Choose')}</Text>
                                                    <Ionicons name='chevron-down' size={25} style={{ marginRight: 10 }} />
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                        <View style={styles.groupInputCom}>
                                            <FullTextInput
                                                label={I18n.t('identificationInformation')}
                                                placeholder={I18n.t('identificationInformationHint')}
                                                returnKeyType='done'
                                                keyboardType='default'
                                                value={txtPaper}
                                                error={errorPaper}
                                                maxLength={30}
                                                onChangeUserName={(text) => this.onChangeInputPaper(text)}
                                                iconLeft='facebook'
                                                iconRight='close'
                                                textError={I18n.t('someFieldIsEmptyOrInvalid')}
                                                onclick={() => this.onClearPaper()}

                                            />
                                        </View>

                                    </View>
                                </View>
                                <View style={styles.txtGruod}>
                                    <FullTextInput
                                        label={I18n.t('cusAddress')}
                                        placeholder={I18n.t('inputRecipientAddess')}
                                        returnKeyType='done'
                                        keyboardType='default'
                                        value={cusAddress}
                                        error={errorcusAddress}
                                        onChangeUserName={(text) => this.onChangeInputAddress(text)}
                                        iconLeft='facebook'
                                        iconRight='close'
                                        maxLength={30}
                                        textError={I18n.t('someFieldIsEmptyOrInvalid')}
                                        onclick={() => this.onClearCusAddress()}

                                    />
                                </View>
                                <View style={styles.txtGruod}>
                                    <FullTextInput
                                        label={I18n.t('transactionNote')}
                                        placeholder={I18n.t('leaveMessage')}
                                        returnKeyType='done'
                                        keyboardType='default'
                                        value={transactionNote}
                                        error={errortransactionNote}
                                        maxLength={30}
                                        onChangeUserName={(text) => this.onChangeInputTransactionNote(text)}
                                        iconLeft='facebook'
                                        iconRight='close'
                                        textError={I18n.t('someFieldIsEmptyOrInvalid')}
                                        onclick={() => this.onClearTransactionNote()}

                                    />
                                </View>
                            </View>
                        ) : null}
                        <View style={styles.groupInput}>
                            {this.props.balance == "0 " || this.props.balance == "0" ?
                                <View>
                                    <Text style={styles.txtBalan}>{I18n.t('amountNotenough')}</Text>
                                </View>
                                :
                                <View>
                                    {this.props.image != null ? null :
                                        <View style={styles.imgCammera}>
                                            <TouchableOpacity style={styles.iconCammera} onPress={() => this.onPressTakePhoto()}>
                                                <Ionicons size={35} name='ios-camera' color={Colors.white} />
                                                {/* ios-image ios-camera */}
                                                {/* <Text style={styles.buttonText}>{I18n.t('takePhoto')}</Text> */}
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    {this.props.image != null ? this.renderImage() : this.renderImage()}
                                    {this.props.image != null ? <View style={styles.txtCancalPro}>
                                        <TouchableOpacity onPress={() => this.chooseAnotherPhoto()} style={styles.chooseAnotherPhoto}>
                                            <Text>{I18n.t('chooseAnotherPicture')}</Text>
                                        </TouchableOpacity>
                                    </View> : null}
                                    {
                                        statusSet == 2 ? (
                                            <FullNewButton
                                                text={I18n.t('txtNext')}
                                                textStyle={styles.txtButton}
                                                onPress={() => this.onPressProcess()}
                                                isDisable={(this.props.image != null && !errorPaper && !errorcusAddress && !errorName && txtRelationships != null && txtPaymentTyple != null && titleSelect != null && txtGender != null && txtType != null ? false : true)}

                                            />
                                        ) :
                                            (
                                                <FullNewButton
                                                    text={I18n.t('txtNext')}
                                                    textStyle={styles.txtButton}
                                                    onPress={() => this.onPressProcess()}
                                                    isDisable={(this.props.image != null && txtPaymentTyple != null && titleSelect != null ? false : true)}

                                                />
                                            )
                                    }

                                </View>

                            }
                        </View>
                    </View>
                </ScrollView>
                <Modal isVisible={this.state.modalVisible} onBackButtonPress={() => this.setState({ modalVisible: false, pageIndex: 0 })}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.modelMain}>
                            <View style={{ padding: 30, }}>
                                <FlatList
                                    data={listStatus}
                                    renderItem={({ item, index }) => this.renderItemStatus(item, index)}
                                    keyExtractor={(item, index) => item.id.toString()}
                                />
                            </View>
                            <TouchableOpacity style={styles.btnFooter} onPress={() => this.onCloseStatus()}>
                                <Text style={styles.txtCancel}>{I18n.t('cancel')}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
                <Modal isVisible={this.state.modalVisibleRelationships} onBackButtonPress={() => this.setState({ modalVisibleRelationships: false, pageIndex: 0 })}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.modelMain}>
                            <View style={{ padding: 30, }}>
                                <FlatList
                                    data={listType}
                                    renderItem={({ item, index }) => this.renderItemRelationships(item, index)}
                                    keyExtractor={(item, index) => item.id.toString()}
                                />
                            </View>
                            <TouchableOpacity onPress={() => this.onCloseRelationships()} style={styles.btnFooter}>
                                <Text style={styles.txtCancel}>{I18n.t('cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.modalVisibleType} onBackButtonPress={() => this.setState({ modalVisibleType: false, pageIndex: 0 })}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.modelMain}>
                            <View style={{ padding: 30, }}>
                                <FlatList
                                    data={listDocType}
                                    renderItem={({ item, index }) => this.renderItemlistDocType(item, index)}
                                    keyExtractor={(item, index) => item.id.toString()}
                                />
                            </View>
                            <TouchableOpacity onPress={() => this.onCloseDocType()} style={styles.btnFooter}>
                                <Text style={styles.txtCancel}>{I18n.t('cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.modalVisibleGender} onBackButtonPress={() => this.setState({ modalVisibleGender: false, pageIndex: 0 })}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.modelMain}>
                            <View style={{ padding: 30, }}>
                                <FlatList
                                    data={listGender}
                                    renderItem={({ item, index }) => this.renderItemGender(item, index)}
                                    keyExtractor={(item, index) => item.id.toString()}
                                />
                            </View>
                            <TouchableOpacity onPress={() => this.onCloseGender()} style={styles.btnFooter}>
                                <Text style={styles.txtCancel}>{I18n.t('cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


                <Modal isVisible={this.state.modalVisiblePaymentTyple} onBackButtonPress={() => this.setState({ modalVisiblePaymentTyple: false, pageIndex: 0 })}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.modelMain}>
                            <View style={{ padding: 30, }}>
                                <FlatList
                                    data={listPaymentTyple}
                                    renderItem={({ item, index }) => this.renderItemlistPaymentTyple(item, index)}
                                    keyExtractor={(item, index) => item.id.toString()}
                                />
                            </View>
                            <TouchableOpacity onPress={() => this.onClosePaymentTyple()} style={styles.btnFooter}>
                                <Text style={styles.txtCancel}>{I18n.t('cancel')}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>


            </View>
        );
    }
}

export default UploadImg;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardStyle: {
        margin: 20
    },
    groupInput: {
        marginBottom: 20
    },
    groupInputCom: {
        marginBottom: 13,
        width: '95%',
        alignSelf: 'flex-end'
    },
    txtLabel: {
        color: Colors.textInputLabelColor,
        fontSize: Fonts.size.medium
    },
    txtLabelCombo: {
        color: Colors.textInputLabelColor,
        fontSize: Fonts.size.medium,
        marginBottom: 5
    },
    buttonStyle: {
        flexDirection: 'row',
        borderRadius: 10,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgCammera: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconCammera: {
        width: 80,
        height: 60,
        backgroundColor: Colors.steel,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        alignContent: 'center',
        color: Colors.white,
    },
    cardImageContainer: {
        flex: 1,
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
    txtBalan: {
        color: Colors.error,
        fontSize: Metrics.small
    },
    txtCancalPro: {
        justifyContent: 'center'
    },
    chooseAnotherPhoto: {
        alignItems: 'center',
        marginBottom: Metrics.baseMargin
    },

    ///add
    warpItemList: {
        padding: 10
    },
    selectStats: {
        width: '100%',
        height: 55,
        borderRadius: 5,
        backgroundColor: Colors.bgLight,
        justifyContent: 'center'
    },
    rowType: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        padding: 5,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        borderRadius: 4,
        width: '100%',
        alignSelf: 'flex-end',
        marginVertical: Metrics.smallMargin
    },
    txtStats: {
        padding: 5,
        left: 5
    },
    layoutCenterGroup: {
        flexDirection: 'row',
    },
    layoutLeft: {
        flex: 0.7,
    },
    layoutRight: {
        flex: 1,
    },
    txtGruod: {
        marginBottom: 20
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
    txtButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }

})
