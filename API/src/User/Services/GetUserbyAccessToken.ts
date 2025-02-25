import { Uuid } from "../../Shared/Models/Uuid";
import userRepository from "../Repository/UserRepository";

export class GetUserbyAcccessToken {

    constructor(
        private userRepository: userRepository
    ) {}

    async execute(token: Uuid): Promise<any>{
        
        const user = await this.userRepository.getUserbyAcccessToken(token);

        if (!user) {
            throw new Error("The user doesn't exist or is inactive");
        }

        return user;
    }
}