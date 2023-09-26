import React, { Component } from 'react';
import { Container, Content, ListItem, Icon } from 'native-base';
import { View, Modal, TouchableOpacity, FlatList, Text, Dimensions, SafeAreaView } from 'react-native';
import { Configs } from '../../../AppConfig';
import TreeView from './TreeView';
import SearchBar from '../headers/SearchBar';
import CommonHandler from '../handlers/CommonHandler';
import { CommonConst } from '../../../libs/HrmLibs';



const DEVICE_WIDTH = Dimensions.get('window').width;
export default class ComboboxTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            txtSearch: "",
            IsLoading: false,
            Items: this.props.items || [],
            ItemsTree: [],
            ItemsTreeView: [],
            SelectedItems: {},
            FieldName: this.props.fieldName || CommonConst.KEY.name,
            FieldID: this.props.fieldID || CommonConst.KEY.id,
            FieldParentID: this.props.fieldParentID || CommonConst.KEY.parentId,
            IsBtnClear: this.props.isBtnClear || false,
            IsMulti: this.props.isMulti || false,
            MultiSelectedItems: ""
        }

        this.eventOnChangeSearch = this.eventOnChangeSearch.bind(this);
        this.eventOnSelectedItem = this.eventOnSelectedItem.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    componentDidMount() {
        
    }

    dropdown(isExpanded, hasChildrenNodes) {
        if (!hasChildrenNodes) {
            return <Icon name="caret-down-outline" style={styles.opacityIcon} />
        } else if (isExpanded) {
            return <Icon name="caret-down-outline" style={styles.openIcon} />
        } else {
            return <Icon name="caret-forward-outline" style={styles.closeIcon} />
        }
    }

    onReloadData(items = []) {
        let data = CommonHandler.convertTree(items, null, this.state.FieldID, this.state.FieldParentID, this.state.FieldName) || [];
        this.setState({
            Items: items,
            ItemsTree: data,
            ItemsTreeView: data,
        })
    }

    filterTree(items, searchText) {
        function getLeafNodes(nodes, text, result = []) {
            for (let i = 0, length = nodes.length; i < length; i++) {
                if (nodes[i].name && CommonHandler.slugify(nodes[i].name).includes(CommonHandler.slugify(text))) {
                    let exists = result.filter(item => item.id == nodes[i].id);
                    if (exists.length == 0) {
                        result.push(nodes[i]);
                    }
                }
            }
            return result;
        }
        let leafNodes = getLeafNodes(items, searchText);

        function getParentNode(items, parentId, result = []) {
            const parent = items.filter(item => item.id == parentId);
            if (parent.length > 0) {
                let exists = result.filter(item => item.id == parent[0].id);
                if (exists.length == 0) {
                    result.push(parent[0]);
                }
                if (parent[0].parentId) {
                    result = getParentNode(items, parent[0].parentId, result);
                }
            }
            return result;
        }

        let parentNodes = leafNodes;
        for (let i = 0, length = leafNodes.length; i < length; i++) {
            parentNodes = getParentNode(items, leafNodes[i].parentId, parentNodes)
        }

        let data = CommonHandler.convertTree(parentNodes, null, this.state.FieldID, this.state.FieldParentID, this.state.FieldName) || [];
        this.setState({ ItemsTreeView: data });
    }

    eventOnChangeSearch(str) {
        let result;
        if (str != null && str != '') {
            result = this.filterTree(this.state.Items, str) || [];
        } else {
            this.setState({ ItemsTreeView: this.state.ItemsTree });
        }
    }

    eventOnSelectedItem = (item) => () => {
        const { FieldParentID, FieldID, FieldName } = this.state;
        if (item && item[FieldID]) {
            if (true == this.props.isMulti) {
                let itemsChecked = itemsCheckedName = '';
                const keyChildren = CommonConst.KEY.children;
                const keyIsMultiChecked = CommonConst.KEY.IsMultiChecked;
                const uniqueKey = CommonConst.LV_USvrKey + FieldID;
                // isTypeCheck: 0: Default, 1: Uncheck all, 2: Check all
                const checkedMultiItems = (currentItem = [], selectedID, isTypeCheck = 0) => {
                    if (currentItem && typeof currentItem == 'object') {
                        if (selectedID && selectedID == currentItem[FieldID]) {
                            selectedID = uniqueKey;

                            if ((true == currentItem[keyIsMultiChecked] || 1 == isTypeCheck) &&
                                (2 != isTypeCheck)) {
                                isTypeCheck = 1;
                                currentItem[keyIsMultiChecked] = false;
                            } else {
                                isTypeCheck = 2;
                                currentItem[keyIsMultiChecked] = true;
                            }
                        }

                        if (currentItem[keyChildren] && currentItem[keyChildren].length > 0) {
                            currentItem[keyChildren] = currentItem[keyChildren].map(element => {
                                const searchID = selectedID == uniqueKey ? element[FieldID] : selectedID;
                                return checkedMultiItems(element, searchID, isTypeCheck);
                            });
                        }
                        itemsChecked = itemsChecked + (true == currentItem[keyIsMultiChecked] ? currentItem[FieldID] + ';' : '');
                        itemsCheckedName = (true == currentItem[keyIsMultiChecked] ? currentItem[FieldName] + ';' : '') + itemsCheckedName;
                    }
                    return currentItem || [];
                }
                const itemsTreeView = this.state.ItemsTreeView && this.state.ItemsTreeView[0] || {};
                const dataTreeView = checkedMultiItems(itemsTreeView, item[FieldID]);
                item[CommonConst.KEY.MultiSelectedItems] = itemsChecked;
                item[CommonConst.KEY.MultiSelectedItemsName] = itemsCheckedName;
                this.setState({ MultiSelectedItems: itemsChecked });
            } else {
                this.setState({ SelectedItems: item[FieldID] });
            }
        }
        return this.props.onSelect && this.props.onSelect(item);
    }

    onClear() {
        this.setState({
            SelectedItems: {},
            MultiSelectedItems: null
        });
        const item = {
            [this.state.FieldID]: "",
            [this.state.FieldName]: "",
        }
        return this.props.onSelect && this.props.onSelect(item);
    }

    render() {
        const onClose = () => {
            this.props.onClose();
        }

        const checkedSelectedItem = (node) => {
            let isChecked = false;
            if (node && node[this.state.FieldID]) {
                if (true == this.props.isMulti) {
                    isChecked = (`${this.state.MultiSelectedItems}`).split(';').includes(`${node[this.state.FieldID]}`);
                } else {
                    isChecked = node[this.state.FieldID] == this.state.SelectedItems;
                }
            }
            return isChecked;
        }

        return (
            <Modal animationType="slide" transparent={true} visible={this.props.visible}>
                <SafeAreaView style={styles.wrapper}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={styles.buttonGroup}>
                                {
                                    this.state.IsBtnClear &&
                                    <TouchableOpacity style={styles.button} onPress={this.onClear} >
                                        <Text style={styles.buttonClearText}>{HrmI18n.t("COMMON.Clear")}</Text>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity style={styles.button} onPress={onClose}>
                                    <Text style={styles.buttonCancelText}>{HrmI18n.t("COMMON.Close")}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Container>
                            <Content padder>
                                <View style={[stylesSearchBar.search, stylesSearchBar.groupContentSearch]}>
                                    <SearchBar style={stylesSearchBar.searchBar} placeholder={HrmI18n.t("COMMON.Search")}
                                        onEndEditing={this.eventOnChangeSearch} />
                                </View>

                                <TreeView
                                    isExpandedFirstLevel={true}
                                    data={this.state.ItemsTreeView}
                                    renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
                                        return (
                                            <View style={[styles.wrapperIcon, { marginLeft: 25 * level }]} >
                                                {this.dropdown(isExpanded, hasChildrenNodes, node)}
                                            </View>
                                        )
                                    }}
                                    renderName={({ node }) => {
                                        return (
                                            <TouchableOpacity style={[styles.wrapperLabel, checkedSelectedItem(node) && styles.wrapperLabelSelected]}
                                                onPress={this.eventOnSelectedItem(node)}>
                                                <Text onPress={this.eventOnSelectedItem(node)} style={styles.label}>{node?.name}</Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </Content>
                        </Container>
                    </View>
                </SafeAreaView>
            </Modal >
        );
    }
}
const styles = Configs.Theme.Styles.Shared.ComboboxTree;
const stylesSearchBar = Configs.Theme.Styles.Shared.SearchBar;