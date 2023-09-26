import { StyleSheet, Platform } from 'react-native';
import { Configs_Default } from '../config';

export const Chat = {
    RoomChat: StyleSheet.create({
        wrapper: {
            flex: 1,
            backgroundColor: "#ffff",
        },
        header: {
            height: 70,
        },
        headerWrapper: {
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#F2942E",
        },
        info: {
            flex: 1,
            flexDirection: "column",
        },
        title: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            paddingLeft: 10,
            color: "#ffff",
            fontSize: 20,
            fontWeight: "800",
        },
        status: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            paddingLeft: 10,
            color: "#ffff",
            fontStyle: "italic",
            fontSize: 12,
        },
        btnBack: {
            marginLeft: 5,
            padding: 5,
            color: "#ffff",
            flex: 1,
            fontSize: 25,
        },
        content: {
            flex: 1,
            flexDirection: "row",
            marginBottom: 10,
            position: "relative"
        },
        flatList: {
            backgroundColor: "#C3C3C1",
        },
        notifiSend: {
            position: "absolute",
            bottom: 2,
            right: 2,
            flex: 1,
        },
        sending: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#9BD5F7",
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            color: "#fff",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10
        },
        footer: {
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: "#fff",
            paddingBottom: Platform.OS == "ios" ? 15 : 5
        },
        emojis: {
            width: "10%",
        },
        btnEmoji: {
            width: "100%",
            paddingTop: 5,
            paddingLeft: 10,
        },
        icon: {
            fontSize: 30,
        },
        input: {
            paddingTop: 5,
            width: "60%",
            borderRadius: 8,
        },
        buttons: {
            width: "30%",
            flexDirection: "row",
        },
        btn: {
            width: "33%",
            padding: 5,
        },
        colorBtn: {
            color: "#0190f3",
        },
        btnDisable: {
            color: "#c6c6c6"
        },
        paddingBtn: {
            padding: 10,
            marginRight: 5,
        },
        viewSub: {
            flex: 1,
        },
        viewImage: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            position: "relative",

        },
        cancelImg: {
            position: "absolute",
            top: 0,
            right: 5,
        },
        cancelIcon: { color: "#de4213" },
        image: {
            width: 150,
            height: 150,
        },
        groupBtn: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        send: {
            flex: 1,
            flexShrink: 1,
            flexDirection: "row",
            padding: 5,
            alignSelf: "flex-end",
        },
        receive: {
            flex: 1,
            flexShrink: 1,
            flexDirection: "row",
            padding: 5,
            alignSelf: "flex-start",
        },
        feedItem: {
            borderRadius: 5,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 8,
            flexDirection: "row",
            marginBottom: 5,
        },
        avatar: {
            width: 35,
            height: 35,
            borderRadius: 20,
            marginRight: 10,
        },
        contentSend: {
            flexDirection: "column",
            borderTopRightRadius: 10,
            borderBottomStartRadius: 10,
            backgroundColor: "#DAE9FF",
            padding: 10,
            minWidth: "30%",
            maxWidth: "80%",
        },
        contentReceive: {
            flexDirection: "column",
            borderTopLeftRadius: 10,
            borderBottomEndRadius: 10,
            backgroundColor: "#ffff",
            padding: 10,
            minWidth: "30%",
            maxWidth: "80%",
        },
        name: {
            fontWeight: "500",
            fontSize: 12,
        },
        text: {
            fontSize: 14,
            color: Configs_Default.Color.COLOR_5,
        },
        timestamp: {
            fontSize: 9,
            alignItems: "flex-end",
            marginBottom: -8,
            color: Configs_Default.Color.TextColor
        },
        borderImg: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 5
        },
        tinyImgae: {
            borderColor: "#fff",
            borderWidth: 2,
            width: 160,
            height: 150
        },
        line: {
            backgroundColor: "#eeeeea",
            height: 1,
            flex: 1,
            alignSelf: "center",
            width: "100%",
            paddingTop: 2,
        },
    }),
    ListItem: StyleSheet.create({
        listData: {
            backgroundColor: "#ffff",
            flex: 1,
        },
        flatList: {
            flex: 1,
            height: 200,
        },
        mainContainer: {
            justifyContent: 'center',
            flex: 1,
            margin: 10,
        },
        feedItem: {
            borderRadius: 5,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 8,
            flexDirection: "row",
            marginBottom: 5,
        },
        avatar: {
            width: 45,
            height: 45,
            borderRadius: 20,
            marginRight: 10,
        },
        content: {
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
        },
        name: {
            fontWeight: "500",
            fontSize: 14,
        },
        text: {
            color: Configs_Default.Color.TextColor,
            marginBottom: 4
        },
        line: {
            backgroundColor: Configs_Default.Color.TextColor,
            height: 1,
            flex: 1,
            alignSelf: "center",
            width: "100%",
            opacity: 0.5,
            marginRight: 2
        },
        status: {
            position: "absolute",
            bottom: 0,
            padding: 5,
            width: 15,
            height: 15,
            borderRadius: 15,
            right: 8,
            backgroundColor: "#b3b3b3",
            borderColor: "#ffff",
            borderWidth: 3,
        },
        online: {
            backgroundColor: "#351",
        },
    })
};