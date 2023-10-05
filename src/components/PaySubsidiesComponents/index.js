import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { FullNewButton, FullTextInput } from '../../components'
import { Colors, Images, Metrics, Fonts } from '../../themes'
import I18n from 'react-native-i18n'
import { isValidated } from '../../utils/Validate'
import * as Constant from '../../utils/Constant'
import { CONFIRM_PIN } from '../../actions/types';
import { baseUpload } from '../../utils/Api'

class PaySubsidiesComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cctID:''
        };
    }
    onChangeInputcctID(text) {
        const errorCCTID = !text || text.length < 1 || text.length > 100 || !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ cctID: text, errorCCTID })
    }
    onChangeInputFullName(text) {
        const errorFullName = !text || text.length < 1 || text.length > 100 || !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ fullName: text, errorFullName })
    }
    onChangeInputProvince(text) {
        const errorProvince = !text || text.length < 1 || text.length > 100 || !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ Province: text, errorProvince })
    }
    onChangeInputDistrict(text) {
        const errorDistrict = !text || text.length < 1 || text.length > 100 || !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ District: text, errorDistrict })
    }
    onChangeInputVillageName(text) {
        const errorVillageName = !text || text.length < 1 ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ VillageName: text, errorVillageName })
    }
    onChangeInputDocType(text) {
        const errorDocType = !text || text.length < 1 || text.length > 30 || !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ DocType: text, errorDocType })
    }
    onChangeInpuDocumentNumber(text) {
        const errorDocumentNumber = !text || text.length < 1 || text.length > 30 || !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ DocumentNumber: text, errorDocumentNumber })
    }
    onChangeInputDateOfIssue(text) {
        const errorDateOfIssue = !text || text.length < 1 || text.length > 30 ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ DateOfIssue: text, errorDateOfIssue })
    }
    onChangeInputerIssueBy(text) {
        const errorIssueBy = !text || text.length < 1 || text.length > 30 || !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('pleaseInputCorrectField') : null
        this.setState({ IssueBy: text, errorIssueBy })
    }
    onPressProcess() {
        this.props.onNextPagUpload()
    }
    onClearCTTID() { this.setState({ valueCTTID: null }) }
    onClearFullname() { this.setState({ valueFullname: null }) }
    onClearProvince() { this.setState({ valueProvince: null }) }
    onClearDistrict() { this.setState({ valueDistrict: null }) }
    onClearVillageName() { this.setState({ valueVillageName: null }) }
    onClearDocType() { this.setState({ valueDocType: null }) }
    onClearDocumentNumber() { this.setState({ valueDocumentNumber: null }) }
    componentDidMount() {
       
    }

    render() {

        const { errorCCTID, errorFullName, cctID,
            errorProvince, errorDistrict,
            errorVillageName, errorDocType, errorDocumentNumber, errorDateOfIssue, errorIssueBy } = this.state
        const { valueCTTID, valueDocumentNumber } = this.props
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={styles.cardStyle}>
                        <View style={styles.groupInput} pointerEvents="none">
                            <View style={styles.txtGruod}>
                                <FullTextInput
                                    label={I18n.t('labelcctID')}
                                    placeholder={I18n.t('txtinputcctID')}
                                    returnKeyType='done'
                                    keyboardType='numeric'
                                    value={valueCTTID}
                                    error={errorCCTID}
                                    onChangeUserName={(text) => this.onChangeInputcctID(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    textError={I18n.t('someFieldIsEmptyOrInvalid')}
                                    onclick={() => this.onClearCTTID()}

                                />
                            </View>

                            <View style={styles.txtGruod}>
                                <FullTextInput
                                    label={I18n.t('fullName')}
                                    placeholder={I18n.t('enterYourName')}
                                    returnKeyType='done'
                                    keyboardType='numeric'
                                    value={this.props.valueFullname}
                                    error={errorFullName}
                                    onChangeUserName={(text) => this.onChangeInputFullName(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    textError={I18n.t('someFieldIsEmptyOrInvalid')}
                                    onclick={() => this.onClearFullname()}

                                />
                            </View>
                            <View style={styles.layoutCenter}>
                                <View style={styles.layoutLeft}>

                                    <FullTextInput
                                        label={I18n.t('Province')}
                                        placeholder={I18n.t('inputProvince')}
                                        returnKeyType='done'
                                        keyboardType='numeric'
                                        value={this.props.valueProvince}
                                        error={errorProvince}
                                        onChangeUserName={(text) => this.onChangeInputProvince(text)}
                                        iconLeft='facebook'
                                        iconRight='close'
                                        textError={I18n.t('incorrectPhoneNumber')}
                                        onclick={() => this.onClearProvince()}

                                    />
                                </View>
                                <View style={styles.layoutRight}>
                                    <FullTextInput
                                        label={I18n.t('District')}
                                        placeholder={I18n.t('inputDistrict')}
                                        returnKeyType='done'
                                        keyboardType='numeric'
                                        value={this.props.valueDistrict}
                                        error={errorDistrict}
                                        onChangeUserName={(text) => this.onChangeInputDistrict(text)}
                                        iconLeft='facebook'
                                        iconRight='close'
                                        textError={I18n.t('incorrectPhoneNumber')}
                                        onclick={() => this.onClearDistrict()}
                                    />
                                </View>
                            </View>
                            <View style={styles.txtGruod}>
                                <FullTextInput
                                    label={I18n.t('VillageName')}
                                    placeholder={I18n.t('inputVillageName')}
                                    returnKeyType='done'
                                    keyboardType='numeric'
                                    value={this.props.valueVillageName}
                                    error={errorVillageName}
                                    onChangeUserName={(text) => this.onChangeInputVillageName(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    textError={I18n.t('incorrectPhoneNumber')}
                                    onclick={() => this.onClearVillageName()}
                                />
                            </View>
                            <View style={styles.layoutCenter}>
                                <View style={styles.layoutLeft}>
                                    <FullTextInput
                                        label={I18n.t('DocType')}
                                        placeholder={I18n.t('inputDocType')}
                                        returnKeyType='done'
                                        keyboardType='numeric'
                                        value={this.props.valueDocType}
                                        error={errorDocType}
                                        onChangeUserName={(text) => this.onChangeInputDocType(text)}
                                        iconLeft='facebook'
                                        iconRight='close'
                                        textError={I18n.t('incorrectPhoneNumber')}
                                        onclick={() => this.onClearDocType()}
                                    />
                                </View>
                                <View style={styles.layoutRight}>
                                    <FullTextInput
                                        label={I18n.t('DocumentNumber')}
                                        placeholder={I18n.t('inputDocumentNumber')}
                                        returnKeyType='done'
                                        keyboardType='numeric'
                                        value={valueDocumentNumber}
                                        error={errorDocumentNumber}
                                        onChangeUserName={(text) => this.onChangeInpuDocumentNumber(text)}
                                        iconLeft='facebook'
                                        iconRight='close'
                                        textError={I18n.t('incorrectPhoneNumber')}
                                        onclick={() => this.onClearDocumentNumber()}

                                    />
                                </View>
                            </View>
                            <View style={styles.txtGruod}>
                                <FullTextInput
                                    label={I18n.t('DateOfIssue')}
                                    placeholder={I18n.t('inputDateOfIssue')}
                                    returnKeyType='done'
                                    keyboardType='numeric'
                                    value={this.props.valueDateOfIssue}
                                    error={errorDateOfIssue}
                                    onChangeUserName={(text) => this.onChangeInputDateOfIssue(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    textError={I18n.t('incorrectPhoneNumber')}
                                    onclick={() => this.onClearPhone()}

                                />
                            </View>
                            <View style={styles.txtGruod}>
                                <FullTextInput
                                    label={I18n.t('IssueBy')}
                                    placeholder={I18n.t('inputIssueBy')}
                                    returnKeyType='done'
                                    keyboardType='numeric'
                                    value={this.props.valueIssueBy}
                                    error={errorIssueBy}
                                    onChangeUserName={(text) => this.onChangeInputerIssueBy(text)}
                                    iconLeft='facebook'
                                    iconRight='close'
                                    textError={I18n.t('incorrectPhoneNumber')}
                                    onclick={() => this.onClearPhone()}

                                />
                            </View>
                            {
                                this.props.valueImg && this.props.valueImg !='-' ?
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={{ uri: baseUpload + 'world_bank/getimage/' + this.props.valueImg }} style={styles.cardImage} resizeMode={'contain'} />
                                    </View>
                                    : null
                            }

                        </View>
                        <View style={styles.groupInput}>
                            <FullNewButton
                                text={I18n.t('txtNext')}
                                textStyle={styles.txtButton}
                                onPress={() => this.onPressProcess()}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default PaySubsidiesComponents;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardStyle: {
        margin: 20,
    },
    groupInput: {
        marginBottom: Metrics.doubleBaseMargin,
    },
    txtLabel: {
        color: Colors.textInputLabelColor,
        fontSize: Fonts.size.medium
    },
    layoutCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    layoutCenterGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    layoutLeft: {
        flex: 0.7,
        margin: Metrics.smallMargin,
    },
    layoutRight: {
        flex: 1,
        margin: Metrics.smallMargin,
    },
    buttonStyle: {
        // flexDirection: 'row',
        // borderRadius: 10,
        // height: 45,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    txtGruod: {
        marginBottom: 10
    },
    txtButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    cardImage: {
        width: 300,
        height: 300,
        borderRadius: 10
    }


})
