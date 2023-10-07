import { StyleSheet, Dimensions } from "react-native";
import { Metrics, Colors, Fonts } from "../../themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    top: Platform.OS == "android" ? 0 : 45,
  },
  textInputStyle: {
    width: "95%",
    borderRadius: 5,
    backgroundColor: Colors.bgText,
    height: 40,
    fontWeight: "bold",
    paddingLeft:20
  },
  textBox: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  iconBack: {
    height: 60,
    width: "10%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    height: 40,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
  },
  textHeader: {
    color: Colors.textLine,
    fontSize: 14,
    left: 10,
    fontWeight: "bold",
  },
  boxMenu: {
    // flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft: 10,
  },
  iconBox: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  txtIcon: {
    top: 4,
    textAlign: "center",
    color: Colors.textColor,
    fontSize: Fonts.size.medium,
  },
  iconStyle: {
    width: 50,
    height: 50,
  },
  iconStyleDisible: {
    width: 50,
    height: 50,
    opacity: 0.1,
  },
});