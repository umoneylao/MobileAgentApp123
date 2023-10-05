import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Colors, Images } from '../../themes'
export class index extends Component {
    render() {
        return (
            <View style={styles.borderIcon}>
                {
                    (this.props.processCode) === '571000' ?
                        <Image source={Images.iconunitel} style={styles.iconStyleHeader} /> :
                        (this.props.processCode) === '600011' ?
                            <Image source={Images.logo_laovietbank} style={styles.iconStyleHeader} /> :
                            (this.props.processCode) === '010001' ?
                                <Image source={Images.ic_RequestCash} style={styles.iconStyleHeader} /> :
                                (this.props.processCode) === '010002' ?
                                    <Image source={Images.ic_Requestumoney} style={styles.iconStyleHeader} /> :
                                    (this.props.processCode) === '010005' ?
                                        <Image source={Images.ic_RequestCash} style={styles.iconStyleHeader} /> :
                                        (this.props.processCode) === '021000' ?
                                            <Image source={Images.ic_LVIInsurance} style={styles.iconStyleHeader} /> :
                                            (this.props.processCode) === '036001' ?
                                                <Image source={Images.ic_SokxayLottery} style={styles.iconStyleHeader} /> :
                                                (this.props.processCode) === '011000' ?
                                                    <Image source={Images.ic_Deposit} style={styles.iconStyleHeader} /> :
                                                    (this.props.processCode) === '021001' ?
                                                        <Image source={Images.ic_SokxayLottery} style={styles.iconStyleHeader} /> :
                                                        (this.props.processCode) === '573000' ?
                                                            <Image source={Images.iconetl} style={styles.iconStyleHeader} /> :
                                                            (this.props.processCode) === '600014' ?
                                                                <Image source={Images.logo_bcel} style={styles.iconStyleHeader} /> :
                                                                (this.props.processCode) === '600013' ?
                                                                    <Image source={Images.logo_jdbbank} style={styles.iconStyleHeader} /> :
                                                                    (this.props.processCode) === '579000' ?
                                                                        <Image source={Images.iconltc} style={styles.iconStyleHeader} /> :
                                                                        (this.props.processCode) === '037001' || (this.props.processCode) === '037101' ?
                                                                            <Image source={Images.icNCCLottery} style={styles.iconStyleHeader} /> :
                                                                            (this.props.processCode) === '578000' ?
                                                                                <Image source={this.props.icon == 'LEASING_AEON' ? Images.ic_aecon : Images.ic_welcome} style={styles.iconStyleHeader} /> :
                                                                                (this.props.processCode) === '039002' ?
                                                                                    <Image source={Images.ic_worldBank} style={styles.iconStyleHeader} /> :
                                                                                    (this.props.processCode) === '600101' ?
                                                                                        <Image source={Images.icWaterBill} style={styles.iconStyleHeader} /> :
                                                                                        <Image source={Images.ic_Deposit} style={styles.iconStyleHeader} />
                }
            </View>
        )
    }
}

export default index
const styles = StyleSheet.create({
    borderIcon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',


    },
    iconStyleHeader: {
        width: 40,
        height: 40,
    },
})