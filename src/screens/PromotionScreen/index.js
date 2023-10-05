import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, Image, StatusBar, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { CustomNavbar, ActivityIndicator } from '../../../src/components'
import I18n from 'react-native-i18n'
import { getPromotion } from '../../actions/GetPromontion'
import * as Animatable from 'react-native-animatable';
import { SERVER_PATH_EU } from '../../utils/Api'


class PromotionScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'Useless Placeholder',
      isLoading: false,
      data: null,
      refresh: false,
      language: null
    }
  }

  getPromotion() {
    const lang = I18n.currentLocale()
    let getLang
    switch (lang) {
      case 'lo':
        getLang = 'lo'
        this.props.getPromotion(getLang)
        this.setState({ isLoading: true, isGetPromontion: true, language: getLang })
        break;
      case 'en':
        getLang = 'en'
        this.props.getPromotion(getLang)
        this.setState({ isLoading: true, isGetPromontion: true, language: getLang })
        break;
      case 'vn':
        getLang = 'vi'
        this.props.getPromotion(getLang)
        this.setState({ isLoading: true, isGetPromontion: true, language: getLang })
        break;
      case 'cn':
        getLang = 'zh'
        this.props.getPromotion(getLang)
        this.setState({ isLoading: true, isGetPromontion: true, language: getLang })
        break;
      default:
        break;
    }
  }
  componentDidMount() {
    this.getPromotion()
  }

  componentWillReceiveProps(nextProps) {
    const { isGetPromontion, isLoading } = this.state
    if (isGetPromontion && isLoading) {
      switch (nextProps.actionType) {
        case 'GET_PROMOTION_SUCCESS':
          let reponData = nextProps.requesPromotion.data
          this.setState({ isLoading: false, isGetPromontion: false, data: reponData })
          break;
        case 'GET_PROMOTION_FAILED':
          this.setState({ isLoading: false, isGetPromontion: false })
          break;

        default:
          break;
      }
    } else {

    }
  }
  onRefresh = () => {
    this.getPromotion()
  }
  renderItem(item, index) {
    let getLang = this.state.language
    return (
      <Animatable.View
        animation="zoomInDown"
        delay={index * 100}
      >
        { item.status === '1' ?
          <TouchableOpacity style={styles.containerItem} onPress={() => this.props.navigation.navigate('PromotionDetail', { item, getLang })}>
            <View style={{ justifyContent: 'center', flex: 1, paddingLeft: 10, paddingRight: 10 }}>
              <View style={styles.borderShadow}>
                <View style={{ width: '100%', height: null, borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
                  <Image style={styles.imageStyle} resizeMode='cover' source={{ uri: `${SERVER_PATH_EU}/cms-backend/cms/file/v1.0/image/${item.detail_imgs}` }} />
                </View>
                <View style={{ padding: 10 }}>
                  <Text numberOfLines={5} style={styles.txtTitle}>{item.title_promotion}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity> : null}


      </Animatable.View>
    )
  }
  render() {
    const { isLoading, data } = this.state
    // console.log('data:', data)
    return (
      <View style={styles.container}>
        {isLoading ? <ActivityIndicator /> : null}
        <CustomNavbar headerBackground colorText txtTitle={'promotion'} />
        <FlatList
          style={{ padding: 10, paddingTop: 15, }}
          data={data}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={item => item.id}
          extraData={this.state}
          refreshing={this.state.refresh}
          onRefresh={this.onRefresh}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    infoAccount: state.auth.infoAccount,
    getPromotionReducer: state.getPromotionReducer,
    isFetching: state.getPromotionReducer.isFetching,
    actionType: state.getPromotionReducer.actionType,
    requesPromotion: state.getPromotionReducer.requesPromotion,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPromotion: (getLang) => { dispatch(getPromotion(getLang)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PromotionScreen)
