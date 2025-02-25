"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvService = void 0;
const tsyringe_1 = require("tsyringe");
let EnvService = class EnvService {
    getInt(name, defaultValue) {
        if (process.env[name]) {
            return parseInt(process.env[name]);
        }
        if (defaultValue === undefined) {
            throw new Error(this.getRequiredErrorMessage(name));
        }
        return defaultValue;
    }
    getString(name, defaultValue) {
        var _a;
        if (name in process.env) {
            return process.env[name];
        }
        if (defaultValue === undefined) {
            throw new Error(this.getRequiredErrorMessage(name));
        }
        return (_a = process.env[name]) !== null && _a !== void 0 ? _a : defaultValue;
    }
    getRequiredErrorMessage(name) {
        return `La variable de entorno ${name} es requerida.`;
    }
};
exports.EnvService = EnvService;
exports.EnvService = EnvService = __decorate([
    (0, tsyringe_1.injectable)()
], EnvService);
