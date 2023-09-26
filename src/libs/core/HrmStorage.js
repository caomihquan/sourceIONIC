const _CONSTANT = {
    FREFIX_NAME: "HrmAppInfo"
}

export default class HrmStorage {
    static setData(name, data) {
        try {
            localStorage.setItem(_CONSTANT.FREFIX_NAME + name.trim(), JSON.stringify(data));
        } catch (exception) {}
    }
    static getData(name) {
        try {
            const value = localStorage.getItem(_CONSTANT.FREFIX_NAME + name.trim());
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (exception) {}
        return null;
    }
    static deleteData(name) {
        try {
            localStorage.removeItem(_CONSTANT.FREFIX_NAME + name.trim());
        } catch (exception) {}
    }
    static clearData() {
        localStorage.clear();
    }

}