import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Configs } from '../../../AppConfig';
export default class OTGroupItems extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={this.props.onPress} activeOpacity={1}>
                <View style={styles[this.props.hideBorder ? "wrapperWithoutBorder" : "wrapper"]}>
                    <View style={[styles.dayContent, styles["dayContent" + this.props.type]]}>
                        {
                            this.props.firstDate && this.props.lastDate
                                ?
                                <View>
                                    <Text style={styles.dayFirstLast}>{this.props.firstDate}</Text>
                                    <Text style={styles.dayFirstLast}>{this.props.lastDate}</Text>
                                </View>
                                :
                                <Text style={styles.day}>{this.props.dayOfMonth}</Text>
                        }
                    </View>
                    <View style={styles.dayInfoContent}>
                        <View style={styles.dayInfoName}>
                            <Text style={styles.name} ellipsizeMode='tail' numberOfLines={1}>{this.props.name}</Text>
                        </View>
                        <View style={styles.dayInfoDetail}>
                            <Text style={styles.info} ellipsizeMode='tail' numberOfLines={1}>{this.props.info}</Text>
                            {
                                this.props.info && <Text style={styles.info}> - </Text>
                            }
                            <Text style={[styles.info, styles["info" + this.props.type]]}>{this.props.status}</Text>
                        </View>
                        {
                            this.props.arrayStatus && this.props.arrayStatus.length > 0 &&
                            <View style={styles.dayGroupStatus}>
                                {
                                    this.props.arrayStatus.map(item => {
                                        return (
                                            <View style={[styles.dayStatus, styles["dayStatus" + item]]}>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        }
                    </View>
                    <View style={styles.dayNumContent}>
                        <Text style={styles.dayNum} ellipsizeMode='tail' numberOfLines={1}>{this.props.detail}</Text>
                        {
                            this.props.detail2 &&
                            <Text style={styles.empNum} ellipsizeMode='tail' numberOfLines={1}>{this.props.detail2}</Text>
                        }
                        {
                            this.props.rightBottom ?
                                <Text style={styles.rightBottom} ellipsizeMode='tail' numberOfLines={1}>{this.props.rightBottom}</Text>
                                : <View></View>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = Configs.Theme.Styles.Shared.LeaveItem;
const styleEmpInfo = Configs.Theme.Styles.Shared.EmpInfo;