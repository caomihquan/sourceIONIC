import React, { PureComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Configs } from '../../../AppConfig';

export default class ModalLoading extends PureComponent {
    render() {
        return true == this.props.active &&
            <View style={styles.wrapper}>
                <View style={styles.content}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator size="large" color="#fafafa" />
                    </View>
                </View>
            </View>
    }
}

const styles = Configs.Theme.Styles.Shared.ModalLoading;