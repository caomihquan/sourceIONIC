// https://github.com/zaguiini/react-native-final-tree-view

import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import get from 'lodash.get';
import PropTypes from 'prop-types';

function noop() { }

class TreeView extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        renderNode: PropTypes.func.isRequired,
        initialExpanded: PropTypes.bool,
        getCollapsedNodeHeight: PropTypes.func,
        idKey: PropTypes.string,
        childrenKey: PropTypes.string,
        onNodePress: PropTypes.func,
        onNodeLongPress: PropTypes.func,
        isNodeExpanded: PropTypes.func,
        shouldDisableTouchOnLeaf: PropTypes.func
    }

    static defaultProps = {
        initialExpanded: false,
        getCollapsedNodeHeight: () => 20,
        idKey: 'id',
        childrenKey: 'children',
        onNodePress: noop,
        onNodeLongPress: noop,
        isNodeExpanded: noop,
        shouldDisableTouchOnLeaf: () => false
    }

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        expandedNodeKeys: {},
    })

    componentDidMount() {
        const data = this.props.isExpandedFirstLevel && this.props.data && this.props.data[0] || {};
        const nodeKey = data[this.props.idKey];

        this.setState({
            expandedNodeKeys: {
                [nodeKey]: true
            }
        })
    }

    componentDidUpdate(prevProps) {
        const hasDataUpdated = prevProps.data !== this.props.data;
        const hasIdKeyUpdated = prevProps.idKey !== this.props.idKey;
        const childrenKeyUpdated = prevProps.childrenKey !== this.props.childrenKey;

        if (hasDataUpdated || hasIdKeyUpdated || childrenKeyUpdated) {
            this.setState(this.getInitialState());
        }
    }

    hasChildrenNodes = (node) => {
        return get(node, `${this.props.childrenKey}.length`, 0) > 0
    };

    isExpanded = (id) => {
        if (this.props.isNodeExpanded !== noop) {
            return this.props.isNodeExpanded(id);
        } else {
            return get(this.state.expandedNodeKeys, id, this.props.initialExpanded);
        }
    }

    updateNodeKeyById = (id, expanded) => ({ expandedNodeKeys }) => ({
        expandedNodeKeys: Object.assign({}, expandedNodeKeys, {
            [id]: expanded,
        }),
    })

    collapseNode = (id) => this.setState(this.updateNodeKeyById(id, false));

    expandNode = (id) => this.setState(this.updateNodeKeyById(id, true));

    toggleCollapse = (id) => {
        const method = this.isExpanded(id) ? 'collapseNode' : 'expandNode';
        this[method](id);
    }

    handleNodePressed = async ({ node, level }) => {
        const nodePressResult = await this.props.onNodePress({ node, level });
        if (nodePressResult !== false && this.hasChildrenNodes(node)) {
            this.toggleCollapse(node[this.props.idKey]);
        }
    }

    Node = ({ nodes, level }) => {
        const NodeComponent = this.Node;

        return nodes.map((node) => {
            const handleNodePressed = (node, level) => () => {
                this.handleNodePressed({ node, level });
            }
            const onNodeLongPress = (node, level) => () => {
                this.props.onNodeLongPress({ node, level });
            }

            const isExpanded = this.isExpanded(node[this.props.idKey]);
            const hasChildrenNodes = this.hasChildrenNodes(node);
            const shouldRenderLevel = hasChildrenNodes && isExpanded;

            return (
                <View key={node[this.props.idKey]} style={styles.Wrapper}  >
                    <TouchableOpacity
                        disabled={this.props.shouldDisableTouchOnLeaf({ node, level })}
                        onPress={handleNodePressed(node, level)}
                        onLongPress={onNodeLongPress(node, level)}
                    >
                        <View style={styles.Content}>
                            {
                                React.createElement(this.props.renderNode, {
                                    node,
                                    level,
                                    isExpanded,
                                    hasChildrenNodes,
                                })
                            }

                            {
                                React.createElement(this.props.renderName, {
                                    node,
                                })
                            }
                        </View>
                    </TouchableOpacity>
                    {
                        shouldRenderLevel && <NodeComponent nodes={node[this.props.childrenKey]} level={level + 1} />
                    }
                </View>
            )
        })
    }

    render() {
        return <this.Node nodes={this.props.data} level={0} />
    }
}
export default TreeView;

const styles = StyleSheet.create({
    Wrapper: {
        height: 'auto',
        zIndex: 1,
        overflow: 'scroll'
    },
    Content: {
        flex: 1,
        flexDirection: "row"
    }
})
