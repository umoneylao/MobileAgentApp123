import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../themes'
const { width, height } = Dimensions.get('window')
const imageWidh = width - 40;
const imageHeigh = (imageWidh / 328) * 120;
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: Colors.white,
    flex: 1,

  },
  containerItem: {
    flexDirection: 'row',
    paddingBottom: 20
  },
  imageStyle: {
    width: imageWidh,
    height: imageHeigh,
    borderTopLeftRadius: 10, borderTopRightRadius: 10


  },
  colRight: {
    flex: 1
  },
  txtTitle: {
    ...Fonts.style.normal,
    color: Colors.darkBlack,
    fontSize: Fonts.size.fifSize,
    fontWeight: '500',
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10
  },
  txtContent: {
    width: '100%',
    color: Colors.black,
    fontSize: Fonts.size.medium
  },
  borderShadow: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  }
})