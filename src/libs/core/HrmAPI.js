import * as EN from '../../i18n/locales/en';
import * as VN from '../../i18n/locales/vn';
import HrmI18n from '../../i18n/HrmI18n';
import HrmStorage from './HrmStorage';
import { IPConfig } from './../../IPConfig';
import HrmAPIConst from '../constants/HrmAPIConst';
import CommonConst from '../constants/CommonConst';
import HrmStorageConst from '../constants/HrmStorageConst';
import CommonHandler from '../../components/shared/handlers/CommonHandler';
import HrmNotification from '../../components/shared/controlls/HrmNotification';
import { HrmNavigation } from './HrmNavigation';

export default class HrmAPI {
    static call = function(apiUrl, funcID, isNotification = true) {
        function run(apiUrl) {
            const me = this;
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            const _headers = {
                "HRM-Api-Url": apiUrl,
                "HRM-Function-ID": funcID,
                "HRM-Request-Url": "HrmMobileApp",
                "HRM-Api-Type": "HrmMobileApp",
                "HRM-Application-ID": "HrmMobileApp",
            };

            let _payload = null;
            me.setData = function(data) {
                _payload = data;
                return me;
            }

            me.done = async function(callback) {
                const loginInfo = await HrmStorage.getData(HrmStorageConst.LoginInfo);

                if (loginInfo) {
                    _headers["HRM-Session-ID"] = loginInfo.SessionID;
                    _headers["HRM-Token-ID"] = loginInfo.TokenID;
                    _headers["HRM-JWT-ID"] = loginInfo.Jwt;
                }

                let urlencoded = "headers=" + window.encodeURIComponent(JSON.stringify(_headers));
                if (_payload) {
                    urlencoded += "&payload=" + window.encodeURIComponent(JSON.stringify(_payload));
                }

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: urlencoded
                };
                let request = { IsError: true, Data: null, Error: null };
                fetch(IPConfig.IP + 'ApiHandler/Call', requestOptions)
                    .then(response => {
                        const contentType = response.headers.get('content-type');
                        if (response.ok && contentType.includes('application/json')) {
                            return response.json();
                        } else {
                            return Promise.reject({ status: response.status });
                        }
                    })
                    .then(response => {
                        request = { IsError: true, Data: null, Error: null };
                        if (response && response.Data && !response.ErrorCode && !response.ErrorLogin && !response.Error) {
                            const responseData = JSON.parse(response.Data);
                            request.IsError = false;
                            request.Data = responseData;
                        } else {
                            const error = response ? response.ErrorCode || response.ErrorLogin || response.Error : HrmI18n.t('COMMON.ErrorSystem');
                            const objError = CommonHandler.GetErrorMessage(error);
                            request.IsError = true;
                            request.Error = objError.message;

                            if (true === isNotification) {
                                HrmAPI.InitValidateAlert(objError);
                            } else {
                                HrmNotification.Alert(HrmI18n.t("COMMON.ErrorSystem"), { title: HrmI18n.t("COMMON.Error") });
                            }
                        }

                        return callback && callback(request);
                    })
                    .catch(() => {
                        HrmAPI.onCheckingOfflinePage();
                        return callback && callback(request);
                    });
            }
        }

        return new run(apiUrl);
    }

    static InitValidateAlert = (error) => {
        const { message, isTranslate } = error;

        if ((message + '').includes("405 (Method Not Allowed)"))
            return;

        if (isTranslate) {
            HrmNotification.Alert(message, { title: HrmI18n.t("COMMON.Error") });
        } else {
            HrmNotification.Alert(HrmI18n.t("COMMON.ConfirmUpdateErrorCode"), {
                title: HrmI18n.t("COMMON.Error"),
                onOK: HrmAPI.onOKUpdateError(message),
                onCancel: HrmAPI.onCancelUpdateError
            });
        }
    }

    static onOKUpdateError = (error) => () => {
        let messageAlert = HrmI18n.t(`ERROR.${error}`, { defaultValue: error });

        HrmAPI.call(HrmAPIConst.SYSTEM.Alias_GetDataError, HrmAPIConst.SYSTEM.GetDataError, false)
            .done(async(result) => {
                if (false == result.IsError) {
                    const data = result.Data || [];
                    const messageError = { CountDataError: 0, VN: {}, EN: {} };
                    const languageInfo = await HrmStorage.getData(HrmStorageConst.LanguageInfo);

                    data.map((item) => {
                        if (item.LanguageCode == CommonConst.VN)
                            messageError[CommonConst.VN][item.MsgCode] = item.MsgCaption;

                        if (item.LanguageCode == CommonConst.EN)
                            messageError[CommonConst.EN][item.MsgCode] = item.MsgCaption;

                        if (item.LanguageCode === languageInfo && messageAlert === item.MsgCode)
                            messageAlert = item.MsgCaption;
                    });
                    messageError.CountDataError = Object.keys(messageError.VN).length;

                    if (VN.default && VN.default.ERROR) {
                        VN.default.ERROR = {...VN.default.ERROR, ...messageError[CommonConst.VN] };
                    }

                    if (EN.default && EN.default.ERROR) {
                        EN.default.ERROR = {...EN.default.ERROR, ...messageError[CommonConst.EN] };
                    }

                    HrmStorage.setData(HrmStorageConst.MessageError, messageError);

                    messageAlert = messageAlert === error ? HrmI18n.t("COMMON.ErrorSystem") : messageAlert;
                    HrmNotification.Alert(messageAlert, { title: HrmI18n.t("COMMON.Error") });
                }
            });
    }

    static onCancelUpdateError = () => {
        setTimeout(() => HrmNotification.Alert(HrmI18n.t("COMMON.ErrorSystem"), { title: HrmI18n.t("COMMON.Error") }), 300);
    }

    static onCheckingOfflinePage = () => {
        //console.log("IPConfig.IP + CommonConst.OfflinePage", IPConfig.IP + CommonConst.OfflinePage)
        fetch(IPConfig.IP + CommonConst.OfflinePage)
            .then(response => {
                const status = response && response.status;
                if (status && 200 == status) {
                    HrmNavigation.reset(CommonConst.SCENE.MyOffline);
                } else {
                    HrmNotification.Alert(HrmI18n.t("NOTIFY.CheckConnection"), { title: HrmI18n.t("COMMON.Error") });
                }
            })
            .catch(() => HrmNotification.Alert(HrmI18n.t("NOTIFY.CheckConnection"), { title: HrmI18n.t("COMMON.Error") }));
    }
}