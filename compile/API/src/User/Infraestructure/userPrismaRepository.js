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
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const LogService_1 = require("../../Shared/Infraestructure/Services/LogService");
const Name_1 = require("../../Shared/Models/Name");
const Uuid_1 = require("../../Shared/Models/Uuid");
const User_1 = require("../Model/User");
const SecureDate_1 = require("../../Shared/Models/SecureDate");
const prisma_1 = require("../../Shared/Prisma/prisma");
const uuid_1 = require("uuid");
let userPrismaRepository = class userPrismaRepository {
    constructor(logService) {
        this.logService = logService;
    }
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.getUser(user.id);
            try {
                if (existingUser) {
                    yield prisma_1.prisma.user.update({
                        where: { id: user.id.value },
                        data: {
                            name: user.name.value,
                            email: user.email.value,
                            birthDate: user.birthDate.value,
                        },
                    });
                    this.logService.log(`User updated with id ${user.id.value}`);
                }
                else {
                    yield prisma_1.prisma.user.create({
                        data: {
                            id: user.id.value,
                            name: user.name.value,
                            email: user.email.value,
                            birthDate: user.birthDate.value,
                        },
                    });
                    this.logService.log(`User created with id ${user.id.value}`);
                }
            }
            catch (error) {
                if (error.code === 'P2002') {
                    throw new Error("The email already exists!");
                }
            }
        });
    }
    saveUserPassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield this.getUser(id);
            if (userExists) {
                yield prisma_1.prisma.user.update({
                    where: { id: id.value },
                    data: {
                        password: password.value
                    },
                });
                this.logService.log(`Updated user password with id: ${id.value}`);
            }
            else {
                this.logService.log(`Error. User with id: ${id.value} was not found`);
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRecord = yield prisma_1.prisma.user.findUnique({
                where: {
                    id: id.value
                },
            });
            if (!userRecord) {
                return null;
            }
            const user = new User_1.User(new Uuid_1.Uuid(userRecord.id), new Name_1.Name(userRecord.name), new Name_1.Name(userRecord.email), new SecureDate_1.SecureDate(userRecord.birthDate));
            return user;
        });
    }
    getUserbyAcccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRecord = yield prisma_1.prisma.user.findFirst({
                where: { accessToken: accessToken.value },
            });
            if (!userRecord)
                throw new Error(`Error. User not found.`);
            return new User_1.User(new Uuid_1.Uuid(userRecord.id), new Name_1.Name(userRecord.name), new Name_1.Name(userRecord.email), new SecureDate_1.SecureDate(userRecord.birthDate));
        });
    }
    createAccessToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const newToken = new Uuid_1.Uuid((0, uuid_1.v4)());
            yield prisma_1.prisma.user.update({
                where: { id: id.value },
                data: { accessToken: newToken.value },
            });
            this.logService.log(`Access token created for user ${id.value}`);
            return new Uuid_1.Uuid(newToken.value);
        });
    }
    updateUserEmail(id, newEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.user.update({
                where: { id: id.value },
                data: { email: newEmail.value },
            });
            this.logService.log(`Email updated for user ${id.value}`);
        });
    }
    updateUserName(id, newName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.user.update({
                where: { id: id.value },
                data: { name: newName.value },
            });
            this.logService.log(`Name updated for usere ${id.value}`);
        });
    }
    updateUserBirthDate(id, newDate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.user.update({
                where: { id: id.value },
                data: { birthDate: newDate.value },
            });
            this.logService.log(`Birth date updated for user ${id.value}`);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_1.prisma.user.delete({
                    where: { id: id.value },
                });
                this.logService.log(`User deleted with id ${id.value}`);
                return true;
            }
            catch (error) {
                this.logService.log(`Error deleting user with id ${id.value}: ${error.message}`);
                return false;
            }
        });
    }
};
userPrismaRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [LogService_1.LogServices])
], userPrismaRepository);
exports.default = userPrismaRepository;
