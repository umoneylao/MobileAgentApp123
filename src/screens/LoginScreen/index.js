import React, { Component } from "react";
import {
  Text,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  Modal,
  Platform,
} from "react-native";
import { Images, Colors, Fonts, Metrics } from "../../themes";
import { connect } from "react-redux";
import styles from "./styles";
import {
  ActivityIndicator,
  FullTextInput,
  FullButton,
  Notification,
} from "../../components";
import { isValidated } from "../../utils/Validate";
import * as ConfigCode from "../../utils/ConfigCode";
import * as Constant from "../../utils/Constant";
import { FingerIcon } from "../../images/fingerIcon";
import {
  login,
  setInfoAccount,
  setLoggedIn,
  validatePin,
  requestBccs,
  activePin,
  changeLocalLanguage,
  ping,
  changeLanguage,
  requestActive,
  setLoggedInNointernet,
  onCheckBlockDevice,
} from "../../actions/Auth";
import * as FIELD from "../../utils/CoreFieldMap";
import * as RequestField from "../../utils/RequestField";
import _ from "lodash";
import I18n from "react-native-i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeBiometrics from "react-native-biometrics";
import Ionicons from "react-native-vector-icons/Ionicons";
import DeviceInfo, { getManufacturerSync } from "react-native-device-info";
import base64 from "react-native-base64";
import utf8 from "utf8";
import * as Animatable from "react-native-animatable";
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    FullTextInput.defaultProps = FullTextInput.defaultProps || {};
    FullTextInput.defaultProps.allowFontScaling = false;
    this.state = {
      isLoading: false,
      phoneNumber: null, //91100394
      isChecked: false,
      isCorrect: false,
      isScrollLogo: false,
      headerModal: "",
      language: null,
      isPing: false,
      returnedLanguage: null,
      returnedAccountID: null,
      returnedRoleID: null,
      returnedPhoneNumber: null,
      getPhone: null,
      getPin: null,
      userFingerprint: false,
      messageError: null,
      infoNointernet: null,
      setModleNointernet: false,
      getUniqueId: null,
      isCheckedFinger: false,
    };
    setTimeout(async () => {
      try {
        let onPhoneNumber = await AsyncStorage.getItem("phoneNumber");
        let onPinCode = await AsyncStorage.getItem("pinCode");
        let dataInfo = await AsyncStorage.getItem("userInfo");

        this.setState({
          getPhone: onPhoneNumber,
          getPin: onPinCode,
          phoneNumber: onPhoneNumber,
          infoNointernet: dataInfo,
        });
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }

  //DeviceInfo.getModel().   width: Platform.OS == 'android' ? '60%' : '60%',
  componentDidMount() {
    let deviceJSON = {};
    deviceJSON.manufacturer = getManufacturerSync(); //
    deviceJSON.deviceName = DeviceInfo.getDeviceNameSync(); //
    deviceJSON.IpAddress = DeviceInfo.getIpAddressSync(); //
    deviceJSON.product =
      DeviceInfo.getProductSync() === "unknown"
        ? "u-moneyAgent"
        : DeviceInfo.getProductSync();
    deviceJSON.deviceId = DeviceInfo.getDeviceId(); //
    deviceJSON.systemVersion = DeviceInfo.getSystemVersion(); //
    deviceJSON.systemName = DeviceInfo.getSystemName(); //
    deviceJSON.systemName = DeviceInfo.getSystemName(); //  99980911
    deviceJSON.uniqueId = DeviceInfo.getUniqueId(); //
    console.log("---deviceJSON---", deviceJSON);
    this.setState({ deviceJSON });
  }

  onPressOpenFlat() {
    const { localLanguage } = this.props;
    this.props.navigation.navigate("LanguageScreen", { key: localLanguage });
  }
  onChangeNumberPhone(text) {
    const errorPhoneNumber =
      !text || text.length < 1 || !isValidated(text, Constant.VALIDATE_PHONE)
        ? I18n.t("incorrectPhoneNumber")
        : null;
    this.setState({ phoneNumber: text, errorPhoneNumber });
  }
  onClearPhone() {
    this.setState({ phoneNumber: null });
  }
  onSignIn() {
    Keyboard.dismiss();
    const { phoneNumber, errorPhoneNumber, isChecked, infoNointernet } =
      this.state;
    if (infoNointernet) {
      this.setState({ setModleNointernet: true });
    } else {
      if (!phoneNumber || errorPhoneNumber) {
        this.refs.phoneFieldIsWrong.onOpen();
      } else {
        RequestField.addToInitField(RequestField.addPhone(phoneNumber));
        const data = RequestField.addToInitField(
          RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO)
        );
        console.log("  onSignIn:", data);
        this.setState({ isLogin: true, isLoading: true });
        this.props.onLogIn(data);

        RequestField.clearInitField();
      }
    }
  }
  useModel() {
    this.props.setLoggedInNointernet();
    this.setState({ setModleNointernet: false });
  }
  dontUseModel() {
    const { phoneNumber } = this.state;
    try {
      RequestField.addToInitField(RequestField.addPhone(phoneNumber));
      const data = RequestField.addToInitField(
        RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO)
      );
      this.setState({ isLogin: true, isLoading: true });
      this.props.onLogIn(data);
      this.setState({ setModleNointernet: false });
      RequestField.clearInitField();
    } catch (error) {
      console.log(error);
    }
  }

  finger() {
    setTimeout(async () => {
      try {
        // kiểm tra ngôn ngữ hiện hành
        // console.log(I18n.currentLocale());
        let _getPhone = await AsyncStorage.getItem("_getPhone");
        let _getPin = await AsyncStorage.getItem("_getPin");
        if (_getPhone !== null && _getPin !== null) {
          ReactNativeBiometrics.simplePrompt({
            promptMessage:
              I18n.currentLocale() == "vn"
                ? "Vân Tay"
                : I18n.currentLocale() == "lo"
                ? "ເຂົ້າສູ່ລະບົບ"
                : I18n.currentLocale() == "en"
                ? "Biometrics"
                : I18n.currentLocale() == "cn"
                ? "指紋"
                : "Biometrics",
          })
            .then((resultObject) => {
              const { success } = resultObject;
              if (success) {
                let getPhone = _getPhone;
                let getPin = _getPin;
                this.onCheckLoginFingerpring(getPhone, getPin);
              }
            })
            .catch(() => {
              console.log("Errorrrrrrrrr");
            });
        } else {
          this.refs.notFingerprint.onOpen();
        }
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }

  onCheckLoginFingerpring = (getPhone, getPin) => {
    RequestField.addToInitField(RequestField.addPhone(getPhone));
    const data = RequestField.addToInitField(
      RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO)
    ); // 311100
    this.setState({
      isLogin: true,
      isLoading: true,
      getPin,
      userFingerprint: true,
    });
    this.props.onLogIn(data);
    RequestField.clearInitField();
  };
  //check hide show finger icon

  savePhone = async (phoneNumber) => {
    try {
      if (phoneNumber !== "") {
        await AsyncStorage.setItem("phoneNumber", phoneNumber);
      } else {
        alert("ON dat");
      }
    } catch (error) {
      console.log("Error saving data", error);
    }
  };

  onCheckBlockDeviceMobile(phoneNumber) {
    try {
      const { deviceJSON } = this.state;
      DeviceInfo.getUniqueId().then((uniqueId) => {
        let deviceInfo =
          uniqueId +
          "|" +
          deviceJSON.deviceName +
          "|" +
          deviceJSON.systemName +
          "|" +
          deviceJSON.IpAddress +
          "|" +
          deviceJSON.manufacturer +
          "|" +
          deviceJSON.product;
        let deviceID = uniqueId;
        console.log("---deviceID----", deviceID);
        var utf8DeviceInfo = utf8.encode(deviceInfo);
        var utf8DeviceId = utf8.encode(deviceID);
        let encode = base64.encode(utf8DeviceInfo);
        let deviceId = base64.encode(utf8DeviceId);

        if (
          uniqueId &&
          deviceJSON.deviceName &&
          deviceJSON.systemName &&
          deviceJSON.IpAddress &&
          deviceJSON.manufacturer &&
          deviceJSON.product
        ) {
          RequestField.addToInitField(RequestField.addActionNode("1")); //22
          RequestField.addToInitField(RequestField.addPhone(phoneNumber)); //34
          RequestField.addToInitField(RequestField.addFromName(deviceId)); //108
          RequestField.addToInitField(RequestField.addImageName(encode)); // - 101
          const data = RequestField.addToInitField(
            RequestField.addProcessCode(ConfigCode.CHECK_BLOCK_DEVICE)
          );
          this.setState({
            isCheckBleckDeviec: true,
            isLoading: true,
            getUniqueId: deviceId,
          });
          this.props.onCheckBlockDevice(data);
          RequestField.clearInitField();
        } else {
          alert("Can not get device info");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { localLanguage } = this.props;
    const {
      returnedLanguage,
      returnedAccountID,
      returnedRoleID,
      returnedPhoneNumber,
      userFingerprint,
      getPin,
      isRequestPinFringPrint,
      isLoading,
      isCheckBleckDeviec,
      key,
      infoAccount,
      deviceJSON,
      getUniqueId,
    } = this.state;
    this.forceUpdate();
    if (this.state.isChangeLocalLanguage) {
      this.setState({ isChangeLocalLanguage: false });
    }
    if (this.state.isLogin && !nextProps.isFetching) {
      this.setState({ isLogin: false, isLoading: false });
      if (nextProps.user && nextProps.user.responseCode) {
        console.log("1");
        if (nextProps.user && nextProps.user.error === `00000`) {
          console.log("2");
          if (nextProps.user && nextProps.user.responseCode === "00000") {
            console.log("4");
            let infoAccount = nextProps.user;
            let roleId = RequestField.getValueField(
              nextProps.user.fieldMap,
              FIELD.ROLE_ID
            );
            let phoneNumber = RequestField.getValueField(
              nextProps.user.fieldMap,
              FIELD.PHONE_NUMBER
            );
            if (roleId === 1 || roleId === 33 || roleId === 7) {
              let accountId = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.ACCOUNT_ID
              );
              let customerName = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.CUSTOMER_NAME
              );
              let customerGender = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.CUSTOMER_GENDER
              );
              let language = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.LANGUAGE
              );
              let currencyCode = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.CURRENCY_CODE
              );
              let pan = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.PAN
              );
              let agentCode = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.STAFF_CODE
              );
              let parentCode = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.PARENT_CODE
              );
              let message = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.RESPONSE_DESCRIPTION
              );
              let mainAccountID = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.MAIN_ACCOUNT_ID
              );
              const status = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.ACCOUNT_STATUS
              );
              console.log("nextProps.user.fieldMap:", nextProps.user.fieldMap);
              this.setState({
                returnedLanguage: language,
                returnedAccountID: accountId,
                returnedRoleID: roleId,
                returnedPhoneNumber: phoneNumber,
              });
              this.props.setInfoAccount({
                phoneNumber,
                accountId,
                customerName,
                customerGender,
                language,
                currencyCode,
                pan,
                agentCode,
                parentCode,
                roleId,
                mainAccountID,
              });
              console.log("status:", status);

              switch (status) {
                case "REGISTER":
                  this.refs.youMustSetupPinFirst.onOpen();
                  break;
                case "CANCELED":
                  this.refs.error10117.onOpen();
                  break;
                case "ACTIVE":
                  if (this.state.isLoginViaReqActive) {
                    this.props.setLoggedIn();
                    this.props.navigation.goBack(null);
                  } else {
                    if (userFingerprint) {
                      this.onFingerpring(getPin, infoAccount);
                    } else {
                      this.onCheckBlockDeviceMobile(phoneNumber);
                      this.setState({
                        contentModal: "pleaseInputPinToLogin",
                        statusSeason: "active",
                        key: localLanguage,
                        infoAccount: infoAccount,
                      });
                      this.savePhone(phoneNumber);
                    }
                  }
                  break;
                case "INVALID PIN":
                  this.refs.error10114.onOpen();
                  break;
                case "BLOCKED":
                  this.refs.error10118.onOpen();
                  break;
                case "LOCKED":
                  this.refs.state3.onOpen();
                  break;
                case "RESETPIN":
                  this.refs.message.onOpen();
                  this.setState({ stateResetPin: message });
                  break;
                default:
              }
            } else {
              this.refs.phoneIsNotAgentOrSubAgent.onOpen();
            }
          } else {
            let responseCode =
              nextProps.user && nextProps.user.responseCode
                ? `${nextProps.user.responseCode}`
                : "systemBusy";
            let message2 = RequestField.getValueField(
              nextProps.user.fieldMap,
              FIELD.RESPONSE_DESCRIPTION
            );
            if (
              nextProps.user &&
              (responseCode === "00000" || responseCode === "10116")
            ) {
              console.log("5");
              let roleId = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.ROLE_ID
              );
              let phoneNumber = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.PHONE_NUMBER
              );
              const currentStatus = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.ACCOUNT_STATUS
              );
              if (currentStatus) {
                console.log("6");
                if (roleId === 1 || roleId === 33 || roleId === 7) {
                  console.log("7");
                  let accountId = RequestField.getValueField(
                    nextProps.user.fieldMap,
                    FIELD.ACCOUNT_ID
                  );
                  let customerName = RequestField.getValueField(
                    nextProps.user.fieldMap,
                    FIELD.CUSTOMER_NAME
                  );
                  let customerGender = RequestField.getValueField(
                    nextProps.user.fieldMap,
                    FIELD.CUSTOMER_GENDER
                  );
                  let language = RequestField.getValueField(
                    nextProps.user.fieldMap,
                    FIELD.LANGUAGE
                  );
                  let currencyCode = RequestField.getValueField(
                    nextProps.user.fieldMap,
                    FIELD.CURRENCY_CODE
                  );
                  let pan = RequestField.getValueField(
                    nextProps.user.fieldMap,
                    FIELD.PAN
                  );
                  let agentCode = RequestField.getValueField(
                    nextProps.user.fieldMap,
                    FIELD.STAFF_CODE
                  );
                  let parentCode = RequestField.getValueField(
                    nextProps.user.fieldMap,
                    FIELD.PARENT_CODE
                  );
                  console.log(
                    "nextProps.user.fieldMap:",
                    nextProps.user.fieldMap
                  );
                  this.setState({
                    returnedLanguage: language,
                    returnedAccountID: accountId,
                    returnedRoleID: roleId,
                    returnedPhoneNumber: phoneNumber,
                  });
                  this.props.setInfoAccount({
                    phoneNumber,
                    accountId,
                    customerName,
                    customerGender,
                    language,
                    currencyCode,
                    pan,
                    agentCode,
                    parentCode,
                    roleId,
                  });
                  console.log("currentStatus:", currentStatus);
                  switch (currentStatus) {
                    case "REGISTER":
                      this.refs.youMustSetupPinFirst.onOpen();
                      break;
                    case "CANCELED":
                      this.refs.error10117.onOpen();
                      break;
                    case "LOCKED":
                      this.refs.state3.onOpen();
                      break;
                    case "ACTIVE":
                      this.onCheckBlockDeviceMobile();
                      this.setState({
                        contentModal: "pleaseInputPinToLogin",
                        statusSeason: "active",
                        key: localLanguage,
                        infoAccount: infoAccount,
                      });
                      this.savePhone(phoneNumber);
                      break;
                    case "INVALID PIN":
                      this.refs.error10114.onOpen();
                      break;
                    case "BLOCKED":
                      this.refs.error10118.onOpen();
                      break;
                    case "LOCKED":
                      this.refs.state3.onOpen();
                      break;
                    default:
                      break;
                  }
                } else {
                  this.refs.phoneIsNotAgentOrSubAgent.onOpen();
                }
              } else {
                console.log("16");
                this.refs.phoneIsNotAgentOrSubAgent.onOpen();
              }
            } else {
              switch (responseCode) {
                case "10122":
                  this.refs.activePinNewm.onOpen();
                  let accountInfo = nextProps.user.fieldMap;
                  this.setState({
                    stateResetPin: I18n.t("youDidNtSetupThePin"),
                    accountInfo: accountInfo,
                  });
                  break;
                case "10114":
                  this.refs.messageError.onOpen();
                  this.setState({ messageError: I18n.t("BLOCKED") });
                  break;
                case responseCode:
                  this.refs.messageError.onOpen();
                  this.setState({ messageError: message2 });
                  break;
                default:
                  break;
              }
            }
          }
        } else {
          this.refs.NotificationSystemBusy.onOpen();
        }
      } else {
        this.refs.failedDueNoResponse.onOpen();
      }
    }
    if (this.state.isRequestBccs && !nextProps.isFetching) {
      this.setState({ isRequestBccs: false, isLoading: false });
      if (nextProps.bccsData && nextProps.bccsData.responseCode) {
        switch (nextProps.bccsData.responseCode) {
          case "00000":
            this.props.navigation.navigate("Register", {
              bccsData: nextProps.bccsData,
            });
            break;
          case nextProps.bccsData.responseCode:
            this.refs.messageError.onOpen();
            this.setState({
              messageError: nextProps.bccsData.responseDescription,
            });
            break;
          default:
            break;
        }
      } else {
        this.refs.failedDueNoResponse.onOpen();
      }
    }
    if (this.state.isRequestPin && !nextProps.isFetching) {
      this.setState({ isRequestPin: false, isLoading: false });
      if (nextProps.validateData && nextProps.validateData.error === "00000") {
        this.refs.ValidatePinModal.onClose();
        let responseCode = RequestField.getValueField(
          nextProps.validateData.fieldMap,
          FIELD.RESPONSE_CODE
        );
        if (responseCode === "00000") {
          let currentLanguage = null;

          if (I18n.currentLocale() === "en") {
            currentLanguage = "en_US";
          } else if (I18n.currentLocale() === "lo") {
            currentLanguage = "en_LA";
          } else if (I18n.currentLocale() === "vn") {
            currentLanguage = "en_VN";
          } else if (I18n.currentLocale() === "cn") {
            currentLanguage = "en_CN";
          }
          if (currentLanguage !== returnedLanguage) {
            RequestField.clearInitField();
            RequestField.addToInitField(
              RequestField.addProcessCode(ConfigCode.SETTING_CHANGE_LANGUAGE)
            );
            RequestField.addToInitField(
              RequestField.addPhone(returnedPhoneNumber)
            );
            RequestField.addToInitField(
              RequestField.addAccountID(returnedAccountID)
            );
            RequestField.addToInitField(RequestField.addRoleId(returnedRoleID));
            RequestField.addToInitField(RequestField.addEffectType("0"));
            let data = RequestField.addToInitField(
              RequestField.addLanguage(currentLanguage)
            );
            data.fieldMap = _.orderBy(data.fieldMap, "fieldID");
            this.props.changeLanguage(data);
            RequestField.clearInitField();
          }
          this.props.setLoggedIn();
        } else {
        }
      } else {
        this.refs.ValidatePinModal.onClose();
        this.refs.failedDueNoResponse.onOpen();
      }
    }
    if (this.state.isActiveAccount && !nextProps.isFetching) {
      this.setState({ isActiveAccount: false, isLoading: false });
      if (
        nextProps.activePinData &&
        nextProps.activePinData.data.responseCode === "00000"
      ) {
        this.props.setLoggedIn();

        Toast("");
      } else {
        if (nextProps.activePinData && nextProps.activePinData.responseCode) {
          // handleResponseCode(nextProps.activePinData.responseCode)
        } else {
          this.refs.NotificationSystemBusy.onOpen();
        }
      }
    }
    if (this.state.isRequestActive && !nextProps.isFetching) {
      this.setState({ isRequestActive: false, isLoading: false });
      if (nextProps.dataActive) {
        switch (nextProps.dataActive.data.responseCode) {
          case "00000":
            const { phoneNumber, isChecked } = this.state;
            RequestField.addToInitField(RequestField.addPhone(phoneNumber));
            const data = RequestField.addToInitField(
              RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO)
            ); // 311100
            this.setState({
              isLogin: true,
              isLoading: true,
              isLoginViaReqActive: true,
            });
            this.props.onLogIn(data, isChecked);
            break;
          case nextProps.dataActive.data.responseCode:
            this.refs.messageError.onOpen();
            this.setState({
              messageError: nextProps.dataActive.data.responseDescription,
            });
            break;
          default:
            break;
        }
      } else {
        this.refs.NotificationSystemBusy.onOpen();
      }
    }
    if (this.state.isPing && !nextProps.isFetching) {
      this.setState({ isLoading: false, isPing: false });
      if (
        nextProps.pingData &&
        nextProps.pingData.sendRequestResponse.return.error === "00000"
      ) {
        Toast("connectSuccess");
      } else {
        Toast("connectFalse");
      }
    }
    if (isRequestPinFringPrint && isLoading) {
      this.setState({ isRequestPin: false, isLoading: false });
      if (nextProps.validateData && nextProps.validateData.error === "00000") {
        let responseCode = RequestField.getValueField(
          nextProps.validateData.fieldMap,
          FIELD.RESPONSE_CODE
        );
        if (responseCode === "00000") {
          this.props.setLoggedIn();
        } else {
          this.refs.NotificationActivePin.onOpen();
        }
      } else {
        this.refs.failedDueNoResponse.onOpen();
      }
    }
    if (isCheckBleckDeviec) {
      if (
        nextProps.dataCheckBlockDeviec &&
        nextProps.dataCheckBlockDeviec.error === "00000"
      ) {
        this.setState({ isCheckBleckDeviec: false, isLoading: false });
        let responseCode = RequestField.getValueField(
          nextProps.dataCheckBlockDeviec.fieldMap,
          FIELD.RESPONSE_CODE
        );
        let message = RequestField.getValueField(
          nextProps.dataCheckBlockDeviec.fieldMap,
          FIELD.RESPONSE_DESCRIPTION
        );
        let timeBlock = RequestField.getValueField(
          nextProps.dataCheckBlockDeviec.fieldMap,
          FIELD.PAYMENT_CODE
        );
        let Tin = RequestField.getValueField(
          nextProps.dataCheckBlockDeviec.fieldMap,
          FIELD.TIN
        );
        console.log("-----login-tin-----", Tin);
        let effectTyle = RequestField.getValueField(
          nextProps.dataCheckBlockDeviec.fieldMap,
          FIELD.EFFECT_TYPE
        );
        console.log("-----effectTyle-tin-----", effectTyle);
        switch (responseCode) {
          case "00000":
            this.props.navigation.navigate("Code", {
              key,
              infoAccount,
              Tin,
              deviceJSON,
              effectTyle,
              getUniqueId,
            });
            break;
          case 10157:
            this.refs.messageError.onOpen();
            let errStr = I18n.t("10010") + timeBlock;
            this.setState({ messageError: errStr });
            break;
          case responseCode:
            this.refs.messageError.onOpen();
            this.setState({ messageError: message });
            break;

          default:
            break;
        }
      }
    }
  }
  //end
  onFingerpring = (getPin, infoAccount) => {
    if (infoAccount != "undefined" && getPin != "") {
      let pan = RequestField.getValueField(infoAccount.fieldMap, FIELD.PAN);
      let phoneNumber = RequestField.getValueField(
        infoAccount.fieldMap,
        FIELD.PHONE_NUMBER
      );
      let roleId = RequestField.getValueField(
        infoAccount.fieldMap,
        FIELD.ROLE_ID
      );
      let accountId = RequestField.getValueField(
        infoAccount.fieldMap,
        FIELD.ACCOUNT_ID
      );
      let Language = RequestField.getValueField(
        infoAccount.fieldMap,
        FIELD.LANGUAGE
      );
      RequestField.addToInitField(RequestField.addPhone(phoneNumber));
      RequestField.addToInitField(RequestField.addProcessCode("000004"));
      RequestField.addToInitField(RequestField.addPin(getPin));
      RequestField.addToInitField(RequestField.addTransDes(false));
      RequestField.addToInitField(RequestField.addRoleId(roleId));
      RequestField.addToInitField(RequestField.addPan(pan));
      RequestField.addToInitField(RequestField.addLanguage(Language));
      var data = RequestField.addToInitField(
        RequestField.addAccountID(accountId)
      );
      this.setState({ isLoading: true, isRequestPinFringPrint: true });
      this.props.validatePin(data);
      RequestField.clearInitField();
    } else {
      alert("info null");
    }
  };

  onPressIsNoagent() {
    this.refs.phoneIsNotAgentOrSubAgent.onClose();
  }
  onPressPinActive() {
    this.refs.NotificationPinActive.onClose();
  }
  onPressSystemBusy() {
    this.refs.NotificationSystemBusy.onClose();
  }
  youMustSetupPinFirst() {
    this.refs.youMustSetupPinFirst.onClose();
  }
  error10117() {
    this.refs.error10117.onClose();
  }
  phoneFieldIsWrong() {
    this.refs.phoneFieldIsWrong.onClose();
  }
  error10114() {
    this.refs.error10114.onClose();
  }
  error10118() {
    this.refs.error10118.onClose();
  }
  state3() {
    this.refs.state3.onClose();
  }
  message() {
    this.refs.message.onClose();
  }
  yourAccountStatusIsInvalidPin() {
    this.refs.yourAccountStatusIsInvalidPin.onClose();
  }
  failedDueNoResponse() {
    this.refs.failedDueNoResponse.onClose();
  }

  notFingerprint() {
    this.refs.notFingerprint.onClose();
  }
  onPressActivePin() {
    this.refs.NotificationActivePin.onClose();
  }
  activePinNewm() {
    this.refs.activePinNewm.onClose();
    this.props.navigation.navigate("ActivePinNew", {
      data: this.state.accountInfo,
    });
  }
  messageError() {
    this.refs.messageError.onClose();
  }
  onForgotPIN() {
    this.refs.onPressForgotPin.onOpen();
  }
  onWatermarkView() {
    this.props.navigation.navigate("watater");
  }
  onPressForgotPin() {
    this.refs.onPressForgotPin.onClose();
  }

  render() {
    const {
      phoneNumber,
      errorPhoneNumber,
      isLoading,
      stateResetPin,
      messageError,
      deviceJSON,
      getPhone,
      getPin,
    } = this.state;
    const { localLanguage } = this.props;
    //deviceJSON
    // console.log('---', JSON.stringify(deviceJSON, null, '  '))

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          {isLoading ? <ActivityIndicator /> : null}
          <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
          <View
            style={{ paddingHorizontal: Metrics.doubleBaseMargin, flex: 1 }}
          >
            <View>
              <Animatable.View animation="fadeInUp">
                <Image
                  source={Images.icLoginAgent}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </Animatable.View>
              <Text
                style={[
                  styles.txtLogo,
                  { color: Colors.txtColor, fontSize: Fonts.size.regular },
                ]}
              >
                {I18n.t("introLogin1")}
              </Text>
              <Text
                style={[
                  styles.txtLogo2,
                  {
                    color: Colors.txtColor,
                    fontSize: Fonts.size.regular,
                    marginBottom: 10,
                  },
                ]}
              >
                {I18n.t("introLogin2")}
              </Text>
            </View>
            <View style={styles.TextInput}>
              <FullTextInput
                label={I18n.t("enterYourMobilePhoneNumber")}
                placeholder={I18n.t("enterRegisterPhoneNumber")}
                returnKeyType="done"
                keyboardType="numeric"
                value={phoneNumber}
                maxLength={13}
                error={errorPhoneNumber}
                onChangeUserName={(text) => this.onChangeNumberPhone(text)}
                iconLeft="facebook"
                iconRight="close"
                textError={I18n.t("incorrectPhoneNumber")}
                onclick={() => this.onClearPhone()}
              />
            </View>

            <TouchableOpacity
              style={styles.styleFont}
              onPress={() => this.onForgotPIN()}
            >
              <Text style={styles.forgetThePin}>{I18n.t("forgetThePin")}</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.styleFont} onPress={() => this.onWatermarkView()}>
                            <Text style={styles.forgetThePin}>WatermarkView</Text>
                        </TouchableOpacity> */}
            <View style={styles.Button}>
              <FullButton
                styles={styles.btnStyle}
                onPress={() => this.onSignIn()}
                isDisable={!phoneNumber || errorPhoneNumber ? true : false}
                textButton={I18n.t("signIn")}
              />
            </View>

            <View style={styles.fingerPrintContainer}>
              <TouchableOpacity onPress={() => this.finger()}>
                <Image
                  source={Platform.OS=='ios' ? Images.ic_Faceid : Images.ic_FingerPrint}
                  style={styles.fingerPrintIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.imgFooter}>
            <Animatable.View animation="fadeInLeftBig">
              <Image source={Images.bg_footerLogin} style={styles.img} />
            </Animatable.View>
            <SafeAreaView
              style={{
                justifyContent: "flex-end",
                width: "100%",
                alignContent: "center",
                padding: 10,
                marginBottom: Platform.OS=='ios'? 38 :20,
                // position: "absolute",
              }}
            >
              <Animatable.Text
                animation="fadeInUp"
                style={{ alignItems: "center", left: 24 }}
              >
                Version 2.6
              </Animatable.Text>
            </SafeAreaView>
          </View>

          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={I18n.t("somethingWentWrong")}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.onPressActivePin()}
            ref="NotificationActivePin"
          />

          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={I18n.t("11101")}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.onPressPinActive()}
            ref="NotificationPinActive"
          />
          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={I18n.t("systemBusy")}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.onPressSystemBusy()}
            ref="NotificationSystemBusy"
          />

          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={I18n.t("phoneIsNotAgentOrSubAgent", {
              phoneNumber: phoneNumber,
            })}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.onPressIsNoagent()}
            ref="phoneIsNotAgentOrSubAgent"
          />
          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={I18n.t("youMustSetupPinFirst")}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.youMustSetupPinFirst()}
            ref="youMustSetupPinFirst"
          />

          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={I18n.t("10117")}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.error10117()}
            ref="error10117"
          />
          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={I18n.t("phoneFieldIsWrong")}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.phoneFieldIsWrong()}
            ref="phoneFieldIsWrong"
          />

          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={I18n.t("error10114")}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.error10114()}
            ref="error10114"
          />

          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={I18n.t("error10118")}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.error10118()}
            ref="error10118"
          />

          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={I18n.t("state3")}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.state3()}
            ref="state3"
          />

          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={stateResetPin}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.message()}
            ref="message"
          />

          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={I18n.t("yourAccountStatusIsInvalidPin")}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.yourAccountStatusIsInvalidPin()}
            ref="yourAccountStatusIsInvalidPin"
          />

          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={I18n.t("failedDueNoResponse")}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.failedDueNoResponse()}
            ref="failedDueNoResponse"
          />

          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={I18n.t("notAllowTouchId")}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.notFingerprint()}
            ref="notFingerprint"
          />

          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={stateResetPin}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.activePinNewm()}
            ref="activePinNewm"
          />

          <Notification
            headerType="Warning"
            title={I18n.t("info")}
            textContent={messageError}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.messageError()}
            ref="messageError"
          />

          <Notification
            headerType="contact"
            title={I18n.t("info")}
            textContent={I18n.t("forgetPinGuide")}
            buttonText={I18n.t("ok")}
            isButton={true}
            onPress={() => this.onPressForgotPin()}
            ref="onPressForgotPin"
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.setModleNointernet}
            onRequestClose={() => {
              this.setState({ setModleNointernet: false });
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.windowTint,
              }}
            >
              <View
                style={{
                  width: "80%",
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Ionicons
                    name="warning-outline"
                    size={50}
                    color={Colors.red}
                  />
                  <Text style={{ fontSize: 16 }}>{I18n.t("txtuseModel")}</Text>
                </View>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.useModel()}
                    style={{
                      padding: 10,
                      backgroundColor: Colors.orange,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: Colors.white }}>
                      {I18n.t("useModel")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.dontUseModel()}
                    style={{
                      padding: 10,
                      backgroundColor: Colors.orange,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: Colors.white }}>
                      {I18n.t("dontUseModel")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    user: state.auth.user,
    infoAccount: state.auth.infoAccount,
    validateData: state.auth.validateData,
    bccsData: state.auth.bccsData,
    activePinData: state.auth.activePinData,
    localLanguage: state.auth.localLanguage,
    previousPhone: state.auth.previousPhone,
    dataActive: state.auth.dataActive,
    keepLoggedIn: state.auth.keepLoggedIn,
    language: state.language,
    pingData: state.auth.pingData,
    dataCheckBlockDeviec: state.auth.dataCheckBlockDeviec,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: (phoneNumber, keepLoggedIn) => {
      dispatch(login(phoneNumber, keepLoggedIn));
    },
    setInfoAccount: (data) => {
      dispatch(setInfoAccount(data));
    },
    validatePin: (pin) => {
      dispatch(validatePin(pin));
    },
    setLoggedIn: () => {
      dispatch(setLoggedIn());
    },
    setLoggedInNointernet: () => {
      dispatch(setLoggedInNointernet());
    },
    requestBccs: (data) => {
      dispatch(requestBccs(data));
    },
    activePin: (data) => {
      dispatch(activePin(data));
    },
    changeLocalLanguage: (language) => {
      dispatch(changeLocalLanguage(language));
    },
    ping: (data) => {
      dispatch(ping(data));
    },
    changeLanguage: (language) => {
      dispatch(changeLanguage(language));
    },
    requestActive: (data) => {
      dispatch(requestActive(data));
    },
    onCheckBlockDevice: (data) => {
      dispatch(onCheckBlockDevice(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);