import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  StatusBar,
  Modal,
} from "react-native";
import { Colors, Images, Metrics } from "../../themes";
import {
  Toast,
  FullNewButton,
  FullTextInput,
  Contacts,
  HeaderTileComponent,
} from "../index";
import styles from "./styles";
import {
  isValidated,
  REMOVE_FIRST_ZERO,
  TRIM_SPACE,
  ONLY_NUMBER,
} from "../../utils/Validate";
import * as Constant from "../../utils/Constant";
import I18n from "react-native-i18n";
import { formatNumber } from "../../utils/Formater";
import { Appbar } from "react-native-paper";
import CheckBox from "react-native-modest-checkbox";
import { ListHistoryPayment, ListHistoryPaymentTopup } from "../../screens";
export default class PaymentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null,
      content: null,
      money: null,
      selectedMoney: null,
      errorPhoneMessage: "",
      secretCode: null,
      message: null,
      secretPlaceholder: "",
      errorSecretMessage: "",
      errorTransNoteMessage: "",
      selectState: Constant.UNITEL,
      ModalContact: false,
      isChecked: false,
      contracPhonetxt: this.props.contracPhone
    };
  }

  onSetPhone(phone) {
    const errorPhone =
      !phone ||
        phone.length < 1 ||
        !isValidated(phone, this.props.validatePhoneConst)
        ? I18n.t(`${this.props.errorPhoneMessage}`)
        : "";
    this.setState({ phone, errorPhone });
  }

  componentDidMount() {
    this.setState({ phone: this.props.getPhoneQR });
  }

  componentWillReceiveProps(nextProps) {
    const { defaultAgentCode } = nextProps;
    if (defaultAgentCode) {
      this.setState({ phone: defaultAgentCode }); // luu so dien thoai
    }
  }
  onPressProcess() {
    const {
      phone,
      money,
      message,
      secretCode,
      errorPhone,
      errorSecretCode,
      errorMoney,
      errorNote,
      selectState,
      receiverPhone,
      isChecked
    } = this.state;
    const {
      footerTextInput,
      phoneOption,
      secretCodeRow,
      transferOtherToOtherScreen,
      CashInScreen,
      cashOutScreen,
      topUpScreen,
      TransferToAgentScreen,
      AgentRequestEMoneyScreen,
      RequestCash,
      AgentCashOut,
      TelecomServiceScreen,
      defaultPhone,
      CashinforAgentBySuperAgent
    } = this.props;
    if (errorPhone || errorSecretCode || errorMoney || errorNote) {
      if (errorPhone) {
        Toast(errorPhone);
      }
      if (errorSecretCode || errorMoney || errorNote) {
        Toast("pleaseInputCorrectField");
      }
    } else {

      if (transferOtherToOtherScreen) {
        if (!money) {
          Toast("pleaseInputToEmptyField");
        } else {
          let saveInfo = isChecked ? 1 : 0
          this.props.onPressProcess(money, message, phone, receiverPhone, saveInfo);
        }
      }

      if (topUpScreen) {
        if (!phone || !money || !selectState) {
          if (!money) {
            Toast("pleaseInputToEmptyField");
          } else if (!phone) {
            if (!defaultPhone) {
              Toast("pleaseInputToEmptyField");
            } else {

              this.props.onPressProcess(defaultPhone, money, selectState);
            }
          }
        } else {
          this.props.onPressProcess(phone, money, selectState);
        }
      }

      if (CashInScreen) {
        if (!phone || !money) {
          Toast("pleaseInputToEmptyField");
        } else {
          let saveInfo = isChecked ? 1 : 0
          this.props.onPressProcess(phone, money, message, saveInfo);
        }
      }

      if (cashOutScreen) {
        if (!phone || !money || !secretCode) {
          Toast("pleaseInputToEmptyField");
        } else {
          let saveInfo = isChecked ? 1 : 0
          this.props.onPressProcess(phone, secretCode, money, message, saveInfo);
        }
      }

      if (TransferToAgentScreen) {
        if (!phone || !money) {
          Toast("pleaseInputToEmptyField");
        } else {
          let saveInfo = isChecked ? 1 : 0
          this.props.onPressProcess(phone, money, message, saveInfo);
        }
      }

      if (AgentRequestEMoneyScreen) {
        if (!phone || !money || !secretCode) {
          Toast("pleaseInputToEmptyField");
        } else {
          let saveInfo = isChecked ? 1 : 0
          this.props.onPressProcess(phone, secretCode, money, message, saveInfo);
        }
      }

      if (RequestCash) {
        if (!phone || !money) {
          Toast("pleaseInputToEmptyField");
        } else {
          let saveInfo = isChecked ? 1 : 0
          this.props.onPressProcess(phone, money, message, saveInfo);
        }
      }
      if (AgentCashOut) {
        if (!phone || !money) {
          Toast("pleaseInputToEmptyField");
        } else {
          let saveInfo = isChecked ? 1 : 0
          this.props.onPressProcess(phone, money, message, saveInfo);
        }
      }
      if (TelecomServiceScreen) {
        let saveInfo = isChecked ? 1 : 0
        this.props.onPressProcess(phone, money, saveInfo);
      }
      if (CashinforAgentBySuperAgent) {
        if (!phone || !money) {
          Toast("pleaseInputToEmptyField");
        } else {
          this.props.onPressProcess(phone, money, message);
        }
      }
    }
  }

  onChangeNumberValue(text) {
    const {
      TelecomServiceScreen,
      AgentCashOut,
      TransferToAgentScreen,
      RequestCash,
      AgentRequestEMoneyScreen,
      CashinforAgentBySuperAgent,
    } = this.props;
    text = text.replace(TRIM_SPACE, "");

    let errorPhone =
      !text ||
        text.length < 3 ||
        !isValidated(text, this.props.validatePhoneConst)
        ? I18n.t(`${this.props.errorPhoneMessage}`)
        : "";
    if (!text) {
      errorPhone = I18n.t("phoneFieldIsWrong");
      if (TelecomServiceScreen) {
        errorPhone = I18n.t("incorrectADSLNumber");
      }

      if (AgentCashOut || TransferToAgentScreen || CashinforAgentBySuperAgent) {
        errorPhone = I18n.t("thisAgentCodeIsIncorrect");
      }
      if (RequestCash || AgentRequestEMoneyScreen) {
        errorPhone = I18n.t("bankCodeNull");
      }
    } else {
      if (
        !TelecomServiceScreen &&
        !AgentCashOut &&
        !TransferToAgentScreen &&
        !RequestCash &&
        !AgentRequestEMoneyScreen &&
        !CashinforAgentBySuperAgent &&
        text.length < 8
      ) {
        errorPhone = I18n.t("phoneNumberIsInvalid");
      }
      else if (this.props.openTxtCheck)
        if (text.length == 9) {

          this.props.checkinfo(text)
        }
    }
    this.setState({ phone: text, errorPhone });
  }

  onChangeNumberPhone(text) {
    const { receiverPhone } = this.state;
    let errorPhoneNumber =
      !text || text.length < 1 || !isValidated(text, Constant.VALIDATE_LAOS)
        ? I18n.t("incorrectPhoneNumber")
        : null;
    if (!text) {
      errorPhoneNumber = I18n.t("phoneFieldIsWrong");
    }
    this.setState({ receiverPhone: text, errorPhoneNumber });
  }

  onChangeAccountValue(text) {
    const { phone } = this.state;
    text = text.replace(TRIM_SPACE, "");
    let errorAccount =
      !text ||
        text.length < 1 ||
        !isValidated(text, this.props.validateAccountConst)
        ? I18n.t(`${this.props.errorAccountMessage}`)
        : "";
    this.setState({ phone: text, errorAccount });
  }
  onChangeSecretCode(text) {
    const { secretCode } = this.state;
    let errorSecretCode =
      !text ||
        text.length < 1 ||
        !isValidated(text, this.props.validateSecretConst)
        ? I18n.t(`${this.props.errorSecretMessage}`)
        : "";
    if (!text) {
      errorSecretCode = I18n.t("bankTransactionIdIncorrect");
    }
    this.setState({ secretCode: text, errorSecretCode });
  }

  onCallContact() {
    const { onPressContact } = this.props;
    if (onPressContact) {
      this.props.onPressContact();
    }
  }
  onChangeAmount(text) {
    const { minAmount } = this.props;
    let errorMoney =
      !text ||
        text.length < 1 ||
        !isValidated(text, this.props.validateMoneyConst)
        ? I18n.t(`${this.props.errorMoneyMessage}`)
        : null;
    text = text.replace(REMOVE_FIRST_ZERO, "");
    text = text.replace(TRIM_SPACE, "");
    text = text.replace(ONLY_NUMBER, "");
    text === "0" ? (text = "") : text;
    let tempText = text;
    let mMoney = parseInt(tempText.replace(/,/g, ""));
    if (minAmount) {
      if (mMoney < minAmount) {
        errorMoney = I18n.t("amountMustbefrom", {
          amount: formatNumber(minAmount + ""),
        });
      }
    }
    this.setState({
      money: formatNumber(text.trim()),
      errorMoney,
      selectedMoney: null,
    });
  }

  onChangeTransactionNote(text) {
    const errorNote = !isValidated(text, this.props.validateTransNote)
      ? I18n.t(`${this.props.errorTransNoteMessage}`)
      : null;
    this.setState({ message: text, errorNote });
  }

  onPressSetMoney(money, id) {
    this.setState({ money: money.trim(), selectedMoney: id, errorMoney: "" });
  }
  onPressUnitel = () => {
    this.setState({ selectState: Constant.UNITEL });
  };
  onPressETL = () => {
    this.setState({ selectState: Constant.ETL });
  };
  onPressLTC = () => {
    this.setState({ selectState: Constant.LTC });
  };
  goBack() {
    this.setState({ ModalContact: false });
  }
  onClearReceiverPhone() {
    this.setState({ receiverPhone: null });
  }
  onClearPhone() {
    this.setState({ ModalContact: true });
  }
  onClearSecretCode() {
    this.setState({ secretCode: null });
  }
  onClearMoney() {
    this.setState({ money: null });
  }
  onClearMessage() {
    this.setState({ message: null });
  }
  onselect = (item) => {
    // console.log('item:', item)
    if (item.entityCode) {
      this.onChangeNumberValue(item.entityCode);
    } else if (item.amount) {
      this.onChangeAmount(item.amount);
    }


  };
  getNumberPhone(phone) {
    if (phone) {
      const str = phone.number;
      const text = str.replace(/[+]/g, "");
      this.onChangeNumberValue(text);
      // console.log(text);
      this.setState({ ModalContact: false });
    } else {
    }
  }
  onPressSetDebtsett(text) {
    text != null ? this.onChangeAmount(text) : null;
  }
  onClick() {
    this.setState({ isChecked: !this.state.isChecked });
  }
  onChangeNumberContact(text) {
    this.setState({ numberContact: text });
  }
  onChangeNameContact(text) {
    this.setState({ NameContact: text });
  }
  onChangePackeg(text) {
    this.setState({ Packeg: text });
  }
  onChangeDebtInfor(text) {
    this.setState({ debtInfor: text });
  }
  onCheckAccount(phone) {
    this.props.onCheckAccount(phone)
  }
  render() {
    const {
      money,
      phone,
      errorPhone,
      errorPhoneNumber,
      message,
      errorSecretCode,
      errorMoney,
      errorNote,
      receiverPhone,
      selectState,
      isChecked,
      selectedMoney
    } = this.state;
    const {
      footerTextInput,
      isPhone,
      textButton,
      secretCodeRow,
      providerView,
      footerScrollDetail,
      topUpScreen,
      newTextphone,
      txtsecretCode,
      txtInput,
      txtInputCode,
      placeholder,
      txtCode,
      inputSecretCode,
      maxLengthPhone,
      showTextInfo,
      contracPhone,
      contractName,
      partnerCode,
      totalAmont,
      isShowMoney,
      amount,
      txtPhone,
      descrip
    } = this.props;
    // console.log('errorPhone:', errorPhone)
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          height: Metrics.height,
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <View style={{ width: "100%", height: null, padding: 10 }}>
          {txtPhone ? (
            <View style={styles.groupInput}>
              <FullTextInput
                label={I18n.t(txtCode)}
                placeholder={I18n.t(txtInputCode)}
                returnKeyType="done"
                keyboardType="numeric"
                value={receiverPhone}
                error={errorPhoneNumber}
                maxLength={maxLengthPhone}
                onChangeUserName={(text) => this.onChangeNumberPhone(text)}
                iconLeft="facebook"
                iconRight="close"
                textError={I18n.t("incorrectPhoneNumber")}
                onclick={() => this.onClearReceiverPhone()}
              />
            </View>
          ) : null}

          {newTextphone ? (
            <View style={styles.groupInput}>
              <FullTextInput
                label={I18n.t(txtCode)}
                placeholder={I18n.t(txtInputCode)}
                returnKeyType="done"
                keyboardType="numeric"
                value={receiverPhone}
                error={errorPhoneNumber}
                maxLength={maxLengthPhone}
                onChangeUserName={(text) => this.onChangeNumberPhone(text)}
                iconLeft="facebook"
                iconRight="close"
                textError={I18n.t("incorrectPhoneNumber")}
                onclick={() => this.onClearReceiverPhone()}
              />
            </View>
          ) : null}
          {providerView ? providerView() : null}
          {!isPhone ? (
            <View style={styles.groupInput}>
              <FullTextInput
                label={I18n.t(txtInput)}
                placeholder={I18n.t(placeholder)}
                returnKeyType="done"
                keyboardType="number-pad"
                value={this.state.phone}
                error={null}
                onChangeUserName={(text) => this.setState({ phone: text })}
                iconLeft="facebook"
                iconRight="account"
                contact={true}
                textError={I18n.t("incorrectPhoneNumber")}
                onclick={() => this.onClearPhone()}
              />
            </View>
          ) : (
            <View style={styles.groupInput}>
              <FullTextInput
                label={I18n.t(txtInput)}
                placeholder={I18n.t(placeholder)}
                returnKeyType="done"
                keyboardType={this.props.keyboardTypeInputPhone}
                value={phone}
                error={errorPhone}
                onChangeUserName={(text) => this.onChangeNumberValue(text)}
                iconLeft="facebook"
                iconRight="account"
                contact={true}
                maxLength={this.props.maxLengthCode}
                textError={I18n.t(`${this.props.errorPhoneMessage}`)}
                onclick={() => this.onClearPhone()}
              />
            </View>
          )}
          {
            this.props.onCheckAccountCashIn && this.props.displayName ? (
              <View style={styles.groupInput}>
                <FullTextInput
                  label={I18n.t(this.props.txtName)}
                  placeholder={I18n.t(this.props.txtName)}
                  returnKeyType="done"
                  value={this.props.displayName}
                  editable={false}
                />
              </View>
            ) : null
          }
          <View>
            {topUpScreen ? (
              <View style={[styles.groupInput, styles.groupInputSub]}>
                <TouchableOpacity
                  style={[
                    styles.btnLogo,
                    {
                      borderColor:
                        selectState == Constant.UNITEL
                          ? Colors.endGradientNav
                          : Colors.steel,
                    },
                  ]}
                  onPress={() => this.onPressUnitel()}
                >
                  <Image
                    source={Images.icUnitel}
                    resizeMode="contain"
                    style={[styles.logo, { height: 40 }]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.btnLogo,
                    {
                      borderColor:
                        selectState == Constant.ETL
                          ? Colors.endGradientNav
                          : Colors.steel,
                    },
                  ]}
                  onPress={() => this.onPressETL()}
                >
                  <Image
                    source={Images.icEtl}
                    resizeMode="contain"
                    style={[styles.logo, { height: 40 }]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.btnLogo,
                    {
                      borderColor:
                        selectState == Constant.LTC
                          ? Colors.startGradientNav
                          : Colors.steel,
                    },
                  ]}
                  onPress={() => this.onPressLTC()}
                >
                  <Image
                    source={Images.icLTC}
                    resizeMode="contain"
                    style={[styles.logo, { height: 40 }]}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          {secretCodeRow ? (
            <View style={styles.groupInput}>
              <FullTextInput
                label={I18n.t(txtsecretCode)}
                placeholder={I18n.t(inputSecretCode)}
                returnKeyType="done"
                keyboardType="default"
                value={this.state.secretCode}
                error={errorSecretCode}
                maxLength={50}
                onChangeUserName={(text) => this.onChangeSecretCode(text)}
                iconLeft="facebook"
                iconRight="close"
                textError={I18n.t("typeTheBankTransactionId")}
                onclick={() => this.onClearSecretCode()}
              />
            </View>
          ) : null}
          {showTextInfo ? (
            <View style={styles.row}>
              <View style={styles.groupInputRow}>
                <View style={styles.txtRow}>
                  <FullTextInput
                    label={I18n.t("numberContact")}
                    placeholder={I18n.t("inputNumberContact")}
                    returnKeyType="done"
                    keyboardType="default"
                    value={errorPhone ? null : contractName}
                    maxLength={100}
                    editable={false}
                    onChangeUserName={(text) =>
                      this.onChangeNumberContact(text)
                    }
                  />
                </View>

                <View style={styles.txtRow}>
                  <FullTextInput
                    label={I18n.t("NameContact")}
                    placeholder={I18n.t("inputNameContact")}
                    returnKeyType="done"
                    keyboardType="default"
                    value={errorPhone ? null : contracPhone}
                    maxLength={100}
                    editable={false}
                    onChangeUserName={(text) => this.onChangeNameContact(text)}
                  />
                </View>
              </View>
              <View style={styles.groupInputRow}>
                <View style={styles.txtRow}>
                  <FullTextInput
                    label={I18n.t("Packeg")}
                    placeholder={I18n.t("inputPackeg")}
                    returnKeyType="done"
                    keyboardType="default"
                    value={errorPhone ? null : partnerCode}
                    maxLength={100}
                    editable={false}
                    onChangeUserName={(text) => this.onChangePackeg(text)}
                  />
                </View>
                <View style={styles.txtRow}>
                  <FullTextInput
                    label={I18n.t("debtInfor")}
                    placeholder={I18n.t("inputDebtInfor")}
                    returnKeyType="done"
                    keyboardType="default"
                    value={errorPhone ? null : totalAmont}
                    maxLength={100}
                    onChangeUserName={(text) => this.onChangeDebtInfor(text)}
                    editable={false}
                  />
                </View>
              </View>
            </View>
          ) : null}
          {descrip == 6 || descrip == 12 ? (
            <View style={{ backgroundColor: Colors.backgroundList, padding: 3 }}>
              <Text>{I18n.t('amount')}</Text>
              <Text style={{ color: Colors.red, fontStyle: 'italic' }}>{I18n.t('notePaymentInternet')}</Text>
            </View>
          ) : null}

          {/* Amonut  */}
          <View style={styles.groupInput}>
            <FullTextInput
              label={I18n.t(`${this.props.amountPlaceholder}`)}
              placeholder={I18n.t(`${this.props.txtAmount}`)}
              returnKeyType="done"
              keyboardType="number-pad"
              value={descrip == 6 || descrip == 12 ? totalAmont : this.state.money}
              error={errorMoney}
              onChangeUserName={(text) => this.onChangeAmount(text)}
              iconLeft="facebook"
              iconRight="close"
              maxLength={this.props.maxLengthMoney}
              textError={I18n.t("amountMustbefrom", { amount: "3,000" })}
              onclick={() => this.onClearMoney()}
              editable={descrip == 6 || descrip == 12 ? false : true}
              onTouchStart={() => this.props.onCheckAccountCashIn && phone != this.props.getAgentCode ? this.onCheckAccount(phone) : null}
            />
          </View>

          <View style={styles.mainScreen}>
            {isShowMoney ? (
              <View>
                <View
                  style={styles.rowMoney}
                  pointerEvents={this.state.visibleView ? "none" : "auto"}
                >
                  <View
                    style={[styles.warpButtonMoney, { alignItems: "flex-start" }]}
                  >
                    <TouchableOpacity
                      onPress={() => this.onPressSetDebtsett(totalAmont)}
                      style={[
                        styles.buttonMoney,
                        selectedMoney === 0
                          ? styles.backgroundBtnMoney
                          : styles.btnMoney,
                      ]}
                      disabled={descrip == 6 || descrip == 12 ? true : false}
                    >
                      <Text
                        style={[
                          styles.txtMoney,
                          selectedMoney === 0 ? styles.txtMoneySelected : null,
                        ]}
                        disabled={descrip == 6 || descrip == 12 ? true : false}
                      >
                        {I18n.t("Debtsett")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[styles.warpButtonMoney, { alignItems: "flex-start" }]}
                  >
                    <TouchableOpacity
                      onPress={() => this.onPressSetMoney(amount && amount[3], 3)}
                      style={[
                        styles.buttonMoney,
                        selectedMoney === 3
                          ? styles.backgroundBtnMoney
                          : styles.btnMoney,
                      ]}
                      disabled={descrip == 6 || descrip == 12 ? true : false}
                    >
                      <Text
                        style={[
                          styles.txtMoney,
                          selectedMoney === 3 ? styles.txtMoneySelected : null,
                        ]}
                        disabled={descrip == 6 || descrip == 12 ? true : false}
                      >
                        {amount && amount[3]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.warpButtonMoney}>
                    <TouchableOpacity
                      onPress={() => this.onPressSetMoney(amount && amount[4], 4)}
                      style={[
                        styles.buttonMoney,
                        selectedMoney === 4
                          ? styles.backgroundBtnMoney
                          : styles.btnMoney,
                      ]}
                      disabled={descrip == 6 || descrip == 12 ? true : false}
                    >
                      <Text
                        style={[
                          styles.txtMoney,
                          selectedMoney === 4 ? styles.txtMoneySelected : null,
                        ]}
                        disabled={descrip == 6 || descrip == 12 ? true : false}
                      >
                        {amount && amount[4]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[styles.warpButtonMoney, { alignItems: "flex-end" }]}
                  >
                    <TouchableOpacity
                      onPress={() => this.onPressSetMoney(amount && amount[5], 5)}
                      style={[
                        styles.buttonMoney,
                        selectedMoney === 5
                          ? styles.backgroundBtnMoney
                          : styles.btnMoney,
                      ]}
                      disabled={descrip == 6 || descrip == 12 ? true : false}
                    >
                      <Text
                        style={[
                          styles.txtMoney,
                          selectedMoney === 5 ? styles.txtMoneySelected : null,
                        ]}
                        disabled={descrip == 6 || descrip == 12 ? true : false}
                      >
                        {amount && amount[5]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : null}
          </View>

          {footerTextInput ? (
            <View style={styles.groupInput}>
              <FullTextInput
                label={I18n.t("leaveMessageTitle")}
                placeholder={I18n.t("leaveMessage")}
                returnKeyType="done"
                keyboardType="default"
                value={message}
                error={errorNote}
                onChangeUserName={(text) => this.onChangeTransactionNote(text)}
                iconLeft="facebook"
                iconRight="close"
                textError={I18n.t(`${this.props.errorTransNoteMessage}`)}
                onclick={() => this.onClearMessage()}
              />
            </View>
          ) : null}
          {this.props.openCheckBox ? (
            <View style={styles.groupInput}>
              <CheckBox
                labelStyle={{ color: Colors.textColor, fontSize: 13 }}
                checked={isChecked}
                label={I18n.t("saveInfo")}
                onChange={() => this.onClick()}
                checkedImage={Images.icCheckedBox}
                uncheckedImage={Images.icUncheckedBox}
                checkboxStyle={{ opacity: 0.6 }}
              />
            </View>
          ) : null}
        </View>
        {this.props.openSaveInfo ?
          <View>
            <HeaderTileComponent txtHeader="LatestRecipients" />
            <View style={{ width: "100%", height: null, padding: 10 }}>
              <ListHistoryPaymentTopup processCode={this.props.processCode} onselect={(item) => this.onselect(item)} serverCode='FTT' />
            </View>
          </View>
          : this.props.opentHistoryPayment ?
            (
              <View>
                <HeaderTileComponent txtHeader="LatestRecipients" />
                <View style={{ width: "100%", height: null, padding: 10 }}>
                  <ListHistoryPayment processCode={this.props.processCode} onselect={(item) => this.onselect(item)} />
                </View>
              </View>
            ) : null
        }
        {
          totalAmont == 0 ? null : (
            <View style={{ width: "100%", height: null, padding: 10 }}>
              {footerScrollDetail ? footerScrollDetail() : null}
              <FullNewButton
                text={I18n.t(`${textButton}`)}
                onPress={() => this.onPressProcess()}
                isDisable={descrip == 6 || descrip == 12 ? errorPhone : !phone || !money || errorMoney || errorPhone || errorNote
                  ? true
                  : false
                }
              />
            </View>
          )

        }


        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.ModalContact}
          onRequestClose={() => {
            this.setState({ ModalContact: false });
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView3}>
              <Appbar.Header style={{ backgroundColor: Colors.white }}>
                <Appbar.BackAction onPress={() => this.goBack()} />
                <Appbar.Content title={I18n.t("contact")} />
              </Appbar.Header>
              <Contacts
                getNumberPhone={(phone) => this.getNumberPhone(phone)}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
PaymentComponent.defaultProps = {
  txtSenderPhone: "senderPhone",
  firstHeader: "phoneNumber",
  textButton: "",
  errorPhoneMessage: "incorrectPhoneNumber",
  phonePlaceholder: "inputThePhoneHere",
  validatePhoneConst: Constant.VALIDATE_PHONE,
  validateSecretConst: Constant.VALIDATE_NORMAL_CHAR,
  validateTransNote: Constant.VALIDATE_NON_SPECIAL,
  labelSecret: "secretCode",
  secretPlaceholder: "typeYourSecretCodeHere",
  errorSecretMessage: "incorrectSecretCode",
  amount: ["3,000", "5,000", "10,000", "20,000", "30,000", "50,000"],
  keyboardTypeInputPhone: "number-pad",
  amountLabel: "amount",
  amountPlaceholder: "enterOrChoseTheMoney",
  errorMoneyMessage: "incorrectMoneyCode",
  errorTransNoteMessage: "nameIsNotEmpty",
  validateMoneyConst: Constant.VALIDATE_MONEY,
  errorAgentIdMessage: "agentCodeIncorrect",
  validateAccountConst: Constant.VALIDATE_NUMERIC,
  errorAccountMessage: "incorrectADSLNumber",
};

PaymentComponent.propTypes = {
  // getPhotos: PropTypes.bool
};
