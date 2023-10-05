import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../themes'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.white
    },
    header: {
        width: '100%',
        height: 95,
        backgroundColor: '#F8F8F8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    TextChange: {
        
        width:'50%',
       
      
    },
    image: {
        width: 50,
        height: 50,
    },
    iconText: {
        width:'50%',
        flexDirection: 'row',
        alignItems: 'center',

    },

    textCheang:{
        justifyContent: 'space-evenly',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(224, 224, 224, 0.6)'
    },
    modalView: {
        width: '100%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
    modalText: {
        marginBottom: 10,
        textAlign: "center"
    },
    inputContainer: {
        justifyContent: 'flex-end',
        height: 10,
    },
    textTimer: {

        left: Platform.OS === 'ios' ? 265 : 275,
        top: Platform.OS === 'ios' ? 18 : 33,
        color: Colors.bloodOrange,
        fontSize: 16
    },
    inputBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 40,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: Metrics.smallMargin,
        marginBottom: 5
    },
    itemTextFullname:{
        // fontSize:
    }

})
