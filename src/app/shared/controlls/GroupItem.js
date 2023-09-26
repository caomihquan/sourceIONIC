import { Card, CardItem, Text } from 'native-base';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Configs } from '../../../AppConfig';

export default class GroupItem extends PureComponent {
  render() {
    return (
      <View style={styles.groupLeave}>
        <Card style={styleLeave.wrapper}>
          <CardItem header bordered style={styleLeave.header}>
            <View style={styleLeave.headerContent}>
              <Text style={styleLeave.headerContentLeft}>{this.props.name}</Text>
              {
                this.props.info &&
                <Text style={styleLeave.headerContentRight}>
                  {this.props.info}
                </Text>
              }
            </View>
          </CardItem>

          <CardItem style={styleLeave.body}>
            <View style={styleLeave.bodyContent}>
              {this.props.children}
            </View>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = Configs.Theme.Styles.LeaveAndOT.MyLeaveRequest;
const styleLeave = Configs.Theme.Styles.Shared.CardLeave;