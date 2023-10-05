import React, { Component } from 'react'
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper';
import { SERVER_PATH_EU } from '../../utils/Api'

const { width, height } = Dimensions.get('window')
const imageWidh = width - 20;
const imageHeigh = (imageWidh / 328) * 119;

class index extends Component {
    onCick(e) {
       this.props.onCickShowdetail(e)
    }

    render() {
        return (
            <Swiper
                autoplay
                horizontal={true}
                height={220}
                showsPagination={true}
                showsButtons={false}
                loop={true}
                backgroundColor='transparent'
                activeDotColor="#FF6347">
                {this.props.imgBanner.map(e => (
                    e.status === '1' ?
                    <TouchableOpacity style={styles.slide2} key={e.id} onPress={() => this.onCick(e.id)}>
                        <Image source={{ uri: `${SERVER_PATH_EU}/cms-backend/cms/file/v1.0/image/${e.detail_imgs}` }} style={{ width: imageWidh, height: imageHeigh, borderRadius: 10 }} />
                    </TouchableOpacity>
                    : null
                ))}
            </Swiper>
        )
    }
}
export default index
const styles = StyleSheet.create({
    slide2: {
        flex: 1,
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
})
