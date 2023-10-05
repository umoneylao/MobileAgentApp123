import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../themes'
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
   
    padding: Metrics.baseMargin,
  

  },
  groupList: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,

    padding: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
    backgroundColor: Colors.card,

    marginBottom: Metrics.baseMargin
  },
  iconLeft: {
    height: Metrics.images.medium,
    width: Metrics.images.medium,
    marginRight: Metrics.baseMargin
  },
  iconStyle: {
    height: Metrics.icons.large - 5,
    width: Metrics.icons.large - 5
  },
  rowContainer: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Metrics.smallMargin

  },
  warpContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  iconVector: {

  },
  warpIconVector: {
    height: 40,
    width: 40,
    backgroundColor: Colors.colorIcon,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: Metrics.baseMargin
  },
  warpIconVectorNoHolder: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: Metrics.baseMargin
  },
  txtItem: {
    color: Colors.textColor,
    fontSize: Fonts.size.medium
  },
  customBar: {
    width: '100%',
    height: null
  },
  viewHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    top: -30,
  },
  textName: {
    textAlign: 'center', color: Colors.white, fontSize: 16
  },
  textPhone: {
    textAlign: 'center', color: Colors.white, fontSize: 15,
    marginBottom:20
  },
  imageProfile: {
    width: 70,
    height: 70,
    borderRadius: 100,

  },
  contentContainer: {
    padding: Metrics.baseMargin, 
    flex:1,
    marginBottom:100
  },
  mainBorder: {
    width: 326,
    height: null,
    backgroundColor: Colors.white,
    borderRadius: 12,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
    marginTop: -150,
    padding: 10
  },
  viewMenuAccount: {
    flexDirection: 'row',
    padding: 13,
  },
  iconMenuAccount: {
    width: 24,
    height: 24,
  },
  textMenuAccount: {
    fontSize: 16,
    color: Colors.black,
    marginLeft: 8
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
    backgroundColor: 'rgba(224, 224, 224, 0.6)',
    padding: 10
  },
  modalView: {

    width: '100%',

    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  imageBox: {
    width: 60,
    height: 60,
    backgroundColor: Colors.backgroundList,
    borderRadius: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'

  },
  text: {
    textAlign: 'center',
    fontSize: 15
  },
  iconBox: {

    textAlign: 'center',

  },

  //
  panel: {
    padding: 20,
    backgroundColor: Colors.white,
    paddingTop: 10,

  },
  header: {
    backgroundColor: Colors.white,
    // shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    // shadowRadius: 2,
    // shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: Colors.blueLight,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
})
