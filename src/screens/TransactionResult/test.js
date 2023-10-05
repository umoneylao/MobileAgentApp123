// import React, { Component } from 'react';
// import { View, Text, ImageBackground, Dimensions, StyleSheet } from 'react-native';
// import { Images, Colors, Metrics } from '../../themes'
// import LinearGradient from 'react-native-linear-gradient'
// import styles from './styles'


// const { width, height } = Dimensions.get('window')
// const imageWidh = width - 0;
// const imageHeigh = (imageWidh / 1125) * 915;
// class test extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }

//     render() {
//         return (
//             <View style={{ flex: 1, backgroundColor: '#cccc' }}>
//                 <LinearGradient
//                     colors={[Colors.colorStart, Colors.colorCenter, Colors.coloorEnd]}
//                     style={styles.customBar}>
//                     <ImageBackground source={Images.bg_headerAccout} style={{ width: imageWidh, height: imageHeigh, }}>

//                     </ImageBackground>
//                 </LinearGradient>

//             </View>
//         );
//     }
// }
// const styles = StyleSheet.create({
    
// });
// export default test;
import React, { Component } from 'react';
import { View, Text } from 'react-native';

class test extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> test </Text>
      </View>
    );
  }
}

export default test;

