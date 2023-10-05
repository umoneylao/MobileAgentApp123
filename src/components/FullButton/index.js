import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Images, Colors, Metrics ,Fonts} from '../../themes'

export class index extends Component {
    render() {
        const { isDisable, textButton } = this.props
        return (
            !isDisable ?
                    <TouchableOpacity style={[this.props.styles]} onPress={this.props.onPress}>
                        <LinearGradient colors={[Colors.startGradientNav, Colors.endGradientNav]} style={styles.signIn}>
                            <Text style={[styles.textSign, { color: Colors.white }]}>{textButton}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                 :

                <View style={[this.props.styles]}>
                    <LinearGradient colors={[Colors.txtIntup, Colors.grey]} style={styles.signIn}>
                        <Text style={[styles.textSign, { color: Colors.white }]}>{textButton}</Text>
                    </LinearGradient>
                </View>

        )
    }
}

export default index
const styles = StyleSheet.create({
    signIn: {
        width: '70%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        
    },
    textSign: {
        fontSize: Fonts.size.fifSize ,
        // fontWeight: 'bold'
    },
})