import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardItem } from 'native-base';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import { Configs } from '../../../../AppConfig';
import FormatHandler from '../../handlers/FormatHandler';
class StaticTemplate extends Component {
    ShowField = (lstField) => {
        let result = null;
        let color = {}
        if (lstField && lstField.length > 0) {
            let detailValue = [styleGroup.detailValue];
            let detailTitle = [styleGroup.detailTitle];
            result = lstField.map((item, index) => {
                if (item.Color && item.Color !== "") {
                    color = { "color": item.Color }
                    detailValue.push(color);
                    detailTitle.push(color);
                }
                return (
                    (this.props.DataProps && this.props.DataProps.constructor !== Array) ?
                        <View style={styleGroup.detailContainer} key={index}>
                            <Text style={detailTitle}>{i18n.locale.toLowerCase() == "vn" ? item.FieldName : item.FieldName2}</Text>
                            {
                                !item.Format
                                && <Text style={detailValue}>{this.props.DataProps[item.FieldCode]}</Text>}
                            {
                                item.Format
                                && <Text style={detailValue} numberOfLines={1}>
                                    {item.Format == "0" ? FormatHandler.formatNum(this.props.DataProps[item.FieldCode], this.props.LoginInfo, "p")
                                        :
                                        FormatHandler.formatNum(this.props.DataProps[item.FieldCode], this.props.LoginInfo)
                                    }</Text>}
                        </View>
                        :
                        <View style={styleGroup.detailContainer} key={index}>
                            <Text style={detailTitle}>{i18n.locale.toLowerCase() == "vn" ? item.FieldName : item.FieldName2}</Text>
                            {
                                !item.Format &&
                                <Text style={detailValue}>{this.props.DataProps[0][item.FieldCode]}</Text>
                            }
                            {
                                item.Format &&
                                <Text style={detailValue} numberOfLines={1}>
                                    {item.Format == "0" ? FormatHandler.formatNum(this.props.DataProps[0][item.FieldCode], this.props.LoginInfo, "p")
                                        : FormatHandler.formatNum(this.props.DataProps[0][item.FieldCode], this.props.LoginInfo)
                                    }
                                </Text>
                            }
                        </View>
                )
            });
        }
        return result;
    }
    render() {
        let { GroupName, lstField } = this.props;
        return (
            <View>
                <Card style={styleLeave.wrapper}>
                    <CardItem header bordered style={styleLeave.header}>
                        <View style={styleLeave.headerContent}>
                            <View style={styleGroup.titleContainer}>
                                <Text style={styleGroup.title}>{GroupName}</Text>
                            </View>
                        </View>
                    </CardItem>
                    <CardItem style={styleLeave.body}>
                        <View style={styleLeave.bodyContent}>
                            {
                                this.props.DataProps && Object.keys(this.props.DataProps).length > 0 && this.ShowField(lstField)
                            }
                        </View>
                    </CardItem>
                </Card>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    LoginInfo: state.loginInfo
});
export default connect(mapStateToProps)(StaticTemplate);
const styleGroup = Configs.Theme.Styles.Shared.ProfileGroup;
const styles = Configs.Theme.Styles.LeaveAndOT.MyLeaveRequest;
const styleLeave = Configs.Theme.Styles.Shared.CardLeave;