import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../../themes'

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1
    },
    textInput:{
        top: 2,
        paddingLeft: Metrics.baseMargin,
        paddingRight: Metrics.baseMargin,
        width: width,
        flex:1,
    },
    textMess:{
        color:'#000000',
        borderColor: '#E6E6E6',
        fontSize:15,
        margin: Metrics.baseMargin,
    },
    center:{
        justifyContent:'center',
        alignItems:'center',
        flex:10,
        // backgroundColor: 'green',
        paddingTop: 0,
    },
    imgpLoad:{
        //padding: 10,
        // paddingLeft: 10,
        // paddingRight: 10,
        borderRadius: 5,
    },
    footer:{
        justifyContent:'center',
        alignItems:'center',
        padding: Metrics.baseMargin,
        width: width,
        flex: 1,
    },
    textClickMe:{
        color:'#ffffff',
        textAlign:'center',
        margin:Metrics.baseMargin,
        fontSize:15
    },
    butonClickMe:{
        justifyContent:'center',
        alignItems:'center',
        width:width-50,
        height:45,
        backgroundColor: Colors.colorButton,
        borderRadius:5,
        marginBottom: Metrics.baseMargin
    },
    img: {
        width: width - 20,
        height: height / 1.5,
        resizeMode: 'cover',
        borderRadius: 5
      },
});

export default styles;