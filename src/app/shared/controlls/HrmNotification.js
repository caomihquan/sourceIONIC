import CommonConst from '../../../libs/constants/CommonConst';

const noneFunction = () => { };
const HrmNotification = {
    Alert: (body = '', {
        cancelable = false,
        title = '',
        content = '',
        onOK = noneFunction,
        onCancel = noneFunction
    } = {}) => { },

    Toast: (body = '', {
        display = CommonConst.HrmProvider,
        timeout = 0
    } = {}) => { }
};
export default HrmNotification;