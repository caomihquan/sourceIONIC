import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import StaticTemplate from "./PaySlipTab/StaticTemplate";
import DynamicTemplate from "./PaySlipTab/DynamicTemplate";
import i18n from "i18n-js";
class EmployeePaySlip extends Component {
    ShowTemplateGroupActiveDynamic = (Group) => {
        var result = null;
        if (Group && Group.length > 0 && this.props.lstdatatemplate)
            result = Group.map((item, index) => {
                //lấy data theo từng group
                let lstdataIndex = this.props.lstdatatemplate.filter(
                    (_item, _index) => {
                        return _item.templatename === item.GroupCode;
                    }
                );
                // group tĩnh
                if (item.IsDynamic == false) {
                    return (
                        <StaticTemplate
                            key={index}
                            lstField={item.TemplateFields}
                            GroupName={
                                i18n.locale.toLowerCase() == "vn"
                                    ? item.GroupName
                                    : item.GroupName2
                            }
                            GroupCode={item.GroupCode}
                            //    DataProps={this.props.[item.GroupCode]}
                            DataProps={
                                lstdataIndex.length > 0
                                    ? lstdataIndex[0].data
                                    : []
                            }
                        />
                    );
                } // group động
                else {
                    return (
                        <DynamicTemplate
                            key={index}
                            lstField={item.TemplateFields}
                            GroupName={
                                i18n.locale.toLowerCase() == "vn"
                                    ? item.GroupName
                                    : item.GroupName2
                            }
                            GroupCode={item.GroupCode}
                            DataProps={
                                lstdataIndex.length > 0
                                    ? lstdataIndex[0].data
                                    : []
                            }
                        />
                    );
                }
            });
        return result;
    };
    render() {
        var { lstGroupTemplateDynamic } = this.props;
        return (
            <View>
                {this.ShowTemplateGroupActiveDynamic(lstGroupTemplateDynamic)}
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    LoginInfo: state.loginInfo,
});
export default connect(mapStateToProps)(EmployeePaySlip);
