import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  cardView: {
    justifyContent: 'center',
    borderRadius: 8,
    padding: Metrics.doubleBaseMargin,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowStyleFingerprint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  txtItem: {
    color: Colors.backColor,
    fontWeight:'500'
    
  },
  iconStyle: {
    height: Metrics.icons.medium,
    width: Metrics.icons.medium,
    marginRight: Metrics.doubleBaseMargin
  },
  settingIcon: {
    height: Metrics.icons.medium,
    width: Metrics.icons.medium,
    marginRight: Metrics.doubleBaseMargin,
    borderRadius: 15
  },
  // modal
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  txtHeaderModal: {

    width: '100%',
    textAlign: 'center',
    paddingBottom: 10,
    borderBottomColor: Colors.cloud
  },
  language: {
    paddingVertical: 10,
    width: '90%',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  txtLanguage: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Metrics.paddingButton,
    left: 10
  },
  txtLanguageActive: {
    textAlign: 'center',
    justifyContent: 'center',
    color: Colors.startGradientNav,
    fontSize: Metrics.paddingButton,
    left: 10
  },
  spinnerStyle: {
    zIndex: 999,
    position: 'absolute',
    top: '50%',
    left: '50%'
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconLang: {
    width: 50,
    height: 50
  },
  onTick: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  iconTick: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  Fingerprint: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  //
  panel: {
    padding: 20,
    backgroundColor: Colors.white,
    paddingTop: 20,

  },
  panelTitle: {
    fontSize: 20,
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
  header: {
    backgroundColor: Colors.white,
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
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
  buttom: {
    padding: 10,
    backgroundColor: '#ccebff',
    borderRadius: 10,
    marginBottom: 20
  },
  centeredView: {
    // flex: 1,
    justifyContent: 'flex-end',
    // alignItems: "center",
    // backgroundColor: 'rgba(224, 224, 224, 0.6)'
  },
  modalView: {
    // width: '100%',
    backgroundColor:Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 5,
    // alignItems: "center",
    // height: '50%'
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontWeight: '900',
  },
  txtOTP:{
    color:Colors.txtUpLight,
    fontSize:14
  }
})
