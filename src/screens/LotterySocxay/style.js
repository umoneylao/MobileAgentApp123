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
    box: {
        flex: 1,
        backgroundColor: Colors.white
    },
    header: {
        width: '100%',
        height: 95,
        backgroundColor: '#F8F8F8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    TextChange: {
        justifyContent: 'center',
        flexDirection:'row'
    },
    image: {
        width: 50,
        height: 50,
    },
    iconText: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    //
    centeredView: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    modalView: {
        width: '100%',
        height: '100%',
        // margin: 5,
        backgroundColor: "white",
        alignItems: "center"
    },

    containerItem: {
        padding: 5,
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        paddingHorizontal: Metrics.baseMargin,
        borderBottomWidth: 1,
        borderColor: Colors.borderGrey,
        backgroundColor: Colors.white,
    },
    txtItem: {
        flex: 1,
        fontSize: Fonts.size.medium,
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        margin: 7
    },
    txtItemNUmber: {
        flex: 1,
        fontSize: Fonts.size.medium,
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        margin: 7,
        color: Colors.endGradientNav,
        fontWeight: 'bold',
    },
    itemColor: {
        width: null,
        height: null,
        backgroundColor: Colors.colorIcon,
        opacity: 0.5,
        borderRadius: 4,

    },
    containerItemHeader: {
        padding: 5,
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        paddingHorizontal: Metrics.baseMargin,
        borderColor: Colors.borderGrey,
        backgroundColor: Colors.white,
        flex: 1,
        backgroundColor: Colors.backgroundList
    },

    item: {

        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / 3,
    },

    img_Style: {
        width: 90,
        height: 110,
        borderRadius: 20,
        borderColor: '#ccc',
        borderWidth: 1
    },


})

export default styles;