import { Text, View } from "native-base";
import React, { Component } from "react";
import { TextInput } from "react-native";
import { Configs } from "../../../AppConfig";


export default class HCSInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.inputContent}>
          <Text style={[styles.inputTextTitle]}>{this.props.placeholder}</Text>
          <TextInput
            style={[this.props.style, styles.inputTextValue]}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            onEndEditing={this.props.onEndEditing}
            editable={true}
            keyboardType="numeric"
            placeholderTextColor="#666666"
          />
        </View>

      </View>

    )
  }
}

const styles = Configs.Theme.Styles.Shared.HCSInput;