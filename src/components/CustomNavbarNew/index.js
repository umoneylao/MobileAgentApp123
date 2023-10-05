// import React, { Component } from 'react'
// import { View, TouchableOpacity, StyleSheet, Platform, Text } from 'react-native'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import { Images, Colors, Metrics, Fonts } from '../../themes'
// import I18n from 'react-native-i18n'
// import { isIphoneX } from 'react-native-iphone-x-helper'
// class CustomNavbar extends Component {
//     onBack() {
//         this.props.onBack()
//     }
//     onCick() {
//         this.props.onCick()
//     }
//     renderLeft() {
//         return (
//             <View style={[styles.leftContainer, this.props.rightTitle ? { flex: 1 } : null]}>
//                 <TouchableOpacity onPress={() => this.onBack()} style={{ justifyContent: 'center', width: 50 }} >
//                     <Ionicons name='md-arrow-back-sharp' size={25} color={Colors.black} />
//                 </TouchableOpacity>
//             </View>
//         )
//     }

//     renderRight() {
//         return (
//             <View style={[styles.rightContainer, this.props.rightTitle ? { flex: 1 } : null]}>
//                 {!this.props.icon ? (
//                     <TouchableOpacity style={styles.icon} onPress={() => this.onCick()}>
//                         <Ionicons name={this.props.iconRight} size={25} />
//                     </TouchableOpacity>
//                 ) :
//                     <TouchableOpacity style={styles.icon}>
//                         <Image source={Images.logoDetale} style={styles.iconStyle} />
//                     </TouchableOpacity>}
//             </View>
//         )
//     }

//     renderMid() {
//         return (
//             <View style={[styles.midContainer, this.props.rightTitle ? { flex: 3 } : null]}>
//                 <Text style={styles.txtConten}>{I18n.t(this.props.conten)}</Text>
//             </View>
//         )
//     }

//     render() {
//         return (
//             <View style={styles.container}>
//                 {this.renderLeft()}
//                 {this.renderMid()}
//                 {this.renderRight()}
//             </View>
//         )
//     }
// }


// export default CustomNavbar;
// const styles = StyleSheet.create({
//     container: {
//         width: '100%',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         backgroundColor: Colors.orange,
//         height: 60,
//         paddingTop: Platform.OS === 'ios' ? 20 : 10,
//     },
//     leftContainer: {
//         marginLeft: 10,
//         width: Metrics.doubleBaseMargin,
//         justifyContent: 'center',
       
//     },
//     rightContainer: {
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         marginRight: 10,
       
//     },
//     midContainer: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         alignSelf: 'center',
      
//     },
//     avatarNav: {
//         height: Metrics.navBarHeight,
//         width: Metrics.navBarHeight,
//         borderRadius: Metrics.navBarHeight / 2
//     },
//     txtTitleMiddle: {
//         width: '80%',
//         color: Colors.white,
//         fontSize: Fonts.size.fifSize,
//         alignSelf: 'center',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     txtConten: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         textTransform: "uppercase"
//     },
// })


import * as React from 'react';
import { Appbar } from 'react-native-paper';

const MyComponent = () => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title="Title" subtitle="Subtitle" />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};

export default MyComponent;



// import * as React from 'react';
// import { FAB, Portal, Provider } from 'react-native-paper';

// const MyComponent = () => {
//   const [state, setState] = React.useState({ open: false });

//   const onStateChange = ({ open }) => setState({ open });

//   const { open } = state;

//   return (
//     <Provider>
//       <Portal>
//         <FAB.Group
//           open={open}
//           icon={open ? 'calendar-today' : 'plus'}
//           actions={[
//             { icon: 'plus', onPress: () => console.log('Pressed add') },
//             {
//               icon: 'star',
//               label: 'Star',
//               onPress: () => console.log('Pressed star'),
//             },
//             {
//               icon: 'email',
//               label: 'Email',
//               onPress: () => console.log('Pressed email'),
//             },
//             {
//               icon: 'bell',
//               label: 'Remind',
//               onPress: () => console.log('Pressed notifications'),
//               small: false,
//             },
//           ]}
//           onStateChange={onStateChange}
//           onPress={() => {
//             if (open) {
//               // do something if the speed dial is open
//             }
//           }}
//         />
//       </Portal>
//     </Provider>
//   );
// };

// export default MyComponent;