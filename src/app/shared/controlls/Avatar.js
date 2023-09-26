import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Configs } from '../../../AppConfig';


export default class Avatar extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.PhotoUrl != nextProps.PhotoUrl || false;
    }

    render() {
        return (
            <View>
                <Image source={this.props.PhotoUrl ? { uri: this.props.PhotoUrl + '&time' + Date.now() } : null} style={styles.imgAvatar} />
            </View>
        );
    }
}
const styles = Configs.Theme.Styles.Screens.MyTeam;


