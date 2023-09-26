import React, { Component } from 'react';
import {View, TouchableOpacity } from 'react-native';


export default class Button extends Component {
    render() {
        return (
          	<TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
		      	{this.props.children}
		    </TouchableOpacity>
        );
    }
}
// const styles = Configs.Theme.Styles.Shared.HomeNavBar;


