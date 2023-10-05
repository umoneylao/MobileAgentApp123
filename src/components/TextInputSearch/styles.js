import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../themes/'

export default StyleSheet.create({
  container: {
    // width: '100%'
    // height: 50,
    // width: Metrics.screenWidth * 0.9,
    width: '100%',
    // marginHorizontal: Metrics.section,
    // marginVertical: Metrics.doubleBaseMargin,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    justifyContent: 'center'
    // borderWidth: 1
    // alignSelf: 'center'
    // flex: 1
  },
  label: {
    ...Fonts.style.regular,
    color: Colors.blueLight,
    fontSize: Fonts.size.small,
    marginBottom: Metrics.smallMargin
  },
  inputBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: Metrics.smallMargin
  },
  textInput: {
    // marginVertical: 5,
    height: 50,
    width: '100%'
    // flex: 1
  },
  error: {
    marginHorizontal: 10,
    color: Colors.fire,
    fontSize: Fonts.size.medium
  }
})
