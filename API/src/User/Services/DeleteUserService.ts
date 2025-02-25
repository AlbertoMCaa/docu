import { Uuid } from "../../Shared/Models/Uuid";
import userRepository from "../Repository/UserRepository";

export class DeleteUserService {
    constructor (
        private userRepository: userRepository
    ){}

    async execute(id: Uuid): Promise<any>{
        return await this.userRepository.deleteUser(id);
    }
}