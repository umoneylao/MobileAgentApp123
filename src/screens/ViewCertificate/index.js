import React from 'react';
import { StyleSheet, Dimensions, Platform, View, TouchableOpacity, Text, PermissionsAndroid, Modal } from 'react-native';
import { Colors } from '../../themes'
import Pdf from 'react-native-pdf';
import I18n from 'react-native-i18n'
import LottieView from 'lottie-react-native';
import { baseUpload } from '../../utils/Api'
import { Notification } from '../../components'
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/Ionicons'
// start getFileExtention
const getFileExtention = fileUrl => {
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
};
// end
export default class PDFExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            onGetLink: '',
            getPhone: '',
            setModle: false
        };
    }
    componentDidMount() {
        if (this.props.route.params) {
            // console.log('this.props.route.params:', this.props.route.params)
            let phone = this.props.route.params.phone;
            let getCertificate = this.props.route.params.certificateName;
            let linkget = { uri: baseUpload + `getimage/${getCertificate}`, cache: true }
            // console.log('linkget:', linkget)
            this.setState({
                onGetLink: linkget,
                getPhone: phone,
                setCertificate: getCertificate
            })
        } else {
            alert("Can't get values ID Transtion and Phone namer !")
        }

    }
    // start check Permition dowload

    checkPermission = async () => {
        if (Platform.OS === 'ios') {
            this.downloadFile();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'Application needs access to your storage to download File',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.downloadFile();
                    console.log('Storage Permission Granted.');
                } else {
                    alert('Error', 'Storage Permission Not Granted');
                }
            } catch (err) {
                console.log("++++" + err);
            }
        }
    };
    //en dowload

    //star dowload

    downloadFile = () => {
        const { setCertificate } = this.state
        let date = new Date();
        let FILE_URL = baseUpload + `donwload/${setCertificate}`;
        let file_ext = getFileExtention(FILE_URL);
        file_ext = '.' + file_ext[0];
        const { config, fs } = RNFetchBlob;
        let RootDir = fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                path:
                    RootDir +
                    '/file_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2) +
                    file_ext,
                description: 'downloading file...',
                notification: true,
                useDownloadManager: true,
            },
        };
        config(options)
            .fetch('GET', FILE_URL)
            .then(res => {
                // console.log('res -> ', JSON.stringify(res));
                this.onDeleteCert()
                this.setState({ setModle: true })
                // alert('File Downloaded Successfully.');


            });
    }
    //end dowload



    onDeleteCert = async () => {
        const { setCertificate } = this.state
        try {
            const responseDelete = await fetch(baseUpload + `delete/image/${setCertificate}`)
            // console.log('responseDelete:', responseDelete)
            const jsonDalete = await responseDelete.json();
            // console.log('jsonDalete:', jsonDalete)
            if (jsonDalete.status === 'success') {
                console.log('Delete success')
            } else {
                alert("Can't not Delete file")
            }
        } catch (error) {
            console.log('error:', error)
        }
    }
    onBackHome() {
        this.props.navigation.navigate('Home')
      }

    responseMessage() { this.refs.responseMessage.onClose() }
    render() {
        const { onGetLink, responseMessage } = this.state
        return (
            <View style={styles.container}>
                {onGetLink ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.mainPDF}>
                            <Pdf
                                source={onGetLink}
                                onLoadComplete={(numberOfPages, filePath) => {
                                    console.log(`number of pages: ${numberOfPages}`);
                                }}
                                onPageChanged={(page, numberOfPages) => {
                                    console.log(`current page: ${page}`);
                                }}
                                onError={(error) => {
                                    console.log(error);
                                }}
                                onPressLink={(uri) => {
                                    console.log(`Link presse: ${uri}`)
                                }}
                                style={styles.pdf} />
                        </View>
                        <View style={styles.bottom}>
                            <TouchableOpacity style={styles.buttom} onPress={() => this.checkPermission()}>
                                <Text style={{ fontSize: 15, fontWeight: '600', color: Colors.txtUpLight }}>{I18n.t('dowloadCret')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) :
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <LottieView
                            source={require('../../../assets/icBox.json')}
                            autoPlay
                            loop
                            style={[{ width: 250, height: 250, }]}
                        />
                    </View>
                }
                <Notification
                    headerType='Warning'
                    title={I18n.t('info')}
                    textContent={responseMessage}
                    buttonText={I18n.t('ok')}
                    isButton={true}
                    onPress={() => this.responseMessage()}
                    ref='responseMessage'
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.setModle}
                    onRequestClose={() => {
                        this.setState({ setModle: false })
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.windowTint }}>
                        <View style={{ width: '80%', height: '30%', backgroundColor: Colors.white, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name='checkmark-circle-outline' size={90} color='#33cc33' />
                            <Text></Text>
                            <Text>{I18n.t('FileDownloadedSuccessfully')}</Text>
                            <Text></Text>
                            <TouchableOpacity style={styles.buttom} onPress={() => this.onBackHome()}>
                                <Text style={{ fontSize: 15, fontWeight: '600', color: Colors.txtUpLight }}>{I18n.t('backToHome')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.white,
        width: '100%',
        height: '100%'
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: Colors.white,
    },
    mainPDF: {
        width: '100%',
        height: '80%'
    },
    bottom: {
        width: '100%',
        height: '20%',
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttom: {
        padding: 10,
        backgroundColor: '#ccebff',
        borderRadius: 10
    }
});