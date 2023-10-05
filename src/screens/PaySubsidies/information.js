import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { AlertNative, PaySubsidiesComponents } from '../../components'
import * as FIELD from '../../utils/CoreFieldMap'
import * as RequestField from '../../utils/RequestField'
import moment from 'moment'
import I18n from 'react-native-i18n'
import { Colors } from '../../themes'
class information extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentWillMount() {
        if (this.props.route.params != undefined) {
            let getdata = this.props.route.params.dataQRcode;
            // console.log('getdata------------:', getdata)
            // let DocType = RequestField.getValueField(getdata, FIELD.PAPER_TYPE);
            // let DocumentNumber = RequestField.getValueField(getdata, FIELD.PAPER_NUMBER);

            // console.log('DocType:', DocType)
            // console.log('DocumentNumber:', DocumentNumber)
            if (getdata) {
                let dataInfo = RequestField.getValueField(getdata, FIELD.TO_NAME);
                // console.log('dataInfo:', dataInfo)
                if (dataInfo) {

                    let arrAddress = dataInfo.split("|")
                    let Province = ""
                    let District = ''
                    let VillageName = ''
                    let IssueBy = ''
                    if (arrAddress.length >= 2) {
                        let arrOne = arrAddress && arrAddress[0]
                        let arrTwo = arrAddress && arrAddress[1]
                        let arr = arrOne.split(";")
                        if (arr.length >= 3) {
                            Province = arr && arr[0]
                            District = arr && arr[1]
                            VillageName = arr && arr[2]
                            IssueBy = arrTwo
                        }

                    }
                    let cttID = RequestField.getValueField(getdata, FIELD.PAYMENT_CODE);
                    let fullName = RequestField.getValueField(getdata, FIELD.CUSTOMER_NAME);
                    let DocType = RequestField.getValueField(getdata, FIELD.PAPER_TYPE);
                    let DocumentNumber = RequestField.getValueField(getdata, FIELD.PAPER_NUMBER);
                    let getdate = RequestField.getValueField(getdata, FIELD.DATE_OF_ISSUE);
                    let DateOfIssue = moment(getdate).format('DD/MM/YYYY')
                    let img = RequestField.getValueField(getdata, FIELD.STAFF_NAME);

                 



                    this.setState({ cttID, fullName, Province, District, VillageName, DocType, DocumentNumber, DateOfIssue, IssueBy, img })
                } else {
                    AlertNative(I18n.t('10130'))
                }

            } else {
                AlertNative(I18n.t('10130'))
            }
        }

    }
    onNextPagUpload() {
        this.props.navigation.navigate('uploadImage', { qrInfo: this.props.route.params.dataQRcode })
    }
    render() {
        const { cttID, fullName, Province, District, VillageName, DocType, DocumentNumber, DateOfIssue, IssueBy, img } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
                {
                    this.props.route.params != undefined ?
                        (
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
                        )
                        : null
                }
            </SafeAreaView>
        );
    }
}
export default information;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    }
})

