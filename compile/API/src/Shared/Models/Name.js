"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = void 0;
const ValidationError_1 = __importDefault(require("../Errors/ValidationError"));
class Name {
    constructor(value) {
        this.value = value;
        this.validate();
    }
    validate() {
        if (typeof this.value !== 'string') {
            throw new ValidationError_1.default('El nombre debe de ser un string.');
        }
        if (!this.value) {
            throw new ValidationError_1.default('El nombre no puede estar vacío.');
        }
    }
}
exports.Name = Name;
