import React, { Component } from 'react';
import { View, Text,FlatList } from 'react-native';
import { Card, CardItem } from 'native-base';
import { connect } from 'react-redux';
import { Configs } from '../../../../AppConfig';
import FormatHandler from '../../handlers/FormatHandler';
class DynamicTemplate extends Component {
    ShowField=(lstField)=>{
        let result = null;
        let lstresult=null;
        if (lstField && lstField.length >0 && this.props.DataProps && this.props.DataProps.length >0)
        { 
            let detailValue =[styleGroup.detailValue];
            let detailTitle =[styleGroup.detailTitle];
            
            //duyet qua tung hang data tra ve tren sql
            let dataprops =[...this.props.DataProps];
                //duyệt qua từng dòng data trả về từ sql
            lstresult=dataprops.map((_item,_index)=>{
                result = lstField.map((item, index)=>{
                    if(item.Color && item.Color !== "")
                    {
                        color = {"color":item.Color}
                        detailValue.push(color);
                        detailTitle.push(color);
                    }
                    if(index===0)
                    {
                        detailValue.push(styleGroup.flexEnd);
                        detailTitle.push(styleGroup.flexStart);
                    }
                    return(
                        index===0? // hiển thị tên bên trái
                        (<Text key={index} style={detailTitle}>
                            {_item[item.FieldCode]}
                        </Text>)
                        : // hiển thị label bên phải
                        (
                            (!item.Format)?
                                <Text key={index} style={detailValue}>
                                {_item[item.FieldCode]}
                                </Text>
                            :
                            <Text numberOfLines={1} key={index} style={detailValue}>
                               {item.Format=="0"?FormatHandler.formatNum(_item[item.FieldCode], this.props.LoginInfo,"p")
                               :
                               FormatHandler.formatNum(_item[item.FieldCode], this.props.LoginInfo)
                               }
                            </Text>   
                        )
                    )
                });
                return (
                    <View key={_index} style={styles.itemContainer} onPress={this.props.onPress} activeOpacity={1}>
                        <View style={styleGroup.flexColumn} key={_index}>
                            <View key={_index} style={styleGroup.twoColumn}>{result}</View>
                        </View>
                  </View>
                )
            });
        }
        return lstresult;
    }
    render() {
        let {GroupName,lstField} = this.props;
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
                                this.props.DataProps && Object.keys(this.props.DataProps).length>0 && this.ShowField(lstField)
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
export default connect(mapStateToProps)(DynamicTemplate);
const styleGroup = Configs.Theme.Styles.Shared.ProfileGroup;
const styles = Configs.Theme.Styles.LeaveAndOT.MyLeaveRequest;
const styleLeave = Configs.Theme.Styles.Shared.CardLeave;
