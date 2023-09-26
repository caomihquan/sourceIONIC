import { StyleSheet, Dimensions } from 'react-native';
import { Configs_Default } from '../config';
import { Content } from 'native-base';
import { HrmSizeScale } from '../../../../libs/HrmLibs';


const BUTTON_SIZE = HrmSizeScale.wSize(50);
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
export const Screens = {
    NotificationList: StyleSheet.create({
        searchField: {
            height: 50,
            backgroundColor: '#FFFFFF',
        },
        list: {
            flex: 1,
            backgroundColor: '#FAFAFA',
        },
        notification: {
            height: 60,
            flexDirection: 'row'
        },
        notificationSent: {
            backgroundColor: '#EEEEEE',
        },
        notificationType: {
            width: 60,
            backgroundColor: '#EEEEEE',
            borderRadius: 60,
            justifyContent: 'center',
            alignItems: 'center',
        },
        notificationIcon: {
            color: '#048cc8',
            fontSize: 40,
        },
        notificationIconSent: {
            color: '#B2B2B2',
            fontSize: 40,
        },
        notificationContent: {
            flex: 1,
            paddingLeft: 10,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        title: {
            fontSize: 20,
            paddingBottom: 5,
            color: Configs_Default.Color.TextColor
        },
        description: {
            fontSize: 15,
            paddingBottom: 5,
            color: Configs_Default.Color.TextColor
        },
        notificationBar: {
            width: 120,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        },
        notificationButtonEmpty: {
            flex: 1,
        },
        notificationButton1: {
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 2,
            borderColor: '#cccccc'
        },
        notificationButton2: {
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
        },
        notificationButton: {
            fontSize: 16
        },
        btnView: {
            color: '#048cc8'
        },
        btnSend: {
            color: '#B2B2B2'
        },
        btnDelete: {
            color: '#FC5555'
        },
    }),
    CheckInOut: StyleSheet.create({
        modal: {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            flex: 1
        },
        wrapper: {
            flex: 1,
            flexDirection: 'column'
        },
        checkInfo: {
            height: 150,
            marginTop: 10,
            borderWidth: 1,
            borderColor: '#CCCCCC',
        },
        checkAddress: {
            flex: 1,
            // minHeight: 50,
            borderBottomWidth: 1,
            borderColor: '#CCCCCC',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            paddingHorizontal: 16,
            flexWrap: 'wrap',
        },
        checkAddressIcon: {
            paddingLeft: 10,
            paddingRight: 5,
            paddingVertical: 10,
            color: Configs_Default.Color.Primary,
        },
        checkAddressText: {
            // flex: 1,
            fontSize: 16,
            fontWeight: 'bold',
            paddingVertical: 10,
            paddingHorizontal: 5,
            textAlign: 'center',
            color: Configs_Default.Color.TextColor,
        },
        checkTime: {
            flex: 1,
            flexDirection: 'row',
        },
        checkTimeInOut: {
            flex: 1,
            // minHeight: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        borderRight: {
            borderRightWidth: 1,
            borderColor: '#CCCCCC',
        },
        checkTimeTitle: {
            fontSize: 13,
            color: '#999999',
        },
        checkTimeValue: {
            fontSize: 18,
            color: Configs_Default.Color.Primary,
            fontWeight: 'bold'
        },
        checkBar: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        btnCheckIn: {
            borderRadius: 2,
            margin: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: Configs_Default.Color.Secondary,
        },
        btnCheckInText: {
            fontSize: 16,
            color: '#FFFFFF'
        },
        btnCheckOut: {
            borderRadius: 2,
            margin: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: '#EEEEEE',
        },
        btnCheckOutText: {
            fontSize: 16,
            color: '#999999'
        },


        checkContainer: {
            flex: 1,
            padding: 30,
            marginTop: 10,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
        },
        checkControl: {
            width: "100%",
            height: "100%",
            maxWidth: 500,
            maxHeight: 500,
            borderWidth: 7,
            borderRadius: 9999,
            borderColor: "#EEEEEE",
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
        },
        checkControlInfo: {
            color: '#999999',
            fontSize: 15
        },
        checkControlHours: {
            color: Configs_Default.Color.Primary,
            fontSize: 30,
            fontWeight: 'bold'
        },
        checkContainerQR: {
            marginTop: 30,
            height: 250,
            justifyContent: 'center',
            alignItems: 'center',
        },
        checkControlQR: {
            borderColor: "#EEEEEE",
            width: 250,
            height: 250,
            justifyContent: 'center',
            alignItems: 'center',
        },

        selectContainer: {
            height: 65,
            backgroundColor: '#ffffff',
            padding: 10
        },


        timelineContainer: {
            // paddingTop: 10
        },
        timeContainer: {
            width: 75,
            marginTop: -30,
            alignItems: 'center',
        },
        dateNumContainer: {
            // borderWidth: 1,
            height: 40,
            width: 40,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
        },
        backgroundIsWeekend: {
            backgroundColor: '#F79830'
        },
        backgroundIsDayOff: {
            backgroundColor: '#2A9FDA'
        },
        backgroundWork: {
            backgroundColor: '#7DBC42'
        },
        backgroundEmpty: {
            backgroundColor: '#C2C2C2'
        },
        timeDateName: {
            // borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        },
        timeDateNumber: {
            color: 'white',
            fontWeight: 'bold'
        },

        timelineDetailContainer: {
            // flex: 1,
            top: -50,
            height: 50,
            // borderWidth: 1,
        },
        timelineDetailTime: {
            height: 20,
            flexDirection: 'row',
            bottom: -5
        },
        timelineDetailTimeBegin: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            textAlign: 'left'
        },
        timelineDetailTimeEnd: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            textAlign: 'right'
        },
        timelineDetailTimeChart: {
            flex: 1,
            // borderWidth: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
        },
        timelineChartPercent: {
            height: 40,
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        timelineDescription: {
            // width: 300,
            zIndex: 100,
            top: 15,
            paddingLeft: 5,
            color: 'white',
            fontWeight: 'bold',
        },
        timelineChartEmpty: {
            height: 40,
        },
        marginDateMap: {
            height: 100,
            marginTop: 10,
            marginBottom: 10
        },
        wrapperMarker: {
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'column',
            textAlign: 'center'
        },
        titleCallout: {
            fontWeight: 'bold',
            textAlign: 'center'
        }
    }),
    MyTimesheet: StyleSheet.create({
        toolbar: {
            height: 40,
            marginTop: 10,
            marginBottom: 10,
            flexDirection: 'row'
        },
        selectMonth: {
            flex: 5,
            borderWidth: 1,
            marginRight: 10,
            borderRadius: 5,
            borderColor: Configs_Default.Color.Primary,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        selectOption: {
            flex: 4,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Configs_Default.Color.Primary,
            flexDirection: 'row',
        },

        selectOptionButton1: {
            flex: 1,
            height: 38,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: -1
        },
        selectOptionButton1Text: {
            color: Configs_Default.Color.Primary,
        },
        selectOptionButton2: {
            flex: 1,
            height: 38,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: -1
        },
        selectOptionButton2Text: {
            color: Configs_Default.Color.Primary,
        },
        buttonSelected: {
            backgroundColor: Configs_Default.Color.Primary,
        },
        buttonSelectedText: {
            color: "#FFFFFF",
        },
        btnChangeMonth: {
            width: 30,
            height: 38,
            justifyContent: 'center',
            alignItems: 'center',
        },
        btnChangeMonthIcon: {
            fontSize: 20,
            color: Configs_Default.Color.Primary,
        },
        txtMonth: {
            flex: 1,
            textAlign: 'center',
            color: Configs_Default.Color.Primary,
            fontSize: 16
        },
        cardCalendar: {
            flex: 1,
        },
        cardCalendarItem: {
            padding: 0,
            margin: 0,
            flex: 1,
        },
        date: {
            flex: 1,
            position: "relative",
            paddingBottom: 65
        },
        note: {
            marginLeft: -30,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderWidth: 1,
            paddingLeft: 20,
            borderColor: "#DFDFDF",
            backgroundColor: '#ffffff',
            flexDirection: 'row',
            position: "absolute",
            bottom: -10,
            paddingBottom: 5,
        },
        noteDetail: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: "wrap"
        },
        wrapperCircle: {
            flexDirection: "row",
            paddingTop: 5,
        },
        iconCircle: {
            height: 24,
            width: 24,
            borderRadius: 12,
        },
        iconCircleInfo: {
            fontSize: 35,
            width: 40,
            height: 40,
            paddingTop: 2,
            marginRight: -6,
            color: Configs_Default.Color.Primary,
        },
        txtNote: {
            color: Configs_Default.Color.TextColor,
            paddingRight: 10,
            paddingLeft: 5,
            fontSize: 13
        },
        txtGroupHeader: {
            paddingTop: 20,
            paddingBottom: 20,
            fontSize: 22,
            color: Configs_Default.Color.TextColor
        },
        leaveList: {
            flex: 1,
            height: 70,
            flexDirection: 'row',
            marginRight: -10,
            marginLeft: -10,
        },
        leaveListCustom: {
            flex: 1,
            height: 280,
            flexDirection: 'row',
            marginRight: -10,
            marginLeft: -10,
        },
        leaveListContainer: {
            flex: 1,
        },
        btnNextLeaveContainer: {
            // flex: 1,
            width: 30
        },
        btnNextLeave: {
            width: 30,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        },
        btnNextLeaveIcon: {
            fontSize: 25,
            paddingLeft: 15,
            color: Configs_Default.Color.Primary,
        },
        leaveListScroll: {
            flex: 1
        },
        avatar: {
            height: 60,
            width: 60,
            padding: 10,
            borderRadius: 30,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginRight: 10,
            marginLeft: 10,
            borderColor: "#dfdfdf"
        },
        imgAvatar: {
            height: 60,
            width: 60,
            borderRadius: 30,
        },
        listEmpWrapper: {
            borderLeftWidth: 5,
            flex: 1
        },
        listEmpLeave: {
            borderColor: "#FB9D36",
        },
        listEmpOvertime: {
            borderColor: "#0088CF",
        },
        listEmp: {
            flex: 1,
        },
        empItem: {
            height: 80,
            borderBottomWidth: 1,
            borderColor: "#dfdfdf",
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        },
        empItemLast: {
            borderBottomWidth: 0,
        },
        empItemAvatar: {
            height: 60,
            width: 60,
            borderRadius: 30,
            borderWidth: 1
        },
        empItemInfo: {
            flex: 1
        },
        empItemInfoName: {
            fontSize: 20,
            color: Configs_Default.Color.TextColor
        },
        empItemInfoDetail: {
            fontSize: 15,
            color: "#999999"
        },
        empItemDaynums: {
            width: 80,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
        empItemDaynumsText: {
            color: '#FB9D36',
            fontSize: 15,
        },
        circleWork: {
            backgroundColor: Configs_Default.Color.Work,
        },
        circleHoliday: {
            backgroundColor: Configs_Default.Color.Holiday,
        },
        circleLeave: {
            backgroundColor: Configs_Default.Color.Leave,
        },
        circleTravel: {
            backgroundColor: Configs_Default.Color.Travel,
        },
        circleMissing: {
            backgroundColor: Configs_Default.Color.Missing,
        },
        circleLateEarly: {
            backgroundColor: Configs_Default.Color.LateEarly,
        },
        circleLateEarlyAndMissing: {
            backgroundColor: Configs_Default.Color.LateEarlyAndMissing,
        },
        circleThieuCong: {
            backgroundColor: "#FFFF00",
        },
        circleCurrent: {
            backgroundColor: "#A9A9A9",
        },
        circleText: {
            color: "#FFFFFF"
        },
        circleText: {
            color: "#FFFFFF"
        },
        CheckBoxContent: {
            width: "100%",
            paddingVertical: 20
        },
        groupControlCheckBox: {
            flexDirection: 'row',
            width: "100%",
            paddingVertical: 10,
        },
        controlCheckBox: {
            width: 40,
            flexDirection: 'row',
        },
        controlLabel: {
            flexDirection: 'row'
        },
        checkBox: {
            borderRadius: 50
        }
    }),
    MyPaystub: StyleSheet.create({
        selectContainer: {
            height: 50,
            marginTop: 10,
            marginBottom: 10,
            // backgroundColor: 'red'
        },
        detailTitle: {
            flex: 1,
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
        },
        detailValue: {
            flex: 1,
            textAlign: 'right',
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
            fontWeight: 'bold',
        },
        sumSalary: {
            height: 50,
            borderRadius: 5,
            flexDirection: 'row',
            backgroundColor: '#e1f3fa',
            borderColor: Configs_Default.Color.Primary,
            marginBottom: 10,
            marginHorizontal: 8,
            marginTop: 10
        },
        sumSalaryTitleContainer: {
            flex: 1,
            paddingLeft: 10,
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        sumSalaryTitle: {
            color: '#999999',
            fontSize: 15,
        },
        sumSalaryNumberContainer: {
            flex: 1,
            paddingRight: 10,
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
        },
        sumSalaryNumber: {
            fontSize: 22,
            fontWeight: 'bold',
            color: Configs_Default.Color.Primary,
        },
        sumSalaryUnit: {
            fontSize: 14,
            fontWeight: 'bold',
            color: Configs_Default.Color.Primary,
            marginTop: -10
        }
    }),

    News: StyleSheet.create({
        searchField: {
            height: 50,
            backgroundColor: '#FFFFFF',
        },
        wrapperTab: {
            width: DEVICE_WIDTH,
            backgroundColor: '#FFFFFF',
        },
        tabs: {
            padding: 5,
            height: 50,
            flexDirection: 'row',
        },
        list: {
            flex: 1,
            height: DEVICE_HEIGHT,
            backgroundColor: '#FAFAFA',
        },
        wrapper: {
            borderBottomWidth: 1,
            borderColor: '#DFDFDF',
            flexDirection: 'column',
            paddingTop: 10,
            paddingBottom: 10,
            marginLeft: 10,
            marginRight: 10
        },
        titleColor: {
            color: Configs_Default.Color.Primary,
            fontSize: 18
        },
        tabContainer: {
            flex: 1,
            borderWidth: 2,
            borderColor: '#dddddd',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginHorizontal: 5,
            borderRadius: 20,
        },
        tabContainerSelect: {
            backgroundColor: Configs_Default.Color.COLOR_11,
        },
        fistTab: {
            marginLeft: 0,
        },
        lastTab: {
            marginRight: 0
        },
        btnTab: {
            fontSize: 16,
            color: Configs_Default.Color.COLOR_10,
            textAlign: "center"
        },
        btnTabSelect: {
            color: Configs_Default.Color.Background,
        },
        newsContainer: {
            marginTop: 10,
            height: 70,
            borderBottomWidth: 1,
            borderColor: '#dfdfdf',
            paddingBottom: 10,
            flexDirection: 'row'
        },
        newsImage: {
            width: 80,
            height: 60
        },
        newsDetail: {
            flex: 1,
            flexDirection: "column",
            paddingHorizontal: 10
        },
        newsDetailText: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: -5
        },
        newsDetailTime: {
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            marginBottom: -5
        },
        newsDetailIcon: {
            fontSize: 14,
            color: '#AAA',
            //color: Configs_Default.Color.TextColor,
            marginBottom: 2,
            marginRight: 5
        },
        newsDetailTextTime: {
            fontSize: 14,
            color: '#AAA',
            //color: Configs_Default.Color.TextColor,
            marginRight: 10
        },
        newsDetailIconAttach: {
            fontSize: 14,
            color: Configs_Default.Color.Primary,
            marginBottom: 2,
            marginRight: 5
        },
        newsDetailTextAttach: {
            fontSize: 14,
            color: Configs_Default.Color.Primary,
            marginRight: 10
        },
        newsDetailHeader: {
            color: Configs_Default.Color.Primary,
            marginHorizontal: 5,
            marginTop: 5,
            padding: 10,
            fontWeight: "bold",
            backgroundColor: "#E1F3FA"
        },
        timeNotifi: {
            color: Configs_Default.Color.TextColor,
            fontSize: 12,
            fontStyle: "italic"
        },
        titleNotifi: {
            color: Configs_Default.Color.TextColor,
            fontSize: 13,
            marginBottom: 3
        },
        newsDetailWebview: {
            flex: 1,
        },
        newsButton: {
            width: 50,
            height: 60,
            justifyContent: 'center',
            alignItems: 'flex-end',
        },
        newsButtonText: {
            color: Configs_Default.Color.Primary,
            fontSize: 16
        },
        newsFooter: {
            paddingTop: 5,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
        },
        newsFooterItem: {
            fontSize: 16,
            color: Configs_Default.Color.Primary,
        },
        noData: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        contentContainer: {
            paddingHorizontal: 10,
            paddingBottom: 0,
            marginBottom: 0
        },
        btnAttach: {
            position: "absolute",
            bottom: 25,
            right: 15,
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: Configs_Default.Color.Primary,
            alignItems: "center",
            justifyContent: "center"
        },
        iconAttach: {
            fontSize: 25,
            color: Configs_Default.Color.Background,
        },
        modalWrapper: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        modalContainer: {
            height: DEVICE_HEIGHT / 2,
            width: DEVICE_WIDTH - 10,
            paddingLeft: 0,
            marginHorizontal: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
            borderLeftColor: "#D0D0D0"
        },
        modalHeader: {
            height: 40,
            backgroundColor: '#f5f5f5',
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottomColor: "#D0D0D0",
            borderBottomWidth: 0.5,
            marginBottom: -1,
            flexDirection: "row",
            paddingRight: 15
        },
        title: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
            margin: 5,
            borderBottomColor: "#D0D0D0",
            borderBottomWidth: 1
        },
        headerLeft: {
            flex: 8
        },
        headerRight: {
            flex: 1
        },
        modalContent: {
            flex: 1,
            backgroundColor: Configs_Default.Color.Background,
        },
        cardList: {
            borderRadius: 10,
            padding: 2,
            borderColor: "#FFFFFF"
        },
        itemWrapper: {
            marginTop: 10,
            height: 70,
            borderBottomWidth: 1,
            borderColor: '#dfdfdf',
            paddingBottom: 10,
            flexDirection: 'row'
        },
        itemFile: {
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: 10
        },
        leftItem: {
            flex: 9,
            justifyContent: "flex-start"
        },
        rightItem: {
            flex: 1,
            justifyContent: "center"
        },
        textFile: {
            marginTop: 15,
            justifyContent: "center",
            alignItems: "center"
        },
        btnDowload: {
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Configs_Default.Color.Primary,
        },
        iconDowload: {
            fontSize: 15,
            color: Configs_Default.Color.Background,
        },
        btnCancelText: {
            color: Configs_Default.Color.TextColor
        },
        status: {
            fontSize: 13,
            fontStyle: "italic",
            color: Configs_Default.Color.Primary,
            marginTop: 3
        },
        active: {
            color: Configs_Default.Color.TextColor
        },
        btnCancelListReply: {
            paddingHorizontal: 20,
            paddingVertical: 5
        },
        htmlContent: {
            marginTop: 10,
            padding: 10
        }
    }),
    MyTeam: StyleSheet.create({
        searchField: {
            height: 50,
            backgroundColor: '#FFFFFF',
        },
        tabs: {
            height: 50,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row'
        },
        list: {
            flex: 1,
            backgroundColor: '#F8F8F8',
        },
        bgGray: {
            backgroundColor: "#FAFAFA",
        },
        toolbar: {
            height: 40,
            marginTop: 10,
            marginBottom: 10,
            flexDirection: 'row'
        },
        selectMonth: {
            flex: 5,
            borderWidth: 1,
            marginRight: 10,
            borderRadius: 5,
            borderColor: Configs_Default.Color.Primary,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        selectOption: {
            flex: 4,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Configs_Default.Color.Primary,
            flexDirection: 'row',
        },

        selectOptionButton1: {
            flex: 1,
            height: 38,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: -1
        },
        selectOptionButton1Text: {
            color: Configs_Default.Color.Primary,
        },
        selectOptionButton2: {
            flex: 1,
            height: 38,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: -1
        },
        selectOptionButton2Text: {
            color: Configs_Default.Color.Primary,
        },
        buttonSelected: {
            backgroundColor: Configs_Default.Color.Primary,
        },
        buttonSelectedText: {
            color: "#FFFFFF",
        },
        btnChangeMonth: {
            width: 30,
            height: 38,
            justifyContent: 'center',
            alignItems: 'center',
        },
        btnChangeMonthIcon: {
            fontSize: 20,
            color: Configs_Default.Color.Primary,
        },
        txtMonth: {
            flex: 1,
            textAlign: 'center',
            color: Configs_Default.Color.Primary,
            fontSize: 16
        },
        cardCalendar: {
            flex: 1
        },
        cardCalendarItem: {
            padding: 0,
            margin: 0,
            flex: 1,
        },
        date: {
            flex: 1
        },
        note: {
            height: 40,
            marginLeft: -30,
            marginRight: 50,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderWidth: 1,
            paddingLeft: 20,
            borderColor: "#DFDFDF",
            backgroundColor: '#ffffff',
            flexDirection: 'row',
        },
        noteDetail: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
        },
        iconCircle: {
            height: 24,
            width: 24,
            borderRadius: 12,
        },
        iconCircleInfo: {
            fontSize: 35,
            width: 40,
            height: 40,
            paddingTop: 2,
            marginRight: -6,
            color: Configs_Default.Color.Primary,
        },
        txtNote: {
            color: Configs_Default.Color.TextColor,
            paddingRight: 10,
            paddingLeft: 5,
            fontSize: 13
        },
        txtGroupHeader: {
            paddingTop: 20,
            paddingBottom: 20,
            fontSize: 20,
            color: Configs_Default.Color.Primary
        },
        leaveList: {
            flex: 1,
            height: 70,
            flexDirection: 'row',
            marginRight: -10,
            marginLeft: -10,
        },
        leaveListContainer: {
            flex: 1,
        },
        btnNextLeaveContainer: {
            // flex: 1,
            width: 30
        },
        btnNextLeave: {
            width: 30,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        },
        btnNextLeaveIcon: {
            fontSize: 25,
            paddingLeft: 15,
            color: Configs_Default.Color.Primary,
        },
        leaveListScroll: {
            flex: 1
        },
        avatar: {
            height: 60,
            width: 60,
            padding: 10,
            borderRadius: 60,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginRight: 10,
            borderColor: "#dfdfdf"
        },
        imgAvatar: {
            height: 60,
            width: 60,
            borderRadius: 30,
        },
        cardList: {
            borderRadius: 10,
            padding: 2,
            borderColor: "#FFFFFF"
        },
        listEmpWrapper: {
            flex: 1,
        },
        listEmp: {
            flex: 1,
        },
        empItem: {
            minHeight: 80,
            height: "auto",
            borderBottomWidth: 1,
            borderColor: "#dfdfdf",
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        empItemLast: {
            borderBottomWidth: 0,
        },
        empItemAvatar: {
            height: 60,
            width: 60,
            borderRadius: 30,
            borderWidth: 1
        },
        empItemView: {
            flex: 1,
            flexDirection: "column",
        },
        empItemInfo: {
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 5
        },

        empItemInfoName: {
            fontSize: 18,
            color: Configs_Default.Color.TextColor,
            justifyContent: "center"
        },
        empItemInfoDetail: {
            fontSize: 15,
            color: "#999999",
            flex: 1,

        },
        empItemInfoJob: {
            fontSize: 13,
            color: "#999999",
            justifyContent: "center",
            paddingLeft: 5,
        },
        empItemDaynums: {
            flexDirection: "row",
            flex: 1
        },
        empItemDaynumsText: {
            color: '#FB9D36',
            fontSize: 15,
        },
        empBirthday: {
            color: '#999999',
            flex: 1,
            fontSize: 14,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            textAlign: "right"
        },
        temp: {
            fontSize: 14,
            padding: 5,
            justifyContent: "flex-end",
            flex: 1,
        },
        noData: {
            flex: 1,
        },
        noPaddingTop:
        {
            paddingTop: 10
        },
        empItemLeft: {
            flex: 1,
            justifyContent: "flex-start",
            marginBottom: 5
        },
        empItemRight: {
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 5
        },
        empGroupLeftName: {
            flex: 0.7,
            justifyContent: "flex-start",
            marginBottom: 5,
            flexDirection: "column",
        },
        empGroupRightName: {
            flex: 0.3,
            justifyContent: "flex-end",
            marginBottom: 5,
            flexDirection: "column",
        },
        empGroupRightNameText: {
            color: '#999999',
            flex: 1,
            fontSize: HrmSizeScale.wSize(13),
            justifyContent: "flex-end",
            textAlign: "right"
        },
        empGroupInfoLeft: {
            flex: 0.6,
            marginBottom: 5
        },
        empGroupInfoRight: {
            flex: 0.4,
            marginBottom: 5
        },
        empGroupInfoLeftItem: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        empGroupInfoIcon: {
            fontSize: 8,
            width: 10,
            textAlign: "center",
            lineHeight: HrmSizeScale.wSize(18),
        },
        empGroupInfoJob: {
            fontSize: 13,
            color: "#999999",
            textAlign: "right",
            justifyContent: "flex-end"
        },
        textAlignRight: {
            textAlign: "right",
        },
        flex_1: {
            flex: 1,
        },
        flexDirection_row: {
            flexDirection: 'row',
        },
    }),
    EmployeeDirectory: StyleSheet.create({
        searchField: {
            height: 50,
            backgroundColor: '#FFFFFF',
            flexDirection: "row"
        },
        qrSearch: {

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
        tabs: {
            height: 50,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row'
        },
        tabContainer: {
            flex: 1,
            borderBottomWidth: 5,
            borderColor: '#dddddd',
            justifyContent: 'center',
            alignItems: 'center'
        },
        tabDetailContainer: {
            flex: 1
        },
        tabContainerSelect: {
            borderColor: Configs_Default.Color.Primary,
        },
        btnTab: {
            fontSize: 16,
            color: Configs_Default.Color.TextColor
        },
        btnTabSelect: {
            color: Configs_Default.Color.Primary,
        },

        list: {
            flex: 1,
        },
        bgGray: {
            backgroundColor: "#FAFAFA"
        },
        toolbar: {
            height: 40,
            marginTop: 10,
            marginBottom: 10,
            flexDirection: 'row'
        },
        selectMonth: {
            flex: 5,
            borderWidth: 1,
            marginRight: 10,
            borderRadius: 5,
            borderColor: Configs_Default.Color.Primary,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        selectOption: {
            flex: 4,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Configs_Default.Color.Primary,
            flexDirection: 'row',
        },

        selectOptionButton1: {
            flex: 1,
            height: 38,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: -1
        },
        selectOptionButton1Text: {
            color: Configs_Default.Color.Primary,
        },
        selectOptionButton2: {
            flex: 1,
            height: 38,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: -1
        },
        selectOptionButton2Text: {
            color: Configs_Default.Color.Primary,
        },
        buttonSelected: {
            backgroundColor: Configs_Default.Color.Primary,
        },
        buttonSelectedText: {
            color: "#FFFFFF",
        },
        btnChangeMonth: {
            width: 30,
            height: 38,
            justifyContent: 'center',
            alignItems: 'center',
        },
        btnChangeMonthIcon: {
            fontSize: 20,
            color: Configs_Default.Color.Primary,
        },
        txtMonth: {
            flex: 1,
            textAlign: 'center',
            color: Configs_Default.Color.Primary,
            fontSize: 16
        },
        cardCalendar: {
            flex: 1
        },
        cardCalendarItem: {
            padding: 0,
            margin: 0,
            flex: 1,
        },
        date: {
            flex: 1
        },
        note: {
            height: 40,
            marginLeft: -30,
            marginRight: 50,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderWidth: 1,
            paddingLeft: 20,
            borderColor: "#DFDFDF",
            backgroundColor: '#ffffff',
            flexDirection: 'row',
        },
        noteDetail: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
        },
        iconCircle: {
            height: 24,
            width: 24,
            borderRadius: 12,
        },
        iconCircleInfo: {
            fontSize: 35,
            width: 40,
            height: 40,
            paddingTop: 2,
            marginRight: -6,
            color: Configs_Default.Color.Primary,
        },
        txtNote: {
            color: Configs_Default.Color.TextColor,
            paddingRight: 10,
            paddingLeft: 5,
            fontSize: 13
        },
        listEmpPrefixWrapper: {
            paddingBottom: 20
        },
        cardBorder: {
            borderRadius: 10,
            padding: 1,
            borderColor: "#FFFFFF"
        },
        txtGroupHeader: {
            paddingTop: 20,
            paddingBottom: 20,
            fontSize: 20,
            color: Configs_Default.Color.Primary
        },
        txtGroupHeaderBold: {
            fontWeight: "bold",
            textAlign: "center",
        },
        txtGroupHeaderPrefixContainer: {
            // borderWidth: 1,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 20,
            backgroundColor: Configs_Default.Color.Primary,
            marginLeft: 25
        },
        txtGroupHeaderPrefix: {
            // borderWidth: 1,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontSize: 20,
            borderRadius: 20,
            paddingTop: 6,
            color: "#FFFFFF",
            fontWeight: 'bold'
        },
        leaveList: {
            flex: 1,
            height: 70,
            flexDirection: 'row',
            marginRight: -10,
            marginLeft: -10,
        },
        leaveListContainer: {
            flex: 1,
        },
        btnNextLeaveContainer: {
            // flex: 1,
            width: 30
        },
        btnNextLeave: {
            width: 30,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        },
        btnNextLeaveIcon: {
            fontSize: 25,
            paddingLeft: 15,
            color: Configs_Default.Color.Primary,
        },
        leaveListScroll: {
            flex: 1
        },
        avatar: {
            height: 60,
            width: 60,
            padding: 10,
            borderRadius: 60,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginRight: 10,
            borderColor: "#dfdfdf"
        },
        imgAvatar: {
            height: 60,
            width: 60,
            borderRadius: 30,
        },
        listEmpWrapper: {
            flex: 1
        },
        listEmp: {
            flex: 1,
        },
        empItem: {
            height: 80,
            borderBottomWidth: 1,
            borderColor: "#dfdfdf",
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        empItemLast: {
            borderBottomWidth: 0,
        },
        empItemAvatar: {
            height: 40,
            width: 40,
            borderRadius: 30,
            borderWidth: 1
        },
        empItemView: {
            flex: 1,
            flexDirection: "column"
        },
        empItemInfo: {
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 5
        },
        empItemInfoName: {
            fontSize: 18,
            color: Configs_Default.Color.TextColor
        },
        empItemInfoDetail: {
            flex: 1,
            flexDirection: "row",
            fontSize: 12,
            color: "#999999"
        },

        empItemContact: {
            flex: 1,
            flexDirection: 'row',
        },
        contactMail: {
            flex: 1
        },
        contactPhone: {
            flex: 1,
            alignItems: "flex-end"
        },
        empItemContactContainer: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            flexDirection: 'row',
            // borderWidth: 1,
            height: 25
        },
        empItemContactContainerEnd: {
            flex: 1,
            flexDirection: 'row',
        },
        empItemContactText: {
            color: Configs_Default.Color.TextColor,
            fontSize: 12,
            // borderWidth: 1,
        },
        empItemContactTextEnd: {
            color: Configs_Default.Color.TextColor,
            fontSize: 12,
            // borderWidth: 1,
            height: 25
        },
        empItemContactIcon: {
            color: Configs_Default.Color.COLOR_5,
            fontSize: 18,
            // borderWidth: 1,
            width: 20
        },
        modal: {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            flex: 1
        },
        mainContainer: {
            justifyContent: 'center',
            flex: 1,
            margin: 10,
        },
        textAlign: {
            textAlign: 'center'
        },
        selectContainer: {
            height: 40,
            marginLeft: 5,
            marginRight: 5,
        },
        wrapperOffice: {
            paddingRight: 50
        }
    }),
    EmployeeCamera: StyleSheet.create({
        cameraContainer: {
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
        },
        buttonContainer: {
            height: 80,
            backgroundColor: "#000000",
            flexDirection: "row",
        },
        buttonCamera: {
            flex: 1,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
        },
        IconCamera: {
            fontSize: 40,
            color: "#ffffff"
        }
    }),
    QA: StyleSheet.create({
        wrapperTab: {
            backgroundColor: "#F2F2F2",
            paddingVertical: 10
        },
        tabContainer: {
            flex: 1,
            borderWidth: 2,
            borderColor: '#7FC1F2',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginHorizontal: 5,
            borderRadius: 20,
        },
        tabContainerSelect: {
            backgroundColor: Configs_Default.Color.Secondary,
        },
        QAItem: {
            flexDirection: "row",
            marginTop: 10,
        },
        QAAvatar: {
            flex: 1,
            justifyContent: "flex-start",
            alignContent: "center",
            marginLeft: 10
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 40,
        },
        QAContent: {
            flex: 9,
            paddingHorizontal: 10,
        },
        ReplyTo: {
            marginTop: 5,
            flexDirection: "row",
            borderRadius: 10,
        },
        titleReplyTo: {
            fontStyle: "italic",
            color: Configs_Default.Color.TextColor,
        },
        ReplyToText: {
            paddingHorizontal: 5,
            paddingVertical: 2,
            backgroundColor: Configs_Default.Color.Title,
            fontStyle: "italic",
            color: Configs_Default.Color.TextColor,
            borderRadius: 5,
        },
        infor: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        ColorFix: {
            color: "#FF931C",
            fontWeight: "bold"
        },
        ColorPri: {
            color: Configs_Default.Color.Primary
        },
        deparment: {
            fontSize: 12,
            fontStyle: "italic",
            color: Configs_Default.Color.TextColor
        },
        userName: {
            //  color: Configs_Default.Color.TextColor
        },
        QADay: {
            // color: Configs_Default.Color.TextColor,
            fontStyle: "italic",
            fontSize: 12,
            paddingTop: 5
        },
        QAContentDetail: {
            marginTop: 5
        },
        topicTitle: {
            alignItems: "flex-end"
        },
        QAReply: {
            marginTop: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
        },
        QAStatus: {
            paddingVertical: 2,
            color: Configs_Default.Color.Primary,
            fontSize: 12,
            flex: 1,
            flexDirection: "row",
            fontStyle: "italic",
        },
        replyRight: {
            flex: 1,
            alignItems: "flex-end",
            flexDirection: "row",
            paddingVertical: 2,
            justifyContent: "flex-end",
        },
        chatIcon: {
            fontSize: 20,
            color: Configs_Default.Color.Primary,
        },
        reply: {
            flexDirection: "row",
            marginHorizontal: 5,
            flex: 1
        },
        reviewReply: {
            flexDirection: "row",
            paddingHorizontal: 5,
            marginHorizontal: 5,
        },
        showMore: {
            paddingVertical: 2,
        },
        replyIcon: {
            width: 20,
            fontSize: 20,
        },
        reviewIcon: {
            width: 15,
            fontSize: 20,
            color: Configs_Default.Color.TextColor,
        },
        active: {
            color: Configs_Default.Color.Primary,
        },
        showList: {
            transform: [{ rotate: "-180deg" }],
        },
        hideList: {
            transform: [{ rotate: "180deg" }],
        },
        replyText: {
            marginLeft: 5,
            fontSize: 13,
            paddingVertical: 4,
            color: Configs_Default.Color.COLOR_10,
        },
        QAItemReply: {
            marginLeft: -10,
            marginRight: -10,
            paddingVertical: 5,
            flexDirection: "row",
        },
        QAReview: {
            flexDirection: "row",
            justifyContent: "flex-end"
        },
        ml10: {
            marginRight: 10
        },
        buttonMenu: {
            backgroundColor: Configs_Default.Color.Primary,
            width: BUTTON_SIZE - 5,
            height: BUTTON_SIZE - 5,
            justifyContent: "center",
            alignItems: "center",
            right: 20,
            bottom: 25,
            position: "absolute",
            borderRadius: 9999,
            elevation: 2, // Android
            shadowColor: "rgba(0,0,0, .4)", // IOS
            shadowOffset: { height: 3, width: 3 }, // IOS
            shadowOpacity: 0.5, // IOS
            shadowRadius: 1, //IOS
        },
        modalHeader: {
            flexDirection: "row",
            backgroundColor: "#00B0F0",
            paddingVertical: 10
        },
        groupContentControlXL: {
            backgroundColor: 'transparent',
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5,
            height: 120,
        },
        groupContentTextArea: {
            flex: 1,
            borderWidth: 1,
            borderColor: Configs_Default.Color.Primary,
            paddingHorizontal: 10,
            paddingTop: 10,
            borderRadius: 5,
            textAlignVertical: "top",
            height: 120,
        },
        modalTitle: {
            color: Configs_Default.Color.Background
        },
        modalContent: {
            flexDirection: "column",
        },
        picker: {
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: "#F2F2F2",
            marginBottom: 5,
            height: 40,
        },
        subject: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        dropdownPicker: {
            flex: 1
        },
        w10: {
            width: "90%"
        },
        selectSubject: {
            flex: 1,
            flexDirection: "row"
        },
        modalFooter: {
            flexDirection: "row",
            justifyContent: "flex-end"
        },
        btnSubmit: {
            width: 70,
            flexDirection: "row",
            backgroundColor: "#EAEFF5",
            borderColor: Configs_Default.Color.Primary,
            marginBottom: 5,
            marginRight: 10,
            borderRadius: 5,
            padding: 5
        },
        iconSend: {
            color: Configs_Default.Color.Primary
        },
        btnText: {
            alignSelf: "center",
            padding: 2,
            color: Configs_Default.Color.Primary
        }
    }),
}