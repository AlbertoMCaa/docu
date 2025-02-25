"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatOptional = void 0;
const ValidationError_1 = __importDefault(require("../Errors/ValidationError"));
class FloatOptional {
    constructor(value) {
        this.value = value;
        this.validate();
    }
    validate() {
        if (this.value === null) {
            return;
        }
        if (typeof this.value !== 'number') {
            throw new ValidationError_1.default('El valor de Int debe de ser un número entero.');
        }
    }
}
exports.FloatOptional = FloatOptional;
