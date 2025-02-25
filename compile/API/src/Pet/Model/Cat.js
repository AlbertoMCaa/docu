"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = void 0;
const IntOptional_1 = require("../../Shared/Models/IntOptional");
const Name_1 = require("../../Shared/Models/Name");
const Uuid_1 = require("../../Shared/Models/Uuid");
const Pet_1 = __importDefault(require("./Pet"));
class Cat extends Pet_1.default {
    constructor(id, name, breed, sex, clawsSize, bloodType, age) {
        super(id, name, age);
        this.id = id;
        this.name = name;
        this.breed = breed;
        this.sex = sex;
        this.clawsSize = clawsSize;
        this.bloodType = bloodType;
        this.age = age;
    }
    makeSound() {
        return 'hola';
    }
    static fromPrimitives(data) {
        const id = new Uuid_1.Uuid(data.id);
        const name = new Name_1.Name(data.name);
        const age = new IntOptional_1.IntOptional(data.age);
        const breed = new Name_1.Name(data.breed.value);
        const sex = new Name_1.Name(data.sex);
        const clawsSize = new Name_1.Name(data.clawsSize);
        const bloodType = new Name_1.Name(data.clawsSize);
        return new Cat(id, name, breed, 'Male', 'Small', '0-', age);
    }
    getPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value,
            breed: this.breed,
            sex: this.sex,
            clawsSize: this.clawsSize,
            bloodType: this.bloodType,
            age: 1
        };
    }
}
exports.Cat = Cat;
