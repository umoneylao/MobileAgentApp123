import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
// import { formatJson } from '../../utils/RequestField';
import { Colors, Fonts, Metrics, Images } from "../../themes";
import styles from "./styles";
import {
  BackgroundHeader,
  ActivityIndicator,
  Notification,
  UpdateVersion,
  SwiperComponent,
  PortalComponent,
} from "../../components";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import I18n from "react-native-i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { menuCustomerService, menuPOSService, menuHeader, menuPOSServiceRole7 } from '../../models/MenuApp'
import ResponsiveImage from "react-native-responsive-image";
import { checkFunder, requestBalance } from "../../actions/LookupTrans";
import { login, getVersion } from "../../actions/Auth";
import * as RequestField from "../../utils/RequestField";
import * as ConfigCode from "../../utils/ConfigCode";
import * as FIELD from "../../utils/CoreFieldMap";
import _ from "lodash";
import { androidVersion, iosVersion } from "../../utils/Constant";
import {
  getPromotion,
  getMediaPopupHome,
  getManuHome,
  callGetMenu2,
} from "../../actions/GetPromontion";
import { connect } from "react-redux";
import ScanSreen from "../QrScanScreen/ScanSreen";
import moment from "moment";
import CircleCheckBox, {
  LABEL_POSITION,
} from "../../components/CircleCheckbox";
import { SERVER_PATH_EU } from "../../utils/Api";
// import { groupMenuShopUnitel } from '../../models/MenuApp'
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");
const imageWidh = width - 60;
const imageHeigh = (imageWidh / 916) * 1280;

const imageWidhBtn = width - 280;
const imageHeighBtn = (imageWidhBtn / 437) * 213;
//268 × 232
const imageWidhClose = width - 340;
const imageHeighClose = (imageWidhClose / 268) * 232;

// import * as Animatable from "react-native-animatable";
// import QRCodeScanner from "react-native-qrcode-scanner";
// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const SCREEN_WIDTH = Dimensions.get("window").width;
// const rectDimensions = SCREEN_WIDTH * 0.65;
// const rectBorderColor = Colors.white
// const scanBarWidth = SCREEN_WIDTH * 0.46;
// const scanBarHeight = SCREEN_WIDTH * 0.0025;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isCheckFunder: false,
      isGetAccountInfo: false,
      mLanguage: null,
      isAgent: false,
      vulueScratch: null,
      bar: "light-content",
      isCheckVersion: false,
      versionUpdate: [],
      updateType: 0,
      titleUpdate: null,
      contentUpdate: null,
      linkDowload: null,
      img: null,
      imgBanner: null,
      setModelQrCode: false,
      setPopupHome: false,
      saveCer: false,
      menuHome: null,
      setModelMenu: false,
    };
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
  error10114() {
    this.refs.error10114.onClose();
  }
  error10118() {
    this.refs.error10118.onClose();
  }
  state3() {
    this.refs.state3.onClose();
  }
  onPressIsNoagent() {
    this.refs.phoneIsNotAgentOrSubAgent.onClose();
  }
  error10118() {
    this.refs.error10118.onClose();
  }
  failedDueNoResponse() {
    this.refs.failedDueNoResponse.onClose();
  }
  transactionCompleted() {
    this.refs.transactionCompleted.onClose();
  }
  notFoundBank() {
    this.refs.notFoundBank.onClose();
  }
  transactionIsUnsuccessful() {
    this.refs.transactionIsUnsuccessful.onClose();
  }
  alerUpdateapp() {
    this.refs.alerUpdateapp.onClose();
  }

  getDate() {
    this.props.navigation.navigate("GameUmoney");
  }
  onNavigation = (item) => {
    this.props.navigation.navigate(item.href);
    // console.log('index:', item.navigate)
    // if (item.navigate === 'QrScanScreen') {
    //     this.setState({ setModelQrCode: true })
    // } else {
    //     this.props.navigation.navigate(item.navigate)
    // }
  };
  onNavigationCustomer = (item) => {
    let _language = "lo";
    let tyle = 5;
    if (item.href === "ShopUnitel") {
      this.props.callGetMenu2(_language, tyle);
      
      console.log("======================")
      console.log("this.props.callGetMenu2(_language, tyle)",this.props.callGetMenu2(_language, tyle))
      console.log("======================")

      this.setState({ isGetMenu2: true });
    } else {
      this.props.navigation.navigate(item.href);
    }
  };
  renderItemMenuHeadr(item, index) {
    return (
      <View
        style={{
          justifyContent: "space-between",
          flex: 1,
          alignItems: "center",
          left: -10,
        }}
      >
        {item.content_promotion === "HEADER" ? (
          <TouchableOpacity
            style={styles.warpItemList}
            onPress={() =>
              item.status === "1" ? this.onNavigation(item) : null
            }
          >
            {item.detail_imgs ? (
              <ResponsiveImage
                source={{
                  uri: `${SERVER_PATH_EU}/cms-backend/cms/file/v1.0/image/${item.detail_imgs}`,
                }}
                style={styles.iconHeaderStyle}
              />
            ) : (
              <Image source={Images.iconDefault} style={styles.iconStyle} />
            )}
            <Text style={styles.iconMenuHeader} numberOfLines={1}>
              {I18n.t(item.title_promotion)}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
  renderItemMenuCustomerService(item, index) {

    // if(item.title_promotion!=="BaduLoto"){
      return (
        <View style={{flexWrap:"wrap",alignItems:"center"}}>
          {item.title_promotion==="UnitelSalesman" || item.content_promotion === "CUSTOMER_SERVICE" ? (
            <TouchableOpacity
              style={styles.warpItemList}
              onPress={() =>
                item.status === "1" ? this.onNavigationCustomer(item) : null
              }
            >
              <Image
                source={{
                  uri: `${SERVER_PATH_EU}/cms-backend/cms/file/v1.0/image/${item.detail_imgs}`,
                }}
                style={
                  item.status === "1" ? styles.iconStyle : styles.iconStyleDisible
                }
              />
              <Text style={styles.txtIcon} numberOfLines={2}>
                {I18n.t(item.title_promotion)}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      );
    
  }
  renderItemMenuPOSService(item, index, isAgent) {
    return (
      <View style={{
       
        flexWrap: "wrap",
      }}>
        {isAgent ? (
          item.content_promotion === "POS_SERVICE" && item.role_id === "7" ? (
            <TouchableOpacity
              style={styles.warpItemList}
              onPress={() =>
                item.status === "1"
                  ? this.props.navigation.navigate(item.href)
                  : null
              }
            >
              <Image
                source={{
                  uri: `${SERVER_PATH_EU}/cms-backend/cms/file/v1.0/image/${item.detail_imgs}`,
                }}
                style={
                  item.status === "1"
                    ? styles.iconStyle
                    : styles.iconStyleDisible
                }
              />
              <Text style={styles.txtIcon} numberOfLines={2}>
                {I18n.t(item.title_promotion)}
              </Text>
            </TouchableOpacity>
          ) : null
        ) : item.content_promotion === "POS_SERVICE" && item.role_id === "1" ? (
          <TouchableOpacity
            style={styles.warpItemList}
            onPress={() =>
              item.status === "1"
                ? this.props.navigation.navigate(item.href)
                : null
            }
          >
            <Image
              source={{
                uri: `${SERVER_PATH_EU}/cms-backend/cms/file/v1.0/image/${item.detail_imgs}`,
              }}
              style={
                item.status === "1" ? styles.iconStyle : styles.iconStyleDisible
              }
            />
            <Text style={styles.txtIcon} numberOfLines={2}>
              {I18n.t(item.title_promotion)}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  onChick() {
    this.props.navigation.navigate("ScratchMenuApp");
  }
  onShowBalance() {
    const { infoAccount } = this.props;
    RequestField.clearInitField();
    RequestField.addToInitField(RequestField.addPhone(infoAccount.phoneNumber));
    RequestField.addToInitField(
      RequestField.addProcessCode(ConfigCode.SEARCH_BALANCE)
    );
    RequestField.addToInitField(RequestField.addPan(infoAccount.pan));
    RequestField.addToInitField(
      RequestField.addCurrencyCode(infoAccount.currencyCode)
    );
    RequestField.addToInitField(RequestField.addRoleId(infoAccount.roleId));
    let data = RequestField.addToInitField(
      RequestField.addAccountID(infoAccount.accountId)
    );
    this.setState({ isGetBalance: true, isLoading: true });
    data.fieldMap = _.orderBy(data.fieldMap, "fieldID");
    this.props.requestBalance(data);
    RequestField.clearInitField();
  }

  componentDidMount() {
    let _language = I18n.currentLocale();
    let tyle = 1;

    this.props.getManuHome("lo", 3);
    this.setState({ isGetManuHome: true });

    const { infoAccount } = this.props;
    if (infoAccount && infoAccount.roleId && infoAccount.roleId === 7) {
      this.setState({ isAgent: false });
    } else {
      this.setState({ isAgent: true });
    }
    if (infoAccount && infoAccount.roleId && infoAccount.roleId === 1) {
      this.setState({ checkRole: true });
    }
    this.props.navigation.setParams({
      sortByName: this.sortByName,
      sortByFrequency: this.sortByFrequency,
    });

    this.startHeaderHeight = 30;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 30 + StatusBar.currentHeight;
    }

    if (_language) {
      switch (_language) {
        case "en":
          this.props.getVersion(_language);
          this.setState({ isCheckVersion: true });

          this.props.getPromotion(_language);
          this.setState({ isLoading: true, isGetPromontion: true });

          this.props.getMediaPopupHome(_language, tyle);
          this.setState({ isGetPoppuHome: true });

          break;
        case "lo":
          this.props.getVersion(_language);
          this.setState({ isCheckVersion: true });
          this.props.getPromotion(_language);
          this.setState({ isLoading: true, isGetPromontion: true });

          this.props.getMediaPopupHome(_language, tyle);
          this.setState({ isGetPoppuHome: true });
          break;
        case "vn":
          this.props.getVersion(_language);
          this.setState({ isCheckVersion: true });

          this.props.getPromotion("vi");
          this.setState({ isLoading: true, isGetPromontion: true });

          this.props.getMediaPopupHome("vi", tyle);
          this.setState({ isGetPoppuHome: true });
          break;
        case "cn":
          this.props.getVersion(_language);
          this.setState({ isCheckVersion: true });
          this.props.getPromotion("zh");
          this.setState({ isLoading: true, isGetPromontion: true });

          this.props.getMediaPopupHome("zh", tyle);
          this.setState({ isGetPoppuHome: true });
          break;
        default:
          break;
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.isGetAccountInfo && !nextProps.isFetching) {
      this.setState({ isGetAccountInfo: false, isLoading: false });
      if (nextProps.user && nextProps.user.responseCode) {
        if (nextProps.user && nextProps.user.error === `00000`) {
          if (nextProps.user && nextProps.user.responseCode === "00000") {
            let roleId = RequestField.getValueField(
              nextProps.user.fieldMap,
              FIELD.ROLE_ID
            );
            let phoneNumber = RequestField.getValueField(
              nextProps.user.fieldMap,
              FIELD.PHONE_NUMBER
            );
            if (roleId === 1 || roleId === 33 || roleId === 7) {
              const status = RequestField.getValueField(
                nextProps.user.fieldMap,
                FIELD.ACCOUNT_STATUS
              );
              switch (status) {
                case "REGISTER":
                  this.refs.youMustSetupPinFirst.onOpen();
                  break;
                case "CANCELED":
                  this.refs.error10117.onOpen();
                  break;
                case "ACTIVE":
                  const language = RequestField.getValueField(
                    nextProps.user.fieldMap,
                    FIELD.LANGUAGE
                  );
                  this.setState({ mLanguage: language });
                  this.ValidatePinModal.onOpen();
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
                  handleResponseCode(nextProps.user.responseCode, {
                    phoneNumber: phoneNumber,
                  });
              }
            } else {
              this.refs.phoneIsNotAgentOrSubAgent.onOpen();
            }
          } else {
            let responseCode =
              nextProps.user && nextProps.user.responseCode
                ? `${nextProps.user.responseCode}`
                : "systemBusy";
            if (
              nextProps.user &&
              (responseCode === "00000" || responseCode === "10116")
            ) {
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
                // Có TK, đang ở trạng thái nào đấy
                if (roleId === 1 || roleId === 33 || roleId === 7) {
                  switch (currentStatus) {
                    case "REGISTER":
                      this.refs.youMustSetupPinFirst.onOpen();
                      break;
                    case "CANCELED":
                      this.refs.error10117.onOpen();
                      break;
                    case "LOCKED":
                      this.refs.error10117.onOpen();
                      break;
                    case "ACTIVE":
                      const language = RequestField.getValueField(
                        nextProps.user.fieldMap,
                        FIELD.LANGUAGE
                      );
                      this.setState({ mLanguage: language });
                      this.ValidatePinModal.onOpen();
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
                      handleResponseCode(responseCode, {
                        phoneNumber: phoneNumber,
                      });
                      break;
                  }
                } else {
                  this.refs.phoneIsNotAgentOrSubAgent.onOpen();
                }
              } else {
                this.refs.phoneIsNotAgentOrSubAgent.onOpen();
              }
            } else {
              if (responseCode) {
                handleResponseCode(responseCode, {
                  phoneNumber: this.state.phoneNumber,
                });
              } else {
                this.refs.NotificationSystemBusy.onOpen();
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

    if (this.state.isCheckFunder && !nextProps.isFetching) {
      this.setState({ isCheckFunder: false, isLoading: false });
      if (nextProps.funderData && nextProps.funderData.responseCode) {
        if (
          nextProps.funderData &&
          nextProps.funderData.responseCode === "00000"
        ) {
          this.refs.transactionCompleted.onOpen();
        } else {
          var responseCode =
            nextProps.funderData && nextProps.funderData.responseCode
              ? nextProps.funderData.responseCode
              : "10532";
          if (
            nextProps.funderData &&
            nextProps.funderData.responseDescription
          ) {
            if (
              nextProps.funderData.responseCode &&
              nextProps.funderData.responseCode === 10119
            ) {
              this.refs.notFoundBank.onOpen();
            } else {
              this.refs.transactionIsUnsuccessful.onOpen();
            }
          } else {
            if (nextProps.funderData.responseCode) {
              handleResponseCode(nextProps.funderData.responseCode);
            } else {
              this.refs.NotificationSystemBusy.onOpen();
            }
          }
        }
      } else {
        this.refs.failedDueNoResponse.onOpen();
      }
    }
    if (this.state.isGetBalance && !nextProps.isFetching) {
      this.setState({ isLoading: false, isGetBalance: false });
      if (nextProps.balanceData && nextProps.balanceData.responseCode) {
        if (nextProps.balanceData && nextProps.balanceData.error === "00000") {
          let responseCode = RequestField.getValueField(
            nextProps.balanceData.fieldMap,
            FIELD.RESPONSE_CODE
          );
          if (responseCode === "00000") {
            let balance = RequestField.getValueField(
              nextProps.balanceData.fieldMap,
              FIELD.BALANCE
            ).toString();
            this.setState({ balance, onHideBalance: false });
          } else {
            if (
              nextProps.balanceData &&
              nextProps.balanceData.responseDescription
            ) {
              this.refs.transactionIsUnsuccessful.onOpen();
            } else {
              if (responseCode) {
                handleResponseCode(responseCode);
              } else {
                this.refs.NotificationSystemBusy.onOpen();
              }
            }
          }
        } else {
          this.refs.failedDueNoResponse.onOpen();
        }
      }
    }
    if (this.state.isCheckVersion) {
      let data = nextProps.versionUpdate;
      // console.log('item.current_version_android:', data)
      if (data) {
        let item = data.item[0];

        if (item != null) {
          if (Platform.OS === "android") {
            if (item.current_version_android > androidVersion) {
              this.refs.alerUpdateapp.onOpen();
              this.setState({
                updateType: item.update_type,
                titleUpdate: item.update_title,
                contentUpdate: item.update_content,
                linkDowload: item.link,
              });
            }
          } else {
            if (item.current_version_ios > iosVersion) {
              this.refs.alerUpdateapp.onOpen();
              this.setState({
                updateType: item.update_type,
                titleUpdate: item.update_title,
                contentUpdate: item.update_content,
                linkDowload: item.link,
              });
            }
          }
        }
        this.setState({ isCheckVersion: false });
      }
    }
    if (this.state.isGetPromontion && this.state.isLoading) {
      switch (nextProps.actionType) {
        case "GET_PROMOTION_SUCCESS":
          let reponData = nextProps.requesPromotion.data;
          // console.log('nextProps.requesPromotion-----------------:', nextProps.requesPromotion)
          this.setState({
            isLoading: false,
            isGetPromontion: false,
            imgBanner: reponData,
          });
          break;
        case "GET_PROMOTION_FAILED":
          this.setState({ isLoading: false, isGetPromontion: false });
          break;
        default:
          break;
      }
    }
    if (this.state.isGetPoppuHome) {
      try {
        switch (nextProps.actionType) {
          case "GET_MEDIA_POPUP_HOME_SUCCESS":
            let dataPopup = nextProps.dataPopup;
            // console.log('dataPopup:', dataPopup.data[0])
            if (dataPopup.data.length > 0) {
              let dateNow = moment(new Date()).format("YYYYMMDD");
              let DateStart = moment(dataPopup.data[0].start_date).format(
                "YYYYMMDD"
              );
              let DateEnd = moment(dataPopup.data[0].end_date).format(
                "YYYYMMDD"
              );
              // console.log('DateStart:', DateStart)
              // console.log('DateEnd:', DateEnd)
              // console.log('DateNow:', dateNow)
              if (
                dateNow >= DateStart &&
                dateNow <= DateEnd &&
                dataPopup.data[0].tyle == 1 &&
                dataPopup.data[0].status == 1
              ) {
                // console.log('bopby111')
                setTimeout(async () => {
                  try {
                    let status = await AsyncStorage.getItem("statusPopup");
                    // console.log('status:-----1', status)
                    this.setState({ popupData: dataPopup.data[0] });
                    status === "ClosePopup"
                      ? this.setState({ setPopupHome: false })
                      : this.setState({ setPopupHome: true });
                  } catch (error) {
                    console.log(error);
                  }
                }, 1000);
              }
            }
            this.setState({ isGetPoppuHome: false });
            break;
          case "GET_MEDIA_POPUP_HOME_FAILED":
            this.setState({ isGetPoppuHome: false });
            break;
          default:
            break;
        }
      } catch (error) {}
    }
    if (this.state.isGetManuHome) {
       const saleMan=  {
      "button_title":"null",
      "content_promotion":"MENU_SHOP",
      "detail_imgs":"ic_UnitelSaler.png",
      "end_date":"2022-08-31T00:00:00.000+07:00",
      "href":"UnitelSalesman",
      "id":"60",
      "location":"lo",
      "priority":"60",
      "role_id":null,
      "start_date":"2022-08-06T00:00:00.000+07:00",
      "status":"1",
      "title_promotion":"UnitelSalesman",
      "tyle":"5"
   };
      try {
        switch (nextProps.actionType) {
          case "GET_MENU_HOME_SUCCESS":
            let dataManu = nextProps.dataManu;
            let dataManuPush = nextProps.dataManu.data.push(saleMan);

            if (dataManu.data.length > 0) {
              // console.log('dataManu---------------0000000009999000:', dataManu)
              this.setState({ menuHome: dataManu.data, isGetManuHome: false });
            }
            break;
          case "GET_MENU_HOME_FAILED":
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (this.state.isGetMenu2) {
      try {
        console.log("nextProps.actionType:", nextProps.actionType);
        console.log(">>> nextProps.dataManu <<<<", nextProps.dataMenu2);
        switch (nextProps.actionType) {
          case "CALL_GET_MENU_LEVEL_2_SUCCESS":
            let menuPopup = nextProps.dataMenu2;
            if (menuPopup.data.length > 0) {
              // console.log('menuPopup---------------0000000009999000:', menuPopup)
              this.setState({
                menuPopup: menuPopup.data,
                isGetMenu2: false,
                setModelMenu: true,
              });
            } else {
              this.refs.errorMessenger.onOpen();
              this.setState({ errorMessenger: I18n.t("updating") });
            }
            break;
          case "CALL_GET_MENU_LEVEL_2_FAILED":
            this.setState({ isGetMenu2: false });
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  onCickShowdetail(e) {
    // this.props.navigation.navigate('PromotionDetail', { e })
  }
  onBalance() {
    this.setState({ balance: undefined });
  }
  dataPhone = (item) => {
    // console.log('item', item)
    this.props.navigation.navigate("CashinByQR", { data: item }); //CashInStackContainer  //CashinByQR
    this.setState({ setModelQrCode: false });
  };
  onCleckClose() {
    this.setState({ setPopupHome: false });
  }
  onRouter(dataRouter) {
    if (dataRouter) {
      this.props.navigation.navigate(dataRouter);
      this.setState({ setPopupHome: false });
    }
  }
  onCleckNotShow = async () => {
    const { saveCer } = this.state;
    this.setState(saveCer ? { saveCer: false } : { saveCer: true });
    if (saveCer) {
      await AsyncStorage.setItem("statusPopup", "OpenPopup");
    } else {
      await AsyncStorage.setItem("statusPopup", "ClosePopup");
    }
  };
  //this.setState({ setModelMenu: false})
  open = (item) => {
    this.props.navigation.navigate(item.href);
    this.setState({ setModelMenu: false });
  };
  renderItemMenuCustomerServiceModel(item, index) {
    // console.log('---', `${SERVER_PATH_EU}/cms-backend/cms/file/v1.0/image/${item.detail_imgs}`)
    return (
      <View style={styles.FlatList}>
        <TouchableOpacity
          style={styles.warpItemList}
          onPress={() => (item.status === "1" ? this.open(item) : null)}
        >
          {item.detail_imgs ? (
            <Image
              source={{
                uri: `${SERVER_PATH_EU}/cms-backend/cms/file/v1.0/image/${item.detail_imgs}`,
              }}
              style={
                item.status === "1" ? styles.iconStyle : styles.iconStyleDisible
              }
            />
          ) : (
            <Image source={Images.iconDefault} style={styles.iconStyle} />
          )}
          <Text style={styles.txtIcon} numberOfLines={2}>
            {I18n.t(item.title_promotion)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  errorMessenger() {
    this.refs.errorMessenger.onClose();
  }
  render() {
    const { infoAccount } = this.props;
    const {
      isAgent,
      titleUpdate,
      balance,
      contentUpdate,
      phoneNumber,
      linkDowload,
      updateType,
      imgBanner,
      saveCer,
      popupData,
      menuHome,
      menuPopup,
      errorMessenger,
    } = this.state;

   



    return (
      <ScrollView style={styles.container}>
        {this.state.isLoading ? <ActivityIndicator /> : null}

        <StatusBar
          barStyle={this.state.bar}
          backgroundColor={Colors.blueLight}
        />
        {menuHome ? <BackgroundHeader style={styles.bg2} /> : null}
        {menuHome ? (
          <View style={styles.contentContainer}>
            <View style={styles.headerTextinput}>
              <View
                style={{
                  height: Platform.OS == "android" ? 50 : 40,
                  marginBottom: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.tetxScratch}
                  onPress={() => this.onChick()}
                >
                  <View>
                    <Text style={styles.fontScratch}>{I18n.t("Search")}</Text>
                  </View>
                  <View>
                    <FontAwesome
                      size={20}
                      name="search"
                      color={Colors.white}
                      style={{ left: -15 }}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: "100%",
                  height: Platform.OS == "android" ? 70 : 120,
                  top: Platform.OS === "android" ? 0 : 5,
                }}
              >
                <FlatList
                  data={menuHome}
                  renderItem={({ item, index }) =>
                    this.renderItemMenuHeadr(item, index)
                  }
                  numColumns={4}
                  showsHorizontalScrollIndicator={false}
                  extraData={Object.assign(this.props)}
                  keyExtractor={(item, index) => item.id}
                />
              </View>
            </View>
          </View>
        ) : null}
        {menuHome ? (
          <View style={styles.groupList}>
            <View style={styles.cardStyle}>
              <View style={styles.txtLineBalane}>
                <View style={styles.txtName}>
                  <FontAwesome name="bell" size={18} color="#F3903F" />
                  <Text style={styles.txtHeaderBalane} numberOfLines={1}>
                    {infoAccount ? infoAccount.customerName : null}
                  </Text>
                </View>
                <View style={styles.txtNameBalan}>
                  <View style={styles.iconBalance}>
                    {balance != undefined ? (
                      <View style={styles.iconBalance}>
                        <Text style={styles.txteye}>{balance}</Text>
                        <TouchableOpacity
                          style={styles.iconBalance}
                          onPress={() => this.onBalance()}
                        >
                          <FontAwesome
                            name={"eye"}
                            size={18}
                            color={Colors.backColor}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={styles.iconBalance}>
                        <Text style={styles.txteye}>{"*** LAK"}</Text>
                        <TouchableOpacity
                          style={styles.iconBalance}
                          onPress={() => this.onShowBalance()}
                        >
                          <FontAwesome
                            name={"eye-slash"}
                            size={18}
                            color={Colors.backColor}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 10,}}>
                <View style={styles.textConten}>
                  <Text style={styles.txtHeader}>
                    {isAgent
                      ? I18n.t("userService").toUpperCase()
                      : I18n.t("agentService").toUpperCase()}
                  </Text>
                  <TouchableOpacity onPress={() => this.onChick()}>
                    <Text style={styles.textLine}>{I18n.t("Viewall")}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      flex:1,
                      flexWrap: "wrap",}}>
                <FlatList
                  data={menuHome}
                  renderItem={({ item, index }) =>
                    this.renderItemMenuCustomerService(item, index)
                  }
                  numColumns={4}
                  showsHorizontalScrollIndicator={false}
                  extraData={Object.assign(this.props)}
                  keyExtractor={(item, index) => item.id}
                />
              </View>
              </View>
            </View>
            <View style={styles.cardStyle}>
              <View style={styles.textConten}>
                <Text style={styles.txtHeader}>
                  {isAgent
                    ? I18n.t("agentService").toUpperCase()
                    : I18n.t("superAgentService").toUpperCase()}
                </Text>
                <TouchableOpacity onPress={() => this.onChick()}>
                  <Text style={styles.textLine}>{I18n.t("Viewall")}</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={menuHome}
                renderItem={({ item, index }) =>
                  this.renderItemMenuPOSService(item, index, isAgent)
                }
                numColumns={4}
                showsHorizontalScrollIndicator={false}
                extraData={Object.assign(this.props)}
                keyExtractor={(item, index) => item.id}
              />
            </View>

            <View style={{ flex: 1 }}>
              {imgBanner != null ? (
                <SwiperComponent
                  imgBanner={imgBanner}
                  onCickShowdetail={(e) => this.onCickShowdetail(e)}
                />
              ) : null}
            </View>
          </View>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <LottieView
              source={require("../../../assets/icBox.json")}
              autoPlay
              loop
              style={[{ width: 250, height: 250 }]}
            />
          </View>
        )}
        {popupData ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.setPopupHome}
            onBackdropPress={() => {
              this.setState({ setPopupHome: false });
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(60,60,60, 0.9)",
              }}
            >
              <View style={styles.modalContent}>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      top: 0,
                      zIndex: 1,
                      position: "relative",
                    }}
                  >
                    <View style={{ justifyContent: "center" }}>
                      <CircleCheckBox
                        checked={saveCer}
                        onToggle={() => this.onCleckNotShow()}
                        labelPosition={LABEL_POSITION.RIGHT}
                        label={I18n.t("DonShowPopup")}
                        styleCheckboxContainer={{
                          marginRight: Metrics.marginVertical,
                        }}
                        styleLabel={{
                          fontSize: Fonts.size.fifSize,
                          color: Colors.white,
                        }}
                        outerColor={Colors.txtColor}
                        innerColor={Colors.blueLight}
                        outerSize={22}
                        filterSize={19}
                        innerSize={14}
                      />
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => this.onCleckClose()}>
                        <ResponsiveImage
                          source={Images.btnClose}
                          style={{
                            width: imageWidhClose,
                            height: imageHeighClose,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.onRouter(popupData.href)}
                  >
                    {popupData.detail_imgs ? (
                      <ResponsiveImage
                        source={{
                          uri: `${SERVER_PATH_EU}/cms-backend/cms/file/v1.0/image/${popupData.detail_imgs}`,
                        }}
                        style={{
                          width: imageWidh,
                          height: imageHeigh,
                          marginBottom: 10,
                        }}
                      />
                    ) : (
                      <Image
                        source={Images.iconDefault}
                        style={styles.iconStyle}
                      />
                    )}
                  </TouchableOpacity>
                  <View style={{ alignItems: "center", top: 0 }}>
                    <TouchableOpacity
                      onPress={() => this.onRouter(popupData.href)}
                    >
                      {popupData.button_title ? (
                        <ResponsiveImage
                          source={{
                            uri: `${SERVER_PATH_EU}/cms-backend/cms/file/v1.0/image/${popupData.button_title}`,
                          }}
                          style={{ width: imageWidhBtn, height: imageHeighBtn }}
                        />
                      ) : (
                        <Image
                          source={Images.iconDefault}
                          style={styles.iconStyle}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        ) : null}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.setModelQrCode}
          onRequestClose={() => {
            this.setState({ setModelQrCode: false });
          }}
        >
          <ScanSreen dataPhone={(item) => this.dataPhone(item)} />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.setModelMenu}
          onRequestClose={() => {
            this.setState({ setModelMenu: false });
          }}
        >
          <Pressable
            onPress={() => this.setState({ setModelMenu: false })}
            style={{ flex: 1 }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                backgroundColor: Colors.windowTint,
              }}
            >
              <View
                style={{
                  width: "100%",
                  padding: 10,
                  backgroundColor: Colors.white,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  height: 200,
                }}
              >
                <View style={styles.containerModel}>
                  <View style={styles.txtTile}>
                    <Text>{I18n.t("UnitelServices")}</Text>
                  </View>

                  <FlatList
                    data={menuPopup}
                    renderItem={({ item, index }) =>
                      this.renderItemMenuCustomerServiceModel(item, index)
                    }
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                    extraData={Object.assign(this.props)}
                    keyExtractor={(item, index) => item.id}
                  />
                </View>
              </View>
            </View>
          </Pressable>
        </Modal>

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
          textContent={I18n.t("failedDueNoResponse")}
          buttonText={I18n.t("ok")}
          isButton={true}
          onPress={() => this.failedDueNoResponse()}
          ref="failedDueNoResponse"
        />

        <Notification
          headerType="Warning"
          title={I18n.t("info")}
          textContent={I18n.t("transactionCompleted")}
          buttonText={I18n.t("ok")}
          isButton={true}
          onPress={() => this.transactionCompleted()}
          ref="transactionCompleted"
        />

        <Notification
          headerType="Warning"
          title={I18n.t("info")}
          textContent={I18n.t("notFoundBank")}
          buttonText={I18n.t("ok")}
          isButton={true}
          onPress={() => this.notFoundBank()}
          ref="notFoundBank"
        />

        <Notification
          headerType="Warning"
          title={I18n.t("info")}
          textContent={I18n.t("transactionIsUnsuccessful")}
          buttonText={I18n.t("ok")}
          isButton={true}
          onPress={() => this.transactionIsUnsuccessful()}
          ref="transactionIsUnsuccessful"
        />

        <Notification
          headerType="Warning"
          title={I18n.t("info")}
          textContent={errorMessenger}
          buttonText={I18n.t("ok")}
          isButton={true}
          onPress={() => this.errorMessenger()}
          ref="errorMessenger"
        />

        <UpdateVersion
          titleUpdate={titleUpdate}
          contentUpdate={contentUpdate}
          linkDowload={linkDowload}
          updateType={updateType}
          onPress={() => this.alerUpdateapp()}
          ref="alerUpdateapp"
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    infoAccount: state.auth.infoAccount,
    isFetching: state.lookup.isFetching,
    funderData: state.lookup.funderData,
    user: state.auth.user,
    balanceData: state.lookup.balanceData,
    versionUpdate: state.auth.versionUpdate,
    getPromotionReducer: state.getPromotionReducer,
    isFetching: state.getPromotionReducer.isFetching,
    actionType: state.getPromotionReducer.actionType,
    requesPromotion: state.getPromotionReducer.requesPromotion,
    dataPopup: state.getPromotionReducer.dataPopup,
    dataManu: state.getPromotionReducer.dataManu,
    dataMenu2: state.getPromotionReducer.dataMenu2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkFunder: (data) => {
      dispatch(checkFunder(data));
    },
    login: (data) => {
      dispatch(login(data, false));
    },
    requestBalance: (data) => {
      dispatch(requestBalance(data));
    },
    getVersion: (_language) => {
      dispatch(getVersion(_language));
    },
    getMediaPopupHome: (_language, tyle) => {
      dispatch(getMediaPopupHome(_language, tyle));
    },
    getManuHome: (_language, tyle) => {
      dispatch(getManuHome(_language, tyle));
    },
    callGetMenu2: (_language, tyle) => {
      dispatch(callGetMenu2(_language, tyle));
    },
    getPromotion: (_language) => {
      dispatch(getPromotion(_language));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);