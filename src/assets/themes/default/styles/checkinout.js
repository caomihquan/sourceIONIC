import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Configs_Default } from '../config';

// import Dimensions from 'Dimensions';
// const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#ffffff"
        // height: 90,
        // backgroundColor: "#fff",
    },
    container: {
        backgroundColor: 'transparent'
    },
    //List menu check IN/OUT
    listItem: {
        flex: 1,
        // backgroundColor: "red",
        height: 60,
        flexDirection: 'row',
    },
    listItemIcon: {
        width: 60,
        // backgroundColor: "orange",
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItemIconDetail: {
        color: Configs_Default.Color.Secondary,
        fontSize: 60
    },
    listItemTitle: {
        flex: 1,
        // backgroundColor: "blue",
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    listItemTitleDetailTime: {
        color: "#999999",
        fontSize: 30
    },
    listItemTitleDetailDate: {
        color: "#999999",
        fontSize: 25
    },
    listItemTitleDetailText: {
        flex: 1,
        color: "#999999",
        fontSize: 20
    },

    viewCheckInOut: {
        paddingTop: 20,
        // backgroundColor: "blue",
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonCheckIn: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1DACE4',
    },
    buttonCheckInText: {
        color: "#FFFFFF"
    },
    buttonCheckOut: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EAEAEA',
    },
    buttonCheckOutText: {
        color: "#999999"
    },

    viewCheckInOutSuccess: {
        paddingTop: 20,
        // backgroundColor: "blue",
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkInOutSuccessIconContainer: {
        // backgroundColor: "blue",
        height: 150
    },
    checkInOutSuccessIcon: {
        color: "#1CABE3",
        fontSize: 150
    },
    checkInOutSuccessText1: {
        fontSize: 30,
        color: "#666666"
    },
    checkInOutSuccessText2: {
        fontSize: 20,
        color: "#999999"
    },

    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    }
});

export const CheckInOut = styles;