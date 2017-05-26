"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qing_1 = require("./qing");
exports.XuntongJSBridge = qing_1.XuntongJSBridge;
var error_1 = require("./error");
var JsbUtil = (function () {
    function JsbUtil() {
    }
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
    JsbUtil.prototype.call = function (methname, config) {
        return new Promise(function (resolve, reject) {
            qing_1.XuntongJSBridge.call(methname, config, function (result) {
                if (result.success === "true" || result.success === true)
                    resolve(result.data);
                else if (result.success === "false" || result.success === false)
                    reject(new error_1.Error(result));
            });
        });
    };
    JsbUtil.prototype.getPersonInfo = function () {
        return this.call('getPersonInfo', {});
    };
    JsbUtil.prototype.getNetworkType = function () {
        return this.call('getNetworkType', {});
    };
    /**
     * 调用其他app
     *
     * @param {*} config
     * @returns {Promise<any>}
     *
     * @memberof JsbUtil
     */
    JsbUtil.prototype.gotoApp = function (config) {
        return this.call('gotoApp', config);
    };
    JsbUtil.prototype.sinin = function () {
        return this.call('localFunction', { 'name': 'signin' });
    };
    JsbUtil.prototype.createChat = function () {
        return this.call('localFunction', { 'name': 'createChat' });
    };
    JsbUtil.prototype.selectFile = function (selectType) {
        if (selectType)
            return this.call('selectFile', {
                selectType: selectType
            });
        else
            return this.call('selectFile', {});
    };
    JsbUtil.prototype.showFile = function (config) {
        return this.call('selectFile', config);
    };
    JsbUtil.prototype.selectPic = function () {
        return this.call('selectPic', {});
    };
    JsbUtil.prototype.scanQRCode = function (needResult, scanType) {
        return this.call('scanQRCode', {
            needResult: needResult,
            scanType: scanType
        });
    };
    JsbUtil.prototype.selectOrg = function () {
        return this.call('selectOrg', {});
    };
    JsbUtil.prototype.selectDepts = function () {
        return this.call('selectDepts', {});
    };
    JsbUtil.prototype.selectPersons = function (isMulti, pType) {
        return this.call('selectPersons', { 'isMulti': isMulti, 'pType': pType });
    };
    JsbUtil.prototype.selectPerson = function (pType) {
        return this.call('selectPerson', { 'pType': pType });
    };
    JsbUtil.prototype.getCurrentPosition = function () {
        return this.call('getCurrentPosition', {});
    };
    JsbUtil.prototype.getAdminOpenId = function () {
        return this.call('getAdminOpenId', {});
    };
    JsbUtil.prototype.socialShare = function (shareWay, shareType, shareContent) {
        return this.call('getAdminOpenId', { shareWay: shareWay, shareType: shareType, shareContent: shareContent });
    };
    JsbUtil.prototype.createPop = function (config) {
        return this.call('createPop', config);
    };
    JsbUtil.prototype.defback = function () {
        return new Promise(function (resolve, reject) {
            qing_1.XuntongJSBridge.call('defback', {}, function () {
                resolve();
            });
        });
    };
    JsbUtil.prototype.previewImage = function (current, urls) {
        return this.call('previewImage', { current: current, urls: urls });
    };
    JsbUtil.prototype.getMessageById = function (msgId) {
        return this.call('getMessageById', { 'msgId': msgId });
    };
    JsbUtil.prototype.openInBrowser = function (url) {
        return this.call('openInBrowser', { 'url': url });
    };
    JsbUtil.prototype.downloadFile = function (fileId, fileName, fileSize) {
        return this.call('downloadFile', { 'fileId': fileId, 'fileName': fileName, 'fileSize': fileSize });
    };
    return JsbUtil;
}());
exports.JsbUtil = JsbUtil;
