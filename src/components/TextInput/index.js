import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Fonts } from '../../themes'
import { TextInput } from 'react-native-paper';
export class index extends Component {
    // onSubmitHandler(){
    //     this.props.onSubmitHandler()
    // }
    render() {
        const { label, placeholder, returnKeyType, value, error, onChangeUserName, iconLeft,
            iconRight, textError, keyboardType, secureTextEntry, onclick, maxLength, contact, editable, onSubmitEditing, onTouchStart } = this.props
        return (
            <View>
                <TextInput
                    label={label}
                    mode="outlined"
                    placeholder={placeholder}
                    returnKeyType={returnKeyType}
                    theme={{ colors: { placeholder: Colors.txtIntup, background: Colors.white, text: Colors.backColor, primary: Colors.startGradientNav } }}
                    style={styles.input}
                    value={value}
                    error={error}
                    // onSubmitEditing={() => this.onSubmitHandler()}
                    maxLength={maxLength}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    onChangeText={onChangeUserName}
                    underlineColor={1}
                    editable={editable}
                    // left={<TextInput.Icon name={iconLeft} style={styles.iconText} color={Colors.orange} />
                    // }
                    onSubmitEditing={onSubmitEditing}
                    onTouchStart={onTouchStart}
                    right={contact ?
                        <TextInput.Icon name={iconRight} color={Colors.orange} onPress={onclick} />
                        : value ? <TextInput.Icon name={iconRight} color={Colors.steel} onPress={onclick} />:  null}
                />
                {!error ? null : <Text style={{ color: Colors.redColor, padding: 4, fontSize: 13 }}>{textError}</Text>}
                {!error ? null : null}

            </View>
        )
    }
}

export default index
const styles = StyleSheet.create({
    input: {
        fontSize: 15,
        fontWeight: 'normal',

    },
    iconText: {
        color: Colors.orgen,
    },
})
