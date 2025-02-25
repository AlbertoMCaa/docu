"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const tsyringe_1 = require("tsyringe");
const express_1 = __importDefault(require("express"));
const httpService_1 = __importDefault(require("./Services/httpService"));
const LogService_1 = require("./Services/LogService");
const cors_1 = __importDefault(require("cors"));
const dependency_injection_1 = require("./dependency-injection");
let httpServer = class httpServer {
    constructor(httpService, logService) {
        this.httpService = httpService;
        this.logService = logService;
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.set('trust proxy', false);
    }
    bindEndpoints(endpointsMap) {
        for (const [endpoint, endpointHandler] of Object.entries(endpointsMap)) {
            const colon = endpoint.indexOf(':');
            const method = endpoint.substring(0, colon).trim().toLowerCase();
            const path = endpoint.substring(colon + 1).trim();
            if (!['get', 'post', 'put', 'delete'].includes(method)) {
                throw new Error(`El método http "${method}" no está soportado.`);
            }
            let handlers;
            if (Array.isArray(endpointHandler)) {
                handlers = endpointHandler.map((handler, index) => {
                    if (index + 1 === endpointHandler.length) {
                        return this.controllerRunner(handler);
                    }
                    return handler;
                });
            }
            else {
                handlers = [this.controllerRunner(endpointHandler)];
            }
            this.app[method](path, ...handlers);
        }
    }
    controllerRunner(controllerBuilder) {
        return (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('hola alb'); //ControllerRunner
                this.logService.log(`Ejecutando controlador en la ruta '${request.originalUrl}'.`);
                const controller = dependency_injection_1.di.resolve(controllerBuilder);
                console.log(controller); //DEBUG
                yield controller.execute(request, response);
            }
            catch (error) {
                const err = error;
                this.logService.log(err);
            }
            finally {
                if (!response.writableEnded) {
                    response.end();
                }
            }
        });
    }
    start(port) {
        return new Promise(resolve => {
            this.server = this.app.listen(port, () => {
                this.logService.log(`Servidor iniciado en el puerto ${port}.`);
                resolve();
            });
        });
    }
    stop() {
        return new Promise(resolve => {
            if (!this.server) {
                resolve();
                return;
            }
            this.server.close(() => {
                resolve();
            });
        });
    }
};
exports.httpServer = httpServer;
exports.httpServer = httpServer = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [httpService_1.default,
        LogService_1.LogServices])
], httpServer);
