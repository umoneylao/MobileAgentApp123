import { StyleSheet, Dimensions, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../themes'
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: Colors.white,
    height: Metrics.height,
    paddingTop: Platform.OS === 'ios' ? Metrics.tripleBaseMargin : 0,
    justifyContent: 'space-between'
  },
  warpInputStyle: {
    // flex: 1,
    // flex: 1,
    // justifyContent: 'space-between',
    // height: null
  },
  warpInputStyleInternet: {
    flex: 1,
    justifyContent: 'space-between',
    height: height - 140
  },
  txtTitle: {
    ...Fonts.style.normal,
    marginLeft: Metrics.doubleBaseMargin
  },
  rowPhone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputNumberStyle: {
    flex: 1,
    height: 100,
    width: '100%',
    paddingLeft: Metrics.baseMargin,
    marginTop: Metrics.section,
    textAlignVertical: 'top',
    padding: 15
  },
  icContact: {
    height: Metrics.section,
    width: Metrics.section
  },
  buttonStyle: {
    width: Metrics.fullButtonWidth,
    alignSelf: 'center',
    marginBottom: Metrics.doubleBaseMargin
  },
  // new style
  cardStyle: {
    margin: Metrics.baseMargin,
    borderRadius: 4,
    padding: Metrics.baseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    backgroundColor: '#909'
  },
  txtLabel: {
    color: Colors.textInputLabelColor,
    // fontSize: Fonts.size.medium
  },
  inputMoneyStyle: {
    height: Metrics.doubleBaseMargin * 2,
    paddingLeft: Metrics.baseMargin,
    marginTop: Metrics.smallMargin,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 4,
    // fontSize: Fonts.size.medium
    // textAlignVertical: 'top'
  },
  textInputFooter: {
    // textAlignVertical: 'top',
    // borderWidth: 1,
    // borderColor: Colors.borderColor,
    // borderRadius: 4,
    height: 60,
    // width: '100%',
    // fontSize: Fonts.size.medium,
    // paddingLeft: Metrics.baseMargin,
    // marginTop: Metrics.smallMargin
  },
  rowMoney: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Metrics.baseMargin,
    top: -10
  },
  warpButtonMoney: {
    flex: 1,
    alignItems: 'center',

  },
  buttonMoney: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 40,
    borderRadius: 4,
    borderColor: Colors.dark_gray,
    borderWidth: 1,
  },
  backgroundBtnMoney: {
    borderColor: Colors.orange,
    borderWidth: 1,
  },
  btnMoney: {

  },
  txtMoney: {
    ...Fonts.style.normal,
    fontSize: Fonts.size.regular,
    color: Colors.backColor,
    marginVertical: 15,
    height: 20,
   
  },
  txtMoneySelected: {
    color: Colors.backColor,
  },
  fistRowInput: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  groupInput: {
    marginBottom: Metrics.baseMargin,
  },
  groupInputRow: {
    width: '48%'
  },
  //topup log 
  groupInputSub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: -1,
    marginRight: -1,

    // marginTop: 3,
  },
  btnLogo: {
    margin: 5,
    borderWidth: 1,
    height: 51,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: '#CBCBCB',
    justifyContent: 'center'
  },
  logo: {
    width: Platform.OS == 'android' ? 90 : 90,
    alignItems: 'center'
  },
  centeredView: {
    width: '100%',
    height: '100%',
  },
  modalView3: {
    width: '100%',
    height: '100%',
    backgroundColor: "white",

  },
  txtRow: {
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainScreen: {
    top:8
  },
  mainHistory:{
    backgroundColor: '#F8F8F8',
    padding:10
  },
  mainHistoryItem:{
    
  }

})
