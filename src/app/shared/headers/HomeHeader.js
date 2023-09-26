import React, { Component } from 'react';
import { View, Image, StatusBar } from 'react-native';
import { Configs } from '../../../AppConfig';
import { TouchableOpacity } from 'react-native';

export default class HomeHeader extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <StatusBar backgroundColor={Configs.Theme.Color.Primary} barStyle="light-content" />
                <View style={styles.statusBar}></View>
                <View style={styles.container}>
                    <View style={styles.left}>
                        <TouchableOpacity style={{ backgroundColor: "transparent" }}>
                            <Image style={styles.logo} source={Configs.Images.homHeader.logo} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.right}>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = Configs.Theme.Styles.Shared.HomeHeader;
