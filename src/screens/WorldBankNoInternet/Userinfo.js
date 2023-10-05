import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import { Colors } from '../../themes'
import { PaySubsidiesComponents } from '../../components'
import I18n from 'react-native-i18n'
import LottieView from 'lottie-react-native';

export class Userinfo extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        const { params } = this.props.route
        if (params) {
            let data = params.data
            console.log('------data------', data)
            this.setState({
                cttID: data.cct_id,
                DateOfIssue: data.created_date,
                img: data.customer_image,
                District: data.district,
                fullName: data.last_name,
                DocumentNumber: data.paper_number,
                DocType: data.paper_type,
                Province: data.province,
                IssueBy: data.recipient_type,
                VillageName: data.village,
                msisdn: data.msisdn,

            })
        }

    }
    onNextPagUpload() {
        const { params } = this.props.route
        this.props.navigation.navigate('uploadimgworldbank', { data: params.data })
    }
    render() {
        const { cttID, fullName, Province, District, VillageName, DocType, DocumentNumber, DateOfIssue, IssueBy, img, msisdn } = this.state
        return (
            <SafeAreaView style={styles.containr}>
                {
                    msisdn ? msisdn.substring(0, 3) === '856' ?
                        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                            <LottieView
                                source={require('../../../assets/profileLock.json')}
                                autoPlay
                                loop
                                style={[{ width: 300, height: 300, }]}
                            />
                            <Text>{I18n.t('accountdontHavePermission')}</Text>
                        </View> : (
                            <PaySubsidiesComponents
                                valueCTTID={cttID}
                                valueFullname={fullName}
                                valueProvince={Province}
                                valueDistrict={District}
                                valueVillageName={VillageName}
                                valueDocType={DocType}
                                valueDocumentNumber={DocumentNumber}
                                valueDateOfIssue={DateOfIssue}
                                valueIssueBy={IssueBy}
                                valueImg={img}
                                onNextPagUpload={() => this.onNextPagUpload()}
                            />
                        ) : null
                }

            </SafeAreaView>
        )
    }
}

export default Userinfo
const styles = StyleSheet.create({
    containr: {
        flex: 1,
        backgroundColor: Colors.white
    }
})






