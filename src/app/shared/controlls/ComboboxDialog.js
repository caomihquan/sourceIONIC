import React, { Component, memo, PureComponent } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, FlatList, SafeAreaView } from 'react-native';
import { Configs } from '../../../AppConfig';
import { HrmAPI, CommonConst } from '../../../libs/HrmLibs';
import HrmI18n from '../../../i18n/HrmI18n';
import { CheckBox } from 'react-native-elements';
import SearchBar from '../headers/SearchBar';
import ModalLoadingItem from './ModalLoadingItem';


export default class ComboboxDialog extends PureComponent {
    _isMountedData = false;
    constructor(props) {
        super(props);

        this.state = {
            Alias: this.props.alias,
            Path: this.props.path,
            Params: this.props.params,
            IsClient: !this.props.alias || !this.props.path ? true : false,

            Header: this.props.header || "",
            TitleOK: this.props.titleOk || HrmI18n.t("COMMON.OK"),
            CallbackOK: this.props.onOK,
            CallbackOnSelect: this.props.onSelect,
            TitleCancel: this.props.titleCancel || HrmI18n.t("COMMON.Close"),


            Data: this.props.data || null,
            ListSelected: [],
            KeyID: this.props.keyID || CommonConst.VALUE.ID,
            KeyName: this.props.keyName || CommonConst.VALUE.Name,
            KeyName1: this.props.keyName1,

            txtSearch: "",
            IsMulti: this.props.multi || false,
            IsCheckedAll: false,
            IsCheckedAllSQL: this.props.isCheckedAllSQL || false,
            IsCheckedAllControl: this.props.isCheckedAllControl || false,

            IsLoading: false,
            IsScrollLoading: false,
            IsShow: this.props.show || false,
            IsCancelable: this.props.cancelable || false,


            Options: this.initOption()
        }
        this.eventOnCheckedComboboxItem = this.eventOnCheckedComboboxItem.bind(this);
        this.eventOnScroll = this.eventOnScroll.bind(this);
        this.eventOnButtonOK = this.eventOnButtonOK.bind(this);
        this.onClose = this.onClose.bind(this);
        this.eventOnCancelable = this.eventOnCancelable.bind(this);
        this.eventOnCheckedAll = this.eventOnCheckedAll.bind(this);
    }

    componentDidMount() {
        this._isMountedData = true;
        this.initControl();
    }

    componentWillUnmount() {
        this._isMountedData = false;
    }

    initControl() {
        if (this.state.Data && this.state.Data.length > 0 && this.state.KeyID) {
            let data = this.state.Data;
            data = data.map(item => {
                item[CommonConst.KEY.IsChecked] = false;
                return item;
            })
            this.setState({ Data: data })
        } else {
            this.loadDataServer();
        }
    }

    initOption() {
        return {
            PageIndex: 1,
            PageSize: CommonConst.VALUE.PageSize,
            TotalPages: 0,
            IsFull: false,
            OnScrolling: false,
        }
    }

    loadData() {
        if (this.state.IsClient) {
            this.loadDataClient();
        }
        else {
            this.loadDataServer();
        }
    }

    loadDataClient() {
        const keyID = this.state.KeyID;
        let stateDataFull = this.props.data;
        if (stateDataFull && stateDataFull.length > 0) {
            let listSelected = this.state.ListSelected;
            if (listSelected && listSelected.length > 0) {
                const arrSelected = listSelected.map(item => item[keyID]).filter(item => item != null);
                if (arrSelected && arrSelected.length > 0) {
                    stateDataFull = stateDataFull.map(item => {
                        item[CommonConst.KEY.IsChecked] = arrSelected.includes(item[keyID]);
                        return item;
                    })
                }
            }
            let stateData = stateDataFull;
            if (this.state.txtSearch != null && this.state.txtSearch.trim() != '') {
                stateData = stateData.filter((item) => {
                    return CommonHandler.slugify(item[this.state.KeyName]).includes(CommonHandler.slugify(this.state.txtSearch));
                });
            }
            this.setState({
                Data: stateData,
                DataFull: stateDataFull,
                IsScrollLoading: false
            })
        }
    }


    loadDataServer() {
        if (!this._isMountedData || !this.state.Alias || !this.state.Path) return;

        const options = this.state.Options || {};
        const params = this.state.Params || {};
        params[CommonConst.KEY.PageIndex] = (options.PageIndex - 1) >= 0 ? (options.PageIndex - 1) : 0;
        params[CommonConst.KEY.PageSize] = options.PageSize;
        params[CommonConst.KEY.FilterText] = this.state.txtSearch;

        HrmAPI.call(this.state.Alias, this.state.Path)
            .setData(params)
            .done(result => {
                if (false == result.IsError && this._isMountedData) {
                    this.initData(result.Data);
                }
                this.setState({ IsScrollLoading: false });
            })
    }

    initData(data = {}) {
        let currentData = data.Data;
        if (!currentData || typeof currentData != "object" || Object.keys(currentData).length == 0) {
            return this.setState({
                Data: null,
                IsLoading: true
            })
        };

        const outputParams = data[CommonConst.KEY.OutputParams] || {};

        const keyID = outputParams[CommonConst.KEY.PrimaryKey] || CommonConst.VALUE.ID;
        const arrDisplayColumn = (outputParams[CommonConst.KEY.DisplayColumn] + '').split(';');
        const keyName = arrDisplayColumn[0] ? arrDisplayColumn[0] : CommonConst.VALUE.Name;
        const keyName1 = arrDisplayColumn[1] ? arrDisplayColumn[1] : CommonConst.VALUE.Name1;
        const totalPages = outputParams[CommonConst.KEY.TotalPages];

        let stateData = this.state.Data;
        let listSelected = this.state.ListSelected;

        if (true == this.state.IsCheckedAll) {
            currentData = currentData.map(item => {
                item[CommonConst.KEY.IsChecked] = true;
                return item;
            })
            stateData = stateData ? [...stateData, ...currentData] : currentData;

            if (true == this.state.IsCheckedAllControl) {
                listSelected = listSelected && listSelected.length > 0 ? [...listSelected, ...currentData] : currentData;
            }
        } else {
            stateData = stateData ? [...stateData, ...currentData] : currentData;
            if (listSelected && listSelected.length > 0) {
                const arrSelected = listSelected.map(item => item[keyID]).filter(item => item != null);
                if (arrSelected && arrSelected.length > 0) {
                    stateData = stateData.map(item => {
                        item[CommonConst.KEY.IsChecked] = arrSelected.includes(item[keyID]);
                        return item;
                    })
                }
            }
        }

        const options = this.state.Options;
        options.TotalPages = totalPages;
        options.OnScrolling = false;
        options.IsFull = options.PageIndex >= totalPages;

        this.setState({
            Data: stateData,
            ListSelected: listSelected,
            KeyID: keyID,
            KeyName: keyName,
            KeyName1: keyName1,
            Options: options,
            IsLoading: true
        })
    }

    onShow() {
        //When event Show & IsClient then set search text = '' and load data client
        if (this.state.IsClient) {
            this.setState({
                txtSearch: ""
            }, () => this.loadDataClient())
        }
        this.setState({ IsShow: true });
    }

    onClose() {
        this.setState({ IsShow: false });
    }

    onReload() {
        this.setState({
            Options: this.initOption(),
            txtSearch: ""
        }, () => this.loadData())
    }

    onReloadData(data) {
        this.setState({ Data: data }, () => this.initControl())
    }

    onReloadParams(params) {
        this.setState({
            Data: null,
            Params: params,
            IsLoading: false
        }, () => this.initControl())
    }

    eventOnButtonOK() {
        const params = {
            Data: this.state.ListSelected,
            ID: this.state.KeyID,
            Name: this.state.KeyName,
            Name1: this.state.KeyName1,
            IsCheckedAll: this.state.IsCheckedAll,
            // IsCheckedAllSQL: this.state.IsCheckedAllSQL,
            // IsCheckedAllControl: this.state.IsCheckedAllControl
        }
        this.onClose();
        return this.state.CallbackOK && this.state.CallbackOK(params);
    }

    eventOnCancelable() {
        if (true == this.state.IsCancelable) {
            this.onClose();
        }
    }

    eventChangeText = (str) => {
        this.setState({ txtSearch: str });
    }

    eventOnChangeSearch = (str) => {
        this.setState({
            Data: null,
            txtSearch: str,
            IsLoading: false,
            Options: this.initOption()
        }, () => this.loadData());
    }

    eventOnPressSearch = () => {
        this.setState({
            Data: null,
            IsLoading: false,
            Options: this.initOption()
        }, () => this.loadData());
    }

    eventOnScroll(event) {
        if (!event || !event.nativeEvent) return;

        const device = event.nativeEvent;
        const contentSizeHeight = device.contentSize && device.contentSize.height ? device.contentSize.height : 0;
        const layoutHeight = device.layoutMeasurement && device.layoutMeasurement.height ? device.layoutMeasurement.height : 0;
        // Vị trí khi scroll theo trục y
        const locationScroll = device.contentOffset && device.contentOffset.y ? device.contentOffset.y : 0;

        const options = this.state.Options;

        if (!options.IsFull && !options.OnScrolling &&
            locationScroll >= (contentSizeHeight - layoutHeight - 100 - ((layoutHeight / 3) * options.PageIndex))) {
            options.OnScrolling = true;
            options.PageIndex = options.PageIndex + 1;
            options.IsFull = options.PageIndex >= options.TotalPages;

            this.setState({
                Options: options,
                IsScrollLoading: true
            }, () => this.loadData());
        }
    }

    mergeDataFullFromData(dataFull, data) {
        const keyID = this.state.KeyID;
        for (let i = 0; i < dataFull.length; i++) {
            const dataFilter = data.filter(element => {
                return element[keyID] == dataFull[i][keyID];
            })
            if (dataFilter.length > 0) {
                dataFull[i][CommonConst.KEY.IsChecked] = dataFilter[0][CommonConst.KEY.IsChecked];
            }
        }
        return dataFull;
    }

    handleCheckedComboboxItem(data, item) {
        const keyID = this.state.KeyID;
        data = data.map(element => {
            if (true == this.state.IsMulti) {
                const isChecked = element[CommonConst.KEY.IsChecked];
                element[CommonConst.KEY.IsChecked] = element[keyID] == item[keyID] ? !isChecked : isChecked;
            } else {
                element[CommonConst.KEY.IsChecked] = element[keyID] == item[keyID] ? true : false;
            }
            return element;
        })
        return data;
    }

    eventOnCheckedComboboxItem = (item, index) => () => {
        let data = this.state.Data;
        let dataFull;
        if (!data || data.length == 0) return;

        const keyID = this.state.KeyID;
        const keyName = this.state.KeyName;
        const keyName1 = this.state.KeyName1;
        let listSelected = [];

        if (true == this.state.IsCheckedAll && true == this.state.IsCheckedAllSQL) {
            data = data.map(element => {
                const isChecked = element[CommonConst.KEY.IsChecked];
                element[CommonConst.KEY.IsChecked] = element[keyID] == item[keyID] ? !isChecked : isChecked;
                return element;
            })
            listSelected = data.filter(item => item[CommonConst.KEY.IsChecked] == false);
        } else {
            data = this.handleCheckedComboboxItem(this.state.Data, item)
            if (this.state.IsClient) {
                dataFull = this.mergeDataFullFromData(this.state.DataFull, this.state.Data);
                listSelected = dataFull.filter(item => item[CommonConst.KEY.IsChecked] == true);
            }
            else {
                listSelected = data.filter(item => item[CommonConst.KEY.IsChecked] == true);
            }
        }

        this.setState({
            Data: data,
            DataFull: dataFull,
            ListSelected: listSelected
        }, () => {
            if (this.state.CallbackOnSelect) {
                const params = {
                    Data: this.state.ListSelected,
                    ID: this.state.KeyID,
                    Name: this.state.KeyName,
                    Name1: this.state.KeyName1,
                    IsCheckedAll: this.state.IsCheckedAll,
                    // IsCheckedAllSQL: this.state.IsCheckedAllSQL,
                    // IsCheckedAllControl: this.state.IsCheckedAllControl
                }
                this.onClose();
                return this.state.CallbackOnSelect && this.state.CallbackOnSelect(params)
            }
        });
    }

    eventOnCheckedAll() {
        let stateData = this.state.Data;
        if (!stateData || stateData.length <= 0) return;

        const isChangeCheckedAll = !this.state.IsCheckedAll;
        stateData = stateData.map(item => {
            item[CommonConst.KEY.IsChecked] = isChangeCheckedAll;
            return item;
        })
        const listSelected = true == isChangeCheckedAll && true == this.state.IsCheckedAllControl ? stateData : [];

        this.setState({
            Data: stateData,
            ListSelected: listSelected,
            IsCheckedAll: isChangeCheckedAll
        })
    }

    render() {
        return (
            <View>
                <Modal animationType="none" transparent={true} visible={this.state.IsShow} >
                    <TouchableWithoutFeedback onPress={this.eventOnCancelable}>
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>

                    <SafeAreaView style={styles.wrapper}>
                        <View style={styles.content}>
                            <View style={styles.header}>
                                <Text style={[styles.text, styles.textHeader]}>{this.state.Header}</Text>
                            </View>

                            {this.props.filterControl && this.props.filterControl()}

                            <View style={styles.groupContentControl}>
                                {
                                    (true == this.state.IsCheckedAllControl || true == this.state.IsCheckedAllSQL) &&
                                    <TouchableOpacity style={styles.groupContentCheckbox}>
                                        <CheckBox size={28} iconType="material"
                                            checked={true}
                                            checkedIcon="done"
                                            onPress={this.eventOnCheckedAll}
                                        />
                                    </TouchableOpacity>
                                }
                                <View style={[styles.search, styles.groupContentSearch]}>
                                    <SearchBar style={styles.searchBar} placeholder={HrmI18n.t("COMMON.Search")}
                                        onChangeText={this.eventChangeText}
                                        onEndEditing={this.eventOnChangeSearch}
                                        onPress={this.eventOnPressSearch} />
                                </View>
                            </View>

                            <View style={styles.body}>
                                {this.renderComboboxItem()}
                            </View>

                            {
                                this.state.CallbackOK ?
                                    (
                                        <ButtonOK titleCancel={this.state.TitleCancel} titleOK={this.state.TitleOK}
                                            onClose={this.onClose} onOK={this.eventOnButtonOK}>
                                        </ButtonOK>
                                    ) :
                                    (
                                        <ButtonCancel titleCancel={this.state.TitleCancel}
                                            onClose={this.onClose} >
                                        </ButtonCancel>
                                    )
                            }

                        </View>
                    </SafeAreaView>
                </Modal>
            </View >
        )
    }

    renderComboboxItem() {
        const { Data, KeyID, KeyName, KeyName1, IsLoading } = this.state;

        if (!Data && true == IsLoading) {
            return <View style={styles.wrapper}><Text>{HrmI18n.t("COMMON.NoDataFound")}</Text></View>;
        };

        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity style={styles.comboboxItem} activeOpacity={1}
                    onPress={this.eventOnCheckedComboboxItem(item, index)}>
                    {
                        this.state.IsMulti ?
                            <View style={styles.comboboxItemCheckbox}>
                                <CheckBox
                                    size={28}
                                    iconType="material"
                                    checkedIcon="done"
                                    uncheckedIcon=""
                                    checked={item[CommonConst.KEY.IsChecked]}
                                    onPress={this.eventOnCheckedComboboxItem(item, index)}
                                />
                            </View> :
                            <View style={styles.comboboxItemNoCheckbox}></View>
                    }

                    <View style={styles.comboboxItemContent}>
                        <Text style={styles.comboboxItemText}>
                            {item[KeyName]}
                        </Text>
                        {
                            KeyName1 &&
                            <Text style={[styles.comboboxItemText, styles.comboboxItemTextOpacity]}>
                                {item[KeyName1]}
                            </Text>
                        }
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.combobox}>
                {
                    Data &&
                    (
                        <FlatList onScroll={event => this.eventOnScroll(event)}
                            data={Data}
                            renderItem={renderItem}
                            extraData={Data}
                            keyExtractor={(item, index) => item[KeyID]}
                            ListFooterComponent={
                                <ModalLoadingItem style={styles.modalLoading} active={this.state.IsScrollLoading} />
                            }
                        />
                    )
                }

            </View >
        )
    }
}

const ButtonOK = React.memo(({ titleCancel, titleOK, onClose, onOK }) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={onClose}>
                <Text style={[styles.text, styles.textButton]}>{titleCancel}</Text>
            </TouchableOpacity >
            <View style={styles.midline} />
            <TouchableOpacity style={styles.button} onPress={onOK}                            >
                <Text style={[styles.text, styles.textButton]}>{titleOK}</Text>
            </TouchableOpacity >
        </View>
    )
});

const ButtonCancel = React.memo(({ titleCancel, onClose }) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.buttonOnly} onPress={onClose}>
                <Text style={[styles.text, styles.textButton]}>{titleCancel}</Text>
            </TouchableOpacity>
        </View>
    )
});


const styles = Configs.Theme.Styles.Alert.AlertDialog; 