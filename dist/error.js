"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Error = (function () {
    function Error(result) {
        this.error = result.error;
        this.errorCode = result.errorCode;
    }
    return Error;
}());
exports.Error = Error;
