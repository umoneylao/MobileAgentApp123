import React, { Component } from 'react'
import {
    Text, View, FlatList,
    TouchableOpacity, Image, Linking,
    ImageBackground, Dimensions, Modal,
    NativeModules, AsyncStorage, Platform, SafeAreaView, StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { logout } from '../../actions/Auth'
import { Images, Colors, Metrics } from '../../themes'
import Ionicons from 'react-native-vector-icons/Ionicons'
import I18n from 'react-native-i18n'
import LinearGradient from 'react-native-linear-gradient'
import { menuSetting } from '../../models/MenuApp'
import * as Animatable from 'react-native-animatable';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import Animated from 'react-native-reanimated';
import styles from './styles'

const bs = React.createRef();
const fall = new Animated.Value(1);
const { width, height } = Dimensions.get('window')
const imageWidh = width - 0;
const imageHeigh = (imageWidh / 1125) * 915;
class MainSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setModalVisible: false,
            image_url: null,
            url_image: null,
            getImage: null
        };
        setTimeout(async () => {
            let getImage;
            getImage = null;
            try {
                getImage = await AsyncStorage.getItem('getImage');
            } catch (e) {
                console.log(e);
            }
            this.setState({ getImage: getImage })
        }, 1000);
    }
    onLogout = () => {
        this.props.onLogOut()
    }
    onUpdateBack(data) {
        data && data.isChangeLanguage ? this.props.navigation.setParams({ title: I18n.t('account') }) : null
    }
    onCick = (item) => {
        item.navigate == 'Loguot' ?
            this.props.onLogOut()
            :
            item.navigate == 'CallCenter' ?
                this.onCall()
                :
                this.props.navigation.navigate(item.navigate, { onUpdateBack: (data) => this.onUpdateBack(data) })
    }

    renderItem(item, index) {
        console.log('index:', index)
        return (
            <View>
                {index == 0 || index == 5 || index == 1 ? (<TouchableOpacity style={styles.viewMenuAccount} onPress={() => this.onCick(item)}>
                    <Image source={item.img} style={styles.iconMenuAccount} />
                    <Text style={styles.textMenuAccount}>{I18n.t(item.name)}</Text>
                </TouchableOpacity>) : (
                    <TouchableOpacity style={styles.viewMenuAccount} onPress={() => this.props.navigation.navigate(item.navigate)}>
                        <Image source={item.img} style={styles.iconMenuAccount} />
                        <Text style={styles.textMenuAccount}>{I18n.t(item.name)}</Text>
                    </TouchableOpacity>
                )}
            </View>
        )
    }
    onOpen() {
        this.setState({ setModalVisible: true })
    }
    onPressTakePhoto(cropping) {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 84,
            height: 84,
            includeExit: true,
            saveToPhotos :true
        }).then(image => {
            this.setState({
                image: { uri: image.path, width: image.width, height: image.height },
                url_image: image.path,
            }, () => {
                setTimeout(() => {
                    this.state.image != null ? this.setState({ isLoading: false }) : null
                }, 100)
            })
            this.saveImage();
        }).catch(e => {
            if (e.message = 'User cancelled image selection')
                this.setState({ image: null, url_image: null })
        });
    }

    onPressGallery(cropping) {
        this.setState({ isLoading: false })
        ImagePicker.openPicker({
            cropping: cropping,
            width: 84,
            height: 84,
            includeExit: true
        }).then(image => {
            this.setState({
                getItem: null,
                image: { uri: image.path, width: image.width, height: image.height },
                url_image: image.path,

            }, () => {
                setTimeout(() => {
                    this.state.image != null ? this.setState({ isLoading: false }) : null
                }, 100)
            })
            this.saveImage();

        }).catch(e => {
            if (e.message = 'User cancelled image selection')
                this.setState({ image: null, url_image: null })
        }
        );

        //image
    }
    saveImage = async () => {
        const { url_image } = this.state
        try {
            if (url_image !== null) {
                await AsyncStorage.setItem('getImage', url_image);
                this.setState({ getImage: url_image, setModalVisible: false })
            } else {
                alert('ON dat')
            }
        } catch (error) {
            console.log('Error saving data', error);
        }

    };

    onCencel() {
        this.setState({ setModalVisible: false })
    }
    onButton() {
        this.props.navigation.navigate('TestApp')
    }


    renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>{I18n.t('addPhoto')}</Text>
                <Text style={styles.panelSubtitle}>{I18n.t('yourPhoto')}</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={() => this.onPressTakePhoto(false)}>
                <Text style={styles.panelButtonTitle}>{I18n.t('takePhoto')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={() => this.onPressGallery(false)}>
                <Text style={styles.panelButtonTitle}>{I18n.t('gallery')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>{I18n.t('success')}</Text>
            </TouchableOpacity>

        </View>
    );
    renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );


    onCall(val) {
        let url = null;
        if (val == '0') {
            url = `tel:${168}`;
        } else {
            var hotNum = I18n.t('hotlineNumber')
            url = `tel:${hotNum}`;
        }

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    // onDowload() {
    //     const link = 'http://183.182.100.174:8998/donwload/APA_Insuarance2.pdf';
    //     Linking.canOpenURL(link).then(supported => {
    //         if (supported) {
    //             Linking.openURL(link);
    //         } else {
    //             console.log("Don't know how to open URI: " + this.props.url);
    //         }
    //     });
    // }


    render() {
        const { infoAccount } = this.props
        const { getImage } = this.state
        return (

            <View style={Styles.container}>
                <BottomSheet
                    ref={bs}
                    snapPoints={[600, -200]}
                    renderContent={this.renderInner}
                    renderHeader={this.renderHeader}
                    initialSnap={1}
                    enabledGestureInteraction={true}
                    callbackNode={fall}

                />
                <Animated.View style={{
                    opacity: Animated.add(0.9, Animated.multiply(fall, 1.0)), justifyContent: 'center', alignItems: 'center'
                }}>
                    <View style={Styles.top}>
                        <LinearGradient
                            colors={[Colors.colorStart, Colors.colorCenter, Colors.coloorEnd]}
                            style={styles.customBar}>
                            <ImageBackground source={Images.bg_headerAccout} style={{ width: imageWidh, height: imageHeigh, marginTop: Platform.OS === 'android' ? 0 : 20 }}>
                                {/* {
                                    infoAccount != null ? (
                                        <View style={styles.viewHeader}>
                                            <Text style={{ color: '#FFF', marginBottom: 10, fontSize: 20, fontWeight: 'bold' }}>{I18n.t('MyAccount')}</Text>
                                            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                                                {
                                                    getImage != null ? <Image source={{ uri: this.state.getImage }} style={styles.imageProfile} /> : <Ionicons size={90} name='md-person-circle-outline' color={Colors.bgLight} />
                                                }
                                            </TouchableOpacity>
                                            <Text style={styles.textName}>{infoAccount.customerName || null}</Text>
                                            <Text style={styles.textPhone}>{infoAccount.phoneNumber || null}</Text>
                                        </View>
                                    ) : null
                                } */}

                                {
                                    infoAccount != null ? (
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                            <Text style={{ color: '#FFF', marginBottom: 5, fontSize: 20, fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}>{I18n.t('MyAccount')}</Text>
                                            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                                                {
                                                    getImage != null ? <Image source={{ uri: this.state.getImage }} style={styles.imageProfile} /> : <Ionicons size={90} name='md-person-circle-outline' color={Colors.bgLight} />
                                                }
                                            </TouchableOpacity>
                                            <Text style={styles.textName}>{infoAccount.customerName || null} - {infoAccount.agentCode || null}</Text>
                                            <Text style={styles.textPhone}>{infoAccount.phoneNumber || null}</Text>
                                        </View>
                                    ) : null
                                }


                            </ImageBackground>
                        </LinearGradient>
                    </View>
                    <View style={Styles.mainTop}>
                        <FlatList
                            data={menuSetting}
                            renderItem={({ item, index }) => this.renderItem(item, index)}
                            keyExtractor={item => item.id}
                            extraData={Object.assign(this.props)}
                        />
                        {/* <TouchableOpacity onPress={() => this.onDowload()}>
                            <Text>Dowload</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={Styles.dow}>


                    </View>

                </Animated.View>
            </View>

        )
    }
}
const mapStateToProps = state => ({
    infoAccount: state.auth.infoAccount,
    previousPhone: state.auth.previousPhone,
    profile: state.profile
})

const mapDispatchToProps = dispatch => ({
    onLogOut: (phoneNumber) => dispatch(logout(phoneNumber)),
    onNavigate: (route) => this.props.navigation.navigate('Promotion')
})
export default connect(mapStateToProps, mapDispatchToProps)(MainSetting)
const Styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Colors.white
    },
    top: {
        width: '100%',
        height: '40%',
        backgroundColor: Colors.orange
    },
    dow: {
        width: '100%',
        height: '60%',
    },
    mainTop: {

        width: '80%',
        height: null,
        backgroundColor: '#fff',
        zIndex: 1,
        position: 'absolute',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        justifyContent: 'center',

    }
})