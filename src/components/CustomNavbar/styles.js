import { StyleSheet, Platform } from 'react-native'
import { Fonts, Metrics, Colors } from '../../themes'
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    height: null,
    paddingTop: Platform.OS === 'ios' ? 0 : 0,

  },
  container3: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.orange,
    height: Platform.OS === 'ios' ? 100 : 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    height: isIphoneX ? 88 : Metrics.customNavBarHeight,
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
  },


  leftContainer: {
   
    width:'20%',
    height:60,
    justifyContent:'center',
    alignItems:'center'

  },
  rightContainer: {
    width:'20%',
    height:60,
    justifyContent:'center',
    alignItems:'center'
  },
  midContainer: {
    width:'60%',
    height:60,
    justifyContent:'center',
    alignItems:'center'
  },
  avatarNav: {
    height: Metrics.navBarHeight,
    width: Metrics.navBarHeight,
    borderRadius: Metrics.navBarHeight / 2
  },
  txtTitleMiddle: {
    width: '80%',
    color: Colors.backColor,
    fontSize: Fonts.size.fifSize,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textColor: {
    width: '80%',
    color: Colors.white,
    fontSize: Fonts.size.fifSize,
    alignItems: 'center'
  },
  textHeader: {
    color: '#000',
    fontSize: 16,
    top: Platform.OS === 'ios' ? 0 : null,
    fontWeight: 'bold',
    textTransform: "uppercase",
  },
  textHeader1: {
    color: Colors.white,
    fontSize: 16,
    top: Platform.OS === 'ios' ? 10 : null,
    fontWeight: 'bold',
    textTransform: "uppercase",
  }
})
