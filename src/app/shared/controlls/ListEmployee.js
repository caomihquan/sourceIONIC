import React, { PureComponent, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { Card, CardItem, } from 'native-base';
import { Configs } from '../../../AppConfig';
import { CheckBox } from "react-native-elements"
import { CommonConst } from '../../../libs/HrmLibs';
import HrmI18n from '../../../i18n/HrmI18n';
import Avatar from './Avatar';

export default class ListEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            List: this.props.List || [],
            KeyID: this.props.KeyID || CommonConst.VALUE.ID,
            onChangeAfterCheckBox: this.props.onChangeAfterCheckBox,
            onChangeAfterCheckBoxAll: this.props.onChangeAfterCheckBoxAll,
            IsViewCheckBox: this.props.IsViewCheckBox || false,
            IsCheckAll: false
        };
        this.eventOnHandlerCheckbox = this.eventOnHandlerCheckbox.bind(this);
    }

    eventOnHandlerCheckbox(data) {
        let list = this.state.List;
        const KeyID = this.state.KeyID;

        let isCheck = !(data.IsCheck == true);
        data.IsCheck = isCheck;

        list.map((item) => {
            if (item[KeyID] && data[KeyID] && item[KeyID] == data[KeyID]) {
                item.IsCheck = data.IsCheck;
            }
            return item;
        })

        this.setState({ List: list }, () => {
            this.state.onChangeAfterCheckBox && this.state.onChangeAfterCheckBox(this.state.List)
        });
    }

    initData(list = {}) {
        this.setState({ List: list })
    }

    render() {
        const renderItem = ({ item }) => (
            <ListEmployeeItem
                data={item}
                isChecked={item?.IsCheck}
                isViewCheckBox={this.state.IsViewCheckBox}
                callback={this.eventOnHandlerCheckbox}
            ></ListEmployeeItem>
        );

        return (
            <View>
                {
                    this.state.List && this.state.List.length > 0 &&
                    <Card>
                        <CardItem style={[style.listEmpWrapper, style.listEmpOvertime]}>
                            < View style={style.listEmp}>
                                <FlatList
                                    data={this.state.List}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) => (item?.EmployeeCode || item?.ID).toString()}
                                />
                            </View>
                        </CardItem>
                    </Card >
                }
            </View>

        );
    }
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.isChecked === nextProps.isChecked;
};
const Item = (props) => {
    const [isCheck, setIsCheck] = useState(props.isChecked);

    const { EmployeeName, PhotoID, JobWName } = props.data;
    const eventOnHandlerCheckbox = () => {
        setIsCheck(prevCheck => !prevCheck);
        return props.callback && props.callback(props.data);
    }

    useEffect(() => {
        if (props.isChecked !== isCheck) {
            setIsCheck(props.isChecked);
        }
    }, [props.isChecked]);

    return (
        <TouchableOpacity style={[style.empItem]} onPress={eventOnHandlerCheckbox} activeOpacity={1}>
            <View style={style.avatar}>
                <Avatar PhotoUrl={CommonHandler.ConvertPhotoUrl(PhotoID)}></Avatar>
            </View>
            <View style={style.empItemInfo}>
                <Text style={style.empItemInfoName}>{EmployeeName}</Text>
                <Text style={style.empItemInfoDetail}>{JobWName}</Text>
            </View>
            <View style={style.cbItem}>
                {
                    props.isViewCheckBox &&
                    <CheckBox center size={34} checkedIcon="check-circle-o" uncheckedIcon="circle-thin"
                        checked={isCheck} onPress={eventOnHandlerCheckbox} />
                }
            </View>
        </TouchableOpacity>
    );
};
export const ListEmployeeItem = React.memo(Item, areEqual);

const style = Configs.Theme.Styles.Shared.ListEmployee;



