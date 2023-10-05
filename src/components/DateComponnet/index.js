import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import I18n from "react-native-i18n";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors, Fonts, Images, Metrics } from '../../themes'
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            selectedEndDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date, type) {
        if (type === 'END_DATE') {
            this.setState({
                selectedEndDate: date,
            });
        } else {
            this.setState({
                selectedStartDate: date,
                selectedEndDate: null,
            });
        }
    }
    onTimkiem(selectedStartDate, selectedEndDate) {
        this.props.onSearch(selectedStartDate, selectedEndDate)
    }
    
    render() {
        const { selectedStartDate, selectedEndDate } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.datefilter}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.textConten}>{I18n.t('fromDate')}:</Text>
                        <Text style={styles.textDate}>
                            {selectedStartDate ? moment(selectedStartDate).format('DD/MM/YYYY') : ' DD/MM/YYYY'}
                        </Text>
                    </View>

                    <View style={styles.headerRight}>
                        <Text style={styles.textConten}>{I18n.t('toDate')}:</Text>
                        <Text style={styles.textDate}>
                            {selectedEndDate ? moment(selectedEndDate).format('DD/MM/YYYY') : ' DD/MM/YYYY'}
                        </Text>
                    </View>
                </View>
                <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={true}
                    minDate={new Date(2018, 1, 1)}
                    maxDate={new Date(2050, 6, 3)}
                    weekdays={[I18n.t('Mon'), I18n.t('Tue'), I18n.t('Wed'), I18n.t('Thur'), I18n.t('Fri'), I18n.t('Sat'), I18n.t('Sun')]}
                    months={[
                        I18n.t('January'),
                        I18n.t('Febraury'),
                        I18n.t('March'),
                        I18n.t('April'),
                        I18n.t('May'),
                        I18n.t('June'),
                        I18n.t('July'),
                        I18n.t('August'),
                        I18n.t('September'),
                        I18n.t('October'),
                        I18n.t('November'),
                        I18n.t('December'),
                    ]}
                    previousTitle={<Ionicons name='caret-back-sharp' size={18} color={Colors.orange} />}
                    nextTitle={<Ionicons name='caret-forward-sharp' size={18} color={Colors.orange} />}
                    todayBackgroundColor={Colors.blueLight}
                    selectedDayColor={Colors.orange}
                    selectedDayTextColor="#000"
                    scaleFactor={375}
                    textStyle={{
                        fontFamily: 'Cochin',
                        color: '#000000',
                    }}
                    onDateChange={this.onDateChange}
                />
                <View style={styles.button}>
                    <LinearGradient colors={[Colors.startGradientNav, Colors.endGradientNav]} style={styles.LinearGradient}>
                        <TouchableOpacity style={styles.TouchableOpacity} onPress={() => this.onTimkiem(selectedStartDate, selectedEndDate)}>
                            <Text style={{ color: Colors.white }}>{I18n.t('Search')}</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    datefilter: {
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: Colors.bgText,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerLeft: {
        width: '50%',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    headerRight: {
        width: '50%',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textDate: {
        justifyContent: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    TouchableOpacity: {
        width: 140,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    LinearGradient: {
        borderRadius: 5
    }
});

