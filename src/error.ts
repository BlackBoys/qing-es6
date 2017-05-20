export class Error {
    error: string;
    errorCode: number;
    constructor(result: Error) {
        this.error = result.error;
        this.errorCode = result.errorCode;
    }
}