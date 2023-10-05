import React, { Component } from 'react'
import { Text, View } from 'react-native'
import WatermarkView from '../../components/WatermarkView'


// foreground: PropTypes.bool,
// style: ViewPropTypes.style,
// watermark: PropTypes.string,
// watermarkTextStyle: Text.propTypes.style,
// rotateZ: PropTypes.number

export class watater extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                 <View>
                 <Text> textInComponent </Text>
                 </View>
                <WatermarkView foreground={true} style={null} watermark='bopvy k8cntt bopvy k8cntt bopvy k8cntt bopvy k8cntt bopvy k8cntt bopvy k8cntt bopvy k8cntt bopvy k8cntt bopvy k8cntt bopvy k8cntt bopvy k8cntt' watermarkTextStyle={null} rotateZ={-45} />
               
            </View>
        )
    }
}

export default watater
