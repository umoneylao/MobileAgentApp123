import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import {
  HeaderTileComponent,
  FullTextInput,
  FullNewButton,
  SetModalComponent,
  Notification,
} from "../../components";
import { Colors, Fonts, Metrics, Images } from "../../themes";
import I18n from "react-native-i18n";
import CircleCheckBox, {
  LABEL_POSITION,
} from "../../components/CircleCheckbox";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as Constant from "../../utils/Constant";
import { isValidated } from "../../utils/Validate";
import { formatNumber } from "../../utils/Formater";
import moment from "moment";

var today = new Date();
let date;
const ListRelation = [
  { id: 1, name: "Father", value: "Father", key: "RELATION" },
  { id: 2, name: "Mommy", value: "Mother", key: "RELATION" },
  { id: 3, name: "WifeHusband", value: "WifeHusband", key: "RELATION" },
  { id: 4, name: "Child", value: "Child", key: "RELATION" },
  {
    id: 5,
    name: "BrotherOldersister",
    values: "BrotherOldersister",
    key: "RELATION",
  },
  { id: 6, name: "Other", value: "Other", key: "RELATION" },
];

const items = [
  { id: 1, name: "PPID", value: "PPID", key: "PAPER" },
  { id: 2, name: "PPRT", value: "PPRT", key: "PAPER" },
  { id: 3, name: "FABO", value: "FABO", key: "PAPER" },
  { id: 4, name: "OTHE", value: "OTHE", key: "PAPER" },
];
const GenderList = [
  { id: 1, name: "male", value: "male", key: "Gender" },
  { id: 2, name: "female", value: "female", key: "Gender" },
];
const lang = I18n.currentLocale();
class APAInsuranceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InsuredName: '',
      Phone: '',
      male: false,
      setModalVisiblePackagesDetail: false,
      setModalVisiblePackagesList: false,
      setModalVisibleRelation: false,
      setModalVisiblePaper: false,
      setModalVisibleInfo: false,
      Relation: "RelationSelect",
      Package: I18n.t('PackageSelect'), //PackageSelect
      PaperType: "DriverLicense",
      DateBirth: (date =
        today.getDate() +
        "/" +
        parseInt(today.getMonth() + 1) +
        "/" +
        today.getFullYear()),
      isDatePicker: false,
      Gender: "Gender",
      setModalVisibleGender: false,
      setModalVisibleDataPackge: false,
      policyNo: null,
      saveCer: false,
      lange: null,
      FullName: '',
      Address: '',
      PaperNumber: ''
    };
  }
  componentDidMount() {
    const lang = I18n.currentLocale();
    this.setState({ lange: lang });
  }
  onClearInsuredName() {
    this.setState({ InsuredName: null });
  }
  onClearFullName() {
    this.setState({ FullName: null });
  }
  onChangeInsuredName(text) {
    let errorInsuredName =
      !text ||
        text.length < 2 ||
        !isValidated(text, Constant.VALIDATE_NON_SPECIAL)
        ? I18n.t("nameIsInvalid")
        : null;
    if (!text) {
      errorInsuredName = I18n.t("nameIsInvalid");
    }
    this.setState({ InsuredName: text, errorInsuredName });
  }
  onChangeInsuredFullName(text) {
    let errorFullName =
      !text ||
        text.length < 2 ||
        !isValidated(text, Constant.VALIDATE_NON_SPECIAL)
        ? I18n.t("nameIsInvalid")
        : null;
    if (!text) {
      errorFullName = I18n.t("nameIsInvalid");
    }
    this.setState({ FullName: text, errorFullName });
  }
  onClearPhone() {
    this.setState({ Phone: null });
  }
  onChangePhone(text) {
    const errorPhone =
      !text || text.length < 1 || !isValidated(text, Constant.VALIDATE_PHONE)
        ? I18n.t("incorrectPhoneNumber")
        : "";
    this.setState({ Phone: text, errorPhone });
  }
  onChangePaperNumber(text) {
    let errorPaperNumber =
      !text ||
        text.length < 1 ||
        !isValidated(text, Constant.VALIDATE_NON_SPECIAL)
        ? I18n.t("pleaseInputCorrectField")
        : null;
    if (!text) {
      errorPaperNumber = I18n.t("pleaseInputCorrectField");
    }
    this.setState({ PaperNumber: text, errorPaperNumber });
  }
  onChangePaperType() {
    let errorPaperType =
      !text ||
        text.length < 2 ||
        !isValidated(text, Constant.VALIDATE_NON_SPECIAL)
        ? I18n.t("pleaseInputCorrectField")
        : null;
    if (!text) {
      errorPaperType = I18n.t("pleaseInputCorrectField");
    }
    this.setState({ PaperType: text, errorPaperType });
  }
  onClearPaperNumber() {
    this.setState({ PaperNumber: null });
  }
  onClearPaperType() {
    this.setState({ setModalVisiblePaper: true });
  }
  onClearGender() {
    this.setState({ setModalVisibleGender: true });
  }
  onChangeGender() { }
  onClearDateBirth() {
    this.setState({ isDatePicker: true });
  }
  onChangeDateofBirth() { }
  onChangeAddress(text) {
    let errorAddress =
      !text ||
        text.length < 5 ||
        !isValidated(text, Constant.VALIDATE_NON_SPECIAL)
        ? I18n.t("pleaseInputCorrectField")
        : null;
    if (!text) {
      errorAddress = I18n.t("pleaseInputCorrectField");
    }
    this.setState({ Address: text, errorAddress });
  }
  onClearAddress() {
    this.setState({ Address: null });
  }

  onClearRelation() {
    this.setState({ setModalVisibleRelation: true });
  }
  onChangeRelation(text) {
    let errorRelation =
      !text ||
        text.length < 3 ||
        !isValidated(text, Constant.VALIDATE_NON_SPECIAL)
        ? I18n.t("pleaseInputCorrectField")
        : null;
    if (!text) {
      errorRelation = I18n.t("pleaseInputCorrectField");
    }
    this.setState({ Relation: text, errorRelation });
  }
  inFoCircle() {
    this.setState({ setModalVisibleInfo: true });
  }
  onPackagesDetail() {
    this.setState({ setModalVisiblePackagesDetail: true });
  }
  onPackagesList() {
    this.setState({ setModalVisiblePackagesList: true });
  }
  onClose() {
    this.setState({ setModalVisiblePackagesList: false });
  }
  onCloseInfo() {
    this.setState({ setModalVisibleInfo: false });
  }
  onCloseRelation() {
    this.setState({ setModalVisibleRelation: false });
  }
  onClosePaper() {
    this.setState({ setModalVisiblePaper: false });
  }
  onCloseGender() {
    this.setState({ setModalVisibleGender: false });
  }
  onClearPackage() {
    this.setState({ setModalVisibleDataPackge: true });
  }
  onSelectItem = (value, name, key) => {
    switch (key) {
      case "PAPER":
        this.setState({ PaperType: name, setModalVisiblePaper: false });
        break;
      case "RELATION":
        this.setState({ Relation: name, setModalVisibleRelation: false });
        break;
      case "Gender":
        this.setState({ Gender: name, setModalVisibleGender: false });
        break;
      default:
        break;
    }
  };

  renderItemOptionPackage = (item, index) => {
    const { lange } = this.state;
    return index == 0 ? (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 0.5,
          borderColor: "#ccc",
          padding: 10,
        }}
      >
        <View style={{ width: "75%", justifyContent: "flex-start" }}>
          <Text style={{ textAlign: "justify" }}>
            {lange === "lo"
              ? item.LA_KEY
              : lange === "en"
                ? item.US_KEY
                : lange === "vn"
                  ? item.VN_KEY
                  : lange === "cn"
                    ? item.CN_KEY
                    : item.LA_KEY}
          </Text>
        </View>
        <View style={{ width: "25%", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 14,
              color: Colors.orange,
              fontWeight: "500",
              left: 10,
            }}
          >
            {formatNumber(item.APA_VALUE)}
          </Text>
        </View>
      </View>
    ) : index == 1 ? (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 0.5,
          borderColor: "#ccc",
          padding: 10,
        }}
      >
        <View style={{ width: "75%", justifyContent: "flex-start" }}>
          <Text style={{ textAlign: "justify" }}>
            {lange === "lo"
              ? item.LA_KEY
              : lange === "en"
                ? item.US_KEY
                : lange === "vn"
                  ? item.VN_KEY
                  : lange === "cn"
                    ? item.CN_KEY
                    : item.LA_KEY}
          </Text>
        </View>
        <View style={{ width: "25%", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 14,
              color: Colors.orange,
              fontWeight: "500",
              left: 10,
            }}
          >
            {formatNumber(item.APA_VALUE)}
          </Text>
        </View>
      </View>
    ) : index == 2 ? (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 0.5,
          borderColor: "#ccc",
          padding: 10,
        }}
      >
        <View style={{ width: "75%", justifyContent: "flex-start" }}>
          <Text style={{ textAlign: "justify" }}>
            {lange === "lo"
              ? item.LA_KEY
              : lange === "en"
                ? item.US_KEY
                : lange === "vn"
                  ? item.VN_KEY
                  : lange === "cn"
                    ? item.CN_KEY
                    : item.LA_KEY}
          </Text>
        </View>
        <View style={{ width: "25%", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 14,
              color: Colors.orange,
              fontWeight: "500",
              left: 10,
            }}
          >
            {formatNumber(item.APA_VALUE)}
          </Text>
        </View>
      </View>
    ) : index == 3 ? (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 0.5,
          borderColor: "#ccc",
          padding: 10,
        }}
      >
        <View style={{ width: "75%", justifyContent: "flex-start" }}>
          <Text style={{ textAlign: "justify" }}>
            {lange === "lo"
              ? item.LA_KEY
              : lange === "en"
                ? item.US_KEY
                : lange === "vn"
                  ? item.VN_KEY
                  : lange === "cn"
                    ? item.CN_KEY
                    : item.LA_KEY}
          </Text>
        </View>
        <View style={{ width: "25%", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 14,
              color: Colors.orange,
              fontWeight: "500",
              left: 10,
            }}
          >
            {formatNumber(item.APA_VALUE)}
          </Text>
        </View>
      </View>
    ) : null;
  };
  renderItem = (item, index) => {
    const { lange } = this.state;
    return index == 4 ? (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 0.5,
          borderColor: "#ccc",
          padding: 10,
        }}
      >
        <View style={{ width: "75%", justifyContent: "flex-start" }}>
          <Text style={{ textAlign: "justify" }}>
            {lange === "lo"
              ? item.LA_KEY
              : lange === "en"
                ? item.US_KEY
                : lange === "vn"
                  ? item.VN_KEY
                  : lange === "cn"
                    ? item.CN_KEY
                    : item.LA_KEY}
          </Text>
        </View>
        <View style={{ width: "25%", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 14,
              color: Colors.orange,
              fontWeight: "500",
              left: 10,
            }}
          >
            {formatNumber(item.APA_VALUE)}
          </Text>
        </View>
      </View>
    ) : index == 5 ? (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 0.5,
          borderColor: "#ccc",
          padding: 10,
        }}
      >
        <View style={{ width: "75%", justifyContent: "flex-start" }}>
          <Text style={{ textAlign: "justify" }}>
            {lange === "lo"
              ? item.LA_KEY
              : lange === "en"
                ? item.US_KEY
                : lange === "vn"
                  ? item.VN_KEY
                  : lange === "cn"
                    ? item.CN_KEY
                    : item.LA_KEY}
          </Text>
        </View>
        <View style={{ width: "25%", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 14,
              color: Colors.orange,
              fontWeight: "500",
              left: 10,
            }}
          >
            {formatNumber(item.APA_VALUE)}
          </Text>
        </View>
      </View>
    ) : index == 6 ? (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 0.5,
          borderColor: "#ccc",
          padding: 10,
        }}
      >
        <View style={{ width: "75%", justifyContent: "flex-start" }}>
          <Text style={{ textAlign: "justify" }}>
            {lange === "lo"
              ? item.LA_KEY
              : lange === "en"
                ? item.US_KEY
                : lange === "vn"
                  ? item.VN_KEY
                  : lange === "cn"
                    ? item.CN_KEY
                    : item.LA_KEY}
          </Text>
        </View>
        <View style={{ width: "25%", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 14,
              color: Colors.orange,
              fontWeight: "500",
              left: 10,
            }}
          >
            {formatNumber(item.APA_VALUE)}
          </Text>
        </View>
      </View>
    ) : index == 7 ? (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 0.5,
          borderColor: "#ccc",
          padding: 10,
        }}
      >
        <View style={{ width: "75%", justifyContent: "flex-start" }}>
          <Text style={{ textAlign: "justify" }}>
            {lange === "lo"
              ? item.LA_KEY
              : lange === "en"
                ? item.US_KEY
                : lange === "vn"
                  ? item.VN_KEY
                  : lange === "cn"
                    ? item.CN_KEY
                    : item.LA_KEY}
          </Text>
        </View>
        <View style={{ width: "25%", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 14,
              color: Colors.orange,
              fontWeight: "500",
              left: 10,
            }}
          >
            {formatNumber(item.APA_VALUE)}
          </Text>
        </View>
      </View>
    ) : index == 8 ? (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 0.5,
          borderColor: "#ccc",
          padding: 10,
        }}
      >
        <View style={{ width: "75%", justifyContent: "flex-start" }}>
          <Text style={{ textAlign: "justify" }}>
            {lange === "lo"
              ? item.LA_KEY
              : lange === "en"
                ? item.US_KEY
                : lange === "vn"
                  ? item.VN_KEY
                  : lange === "cn"
                    ? item.CN_KEY
                    : item.LA_KEY}
          </Text>
        </View>
        <View style={{ width: "25%", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 14,
              color: Colors.orange,
              fontWeight: "500",
              left: 10,
            }}
          >
            {formatNumber(item.APA_VALUE)}
          </Text>
        </View>
      </View>
    ) : index == 9 ? (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 0.5,
          borderColor: "#ccc",
          padding: 10,
        }}
      >
        <View style={{ width: "75%", justifyContent: "flex-start" }}>
          <Text style={{ textAlign: "justify" }}>
            {lange === "lo"
              ? item.LA_KEY
              : lange === "en"
                ? item.US_KEY
                : lange === "vn"
                  ? item.VN_KEY
                  : lange === "cn"
                    ? item.CN_KEY
                    : item.LA_KEY}
          </Text>
        </View>
        <View style={{ width: "25%", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 14,
              color: Colors.orange,
              fontWeight: "500",
              left: 10,
            }}
          >
            {formatNumber(item.APA_VALUE)}
          </Text>
        </View>
      </View>
    ) : null;
  };

  _hideDateTimePicker = () => this.setState({ isDatePicker: false });
  _handleDatePicked = (date) => {
    this.setState({
      DateBirth: moment(date).format("DD/MM/YYYY"),
      mBirthDay: date.getFullYear(),
    });
    this._hideDateTimePicker(JSON.stringify(moment(date).format("DD/MM/YYYY")));
  };

  renderItemStatus(item, index) {
    const { lange } = this.state;
    return (
      <View>
        <TouchableOpacity
          style={styles.warpItemList}
          onPress={() => this.selectPackage(item)}
        >
          <Text style={styles.txtIcon} numberOfLines={1}>
            {lange === "lo"
              ? item.APA_NAME_LA
              : lange === "en"
                ? item.APA_NAME_US
                : lange === "vn"
                  ? item.APA_NAME_VN
                  : lange === "cn"
                    ? item.APA_NAME_CN
                    : item.APA_NAME_LA}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  selectPackage = (item) => {
    const { lange } = this.state;
    if (item) {
      let policy_no = item.POLICY_NO;
      this.setState({
        Package:
          lange === "lo"
            ? item.APA_NAME_LA
            : lange === "en"
              ? item.APA_NAME_US
              : lange === "vn"
                ? item.APA_NAME_VN
                : lange === "cn"
                  ? item.APA_NAME_CN
                  : item.APA_NAME_LA,
        policyNo: item.POLICY_NO,
      });
      this.props.selectPolicyNo(policy_no);
      this.onClosePaperData();
    } else {
      this.refs.responseDescripTion.onOpen();
      this.setState({ messageError: I18n.t("10119") });
    }
  };
  onClosePaperData() {
    this.setState({ setModalVisibleDataPackge: false });
  }
  responseDescripTion() {
    this.refs.responseDescripTion.onClose();
  }
  onCloseDetial() {
    this.setState({ setModalVisiblePackagesDetail: false });
  }
  onPressProcess() {
    const {
      InsuredName,
      Phone,
      DateBirth,
      Gender,
      PaperType,
      PaperNumber,
      Address,
      FullName,
      Relation,
      male,
      Package,
      policyNo,
      saveCer
    } = this.state;
    const { OptionPackage } = this.props;
    const data = DateBirth.split("/");

    let DayNow = moment(new Date()).format("DD"); //10
    let MonthNow = moment(new Date()).format("MM"); //10
    let NamNow = moment(new Date()).format("YYYY"); //10

    let DayBirth = data[0]; //13/12/2021
    let MonthBirth = data[1]; //12
    let NamBirth = data[2]; //13/12/2021
    let TinhNam = NamNow - NamBirth;

    if (TinhNam == 18) {
      if (MonthNow == MonthBirth) {
        if (DayBirth <= DayNow) {
          if (TinhNam > 60) {
            this.refs.responseDescripTion.onOpen();
            this.setState({ messageError: I18n.t("max60YearsOld") });
            return;
          }
        } else {
          this.refs.responseDescripTion.onOpen();
          this.setState({ messageError: I18n.t("mai18YearsOld") });
          return;
        }
      }
    } else if (TinhNam > 18) {

      let M = moment('12/12/2022').format("MM");
      if (TinhNam == 61) {
        if (MonthBirth > M) {
          if (DayBirth <= DayNow) {
            this.refs.responseDescripTion.onOpen();
            this.setState({ messageError: I18n.t("max60YearsOld") });
            return;
          }
        }
      } else if (TinhNam > 61) {
        this.refs.responseDescripTion.onOpen();
        this.setState({ messageError: I18n.t("max60YearsOld") });
        return;
      }
    } else if (TinhNam < 18) {
      this.refs.responseDescripTion.onOpen();
      this.setState({ messageError: I18n.t("mai18YearsOld") });
      return;
    }

    if (!saveCer) {
      this.refs.responseDescripTion.onOpen();
      this.setState({ messageError: I18n.t("confirmInfor") });
      return;
    }
    if (Phone.substring(0, 3) == "020" || Phone.substring(0, 3) == "030") {
      if (OptionPackage) {
        if (Gender != "Gender") {
          if (PaperType != "DriverLicense") {
            if (Relation != "RelationSelect") {
              if (Gender || PaperType || Relation || Package) {
                const DISCOUNT = OptionPackage[5].APA_VALUE;
                const VAT = OptionPackage[7].APA_VALUE;
                const FEE = OptionPackage[8].APA_VALUE;
                const GRAND_TOTAL = OptionPackage[9].APA_VALUE;
                let dataAPA = [
                  DISCOUNT,
                  VAT,
                  FEE,
                  GRAND_TOTAL,
                  InsuredName,
                  Phone,
                  DateBirth,
                  Gender,
                  PaperType,
                  PaperNumber,
                  Address,
                  FullName,
                  Relation,
                  male,
                  Package,
                  policyNo,
                ];
                this.props.Navigetion(dataAPA);
              } else {
                this.refs.responseDescripTion.onOpen();
                this.setState({
                  messageError: I18n.t("invalidIdentificationInformation"),
                });
              }
            } else {
              this.refs.responseDescripTion.onOpen();
              this.setState({
                messageError: I18n.t("PleaseSelectRelationship"),
              });
            }
          } else {
            this.refs.responseDescripTion.onOpen();
            this.setState({ messageError: I18n.t("PleaseSelectFileType") });
          }
        } else {
          this.refs.responseDescripTion.onOpen();
          this.setState({ messageError: I18n.t("PleaseSelectGender") });
        }
      } else {
        this.refs.responseDescripTion.onOpen();
        this.setState({ messageError: I18n.t("PleaseSelectInsurancePackage") });
      }
    } else {
      this.refs.responseDescripTion.onOpen();
      this.setState({ messageError: I18n.t("formatPhone") });
      return;
    }
  }

  save() {
    const { saveCer } = this.state;
    this.setState(saveCer ? { saveCer: false } : { saveCer: true });
  }

  render() {
    const {
      InsuredName,
      errorInsuredName,
      Phone,
      errorPhone,
      DateBirth,
      errorDateBirth,
      Gender,
      errorGender,
      PaperType,
      errorPaperType,
      PaperNumber,
      errorPaperNumber,
      Address,
      errorAddress,
      FullName,
      errorFullName,
      Relation,
      errorRelation,
      male,
      Package,
      errorPackage,
      messageError,
      saveCer,
    } = this.state;
    const { PackageData } = this.props;
    return (
      <View style={styles.container}>
        <SafeAreaView>
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            <HeaderTileComponent txtHeader="InsuredInformation" />
            <View style={styles.GroudTxt}>
              <View style={styles.row}>
                <View style={styles.txtLeft}>
                  <FullTextInput
                    label={I18n.t("InsuredName")}
                    placeholder={I18n.t("InputinsuredName")}
                    returnKeyType="done"
                    keyboardType="default"
                    value={InsuredName}
                    error={errorInsuredName}
                    maxLength={50}
                    onChangeUserName={(text) => this.onChangeInsuredName(text)}
                    iconLeft="facebook"
                    iconRight="close"
                    textError={I18n.t("nameIsInvalid")}
                    onclick={() => this.onClearInsuredName()}
                  />
                </View>
                <View style={styles.txtheight}>
                  <FullTextInput
                    label={I18n.t("Phone")}
                    placeholder={I18n.t("formatPhone")}
                    returnKeyType="done"
                    keyboardType="number-pad"
                    value={Phone}
                    error={errorPhone}
                    maxLength={13}
                    onChangeUserName={(text) => this.onChangePhone(text)}
                    iconLeft="facebook"
                    iconRight="close"
                    textError={I18n.t("incorrectPhoneNumber")}
                    onclick={() => this.onClearPhone()}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.txtLeft}
                  onPress={() => this.onClearDateBirth()}
                >
                  <FullTextInput
                    label={I18n.t("DateofBirth")}
                    placeholder={I18n.t("InputDateofBirth")}
                    returnKeyType="done"
                    keyboardType="default"
                    value={DateBirth}
                    error={errorDateBirth}
                    maxLength={20}
                    onChangeUserName={(text) => this.onChangeDateofBirth(text)}
                    iconLeft="facebook"
                    iconRight="calendar"
                    editable={false}
                    textError={I18n.t("incorrectPhoneNumber")}
                    onclick={() => this.onClearDateBirth()}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.txtheight}
                  onPress={() => this.onClearGender()}
                >
                  <FullTextInput
                    label={I18n.t("Gender")}
                    placeholder={I18n.t("InputGender")}
                    returnKeyType="done"
                    keyboardType="default"
                    value={I18n.t(Gender)}
                    error={errorGender}
                    maxLength={30}
                    editable={false}
                    onChangeUserName={(text) => this.onChangeGender(text)}
                    iconLeft="facebook"
                    iconRight="chevron-down"
                    textError={I18n.t("incorrectPhoneNumber")}
                    onclick={() => this.onClearGender()}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.txtLeft}
                  onPress={() => this.onClearPaperType()}
                >
                  <FullTextInput
                    label={I18n.t("PaperType")}
                    placeholder={I18n.t("InputPaperType")}
                    returnKeyType="done"
                    keyboardType="default"
                    value={I18n.t(PaperType)}
                    error={errorPaperType}
                    maxLength={20}
                    onChangeUserName={(text) => this.onChangePaperType(text)}
                    iconLeft="facebook"
                    iconRight="chevron-down"
                    editable={false}
                    textError={I18n.t("pleaseInputCorrectField")}
                    onclick={() => this.onClearPaperType()}
                  />
                </TouchableOpacity>
                <View style={styles.txtheight}>
                  <FullTextInput
                    label={I18n.t("PaperNumber")}
                    placeholder={I18n.t("InputPaperNumber")}
                    returnKeyType="done"
                    keyboardType="default"
                    value={PaperNumber}
                    error={errorPaperNumber}
                    maxLength={20}
                    onChangeUserName={(text) => this.onChangePaperNumber(text)}
                    iconLeft="facebook"
                    iconRight="close"
                    textError={I18n.t("pleaseInputCorrectField")}
                    onclick={() => this.onClearPaperNumber()}
                  />
                </View>
              </View>
              <View style={styles.txtInput}>
                <FullTextInput
                  label={I18n.t("Address")}
                  placeholder={I18n.t("InputAddress")}
                  returnKeyType="done"
                  keyboardType="default"
                  value={Address}
                  error={errorAddress}
                  maxLength={50}
                  onChangeUserName={(text) => this.onChangeAddress(text)}
                  iconLeft="facebook"
                  iconRight="close"
                  textError={I18n.t("pleaseInputCorrectField")}
                  onclick={() => this.onClearAddress()}
                />
              </View>
              <TouchableOpacity
                style={styles.txtInput}
                onPress={() => this.onClearPackage()}
              >
                <FullTextInput
                  label={I18n.t("Package")}
                  placeholder={I18n.t("InputPackage")}
                  returnKeyType="done"
                  keyboardType="default"
                  value={Package}
                  error={errorPackage}
                  maxLength={50}
                  editable={false}
                  onChangeUserName={(text) => this.onChangeAddress(text)}
                  iconLeft="facebook"
                  iconRight="chevron-down"
                  textError={I18n.t("incorrectPhoneNumber")}
                  onclick={() => this.onClearPackage()}
                />
              </TouchableOpacity>
              <View style={styles.txtInput}>
                <View style={styles.txtRow}>
                  {this.props.OptionPackage != undefined ? (
                    <TouchableOpacity onPress={() => this.onPackagesList()}>
                      <Text style={styles.txtList}>
                        {I18n.t("PackagesList")}
                      </Text>
                    </TouchableOpacity>
                  ) : null}

                  <TouchableOpacity onPress={() => this.onPackagesDetail()}>
                    <Text style={styles.txtList}>
                      {I18n.t("PackagesDetail")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <HeaderTileComponent txtHeader="BeneficiaryInformation" />
            <View style={styles.GroudTxt}>
              <View style={styles.row}>
                <View style={styles.txtLeft}>
                  <FullTextInput
                    label={I18n.t("FullName")}
                    placeholder={I18n.t("InputFullName")}
                    returnKeyType="done"
                    keyboardType="default"
                    value={FullName}
                    error={errorFullName}
                    maxLength={50}
                    onChangeUserName={(text) =>
                      this.onChangeInsuredFullName(text)
                    }
                    iconLeft="facebook"
                    iconRight="close"
                    textError={I18n.t("nameIsInvalid")}
                    onclick={() => this.onClearFullName()}
                  />
                </View>
                <TouchableOpacity
                  style={styles.txtheight}
                  onPress={() => this.onClearRelation()}
                >
                  <FullTextInput
                    label={I18n.t("Relation")}
                    placeholder={I18n.t("InputRelation")}
                    returnKeyType="done"
                    keyboardType="default"
                    value={I18n.t(Relation)}
                    error={errorRelation}
                    maxLength={20}
                    onChangeUserName={(text) => this.onChangeRelation(text)}
                    iconLeft="facebook"
                    iconRight="chevron-down"
                    editable={false}
                    textError={I18n.t("incorrectPhoneNumber")}
                    onclick={() => this.onClearRelation()}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.redio}>
                <CircleCheckBox
                  checked={saveCer}
                  onToggle={() => this.save()}
                  labelPosition={LABEL_POSITION.RIGHT}
                  label={I18n.t("SaveCertificate")}
                  styleCheckboxContainer={{
                    marginRight: Metrics.marginVertical,
                  }}
                  styleLabel={{ fontSize: Fonts.size.fifSize }}
                  outerColor={Colors.txtColor}
                  innerColor={Colors.blueLight}
                  outerSize={22}
                  filterSize={19}
                  innerSize={14}
                />
                <TouchableOpacity onPress={() => this.inFoCircle()}>
                  <Icon
                    name="alert-circle-outline"
                    size={15}
                    color={Colors.orange}
                    style={{ top: 2 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.bntBuy}>
                <FullNewButton
                  text={I18n.t("txtNext")}
                  onPress={() => this.onPressProcess()}
                  isDisable={
                    !InsuredName ||
                      !Address ||
                      !FullName ||
                      errorRelation ||
                      !Relation ||
                      errorFullName ||
                      !Phone ||
                      errorPhone ||
                      errorPaperNumber ||
                      !PaperNumber ||
                      errorAddress ||
                      errorPhone ||
                      errorInsuredName
                      ? true
                      : false
                  }
                />
              </View>
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.setModalVisibleDataPackge}
            onRequestClose={() => {
              this.setState({ setModalVisibleDataPackge: false });
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
              <View style={styles.modelMain}>
                <View style={{ padding: 30 }}>
                  <FlatList
                    data={PackageData}
                    renderItem={({ item, index }) =>
                      this.renderItemStatus(item, index)
                    }
                    keyExtractor={(item) => item.id}
                  />
                </View>
                <TouchableOpacity
                  style={styles.btnFooter}
                  onPress={() => this.onClosePaperData()}
                >
                  <Text style={styles.label}>{I18n.t("cancel")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
        <DateTimePicker
          isVisible={this.state.isDatePicker}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          datePickerModeAndroid="spinner"
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.setModalVisiblePackagesDetail}
          onRequestClose={() => {
            this.setState({ setModalVisiblePackagesDetail: false });
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
            <Image
              source={Images.APAInsuranceBenefits}
              style={styles.imgAPAInsuranceBenefits}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#FFF",
                width: 40,
                height: 40,
                borderRadius: 90,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => this.onCloseDetial()}
            >
              <Icon name="close" size={30} color="#969696" />
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.setModalVisibleInfo}
          onRequestClose={() => {
            this.setState({ setModalVisibleInfo: false });
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
            <View style={styles.BoxPackagesList}>
              <TouchableOpacity
                style={{ alignItems: "flex-end", padding: 5 }}
                onPress={() => this.onCloseInfo()}
              >
                <Icon name="close" size={30} color="#969696" />
              </TouchableOpacity>
              <View
                style={{
                  width: "100%",
                  height: null,
                  padding: 20,
                  marginBottom: 10,
                }}
              >
                <Text style={{ textAlign: "justify" }}>
                  {I18n.t("DetileAPA")}
                </Text>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.setModalVisiblePackagesList}
          onRequestClose={() => {
            this.setState({ setModalVisiblePackagesList: false });
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
            <View style={styles.BoxPackagesListOption}>
              <TouchableOpacity
                style={{ alignItems: "flex-end", padding: 5 }}
                onPress={() => this.onClose()}
              >
                <Icon name="close" size={30} color="#969696" />
              </TouchableOpacity>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "700" }}>
                  {Package}
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: null,
                  backgroundColor: "#F1F1F1",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    width: "90%",
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ justifyContent: "center" }}>
                    <Text
                      style={{
                        alignItems: "center",
                        color: "#7A7A7A",
                        fontSize: 14,
                        fontWeight: "500",
                      }}
                    >
                      {I18n.t("Benefits")}
                    </Text>
                  </View>
                  <View style={{ justifyContent: "center" }}>
                    <Text
                      style={{
                        alignItems: "center",
                        color: "#7A7A7A",
                        fontSize: 14,
                        fontWeight: "500",
                      }}
                    >
                      LAK
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "100%", marginBottom: 20 }}>
                <FlatList
                  data={this.props.OptionPackage}
                  renderItem={({ item, index }) =>
                    this.renderItemOptionPackage(item, index)
                  }
                  keyExtractor={(item, index) => item.id}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  height: null,
                  backgroundColor: "#F1F1F1",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    width: "90%",
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ justifyContent: "center" }}>
                    <Text
                      style={{
                        alignItems: "center",
                        color: "#7A7A7A",
                        fontSize: 14,
                        fontWeight: "500",
                      }}
                    >
                      {I18n.t("feeAPA")}
                    </Text>
                  </View>
                  <View style={{ justifyContent: "center" }}>
                    <Text
                      style={{
                        alignItems: "center",
                        color: "#7A7A7A",
                        fontSize: 14,
                        fontWeight: "500",
                      }}
                    >
                      LAK
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "100%", marginBottom: 20 }}>
                <FlatList
                  data={this.props.OptionPackage}
                  renderItem={({ item, index }) => this.renderItem(item, index)}
                  keyExtractor={(item, index) => item.id}
                />
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.setModalVisibleRelation}
          onRequestClose={() => {
            this.setState({ setModalVisibleRelation: false });
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
            <SetModalComponent
              listData={ListRelation}
              onClose={() => this.onCloseRelation()}
              onSelectItem={(value, name, key) =>
                this.onSelectItem(value, name, key)
              }
            />
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.setModalVisiblePaper}
          onRequestClose={() => {
            this.setState({ setModalVisiblePaper: false });
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
            <SetModalComponent
              listData={items}
              onClose={() => this.onClosePaper()}
              onSelectItem={(value, name, key) =>
                this.onSelectItem(value, name, key)
              }
            />
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.setModalVisibleGender}
          onRequestClose={() => {
            this.setState({ setModalVisibleGender: false });
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
            <SetModalComponent
              listData={GenderList}
              onClose={() => this.onCloseGender()}
              onSelectItem={(value, name, key) =>
                this.onSelectItem(value, name, key)
              }
            />
          </View>
        </Modal>

        <Notification
          headerType="Warning"
          title={I18n.t("info")}
          textContent={messageError}
          buttonText={I18n.t("ok")}
          isButton={true}
          onPress={() => this.responseDescripTion()}
          ref="responseDescripTion"
        />
      </View>
    );
  }
}

export default APAInsuranceComponent;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.white,
  },
  GroudTxt: {
    padding: 5,
    width: "100%",
    height: null,
  },
  row: {
    flexDirection: "row",
  },
  txtLeft: {
    width: "50%",
    padding: 5,
  },
  txtheight: {
    width: "50%",
    padding: 5,
  },
  txtInput: {
    width: "100%",
    padding: 5,
  },
  txtRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  txtList: {
    fontSize: 14,
    color: Colors.orange,
    textDecorationLine: "underline",
  },
  redio: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  bntBuy: {
    width: "100%",
    height: 110,
    justifyContent: "flex-end",
    padding: 5,
  },
  imgAPAInsuranceBenefits: {
    width: 370,
    height: 370,
    resizeMode: "contain",
  },
  BoxPackagesList: {
    width: "90%",
    height: null,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  BoxPackagesListOption: {
    width: "90%",
    height: null,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  modelMain: {
    backgroundColor: Colors.white,
    width: "80%",
    height: null,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  btnFooter: {
    backgroundColor: Colors.orange,
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  label: {
    color: Colors.white,
    fontWeight: "bold",
  },
  warpItemList: {
    padding: 10,
  },
});
