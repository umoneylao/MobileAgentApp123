/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
class WatermarkView extends React.Component {
  constructor(props) {
    super(props);
    this.renderWatermark = this.renderWatermark.bind(this);
  }

  static propTypes = {
    foreground: PropTypes.bool,
    style: ViewPropTypes.style,
    watermark: PropTypes.string,
    watermarkTextStyle: Text.propTypes.style,
    rotateZ: PropTypes.number
  };

  renderWatermark() {
    const { watermark = '', watermarkTextStyle, rotateZ = -45 } = this.props;
    let fullText = '';
    for (let index = 0; index < 50; index++) {
      fullText += watermark;
    }
    return (
      <View style={styles.watermarkContainer} pointerEvents={'none'}>
        <Text
          style={[
            watermarkTextStyle,
            {
              color: 'rgba(0,0,0,0.12)',
              fontSize: 16,
              lineHeight: 30,
              transform: [{ rotateZ: `${rotateZ}deg` }],
              width: '250%',
              height: '160%'
            }
          ]}>
          {fullText}
        </Text>
      </View>
    );
  }

  render() {
    const { style } = this.props;
    return (
      <View style={[styles.container, style]}>
        {this.renderWatermark()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    position:'absolute',
    zIndex:-9999
  },
  watermarkContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
    marginTop: -50,
  }
});

export default WatermarkView;
