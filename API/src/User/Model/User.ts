import { Uuid } from "../../Shared/Models/Uuid";
import { Name } from "../../Shared/Models/Name";
import { SecureDate } from "../../Shared/Models/SecureDate"

import { UserPrimitives } from "./UserPrimitives";

export class User {

    constructor(
        public readonly id: Uuid,
        public readonly name: Name,
        public readonly email: Name,
        public readonly birthDate: SecureDate
    ){}

    static fromPrimitives(data: UserPrimitives): User {
        const id = new Uuid(data.id);
        const name = new Name(data.name);
        const email = new Name(data.email);
        const birthDate = new SecureDate(data.birthDate);

        return new User(id,name,email,birthDate);
    }

    getPrimitives(): UserPrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            email: this.email.value,
            birthDate: this.birthDate.value
        }
    } 
    
}