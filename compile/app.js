"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dependency_injection_1 = require("./API/src/Shared/Infraestructure/dependency-injection");
const httpServer_1 = require("./API/src/Shared/Infraestructure/httpServer");
const EnvService_1 = require("./API/src/Shared/Infraestructure/Services/EnvService");
const getUserController_1 = require("./API/src/User/Controller/getUserController");
const saveUserController_1 = require("./API/src/User/Controller/saveUserController");
/*
    Must use the Dependency Inversion pattern (Dependency Injection)

The projects structure must follow the following steps
-- Each Object, let's say a car has it's own package.
-- Each package hava  Model, Interface, Controller,
    Service, Infraestructure and Repository packages.
--  Repository defines the CRUD operations for the db implementation.  (use Prisma and Promises for async opeartions)
--  Infraestructure extends the forementioned repository and each operation is used in a service per each operation
--  Model defines the object.
--  Separete each method in different controllers.
    The controllers might have an interface.

*/
const envService = dependency_injection_1.di.resolve(EnvService_1.EnvService);
const HttpServer = dependency_injection_1.di.resolve(httpServer_1.httpServer);
const httPort = envService.getInt('PORT');
HttpServer.bindEndpoints({
    'GET:/user/:id': getUserController_1.getUserController,
    'PUT:/user': saveUserController_1.SaveUserController,
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promise.all([
            HttpServer.start(httPort)
        ]).then(() => {
            console.log(`El servidor está listo.`);
        });
    });
}
function stopServer() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Deteniendo el servidor.');
        yield Promise.all([
            HttpServer.stop(),
        ]);
        process.exit();
    });
}
startServer();
process.on('SIGINT', stopServer);
process.on('SIGTERM', stopServer);
