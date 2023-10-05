import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    height: '100%',
    backgroundColor: Colors.background
  },
  txtHeader: {
    textAlign: 'center',
    fontSize: Fonts.size.h4,
    fontWeight: 'normal',
    marginVertical: Metrics.baseMargin,
    color: Colors.orange
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
    // color: Colors.white
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
    fontSize: Fonts.size.fifSize,
    color: Colors.titleTransaction,
    marginBottom: 15
  },
  rowInfo: {
    flexDirection: 'column',
    marginVertical: 5,
    marginBottom:10,
    height: 60
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
    fontSize: Fonts.size.fifSize,
    color:Colors.iconTab
  },
  valueInfo: {
    color: Colors.black,
    // marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    fontSize: Fonts.size.fifSize
  },
  descriptionStyle: {
    flex: 2,
    color: Colors.black,
    marginLeft: 5,
    fontSize: Fonts.size.fifSize,
    // alignSelf: 'flex-end',
    // borderWidth: 1,
    // borderColor: 'blue',
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
    color: Colors.white,
    fontSize: Fonts.size.fifSize,
    textDecorationLine: 'underline'
  },
  imageSizeCon: {
    width:170, height:100 ,
    alignItems: 'center',
  },
})
