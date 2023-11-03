import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../themes'
const W = Dimensions.get('window').width;

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const rectDimensions = SCREEN_WIDTH * 0.65;
const rectBorderColor = Colors.white
const scanBarWidth = SCREEN_WIDTH * 0.46;
const scanBarHeight = SCREEN_WIDTH * 0.0025;


export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.bgMain,
  },
  containerModel:{
    flex: 1,
  },
  txtTile:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  bgMainMenu: {
    height: 160,
    width: Metrics.width,
    resizeMode: 'contain'
  },
  iconStyle: {
    height: Metrics.icons.fixIcon - 5,
    width: Metrics.icons.fixIcon - 5,
    marginBottom: 5
  },
  iconStyleDisible: {
    height: Metrics.icons.fixIcon - 5,
    width: Metrics.icons.fixIcon - 5,
    marginBottom: 5,
    opacity:0.1
  },
  flatListStyle: {

  },
  warpItemList: {
    height: Metrics.doubleSection * 1.5,
    width: Metrics.width / 4.5,
    alignItems: 'center',
    left: 5

  },
  FlatList: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection:"row",
    
    
  },
  warpItemListOfThree: {
    height: Metrics.doubleSection * 1.8,
    width: Metrics.width / 3.5,
    alignItems: 'center'
  },
  txtIcon: {
    textAlign: 'center',
    // color: Colors.textColor,
    fontSize: Fonts.size.medium
  },
  // new view
  containerHideView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  txtHideView: {
    color: Colors.white,
    fontSize: Fonts.size.fifSize
  },
  txtHeaderScroll: {
    color: Colors.white,
    fontSize: Fonts.size.medium
  },
  headStyle: {
    height: 70,
    width: Metrics.width,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  topViewHeader: {
    backgroundColor: Colors.customNav,
    height: 45,
    marginBottom: -35,
    borderColor: 'orange'

  },
  bottomViewHeader: {
    backgroundColor: Colors.transparent,
    height: 25
  },
  midViewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 70,
    width: '95%',
    backgroundColor: Colors.headScroll,
    zIndex: 100,
    alignSelf: 'center',
    marginBottom: -35,
    borderRadius: 12
  },
  contentContainer: {
    top: Platform.OS == 'android' ? -20 : 36
  },
  groupList: {
    paddingHorizontal: Metrics.baseMargin,
    // marginBottom: Metrics.baseMargin,
    // paddingTop: Metrics.baseMargin

  },
  cardStyle: {

    borderRadius: 5,
    borderBottomWidth: 0.5,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.card,
    borderColor: Colors.transparent,
    marginBottom: Metrics.baseMargin,

    zIndex: 1,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // elevation: 5,
  },

  txtHeader: {
    fontSize: Fonts.size.fifSize,
    fontWeight: 'bold',
    color: Colors.backColor,
    marginBottom: Metrics.doubleBaseMargin,

  },
  footerCard: {
    backgroundColor: Colors.card,
    padding: Metrics.baseMargin,
    borderRadius: 12,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
  },
  txtFooter: {
    textAlign: 'center',
    color: Colors.customNav,
    fontSize: Fonts.size.medium
  },
  stripeFooter: {
    margin: 20,
    color: Colors.green
  },

  warpContent: {
    paddingVertical: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%'
  },
  icHeaderScroll: {
    height: 30,
    width: 30
  },

  rowElectWater: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  txtHeaderBalane: {
    fontSize: Fonts.size.medium,
    left: 5,
    color: Colors.backColor,
    textTransform: "uppercase",
    fontWeight: 'bold',
  },
  txteye: {
    fontSize: Fonts.size.medium,
    right: 5,
    fontWeight: 'bold',
    color: Colors.backColor,
  },
  txtLineBalane: {
    borderBottomWidth: 0.5,
    borderBottomColor: 0.5,
    borderColor: Colors.grayDark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 6,
    width: '100%',
  },
  txtName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '50%'
  },
  txtNameBalan: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15,
    width: '50%'
  },
  icClick: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  textInputStyle: {
    borderRadius: 5,
    backgroundColor: Colors.ricePaperS,
    height: 40,
    margin: 10,
    padding: 10,
  },
  backgroundImageElip: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  backgroundImage: {
    width: 320,
    height: 480,
  },
  bg: {
    position: 'absolute',
    width: 1000,
    height: 1000,
    top: -(880 - W / 2),
    alignSelf: 'center',
    borderRadius: 1000,
    overflow: 'hidden',
    backgroundColor: Colors.blueLight,

  },
  textConten: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textLine: {
    color: Colors.textLine,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  bg2: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: 250,
  },
  bg1: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: 280,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  iconBalance: {
    flexDirection: 'row'
  },
  rowImage: {

    justifyContent: 'center',
    alignItems: 'center',

  },
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5

  },
  tetxScratch: {
    borderRadius: 5,
    backgroundColor: Colors.ricePaperS,
    width: '100%', height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // top:-10

  },
  fontScratch: {
    color: Colors.white,
    fontSize: Fonts.size.fifSize,
    left: 15
  },
  iconMenuHeader: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: Fonts.size.medium,
  },
  btnFooter: {
    zIndex: 999,
    position: "absolute",
    bottom: 5,
    right: 5

  },
  iconHeaderStyle: {

    height: Metrics.icons.large - 5,
    width: Metrics.icons.large - 5,
    marginBottom: 5

  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  slide2: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },

  headerTextinput: {
    height: null,
    justifyContent: 'center',
    marginBottom: Platform.OS == 'android' ? 10 : 0,
    marginHorizontal: 10,
    top: Platform.OS == 'android' ? 25 : 15,
  },
  menuHeader: {
    width: '100%',
    height: 85,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ccc'
  },

  modalContent: {
    width: '90%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },


  //QR code

  //   rectangleContainer: {
  //     flex: 1,
  //     alignItems: "center",
  //     justifyContent: "center",
  //     backgroundColor: "transparent"
  //   },
  //   topOverlay: {
  //     flex: 1,
  //     height: SCREEN_WIDTH,
  //     width: SCREEN_WIDTH,
  //     justifyContent: "center",
  //     alignItems: "center"
  //   },

  //   scanBar: {
  //     width: scanBarWidth,
  //     height: scanBarHeight,
  //   },
  //   rectangle: {
  //     height: rectDimensions,
  //     width: rectDimensions,
  //     borderWidth: 5,
  //     borderColor: rectBorderColor,
  //     alignItems: "center",
  //     justifyContent: "center",
  //     backgroundColor: "transparent",
  //     borderRadius: 10,
  //   },

  //   bottomOverlay: {
  //     flex: 1,
  //     height: SCREEN_WIDTH,
  //     width: SCREEN_WIDTH,
  //     paddingBottom: SCREEN_WIDTH * 0.25
  //   },
  //   leftAndRightOverlay: {
  //     height: SCREEN_WIDTH * 0.65,
  //     width: SCREEN_WIDTH,
  // },





})
