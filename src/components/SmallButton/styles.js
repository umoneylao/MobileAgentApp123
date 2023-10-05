import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../themes'

export default StyleSheet.create({
    button: {
        width: null,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5,
    },
    buttonDisable: {
        width: null,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.colorButtonDisable,
        borderRadius: 5,
        padding: 5,
    },
    buttonText: {
        margin: 18,
        textAlign: 'center',
        color: Colors.snow,
        fontSize: Fonts.size.fifSize,
        fontFamily: Fonts.type.bold,
        width: '100%',
        height: 20,
        textTransform: "uppercase"
    },
    arrowLeftIcon: {
    },
    arrowRightIcon: {
    }
})
