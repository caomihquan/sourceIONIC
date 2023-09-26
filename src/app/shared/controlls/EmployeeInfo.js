import React, { Component } from 'react';
import { Text, Icon } from 'native-base';
import { Linking, View, Image, TouchableOpacity } from 'react-native';
import { ComboboxListSmall, ComboboxListLarge, Base64, CommonHandler, Avatar } from '../SharedConfig';
import { Configs } from '../../../AppConfig';
import { HrmAPI, HrmStorage, HrmAPIConst, CommonConst, HrmStorageConst } from '../../../libs/HrmLibs';
import HrmI18n from '../../../i18n/HrmI18n';


export default class EmployeeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataInfoEmp: {},
            listEmps: this.props.listTeams,
            ordinalNumEmp: -1,
            PhotoID: null,
            visibleEmp: false,
            showCall: this.props.showCall,
            showMail: this.props.showMail,
            isShowList: this.props.showMyTeam || false
        };
        this.getEmpProfile = this.getEmpProfile.bind(this);
        this._onPressEmpInfo = this._onPressEmpInfo.bind(this);
        this.getListEmpManager = this.getListEmpManager.bind(this);
        this._onPressShowCall = this._onPressShowCall.bind(this);
        this._onPressShowMail = this._onPressShowMail.bind(this);
        this._onPressNextEmp = this._onPressNextEmp.bind(this);
        this._onPressPrevEmp = this._onPressPrevEmp.bind(this);
        this.handleMoveEmployee = this.handleMoveEmployee.bind(this);
        this._onClose = this._onClose.bind(this);
    }
    getEmpProfile = async () => {
        var me = this;
        var itemEmp = await HrmStorage.getData(HrmStorageConst.ItemMyEmployees);
        let EmployeeCode = "";
        if (itemEmp) {
            EmployeeCode = itemEmp.EmployeeCode
        }

        if (this.props.EmpCode) {
            EmployeeCode = this.props.EmpCode
        }

        if (EmployeeCode) {
            HrmAPI.call(HrmAPIConst.EMPLOYEE.GetBasicProfile).setData({
                EmployeeCode: EmployeeCode
            }).done((result) => {
                if (false == result.IsError) {
                    const data = result.Data || {};
                    const dataInfoEmp = data.DataEmpBasicInfoProfile && data.DataEmpBasicInfoProfile[0] || {};

                    this.setState({
                        dataInfoEmp: dataInfoEmp,
                        showCall: dataInfoEmp.Mobile ? true : false,
                        showMail: dataInfoEmp.Email ? true : false
                    })

                    this.setState({
                        PhotoID: dataInfoEmp && dataInfoEmp.PhotoID
                    });
                }
            });
        }
        else {
            let basicProfile = await HrmStorage.getData(HrmStorageConst.BasicProfile);
            me.setState({
                dataInfoEmp: basicProfile,
                PhotoID: basicProfile && basicProfile.PhotoID
            });
        }
    }

    getListEmpManager = async () => {
        const me = this;

        HrmAPI.call(HrmAPIConst.EMPLOYEE.GetListEmpByManage)
            .done((res) => {
                if (res && res.Data) {
                    me.setState({ listEmps: res.Data });
                    HrmStorage.deleteData(HrmStorageConst.ItemMyEmployees);
                }
            });
    }

    _onPressEmpInfo = () => {
        this.setState({ visibleEmp: true });
    }

    _onPressShowCall = async () => {

        const me = this;
        if (!me.state.dataInfoEmp.Mobile) return;

        let messege = 'tel:' + me.state.dataInfoEmp.Mobile;

        Linking.canOpenURL(messege)
            .then(supported => supported ? Linking.openURL(messege) : null)
            .catch(err => console.log(err));
    }

    _onPressShowMail = async () => {
        const me = this;
        if (!me.state.dataInfoEmp.Email) return;
        let messege = 'mailto:' + me.state.dataInfoEmp.Email;
        Linking.canOpenURL(messege)
            .then(supported => supported ? Linking.openURL(messege) : null)
            .catch(err => console.log(err));
    }

    _onPressNextEmp = () => {
        this.handleMoveEmployee(1);
    }

    _onPressPrevEmp = async () => {
        this.handleMoveEmployee(-1);
    }

    handleMoveEmployee = async (move = 1) => {
        const me = this;
        const listEmps = me.state.listEmps;
        if (!listEmps || Object.keys(listEmps).length == 0) return;

        let ordinalNumber = me.state.ordinalNumEmp + move;
        if (ordinalNumber < 0) ordinalNumber = 0;
        if (ordinalNumber > listEmps.length - 1) ordinalNumber = listEmps.length - 1;

        const empInfo = listEmps[ordinalNumber];

        const currentEmp = me.state.dataInfoEmp;
        if (!currentEmp || !empInfo || currentEmp.EmployeeCode == empInfo.EmployeeCode) return;

        me.setState(() => {
            return {
                dataInfoEmp: empInfo,
                ordinalNumEmp: ordinalNumber,
                showCall: empInfo.Mobile ? true : false,
                showMail: empInfo.Email ? true : false
            }
        }, () => me.props.onChangeEmployee(empInfo))
    }

    _onSelect = async (item) => {
        await HrmStorage.setData(HrmStorageConst.ItemMyEmployees, item);
        this.setState(() => {
            return {
                dataInfoEmp: item,
                visibleEmp: false,
                showCall: item.Mobile ? true : false,
                showMail: item.Email ? true : false,
            }
        });
        this.setState({
            PhotoID: item && item.PhotoID
        });

        this.props.onChangeEmployee(item);
    }

    _onClose = async () => {
        this.setState({ visibleEmp: false })
    }

    componentDidMount() {
        this.getEmpProfile();
        this.getListEmpManager();
    }

    componentWillUnmount() {
        this.getEmpProfile();

        if (!this.state.listEmps) {
            this.getListEmpManager();
        }
    }

    render() {
        const noneFunc = () => { };

        return (
            <View style={styleEmpInfo.info}>
                <View style={styleEmpInfo.infoAvatar}>
                    <TouchableOpacity onPress={this.props.showMyTeam && this._onPressEmpInfo || noneFunc}>
                        <Avatar PhotoUrl={CommonHandler.ConvertPhotoUrl(this.state.PhotoID)}></Avatar>
                    </TouchableOpacity>
                </View>
                <View style={styleEmpInfo.infoDetail}>
                    <Text style={styleEmpInfo.infoName}>{this.state.dataInfoEmp?.FullName}</Text>
                    <View style={styleEmpInfo.infoContainer}>
                        <View style={styleEmpInfo.infoDescriptionGroup}>
                            <View style={styleEmpInfo.infoDescription}>
                                <Text style={styleEmpInfo.infoDescriptionTitle}>{HrmI18n.t('EMPLOYEEINFO.JobWName')}:</Text>
                                <Text numberOfLines={1} style={styleEmpInfo.infoDescriptionName}>{this.state.dataInfoEmp?.JobWName}</Text>
                            </View>
                            <View style={styleEmpInfo.infoDescription}>
                                <Text style={styleEmpInfo.infoDescriptionTitle}>{HrmI18n.t('EMPLOYEEINFO.EmployeeID')}:</Text>
                                <Text numberOfLines={1} style={styleEmpInfo.infoDescriptionID}>{this.state.dataInfoEmp?.EmployeeCode}</Text>
                            </View>
                        </View>
                        {(this.state.showCall) ?
                            (<TouchableOpacity
                                style={styleEmpInfo.buttonDetail}
                                onPress={this._onPressShowCall}
                                activeOpacity={1}>
                                <Icon style={styleEmpInfo.buttonDetailIcon} name="call" />
                            </TouchableOpacity>) : (<View />)
                        }
                        {(this.state.showMail) ?
                            (<TouchableOpacity
                                style={styleEmpInfo.buttonDetail}
                                onPress={this._onPressShowMail}
                                activeOpacity={1}>
                                <Icon style={styleEmpInfo.buttonDetailIcon} name="mail" />
                            </TouchableOpacity>) : (<View />)
                        }

                    </View>
                </View>
                {
                    (this.props.showNext) ?
                        (<View style={styleEmpInfo.next}>
                            <TouchableOpacity
                                style={styleEmpInfo.button}
                                onPress={this._onPressNextEmp}
                                activeOpacity={1}>
                                <Icon style={styleEmpInfo.buttonIcon} name="arrow-dropright" />
                            </TouchableOpacity>
                        </View>) : (<View />)
                }
                <ComboboxListLarge
                    visible={this.state.visibleEmp && this.state.showMyTeam}
                    onClose={this._onClose}
                    items={this.state.listEmps}
                    titleField="FullName"
                    onSelect={this._onSelect}
                />
            </View >
        );
    }
}

const styleEmpInfo = Configs.Theme.Styles.Shared.EmpInfo;