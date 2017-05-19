import XuntongJSBridge from "./qing";
import { getUser, selectPersons } from "./util";

let jsbUtil = {
    getUser: getUser,
    selectPersons: selectPersons
}

export { XuntongJSBridge, getUser, selectPersons, jsbUtil };
