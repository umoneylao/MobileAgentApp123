import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity, FlatList, Dimensions, SafeAreaView } from 'react-native';
import { Images, Colors, Metrics } from '../../themes'
import { changeLocalLanguage } from '../../actions/Auth'
import { connect } from 'react-redux'
const listLanguage = [
  {
    id: '1',
    key: 'lo',
    name: 'ພາສາລາວ',
    images: Images.ic_laosLang
  },
  {
    id: '2',
    key: 'vn',
    name: 'Tiếng Việt',
    images: Images.ic_vietnamLang
  },
  {
    id: '3',
    key: 'en',
    name: 'English',
    images: Images.ic_englishLang
  },
  {
    id: '4',
    key: 'cn',
    name: '中文',
    images: Images.ic_chineseLang
  },
];

class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'lo'
    };
  }
  UNSAFE_componentWillMount() {
    let key = this.props.route.params.key;
    this.setState({
      key: key
    })
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.localLanguage != '') {
      this.props.navigation.goBack(null);
    }
  }
  renderItemMenuLanguage(item, index) {
    const { key } = this.state
    return (
      <TouchableOpacity onPress={() => { this.props.changeLocalLanguage(item.key); }} style={{ padding: 20 }}>
        <View style={key == item.key ? styles.boxColor : styles.box}>
          <View style={styles.icon}>
            <Image source={item.images} style={styles.Images} />
          </View>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.containerMain}>
            <FlatList
              data={listLanguage}
              renderItem={({ item, index }) => this.renderItemMenuLanguage(item, index)}
              numColumns={2}
              keyExtractor={(item, index) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              extraData={Object.assign(this.props)}
            />
          </View>
          <View style={styles.imgFooter}>
            <Image source={Images.bg_footerLogin} style={styles.img} />
          </View>

        </View>

      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    localLanguage: state.auth.localLanguage,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeLocalLanguage: (language) => { dispatch(changeLocalLanguage(language)) },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Language)

const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  header: {
    flex: 1,
    marginHorizontal: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },

  box: {
    width: 130,
    height: 130,
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

  },
  boxColor: {
    width: 130,
    height: 130,
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.orange,
    borderWidth: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  icon: {
    marginBottom: 5
  },
  Images: {
    width: 60, height: 60
  },

  imgFooter: {

  },
  img: {
    width: 200,
    height: 200,

  },

  foodter: {
    width: '100%',
    justifyContent: 'flex-end',
    height: Metrics.height,
    position: 'absolute',
    zIndex: -1,
    backgroundColor: Colors.white,

    top: -50
  },
  img: {
    width: 140,
    height: 200,

  },
  mainContainer: {
    flex: 1,
  },
  button: {
    width: 160,
    height: 130,
  },
  containerMain: {
    zIndex: 3,
    elevation: 3,
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
