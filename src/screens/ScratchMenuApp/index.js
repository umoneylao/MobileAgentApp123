import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Image,
} from "react-native";
import { Images, Colors } from "../../themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import {
  menuScratch,
  menuScratchRole7,
  menuScratchRole33,
} from "../../models/MenuApp";
import I18n from "react-native-i18n";
// import * as Animatable from 'react-native-animatable';
import { connect } from "react-redux";
import { getManuHome } from "../../actions/GetPromontion";
import { SERVER_PATH_EU } from "../../utils/Api";
import LottieView from "lottie-react-native";

class ScratchMenuApp extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      vulueScratch: null,
      data: menuScratch,
      inputValue: "",
      isAgent: "1",
    };
  }
  onChangeScratch(text, language) {
    const { menuHome } = this.state;
    const newData = menuHome.filter((item) => {
      let localizedTitle = "";
      if (typeof language === "string") {
        localizedTitle = I18n.t(item.title_promotion, {
          locale: language,
        }).toUpperCase();
      } else {
        localizedTitle = I18n.t(item.title_promotion).toUpperCase();
      }
      const searchText = text.toUpperCase();
      return localizedTitle.indexOf(searchText) > -1;
    });

    this.setState({
      data: newData,
    });
  }
  onBackHome() {
    this.props.navigation.goBack(null);
  }
  _renderItem(item, index) {
    const { infoAccount } = this.props;

    return (
      <View style={styles.boxMenu}>
        {infoAccount.roleId === 7 ? (
          item.role_id === "7" || item.role_id === "0" ? (
            <TouchableOpacity
              onPress={() =>
                item.status === "1"
                  ? this.props.navigation.navigate(item.href)
                  : null
              }
            >
              <View style={styles.iconBox}>
                {item.content_promotion === "HEADER" ? (
                  <Image
                    source={Images.ic_Deposit}
                    style={
                      item.status === "1"
                        ? styles.iconStyle
                        : styles.iconStyleDisible
                    }
                  />
                ) : (
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
                )}
                <Text style={styles.txtIcon} numberOfLines={3}>
                  {I18n.t(item.title_promotion)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null
        ) : infoAccount.roleId === 1 || infoAccount.roleId === 33 ? (
          item.role_id === "1" || item.role_id === "0" ? (
            <TouchableOpacity
              onPress={() =>
                item.status === "1"
                  ? this.props.navigation.navigate(item.href)
                  : null
              }
            >
              <View style={styles.iconBox}>
                {item.content_promotion === "HEADER" ? (
                  <Image
                    source={Images.ic_Deposit}
                    style={
                      item.status === "1"
                        ? styles.iconStyle
                        : styles.iconStyleDisible
                    }
                  />
                ) : (
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
                )}
                <Text style={styles.txtIcon} numberOfLines={3}>
                  {I18n.t(item.title_promotion)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null
        ) : null}
      </View>
    );
  }
  componentDidMount() {
    this.props.getManuHome("lo", 3);
    this.setState({ isGetManuHome: true });
  }

  handleInputChange = (text) => {
    this.setState({ inputValue: text });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    const saleMan=  {
      "button_title":"null",
      "content_promotion":"MENU_SHOP",
      "detail_imgs":"ic_UnitelSaler.png",
      "end_date":"2022-08-31T00:00:00.000+07:00",
      "href":"UnitelSalesman",
      "id":"71",
      "location":"lo",
      "priority":"60",
      "role_id":"0",
      "start_date":"2022-08-06T00:00:00.000+07:00",
      "status":"1",
      "title_promotion":"UnitelSalesman",
      "tyle":"3"
   };
   const Ekyc=  {
    "button_title":"null",
    "content_promotion":"UnitelSalesman",
    "detail_imgs":"ic_ekyc.jpeg",
    "end_date":"2022-08-31T00:00:00.000+07:00",
    "href":"Ekyc",
    "id":"70",
    "location":"lo",
    "priority":"61",
    "role_id":"0",
    "start_date":"2022-08-06T00:00:00.000+07:00",
    "status":"1",
    "title_promotion":"Ekyc",
    "tyle":"3"
 };
 const ideaInitiative=  {
  "button_title":"null",
  "content_promotion":"IdeaInitiative",
  "detail_imgs":"ic_creative.png",
  "end_date":"2022-08-31T00:00:00.000+07:00",
  "href":"IdeaInitiative",
  "id":"69",
  "location":"lo",
  "priority":"62",
  "role_id":"0",
  "start_date":"2022-08-06T00:00:00.000+07:00",
  "status":"1",
  "title_promotion":"ideaInitiative",
  "tyle":"3"
};
    if (this.state.isGetManuHome) {
      try {
        switch (nextProps.actionType) {
          case "GET_MENU_HOME_SUCCESS":
            let dataManu = nextProps.dataManu;
           dataManu.data.push(saleMan,Ekyc,ideaInitiative);
           console.log("data.manu",dataManu.data)

            if (dataManu.data.length > 0) {
              this.setState({ data: dataManu.data, menuHome: dataManu.data });
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
  }

  render() {
    const { vulueScratch, menuHome, data, inputValue } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <View style={styles.textBox}>
          <TouchableOpacity
            style={styles.iconBack}
            onPress={() => this.onBackHome()}
          >
            <Ionicons
              name="md-arrow-back-sharp"
              size={25}
              color={Colors.black}
              style={{ left: 5 }}
            />
          </TouchableOpacity>
          <View style={{ height: 40, width: "87%" }}>
            <TextInput
              placeholder={I18n.t("Search")}
              placeholderTextColor={Colors.backColor}
              value={vulueScratch}
              onChangeText={(text) => {
                this.onChangeScratch(text, menuHome);
                this.handleInputChange(text);
              }}
              style={styles.textInputStyle}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={styles.header}>
            <Text style={styles.textHeader}>{I18n.t("menuAll")}</Text>
          </View>
          {menuHome ? (
            <FlatList
              data={data}
              renderItem={({ item, index }) => this._renderItem(item, index)}
              extraData={this.state}
              numColumns={3}
              keyExtractor={(item, index) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LottieView
                source={require("../../../assets/icBox.json")}
                autoPlay
                loop
                style={[{ width: 250, height: 250 }]}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    infoAccount: state.auth.infoAccount,
    getPromotionReducer: state.getPromotionReducer,
    actionType: state.getPromotionReducer.actionType,
    dataManu: state.getPromotionReducer.dataManu,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getManuHome: (_language, tyle) => {
      dispatch(getManuHome(_language, tyle));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ScratchMenuApp);