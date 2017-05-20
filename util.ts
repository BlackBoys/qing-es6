import { XuntongJSBridge } from "./qing";

class Error {
    error: string;
    errorCode: number;
    constructor(result: Error) {
        this.error = result.error;
        this.errorCode = result.errorCode;
    }
}

class SelectFileConfig {
    selectType: string
}

class ScanQRCodeConfig {
    needResult: number;
    scanType: ArrayConstructor;
}


class JsbUtil {
    call(methname: string, config: any) {
        return new Promise(function (resolve, reject) {
            XuntongJSBridge.call(methname, config, function (result: any) {
                if (result.success === "true") resolve(result.data);
                else if (result.success === "false") reject(new Error(result))
            });
        })
    }

    getPersonInfo() {
        return this.call('getPersonInfo', {});
    }

    getNetworkType() {
        return this.call('getNetworkType', {});
    }


    gotoApp(config: any) {
        return this.call('gotoApp', config);
    }

    sinin() {
        return this.call('localFunction', { 'name': 'signin' });
    }

    createChat() {
        return this.call('localFunction', { 'name': 'createChat' });
    }

    selectFile(config?: SelectFileConfig) {
        if (config) return this.call('selectFile', config);
        else return this.call('selectFile', {});
    }

    showFile(config: any) {
        return this.call('selectFile', config);
    }

    selectPic() {
        return this.call('selectPic', {});
    }

    scanQRCode(config: ScanQRCodeConfig) {
        return this.call('scanQRCode', config);
    }

    selectOrg() {
        return this.call('selectOrg', {});
    }

    selectDepts() {
        return this.call('selectDepts', {});
    }

    selectPersons(isMulti: string, pType: string) {
        return this.call('selectPersons', { 'isMulti': isMulti, 'pType': pType });
    }

    selectPerson(pType: string) {
        return this.call('selectPerson', { 'pType': pType });
    }

    getCurrentPosition() {
        return this.call('getCurrentPosition', {});
    }

    getAdminOpenId() {
        return this.call('getAdminOpenId', {});
    }

    socialShare(shareWay: string, shareType: string, shareContent: string) {
        return this.call('getAdminOpenId', { shareWay: shareWay, shareType: shareType, shareContent: shareContent });
    }

    createPop(config: any) {
        return this.call('createPop', config);
    }

    defback() {
        return new Promise(function (resolve, reject) {
            XuntongJSBridge.call('defback', {}, function () {
                resolve();
            });
        })
    }

    previewImage(current: string, urls: ArrayConstructor) {
        return this.call('previewImage', { current: current, urls: urls });
    }

    getMessageById(msgId: string) {
        return this.call('getMessageById', { 'msgId': msgId });
    }

    openInBrowser(url: string) {
        return this.call('openInBrowser', { 'url': url });
    }

    downloadFile(fileId: string, fileName: string, fileSize: string) {
        return this.call('downloadFile', { 'fileId': fileId, 'fileName': fileName, 'fileSize': fileSize });
    }
}
export { XuntongJSBridge, JsbUtil };