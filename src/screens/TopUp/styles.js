import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: Colors.white,
  },
  warpInputStyle: {
    paddingHorizontal: Metrics.baseMargin
  },
  txtTitle: {
    ...Fonts.style.normal,
    marginLeft: Metrics.doubleBaseMargin
  },
  rowPhone: {
  },
  inputNumberStyle: {
  },
  icContact: {
    height: Metrics.section,
    width: Metrics.section
  },
  inputMoneyStyle: {
    paddingLeft: Metrics.baseMargin,
    marginTop: Metrics.section,
    borderTopWidth: 1,
    borderTopColor: Colors.borderGrey,
    textAlignVertical: 'top',
    padding: 15
  },
  rowMoney: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Metrics.baseMargin / 2
  },
  txtMoney: {
    ...Fonts.style.normal,
    color: Colors.black,
    marginVertical: 15
  },
  buttonMoney: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 3
  },
  backgroundBtnMoney: {
    backgroundColor: Colors.blueLight
  },
  buttonStyle: {
    marginTop: Metrics.doubleSection,
    width: '90%',
    alignSelf: 'center'
  },


  // model
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(224, 224, 224, 0.6)'
  },
  modalView: {
    width: '100%',
    margin: 20,
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
  modalText: {
    marginBottom: 10,
    textAlign: "center"
  },
  inputContainer: {
    justifyContent: 'flex-end',
    height: 10,
  },
  textTimer: {

    left: Platform.OS === 'ios' ? 265 : 275,
    top: Platform.OS === 'ios' ? 18 : 33,
    color: Colors.bloodOrange,
    fontSize: 16
  },
  inputBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: Metrics.smallMargin,
    marginBottom: 5
  },


})
