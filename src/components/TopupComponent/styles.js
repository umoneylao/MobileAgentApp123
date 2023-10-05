import { StyleSheet, Dimensions, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../themes'
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        backgroundColor: Colors.white,
        height: Metrics.height,
        justifyContent: 'space-between',
        padding: 5
    },
    mainScreen: {
        padding: 10,
        height: null,
    },
    headerAmonut: {
        backgroundColor: Colors.backgroundList,
        height: null,
        marginBottom:5
    },
    ViewText: {
        padding: 10
    },
    TextColor: {
        color: Colors.backColor,
        fontSize: Metrics.paddingButton,
        

    },
    groupInputSub: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginLeft: -1,
        marginRight: -1,
        top: -5,
    },
    btnLogo: {
        margin: 5,
        borderWidth: 1,
        height: 51,
        borderRadius: 5,
        alignItems: 'center',
        borderColor: '#CBCBCB',
        justifyContent: 'center'
    },
    btnLogoTPLUST:{
        margin: 5,
        borderWidth: 1,
        height: 51,
        borderRadius: 5,
        alignItems: 'center',
        borderColor: '#CBCBCB',
        justifyContent: 'center',
        backgroundColor:'#FDCC03'
    },
    logo: {
        width: Platform.OS == 'android' ? 70 : 75,
        alignItems: 'center',
    },
    buttonCick: {
        // justifyContent: 'flex-end',
        flex: 1,
        padding: 10,
        top: 0,
    },
    btnStyle: {
        width: '100%',
    },
    buttonOnCick: {
        // flex: Platform.OS == 'android' ? 0.2 : 0.3,
        // height: 50,
        // alignContent: 'center',
        // alignItems: 'center',
        // marginBottom: Platform.OS == 'android' ? 35 : 45,
    },
    rowMoney: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: Metrics.baseMargin,
        top: -10
    },
    warpButtonMoney: {
        flex: 1,
        alignItems: 'center',
    },
    buttonMoney: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 40,
        borderRadius: 4,
        borderColor: Colors.dark_gray,
        borderWidth: 1,
    },
    txtMoney: {
        ...Fonts.style.normal,
        fontSize: Fonts.size.regular,
        color: Colors.backColor,
        marginVertical: 15,
        height: 20,
        // fontWeight: 'bold'
    },
    txtMoneySelected: {
        color: Colors.backColor,
        // fontWeight: 'bold'
    },
    backgroundBtnMoney: {
        borderColor: Colors.orange,
        borderWidth: 1,
    },

    centeredView: {
        width: '100%',
        height: '100%',
    },
    modalView3: {
        width: '100%',
        height: '100%',
        backgroundColor: "white",
       
    },

})
