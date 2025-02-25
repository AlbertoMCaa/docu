"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Float = void 0;
const ValidationError_1 = __importDefault(require("../Errors/ValidationError"));
class Float {
    constructor(value) {
        this.value = value;
        this.validate();
    }
    validate() {
        if (typeof this.value !== 'number') {
            console.log(this.value, 'float');
            throw new ValidationError_1.default('El valor de Int debe de ser un número entero.');
        }
    }
}
exports.Float = Float;
