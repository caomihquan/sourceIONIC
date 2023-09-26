import { StyleSheet, Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Configs_Default } from '../config';


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const BORDER_RADIUS = 10;

export const Alert = {
    HrmProvider: StyleSheet.create({
        toastContainer: {
            backgroundColor: '#303031',
            paddingHorizontal: 20,
            paddingVertical: 15,
            marginHorizontal: 15,
            marginVertical: Platform.OS === 'ios' ? Constants.statusBarHeight : 10,
            borderRadius: 10,
        },
        top: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
        },
        bottom: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
        },
        modalContainer: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
        modal: {
            backgroundColor: '#fafbfc',
            paddingHorizontal: 20,
            marginHorizontal: 10,
        },
        title: {
            fontSize: 20,
        },
        body: {
            fontSize: 16,
        },
    }),

    AlertDialog: StyleSheet.create({
        modalOverlay: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        },
        wrapper: {
            flex: 1,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center'
        },
        content: {
            width: "80%",
            maxHeight: "80%",
            height: 500,
            margin: 10,
            paddingTop: 15,
            borderRadius: BORDER_RADIUS,
            alignItems: 'center',
            backgroundColor: Configs_Default.Color.Background,
        },
        contentProvider: {
            maxWidth: Platform.OS === 'ios' ? '90%' : '80%',
            maxHeight: "80%",
            margin: 10,
            paddingTop: 10,
            borderRadius: BORDER_RADIUS,
            alignItems: 'center',
            backgroundColor: Configs_Default.Color.Background,
        },
        header: {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
        },
        body: {
            flex: 1,
            height: 400,
            flexDirection: "row",
        },
        bodyProvider: {
            paddingBottom: 10,
            paddingHorizontal: 15,
        },
        footer: {
            height: 50,
            borderTopWidth: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            borderBottomStartRadius: 8,
            borderBottomEndRadius: 8,
            borderTopColor: Configs_Default.Color.COLOR_12
        },
        text: {
            fontSize: 18,
            fontWeight: "normal",
            marginBottom: 5,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            color: Configs_Default.Color.COLOR_7
        },
        textHeader: {
            color: Configs_Default.Color.AlertText,
        },
        textBody: {
            fontSize: 16,
            textAlign: 'center',
            color: Configs_Default.Color.AlertText,
        },
        textBodyToast: {
            color: '#FAFAFA',
        },
        textButton: {
            fontSize: 17
        },
        midline: {
            width: 1,
            height: "100%",
            backgroundColor: Configs_Default.Color.COLOR_12,
        },
        button: {
            width: "50%",
            alignSelf: "center",
            justifyContent: "center",
            color: Configs_Default.Color.COLOR_10
        },
        buttonCancel: {
            borderRightWidth: 1,
            borderRightColor: Configs_Default.Color.COLOR_12
        },
        buttonOnly: {
            width: "100%",
            alignSelf: "center",
            justifyContent: "center",
            color: Configs_Default.Color.COLOR_10
        },
        search: {
            height: 50,
            backgroundColor: '#FFFFFF',
            flexDirection: "row"
        },
        searchBar: {
            borderRadius: 9999,
            marginLeft: 10,
            marginRight: 10
        },
        combobox: {
            flex: 1,
            padding: 5
        },
        comboboxItem: {
            flex: 1,
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#ccc"
        },
        comboboxItemCheckbox: {
            width: 50,
            margin: 0,
            padding: 0,
            minHeight: 70,
            height: "auto",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
        },
        comboboxItemNoCheckbox: {
            paddingLeft: 20,
            minHeight: 70,
        },
        comboboxItemContent: {
            flex: 1,
            justifyContent: "center",
        },
        comboboxItemText: {
            fontSize: 16
        },
        comboboxItemTextOpacity: {
            opacity: 0.5
        },
        modalLoading: {
            marginHorizontal: DEVICE_WIDTH * .5 - DEVICE_WIDTH * .2 + 17
        },
        groupContentControl: {
            flexDirection: 'row',
            justifyContent: "flex-start",

        },
        groupContentSearch: {
            flex: 1,
            height: 55,
        },
        groupContentCheckbox: {
            width: 60,
            height: 55,
        },
    })

}