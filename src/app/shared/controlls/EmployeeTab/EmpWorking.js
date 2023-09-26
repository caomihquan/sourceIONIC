import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon, Card, CardItem } from 'native-base';
import { connect } from 'react-redux';
import HrmI18n from '../../../../i18n/HrmI18n';
import FormatHandler from '../../handlers/FormatHandler';
import { Configs } from '../../../../AppConfig';

class EmpWorking extends Component {

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
                                <Text style={styleGroup.title}>{HrmI18n.t('EMPLOYEEINFO.EmpWorking')}</Text>
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
        const last = this.props.data.length == index ? false : true;
        return (
            <View style={styles.itemContainer} onPress={this.props.onPress} activeOpacity={1}>
                <View style={styleGroup.flexColumn}>
                    <View style={styleGroup.twoColumn}>
                        <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.SoQuyetDinh')}</Text>
                        <Text style={[styleGroup.detailValue, styleGroup.flexEnd]}>{item.DecisionNo}</Text>
                    </View>
                    <View style={styleGroup.twoColumn}>
                        <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.AppointName')}</Text>
                        <Text style={[styleGroup.detailValue, styleGroup.flexEnd]}>{item.AppointName}</Text>
                    </View>
                    <View style={styleGroup.twoColumn}>
                        <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.JobWName')}</Text>
                        <Text style={[styleGroup.detailValue, styleGroup.flexEnd]}>{item.JobWName}</Text>
                    </View>

                    {
                        (item.IsShowJobWOld == true || item.IsShowJobWOld == 1) &&
                        <View style={styleGroup.twoColumn}>
                            <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.JobWNameOld')}</Text>
                            <Text style={[styleGroup.detailValueAdress, styleGroup.flexEnd, italic]}>{item.JobWNameOld}</Text>
                        </View>
                    }


                    <View style={styleGroup.twoColumn}>
                        <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.ChucVu')}</Text>
                        <Text style={[styleGroup.detailValue, styleGroup.flexEnd]}>{item.JobPosName}</Text>
                    </View>

                    {
                        (item.IsShowJobPosOld == true || item.IsShowJobPosOld == 1) &&
                        <View style={styleGroup.twoColumn}>
                            <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.ChucVuCu')}</Text>
                            <Text style={[styleGroup.detailValueAdress, styleGroup.flexEnd, italic]}>{item.JobPosNameOld}</Text>
                        </View>
                    }
                    <View style={styleGroup.twoColumn}>
                        <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.DepartmentName')}</Text>
                        <Text style={[styleGroup.detailValueAdress, styleGroup.flexEnd]}>{item.DeparmentFullName}</Text>
                    </View>
                    {
                        (item.IsShowDepOld == true || item.IsShowDepOld == 1) &&
                        // item && [1, 4, 5].indexOf(item?.Appoint) > -1 &&
                        < View style={styleGroup.twoColumn}>
                            <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.DepartmentNameOld')}</Text>
                            <Text style={[styleGroup.detailValueAdress, styleGroup.flexEnd, italic]}>{item.DeparmentFullNameOld}</Text>
                        </View>
                    }
                    <View style={styleGroup.twoColumn}>
                        <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.BeginDate')}</Text>
                        <Text style={[styleGroup.detailValue, styleGroup.flexEnd]}>{FormatHandler.formatDate(item.BeginDate, this.props.LoginInfo)}</Text>
                    </View>
                    <View style={styleGroup.twoColumn}>
                        <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.EndDate')}</Text>
                        <Text style={[styleGroup.detailValue, styleGroup.flexEnd]}>{FormatHandler.formatDate(item.EndDate, this.props.LoginInfo)}</Text>
                    </View>
                    {last && <View style={styleGroup.borderBot} />}
                </View>
            </View>
        )
    }
}


const mapStateToProps = state => ({
    LoginInfo: state.loginInfo
});
export default connect(mapStateToProps)(EmpWorking);
const italic = {
    fontStyle: 'italic'
};
const styleGroup = Configs.Theme.Styles.Shared.ProfileGroup;
const styles = Configs.Theme.Styles.LeaveAndOT.MyLeaveRequest;
const styleLeave = Configs.Theme.Styles.Shared.CardLeave;