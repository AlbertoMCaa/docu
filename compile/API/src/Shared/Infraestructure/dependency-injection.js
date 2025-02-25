"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.di = void 0;
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "di", { enumerable: true, get: function () { return tsyringe_1.container; } });
const dotenv_1 = require("dotenv");
const dependecy_names_1 = require("./dependecy-names");
const userPrismaRepository_1 = __importDefault(require("../../User/Infraestructure/userPrismaRepository"));
const petPrismaRepository_1 = __importDefault(require("../../Pet/Infraestructure/petPrismaRepository"));
const EnvService_1 = require("./Services/EnvService");
const httpServer_1 = require("./httpServer");
(0, dotenv_1.config)();
// Define every dependency to inject.
const userRepository = tsyringe_1.container.resolve(userPrismaRepository_1.default);
tsyringe_1.container.register(dependecy_names_1.USER_REPOSITORY, { useValue: userRepository });
const petRepository = tsyringe_1.container.resolve(petPrismaRepository_1.default);
tsyringe_1.container.register(dependecy_names_1.PET_REPOSITORY, { useValue: petRepository });
const envService = tsyringe_1.container.resolve(EnvService_1.EnvService);
tsyringe_1.container.register(dependecy_names_1.ENV_SERVICE, { useValue: envService });
const HttpServer = tsyringe_1.container.resolve(httpServer_1.httpServer);
tsyringe_1.container.register(dependecy_names_1.HTTP_SERVER, { useValue: HttpServer });
