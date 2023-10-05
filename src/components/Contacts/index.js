

import React, { Component } from "react";
import {
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    ActivityIndicator,
} from "react-native";
import Contacts from "react-native-contacts";
import { ListItem, Avatar, SearchBar } from '../../components'
import I18n from 'react-native-i18n'
const getAvatarInitials = textString => {
    if (!textString) return "";
    const text = textString.trim();
    const textSplit = text.split(" ");
    if (textSplit.length <= 1) return text.charAt(0);
    const initials =
        textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
    return initials;
};


class index extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.state = {
            contacts: [],
            searchPlaceholder: I18n.t('search'),
            typeText: null,
            loading: true
        };
        Contacts.iosEnableNotesUsage(false);
    }

    async componentDidMount() {
        if (Platform.OS === "android") {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: "Contacts",
                message: "This app would like to view your contacts."
            }).then(() => {
                this.loadContacts();
            });
        } else {
            this.loadContacts();
        }
    }

    loadContacts() {
        Contacts.getAll()
            .then(contacts => {
                this.setState({ contacts, loading: false });
            })
            .catch(e => {
                this.setState({ loading: false });
            });
        Contacts.getCount().then(count => {
            this.setState({ searchPlaceholder: I18n.t('search') + " " + count + " " +  I18n.t('contact')});
    });
    Contacts.checkPermission();
}
search(text) {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === "" || text === null) {
        this.loadContacts();
    } else if (phoneNumberRegex.test(text)) {
        Contacts.getContactsByPhoneNumber(text).then(contacts => {
            this.setState({ contacts });
        });
    } else if (emailAddressRegex.test(text)) {
        Contacts.getContactsByEmailAddress(text).then(contacts => {
            this.setState({ contacts });
        });
    } else {
        Contacts.getContactsMatchingString(text).then(contacts => {
            this.setState({ contacts });
        });
    }
}

onPressContact(contact) {
    let getPhoneContact = (contact.phoneNumbers[0])
    if (getPhoneContact != undefined) {
        this.props.getNumberPhone(getPhoneContact)
    } else {
        alert('Cant not get number contact')
    }


    // this.props.getNumberPhone(getPhoneContact)
    // var text = this.state.typeText;
    // this.setState({ typeText: null });
    // if (text === null || text === '')
    //     console.log('displayName:', contact.phoneNumbers)

    // // Contacts.openExistingContact(contact)
    // else {
    //     console.log('contact.recordID:', contact.recordID)
    //     var newPerson = {
    //         recordID: contact.recordID,
    //         phoneNumbers: [{ label: 'mobile', number: text }]
    //     }
    //     console.log('newPerson:', newPerson)
    //     // Contacts.editExistingContact(newPerson).then(contact => {
    //     //     //contact updated
    //     // });
    // }
}

render() {
    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                searchPlaceholder={this.state.searchPlaceholder}
                onChangeText={this.search}
            />
            {
                this.state.loading === true ?
                    (
                        <View style={styles.spinner}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ) : (
                        <ScrollView style={{ flex: 1 }}>
                            {this.state.contacts.map(contact => {
                                return (
                                    <ListItem
                                        leftElement={
                                            <Avatar
                                                img={
                                                    contact.hasThumbnail
                                                        ? { uri: contact.thumbnailPath }
                                                        : undefined
                                                }
                                                placeholder={getAvatarInitials(
                                                    `${contact.givenName} ${contact.familyName}`
                                                )}
                                                width={40}
                                                height={40}
                                            />
                                        }
                                        key={contact.recordID}
                                        title={`${contact.givenName} ${contact.familyName}`}
                                        description={`${contact.company}`}
                                        onPress={() => this.onPressContact(contact)}
                                        onDelete={() =>
                                            Contacts.deleteContact(contact).then(() => {
                                                this.loadContacts();
                                            })
                                        }
                                    />
                                );
                            })}
                        </ScrollView>
                    )
            }
        </SafeAreaView>
    )
}
}

export default index
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    spinner: {
        flex: 1,
        flexDirection: 'column',
        alignContent: "center",
        justifyContent: "center"
    },
    inputStyle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: "center"
    }
});