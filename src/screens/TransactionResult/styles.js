import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    // flexDirection: "column"
    // padding: Metrics.doubleBaseMargin
    // justifyContent: 'center'   backgroundColor: Colors.background,
  },
  txtHeader: {
    textAlign: 'center',
    fontSize: Fonts.size.h4,
    fontWeight: 'normal',
    marginVertical: Metrics.baseMargin,
    color: Colors.txtUpLight
  },
  txtDescription: {
    textAlign: 'center',
    marginHorizontal: Metrics.doubleBaseMargin,
    color: Colors.white,
    paddingHorizontal: Metrics.baseMargin * 3
  },
  iconCheck: {
    alignSelf: 'center',
    marginVertical: Metrics.baseMargin,
    color: Colors.white
  },
  warpInfo: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    padding: 10,
    width: '90%',
    alignSelf: 'center'
  },
  titleInfo: {
    ...Fonts.style.normal,
    fontSize: Fonts.size.medium,
    color: Colors.titleTransaction,
    marginBottom: 15
  },
  rowInfo: {
    // flexDirection: 'row',
    marginVertical: 5,
    marginBottom: 2,
    height:65
  },
  descriptionRow: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: 5,
    // marginLeft: 5,
    // marginRight: Metrics.baseMargin,
    // justifyContent: 'space-between'
    // borderWidth: 1
  },
  labelInfo: {
    fontSize: Fonts.size.regular,
    color: '#9C9C9C', 
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    fontWeight: '500',
  },
  valueInfo: {
    color: Colors.black,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    fontSize: Fonts.size.regular
  },
  descriptionStyle: {
    flex: 2,
    color: Colors.black,
    marginLeft: 5,
    fontSize: Fonts.size.medium,
    // alignSelf: 'flex-end',
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  textValue: {
    color: Colors.txtUpLight,
    textDecorationLine: 'underline',
    // marginRight: 15,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
    left: 10
  },
  rowButton: {
    flexDirection: 'row',
    marginTop: Metrics.baseMargin
  },
  buttonStyle: {
    borderRadius: 5,
    flex: 1,
    height: 45
  },
  rowBackHome: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.doubleBaseMargin
  },
  txtBackHome: {
    marginLeft: Metrics.baseMargin,
    color: Colors.backColor,
    fontSize: Fonts.size.fifSize,
    textDecorationLine: 'underline'
  },
  imageSizeCon: {
    width: 170, height: 110,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 90,
    backgroundColor: Colors.white,
    justifyContent: 'space-between'
  },
  textHeader: {
    alignItems: 'center',
    color: Colors.backColor,
    fontSize: 14
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  valueFee: {
    color: Colors.red,
    marginRight: 15,
    fontSize: 14,
    marginTop: 5,
    fontWeight: '900'
  },

})
