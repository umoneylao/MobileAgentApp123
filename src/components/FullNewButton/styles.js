import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../themes'

export default StyleSheet.create({
    button: {
        backgroundColor: Colors.orange,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 50,
        borderRadius:10
        
    },
    buttonDisable: {
       
        backgroundColor: Colors.grayDark,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius:10
       
    },
    buttonText: {
        textAlign: 'center',
        color: Colors.snow,
        fontSize: Fonts.size.fifSize,
        fontFamily: Fonts.type.bold,
        flex: 1,
        textTransform: "uppercase",
        justifyContent:'center'
       
    },
    buttonTextDisable: {
        margin: 18,
        height: 20,
        textAlign: 'center',
        color: Colors.snow,
        fontSize: Fonts.size.medium,
        fontFamily: Fonts.type.bold,
        width: '90%'
    },
    arrowLeftIcon: {
    },
    arrowRightIcon: {
    }
})
