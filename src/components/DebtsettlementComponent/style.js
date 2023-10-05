import { StyleSheet, Platform } from 'react-native'
import { Fonts, Metrics, Colors } from '../../themes'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: Metrics.height,
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',

  },
  left: {
    // backgroundColor:'#CCCC',
    width: '50%',
    height: null,

  },
  right: {
    // backgroundColor:'#00ff',
    width: '50%',
    height: null,


  },
  txtConten: {
    // padding:10,
    // margin:5
  },
  contens: {
    marginTop: 6
  },
  cardStyle: {
    margin: Metrics.baseMargin,
    borderRadius: 4,
    padding: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin
  },
  txtCors: {
    color: Colors.orange
  },
  buttonStyle: {
    flexDirection: 'row',
    borderRadius: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupInput: {
    marginBottom: Metrics.baseMargin,

  },
  resuledata: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'

  },
  iconStyle: {
    height: Metrics.icons.xl - 5,
    width: Metrics.icons.xl - 5,
    marginBottom: 10
  },
  mainAmount: {
    height: null,
    backgroundColor: Colors.txtHeader,
    padding: 10,

  },
  mainBalance: {
    height: null,
    backgroundColor: Colors.txtHeader,
    justifyContent: 'center',
    padding:10
  },
  txtMain: {
    fontSize: 15,
    left: 10,
  },
  mainInfo: {
    padding: 20
  },
  FullTextInput: {
    padding: 20
  },
  txtButton:{
    alignItems:'center',
    justifyContent:'center',
    flex: 1,
}
})
