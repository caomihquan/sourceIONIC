import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon, Card, CardItem } from 'native-base';
import { connect } from 'react-redux';
import HrmI18n from '../../../../i18n/HrmI18n';
import FormatHandler from '../../handlers/FormatHandler';
import { Configs } from '../../../../AppConfig';

class EmpTrainCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            flipUp: false
        }

        this.toggleShowHide = this.toggleShowHide.bind(this);
    }


    toggleShowHide = () => {
        this.setState(preData => {
            return {
                show: !preData.show,
                flipUp: !preData.flipUp
            }
        })
    }

    render() {
        const renderItem = ({ item, index }) => this.renderItem(item, index);

        return (
            <View style={styles.groupLeave}>
                <Card style={styleLeave.wrapper}>
                    <CardItem header bordered style={styleLeave.header}>
                        <TouchableOpacity style={styleLeave.headerContent} onPress={this.toggleShowHide}>
                            <View style={styleGroup.titleContainer}>
                                <Text style={styleGroup.title}>{HrmI18n.t('EMPLOYEEINFO.EmpTrainCourse')}</Text>
                            </View>
                            <TouchableOpacity style={styleGroup.btnMiddle} onPress={this.toggleShowHide}>
                                <Icon name="ios-arrow-down"
                                    style={[styleGroup.toggleIcon, this.state.flipUp ? styleGroup.flipUpIcon : styleGroup.flipDownIcon]}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </CardItem>
                    <CardItem style={styleLeave.body}>
                        {this.state.show && this.props.data.length > 0 &&
                            <View style={styleLeave.bodyContent}>
                                <FlatList
                                    data={this.props.data}
                                    renderItem={renderItem}
                                    keyExtractor={(v, i) => i.toString()}
                                />
                            </View>
                        }
                    </CardItem>
                </Card>
            </View>
        )
    }

    renderItem = (item, index) => {
        let lastItem = (this.props.data.length - 1) == index ? false : true
        return (
            <View style={styles.itemContainer} onPress={this.props.onPress} activeOpacity={1}>
                <View style={styleGroup.flexColumn}>
                    <View style={styleGroup.twoColumn}>
                        <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.TrainCourseName')}</Text>
                        <Text style={[styleGroup.detailValue, styleGroup.flexEnd]}>{item.TrainCourseName}</Text>
                    </View>
                    <View style={styleGroup.twoColumn}>
                        <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.FromDate')}</Text>
                        <Text style={[styleGroup.detailValue, styleGroup.flexEnd]}>{FormatHandler.formatDate(item.FromDate, this.props.LoginInfo)}</Text>
                    </View>
                    <View style={styleGroup.twoColumn}>
                        <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.ToDate')}</Text>
                        <Text style={[styleGroup.detailValue, styleGroup.flexEnd]}>{FormatHandler.formatDate(item.ToDate, this.props.LoginInfo)}</Text>
                    </View>
                    <View style={styleGroup.twoColumn}>
                        <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.Rank')}</Text>
                        <Text style={[styleGroup.detailValue, styleGroup.flexEnd]}>{item.RankName}</Text>
                    </View>
                    <View style={styleGroup.twoColumn}>
                        <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.Note')}</Text>
                        <Text style={[styleGroup.detailValue, styleGroup.flexEnd]}>{item.Note}</Text>
                    </View>
                </View>
                {lastItem &&
                    <View style={styleGroup.borderBot} />
                }
            </View>
        )
    }
}


const mapStateToProps = state => ({
    LoginInfo: state.loginInfo
});
export default connect(mapStateToProps)(EmpTrainCourse);
const styleGroup = Configs.Theme.Styles.Shared.ProfileGroup;
const styles = Configs.Theme.Styles.LeaveAndOT.MyLeaveRequest;
const styleLeave = Configs.Theme.Styles.Shared.CardLeave;