import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { groupMenuShopUnitel } from '../../models/MenuApp'
import { Metrics, Fonts } from '../../themes'
import I18n from 'react-native-i18n'
export class GroupMenuShopUnitel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
   
    renderItemMenuCustomerService(item, index) {
        return (
            <View style={styles.FlatList}>
               <TouchableOpacity style={styles.warpItemList} onPress={() => this.props.navigation.navigate(item.navigate)}>
                    <Image source={item.img} style={styles.iconStyle} />
                    <Text style={styles.txtIcon} numberOfLines={2} >{I18n.t(item.name)}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.txtTile}>
                    <Text> Unitel Services </Text>
                </View>

                <FlatList
                    data={groupMenuShopUnitel}
                    renderItem={({ item, index }) => this.renderItemMenuCustomerService(item, index)}
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                    extraData={Object.assign(this.props)}
                    keyExtractor={(item, index) => item.id}
                />

            </View>
        )
    }
}

export default GroupMenuShopUnitel
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    txtTile: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    warpItemList: {
        height: Metrics.doubleSection * 1.5,
        width: Metrics.width / 4.5,
        alignItems: 'center',
        left: 5

    },
    warpItemListOfThree: {
        height: Metrics.doubleSection * 1.8,
        width: Metrics.width / 3.5,
        alignItems: 'center'
    },
    iconStyle: {
        height: Metrics.icons.fixIcon - 5,
        width: Metrics.icons.fixIcon - 5,
        marginBottom: 5,

    },
    txtIcon: {
        textAlign: 'center',
        fontSize: Fonts.size.medium
    },
    FlatList: {
        justifyContent: 'space-between',
        flex: 1
    }
})

