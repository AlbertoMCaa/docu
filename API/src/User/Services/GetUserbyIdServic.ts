import { User } from "@prisma/client";
import userRepository from "../Repository/UserRepository";
import { Uuid } from "../../Shared/Models/Uuid";


export class GetUserbyIdService {
    constructor(
        private userRepository: userRepository,
    ) {}

    async execute(id: Uuid): Promise<any>{
        return await this.userRepository.getUser(id);
    }
}