import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../themes'

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        backgroundColor: Colors.white,
        marginHorizontal: 20,
        marginTop: 20
    },
    buttonStyle: {
        width: '100%',
    },
    itemText: {
        marginBottom: Metrics.baseMargin
    },
    txtButton:{
        alignItems:'center',
        justifyContent:'center',
        flex: 1,
    }
})
