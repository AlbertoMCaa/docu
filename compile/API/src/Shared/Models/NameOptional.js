"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameOptional = void 0;
const ValidationError_1 = __importDefault(require("../Errors/ValidationError"));
class NameOptional {
    constructor(value) {
        this.value = value;
        this.validate();
    }
    validate() {
        if (!this.value) {
            return null;
        }
        if (typeof this.value !== 'string') {
            throw new ValidationError_1.default('El nombre debe de ser un string.');
        }
        if (this.value === null) {
            return;
        }
    }
}
exports.NameOptional = NameOptional;
