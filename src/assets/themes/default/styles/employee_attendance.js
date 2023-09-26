import { StyleSheet, Platform, Dimensions } from 'react-native';
import { HrmSizeScale } from '../../../../libs/HrmLibs';
import { Configs_Default } from '../config';


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const HEIGHT_SELECT = 40;
const CALENDAR_MIN_W = 250;
const BUTTON_TODAY_W = 120;
const TOTAL_ELEMENT = CALENDAR_MIN_W * 2;
const W_CALENDAR = TOTAL_ELEMENT >= DEVICE_WIDTH ? "100%" : "50%";
const MW_CALENDAR = TOTAL_ELEMENT >= DEVICE_WIDTH ? DEVICE_WIDTH : CALENDAR_MIN_W;
const MW_BUTTON_TODAY = TOTAL_ELEMENT >= DEVICE_WIDTH ? DEVICE_WIDTH : BUTTON_TODAY_W;
const H_HEADER = TOTAL_ELEMENT >= DEVICE_WIDTH ? (HEIGHT_SELECT * 2) : HEIGHT_SELECT;
const FLEX_END = TOTAL_ELEMENT >= DEVICE_WIDTH ? "center" : "flex-end";
const FLEX_START = TOTAL_ELEMENT >= DEVICE_WIDTH ? "center" : "flex-start";
export const EmployeeAttendance = {
    Page: StyleSheet.create({
        container: {
            backgroundColor: "#FFFFFF"
        },
        header: {
            height: H_HEADER,
            marginVertical: 10,
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 10
        },
        headerDepartment: {
            justifyContent: "flex-end"
        },
        calendar: {
            height: HEIGHT_SELECT,
            width: W_CALENDAR,
            minWidth: MW_CALENDAR - 20,
            flexDirection: "row",
            alignItems: "center",
            textAlign: "center",
            justifyContent: FLEX_START,
            marginBottom: 5,
        },
        actionDepartment: {
            height: HEIGHT_SELECT,
            width: W_CALENDAR,
            // minWidth: MW_CALENDAR - 20,
            minWidth: "auto",
            marginBottom: 5,
        },
        actionRight: {
            height: HEIGHT_SELECT,
            width: W_CALENDAR,
            minWidth: MW_CALENDAR - 20,
            justifyContent: "flex-end",
            alignItems: "center",
            // paddingLeft: 5
        },
        calendarArrow: {
            width: 35
        },
        calendarCenter: {
            width: 210,
            paddingBottom: 5,
            textAlign: "center",
            alignContent: "center",
            alignSelf: "flex-end"
        },
        left: {
            flex: 1,
            justifyContent: "flex-start"
        },
        center: {
            flex: 3,
            justifyContent: "center"
        },
        right: {
            flex: 1,
            justifyContent: "flex-end"

        },
        btnCalendar: {
            width: 30,
            height: "100%",
            justifyContent: "flex-end"
        },
        textDay: {
            color: Configs_Default.Color.COLOR_2,
            textAlign: "center",
        },
        iconCalendar: {
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            color: Configs_Default.Color.COLOR_2
        },
        addDay: {
            justifyContent: "center",
        },
        btnToday: {
            justifyContent: "center",
            backgroundColor: "#0084E6",
            paddingVertical: 5,
            paddingHorizontal: 20,
            borderRadius: 8,
            width: BUTTON_TODAY_W
        },
        textWhite: {
            color: Configs_Default.Color.Background,
            textAlign: "center",
        },
        content: {
            flex: 1,
            // flexDirection: "column"
        },
        searchBar: {
            height: 50,
            marginTop: 10,
            paddingHorizontal: 5,
            backgroundColor: '#FFFFFF',
            flexDirection: "row"
        },
        searchIcon: {
            margin: 5,
            paddingTop: 5,
            paddingBottom: 2,
            paddingLeft: 10,
            paddingRight: 8,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#B1DBEE",
            fontSize: 30,
            backgroundColor: 'transparent',
            color: '#666666',
        },
        topContent: {
            paddingLeft: 10,
            paddingVertical: 20,
            flexDirection: "row",
            alignItems: "center",
        },
        titleRight: {
            flex: 1,
            marginLeft: 5,
            textAlign: "center",
            alignItems: "center",
        },
        totalPresent: {
            fontWeight: "200",
            color: Configs_Default.Color.COLOR_2
        },
        presentText: {
            fontWeight: 'bold',
            fontStyle: 'italic'
        },
        listData: {
            flex: 1,
            paddingHorizontal: 10,
        },
        card: {
            borderRadius: 5,
            marginBottom: 10
        },
        cardItem: {
            borderRadius: 5,

        },
        fullName: {
            flex: 1,
            marginTop: 8
        },
        cbWrap: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
        },
        cbItem: {
            flex: 1,
            marginLeft: 20
        },
        iconMore: {
            textAlign: "right",
            marginLeft: 20,
            width: 25,
            transform: [{ rotate: '90deg' }]
        },
        iconMoreDisable: {
            color: "#ddd"
        },
        inline: {
            flexDirection: "row",
            alignItems: "center"
        },
        chkOutline: {
            width: 30,
            borderRadius: 30
        },
        status: {
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-end"
        },
        subTitle: {
            fontSize: 12,
            fontWeight: "100"
        },
        closeModal: {
            flex: 1
        },
        modalHeader: {
            backgroundColor: "#ffff",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingRight: 10,
            paddingHorizontal: 5
        },
        checkBar: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        btnCancel: {
            borderRadius: 5,
            margin: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: '#EEEEEE',
        },
        btnCancelText: {
            fontSize: 16,
            color: '#999999'
        },
        btnSubmit: {
            borderRadius: 5,
            margin: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: Configs_Default.Color.Secondary,
        },
        btnSubmitText: {
            fontSize: 16,
            color: '#FFFFFF'
        },
        groupContentValue: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        groupContentValueCircle: {
            height: 10,
            width: 10,
            borderRadius: 10,
            marginRight: 5
        },
        groupContentValueCircle1: {
            backgroundColor: Configs_Default.Color.Pending,
        },
        groupContentValueCircle2: {
            backgroundColor: Configs_Default.Color.Approved,
        },
        groupContentValueCircle3: {
            backgroundColor: Configs_Default.Color.Reject,
        },
        groupContentValueCircle5: {
            backgroundColor: Configs_Default.Color.Wait,
        },
        groupContentValueCircle6: {
            backgroundColor: Configs_Default.Color.Canceled,
        },
        modal: {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            flex: 1
        },
        subIcon: {
            fontSize: HrmSizeScale.fontSize(10),
            marginRight: 5,
        },
        subIconColor1: {
            color: Configs_Default.Color.Reject,
        },
        subIconColor0: {
            color: Configs_Default.Color.Canceled,
        },
    })
}