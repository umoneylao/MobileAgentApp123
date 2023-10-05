import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: Colors.background,
    width:'100%',
    height:'100%'

  },
  main: {
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  itemText: {
    marginTop: 5,
    marginBottom:20
  },
  buttonStyle: {
    width: '90%',
  },
  btnCick:{
    marginTop:10
  }
})
