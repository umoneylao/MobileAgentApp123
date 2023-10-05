import {Dimensions, Platform} from 'react-native'
const { width, height } = Dimensions.get('window')
const metrics = {
  width,
  height,
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  paddingButton: 15,
  doubleBaseMargin: 20,
  tripleBaseMargin: 30,
  tinyMargin: 2,
  smallMargin: 5,
  doubleSection: 60,
  spaceSection: 75,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 72 : 64,
  customNavBarHeight: 52,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    fix:40,
    fixIcon:50,
    xl: 60
  },
  images: {
    small: 20,
    xSmall: 25,
    xXSmall: 30,
    medium: 40,
    xMedium: 60,
    large: 70,
    avatar: 80,
    mediumLogo: 150,
    logo: 200
  },
  fullButtonWidth: '70%',
  buttonWidth:'50%'
}

export default metrics
