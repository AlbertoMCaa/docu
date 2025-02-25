import { injectable } from "tsyringe";
import userRepository from "../Repository/UserRepository";
import { Uuid } from "../../Shared/Models/Uuid";
import { Name } from "../../Shared/Models/Name";


@injectable()
export class saveUserPassword {

    constructor(
        private userRepository: userRepository
    ) {}

    async execute(id: Uuid, password: Name) {
        
        try {
            const userExists =  await this.userRepository.getUser(id)

            if(userExists === null) {

                throw new Error(`El usuario con id: ${id} ya existe!`);
            } else {

                await this.userRepository.saveUserPassword(id,password);
            }
        } catch(error: any) {

            throw new Error(error.message)
        }
    }
}