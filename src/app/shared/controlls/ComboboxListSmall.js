import React, { Component } from 'react';
import { Container, Content, ListItem, Text } from 'native-base';
import { View, Modal, TouchableOpacity, FlatList } from 'react-native';

import { Configs } from '../../../AppConfig';

export default class ComboboxListSmall extends Component {
    render() {
        const onSelect = (item) => () => {
            this.props.onSelect(item)
        }

        const renderItem = ({ item }) => (
            <ListItem onPress={onSelect(item)}>
                <Text>{item[this.props.titleField]}</Text>
            </ListItem>
        )

        return (
            <Modal animationType="slide" transparent={true} visible={this.props.visible}>
                <View style={styles.wrapper}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.btnCancel} onPress={this.props.onClose}>
                                <Text style={styles.btnCancelText}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                        <Container>
                            <Content padder>
                                <FlatList
                                    data={this.props.items}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </Content>
                        </Container>
                    </View>
                </View>
            </Modal>
        );
    }
}
const styles = Configs.Theme.Styles.Shared.ComboboxListSmall;