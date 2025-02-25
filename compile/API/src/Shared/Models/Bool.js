"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bool = void 0;
const ValidationError_1 = __importDefault(require("../Errors/ValidationError"));
class Bool {
    constructor(value) {
        this.value = value;
        this.validate();
    }
    validate() {
        if (typeof this.value !== 'boolean') {
            throw new ValidationError_1.default('El valor debe ser un boleano.');
        }
        if (!this.value && this.value !== false) {
            throw new ValidationError_1.default('El boleano no puede estar vacío.');
        }
    }
}
exports.Bool = Bool;
