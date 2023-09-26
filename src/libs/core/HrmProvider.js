import React, { Component, Fragment } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated, Dimensions, Modal, TouchableOpacity, SafeAreaView } from 'react-native';
import HrmI18n from '../../i18n/HrmI18n';
import CommonConst from '../constants/CommonConst';
import { Alert } from '../../assets/themes/default/styles/alert';

export const HrmContext = React.createContext({});
export const HrmConsumer = HrmContext.Consumer;

const TIME_OUT = 2000;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const initialState = {
    isVisible: false,
    display: CommonConst.HrmProvider.Alert,
    cancelable: false,
    title: null,
    body: null,
    content: null,
    titleOK: HrmI18n.t('COMMON.OK'),
    onOK: null,
    titleCancel: HrmI18n.t('COMMON.Close'),
    onCancel: null,
    contentHeight: DEVICE_HEIGHT,
};

export class HrmProvider extends Component {
    animatedValue = new Animated.Value(0);

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    alert = (body = null, {
        cancelable = false,
        title = null,
        content = null,
        onOK = null,
        onCancel = null
    } = {}) => {
        if (true === this.state.isVisible) return;

        this.setState({
            isVisible: true,
            display: CommonConst.HrmProvider.Alert,
            cancelable,
            title,
            body,
            content,
            onOK,
            onCancel,
            titleOK: HrmI18n.t('COMMON.OK'),
            titleCancel: HrmI18n.t('COMMON.Close')
        });
    };

    toast = (body = null, { display = CommonConst.HrmProvider.Top, timeout = TIME_OUT } = {}) => {
        if (true === this.state.isVisible) return;

        this.setState({
            isVisible: true,
            display,
            body
        }, () => {
            Animated.timing(this.animatedValue, {
                toValue: 1,
                useNativeDriver: true,
                duration: 300,
            }).start();

            setTimeout(() => {
                Animated.timing(this.animatedValue, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 150,
                }).start(() => {
                    this.setState({ ...initialState });
                });
            }, timeout);
        });
    }

    eventOk = () => {
        console.log('<<<<<<<<<< HrmAlert active event ON-OK >>>>>>>>>>');



        this.state.onOK && this.state.onOK();
        this.setState({ ...initialState });
    }

    eventCancel = () => {
        console.log('<<<<<<<<<< HrmAlert active event ON-CANCEL >>>>>>>>>>');



        this.state.onCancel && this.state.onCancel();
        this.setState({ ...initialState });
    }



    //#region ALERT
    renderButtonAlert = (eventOK = null, eventCancel = null) => {
        const { titleOK, titleCancel, onOK } = this.state;
        const item = onOK ?
            <View style={styles.footer}>
                <ButtonCancel titleCancel={titleCancel} onCancel={eventCancel} />
                <View style={styles.midline} />
                <ButtonOK titleOK={titleOK} onOK={eventOK} />
            </View>
            :
            <View style={styles.footer}>
                <ButtonCancel titleCancel={titleOK} onCancel={eventCancel} stylePrams={styles.buttonOnly} />
            </View>;

        return item;
    }

    renderAlert = () => {
        const { isVisible, title, body, content, cancelable } = this.state;

        return (
            <Modal animationType="fade" transparent={true} visible={isVisible} >
                <TouchableWithoutFeedback onPress={cancelable ? this.eventCancel : null}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>

                <SafeAreaView style={styles.wrapper}>
                    <View style={styles.contentProvider}>
                        {
                            title &&
                            <View style={styles.header}>
                                <Text style={[styles.text, styles.textHeader]}>{title}</Text>
                            </View>
                        }

                        <View style={styles.bodyProvider}>
                            {
                                content ? (content && content()) :
                                    <Text style={styles.textBody} numberOfLines={10}>{body}</Text>
                            }
                        </View>

                        {this.renderButtonAlert(this.eventOk, this.eventCancel)}
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }
    //#endregion

    //#region TOAST
    onLayout = ({ nativeEvent }) => {
        const height = nativeEvent.layout.height;
        this.setState({ contentHeight: height });
    }

    renderBodyToast = () => {
        const { body } = this.state;

        return (
            <Fragment>
                <Text style={[styles.text, styles.textBody, styles.textBodyToast]}>{body}</Text>
            </Fragment>
        );
    }

    renderToast = () => {
        const { display, contentHeight } = this.state;
        const containerStyles = [stylesProvider.toastContainer];

        if (display === CommonConst.HrmProvider.Bottom) {
            containerStyles.push(stylesProvider.bottom);
            containerStyles.push({
                transform: [
                    {
                        translateY: this.animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [contentHeight, 0],
                        }),
                    },
                ],
            });
        } else if (display === CommonConst.HrmProvider.Top) {
            containerStyles.push(stylesProvider.top);
            containerStyles.push({
                transform: [
                    {
                        translateY: this.animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-contentHeight, 0],
                        }),
                    },
                ],
            });
        }

        return (
            <Animated.View style={containerStyles} onLayout={this.onLayout}>
                {this.renderBodyToast()}
            </Animated.View>
        );
    }
    //#endregion

    render() {
        const { isVisible, display } = this.state;

        return (
            <HrmContext.Provider value={{ alert: this.alert, toast: this.toast }}>
                {this.props.children}
                {isVisible && display === CommonConst.HrmProvider.Alert && this.renderAlert()}
                {isVisible && display !== CommonConst.HrmProvider.Alert && this.renderToast()}
            </HrmContext.Provider>
        );
    }
}

const ButtonOK = React.memo(({ titleOK = '', onOK = null }) => (
    <TouchableOpacity style={styles.button} onPress={onOK}>
        <Text style={[styles.text, styles.textButton]}>{titleOK}</Text>
    </TouchableOpacity>
));

const ButtonCancel = React.memo(({ titleCancel = '', onCancel = null, stylePrams = {} }) => (
    <TouchableOpacity style={[styles.button, stylePrams]} onPress={onCancel}>
        <Text style={[styles.text, styles.textButton]}>{titleCancel}</Text>
    </TouchableOpacity>
));

const styles = Alert.AlertDialog;
const stylesProvider = Alert.HrmProvider;