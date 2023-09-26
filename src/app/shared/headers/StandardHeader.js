import React, { Component } from 'react';
import { Icon, Text } from 'native-base';
import { View, Image, StatusBar, Platform } from 'react-native';
import { Configs } from '../../../AppConfig';
import Button from '../controlls/Button';
import { HrmNavigation } from '../../../libs/HrmLibs';

export default class StandardHeader extends Component {
    _isPopPage = true;

    constructor(props) {
        super(props);

        this.eventOnBackPage = this.eventOnBackPage.bind(this);
    }

    eventOnBackPage() {
        //this.props.loadFunction();
        if (this._isPopPage) {
            this._isPopPage = false;
            this.props.onPressBack ? this.props.onPressBack() : HrmNavigation.pop();

            setTimeout(() => this._isPopPage = true, 2000);
        }
    }

    render() {
        return (
            <View style={[styles.wrapper, { backgroundColor: Configs.Theme.Color.Primary }]}>
                <StatusBar backgroundColor={Configs.Theme.Color.Primary} barStyle="light-content" />
                {/* <View style={styles.statusBar}></View> */}
                <View style={styles.container}>
                    <View style={styles.left}>
                        <Button style={styles.btn} onPress={this.eventOnBackPage}>
                            <Icon style={styles.btnIconBack} name='arrow-back' />
                        </Button>
                        <Text style={styles.txtTitle} numberOfLines={1}>{this.props.title}</Text>
                    </View>
                    {(this.props.showSearch
                        || this.props.showCamera
                        || this.props.showList
                        || this.props.showNotification
                        || this.props.showMenu) &&
                        <View style={styles.right}>
                            {this.props.showSearch ? (
                                <Button style={styles.btn} onPress={this.props.onPressSearch}>
                                    <Icon style={styles.btnIcon} name='search' />
                                </Button>
                            ) : (<Text />)
                            }

                            {this.props.showCamera ? (
                                <Button style={styles.btn} onPress={this.props.onPressCamera}>
                                    <Icon style={styles.btnIcon} name='camera' />
                                </Button>
                            ) : (<Text />)
                            }

                            {this.props.showList ? (
                                <Button style={styles.btn} onPress={this.props.onPressList}>
                                    <Icon style={styles.btnIcon} name='list' />
                                </Button>
                            ) : (<Text />)
                            }

                            {this.props.showNotification ? (
                                <Button style={styles.btn} onPress={this.props.onPressNotification}>
                                    <Icon style={styles.btnIcon} name='notifications' />
                                </Button>
                            ) : (<Text />)
                            }

                            {this.props.showMenu ? (
                                <Button style={styles.btn} onPress={this.props.onPressMenu}>
                                    <Icon style={styles.btnIcon} name='menu' />
                                </Button>
                            ) : (<Text />)
                            }
                        </View>
                    }
                </View>
            </View>
        );
    }
}
const styles = Configs.Theme.Styles.Shared.StandardHeader;
