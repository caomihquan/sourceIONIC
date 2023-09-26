
import { Injectable } from '@angular/core';
import  LeaveAndOTConst from 'src/app/shared/constants/LeaveAndOTConst.js';
import  ReportConst from 'src/app/shared/constants/ReportConst.js';
import { TranslateService,} from '@ngx-translate/core';
import { AuthStore } from '../auth/auth.store';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import  HrmStorageConst from 'src/libs/constants/HrmStorageConst.js';
import * as moment from 'moment';
import HrmStorage from 'src/libs/core/HrmStorage';
import { IPConfig } from 'src/IPConfig';
import { Platform } from '@ionic/angular';
import { el } from 'date-fns/locale';
import { LanguageService } from '../language/language.service';
const IsNumber = (number) => {
  const regex = /^\d*$/;
  return regex.test(number);
};

const KEY_LEAVE = LeaveAndOTConst.KEY;
@Injectable({
  providedIn: 'root'
})
export class CommonHandlerService{
  user: any;
  Lang: any;
  constructor(private authStore: AuthStore,
    private translate: TranslateService,
    private platform: Platform,
    private languageService: LanguageService
  ) {
    this.user = this.authStore.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.setDefaultLang(this.authStore.getLanguage());
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(this.authStore.getLanguage() ? this.authStore.getLanguage() : (browserLang.match(/en|fr/) ? browserLang : 'vn'));
    this.getLanguage();
  }

  async getLanguage(){
    this.Lang = await this.languageService.getLanguage();
  }
  convertMinute(minute){
    const name = this.Lang.COMMON.Minute
    if (typeof minute == 'number') {
        minute = (minute).toFixed(2);
        return `${minute} ${name.toLocaleLowerCase()}`;
    }
    return `0 ${name.toLocaleLowerCase()}`;
  }

  convertHour(hour){
      const name = this.Lang.COMMON.Hour
      if (typeof hour == 'number') {
          hour = (hour).toFixed(2);
          return `${hour} ${name.toLocaleLowerCase()}`;
      }
      return `0 ${name.toLocaleLowerCase()}`;
  }

  convertDays(day){
      const name = this.Lang.COMMON.Day
      if (typeof day == 'number') {
          day = (day).toFixed(2);
          return `${day} ${name.toLocaleLowerCase()}`;
      }
      return `0 ${name.toLocaleLowerCase()}`;
  }
  convertDataLeave(data, sortByKey, listGroupName = null){
      if (!data || typeof data != 'object' || data.length == 0) return data;
      let resultData = [];
      let dataConverted = {};
      const listMonthName = this.Lang.COMMON.MonthNames

      for (let i = 0; i < data.length; i++) {
          const monthName = listMonthName[new Date(data[i][sortByKey]).getMonth()];
          data[i][KEY_LEAVE.dayOfMonth] = new Date(data[i][KEY_LEAVE.BegDate]).getDate();

          const groupKey = sortByKey == KEY_LEAVE.BegDate ? monthName : data[i][sortByKey] || '';
          if (dataConverted[groupKey]) {
              dataConverted[groupKey].push(data[i]);
          } else {
              dataConverted[groupKey] = [data[i]];
          }
      }

      for (let i = 0; i < Object.keys(dataConverted).length; i++) {
          let data = dataConverted[Object.keys(dataConverted)[i]];
          data = data.map((current, index, array) => {
              current[KEY_LEAVE.TotalRecord] = array ? array.length : 0;
              if (current[KEY_LEAVE.strStatus] != null) {
                  let array = [];
                  let arrStatus = current[KEY_LEAVE.strStatus].split(';');
                  if (arrStatus.length > 0) {
                      arrStatus.map(item => {
                          let arrLevel = item.split(',');
                          if (arrLevel.length > 0) {
                              array.push(arrLevel[1])
                          }
                      })
                  }
                  current[KEY_LEAVE.ArrayStatus] = array;
              }

              if (moment(current[KEY_LEAVE.BegDate]).isValid() && moment(current[KEY_LEAVE.EndDate]).isValid()) {
                  const firstDate = moment(current[KEY_LEAVE.BegDate]).format(CommonConst.FormatSQLDate);
                  const lastDate = moment(current[KEY_LEAVE.EndDate]).format(CommonConst.FormatSQLDate);
                  if (firstDate != lastDate) {
                      current[CommonConst.KEY.FirstDateLeaveItem] = moment(current[KEY_LEAVE.BegDate]).format(CommonConst.FormatDDMM);
                      current[CommonConst.KEY.LastDateLeaveItem] = moment(current[KEY_LEAVE.EndDate]).format(CommonConst.FormatDDMM);
                  }
              }

              return current;
          }).sort((current, next) => next[KEY_LEAVE.dayOfMonth] > current[KEY_LEAVE.dayOfMonth] ? 1 : -1);

          const groupName = Object.keys(dataConverted)[i] || '';
          resultData.push({
              GroupName: groupName,
              Index: sortByKey == KEY_LEAVE.BegDate ? listMonthName.indexOf(groupName) : groupName,
              TotalDayNum: data.reduce((t, { DayNum }) => t + DayNum, 0),
              [CommonConst.KEY.Data]: data
          })
      }

      if (listGroupName && typeof listGroupName == 'object' && Object.keys(listGroupName).length > 0) {
          resultData = resultData.map(element => {
              let indexGN = null;
              let currentGN = null;
              let name = element[KEY_LEAVE.GroupName];
              listGroupName.find((item, index) => {
                  if (item[KEY_LEAVE.key] == element[KEY_LEAVE.GroupName]) {
                      indexGN = index;
                      currentGN = item;
                      return;
                  }
              });

              name = currentGN != null ? currentGN[KEY_LEAVE.name] : name;
              indexGN = indexGN != null ? indexGN : element[KEY_LEAVE.Index];
              element[KEY_LEAVE.GroupName] = name;
              element[KEY_LEAVE.Index] = indexGN;

              return element;
          })
      }

      if (resultData && typeof resultData == 'object' && resultData.length > 0) {
          resultData = resultData.map(item => {
              if (item && typeof item[CommonConst.KEY.Data] == 'object') {
                  item[CommonConst.KEY.Data] = item[CommonConst.KEY.Data].sort((cur, next) => {
                      return moment(cur[KEY_LEAVE.BegDate]).isAfter(next[KEY_LEAVE.BegDate]) ? -1 : 1;
                  })
              }
              return item;
          });
      }

      return resultData;
  }

getYears(){ //DowCode
    const years = [];
    const subMoment = moment().add(1, 'years');
    for (let i = 0; i <= 20; i++) {
        years.push({ key: subMoment.year() });
        subMoment.subtract(1, 'years');
    }
    return years;
}
getYearsOfDow(){ //
    const years = [];
    const subMoment = moment().add(1, 'years');
    for (let i = 0; i <= 20; i++) {
        years.push({ DowCode: subMoment.year() });
        subMoment.subtract(1, 'years');
    }
    return years;
}

convertTree(data = [], root, id, parentId, name){
    let resultData = {};
    data.forEach(item => {
        const keyID = id || CommonConst.KEY.id;
        const keyName = name || CommonConst.KEY.name;
        const keyParentID = parentId || CommonConst.KEY.parentId;

        const itemID = item[CommonConst.KEY.id] = item[keyID];
        const itemName = item[CommonConst.KEY.name] = item[keyName];
        const itemParentId = item[CommonConst.KEY.parentId] = item[keyParentID];
        resultData[itemID] = Object.assign(resultData[itemID] || {}, item);

        resultData[itemParentId] = resultData[itemParentId] || {};
        resultData[itemParentId][CommonConst.KEY.children] = resultData[itemParentId][CommonConst.KEY.children] || [];
        resultData[itemParentId][CommonConst.KEY.children].push(resultData[itemID]);
    });
    return resultData[root] ? resultData[root].children : [];
}

slugify(str){
    if (str !== null && str !== undefined) {
        str = str.toString();
    }
    if (str) {
        str = str.trim().toLowerCase(); //str.replace(/^\s+|\s+$/g, ''); // trim
        var from = "áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưựứừửữđýỳỷỹ";
        var to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuudyyyy";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        str = str.replace(/[^a-z0-9 _-]/g, '').replace(/\s+/g, ' ').replace(/-+/g, ' ');
        return str;
    } else {
        return "";
    }
}

ConvertPhotoImage(items = [], fieldId, fieldUrl){
    const apiIMG = IPConfig.IP + "Utility/EmpPhoto?id=";
    if (items && items.length > 0 && fieldId && fieldUrl) {
        for (var i = 0; i < items.length; i++) {
            let photoID = items[i][fieldId] ? items[i][fieldId] : "";
            items[i][fieldUrl] = apiIMG + btoa(photoID);
        }
        return items;
    }
    else return [];
}

ConvertPhotoUrl(photoID){
    const apiIMG = IPConfig.IP + "Utility/EmpPhoto?id=";
    if (photoID) {
        return apiIMG + window.btoa(photoID);
    }
    else return apiIMG;
}

ConvertDataColor(items = [], colors = []){
    if (items && items.length > 0 && colors && colors.length) {
        let y = 0;
        for (var i = 0; i < items.length; i++) {
            items[i][CommonConst.KEY.Color] = colors[y];
            y = y == colors.length - 1 ? 0 : y + 1;
        }
        return items;
    }
    else return [];
}

ConvertDataGroupChart(items = [], colors = [], fieldKey){
    if (items && items.length > 0 && fieldKey) {
        let y = 0;
        let rs = {};
        for (let i = 0; i < items.length; i++) {
            let groupKey = items[i][fieldKey];
            if (rs[groupKey]) {
                rs[groupKey].Data.push(items[i]);
            } else {
                rs[groupKey] = {
                    Data: [items[i]],
                    Color: colors[y],
                }
                y = y == colors.length - 1 ? 0 : y + 1;
            }
        }

        return rs;
    }
    else return {};
}

ConvertDataGroupGender(items = [], fieldKey, fieldGender){
    if (items && items.length > 0 && fieldKey && fieldGender && ReportConst.KEY.Appoint.length) {
        let rs = { Male: [[], [], [], [], []], Female: [[], [], [], [], []], Length: 0, };
        let dept = []

        items.filter(x => x[fieldGender] == '0').map(ele => {
            ReportConst.KEY.Appoint.map((appoint, index) => {
                rs.Male[index].push({ x: ele[fieldKey], y: ele[appoint] });
            })
        })
        items.filter(x => x[fieldGender] == '1').map(ele => {
            ReportConst.KEY.Appoint.map((appoint, index) => {
                rs.Female[index].push({ x: ele[fieldKey], y: ele[appoint] });
            })
        })

        items.map(ele => {
            if (dept.indexOf(ele[fieldKey]) == -1) {
                dept.push(ele[fieldKey])
            }
        })
        rs.Length = dept.length;

        return rs;
    }
    else return {};
}

GetErrorMessage(strError){
    if (strError) {
        const arrMsgError =  HrmStorage.getData(HrmStorageConst.MessageError);
        const arrSplit = strError.split("$");
        const errorCode = arrSplit[0];
        let msgError;
        try {
            const langcode = this.Lang.ERROR[errorCode] ? this.Lang.ERROR[errorCode] : errorCode
            msgError = this.Lang.ERROR[errorCode] ? this.Lang.ERROR[errorCode] : errorCode
            msgError = arrMsgError && arrMsgError[errorCode] ?  (arrMsgError[errorCode]) : langcode;
        } catch (error) {
            msgError = msgError;
        }
        
        // nếu ko có trong local strogage => lấy trong json => nếu ko có nữa lấy mã gốc.
        if (arrSplit.length > 1 && msgError) {
            let args = arrSplit.slice(1, arrSplit.length);

            let msgResult = msgError.replace(/{(\d+)}/g, (match, number) => {
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
            return { message: msgResult, isTranslate: true };
        } else if (msgError != errorCode) {
            return { message: msgError, isTranslate: true };
        } else if (msgError === errorCode && !msgError.trim()) {
            return { message: msgError, isTranslate: false };
        }
    }
    return { message: strError, isTranslate: true };
}

ResponsiveFontSizeWebView(str, scale){
    let regexp, match;
    // FontSize
    regexp = /font-size:(\s*\d*)px/g;
    match = str.match(regexp);
    if (match && Array.from(match).length > 0) {
        match = Array.from(match);
        match.forEach(v => {
            if (v && v.indexOf('font-size:') > -1 && v.indexOf('px') > -1) {
                let strPixel = v;
                var arrPixel = strPixel.split(regexp);
                if (arrPixel.length > 2) {
                    let pixel = arrPixel[1].trim();
                    let Scalepixel = pixel * scale;
                    str = str.replace(strPixel, 'font-size:' + Scalepixel + 'px');
                }
            }
        })
    }

    // LineHeight
    regexp = /line-height:(.*?)px/g;
    match = str.match(regexp);
    if (match && Array.from(match).length > 0) {
        match = Array.from(match);
        match.forEach(v => {
            if (v && v.indexOf('line-height:') > -1 && v.indexOf('px') > -1) {
                let strPixel = v;
                str = str.replace(strPixel, 'line-height:auto');
            }
        })
    }
    return str;
}

IsNumber = (value) =>{
  return typeof(value) === "number"
}

ConvertViToEn(str = ''){
    str = str + '';
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

    return str;
}

decodeHtml(str){
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
        let chr;
        if (entity.charAt(0) === "#") {
            const code = entity.charAt(1) === 'x' ?
                parseInt(entity.substr(2).toLowerCase(), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = 0//alphaIndex[entity];
        }
        return chr || s;
    });
}

 getFunctionItem (functionID){
    const functionList = HrmStorage.getData(HrmStorageConst.FunctionList);
    const result = functionList.filter(item => item.FunctionID == functionID);
    const resultFunction = result.length > 0 && {
        id: result[0].FunctionID,
        screen: result[0].Url,
        title: result[0].DefaultName,
        icon: result[0].Icon
    } || {};
    return resultFunction;
  }

getFieldVisible(configFields = [], field){
    if (!configFields || !field) return

    var filter = configFields.filter(item => item.FieldID == field && item.Visible == true);
    return filter && filter[0] ? true : false;
}

// getBSSID(bssid){
//     if (!bssid) return
//     const str = bssid;
//     const arr = str.split(":");
//     for (var index in arr) {
//         arr[index] = arr[index].length == 1 ? "0" + arr[index] : arr[index];
//     }
//     return arr.join(":");
// }
formatNum(number, loginInfo, type?){
  if (number !== null && loginInfo) {

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
          let i = parseInt(number = Math.abs(Number(number) || 0).toFixed(decimalCount))
          let j = (i.toString().length > 3) ? i.toString().length % 3 : 0;
          return negativeSign + (j ? i.toString().substr(0, j) + thousands : '') + i.toString().substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
              (decimalCount ? decimal + Math.abs(number - i).toFixed(decimalCount).slice(2) : "");
      }catch (e) {
          return 0;
      }
  }
}

  dragElement(id){
    const elmnt = document.getElementById(id);
    const width= this.platform.width() - 50 ;
    const height= this.platform.height() - 50;
    if (elmnt) {
      elmnt.addEventListener('touchmove', (e) => {
          e.preventDefault();
          const newX = e.touches[0].clientX;
          const newY =  e.touches[0].clientY;
          if(newX > width){
            elmnt.style.left = (width-10).toString() + 'px';
          }
          else if(newX < 0){
          }
          else{
            elmnt.style.left = newX + 'px';
          }
          //top
          if(newY  > height){
            return;
          }
          else if(newY < 60){
            return;
          }
          else{
            elmnt.style.top = newY + 'px';
          }
      });
    };
  };
}
