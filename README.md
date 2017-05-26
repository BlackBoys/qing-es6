## 为什么会有这个库

为轻应用的JSBridge某些不友好的回调方法提供一个Promise版的js调用,注意这个库还不能在浏览器里直接使用,请在babel或ts环境下使用。

### 1. import方式引入JSBridge对象

```javascript
import {XuntongJSBridge} from "qing-es6";
XuntongJSBridge.call('hideOptionMenu');
```

### 1. 使用JsbUtil的call方法替代XuntongJSBridge的call方法

```javascript
import {jsbUtil} from "qing-es6";
jsbUtil.call('getPersonInfo',{})
.then(function(data){
})
.catch(function(error){
});
```

### 2. 获取当前用户身份信息

```javascript
import {jsbUtil} from "qing-es6";
jsbUtil.getPersonInfo()
.then(function(userData){

})
.catch(function(error){
console.dir(error);
});
```
### 3. 获取用户网络状态


```javascript
import {jsbUtil} from "qing-es6";
jsbUtil.getNetworkType()
.then(function(usersData){

})
.catch(function(error){
console.dir(error);
});
```

### 4. 选择多人

```javascript
import {jsbUtil} from "qing-es6";
jsbUtil.selectPersons(true,1)
.then(function(usersData){

})
.catch(function(error){
console.dir(error);
});
```


  [1]: http://erpcloud.kingdee.com/developer/?p=24