import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import { APAInsuranceComponent, ActivityIndicator } from '../../components'
import { Colors } from '../../themes'
import { connect } from 'react-redux'
import * as ConfigCode from '../../utils/ConfigCode'
import { requestGetPackage, requestGetPackageOption } from '../../actions/InsuranceAction'
import I18n from 'react-native-i18n'
class APAInsurance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            Package: null,
            bar: 'dark-content',
            phone:'',
            idTransaction:''

        };
    }
    componentDidMount() {
        this.props.requestGetPackage()
        this.setState({ onGetPackage: true, isLoading: true })
    }
    selectPolicyNo = (item) => {

        this.props.requestGetPackageOption(item)
        this.setState({ onGetPackageOption: true, isLoading: true })
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.onGetPackage && this.state.isLoading) {
            switch (nextProps.actionType) {
                case 'GET_PACKAGE_APA_SUCCESS':
                    let data = nextProps.getDataPackage.ApaRequestList.ApaRequestListModel
                    this.setState({ onGetPackage: false, isLoading: false, dataPackage: data })
                    break;
                case 'GET_PACKAGE_APA_FAILED':
                    this.setState({ onGetPackage: false, isLoading: false })
                    break;
                default:
                    break;
            }
        }
        if (this.state.onGetPackageOption && this.state.isLoading) {
            this.setState({ onGetPackageOption: false, isLoading: false })
            switch (nextProps.actionType) {
                case 'GET_PACKAGE_OPTION_APA_SUCCESS':
                    let OptionPackage = nextProps.getDataPackageOption.ApaRequestDetailList.ApaRequestDetailListModel
                    console.log('OptionPackage:', OptionPackage)
                    this.setState({ OptionPackage })
                    break;
                case 'GET_PACKAGE_OPTION_APA_SUCCESS':

                    break;
                default:
                    break;
            }
        }
    }
    Navigetion(dataAPA) {
        // console.log('-----dataAPA----', dataAPA[3])
        if (dataAPA) {
            this.props.navigation.navigate('TransactionDetail', {
                dataAPA: dataAPA,
                onProcess: 'PAY_MENT_INSURANCE_APA',
                processName: I18n.t('APAInsurance'),
                processCode: ConfigCode.PAY_MENT_INSURANCE_APA,
                selectState: 'APA_INSURANCE',
                serviceCodeFee: 'ACCIDENT',
                money: dataAPA[3],
                partnerCodeFee: 'APA_INSUARANCE',//
                checkDiscount: true//

            })
        }

    }
   
    render() {
        const { isLoading, dataPackage, OptionPackage } = this.state
        return (
            <View style={styles.container}>
                <StatusBar barStyle={this.state.bar} backgroundColor={Colors.white} />
                {isLoading ? <ActivityIndicator /> : null}
                <APAInsuranceComponent
                    PackageData={dataPackage}
                    selectPolicyNo={(item) => this.selectPolicyNo(item)}
                    OptionPackage={OptionPackage}
                    Navigetion={(dataAPA) => this.Navigetion(dataAPA)}
                />
               
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        actionType: state.Insurance.actionType,
        getDataPackage: state.Insurance.getDataPackage,
        getDataPackageOption: state.Insurance.getDataPackageOption,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestGetPackage: () => { dispatch(requestGetPackage()) },
        requestGetPackageOption: (item) => { dispatch(requestGetPackageOption(item)) }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(APAInsurance)
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },

})




