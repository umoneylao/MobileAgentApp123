import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, Colors, Fonts } from '../../themes'


const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    // ...ApplicationStyles.screen,
    centerModal: {
        flex: 1,
    },
    contentModal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(60,60,60, 0.9)'

        // (0,206,209)
    },
    content: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        width: width - 70,
        height: 270,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnHide: {
        height: 45,
        width: width - 70,
        backgroundColor: Colors.orange,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top:-40
    },
    titleStyle: {
      
        marginBottom: 10,
        fontSize: 20,
        textAlign:'center',
        fontWeight:'bold'
    },
    footer:{
        justifyContent: 'flex-end', 
        flex: 1 
    },
    mainContent:{
        flex: 1, 
        flexDirection: 'column'
    }
})
