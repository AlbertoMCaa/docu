"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_INTERNAL_SERVER_ERROR = exports.HTTP_CONFLICT = exports.HTTP_NOT_FOUND = exports.HTTP_UNAUTHORIZED = exports.HTTP_BAD_REQUEST = exports.HTTP_Created = exports.HTTP_OK = void 0;
const tsyringe_1 = require("tsyringe");
exports.HTTP_OK = 200;
exports.HTTP_Created = 201;
exports.HTTP_BAD_REQUEST = 400;
exports.HTTP_UNAUTHORIZED = 401;
exports.HTTP_NOT_FOUND = 404;
exports.HTTP_CONFLICT = 409;
exports.HTTP_INTERNAL_SERVER_ERROR = 500;
/*
    Define
*/
let httpService = class httpService {
    send(httpCode, response, body) {
        response.status(httpCode);
        response.send(body);
    }
    // 200 ok
    ok(response, body) {
        this.send(exports.HTTP_OK, response, body);
    }
    // 201 Created
    created(response, body) {
        this.send(exports.HTTP_Created, response, body);
    }
    // 400 bad request
    badRequest(response, body) {
        this.send(exports.HTTP_BAD_REQUEST, response, body);
    }
    // 401 unauthorized
    unauthirized(response, body) {
        this.send(exports.HTTP_UNAUTHORIZED, response, body);
    }
    // 404 Not found
    notFound(response, body) {
        this.send(exports.HTTP_NOT_FOUND, response, body);
    }
    // 409 conflict
    conflict(response, body) {
        this.send(exports.HTTP_CONFLICT, response, body);
    }
    // 500 internal server error
    internalServerError(response, body) {
        this.send(exports.HTTP_INTERNAL_SERVER_ERROR, response, body);
    }
};
httpService = __decorate([
    (0, tsyringe_1.injectable)()
], httpService);
exports.default = httpService;
