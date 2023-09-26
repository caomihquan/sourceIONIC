import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    TextInput
} from 'react-native';

export default class QRCodeGenerator extends Component {
    state = {
        text: "LAC VIET SURE-HCS"
    }

    render() {
        const onChangeText = (text) => {
            this.setState({ text: text })
        }

        return (
            <View style={styles.container}>
                <TextInput
                    multiline
                    numberOfLines={1}
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={this.state.text}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 30,
        borderRadius: 5,
        padding: 5,
        width: 300
    }
});