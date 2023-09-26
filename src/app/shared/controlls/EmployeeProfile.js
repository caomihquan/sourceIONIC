import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import HrmI18n from '../../../i18n/HrmI18n';
import FormatHandler from '../handlers/FormatHandler';
import { Configs } from '../../../AppConfig';
import EmployeeInfomation from './EmployeeTab/EmployeeInfomation';
import EmpTrainBGRD from './EmployeeTab/EmpTrainBGRD';
import EmpTrainCourse from './EmployeeTab/EmpTrainCourse';
import EmpWorking from './EmployeeTab/EmpWorking';
import EmpAward from './EmployeeTab/EmpAward';
import EmpBenefits from './EmployeeTab/EmpBenefits';
import EmpDiscipline from './EmployeeTab/EmpDiscipline';
import EmpFortune from './EmployeeTab/EmpFortune';
import EmpInsurance from './EmployeeTab/EmpInsurance';

class EmployeeProfile extends Component {

    render() {
        return (
            <View>
                <EmployeeInfomation data={this.props.DataEmpBasicInfoProfile}
                    IsVisibleByEmpDirectory={this.props.IsVisibleByEmpDirectory}
                    IsFieldVisibleMobile={this.props.IsFieldVisibleMobile}
                    IsFieldVisibleJoinDate={this.props.IsFieldVisibleJoinDate}
                    IsFieldVisibleBirthday={this.props.IsFieldVisibleBirthday} />
                {
                    (this.props.flag == 1 || this.props.flag == 2) &&
                    (<EmpTrainBGRD flag={this.props.flag} data={this.props.DataEmpTrainBGRD} />)
                }
                {
                    (this.props.flag == 1 || this.props.flag == 2) &&
                    (<EmpTrainCourse flag={this.props.flag} data={this.props.DataEmpTrainCourse} />)
                }
                {
                    (this.props.flag == 1 || this.props.flag == 2) &&
                    (<EmpWorking flag={this.props.flag} data={this.props.DataEmpWorking}
                         IsFieldVisibleJobPosNameOld = {this.props.IsFieldVisibleJobPosNameOld} />)
                }
                {
                    (this.props.flag == 1) &&
                    (<EmpBenefits data={this.props.DataEmpBenefits} />)
                }
                {
                    (this.props.flag == 1 || this.props.flag == 2) &&
                    (<EmpAward flag={this.props.flag} data={this.props.DataEmpAward} />)
                }
                {
                    (this.props.flag == 1 || this.props.flag == 2) &&
                    (<EmpDiscipline flag={this.props.flag} data={this.props.DataEmpDiscipline} />)
                }

                {
                    (this.props.flag == 1 || this.props.flag == 2) &&
                    (<EmpFortune flag={this.props.flag} data={this.props.DataEmpFortune} />)
                }
                {
                    (this.props.flag == 1 || this.props.flag == 2) &&
                    (<EmpInsurance flag={this.props.flag} data={this.props.DataEmpInsurance} />)
                }
            </View>
        )
    }
}
const mapStateToProps = state => ({
    LoginInfo: state.loginInfo
});
export default connect(mapStateToProps)(EmployeeProfile);
const styleGroup = Configs.Theme.Styles.Shared.ProfileGroup;
const styleContainer = Configs.Theme.Styles.Shared.PageContainer;