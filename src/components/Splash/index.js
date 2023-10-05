import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, StatusBar, SafeAreaView } from "react-native";
import { Images, Metrics,Colors } from '../../themes'

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
          <View style={styles.containerMain}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginTop:-30 }}>
            <Image source={Images.icLoginAgent} style={styles.logo} />
            </View>
          </View>
        </View>
        <View style={styles.foodter}>
          <View style={styles.imgFooter}>
            <Image source={Images.bg_footerLogin} style={styles.img} />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%'
  },
  foodter: {
    width: '100%',
    justifyContent: 'flex-end',
    height: Metrics.height,
    position: 'absolute', zIndex: -1,
    backgroundColor: Colors.white,
  },
  imgFooter: {

  },
  img: {
    width: 200,
    height: 200,

  },
  mainContainer: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    height: Metrics.height,
    paddingTop: Platform.OS === 'ios' ? Metrics.doubleBaseMargin : 0,
  },
  containerMain: {
    zIndex: 3,
    elevation: 3,
    position: 'relative',
    flex: 1,

  },
  logo: {
    marginTop: Metrics.tripleBaseMargin,
    marginBottom: Metrics.smallMargin,
    height: 130,
    width: 130,
    resizeMode: 'contain',
    alignSelf: 'center',
    // resizeMode:'center',
    // resizeMode: "contain",
  },
});
export default Splash;

