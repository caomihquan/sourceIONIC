import CommonConst from 'src/libs/constants/CommonConst.js'
import moment from 'moment';

const FormatHandler = {
    formatDate: (date, loginInfo) => {
        if (date && Date.parse(date) && loginInfo) {
            const prDateFormat = loginInfo.PRDateFormat || CommonConst.FormatDate;
            let format = (prDateFormat + '').toLocaleUpperCase();
            return moment(date).format(format) || date;
        }
        return date ? date : "";
    },

    formatFullDate: (date, loginInfo) => {
        if (date && Date.parse(date) && loginInfo) {
            const prDateFormat = loginInfo.PRDateFormat || CommonConst.FormatDate;
            let format = (prDateFormat + '').toLocaleUpperCase() + " HH:mm:ss";

            return moment(date).format(format) || date;
        }

        return date ? date : "";
    },

    formatNum: (number, loginInfo, type) => {
        if (number != null && loginInfo) {

            let decimal = loginInfo.NumberDecimalSeparator;
            let thousands = loginInfo.NumberGroupSeparator;
            let decimalCount = loginInfo.PRDecPlaceCoeffSalary;

            switch (type) {
                case "s":
                    decimalCount = loginInfo.PRDecPlaceCurrencyForCal;
                    break;
                case "p":
                    decimalCount = loginInfo.PRDecPlaceCurrencyForPay
                    break;
                default:
                    decimalCount = loginInfo.PRDecPlaceCoeffSalary;
            }

            try {
                decimalCount = Math.abs(decimalCount);
                decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

                const negativeSign = number < 0 ? "-" : "";

                let i = parseInt(number = Math.abs(Number(number) || 0).toFixed(decimalCount)).toString();
                let j = (i.length > 3) ? i.length % 3 : 0;

                return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
                    (decimalCount ? decimal + Math.abs(number - i).toFixed(decimalCount).slice(2) : "");
            } catch (e) {
                return 0;
            }
        }
    },

}

export default FormatHandler;