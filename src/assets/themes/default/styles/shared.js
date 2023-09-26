import { StyleSheet, Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Configs_Default } from '../config';
import { block } from 'react-native-reanimated';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 50;
const RADIUS = 17.5;


export const Shared = {
    HomeHeader: StyleSheet.create({
        wrapper: {
            height: 70,
            backgroundColor: Configs_Default.Color.Primary,
        },
        statusBar: {
            height: Constants.statusBarHeight,
            backgroundColor: Configs_Default.Color.Primary
        },
        container: {
            flex: 1,
            height: 50,
            // justifyContent: 'center',
            // alignItems: 'center',
            flexDirection: 'row',
        },
        left: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            paddingLeft: 15
        },
        mid: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        right: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
        },


        btn: {
            width: 30,
            height: 30,
            backgroundColor: 'transparent',
            marginRight: 10,
            borderRadius: 15,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        },
        btnText: {
            backgroundColor: 'transparent',
            textAlign: 'center',
            // justifyContent: 'center',
            // alignItems: 'center',
            width: 30,
            height: 30,
            borderRadius: 15
        },
        btnTextIcon: {
            color: "#FFFFFF",
            fontSize: 25,
            width: 30,
            height: 30,
            lineHeight: 30,
        },
        logo: {
            width: 150,
            height: 30,
            // top: -12
        }
    }),
    StandardHeader: StyleSheet.create({
        wrapper: {
            height: 60,
            backgroundColor: Configs_Default.Color.Primary,
        },
        statusBar: {
            height: Constants.statusBarHeight,
            backgroundColor: Configs_Default.Color.Primary,
        },
        container: {
            flex: 1,
            flexDirection: 'row',
        },
        left: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            paddingLeft: 15,
        },
        right: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
        },

        btn: {
            width: 30,
            height: 30,
            backgroundColor: 'transparent',
            marginRight: 10,
            borderRadius: 15,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        },
        btnIconBack: {
            color: '#FFFFFF'
        },
        btnIcon: {
            color: '#FFFFFF',
            fontSize: 25
        },
        txtTitle: {
            fontSize: 18,
            color: '#FFFFFF'
        },

        btnText: {
            backgroundColor: 'transparent',
            textAlign: 'center',
            // justifyContent: 'center',
            // alignItems: 'center',
            width: 30,
            height: 30,
            borderRadius: 15
        },
        btnTextIcon: {
            color: Configs_Default.Color.Primary,
            fontSize: 22,
            width: 30,
            height: 30,
            lineHeight: 30,
        },
        logo: {
            width: 150,
            height: 30,
            // top: -12
        }
    }),
    CalendarEvent: StyleSheet.create({
        wrapper: {
            flex: 1,
            justifyContent: 'center',
            padding: 0,
            // backgroundColor: 'red',
            marginTop: -5,
            marginRight: -10,
            marginBottom: -5,
            marginLeft: -10
        },
        dayWrapper: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            //backgroundColor: 'red',
            // borderWidth: 1,
        },
        dayContent: {
            borderBottomLeftRadius: 9999,
            borderBottomRightRadius: 9999,
            borderTopLeftRadius: 9999,
            borderTopRightRadius: 9999,
            height: 35,
            width: 35,
            marginRight: 'auto',
            marginBottom: 0,
            marginLeft: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
        },
        dateTitle: {
            fontSize: 18,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        },
        dateNoteWrapper: {
            marginTop: 5,
            //backgroundColor: '#eee',
            //height: 'auto'

        },
        dateNote: {
            color: "#888888",
            fontSize: 10,
            textAlign: 'center',
            //borderBottomColor: "#ccc",
            //borderBottomWidth: 1,
        },
        dayCircle: {
            width: RADIUS * 2,
            height: RADIUS * 2,
            borderRadius: RADIUS,
        },
        dayHalfCircle: {
            width: RADIUS * 2,
            height: RADIUS,
            overflow: 'hidden',
            position: 'absolute',
            bottom: 0,
            left: 0
        },
        innerCircle: {
            overflow: 'hidden',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
        },
        circle: {
            overflow: 'hidden',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#e3e3e3',
        },
        triangleCorner: {
            position: 'absolute',
            width: 0,
            height: 0,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderLeftWidth: 7,
            borderBottomWidth: 7,
            borderLeftColor: "transparent",
            borderBottomColor: Configs_Default.Color.Primary,
            bottom: -5,
            right: 0,
        }
    }),

    ////////////////////////OLD////////////////////////////
    EmployeeHeader: StyleSheet.create({
        wrapper: {
            height: 190,
            backgroundColor: Configs_Default.Color.Primary,
            borderWidth: 1
        },

        extension: {
            // flex: 1,
            height: 120,
            // justifyContent: 'center',
            // alignItems: 'center',
            // flexDirection: 'row',
            borderWidth: 1,
        },
        extensionContent: {
            flex: 1,
            backgroundColor: 'orange'
        },
        extensionFooter: {
            height: 40,
            backgroundColor: 'pink'
        },

        btn: {
            width: 30,
            height: 30,
            backgroundColor: 'transparent',
            marginRight: 10,
            borderRadius: 15,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        },
        btnIconBack: {
            color: '#FFFFFF'
        },
        btnIcon: {
            color: '#FFFFFF',
            fontSize: 25
        },
        txtTitle: {
            fontSize: 18,
            color: '#FFFFFF'
        },

        btnText: {
            backgroundColor: 'transparent',
            textAlign: 'center',
            // justifyContent: 'center',
            // alignItems: 'center',
            width: 30,
            height: 30,
            borderRadius: 15
        },
        btnTextIcon: {
            color: Configs_Default.Color.Primary,
            fontSize: 22,
            width: 30,
            height: 30,
            lineHeight: 30,
        },
        logo: {
            width: 150,
            height: 30,
            // top: -12
        }
    }),
    EmpNavBar: StyleSheet.create({
        wrapper: {
            height: 160,
            backgroundColor: Configs_Default.Color.Primary,
            // marginTop: 20
            // marginBottom: 50,
            flex: 1
        },
        status: {
            backgroundColor: Configs_Default.Color.Primary,
            height: 22,
            flexDirection: 'column'
        },
        container: {
            flex: 1
        },
        title: {
            // flex: 1,
            height: 40,
            backgroundColor: 'transparent',
            // width: DEVICE_WIDTH - 16
            justifyContent: 'center',
            // alignItems: 'center',
            flexDirection: 'row',
            // borderWidth: 1
        },
        titleLeft: {
            flex: 1,
            flexDirection: 'row'
        },
        titleLeftNav: {
            width: 50
        },
        titleButton: {
            backgroundColor: 'transparent',
            // borderWidth: 1,
        },
        titleButtonIcon: {
            color: '#FFFFFF',
            fontSize: 25,
        },
        titleButtonIconBackWrapper: {
            // borderWidth: 1,
            flex: 1
        },
        titleButtonIconBack: {
            color: '#FFFFFF',
            fontSize: 35,
            top: -5,
            // borderWidth: 1,
        },
        titleLeftTitle: {
            flex: 1,
            backgroundColor: 'transparent',
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        titleLeftTitleContent: {
            fontSize: 20,
            color: "#FFFFFF"
        },
        titleRight: {
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            flexDirection: 'row',
        },
        detail: {
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            // alignItems: 'center',
            // flexDirection: 'column',
        },
        detailTop: {
            flex: 1,
            // justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            flexDirection: 'row',
        },
        detailImage: {
            height: 90,
            width: 90,
            borderRadius: 45,
            borderWidth: 1,
            borderColor: "#999999",
            top: 25,
            backgroundColor: "#dddddd",
            zIndex: 2
        },
        detailBegin: {
            flex: 1,
            backgroundColor: "transparent",
            alignItems: 'center',
        },
        detailEnd: {
            flex: 2,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            // borderWidth: 2,
            // backgroundColor: 'red',
        },
        detailBottom: {
            flex: 1,
            backgroundColor: '#FFFFFF',
            zIndex: 1,
            alignItems: 'center',
            flexDirection: 'row',
        },
        InfoName: {
            fontSize: 25,
            color: "#FFF"
        },
        InfoDetail: {
            fontSize: 18,
            color: "#999999"
        },
        InfoCode: {
            fontSize: 18,
            color: "#666666",
            // fontWeight: 'bold'
        }
    }),
    FunctionNavBar: StyleSheet.create({
        wrapper: {
            height: 90,
            backgroundColor: Configs_Default.Color.Primary,
            // marginTop: 20
        },
        container: {
            flex: 1
        },
        title: {
            // flex: 1,
            height: 40,
            backgroundColor: 'transparent',
            // width: DEVICE_WIDTH - 16
            justifyContent: 'center',
            // alignItems: 'center',
            flexDirection: 'row',
            // borderWidth: 1
        },
        titleLeft: {
            flex: 1,
            flexDirection: 'row'
        },
        titleLeftNav: {
            width: 50
        },
        titleButton: {
            backgroundColor: 'transparent',
            // borderWidth: 1,
        },
        titleButtonIcon: {
            color: '#FFFFFF',
            fontSize: 25,
        },
        titleButtonIconBackWrapper: {
            // borderWidth: 1,
            flex: 1
        },
        titleButtonIconBack: {
            color: '#FFFFFF',
            fontSize: 35,
            top: -5,
            // borderWidth: 1,
        },
        titleLeftTitle: {
            flex: 1,
            backgroundColor: 'transparent',
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        titleLeftTitleContent: {
            fontSize: 20,
            color: "#FFFFFF"
        },
        titleRight: {
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            flexDirection: 'row',
        },
    }),
    TabBarIcon: StyleSheet.create({
        wrapper: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            // alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent', //Configs_Default.Color.Primary,

            // borderWidth: 1,
            // borderColor: 'blue',
            width: DEVICE_WIDTH / 5
        },
        iconContainer: {
            left: 0,
            margin: 0,
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center'
        },
        icon: {
            fontSize: 30,
            color: '#FFFFFF',
        },
        titleContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            fontSize: 11,
            color: '#FFFFFF',
        },
    }),
    GroupButtonHorizontal: StyleSheet.create({
        wrapper: {
            flex: 1,
            flexDirection: 'row',
            // borderRadius: 5
        },
        buttonContainerActive: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Configs_Default.Color.Primary,
            // borderRadius: 5
        },
        buttonActive: {
            flex: 1,
            // height: 40
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonActiveText: {
            color: "#FFFFFF"
        },
        buttonContainerInactive: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'cyan',
            // borderRadius: 5
            borderWidth: 1,
            borderColor: Configs_Default.Color.Primary,
            backgroundColor: '#FFFFFF'
        },
        buttonInactive: {
            flex: 1,
            // height: 40
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonInactiveText: {
            color: Configs_Default.Color.Primary,
        },
    }),

    /////////////////////////NEW////////////////////////////
    PageContainer: StyleSheet.create({
        wrapper: {
            flex: 1
        },
        header: {
            height: 60,
        },
        content: {
            flex: 1,
        },
        footer: {
            height: 70,
            backgroundColor: "#FFFFFF",
        }
    }),

    SearchBar: StyleSheet.create({
        searchSection: {
            // height: 50,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            borderWidth: 1,
            margin: 5,
            borderRadius: 5,
            borderColor: Configs_Default.Color.Primary
        },
        searchIcon: {
            // padding: 10,,
            fontSize: 25,
            paddingRight: 10,
            paddingLeft: 10,
            backgroundColor: 'transparent',
            color: '#666666',
        },
        input: {
            flex: 1,
            paddingTop: 10,
            paddingRight: 15,
            paddingBottom: 10,
            paddingLeft: 10,
            borderRadius: 5,
            color: '#333333',
            backgroundColor: 'transparent',
        },
    }),

    SearchChat: StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#048CC8",
        },
        content: {
            marginTop: Platform.OS == "ios" ? 40 : 20,
            flex: 1,
            flexDirection: "row",
        },
        arrowBack: {
            flex: 1,
        },

        btnWrap: {
            paddingHorizontal: 10,
            marginTop: Platform.OS == "ios" ? 0 : 10,
            justifyContent: "flex-end",
            alignItems: "center",
        },
        btnIcon: {
            color: "#FFFFFF"
        },
        searchField: {
            flex: 9
        },
        searchSection: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Configs_Default.Color.Primary
        },
        searchIcon: {
            fontSize: 25,
            paddingRight: 10,
            paddingLeft: 10,
            backgroundColor: 'transparent',
            color: '#FFFFFF',
        },
        input: {
            flex: 1,
            paddingRight: 15,
            paddingLeft: 10,
            borderRadius: 5,
            backgroundColor: 'transparent',
            color: '#FFFFFF',
            fontSize: 15
        },
    }),

    EmpInfo: StyleSheet.create({
        info: {
            height: 120,
            flexDirection: 'row',
            backgroundColor: '#FAFAFA',
        },
        infoAvatar: {
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
        },
        imgAvatar: {
            width: 80,
            height: 80,
            margin: 5,
            borderRadius: 40
        },
        infoDetail: {
            flex: 1,
        },
        infoName: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#666666',
            padding: 10
        },
        infoContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
        infoDescriptionGroup: {
            flex: 1,
        },
        infoDescription: {
            flex: 1,
            paddingLeft: 10,
            marginBottom: 5,
            paddingRight: 50,
            flexDirection: 'row',
        },
        infoDescriptionTitle: {
            fontSize: 16,
            color: '#999999'
        },
        infoDescriptionName: {
            paddingLeft: 5,
            fontSize: 16,
            paddingRight: 20,
            color: '#666666'
        },
        infoDescriptionID: {
            paddingLeft: 5,
            fontSize: 16,
            paddingRight: 80,
            color: '#666666'
        },
        // infoDescriptionBar: {
        //     width: 80,
        //     flexDirection: 'row',
        //     justifyContent: 'flex-end',
        //     alignItems: 'flex-end',
        // },
        buttonDetail: {
            width: 25,
            height: 25,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#048CC8',
            marginBottom: 5
        },
        buttonDetailIcon: {
            fontSize: 15,
            justifyContent: 'center',
            alignItems: 'center',
            color: '#048CC8',
        },
        back: {
            width: 20,
        },
        button: {
            width: 30,
            marginTop: 10,
            backgroundColor: 'transparent'
        },
        buttonIcon: {
            color: Configs_Default.Color.Primary
        },
        next: {
            width: 20,
        }
    }),

    ProfileGroup: StyleSheet.create({
        wrapper: {
            borderWidth: 1,
            borderColor: '#F8F8F8',
            borderRadius: 5
        },
        groupEmp: {
            paddingHorizontal: 5,
        },
        padderTop: {
            paddingTop: 10
        },
        marginHori: {
            marginHorizontal: 6,
            justifyContent: "center"
        },
        titleWrap: {
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        titleContainer: {
            flex: 1,
            backgroundColor: Configs_Default.Color.Title,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 5,
            paddingRight: 10,
            paddingVertical: -2
        },
        titleIcon: {
            fontSize: 20,
            color: Configs_Default.Color.TextHeader,
            paddingRight: 10,
        },
        toggleIcon: {
            fontSize: 20,
            color: Configs_Default.Color.TextHeader,
            alignItems: "center",
            textAlign: "right",
            width: 60,
            marginRight: 5
        },
        flipUpIcon: {
            transform: [{ rotate: "180deg" }],
            alignItems: "center",
            textAlign: "left",
        },
        flipDownIcon: {
            transform: [{ rotate: "0deg" }],
            alignItems: "center",
            textAlign: "right",
        },
        title: {
            fontSize: 16,
            color: Configs_Default.Color.TextHeader,
            fontWeight: "bold"
        },
        detailContainer: {
            flex: 1,
            minHeight: 50,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            // justifyContent: 'flex-end',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderTopWidth: 1,
            borderColor: '#F8F8F8',
            paddingVertical: 5
        },
        flexColumn: {
            flexDirection: "column",
            flex: 1,
            // height: 100,
            backgroundColor: 'transparent',
            paddingHorizontal: 10,
            marginTop: 10,
        },
        borderBot: {
            borderBottomColor: Configs_Default.Color.TextColor,
            borderBottomWidth: 1,
            marginHorizontal: 5,
            opacity: 0.2
        },
        twoColumn: {
            justifyContent: "space-around",
            flexDirection: "row",
            minHeight: 50,
            paddingHorizontal: 10,
            borderColor: '#F8F8F8',
            paddingVertical: 5,
            alignItems: "center"
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
            fontWeight: "bold"
        },
        detailTitleAdress: {
            flex: 1,
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
        },
        detailValueAdress: {
            flex: 2,
            textAlign: 'right',
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
        },
        detailBold: {
            fontWeight: 'bold',
            color: Configs_Default.Color.Primary
        },
        flexStart: {
            textAlign: 'left',
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
        },
        flexEnd: {
            textAlign: 'right',
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
        },
        btnMiddle: { justifyContent: "center" }
    }),

    SelectValue: StyleSheet.create({
        selectContainer: {
            borderWidth: 1,
            borderRadius: 5,
            flexDirection: 'row',
            borderColor: Configs_Default.Color.Primary,
            flex: 1
        },
        selectText: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 10
        },
        selectTextTitle: {
            fontSize: 15,
            paddingRight: 5,
            color: '#999999'
        },
        selectTextValue: {
            fontSize: 15,
            color: Configs_Default.Color.Primary,
            fontWeight: 'bold',
            width: 0,
            flexGrow: 1,
            flex: 1,
        },
        selectButtonContainer: {
            width: 50,
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
            alignItems: "center"
        },
        selectButton: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        selectButtonIcon: {
            fontSize: 20,
            color: Configs_Default.Color.Primary,
        },
        modalBackground: {
            height: DEVICE_HEIGHT,
            justifyContent: "center",
            backgroundColor: "#ffffff"
        },
        checkbox: {
            minHeight: 20,
            marginBottom: 10
        },
        buttonClose: {
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexDirection: "row",
            paddingHorizontal: 30
        },
        btnContent: {
            minWidth: 60,
            paddingVertical: 10,
        },
        btnRight: {
            alignItems: 'flex-end'
        },
        buttonCloseColor: {
            color: Configs_Default.Color.Primary,
        }
    }),

    CardLeave: StyleSheet.create({
        wrapper: {
            borderRadius: 5,
        },
        header: {
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: Configs_Default.Color.BackgroundHeader,
        },
        headerContent: {
            flex: 1,
            flexDirection: 'row',
        },
        headerContentLeft: {
            flex: 1,
            textAlign: 'left',
            fontSize: 16,
            fontWeight: 'bold',
            color: Configs_Default.Color.TextHeader,
            textTransform: Configs_Default.Text.TransformHeaderTitleList,
        },
        headerContentRight: {
            flex: 1,
            textAlign: 'right',
            fontSize: 16,
            color: Configs_Default.Color.TextColor,
            fontWeight: 'bold',
        },
        groupHeaderInfo: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flex: 0.25,
        },
        groupHeaderInfoButton: {
            position: 'relative',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            alignSelf: 'flex-end',
        },
        groupHeaderInfoIcon: {
            color: Configs_Default.Color.TextColor,
            fontSize: 25,
        },
        body: {
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            paddingTop: 0,
            paddingLeft: 0,
            paddingBottom: 0,
            paddingRight: 0,
        },
        bodyContent: {
            flex: 1,
        }
    }),
    LeaveItem: StyleSheet.create({
        swipeContainer: {
            height: 72,
            borderColor: 'transparent',
        },
        itemContainer: {
            flex: 1
        },
        wrapper: {
            height: 83,
            borderBottomWidth: 1,
            borderColor: '#DFDFDF',
            flexDirection: 'row',
            paddingTop: 10,
            paddingBottom: 10,
            marginLeft: 10,
            marginRight: 10
        },
        wrapperWithoutBorder: {
            height: 83,
            borderBottomWidth: 0,
            flexDirection: 'row',
            paddingTop: 10,
            paddingBottom: 10,
            marginLeft: 10,
            marginRight: 10
        },
        dayContent: {
            height: 65,
            width: 65,
            borderRadius: 9999,
            backgroundColor: '#DFDFDF',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10
        },
        dayContent1: {
            backgroundColor: Configs_Default.Color.Pending,
        },
        dayContent2: {
            backgroundColor: Configs_Default.Color.Approved,
        },
        dayContent3: {
            backgroundColor: Configs_Default.Color.Reject,
        },
        dayContent5: {
            backgroundColor: Configs_Default.Color.Wait,
        },
        dayContent6: {
            backgroundColor: Configs_Default.Color.Canceled,
        },
        day: {
            color: "#FFFFFF",
            fontSize: 22
        },
        dayFirstLast: {
            color: "#FFFFFF",
            fontSize: 15,
        },
        dayInfoContent: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        dayInfoName: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        name: {
            color: Configs_Default.Color.TextColor,
            fontSize: 16
        },
        dayInfoDetail: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        info: {
            color: '#999999',
            fontSize: 13
        },
        info1: {
            color: Configs_Default.Color.Pending,
        },
        info2: {
            color: Configs_Default.Color.Approved,
        },
        info3: {
            color: Configs_Default.Color.Reject,
        },
        info5: {
            color: Configs_Default.Color.Wait,
        },
        info6: {
            color: Configs_Default.Color.Canceled,
        },
        dayNumContent: {
            height: 60,
            width: 105,
            justifyContent: 'center',
            alignItems: 'flex-end'
        },
        dayNumOTContent: {
            height: 60,
            width: 120,
            justifyContent: 'center',
            alignItems: 'center',
        },
        dayNumMissingContent: {
            height: 60,
            width: 120,
            textAlign: 'right',
        },
        dayNum: {
            color: Configs_Default.Color.Primary,
            fontSize: 15,
            paddingRight: 10
        },
        rightBottom: {
            color: '#999999',
            paddingTop: 5,
            fontSize: 15,
            paddingRight: 10
        },
        empNum: {
            color: '#999999',
            paddingTop: 5,
            fontSize: 13,
            paddingRight: 10
        },
        dayGroupStatus: {
            height: 12,
            alignItems: 'flex-end',
            flexDirection: 'row',
        },
        dayStatus: {
            height: 12,
            width: 12,
            borderRadius: 9999,
            backgroundColor: '#DFDFDF',
            marginRight: 8
        },
        dayStatus0: {
            backgroundColor: '#CCC',
        },
        dayStatus2: {
            backgroundColor: Configs_Default.Color.Approved,
        },
        dayStatus3: {
            backgroundColor: Configs_Default.Color.Reject,
        },
        dayStatus5: {
            backgroundColor: Configs_Default.Color.Wait,
        },
        dayStatus6: {
            backgroundColor: Configs_Default.Color.Canceled,
        },
        shiftName: {
            alignSelf: 'flex-end',
            color: Configs_Default.Color.COLOR_4,
            flex: 1,
        },
        swipeButtonContainer: {
            flex: 1,
            backgroundColor: '#FFFFFF',
            // borderWidth: 1
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderLeftWidth: 1,
            borderColor: '#eeeeee'
        },
        swipeButtonGroup: {
            width: 200,
            height: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        swipeButton: {
            height: 40,
            marginLeft: 5,
            marginRight: 5,
            borderRadius: 5
        },
        swipeButtonReject: {
            backgroundColor: Configs_Default.Color.Reject
        },
        swipeButtonApprove: {
            backgroundColor: Configs_Default.Color.Approved
        },
        dayInfoTime: {
            flex: 0.9,
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        infoBoxGroup: {
            flex: 1.05,
            flexDirection: 'row',
        },
        infoBoxItem: {
            flex: 1,
            textAlign: 'center'
        },
    }),
    MissingListItem: StyleSheet.create({
        wrapper: {
            height: 140,
            borderBottomWidth: 1,
            borderColor: '#DFDFDF',
            flexDirection: 'row',
            paddingTop: 10,
            paddingBottom: 10,
            marginLeft: 10,
            marginRight: 10
        },
        wrapperWithoutBorder: {
            height: 140,
            borderBottomWidth: 0,
            flexDirection: 'row',
            paddingTop: 10,
            paddingBottom: 10,
            marginLeft: 10,
            marginRight: 10
        },
        dayContent: {
            height: 65,
            width: 65,
            borderRadius: 9999,
            backgroundColor: '#DFDFDF',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginRight: 10,
        },
    }),
    ComboboxListSmall: StyleSheet.create({
        wrapper: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        container: {
            height: DEVICE_HEIGHT / 2,
            width: DEVICE_WIDTH,
            paddingLeft: 0,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
        header: {
            height: 40,
            backgroundColor: '#f5f5f5',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 15,
        },
        btnCancel: {
            padding: 10,
            alignContent: "center",
        },
        btnCancelText: {
            color: Configs_Default.Color.TextColor
        }
    }),
    ComboboxListLarge: StyleSheet.create({
        wrapper: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        container: {
            flex: 1,
            width: DEVICE_WIDTH,
        },
        header: {
            height: 50,
            backgroundColor: '#f5f5f5',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 15,
        },
        btnCancelText: {
            color: Configs_Default.Color.TextColor
        },
        btnCancelLarge: {
            height: "100%",
            justifyContent: "center",
            paddingHorizontal: 15
        }
    }),

    ModalLoading: StyleSheet.create({
        modalBackground: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-around',
            backgroundColor: '#00000040'
        },
        wrapper: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            opacity: .2,
        },
        content: {
            flex: 1,
            justifyContent: 'center',
        },
        activityIndicatorWrapper: {
            height: 80,
            width: 80,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: 'transparent'
        },
        centerLoading: {
            marginHorizontal: DEVICE_WIDTH * .5 - 40
        }
    }),
    TabBar: StyleSheet.create({
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
    }),
    ToolBar: StyleSheet.create({
        toolbar: {
            height: 40,
            marginTop: 10,
            marginBottom: 10,
            flexDirection: 'row',
        },
        selectOption: {
            flex: 0.2,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Configs_Default.Color.Primary,
            flexDirection: 'row',
            marginRight: 10,
        },
        selectOptionReject: {
            borderColor: Configs_Default.Color.Reject,
        },
        selectOptionButton: {
            flex: 1,
            height: 38,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: -1,
            color: Configs_Default.Color.Primary,
        },
        selectOptionButtonText: {
            color: Configs_Default.Color.Primary,
        },
        selectOptionButtonTextTitle: {
            textAlign: 'center'
        },
        selectOptionButtonReject: {
            color: Configs_Default.Color.Reject,
        },
        CheckBoxToolbar: {
            flex: 1,
            alignSelf: 'flex-end',
            alignItems: 'flex-end',
            marginRight: 22,
        },
    }),
    ListEmployee: StyleSheet.create({
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
        empItemInfo: {
            flex: 1
        },
        groupContentChecked: {
            flexDirection: 'row',
            // // justifyContent: 'flex-end',
            // // alignItems: 'center',
            marginTop: 10,
            paddingLeft: -10
        },
        groupContentTitleDetail: {
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
        },
        groupContentControl: {
            height: 40,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            marginVertical: 5,
            marginHorizontal: 10,
        },
        cbxIOS: {
            height: 52,
            alignItems: "center"
        },

        TextCssCustom: {
            // paddingTop: -100
        },
        empItemInfocustom1: {
            height: 165,
            marginTop: 15
        },
        empItemInfocustom2: {
            height: 100,
            marginTop: 15
        },
        empItemInfoName: {
            fontSize: 20,
            color: Configs_Default.Color.TextColor
        },
        empItemInfoDetail: {
            fontSize: 15,
            color: "#999999"
        },
        listEmpWrapper: {
            borderLeftWidth: 5,
            flex: 1
        },
        listEmp: {
            flex: 1,
        },
        listEmpOvertime: {
            borderColor: "#0088CF",
        },
        cbItem: {
            flex: 0.2,
        },
    }),
    ComboboxTree: StyleSheet.create({
        wrapper: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        container: {
            flex: 1,
            width: DEVICE_WIDTH,
        },
        header: {
            height: 40,
            backgroundColor: '#f5f5f5',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 15,
            paddingLeft: 15,
        },
        buttonGroup: {
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexDirection: "row"
        },
        button: {
            flex: 1,
            paddingVertical: 10
        },
        buttonCancelText: {
            color: Configs_Default.Color.TextColor,
            textAlign: "right",
        },
        buttonClearText: {
            color: Configs_Default.Color.TextColor,
            textAlign: "left",
        },
        wrapperLabel: {
            flex: 0.925,
            paddingLeft: 5,
            justifyContent: "center",
            borderBottomWidth: 1,
            borderColor: "#cccccc",
        },
        wrapperLabelSelected: {
            backgroundColor: "#e8e8e8"
        },
        label: {
            color: Configs_Default.Color.TextColor,
        },
        wrapperIcon: {
            flex: 0.075,
            paddingVertical: 15,
            alignItems: "center"
            // backgroundColor: "blue"
        },
        openIcon: {
            fontSize: 22,
            color: Configs_Default.Color.Primary
        },
        closeIcon: {
            fontSize: 22,
            color: Configs_Default.Color.TextColor
        },
        opacityIcon: {
            fontSize: 22,
            opacity: 0,
        },
    }),
    ChartPie: StyleSheet.create({
        wrapperChart: {
            flex: 1,
            marginHorizontal: 10,
            marginVertical: 5,
            paddingLeft: 0
        },
        wrapperItem: {
            flex: 1,
            flexDirection: "row",
            margin: 5,
        },
        hintItem: {
            width: 15,
            height: 15,
            marginRight: 10,
            marginTop: 4,
        },
        labelItem: {
            flex: 1,
            flexWrap: "wrap-reverse",
            fontSize: 12,
        }
    }),
    ListFilter: StyleSheet.create({
        text: {
            fontSize: 16,
            color: "#AAA",
        },
        textHighlight: {
            color: "#333",
        }
    }),
    Global: StyleSheet.create({
        flexRow: {
            flexDirection: "row"
        },
    }),
    HCSInput: StyleSheet.create({
        inputContainer: {
            flex: 1,
            borderWidth: 1,
            borderColor: Configs_Default.Color.Primary,
            borderRadius: 5,
            alignSelf: 'stretch',
        },
        inputContent: {
            flexDirection: 'row',
            flex: 1
        },
        inputTextTitle: {
            fontSize: 15,
            color: '#999999',
            paddingVertical: 8,
            paddingLeft: 10,
            paddingRight: 6,
        },
        inputTextValue: {
            flex: 1,
            fontSize: 15,
            color: Configs_Default.Color.Primary,
            fontWeight: 'bold'
        },
    })
}