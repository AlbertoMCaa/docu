"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureDateOptional = void 0;
const ValidationError_1 = __importDefault(require("../Errors/ValidationError"));
class SecureDateOptional {
    constructor(value) {
        this.value = value;
        this.validate();
    }
    validate() {
        if (!this.value) {
            return null;
        }
        if (!(this.value instanceof Date)) {
            throw new ValidationError_1.default('El valor de SecureDate debe ser una instancia de Date.');
        }
        if (Number.isNaN(this.value.getTime())) {
            throw new ValidationError_1.default('El valor de SecureDate no contiene una fecha válida.');
        }
    }
}
exports.SecureDateOptional = SecureDateOptional;
