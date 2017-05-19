import XuntongJSBridge from "./qing";
import { getPersonInfo, selectPersons } from "./util";

let jsbUtil = {
    getPersonInfo: getPersonInfo,
    selectPersons: selectPersons
}

export { XuntongJSBridge, getPersonInfo, selectPersons, jsbUtil };
