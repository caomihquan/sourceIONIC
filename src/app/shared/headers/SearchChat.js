import React, { Component } from 'react';
import { Icon } from 'native-base';
import { View, StatusBar, TextInput } from 'react-native';

import { Button } from '../SharedConfig';
import { Configs } from '../../../AppConfig';
import { HrmNavigation } from '../../../libs/HrmLibs';

export default class SearchChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        }
    }
    render() {
        const onPressBack = () => {
            (this.props?.route?.params?.onPressBack) ? this.props?.route?.params?.onPressBack() : HrmNavigation.pop();
        }

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={Configs.Theme.Color.Primary} barStyle="light-content" />
                <View style={styles.content}>
                    <View style={styles.arrowBack}>
                        <Button style={styles.btnWrap}
                            onPress={onPressBack}
                        >
                            <Icon style={styles.btnIcon} name='arrow-back' />
                        </Button>
                    </View>
                    <View style={styles.searchField}>
                        <View style={styles.searchSection}>
                            <TextInput
                                multiline
                                numberOfLines={1}
                                style={styles.input}
                                value={this.props?.route?.params?.value}
                                placeholder="Search..."
                                placeholderTextColor="#FFFF"
                                onChangeText={text => this.props?.route?.params?.onChangeText(text)}
                            />
                            <Button onPress={this.props?.route?.params?.onSearch} >
                                <Icon style={styles.searchIcon} name="ios-search" size={20} color="#000" />
                            </Button>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}
const styles = Configs.Theme.Styles.Shared.SearchChat;