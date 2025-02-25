"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uuid = void 0;
const ValidationError_1 = __importDefault(require("../Errors/ValidationError"));
const UUID_REGEXP = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
class Uuid {
    constructor(value) {
        this.value = value;
        this.validate();
    }
    validate() {
        if (typeof this.value != 'string') {
            throw new ValidationError_1.default('El Uuid solo debe de ser una cadena.');
        }
        if (!this.value) {
            throw new ValidationError_1.default('El Uuid no puede estar vacío.');
        }
        if (!UUID_REGEXP.test(this.value)) {
            throw new ValidationError_1.default('El Uuid debe tener un formato de uuid.');
        }
    }
}
exports.Uuid = Uuid;
