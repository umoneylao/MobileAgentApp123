import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, Colors, Fonts } from '../../themes'
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgLight,
    },

    warpInputStyle: {
        flex: 1,
        justifyContent: 'space-between',
    },
    groupInput: {
        marginBottom:0,
        margin:15

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
        flexDirection: 'row',
        borderRadius: 8,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
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
    cardStyle: {
        
         
    },
    iconShowBalance: {
        marginRight: Metrics.baseMargin
    },
    txtItem: {
        flex: 1,
        fontSize: Fonts.size.medium,
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        margin: 7
        // fontSize:15
    },
    txtItemNUmber: {
        flex: 1,
        fontSize: Fonts.size.medium,
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        margin: 7,
        color:Colors.endGradientNav,
        fontWeight: 'bold',
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
    iconStyle: {

        flexDirection: 'row',
        alignItems: 'center',
    },
    txtTabBar: {
        ...Fonts.style.normal,
        fontSize: Fonts.size.fifSize,
        fontWeight: 'normal'
    },
    inputMoneyStyle: {
        flex: 1,
        height: 40,
        paddingLeft: Metrics.baseMargin,
        marginTop: Metrics.smallMargin,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        borderRadius: 4,
    },
    rowInfo: {
        marginVertical: Metrics.smallMargin,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Colors.borderGrey,
        padding: 5
    },
    containerItemHistory: {
        flexDirection: 'column',
        paddingHorizontal: Metrics.baseMargin,
        borderBottomWidth: 1,
        borderColor: Colors.borderGrey,
        backgroundColor: Colors.white,
        padding: 5
    },
    txtItemHistory: {
        flex: 1,
        fontSize: Fonts.size.medium,
        margin: 2
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 5,
        marginLeft: 5,
        marginRight: 5
    },
    iconStyleHeader: {
        width: 50,
        height: 50
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '400',
        color: '#222',
        fontSize: 15,
        width: 170,
    },
    nameTxt1: {
        marginLeft: Platform.OS === 'ios' ? 0 : 10,
        fontWeight: '400',
        color: Colors.backColor,
        fontSize: 13,
        width: 170,
        marginLeft: 15,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    msgTxt1: {
        fontWeight: '400',
        color: Colors.fire,
        fontSize: 12,
        marginLeft: 15,
    },
    msgTxt2: {
        fontWeight: '400',
        color: Colors.bloodOrange,
        fontSize: 12,
        marginLeft: 15,
    },
    msgTxt: {
        fontWeight: '400',
        color: '#000',
        fontSize: 12,
        marginLeft: 15,
        marginRight: 20

    },
    // model
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: 'rgba(224, 224, 224, 0.6)'
    },
    modalView: {
        width:'100%',
        height:'100%',
        margin: 5,
        backgroundColor: "white",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalView2: {
        width: '90%',
        height: '90%',
        margin: 5,
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalView3: {
        width: '90%',
        height: null,
        margin: 5,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    rowDate: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: 150,
        borderColor: Colors.borderColor,
        height: 40,
        borderRadius: 6,
    },
    inputBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Metrics.baseMargin,
        height: 50,
        borderWidth: 1,
        borderColor: '#CBCBCB',
        borderRadius: 6,
        alignItems: 'center',
        borderBottomWidth: 1,
        width: "80%",
        // marginBottom: Metrics.baseMargin * 2,
    },
    txtDate: {
        marginRight: Metrics.section,
    },
    borderCaneter: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5
    },
    btnFooter: {
        zIndex: 999,
        position: "absolute",
        bottom: 5,
        right: 5,


    },
    btnFooterLeft: {
        padding: 5,


    },
    icon: {

        width: 50,
        height: 50,
        backgroundColor: Colors.backgroundList,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },

    item: {

        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / 3, // approximate a square
    },

    img_Style: {
        width: 90,
        height: 110,
        borderRadius: 20,
        borderColor:'#ccc',
        borderWidth:1
    },
    footer: {
        justifyContent: 'flex-start',
        width: '100%',
        height: 70,
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderColor: '#CCC',
        flexDirection: 'row',
    },
    boxfooter: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemColor:{
        width: null,
        height:null,
        backgroundColor:Colors.colorIcon,
        opacity:0.5,
        borderRadius:4,
        
    },
    //date
    header: {
        width: '100%',
        height: 40,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 10

    },
    textheader: {
        fontSize: 16,
        marginHorizontal: 20,
        padding: 4
    },
    datefilter: {
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: Colors.bgText,
        // marginHorizontal:10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerLeft: {
        width: '50%',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    headerRight: {
        width: '50%',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textStyle: {
        backgroundColor: Colors.bgLight,
        width: '100%',
        height: 40,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    TouchableOpacity: {

        width: 140,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    LinearGradient: {
        borderRadius: 5
    },
    centeredView1: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header1: {
        width: '100%',
        height: null,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        margin:10,
        paddingTop: Platform.OS === 'ios' ? Metrics.tripleBaseMargin : 0,
        alignItems:'center'

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