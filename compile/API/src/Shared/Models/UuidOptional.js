"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidOptional = void 0;
const ValidationError_1 = __importDefault(require("../Errors/ValidationError"));
const UUID_REGEXP = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
class UuidOptional {
    constructor(value) {
        this.value = value;
        this.validate();
    }
    validate() {
        if (this.value === null) {
            return;
        }
        if (typeof this.value != 'string') {
            throw new ValidationError_1.default('El Uuid solo debe de ser una cadena.');
        }
        if (!UUID_REGEXP.test(this.value)) {
            throw new ValidationError_1.default('El Uuid debe tener un formato de uuid.');
        }
    }
}
exports.UuidOptional = UuidOptional;
