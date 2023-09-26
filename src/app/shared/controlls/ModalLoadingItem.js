import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Configs } from '../../../AppConfig';

const COLOR_ICON_LOAD = Configs.Theme.Color.Primary;
export default class ModalLoadingItem extends Component {
    render() {
        return (
            <View>
                {
                    this.props.active &&
                    <View style={[styles.activityIndicatorWrapper, styles.centerLoading, this.props.style]}>
                        <ActivityIndicator size="large" color={COLOR_ICON_LOAD} />
                    </View>
                }
            </View>
        );
    }
}

const styles = Configs.Theme.Styles.Shared.ModalLoading;