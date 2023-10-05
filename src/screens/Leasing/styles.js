import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../themes'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        padding:10,
        backgroundColor:Colors.white
    }

})
