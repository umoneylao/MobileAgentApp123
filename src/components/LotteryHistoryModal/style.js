import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, Colors, Fonts } from '../../themes'
var { height, width } = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,

    },
    warpDetail: {
        width: '95%',
        paddingTop: 40
    },
    modalContent: {
        paddingBottom: Platform.OS === 'ios' ? height / 2 - 80 : 20,
        paddingTop: 30,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(254, 235, 205, 0.6)'
    },
    modalContentPin: {
        paddingBottom: Platform.OS === 'ios' ? height / 2 - 80 : 20,
        paddingTop: 30,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(254, 235, 205, 0.6)'
    },
    centerModal: {
        justifyContent: 'center',
        backgroundColor: 'red',
        margin: 0,
        paddingTop: 10
    },
    rowDetail: {
        margin: Metrics.baseMargin,
        flexDirection: 'column'
    },
    txtLabel: {
        ...Fonts.style.normal,
        color: Colors.titleTransaction,
        fontSize: Fonts.medium,
        // flex: 2
        marginLeft: Metrics.baseMargin,
        paddingBottom: 15
    },
    txtTitle: {
        ...Fonts.style.regular,
        color: Colors.titleTransaction,
        fontSize: Fonts.regular,
    },
    txtValue: {
        flex: 6
        // borderWidth: 1,
        // borderColor: 'red'
    },
    amountCol: {
        flexDirection: 'row'
    },
    txtAmount: {
        ...Fonts.style.normal,

        color: Colors.titleTransaction,
        fontSize: Fonts.medium
    },
    cardDetail: {
        backgroundColor: Colors.white,
        paddingLeft: Metrics.doubleBaseMargin,
        marginBottom: Metrics.baseMargin
    },
    cardView: {
        backgroundColor: Colors.white,
        marginLeft: Metrics.baseMargin,
        marginRight: Metrics.baseMargin,
        marginBottom: Metrics.baseMargin
    },
    textInputSearch: {
        width: "100%",
        fontSize: 14,
        textAlignVertical: "center",
        marginTop: 5,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.border,
        height: 35,
        paddingHorizontal: 15
    },
    containerItem: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center'
        // borderWidth: 1,
        // borderColor: 'green'
    },
    containerItemHistory: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        padding: 5,
        justifyContent: 'space-between',
        paddingHorizontal: Metrics.baseMargin,
        borderBottomWidth: 1,
        borderColor: Colors.borderGrey,
        backgroundColor: Colors.white
    },
    txtItem: {
        flex: 1,
        fontSize: Fonts.size.medium,
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center'
        // fontSize:15
    },
    avatarTemple: {
        height: 30,
        width: 30,
        // resizeMode: 'contain',
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: Colors.borderGrey,
        marginRight: Metrics.doubleBaseMargin
    },
    templeName: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor,
        textAlignVertical: 'center',
        width: '100%',
        height: '100%'
    },
    txtProvince: {
        color: Colors.black
    },
    rowButton: {
        marginTop: Metrics.baseMargin,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonStyle: {
        borderRadius: 8,
        width: '60%',
        marginVertical: Metrics.baseMargin,
        alignSelf: 'center',
        marginTop: Metrics.baseMargin
    },
})
