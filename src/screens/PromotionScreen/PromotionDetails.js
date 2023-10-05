
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar, Platform, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../../themes'
import { ActivityIndicator, CustomNavbar } from '../../components'
import { SERVER_PATH_EU } from '../../utils/Api'

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 165;
const { width, height } = Dimensions.get('window')
const imgHeight = (width / 342) * 146;
const imageWidh = width - 40;
const imageHeigh = (imageWidh / 328) * 120;
class PromotionDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNavTitle: false,
            img: null,
            title: null,
            isLoading: false,
            content: null
        };
    }
    componentDidMount() {
        const { params } = this.props.route
        if (params) {
            this.setState({ img: params.item.detail_imgs, title: params.item.title_promotion, content: params.item.content_promotion })
        } else {
            alert('Cant get promotiom')
        }
    }
    render() {
        const { title, img, isLoading, content } = this.state
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                {isLoading ? <ActivityIndicator /> : null}
                <CustomNavbar backButton txtTitle='promotion' onBack={() => this.props.navigation.goBack()} />
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                    <Image source={{ uri: `${SERVER_PATH_EU}/cms-backend/cms/file/v1.0/image/${img}` }} resizeMode='cover' style={{ width: width, height: imgHeight }} />
                    <View style={styles.main}>
                        <Text style={styles.navTitle}>
                            {title}
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionContent}>{content ? content : null}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default PromotionDetails

const styles = StyleSheet.create({
    image: {
        height: MAX_HEIGHT,
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        resizeMode: 'cover',
    },

    main: {
        backgroundColor: Colors.white,
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#cccccc',
    },
    title: {
        fontSize: 16,
        flexDirection: 'row',
    },
    name: {
        fontWeight: 'bold',
    },
    section: {
        padding: 10,
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',

    },
    sectionContent: {
        fontSize: 16,
        textAlign: 'justify',

    },
    keywords: {
        flex: 1,
        height: 600
    },
    keyword: {
        fontSize: 16,
        color: 'white',
    },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        opacity: 0,
    },
    navTitle: {
        marginTop: 10,
        fontSize: 15,
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        marginBottom: 10
    },
    boxColor: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 100,
        margin: 5

    },
    Images: {
        width: 180, height: 70
    },
    icon: {
        marginBottom: 5
    },
    item: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        flex: 1,
        margin: 4,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    textColor: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        left: 10,
        marginBottom: 5,
        top: 5
    },
});


