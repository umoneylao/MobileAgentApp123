import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, Colors, Fonts } from '../../themes'
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({

    cardStyle: {
        margin: Metrics.baseMargin,
        borderRadius: 4,
        padding: Metrics.baseMargin,
        paddingBottom: Metrics.doubleBaseMargin
    },
    groupInput: {
        padding:10,
        marginBottom:-10
    },
    txtLabel: {
        color: Colors.textInputLabelColor,
    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnStyle: {
        width: '100%',
    },
    txtButton:{
        alignItems:'center',
        justifyContent:'center',
        flex: 1,
    }

    
})

export default styles;