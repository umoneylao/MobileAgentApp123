import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../themes'

export default StyleSheet.create({
    ...ApplicationStyles.screen,

    box: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: Colors.white
    },
    header: {
        width: '100%',
        height: null,
        backgroundColor: Colors.txtHeader,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    TextChange: {
        width: '20%',
        justifyContent: 'center',
    },
    image: {
        width: 50,
        height: 50,
    },
    iconText: {
        width:'80%',
        flexDirection: 'row',
        justifyContent:'space-between'
    }

})
