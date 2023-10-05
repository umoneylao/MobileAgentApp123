import { StyleSheet, Platform } from "react-native";
import { Metrics, ApplicationStyles, Colors, Fonts } from "../../themes";
import colors from "../../themes/Colors";
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    height: Metrics.height,
    paddingTop: Platform.OS === "ios" ? Metrics.doubleBaseMargin : 0,
  },
  TextInput: {
    justifyContent: "center",
    marginBottom: 20,
    // height: 90
  },
  Button: {
    // flex:1,
    alignItems: "center",
    justifyContent: "center",
    height: 90,
  },
  footer: {
    justifyContent: "flex-end",
  },
  styleFont: {
    justifyContent: "center",
    alignItems: "center",
  },
  forgetThePin: {
    color: Colors.grey,
    fontSize: Fonts.size.fifSize,
    textDecorationLine: "underline",
  },
  main: {
    backgroundColor: Colors.white,
    height: "100%",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    justifyContent: "space-between",
  },
  container: {
    backgroundColor: Colors.white,
    height: Metrics.height,
    // paddingTop: Platform.OS === 'ios' ? Metrics.tripleBaseMargin : 0,
    justifyContent: "space-between",
  },
  logo: {
    marginBottom: Metrics.smallMargin,
    height: 120,
    width: 120,
    resizeMode: "contain",
    alignSelf: "center",
  },
  txtLogo: {
    ...Fonts.style.regular,
    marginBottom: 5,
    textAlign: "center",
    paddingHorizontal: Metrics.baseMargin * 3,
    fontSize: Fonts.size.h2,
    fontWeight: "700",
    color: "#989898",
  },
  txtLogo2: {
    ...Fonts.style.regular,

    marginBottom: 5,
    textAlign: "center",
    paddingHorizontal: Metrics.baseMargin * 3,
    fontSize: Fonts.size.h2,
    color: "#989898",
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.borderColor,
  },
  rowCheckbox: {
    alignSelf: "flex-start",
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
  btnStyle: {
    width: "70%",
    height: null,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  cardView: {
    marginTop: Metrics.doubleBaseMargin,
    justifyContent: "center",
    borderRadius: 8,
    padding: Metrics.doubleBaseMargin,
  },
  labelTextInput: {
    marginBottom: Metrics.smallMargin,
    color: Colors.labelHeaderText,
    fontSize: Fonts.size.medium,
  },
  txtNoAccount: {
    color: Colors.white,
    alignSelf: "center",
    marginVertical: 5,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: Fonts.size.small,
  },
  txtRegister: {
    color: Colors.txtUpLight,
    textAlign: "center",
  },
  iconFlagsStyle: {
    height: 35,
    width: 35,
  },
  iconFlagsContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  btnTestConnStyles: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
    backgroundColor: Colors.transparent,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 45,
    width: "50%",
    borderRadius: 8,
    padding: 10, // 15
    borderColor: Colors.borderGrey, // '#ccc'
    marginBottom: Metrics.smallMargin, // 5
    shadowColor: "rgba(14, 41, 82, 0.15)",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 2,
  },
  txtVersion: {
    color: Colors.white,
    alignSelf: "center",
    marginVertical: 5,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: Fonts.size.small,
  },
  foodter: {
    width: "100%",
    justifyContent: "flex-end",
    height: Metrics.height,
    position: "absolute",
    zIndex: -1,
    backgroundColor: colors.white,
  },
  txtFoodter: {
    textAlign: "center",
  },
  imgFooter: {
    top: Platform.OS === "android" ? -50 : -90,
    flexDirection: "row",
  },
  img: {
    width: 140,
    height: 200,
  },
  containerMain: {
    zIndex: 1,
    elevation: 0,
    position: "relative",
    flex: 1,
  },
  iconLange: {
    width: 30,
    height: 30,
  },
  //   Fingerpring: {
  //     // flex: 1,
  //     justifyContent: "center",
  //     alignContent: "center",
  //     alignItems: "center",
  //     top: 10,
  //     marginBottom: 20,
  //     marginHorizontal: 20,
  //   },
  //   textFingerpring: {
  //     color: Colors.iconTab,
  //     fontSize: Metrics.paddingButton,
  //   },
  //   iconFingerpring: {
  //     top: 10,
  //   },

  fingerPrintContainer: {
    // flex: 1,
    alignItems: "center",
    marginTop: 0,
  },
  fingerPrintIcon: {
    alignItems: "center",
    zIndex: 9999,
    width: 60,
    height: 60,
  },
});