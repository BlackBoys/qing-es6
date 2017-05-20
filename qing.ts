// {
// Android加上了这个if判断，如果当前window已经定义了XuntongBridge对象，不再重新加载
// 避免重新初始化_callback_map等变量，导致之前的消息回调失败，返回cb404
//alert('window already has a XuntongBridge object!!!');
//   return;
// };

///////////////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////////////本地调用的实际逻辑////////////////////////////////////////////
let _CUSTOM_PROTOCOL_SCHEME = 'xuntong',
  callbacksCount = 1,
  callbacks: any = {};

function _handleMessageFromXT(callbackId: any, message: any) {

  try {
    let callback = callbacks[callbackId];
    if (!callback) return;
    callback.apply(null, [message]);
  } catch (e) {
    // alert(e)
  }
}

/**
 * 获取用户ua信息,判断OS
 * @returns {string}
 */
function getOS() {
  let userAgent = navigator.userAgent;
  return userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 'ios' : userAgent.match(/Android/i) ? 'android' : '';
}
/**
 * 判断用户是否在云之家桌面端中
 * @returns {Array|{index: number, input: string}}
 */
function isCloudHub() {
  let userAgent = navigator.userAgent;
  return userAgent.match(/App\/cloudhub/);
}

// Use this in javascript to request native objective-c code
// functionName : string (I think the name is explicit :p)
// args : array of arguments
// callback : function with n-arguments that is going to be called when the native code returned
function _call(functionName: any, message: any, callback: any) {
  //只有在手机或电脑端云之家中才允许调用Xuntong JSBridge
  if (!(getOS() || isCloudHub())) return false;
  let hasCallback = callback && typeof callback == "function";
  let callbackId = hasCallback ? callbacksCount++ : 0;

  if (hasCallback)
    callbacks[callbackId] = callback;

  let iframe = document.createElement("IFRAME");
  iframe.setAttribute("src", _CUSTOM_PROTOCOL_SCHEME + ":" + functionName + ":" + callbackId + ":" + encodeURIComponent(JSON.stringify(message)));
  // For some reason we need to set a non-empty size for the iOS6 simulator...
  iframe.setAttribute("height", "1px");
  iframe.setAttribute("width", "1px");
  document.documentElement.appendChild(iframe);
  iframe.parentNode.removeChild(iframe);
  iframe = null;

}




let _XuntongJSBridge = {
  // public
  invoke: _call,
  call: _call,
  handleMessageFromXT: _handleMessageFromXT
};
if (!(<any>window).XuntongJSBridge) {
  (<any>window).XuntongJSBridge = _XuntongJSBridge;
}

let RealXuntongJSBridge = (<any>window).XuntongJSBridge;
export { RealXuntongJSBridge as XuntongJSBridge };
