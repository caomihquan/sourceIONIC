import React, { Component } from 'react';
import { Text, Icon } from 'native-base';
import * as Localization from 'expo-localization';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, TouchableOpacity, Platform, Dimensions, Modal } from 'react-native';
import HrmI18n from '../../../i18n/HrmI18n';
import { Configs } from '../../../AppConfig';
import { CommonConst } from '../../../libs/HrmLibs';
import moment from 'moment';

const DEVICE_HEIGHT = Dimensions.get('window').height;
export default class HCSDatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Show: false,
            Date: null,
            Locale: Localization.locale,
            Value: this.props.value,
            Mode: this.props.mode || "date",
            Is24Hour: this.props.is24Hour || true,
            Display: this.props.display || "default",
            Format: this.props.format || (CommonConst.FormatDate + '').toLocaleUpperCase(),
            MarginRight: this.props.MarginRight || 0,
            MarginLeft: this.props.MarginLeft || 0
        };
        this.eventOnChange = this.eventOnChange.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    _isMounted = false;
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            if (Platform.OS === 'ios' && parseFloat(Platform.Version) >= 14) {
                const display = this.state.Mode == CommonConst.ModeTime ? 'spinner' : 'inline';
                this.setState({ Display: display });
            }

            if (this.state.Value) {
                const currentDate = moment(this.state.Value).format(this.state.Format);
                this.setState({ Date: currentDate });
            } else {
                this.setState({ Value: new Date() });
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onShow() {
        this.setState({ Show: true });
    }

    onClose() {
        this.setState({ Show: false });
    }

    onClear() {
        this.setState((prevState) => {
            return {
                Show: false,
                Date: null,
                Value: null || prevState.Value
            }
        })
        this.props.onDateChange(null);
    }

    onChange(date, formatDate) {
        if (date && formatDate && true == moment(date, formatDate).isValid()) {
            this.setState({
                Date: date,
                Value: moment(date, formatDate).toDate()
            });
        }
    }

    eventOnChange(event, selectedDate) {
        let currentDate = selectedDate || this.state.Value;

        if (event && event.type === 'neutralButtonPressed' && Platform.OS != 'ios') {
            this.setState((prevState) => {
                return {
                    Show: false,
                    Date: null,
                    Value: null || prevState.Value
                }
            })
            this.props.onDateChange(null);
        } else if (currentDate && this.props.onDateChange && event) {
            currentDate = moment(currentDate).format(this.state.Format);

            if (Platform.OS != 'ios') {
                this.setState({ Show: false });
            }

            this.setState((prevState) => {
                return {
                    Date: currentDate,
                    Value: selectedDate || prevState.Value
                }
            })
            this.props.onDateChange(currentDate, selectedDate);
        }
    };

    render() {
        return (
            <View style={styles.selectContainer}>
                <View style={styles.selectText}>
                    <Text style={styles.selectTextTitle}>{this.props.placeholder}</Text>
                    <Text style={[styles.selectTextTitle, styles.selectTextValue]}>{this.state.Date}</Text>
                </View>
                <View style={styles.selectButtonContainer}>
                    <TouchableOpacity style={styles.selectButton} onPress={this.onShow} activeOpacity={1}>
                        <Icon name="calendar" style={styles.selectButtonIcon} />
                    </TouchableOpacity>
                </View>

                {
                    Platform.OS === 'ios' ?
                        (
                            <Modal visible={true == this.state.Show || true == this.props.show}>
                                <View style={styles.modalBackground}>
                                    <View style={styles.buttonClose}>
                                        <TouchableOpacity style={styles.btnContent} onPress={this.onClear} >
                                            <Text style={styles.buttonCloseColor}>{HrmI18n.t("COMMON.Clear")}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.btnContent, styles.btnRight]} onPress={this.onClose} >
                                            <Text style={styles.buttonCloseColor}>{HrmI18n.t("COMMON.OK")}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <DateTimePicker
                                        // {...(Platform.OS === 'ios' && parseFloat(Platform.Version) >= 14 ? null : { textColor: "black" })}
                                        textColor="black"
                                        locale={this.state.Locale}
                                        value={this.state.Value}
                                        mode={this.state.Mode}
                                        display={this.state.Display}
                                        is24Hour={this.state.Is24Hour}
                                        onChange={this.eventOnChange}
                                    />
                                </View>
                            </Modal>
                        ) :
                        (
                            true == this.state.Show && (
                                <DateTimePicker
                                    neutralButtonLabel={this.props.isClear ? HrmI18n.t("COMMON.Clear") : null}
                                    locale={this.state.Locale}
                                    value={this.state.Value}
                                    mode={this.state.Mode}
                                    display={this.state.Display}
                                    is24Hour={this.state.Is24Hour}
                                    onChange={this.eventOnChange}
                                />
                            )
                        )

                }
            </View>
        );
    }
}
const styles = Configs.Theme.Styles.Shared.SelectValue;