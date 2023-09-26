import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Configs } from '../../../AppConfig';
import HrmI18n from '../../../i18n/HrmI18n';

export default class MissingListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={stylesLeaveItem.itemContainer} onPress={this.props.onPress} activeOpacity={1}>
                <View style={stylesMissingListItem[this.props.hideBorder ? "wrapperWithoutBorder" : "wrapper"]}>
                    <View style={[stylesMissingListItem.dayContent, stylesLeaveItem["dayContent" + this.props.type]]}>
                        {
                            this.props.firstDate && this.props.lastDate
                                ?
                                <View>
                                    <Text style={stylesLeaveItem.dayFirstLast}>{this.props.firstDate}</Text>
                                    <Text style={stylesLeaveItem.dayFirstLast}>{this.props.lastDate}</Text>
                                </View>
                                :
                                <Text style={stylesLeaveItem.day}>{this.props.day}</Text>
                        }
                    </View>

                    <View style={stylesLeaveItem.dayInfoContent}>
                        <View style={stylesLeaveItem.dayInfoDetail}>
                            <View style={stylesLeaveItem.infoBoxGroup}>
                                <Text style={stylesLeaveItem.name}>{this.props.name}</Text>
                            </View>
                        </View>
                        <View style={stylesLeaveItem.dayInfoDetail}>
                            <View style={[stylesLeaveItem.infoBoxGroup, { marginTop: 4 }]}>
                                <Text ellipsizeMode='tail' numberOfLines={1}
                                    style={stylesLeaveItem.shiftName}>{this.props.info}</Text>
                            </View>
                        </View>
                        <View style={stylesLeaveItem.dayInfoDetail}>
                            {
                                this.props.IsRegDTVSFromTo == false &&
                                <Text style={[stylesLeaveItem.dayInfoTime]}>{HrmI18n.t('MISSINGINOUT.SystemTime')}: </Text>
                            }
                            {
                                this.props.IsRegDTVSFromTo == true &&
                                <Text style={[stylesLeaveItem.dayInfoTime]}>{HrmI18n.t('LATEEARLY.In')}: </Text>
                            }
                            {
                                this.props.IsRegDTVSFromTo == true &&
                                <View style={[stylesLeaveItem.infoBoxGroup]}>

                                    <Text style={[stylesLeaveItem.dayInfoName, stylesLeaveItem.infoBoxItem]}>
                                        {this.props.DTFrom}
                                    </Text>
                                    <Text> - </Text>
                                    <Text style={[stylesLeaveItem.dayInfoName, stylesLeaveItem.infoBoxItem]}>
                                        {this.props.DTTo}
                                    </Text>
                                </View>
                            }
                            {
                                ((this.props.maxTimes == 4) || (this.props.maxTimes == 2 && this.props.leavePeriod != 2)) &&
                                this.props.IsRegDTVSFromTo == false &&
                                <View style={[stylesLeaveItem.infoBoxGroup]}>
                                    <Text style={[stylesLeaveItem.dayInfoName, stylesLeaveItem.infoBoxItem]}>
                                        {this.props.rootIn1}
                                    </Text>
                                    <Text> - </Text>
                                    <Text style={[stylesLeaveItem.dayInfoName, stylesLeaveItem.infoBoxItem]}>
                                        {this.props.rootOut1}
                                    </Text>
                                </View>
                            }
                            {
                                ((this.props.maxTimes == 4) || (this.props.maxTimes == 2 && this.props.leavePeriod == 2)) &&
                                this.props.IsRegDTVSFromTo == false &&
                                <View style={[stylesLeaveItem.infoBoxGroup]}>
                                    <Text style={[stylesLeaveItem.dayInfoName, stylesLeaveItem.infoBoxItem]}>
                                        {this.props.rootIn2}
                                    </Text>
                                    <Text> - </Text>
                                    <Text style={[stylesLeaveItem.dayInfoName, stylesLeaveItem.infoBoxItem]}>
                                        {this.props.rootOut2}
                                    </Text>
                                </View>
                            }

                        </View>
                        <View style={stylesLeaveItem.dayInfoDetail}>
                            {
                                this.props.IsRegDTVSFromTo == false &&
                                <Text style={[stylesLeaveItem.dayInfoTime]}>{HrmI18n.t('MISSINGINOUT.ManualTime')}: </Text>
                            }
                            {
                                this.props.IsRegDTVSFromTo == true &&
                                <Text style={[stylesLeaveItem.dayInfoTime]}>{HrmI18n.t('LATEEARLY.Out')}: </Text>
                            }
                            {
                                this.props.IsRegDTVSFromTo == true &&
                                <View style={[stylesLeaveItem.infoBoxGroup]}>

                                    <Text style={[stylesLeaveItem.dayInfoName, stylesLeaveItem.infoBoxItem]}>
                                        {this.props.VSFrom}
                                    </Text>
                                    <Text> - </Text>
                                    <Text style={[stylesLeaveItem.dayInfoName, stylesLeaveItem.infoBoxItem]}>
                                        {this.props.VSTo}
                                    </Text>
                                </View>
                            }
                            {
                                ((this.props.maxTimes == 4) || (this.props.maxTimes == 2 && this.props.leavePeriod != 2)) &&
                                this.props.IsRegDTVSFromTo == false &&
                                <View style={[stylesLeaveItem.infoBoxGroup]}>
                                    <Text style={[stylesLeaveItem.dayInfoName, stylesLeaveItem.infoBoxItem]}>
                                        {this.props.newIn1}
                                    </Text>
                                    <Text> - </Text>
                                    <Text style={[stylesLeaveItem.dayInfoName, stylesLeaveItem.infoBoxItem]}>
                                        {this.props.newOut1}
                                    </Text>
                                </View>
                            }
                            {
                                ((this.props.maxTimes == 4) || (this.props.maxTimes == 2 && this.props.leavePeriod == 2)) &&
                                this.props.IsRegDTVSFromTo == false &&
                                <View style={[stylesLeaveItem.infoBoxGroup]}>
                                    <Text style={[stylesLeaveItem.dayInfoName, stylesLeaveItem.infoBoxItem]}>
                                        {this.props.newIn2}
                                    </Text>
                                    <Text> - </Text>
                                    <Text style={[stylesLeaveItem.dayInfoName, stylesLeaveItem.infoBoxItem]}>
                                        {this.props.newOut2}
                                    </Text>
                                </View>
                            }

                        </View>
                        <View style={stylesLeaveItem.dayInfoDetail}>
                            <Text style={[stylesLeaveItem.info, stylesLeaveItem["info" + this.props.type]]}>
                                {this.props.status}
                            </Text>
                            <Text style={stylesLeaveItem.info}>
                                {this.props.missing ? `  - ${HrmI18n.t('MISSINGINOUT.TotalRequestInMonth')}: ${this.props.missing}` : ''}
                            </Text>
                        </View>
                        {
                            this.props.arrayStatus && this.props.arrayStatus.length > 0 &&
                            <View style={stylesLeaveItem.dayGroupStatus}>
                                {
                                    this.props.arrayStatus.map(item => {
                                        return (
                                            <View style={[stylesLeaveItem.dayStatus, stylesLeaveItem["dayStatus" + item]]}>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const stylesLeaveItem = Configs.Theme.Styles.Shared.LeaveItem;
const stylesMissingListItem = Configs.Theme.Styles.Shared.MissingListItem;
