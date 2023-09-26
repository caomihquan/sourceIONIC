import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, Card, CardItem } from 'native-base';
import { connect } from 'react-redux';
import HrmI18n from '../../../../i18n/HrmI18n';
import FormatHandler from '../../handlers/FormatHandler';
import { Configs } from '../../../../AppConfig';
import { CommonConst, HrmAPI, HrmAPIConst } from './../../../../libs/HrmLibs';


class EmployeeInfomation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            flipUp: false,
             //nguyên quán
             IsShowNWardName: false,
             IsShowNDistrictName: false,
             IsShowNProvinceName: false,
            //thường trú
            IsShowPWardName: false,
            IsShowPDistrictName: false,
            IsShowPProvinceName: false,
            //tạm trú
            IsShowTWardName: false,
            IsShowTDistrictName: false,
            IsShowTProvinceName: false,
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

    formatString = (t) => {

        if (!t || t === "") return t;
        let str = '';
        t = t + "";
        str = t.replace(/@Year/g, HrmI18n.t('EMPLOYEEINFO.Year'))
            .replace(/@Month/g, HrmI18n.t('EMPLOYEEINFO.Month'))
            .replace(/@Day/g, HrmI18n.t('EMPLOYEEINFO.Day'))
        return str;
    }
    componentDidMount(){
        this.getConfigField222()
    }
    getConfigField222 = ()=> { 
   
        HrmAPI.call(HrmAPIConst.MYPROFILE.GetConfigField).setData({
            FunctionID: 'Mobi.004'
        }).done((res) => {
            if (false == res.IsError) {
                let data = res.Data && res.Data.DataConfigFields ?  res.Data.DataConfigFields.filter(n=>n.ModuleName=='HrmInfoPer') : [];
                if(data.length > 0)
                {
                    this.setState({
                        //nguyên quán
                       IsShowNWardName: data.filter(i=>i.FieldID == 'NWardName')[0].Visible,
                       IsShowNDistrictName: data.filter(i=>i.FieldID == 'NDistrictName')[0].Visible,
                       IsShowNProvinceName: data.filter(i=>i.FieldID == 'NProvinceName')[0].Visible,
                       //thường trú
                       IsShowPWardName: data.filter(i=>i.FieldID == 'PWardName')[0].Visible,
                       IsShowPDistrictName: data.filter(i=>i.FieldID == 'PDistrictName')[0].Visible,
                       IsShowPProvinceName: data.filter(i=>i.FieldID == 'PProvinceName')[0].Visible,
                       //tạm trú
                       IsShowTWardName: data.filter(i=>i.FieldID == 'TWardName')[0].Visible,
                       IsShowTDistrictName: data.filter(i=>i.FieldID == 'TDistrictName')[0].Visible,
                       IsShowTProvinceName: data.filter(i=>i.FieldID == 'TProvinceName')[0].Visible,
                   });
   
                }
            }
        });
    }
    render() {
        const IsFieldVisibleMobile = this.props.IsFieldVisibleMobile != null ? this.props.IsFieldVisibleMobile : true;
        const IsFieldVisibleJoinDate = this.props.IsFieldVisibleJoinDate != null ? this.props.IsFieldVisibleJoinDate : true;
        const IsFieldVisibleBirthday = this.props.IsFieldVisibleBirthday != null ? this.props.IsFieldVisibleBirthday : true;
        let gender = this.props.data?.Gender || "";
        let {IsShowNWardName,IsShowNDistrictName,IsShowNProvinceName,IsShowPWardName,IsShowPDistrictName,IsShowPProvinceName,IsShowTWardName,IsShowTDistrictName,IsShowTProvinceName} = this.state
        if (gender === "") {
            gender = "Unkown";
        } else if (gender === "F") {
            gender = "Female"
        } else if (gender === "M") {
            gender = "Male"
        }

        let thamniem = this.props.data?.ThamNien;
        return (
            <View style={styles.groupLeave}>
                <Card style={styleLeave.wrapper}>
                    <CardItem header bordered style={styleLeave.header}>
                        <TouchableOpacity style={styleLeave.headerContent} onPress={this.toggleShowHide}>
                            <View style={styleGroup.titleContainer}>
                                <Text style={styleGroup.title}>{HrmI18n.t('EMPLOYEEINFO.EmpBasicInfoProfile')}</Text>
                            </View>
                            <TouchableOpacity style={styleGroup.btnMiddle} onPress={this.toggleShowHide}>
                                <Icon name="ios-arrow-down"
                                    style={[styleGroup.toggleIcon, this.state.flipUp ? styleGroup.flipUpIcon : styleGroup.flipDownIcon]}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </CardItem>
                    {this.state.show &&
                        <CardItem style={styleLeave.body}>
                            <View style={styleLeave.bodyContent}>
                                {
                                    true == this.props.IsVisibleByEmpDirectory
                                        ?
                                        <View> 
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.FullName')}</Text>
                                                <Text style={styleGroup.detailValue}>{this.props.data?.FullName}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.DepartmentName')}</Text>
                                                <Text style={styleGroup.detailValueAdress}>{this.props.data?.DeparmentFullName}</Text>
                                            </View>
                                            {
                                                IsFieldVisibleMobile &&
                                                <View style={styleGroup.detailContainer}>
                                                    <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.Mobile')}</Text>
                                                    <Text style={styleGroup.detailValue}>{this.props.data?.Mobile}</Text>
                                                </View>
                                            }

                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.Email')}</Text>
                                                <Text style={styleGroup.detailValue}>{this.props.data?.Email}</Text>
                                            </View>
                                            {
                                                IsFieldVisibleBirthday &&
                                                <View style={styleGroup.detailContainer}>
                                                    <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.Birthday')}</Text>
                                                    <Text numberOfLines={1} style={styleGroup.detailValue}>{FormatHandler.formatDate(this.props.data?.Birthday, this.props.LoginInfo)}</Text>
                                                </View>
                                            }
                                            {

                                                IsFieldVisibleJoinDate &&
                                                <View style={styleGroup.detailContainer}>
                                                    <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.JoinDate')}</Text>
                                                    <Text numberOfLines={1} style={styleGroup.detailValue}>{FormatHandler.formatDate(this.props.data?.JoinDate, this.props.LoginInfo)}</Text>
                                                </View>
                                            }
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.JobWName')}</Text>
                                                <Text style={styleGroup.detailValue}>{this.props.data?.JobWName}</Text>
                                            </View>

                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.DirectManager')}</Text>
                                                <Text numberOfLines={1} style={styleGroup.detailValue}>{this.props.data?.DirectManager}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.InDirectManager')}</Text>
                                                <Text numberOfLines={1} style={styleGroup.detailValue}>{this.props.data?.InDirectManager}</Text>
                                            </View>
                                        </View>
                                        :
                                        <View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.FullName')}</Text>
                                                <Text style={styleGroup.detailValue}>{this.props.data?.FullName}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.Gender')}</Text>
                                                <Text style={styleGroup.detailValue}>{HrmI18n.t('EMPLOYEEINFO.' + gender)}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.Birthday')}</Text>
                                                <Text numberOfLines={1} style={styleGroup.detailValue}>{FormatHandler.formatDate(this.props.data?.Birthday, this.props.LoginInfo)}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.MaritalName')}</Text>
                                                <Text style={styleGroup.detailValue}>{this.props.data?.MaritalName}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.JobWName')}</Text>
                                                <Text style={styleGroup.detailValue}>{this.props.data?.JobWName}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.DepartmentName')}</Text>
                                                <Text style={styleGroup.detailValueAdress}>{this.props.data?.DeparmentFullName}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.ThamNien')}</Text>
                                                <Text style={styleGroup.detailValue}>{this.formatString(thamniem)}</Text>
                                            </View>
                                            {/* nguyên quán */}
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitleAdress}>{HrmI18n.t('EMPLOYEEINFO.NAddress')}</Text>
                                                <Text style={styleGroup.detailValueAdress}>{this.props.data?.NAddress}</Text>
                                            </View>
                                            { IsShowNWardName &&
                                                <View style={styleGroup.detailContainer}>
                                                    <Text style={styleGroup.detailTitleAdress}>{HrmI18n.t('EMPLOYEEINFO.PhuongXa')}</Text>
                                                    <Text style={styleGroup.detailValueAdress}>{this.props.data?.NWardName}</Text>
                                                </View>
                                            }
                                            { IsShowNDistrictName &&
                                                <View style={styleGroup.detailContainer}>
                                                    <Text style={styleGroup.detailTitleAdress}>{HrmI18n.t('EMPLOYEEINFO.QuanHuyem')}</Text>
                                                    <Text style={styleGroup.detailValueAdress}>{this.props.data?.NDistrictName}</Text>
                                                </View>
                                            }
                                            { IsShowNProvinceName &&
                                                <View style={styleGroup.detailContainer}>
                                                    <Text style={styleGroup.detailTitleAdress}>{HrmI18n.t('EMPLOYEEINFO.TinhThanh')}</Text>
                                                    <Text style={styleGroup.detailValueAdress}>{this.props.data?.NProvinceName}</Text>
                                                </View>
                                            }
                                          
                                           {/* thường trú */}
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitleAdress}>{HrmI18n.t('EMPLOYEEINFO.PAddress')}</Text>
                                                <Text style={styleGroup.detailValueAdress}>{this.props.data?.PAddress}</Text>
                                            </View>
                                            { IsShowPWardName &&
                                                <View style={styleGroup.detailContainer}>
                                                    <Text style={styleGroup.detailTitleAdress}>{HrmI18n.t('EMPLOYEEINFO.PhuongXa')}</Text>
                                                    <Text style={styleGroup.detailValueAdress}>{this.props.data?.PWardName}</Text>
                                                </View>
                                            }
                                             { IsShowPDistrictName &&
                                                <View style={styleGroup.detailContainer}>
                                                    <Text style={styleGroup.detailTitleAdress}>{HrmI18n.t('EMPLOYEEINFO.QuanHuyem')}</Text>
                                                    <Text style={styleGroup.detailValueAdress}>{this.props.data?.PDistrictName}</Text>
                                                </View>
                                            }
                                              { IsShowPProvinceName &&
                                                <View style={styleGroup.detailContainer}>
                                                    <Text style={styleGroup.detailTitleAdress}>{HrmI18n.t('EMPLOYEEINFO.TinhThanh')}</Text>
                                                    <Text style={styleGroup.detailValueAdress}>{this.props.data?.PProvinceName}</Text>
                                                </View>
                                            }
                                           
                                            
                                            {/* tạm trú */}
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitleAdress}>{HrmI18n.t('EMPLOYEEINFO.TAddress')}</Text>
                                                <Text style={styleGroup.detailValueAdress}>{this.props.data?.TAddress}</Text>
                                            </View>
                                            { IsShowTWardName &&
                                                <View style={styleGroup.detailContainer}>
                                                    <Text style={styleGroup.detailTitleAdress}>{HrmI18n.t('EMPLOYEEINFO.PhuongXa')}</Text>
                                                    <Text style={styleGroup.detailValueAdress}>{this.props.data?.TWardName}</Text>
                                                </View>
                                            }
                                             { IsShowTDistrictName &&
                                                <View style={styleGroup.detailContainer}>
                                                   <Text style={styleGroup.detailTitleAdress}>{HrmI18n.t('EMPLOYEEINFO.QuanHuyem')}</Text>
                                                   <Text style={styleGroup.detailValueAdress}>{this.props.data?.TDistrictName}</Text>
                                               </View>
                                            }
                                             { IsShowTProvinceName &&
                                                <View style={styleGroup.detailContainer}>
                                                    <Text style={styleGroup.detailTitleAdress}>{HrmI18n.t('EMPLOYEEINFO.TinhThanh')}</Text>
                                                    <Text style={styleGroup.detailValueAdress}>{this.props.data?.TProvinceName}</Text>
                                                </View>
                                            }
                                            {/* end trú nàk*/}
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.Mobile')}</Text>
                                                <Text style={styleGroup.detailValue}>{this.props.data?.Mobile}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.SoDTNguoiLienHe')}</Text>
                                                <Text style={styleGroup.detailValue}>{this.props.data?.SoDTNguoiLienHe}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.Email')}</Text>
                                                <Text style={styleGroup.detailValue}>{this.props.data?.Email}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.IDCardNo')}</Text>
                                                <Text style={styleGroup.detailValue}>{this.props.data?.IDCardNo}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.IssuedDate')}</Text>
                                                <Text numberOfLines={1} style={styleGroup.detailValue}>{FormatHandler.formatDate(this.props.data?.IssuedDate, this.props.LoginInfo)}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.IssuedPlaceName')}</Text>
                                                <Text style={styleGroup.detailValue}>{this.props.data?.IssuedPlaceName}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.IDCardNo2')}</Text>
                                                <Text style={styleGroup.detailValue}>{this.props.data?.IDCardNo2}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.IssuedDate')}</Text>
                                                <Text numberOfLines={1} style={styleGroup.detailValue}>{FormatHandler.formatDate(this.props.data?.IssuedDate2, this.props.LoginInfo)}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.IssuedPlaceName')}</Text>
                                                <Text style={styleGroup.detailValue}>{this.props.data?.IssuedPlaceName2}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.JoinDate')}</Text>
                                                <Text numberOfLines={1} style={styleGroup.detailValue}>{FormatHandler.formatDate(this.props.data?.JoinDate, this.props.LoginInfo)}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.OfficialDate')}</Text>
                                                <Text numberOfLines={1} style={styleGroup.detailValue}>{FormatHandler.formatDate(this.props.data?.OfficialDate, this.props.LoginInfo)}</Text>
                                            </View>
                                            <View style={styleGroup.detailContainer}>
                                                <Text style={styleGroup.detailTitle}>{HrmI18n.t('EMPLOYEEINFO.SignedDate')}</Text>
                                                <Text numberOfLines={1} style={styleGroup.detailValue}>{FormatHandler.formatDate(this.props.data?.SignedDate, this.props.LoginInfo)}</Text>
                                            </View>
                                        </View>
                                }
                            </View>
                        </CardItem>
                    }
                </Card>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    LoginInfo: state.loginInfo
});
export default connect(mapStateToProps)(EmployeeInfomation);
const styleGroup = Configs.Theme.Styles.Shared.ProfileGroup;
const styles = Configs.Theme.Styles.LeaveAndOT.MyLeaveRequest;
const styleLeave = Configs.Theme.Styles.Shared.CardLeave;