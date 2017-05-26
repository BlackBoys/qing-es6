import { XuntongJSBridge } from "./qing";
import { Error } from "./error";
/**
 * 构造函数
 * 
 * @class JsbUtil
 */
class JsbUtil {

    /**
     * 基础方法，用于替代XuntongJSBridge的call方法，
     * 取消了第三个参数（回调函数），
     * 本类其他快捷方法都使用本方法
     * 
     * @param {string} methname 
     * @param {*} config 
     * @returns {Promise<any>} 
     * 
     * @memberof JsbUtil
     */
    call(methname: string, config: any): Promise<any> {
        return new Promise(function (resolve, reject) {
            XuntongJSBridge.call(methname, config, function (result: any) {
                if (result.success === "true" || result.success === true) resolve(result.data);
                else if (result.success === "false" || result.success === false) reject(new Error(result))
            });
        })
    }

    getPersonInfo(): Promise<any> {
        return this.call('getPersonInfo', {});
    }

    getNetworkType(): Promise<any> {
        return this.call('getNetworkType', {});
    }

    /**
     * 调用其他app
     * 
     * @param {*} config 
     * @returns {Promise<any>} 
     * 
     * @memberof JsbUtil
     */
    gotoApp(config: any): Promise<any> {
        return this.call('gotoApp', config);
    }

    sinin(): Promise<any> {
        return this.call('localFunction', { 'name': 'signin' });
    }

    createChat(): Promise<any> {
        return this.call('localFunction', { 'name': 'createChat' });
    }

    selectFile(selectType?: string): Promise<any> {
        if (selectType) return this.call('selectFile', {
            selectType: selectType
        });
        else return this.call('selectFile', {});
    }

    showFile(config: any): Promise<any> {
        return this.call('selectFile', config);
    }

    selectPic(): Promise<any> {
        return this.call('selectPic', {});
    }

    scanQRCode(needResult: number, scanType: ArrayConstructor): Promise<any> {
        return this.call('scanQRCode', {
            needResult: needResult,
            scanType: scanType
        });
    }

    selectOrg(): Promise<any> {
        return this.call('selectOrg', {});
    }

    selectDepts(): Promise<any> {
        return this.call('selectDepts', {});
    }

    selectPersons(isMulti: string, pType: string): Promise<any> {
        return this.call('selectPersons', { 'isMulti': isMulti, 'pType': pType });
    }

    selectPerson(pType: string): Promise<any> {
        return this.call('selectPerson', { 'pType': pType });
    }

    getCurrentPosition(): Promise<any> {
        return this.call('getCurrentPosition', {});
    }

    getAdminOpenId(): Promise<any> {
        return this.call('getAdminOpenId', {});
    }

    socialShare(shareWay: string, shareType: string, shareContent: string): Promise<any> {
        return this.call('getAdminOpenId', { shareWay: shareWay, shareType: shareType, shareContent: shareContent });
    }

    createPop(config: any): Promise<any> {
        return this.call('createPop', config);
    }

    defback(): Promise<any> {
        return new Promise(function (resolve, reject) {
            XuntongJSBridge.call('defback', {}, function () {
                resolve();
            });
        })
    }

    previewImage(current: string, urls: ArrayConstructor): Promise<any> {
        return this.call('previewImage', { current: current, urls: urls });
    }

    getMessageById(msgId: string): Promise<any> {
        return this.call('getMessageById', { 'msgId': msgId });
    }

    openInBrowser(url: string): Promise<any> {
        return this.call('openInBrowser', { 'url': url });
    }

    downloadFile(fileId: string, fileName: string, fileSize: string): Promise<any> {
        return this.call('downloadFile', { 'fileId': fileId, 'fileName': fileName, 'fileSize': fileSize });
    }
}
export { XuntongJSBridge, JsbUtil };