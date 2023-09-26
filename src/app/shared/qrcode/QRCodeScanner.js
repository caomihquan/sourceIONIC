import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Dimensions, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'native-base';
import { Camera } from "expo-camera";
import { Configs } from "../../../AppConfig";

export default class QRCodeScanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            scanned: false,
        };
        this._onCancel = this._onCancel.bind(this);
    }

    _onCancel() {
        if (this.props.onCancel) this.props.onCancel();
    }
    componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    onClose() {
        HrmNavigation.pop();
    }
    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        this.props.onScanned(data);
    };

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {

            return (
                <View style={{ flex: 1 }}>
                    <View>
                        <Text>
                            No access to camera
                        </Text>
                    </View>
                    <View style={styleContainer.footer}>
                        <View style={styles.checkBar}>
                            <TouchableOpacity
                                style={styles.btnCancel}
                                onPress={this._onCancel}>
                                <Text style={styles.btnCancelText}>{HrmI18n.t("COMMON.Cancel")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );

        }
        const screenWidth = Math.round(Dimensions.get('window').width);
        const screenHeight = Math.round(Dimensions.get('window').height);

        const wallpaper = require('../../../assets/images/default/_shared/bg_qrcode.png')
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                width: screenWidth,
                height: screenHeight, //screenHeight-64,
                backgroundColor: "transparent"
            }}>
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    width: screenWidth,
                    height: screenHeight, //screenHeight-64,

                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ImageBackground resizeMode='stretch' style={{ flex: 1, }} source={wallpaper}>
                        <View style={{
                            width: screenWidth, height: screenHeight,
                            backgroundColor: 'transparent', borderColor: '#000'
                        }}>

                            <TouchableOpacity
                                style={{
                                    marginTop: 30,
                                    marginLeft: 20,
                                    paddingVertical: 5,
                                }}
                                onPress={this._onCancel}
                                activeOpacity={1}>
                                <Icon style={{
                                    color: '#ffffff'
                                }} name="arrow-back" />
                            </TouchableOpacity>

                        </View>
                    </ImageBackground>
                </View>
            </View>
        );
    }
}
const styles = Configs.Theme.Styles.LeaveAndOT.DetailLeaveRequest;
const styleContainer = Configs.Theme.Styles.Shared.PageContainer;