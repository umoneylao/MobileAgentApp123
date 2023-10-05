import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, Colors, Fonts } from '../../themes'
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({

    cardStyle: {
        margin: Metrics.paddingButton,
        // paddingBottom: Metrics.doubleBaseMargin
    },
    card:{
        margin: Metrics.paddingButton,
        top:-15
    },
    groupInput: {
        marginBottom: Metrics.baseMargin,

    },
    txtLabel: {
        color: Colors.textInputLabelColor,
    },
    buttonStyle: {

        borderRadius: 10,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    FlatList: {
        // marginBottom: 20
    },
    txtButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }


})

export default styles;