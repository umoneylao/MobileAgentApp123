import React, { Component } from "react";
import {
  FlatList,
  Text,
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  Switch,
  SafeAreaView,
  Pressable,
  BackHandler,
  Platform,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import {
  changeLanguage,
  changePin,
  validatePin,
  login,
  changeLocalLanguage,
} from "../../actions/Auth";
import styles from "./styles";
import { Images, Colors } from "../../themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import Languages from "../../utils/Languages";
import _ from "lodash";
import I18n from "react-native-i18n";
import {
  AlertNative,
  ActivityIndicator,
  Notification,
  FullTextInput,
  Hr,
  FullButton,
} from "../../components";
import * as ConfigCode from "../../utils/ConfigCode";
import * as FIELD from "../../utils/CoreFieldMap";
import * as RequestField from "../../utils/RequestField";
import { handleResponseCode } from "../../utils/ErrorManager";
import BottomSheet from "reanimated-bottom-sheet";
import ReactNativeBiometrics from "react-native-biometrics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated from "react-native-reanimated";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Constant from "../../utils/Constant";
import { isValidated } from "../../utils/Validate";
import CountDown from "react-native-countdown-component";
import { requestOTP } from "../../actions/Bank";
import {
  GET_OTP_BANK_FAILED,
  GET_OTP_BANK_SUCCESS,
  HIGH_SECURITY_OTP_SUCCESS,
  HIGH_SECURITY_OTP_FAILED,
  CALL_CHECK_SWICH_SUCCESS,
  CALL_CHECK_SWICH_FAILED,
} from "../../actions/types";
import {
  onCheckHighSecurity,
  onCallCheckSwich,
  onGetAllconfigAmonut,
} from "../../actions/ByPassPIN";
import { formatNumber } from "../../utils/Formater";

const fall = new Animated.Value(1);
const bs = React.createRef();
const bs2 = React.createRef();

class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      isModalLanguage: false,
      headerContent: "pleaseInputYourCurrentPin",
      season: "currentPin",
      bar: "dark-content",
      setModalVisible: false,
      value: "",
      getPhone: null,
      getPin: null,
      switchValue: false,
      ValuePin: null,
      valuePinPayFinger:null,
      switchValueInfo: false,
      dataInfo: null,
      setModle: false,
      messge: "",
      switchSecurity: false,
      setModleSecurity: false,
      inputPIN: null,
      setModleOTP: false,
      dataOTP: null,
      run: false,
      setModleShowinfo: false,
      valueAmount: null,
      snapPoints: [330, 0], // Các snapPoints ban đầu
      valueFinger: "",
      checkFingerPay: false,
      getPayByFinger: null,
      switchValueCheck: false,
      pinPayFinger: null,
      valuePinPayWithFinger:null,
      valuePinPay:false
    };
    setTimeout(async () => {
      try {
        let onPhoneNumber = await AsyncStorage.getItem("phoneNumber");
        let onPayByFinger = await AsyncStorage.getItem("payByFinger");
        let switchValue = await AsyncStorage.getItem("switchValue");
        const paybyFinger = await AsyncStorage.getItem("pinFingerPay");

        let onPinCode = await AsyncStorage.getItem("pinCode");
        console.log(paybyFinger,"paybyFinger")
        this.setState({
          getPhone: onPhoneNumber,
          getPin: onPinCode,
          switchValueCheck:
            switchValue == "true" || switchValue == true ? true : false,
          // pinPayFinger: onPayFinger,
          // checkFingerPay:
        });
      } catch (e) {
        console.log("---------Error get data login-----", e);
      }
    }, 1000);
  }
  getRememberedUser = async () => {
    try {
      const phoneNumber = await AsyncStorage.getItem("_getPhone");
      const pinCode = await AsyncStorage.getItem("_getPin");
      // const paybyFinger = await AsyncStorage.getItem("_payByFinger");

      if (phoneNumber !== null && pinCode !== null) {
        let data = phoneNumber + "," + pinCode ;
        return data;
      }
    } catch (error) {
      console.log("Error retrieving data", error);
    }
  };
  getRememberedPayByFinger = async () => {
    try {
      const phoneNumber = await AsyncStorage.getItem("_getPhone");
      const pinCode = await AsyncStorage.getItem("_getPin");
      const paybyFinger = await AsyncStorage.getItem("_payByFinger");


      if (phoneNumber !== null && pinCode !== null && paybyFinger !== null) {
        let data = phoneNumber + "," + pinCode + "," + paybyFinger;
        return data;
      }
    } catch (error) {
      console.log("Error retrieving data", error);
    }
  };

  onCheckDataInfo = async () => {
    try {
      const dataInfo = await AsyncStorage.getItem("userInfo");
      if (dataInfo !== null) {
        let dataUser = dataInfo;
        // console.log('dataUser:', dataUser)
        return dataUser;
      }
    } catch (error) {
      console.log("Error get data user", error);
    }
  };

  handleBackButtonClick() {
    bs.current.snapTo(1);
    console.log("dd");
    this.props.navigation.goBack(null);
    return true;
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
      Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
  Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // this.handleKeyboardDidShow?.remove();
    // this.handleKeyboardDidHide?.remove();

    Keyboard.removeListener('keyboardDidShow', this.handleKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  handleKeyboardDidShow = (event) => {
    const keyboardHeight = event.endCoordinates.height;
    const windowHeight = Dimensions.get('window').height;
  
    // Điều chỉnh snapPoints để nằm lên trên bàn phím
    const newSnapPoints = [windowHeight - keyboardHeight +70, 0];
    this.setState({ snapPoints: newSnapPoints });
  };
  
  handleKeyboardDidHide = () => {
    // Khôi phục snapPoints ban đầu
    const initialSnapPoints = [330, 0];
    this.setState({ snapPoints: initialSnapPoints });
  };
  async componentDidMount() {
    console.log("componentDidMount")
    const data = await this.getRememberedUser();
    console.log("dataTesst",data)
    this.loadSwitchValue();
    const user = await this.onCheckDataInfo();
    const check = await this.getRememberedPayByFinger();
    this.onCheckBypassPIN();
    const switchValue = await AsyncStorage.getItem("switchValue");
    if (switchValue !== null) {
      this.setState({ switchValueCheck: JSON.parse(switchValue) });
      console.log("ComponentDidMount", this.state.switchValueCheck);
    }
    if (data) {
      const split = data.split(",");
      let phone = split[0];
      let pin = split[1];
      // let checkFinger = split[2];
      // console.log("====================================");
      // console.log("checkFinger", checkFinger);
      // console.log("====================================");
      this.setState({
        getPhone: phone || "",
        getPin: pin || "",
        switchValue: data ? true : false,
        // getPayByFinger: checkFinger || "",
        // checkFinger: checkFinger ? true : false,
      });
    }
    if (user) {
      this.setState({ switchValueInfo: user ? true : false });
    }
    if (check) {
      this.setState({ switchValueInfo: user ? true : false });
    }
  }
  loadSwitchValue = async () => {
    try {
      const switchValue = await AsyncStorage.getItem("switchValue");
      if (switchValue !== null) {
        this.setState({ switchValueCheck: JSON.parse(switchValue) });
      }
    } catch (error) {
      console.log(error);
    }
  };
  onCheckBypassPIN() {
    const { infoAccount } = this.props;
    let data = infoAccount.accountId;
    this.props.onCallCheckSwich(data);
    this.setState({ isCallCheckSwich: true, isLoading: true });
  }

  rememberUser = async () => {
    const { getPhone, getPin } = this.state;
    try {
      if (
        getPhone !== "" &&
        getPin !== "" &&
        getPhone !== null &&
        getPin !== null
      ) {
        await AsyncStorage.setItem("_getPhone", getPhone);
        await AsyncStorage.setItem("_getPin", getPin);
      } else {
        alert("ON dat");
      }
    } catch (error) {
      console.log("Error saving data", error);
    }
  };

  forgetUser = async () => {
    try {
      await AsyncStorage.removeItem("_getPhone");
      await AsyncStorage.removeItem("_getPin");
    } catch (error) {
      console.log(" Error removing", error);
    }
  };
  rememberUser2 = async () => {
    const { getPhone, getPin, getPayByFinger } = this.state;
    await AsyncStorage.setItem("pinFingerPay", getPin);
    console.log("12344")

    try {
      // if (
      //   getPhone !== "" &&
      //   getPin !== "" &&
      //   getPhone !== null &&
      //   getPin !== null &&
      //   getPayByFinger !== "" &&
      //   getPayByFinger !== null
      // ) {
        await AsyncStorage.setItem("_getPhone", getPhone);
        await AsyncStorage.setItem("_getPin", getPin);
        await AsyncStorage.setItem("_payByFinger", getPayByFinger);
        await AsyncStorage.setItem("pinFingerPay", getPin);
        

        // switchValue;
      // } else {
      //   alert("ON dat");
      // }
    } catch (error) {
      console.log("Error saving data", error);
    }
  };

  forgetUser2 = async () => {
    try {
      await AsyncStorage.removeItem("_getPhone");
      await AsyncStorage.removeItem("_getPin");
      await AsyncStorage.removeItem("_payByFinger");
      // await AsyncStorage.removeItem("pinFingerPay");

    } catch (error) {
      console.log(" Error removing", error);
    }
  };
  toggleSwitchPayFinger = (value) => {
    this.setState({ valuePinPay: value });
    bs2.current.snapTo(0);
  };
  BiometricsNotSupported = () => {
    this.refs.fingerPrintNosuport.onOpen();
  };
  componentWillReceiveProps(nextProps) {
    this.forceUpdate();
    const { infoAccount } = nextProps;
    const { isOnChangePin, isOnChangeLanguage, onCallgetConfigAmonut } =
      this.state;

    if (this.state.isGetAccountInfoCurrentUser && !nextProps.isFetching) {
      this.setState({ isGetAccountInfoCurrentUser: false, isLoading: false });
      if (nextProps.user && nextProps.user.responseCode) {
        if (nextProps.user && nextProps.user.error === `00000`) {
          if (nextProps.user && nextProps.user.responseCode === "00000") {
            if (isOnChangePin) {
              this.props.navigation.navigate("ChangePin");

              this.setState({ isOnChangePin: false });
            }
            if (isOnChangeLanguage) {
              this.setState({
                isModalLanguage: true,
                isOnChangeLanguage: false,
              });
            }
          } else {
            if (
              nextProps.user &&
              nextProps.user.responseCode &&
              nextProps.user.responseCode.toString() === "10118"
            ) {
              // status 3/7
              const status = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.ACCOUNT_STATUS
              );
              switch (status) {
                case "LOCKED":
                  AlertNative(I18n.t("state3"));
                  break;
                case "BLOCKED":
                  AlertNative(I18n.t("state7"));
                  break;
                default:
                  AlertNative(I18n.t(`systemBusy`));
                  break;
              }
            } else if (
              nextProps.user &&
              nextProps.user.responseCode &&
              nextProps.user.responseCode.toString() === "10114"
            ) {
              AlertNative(I18n.t("state2"));
            } else if (
              nextProps.user &&
              nextProps.user.responseCode &&
              nextProps.user.responseCode.toString() === "10115"
            ) {
              AlertNative(I18n.t("state5"));
            } else if (
              nextProps.user &&
              nextProps.user.responseCode &&
              nextProps.user.responseCode.toString() === "10116"
            ) {
              const phone = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.PHONE_NUMBER
              );
              const status = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.ACCOUNT_STATUS
              );
              if (status) {
                AlertNative(I18n.t("state0", { phone: phone }));
              } else {
                AlertNative(I18n.t("state-1", { phone: phone }));
              }
            } else {
              AlertNative(I18n.t(`systemBusy`));
            }
          }
        } else {
          AlertNative(I18n.t(`systemBusy`));
        }
      } else {
        AlertNative(I18n.t("failedDueNoResponse"));
      }
    }
    if (this.state.isChangeLanguage && !nextProps.isFetching) {
      this.setState({ isChangeLanguage: false, isLoading: false });
      if (
        nextProps.changeLanguageData &&
        nextProps.changeLanguageData.responseCode
      ) {
        if (
          nextProps.changeLanguageData &&
          nextProps.changeLanguageData.responseCode === "00000"
        ) {
          this.props.navigation.setParams({ title: I18n.t("setting") });
          this.refs.changeLanguageSuccessfully.onOpen();
        } else {
          var responseCode =
            nextProps.changeLanguageData &&
            nextProps.changeLanguageData.responseCode
              ? `${nextProps.changeLanguageData.responseCode}`
              : "systemBusy";
          if (
            nextProps.changeLanguageData &&
            nextProps.changeLanguageData.responseDescription
          ) {
            AlertNative(I18n.t("transactionIsUnsuccessful"));
          } else {
            if (responseCode) {
              handleResponseCode(responseCode);
            } else {
              AlertNative(I18n.t(`systemBusy`));
            }
          }
        }
      } else {
        AlertNative(I18n.t("failedDueNoResponse"));
      }
    }
    if (this.state.isCheckHighSecurity && this.state.isLoading) {
      switch (nextProps.ByPassPinReducer.actionType) {
        case HIGH_SECURITY_OTP_SUCCESS:
          const processCode = RequestField.getValueField(
            nextProps.ByPassPinReducer.dataOnSecurity.fieldMap,
            FIELD.RESPONSE_CODE
          );
          const processDesrition = RequestField.getValueField(
            nextProps.ByPassPinReducer.dataOnSecurity.fieldMap,
            FIELD.RESPONSE_DESCRIPTION
          );
          const tin = RequestField.getValueField(
            nextProps.ByPassPinReducer.dataOnSecurity.fieldMap,
            FIELD.TIER
          );
          switch (processCode) {
            case "00000":
              this.setState({
                isCheckHighSecurity: false,
                isLoading: false,
                switchSecurity: tin == 1 ? false : true,
              });
              break;
            case processCode:
              this.refs.responseMessage.onOpen();
              this.setState({
                isCheckHighSecurity: false,
                isLoading: false,
                responseMessage: processDesrition
                  ? processDesrition
                  : "Data is null",
              });
              break;
            default:
              break;
          }
          break;
        case HIGH_SECURITY_OTP_FAILED:
          alert("Error");
          this.setState({ isCheckHighSecurity: false, isLoading: false });
          break;

        default:
          break;
      }
    }
    if (this.state.isRequestOTP && this.state.isLoading) {
      switch (nextProps.BankReducer.actionType) {
        case GET_OTP_BANK_SUCCESS:
          console.log(
            "nextProps.BankReducer.getOTPBank.data.responseCode:",
            nextProps.BankReducer.getOTPBank.data.responseCode
          );
          if (nextProps.BankReducer.getOTPBank.data.responseCode === "00000") {
            this.setState({
              isLoading: false,
              setModleOTP: true,
              isRequestOTP: false,
              run: true,
            });
          } else {
            this.refs.responseMessage.onOpen();
            this.setState({
              isLoading: false,
              isRequestOTP: false,
              responseMessage: I18n.t("somethingWentWrong"),
            });
          }
          break;
        case GET_OTP_BANK_FAILED:
          this.setState({
            isLoading: false,
            isRequestOTP: false,
            responseMessage: I18n.t("99999"),
          });
          break;
        default:
          break;
      }
    }
    if (this.state.isCallCheckSwich) {
      if (nextProps.ByPassPinReducer) {
        switch (nextProps.ByPassPinReducer.actionType) {
          case CALL_CHECK_SWICH_SUCCESS:
            if (nextProps.ByPassPinReducer.dataCheckSwich) {
              let d =
                nextProps.ByPassPinReducer.dataCheckSwich
                  .bypassConfigCollection;
              try {
                let strData = d.data[0];
                if (strData) {
                  let data =
                    nextProps.ByPassPinReducer.dataCheckSwich
                      .bypassConfigCollection.data[0];
                  this.setState({
                    switchSecurity: data.status == 1 ? false : true,
                    isCallCheckSwich: false,
                    isLoading: false,
                  });
                } else {
                  this.setState({
                    switchSecurity: false,
                    isCallCheckSwich: false,
                    isLoading: false,
                  });
                }
              } catch (error) {
                this.setState({
                  switchSecurity: false,
                  isCallCheckSwich: false,
                  isLoading: false,
                });
              }
            } else {
              this.refs.responseMessage.onOpen();
              this.setState({
                responseMessage: "Cant on Switch",
                isCallCheckSwich: false,
                isLoading: false,
              });
            }
            break;
          case CALL_CHECK_SWICH_FAILED:
            this.refs.responseMessage.onOpen();
            this.setState({
              responseMessage: "CALL_CHECK_SWICH_FAILED",
              isCallCheckSwich: false,
              isLoading: false,
            });
            break;

          default:
            break;
        }
      }
    }

    if (onCallgetConfigAmonut) {
      if (nextProps.ByPassPinReducer) {
        switch (nextProps.ByPassPinReducer.actionType) {
          case "GET_ALL_CONFIG_AMOUNT_SUCCESS":
            if (nextProps.ByPassPinReducer.dataGetAllAmount) {
              let a =
                nextProps.ByPassPinReducer.dataGetAllAmount
                  .amountConfigCollection;
              try {
                let strDataAmount = a.data[0];
                if (strDataAmount) {
                  let value =
                    nextProps.ByPassPinReducer.dataGetAllAmount
                      .amountConfigCollection.data;
                  // console.log('data:0000', data)
                  // this.setState({ setModleShowinfo: true })
                  this.setState({
                    valueAmount: value,
                    onCallgetConfigAmonut: false,
                    isLoading: false,
                    setModleShowinfo: true,
                  });
                } else {
                  this.setState({
                    onCallgetConfigAmonut: false,
                    isLoading: false,
                  });
                }
              } catch (error) {
                this.setState({
                  onCallgetConfigAmonut: false,
                  isLoading: false,
                  responseMessage: error,
                });
              }
              // console.log('nextProps.dataGetAllAmount.actionType:', nextProps.ByPassPinReducer.actionType)
              // console.log('nextProps.dataGetAllAmount:', nextProps.ByPassPinReducer.dataGetAllAmount)
              // this.setState({onCallgetConfigAmonut: false, isLoading: false})
            } else {
              this.setState({
                onCallgetConfigAmonut: false,
                isLoading: false,
                responseMessage: "Cant get config amonut",
              });
            }

            break;
          case "GET_ALL_CONFIG_AMOUNT_FAILED":
            this.refs.responseMessage.onOpen();
            this.setState({
              onCallgetConfigAmonut: false,
              isLoading: false,
              responseMessage: "GET_ALL_CONFIG_AMOUNT_FAILED",
            });
            break;
          default:
            break;
        }
      }
    }
  }
  _onChangeLanguage(language) {
    this.setState({ language, isModalLanguage: false });
    I18n.defaultLocale = language.value;
    I18n.locale = language.value;
    I18n.currentLocale();
    const { infoAccount } = this.props;
    RequestField.clearInitField();
    RequestField.addToInitField(
      RequestField.addProcessCode(ConfigCode.SETTING_CHANGE_LANGUAGE)
    );
    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber));
    RequestField.addToInitField(
      RequestField.addAccountID(infoAccount.accountId)
    );
    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId));
    RequestField.addToInitField(RequestField.addEffectType("0"));
    let data = RequestField.addToInitField(
      RequestField.addLanguage(language.key)
    );
    data.fieldMap = _.orderBy(data.fieldMap, "fieldID");
    this.setState({ isChangeLanguage: true, isLoading: true });
    this.props.changeLanguage(data);
    RequestField.clearInitField();
  }

  responseMessage() {
    this.refs.responseMessage.onClose();
  }

  renderModalLanguage() {
    return (
      <Modal
        isVisible={this.state.isModalLanguage}
        onBackdropPress={() => this.setState({ isModalLanguage: false })}
      >
        <View style={{ justifyContent: "flex-start" }}>
          <View style={styles.modalContent}>
            <Text style={styles.txtHeaderModal}>
              {I18n.t("choseYourLanguage")}
            </Text>
            {_.map(Languages, (language) => {
              return (
                <TouchableOpacity
                  key={language.key}
                  onPress={() => this._onChangeLanguage(language)}
                  style={styles.language}
                >
                  <View style={styles.onTick}>
                    <View style={styles.logo}>
                      {language.key === "en_US" ? (
                        <Image
                          source={Images.ic_englishLang}
                          style={styles.iconLang}
                        />
                      ) : language.key === "en_LA" ? (
                        <Image
                          source={Images.ic_laosLang}
                          style={styles.iconLang}
                        />
                      ) : language.key === "en_VN" ? (
                        <Image
                          source={Images.ic_vietnamLang}
                          style={styles.iconLang}
                        />
                      ) : language.key === "en_CN" ? (
                        <Image
                          source={Images.ic_chineseLang}
                          style={styles.iconLang}
                        />
                      ) : null}
                      <Text
                        style={
                          I18n.currentLocale() === language.value
                            ? styles.txtLanguageActive
                            : styles.txtLanguage
                        }
                      >
                        {language.name}
                      </Text>
                    </View>
                    <View style={styles.iconTick}>
                      {I18n.currentLocale() === language.value ? (
                        <Ionicons
                          size={30}
                          name="md-checkmark-circle"
                          color={Colors.spinner}
                        />
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    );
  }
  onClearisPIN() {
    this.setState({ inputPIN: null });
  }
  // inpyt PIN
  renderModalInputPIN() {
    const { inputPIN, errorCodePin } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.setModleSecurity}
        onRequestClose={() => {
          this.setState({ setModleSecurity: false });
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{I18n.t("pleaseInputYourPin")}</Text>
            <View style={{ width: "100%", marginBottom: 15 }}>
              <FullTextInput
                label={I18n.t("pleaseInputYourPin")}
                placeholder={I18n.t("pleaseInputYourPin")}
                returnKeyType="done"
                keyboardType="numeric"
                value={inputPIN}
                error={null}
                maxLength={8}
                secureTextEntry={true}
                onChangeUserName={(text) => this.onChangInputPIN(text)}
                iconLeft="facebook"
                iconRight="close"
                textError={I18n.t("incorrectPhoneNumber")}
                onclick={() => this.onClearisPIN()}
              />
            </View>
            <View style={{ width: "100%", marginBottom: 15 }}>
              {/* <TouchableOpacity onPress={()=>this.onPressProcess()} style={{justifyContent:'center', alignItems:'center', backgroundColor:Colors.colorButton, padding:15}}>
                <Text style={{color:Colors.white}}>{I18n.t('continue')}</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.panelButton}
                onPress={() => this.onPressProcess()}
              >
                <Text style={styles.panelButtonTitle}>
                  {I18n.t("continue")}xxx
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  onSubmit(code) {
    const { newPin, season, currentPin } = this.state;
    const { infoAccount } = this.props;
    if (season === "currentPin") {
      RequestField.clearInitField();
      RequestField.addToInitField(
        RequestField.addPhone(infoAccount.phoneNumber)
      );
      RequestField.addToInitField(
        RequestField.addCarriedAccId(infoAccount.accountId)
      );
      RequestField.addToInitField(
        RequestField.addProcessCode(ConfigCode.VALIDATE_PIN)
      );
      RequestField.addToInitField(RequestField.addPan(infoAccount.pan));
      RequestField.addToInitField(RequestField.addPin(code));
      RequestField.addToInitField(RequestField.addTransDes("false"));
      RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId));
      const data = RequestField.addToInitField(
        RequestField.addAccountID(infoAccount.accountId)
      );
      data.fieldMap = _.orderBy(data.fieldMap, "fieldID");
      this.setState({
        isInputCurrentPin: true,
        season: "newPin",
        headerContent: "pleaseInputYourNewPin",
        currentPin: code,
      });
      RequestField.clearInitField();
      this.refs.ValidatePinModal.onOpen();
    }
    if (season === "newPin") {
      this.refs.ValidatePinModal.clearError();
      if (currentPin === code) {
        this.refs.ValidatePinModal.onOpen();
        this.refs.ValidatePinModal.setError("theNewPinIsTheSame");
      } else {
        this.setState({
          newPin: code,
          season: "confirmPin",
          headerContent: "pleaseConfirmYourNewPin",
        });
        this.refs.ValidatePinModal.onOpen();
      }
    }
    if (season === "confirmPin") {
      if (newPin === code) {
        RequestField.clearInitField();
        RequestField.addToInitField(
          RequestField.addPhone(infoAccount.phoneNumber)
        );
        RequestField.addToInitField(RequestField.addPan(infoAccount.pan));
        RequestField.addToInitField(RequestField.addPin(currentPin));
        RequestField.addToInitField(RequestField.addPinNew(code));
        RequestField.addToInitField(
          RequestField.addProcessCode(ConfigCode.SETTING_CHANGE_PIN)
        ); // 001002
        RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId));
        const data = RequestField.addToInitField(
          RequestField.addAccountID(infoAccount.accountId)
        );

        //Reactotron.log('dddd')
        //Reactotron.log(data)
        data.fieldMap = _.orderBy(data.fieldMap, "fieldID");

        // console.log('CHANGE PIN');
        this.setState({
          isInputCurrentPin: true,
          confirmPin: code,
          isLoading: true,
        });
        this.props.changePin(data);
        RequestField.clearInitField();
      } else {
        this.refs.ValidatePinModal.onOpen();
        this.refs.ValidatePinModal.setError("confirmPinIsWrong");
      }
    }
  }

  onResetState() {
    this.setState({
      headerContent: "pleaseInputYourCurrentPin",
      season: "currentPin",
      isInputCurrentPin: false,
    });
  }

  //
  changePin() {
    const { infoAccount } = this.props;
    RequestField.clearInitField();
    this.setState({
      isGetAccountInfoCurrentUser: true,
      isOnChangePin: true,
      isLoading: true,
    });
    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber));
    const data = RequestField.addToInitField(
      RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO)
    );
    this.props.getAccountInfoCurrentUser(data);
    RequestField.clearInitField();
  }
  //
  changeLanguage() {
    const { infoAccount } = this.props;
    RequestField.clearInitField();
    this.setState({
      isGetAccountInfoCurrentUser: true,
      isOnChangeLanguage: true,
    });
    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber));
    const data = RequestField.addToInitField(
      RequestField.addProcessCode(ConfigCode.SEARCH_ACCOUNT_INFO)
    );
    this.props.getAccountInfoCurrentUser(data);
    RequestField.clearInitField();
  }
  //
  Fingerprint() {}
  //
  toggleSwitch = (value) => {
    if(value==true){
      this.setState({ value: value });
      bs.current.snapTo(0);
    }
    else{
      this.fingerLogin(value);
      this.setState({ value: value });
      bs.current.snapTo(0);

    }
   
// thay cho quickpayment
    this.setState({ value: value });
    bs.current.snapTo(0);
  };

  // Model no internet
  // onModelNointernet = async (value) => {
  //   console.log('value:', value)
  //   const info = this.props.infoAccount
  //   return AsyncStorage.setItem('userInfo', JSON.stringify(info))
  //     .then(json => console.log('success!'))
  //     .catch(error => console.log('error!'));
  // }
  onSwitchSecurity = (value) => {
    const { infoAccount } = this.props;
    const { switchSecurity } = this.state;
    if (switchSecurity) {
      this.setState({ setModleSecurity: true });
    } else {
      RequestField.clearInitField();
      RequestField.addToInitField(RequestField.addActionNode("1")); //22
      RequestField.addToInitField(
        RequestField.addPhone(infoAccount.phoneNumber)
      ); //34
      RequestField.addToInitField(RequestField.addTier(0)); //63
      RequestField.addToInitField(
        RequestField.addPhone(infoAccount.phoneNumber)
      ); //68
      RequestField.addToInitField(
        RequestField.addCarriedAccId(infoAccount.accountId)
      ); //69
      RequestField.addToInitField(
        RequestField.addAccountID(infoAccount.accountId)
      ); //78
      RequestField.addToInitField(
        RequestField.addCarriedName(infoAccount.customerName)
      ); //125
      const data = RequestField.addToInitField(
        RequestField.addProcessCode(ConfigCode.HIGH_SECURITY)
      ); //3
      this.props.onCheckHighSecurity(data);
      this.setState({ isCheckHighSecurity: true, isLoading: true });
      RequestField.clearInitField();
    }
  };

  onModelNointernet = async (value) => {
    try {
      // console.log('value:', value)

      const info = this.props.infoAccount;
      const userName = info.customerName;
      const phoneNumber = info.phoneNumber;
      const pan = info.pan;
      const Code = info.agentCode.toString();
      const roleId = info.roleId;
      const jsonValue = JSON.stringify(info);
      await AsyncStorage.setItem("userInfo", jsonValue);
      await AsyncStorage.setItem("phoneNumber", phoneNumber);
      await AsyncStorage.setItem("userName", userName);
      await AsyncStorage.setItem("pan", pan);
      await AsyncStorage.setItem("agentCode", Code);
      // await AsyncStorage.setItem('roleId', roleId);
      if (value === true) {
        const dataInfo = await AsyncStorage.getItem("userInfo");
        await AsyncStorage.getItem("phoneNumber");
        await AsyncStorage.getItem("userName");
        await AsyncStorage.getItem("pan");
        await AsyncStorage.getItem("agentCode");
        // await AsyncStorage.getItem('roleId');
        if (dataInfo) {
          this.setState({
            switchValueInfo: dataInfo ? true : false,
            setModle: true,
            messge: "ShowModelNoInternet",
          });
        } else {
          alert("Not suport");
        }
      } else {
        try {
          await AsyncStorage.removeItem("userInfo");
          await AsyncStorage.removeItem("phoneNumber");
          await AsyncStorage.removeItem("userName");
          await AsyncStorage.removeItem("pan");
          await AsyncStorage.removeItem("agentCode");
          // await AsyncStorage.removeItem('roleId');
          this.setState({
            switchValueInfo: false,
            messge: "CloseModelNoInternet",
            setModle: true,
          });
        } catch (error) {
          console.log(" Error removing", error);
        }
      }
    } catch (e) {
      alert("Saving error", e);
    }
  };

  // onModelNointernet = (value) => {
  //   if (value === true) {
  //     const info = this.props.infoAccount
  //     const userName = info.customerName
  //     const phoneNumber = info.phoneNumber
  //     const pan = info.pan
  //     const Code = info.agentCode
  //     const roleId = info.roleId
  //     let data = [
  //       {
  //         "phoneNumber": phoneNumber,
  //         "userName": userName,
  //         "pan": pan,
  //         "agentCode": Code,
  //         "roleId": roleId,
  //       }
  //     ];
  //     console.log('<<<<    data >>>>>>', data)
  //   }
  // }

  onClose() {
    this.setState({ setModle: false });
  }

  rememberUser = async () => {
    const { getPhone, getPin } = this.state;
    try {
      if (
        getPhone !== "" &&
        getPin !== "" &&
        getPhone !== null &&
        getPin !== null
      ) {
        await AsyncStorage.setItem("_getPhone", getPhone);
        await AsyncStorage.setItem("_getPin", getPin);
      } else {
        alert("ON dat");
      }
    } catch (error) {
      console.log("Error saving data", error);
    }
  };

  onChangePin(text) {
    this.setState({ ValuePin: text });
  }
  onChangePinPayFinger(text) {
    this.setState({ valuePinPayWithFinger: text });
  }
  fingerQuickPay(value) {
    setTimeout(async () => {
      try {
        // kiểm tra ngôn ngữ hiện hành
        // console.log(I18n.currentLocale());
       
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
                this.setState({ switchValueCheck: value });
                bs2.current.snapTo(1);
              }
            })
            .catch((e) => {
              
              console.log("Errorrrrrrrrr",e);
            });
       
      } catch (e) {
        console.log(e);
      }
    }, 500);
  }
  fingerLogin(value) {
    setTimeout(async () => {
      try {
        // kiểm tra ngôn ngữ hiện hành
        // console.log(I18n.currentLocale());
       
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
                this.setState({ switchValue: value });
                bs.current.snapTo(1);
              }
            })
            .catch((e) => {
              
              console.log("Errorrrrrrrrr",e);
            });
       
      } catch (e) {
        console.log(e);
      }
    }, 500);
  }
  onOpneFinger = () => {
    const { ValuePin, getPin, value } = this.state;
    Keyboard.dismiss();
    this.setState({ValuePin:""})


    if (ValuePin == getPin) {
      this.setState({ValuePin:""})

      ReactNativeBiometrics.isSensorAvailable().then((resultObject) => {
        const { available, biometryType } = resultObject;
        if (available && biometryType === ReactNativeBiometrics.TouchID) {
          this.setState({ switchValue: value });
          if (value === true) {
            this.rememberUser();
            

          } else {
            this.forgetUser();
          }
        } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
          this.setState({ switchValue: value });
          if (value === true) {
            this.rememberUser();
          } else {
            this.forgetUser();
          }
        } else if (
          available &&
          biometryType === ReactNativeBiometrics.Biometrics
        ) {
          this.setState({ switchValue: value });
          if (value === true) {
            this.rememberUser();
          } else {
            this.forgetUser();
          }
        } else {
          this.BiometricsNotSupported();
        }
      });
    } else {
      AlertNative(I18n.t("10155"));
    }
    Keyboard.dismiss();
    bs.current.snapTo(1);
  };
  onOpenFinger2 = async() => {
    Keyboard.dismiss();

    const { ValuePin, getPin, valueFinger, switchValueCheck,valuePinPayWithFinger,valuePinPay } = this.state;
    if (valuePinPayWithFinger == getPin) {
      this.rememberUser2();
        const paybyFinger = await AsyncStorage.setItem("pinFingerPay",valuePinPayWithFinger);
        const paybyFinger1 = await AsyncStorage.getItem("pinFingerPay");

        console.log(paybyFinger1,"123")

      // this.setState({ valuePinPayWithFinger: "" });

      ReactNativeBiometrics.isSensorAvailable().then((resultObject) => {
        const { available, biometryType } = resultObject;
        if (available && biometryType === ReactNativeBiometrics.TouchID) {
          // this.setState({ switchValueCheck: switchValueCheck });
          this.setState({ switchValueCheck: valuePinPay });

          if (valueFinger === true) {
            this.rememberUser2();
          } else {
            this.forgetUser2();
          }
        } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
          this.setState({ switchValueCheck: valuePinPay });
          if (valueFinger === true) {
            this.rememberUser2();
          } else {
            this.forgetUser2();
          }
        } else if (
          available &&
          biometryType === ReactNativeBiometrics.Biometrics
        ) {
          this.setState({ switchValueCheck: valuePinPay });
          if (valueFinger === true) {
            this.rememberUser2();
          } else {
            this.forgetUser2();
          }
        } else {
          this.BiometricsNotSupported();
        }
      });
    } else {

      AlertNative(I18n.t("10155"));
    }
    bs2.current.snapTo(1);
  };
  onClearPhone() {
    this.setState({ ValuePin: null });
  }
  onClearPhone() {
    this.setState({ valuePinPayWithFinger: null });
  }

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>
          {I18n.t("pleaseInputPinToActive")}
        </Text>
        <Text style={styles.panelSubtitle}>{I18n.t("NAV_FINGERPRINT")}</Text>
      </View>
      <FullTextInput
        label={I18n.t("pleaseInputPinToActive")}
        placeholder={I18n.t("leaveMessage")}
        returnKeyType="done"
        keyboardType="numeric"
        value={this.state.ValuePin}
        onChangeUserName={(text) => this.onChangePin(text)}
        iconLeft="facebook"
        iconRight="close"
        secureTextEntry={true}
        textError={I18n.t("incorrectPhoneNumber")}
        onclick={() => this.onClearPhone()}
      />

      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.onOpneFinger()}
      >
        <Text style={styles.panelButtonTitle}>{I18n.t("txtNext")}</Text>
      </TouchableOpacity>
    </View>
  );
  renderInner2 = () => (
    <View style={styles.panel}>

      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>
          {I18n.t("pleaseInputPinToActive")}
        </Text>
        {/* <Text style={styles.panelSubtitle}>{I18n.t("NAV_FINGERPRINT")}</Text> */}
      </View>
   
      <FullTextInput
        label={I18n.t("pleaseInputPinToActive")}
        // ref={textInputRef}
        placeholder={I18n.t("leaveMessage")}
        returnKeyType="done"
        keyboardType="numeric"
        value={this.state.valuePinPayWithFinger}
        onChangeUserName={(text) => this.onChangePinPayFinger(text)}
        iconLeft="facebook"
        iconRight="close"
        secureTextEntry={true}
        textError={I18n.t("incorrectPhoneNumber")}
        onclick={() => this.onClearPhone()}
      />

      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.onOpenFinger2()}
      >
        <Text style={styles.panelButtonTitle}>{I18n.t("txtNext")}</Text>
      </TouchableOpacity>
    </View>
  );
  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  renderHeader2 = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  fingerPrintNosuport() {
    this.refs.fingerPrintNosuport.onClose();
  }
  changeLanguageSuccessfully() {
    this.refs.changeLanguageSuccessfully.onClose();
  }

  onChangInputPIN(text) {
    const errorCodePin =
      !text ||
      text.length < 6 ||
      text.length > 8 ||
      !isValidated(text, Constant.VALIDATE_NUMERIC)
        ? I18n.t("accept6DigitsOnly")
        : null;
    this.setState({ inputPIN: text, errorCodePin });
  }
  onPressProcess() {
    // console.log('inputPIN:', this.state.inputPIN)
    const { infoAccount } = this.props;
    if (this.state.inputPIN) {
      RequestField.clearInitField();
      RequestField.addToInitField(
        RequestField.addProcessCode(ConfigCode.VALIDATE_OTP)
      ); //3
      RequestField.addToInitField(
        RequestField.addPhone(infoAccount.phoneNumber)
      ); //34
      RequestField.addToInitField(RequestField.addPan(infoAccount.pan)); //2
      RequestField.addToInitField(RequestField.addPin(this.state.inputPIN)); //52
      RequestField.addToInitField(RequestField.addServiceCode("CALL_OTP")); //41
      RequestField.addToInitField(RequestField.addActionNode("1")); //22
      let callOTP = RequestField.addToInitField(
        RequestField.addLanguage(infoAccount.language)
      ); //113
      console.log("otpCashout:", callOTP);
      this.setState({
        isRequestOTP: true,
        isLoading: true,
        setModleSecurity: false,
      });
      this.props.requestOTP(callOTP);
      RequestField.clearInitField();
    } else {
      this.refs.responseMessage.onOpen();
      this.setState({ responseMessage: "PIN is null" });
    }
  }
  onModelotp() {
    const { dataOTP, run } = this.state;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.setModleOTP}
        onRequestClose={() => {
          this.setState({ setModleOTP: false });
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{I18n.t("EnterOTP")}</Text>
            <Text
              style={{ color: "#989898", textAlign: "center", marginBottom: 5 }}
            >
              {I18n.t("titelOTP")}
            </Text>
            <Text style={{ textAlign: "center" }}>
              {run ? (
                <CountDown
                  until={60}
                  onFinish={() => this.onFinishCD()}
                  onPress={() => this.onPressCD()}
                  size={20}
                />
              ) : (
                "00:00"
              )}
            </Text>
            {!run ? (
              <TouchableOpacity onPress={() => this.onResentOTP()}>
                <Text style={{ textAlign: "center" }}>
                  {I18n.t("NotReceivedYetResendOTP")}
                </Text>
              </TouchableOpacity>
            ) : null}
            <View style={{ width: "100%", marginBottom: 15 }}>
              <FullTextInput
                label={I18n.t("pleaseEnterOTP")}
                placeholder={I18n.t("pleaseEnterOTP")}
                returnKeyType="done"
                keyboardType="numeric"
                value={dataOTP}
                error={null}
                maxLength={8}
                onChangeUserName={(text) => this.onChangInputOTP(text)}
                iconLeft="facebook"
                iconRight="close"
                textError={I18n.t("incorrectPhoneNumber")}
                onclick={() => null}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  onModeShowinfo() {
    // console.log('----opbyvalueAmount', this.state.valueAmount)
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.setModleShowinfo}
        onRequestClose={() => {
          this.setState({ setModleShowinfo: false });
        }}
      >
        <Pressable
          onPress={() => this.setState({ setModleShowinfo: false })}
          style={{ flex: 1 }}
        >
          <View
            style={{
              justifyContent: "center",
              backgroundColor: Colors.white,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              borderRadius: 10,
            }}
          >
            <View style={styles.modalView}>
              <FlatList
                data={this.state.valueAmount}
                renderItem={({ item, index }) =>
                  this.renderItemStatus(item, index)
                }
                keyExtractor={(item) => item.par_id}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
    );
  }

  renderItemStatus = (item, index) => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          borderColor: Colors.dark_gray,
          borderBottomWidth: 1,
          padding: 10,
        }}
      >
        <View style={{ width: "60%" }}>
          <Text style={{ fontSize: 12, fontWeight: "500" }}>
            {I18n.t(item.par_code)}
          </Text>
        </View>
        <View style={{ width: "40%" }}>
          <Text
            style={{ fontSize: 12, fontStyle: "italic", fontWeight: "500" }}
          >
            {I18n.t("Below")} {formatNumber(item.par_value)} LAK
          </Text>
        </View>
      </View>
    );
  };

  onChangInputOTP(text) {
    if (text.length === 6) {
      const { infoAccount } = this.props;
      RequestField.clearInitField();
      RequestField.addToInitField(RequestField.addActionNode("1")); //22
      RequestField.addToInitField(
        RequestField.addPhone(infoAccount.phoneNumber)
      ); //34
      RequestField.addToInitField(RequestField.addTier(1)); //63
      RequestField.addToInitField(
        RequestField.addPhone(infoAccount.phoneNumber)
      ); //68
      RequestField.addToInitField(
        RequestField.addCarriedAccId(infoAccount.accountId)
      ); //69
      RequestField.addToInitField(
        RequestField.addAccountID(infoAccount.accountId)
      ); //78
      RequestField.addToInitField(
        RequestField.addCarriedName(infoAccount.customerName)
      ); //125
      RequestField.addToInitField(RequestField.addPin(this.state.inputPIN)); //52. codePin
      RequestField.addToInitField(RequestField.addPan(infoAccount.pan)); //2
      RequestField.addToInitField(RequestField.addOPT(text)); //53. text
      const data = RequestField.addToInitField(
        RequestField.addProcessCode(ConfigCode.HIGH_SECURITY)
      ); //3
      // console.log('-----data---111---:', data)
      this.props.onCheckHighSecurity(data);
      this.setState({
        isCheckHighSecurity: true,
        isLoading: true,
        setModleOTP: false,
      });
      RequestField.clearInitField();
    }
  }
  onPressCD = () => {
    // alert('Countdown Component Pressed...');
  };
  onFinishCD = () => {
    this.setState({ run: false });
  };
  onResentOTP = () => {};
  onShowInfo() {
    this.props.onGetAllconfigAmonut();
    this.setState({ onCallgetConfigAmonut: true, isLoading: true });
    // this.setState({ setModleShowinfo: true })
  }
  toggleSwitchCheck = (value) => {
    if(value==true){
      this.setState({ valuePinPay: value });
      bs2.current.snapTo(0);
    }
    else{
      this.fingerQuickPay(value);
      this.setState({ valuePinPay: value });
      bs2.current.snapTo(0);

    }
    this.setState({ valuePinPay: value });
    bs2.current.snapTo(0);
  };
 
  saveSwitchValue = async (value) => {
    try {
      await AsyncStorage.setItem("switchValue", JSON.stringify(value));
      // pinPayFinger
      await AsyncStorage.setItem(
        "pinFingerPay",
        JSON.stringify(this.state.ValuePin)
      );

    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { isLoading, messge, responseMessage, switchSecurity } = this.state;
    // console.log('switchSecurity:', switchSecurity)
    return (
      <View style={styles.container}>
        <BottomSheet
          ref={bs}
          snapPoints={Platform.OS=='ios' ?[580,0] :[330,0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
        <BottomSheet
          ref={bs2}
          snapPoints={Platform.OS=='ios' ?[570,0] :[330,0]}
          renderContent={this.renderInner2}
          renderHeader={this.renderHeader2}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
        <Animated.View
          style={{
            flex: 1,
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}
        >
          <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
          <SafeAreaView style={styles.container}>
            {isLoading ? <ActivityIndicator /> : null}
            <View style={styles.cardView}>
              <TouchableOpacity
                style={styles.rowStyle}
                onPress={() => this.changePin()}
              >
                <Image source={Images.icRevert} style={styles.iconStyle} />
                <Text style={styles.txtItem}>{I18n.t("changePin")}</Text>
              </TouchableOpacity>
              <Hr
                marginLeft={0}
                marginRight={0}
                lineColor={Colors.borderColor}
                marginTop={10}
                marginBottom={10}
              />
              <TouchableOpacity
                style={styles.rowStyle}
                onPress={() => this.changeLanguage()}
              >
                <Image source={Images.icAlphabet} style={styles.iconStyle} />
                <Text style={styles.txtItem}>{I18n.t("changeLanguage")}</Text>
              </TouchableOpacity>

              <Hr
                marginLeft={0}
                marginRight={0}
                lineColor={Colors.borderColor}
                marginTop={10}
                marginBottom={10}
              />
              <TouchableOpacity
                style={styles.rowStyleFingerprint}
                onPress={() => this.Fingerprint()}
              >
                <View style={styles.Fingerprint}>
                  <FontAwesome
                    name="internet-explorer"
                    color={Colors.orange}
                    size={30}
                    style={styles.iconStyle}
                  />
                  <Text numberOfLines={1} style={styles.txtItem}>
                    {I18n.t("openModelNoInternet")}
                  </Text>
                </View>
                <View>
                  <Switch
                    onValueChange={(value) => this.onModelNointernet(value)}
                    value={this.state.switchValueInfo}
                  />
                </View>
              </TouchableOpacity>
              <Hr
                marginLeft={0}
                marginRight={0}
                lineColor={Colors.borderColor}
                marginTop={10}
                marginBottom={10}
              />
              <TouchableOpacity
                style={styles.rowStyleFingerprint}
                onPress={() => this.Fingerprint()}
              >
                <View style={styles.Fingerprint}>
                  <Image
                      source={Platform.OS=='ios' ? Images.ic_Faceid : Images.ic_FingerPrint}
                      style={styles.iconStyle}
                  />
                  <Text style={styles.txtItem}>
                    {Platform.OS=='ios' ? I18n.t("faceIdVerification") : I18n.t("fingerprintVeri")}
                  </Text>
                </View>
                <View>
                  <Switch
                    onValueChange={(value) => this.toggleSwitch(value)}
                    value={this.state.switchValue}
                  />
                </View>
              </TouchableOpacity>
              <Hr
                marginLeft={0}
                marginRight={0}
                lineColor={Colors.borderColor}
                marginTop={10}
                marginBottom={10}
              />
            
            
              {/* <Hr
                marginLeft={0}
                marginRight={0}
                lineColor={Colors.borderColor}
                marginTop={10}
                marginBottom={10}
              /> */}
              <TouchableOpacity
                style={styles.rowStyleFingerprint}
                // onPress={() => this.Fingerprint()}
              >
                <View style={styles.Fingerprint}>
                  <Image
                      source={Platform.OS=='ios' ? Images.ic_Faceid : Images.ic_FingerPrint}
                      style={styles.iconStyle}
                  />
                  <Text style={styles.txtItem}>
                  {I18n.t("quickPayment")}
                  </Text>
                </View>
                <View>
                  <Switch
                    onValueChange={(value) => {
                      this.toggleSwitchCheck(value);
                      // this.onOpenFinger2(value)
                      this.saveSwitchValue(value);
                    }}
                    value={this.state.switchValueCheck}
                  />
                </View>
              </TouchableOpacity>
              <Hr
                marginLeft={0}
                marginRight={0}
                lineColor={Colors.borderColor}
                marginTop={10}
                marginBottom={10}
              />
              {/* <TouchableOpacity style={styles.rowStyleFingerprint} onPress={() => this.Fingerprint()}>
                <View style={styles.Fingerprint}>
                  <Image source={Images.ic_HighSecurity} style={styles.iconStyle} />
                  <Text style={styles.txtItem}>{I18n.t('txtHighSecurity')}</Text>
                </View>
                <View>
                  <Switch
                    onValueChange={(value) => this.onSwitchSecurity(value)}
                    value={this.state.switchSecurity}

                  />
                </View>
              </TouchableOpacity>
              <Hr marginLeft={0} marginRight={0} lineColor={Colors.borderColor} marginTop={10} marginBottom={10} /> */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", width: "90%" }}>
                  <View style={{ width: "15%" }}>
                    <Image
                      source={Images.ic_HighSecurity}
                      style={styles.iconStyle}
                    />
                  </View>
                  <View
                    style={{
                      width: Platform.OS=='ios' ?"80%" :"85%",
                      flexWrap: "wrap",
                      // flexDirection: "row",
                      // backgroundColor:"red",
                      flex:0.8
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.txtItem}>
                        {I18n.t("txtHighSecurity")}
                      </Text>
                      {switchSecurity ? null : (
                        <TouchableOpacity onPress={() => this.onShowInfo()}>
                          <Image
                            source={Images.ic_Vector}
                            style={{ width: 14, height: 14, left: 5 }}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          color: switchSecurity ? Colors.green : Colors.red,
                          fontStyle: "italic",
                        }}
                      >
                        {switchSecurity ? I18n.t("ON") : I18n.t("OFF")} -{" "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          color: "#A0A0A0",
                          fontStyle: "italic",
                        }}
                      >
                        {switchSecurity
                          ? I18n.t("statusSwichOn")
                          : I18n.t("statusSwichOff")}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Switch
                    onValueChange={(value) => this.onSwitchSecurity(value)}
                    value={this.state.switchSecurity}
                  />
                </View>
              </View>
            </View>
            {this.renderModalLanguage()}
            {this.renderModalInputPIN()}
            {this.onModelotp()}
            {this.onModeShowinfo()}

            <Notification
              headerType="Warning"
              title={I18n.t("info")}
              textContent={responseMessage}
              buttonText={I18n.t("ok")}
              isButton={true}
              onPress={() => this.responseMessage()}
              ref="responseMessage"
            />

            <Notification
              headerType="Warning"
              title={I18n.t("info")}
              textContent={I18n.t("fingerPrintNosuport")}
              buttonText={I18n.t("ok")}
              isButton={true}
              onPress={() => this.fingerPrintNosuport()}
              ref="fingerPrintNosuport"
            />

            <Notification
              headerType="Success"
              title={I18n.t("info")}
              textContent={I18n.t("changeLanguageSuccessfully")}
              buttonText={I18n.t("ok")}
              isButton={true}
              onPress={() => this.changeLanguageSuccessfully()}
              ref="changeLanguageSuccessfully"
            />
          </SafeAreaView>
        </Animated.View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.setModle}
          onRequestClose={() => {
            this.setState({ setModle: false });
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                width: "80%",
                height: null,
                backgroundColor: Colors.white,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.32,
                shadowRadius: 5.46,

                elevation: 9,
              }}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={90}
                color="#33cc33"
              />
              <View
                style={{
                  alignItems: "center",
                  padding: 10,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {I18n.t(messge)}
                </Text>
              </View>
              <Text></Text>
              <TouchableOpacity
                style={styles.buttom}
                onPress={() => this.onClose()}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: Colors.txtUpLight,
                  }}
                >
                  {I18n.t("success")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    infoAccount: state.auth.infoAccount,
    changePinData: state.auth.changePinData,
    changeLanguageData: state.auth.changeLanguageData,
    actionType: state.auth.actionType,
    user: state.auth.user,
    previousPhone: state.auth.previousPhone,

    ByPassPinReducer: state.ByPassPinReducer,
    dataOnSecurity: state.ByPassPinReducer.dataOnSecurity,
    dataCheckSwich: state.ByPassPinReducer.dataCheckSwich,
    dataGetAllAmount: state.ByPassPinReducer.dataGetAllAmount,

    BankReducer: state.BankReducer,
    actionType: state.BankReducer.actionType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckHighSecurity: (data) => {
      dispatch(onCheckHighSecurity(data));
    },
    changeLanguage: (language) => {
      dispatch(changeLanguage(language));
    },
    changePin: (language) => {
      dispatch(changePin(language));
    },
    validatePin: (pin) => {
      dispatch(validatePin(pin));
    },
    getAccountInfoCurrentUser: (data) => {
      dispatch(login(data, false));
    },
    changeLocalLanguage: (language) => {
      dispatch(changeLocalLanguage(language));
    },
    requestOTP: (data) => {
      dispatch(requestOTP(data));
    },
    onCallCheckSwich: (data) => {
      dispatch(onCallCheckSwich(data));
    },
    onGetAllconfigAmonut: () => {
      dispatch(onGetAllconfigAmonut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);