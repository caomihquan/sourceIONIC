import { Dimensions } from 'react-native'


const _CONSTANT = {
    FREFIX_NAME: "HrmAppInfo"
}
const STANDARD_WIDTH = 414;
const STANDARD_HEIGHT = 736;

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class Response {
    static wSize = function (number) {
        return number / STANDARD_WIDTH * DEVICE_WIDTH;
    }
    static hSize = function (number) {
        return number / STANDARD_HEIGHT * DEVICE_HEIGHT;
    }
    static fontSize = function (number) {
        return number / STANDARD_WIDTH * DEVICE_WIDTH;
    }
}