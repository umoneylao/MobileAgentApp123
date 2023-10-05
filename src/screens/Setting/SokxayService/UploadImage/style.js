import { StyleSheet, Dimensions, Platform } from "react-native";
import { ApplicationStyles, Metrics, Colors, Fonts } from "../../../themes";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  // new style
  cardStyle: {
    margin: Metrics.baseMargin,
    borderRadius: 4,
    padding: Metrics.doubleBaseMargin
    // paddingBottom: Metrics.baseMargin * 3
  },
});
