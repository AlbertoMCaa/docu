import { User } from "../Model/User";
import userRepository from "../Repository/UserRepository";
import { v4 } from "uuid";
import { Name } from "../../Shared/Models/Name";
import { Uuid } from "../../Shared/Models/Uuid";

export class AuthService {
    private authFailMessage = "You don't have enough permission for this action";

    constructor(
        private userRepository: userRepository
    ){}

    async checkAccesToken(accessToken: string | undefined): Promise<User>{
        const token = this.extractToken(accessToken);

        try{
            const user = await this.userRepository.getUserbyAcccessToken(token);

            return user;
        } catch(erro){
            throw new Error(this.authFailMessage);
        }
    }

    createAccesToken(): String {
        return v4();
    }

    extractToken(bearerHeader: string | undefined) {

        if (typeof bearerHeader !== 'string'){
            throw new Error('The bearer must be a string');
        }

        const parts = bearerHeader.split(' ');

        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new Error('The format of the bearer is incorrect.');
        }

        const token = parts[1];

        return new Uuid(token);
    }
}