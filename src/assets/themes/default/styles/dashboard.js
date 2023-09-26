import { StyleSheet, Dimensions } from 'react-native';
import { Configs_Default } from '../config';
import { HrmSizeScale } from '../../../../libs/HrmLibs';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const fnBorderRadius = 5;
const fnPaddingTB = 40;
const fnPaddingLR = 50;

const CELL_SIZE = (DEVICE_WIDTH - 70) / 3;
const CELL_MARGIN_TOP = 13;
const CELL_MARGIN_RIGHT = 130;
const BUTTON_SIZE = HrmSizeScale.wSize(50);

export const Dashboard = {
    HomePage: StyleSheet.create({
        viewInfo: {
            backgroundColor: 'transparent',
            height: HrmSizeScale.hSize(30)
        },
        text: {
            color: '#fff',
            fontSize: HrmSizeScale.fontSize(30),
            fontWeight: 'bold'
        },
        function_button: {
            // backgroundColor: "green",
            flex: 1,
            // flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: fnBorderRadius,

            backgroundColor: '#fff',
            elevation: 2, // Android
            shadowColor: 'rgba(0,0,0, .4)', // IOS
            shadowOffset: { height: 3, width: 3 }, // IOS
            shadowOpacity: 0.5, // IOS
            shadowRadius: 1, //IOS
        },

        // functionName: {
        //     marginLeft: 15,
        //     textAlign: 'center',
        //     marginTop: -30,
        //     width: 100,
        //     backgroundColor: 'transparent',
        //     transform: [
        //         { rotate: '-45deg' }
        //     ]
        // },
        // functionIcon: {
        //     top: -20,
        //     left: -20,
        //     fontSize: HrmSizeScale.fontSize(40),
        //     color: Configs_Default.Color.Primary,
        //     backgroundColor: 'transparent',
        //     transform: [
        //         { rotate: '-45deg' }
        //     ]
        // },
        swiperWrapper: {

        },
        swiperViewDot: {
            backgroundColor: 'rgba(0,0,0,.2)',
            width: HrmSizeScale.wSize(8),
            height: HrmSizeScale.wSize(8),
            borderRadius: 9999,
            margin: 3,
        },
        swiperActiveDot: {
            backgroundColor: Configs_Default.Color.Primary,
            width: HrmSizeScale.wSize(8),
            height: HrmSizeScale.wSize(8),
            borderRadius: 9999,
            margin: 3
        },
        modalView: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            flex: 1
        },
        modalCommonText: {
            fontSize: HrmSizeScale.fontSize(18),
            right: BUTTON_SIZE + 35,
            position: "absolute",
        },
        modalCommonButton: {
            backgroundColor: Configs_Default.Color.Primary,
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
            justifyContent: "center",
            alignItems: "center",
            right: 20,
            borderRadius: 9999,
            position: "absolute",
            elevation: 2, // Android
            shadowColor: "rgba(0,0,0, .4)", // IOS
            shadowOffset: { height: 3, width: 3 }, // IOS
            shadowOpacity: 0.5, // IOS
            shadowRadius: 1, //IOS
        },

        modalText5: {
            bottom: BUTTON_SIZE * 8 + 75,
        },
        modalButton5: {
            bottom: BUTTON_SIZE * 8 + 60,
        },
        modalText00: {
            bottom: BUTTON_SIZE * 7 + 65,
        },
        modalButton00: {
            bottom: BUTTON_SIZE * 7 + 50,
        },
        modalText0: {
            bottom: BUTTON_SIZE * 6 + 55,
        },
        modalButton0: {
            bottom: BUTTON_SIZE * 6 + 40,
        },
        modalText1: {
            bottom: BUTTON_SIZE * 5 + 45,
        },
        modalButton1: {
            bottom: BUTTON_SIZE * 5 + 30,
        },
        modalText2: {
            bottom: BUTTON_SIZE * 4 + 30,
        },
        modalButton2: {
            bottom: BUTTON_SIZE * 4 + 20,
        },
        modalText3: {
            bottom: BUTTON_SIZE * 3 + 20,
        },
        modalButton3: {
            bottom: BUTTON_SIZE * 3 + 10,
        },
        modalText4: {
            bottom: BUTTON_SIZE * 2 + 15,
            color: "#d43f3a",
        },
        modalText3_: {
            bottom: BUTTON_SIZE * 3 + 20,
            color: "#d43f3a",
        },
        modalButton3_: {
            backgroundColor: "#d43f3a",
            bottom: BUTTON_SIZE * 3 + 10,
            transform: [{ rotate: "45deg" }],
        },

        modalButton4: {
            backgroundColor: "#d43f3a",
            bottom: BUTTON_SIZE * 2,
            transform: [{ rotate: "45deg" }],
        },

        modalIcon: {
            fontSize: HrmSizeScale.fontSize(20)
        },
        modalIconLogout: {
            fontSize: HrmSizeScale.fontSize(20),
            transform: [
                { rotate: '-45deg' }
            ]
        },
        modalIconMain: {
            fontSize: HrmSizeScale.fontSize(20),
            transform: [{ rotate: "-45deg" }],
        },
        modalButtonMain: {
            backgroundColor: Configs_Default.Color.Primary,
            width: BUTTON_SIZE - 5,
            height: BUTTON_SIZE - 5,
            justifyContent: "center",
            alignItems: "center",
            right: 20,
            bottom: 25,
            position: "absolute",
            transform: [{ rotate: "45deg" }],
            elevation: 2, // Android
            shadowColor: "rgba(0,0,0, .4)", // IOS
            shadowOffset: { height: 3, width: 3 }, // IOS
            shadowOpacity: 0.5, // IOS
            shadowRadius: 1, //IOS
        },
        modalNumberMain: {
            position: "absolute",
            top: -5,
            right: 0,
            paddingVertical: 2,
            paddingHorizontal: 4,
            borderWidth: 2,
            borderRadius: 99999,
            borderColor: "#ffffff",
            backgroundColor: "#ff0000",
        },
        textNumberNof: {
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: HrmSizeScale.fontSize(10),
        },
        rightMinus10: {
            right: -5
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
            transform: [{ rotate: "45deg" }],
            elevation: 2, // Android
            shadowColor: "rgba(0,0,0, .4)", // IOS
            shadowOffset: { height: 3, width: 3 }, // IOS
            shadowOpacity: 0.5, // IOS
            shadowRadius: 1, //IOS
        },
        buttonMenuIcon: {
            fontSize: HrmSizeScale.fontSize(30),
            transform: [
                { rotate: '-45deg' }
            ]
        },
        ////////////////////////////////////////////////////
        wrapperImage: {
            width: DEVICE_WIDTH,
            height: DEVICE_HEIGHT,
        },
        wrapper: {
            flex: 1,
        },
        pageContainer: {
            flex: 1,
            backgroundColor: 'transparent',
        },
        content: {
            flex: 3,
            // height: HrmSizeScale.hSize(470), 
            // width: DEVICE_WIDTH,
        },
        pageFooter: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        footerContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 35,
        },
        imgAvatar: {
            width: HrmSizeScale.wSize(70),
            height: HrmSizeScale.hSize(70),
            borderRadius: 35,
            borderWidth: 3,
            borderColor: Configs_Default.Color.Primary,
            marginBottom: 10
        },
        infoName: {
            marginBottom: 10,
            fontSize: HrmSizeScale.fontSize(18),
            fontWeight: 'bold',
            color: '#666666'
        },
        infoPosition: {
            marginBottom: 10,
            fontSize: HrmSizeScale.fontSize(15),
            color: '#666666'
        },
        chat: {
            bottom: 120,
            backgroundColor: "#48A2FA",
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
            justifyContent: "center",
            alignItems: "center",
            right: 20,
            borderRadius: 9999,
            position: "absolute",
            elevation: 2, // Android
            shadowColor: "rgba(0,0,0, .4)", // IOS
            shadowOffset: { height: 3, width: 3 }, // IOS
            shadowOpacity: 0.5, // IOS
            shadowRadius: 1, //IOS
        },
        chatImage: {
            marginTop: 5,
            color: "#ffff"
        },
        languageContainer: {
            flexDirection: 'row',
            position: "absolute",
            alignSelf: "flex-start",
            alignItems: "flex-end",
        }
    }),
    GridItems: StyleSheet.create({
        wrapper: {
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
        },
        column: {
            flex: 1,
            alignItems: "center",
            zIndex: 10
        },
        columnPaddingTop: {
            paddingTop: CELL_SIZE / Math.sqrt(2) + CELL_MARGIN_TOP,
            zIndex: 100
        },
        cell: {
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: Configs_Default.Color.Primary,
            margin: ((CELL_SIZE * Math.sqrt(2)) - CELL_SIZE) / 2 + CELL_MARGIN_TOP,
            transform: [
                { rotate: "45deg" }
            ],
            backgroundColor: '#fff',
            elevation: 10, // Android
            borderWidth: 1,
            borderColor: 'rgba(100,100,100, .1)',
            shadowColor: 'rgba(0, 0, 0, .4)', // IOS
            shadowOffset: { height: 3, width: 3 }, // IOS
            shadowOpacity: 0.5, // IOS
            shadowRadius: 1, //IOS
        },
        cellBorderRadius: {
            borderRadius: 5,
        },
        cellMarginLeft: {
            marginLeft: CELL_MARGIN_RIGHT
        },
        cellMarginRight: {
            marginRight: CELL_MARGIN_RIGHT
        },
        cellContainer: {
            flex: 1,
        },
        cellBody: {
            flex: 1,
            borderRadius: CELL_SIZE / 2,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: "center",
            transform: [
                { rotate: '-45deg' }
            ],
        },
        cellHeader: {
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            // paddingTop: 20
        },
        cellIcon: {
            textAlign: "center",
            color: Configs_Default.Color.Primary,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: HrmSizeScale.fontSize(36),
        },
        cellFooter: {
            flex: 1
        },
        cellInfo: {
            textAlign: "center",
            color: '#666666',
            fontSize: HrmSizeScale.fontSize(13),
            marginTop: 5,
            //backgroundColor: '#ccc'
        },
        cellNumber: {
            position: "absolute",
            left: "30%",
            top: "60%",
            transform: [{ rotate: "0deg" }],
            paddingVertical: 3,
            paddingHorizontal: 6,
        },
        cellNumberText: {
            color: Configs_Default.Color.Secondary,
            fontWeight: "bold",
            fontSize: HrmSizeScale.fontSize(14),
        }
    })
};