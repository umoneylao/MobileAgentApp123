import { StyleSheet, Dimensions, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../themes'
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    centerModal: {
        flex: 1,
        justifyContent:'flex-end',
        alignContent:'center'
    },
    updateModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(60,60,60, 0.9)'
    },
    updateContent: {
        backgroundColor: 'white',
        width: '85%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateDetail: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    updateTitle: {
        paddingTop: 10,
        fontSize: 18,
        fontWeight: '500'
    },
    updateBtnGroup: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderTopWidth: Platform.OS == 'android' ? 1 : 2,
        borderColor: Colors.borderColor
    },
    btnUpdateStyle: {
        height: 45,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTextUpdate: {
        textAlign: 'center',
        color: Colors.customNav
    },
    iconAler:{
        
        justifyContent: 'center',
        alignItems: 'center',
        
    }
})
