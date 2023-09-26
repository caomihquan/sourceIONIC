import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon, Card, CardItem } from 'native-base';
import { connect } from 'react-redux';
import HrmI18n from '../../../../i18n/HrmI18n';
import FormatHandler from '../../handlers/FormatHandler';
import { Configs } from '../../../../AppConfig';

class EmpAward extends Component {

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
                                <Text style={styleGroup.title}>{HrmI18n.t('EMPLOYEEINFO.EmpAward')}</Text>
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
                        <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.Reason')}</Text>
                        <Text style={[styleGroup.detailValue, styleGroup.flexEnd]}>{item.Reason}</Text>
                    </View>
                    <View style={styleGroup.twoColumn}>
                        <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.AwardName')}</Text>
                        <Text style={[styleGroup.detailValue, styleGroup.flexEnd]}>{item.AwardName}</Text>
                    </View>
                    <View style={styleGroup.twoColumn}>
                        <Text style={[styleGroup.detailTitle, styleGroup.flexStart]}>{HrmI18n.t('EMPLOYEEINFO.AwardDate')}</Text>
                        <Text style={[styleGroup.detailValue, styleGroup.flexEnd]}>{FormatHandler.formatDate(item.SignedDate, this.props.LoginInfo)}</Text>
                    </View>
                    {lastItem && <View style={styleGroup.borderBot} />}
                </View>
            </View>
        )
    }
}


const mapStateToProps = state => ({
    LoginInfo: state.loginInfo
});
export default connect(mapStateToProps)(EmpAward);
const styleGroup = Configs.Theme.Styles.Shared.ProfileGroup;
const styles = Configs.Theme.Styles.LeaveAndOT.MyLeaveRequest;
const styleLeave = Configs.Theme.Styles.Shared.CardLeave;