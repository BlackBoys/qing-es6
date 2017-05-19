import XuntongJSBridge from "./qing";
let getPersonInfo = function () {
    return new Promise(function (resolve, reject) {
        XuntongJSBridge.call('getPersonInfo', {}, function (result) {
            if (result.success) resolve(result.data);
            else if (!result.success) reject({ error: result.error, errorCode: result.errorCode })
        });
    })
}

let selectPersons = function (config) {
    return new Promise(function (resolve, reject) {
        XuntongJSBridge.call('selectPersons', config, function (result) {
            if (result.success) resolve(result.data);
            else if (!result.success) reject({ error: result.error, errorCode: result.errorCode })
        });
    });
}

export { getPersonInfo, selectPersons };