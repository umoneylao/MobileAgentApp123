import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: Colors.white,
    flex: 1
  },
  warpContent: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    height: '100%',
    borderColor: 'rgba(200,200,200, 0.5)'
  },
  validateModal: {
    height: Metrics.height
  },
  cardStyle: {
    margin: Metrics.baseMargin,
    borderRadius: 4,
    padding: Metrics.doubleBaseMargin,
    height: '90%'
  },
  label: {
    ...Fonts.style.regular,
    color: Colors.textColor,
    fontSize: Fonts.size.medium,
    flex: 4,
    marginRight: Metrics.baseMargin
  },
  value: {
    color: Colors.black,
    flex: 7,
    fontSize: Fonts.size.medium
  },
  rowInfo: {
    marginVertical: Metrics.smallMargin,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconShowBalance: {
    marginRight: Metrics.baseMargin,
    height:30,
    width:30
  },
  containerChart: {
    flex: 1,
    padding: Metrics.baseMargin
  },
  chart: {
    flex: 1,
    paddingTop: 20
  },
  refreshButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.baseMargin,
    alignSelf: 'center',
    width: '70%',
    padding: 2,
    borderWidth: 1,
    borderRadius: 5
  }
})
