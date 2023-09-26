import React, { Component } from 'react';
import { Text, Icon } from 'native-base';
import { View, TouchableOpacity } from 'react-native';

import { Configs } from '../../../AppConfig';

export default class SelectValue extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.selectButton} onPress={this.props.onPress} activeOpacity={1}>
                <View style={styles.selectContainer}>
                    <View style={styles.selectText}>
                        <Text style={styles.selectTextTitle}>{this.props.title}</Text>
                        <Text style={[styles.selectTextValue, this.props.stylesValue]}
                            {...(this.props.numberOfLines > 0 && { numberOfLines: this.props.numberOfLines })}
                        >
                            {this.props.value}
                        </Text>
                    </View>
                    <View style={styles.selectButtonContainer}>
                        <Icon name="arrow-down" style={styles.selectButtonIcon} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = Configs.Theme.Styles.Shared.SelectValue;