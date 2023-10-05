import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

export class tabTest extends Component {
    onNext(){
        this.props.navigation.navigate('TopUpContainer')
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={()=>this.onNext()}>
                <Text> textInComponent </Text>
                </TouchableOpacity>
               
            </View>
        )
    }
}

export default tabTest
