import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  border: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white
  },
  BorderMain: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  buttonStyle: {
    borderRadius: 8,
    width: '80%',
    height: 45,
    alignSelf: 'flex-end',

  },
  borderCaneter: {
    width: '100%',
    height: 50,
    // marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5
  },
  boxDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  txtDate: {
    marginRight: Metrics.section,
  },
  rowDate: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
    borderColor: Colors.borderColor,
    height: 40,
    borderRadius: 6,
  },
  inputBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.baseMargin,
    height: 50,
    borderWidth: 1,
    borderColor: '#CBCBCB',
    borderRadius: 6,
    alignItems: 'center',
    borderBottomWidth: 1,
    width: "80%",
    // marginBottom: Metrics.baseMargin * 2,
  },
  flatlist: {
    width: '100%',
    height: '100%',
    // backgroundColor:'#00cc'
  },
  containerItem: {
    padding: 5,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: Metrics.baseMargin,
    borderBottomWidth: 1,
    // borderTopWidth:1,
    borderColor: Colors.borderGrey,
    backgroundColor: Colors.white
  },

  txtItem: {
    flex: 1,
    fontSize: Fonts.size.medium,
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    margin: 5

  },
  titleInfo: {
    ...Fonts.style.normal,
    fontSize: Fonts.size.small,
    color: Colors.TextCode,
    padding: 5,
    marginLeft: Metrics.normalMargin,
    fontWeight: '500'
    // marginBottom: Metrics.smallMargin
  },
  groupInput: {
    // marginBottom: Metrics.baseMargin,
    flex: 0.9,

  },
  btnFooter: {
    zIndex: 999,
    position: "absolute",
    bottom: 60,
    right: 5,
  },
  icon: {

    width: 50,
    height: 50,
    backgroundColor: Colors.backgroundList,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  }

})
