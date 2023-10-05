import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Metrics,Colors } from '../../themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // marginTop: Metrics.navBarHeight
    // marginTop: Metrics.navBarHeight,
  },
  txtTabBar: {
    ...Fonts.style.normal,
    fontSize: Fonts.size.fifSize,
    fontWeight: 'normal'
  },
  footerScroll: {
    marginTop: Metrics.baseMargin
    // height: '25%'
  }
})
