import React, { Component } from 'react'
import { StyleSheet, View, Text, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

export default class AlertCustom extends Component {
    submitButton = () => {
        this.props.submitButton();
    };
    buttonCancel = () => {
        this.props.buttonCancel();
    };
    render() {
        const submitButtonText = this.props.buttonText ? this.props.buttonText : "OK";
        const buttonCancelText = this.props.buttonText ? this.props.buttonText : "Cancel";
        const showButtonCancel = this.props.showButtonCancel ? this.props.showButtonCancel : false;
        const showIcon = this.props.showIcon ? this.props.showIcon : false;
        return (
            <Modal animationType="none" transparent={true} visible={this.props.show}>
                <View style={styles.modalOverlay} />
                <View style={styles.wrapper}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : null}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
                        <View style={{
                            ...styles.modalView,
                            borderColor: this.props.borderColor,
                            borderWidth: this.props.borderWidth,
                            backgroundColor: this.props.backgroundColor,
                        }}>
                            <View style={styles.header}>
                                {
                                    showIcon &&
                                    <View style={styles.left}>
                                        <Icon name="notifications" style={styles.icon}></Icon>
                                    </View>
                                }
                                <View style={styles.right}>
                                    <Text style={styles.text}>{this.props.title}</Text>
                                </View>
                            </View>
                            {
                                this.props.renderContent ?
                                    React.createElement(this.props.renderContent, {})
                                    :
                                    <View style={styles.connect}>
                                        <Text style={styles.modalText}>{this.props.message}</Text>
                                    </View>
                            }
                            <View style={styles.temp} />
                            <View style={styles.footer}>
                                {
                                    showButtonCancel &&
                                    <TouchableOpacity
                                        style={{ ...styles.button, backgroundColor: this.btnColor, ...styles.buttonCancel }}
                                        onPress={this.buttonCancel}
                                    >
                                        <Text style={styles.text}>{buttonCancelText}</Text>
                                    </TouchableOpacity >
                                }
                                <TouchableOpacity
                                    style={{ ...styles.button, backgroundColor: this.btnColor, width: showButtonCancel ? "50%" : "100%" }}
                                    onPress={this.submitButton}
                                >
                                    <Text style={styles.text}>{submitButtonText}</Text>
                                </TouchableOpacity >
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal >
        )
    }
}
AlertCustom.propTypes = {
    show: PropTypes.bool,
    showIcon: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    showButtonCancel: PropTypes.bool,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    borderWidth: PropTypes.string,
    submitButtonText: PropTypes.string,
    buttonCancelText: PropTypes.string,
    submitButton: PropTypes.func,
    buttonCancel: PropTypes.func,
}
const styles = StyleSheet.create({
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    wrapper: {
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally,
        alignContent: 'center',
        flex: 1
    },
    modalView: {
        width: "80%",
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingTop: 15,
        alignItems: 'center',
    },
    header: {
        flexDirection: "row",
    },
    left: {
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    right: {
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        color: "#01b0f1",
        fontSize: 17,
    },
    text: {
        color: "#01b0f1",
        textAlign: "center",
        fontSize: 17,
        fontWeight: "500",
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    temp: {
        height: 1,
        width: "100%",
        opacity: 0.8,
        marginBottom: 1,
        backgroundColor: "#c6c6c6",
    },
    modalText: {
        textAlign: "center",
        fontSize: 14,
        marginBottom: 10,
    },
    footer: {
        justifyContent: "space-around",
        flexDirection: "row"
    },
    buttonCancel: {
        borderRightWidth: 1,
        borderRightColor: "#c6c6c6"
    },
    button: {
        paddingTop: 5,
        paddingBottom: 5,
        width: "50%",
        color: "#ffffff",
        alignItems: 'center',
    },
    groupContentControlXL: {
        height: 120,
        backgroundColor: 'transparent',
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    groupContentTextArea: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#02a0f2',
        padding: 10,
        borderRadius: 5
    },
})