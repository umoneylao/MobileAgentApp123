import { StyleSheet, Platform } from "react-native";
import { ApplicationStyles, Metrics, Colors, Fonts } from "../../themes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainContent: {
    width: "100%",
    height: "93%",
    backgroundColor: "#fff",
  },
  headerText: {
    width: "100%",
    height: null,
    backgroundColor: Colors.txtHeader,
    padding: 10,
  },
  fingerPrintContainer: {
    // flex: 1,
    // alignItems: "center",
    marginTop: 10,
    alignItems: "center",

  },
  fingerAndText : {
    flexDirection:"row",
    alignItems: "center",

  },
  fingerPrintIcon: {
    // alignItems: "center",
    zIndex: 9999,
    width:  40,
    height: 40,
  },
  txtHeader: {
    textAlign: "center",
    fontSize: Fonts.size.h4,
    fontWeight: "900",
    marginVertical: Metrics.baseMargin,
    color: Colors.white,
  },
  txtDescription: {
    textAlign: "center",
    marginHorizontal: Metrics.doubleBaseMargin,
    color: Colors.white,
    paddingHorizontal: Metrics.baseMargin * 3,
  },
  iconCheck: {
    alignSelf: "center",
    marginVertical: Metrics.smallMargin,
    color: Colors.white,
  },
  warpInfo: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    padding: Metrics.paddingButton,
    width: "90%",
    alignSelf: "center",
  },
  titleInfo: {
    left: 10,
    fontWeight: "900",
    color: Colors.textColor,
  },
  rowInfo: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "flex-start",
  },
  labelInfo: {
    fontSize: 15,
    color: Colors.iconTab,
  },

  valueInfo: {
    color: Colors.black,
    marginRight: 15,
    fontSize: 14,
    marginTop: 5,
    fontWeight: "900",
  },
  valueInfoDiscount: {
    color: Colors.spinner,
    marginRight: 15,
    fontSize: 14,
    marginTop: 5,
    fontWeight: "900",
  },

  valueFee: {
    color: Colors.red,
    marginRight: 15,
    fontSize: 14,
    marginTop: 5,
    fontWeight: "900",
  },
  valueFree: {
    color: Colors.spinner,
    marginRight: 15,
    fontSize: 14,
    marginTop: 5,
    fontWeight: "900",
  },

  textFee: {
    color: Colors.spinner,
    marginRight: 15,
    fontSize: 14,
    marginTop: 5,
    fontWeight: "900",
  },
  textValue: {
    color: Colors.txtUpLight,
    textDecorationLine: "underline",
    marginRight: 15,
    fontSize: 14,
    fontWeight: "900",
    marginTop: 5,
  },
  rowButton: {
    flexDirection: "row",
    marginTop: Metrics.baseMargin,
  },
  buttonStyle: {
    borderRadius: 5,
    flex: 1,
    height: 45,
  },
  rowBackHome: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
  txtBackHome: {
    marginLeft: Metrics.baseMargin,
    color: Colors.white,
  },
  leftContainer: {
    marginTop: 40,
    marginLeft: Metrics.normalMargin,
    width: 30,
    height: 30,
    justifyContent: "center",
  },

  containerItem: {
    padding: 5,
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: Metrics.baseMargin,
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
    backgroundColor: Colors.white,
  },
  txtItem: {
    flex: 1,
    fontSize: Fonts.size.medium,
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
  },
  iconStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageSize: {
    width: 168,
    height: 108,
  },
  btnContent: {
    width: "100%",
    height: "7%",
    backgroundColor: "#fff",
  },

  // model
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(224, 224, 224, 0.6)",
  },
  modalView: {
    width: "100%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    justifyContent: "flex-end",
    height: 10,
  },
  textTimer: {
    left: Platform.OS === "ios" ? 265 : 275,
    top: Platform.OS === "ios" ? 18 : 33,
    color: Colors.bloodOrange,
    fontSize: 16,
  },
  // model
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(224, 224, 224, 0.6)",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: "center",
    height: "50%",
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "900",
  },
  inputContainer: {
    justifyContent: "flex-end",
    height: 10,
  },
  groupText: {
    marginBottom: 10,
  },
  txtOTP: {
    color: Colors.txtUpLight,
    fontSize: 14,
  },
});