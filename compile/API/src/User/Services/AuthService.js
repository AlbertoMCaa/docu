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
exports.AuthService = void 0;
const uuidv4_1 = require("uuidv4");
const Uuid_1 = require("../../Shared/Models/Uuid");
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.authFailMessage = "You don't have enough permission for this action";
    }
    checkAccesToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.extractToken(accessToken);
            try {
                const user = yield this.userRepository.getUserbyAcccessToken(token);
                return user;
            }
            catch (erro) {
                throw new Error(this.authFailMessage);
            }
        });
    }
    createAccesToken() {
        return (0, uuidv4_1.uuid)();
    }
    extractToken(bearerHeader) {
        if (typeof bearerHeader !== 'string') {
            throw new Error('The bearer must be a string');
        }
        const parts = bearerHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new Error('The format of the bearer is incorrect.');
        }
        const token = parts[1];
        return new Uuid_1.Uuid(token);
    }
}
exports.AuthService = AuthService;
