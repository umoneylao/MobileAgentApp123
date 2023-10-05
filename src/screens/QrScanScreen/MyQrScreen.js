import React, { useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    PermissionsAndroid,
    Alert,
    Platform,
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';
import { Colors, Images } from '../../themes'
import { QRCode } from 'react-native-custom-qr-codes';
import I18n from 'react-native-i18n'

const App = (props) => {
    const viewRef = useRef();
    const userName = props.info.customerName
    const getPermissionAndroid = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Image Download Permission',
                    message: 'Your permission is required to save images to your device',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            }
            Alert.alert(
                '',
                'Your permission is required to save images to your device',
                [{ text: 'OK', onPress: () => { } }],
                { cancelable: false },
            );
        } catch (err) {

            console.log('err', err);
        }
    };

    const downloadImage = async () => {
        try {

            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 0.8,
            });

            if (Platform.OS === 'android') {
                const granted = await getPermissionAndroid();
                if (!granted) {
                    return;
                }
            }

            const image = CameraRoll.save(uri, 'photo');
            if (image) {
                Alert.alert(
                    '',
                    I18n.t('saveQRcomplete'),
                    [{ text: 'OK', onPress: () => { } }],
                    { cancelable: false },
                );
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const shareImage = async () => {
        try {
            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 0.8,
            });
            console.log('uri', uri);
            const shareResponse = await Share.open({ url: uri });
            console.log('shareResponse', shareResponse);
        } catch (error) {
            console.log('error', error);
        }
    };
    const onRequestAmount = () => {
        alert('ok')
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <View style={styles.body}>
                        <View style={styles.savedComponent} ref={viewRef}>
                            <Text style={styles.name}>{userName || null}</Text>
                            <QRCode
                                // content='00020101021129510006UMONEY011385620958731970220Mr Bobby Keodouangdy5204533153034185802LA5903N/A6003N/A63044558'
                                logo={Images.logoInQR}
                                logoSize={50}
                                
                            />

                        </View>
                        <TouchableOpacity style={styles.mainButtom} onPress={onRequestAmount}>
                            <Text style={styles.txtButtom}>{I18n.t('RequestAmount')}</Text>
                        </TouchableOpacity>

                        <View style={styles.row}>
                            <TouchableOpacity style={styles.button} onPress={downloadImage}>
                                <Image source={Images.iconSave} style={{ width: 24, height: 24, }} />
                                <Text>{I18n.t('save')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={shareImage}>
                                <Image source={Images.iconShare} style={{ width: 24, height: 24, }} />
                                <Text>{I18n.t('share')}</Text>
                            </TouchableOpacity>


                        </View>

                    </View>
                </ScrollView>

            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    },
    body: {
        marginTop: 100,
        alignItems: 'center',
    },
    savedComponent: {
        backgroundColor: 'white',
        marginBottom: 10,
    },
    text: {
        textAlign: 'center',
    },
    image: {
        width: 252,
        height: 150,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 5,
    },
    row: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '75%',
    },
    button: {
        backgroundColor: '#EEEEEE',
        padding: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },
    mainButtom: {
        width: null,
        height: null,
        padding: 10,
        backgroundColor: Colors.txtUpLight,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20
    },
    txtButtom: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: '500'
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.backColor,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 7

    },
});

export default App;
