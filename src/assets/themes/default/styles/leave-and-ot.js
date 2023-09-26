import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Configs_Default } from '../config';
import { HrmSizeScale } from '../../../../libs/HrmLibs';




const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const BUTTON_SIZE = HrmSizeScale.wSize(50);

const MARGIN_SELECT = 10;
const HEIGHT_SELECT = 40;
const CONST_MIN_WIDTH_SELECT = 150;
const TOTAL_COLUMN = (CONST_MIN_WIDTH_SELECT * 3) + (MARGIN_SELECT * 6);
const MIN_WIDTH_SELECT = TOTAL_COLUMN < DEVICE_WIDTH ? "auto" : CONST_MIN_WIDTH_SELECT;
const BOTTOM_SELECT = TOTAL_COLUMN < DEVICE_WIDTH ? MARGIN_SELECT : (HEIGHT_SELECT + MARGIN_SELECT * 2);

export const LeaveAndOT = {
    MyLeaveRequest: StyleSheet.create({
        header: {
            backgroundColor: '#FAFAFA',
            height: 50,
            flexDirection: 'row'
        },
        headerInfo: {
            flex: 5,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 10
        },
        headerTitle: {
            fontSize: 15,
            color: Configs_Default.Color.TextColor
        },
        headerValue: {
            fontSize: 16,
            fontWeight: 'bold',
            paddingLeft: 3,
            marginTop: -2,
            color: Configs_Default.Color.TextColor
        },
        used: {
            color: Configs_Default.Color.Primary
        },
        headerButton: {
            flex: 2,
            paddingLeft: 10,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 10
        },
        btnAdd: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        btnAddIcon: {
            fontSize: 35,
            paddingLeft: 5,
            paddingRight: 5,
            color: Configs_Default.Color.Primary
        },
        btnAddText: {
            fontSize: 15,
            paddingRight: 5,
            color: Configs_Default.Color.Primary
        },
        groupButton: {
            height: 40,
            marginTop: 10,
            marginBottom: 10,
            flexDirection: 'row'
        },
        padder: {
            marginHorizontal: 8
        },
        selectContainer: {
            flex: 1,
            marginLeft: 10,
            marginRight: 10,
        },
        groupButtonApprove: {
            flex: 1,
            height: HEIGHT_SELECT,
            marginTop: MARGIN_SELECT,
            marginBottom: BOTTOM_SELECT,
            flexDirection: "row",
            flexWrap: "wrap"
        },
        selectContainerApprove: {
            flex: 1,
            height: HEIGHT_SELECT,
            marginLeft: MARGIN_SELECT,
            marginRight: MARGIN_SELECT,
            marginBottom: MARGIN_SELECT,
            minWidth: MIN_WIDTH_SELECT
        },
        groupLeave: {
            // borderWidth: 1,
            paddingLeft: 8,
            paddingRight: 8,
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
            // transform: [{ rotate: "45deg" }],
            borderRadius: 9999,
            elevation: 2, // Android
            shadowColor: "rgba(0,0,0, .4)", // IOS
            shadowOffset: { height: 3, width: 3 }, // IOS
            shadowOpacity: 0.5, // IOS
            shadowRadius: 1, //IOS
        },
        modalIconMain: {
            fontSize: HrmSizeScale.fontSize(20),
            // transform: [{ rotate: "-45deg" }],
        },
        btnRead: {
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            backgroundColor: Configs_Default.Color.Secondary,
            flex: 0.5
        },
        btnReadText: {
            fontSize: 16,
            color: '#FFFFFF'
        },
        overflowHidden: {
            overflow: "hidden"
        },
        listReport: {
            paddingHorizontal: 10
        },
        listReportCard: {
            marginBottom: 15
        }
    }),

    MyBusinessTripRequest: StyleSheet.create({
        header: {
            backgroundColor: '#FAFAFA',
            height: 50,
            flexDirection: 'row'
        },
        headerInfo: {
            flex: 5,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 10
        },
        headerTitle: {
            fontSize: 15,
            color: Configs_Default.Color.TextColor
        },
        headerValue: {
            fontSize: 16,
            fontWeight: 'bold',
            paddingLeft: 3,
            marginTop: -2,
            color: Configs_Default.Color.TextColor
        },
        used: {
            color: Configs_Default.Color.Primary
        },
        headerButton: {
            flex: 2,
            paddingLeft: 10,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 10
        },
        btnAdd: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        btnAddIcon: {
            fontSize: 35,
            paddingLeft: 5,
            paddingRight: 5,
            color: Configs_Default.Color.Primary
        },
        btnAddText: {
            fontSize: 15,
            paddingRight: 5,
            color: Configs_Default.Color.Primary
        },
        groupButton: {
            height: 40,
            marginTop: 10,
            marginBottom: 10,
            flexDirection: 'row'
        },
        selectContainer: {
            flex: 1,
            marginLeft: 10,
            marginRight: 10,
        },
        groupButtonApprove: {
            flex: 1,
            height: HEIGHT_SELECT,
            marginTop: MARGIN_SELECT,
            marginBottom: BOTTOM_SELECT,
            flexDirection: "row",
            flexWrap: "wrap"
        },
        selectContainerApprove: {
            flex: 1,
            height: HEIGHT_SELECT,
            marginLeft: MARGIN_SELECT,
            marginRight: MARGIN_SELECT,
            marginBottom: MARGIN_SELECT,
            minWidth: MIN_WIDTH_SELECT
        },
        groupLeave: {
            // borderWidth: 1,
            paddingLeft: 8,
            paddingRight: 8,
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
            // transform: [{ rotate: "45deg" }],
            borderRadius: 9999,
            elevation: 2, // Android
            shadowColor: "rgba(0,0,0, .4)", // IOS
            shadowOffset: { height: 3, width: 3 }, // IOS
            shadowOpacity: 0.5, // IOS
            shadowRadius: 1, //IOS
        },
        modalIconMain: {
            fontSize: HrmSizeScale.fontSize(20),
            // transform: [{ rotate: "-45deg" }],
        },
    }),

    CreateLeaveRequest: StyleSheet.create({
        groupHeader: {
            height: 50,
            backgroundColor: '#F8F8F8',
            paddingLeft: 10,
            paddingRight: 10,
            flexDirection: 'row'
        },
        groupHeaderTitle: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        groupHeaderTitleText: {
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
            textTransform: Configs_Default.Text.TransformHeaderTitleDetail,
        },
        groupHeaderInfo: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        groupHeaderInfoTitle: {
            fontSize: 13,
            color: '#999999',
            paddingRight: 5,
        },
        groupHeaderInfoValue: {
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
            fontWeight: 'bold'
        },
        groupContent: {
            height: 50,
            backgroundColor: 'transparent',
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: '#dfdfdf'
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
        groupContentControlXS: {
            height: 30,
            backgroundColor: 'transparent',
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5
        },
        groupContentControlXL: {
            height: 120,
            backgroundColor: 'transparent',
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5,
        },
        groupContentTextArea: {
            flex: 1,
            borderWidth: 1,
            borderColor: Configs_Default.Color.Primary,
            padding: 10,
            borderRadius: 5,
            alignSelf: 'stretch',
        },
        groupContentTitle: {
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        groupContentTitleDetail: {
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
        },
        groupContentValue: {
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        groupContentChecked: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: 10
        },
        groupContentValueCircle: {
            height: 20,
            width: 20,
            borderRadius: 10,
            backgroundColor: Configs_Default.Color.Pending,
            marginRight: 5
        },
        groupContentValueDetail: {
            fontWeight: 'bold',
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
        },
        groupContentValueDetailPending: {
            color: Configs_Default.Color.Pending,
        },
        groupContentValueDetailTime: {
            color: Configs_Default.Color.Reject,
        },
        groupContentPadingLeft: {
            paddingLeft: 5,
        },
        groupContentPadingRight: {
            paddingRight: 5,
        },
        groupContentRight: {
            flex: 1,
            marginLeft: 10,
            alignItems: 'flex-end',
            alignContent: 'flex-end',
        },
        groupContentLeft: {
            flex: 1,
            marginRight: 10,
            alignItems: 'flex-start',
            alignContent: 'flex-start',
        },
        checkBar: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
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
        btnReject: {
            borderRadius: 5,
            margin: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: Configs_Default.Color.Reject,
        },
        btnRejectText: {
            fontSize: 16,
            color: '#FFFFFF'
        },
        btnApproved: {
            borderRadius: 5,
            margin: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: Configs_Default.Color.Approved,
        },
        btnApprovedText: {
            fontSize: 16,
            color: '#FFFFFF'
        },
        filterDialog: {
            width: "100%"
        }
    }),

    CreateBusinessTripRequest: StyleSheet.create({
        groupHeader: {
            height: 50,
            backgroundColor: '#F8F8F8',
            paddingLeft: 10,
            paddingRight: 10,
            flexDirection: 'row'
        },
        groupHeaderTitle: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        groupHeaderTitleText: {
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
            textTransform: Configs_Default.Text.TransformHeaderTitleDetail,
        },
        groupHeaderInfo: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        groupHeaderInfoTitle: {
            fontSize: 13,
            color: '#999999',
            paddingRight: 5,
        },
        groupHeaderInfoValue: {
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
            fontWeight: 'bold'
        },
        groupContent: {
            height: 50,
            backgroundColor: 'transparent',
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            // borderBottomWidth: 1,
            // borderColor: '#dfdfdf'
        },
        groupContentControl: {
            height: 40,
            backgroundColor: 'transparent',
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5
        },
        groupContentControlXS: {
            height: 30,
            backgroundColor: 'transparent',
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5
        },
        groupContentControlXL: {
            height: 120,
            backgroundColor: 'transparent',
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5,
        },
        groupContentTextArea: {
            flex: 1,
            borderWidth: 1,
            borderColor: Configs_Default.Color.Primary,
            padding: 10,
            borderRadius: 5
        },
        groupContentTitle: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        groupContentTitleDetail: {
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
        },
        groupContentValue: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        groupContentValueCircle: {
            height: 20,
            width: 20,
            borderRadius: 10,
            backgroundColor: Configs_Default.Color.Pending,
            marginRight: 5
        },
        groupContentValueDetail: {
            fontWeight: 'bold',
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
        },
        groupContentValueDetailPending: {
            color: Configs_Default.Color.Pending,
        },
        groupContentValueDetailTime: {
            color: Configs_Default.Color.Reject,
        },
        groupContentPadingLeft: {
            paddingLeft: 5,
        },
        groupContentPadingRight: {
            paddingRight: 5,
        },
        groupContentRight: {
            flex: 1,
            marginLeft: 10,
            alignItems: 'flex-end',
            alignContent: 'flex-end',
        },
        groupContentLeft: {
            flex: 1,
            marginRight: 10,
            alignItems: 'flex-start',
            alignContent: 'flex-start',
        },
        checkBar: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
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
        btnAttach: {
            flex: 1,
            borderWidth: 1,
            borderColor: Configs_Default.Color.Primary,
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center"
        },
        txtAttach: {
            flex: 9,
            color: Configs_Default.Color.TextColor,
            paddingLeft: 10,
            opacity: 0.6
        },
        iconAttach: {
            flex: 1,
            fontSize: 22,
            color: Configs_Default.Color.Secondary,
            textAlign: "center",
            paddingRight: 5
        },
        btnSubmitText: {
            fontSize: 16,
            color: '#FFFFFF'
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
        btnReject: {
            borderRadius: 5,
            margin: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: Configs_Default.Color.Reject,
        },
        btnRejectText: {
            fontSize: 16,
            color: '#FFFFFF'
        },
        btnApproved: {
            borderRadius: 5,
            margin: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: Configs_Default.Color.Approved,
        },
        btnApprovedText: {
            fontSize: 16,
            color: '#FFFFFF'
        },
        filterDialog: {
            width: "100%"
        },
        textInput: {
            color: '#333333',
        }
    }),

    DetailLeaveRequest: StyleSheet.create({
        groupHeader: {
            height: 50,
            backgroundColor: '#F8F8F8',
            paddingLeft: 10,
            paddingRight: 10,
            flexDirection: 'row'
        },
        groupHeaderTitle: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        groupHeaderTitleText: {
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
            textTransform: Configs_Default.Text.TransformHeaderTitleDetail,
        },
        groupHeaderInfo: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        groupHeaderInfoTitle: {
            fontSize: 13,
            color: '#999999',
            paddingRight: 5,
        },
        groupHeaderInfoValue: {
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
            fontWeight: 'bold'
        },
        groupContent: {
            height: "auto",
            backgroundColor: 'transparent',
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: '#dfdfdf',
            paddingTop: 10,
            paddingBottom: 10
        },
        groupContentControl: {
            height: 40,
            backgroundColor: 'transparent',
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 5
        },
        checkboxot: {
            alignSelf: 'flex-end'
        },
        groupContentControlXS: {
            height: 30,
            backgroundColor: 'transparent',
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5
        },
        groupContentControlXL: {
            height: 120,
            backgroundColor: 'transparent',
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5,
        },
        fullWidth: {
            width: "100%"
        },
        groupContentTextInput: {
            flex: 1,
            borderWidth: 1,
            borderColor: Configs_Default.Color.Primary,
            padding: 10,
            borderRadius: 5
        },
        groupContentTextArea: {
            flex: 1,
            borderWidth: 1,
            borderColor: Configs_Default.Color.Primary,
            padding: 10,
            borderRadius: 5
        },
        groupContentTitle: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        groupContentCheckbox: {
            position: 'absolute',
            right: -25,
            top: -5
        },
        groupContentTitleDetail: {
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
        },
        groupContentValue: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        groupContentValueCircle: {
            height: 20,
            width: 20,
            borderRadius: 10,
            backgroundColor: Configs_Default.Color.Pending,
            marginRight: 5
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
        groupContentValueDetail: {
            fontWeight: 'bold',
            fontSize: 15,
            color: Configs_Default.Color.TextColor,
        },
        groupContentValueDetail1: {
            color: Configs_Default.Color.Pending,
        },
        groupContentValueDetail2: {
            color: Configs_Default.Color.Approved,
        },
        groupContentValueDetail3: {
            color: Configs_Default.Color.Reject,
        },
        groupContentValueDetail5: {
            color: Configs_Default.Color.Wait,
        },
        groupContentValueDetail6: {
            color: Configs_Default.Color.Canceled,
        },
        groupContentValueDetailTime: {
            color: Configs_Default.Color.Reject,
        },
        checkBar: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
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
        btnReject: {
            borderRadius: 5,
            margin: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: Configs_Default.Color.Reject,
        },
        btnRejectText: {
            fontSize: 16,
            color: '#FFFFFF'
        },
        btnApproved: {
            borderRadius: 5,
            margin: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: Configs_Default.Color.Approved,
        },
        btnApprovedText: {
            fontSize: 16,
            color: '#FFFFFF'
        },
        groupContentPadingLeft: {
            paddingLeft: 5,
        },
        groupContentPadingRight: {
            paddingRight: 5,
        },
    })
}