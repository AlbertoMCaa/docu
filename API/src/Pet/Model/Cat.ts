import { IntOptional } from "../../Shared/Models/IntOptional";
import { Name } from "../../Shared/Models/Name";
import { Uuid } from "../../Shared/Models/Uuid";
import { catPrimitives } from "./catPrimitives";
import Pet from "./Pet";
import { petPrimitives } from "./petPrimitive";

export class Cat extends Pet {

    constructor(
        public readonly id: Uuid,
        public name: Name,
        public readonly breed: Name,
        public readonly sex: 'Male' | 'Female',
        public readonly clawsSize: 'Small' | 'Medium' | 'Large',
        public readonly bloodType: '0-' | '0+' | 'B-' | 'C-',

        public age?: IntOptional,

    ){
        super(id, name, age);
    }

    makeSound() {
        return 'hola'
    }

    static fromPrimitives(data: catPrimitives): Cat {

        const id = new Uuid(data.id);
        const name = new Name(data.name);
        const age = new IntOptional(data.age);
        const breed = new Name(data.breed.value);
        const sex = new Name(data.sex);
        const clawsSize = new Name(data.clawsSize);
        const bloodType = new Name(data.clawsSize);

        return new Cat(id,name,breed,'Male','Small','0-',age);
    }

    getPrimitives(): catPrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            breed: this.breed,
            sex: this.sex,
            clawsSize: this.clawsSize,
            bloodType: this.bloodType,
            age: 1
        }
    }


    
}