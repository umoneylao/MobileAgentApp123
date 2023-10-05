import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, Colors, Fonts } from '../../themes'
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    searchBox: {
        flexDirection: "row",
        marginBottom: 0
    },
    itemConten: {
        flexDirection: 'row',
        marginTop: Metrics.baseMargin,
    },
    images: {
        width: 50,
        height: 50,
        justifyContent: 'center'
    },
    textView: {
        left: 9,
        justifyContent: 'center'
    },
    itemText: {
        color: Colors.backColor,
        fontSize: Metrics.paddingButton,

    },
    iconStyle: {
        width: 50,
        height: 50,
    },
    iconStyleOff:{
        width: 50,
        height: 50,
        opacity:0.3
    },
    itemTextFullname: {
        color: Colors.textFullnamebank,
        fontSize: 12,
        
    }

})

export default styles;