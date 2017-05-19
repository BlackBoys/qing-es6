/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// if (window.XuntongJSBridge:any) return;
// {
// Android加上了这个if判断，如果当前window已经定义了XuntongBridge对象，不再重新加载
// 避免重新初始化_callback_map等变量，导致之前的消息回调失败，返回cb404
//alert('window already has a XuntongBridge object!!!');
//   return;
// };
Object.defineProperty(exports, "__esModule", { value: true });
///////////////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////////////本地调用的实际逻辑////////////////////////////////////////////
var _CUSTOM_PROTOCOL_SCHEME = 'xuntong', callbacksCount = 1, callbacks = {};
function _handleMessageFromXT(callbackId, message) {
    try {
        var callback = callbacks[callbackId];
        if (!callback)
            return;
        callback.apply(null, [message]);
    }
    catch (e) {
        // alert(e)
    }
}
/**
 * 获取用户ua信息,判断OS
 * @returns {string}
 */
function getOS() {
    var userAgent = navigator.userAgent;
    return userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 'ios' : userAgent.match(/Android/i) ? 'android' : '';
}
/**
 * 判断用户是否在云之家桌面端中
 * @returns {Array|{index: number, input: string}}
 */
function isCloudHub() {
    var userAgent = navigator.userAgent;
    return userAgent.match(/App\/cloudhub/);
}
// Use this in javascript to request native objective-c code
// functionName : string (I think the name is explicit :p)
// args : array of arguments
// callback : function with n-arguments that is going to be called when the native code returned
function _call(functionName, message, callback) {
    //只有在手机或电脑端云之家中才允许调用Xuntong JSBridge
    if (!(getOS() || isCloudHub()))
        return false;
    var hasCallback = callback && typeof callback == "function";
    var callbackId = hasCallback ? callbacksCount++ : 0;
    if (hasCallback)
        callbacks[callbackId] = callback;
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", _CUSTOM_PROTOCOL_SCHEME + ":" + functionName + ":" + callbackId + ":" + encodeURIComponent(JSON.stringify(message)));
    // For some reason we need to set a non-empty size for the iOS6 simulator...
    iframe.setAttribute("height", "1px");
    iframe.setAttribute("width", "1px");
    document.documentElement.appendChild(iframe);
    iframe.parentNode.removeChild(iframe);
    iframe = null;
}
var XuntongJSBridge = {
    // public
    invoke: _call,
    call: _call,
    handleMessageFromXT: _handleMessageFromXT
};
exports.XuntongJSBridge = XuntongJSBridge;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const qing_1 = __webpack_require__(0);
let getPersonInfo = function () {
    return new Promise(function (resolve, reject) {
        qing_1.XuntongJSBridge.call('getPersonInfo', {}, function (result) {
            if (result.success)
                resolve(result.data);
            else if (!result.success)
                reject({ error: result.error, errorCode: result.errorCode });
        });
    });
};
exports.getPersonInfo = getPersonInfo;
let selectPersons = function (config) {
    return new Promise(function (resolve, reject) {
        qing_1.XuntongJSBridge.call('selectPersons', config, function (result) {
            if (result.success)
                resolve(result.data);
            else if (!result.success)
                reject({ error: result.error, errorCode: result.errorCode });
        });
    });
};
exports.selectPersons = selectPersons;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const qing_1 = __webpack_require__(0);
exports.XuntongJSBridge = qing_1.XuntongJSBridge;
const util_1 = __webpack_require__(1);
exports.getPersonInfo = util_1.getPersonInfo;
exports.selectPersons = util_1.selectPersons;
let jsbUtil = {
    getPersonInfo: util_1.getPersonInfo,
    selectPersons: util_1.selectPersons
};
exports.jsbUtil = jsbUtil;


/***/ })
/******/ ]);