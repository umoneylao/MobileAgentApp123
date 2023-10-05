import React, { Component } from 'react'
import { Text, FlatList, View, StyleSheet, TouchableOpacity, Image, Modal, SafeAreaView } from 'react-native'
import Icons from 'react-native-vector-icons/Ionicons'
import { Images, Colors } from '../../themes'
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
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setModal: false,
            key: null
        };
    }
    componentDidMount() {
        // let key = 'lo';
        // console.log('localLanguage:', this.props.localLanguage)
        // this.setState({
        //     key: this.props.localLanguage
        // })
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.localLanguage != '') {
            this.setState({ setModal: false })
        }
    }
    onChangLange() {
        this.setState({ setModal: true })
    }
    onClose() {
        this.setState({ setModal: false })
    }
    renderItemMenuLanguage(item, index) {
        const { localLanguage } = this.props

        return (
            <TouchableOpacity onPress={() => { this.props.changeLocalLanguage(item.key); }} style={{ padding: 20 }}>
                <View style={localLanguage == item.key ? styles.boxColor : styles.box}>
                    <View style={styles.icon}>
                        <Image source={item.images} style={styles.Images} />
                    </View>
                    <Text>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        const { localLanguage } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.Leftlogo}></View>
                <View style={styles.Centerlogo}></View>
                <View style={styles.Relogo}>
                    <TouchableOpacity style={styles.groudIcon} onPress={() => this.onChangLange()}>
                        {localLanguage == 'lo' ? <Image source={Images.icLaos} style={styles.logoLao} />
                            : localLanguage == 'en' ? <Image source={Images.icEnglish} style={styles.logoLao} />
                                : localLanguage == 'vn' ? <Image source={Images.icVietnam} style={styles.logoLao} />
                                    : localLanguage == 'cn' ? <Image source={Images.icChina} style={styles.logoLao} />
                                        : <Image source={Images.icLaos} style={styles.logoLao} />}
                        <Icons name='caret-down-sharp' size={15} style={styles.iconDow} />
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.setModal}
                    onRequestClose={() => {
                        this.setState({ setModal: false })
                    }}
                >
                    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                        <SafeAreaView>
                            <View style={styles.header}>
                                <View style={styles.left}>
                                    <TouchableOpacity onPress={() => this.onClose()}>
                                        <Icons name='arrow-back' size={25} style={styles.iconDow} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.containerHeader}>
                                    <Text style={styles.txtLanguage}>Language</Text>
                                </View>
                                <View style={styles.rigth}></View>
                            </View>
                            <View style={styles.main}>
                                <View style={styles.mainTop}>
                                    <FlatList
                                        data={listLanguage}
                                        renderItem={({ item, index }) => this.renderItemMenuLanguage(item, index)}
                                        numColumns={2}
                                        keyExtractor={(item, index) => item.id.toString()}
                                        showsHorizontalScrollIndicator={false}
                                        extraData={Object.assign(this.props)}
                                    />
                                </View>
                                <View style={styles.mainDow}>
                                    <Image source={Images.bg_footerLogin} style={styles.img} />
                                </View>
                            </View>
                        </SafeAreaView>
                    </View>
                </Modal>
            </View>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(index)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    img: {
        width: 200,
        height: 200,

    },
    mainTop: {
        height: '65%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    mainDow: {
        height: '35%',
        justifyContent: 'center'
    },
    main: {
        width: '100%',
        height: '100%'
    },
    txtLanguage: {
        color: Colors.backColor,
        fontSize: 16,
        fontWeight: 'bold'
    },
    containerHeader: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rigth: {
        width: '20%',
    },
    header: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    left: {
        width: '20%',
    },
    Centerlogo: {
        width: '60%',
    },
    Leftlogo: {
        width: '20%',
    },
    Relogo: {
        width: '20%',
        height: null,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    logoLao: {
        width: 27,
        height: 27
    },
    groudIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconDow: {
        left: 5
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
})
