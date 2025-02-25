import { inject, injectable } from "tsyringe";
import { Request, RequestHandler, Response } from "express";
import httpService from "../../Shared/Infraestructure/Services/httpService";
import { USER_REPOSITORY } from "../../Shared/Infraestructure/dependecy-names";
import userRepository from "../Repository/UserRepository";
import { Uuid } from "../../Shared/Models/Uuid";
import { Name } from "../../Shared/Models/Name";
import { User } from "../Model/User";
import { SecureDate } from "../../Shared/Models/SecureDate";
import { HttpController } from "../../Shared/Infraestructure/types";
import { v4 } from "uuid";


@injectable()
export class SaveUserController implements HttpController {

    constructor(
        private httpService: httpService,
        @inject(USER_REPOSITORY) private userRepository: userRepository
    ) {}

    async execute(request: Request, response: Response): Promise<void> {
        try {

            if(!request.body) {
                this.httpService.badRequest(response, {response: "No se proporcionó cuerpo."})
                return;
            }

            const id = request.body.id ? new Uuid(request.body.id) : new Uuid(v4());
            const name = new Name(request.body.name);
            const email = new Name(request.body.email);
            const birthDate = new SecureDate(new Date(request.body.birthDate));

            const user = new User(id, name, email, birthDate);

            await this.userRepository.saveUser(user);

            this.httpService.ok(response, {message: "User registration was succesful", user: user.getPrimitives() })
            
        } catch(error) {
            this.httpService.badRequest(response, {response: "Error"})
        }
    }
}