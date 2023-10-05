import { StyleSheet, Dimensions, Platform } from "react-native";
import { ApplicationStyles, Metrics, Colors, Fonts } from "../../themes";
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
    // borderRadius: 4,
    // padding: Metrics.doubleBaseMargin
    // paddingBottom: Metrics.baseMargin * 3
  },
  rowInfo: {
    marginVertical: Metrics.smallMargin,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
    padding:5
  },
  warpList: {
    marginBottom: Metrics.smallMargin,
    margin:0
  },
  containerItem: {
    padding:10,
    alignContent:'center',
    flexDirection: 'row',
    // flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: Metrics.spaceSection,
    paddingHorizontal: Metrics.baseMargin,
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
    backgroundColor: Colors.white
  },
  txtItem: {
    flex: 1,
    // fontSize: Fonts.size.medium
    fontSize:15
  },
  container_scroll: {
    // flex: 1,
    backgroundColor: Colors.white,
    margin: Metrics.baseMargin
  },
  btnStyle_take: {
    justifyContent: "center",
    width: width - 20,
    height: 35,
    alignContent: "center",
    backgroundColor: "#009688",
    marginTop: Metrics.baseMargin,
    // marginVertical: Metrics.baseMargin,
    borderRadius: 1
  },
  btnStyle_upload: {
    justifyContent: "center",
    width: width - 20,
    height: 35,
    alignContent: "center",
    backgroundColor: "#7CB342",
    marginVertical: Metrics.baseMargin,
    borderRadius: 1
  },
  btnText: {
    color: Colors.white,
    textAlign: "center",
    alignItems: "center"
  },
  img: {
    width: width - 20,
    height: height / 1.5,
    resizeMode: "cover",
    borderRadius: 1
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  centerModal: {
    backgroundColor: "#1D2B35",
    margin: 0,
    paddingTop: Platform.OS === "android" ? 10 : 20
  },
  containRow: {
    // flexDirection: 'row',
    // alignItems: 'center',
    flex: 1,
    top: 0
  },
  modalContain: {
    flex: 1
  },
  modalContainer: {
    backgroundColor: "#1D2B35",
    flex: 1
  },
  header: {
    backgroundColor: "#1D2B35",
    paddingRight: 10,
    paddingLeft: 10,
    width: width,
    flex: 9
  },
  viewImg: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cloasIcon: {
    alignItems: "flex-end",
    justifyContent: "center"
  },
  flashIcon: {
    justifyContent: "center",
    alignItems: "center"
  },
  center: {
    backgroundColor: "#0DBC79",
    padding: 10,
    width: width
  },
  footer: {
    backgroundColor: "#1D2B35",
    padding: Platform.OS === "android" ? 15 : 20,
    width: width,
    flex: 1
  },
  viewImgfooter: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  instagramIcon: {
    justifyContent: "center"
  },
  photocameraIcon: {
    justifyContent: "center"
  },
  photosIcon: {
    justifyContent: "center"
  },
  size_flashIcon: {
    width: 30,
    height: 30
  },
  size_cancel: {
    width: 20,
    height: 20
  },
  size_photocamera: {
    width: 50,
    height: 40
  },
  size_photos: {
    width: 40,
    height: 40
  },
  size_instagram: {
    width: 70,
    height: 70
  },
  iconShowBalance: {
    marginRight: Metrics.baseMargin
  }
});
