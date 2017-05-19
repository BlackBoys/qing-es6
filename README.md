## 为什么会有这个库

为轻应用的JSBridge提供一个Promise版的js调用,注意这个库还不能在浏览器里直接使用,请在babel或者typescript环境下的项目使用。

### 1. 获取用户信息

```javascript
import {jsbUtil} from "qing-es6";
jsbUtil.getUser()
.then(function(userData){

})
.catch(function(error){
console.dir(error);
});
```

### 2. 选择多人

```javascript
import {jsbUtil} from "qing-es6";
jsbUtil.selectPersons({pType:1,isMulti:false})
.then(function(usersData){

})
.catch(function(error){
console.dir(error);
});
```