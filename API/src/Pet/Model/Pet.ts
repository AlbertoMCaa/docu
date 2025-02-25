import { Name } from "../../Shared/Models/Name";
import { Uuid } from "../../Shared/Models/Uuid";
import { IntOptional } from "../../Shared/Models/IntOptional"

export default abstract class Pet {
    
    constructor(
        public readonly id: Uuid,
        public name: Name,
        public age?: IntOptional
    ){}

    abstract makeSound(): any
}