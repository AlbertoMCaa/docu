import { injectable } from "tsyringe";
import userRepository from "../Repository/UserRepository";
import { User } from "../Model/User";

@injectable()
export class saveUserService {
    constructor(
        private userRepository: userRepository
    ) {}

    async execute(user: User): Promise<void> {

        try {
            const exists = await this.userRepository.getUser(user.id) ? user.id.value : null

            if(exists) {

                throw new Error('The user already exists!')

            } else {
                await this.userRepository.saveUser(user);
            }
        } catch (error: any) {
            
            throw new Error(error.message);
        }
    } 
}