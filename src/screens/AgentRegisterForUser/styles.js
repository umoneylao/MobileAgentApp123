import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  warpContainer: {
    justifyContent: 'space-between',
    flex: 1,
    height: Metrics.height
  },
  warpField: {
    paddingVertical: Metrics.marginVertical,
    marginTop: -10

  },
  txtLabel: {
    ...Fonts.style.regular,
    color: Colors.blueLight,
    fontSize: Fonts.size.fifSize,
    marginBottom: Metrics.smallMargin
  },
  rowDate: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.txtIntup,
    height: 60,
    borderRadius: 4,
    alignItems: 'center',
    paddingHorizontal: Metrics.baseMargin
  },
  txtDate: {
    // width: 150,
    flex: 1,
    marginRight: Metrics.section,
    color: Colors.black,
    fontSize: Fonts.size.fifSize

  },
  iconCalendar: {
    height: Metrics.section,
    width: Metrics.section
  },
  rowIdentify: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  dropdownStyle: {
    // width: '28%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150

  },
  rowType: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 4,
    width: '90%',
    alignSelf: 'flex-end',
    marginVertical: Metrics.smallMargin
    // flex: 1
  },
  buttonStyle: {
    marginTop: Metrics.doubleSection,
    width: Metrics.fullButtonWidth,
    alignSelf: 'center',
    marginBottom: Metrics.doubleBaseMargin,
    justifyContent: 'flex-end'
  },
  // dropdownTextStyle: {
  //   ...Fonts.style.normal,
  //   color: Colors.text,
  //   fontSize: Fonts.size.medium,
  //   width: Metrics.screenWidth - 40,
  //   textAlign: 'center',
  //   fontWeight: 'bold'
  // },

  // new style
  cardStyle: {
    margin: Metrics.baseMargin,
    borderRadius: 4,
    padding: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.baseMargin * 3
  },
  txtType: {
    flex: 1,
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    color: Colors.black
    // alignSelf: 'flex-start'
  },
  spinnerStyle: {
    zIndex: 999,
    position: 'absolute',
    top: '50%',
    left: '50%'
  },
  container: {
    backgroundColor: Colors.white,
    height: Metrics.height,
    paddingTop: Platform.OS === 'ios' ? Metrics.tripleBaseMargin : 0,
    justifyContent: 'space-between'
  },
  TextInput: {
    justifyContent: 'center',
    marginBottom: 15,
  },
  img: {
    width: 140,
    height: 200,
  },
  imgFooter: {
    top: Platform.OS === 'android'? -40 : -90
  },
  selectStats: {
    width: '100%',
    height: 58,
    borderRadius: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 15,
    borderWidth: 0.5,
    borderColor: Colors.txtIntup,
  },
  txtStats: {
    padding: 5
  },
  modelMain: {
    backgroundColor: Colors.white,
    width: '80%',
    height: null,
    borderRadius: 10,
    justifyContent: 'space-between'
  },
  btnFooter: {
    backgroundColor: Colors.orange,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10
  },
  label: {
    color: Colors.white,
    fontWeight: 'bold'
  },
  warpItemList: {
    padding: 10
  },
})
