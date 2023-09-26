import React, { Component } from 'react';
import { Container, Content, ListItem, Text } from 'native-base';
import { View, Modal, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Configs } from '../../../AppConfig';


export default class ComboboxListLarge extends Component {

    render() {
        const onClose = () => {
            this.props.onClose();
        }

        const renderItem = ({ item }) => (
            <ComboboxListLargeItem
                data={item}
                isColor={this.props.isColor}
                colorField={this.props.colorField}
                titleField={this.props.titleField}
                onPress={this.props.onSelect} />
        )

        return (
            <Modal animationType="slide" transparent={true} visible={this.props.visible}>
                <SafeAreaView style={styles.wrapper}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.btnCancelText}>{HrmI18n.t("COMMON.Close")}</Text>
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
                </SafeAreaView>
            </Modal>
        );
    }
}

const Item = (props) => {
    const item = props.data || {};
    const onPress = props.onPress;
    const isColor = props.isColor;
    const colorField = props.colorField;
    const titleField = props.titleField;

    const eventOnPress = (item) => () => {
        onPress && onPress(item)
    }

    return (
        <ListItem onPress={eventOnPress(item)}>
            <Text style={true == isColor ? { color: item[colorField] || 'black' } : null}>
                {item[titleField]}
            </Text>
        </ListItem>
    )
}
export const ComboboxListLargeItem = React.memo(Item, () => true);
const styles = Configs.Theme.Styles.Shared.ComboboxListLarge;