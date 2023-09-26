import { StyleSheet, Dimensions } from "react-native";
import { HrmSizeScale } from '../../../../libs/HrmLibs';



const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const CONST_MIN_WIDTH_ITEM = 150;


export const Responsive = {
    Group: StyleSheet.create({
        row: {
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap"
        },
        colXL: {
            flex: 1
        },
        colLG: {
            flex: 0.75
        },
        colMD: {
            flex: 0.5
        },
        colSM: {
            flex: 0.33
        },
        col: {
            flex: 0.25
        },


    })
}