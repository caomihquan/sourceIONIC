import React, { Component } from 'react';
import { Icon } from 'native-base';
import { View, TextInput } from 'react-native';
import { Configs } from '../../../AppConfig';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Value: this.props.value,
            OldValue: this.props.value
        }
    }

    bindingValue(text) {
        this.setState({ Value: text });
    }

    eventOnChangeText(text) {
        this.setState({ Value: text });
        return this.props.onChangeText && this.props.onChangeText(text);
    }

    eventOnEndEditing(text) {
        this.setState({ Value: text });
        return this.props.onEndEditing && this.props.onEndEditing(text);
    }

    eventOnPressIcon = () => {
        if (this.state.OldValue == this.state.Value) return;

        this.setState({
            OldValue: this.state.Value
        }, () => this.props.onPress && this.props.onPress());
    }

    render() {
        return (
            <View style={[styles.searchSection, this.props.style]}>
                <TextInput
                    style={styles.input}
                    value={this.state.Value}
                    placeholder={this.props.placeholder}
                    placeholderTextColor="#cccccc"
                    onChangeText={text => this.eventOnChangeText(text)}
                    onEndEditing={event => {
                        this.eventOnEndEditing(event.nativeEvent.text)
                    }}
                />
                <Icon onPress={this.eventOnPressIcon} style={styles.searchIcon} name="ios-search" size={20} color="#000" />
            </View>
        );
    }
}
const styles = Configs.Theme.Styles.Shared.SearchBar;