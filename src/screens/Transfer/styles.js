import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../themes'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    // backgroundColor:'#cc0000',
    flex: 1
  },
  containerItemHeader: {
    alignItems: 'center',
    margin: Metrics.baseMargin - 5,
    marginVertical: Metrics.baseMargin
  },
  txtHeader: {
    ...Fonts.style.normal,
    color: Colors.white,
    textAlign: 'center',
    fontSize: Fonts.medium,
    marginBottom: Metrics.smallMargin
  },
  containerItem: {
    alignItems: 'center',
    margin: Metrics.baseMargin,
    marginHorizontal: Metrics.doubleBaseMargin
    // marginVertical: Metrics.baseMargin
    // marginVertical: Metrics.section
  },
  avatar: {
    height: Metrics.images.small * 2,
    width: Metrics.images.small * 2,
    borderRadius: Metrics.images.small
    // borderWidth: 1,
    // borderColor: Colors.charcoal
  },
  warpImg: {
    borderRadius: Metrics.images.small,
    padding: 1
  },
  txtName: {
    ...Fonts.style.normal,
    marginTop: 5,
    color: Colors.white,
    fontSize: Fonts.medium
  },
  textInputStyle: {
    ...Fonts.style.normal,
    fontSize: 14,
    height: Metrics.doubleSection,
    // backgroundColor: Colors.cloud,
    paddingLeft: Metrics.baseMargin,
    flex: 1
  },
  warpInputStyle: {
    paddingHorizontal: Metrics.baseMargin
  },
  inputMoneyStyle: {
    height: Metrics.doubleBaseMargin * 2,
    paddingLeft: Metrics.baseMargin,
    marginTop: Metrics.smallMargin,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 4
    // textAlignVertical: 'top'
  },
  rowMoney: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: Metrics.doubleBaseMargin,
    marginVertical: Metrics.baseMargin
    // borderWidth: 1
  },
  txtMoney: {
    ...Fonts.style.normal,
    fontSize: Fonts.size.medium,
    color: Colors.textColor,
    marginVertical: 15
    // textAlign: 'center'
  },
  txtMoneySelected: {
    color: Colors.white
  },
  buttonMoney: {
    // flex: 1
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 35,
    borderRadius: 4
    // borderWidth: 1
    // borderRadius: 3
  },
  backgroundBtnMoney: {
    backgroundColor: Colors.colorButton
  },
  buttonStyle: {
    marginVertical: Metrics.baseMargin,
    width: Metrics.fullButtonWidth,
    alignSelf: 'center'
  },
  rowListPhone: {
    backgroundColor: Colors.cloud,
    paddingVertical: Metrics.baseMargin,
    paddingLeft: Metrics.doubleBaseMargin
  },
  // warp input phone header
  headStyle: {
    height: 50,
    width: Metrics.width,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.customNav
  },
  topViewHeader: {
    backgroundColor: Colors.customNav,
    height: 30,
    // width: '100%',
    marginBottom: -25
    // borderColor: 'orange',
    // borderWidth: 1

  },
  midViewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    width: '95%',
    backgroundColor: Colors.transparent,
    zIndex: 100,
    alignSelf: 'center',
    marginBottom: -25,
    borderRadius: 8
  },
  bottomViewHeader: {
    backgroundColor: Colors.transparent,
    height: 25
    // borderWidth: 1
    // width: Metrics.width,
  },
  warpTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 1,
    marginRight: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    borderRadius: 8
  },
  btnContact: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Metrics.baseMargin,
    borderRadius: 8
  },
  cardStyle: {
    margin: Metrics.baseMargin,
    borderRadius: 4,
    padding: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.baseMargin * 3
  },
  txtLabel: {
    color: Colors.textColor
  },
  warpButtonMoney: {
    // width: '100%',
    flex: 1,
    alignItems: 'center'
    // justifyContent: 'center',
    // borderRadius: 3,
    // borderWidth: 1
  },
  btnMoney: {
    backgroundColor: Colors.backgroundBtnMoney
    // width: '80%',
    // height: 35,
    // borderRadius: 4
  },
  txtLabelHeader: {
    color: Colors.white,
    marginLeft: Metrics.baseMargin,
    marginBottom: Metrics.tinyMargin
  }

})
