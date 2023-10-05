import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, Colors, Fonts } from '../../themes'
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: Metrics.baseMargin,
    },
    warpInputStyle: {
        flex: 1,
        justifyContent: 'space-between',
    },
    groupInput: {
        margin:2,
        marginBottom: 20
    },
    txtLabel: {
        color: Colors.textInputLabelColor,
        // fontSize: Fonts.size.medium
    },
    fistRowInput: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInputFooter: {
        height: 70,
    },
    centerModal: {
        justifyContent: 'center',
        backgroundColor: 'red',
        margin: 0,
        paddingTop: 10
    },
    groupeDate: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderBottomColor: Colors.activeTabIcon,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent'
    },
    combobox: {
        flex: 1,
        height: 40,
        width: '100%',
        borderColor: '#EBF0F6',
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 10
    },
    error: {
        marginHorizontal: 10,
        color: Colors.fire,
        fontSize: Fonts.size.medium
    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        // margin: Metrics.baseMargin
    },
    buttonText: {
        textAlign: 'center',
        alignContent: 'center',
        color: Colors.white,
        marginLeft: 0
    },
    cardImageContainer: {
        flex: 1,
        marginBottom: Metrics.baseMargin,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImage: {
        alignContent: 'center',
        padding: Metrics.baseMargin,
        width: 260,
        height: 270,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    textInputFooter: {
        height: 60,
    },
    //
    boxSeleclist: {
        marginBottom: 10,
        margin: 5
    },
    selectStats: {
        width: '100%',
        height: 55,
        borderRadius: 5,
        backgroundColor: Colors.bgLight,
        justifyContent: 'center'
    },

    rowType: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        padding: 5,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        borderRadius: 4,
        width: '100%',
        alignSelf: 'flex-end',
        marginVertical: Metrics.smallMargin
        // flex: 1
    },
    txtStats: {
        padding: 5,
        left: 5
    },
    modelMain: {
        backgroundColor: Colors.white,
        width: '80%',
        height: null,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    btnFooter: {
        backgroundColor: Colors.orange,
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10
    },
    label: {
        color: Colors.white,
        fontWeight: 'bold'
    },
    warpItemList: {
        padding: 10
    },

    comboboxSelect:{
        width:'100%',
        height:55,
        borderRadius:5,
        borderColor:Colors.txtIntup,
        borderWidth:0.5,
        backgroundColor:Colors.white,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10

    }
})

export default styles;