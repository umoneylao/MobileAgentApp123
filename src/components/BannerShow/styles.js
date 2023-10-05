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
    bannerGame:{
        width:300,
        height:400
    },
    btnPlay:{
        width:150,
        height:100,
       
    },
    boxPlay:{
        top:-60,
        alignItems:'center'
    },
    btnClose:{
        width:60,
        height:60
    },
    boxClose:{
       alignItems:'flex-end',
       top:50,
       zIndex:1,
       position:'relative',
       left:-15
    }
    
})
