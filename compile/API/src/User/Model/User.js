"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Uuid_1 = require("../../Shared/Models/Uuid");
const Name_1 = require("../../Shared/Models/Name");
const SecureDate_1 = require("../../Shared/Models/SecureDate");
class User {
    constructor(id, name, email, birthDate) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.birthDate = birthDate;
    }
    static fromPrimitives(data) {
        const id = new Uuid_1.Uuid(data.id);
        const name = new Name_1.Name(data.name);
        const email = new Name_1.Name(data.email);
        const birthDate = new SecureDate_1.SecureDate(data.birthDate);
        return new User(id, name, email, birthDate);
    }
    getPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value,
            email: this.email.value,
            birthDate: this.birthDate.value
        };
    }
}
exports.User = User;
